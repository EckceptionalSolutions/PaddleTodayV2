import type { ServerResponse } from 'node:http';
import { afterEach, expect, it, vi } from 'vitest';
import * as snapshots from '../../lib/river-snapshots';
import { handleExploreCatalog } from './public-rivers';
import { listRivers } from '../../lib/rivers';

afterEach(() => vi.restoreAllMocks());

it('serves the full public catalog when the snapshot store is unavailable', async () => {
  vi.spyOn(snapshots, 'getStoredRiverSummarySnapshot').mockRejectedValue(new Error('unavailable'));
  const response = { writeHead: vi.fn(), end: vi.fn() };
  await handleExploreCatalog(response as unknown as ServerResponse, 'explore-test', true);
  const payload = JSON.parse(response.end.mock.calls[0][0].toString());
  expect(response.writeHead.mock.calls[0][0]).toBe(200);
  expect(payload.rivers.map((item: { river: { slug: string } }) => item.river.slug)).toEqual(listRivers().map(route => route.slug));
  expect(payload.generatedAt).toBeNull();
  expect(payload.snapshotStatus).toBe('unavailable');
  expect(payload.rivers.every((item: { readiness: { status: string } }) => item.readiness.status === 'withheld')).toBe(true);
  expect(payload.coverage.missingScores).toBeGreaterThan(0);
});
