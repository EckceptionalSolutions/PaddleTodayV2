import type { ServerResponse } from 'node:http';
import { describe, expect, it, vi } from 'vitest';
import { handleRoutePhotoPreview } from './route-photo-preview';
import { getRoutePreviewPhoto } from '../../data/route-gallery';
import { listRivers } from '../../lib/rivers';

describe('public route preview responses', () => {
  it('matches editorial photo selection and credits for every public route without provider calls', () => {
    for (const river of listRivers()) {
      const response = { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
      handleRoutePhotoPreview(response, 'photo-check', true, river.slug);
      const raw = vi.mocked(response.end).mock.calls[0][0] as Buffer;
      expect(JSON.parse(raw.toString())).toEqual({ requestId: 'photo-check', routeId: river.slug, photo: getRoutePreviewPhoto(river) });
    }
  });

  it('supports HEAD and rejects unknown or withheld slugs without returning a photo', () => {
    const response = { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
    handleRoutePhotoPreview(response, 'head', false, listRivers()[0].slug);
    expect(response.writeHead).toHaveBeenCalledWith(200, expect.objectContaining({ 'content-length': expect.any(Number) }));
    expect(response.end).toHaveBeenCalledWith(undefined);
    const missing = { writeHead: vi.fn(), end: vi.fn() } as unknown as ServerResponse;
    handleRoutePhotoPreview(missing, 'missing', true, 'not-a-public-route');
    expect(missing.writeHead).toHaveBeenCalledWith(404, expect.objectContaining({ 'cache-control': 'no-store' }));
    expect(JSON.parse((vi.mocked(missing.end).mock.calls[0][0] as Buffer).toString())).toEqual({ requestId: 'missing', error: 'not_found' });
  });
});
