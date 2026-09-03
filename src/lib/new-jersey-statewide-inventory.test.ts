import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { newJerseyRoutes } from '../data/routes/new-jersey';
import { newJerseyRiverTripDetails } from '../data/trip-details/new-jersey';
import { getApprovedRoutePhotos } from '../data/route-gallery';

type NewJerseyInventory = {
  stateId: string;
  stateName: string;
  statewideAccess: {
    featureCount: number;
    returnedFeatureCount: number;
    sites: Array<{ id: string; latitude: number; longitude: number }>;
  };
  usgsStreamInventory: {
    queryUrl: string;
    siteCount: number;
    waterwayLeadCount: number;
    prioritizedUnreconciledLeadCount: number;
    leads: Array<{ name: string; siteCount: number; sampleStations: string[]; catalogMatch: string | null }>;
  };
  prioritizedLeadReviews: Array<{
    lead: string;
    disposition: string;
    reason: string;
    retryCondition: string;
    sourceIds: string[];
  }>;
  corridorFamilies: Array<{
    name: string;
    disposition: string;
    routeSlugs: string[];
  }>;
  reconciliation: {
    currentNewJerseyRouteCount: number;
    implementedCorridorCount: number;
    routeCandidateCount: number;
    blockedCount: number;
    screenedOutCount: number;
  };
};

type AccessControls = {
  providers: Array<{
    state: string;
    controls: Array<{
      featureId: string;
      waterbody: string;
      latitude: number;
      longitude: number;
    }>;
  }>;
};

type BlockedCorridorLedger = {
  candidates: Array<{ corridor: string; disposition: string; reason: string; retryCondition: string }>;
};

const inventory = JSON.parse(
  readFileSync('docs/operations/new-jersey-statewide-inventory.json', 'utf8'),
) as NewJerseyInventory;
const accessControls = JSON.parse(
  readFileSync('src/data/route-access-official-map-controls.json', 'utf8'),
) as AccessControls;
const blockedCorridorLedger = JSON.parse(
  readFileSync('docs/operations/new-jersey-blocked-corridor-ledger.json', 'utf8'),
) as BlockedCorridorLedger;

describe('New Jersey statewide inventory and route package', () => {
  it('retains a complete statewide NJDEP access baseline', () => {
    const ids = inventory.statewideAccess.sites.map((site) => site.id);

    expect(inventory.stateId).toBe('NJ');
    expect(inventory.stateName).toBe('New Jersey');
    expect(inventory.statewideAccess.featureCount).toBe(inventory.statewideAccess.returnedFeatureCount);
    expect(inventory.statewideAccess.featureCount).toBe(inventory.statewideAccess.sites.length);
    const coordinates = inventory.statewideAccess.sites.map((site) => `${site.id}:${site.latitude}:${site.longitude}`);
    expect(new Set(coordinates).size).toBe(coordinates.length);
    expect(inventory.statewideAccess.sites.every((site) => (
      site.id && Number.isFinite(site.latitude) && Number.isFinite(site.longitude)
    ))).toBe(true);
  });

  it('reconciles every corridor family into a candidate, block, or screen disposition', () => {
    expect(inventory.corridorFamilies.length).toBeGreaterThanOrEqual(15);
    expect(inventory.corridorFamilies.every((corridor) => (
      corridor.name && corridor.disposition && Array.isArray(corridor.routeSlugs)
    ))).toBe(true);
    expect(inventory.reconciliation.implementedCorridorCount).toBeGreaterThan(0);
    expect(inventory.reconciliation.routeCandidateCount).toBeGreaterThan(0);
    expect(inventory.reconciliation.blockedCount).toBeGreaterThan(0);
    expect(inventory.reconciliation.screenedOutCount).toBeGreaterThan(0);
  });

  it('keeps every blocked or screened corridor family in the durable ledger', () => {
    const ledgerByCorridor = new Map(blockedCorridorLedger.candidates.map((candidate) => [candidate.corridor, candidate]));
    const blockedOrScreened = inventory.corridorFamilies.filter((corridor) => (
      corridor.disposition.startsWith('blocked') || corridor.disposition.startsWith('screened')
    ));

    expect(blockedCorridorLedger.candidates).toHaveLength(blockedOrScreened.length);
    for (const corridor of blockedOrScreened) {
      const ledgerEntry = ledgerByCorridor.get(corridor.name);
      expect(ledgerEntry, corridor.name).toBeTruthy();
      expect(ledgerEntry?.disposition).toBe(corridor.disposition);
      expect(ledgerEntry?.reason.length).toBeGreaterThan(20);
      expect(ledgerEntry?.retryCondition.length).toBeGreaterThan(20);
    }
  });

  it('retains the queried statewide USGS stream inventory as an explicit review frontier', () => {
    expect(inventory.usgsStreamInventory.queryUrl).toContain('stateCd=nj');
    expect(inventory.usgsStreamInventory.siteCount).toBeGreaterThan(1000);
    expect(inventory.usgsStreamInventory.waterwayLeadCount).toBeGreaterThan(100);
    expect(inventory.usgsStreamInventory.prioritizedUnreconciledLeadCount).toBeGreaterThan(0);
    expect(inventory.usgsStreamInventory.leads.every((lead) => (
      lead.name && lead.siteCount > 0 && lead.sampleStations.length > 0
    ))).toBe(true);
  });

  it('gives every prioritized USGS lead an explicit reconciliation disposition', () => {
    expect(inventory.prioritizedLeadReviews).toHaveLength(inventory.usgsStreamInventory.prioritizedUnreconciledLeadCount);
    expect(inventory.prioritizedLeadReviews.every((review) => (
      review.lead
      && review.disposition
      && review.reason.length > 40
      && review.retryCondition.length > 40
      && review.sourceIds.includes('usgs-new-jersey-site-inventory')
      && review.sourceIds.includes('njdep-public-access-layer')
    ))).toBe(true);
  });

  it('keeps every published NJ route fully qualified for planning-only publication', () => {
    expect(newJerseyRoutes).toHaveLength(36);
    expect(inventory.reconciliation.currentNewJerseyRouteCount).toBe(36);
    expect(newJerseyRoutes.map((route) => route.id)).toEqual(expect.arrayContaining([
      'delaware-river-kittatinny-worthington',
      'delaware-river-worthington-poxono',
      'delaware-river-frenchtown-kingwood',
      'delaware-river-kingwood-fairview',
      'delaware-river-fairview-byram',
      'delaware-river-byram-bulls-island',
      'delaware-river-lambertville-firemens-eddy',
      'delaware-river-firemens-eddy-washington-crossing',
      'millstone-river-lincoln-avenue-park-out-and-back',
      'south-branch-raritan-river-sunnyside-stanton-station',
      'north-branch-raritan-river-burnt-mills-confluence',
      'passaic-river-suchorsky-pennington-park',
      'great-egg-harbor-river-weymouth-lake-lenape',
      'pequest-river-route-46-orchard-street',
      'paulins-kill-garrison-route-94',
      'manasquan-river-hospital-brice',
      'salem-river-mannington-salem',
      'toms-river-pine-beach-henley',
      'toms-river-pine-beach-gilford',
      'cohansey-river-bridgeton-back-neck',
      'alloway-creek-quinton-hancocks-bridge',
      'rancocas-creek-iron-works-hainesport',
      'cedar-creek-ore-pond-dudley-park',
      'maurice-river-ndelsea-fowser',
      'passaic-river-dundee-garfield',
    ]));

    for (const route of newJerseyRoutes) {
      expect(route.state).toBe('New Jersey');
      expect(route.putIn?.latitude).toEqual(expect.any(Number));
      expect(route.putIn?.longitude).toEqual(expect.any(Number));
      expect(route.takeOut?.latitude).toEqual(expect.any(Number));
      expect(route.takeOut?.longitude).toEqual(expect.any(Number));
      expect(route.accessPoints?.length).toBeGreaterThan(0);
      expect(route.logistics).toBeTruthy();
      expect(route.safetyProfile?.reviewStatus).toBe('reviewed');
      expect(route.evidenceNotes?.length).toBeGreaterThanOrEqual(4);
      expect(route.sourceLinks?.length).toBeGreaterThanOrEqual(3);
      expect(route.evidenceNotes?.some((note) => (
        note.label === 'Approved route imagery' && note.sourceUrl.startsWith('https://')
      ))).toBe(true);
    }
  });

  it('keeps endpoint controls, trip details, and imagery aligned per published route', () => {
    const controls = accessControls.providers
      .filter((provider) => provider.state === 'New Jersey')
      .flatMap((provider) => provider.controls);
    const controlsById = new Map(controls.map((control) => [control.featureId, control]));

    expect(accessControls.providers).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'nps_dewa_new_jersey_delaware_access_2026' }),
    ]));

    for (const route of newJerseyRoutes) {
      expect(newJerseyRiverTripDetails[route.id]).toBeTruthy();
      expect(getApprovedRoutePhotos(route.id).length).toBeGreaterThan(0);
      for (const accessPoint of route.accessPoints ?? []) {
        const control = controlsById.get(accessPoint.id);
        expect(control, `${route.id} access control ${accessPoint.id}`).toBeTruthy();
        expect(control?.latitude).toBeCloseTo(accessPoint.latitude, 6);
        expect(control?.longitude).toBeCloseTo(accessPoint.longitude, 6);
        expect(control?.waterbody).toContain(route.name.split(' ')[0]);
      }
    }
  });
});
