import { describe, expect, it } from 'vitest';
import { osmAccessFeatureKind } from '../../scripts/lib/osm-access-feature';

describe('osmAccessFeatureKind', () => {
  it('does not treat canoe permission on a river as a launch', () => {
    expect(osmAccessFeatureKind({ waterway: 'river', canoe: 'yes', boat: 'yes' })).toBe('other');
    expect(osmAccessFeatureKind({ waterway: 'river', canoe: 'designated' })).toBe('other');
    expect(osmAccessFeatureKind({ waterway: 'link', canoe: 'yes' })).toBe('other');
  });

  it('recognizes explicit canoe entry and egress features', () => {
    expect(osmAccessFeatureKind({ canoe: 'put_in' })).toBe('canoe-access');
    expect(osmAccessFeatureKind({ canoe: 'put_in:egress' })).toBe('canoe-access');
    expect(osmAccessFeatureKind({ canoe: 'egress' })).toBe('canoe-access');
  });

  it('recognizes dedicated launch and bridge feature tags', () => {
    expect(osmAccessFeatureKind({ leisure: 'slipway' })).toBe('slipway');
    expect(osmAccessFeatureKind({ waterway: 'access_point' })).toBe('waterway-access-point');
    expect(osmAccessFeatureKind({ whitewater: 'put_in' })).toBe('whitewater-put-in');
    expect(osmAccessFeatureKind({ bridge: 'yes', highway: 'secondary' })).toBe('road-bridge');
  });
});
