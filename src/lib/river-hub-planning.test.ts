import { describe, expect, it } from 'vitest';
import {
  activeRiverHubFilterCount,
  defaultRiverHubFilters,
  riverHubFilterOptions,
} from './river-hub-planning.js';

describe('river hub planning controls', () => {
  it('resets every filter, including camping and route type', () => {
    expect(defaultRiverHubFilters()).toEqual({
      distance: 'all',
      difficulty: 'all',
      camping: 'all',
      routeType: 'all',
      region: 'all',
    });
  });

  it('only offers route type when coverage is complete and useful', () => {
    const partial = riverHubFilterOptions([
      { routeType: 'recreational' },
      { routeType: undefined },
    ]);
    const complete = riverHubFilterOptions([
      { routeType: 'recreational' },
      { routeType: 'whitewater' },
    ]);

    expect(partial.availability.routeType).toBe(false);
    expect(complete.availability.routeType).toBe(true);
    expect(complete.routeTypes).toEqual(['recreational', 'whitewater']);
  });

  it('hides filters that have only one meaningful choice', () => {
    const options = riverHubFilterOptions([
      {
        difficulty: 'easy',
        region: 'North Woods',
        campingClassification: 'none',
      },
      {
        difficulty: 'easy',
        region: 'North Woods',
        campingClassification: 'none',
      },
    ]);

    expect(options.availability).toEqual({
      difficulty: false,
      region: false,
      camping: false,
      routeType: false,
    });
  });

  it('counts active filters against the complete reset state', () => {
    expect(activeRiverHubFilterCount({
      ...defaultRiverHubFilters(),
      distance: 'medium',
      camping: 'available',
      routeType: 'whitewater',
    })).toBe(3);
  });
});
