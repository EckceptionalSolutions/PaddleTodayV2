import { describe, expect, it } from 'vitest';
import { rhodeIslandWoodPawcatuckRoutes } from './rhode-island-wood-pawcatuck';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
describe('Rhode Island Wood-Pawcatuck starter routes', () => { it('provides the scored direct-gauge route set', () => { expect(rhodeIslandWoodPawcatuckRoutes).toHaveLength(19); expect(rhodeIslandWoodPawcatuckRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true); expect(rhodeIslandWoodPawcatuckRoutes.filter(route => route.gaugeSource?.siteId === '01118500')).toHaveLength(4); expect(rhodeIslandWoodPawcatuckRoutes.filter(route => route.gaugeSource?.siteId === '01112500')).toHaveLength(15); expect(rhodeIslandWoodPawcatuckRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true); expect(auditRouteSafety(rhodeIslandWoodPawcatuckRoutes)).toEqual([]); }); });
