import {
  freshnessLabel,
  readCachedPayload,
  writeCachedPayload,
} from './client-cache.js';
import { getBrowserApiClient } from './browser-api-client.js';
import { createRequestGuard, isAbortError } from './request-guard.js';

export function createBoardLoaderController({
  cacheKey,
  getState,
  setLoadedState,
  renderBoard,
  updateFreshness,
  setFetchBannerState,
  setRefreshState,
  setCachedRefreshNote = () => {},
  showInitialFailure,
  requestGuard = createRequestGuard(),
  apiClient = getBrowserApiClient(),
  writeCache = writeCachedPayload,
  readCache = readCachedPayload,
  formatFreshness = freshnessLabel,
  now = () => Date.now(),
  logError = (error) => console.error('Failed to load river scores on summary page.', error),
}) {
  function hydrateBoardFromCache() {
    const cached = readCache(cacheKey);
    const rivers = Array.isArray(cached?.payload?.rivers)
      ? cached.payload.rivers
      : null;
    if (!rivers || rivers.length === 0) {
      return false;
    }

    const generatedAt = typeof cached.payload?.generatedAt === 'string'
      ? cached.payload.generatedAt
      : null;
    const staleSnapshot = cached.payload?.snapshotStatus === 'stale';
    setLoadedState({
      latestResults: rivers,
      hasLoadedBoardOnce: true,
      lastBoardSuccessAt: cached.fetchedAt,
      lastBoardGeneratedAt: generatedAt,
    });
    setFetchBannerState(
      staleSnapshot ? 'stale' : 'hidden',
      staleSnapshot ? 'The snapshot worker is delayed. Verify conditions before driving or launching.' : undefined,
    );
    renderBoard(rivers);
    updateFreshness({
      generatedAt,
      ...(staleSnapshot ? { fallback: true } : { refreshing: true }),
    });
    setCachedRefreshNote(cached.fetchedAt);
    return true;
  }

  async function loadBoard({
    silent = false,
    preserveMapViewport = getState().hasLoadedBoardOnce,
  } = {}) {
    const { requestId, controller } = requestGuard.begin();
    const stateAtStart = getState();

    if (!silent) {
      setRefreshState('loading');
    }

    try {
      if (silent && (stateAtStart.lastBoardGeneratedAt || stateAtStart.hasLoadedBoardOnce)) {
        updateFreshness({
          generatedAt: stateAtStart.lastBoardGeneratedAt,
          refreshing: true,
        });
      }

      const payload = await apiClient.getSummary({
        cache: 'no-store',
        signal: controller.signal,
      });
      if (!requestGuard.isCurrent(requestId)) {
        return;
      }

      const results = Array.isArray(payload?.rivers) ? payload.rivers : [];
      const generatedAt = typeof payload?.generatedAt === 'string'
        ? payload.generatedAt
        : null;
      const staleSnapshot = payload?.snapshotStatus === 'stale';
      setLoadedState({
        latestResults: results,
        lastBoardGeneratedAt: generatedAt,
        hasLoadedBoardOnce: true,
        lastBoardSuccessAt: now(),
      });
      writeCache(cacheKey, payload);
      setFetchBannerState(
        staleSnapshot ? 'stale' : 'hidden',
        staleSnapshot ? 'The snapshot worker is delayed. Verify conditions before driving or launching.' : undefined,
      );
      setRefreshState(
        staleSnapshot ? 'error' : 'ready',
        staleSnapshot ? 'Latest snapshot is stale. The board will recover automatically after a successful worker run.' : undefined,
      );
      renderBoard(results, { preserveMapViewport });
      updateFreshness({
        generatedAt,
        ...(staleSnapshot ? { fallback: true } : {}),
      });
    } catch (error) {
      if (isAbortError(error) || !requestGuard.isCurrent(requestId)) {
        return;
      }

      logError(error);
      const currentState = getState();
      if (currentState.hasLoadedBoardOnce) {
        setFetchBannerState('hidden');
        setRefreshState(
          'error',
          `${formatFreshness(currentState.lastBoardSuccessAt)}. Showing latest available data.`,
        );
        updateFreshness({
          generatedAt: currentState.lastBoardGeneratedAt,
          fallback: true,
        });
        return;
      }

      setFetchBannerState(
        'initial',
        'Live board could not load. Retry the board, then open a river page if you need to verify the sources.',
      );
      setRefreshState('error', 'Last refresh failed. Retry now.');
      showInitialFailure();
      updateFreshness();
    } finally {
      requestGuard.finish(controller);
    }
  }

  return { hydrateBoardFromCache, loadBoard };
}
