// A convenience for repeat submissions, not a replacement for server limits.
// Storage is optional: a successful request must stay successful if it is blocked.
export function createSubmissionCooldown(key, durationMs = 30_000, {
  now = () => Date.now(),
  storage = () => window.localStorage,
} = {}) {
  let lastSubmittedAt = 0;
  return {
    isActive() {
      const timestamp = now();
      let stored = 0;
      try { stored = Number(storage()?.getItem(key)); } catch {}
      const validTimestamp = (value) => Number.isFinite(value) && value > 0 && value <= timestamp;
      const latest = Math.max(
        validTimestamp(lastSubmittedAt) ? lastSubmittedAt : 0,
        validTimestamp(stored) ? stored : 0,
      );
      return latest > 0 && timestamp - latest < durationMs;
    },
    recordSuccess() {
      lastSubmittedAt = now();
      try { storage()?.setItem(key, String(lastSubmittedAt)); } catch {}
    },
  };
}
