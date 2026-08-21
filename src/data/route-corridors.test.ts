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
    expect(corridorForSlug('village-creek-fm418-state-park')).toMatchObject({
      corridorId: 'tx-village-creek-paddling-trail',
      continuityStatus: 'verified',
      canonicalSlug: 'village-creek-fm418-state-park',
    });
    expect(corridorForSlug('wabash-river-linn-grove-hale-street')).toMatchObject({
      corridorId: 'in-wabash-wells-county',
      continuityStatus: 'verified',
      canonicalSlug: 'wabash-river-linn-grove-hale-street',
    });
    expect(corridorForSlug('beaver-dam-river-county-s-lowell')).toMatchObject({
      corridorId: 'wi-beaver-dam-cotton-mill-lowell',
      continuityStatus: 'verified',
      canonicalSlug: 'beaver-dam-river-cotton-mill-county-j',
    });
    expect(corridorForSlug('goose-creek-jacks-laurel-branch')).toMatchObject({
      corridorId: 'ky-goose-creek-lower-manchester',
      continuityStatus: 'verified',
      canonicalSlug: 'goose-creek-jacks-laurel-branch',
    });
    expect(corridorForSlug('little-fork-river-lofgren-kuttes')).toMatchObject({
      corridorId: 'mn-little-fork-fiedler-lofgren',
      continuityStatus: 'verified',
      canonicalSlug: 'little-fork-river-fiedler-lofgren-park',
    });
    expect(corridorForSlug('little-fork-river-veterans-park-highway-73')).toMatchObject({
      corridorId: 'mn-little-fork-map-1',
      continuityStatus: 'verified',
      canonicalSlug: 'little-fork-river-highway-73-silverdale',
    });
  });

  it('only assigns explicit access edges to canonical routes', () => {
    for (const definition of routeCorridorDefinitions) {
      if (definition.segmentEdges?.length) expect(definition.canonicalSlug).toBeTruthy();
    }
  });
});
