import { describe, expect, it } from 'vitest';
import { isColdWeatherDrivenCall } from './presentation';

describe('shared presentation policy', () => {
  it('identifies a cold-weather-driven recommendation consistently', () => {
    expect(isColdWeatherDrivenCall({
      temperatureF: 38,
      next12hWindMphMax: 12,
      next12hPrecipProbabilityMax: 20,
    }, 'ideal')).toBe(true);

    expect(isColdWeatherDrivenCall({ temperatureF: 50 }, 'ideal')).toBe(false);
    expect(isColdWeatherDrivenCall({ temperatureF: 38 }, 'too-low')).toBe(false);
    expect(isColdWeatherDrivenCall({
      temperatureF: 38,
      next12hStormRisk: true,
    }, 'ideal')).toBe(false);
    expect(isColdWeatherDrivenCall({
      temperatureF: 38,
      next12hWindMphMax: 22,
      next12hPrecipProbabilityMax: 75,
    }, 'ideal')).toBe(false);
  });
});
