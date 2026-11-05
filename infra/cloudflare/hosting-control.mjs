import assert from 'node:assert/strict';
import { createHash, randomUUID } from 'node:crypto';

export const HOSTS = ['paddletoday.com', 'www.paddletoday.com'];
export const WORKER = 'paddletoday-frontend';
export const WWW_WORKER = 'paddletoday-www-redirect';
export const HOST_WORKERS = { 'paddletoday.com': WORKER, 'www.paddletoday.com': WWW_WORKER };
export const AZURE_HOST = 'jolly-river-0d74c2110.1.azurestaticapps.net';
export const ACCOUNT = 'c8681e05144a6862baf7fbd582f6dbcc';
const addressRecord = record => HOSTS.includes(record.name) && ['A', 'AAAA', 'CNAME'].includes(record.type);
export function azureDnsRecords() {
  return HOSTS.map(name => ({ type: 'CNAME', name, content: AZURE_HOST, ttl: 1, proxied: name === HOSTS[0] }));
}
const dnsPayload = record => ({ type: record.type, name: record.name, content: record.content,
  ttl: record.ttl, proxied: record.proxied });
export function unrelatedDnsFingerprint(records) {
  const stable = records.filter(record => !addressRecord(record)).map(record => ({ id: record.id, ...dnsPayload(record),
    priority: record.priority, settings: record.settings, comment: record.comment, tags: record.tags }))
    .sort((a, b) => a.id.localeCompare(b.id));
  return createHash('sha256').update(JSON.stringify(stable)).digest('hex');
}
export function cloudflareClient({ token, accountId, zoneId, fetchImpl = fetch }) {
  assert.equal(accountId, ACCOUNT, 'Unexpected Cloudflare account.');
  assert.match(zoneId || '', /^[a-f0-9]{32}$/); assert.ok(token, 'Missing publishing credential.');
  return async (path, method = 'GET', body) => {
    assert.ok(path.startsWith(`/accounts/${accountId}/workers/`) || path.startsWith(`/zones/${zoneId}/`), 'Unexpected API scope.');
    assert.ok(!path.includes('..') && !path.includes('#'));
    const response = await fetchImpl('https://api.cloudflare.com/client/v4' + path, { method, redirect: 'error', signal: AbortSignal.timeout(30000),
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    const result = await response.json();
    assert.ok(response.ok && result.success === true,
      `Cloudflare ${method} failed: HTTP ${response.status}; codes ${(result.errors || []).map(error => error.code).join(',')}.`);
    return result;
  };
}
async function records(api, zoneId) {
  const result = [];
  for (let page = 1; page <= 20; page++) {
    const body = await api(`/zones/${zoneId}/dns_records?per_page=100&page=${page}`);
    assert.ok(Array.isArray(body.result)); result.push(...body.result);
    if ((body.result_info?.total_pages ?? 1) <= page) return result;
  }
  throw new Error('DNS pagination limit reached.');
}
async function domains(api) {
  const body = await api(`/accounts/${ACCOUNT}/workers/domains?per_page=100`);
  assert.ok(Array.isArray(body.result));
  assert.ok((body.result_info?.total_pages ?? 1) <= 1, 'Worker domain pagination needs review.');
  assert.ok(!body.result.some(domain => Object.values(HOST_WORKERS).includes(domain.service) && !HOSTS.includes(domain.hostname)),
    'Production Worker has additional custom domains; inspect before replacing its routing.');
  return body.result.filter(domain => HOSTS.includes(domain.hostname));
}
function validateDomains(found, zoneId) {
  for (const domain of found) {
    assert.equal(domain.service, HOST_WORKERS[domain.hostname], `Hostname ${domain.hostname} belongs to another Worker.`);
    assert.equal(domain.zone_id, zoneId); assert.notEqual(domain.enabled, false);
  }
}
function assertAzureDns(found) {
  const addresses = found.filter(addressRecord);
  assert.equal(addresses.length, 2, 'Expected exactly two Azure web records.');
  for (const expected of azureDnsRecords()) {
    assert.deepEqual(dnsPayload(addresses.find(record => record.name === expected.name) || {}), expected,
      `Unexpected DNS state for ${expected.name}; inspect before migration.`);
  }
}
export async function snapshotHosting(api, zoneId) {
  const dns = await records(api, zoneId), bindings = await domains(api);
  validateDomains(bindings, zoneId);
  if (!bindings.length) assertAzureDns(dns);
  else assert.deepEqual(bindings.map(domain => domain.hostname).sort(), [...HOSTS].sort(), 'Partial cutover requires inspection.');
  return { recordedAt: new Date().toISOString(), accountId: ACCOUNT, zoneId, worker: WORKER, hostWorkers: HOST_WORKERS,
    state: bindings.length ? 'workers' : 'azure', dns, domains: bindings, unrelatedDnsFingerprint: unrelatedDnsFingerprint(dns) };
}
export async function azureOriginAvailable(fetchImpl = fetch) {
  const response = await fetchImpl(`https://${AZURE_HOST}/`, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  if (response.status === 200) return (await response.text()).includes('Paddle Today');
  const canonicalRedirect = response.status === 301 && response.headers.get('location') === 'https://paddletoday.com/';
  await response.body?.cancel();
  return canonicalRedirect;
}
export async function releaseAzureWebDns(api, zoneId, before, hostname) {
  assert.equal(before.accountId, ACCOUNT); assert.equal(before.zoneId, zoneId); assert.equal(before.state, 'azure');
  assert.ok(HOSTS.includes(hostname), 'Only the two backed-up web hostnames may change.');
  const dns = await records(api, zoneId), bindings = await domains(api); validateDomains(bindings, zoneId);
  assert.ok(!bindings.some(domain => domain.hostname === hostname), 'Target hostname already has a Worker binding.');
  assert.equal(unrelatedDnsFingerprint(dns), before.unrelatedDnsFingerprint, 'Non-web DNS changed before release.');
  const expected = before.dns.find(record => addressRecord(record) && record.name === hostname);
  assert.ok(expected?.id); assert.equal(expected.type, 'CNAME'); assert.equal(expected.content, AZURE_HOST);
  const current = dns.filter(record => addressRecord(record) && record.name === hostname);
  assert.equal(current.length, 1, 'Expected one unchanged Azure web record before release.');
  assert.equal(current[0].id, expected.id, 'Azure DNS record identity changed.');
  assert.deepEqual(dnsPayload(current[0]), dnsPayload(expected), 'Azure DNS record changed before release.');
  await api(`/zones/${zoneId}/dns_records/${expected.id}`, 'DELETE');
  const after = await records(api, zoneId);
  assert.ok(!after.some(record => addressRecord(record) && record.name === hostname), 'Web DNS release readback failed.');
  assert.equal(unrelatedDnsFingerprint(after), before.unrelatedDnsFingerprint, 'Non-web DNS changed during release.');
  return { checkedAt: new Date().toISOString(), hostname, releasedRecordId: expected.id, original: dnsPayload(expected), nonWebDnsPreserved: true };
}
export async function probeWorkerRouteWrite(api, zoneId, nonce = randomUUID()) {
  assert.match(nonce, /^[a-f0-9-]{36}$/);
  const endpoint = `/zones/${zoneId}/workers/routes`;
  const pattern = `paddletoday.com/__hosting-write-check-${nonce}/*`;
  const original = (await api(endpoint)).result; assert.ok(Array.isArray(original));
  assert.ok(!original.some(route => route.pattern === pattern));
  const normalize = routes => routes.map(({ id, pattern, script }) => ({ id, pattern, script })).sort((a, b) => a.id.localeCompare(b.id));
  try {
    const created = (await api(endpoint, 'POST', { pattern, script: WWW_WORKER })).result;
    assert.equal(created.pattern, pattern); assert.equal(created.script, WWW_WORKER);
  } finally {
    // Resolve an uncertain POST acknowledgement before removing only this
    // run's unique route. Existing routes and ordinary URLs remain untouched.
    const current = (await api(endpoint)).result; assert.ok(Array.isArray(current));
    for (const route of current.filter(route => route.pattern === pattern && route.script === WWW_WORKER)) {
      await api(`${endpoint}/${route.id}`, 'DELETE');
    }
    const after = (await api(endpoint)).result; assert.ok(Array.isArray(after));
    assert.deepEqual(normalize(after), normalize(original), 'Worker route cleanup/preservation failed.');
  }
  return { checkedAt: new Date().toISOString(), pattern, temporaryRouteRemoved: true, existingRoutesPreserved: true };
}
export async function verifyHosting(api, zoneId, before) {
  const bindings = await domains(api); validateDomains(bindings, zoneId);
  assert.deepEqual(bindings.map(domain => domain.hostname).sort(), [...HOSTS].sort(), 'Both production custom domains must be bound.');
  const dns = await records(api, zoneId);
  if (before) {
    assert.equal(before.accountId, ACCOUNT); assert.equal(before.zoneId, zoneId);
    assert.equal(unrelatedDnsFingerprint(dns), before.unrelatedDnsFingerprint, 'Non-web DNS records changed during cutover.');
  }
  return { checkedAt: new Date().toISOString(), domains: bindings, unrelatedDnsFingerprint: unrelatedDnsFingerprint(dns) };
}
export async function verifyReleaseVersions(api, sourceRevision) {
  assert.match(sourceRevision || '', /^[a-f0-9]{40}$/);
  const workers = [];
  for (const worker of Object.values(HOST_WORKERS)) {
    const endpoint = `/accounts/${ACCOUNT}/workers/scripts/${worker}`;
    const deployment = (await api(`${endpoint}/deployments`)).result?.deployments?.[0];
    assert.ok(deployment?.id, 'Missing active Worker deployment.');
    assert.equal(deployment.versions?.length, 1, 'Expected one fully active Worker version.');
    const active = deployment.versions[0]; assert.equal(active.percentage, 100);
    assert.match(active.version_id || '', /^[a-f0-9-]{36}$/);
    const version = (await api(`${endpoint}/versions/${active.version_id}`)).result;
    assert.equal(version?.id, active.version_id);
    assert.equal(version?.annotations?.['workers/tag'], sourceRevision, 'Active Worker source tag differs from the verified release.');
    workers.push({ worker, deploymentId: deployment.id, versionId: active.version_id, percentage: active.percentage, sourceRevision });
  }
  return { checkedAt: new Date().toISOString(), sourceRevision, workers, verification: 'authenticated-cloudflare-control-plane' };
}
export async function rollbackAzureHosting(api, zoneId, before) {
  assert.equal(before.accountId, ACCOUNT); assert.equal(before.zoneId, zoneId);
  const bindings = await domains(api); validateDomains(bindings, zoneId);
  // Check every domain's ownership before detaching either one. Never delete a
  // DNS record by hostname: MX/TXT records also use the apex and www names.
  for (const domain of bindings) await api(`/accounts/${ACCOUNT}/workers/domains/${domain.id}`, 'DELETE');
  for (const expected of azureDnsRecords()) {
    const existing = (await records(api, zoneId)).filter(record => addressRecord(record) && record.name === expected.name);
    if (!existing.length) await api(`/zones/${zoneId}/dns_records`, 'POST', expected);
    else {
      assert.equal(existing.length, 1); assert.equal(existing[0].type, 'CNAME'); assert.equal(existing[0].content, AZURE_HOST);
      if (JSON.stringify(dnsPayload(existing[0])) !== JSON.stringify(expected)) {
        await api(`/zones/${zoneId}/dns_records/${existing[0].id}`, 'PUT', expected);
      }
    }
  }
  const dns = await records(api, zoneId); assertAzureDns(dns);
  assert.equal(unrelatedDnsFingerprint(dns), before.unrelatedDnsFingerprint, 'Non-web DNS changed; inspect separately.');
  return { checkedAt: new Date().toISOString(), state: 'azure', restoredRecords: azureDnsRecords() };
}
