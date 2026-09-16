import { describe, expect, it } from 'vitest';
import { vermontLamoilleRoutes } from './vermont-lamoille';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';

describe('Vermont Lamoille scored expansion', () => {
  it('registers trail-recommended reaches with direct gauge, access and camping controls', () => {
    expect(vermontLamoilleRoutes).toHaveLength(28);
    expect(vermontLamoilleRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true);
    expect(vermontLamoilleRoutes.every(route => route.gaugeSource?.siteId === '04292000')).toBe(true);
    expect(vermontLamoilleRoutes.every(route => route.logistics?.campingClassification === 'none')).toBe(true);
    expect(vermontLamoilleRoutes.every(route => route.accessPoints?.every(point => point.latitude && point.longitude))).toBe(true);
    expect(vermontLamoilleRoutes.every(route => rivers.some(candidate => candidate.slug === route.slug))).toBe(true);
    expect(auditRouteSafety(vermontLamoilleRoutes)).toEqual([]);
  });
});
