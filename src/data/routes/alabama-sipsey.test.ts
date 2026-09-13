import { describe, expect, it } from 'vitest';
import { alabamaSipseyRoutes } from './alabama-sipsey';
import { rivers } from '../rivers';
import { getRoutePreviewPhoto } from '../route-gallery';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Alabama Sipsey Fork expansion route', () => {
  it('keeps the named Wild and Scenic reach scored and illustrated', () => {
    const [route] = alabamaSipseyRoutes;
    expect(route.scoreEligibility).toBe('scored');
    expect(route.gaugeSource).toMatchObject({ siteId: '02450250', kind: 'direct' });
    expect(route.profile).toMatchObject({ thresholdModel: 'two-sided', idealMin: 200, idealMax: 350 });
    expect(rivers.some(candidate => candidate.id === route.id)).toBe(true);
    expect(getRoutePreviewPhoto(route)).toMatchObject({ isPlaceholder: false, sourceKind: 'river' });
    expect(auditRouteSafety(alabamaSipseyRoutes)).toEqual([]);
  });
});

