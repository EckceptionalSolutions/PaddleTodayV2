import { fetchRecentRainTotals } from './noaa-precip';
import { fetchNwsWeatherSnapshot } from './nws';
import type { WeatherSnapshot } from './types';
import { reportWeatherFailure } from './weather-error-logging';

export async function fetchWeatherSnapshot(latitude: number, longitude: number): Promise<WeatherSnapshot | null> {
  const locationLabel = `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
  const [weather, rain] = await Promise.all([
    fetchNwsWeatherSnapshot(latitude, longitude).catch((error) => {
      reportWeatherFailure('nws-fetch', locationLabel, error);
      return null;
    }),
    fetchRecentRainTotals(latitude, longitude).catch((error) => {
      reportWeatherFailure('noaa-precip', locationLabel, error);
      return {
        recentRain24hIn: null,
        recentRain72hIn: null,
        rainfallSource: null,
      };
    }),
  ]);

  if (!weather) {
    reportWeatherFailure('unavailable', locationLabel);
    return null;
  }

  return {
    ...weather,
    recentRain24hIn: rain.recentRain24hIn,
    recentRain72hIn: rain.recentRain72hIn,
    rainfallSource: rain.rainfallSource,
  };
}
