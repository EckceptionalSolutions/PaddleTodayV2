import { describe, expect, it, vi } from 'vitest';
import { createBoardPreferenceController } from './board-preference-controller.js';

function button(dataset = {}) {
  return {
    dataset,
    classList: { toggle: vi.fn() },
    setAttribute: vi.fn(),
  };
}

describe('board preference controller', () => {
  it('normalizes, persists, and rerenders shared preference changes', () => {
    const setRadius = vi.fn();
    const saveRadius = vi.fn();
    const updateLocationStatus = vi.fn();
    const renderBoard = vi.fn();
    const results = [{ id: 'rum' }];
    const controller = createBoardPreferenceController({
      getResults: () => results,
      renderBoard,
      updateLocationStatus,
      radius: {
        normalize: (value) => Math.max(10, Number(value)),
        setValue: setRadius,
        saveValue: saveRadius,
      },
      difficulty: {},
      paddleTime: {},
      nearbySort: {},
    });

    controller.setRadiusMiles(5);

    expect(setRadius).toHaveBeenCalledWith(10);
    expect(saveRadius).toHaveBeenCalledWith(10);
    expect(updateLocationStatus).toHaveBeenCalledOnce();
    expect(renderBoard).toHaveBeenCalledWith(results);
  });

  it('owns nearby sorting and active filter button presentation', () => {
    const filterButton = button({ filterToggle: 'paddleable' });
    const glanceButton = button({ glanceFilter: 'Strong' });
    const select = { value: '' };
    const setNearbySort = vi.fn();
    const controller = createBoardPreferenceController({
      getResults: () => [],
      renderBoard: vi.fn(),
      updateLocationStatus: vi.fn(),
      radius: {},
      difficulty: {},
      paddleTime: {},
      nearbySort: {
        options: ['best-score', 'closest'],
        fallback: 'best-score',
        setValue: setNearbySort,
        select,
      },
      filterButtons: [filterButton],
      glanceFilterButtons: [glanceButton],
      getActiveFilters: () => ({ paddleable: true, rating: 'Strong' }),
    });

    controller.setNearbySortMode('unknown');
    expect(setNearbySort).toHaveBeenCalledWith('best-score');
    expect(select.value).toBe('best-score');

    controller.updateFilterButtonStates();
    expect(filterButton.classList.toggle).toHaveBeenCalledWith('filter-chip--active', true);
    expect(filterButton.setAttribute).toHaveBeenCalledWith('aria-pressed', 'true');
    expect(glanceButton.classList.toggle).toHaveBeenCalledWith(
      'hero__call-mix-button--active',
      true,
    );
  });
});
