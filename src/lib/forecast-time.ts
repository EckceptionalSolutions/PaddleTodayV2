type ForecastTimeContext = {
  timeZone?: string | null;
  referenceTime: string;
};

const SUNDAY_WEEKEND_ROLLOVER_HOUR = 18;
const ISO_DATE_PREFIX = /^(\d{4})-(\d{2})-(\d{2})/;
const ISO_LOCAL_TIME = /^\d{4}-\d{2}-\d{2}T(\d{2}):(\d{2})/;

export function formatForecastHourLabel(timestamp: string, context: ForecastTimeContext): string {
  const timeLabel = formatTime(timestamp, context.timeZone);
  const dateKey = forecastDateKey(timestamp, context.timeZone);
  const referenceDateKey = forecastDateKey(context.referenceTime, context.timeZone);

  if (!dateKey || !referenceDateKey || dateKey === referenceDateKey) {
    return timeLabel;
  }

  if (dateKey === addDaysToDateKey(referenceDateKey, 1)) {
    return `Tomorrow, ${timeLabel}`;
  }

  return `${weekdayLabel(dateKey)}, ${timeLabel}`;
}

export function forecastDateKey(timestamp: string, timeZone?: string | null): string | null {
  const date = new Date(timestamp);
  if (Number.isFinite(date.getTime()) && timeZone) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).formatToParts(date);
      const year = partValue(parts, 'year');
      const month = partValue(parts, 'month');
      const day = partValue(parts, 'day');
      if (year && month && day) {
        return `${year}-${month}-${day}`;
      }
    } catch {
      // Fall through to the timestamp's own offset-bearing calendar date.
    }
  }

  const match = timestamp.match(ISO_DATE_PREFIX);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

export function addDaysToDateKey(dateKey: string, days: number): string {
  const date = dateFromKey(dateKey);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function upcomingWeekendDateKeys(referenceTime: string, timeZone?: string | null) {
  const currentDateKey = forecastDateKey(referenceTime, timeZone);
  if (!currentDateKey) {
    return null;
  }

  const weekday = dateFromKey(currentDateKey).getUTCDay();
  if (weekday === 6) {
    return {
      saturday: currentDateKey,
      sunday: addDaysToDateKey(currentDateKey, 1),
    };
  }
  if (weekday === 0) {
    if (forecastHour(referenceTime, timeZone) >= SUNDAY_WEEKEND_ROLLOVER_HOUR) {
      const saturday = addDaysToDateKey(currentDateKey, 6);
      return {
        saturday,
        sunday: addDaysToDateKey(saturday, 1),
      };
    }
    return {
      saturday: addDaysToDateKey(currentDateKey, -1),
      sunday: currentDateKey,
    };
  }

  const daysUntilSaturday = 6 - weekday;
  const saturday = addDaysToDateKey(currentDateKey, daysUntilSaturday);
  return {
    saturday,
    sunday: addDaysToDateKey(saturday, 1),
  };
}

function forecastHour(timestamp: string, timeZone?: string | null) {
  const date = new Date(timestamp);
  if (Number.isFinite(date.getTime()) && timeZone) {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(date);
      const hour = Number(partValue(parts, 'hour'));
      if (Number.isFinite(hour)) {
        return hour;
      }
    } catch {
      // Fall through to the timestamp's own offset-bearing local clock time.
    }
  }

  const match = timestamp.match(ISO_LOCAL_TIME);
  return match ? Number(match[1]) : 0;
}

export function formatForecastDateKey(dateKey: string): string {
  return dateFromKey(dateKey).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
  });
}

function formatTime(timestamp: string, timeZone?: string | null): string {
  const date = new Date(timestamp);
  if (Number.isFinite(date.getTime()) && timeZone) {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
      }).format(date);
    } catch {
      // Fall through to the timestamp's offset-bearing local clock time.
    }
  }

  const match = timestamp.match(ISO_LOCAL_TIME);
  if (!match) {
    return 'Later';
  }

  const hour = Number(match[1]);
  const minute = match[2];
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

function weekdayLabel(dateKey: string): string {
  return dateFromKey(dateKey).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
  });
}

function dateFromKey(dateKey: string) {
  return new Date(`${dateKey}T12:00:00.000Z`);
}

function partValue(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  return parts.find((part) => part.type === type)?.value ?? null;
}
