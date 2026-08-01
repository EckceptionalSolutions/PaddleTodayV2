import { describe, expect, it } from 'vitest';
import { assessCandidateConfidence } from '../../scripts/lib/candidate-confidence';

const evidence = (...signals: string[]) => signals.map((signal) => ({ signal, effect: 10, source: 'test' }));

describe('assessCandidateConfidence', () => {
  it('does not confuse a point on the intended river with a verified access', () => {
    const result = assessCandidateConfidence(evidence(
      'intended-river-centerline',
      'river-name-agreement',
      'active-route-agreement',
    ));

    expect(result.waterScore).toBe(100);
    expect(result.accessScore).toBe(0);
    expect(result.score).toBe(0);
    expect(result.confidence).toBe('none');
    expect(result.limitingFactor).toBe('access-location');
  });

  it('keeps repeated shared coordinates at review confidence without independent access evidence', () => {
    const result = assessCandidateConfidence(evidence(
      'shared-water-entry',
      'multi-route-consensus',
      'coordinate-consistency',
      'active-route-agreement',
    ));

    expect(result.waterScore).toBe(80);
    expect(result.accessScore).toBe(70);
    expect(result.confidence).toBe('medium');
  });

  it('rates a named mapped launch corroborated by hydrography and multiple routes as high', () => {
    const result = assessCandidateConfidence(evidence(
      'mapped-launch-feature',
      'access-name-agreement',
      'multi-route-launch-consensus',
      'mapped-launch-near-intended-river',
      'active-route-agreement',
    ));

    expect(result.waterScore).toBe(90);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('rates fresh candidate-specific NHD launch evidence the same as a current matched-river check', () => {
    const result = assessCandidateConfidence(evidence(
      'mapped-launch-feature',
      'access-name-agreement',
      'multi-route-launch-consensus',
      'mapped-launch-direct-nhd-river-agreement',
      'active-route-agreement',
    ));

    expect(result.waterScore).toBe(90);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('blocks otherwise strong mapped evidence when multiple launches remain plausible', () => {
    const result = assessCandidateConfidence([
      ...evidence(
        'mapped-launch-feature',
        'access-name-agreement',
        'multi-route-launch-consensus',
        'mapped-launch-direct-nhd-river-agreement',
        'active-route-agreement',
      ),
      { signal: 'multiple-mapped-launch-candidates', effect: -80, source: 'conflict' },
    ]);

    expect(result.waterScore).toBe(10);
    expect(result.accessScore).toBe(20);
    expect(result.confidence).toBe('low');
  });

  it('rates a mapped launch corroborated by a nearby official access and reliable route as high', () => {
    const result = assessCandidateConfidence(evidence(
      'mapped-launch-feature',
      'authoritative-access-agreement',
      'close-authoritative-launch-agreement',
      'official-waterbody-agreement',
      'mapped-launch-near-reliable-route',
    ));

    expect(result.waterScore).toBe(85);
    expect(result.accessScore).toBe(85);
    expect(result.confidence).toBe('high');
  });

  it('rates a locally convergent mapped launch and named official access as high even when the full route trace needs repair', () => {
    const result = assessCandidateConfidence(evidence(
      'mapped-launch-feature',
      'authoritative-access-agreement',
      'close-authoritative-launch-agreement',
      'official-waterbody-agreement',
      'mapped-launch-official-waterway-convergence',
      'active-route-nearby',
    ));

    expect(result.waterScore).toBe(90);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('rates a low-uncertainty official water entry on the named route as high', () => {
    const result = assessCandidateConfidence(evidence(
      'official-named-water-entry',
      'access-name-agreement',
      'official-map-low-uncertainty',
      'official-waterbody-agreement',
      'official-point-on-intended-river',
    ));

    expect(result.waterScore).toBe(85);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('rates a low-uncertainty official bank coordinate on the intended waterbody as high', () => {
    const result = assessCandidateConfidence(evidence(
      'official-named-water-entry',
      'access-name-agreement',
      'official-map-low-uncertainty',
      'official-waterbody-agreement',
      'official-point-on-intended-waterbody',
    ));

    expect(result.waterScore).toBe(85);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('rates a named official access projected a short distance to a reliable route as high', () => {
    const result = assessCandidateConfidence(evidence(
      'official-access-anchor',
      'access-name-agreement',
      'official-access-near-water-entry',
      'projected-to-reliable-route',
      'active-route-agreement',
    ));

    expect(result.waterScore).toBe(90);
    expect(result.accessScore).toBe(90);
    expect(result.confidence).toBe('high');
  });

  it('rates a named official access projected to its nearby matching NHD flowline as high', () => {
    const result = assessCandidateConfidence(evidence(
      'official-access-anchor',
      'access-name-agreement',
      'official-access-near-water-entry',
      'projected-to-named-matched-river',
      'active-route-agreement',
    ));

    expect(result.waterScore).toBe(90);
    expect(result.accessScore).toBe(90);
    expect(result.confidence).toBe('high');
  });

  it('rates an official access directly verified against candidate-level NHD as high', () => {
    const result = assessCandidateConfidence(evidence(
      'official-access-anchor',
      'access-name-agreement',
      'official-access-near-water-entry',
      'official-waterbody-agreement',
      'official-access-on-intended-waterbody',
      'active-route-agreement',
    ));

    expect(result.waterScore).toBe(100);
    expect(result.accessScore).toBe(90);
    expect(result.confidence).toBe('high');
  });

  it('blocks candidate-level NHD automation when multiple official launches remain plausible', () => {
    const result = assessCandidateConfidence([
      ...evidence(
        'official-access-anchor',
        'access-name-agreement',
        'official-access-near-water-entry',
        'official-access-on-intended-waterbody',
      ),
      { signal: 'multiple-official-access-candidates', effect: -80, source: 'conflict' },
    ]);

    expect(result.waterScore).toBe(0);
    expect(result.accessScore).toBe(10);
    expect(result.confidence).toBe('none');
  });

  it('rates an official access joined to a related route audit and shared water entry as high', () => {
    const result = assessCandidateConfidence(evidence(
      'official-access-anchor',
      'access-name-agreement',
      'official-waterbody-agreement',
      'shared-water-entry',
      'multi-route-consensus',
      'shared-water-entry-audit-confirmed',
    ));

    expect(result.waterScore).toBe(100);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('rates an official site-map ramp with fresh local hydrography as high', () => {
    const result = assessCandidateConfidence(evidence(
      'official-named-water-entry',
      'access-name-agreement',
      'official-map-low-uncertainty',
      'official-waterbody-agreement',
      'official-site-map-ramp-near-intended-water',
      'active-route-nearby',
    ));

    expect(result.waterScore).toBe(100);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('rates a documented receiving-river terminal only after confluence topology agrees', () => {
    const result = assessCandidateConfidence(evidence(
      'official-named-water-entry',
      'access-name-agreement',
      'official-map-low-uncertainty',
      'official-terminal-alternate-waterbody',
      'official-terminal-confluence-topology',
      'official-point-on-intended-waterbody',
    ));

    expect(result.waterScore).toBe(100);
    expect(result.accessScore).toBe(100);
    expect(result.confidence).toBe('high');
  });

  it('applies access conflicts only to the access-location claim', () => {
    const result = assessCandidateConfidence([
      ...evidence('mapped-launch-feature', 'access-name-agreement', 'mapped-launch-near-intended-river', 'active-route-agreement'),
      { signal: 'shared-coordinate-conflict', effect: -80, source: 'conflict' },
    ]);

    expect(result.waterScore).toBe(90);
    expect(result.accessScore).toBe(0);
    expect(result.confidence).toBe('none');
  });
});
