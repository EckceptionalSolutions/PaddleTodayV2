import type { ServerResponse } from 'node:http';
import type { ApiRequest } from '../http';
import { clean, sendJson } from '../http';
import { captureHistorySnapshotForResults } from '../../lib/history';
import { captureRiverSnapshots } from '../../lib/river-snapshots';
import { getAllRiverScores } from '../../lib/rivers';

export async function handleHistorySnapshot(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  if (!requestHasRefreshToken(request, process.env.HISTORY_SNAPSHOT_TOKEN)) {
    return sendJson(
      response,
      401,
      {
        requestId,
        error: 'unauthorized',
        message: 'Missing or invalid history snapshot token.',
      },
      includeBody,
      'no-store'
    );
  }

  const results = await getAllRiverScores();
  const captured = await captureHistorySnapshotForResults({ results });

  return sendJson(
    response,
    200,
    {
      requestId,
      ok: true,
      captured,
    },
    includeBody,
    'no-store'
  );
}

export async function handleRiverSnapshotRefresh(
  request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean
) {
  const configuredToken = clean(process.env.SNAPSHOT_REFRESH_TOKEN || process.env.HISTORY_SNAPSHOT_TOKEN, 240);
  if (!requestHasRefreshToken(request, configuredToken)) {
    return sendJson(
      response,
      401,
      {
        requestId,
        error: 'unauthorized',
        message: 'Missing or invalid snapshot refresh token.',
      },
      includeBody,
      'no-store'
    );
  }

  const results = await getAllRiverScores();
  const captured = await captureRiverSnapshots({ results });

  return sendJson(
    response,
    200,
    {
      requestId,
      ok: true,
      captured,
    },
    includeBody,
    'no-store'
  );
}


function requestHasRefreshToken(
  request: ApiRequest,
  configuredToken: string
) {
  const providedToken =
    clean(request.headers['x-history-token'], 240) ||
    clean(request.headers.authorization?.replace(/^Bearer\s+/i, ''), 240);

  if (!configuredToken) {
    return true;
  }

  return providedToken === configuredToken;
}
