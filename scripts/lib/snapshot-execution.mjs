import assert from 'node:assert/strict';

export async function waitForSnapshotExecution({ executionName, expectedImage, readExecution, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), now = Date.now, timeoutMs = 10 * 60000, onAttempt = () => {} }) {
  assert.match(executionName, /^[a-z0-9-]+$/); assert.ok(expectedImage);
  const deadline = now() + timeoutMs;
  while (true) {
    let execution;
    try { execution = await readExecution(executionName); }
    catch (error) {
      onAttempt({ name: executionName, state: 'observation-error', error: error.message });
      if (/AuthorizationFailed|Forbidden|\b(401|403)\b/.test(error.message)) throw error;
    }
    if (execution) {
      assert.equal(execution.name, executionName, 'Observed a different execution');
      onAttempt(execution);
      if (execution.images?.length) assert.ok(execution.images.every(image => image === expectedImage), 'Execution uses a different image revision');
      if (execution.status === 'Succeeded') {
        assert.ok(execution.images?.length, 'Completed execution has no image identity');
        return execution;
      }
      if (['Failed', 'Stopped', 'Canceled', 'Cancelled'].includes(execution.status)) throw new Error(`Snapshot execution ${executionName}: ${execution.status}`);
    }
    assert.ok(now() < deadline, `Timed out observing ${executionName}; it may still be running. Inspect this execution before starting another.`);
    await sleep(10000);
  }
}
