import { describe, expect, it } from 'vitest';
import { auditRouteSafety } from '../../lib/route-safety-audit';
import { publicRivers } from '../rivers';
import { getRouteGalleryPhotos } from '../route-gallery';
import { massachusettsHousatonicExpansionRoutes } from './massachusetts-housatonic-expansion';

const upperGaugeRoutes = new Set([
  'housatonic-river-fred-garner-decker',
  'housatonic-river-decker-woods-pond',
  'housatonic-river-woods-pond-lee-athletic',
  'housatonic-river-fred-garner-woods-pond',
  'housatonic-river-decker-lee-athletic',
  'housatonic-river-fred-garner-lee-athletic',
]);
const lowerGaugeRoutes = new Set([
  'housatonic-river-brookside-covered-bridge',
  'housatonic-river-covered-bridge-rannapo',
  'housatonic-river-brookside-rannapo',
  'housatonic-river-division-covered-bridge',
  'housatonic-river-east-sheffield-covered-bridge',
  'housatonic-river-east-sheffield-rannapo',
]);

describe('Massachusetts Housatonic route expansion', () => {
  it('publishes fifteen reach-specific trip options with scored flow, reviewed safety, access, camping, images, and overlap notes', () => {
    expect(massachusettsHousatonicExpansionRoutes).toHaveLength(15);

    const ids = new Set(massachusettsHousatonicExpansionRoutes.map((route) => route.id));
    for (const route of massachusettsHousatonicExpansionRoutes) {
      expect(publicRivers.some((candidate) => candidate.id === route.id)).toBe(true);
      expect(route.scoreEligibility).toBe('scored');
      const expectedGauge = upperGaugeRoutes.has(route.id) ? '01197145' : lowerGaugeRoutes.has(route.id) ? '01198125' : '01197500';
      expect(route.gaugeSource).toMatchObject({ siteId: expectedGauge, kind: 'direct' });
      expect(route.profile).toMatchObject({ thresholdModel: 'minimum-only', tooLow: 150, idealMin: 150 });
      expect(route.profile.thresholdSource.url).toContain('PaddleGuideBerkshire_2023UPDATES.pdf');
      expect(route.accessPoints?.length).toBeGreaterThanOrEqual(2);
      expect(route.accessPoints?.every((point) => point.latitude !== 0 && point.longitude !== 0)).toBe(true);
      expect(route.logistics?.campingClassification).toBe('none');
      expect(route.logistics?.camping).toBeTruthy();
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.safetyProfile?.safetyNotes?.join(' ')).toContain('PCBs');
      expect(getRouteGalleryPhotos(route)).toHaveLength(route.id === 'housatonic-river-fred-garner-lee-athletic' ? 2 : 1);
      expect(auditRouteSafety([route])).toEqual([]);
      for (const relatedId of route.consolidation?.relatedRouteIds ?? []) {
        expect(ids.has(relatedId)).toBe(true);
      }
      expect(`${route.putIn?.name} ${route.takeOut?.name}`).not.toMatch(/Searles|Bridge Street access/i);
    }

    const belowGlendale = massachusettsHousatonicExpansionRoutes.find((route) => route.id === 'housatonic-river-below-glendale-rising-pond');
    expect(belowGlendale?.safetyProfile?.safetyNotes?.join(' ')).toContain('poison ivy');
    const fullUpper = massachusettsHousatonicExpansionRoutes.find((route) => route.id === 'housatonic-river-fred-garner-lee-athletic');
    expect(fullUpper?.safetyProfile?.safetyNotes?.join(' ')).toContain('mandatory right-bank Woods Pond Dam portage');
  });
});
