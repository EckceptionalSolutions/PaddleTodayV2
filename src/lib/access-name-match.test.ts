import { describe, expect, it } from 'vitest';
import {
  accessNamesAgree,
  accessFacilityIdentitiesAgree,
  distinctiveAccessTokens,
  normalizeAccessFacilityIdentityText,
  normalizeAccessText,
  normalizeAccessIdentityText,
  preferExactAccessNameMatches,
} from '../../scripts/lib/access-name-match';

describe('access name matching', () => {
  it('normalizes possessive punctuation without splitting the place name', () => {
    expect(normalizeAccessText("Bell's Mill Park")).toBe('bells mill park');
    expect(accessNamesAgree("Bell's Mill Park", 'Bells Mill')).toBe(true);
  });

  it('recognizes common road abbreviations only when another distinctive token agrees', () => {
    expect(accessNamesAgree('Ranchero Road / Katoski Greenbelt Area (Access 8)', 'Ranchero Rd Access')).toBe(true);
    expect(accessNamesAgree('County Road 12 access', 'Unrelated Rd Access')).toBe(false);
  });

  it('reconciles nature and natural naming variants', () => {
    expect(accessNamesAgree('Wetlands Nature Area access', 'Wetlands Natural Area Access')).toBe(true);
  });

  it('keeps generic access words from creating matches', () => {
    expect(distinctiveAccessTokens('Public River Boat Access')).toEqual([]);
    expect(accessNamesAgree('Public River Boat Access', 'County Lake Launch')).toBe(false);
  });

  it('does not identify accesses from shared prepositions and directions', () => {
    expect(accessNamesAgree(
      'ADM access site south of Southeast 9th Street',
      'Monroe county access south of Monroe',
    )).toBe(false);
  });

  it('does not replace an exact official access with a looser directional variant', () => {
    const candidates = [
      { id: 'exact', name: 'Norway Lake Public Water Access Site' },
      { id: 'north', name: 'Norway Lake North Public Water Access Site' },
    ];
    expect(preferExactAccessNameMatches('Norway Lake Public Water Access Site', candidates))
      .toEqual([candidates[0]]);
  });

  it('prefers the exact base facility when the route label appends an inventory code', () => {
    const candidates = [
      { id: 'access', name: 'Clermont Canoe Access' },
      { id: 'takeout', name: 'Clermont Park Takeout' },
    ];
    expect(normalizeAccessIdentityText('Clermont Canoe Access #64B')).toBe('clermont canoe access');
    expect(preferExactAccessNameMatches('Clermont Canoe Access #64B', candidates))
      .toEqual([candidates[0]]);
  });

  it('retains meaningful road and highway numbers in access identities', () => {
    expect(normalizeAccessIdentityText('Highway 30 Access')).toBe('highway 30 access');
    expect(normalizeAccessIdentityText('County Road 12 landing')).toBe('county road 12 landing');
  });

  it('treats generic ramp wording as the same strong facility identity', () => {
    expect(normalizeAccessFacilityIdentityText('Squirrel Hollow Park boat ramp')).toBe('squirrel hollow');
    expect(accessFacilityIdentitiesAgree('Squirrel Hollow Park boat ramp', 'Squirrel Hollow Park')).toBe(true);
  });

  it('preserves directional and numbered distinctions for coordinate replacement', () => {
    expect(accessNamesAgree('South Fraser Ramp', 'North Fraser Ramp')).toBe(true);
    expect(accessFacilityIdentitiesAgree('South Fraser Ramp', 'North Fraser Ramp')).toBe(false);
    expect(accessFacilityIdentitiesAgree('Highway 30 Access', 'Highway 76 Access')).toBe(false);
  });
});
