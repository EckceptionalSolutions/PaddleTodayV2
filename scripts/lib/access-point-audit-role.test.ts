import { describe, expect, it } from 'vitest';
import { isAccessPointForQualityAudit } from './access-point-audit-role';

describe('isAccessPointForQualityAudit', () => {
  it('keeps existing access points in the audit by default', () => {
    expect(isAccessPointForQualityAudit({})).toBe(true);
    expect(isAccessPointForQualityAudit({ accessPointRole: 'public-access' })).toBe(true);
  });

  it('omits explicitly classified route-navigation waypoints', () => {
    expect(isAccessPointForQualityAudit({ accessPointRole: 'navigation-waypoint' })).toBe(false);
  });
});
