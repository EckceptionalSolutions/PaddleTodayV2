import type { ServerResponse } from 'node:http';
import { publicRivers } from '../../data/rivers';
import { getUsgsGaugeContext } from '../../lib/usgs-gauge-context';
import { sendJson } from '../http';

export async function handleRiverGaugeContext(response: ServerResponse, requestId: string, includeBody: boolean, slug: string) {
  const river = publicRivers.find(route => route.slug === slug);
  if (!river) return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody, 'no-store');
  try {
    const context = river.gaugeSource.provider === 'usgs' ? await getUsgsGaugeContext(river.gaugeSource) : null;
    return sendJson(response, 200, { requestId, context }, includeBody, 'public, max-age=60, s-maxage=300');
  } catch {
    return sendJson(response, 503, { requestId, error: 'gauge_context_unavailable' }, includeBody, 'no-store');
  }
}
