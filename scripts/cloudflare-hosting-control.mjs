import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { AZURE_HOST, cloudflareClient, snapshotHosting, verifyHosting, rollbackAzureHosting } from '../infra/cloudflare/hosting-control.mjs';
const directory = '.local/frontend-hosting';
const snapshotPath = `${directory}/production-before.json`;
try {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const api = cloudflareClient({ token: process.env.CLOUDFLARE_API_TOKEN, accountId: process.env.CLOUDFLARE_ACCOUNT_ID, zoneId });
  await mkdir(directory, { recursive: true });
  const operation = process.argv[2]; let result;
  if (operation === 'snapshot') result = await snapshotHosting(api, zoneId);
  else if (operation === 'guard-production') result = await verifyHosting(api, zoneId);
  else if (operation === 'verify' || operation === 'rollback') {
    const before = JSON.parse(await readFile(snapshotPath, 'utf8'));
    if (operation === 'rollback') {
      const response = await fetch(`https://${AZURE_HOST}/`, { signal: AbortSignal.timeout(20000) });
      if (!response.ok || !(await response.text()).includes('Paddle Today')) throw new Error('Azure frontend rollback origin is unavailable; no domains detached.');
    }
    result = operation === 'verify' ? await verifyHosting(api, zoneId, before) : await rollbackAzureHosting(api, zoneId, before);
  } else throw new Error('Unknown hosting operation.');
  await writeFile(operation === 'snapshot' ? snapshotPath : `${directory}/production-${operation}.json`, JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ operation, state: result.state, hostnames: result.domains?.map(domain => domain.hostname), recordedAt: result.recordedAt || result.checkedAt }));
} catch (error) { console.error(error.message); process.exitCode = 1; }
