import { fetchRecentRainTotals } from './noaa-precip';
import { fetchNwsWeatherSnapshot } from './nws';
import type { WeatherSnapshot } from './types';

export async function fetchWeatherSnapshot(latitude: number, longitude: number): Promise<WeatherSnapshot | null> {
  const locationLabel = `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
  const [weather, rain] = await Promise.all([
    fetchNwsWeatherSnapshot(latitude, longitude).catch((error) => {
      console.error(`[weather] NWS fetch failed for ${locationLabel}`, error);
      return null;
    }),
    fetchRecentRainTotals(latitude, longitude).catch((error) => {
      console.warn(`[weather] NOAA precip fetch failed for ${locationLabel}`, error);
      return {
        recentRain24hIn: null,
        recentRain72hIn: null,
        rainfallSource: null,
      };
    }),
  ]);

  if (!weather) {
    console.warn(`[weather] Weather snapshot unavailable for ${locationLabel}`);
    return null;
  }

  return {
    ...weather,
    recentRain24hIn: rain.recentRain24hIn,
    recentRain72hIn: rain.recentRain72hIn,
    rainfallSource: rain.rainfallSource,
  };
}
