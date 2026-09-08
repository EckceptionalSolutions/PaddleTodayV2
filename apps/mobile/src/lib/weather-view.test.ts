import { describe, expect, it } from 'vitest';
import type { WeatherSnapshot } from '@paddletoday/api-contract';
import fixture from '../../../../tests/mobile-web/fixtures/route-detail.json';
import { currentWeatherView, weatherHourLabel } from './weather-view';
const now = Date.parse('2030-06-15T12:30:00Z');
function weather(times: string[]): WeatherSnapshot {
  return { ...fixture.result.weather, todayHourly: times.map(time => ({ ...fixture.result.weather.todayHourly[0], time })) } as WeatherSnapshot;
}
describe('weather presentation time boundaries', () => {
  it('drops elapsed hours and only calls the actual current hour Now', () => {
    const source = weather(['2030-06-15T11:00:00Z', '2030-06-15T12:00:00Z', '2030-06-15T13:00:00Z']);
    const view = currentWeatherView(source, false, now);
    expect(view.reference).toBe(false);
    expect(view.weather?.todayHourly).toHaveLength(2);
    expect(source.todayHourly).toHaveLength(3);
    expect(view.weather!.todayHourly[0].label).toBe('Now');
    expect(weatherHourLabel(view.weather!.todayHourly[0].time, false, now)).toBe('Now');
    expect(weatherHourLabel(view.weather!.todayHourly[1].time, false, now)).not.toBe('Now');
  });
  it('keeps old or unavailable data as dated reference even with a fresh outer response', () => {
    for (const [time, unavailable] of [['2020-06-15T12:00:00Z', false], ['2030-06-15T12:00:00Z', true], ['invalid', false], ['2030-06-15T13:00:00Z', false]] as const) {
      const view = currentWeatherView(weather([time]), unavailable, now);
      expect(view.reference).toBe(true);
      expect(weatherHourLabel(time, true, now)).not.toBe('Now');
    }
    expect(weatherHourLabel('invalid', true, now)).toBe('Time unavailable');
  });
  it('does not fabricate hourly weather when no points are available', () => {
    expect(currentWeatherView(null, true, now).weather).toBeNull();
    expect(currentWeatherView(weather([]), false, now).weather?.todayHourly).toEqual([]);
  });
});
