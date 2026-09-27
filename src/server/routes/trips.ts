import type { IncomingMessage, ServerResponse } from 'node:http';
import { isTripId, isTripMutation, isLogMutation, isTripToken, TRIP_PHOTO_MAX_BYTES } from '@paddletoday/api-contract';
import { tripStorage, TripError } from '../../lib/trip-storage';
import { accountSyncStorage } from '../../lib/account-sync-storage';
import { verifyAccountIdToken } from '../account-auth';
import { readJsonBody, sendJson, sendBinary, sendRequestBodyErrorResponse } from '../http';
import { getIp } from '../rate-limit';
import { recordTripRequest } from '../trip-telemetry';

const attempts = new Map<string, { at: number; count: number }>();
function allowed(key: string, limit = 180) {
  const now = Date.now();
  if (attempts.size > 10000) for (const [k, v] of attempts) if (v.at < now) attempts.delete(k);
  const v = attempts.get(key);
  if (!v || v.at < now) { attempts.set(key, { at: now + 60000, count: 1 }); return true; }
  return ++v.count <= limit;
}
export const isTripsPath = (path: string) => path === '/api/trips' || path.startsWith('/api/trips/') || path.startsWith('/api/paddle-logs/');
export async function handleTrips(request: IncomingMessage, response: ServerResponse, url: URL, requestId: string, includeBody: boolean) {
  let operation: Parameters<typeof recordTripRequest>[0] = url.pathname.includes('/photos/') ? 'photo' : url.pathname.startsWith('/api/paddle-logs/') ? 'log' : request.method === 'GET' ? 'read' : 'trip';
  response.once('finish', () => { if (request.method !== 'OPTIONS') recordTripRequest(operation, response.statusCode, Number(request.headers['x-trip-queue-age-ms'] || 0)); });
  const send = (status: number, payload: unknown) => sendJson(response, status, { requestId, ...(payload as object) }, includeBody, 'no-store', { 'referrer-policy': 'no-referrer' });
  if (request.method === 'OPTIONS') {
    return sendJson(response, 204, {}, false, 'no-store', { 'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS', 'access-control-allow-headers': 'authorization, content-type, x-trip-queue-age-ms' });
  }
  if (!['GET', 'POST', 'DELETE'].includes(request.method || '')) return send(405, { error: 'method_not_allowed' });
  try {
    const path = url.pathname.split('/').filter(Boolean);
    const store = tripStorage();
    // Tokens are sent in POST bodies, never in URLs logged by the API/CDN.
    if (path[1] === 'trips' && ['view', 'invitation'].includes(path[2] || '') && request.method === 'POST') {
      operation = 'public';
      if (!allowed('public:' + getIp(request), 60)) return send(429, { error: 'rate_limited' });
      const input = await readJsonBody(request, 2048) as { id?: unknown; token?: unknown };
      if (!input || !isTripId(input.id) || !isTripToken(input.token)) return send(400, { error: 'invalid_link' });
      return send(200, path[2] === 'view' ? { trip: await store.publicView(input.id, input.token) } : { invitation: await store.invitation(input.id, input.token) });
    }
    const user = await verifyAccountIdToken(request.headers.authorization);
    if (!user) return send(401, { error: 'sign_in_required', message: 'Sign in to open your trips.' });
    if (!allowed('uid:' + user.uid)) return send(429, { error: 'rate_limited' });
    const accounts = accountSyncStorage();
    if (await accounts.isDeleted(user.uid)) return send(410, { error: 'account_deleted' });
    const name = typeof user.name === 'string' ? user.name : 'Paddler';
    if (url.pathname === '/api/trips' && request.method === 'GET') return send(200, await store.list(user.uid, url.searchParams.get('cursor') || ''));
    if (url.pathname === '/api/trips/migrate' && request.method === 'POST') {
      operation = 'migration';
      const account = await accounts.read(user.uid);
      await store.migrate(user.uid, name, Object.values(account.document.drafts).flatMap(d => d.value ? [d.value] : []));
      return send(200, { migrated: true, recovery: await store.migrationRecovery(user.uid) });
    }
    if (url.pathname === '/api/trips/export' && request.method === 'GET') {
      operation = 'export';
      const records: { trips: unknown[]; logs: unknown[]; recovery: unknown } = { trips: [], logs: [], recovery: await store.migrationRecovery(user.uid) };
      let cursor = '';
      do { const page = await store.list(user.uid, cursor); records.trips.push(...page.trips); records.logs.push(...page.logs); cursor = page.nextCursor || ''; } while (cursor);
      return send(200, records);
    }
    const id = path[2];
    if (!isTripId(id)) return send(404, { error: 'not_found' });
    if (path[1] === 'trips' && path.length === 3) {
      if (request.method === 'GET') return send(200, { trip: await store.get(user.uid, id) });
      if (request.method === 'POST') {
        const body = await readJsonBody(request, 64000);
        if (!isTripMutation(body)) return send(400, { error: 'invalid_trip', message: 'Check the trip fields and try again.' });
        if (body.command.type === 'join') operation = 'join';
        return send(200, { trip: await store.mutate(user.uid, name, id, body) });
      }
    }
    if (path[1] === 'paddle-logs') {
      if (path.length === 3 && request.method === 'GET') return send(200, { log: await store.getLog(user.uid, id) });
      if (path.length === 3 && request.method === 'POST') {
        const body = await readJsonBody(request, 64000);
        if (!isLogMutation(body)) return send(400, { error: 'invalid_log', message: 'Check the location, date, and log fields.' });
        return send(200, { log: await store.log(user.uid, id, body) });
      }
      const photoId = path[4];
      if (path.length === 5 && path[3] === 'photos' && isTripId(photoId)) {
        if (request.method === 'GET') return sendBinary(response, 200, await store.readPhoto(user.uid, id, photoId), 'image/jpeg', 'no-store', includeBody);
        if (request.method === 'DELETE') { await store.removePhoto(user.uid, id, photoId); return send(200, { removed: true }); }
        if (request.method === 'POST') {
          if (!allowed('photo:' + user.uid, 20)) return send(429, { error: 'upload_rate_limited' });
          const body = await readJsonBody(request, Math.ceil(TRIP_PHOTO_MAX_BYTES * 4 / 3) + 2048) as { data?: unknown; caption?: unknown };
          if (!body || typeof body.data !== 'string' || typeof body.caption !== 'string' || body.caption.length > 300) return send(400, { error: 'invalid_photo' });
          return send(200, { log: await store.photo(user.uid, id, photoId, body.data, body.caption) });
        }
      }
    }
    return send(404, { error: 'not_found' });
  } catch (error) {
    if (error instanceof TripError) return send(error.status, { error: error.code, message: error.message });
    if (error instanceof Error && ['RequestBodyTooLargeError', 'InvalidJsonBodyError'].includes(error.name)) return sendRequestBodyErrorResponse(error, response, requestId, includeBody);
    console.error('Trip request failed', { requestId, type: error instanceof Error ? error.name : 'unknown' });
    return send(503, { error: 'trip_unavailable', message: 'Your changes are saved on this device. Try syncing again shortly.' });
  }
}
