import { expect, it } from 'vitest';
import { logsForTrip, pastOutings } from './trip-history';
import type { Trip, PaddleLog } from '@paddletoday/api-contract';

it('groups linked records into one outing and retains orphan and additional logs', () => {
  const trips = [{ id: 'a', status: 'completed', date: '2020-01-01' }, { id: 'b', status: 'cancelled', date: '2021-01-01' }] as Trip[];
  const logs = [{ id: 'imported', sourceTripId: 'a', date: '2020-01-01', updatedAt: '2020-01-02' }, { id: 'second', sourceTripId: 'a', date: '2020-01-01', updatedAt: '2020-01-03' }, { id: 'orphan', sourceTripId: 'deleted', date: '2022-01-01', updatedAt: '2022-01-01' }] as PaddleLog[];
  expect(logsForTrip(logs, 'a').map(l => l.id)).toEqual(['second', 'imported']);
  const outings = pastOutings(trips, logs);
  expect(outings).toHaveLength(2);
  expect(outings[0]?.logs[0]?.id).toBe('orphan');
  expect(outings[1]?.logs).toHaveLength(2);
  expect(outings[1]?.trip?.id).toBe('a');
});
