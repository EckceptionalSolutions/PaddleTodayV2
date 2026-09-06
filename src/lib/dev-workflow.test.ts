import { describe, expect, it } from 'vitest';
import { parseDevOptions, selectWebPort, isPortFree } from '../../scripts/lib/dev-services.mjs';
import { nodeMeetsMinimum } from '../../scripts/lib/environment.mjs';
import { createServer } from 'node:net';

describe('local development workflow', () => {
  it('treats an existing wildcard TCP listener as occupied, including on Windows', async () => {
    const server = createServer(socket => socket.end());
    await new Promise<void>(resolve => server.listen(0, '0.0.0.0', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Expected TCP address.');
    try { expect(await isPortFree(address.port)).toBe(false); }
    finally { await new Promise<void>(resolve => server.close(() => resolve())); }
    expect(await isPortFree(address.port)).toBe(true);
  });
  it('validates explicit ports and rejects shell text and conflicting ports', () => {
    expect(parseDevOptions(['--web-port', '4331', '--api-port', '4332', '--check'])).toEqual({ webPort: 4331, apiPort: 4332, check: true, smoke: false });
    for (const args of [['--web-port', '4323;echo'], ['--api-port', '0'], ['--web-port'], ['--web-port', '4322']]) expect(() => parseDevOptions(args)).toThrow();
  });
  it('prefers a healthy existing frontend over an unused default port', async () => {
    const probes = { isPortFree: async (port: number) => port === 4321, isMatchingFrontend: async (port: number) => port === 4323 };
    expect(await selectWebPort([4321, 4323], 4322, {}, probes)).toEqual({ port: 4323, reuse: true });
  });
  it('avoids occupied unrelated listeners and respects explicit port choices', async () => {
    const probes = { isPortFree: async (port: number) => port === 4324, isMatchingFrontend: async () => false };
    expect(await selectWebPort([4321, 4323, 4324], 4322, {}, probes)).toEqual({ port: 4324, reuse: false });
    await expect(selectWebPort([4321], 4322, {}, probes)).rejects.toThrow('left alone');
  });
  it('checks the Node minimum by numeric version components', () => {
    expect(nodeMeetsMinimum('v22.12.0', '>=22.12.0')).toBe(true);
    expect(nodeMeetsMinimum('v24.1.0', '>=22.12.0')).toBe(true);
    expect(nodeMeetsMinimum('v22.9.0', '>=22.12.0')).toBe(false);
  });
});
