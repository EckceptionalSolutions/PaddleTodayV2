import { describe, expect, it } from 'vitest';
import { delawareRoutes } from '../data/routes/delaware';
import { delawareRiverTripDetails } from '../data/trip-details/delaware';
import { getApprovedRoutePhotos } from '../data/route-gallery';
import { corridorForSlug } from '../data/route-corridors';
import { isPublicPlanningRoute } from '../data/route-publication';

const route = delawareRoutes[0]!;
const blackbirdRoute = delawareRoutes.find((candidate) => candidate.slug === 'blackbird-creek-reserve-the-rocks')!;
const stJonesRoute = delawareRoutes.find((candidate) => candidate.slug === 'st-jones-river-lebanon-scotton')!;
const christinaRoute = delawareRoutes.find((candidate) => candidate.slug === 'christina-river-newport-7th-street')!;
const broadCreekRoute = delawareRoutes.find((candidate) => candidate.slug === 'broad-creek-fisher-phillips')!;
const mispillionRoute = delawareRoutes.find((candidate) => candidate.slug === 'mispillion-river-front-street-cedar-creek')!;
const churchmansRoute = delawareRoutes.find((candidate) => candidate.slug === 'christina-river-churchmans-newport')!;
const broadkillRoute = delawareRoutes.find((candidate) => candidate.slug === 'broadkill-river-milton-mccabe')!;
const lowerNanticokeRoute = delawareRoutes.find((candidate) => candidate.slug === 'nanticoke-river-seaford-woodland-wharf')!;
const lewesCanalRoute = delawareRoutes.find((candidate) => candidate.slug === 'lewes-rehoboth-canal-lewes-grove-park')!;
const primeHookRoute = delawareRoutes.find((candidate) => candidate.slug === 'prime-hook-creek-foords-waples')!;
const fortDupontRoute = delawareRoutes.find((candidate) => candidate.slug === 'delaware-river-fort-dupont-augustine-beach')!;
const littleRiverRoute = delawareRoutes.find((candidate) => candidate.slug === 'little-river-delaware-wildlife-town')!;
const rehobothBayRoute = delawareRoutes.find((candidate) => candidate.slug === 'rehoboth-bay-new-road-savages-ditch')!;
const murderkillRoute = delawareRoutes.find((candidate) => candidate.slug === 'murderkill-river-bowers-beach-loop')!;
const millerCreekRoute = delawareRoutes.find((candidate) => candidate.slug === 'miller-creek-strawberry-sassafras')!;
const duckCreekRoute = delawareRoutes.find((candidate) => candidate.slug === 'duck-creek-woodland-beach-loop')!;

describe('Delaware expansion package', () => {
  it('contains a reviewed planning route with explicit proxy gauge posture', () => {
    expect(route.state).toBe('Delaware');
    expect(route.gaugeSource.kind).toBe('proxy');
    expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(isPublicPlanningRoute(route)).toBe(true);
  });

  it('keeps both endpoints on/near the named Brandywine access areas', () => {
    expect(route.putIn?.latitude).toBeCloseTo(39.833265, 5);
    expect(route.putIn?.longitude).toBeCloseTo(-75.575112, 5);
    expect(route.takeOut?.latitude).toBeCloseTo(39.81709, 5);
    expect(route.takeOut?.longitude).toBeCloseTo(-75.568971, 5);
    expect(route.accessPoints).toHaveLength(2);
  });

  it('has complete trip, corridor, and approved imagery records', () => {
    expect(delawareRiverTripDetails[route.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(route.slug)?.corridorId).toBe('de-brandywine-smith-thompsons');
    expect(getApprovedRoutePhotos(route.slug)).toEqual([
      expect.objectContaining({
        id: 'brandywine-creek-walkers-mill-cc0',
        takenLabel: 'Wikimedia Commons: CC0',
      }),
    ]);
  });

  it('includes the qualified Blackbird Creek Reserve to The Rocks tidal reach', () => {
    expect(blackbirdRoute.state).toBe('Delaware');
    expect(blackbirdRoute.gaugeSource).toMatchObject({
      siteId: '01483200',
      kind: 'proxy',
      siteName: 'Blackbird Creek at Blackbird, DE',
    });
    expect(blackbirdRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(blackbirdRoute.putIn).toMatchObject({ latitude: 39.390111, longitude: -75.636328 });
    expect(blackbirdRoute.takeOut).toMatchObject({ latitude: 39.4311, longitude: -75.6012 });
    expect(delawareRiverTripDetails[blackbirdRoute.id]?.corridorId).toBe('de-blackbird-reserve-rocks');
    expect(delawareRiverTripDetails[blackbirdRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(blackbirdRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(blackbirdRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'blackbird-creek-delaware-2008-cc0',
        takenLabel: 'Wikimedia Commons: CC0',
      }),
    ]);
  });

  it('includes the qualified St. Jones Lebanon-to-Scotton tidal reach', () => {
    expect(stJonesRoute.state).toBe('Delaware');
    expect(stJonesRoute.gaugeSource).toMatchObject({
      siteId: '01483700',
      kind: 'proxy',
      siteName: 'St. Jones River at Dover, DE',
    });
    expect(stJonesRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(stJonesRoute.putIn).toMatchObject({ latitude: 39.1143889, longitude: -75.4991944 });
    expect(stJonesRoute.takeOut).toMatchObject({ latitude: 39.0849767, longitude: -75.4605847 });
    expect(delawareRiverTripDetails[stJonesRoute.id]?.corridorId).toBe('de-st-jones-lebanon-scotton');
    expect(delawareRiverTripDetails[stJonesRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(stJonesRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(stJonesRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'st-jones-river-silver-lake-commons',
        takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
      }),
    ]);
  });

  it('includes the qualified Christina Newport-to-7th-Street urban tidal reach', () => {
    expect(christinaRoute.state).toBe('Delaware');
    expect(christinaRoute.gaugeSource).toMatchObject({
      siteId: '01480120',
      kind: 'direct',
      siteName: 'Christina River at Wilmington, DE',
    });
    expect(christinaRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(christinaRoute.putIn).toMatchObject({ latitude: 39.70953, longitude: -75.596832 });
    expect(christinaRoute.takeOut).toMatchObject({ latitude: 39.7326891, longitude: -75.53002211 });
    expect(delawareRiverTripDetails[christinaRoute.id]?.corridorId).toBe('de-christina-newport-7th-street');
    expect(delawareRiverTripDetails[christinaRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(christinaRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(christinaRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'christina-river-wilmington-commons',
        takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
      }),
    ]);
  });

  it('includes the qualified Broad Creek Fisher-to-Phillips water-trail reach', () => {
    expect(broadCreekRoute.state).toBe('Delaware');
    expect(broadCreekRoute.gaugeSource).toMatchObject({
      siteId: '01487000',
      kind: 'proxy',
      siteName: 'Nanticoke River near Bridgeville, DE',
    });
    expect(broadCreekRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(broadCreekRoute.putIn).toMatchObject({ latitude: 38.5571, longitude: -75.57595 });
    expect(broadCreekRoute.takeOut).toMatchObject({ latitude: 38.5640041, longitude: -75.6724295 });
    expect(delawareRiverTripDetails[broadCreekRoute.id]?.corridorId).toBe('de-broad-creek-fisher-phillips');
    expect(delawareRiverTripDetails[broadCreekRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(broadCreekRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(broadCreekRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'broad-creek-nanticoke-vienna-commons',
        takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
      }),
    ]);
  });

  it('includes the qualified Mispillion Front Street-to-Cedar Creek tidal reach', () => {
    expect(mispillionRoute.state).toBe('Delaware');
    expect(mispillionRoute.gaugeSource).toMatchObject({
      siteId: '01484100',
      kind: 'proxy',
      siteName: 'Beaverdam Branch at Houston, DE (head of Mispillion River)',
    });
    expect(mispillionRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(mispillionRoute.putIn).toMatchObject({ latitude: 38.916105, longitude: -75.420702 });
    expect(mispillionRoute.takeOut).toMatchObject({ latitude: 38.939461, longitude: -75.32177 });
    expect(delawareRiverTripDetails[mispillionRoute.id]?.corridorId).toBe('de-mispillion-front-street-cedar-creek');
    expect(delawareRiverTripDetails[mispillionRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(mispillionRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(mispillionRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'mispillion-river-lighthouse-commons',
        takenLabel: 'Wikimedia Commons: public domain (NPS HAER)',
      }),
    ]);
  });

  it('includes the qualified Christina Churchmans-to-Newport urban tidal reach', () => {
    expect(churchmansRoute.state).toBe('Delaware');
    expect(churchmansRoute.gaugeSource).toMatchObject({
      siteId: '01480120',
      kind: 'direct',
      siteName: 'Christina River at Wilmington, DE',
    });
    expect(churchmansRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(churchmansRoute.putIn).toMatchObject({ latitude: 39.685332, longitude: -75.632465 });
    expect(churchmansRoute.takeOut).toMatchObject({ latitude: 39.70953, longitude: -75.596832 });
    expect(delawareRiverTripDetails[churchmansRoute.id]?.corridorId).toBe('de-christina-churchmans-newport');
    expect(delawareRiverTripDetails[churchmansRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(churchmansRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(churchmansRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'christina-river-wilmington-churchmans-commons',
        takenLabel: 'Wikimedia Commons: CC BY-SA 2.5',
      }),
    ]);
  });

  it('includes the qualified Broadkill Milton-to-McCabe canoe trail', () => {
    expect(broadkillRoute.state).toBe('Delaware');
    expect(broadkillRoute.gaugeSource).toMatchObject({
      siteId: '01484272',
      kind: 'proxy',
      siteName: 'Broadkill River near Milton, DE',
    });
    expect(broadkillRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(broadkillRoute.putIn).toMatchObject({ latitude: 38.77887, longitude: -75.30997 });
    expect(broadkillRoute.takeOut).toMatchObject({ latitude: 38.7771, longitude: -75.2838 });
    expect(delawareRiverTripDetails[broadkillRoute.id]?.corridorId).toBe('de-broadkill-milton-mccabe');
    expect(delawareRiverTripDetails[broadkillRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(broadkillRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(broadkillRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'broadkill-river-milton-commons',
        takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
      }),
    ]);
  });

  it('includes the qualified lower-Nanticoke Seaford-to-Woodland Wharf reach', () => {
    expect(lowerNanticokeRoute.state).toBe('Delaware');
    expect(lowerNanticokeRoute.gaugeSource).toMatchObject({
      siteId: '01487000',
      kind: 'proxy',
      siteName: 'Nanticoke River near Bridgeville, DE',
    });
    expect(lowerNanticokeRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(lowerNanticokeRoute.putIn).toMatchObject({ latitude: 38.6336, longitude: -75.6179 });
    expect(lowerNanticokeRoute.takeOut).toMatchObject({ latitude: 38.600359, longitude: -75.656878 });
    expect(delawareRiverTripDetails[lowerNanticokeRoute.id]?.corridorId).toBe('de-nanticoke-seaford-woodland-wharf');
    expect(delawareRiverTripDetails[lowerNanticokeRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(lowerNanticokeRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(lowerNanticokeRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'nanticoke-river-vienna-commons-seaford',
        takenLabel: 'Wikimedia Commons: CC BY-SA 4.0',
      }),
    ]);
  });

  it('includes the qualified Lewes-to-Rehoboth Canal reach', () => {
    expect(lewesCanalRoute.state).toBe('Delaware');
    expect(lewesCanalRoute.gaugeSource).toMatchObject({
      siteId: '01484670',
      kind: 'proxy',
      siteName: 'Rehoboth Bay at Dewey Beach, DE',
    });
    expect(lewesCanalRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(lewesCanalRoute.putIn).toMatchObject({ latitude: 38.77668, longitude: -75.14112 });
    expect(lewesCanalRoute.takeOut).toMatchObject({ latitude: 38.7156, longitude: -75.09186 });
    expect(delawareRiverTripDetails[lewesCanalRoute.id]?.corridorId).toBe('de-lewes-rehoboth-canal-lewes-grove');
    expect(delawareRiverTripDetails[lewesCanalRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(lewesCanalRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(lewesCanalRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'lewes-rehoboth-canal-commons',
        takenLabel: 'Wikimedia Commons: CC BY 2.0',
      }),
    ]);
  });

  it('includes the bounded westward Prime Hook Creek reach', () => {
    expect(primeHookRoute.state).toBe('Delaware');
    expect(primeHookRoute.gaugeSource).toMatchObject({
      siteId: '01484272',
      kind: 'proxy',
      siteName: 'Broadkill River near Milton, DE',
    });
    expect(primeHookRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(primeHookRoute.statusText).toContain('paddle west from Foord’s Landing');
    expect(primeHookRoute.putIn).toMatchObject({ latitude: 38.83047, longitude: -75.248 });
    expect(primeHookRoute.takeOut).toMatchObject({ latitude: 38.825, longitude: -75.31 });
    expect(delawareRiverTripDetails[primeHookRoute.id]?.corridorId).toBe('de-prime-hook-creek-foord-waples');
    expect(delawareRiverTripDetails[primeHookRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(primeHookRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(primeHookRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'prime-hook-refuge-aerial-commons',
        takenLabel: 'Wikimedia Commons: CC BY 2.0',
      }),
    ]);
  });

  it('includes the bounded Fort DuPont to Augustine Beach Delaware River reach', () => {
    expect(fortDupontRoute.state).toBe('Delaware');
    expect(fortDupontRoute.gaugeSource).toMatchObject({
      siteId: '01482170',
      kind: 'proxy',
      siteName: 'Delaware River at New Castle, DE',
    });
    expect(fortDupontRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(fortDupontRoute.statusText).toContain('Branch Canal');
    expect(fortDupontRoute.putIn).toMatchObject({ latitude: 39.575275, longitude: -75.58860278 });
    expect(fortDupontRoute.takeOut).toMatchObject({ latitude: 39.50493889, longitude: -75.58025556 });
    expect(delawareRiverTripDetails[fortDupontRoute.id]?.corridorId).toBe('de-delaware-river-shoreline-frontier');
    expect(delawareRiverTripDetails[fortDupontRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(fortDupontRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(fortDupontRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'delaware-river-fort-dupont-augustine-usgs-context',
        takenLabel: 'U.S. Geological Survey station image',
      }),
    ]);
  });

  it('includes the seasonal Little River Wildlife Area to town access reach', () => {
    expect(littleRiverRoute.state).toBe('Delaware');
    expect(littleRiverRoute.gaugeSource).toMatchObject({
      siteId: '01483700',
      kind: 'proxy',
      siteName: 'St. Jones River at Dover, DE',
    });
    expect(littleRiverRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(littleRiverRoute.statusText).toContain('waterfowl season');
    expect(littleRiverRoute.putIn).toMatchObject({ latitude: 39.17012233, longitude: -75.42939458 });
    expect(littleRiverRoute.takeOut).toMatchObject({ latitude: 39.16035047, longitude: -75.44444166 });
    expect(delawareRiverTripDetails[littleRiverRoute.id]?.corridorId).toBe('de-little-river-little-creek');
    expect(delawareRiverTripDetails[littleRiverRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(littleRiverRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(littleRiverRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'little-river-delaware-woodland-marsh-commons',
        takenLabel: 'Wikimedia Commons: public domain',
      }),
    ]);
  });

  it('includes the experienced-only Savages Ditch to New Road Rehoboth Bay water trail', () => {
    expect(rehobothBayRoute.state).toBe('Delaware');
    expect(rehobothBayRoute.gaugeSource).toMatchObject({
      siteId: '01484670',
      kind: 'proxy',
      siteName: 'Rehoboth Bay at Dewey Beach, DE',
    });
    expect(rehobothBayRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(rehobothBayRoute.statusText).toContain('experienced kayakers');
    expect(rehobothBayRoute.putIn).toMatchObject({ latitude: 38.6281667, longitude: -75.0705 });
    expect(rehobothBayRoute.takeOut).toMatchObject({ latitude: 38.6705, longitude: -75.0723333 });
    expect(delawareRiverTripDetails[rehobothBayRoute.id]?.corridorId).toBe('de-indian-river-masseys-rosedale');
    expect(delawareRiverTripDetails[rehobothBayRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(rehobothBayRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(rehobothBayRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'rehoboth-bay-savages-new-road-paddlefest',
        takenLabel: 'State of Delaware public-agency image',
      }),
    ]);
  });

  it('includes the bounded Murderkill River Bowers Beach same-launch tidal exploration', () => {
    expect(murderkillRoute.state).toBe('Delaware');
    expect(murderkillRoute.gaugeSource).toMatchObject({
      siteId: '01484085',
      kind: 'direct',
      siteName: 'Murderkill River at Bowers, DE',
    });
    expect(murderkillRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(murderkillRoute.statusText).toContain('both launch and return');
    expect(murderkillRoute.putIn?.latitude).toBeCloseTo(39.0585667);
    expect(murderkillRoute.putIn?.longitude).toBeCloseTo(-75.3976694);
    expect(murderkillRoute.takeOut?.latitude).toBeCloseTo(39.0585667);
    expect(murderkillRoute.takeOut?.longitude).toBeCloseTo(-75.3976694);
    expect(delawareRiverTripDetails[murderkillRoute.id]?.corridorId).toBe('de-murderkill-bowers-beach-loop');
    expect(delawareRiverTripDetails[murderkillRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(murderkillRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(murderkillRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'murderkill-river-bowers-beach-town',
        takenLabel: 'Official town public-agency image',
      }),
    ]);
  });

  it('includes the bounded Miller Creek Strawberry-to-Sassafras tidal route', () => {
    expect(millerCreekRoute.state).toBe('Delaware');
    expect(millerCreekRoute.gaugeSource).toMatchObject({
      siteId: '01484701',
      kind: 'direct',
      siteName: 'Little Assawoman Bay at Fenwick Island, DE',
    });
    expect(millerCreekRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(millerCreekRoute.statusText).toContain('Strawberry and Sassafras Landings');
    expect(millerCreekRoute.putIn?.latitude).toBeCloseTo(38.5010287);
    expect(millerCreekRoute.putIn?.longitude).toBeCloseTo(-75.0712119);
    expect(millerCreekRoute.takeOut?.latitude).toBeCloseTo(38.49961);
    expect(millerCreekRoute.takeOut?.longitude).toBeCloseTo(-75.0845639);
    expect(delawareRiverTripDetails[millerCreekRoute.id]?.corridorId).toBe('de-miller-creek-strawberry-sassafras');
    expect(delawareRiverTripDetails[millerCreekRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(millerCreekRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(millerCreekRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'miller-creek-assawoman-wildlife-area-tourism',
        takenLabel: 'Official tourism image; source page credited',
      }),
    ]);
  });

  it('includes the bounded Duck Creek Woodland Beach same-launch tidal exploration', () => {
    expect(duckCreekRoute.state).toBe('Delaware');
    expect(duckCreekRoute.gaugeSource).toMatchObject({
      siteId: '01483335',
      kind: 'proxy',
      siteName: 'Duck Creek at Smyrna, DE (historical/discontinued estuary station)',
    });
    expect(duckCreekRoute.safetyProfile?.reviewStatus).toBe('reviewed');
    expect(duckCreekRoute.statusText).toContain('both launch and return');
    expect(duckCreekRoute.putIn?.latitude).toBeCloseTo(39.3258406);
    expect(duckCreekRoute.putIn?.longitude).toBeCloseTo(-75.4750165);
    expect(duckCreekRoute.takeOut?.latitude).toBeCloseTo(39.3258406);
    expect(duckCreekRoute.takeOut?.longitude).toBeCloseTo(-75.4750165);
    expect(delawareRiverTripDetails[duckCreekRoute.id]?.corridorId).toBe('de-duck-creek-woodland-beach');
    expect(delawareRiverTripDetails[duckCreekRoute.id]?.logistics.campingClassification).toBe('nearby_basecamp');
    expect(corridorForSlug(duckCreekRoute.slug)?.continuityStatus).toBe('partial');
    expect(getApprovedRoutePhotos(duckCreekRoute.slug)).toEqual([
      expect.objectContaining({
        id: 'duck-creek-woodland-beach-tourism',
        takenLabel: 'Official tourism image; source page credited',
      }),
    ]);
  });
});
