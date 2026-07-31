from __future__ import annotations

import argparse
import json
import os
import threading
import time
import traceback
from datetime import datetime, timezone
from pathlib import Path

from openai_codex import ApprovalMode, Codex, CodexConfig, Sandbox


ROOT = Path(__file__).resolve().parents[3]
RUNS_DIR = ROOT / "automations" / "route-control-plane" / "runs"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def atomic_write(path: Path, value: dict) -> None:
    temporary = path.with_suffix(f"{path.suffix}.{os.getpid()}.tmp")
    temporary.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def load_run(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def prompt_for(state: str, mode: str) -> str:
    return f"""Execute one PaddleToday route-control {mode} job for {state}.

Work only in {ROOT}. Preserve unrelated changes already in the working tree.

1. Run `npm run routes:leads:gather`.
2. Claim exactly this assignment with `npx tsx scripts/route-control-plane.ts claim --mode {mode} --state "{state}"`.
3. Read `automations/route-control-plane/current-work-order.md` and every startup file it requires.
4. Execute the work order completely. Stay within {state}.
5. Research work must meet every evidence-touch and recovery requirement. Do not stop at the first inaccessible website.
6. Implementation work must satisfy every access, coordinate, gauge, threshold, safety, and validation gate.
7. Create a completion report from `automations/route-control-plane/completion-report.template.json`.
8. Run the work order completion command and proportionate tests for every changed file.
9. Finish with a concise summary of the outcome, changed facts or files, exact blockers, and retry condition.

Do not create scheduled tasks or additional Codex threads. Do not weaken a quality gate to manufacture progress."""


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-id", required=True)
    parser.add_argument("--state", required=True)
    parser.add_argument("--mode", choices=("research", "implementation"), required=True)
    args = parser.parse_args()

    RUNS_DIR.mkdir(parents=True, exist_ok=True)
    run_path = RUNS_DIR / f"{args.run_id}.json"
    cancel_path = RUNS_DIR / f"{args.run_id}.cancel"
    run = load_run(run_path)
    run.update({"status": "starting", "startedAt": now_iso(), "pid": os.getpid()})
    atomic_write(run_path, run)

    handle_holder: dict[str, object] = {}
    monitor_done = threading.Event()

    def monitor_heartbeat() -> None:
        while not monitor_done.wait(5):
            try:
                current = load_run(run_path)
                if current.get("status") not in {"starting", "running"}:
                    return
                current["lastActivityAt"] = now_iso()
                atomic_write(run_path, current)
            except Exception:
                pass

    def monitor_cancel() -> None:
        while not monitor_done.wait(0.75):
            if not cancel_path.exists():
                continue
            try:
                current = load_run(run_path)
                current["status"] = "cancelling"
                current["cancelRequestedAt"] = now_iso()
                atomic_write(run_path, current)
                handle = handle_holder.get("handle")
                if handle is not None:
                    handle.interrupt()
            except Exception:
                pass
            return

    monitor = threading.Thread(target=monitor_cancel, daemon=True)
    monitor.start()
    heartbeat = threading.Thread(target=monitor_heartbeat, daemon=True)
    heartbeat.start()

    try:
        config = CodexConfig(
            cwd=str(ROOT),
            config_overrides=("sandbox_workspace_write.network_access=true",),
            client_name="paddletoday_route_control",
            client_title="PaddleToday Route Control",
        )
        with Codex(config) as codex:
            thread = codex.thread_start(
                cwd=str(ROOT),
                sandbox=Sandbox.workspace_write,
                approval_mode=ApprovalMode.auto_review,
            )
            thread.set_name(f"PaddleToday {args.mode}: {args.state}")
            handle = thread.turn(prompt_for(args.state, args.mode))
            handle_holder["handle"] = handle
            run = load_run(run_path)
            run.update({
                "status": "running",
                "threadId": thread.id,
                "turnId": handle.id,
                "message": f"Codex is performing {args.mode} for {args.state}.",
                "lastActivityAt": now_iso(),
            })
            atomic_write(run_path, run)
            result = handle.run()

        cancelled = cancel_path.exists()
        run = load_run(run_path)
        result_status = getattr(result.status, "value", str(result.status))
        run.update({
            "status": "cancelled" if cancelled else ("completed" if result_status == "completed" else "failed"),
            "finishedAt": now_iso(),
            "message": "Run cancelled." if cancelled else (result.final_response or f"Run ended with {result_status}."),
            "finalResponse": result.final_response,
            "resultStatus": result_status,
        })
        atomic_write(run_path, run)
    except Exception as error:
        run = load_run(run_path)
        run.update({
            "status": "cancelled" if cancel_path.exists() else "failed",
            "finishedAt": now_iso(),
            "message": str(error),
            "error": traceback.format_exc(),
        })
        atomic_write(run_path, run)
    finally:
        monitor_done.set()
        if cancel_path.exists():
            cancel_path.unlink()


if __name__ == "__main__":
    main()
