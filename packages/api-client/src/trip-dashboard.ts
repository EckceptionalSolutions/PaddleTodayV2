import { validTripDate, validTripTime, validTimeZone, type Trip } from '@paddletoday/api-contract';

export function tripLocalToday(trip: Pick<Trip, 'timeZone'>, now = new Date()) {
  const zone = validTimeZone(trip.timeZone) ? trip.timeZone : 'UTC';
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now).map(p => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
/** A future plan is route context, not evidence that a paddle already happened. */
export function paddleLogSchedule(trip: Pick<Trip, 'date' | 'launch'> | undefined, mode: 'record' | 'past', timeZone: string, now = new Date()) {
  const today = tripLocalToday({ timeZone }, now);
  const reuse = mode === 'past' && trip && validTripDate(trip.date, false) && trip.date <= today;
  return { date: reuse ? trip.date : today, time: reuse ? trip.launch : '' };
}
function scheduleOrder(trip: Trip) {
  const wallClock = Date.parse(`${trip.date}T${validTripTime(trip.launch) && trip.launch ? trip.launch : '23:59'}:00Z`);
  if (!Number.isFinite(wallClock) || !validTimeZone(trip.timeZone)) return wallClock;
  const format = new Intl.DateTimeFormat('en-CA', { timeZone: trip.timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  let epoch = wallClock;
  for (let i = 0; i < 2; i++) {
    const p = Object.fromEntries(format.formatToParts(epoch).map(part => [part.type, part.value]));
    const shown = Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00Z`);
    epoch += wallClock - shown;
  }
  return epoch;
}
/** A plan for today remains visible until completed; old planned trips never become the next paddle. */
export function nextDatedTrip(trips: Trip[], now = new Date()) {
  return trips.filter(trip => trip.status === 'planned' && validTripDate(trip.date, false) && trip.date >= tripLocalToday(trip, now))
    .sort((a, b) => scheduleOrder(a) - scheduleOrder(b) || a.title.localeCompare(b.title))[0];
}
export function tripCoordinationSummary(trip: Trip) {
  const going = trip.members.filter(m => m.rsvp === 'going').length;
  const maybe = trip.members.filter(m => m.rsvp === 'maybe').length;
  return { crew: `${going} going${maybe ? ` · ${maybe} maybe` : ''}`, shuttle: trip.shuttle.length
    ? `${trip.shuttle.length} vehicle${trip.shuttle.length === 1 ? '' : 's'}` : 'No shuttle arranged' };
}
