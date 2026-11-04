type WeatherFailure = 'nws-fetch' | 'noaa-precip' | 'nws-grid' | 'unavailable';
type FailureCounts = { count: number; reasons: Record<string, number> };
const WINDOW_MS = 60_000;

function reason(error: unknown): string {
  const message = error instanceof Error ? error.message : '';
  const status = /\bHTTP ([1-5]\d{2})\b/.exec(message)?.[1];
  if (status) return ['403', '404', '429', '500', '502', '503', '504'].includes(status)
    ? `http-${status}` : `http-${status[0]}xx`;
  if (error instanceof Error && (error.name === 'AbortError' || /timeout|timed out/i.test(message))) return 'timeout';
  return error ? 'other-error' : 'missing-data';
}

function boundedText(value: string, length: number) {
  return value.slice(0, length).replace(/https?:\/\/[^\s)]+/g, '[url]');
}

export function createWeatherErrorReporter({ now = Date.now,
  write = (line: string, level: 'warn' | 'error' = 'warn') => console[level](line), windowMs = WINDOW_MS } = {}) {
  const counts = new Map<WeatherFailure, FailureCounts>();
  let startedAt = now();
  let timer: ReturnType<typeof setTimeout> | undefined;

  function flush() {
    if (timer) clearTimeout(timer);
    timer = undefined;
    if (counts.size) {
      write(`[weather] failure summary ${JSON.stringify({ since: new Date(startedAt).toISOString(),
        failures: Object.fromEntries([...counts].map(([event, value]) =>
          [event, { ...value, suppressed: value.count - 1 }])) })}`, counts.has('nws-fetch') ? 'error' : 'warn');
    }
    counts.clear();
    startedAt = now();
  }

  return {
    flush,
    report(event: WeatherFailure, location: string, error?: unknown) {
      if (counts.size && now() - startedAt >= windowMs) flush();
      if (!counts.size) {
        startedAt = now();
        timer = setTimeout(flush, windowMs);
        timer.unref?.();
      }
      const entry = counts.get(event) ?? { count: 0, reasons: {} };
      const kind = reason(error);
      entry.count++;
      entry.reasons[kind] = (entry.reasons[kind] ?? 0) + 1;
      counts.set(event, entry);
      // Coordinates never become map keys. One bounded stack per category/window.
      if (entry.count === 1) {
        write(`[weather] failure sample ${JSON.stringify({ event, location: boundedText(location, 80), reason: kind,
          ...(error instanceof Error ? { message: boundedText(error.message, 160),
            stack: boundedText((error.stack ?? '').slice(0, 1600).split('\n').slice(0, 8).join('\n'), 1600) } : {}) })}`,
          event === 'nws-fetch' ? 'error' : 'warn');
      }
    },
  };
}

const weatherErrorReporter = createWeatherErrorReporter();
export const reportWeatherFailure = weatherErrorReporter.report;
export const flushWeatherFailureLogs = weatherErrorReporter.flush;
