import { describe, expect, it, vi } from 'vitest';
import { createBoardLoaderController } from './board-loader-controller.js';

function harness(overrides = {}) {
  let state = {
    hasLoadedBoardOnce: false,
    lastBoardGeneratedAt: null,
    lastBoardSuccessAt: null,
  };
  const controller = { signal: {} };
  const requestGuard = {
    begin: vi.fn(() => ({ requestId: 1, controller })),
    isCurrent: vi.fn(() => true),
    finish: vi.fn(),
  };
  const callbacks = {
    renderBoard: vi.fn(),
    updateFreshness: vi.fn(),
    setFetchBannerState: vi.fn(),
    setRefreshState: vi.fn(),
    setCachedRefreshNote: vi.fn(),
    showInitialFailure: vi.fn(),
    writeCache: vi.fn(),
    logError: vi.fn(),
  };
  const apiClient = {
    getSummary: vi.fn().mockResolvedValue({
      generatedAt: '2026-07-27T12:00:00.000Z',
      rivers: [{ id: 'st-croix' }],
    }),
  };
  const loader = createBoardLoaderController({
    cacheKey: 'summary',
    getState: () => state,
    setLoadedState: (nextState) => {
      state = { ...state, ...nextState };
    },
    requestGuard,
    apiClient,
    now: () => 42,
    formatFreshness: () => 'Updated recently',
    ...callbacks,
    ...overrides,
  });
  return { loader, apiClient, callbacks, requestGuard, state: () => state };
}

describe('board loader controller', () => {
  it('loads, caches, and renders the current board response', async () => {
    const { loader, apiClient, callbacks, requestGuard, state } = harness();

    await loader.loadBoard({ preserveMapViewport: true });

    expect(apiClient.getSummary).toHaveBeenCalledWith({
      cache: 'no-store',
      signal: {},
    });
    expect(state()).toEqual({
      latestResults: [{ id: 'st-croix' }],
      lastBoardGeneratedAt: '2026-07-27T12:00:00.000Z',
      hasLoadedBoardOnce: true,
      lastBoardSuccessAt: 42,
    });
    expect(callbacks.writeCache).toHaveBeenCalledWith('summary', {
      generatedAt: '2026-07-27T12:00:00.000Z',
      rivers: [{ id: 'st-croix' }],
    });
    expect(callbacks.renderBoard).toHaveBeenCalledWith(
      [{ id: 'st-croix' }],
      { preserveMapViewport: true },
    );
    expect(requestGuard.finish).toHaveBeenCalledOnce();
  });

  it('renders a stale API snapshot while clearly marking it degraded', async () => {
    const apiClient = {
      getSummary: vi.fn().mockResolvedValue({
        generatedAt: '2026-07-27T08:00:00.000Z',
        snapshotStatus: 'stale',
        snapshotAgeSeconds: 14_400,
        rivers: [{ id: 'st-croix' }],
      }),
    };
    const { loader, callbacks } = harness({ apiClient });

    await loader.loadBoard();

    expect(callbacks.renderBoard).toHaveBeenCalledWith(
      [{ id: 'st-croix' }],
      { preserveMapViewport: false },
    );
    expect(callbacks.setFetchBannerState).toHaveBeenCalledWith(
      'stale',
      expect.stringContaining('snapshot worker is delayed'),
    );
    expect(callbacks.setRefreshState).toHaveBeenCalledWith(
      'error',
      expect.stringContaining('Latest snapshot is stale'),
    );
    expect(callbacks.updateFreshness).toHaveBeenLastCalledWith({
      generatedAt: '2026-07-27T08:00:00.000Z',
      fallback: true,
    });
  });

  it('hydrates cached board state through the same render lifecycle', () => {
    const readCache = vi.fn(() => ({
      fetchedAt: 21,
      payload: {
        generatedAt: '2026-07-27T11:00:00.000Z',
        rivers: [{ id: 'rum' }],
      },
    }));
    const { loader, callbacks, state } = harness({ readCache });

    expect(loader.hydrateBoardFromCache()).toBe(true);
    expect(state()).toEqual({
      latestResults: [{ id: 'rum' }],
      lastBoardGeneratedAt: '2026-07-27T11:00:00.000Z',
      hasLoadedBoardOnce: true,
      lastBoardSuccessAt: 21,
    });
    expect(callbacks.renderBoard).toHaveBeenCalledWith([{ id: 'rum' }]);
    expect(callbacks.updateFreshness).toHaveBeenCalledWith({
      generatedAt: '2026-07-27T11:00:00.000Z',
      refreshing: true,
    });
    expect(callbacks.setCachedRefreshNote).toHaveBeenCalledWith(21);
  });

  it('keeps prior data visible when a refresh fails', async () => {
    const error = new Error('offline');
    const apiClient = { getSummary: vi.fn().mockRejectedValue(error) };
    const getState = () => ({
      hasLoadedBoardOnce: true,
      lastBoardGeneratedAt: '2026-07-27T12:00:00.000Z',
      lastBoardSuccessAt: 42,
    });
    const { loader, callbacks } = harness({ apiClient, getState });

    await loader.loadBoard({ silent: true });

    expect(callbacks.updateFreshness).toHaveBeenNthCalledWith(1, {
      generatedAt: '2026-07-27T12:00:00.000Z',
      refreshing: true,
    });
    expect(callbacks.setRefreshState).toHaveBeenCalledWith(
      'error',
      'Updated recently. Showing latest available data.',
    );
    expect(callbacks.updateFreshness).toHaveBeenLastCalledWith({
      generatedAt: '2026-07-27T12:00:00.000Z',
      fallback: true,
    });
    expect(callbacks.showInitialFailure).not.toHaveBeenCalled();
  });

  it('shows the initial failure state when no board has loaded', async () => {
    const apiClient = { getSummary: vi.fn().mockRejectedValue(new Error('offline')) };
    const { loader, callbacks } = harness({ apiClient });

    await loader.loadBoard();

    expect(callbacks.setFetchBannerState).toHaveBeenCalledWith(
      'initial',
      expect.stringContaining('Live board could not load'),
    );
    expect(callbacks.setRefreshState).toHaveBeenCalledWith(
      'error',
      'Last refresh failed. Retry now.',
    );
    expect(callbacks.showInitialFailure).toHaveBeenCalledOnce();
    expect(callbacks.updateFreshness).toHaveBeenLastCalledWith();
  });
});
