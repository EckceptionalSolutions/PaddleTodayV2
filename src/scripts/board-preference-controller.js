export function createBoardPreferenceController({
  getResults,
  renderBoard,
  updateLocationStatus,
  radius,
  difficulty,
  paddleTime,
  nearbySort,
  filterButtons = [],
  glanceFilterButtons = [],
  getActiveFilters = () => ({}),
}) {
  function applyPreference(value, policy, { persist = true, rerender = true } = {}) {
    const normalized = policy.normalize(value);
    policy.setValue(normalized);
    if (persist) {
      policy.saveValue(normalized);
    }
    updateLocationStatus();
    const results = getResults();
    if (rerender && results.length > 0) {
      renderBoard(results);
    }
  }

  function setRadiusMiles(value, options) {
    applyPreference(value, radius, options);
  }

  function setHomeDifficultyFilter(value, options) {
    applyPreference(value, difficulty, options);
  }

  function setHomePaddleTimeFilter(value, options) {
    applyPreference(value, paddleTime, options);
  }

  function setNearbySortMode(value, { rerender = true } = {}) {
    const nextValue = nearbySort.options.includes(value)
      ? value
      : nearbySort.fallback;
    nearbySort.setValue(nextValue);
    if (nearbySort.select) {
      nearbySort.select.value = nextValue;
    }
    const results = getResults();
    if (rerender && results.length > 0) {
      renderBoard(results);
    }
  }

  function updateFilterButtonStates() {
    const activeFilters = getActiveFilters();
    for (const button of filterButtons) {
      if (!button) continue;
      const key = button.dataset.filterToggle;
      const active = key ? Boolean(activeFilters[key]) : false;
      button.classList.toggle('filter-chip--active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    }

    for (const button of glanceFilterButtons) {
      if (!button) continue;
      const rating = button.dataset.glanceFilter || '';
      const active = activeFilters.rating === rating;
      button.classList.toggle('hero__call-mix-button--active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  return {
    setHomeDifficultyFilter,
    setHomePaddleTimeFilter,
    setNearbySortMode,
    setRadiusMiles,
    updateFilterButtonStates,
  };
}
