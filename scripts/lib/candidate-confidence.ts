export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'none';

export type ConfidenceEvidence = {
  signal: string;
  effect: number;
  source: string;
};

export type CandidateConfidence = {
  score: number;
  confidence: ConfidenceLevel;
  waterScore: number;
  waterConfidence: ConfidenceLevel;
  accessScore: number;
  accessConfidence: ConfidenceLevel;
  limitingFactor: 'water-location' | 'access-location' | 'balanced';
  evidenceScore: number;
};

const waterWeights: Record<string, number> = {
  'intended-river-centerline': 65,
  'river-name-agreement': 15,
  'named-waterway': 45,
  'unnamed-waterbody-only': 20,
  'shared-water-entry': 45,
  'shared-water-entry-audit-confirmed': 55,
  'mapped-launch-near-intended-river': 55,
  'mapped-launch-direct-nhd-river-agreement': 55,
  'mapped-launch-near-reliable-route': 50,
  'mapped-launch-official-waterway-convergence': 25,
  'official-waterbody-agreement': 35,
  'official-terminal-waterbody-agreement': 35,
  'official-terminal-alternate-waterbody': 35,
  'official-terminal-confluence-topology': 50,
  'mapped-launch-near-named-terminal-waterbody': 55,
  'official-point-on-intended-river': 50,
  'official-point-on-intended-waterbody': 50,
  'official-site-map-ramp-near-intended-water': 50,
  'projected-to-reliable-route': 55,
  'projected-to-named-matched-river': 55,
  'official-access-on-intended-waterbody': 55,
  'official-access-projected-to-intended-waterbody': 55,
  'official-access-projected-to-intended-flowline': 55,
  'active-route-agreement': 35,
  'active-route-nearby': 30,
  'active-route-bank-agreement': 25,
  'shared-route-geometry-recovery': 25,
  'canonical-water-entry-agreement': 20,
};

const accessWeights: Record<string, number> = {
  'shared-water-entry': 40,
  'multi-route-consensus': 20,
  'coordinate-consistency': 10,
  'coordinate-near-consensus': 5,
  'mapped-launch-feature': 55,
  'access-name-agreement': 25,
  'multi-route-launch-consensus': 20,
  'authoritative-access-agreement': 20,
  'close-authoritative-launch-agreement': 10,
  'mapped-launch-official-waterway-convergence': 15,
  'official-named-water-entry': 65,
  'official-access-anchor': 45,
  'official-access-near-water-entry': 20,
  'official-map-low-uncertainty': 10,
  'mapped-road-bridge': 15,
  'bridge-name-agreement': 20,
  'canonical-water-entry-agreement': 20,
  'small-move': 5,
};

const waterConflictSignals = new Set([
  'wrong-waterway-risk',
  'official-waterbody-conflict',
  'official-point-away-from-intended-river',
  'active-route-disagreement',
  'route-order-conflict',
  'multiple-official-access-candidates',
  'multiple-mapped-launch-candidates',
  'mapped-launch-preferred-over-generic-shoreline',
]);

const accessConflictSignals = new Set([
  'official-access-name-conflict',
  'official-map-uncertainty',
  'official-access-away-from-water-entry',
  'shared-coordinate-conflict',
  'canonical-water-entry-disagreement',
  'route-order-conflict',
  'multiple-official-access-candidates',
  'multiple-mapped-launch-candidates',
]);

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function confidenceLevel(score: number): ConfidenceLevel {
  if (score >= 85) return 'high';
  if (score >= 55) return 'medium';
  if (score > 0) return 'low';
  return 'none';
}

/**
 * A correction is only as trustworthy as its weaker claim:
 * 1. the point is on the intended route water, and
 * 2. the point represents the named/legal access location.
 *
 * Hydrography-only snaps intentionally receive no access-location credit.
 * This prevents a mathematically valid point anywhere on a long river from
 * being presented as a confident launch correction.
 */
export function assessCandidateConfidence(evidence: ConfidenceEvidence[]): CandidateConfidence {
  let waterScore = 0;
  let accessScore = 0;
  for (const item of evidence) {
    waterScore += waterWeights[item.signal] ?? 0;
    accessScore += accessWeights[item.signal] ?? 0;
    if (item.effect < 0 && waterConflictSignals.has(item.signal)) waterScore += item.effect;
    if (item.effect < 0 && accessConflictSignals.has(item.signal)) accessScore += item.effect;
  }
  waterScore = clamp(waterScore);
  accessScore = clamp(accessScore);
  const score = Math.min(waterScore, accessScore);
  const limitingFactor = waterScore < accessScore
    ? 'water-location'
    : accessScore < waterScore ? 'access-location' : 'balanced';
  return {
    score,
    confidence: confidenceLevel(score),
    waterScore,
    waterConfidence: confidenceLevel(waterScore),
    accessScore,
    accessConfidence: confidenceLevel(accessScore),
    limitingFactor,
    evidenceScore: clamp(evidence.reduce((sum, item) => sum + item.effect, 0)),
  };
}
