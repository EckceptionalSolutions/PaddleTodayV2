import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { waitForSnapshotExecution } from './lib/snapshot-execution.mjs';

const job = process.env.AZURE_CONTAINER_APPS_JOB, group = process.env.AZURE_RESOURCE_GROUP;
for (const value of [job, group]) assert.match(value, /^[a-z0-9-]+$/);
const execution = await waitForSnapshotExecution({
  executionName: process.env.SNAPSHOT_EXECUTION_NAME,
  expectedImage: `${process.env.AZURE_CONTAINER_REGISTRY}.azurecr.io/${process.env.IMAGE_NAME}:${process.env.SOURCE_REVISION}`,
  async readExecution(name) {
    const result = await promisify(execFile)(process.platform === 'win32' ? 'az.cmd' : 'az', [
      'containerapp', 'job', 'execution', 'show', '--name', job, '--resource-group', group, '--job-execution-name', name,
      '--query', '{name:name,status:properties.status,startTime:properties.startTime,endTime:properties.endTime,images:properties.template.containers[].image}', '--output', 'json', '--only-show-errors',
    ], { timeout: 30000, windowsHide: true, shell: process.platform === 'win32' });
    return JSON.parse(result.stdout);
  },
  onAttempt: value => console.log(JSON.stringify(value)),
});
await writeFile('snapshot-verification-execution.json', JSON.stringify(execution, null, 2) + '\n');
