import { fetchRecentRainTotals } from './noaa-precip';
import { fetchNwsWeatherSnapshot } from './nws';
import type { WeatherSnapshot } from './types';

export async function fetchWeatherSnapshot(latitude: number, longitude: number): Promise<WeatherSnapshot | null> {
  const [weather, rain] = await Promise.all([
    fetchNwsWeatherSnapshot(latitude, longitude).catch(() => null),
    fetchRecentRainTotals(latitude, longitude).catch(() => ({
      recentRain24hIn: null,
      recentRain72hIn: null,
      rainfallSource: null,
    })),
  ]);

  if (!weather) {
    return null;
  }

  return {
    ...weather,
    recentRain24hIn: rain.recentRain24hIn,
    recentRain72hIn: rain.recentRain72hIn,
    rainfallSource: rain.rainfallSource,
  };
}
