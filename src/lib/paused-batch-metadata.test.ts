import { describe, expect, it } from 'vitest';
import { riverTripDetails } from '../data/river-trip-details';
import { routeInventory } from '../data/rivers';
import { getApprovedRoutePhotos } from '../data/route-gallery';

const pausedBatchRouteIds = [
  'big-cypress-bayou-lake-o-pines-spillway-jefferson',
  'brays-bayou-fonde-brays-greenway',
  'brazos-river-brazos-park-east-bledsoe-miller',
  'brazos-river-hwy16-fm4-upper-middle',
  'brushy-creek-chisholm-trail-red-bud',
  'cedar-river-cedar-bluff-cedar-valley',
  'colorado-river-fm580-colorado-bend',
  'colorado-river-fm960-hollywood-bottom',
  'red-river-weed-dam-zeimers-falls',
  'skunk-river-cottonwood-sycamore',
  'south-skunk-river-glendale-rose-hill',
  'two-lick-creek-waterworks-saylor-park',
] as const;

const routesWithVerifiedPhotos = new Set<string>();

describe('paused route batch metadata', () => {
  it.each(pausedBatchRouteIds)('%s has reviewed safety and explicit camping guidance', (slug) => {
    const route = routeInventory.find((candidate) => candidate.slug === slug);
    const trip = riverTripDetails[slug];

    expect(route?.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(route?.safetyProfile?.hazards.length).toBeGreaterThan(0);
    expect(route?.safetyProfile?.safetyNotes.length).toBeGreaterThan(0);
    expect(trip?.logistics.camping.trim().length).toBeGreaterThan(0);
    expect(trip?.logistics.campingClassification).toBeTruthy();
  });

  it('does not approve gallery photos without a recorded rights decision', () => {
    for (const slug of pausedBatchRouteIds) {
      expect(getApprovedRoutePhotos(slug).length > 0).toBe(routesWithVerifiedPhotos.has(slug));
    }
  });

  it('does not leave stale no-image evidence on photographed routes', () => {
    for (const slug of routesWithVerifiedPhotos) {
      const route = routeInventory.find((candidate) => candidate.slug === slug);
      const imageEvidence = (route?.evidenceNotes ?? [])
        .filter((note) => /image/i.test(note.label))
        .map((note) => `${note.value} ${note.note ?? ''}`)
        .join(' ');

      expect(imageEvidence, slug).not.toMatch(/no (?:route-gallery|gallery|third-party).*image|without a gallery image/i);
    }
  });
});
