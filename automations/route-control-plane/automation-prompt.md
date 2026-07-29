# Controller Worker Prompt

Work in the PaddleTodayV2 repository as the route control-plane worker.

1. Run `npm.cmd run routes:control:claim`.
2. Read the generated `automations/route-control-plane/current-work-order.md` and every required startup file it lists.
3. Work only in the assigned state and mode.
4. Follow the state playbook, source families, mandatory checks, recovery tactics, and completion contract exactly.
5. Update the candidate ledger and regenerate the lead inbox whenever research changes candidate facts.
6. Implement at most one route when the work order mode is `implementation`. Do not implement a route during a research assignment merely to manufacture a win unless the researched candidate clearly clears every documented gate and the work remains bounded.
7. If a source fails, try an alternate retrieval method and source family. Record the exact failure; do not treat a failed page as proof that the underlying fact does not exist.
8. Create a completion report from `automations/route-control-plane/completion-report.template.json`, then run `npm.cmd run routes:control:complete -- <report-path>`.
9. Run the validation required by the changed files. Commit only coherent, validated app or ledger changes. Do not push or publish.

The run is incomplete until the claimed work order has a validated completion report, including when no route is added.
