import { describe, expect, it, vi } from 'vitest';
import {
  boardSummaryStatusCopy,
  createBoardStatusController,
} from './board-status-controller.js';

function element() {
  const classes = new Set<string>();
  return {
    classList: {
      add: vi.fn((...names: string[]) => names.forEach((name) => classes.add(name))),
      remove: vi.fn((...names: string[]) => names.forEach((name) => classes.delete(name))),
      toggle: vi.fn((name: string, force: boolean) => {
        if (force) classes.add(name);
        else classes.delete(name);
      }),
    },
    disabled: false,
    hidden: false,
    textContent: '',
    classes,
  };
}

describe('board status controller', () => {
  it('summarizes the visible live-data states from one shared policy', () => {
    const items = ['live', 'degraded', 'offline'].map((overall) => ({
      cardRoute: { liveData: { overall } },
    }));

    expect(boardSummaryStatusCopy(items, [{ generatedAt: 'now' }], {
      formatGeneratedAt: () => 'Jul 27, 12:00 PM',
    })).toEqual({
      headline: 'Updated Jul 27, 12:00 PM',
      detail: '1 offline • 1 limited • 1 live',
    });
    expect(boardSummaryStatusCopy([], [])).toEqual({
      headline: 'No results match the current filters.',
      detail: 'Clear a filter to bring results back.',
    });
  });

  it('owns refresh, fetch-failure, and initial-failure presentation', () => {
    const elements = {
      summaryHeadline: element(),
      summaryDetail: element(),
      boardStatusBanner: element(),
      boardFetchBanner: element(),
      boardFetchTitle: element(),
      boardFetchDetail: element(),
      boardRefreshButton: element(),
      boardRefreshNote: element(),
      recommendationSummary: element(),
    };
    const controller = createBoardStatusController({
      elements,
      getLastSuccessAt: () => 42,
      refreshReadyLabel: 'Refresh data',
      formatRefreshCopy: (value?: number) => value ? `Updated ${value}` : 'Not updated',
    });

    controller.setBoardRefreshState('loading');
    expect(elements.boardRefreshButton).toMatchObject({
      disabled: true,
      textContent: 'Refreshing...',
    });

    controller.setBoardRefreshState('ready');
    expect(elements.boardRefreshButton).toMatchObject({
      disabled: false,
      textContent: 'Refresh data',
    });
    expect(elements.boardRefreshNote.textContent).toBe('Updated 42');

    controller.setBoardFetchBannerState('initial', 'Retry soon.');
    expect(elements.boardFetchBanner.hidden).toBe(false);
    expect(elements.boardFetchTitle.textContent).toBe('Live board could not be loaded.');
    expect(elements.boardFetchDetail.textContent).toBe('Retry soon.');
    expect(elements.boardFetchBanner.classes).toContain('status-banner--offline');

    controller.setBoardFetchBannerState('stale', 'Verify before launching.');
    expect(elements.boardFetchTitle.textContent).toBe('Showing the last successful snapshot.');
    expect(elements.boardFetchBanner.classes).toContain('status-banner--degraded');
    expect(elements.boardFetchBanner.classes).not.toContain('status-banner--offline');

    controller.setBoardFetchBannerState('hidden');
    expect(elements.boardFetchBanner.hidden).toBe(true);
    expect(elements.boardStatusBanner.hidden).toBe(true);

    controller.showInitialFailure();
    expect(elements.summaryHeadline.textContent).toBe('Live river status is unavailable.');
    expect(elements.recommendationSummary.textContent).toContain('unavailable');
  });
});
