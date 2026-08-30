function defaultGeneratedAtLabel(value) {
  return new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function defaultJoinWithBullet(parts) {
  return parts.filter(Boolean).join(' • ');
}

export function boardSummaryStatusCopy(
  items,
  routeResults,
  {
    formatGeneratedAt = defaultGeneratedAtLabel,
    joinWithBullet = defaultJoinWithBullet,
  } = {},
) {
  if (items.length === 0) {
    return {
      headline: 'No results match the current filters.',
      detail: 'Clear a filter to bring results back.',
    };
  }

  const visibleRoutes = items.map((item) => item.cardRoute);
  const liveCount = visibleRoutes.filter((result) => result.liveData.overall === 'live').length;
  const degradedCount = visibleRoutes.filter((result) => result.liveData.overall === 'degraded').length;
  const offlineCount = visibleRoutes.filter((result) => result.liveData.overall === 'offline').length;
  const generatedAt = routeResults[0]?.generatedAt
    ? formatGeneratedAt(routeResults[0].generatedAt)
    : 'unknown time';

  if (offlineCount > 0) {
    return {
      headline: `Updated ${generatedAt}`,
      detail: joinWithBullet([
        `${offlineCount} offline`,
        `${degradedCount} limited`,
        `${liveCount} live`,
      ]),
    };
  }

  if (degradedCount > 0) {
    return {
      headline: `Updated ${generatedAt}`,
      detail: joinWithBullet([`${degradedCount} limited`, `${liveCount} live`]),
    };
  }

  return {
    headline: `Updated ${generatedAt}`,
    detail: `${liveCount} results live`,
  };
}

export function createBoardStatusController({
  elements = {},
  getLastSuccessAt = () => null,
  refreshReadyLabel = 'Refresh board',
  formatRefreshCopy,
  joinWithBullet,
}) {
  const {
    summaryHeadline,
    summaryDetail,
    boardStatusBanner,
    boardFetchBanner,
    boardFetchTitle,
    boardFetchDetail,
    boardRefreshButton,
    boardRefreshNote,
    recommendationSummary,
  } = elements;

  function updateSummaryStatus(items, routeResults) {
    if (!summaryHeadline || !summaryDetail) {
      return;
    }

    const copy = boardSummaryStatusCopy(items, routeResults, { joinWithBullet });
    summaryHeadline.textContent = copy.headline;
    summaryDetail.textContent = copy.detail;
  }

  function setBoardRefreshState(state, detail = '') {
    if (boardRefreshButton) {
      boardRefreshButton.disabled = state === 'loading';
      boardRefreshButton.textContent = state === 'loading'
        ? 'Refreshing...'
        : refreshReadyLabel;
    }

    if (!boardRefreshNote) {
      return;
    }

    if (state === 'loading') {
      boardRefreshNote.textContent =
        'Snapshot refreshes every 30 minutes. Checking for a newer board.';
      return;
    }

    if (state === 'error') {
      boardRefreshNote.textContent = detail || 'Last refresh failed.';
      return;
    }

    const lastSuccessAt = getLastSuccessAt();
    boardRefreshNote.textContent = lastSuccessAt
      ? formatRefreshCopy(lastSuccessAt)
      : formatRefreshCopy();
  }

  function setBoardFetchBannerState(kind, detail) {
    if (!boardFetchBanner) {
      return;
    }

    boardFetchBanner.classList.toggle('status-banner--hidden', kind === 'hidden');
    if (kind === 'hidden') {
      boardFetchBanner.hidden = true;
      if (boardStatusBanner) {
        boardStatusBanner.classList.add('status-banner--hidden');
        boardStatusBanner.hidden = true;
      }
      return;
    }

    boardFetchBanner.hidden = false;
    if (boardStatusBanner) {
      boardStatusBanner.classList.add('status-banner--hidden');
      boardStatusBanner.hidden = true;
    }
    boardFetchBanner.classList.remove(
      'status-banner--offline',
      'status-banner--live',
      'status-banner--degraded',
      'status-banner--loading',
    );
    boardFetchBanner.classList.add(
      kind === 'stale' ? 'status-banner--degraded' : 'status-banner--offline',
    );
    if (boardFetchTitle) {
      boardFetchTitle.textContent = kind === 'stale'
        ? 'Showing the last successful snapshot.'
        : kind === 'initial'
          ? 'Live board could not be loaded.'
          : 'Live board could not be refreshed.';
    }
    if (boardFetchDetail) {
      boardFetchDetail.textContent = detail;
    }
  }

  function setCachedRefreshNote(fetchedAt) {
    if (boardRefreshNote) {
      boardRefreshNote.textContent = `${formatRefreshCopy(fetchedAt)} Refreshing now...`;
    }
  }

  function showInitialFailure() {
    if (summaryHeadline) {
      summaryHeadline.textContent = 'Live river status is unavailable.';
    }
    if (summaryDetail) {
      summaryDetail.textContent = 'Current gauge and weather reads could not load.';
    }
    if (recommendationSummary) {
      recommendationSummary.textContent =
        'Recommendations are unavailable until the board loads again.';
    }
  }

  return {
    setBoardFetchBannerState,
    setBoardRefreshState,
    setCachedRefreshNote,
    showInitialFailure,
    updateSummaryStatus,
  };
}
