import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchWeatherSnapshot } from './weather';
import { fetchNwsWeatherSnapshot } from './nws';
import { fetchRecentRainTotals } from './noaa-precip';
import { reportWeatherFailure } from './weather-error-logging';

vi.mock('./nws', () => ({ fetchNwsWeatherSnapshot: vi.fn() }));
vi.mock('./noaa-precip', () => ({ fetchRecentRainTotals: vi.fn() }));
vi.mock('./weather-error-logging', () => ({ reportWeatherFailure: vi.fn() }));
beforeEach(() => { vi.resetAllMocks(); });

describe('weather failure logging integration', () => {
  it('preserves missing weather behavior and records both provider failures', async () => {
    const error = new Error('HTTP 403');
    vi.mocked(fetchNwsWeatherSnapshot).mockRejectedValue(error);
    vi.mocked(fetchRecentRainTotals).mockRejectedValue(error);
    expect(await fetchWeatherSnapshot(44, -90)).toBeNull();
    expect(reportWeatherFailure).toHaveBeenCalledWith('nws-fetch', '44.00000,-90.00000', error);
    expect(reportWeatherFailure).toHaveBeenCalledWith('noaa-precip', '44.00000,-90.00000', error);
    expect(reportWeatherFailure).toHaveBeenCalledWith('unavailable', '44.00000,-90.00000');
  });

  it('retains usable weather when precipitation fails', async () => {
    vi.mocked(fetchNwsWeatherSnapshot).mockResolvedValue({ temperatureF: 65 } as any);
    vi.mocked(fetchRecentRainTotals).mockRejectedValue(new Error('HTTP 503'));
    expect(await fetchWeatherSnapshot(44, -90)).toMatchObject({ temperatureF: 65,
      recentRain24hIn: null, recentRain72hIn: null, rainfallSource: null });
    expect(reportWeatherFailure).toHaveBeenCalledTimes(1);
  });

  it('does not log on successful weather reads', async () => {
    vi.mocked(fetchNwsWeatherSnapshot).mockResolvedValue({ temperatureF: 65 } as any);
    vi.mocked(fetchRecentRainTotals).mockResolvedValue({ recentRain24hIn: 1, recentRain72hIn: 2, rainfallSource: 'NOAA' });
    expect(await fetchWeatherSnapshot(44, -90)).toMatchObject({ recentRain24hIn: 1 });
    expect(reportWeatherFailure).not.toHaveBeenCalled();
  });
});
