import type { WeatherSnapshot } from '@paddletoday/api-contract';

const HOUR = 60 * 60 * 1000;
export function currentWeatherView(weather: WeatherSnapshot | null, sourceUnavailable: boolean, now = Date.now()) {
  const hours = weather?.todayHourly ?? [];
  const upcoming = hours.filter(point => {
    const time = Date.parse(point.time);
    return Number.isFinite(time) && time + HOUR > now;
  }).sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
  const first = upcoming[0] ? Date.parse(upcoming[0].time) : NaN;
  const reference = sourceUnavailable || (hours.length > 0 && (!Number.isFinite(first) || first > now));
  return { reference, now, weather: weather && !reference ? { ...weather,
    todayHourly: upcoming.map(point => ({ ...point, label: weatherHourLabel(point.time, false, now) })) } : weather };
}

export function weatherHourLabel(time: string, reference: boolean, now: number) {
  const date = new Date(time);
  if (!Number.isFinite(date.getTime())) return 'Time unavailable';
  if (reference) return date.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  if (date.getTime() <= now && date.getTime() + HOUR > now) return 'Now';
  return date.toLocaleString(undefined, { ...(date.toDateString() === new Date(now).toDateString() ? {} : { weekday: 'short' as const }), hour: 'numeric', minute: '2-digit' });
}
