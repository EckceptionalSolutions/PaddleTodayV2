import { describe, expect, it } from 'vitest';
import { distanceRangeForLabels } from './api-contract';

describe('river hub distance ranges', () => {
  it('ignores the Route 28 context in the West Canada Creek labels', () => {
    expect(distanceRangeForLabels([
      '5.3 whitewater river miles from the Fayle Road hand launch to Nobleboro',
      'About 5.7 river miles from Middleville to Kast Bridge',
      'Approximately 3 river miles from Partridge Hill Road to the Route 28 overlook',
    ])).toEqual({ minMiles: 3, maxMiles: 5.7, label: '3–5.7 mi' });
  });

  it('finds mileage after road names without treating hours or road numbers as miles', () => {
    expect(distanceRangeForLabels(['Route 28 to Route 9: approximately 6 river miles; allow 2–4 hours']))
      .toEqual({ minMiles: 6, maxMiles: 6, label: '6–6 mi' });
  });

  it('retains explicit mileage ranges and short loops', () => {
    expect(distanceRangeForLabels(['Current map describes a 2–4.4 mile itinerary', '0.5-mile loop']))
      .toEqual({ minMiles: 0.5, maxMiles: 4.4, label: '0.5–4.4 mi' });
  });

  it('leaves unquantified or non-mileage labels unquantified', () => {
    expect(distanceRangeForLabels([null, undefined, 'Distance controlled by current map', '2–4 hours along Route 221']))
      .toBeNull();
  });

  it('keeps short-trip precision instead of rounding a fractional-mile route toward zero', () => {
    expect(distanceRangeForLabels(['0.15-mile park loop', '12 river miles']))
      .toEqual({ minMiles: 0.15, maxMiles: 12, label: '0.15–12 mi' });
  });
});
