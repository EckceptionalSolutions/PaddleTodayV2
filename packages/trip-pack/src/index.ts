export interface TripPackAccessPoint {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
  note?: string;
}

/** Shared trip details used by calendar and float-plan exports. */
export interface TripPlanInput {
  routeSlug: string;
  riverName: string;
  reach: string;
  routeUrl: string;
  putIn: TripPackAccessPoint;
  takeOut: TripPackAccessPoint;
  intermediateAccessPoints?: readonly TripPackAccessPoint[];
  distanceMiles?: number | null;
  estimatedPaddleTime?: string | null;
  launchAt?: Date | null;
  expectedTakeOutAt?: Date | null;
  checkInAt?: Date | null;
  timeZone?: string | null;
  groupSize?: number | null;
  boatDescription?: string | null;
  vehicleDescription?: string | null;
  note?: string | null;
}

/** A trip plan with canonical geometry, required for GPX export. */
export interface GpxTripPlan extends TripPlanInput {
  routeCoordinates: readonly TripPackCoordinate[];
}

export interface TripPackCoordinate {
  latitude: number;
  longitude: number;
  elevation?: number | null;
  timestamp?: Date | null;
}

export interface CalendarEventPayload {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  notes: string;
  alarms: Array<{ relativeOffsetMinutes: number }>;
}

function finiteCoordinate(point: { latitude: number; longitude: number }) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

function xmlEscape(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function icsEscape(value: unknown) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function icsDate(value: Date) {
  if (!(value instanceof Date) || !Number.isFinite(value.getTime())) {
    throw new Error('Calendar dates must be valid Date values.');
  }

  const iso = value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  return iso;
}

function calendarNotes(plan: TripPlanInput) {
  return [
    `Put-in: ${plan.putIn.name}`,
    `Take-out: ${plan.takeOut.name}`,
    plan.distanceMiles && Number.isFinite(plan.distanceMiles) ? `Distance: ${plan.distanceMiles.toFixed(1)} mi` : null,
    plan.estimatedPaddleTime ? `Estimated paddle time: ${plan.estimatedPaddleTime}` : null,
    `Route details: ${plan.routeUrl}`,
    'Recheck current gauge, weather, access, and hazards before launching.',
    'PaddleToday does not monitor this trip or provide live tracking.',
  ].filter(Boolean).join('\n');
}

export function buildCalendarEvent(plan: TripPlanInput): CalendarEventPayload {
  if (!plan.launchAt || !plan.expectedTakeOutAt) {
    throw new Error('Calendar events require launch and expected take-out times.');
  }

  const startDate = new Date(plan.launchAt);
  const endDate = new Date(plan.expectedTakeOutAt);
  if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime()) || endDate <= startDate) {
    throw new Error('Calendar event end time must be after its start time.');
  }

  const alarms = [{ relativeOffsetMinutes: -120 }];
  if (endDate.getTime() - startDate.getTime() >= 24 * 60 * 60 * 1000) {
    alarms.unshift({ relativeOffsetMinutes: -24 * 60 });
  }

  return {
    title: `Paddle: ${plan.riverName} - ${plan.reach}`,
    startDate,
    endDate,
    location: plan.putIn.name,
    notes: calendarNotes(plan),
    alarms,
  };
}

export function buildIcs(plan: TripPlanInput) {
  const event = buildCalendarEvent(plan);
  const uid = `${plan.routeSlug}-${event.startDate.getTime()}@paddletoday.com`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PaddleToday//Prepare Trip//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${icsEscape(uid)}`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(event.startDate)}`,
    `DTEND:${icsDate(event.endDate)}`,
    `SUMMARY:${icsEscape(event.title)}`,
    `LOCATION:${icsEscape(event.location)}`,
    `DESCRIPTION:${icsEscape(event.notes)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recheck PaddleToday conditions before launch.',
    'TRIGGER:-PT2H',
    'END:VALARM',
    ...(event.alarms.length > 1 ? [
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Recheck PaddleToday conditions before launch.',
      'TRIGGER:-P1D',
      'END:VALARM',
    ] : []),
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ];

  return lines.join('\r\n');
}

export function buildGpx(plan: GpxTripPlan) {
  const coordinates = plan.routeCoordinates.filter(finiteCoordinate);
  if (coordinates.length < 2) {
    throw new Error('A canonical route geometry with at least two points is required for GPX export.');
  }

  const waypoints = [plan.putIn, ...(plan.intermediateAccessPoints ?? []), plan.takeOut]
    .filter(finiteCoordinate)
    .map((point) => [
      `  <wpt lat="${point.latitude}" lon="${point.longitude}">`,
      `    <name>${xmlEscape(point.name)}</name>`,
      point.note ? `    <desc>${xmlEscape(point.note)}</desc>` : null,
      '  </wpt>',
    ].filter(Boolean).join('\n'));
  const trackPoints = coordinates.map((point) => [
    `      <trkpt lat="${point.latitude}" lon="${point.longitude}">`,
    point.elevation !== undefined && point.elevation !== null && Number.isFinite(point.elevation)
      ? `        <ele>${point.elevation}</ele>`
      : null,
    point.timestamp ? `        <time>${xmlEscape(point.timestamp.toISOString())}</time>` : null,
    '      </trkpt>',
  ].filter(Boolean).join('\n'));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<gpx version="1.1" creator="PaddleToday" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 https://www.topografix.com/GPX/1/1/gpx.xsd">',
    '  <metadata>',
    `    <name>${xmlEscape(`${plan.riverName} - ${plan.reach}`)}</name>`,
    `    <desc>${xmlEscape(`PaddleToday route plan. Put-in: ${plan.putIn.name}. Take-out: ${plan.takeOut.name}.`)}</desc>`,
    `    <link href="${xmlEscape(plan.routeUrl)}"><text>PaddleToday route</text></link>`,
    '  </metadata>',
    ...waypoints,
    '  <trk>',
    `    <name>${xmlEscape(`${plan.riverName} - ${plan.reach}`)}</name>`,
    '    <trkseg>',
    trackPoints,
    '    </trkseg>',
    '  </trk>',
    '</gpx>',
    '',
  ].join('\n');
}

export function orientRouteCoordinates(
  coordinates: readonly TripPackCoordinate[],
  putIn: Pick<TripPackAccessPoint, 'latitude' | 'longitude'>,
  takeOut: Pick<TripPackAccessPoint, 'latitude' | 'longitude'>,
) {
  const valid = coordinates.filter(finiteCoordinate);
  if (valid.length < 2) return [];

  const distance = (left: TripPackCoordinate, right: { latitude: number; longitude: number }) =>
    (left.latitude - right.latitude) ** 2 + (left.longitude - right.longitude) ** 2;
  return distance(valid[0], putIn) + distance(valid.at(-1)!, takeOut)
    <= distance(valid[0], takeOut) + distance(valid.at(-1)!, putIn)
    ? valid
    : [...valid].reverse();
}

function formatLocalDateTime(value: Date | null | undefined, timeZone: string | null | undefined) {
  if (!value || !Number.isFinite(value.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timeZone || undefined,
    timeZoneName: 'short',
  }).format(value);
}

export function buildFloatPlanMessage(plan: TripPlanInput) {
  const launch = formatLocalDateTime(plan.launchAt, plan.timeZone);
  const takeOut = formatLocalDateTime(plan.expectedTakeOutAt, plan.timeZone);
  const checkIn = formatLocalDateTime(plan.checkInAt, plan.timeZone);
  const lines = [
    'PaddleToday float plan - not live tracking',
    '',
    `Route: ${plan.riverName} - ${plan.reach}`,
    launch ? `Launch: ${launch}` : null,
    takeOut ? `Expected take-out: ${takeOut}` : null,
    checkIn ? `Check-in by: ${checkIn}` : null,
    plan.groupSize && Number.isFinite(plan.groupSize) ? `Party: ${plan.groupSize} paddler${plan.groupSize === 1 ? '' : 's'}` : null,
    plan.boatDescription ? `Boat/gear: ${plan.boatDescription}` : null,
    plan.vehicleDescription ? `Vehicle: ${plan.vehicleDescription}` : null,
    plan.note ? `Note: ${plan.note}` : null,
    '',
    `Put-in: ${plan.putIn.name}`,
    `Take-out: ${plan.takeOut.name}`,
    `Route details: ${plan.routeUrl}`,
    '',
    'Recheck current gauge, weather, access, and hazards before launching.',
    'PaddleToday does not monitor this trip. If we are overdue, contact the sender and follow the agreed emergency plan.',
  ];

  return lines.filter((line): line is string => line !== null).join('\n');
}

export function parseDistanceMiles(value: string | null | undefined) {
  const match = String(value ?? '').match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const miles = Number(match[1]);
  return Number.isFinite(miles) && miles > 0 ? miles : null;
}

export function parsePaddleTimeHours(value: string | null | undefined) {
  const numbers = String(value ?? '').match(/\d+(?:\.\d+)?/g)?.map(Number).filter(Number.isFinite) ?? [];
  if (numbers.length === 0) return null;
  const min = numbers[0];
  const max = numbers[1] ?? numbers[0];
  return min > 0 && max > 0 ? { min, max: Math.max(min, max) } : null;
}

export function estimateSegmentDurationMinutes(
  fullDistanceLabel: string | null | undefined,
  fullPaddleTimeLabel: string | null | undefined,
  segmentDistanceMiles: number,
) {
  const fullDistance = parseDistanceMiles(fullDistanceLabel);
  const fullTime = parsePaddleTimeHours(fullPaddleTimeLabel);
  if (!fullDistance || !fullTime || !Number.isFinite(segmentDistanceMiles) || segmentDistanceMiles <= 0) return null;
  const ratio = Math.min(1, Math.max(0, segmentDistanceMiles / fullDistance));
  return {
    min: Math.max(30, Math.round(fullTime.min * ratio * 60)),
    max: Math.max(30, Math.round(fullTime.max * ratio * 60)),
  };
}

export function tripPackFilename(plan: Pick<TripPlanInput, 'riverName' | 'reach'>, extension: string) {
  const stem = `${plan.riverName}-${plan.reach}`
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'paddletoday-route';
  return `${stem}.${extension.replace(/^\./, '')}`;
}
