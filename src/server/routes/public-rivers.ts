import type { ServerResponse } from 'node:http';
import type { ApiRequest } from '../http';
import { sendJson } from '../http';
import { withTimeout } from '../server-runtime';
import {
  serializeDetailResult,
  serializeRiverGroupResult,
  serializeRiverHistoryResult,
  serializeSummaryResult,
  serializeWeekendSummaryResult,
} from '../../lib/api-contract';
import { getRiverHistory } from '../../lib/history';
import {
  getStoredRiverDetailSnapshot,
  getStoredRiverGroupSnapshot,
  getStoredRiverSummarySnapshot,
  getStoredWeekendSummarySnapshot,
} from '../../lib/river-snapshots';
import { getAllRiverScores, getRiverBySlug, getRiverGroupScores, getRiverScore, listRivers } from '../../lib/rivers';
import { getCacheStats } from '../../lib/server-cache';
import { parseQueryNumber } from '../request-parsers';
import { resolveStaticFile } from '../static-route';

const LIVE_SCORE_TIMEOUT_MS = 12_000;
const LIVE_SUMMARY_CACHE_CONTROL = 'public, max-age=60, s-maxage=180, stale-while-revalidate=600';
const ROUTE_DETAIL_CACHE_CONTROL = 'public, max-age=120, s-maxage=600, stale-while-revalidate=1800';
const ROUTE_HISTORY_CACHE_CONTROL = 'public, max-age=300, s-maxage=900, stale-while-revalidate=3600';

export function handleHealth(
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  args: { staticDir: string | null; startedAt: number }
) {
  return sendJson(response, 200, {
    requestId,
    ok: true,
    mode: args.staticDir ? 'one-origin' : 'api-only',
    uptimeSeconds: Math.round((Date.now() - args.startedAt) / 1000),
    startedAt: new Date(args.startedAt).toISOString(),
    riverCount: listRivers().length,
    cache: getCacheStats(),
  }, includeBody, 'no-store');
}

export function handleReady(
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  staticDir: string | null
) {
  const indexFile = staticDir ? resolveStaticFile('/', staticDir) : null;
  const ready = staticDir ? Boolean(indexFile) : true;

  return sendJson(response, ready ? 200 : 503, {
    requestId,
    ok: ready,
    mode: staticDir ? 'one-origin' : 'api-only',
    staticDir: staticDir ?? null,
    staticIndexReady: staticDir ? ready : null,
    riverCount: listRivers().length,
    cache: getCacheStats(),
  }, includeBody, 'no-store');
}

export async function handleRiverSummary(response: ServerResponse, requestId: string, includeBody: boolean) {
  const snapshot = await getStoredRiverSummarySnapshot().catch(() => null);
  if (snapshot) {
    return sendJson(response, 200, {
      requestId,
      generatedAt: snapshot.generatedAt,
      riverCount: snapshot.riverCount,
      rivers: snapshot.rivers,
    }, includeBody, LIVE_SUMMARY_CACHE_CONTROL);
  }

  const generatedAt = new Date().toISOString();
  const rivers = (await withTimeout(getAllRiverScores(), LIVE_SCORE_TIMEOUT_MS, 'river summary scoring')).map((result) => serializeSummaryResult({
    ...result,
    generatedAt,
  }));
  return sendJson(response, 200, {
    requestId,
    generatedAt,
    riverCount: rivers.length,
    rivers,
  }, includeBody, LIVE_SUMMARY_CACHE_CONTROL);
}

export async function handleWeekendSummary(response: ServerResponse, requestId: string, includeBody: boolean) {
  const snapshot = await getStoredWeekendSummarySnapshot().catch(() => null);
  if (snapshot) {
    return sendJson(response, 200, {
      requestId,
      generatedAt: snapshot.generatedAt,
      label: snapshot.label,
      riverCount: snapshot.riverCount,
      withheldCount: snapshot.withheldCount,
      rivers: snapshot.rivers,
    }, includeBody, LIVE_SUMMARY_CACHE_CONTROL);
  }

  const generatedAt = new Date().toISOString();
  const results = await withTimeout(getAllRiverScores(), LIVE_SCORE_TIMEOUT_MS, 'weekend summary scoring');
  const rivers = results
    .map((result) => serializeWeekendSummaryResult({
      ...result,
      generatedAt,
    }))
    .filter(Boolean);

  return sendJson(response, 200, {
    requestId,
    generatedAt,
    label: rivers[0]?.weekend.label ?? 'Weekend',
    riverCount: rivers.length,
    withheldCount: Math.max(0, results.length - rivers.length),
    rivers,
  }, includeBody, LIVE_SUMMARY_CACHE_CONTROL);
}

export async function handleRiverDetail(
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  slug: string,
  snapshotOnly = false,
) {
  let snapshot: Awaited<ReturnType<typeof getStoredRiverDetailSnapshot>> = null;
  try {
    snapshot = await getStoredRiverDetailSnapshot(slug);
  } catch (error) {
    console.error('[snapshots] detail read failed', {
      requestId,
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  if (snapshot && (snapshotOnly || snapshot.result.liveData.overall !== 'offline')) {
    return sendJson(response, 200, {
      requestId,
      generatedAt: snapshot.generatedAt,
      result: snapshot.result,
    }, includeBody, ROUTE_DETAIL_CACHE_CONTROL);
  }

  if (snapshotOnly) {
    return sendJson(
      response,
      503,
      {
        requestId,
        error: 'snapshot_unavailable',
        message: 'A stored river snapshot is not available.',
      },
      includeBody,
      'no-store',
    );
  }

  let result: Awaited<ReturnType<typeof getRiverScore>>;
  try {
    result = await withTimeout(getRiverScore(slug), LIVE_SCORE_TIMEOUT_MS, `river detail scoring for ${slug}`);
  } catch (error) {
    if (snapshot) {
      console.warn('[snapshots] live retry failed; serving stored offline detail', {
        requestId,
        slug,
        error: error instanceof Error ? error.message : String(error),
      });
      return sendJson(response, 200, {
        requestId,
        generatedAt: snapshot.generatedAt,
        result: snapshot.result,
      }, includeBody, ROUTE_DETAIL_CACHE_CONTROL);
    }
    throw error;
  }

  if (!result) {
    return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody);
  }

  if (snapshot && result.liveData.overall === 'offline') {
    return sendJson(response, 200, {
      requestId,
      generatedAt: snapshot.generatedAt,
      result: snapshot.result,
    }, includeBody, ROUTE_DETAIL_CACHE_CONTROL);
  }

  const generatedAt = new Date().toISOString();
  return sendJson(response, 200, {
    requestId,
    generatedAt,
    result: serializeDetailResult({ ...result, generatedAt }),
  }, includeBody, ROUTE_DETAIL_CACHE_CONTROL);
}

export async function handleRiverHistory(
  requestUrl: URL,
  _request: ApiRequest,
  response: ServerResponse,
  requestId: string,
  includeBody: boolean,
  slug: string
) {
  const river = getRiverBySlug(slug);
  if (!river) {
    return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody);
  }

  const days = parseQueryNumber(requestUrl.searchParams.get('days'), 7);
  const history = await getRiverHistory({ slug, days });

  return sendJson(response, 200, {
    requestId,
    generatedAt: new Date().toISOString(),
    result: serializeRiverHistoryResult({ river, history }),
  }, includeBody, ROUTE_HISTORY_CACHE_CONTROL);
}

export async function handleRiverGroup(response: ServerResponse, requestId: string, includeBody: boolean, riverId: string) {
  const snapshot = await getStoredRiverGroupSnapshot(riverId).catch(() => null);
  if (snapshot) {
    return sendJson(response, 200, {
      requestId,
      generatedAt: snapshot.generatedAt,
      result: snapshot.result,
    }, includeBody, ROUTE_DETAIL_CACHE_CONTROL);
  }

  const results = await withTimeout(getRiverGroupScores(riverId), LIVE_SCORE_TIMEOUT_MS, `river group scoring for ${riverId}`);
  if (!results) {
    return sendJson(response, 404, { requestId, error: 'not_found' }, includeBody);
  }

  const generatedAt = new Date().toISOString();
  return sendJson(response, 200, {
    requestId,
    generatedAt,
    result: serializeRiverGroupResult({
      riverId,
      routes: results.map((route) => ({ ...route, generatedAt })),
    }),
  }, includeBody, ROUTE_DETAIL_CACHE_CONTROL);
}
