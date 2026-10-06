import type { ServerResponse } from 'node:http';
import { getRoutePreviewPhoto } from '../../data/route-gallery';
import { getRiverBySlug } from '../../lib/rivers';
import { sendJson } from '../http';

/** Keep editorial lookups on the server; boards request only the photo they display. */
export function handleRoutePhotoPreview(response: ServerResponse, requestId: string, includeBody: boolean, slug: string) {
  const river = getRiverBySlug(slug);
  if (!river) return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody, 'no-store');
  return sendJson(response, 200, { requestId, routeId: slug, photo: getRoutePreviewPhoto(river) }, includeBody,
    'public, max-age=86400, stale-while-revalidate=604800');
}
