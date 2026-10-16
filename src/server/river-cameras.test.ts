import { describe, expect, it, vi } from 'vitest';
import { createCameraService } from './river-cameras';

const camera = { camId: 'WI_Test', camName: 'Test River', nwisId: '01234567',
  newestImageDT: '2026-10-16T13:45:03Z', smallDir: 'https://usgs-nims-images.s3.amazonaws.com/720/WI_Test/' };

describe('river cameras', () => {
  it('matches exact gauge IDs, excludes hidden and malformed cameras, and shares concurrent catalog requests', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify([
      camera, { ...camera, hideCam: true }, { ...camera, newestImageDT: 'invalid' },
      { ...camera, smallDir: 'https://example.com/' },
    ])));
    const load = createCameraService(fetcher);
    const [matched, missing] = await Promise.all([load('01234567'), load('1234567')]);
    expect(missing).toEqual([]);
    expect(matched).toHaveLength(1);
    expect(matched[0]?.imageUrl).toBe('https://usgs-nims-images.s3.amazonaws.com/720/WI_Test/WI_Test___2026-10-16T13-45-03Z.jpg');
    await load('01234567');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('keeps the original capture time when refreshing fails and backs off retries', async () => {
    let now = 0;
    const fetcher = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify([camera])))
      .mockResolvedValue(new Response('', { status: 503 }));
    const load = createCameraService(fetcher, () => now);
    await load('01234567');
    now = 16 * 60_000;
    expect((await load('01234567'))[0]?.capturedAt).toBe(camera.newestImageDT);
    await load('01234567');
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('reports unavailable rather than no cameras during an initial outage', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('', { status: 429 }));
    const load = createCameraService(fetcher);
    await expect(load('01234567')).rejects.toThrow();
    await expect(load('01234567')).rejects.toThrow();
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
