export type AccessPointAuditRole = 'public-access' | 'navigation-waypoint';

/** Treat legacy points as access sites; explicitly marked route waypoints stay out of the access audit. */
export function isAccessPointForQualityAudit(point: { accessPointRole?: AccessPointAuditRole }) {
  return point.accessPointRole !== 'navigation-waypoint';
}
