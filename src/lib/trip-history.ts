import type { PaddleLog, Trip } from '@paddletoday/api-contract';

/** Match by source rather than assuming imported logs use the trip ID. */
export function logsForTrip(logs: PaddleLog[], id: string) {
  return logs.filter(log => log.sourceTripId === id).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function pastOutings(trips: Trip[], logs: PaddleLog[]) {
  const rows: { trip?: Trip; logs: PaddleLog[]; date: string }[] = trips.filter(trip => trip.status === 'completed' || logs.some(log => log.sourceTripId === trip.id))
    .map(trip => ({ trip, logs: logsForTrip(logs, trip.id), date: logsForTrip(logs, trip.id)[0]?.date || trip.date }));
  for (const log of logs) {
    if (trips.some(trip => trip.id === log.sourceTripId)) continue;
    if (log.sourceTripId && rows.some(row => row.logs.some(item => item.sourceTripId === log.sourceTripId))) continue;
    const associated = log.sourceTripId ? logsForTrip(logs, log.sourceTripId) : [log];
    rows.push({ logs: associated, date: associated[0]!.date });
  }
  return rows.sort((a, b) => b.date.localeCompare(a.date));
}
