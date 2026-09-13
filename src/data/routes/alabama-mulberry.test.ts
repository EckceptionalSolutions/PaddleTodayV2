import { describe, expect, it } from 'vitest';
import { alabamaMulberryRoutes } from './alabama-mulberry';
import { rivers } from '../rivers';
import { getRoutePreviewPhoto } from '../route-gallery';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Upper Mulberry starter route', () => {
  const route = alabamaMulberryRoutes[0];
  it('is a scored, directly gauged route with preferred stage band', () => {
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource?.kind).toBe('direct');
    expect(route.gaugeSource?.siteId).toBe('02450000');
    expect(route.profile?.idealMin).toBe(4.5);
    expect(route.profile?.idealMax).toBe(6);
    expect(rivers.some(candidate => candidate.id === route.id)).toBe(true);
  });
  it('has approved same-river imagery and complete safety review', () => {
    const preview = getRoutePreviewPhoto(route);
    expect(preview.isPlaceholder).toBe(false);
    expect(preview.sourceKind).toBe('river');
    expect(auditRouteSafety([route])).toEqual([]);
  });
});
