import type { ServerResponse } from 'node:http';
import { expect, it, vi } from 'vitest';
import { handleRiverCatalog } from './public-rivers';
import { listRivers } from '../../lib/rivers';

it('lists every public route, including New York and planning routes, without presenting conditions', () => {
  const response = { writeHead: vi.fn(), end: vi.fn() };
  handleRiverCatalog(response as unknown as ServerResponse, 'catalog-test', true);
  const payload = JSON.parse(response.end.mock.calls[0][0].toString());
  expect(payload.rivers.map((item: { river: { slug: string } }) => item.river.slug)).toEqual(listRivers().map(route => route.slug));
  expect(payload.rivers.some((item: { river: { state: string } }) => item.river.state === 'New York')).toBe(true);
  const planning = listRivers().find(route => route.scoreEligibility === 'planning')!;
  expect(payload.rivers.some((item: { river: { slug: string } }) => item.river.slug === planning.slug)).toBe(true);
  expect(payload.rivers.every((item: object) => !('score' in item) && !('rating' in item))).toBe(true);
});
