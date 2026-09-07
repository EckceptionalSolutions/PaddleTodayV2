// Native location APIs cannot all be aborted. Stop waiting for them when the
// request is cancelled or expires, so late readings cannot update the UI.
export function createLocationRequest(timeoutMs = 30_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  function cancel() {
    clearTimeout(timer);
    controller.abort();
  }

  function run<T>(operation: Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const onAbort = () => reject(new Error('Location request cancelled or timed out.'));
      controller.signal.addEventListener('abort', onAbort, { once: true });
      // Always observe the operation, including when cancellation won the race.
      operation.then(resolve, reject).finally(() => {
        controller.signal.removeEventListener('abort', onAbort);
      });
      if (controller.signal.aborted) onAbort();
    });
  }

  return { signal: controller.signal, run, cancel, finish: () => clearTimeout(timer) };
}
