import { describe, expect, it, vi } from 'vitest';
import { ACCOUNT, AZURE_HOST, HOSTS, HOST_WORKERS, azureDnsRecords, snapshotHosting, verifyHosting,
  rollbackAzureHosting, unrelatedDnsFingerprint, azureOriginAvailable, releaseAzureWebDns, probeWorkerRouteWrite,
  verifyReleaseVersions } from './hosting-control.mjs';
const zone = 'a'.repeat(32);
function fixture() {
  const state = { dns: [...azureDnsRecords().map((record, index) => ({ id: `web-${index}`, ...record })),
    { id: 'mail', name: HOSTS[0], type: 'MX', content: 'mail.test', priority: 10, ttl: 1, proxied: false },
    { id: 'verification', name: HOSTS[1], type: 'TXT', content: 'verification fixture', ttl: 1, proxied: false }], domains: [] as any[] };
  const writes: any[] = [];
  const api = async (path: string, method = 'GET', body?: any) => {
    if (method !== 'GET') writes.push({ path, method, body });
    if (method === 'DELETE') {
      if (path.includes('/dns_records/')) {
        state.dns = state.dns.filter(record => !path.endsWith('/' + record.id)); return { result: {} };
      }
      const domain = state.domains.find(item => path.endsWith('/' + item.id));
      state.domains = state.domains.filter(item => item !== domain);
      state.dns = state.dns.filter(record => record.name !== domain.hostname || !['A', 'AAAA', 'CNAME'].includes(record.type));
      return { result: {} };
    }
    if (method === 'POST') { state.dns.push({ id: `restored-${state.dns.length}`, ...body }); return { result: {} }; }
    if (method === 'PUT') {
      const index = state.dns.findIndex(record => path.endsWith('/' + record.id));
      state.dns[index] = { id: state.dns[index].id, ...body }; return { result: {} };
    }
    if (path.includes('/dns_records')) return { result: state.dns, result_info: { total_pages: 1 } };
    if (path.includes('/workers/domains')) return { result: state.domains };
    throw new Error('Unexpected fixture path');
  };
  const cutover = () => { state.domains = HOSTS.map((hostname, index) => ({ id: `binding-${index}`, hostname, service: HOST_WORKERS[hostname], zone_id: zone, enabled: true }));
    state.dns = state.dns.map(record => ['A', 'AAAA', 'CNAME'].includes(record.type) ? { ...record, type: 'AAAA', content: '100::', proxied: true } : record); };
  return { state, writes, api, cutover };
}
describe('production hosting cutover and rollback', () => {
  it('accepts Azure canonical redirects without following traffic through the public CDN', async () => {
    const fetchImpl = vi.fn(async () => new Response(null, { status: 301, headers: { location: 'https://paddletoday.com/' } }));
    expect(await azureOriginAvailable(fetchImpl)).toBe(true);
    expect(fetchImpl).toHaveBeenCalledTimes(1); expect(fetchImpl.mock.calls[0][1].redirect).toBe('manual');
  });
  it.each([[200, 'Paddle Today', undefined, true], [404, 'missing', undefined, false],
    [301, '', 'https://other.test/', false]])('validates direct Azure origin status %i safely', async (status, body, location, expected) => {
    expect(await azureOriginAvailable(async () => new Response(body, { status, headers: location ? { location } : {} }))).toBe(expected);
  });
  it('releases only the exact backed-up web record and preserves same-name MX/TXT records', async () => {
    const f = fixture(), before = await snapshotHosting(f.api, zone);
    await releaseAzureWebDns(f.api, zone, before, HOSTS[0]);
    expect(f.writes).toEqual([{ path: `/zones/${zone}/dns_records/web-0`, method: 'DELETE', body: undefined }]);
    expect(f.state.dns.some(record => record.id === 'mail')).toBe(true);
    expect(f.state.dns.some(record => record.id === 'verification')).toBe(true);
    expect(f.state.dns.some(record => record.id === 'web-1')).toBe(true);
  });
  it.each(['content', 'id'])('refuses DNS release when the backed-up record %s changed', async field => {
    const f = fixture(), before = structuredClone(await snapshotHosting(f.api, zone));
    f.state.dns[0][field] = 'changed';
    await expect(releaseAzureWebDns(f.api, zone, before, HOSTS[0])).rejects.toThrow(); expect(f.writes).toEqual([]);
  });
  it('refuses to release unrelated DNS names', async () => {
    const f = fixture(), before = await snapshotHosting(f.api, zone);
    await expect(releaseAzureWebDns(f.api, zone, before, 'mail.paddletoday.com')).rejects.toThrow(); expect(f.writes).toEqual([]);
  });
  it('snapshots the exact Azure origin and proxy settings without mutations', async () => {
    const f = fixture(), before = await snapshotHosting(f.api, zone);
    expect(before.state).toBe('azure'); expect(before.accountId).toBe(ACCOUNT); expect(f.writes).toEqual([]);
  });
  it('requires both owned custom domains and unchanged mail/verification records', async () => {
    const f = fixture(), before = await snapshotHosting(f.api, zone); f.cutover();
    expect((await verifyHosting(f.api, zone, before)).domains).toHaveLength(2);
    f.state.dns.find(record => record.id === 'mail')!.content = 'changed.test';
    await expect(verifyHosting(f.api, zone, before)).rejects.toThrow('Non-web DNS');
  });
  it('restores both CNAMEs and original proxy flags while preserving apex MX and www TXT', async () => {
    const f = fixture(), before = await snapshotHosting(f.api, zone); f.cutover();
    await rollbackAzureHosting(f.api, zone, before);
    expect(f.state.domains).toEqual([]);
    expect(f.state.dns.filter(record => record.type === 'CNAME').map(({ id, ...record }) => record)).toEqual(azureDnsRecords());
    expect(unrelatedDnsFingerprint(f.state.dns)).toBe(before.unrelatedDnsFingerprint);
    expect(f.writes.filter(write => write.method === 'DELETE').map(write => write.path)).toEqual(
      [0, 1].map(index => `/accounts/${ACCOUNT}/workers/domains/binding-${index}`));
  });
  it('refuses every mutation when either production hostname belongs to another Worker', async () => {
    const f = fixture(), before = await snapshotHosting(f.api, zone); f.cutover(); f.state.domains[1].service = 'other-worker';
    await expect(rollbackAzureHosting(f.api, zone, before)).rejects.toThrow('another Worker'); expect(f.writes).toEqual([]);
  });
  it('does not accept an unexpected origin or mixed cutover state', async () => {
    const f = fixture(); f.state.dns[0].content = 'other.test';
    await expect(snapshotHosting(f.api, zone)).rejects.toThrow('Unexpected DNS');
    f.state.dns[0].content = AZURE_HOST; f.cutover(); f.state.domains.pop();
    await expect(snapshotHosting(f.api, zone)).rejects.toThrow('Partial cutover');
    await expect(verifyHosting(f.api, zone)).rejects.toThrow('Both production');
  });
  it('resumes a rollback after one hostname was restored without rewriting matching DNS', async () => {
    const f = fixture(), before = await snapshotHosting(f.api, zone); f.cutover();
    await f.api(`/accounts/${ACCOUNT}/workers/domains/binding-0`, 'DELETE');
    await f.api(`/zones/${zone}/dns_records`, 'POST', azureDnsRecords()[0]); f.writes.length = 0;
    await rollbackAzureHosting(f.api, zone, before);
    expect(f.writes.filter(write => write.method === 'POST')).toHaveLength(1);
    expect(f.state.dns.filter(record => record.type === 'CNAME')).toHaveLength(2);
  });
});
describe('publishing permission and release verification', () => {
  it.each([false, true])('removes only its own route after a successful or uncertain acknowledgement (%s)', async uncertain => {
    let routes = [{ id: 'existing', pattern: 'paddletoday.com/existing/*', script: 'existing-worker' }];
    const api = async (_path: string, method = 'GET', body?: any) => {
      if (method === 'GET') return { result: structuredClone(routes) };
      if (method === 'POST') {
        const created = { id: 'probe', ...body }; routes.push(created);
        if (uncertain) throw new Error('Unknown acknowledgement'); return { result: created };
      }
      routes = routes.filter(route => route.id !== 'probe'); return { result: {} };
    };
    const work = probeWorkerRouteWrite(api, zone, '00000000-0000-4000-8000-000000000000');
    if (uncertain) await expect(work).rejects.toThrow('Unknown acknowledgement');
    else expect((await work).temporaryRouteRemoved).toBe(true);
    expect(routes).toEqual([{ id: 'existing', pattern: 'paddletoday.com/existing/*', script: 'existing-worker' }]);
  });
  it.each([false, true])('accepts only a 100-percent active version tagged with the exact source (%s)', async wrongTag => {
    const revision = 'a'.repeat(40), versionId = '00000000-0000-4000-8000-000000000000';
    const api = async (path: string) => path.endsWith('/deployments')
      ? { result: { deployments: [{ id: 'deployment', versions: [{ version_id: versionId, percentage: 100 }] }] } }
      : { result: { id: versionId, annotations: { 'workers/tag': wrongTag ? 'b'.repeat(40) : revision } } };
    if (wrongTag) await expect(verifyReleaseVersions(api, revision)).rejects.toThrow('source tag');
    else expect((await verifyReleaseVersions(api, revision)).workers).toHaveLength(2);
  });
});
