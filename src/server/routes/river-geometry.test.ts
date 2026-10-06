import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFile, readdir } from 'node:fs/promises';
import type { ServerResponse } from 'node:http';

vi.mock('node:fs/promises', () => ({ readFile: vi.fn(), readdir: vi.fn() }));
afterEach(() => { vi.resetModules(); vi.resetAllMocks(); vi.useRealTimers(); });

describe('geometry file inventory', () => {
  it('avoids file reads for arbitrary missing slugs and bounds their retention', async () => {
    vi.mocked(readdir).mockResolvedValue(['retained-route.json'] as never);
    const { loadRouteGeometry, getGeometryCacheStats } = await import('./river-geometry');
    for (let n = 0; n < 1000; n++) expect(await loadRouteGeometry(`absent-${n}`)).toBeNull();
    expect(readFile).not.toHaveBeenCalled(); expect(readdir).toHaveBeenCalledTimes(2);
    expect(getGeometryCacheStats()).toMatchObject({ entries: 0, missing: 128, inflight: 0 });
  });

  it('shares reads, preserves public fallback assets and HEAD headers, and notices new files', async () => {
    vi.useFakeTimers();
    vi.mocked(readdir).mockResolvedValue(['retained-route.json'] as never);
    const raw = JSON.stringify({ properties: { state: 'Minnesota', source: 'Reviewed' }, geometry: { type: 'LineString', coordinates: [[-93, 45], [-92, 44]] } });
    vi.mocked(readFile).mockImplementation(async path => {
      if (String(path).includes('dist')) throw Object.assign(new Error('not in dist'), { code: 'ENOENT' });
      return raw;
    });
    const { loadRouteGeometry, handleRiverGeometry } = await import('./river-geometry');
    const [first, second] = await Promise.all([loadRouteGeometry('retained-route'), loadRouteGeometry('retained-route')]);
    expect(first).toBe(second); expect(readFile).toHaveBeenCalledTimes(2);
    const response = { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
    await handleRiverGeometry(response, 'head', false, 'retained-route');
    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({ 'content-length': expect.any(Number) }));
    expect(response.end).toHaveBeenCalledWith(undefined);
    expect(await loadRouteGeometry('new-route')).toBeNull();
    vi.mocked(readdir).mockResolvedValue(['retained-route.json', 'new-route.json'] as never);
    vi.advanceTimersByTime(60001);
    expect((await loadRouteGeometry('new-route'))?.geometry?.type).toBe('LineString');
    expect(readdir).toHaveBeenCalledTimes(4);
  });
});
