import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

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
