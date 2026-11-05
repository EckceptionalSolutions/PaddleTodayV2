import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { azureOriginAvailable, cloudflareClient, snapshotHosting, verifyHosting, rollbackAzureHosting,
  releaseAzureWebDns, probeWorkerRouteWrite, verifyReleaseVersions } from '../infra/cloudflare/hosting-control.mjs';
const directory = '.local/frontend-hosting';
const snapshotPath = `${directory}/production-before.json`;
try {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const api = cloudflareClient({ token: process.env.CLOUDFLARE_API_TOKEN, accountId: process.env.CLOUDFLARE_ACCOUNT_ID, zoneId });
  await mkdir(directory, { recursive: true });
  const operation = process.argv[2]; let result;
  if (operation === 'snapshot') result = await snapshotHosting(api, zoneId);
  else if (operation === 'guard-production') result = await verifyHosting(api, zoneId);
  else if (operation === 'probe-route-write') result = await probeWorkerRouteWrite(api, zoneId);
  else if (operation === 'verify-versions') result = await verifyReleaseVersions(api, process.env.EXPECTED_FRONTEND_REVISION || process.env.SOURCE_REVISION);
  else if (operation === 'verify' || operation === 'rollback' || operation === 'release-dns') {
    const before = JSON.parse(await readFile(snapshotPath, 'utf8'));
    if (operation === 'rollback') {
      if (!await azureOriginAvailable()) throw new Error('Azure frontend rollback origin is unavailable; no domains detached.');
    }
    result = operation === 'verify' ? await verifyHosting(api, zoneId, before)
      : operation === 'release-dns' ? await releaseAzureWebDns(api, zoneId, before, process.argv[3])
        : await rollbackAzureHosting(api, zoneId, before);
  } else throw new Error('Unknown hosting operation.');
  const output = operation === 'snapshot' ? snapshotPath : operation === 'release-dns'
    ? `${directory}/production-release-${result.hostname}.json` : `${directory}/production-${operation}.json`;
  await writeFile(output, JSON.stringify(result, null, 2));
  console.log(JSON.stringify({ operation, state: result.state, hostnames: result.domains?.map(domain => domain.hostname), recordedAt: result.recordedAt || result.checkedAt }));
} catch (error) { console.error(error.message); process.exitCode = 1; }
