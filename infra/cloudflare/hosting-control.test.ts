import { describe, expect, it } from 'vitest';
import { ACCOUNT, AZURE_HOST, HOSTS, HOST_WORKERS, azureDnsRecords, snapshotHosting, verifyHosting,
  rollbackAzureHosting, unrelatedDnsFingerprint } from './hosting-control.mjs';
const zone = 'a'.repeat(32);
function fixture() {
  const state = { dns: [...azureDnsRecords().map((record, index) => ({ id: `web-${index}`, ...record })),
    { id: 'mail', name: HOSTS[0], type: 'MX', content: 'mail.test', priority: 10, ttl: 1, proxied: false },
    { id: 'verification', name: HOSTS[1], type: 'TXT', content: 'verification fixture', ttl: 1, proxied: false }], domains: [] as any[] };
  const writes: any[] = [];
  const api = async (path: string, method = 'GET', body?: any) => {
    if (method !== 'GET') writes.push({ path, method, body });
    if (method === 'DELETE') {
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
