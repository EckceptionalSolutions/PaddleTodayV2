import { describe, expect, it } from 'vitest';
import { corridorForSlug, routeCorridorDefinitions } from './route-corridors';

describe('route corridor registry', () => {
  it('has unique ids and explicit continuity states', () => {
    const ids = routeCorridorDefinitions.map((definition) => definition.corridorId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(routeCorridorDefinitions.every((definition) => definition.continuityStatus)).toBe(true);
  });

  it('classifies the reviewed pilot families', () => {
    expect(corridorForSlug('turtle-creek-school-section-east-creek')?.continuityStatus).toBe('verified');
    expect(corridorForSlug('middle-river-pammel-holliwell')?.continuityStatus).toBe('partial');
    expect(corridorForSlug('cedar-river-charles-city-nashua')?.continuityStatus).toBe('condition-family');
  });

  it('only assigns explicit access edges to canonical routes', () => {
    for (const definition of routeCorridorDefinitions) {
      if (definition.segmentEdges?.length) expect(definition.canonicalSlug).toBeTruthy();
    }
  });
});
