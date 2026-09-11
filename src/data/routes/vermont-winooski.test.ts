import { describe, expect, it } from 'vitest';
import { vermontWinooskiRoutes } from './vermont-winooski';
import { rivers } from '../rivers';
import { auditRouteSafety } from '../../lib/route-safety-audit';
 describe('Vermont Winooski starter routes', () => { it('provides six scored direct-gauge routes', () => { expect(vermontWinooskiRoutes).toHaveLength(6); expect(vermontWinooskiRoutes.every(route => route.scoreEligibility === 'scored')).toBe(true); expect(vermontWinooskiRoutes.every(route => route.gaugeSource?.siteId === '04286000')).toBe(true); expect(vermontWinooskiRoutes.every(route => rivers.some(candidate => candidate.id === route.id))).toBe(true); expect(auditRouteSafety(vermontWinooskiRoutes)).toEqual([]); }); });
