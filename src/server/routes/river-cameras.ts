import type { ServerResponse } from 'node:http';
import { publicRivers } from '../../data/rivers';
import { sendJson } from '../http';
import { getRiverCameras } from '../river-cameras';

export async function handleRiverCameras(response: ServerResponse, requestId: string, includeBody: boolean, slug: string) {
  const river = publicRivers.find(route => route.slug === slug);
  if (!river) return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody);
  try {
    const cameras = river.gaugeSource.provider === 'usgs' ? await getRiverCameras(river.gaugeSource.siteId) : [];
    return sendJson(response, 200, { requestId, cameras }, includeBody, 'public, max-age=300');
  } catch {
    return sendJson(response, 503, { requestId, error: 'cameras_unavailable' }, includeBody, 'no-store');
  }
}
