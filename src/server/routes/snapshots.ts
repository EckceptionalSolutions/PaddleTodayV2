import type { ServerResponse } from 'node:http';
import type { ApiRequest } from '../http';
import { clean, sendJson } from '../http';
import { captureHistorySnapshotForResults } from '../../lib/history';
import { captureRiverSnapshots } from '../../lib/river-snapshots';
import { getAllRiverScores } from '../../lib/rivers';

type RiverSnapshotCapture = Awaited<ReturnType<typeof captureRiverSnapshots>>;

let activeRiverSnapshotRefresh: {
  startedAt: string;
  promise: Promise<RiverSnapshotCapture>;
} | null = null;

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

  const isAsync = new URL(request.url || '/', 'http://localhost').searchParams.get('async') === '1';
  if (isAsync) {
    const existing = activeRiverSnapshotRefresh;
    if (existing) {
      return sendJson(
        response,
        202,
        {
          requestId,
          ok: true,
          status: 'running',
          startedAt: existing.startedAt,
        },
        includeBody,
        'no-store'
      );
    }

    const startedAt = new Date().toISOString();
    const state = {
      startedAt,
      promise: captureProductionRiverSnapshots(),
    };
    activeRiverSnapshotRefresh = state;
    void state.promise.then(
      (captured) => {
        console.log(`[snapshots] async refresh completed at ${captured.generatedAt} using ${captured.storage} storage`);
        if (activeRiverSnapshotRefresh === state) activeRiverSnapshotRefresh = null;
      },
      (error: unknown) => {
        console.error('[snapshots] async refresh failed', error);
        if (activeRiverSnapshotRefresh === state) activeRiverSnapshotRefresh = null;
      }
    );

    return sendJson(
      response,
      202,
      {
        requestId,
        ok: true,
        status: 'started',
        startedAt,
      },
      includeBody,
      'no-store'
    );
  }

  const captured = await captureProductionRiverSnapshots();

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

async function captureProductionRiverSnapshots(): Promise<RiverSnapshotCapture> {
  const results = await getAllRiverScores();
  const captured = await captureRiverSnapshots({ results });

  if (captured.storage !== 'blob') {
    throw new Error('Production snapshot refresh requires Blob Storage configuration.');
  }

  return captured;
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
