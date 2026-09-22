import { expect, it } from 'vitest';
import { parseRiverHubSession } from './river-hub-session';

it('restores a shortlist and filters only for the matching river', () => {
  const session = { riverId: 'rice-creek', slugs: ['route-1', 'route-2'], sort: 'Shortest', distance: 'under-5', difficulty: 'easy', region: null };
  expect(parseRiverHubSession(JSON.stringify(session), 'rice-creek')).toEqual(session);
  expect(parseRiverHubSession(JSON.stringify(session), 'other-river')).toBeNull();
  expect(parseRiverHubSession(JSON.stringify({ ...session, distance: 'invalid' }), 'rice-creek')).toBeNull();
  expect(parseRiverHubSession(JSON.stringify({ ...session, slugs: ['a', 'b', 'c', 'd'] }), 'rice-creek')).toBeNull();
  expect(parseRiverHubSession('broken', 'rice-creek')).toBeNull();
});
