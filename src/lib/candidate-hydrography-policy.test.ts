import { describe, expect, it } from 'vitest';
import {
  canDirectNhdVerifyMappedLaunch,
  canOfficialWaterbodyRecoverUnreliableTerminalGeometry,
  canRecoverMappedNamedTerminalWaterbody,
  canRecoverNamedTerminalWaterbody,
  canVerifyFreshWideRiverBank,
  canVerifyOfficialSiteMapDerivedRamp,
  canVerifyOfficialTerminalAlternateWaterbodyRamp,
  directNhdRouteGeometryLimitFeet,
} from '../../scripts/lib/candidate-hydrography-policy';

describe('direct NHD candidate geometry policy', () => {
  it('allows a conservative bank-to-centerline offset for a verified waterbody projection', () => {
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'projected-to-waterbody',
      nearestIntendedFlowlineFeet: 442,
      nearestWaterbodyFeet: 73,
      onNhdWaterbody: false,
    })).toBe(500);
  });

  it('allows the same bank offset when an official point is directly on the waterbody', () => {
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'on-waterbody',
      nearestIntendedFlowlineFeet: 28,
      nearestWaterbodyFeet: 0,
      onNhdWaterbody: true,
    })).toBe(500);
  });

  it('retains the 300-foot limit for flowline projections', () => {
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'projected-to-flowline',
      nearestIntendedFlowlineFeet: 100,
      nearestWaterbodyFeet: 100,
      onNhdWaterbody: false,
    })).toBe(300);
  });

  it('allows a bounded terminal-endpoint recovery for a nearby named flowline projection', () => {
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'projected-to-flowline',
      nearestIntendedFlowlineFeet: 250,
      nearestWaterbodyFeet: 151,
      onNhdWaterbody: false,
      terminalEndpoint: true,
    })).toBe(800);
  });

  it('does not extend terminal recovery to intermediate points or distant flowlines', () => {
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'projected-to-flowline',
      nearestIntendedFlowlineFeet: 250,
      nearestWaterbodyFeet: 0,
      onNhdWaterbody: false,
      terminalEndpoint: false,
    })).toBe(300);
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'projected-to-flowline',
      nearestIntendedFlowlineFeet: 251,
      nearestWaterbodyFeet: 0,
      onNhdWaterbody: false,
      terminalEndpoint: true,
    })).toBe(300);
  });

  it('retains the 300-foot limit when waterbody or intended-flowline evidence is too distant', () => {
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'projected-to-waterbody',
      nearestIntendedFlowlineFeet: 801,
      nearestWaterbodyFeet: 149,
      onNhdWaterbody: false,
    })).toBe(300);
    expect(directNhdRouteGeometryLimitFeet({
      mode: 'projected-to-waterbody',
      nearestIntendedFlowlineFeet: 100,
      nearestWaterbodyFeet: 151,
      onNhdWaterbody: false,
    })).toBe(300);
  });

  it('allows an exact official terminal water entry to replace a bounded unreliable trace', () => {
    expect(canOfficialWaterbodyRecoverUnreliableTerminalGeometry({
      mode: 'on-waterbody',
      nearestIntendedFlowlineFeet: 28,
      nearestWaterbodyFeet: 0,
      onNhdWaterbody: true,
      terminalEndpoint: true,
      routeGeometryDistanceFeet: 3_819,
      routeGeometryReliable: false,
      officialAnchorToWaterEntryFeet: 0,
      ambiguousOfficialCandidates: false,
    })).toBe(true);
  });

  it('blocks unreliable-trace recovery for intermediate, ambiguous, distant, or already reliable cases', () => {
    const base = {
      mode: 'on-waterbody' as const,
      nearestIntendedFlowlineFeet: 28,
      nearestWaterbodyFeet: 0,
      onNhdWaterbody: true,
      terminalEndpoint: true,
      routeGeometryDistanceFeet: 3_819,
      routeGeometryReliable: false,
      officialAnchorToWaterEntryFeet: 0,
      ambiguousOfficialCandidates: false,
    };
    expect(canOfficialWaterbodyRecoverUnreliableTerminalGeometry({ ...base, terminalEndpoint: false })).toBe(false);
    expect(canOfficialWaterbodyRecoverUnreliableTerminalGeometry({ ...base, ambiguousOfficialCandidates: true })).toBe(false);
    expect(canOfficialWaterbodyRecoverUnreliableTerminalGeometry({ ...base, routeGeometryDistanceFeet: 5_281 })).toBe(false);
    expect(canOfficialWaterbodyRecoverUnreliableTerminalGeometry({ ...base, routeGeometryReliable: true })).toBe(false);
  });

  it('allows a short exact official correction onto a named terminal lake', () => {
    expect(canRecoverNamedTerminalWaterbody({
      terminalEndpoint: true,
      exactOfficialNameMatch: true,
      terminalNamedWaterbodyAgreement: true,
      mode: 'projected-to-waterbody',
      nearestIntendedFlowlineFeet: 2_066,
      nearestWaterbodyFeet: 193,
      officialAnchorToWaterEntryFeet: 193,
      candidateMoveFeet: 193,
      routeGeometryDistanceFeet: 2_018,
      routeGeometryReliable: false,
      ambiguousOfficialCandidates: false,
    })).toBe(true);
  });

  it('blocks named-lake recovery without exact identity or with a large correction', () => {
    const base = {
      terminalEndpoint: true,
      exactOfficialNameMatch: true,
      terminalNamedWaterbodyAgreement: true,
      mode: 'projected-to-waterbody' as const,
      nearestIntendedFlowlineFeet: 2_066,
      nearestWaterbodyFeet: 193,
      officialAnchorToWaterEntryFeet: 193,
      candidateMoveFeet: 193,
      routeGeometryDistanceFeet: 2_018,
      routeGeometryReliable: false,
      ambiguousOfficialCandidates: false,
    };
    expect(canRecoverNamedTerminalWaterbody({ ...base, exactOfficialNameMatch: false })).toBe(false);
    expect(canRecoverNamedTerminalWaterbody({ ...base, candidateMoveFeet: 301 })).toBe(false);
    expect(canRecoverNamedTerminalWaterbody({ ...base, terminalEndpoint: false })).toBe(false);
  });

  it('allows an exact official lake access to resolve to a nearby mapped launch', () => {
    expect(canRecoverMappedNamedTerminalWaterbody({
      terminalEndpoint: true,
      mappedLaunch: true,
      exactOfficialNameMatch: true,
      terminalNamedWaterbodyAgreement: true,
      nearestIntendedFlowlineFeet: 2_066,
      nearestWaterbodyFeet: 130,
      officialAnchorToMappedLaunchFeet: 104,
      candidateMoveFeet: 104,
      routeGeometryDistanceFeet: 2_130,
      routeGeometryReliable: false,
      ambiguousOfficialCandidates: false,
    })).toBe(true);
  });

  it('blocks mapped lake-launch recovery without a launch or tight local agreement', () => {
    const base = {
      terminalEndpoint: true,
      mappedLaunch: true,
      exactOfficialNameMatch: true,
      terminalNamedWaterbodyAgreement: true,
      nearestIntendedFlowlineFeet: 2_066,
      nearestWaterbodyFeet: 130,
      officialAnchorToMappedLaunchFeet: 104,
      candidateMoveFeet: 104,
      routeGeometryDistanceFeet: 2_130,
      routeGeometryReliable: false,
      ambiguousOfficialCandidates: false,
    };
    expect(canRecoverMappedNamedTerminalWaterbody({ ...base, mappedLaunch: false })).toBe(false);
    expect(canRecoverMappedNamedTerminalWaterbody({ ...base, officialAnchorToMappedLaunchFeet: 151 })).toBe(false);
    expect(canRecoverMappedNamedTerminalWaterbody({ ...base, nearestWaterbodyFeet: 201 })).toBe(false);
  });

  it('directly verifies a named mapped launch using candidate-specific NHD evidence', () => {
    expect(canDirectNhdVerifyMappedLaunch({
      mappedLaunch: true,
      directQueryVerified: true,
      intendedFlowlineNameAgreement: true,
      nearestIntendedFlowlineFeet: 118,
      nearestWaterbodyFeet: 67,
      routeGeometryDistanceFeet: 118,
      candidateMoveFeet: 1_211,
      ambiguousOfficialCandidates: false,
      accessIdentityStrong: true,
    })).toBe(true);
  });

  it('blocks direct mapped-launch verification when any independent safeguard is missing', () => {
    const base = {
      mappedLaunch: true,
      directQueryVerified: true,
      intendedFlowlineNameAgreement: true,
      nearestIntendedFlowlineFeet: 118,
      nearestWaterbodyFeet: 67,
      routeGeometryDistanceFeet: 118,
      candidateMoveFeet: 1_211,
      ambiguousOfficialCandidates: false,
      accessIdentityStrong: true,
    };
    expect(canDirectNhdVerifyMappedLaunch({ ...base, intendedFlowlineNameAgreement: false })).toBe(false);
    expect(canDirectNhdVerifyMappedLaunch({ ...base, directQueryVerified: false })).toBe(false);
    expect(canDirectNhdVerifyMappedLaunch({ ...base, nearestIntendedFlowlineFeet: 151 })).toBe(false);
    expect(canDirectNhdVerifyMappedLaunch({ ...base, nearestWaterbodyFeet: 151 })).toBe(false);
    expect(canDirectNhdVerifyMappedLaunch({ ...base, routeGeometryDistanceFeet: 151 })).toBe(false);
    expect(canDirectNhdVerifyMappedLaunch({ ...base, candidateMoveFeet: 2_501 })).toBe(false);
    expect(canDirectNhdVerifyMappedLaunch({ ...base, ambiguousOfficialCandidates: true })).toBe(false);
    expect(canDirectNhdVerifyMappedLaunch({ ...base, accessIdentityStrong: false })).toBe(false);
  });

  it('accepts an exact official launch on a freshly queried broad-river bank', () => {
    expect(canVerifyFreshWideRiverBank({
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'projected-to-waterbody',
      nearestIntendedFlowlineFeet: 1_053,
      nearestWaterbodyFeet: 9,
      routeGeometryDistanceFeet: 1_044,
      ambiguousOfficialCandidates: false,
      exactOfficialNameMatch: true,
      namedOfficialWaterbodyAgreement: true,
    })).toBe(true);
  });

  it('blocks broad-river recovery without every independent safeguard', () => {
    const base = {
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'projected-to-waterbody' as const,
      nearestIntendedFlowlineFeet: 1_053,
      nearestWaterbodyFeet: 9,
      routeGeometryDistanceFeet: 1_044,
      ambiguousOfficialCandidates: false,
      exactOfficialNameMatch: true,
      namedOfficialWaterbodyAgreement: true,
    };
    expect(canVerifyFreshWideRiverBank({ ...base, directQueryVerified: false })).toBe(false);
    expect(canVerifyFreshWideRiverBank({ ...base, waterbodyEvidenceSource: 'route-cache' })).toBe(false);
    expect(canVerifyFreshWideRiverBank({ ...base, ambiguousOfficialCandidates: true })).toBe(false);
    expect(canVerifyFreshWideRiverBank({ ...base, exactOfficialNameMatch: false })).toBe(false);
    expect(canVerifyFreshWideRiverBank({ ...base, namedOfficialWaterbodyAgreement: false })).toBe(false);
    expect(canVerifyFreshWideRiverBank({ ...base, nearestWaterbodyFeet: 151 })).toBe(false);
    expect(canVerifyFreshWideRiverBank({ ...base, nearestIntendedFlowlineFeet: 1_501 })).toBe(false);
    expect(canVerifyFreshWideRiverBank({ ...base, routeGeometryDistanceFeet: 1_501 })).toBe(false);
  });

  it('verifies a uniquely mapped official take-out ramp with fresh local hydrography', () => {
    expect(canVerifyOfficialSiteMapDerivedRamp({
      terminalEndpoint: true,
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'authoritative-water-entry',
      nearestIntendedFlowlineFeet: 186,
      nearestWaterbodyFeet: 77,
      routeGeometryDistanceFeet: 186,
      uncertaintyFeet: 40,
      ambiguousOfficialCandidates: false,
      exactAccessNameAgreement: true,
      namedOfficialWaterbodyAgreement: true,
    })).toBe(true);
  });

  it('blocks site-map ramp recovery without fresh, tight, unambiguous agreement', () => {
    const base = {
      terminalEndpoint: true,
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'authoritative-water-entry' as const,
      nearestIntendedFlowlineFeet: 186,
      nearestWaterbodyFeet: 77,
      routeGeometryDistanceFeet: 186,
      uncertaintyFeet: 40,
      ambiguousOfficialCandidates: false,
      exactAccessNameAgreement: true,
      namedOfficialWaterbodyAgreement: true,
    };
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, terminalEndpoint: false })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, directQueryVerified: false })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, waterbodyEvidenceSource: 'route-cache' })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, nearestIntendedFlowlineFeet: 251 })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, nearestWaterbodyFeet: 101 })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, routeGeometryDistanceFeet: 251 })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, uncertaintyFeet: 76 })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, ambiguousOfficialCandidates: true })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, exactAccessNameAgreement: false })).toBe(false);
    expect(canVerifyOfficialSiteMapDerivedRamp({ ...base, namedOfficialWaterbodyAgreement: false })).toBe(false);
  });

  it('verifies a documented terminal access on the receiving river after a confluence', () => {
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({
      terminalEndpoint: true,
      terminalAlternateWaterbodyDeclared: true,
      relationship: 'downstream-after-confluence',
      relationshipSourceUrl: 'https://magazine.outdoornebraska.gov/loup',
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'on-waterbody',
      nearestIntendedFlowlineFeet: 402,
      nearestWaterbodyFeet: 0,
      candidateToRouteFlowlineFeet: 4_382,
      routeToIntendedFlowlineJunctionFeet: 0,
      maximumConnectionDistanceFeet: 6_600,
      routeGeometryReliable: false,
      routeGeometryDistanceFeet: 4_382,
      uncertaintyFeet: 65,
      ambiguousOfficialCandidates: false,
      exactAccessNameAgreement: true,
      routeWaterbodyAgreement: true,
      terminalWaterbodyAgreement: true,
      occurrenceRouteCount: 3,
    })).toBe(true);
  });

  it('blocks alternate-waterbody recovery without a documented, connected, repeated terminal', () => {
    const base = {
      terminalEndpoint: true,
      terminalAlternateWaterbodyDeclared: true,
      relationship: 'downstream-after-confluence' as const,
      relationshipSourceUrl: 'https://magazine.outdoornebraska.gov/loup',
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'on-waterbody' as const,
      nearestIntendedFlowlineFeet: 402,
      nearestWaterbodyFeet: 0,
      candidateToRouteFlowlineFeet: 4_382,
      routeToIntendedFlowlineJunctionFeet: 0,
      maximumConnectionDistanceFeet: 6_600,
      routeGeometryReliable: false,
      routeGeometryDistanceFeet: 4_382,
      uncertaintyFeet: 65,
      ambiguousOfficialCandidates: false,
      exactAccessNameAgreement: true,
      routeWaterbodyAgreement: true,
      terminalWaterbodyAgreement: true,
      occurrenceRouteCount: 3,
    };
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, terminalEndpoint: false })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, relationshipSourceUrl: null })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, routeToIntendedFlowlineJunctionFeet: 51 })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, candidateToRouteFlowlineFeet: 6_601 })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, occurrenceRouteCount: 1 })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, terminalWaterbodyAgreement: false })).toBe(false);
  });

  it('verifies an officially documented terminal landing a short distance up a tributary', () => {
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({
      terminalEndpoint: true,
      terminalAlternateWaterbodyDeclared: true,
      relationship: 'tributary-before-confluence',
      relationshipSourceUrl: 'https://magazine.outdoornebraska.gov/platte',
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'authoritative-water-entry',
      nearestIntendedFlowlineFeet: 15,
      nearestWaterbodyFeet: 0,
      candidateToRouteFlowlineFeet: 1_170,
      routeToIntendedFlowlineJunctionFeet: 0,
      maximumConnectionDistanceFeet: 1_500,
      routeGeometryReliable: false,
      routeGeometryDistanceFeet: 1_170,
      uncertaintyFeet: 20,
      ambiguousOfficialCandidates: false,
      exactAccessNameAgreement: true,
      routeWaterbodyAgreement: true,
      terminalWaterbodyAgreement: true,
      occurrenceRouteCount: 2,
    })).toBe(true);
  });

  it('verifies a uniquely mapped terminal landing on a connected water-trail lake', () => {
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({
      terminalEndpoint: true,
      terminalAlternateWaterbodyDeclared: true,
      relationship: 'connected-water-trail-waterbody',
      relationshipSourceUrl: 'https://www.anokacountymn.gov/rice-creek-water-trail-map',
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'on-waterbody',
      nearestIntendedFlowlineFeet: null,
      nearestWaterbodyFeet: 0,
      candidateToRouteFlowlineFeet: 5_900,
      routeToIntendedFlowlineJunctionFeet: null,
      maximumConnectionDistanceFeet: 6_600,
      routeGeometryReliable: false,
      routeGeometryDistanceFeet: 5_900,
      uncertaintyFeet: 25,
      ambiguousOfficialCandidates: false,
      exactAccessNameAgreement: true,
      routeWaterbodyAgreement: true,
      terminalWaterbodyAgreement: true,
      occurrenceRouteCount: 1,
    })).toBe(true);
  });

  it('blocks connected-water-trail recovery without local named water or a bounded route connection', () => {
    const base = {
      terminalEndpoint: true,
      terminalAlternateWaterbodyDeclared: true,
      relationship: 'connected-water-trail-waterbody' as const,
      relationshipSourceUrl: 'https://www.anokacountymn.gov/rice-creek-water-trail-map',
      directQueryVerified: true,
      flowlineEvidenceSource: 'candidate-query',
      waterbodyEvidenceSource: 'candidate-query',
      mode: 'on-waterbody' as const,
      nearestIntendedFlowlineFeet: null,
      nearestWaterbodyFeet: 0,
      candidateToRouteFlowlineFeet: 5_900,
      routeToIntendedFlowlineJunctionFeet: null,
      maximumConnectionDistanceFeet: 6_600,
      routeGeometryReliable: false,
      routeGeometryDistanceFeet: 5_900,
      uncertaintyFeet: 25,
      ambiguousOfficialCandidates: false,
      exactAccessNameAgreement: true,
      routeWaterbodyAgreement: true,
      terminalWaterbodyAgreement: true,
      occurrenceRouteCount: 1,
    };
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, nearestWaterbodyFeet: 51 })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, candidateToRouteFlowlineFeet: 6_601 })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, maximumConnectionDistanceFeet: null })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, terminalWaterbodyAgreement: false })).toBe(false);
    expect(canVerifyOfficialTerminalAlternateWaterbodyRamp({ ...base, terminalEndpoint: false })).toBe(false);
  });
});
