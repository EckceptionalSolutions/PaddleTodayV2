import { describe, expect, it } from 'vitest';
import { southCarolinaBroadRoutes } from './south-carolina-broad';

describe('South Carolina Broad River starter routes', () => {
  it('scores source-published reaches and keeps derived combinations planning-only', () => {
    expect(southCarolinaBroadRoutes).toHaveLength(25);
    for (const route of southCarolinaBroadRoutes) {
      expect(route.state).toBe('South Carolina');
      const published=route.evidenceNotes.some((note)=>note.label==='Named reach and distance'&&note.sourceUrl?.includes('/trips/trail/'));
      expect(route.scoreEligibility).toBe(published?'scored':'planning');
      expect(route.putIn?.latitude).toBeTypeOf('number');
      expect(route.takeOut?.longitude).toBeTypeOf('number');
      expect(route.profile?.thresholdSourceStrength).toBe(published?'community':'derived');
      expect(route.evidenceNotes?.some(note => note.label === (published?'Numeric scoring evidence':'Flow guidance scope'))).toBe(true);
      if (!published) {
        expect(route.profile.tooLow).toBeUndefined();
        expect(route.profile.tooHigh).toBeUndefined();
        expect(route.profile.idealMin).toBeUndefined();
        expect(route.profile.idealMax).toBeUndefined();
        expect(route.logistics?.estimatedPaddleTime).toContain('No verified duration');
      }
      expect(route.safetyProfile?.safetyNotes.length).toBeGreaterThanOrEqual(3);
      expect(route.logistics?.camping).toBeTruthy();
    }
    expect(southCarolinaBroadRoutes.filter((route)=>route.scoreEligibility==='scored')).toHaveLength(8);
  });
  it('corrects understated map-derived mileage and requires the Lockhart transfer',()=>{
    for (const [id,miles] of [['broad-river-daltons-neal-shoals',23.4],['broad-river-daltons-sandy',30.8],['broad-river-daltons-shelton',37],['broad-river-daltons-strother',44.2]] as const) {
      const route=southCarolinaBroadRoutes.find((route)=>route.id===id)!;
      expect(route.logistics?.distanceLabel).toContain(String(miles));
      expect(route.logistics?.shuttle).toContain('vehicle transfer');
      expect(route.continuityStatus).toBe('partial');
      expect(route.safetyProfile?.hazards).toContain('mandatory_takeout');
    }
  });
});
