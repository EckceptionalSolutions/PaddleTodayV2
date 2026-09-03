import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

type ReviewEndpoint = {
  routeId: string;
  endpoint: string;
  endpointName: string;
  suggestion?: { autoApplyEligible?: boolean } | null;
  canonicalAccessStatus?: string | null;
  authoritativeAccessCandidates?: Array<{
    name?: string | null;
    officialName?: string | null;
    coordinateRole?: string | null;
    featureId?: string;
  }>;
  nearbyAuthoritativeCandidates?: Array<{ name?: string | null }>;
  researchClues?: Array<{ kind?: string }>;
};

type CoordinateArtifactItem = {
  routeId: string;
  endpoint: string;
  endpointName: string;
  latitude?: number;
  longitude?: number;
  current?: { latitude: number; longitude: number };
  passed?: boolean;
  canonicalAccessStatus?: string | null;
  recommended?: { kind?: string; autoApplyEligible?: boolean } | null;
  endpointNameMatch?: 'exact-name' | 'coordinate-alias' | 'missing';
  currentEndpointName?: string | null;
};

const reviewHtml = readFileSync(
  path.join(process.cwd(), 'docs', 'route-coordinate-failure-review.html'),
  'utf8',
);
const payloadMatch = reviewHtml.match(/<script id="payload" type="application\/json">([^<]+)<\/script>/);
if (!payloadMatch?.[1]) throw new Error('Coordinate review payload is missing from the generated dashboard.');
const payload = JSON.parse(payloadMatch[1]) as { endpoints: ReviewEndpoint[] };
const suggestions = JSON.parse(readFileSync(
  path.join(process.cwd(), 'docs', 'route-coordinate-suggestions.json'),
  'utf8',
)) as { items: CoordinateArtifactItem[] };
const validation = JSON.parse(readFileSync(
  path.join(process.cwd(), 'docs', 'route-coordinate-auto-validation.json'),
  'utf8',
)) as { results: CoordinateArtifactItem[] };
const audit = JSON.parse(readFileSync(
  path.join(process.cwd(), 'docs', 'route-coordinate-river-audit.json'),
  'utf8',
)) as {
  endpoints: Array<{
    routeId: string;
    endpointName: string;
    severity: string;
    endpointOnWaterbody?: boolean;
    coordinateEvidenceRole?: string | null;
  }>;
};
const registry = JSON.parse(readFileSync(
  path.join(process.cwd(), 'src', 'data', 'generated', 'route-access-registry.json'),
  'utf8',
)) as {
  entries: Array<{
    name: string;
    verificationStatus: string;
    coordinateStatus: string;
    routeCount: number;
    accessCoordinate: { latitude: number; longitude: number } | null;
    waterEntryCoordinate: { latitude: number; longitude: number } | null;
    authoritativeAccess: {
      provider?: string;
      waterbody?: string | null;
      coordinateRole?: string | null;
      terminalAlternateWaterbody?: {
        routeWaterbody?: string;
        relationship?: string;
        maximumConnectionDistanceFeet?: number;
      } | null;
    } | null;
    authoritativeFacilityAnchor?: {
      provider?: string;
      featureId?: string;
      coordinateRole?: string | null;
    } | null;
    authoritativeAreaAnchor?: { provider?: string; featureId?: string; coordinateRole?: string } | null;
    storedCoordinateIsAreaAnchor?: boolean;
    authoritativeAccessIdentityMismatch?: boolean;
    authoritativeAccessMismatchFeet?: number | null;
  }>;
};
const withheldSource = readFileSync(
  path.join(process.cwd(), 'src', 'data', 'generated', 'withheld-route-slugs.ts'),
  'utf8',
);

describe('generated route coordinate review dashboard', () => {
  it('labels research leads as non-corrections and makes their controls pan-only', () => {
    expect(reviewHtml).toContain('Research leads — not verified corrections');
    expect(reviewHtml).toContain('Panning to one does not change the proposed coordinate.');
    expect(reviewHtml).toContain("button.addEventListener('click',()=>map.setView([Number(button.dataset.lat),Number(button.dataset.lon)],16))");
  });

  it('does not keep Wargo Nature Center in the queue after the official map identifies it as return-only', () => {
    expect(audit.endpoints.some((endpoint) =>
      endpoint.routeId === 'rice-creek-peltier-to-long-lake'
      && endpoint.endpointName === 'George Watch Lake / Wargo Nature Center')).toBe(false);
    expect(payload.endpoints.some((endpoint) =>
      endpoint.routeId === 'rice-creek-peltier-to-long-lake'
      && endpoint.endpointName === 'George Watch Lake / Wargo Nature Center')).toBe(false);
  });

  it('keeps differently named nearby official locations out of autonomous corrections', () => {
    const landing = payload.endpoints.find((endpoint) =>
      endpoint.routeId === 'fox-river-princeton-white-river-locks'
      && endpoint.endpoint === 'accessPoint');
    expect(landing?.nearbyAuthoritativeCandidates?.map((candidate) => candidate.name))
      .toContain('Fox River Access');
    expect(landing?.suggestion?.autoApplyEligible ?? false).toBe(false);
  });

  it('distinguishes an app alias from the official published access label', () => {
    expect(reviewHtml).toContain('Official published label:');
  });

  it('removes still-matching passed corrections from the unresolved triage feed', () => {
    const unresolvedKeys = new Set(suggestions.items.map((item) =>
      `${item.routeId}:${item.endpoint}:${item.endpointName}`));
    const passedAtCurrentCoordinate = validation.results.filter((result) => result.passed);
    for (const result of passedAtCurrentCoordinate) {
      const suggestion = suggestions.items.find((item) =>
        item.routeId === result.routeId
        && item.endpoint === result.endpoint
        && item.endpointName === result.endpointName);
      if (!suggestion?.current || result.latitude === undefined || result.longitude === undefined) continue;
      const stillMatches = Math.abs(suggestion.current.latitude - result.latitude) < 1e-8
        && Math.abs(suggestion.current.longitude - result.longitude) < 1e-8;
      if (stillMatches) expect(unresolvedKeys.has(`${result.routeId}:${result.endpoint}:${result.endpointName}`)).toBe(false);
    }
  });

  it('retains the documented downstream receiving-river terminal as one authoritative shared entry', () => {
    const name = 'ADM access site south of Southeast 9th Street';
    const routeIds = [
      'loup-river-monroe-adm-access',
      'loup-river-columbus-adm-access',
      'loup-river-george-syas-adm-access',
    ];
    const admRegistry = registry.entries.find((entry) => entry.name === name);
    expect(admRegistry).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      routeCount: 3,
      accessCoordinate: { latitude: 41.40165, longitude: -97.2893 },
      waterEntryCoordinate: { latitude: 41.40165, longitude: -97.2893 },
      authoritativeAccess: {
        provider: 'city_columbus_adm_access_exhibit',
        waterbody: 'Platte River',
      },
    });
    expect(suggestions.items.filter((item) => routeIds.includes(item.routeId) && item.endpointName === name)).toEqual([]);
    expect(validation.results
      .filter((result) => routeIds.includes(result.routeId) && result.endpointName === name)
      .map((result) => ({ routeId: result.routeId, passed: result.passed })))
      .toEqual(routeIds.map((routeId) => ({ routeId, passed: true })));
  });

  it('never treats an official property or fishing-area centroid as a launch', () => {
    const endpointName = 'George D. Syas WMA fishing access';
    const routeIds = [
      'loup-river-george-syas-adm-access',
      'loup-river-george-syas-columbus',
      'loup-river-george-syas-monroe',
    ];
    const audited = audit.endpoints.filter((endpoint) =>
      routeIds.includes(endpoint.routeId) && endpoint.endpointName === endpointName);
    expect(audited).toHaveLength(3);
    expect(audited.every((endpoint) => endpoint.severity === 'failure')).toBe(true);
    expect(audited.every((endpoint) => endpoint.coordinateEvidenceRole === 'authoritative-area-anchor')).toBe(true);

    const unresolved = suggestions.items.filter((item) =>
      routeIds.includes(item.routeId) && item.endpointName === endpointName);
    expect(unresolved).toHaveLength(3);
    expect(unresolved.every((item) => item.canonicalAccessStatus === 'area-anchor-only')).toBe(true);
    expect(unresolved.every((item) => item.recommended == null)).toBe(true);

    const reviewItems = payload.endpoints.filter((endpoint) =>
      routeIds.includes(endpoint.routeId) && endpoint.endpointName === endpointName);
    expect(reviewItems).toHaveLength(3);
    expect(reviewItems.every((endpoint) => endpoint.canonicalAccessStatus === 'area-anchor-only')).toBe(true);
    expect(reviewItems.every((endpoint) => endpoint.authoritativeAccessCandidates?.every((candidate) =>
      candidate.coordinateRole === 'authoritative-area-anchor'))).toBe(true);

    const canonical = registry.entries.find((entry) => entry.name === endpointName);
    expect(canonical).toMatchObject({
      verificationStatus: 'area-anchor-only',
      accessCoordinate: null,
      waterEntryCoordinate: null,
      authoritativeAccess: null,
      storedCoordinateIsAreaAnchor: true,
      authoritativeAreaAnchor: {
        provider: 'ne_ngpc_george_syas_wma_area_anchor',
        featureId: 'PHA-NGPC-0000104',
        coordinateRole: 'authoritative-area-anchor',
      },
    });
    expect(reviewHtml).toContain('Current app point is an area centroid, not a launch');
    expect(reviewHtml).toContain('Official area anchor (not access)');
    expect(reviewHtml).toContain('River-point shortcut disabled for area centroid');
    expect(reviewHtml).toContain('cannot validate an endpoint-bounded route trace');
  });

  it('propagates the verified Squirrel Hollow water entry and resolves Adkins Bridge', () => {
    const endpointNames = ['Squirrel Hollow Park boat ramp', 'Squirrel Hollow Park', 'Adkins Bridge Access'];
    const audited = audit.endpoints.filter((endpoint) => endpointNames.includes(endpoint.endpointName));
    expect(audited).toHaveLength(3);
    expect(audited.every((endpoint) => endpoint.severity === 'ok' && endpoint.endpointOnWaterbody)).toBe(true);
    expect(suggestions.items.filter((item) => endpointNames.includes(item.endpointName))).toEqual([]);

    const squirrel = registry.entries.find((entry) => entry.name === 'Squirrel Hollow Park boat ramp');
    expect(squirrel).toMatchObject({
      verificationStatus: 'derived-consensus',
      routeCount: 2,
      accessCoordinate: { latitude: 41.95020622118407, longitude: -94.29071960545096 },
      waterEntryCoordinate: { latitude: 41.95019920963978, longitude: -94.29097621877891 },
      authoritativeAccess: { provider: 'ia_dnr' },
    });
    const adkins = registry.entries.find((entry) => entry.name === 'Adkins Bridge Access');
    expect(adkins).toMatchObject({
      verificationStatus: 'derived-consensus',
      accessCoordinate: { latitude: 41.91043797172368, longitude: -94.27414995414321 },
      waterEntryCoordinate: { latitude: 41.91055690276827, longitude: -94.27398896185606 },
      authoritativeAccess: { provider: 'ia_dnr' },
    });
  });

  it('keeps visually verified Fraser ramp edges resolved despite wide-river NHD offsets', () => {
    const expected = [
      {
        routeId: 'des-moines-river-skillet-north-fraser',
        endpointName: 'North Fraser Ramp',
        latitude: 42.128845280879865,
        longitude: -93.9816575422718,
      },
      {
        routeId: 'des-moines-river-south-fraser-waterworks-upstream',
        endpointName: 'South Fraser Ramp',
        latitude: 42.121928057011445,
        longitude: -93.97000884977254,
      },
    ];

    for (const item of expected) {
      const audited = audit.endpoints.find((endpoint) =>
        endpoint.routeId === item.routeId && endpoint.endpointName === item.endpointName);
      expect(audited).toMatchObject({ severity: 'review', endpointOnWaterbody: true });
      expect(suggestions.items.some((suggestion) =>
        suggestion.routeId === item.routeId && suggestion.endpointName === item.endpointName)).toBe(false);
      expect(payload.endpoints.some((endpoint) =>
        endpoint.routeId === item.routeId && endpoint.endpointName === item.endpointName)).toBe(false);
      expect(withheldSource).not.toContain(`"${item.routeId}"`);

      const canonical = registry.entries.find((entry) => entry.name === item.endpointName);
      expect(canonical).toMatchObject({
        verificationStatus: 'authoritative-water-entry',
        accessCoordinate: { latitude: item.latitude, longitude: item.longitude },
        waterEntryCoordinate: { latitude: item.latitude, longitude: item.longitude },
        authoritativeAccess: {
          provider: 'ia_dnr_boone_fraser_ramp_water_entries',
          coordinateRole: 'authoritative-water-entry',
        },
      });
    }
  });

  it('releases the visually verified Grant Park ramp edge and preserves its authoritative provenance', () => {
    const routeId = 'north-raccoon-river-white-horse-grant';
    const endpointName = 'Grant Park';
    const audited = audit.endpoints.find((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName);
    expect(audited).toMatchObject({ severity: 'ok', endpointOnWaterbody: true });
    expect(suggestions.items.some((suggestion) =>
      suggestion.routeId === routeId && suggestion.endpointName === endpointName)).toBe(false);
    expect(payload.endpoints.some((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName)).toBe(false);
    expect(withheldSource).not.toContain(`"${routeId}"`);

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      accessCoordinate: { latitude: 42.26488872243218, longitude: -94.89407327659016 },
      waterEntryCoordinate: { latitude: 42.26488872243218, longitude: -94.89407327659016 },
      authoritativeAccess: {
        provider: 'ia_sac_grant_park_ramp_water_entry',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases the exact Story County Lekwa ramp instead of the nearby Story City access', () => {
    const routeId = 'south-skunk-river-lekwa-sopers-mill';
    const endpointName = 'Lekwa Access #242';
    const audited = audit.endpoints.find((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName);
    expect(audited).toMatchObject({ severity: 'ok', endpointOnWaterbody: true });
    expect(suggestions.items.some((suggestion) =>
      suggestion.routeId === routeId && suggestion.endpointName === endpointName)).toBe(false);
    expect(payload.endpoints.some((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName)).toBe(false);
    expect(withheldSource).not.toContain(`"${routeId}"`);

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      accessCoordinate: { latitude: 42.16589098352227, longitude: -93.57800678866874 },
      waterEntryCoordinate: { latitude: 42.16589098352227, longitude: -93.57800678866874 },
      authoritativeAccess: {
        provider: 'ia_story_lekwa_ramp_water_entry',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases Plum Creek at the DNR carry-in instead of the downstream Wauzeka landing', () => {
    const routeId = 'kickapoo-river-plum-creek-highway-60';
    const endpointName = 'Plum Creek Landing';
    const audited = audit.endpoints.find((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName);
    expect(audited).toMatchObject({ severity: 'ok', endpointOnWaterbody: true });
    expect(suggestions.items.some((suggestion) =>
      suggestion.routeId === routeId && suggestion.endpointName === endpointName)).toBe(false);
    expect(payload.endpoints.some((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName)).toBe(false);
    expect(withheldSource).not.toContain(`"${routeId}"`);

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      accessCoordinate: { latitude: 43.11447615973171, longitude: -90.91265705884042 },
      waterEntryCoordinate: { latitude: 43.11447615973171, longitude: -90.91265705884042 },
      authoritativeAccess: {
        provider: 'wi_dnr_plum_creek_water_entry',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases Lincoln Drive at the official concrete ramp while keeping facility and water-entry coordinates distinct', () => {
    const routeId = 'red-river-lincoln-drive-downtown';
    const endpointName = 'Lincoln Drive Park Landing';
    const audited = audit.endpoints.find((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName);
    expect(audited).toMatchObject({ severity: 'review', endpointOnWaterbody: true });
    expect(suggestions.items.some((suggestion) =>
      suggestion.routeId === routeId && suggestion.endpointName === endpointName)).toBe(false);
    expect(payload.endpoints.some((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName)).toBe(false);
    expect(withheldSource).not.toContain(`"${routeId}"`);

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      accessCoordinate: { latitude: 47.90888410499237, longitude: -97.0226852800457 },
      waterEntryCoordinate: { latitude: 47.9086867, longitude: -97.0228156 },
      authoritativeFacilityAnchor: {
        provider: 'ndgf_lincoln_drive_park_ramp_access_anchor',
        featureId: '1427',
        coordinateRole: 'authoritative-access-anchor',
      },
      authoritativeAccess: {
        provider: 'ndgf_lincoln_drive_park_ramp_water_entry',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases the Rum River Central Park north launch and survives its clarified endpoint label', () => {
    const routeId = 'rum-river-north-county-central';
    const endpointName = 'Rum River Central Regional Park north boat launch';
    const audited = audit.endpoints.find((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName);
    expect(audited).toMatchObject({ severity: 'ok', endpointOnWaterbody: true });
    expect(suggestions.items.some((suggestion) =>
      suggestion.routeId === routeId && suggestion.endpointName === endpointName)).toBe(false);
    expect(payload.endpoints.some((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName)).toBe(false);
    expect(withheldSource).not.toContain(`"${routeId}"`);

    expect(validation.results.find((result) =>
      result.routeId === routeId && result.endpoint === 'takeOut')).toMatchObject({
      endpointName: 'Rum River Central Regional Park access',
      endpointNameMatch: 'coordinate-alias',
      currentEndpointName: endpointName,
      passed: true,
    });

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      accessCoordinate: { latitude: 45.29650724857649, longitude: -93.3770290219422 },
      waterEntryCoordinate: { latitude: 45.2965261, longitude: -93.3770154 },
      authoritativeFacilityAnchor: {
        provider: 'mn_dnr_rum_central_north_ramp_access_anchor',
        featureId: 'WAS02199',
        coordinateRole: 'authoritative-access-anchor',
      },
      authoritativeAccess: {
        provider: 'mn_dnr_rum_central_north_ramp_water_entry',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases only the official Upper Tyler Bend launch while preserving its separate parking anchor', () => {
    const endpointName = 'Tyler Bend river access';
    const routeIds = [
      'buffalo-river-tyler-bend-gilbert',
      'buffalo-river-tyler-bend-grinders-ferry',
    ];
    const audited = audit.endpoints.filter((endpoint) =>
      routeIds.includes(endpoint.routeId) && endpoint.endpointName === endpointName);
    expect(audited).toHaveLength(2);
    expect(audited.every((endpoint) =>
      endpoint.severity === 'review' && endpoint.endpointOnWaterbody)).toBe(true);
    expect(suggestions.items.filter((suggestion) =>
      routeIds.includes(suggestion.routeId) && suggestion.endpointName === endpointName)).toEqual([]);
    expect(payload.endpoints.filter((endpoint) =>
      routeIds.includes(endpoint.routeId) && endpoint.endpointName === endpointName)).toEqual([]);
    expect(routeIds.every((routeId) => !withheldSource.includes(`"${routeId}"`))).toBe(true);
    expect(validation.results.filter((result) =>
      routeIds.includes(result.routeId) && result.endpointName === endpointName)
      .map((result) => result.passed)).toEqual([true, true]);

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      routeCount: 2,
      accessCoordinate: { latitude: 35.98945174285715, longitude: -92.76458457142856 },
      waterEntryCoordinate: { latitude: 35.9894782, longitude: -92.766846 },
      authoritativeFacilityAnchor: {
        provider: 'nps_buff_tyler_bend_upper_access_anchor',
        featureId: 'tyler-bend-upper-launch-parking',
        coordinateRole: 'authoritative-access-anchor',
      },
      authoritativeAccess: {
        provider: 'nps_buff_tyler_bend_upper_water_entry',
        featureId: 'tyler-bend-upper-launch-water-edge',
        waterbody: 'Buffalo River',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases Gallup Park only at the official livery dock while preserving its separate parking anchor', () => {
    const routeId = 'huron-river-argo-gallup';
    const endpointName = 'Gallup Park Livery public launch';
    const audited = audit.endpoints.filter((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName);
    expect(audited).toHaveLength(1);
    expect(audited[0]).toMatchObject({ severity: 'review', endpointOnWaterbody: true });
    expect(suggestions.items.filter((suggestion) =>
      suggestion.routeId === routeId && suggestion.endpointName === endpointName)).toEqual([]);
    expect(payload.endpoints.filter((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName)).toEqual([]);
    expect(withheldSource).not.toContain(`"${routeId}"`);
    expect(validation.results.find((result) =>
      result.routeId === routeId && result.endpointName === endpointName)).toMatchObject({
      latitude: 42.27662607766229,
      longitude: -83.69985349633218,
      endpointNameMatch: 'exact-name',
      passed: true,
    });

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      routeCount: 1,
      accessCoordinate: { latitude: 42.27745806678361, longitude: -83.70093871498436 },
      waterEntryCoordinate: { latitude: 42.27662607766229, longitude: -83.69985349633218 },
      authoritativeFacilityAnchor: {
        provider: 'ann_arbor_gallup_livery_parking_anchor',
        featureId: 'ParkSymbols-755',
        coordinateRole: 'authoritative-access-anchor',
      },
      authoritativeAccess: {
        provider: 'ann_arbor_gallup_livery_boat_dock_water_entry',
        waterbody: 'Huron River',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases Rockhouse only at the visually corroborated gravel launch while keeping it outside unattended auto-apply', () => {
    const routeId = 'kings-river-rockhouse-trigger-gap';
    const endpointName = 'Rockhouse Access';
    const audited = audit.endpoints.filter((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName);
    expect(audited).toHaveLength(1);
    expect(audited[0]).toMatchObject({ severity: 'review', endpointOnWaterbody: true });
    expect(suggestions.items.filter((suggestion) =>
      suggestion.routeId === routeId && suggestion.endpointName === endpointName)).toEqual([]);
    expect(payload.endpoints.filter((endpoint) =>
      endpoint.routeId === routeId && endpoint.endpointName === endpointName)).toEqual([]);
    expect(withheldSource).not.toContain(`"${routeId}"`);

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      routeCount: 1,
      accessCoordinate: { latitude: 36.282, longitude: -93.66465625 },
      waterEntryCoordinate: { latitude: 36.28193372205891, longitude: -93.6639968409015 },
      authoritativeFacilityAnchor: {
        provider: 'agfc_rockhouse_access_anchor',
        featureId: 'rockhouse-gravel-turnaround-aerial',
        coordinateRole: 'authoritative-access-anchor',
      },
      authoritativeAccess: {
        provider: 'agfc_rockhouse_water_entry',
        waterbody: 'Kings River',
        coordinateRole: 'authoritative-water-entry',
      },
    });
  });

  it('releases Rice Creek only after separating facility anchors from exact water entries', () => {
    const routeId = 'rice-creek-peltier-to-long-lake';
    const aquaName = 'Aqua Lane / Rice Lake carry-in';
    const longLakeName = 'Long Lake Boat Landing / Long Lake Regional Park';
    const audited = audit.endpoints.filter((endpoint) =>
      endpoint.routeId === routeId && [aquaName, longLakeName].includes(endpoint.endpointName));
    expect(audited).toHaveLength(2);
    expect(audited.every((endpoint) =>
      endpoint.severity === 'review'
      && endpoint.coordinateEvidenceRole === 'authoritative-water-entry')).toBe(true);
    expect(suggestions.items.filter((suggestion) => suggestion.routeId === routeId)).toEqual([]);
    expect(payload.endpoints.filter((endpoint) => endpoint.routeId === routeId)).toEqual([]);
    expect(withheldSource).not.toContain(`"${routeId}"`);

    expect(registry.entries.find((entry) => entry.name === aquaName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      accessCoordinate: { latitude: 45.16345300863823, longitude: -93.11550719468936 },
      waterEntryCoordinate: { latitude: 45.1637486, longitude: -93.1154357 },
      authoritativeFacilityAnchor: {
        provider: 'mn_dnr_rice_creek_aqua_lane_access_anchor',
        featureId: 'WAS02907',
        coordinateRole: 'authoritative-access-anchor',
      },
      authoritativeAccess: {
        provider: 'anoka_rice_creek_aqua_lane_water_entry',
        waterbody: 'Rice Creek',
        coordinateRole: 'authoritative-water-entry',
      },
    });

    expect(registry.entries.find((entry) => entry.name === longLakeName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      accessCoordinate: { latitude: 45.06695, longitude: -93.19715 },
      waterEntryCoordinate: { latitude: 45.067051559502666, longitude: -93.19737064139412 },
      authoritativeFacilityAnchor: {
        provider: 'ramsey_long_lake_boat_landing_parking_anchor',
        featureId: 'long-lake-boat-landing-parking-lot',
        coordinateRole: 'authoritative-access-anchor',
      },
      authoritativeAccess: {
        provider: 'mn_dnr_rice_creek_long_lake_water_entry',
        waterbody: 'Long Lake',
        coordinateRole: 'authoritative-water-entry',
        terminalAlternateWaterbody: {
          routeWaterbody: 'Rice Creek',
          relationship: 'connected-water-trail-waterbody',
          maximumConnectionDistanceFeet: 6600,
        },
      },
    });
  });

  it('releases the official Decker Creek stop while preserving its tributary topology and access caveat', () => {
    const endpointName = 'Platte River State Park Decker Creek canoe/kayak access';
    const routeIds = [
      'platte-river-schramm-platte-river-state-park',
      'platte-river-platte-river-state-park-louisville',
    ];
    const audited = audit.endpoints.filter((endpoint) =>
      routeIds.includes(endpoint.routeId) && endpoint.endpointName === endpointName);
    expect(audited).toHaveLength(2);
    expect(audited.every((endpoint) => endpoint.severity === 'ok')).toBe(true);
    expect(suggestions.items.filter((suggestion) =>
      routeIds.includes(suggestion.routeId) && suggestion.endpointName === endpointName)).toEqual([]);
    expect(payload.endpoints.filter((endpoint) =>
      routeIds.includes(endpoint.routeId) && endpoint.endpointName === endpointName)).toEqual([]);
    expect(routeIds.every((routeId) => !withheldSource.includes(`"${routeId}"`))).toBe(true);
    expect(validation.results.filter((result) =>
      routeIds.includes(result.routeId) && result.endpointName === endpointName)
      .map((result) => result.passed)).toEqual([true, true]);

    expect(registry.entries.find((entry) => entry.name === endpointName)).toMatchObject({
      verificationStatus: 'authoritative-water-entry',
      coordinateStatus: 'consistent',
      routeCount: 2,
      accessCoordinate: { latitude: 40.99302, longitude: -96.20843 },
      waterEntryCoordinate: { latitude: 40.99302, longitude: -96.20843 },
      authoritativeAccess: {
        provider: 'ne_ngpc_platte_state_park_decker_creek_water_entry',
        waterbody: 'Decker Creek',
        coordinateRole: 'authoritative-water-entry',
        terminalAlternateWaterbody: {
          routeWaterbody: 'Platte River',
          relationship: 'tributary-before-confluence',
          maximumConnectionDistanceFeet: 1500,
        },
      },
    });
  });

  it('keeps exact-name mismatch safeguards active after clearing current conflicts', () => {
    expect(registry.entries.filter((entry) =>
      entry.verificationStatus === 'authoritative-access-mismatch')).toEqual([]);
    expect(payload.endpoints.filter((endpoint) =>
      endpoint.canonicalAccessStatus === 'authoritative-access-mismatch')).toEqual([]);
    expect(reviewHtml).toContain('Current app point contradicts the exact named government access');
    expect(reviewHtml).toContain('River-point shortcut disabled for access identity mismatch');
    expect(reviewHtml).toContain('Provisional source-river context only — the current point contradicts the exact named government access');
    expect(reviewHtml).toContain("e?.canonicalAccessStatus==='authoritative-access-mismatch'||!reach?.geometry?.coordinates");
  });
});
