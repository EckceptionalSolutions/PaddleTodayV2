export interface GeoPoint { latitude: number; longitude: number }
/** An explicitly selectable trip pair can intentionally cover the same river. */
export function documentedHubTripPair(left: string, right: string, leftTarget?: string, rightTarget?: string) {
  if (!leftTarget || !rightTarget || left === right) return false;
  const a=new URL(leftTarget,'https://paddletoday.invalid'),b=new URL(rightTarget,'https://paddletoday.invalid');
  return a.pathname===b.pathname && a.pathname.startsWith('/rivers/by-river/') && a.hash===`#trip-${left}` && b.hash===`#trip-${right}`;
}
/** Positive shared length along the first segment, rather than proximity at one shared endpoint. */
export function projectedOverlapMiles(a: GeoPoint, b: GeoPoint, c: GeoPoint, d: GeoPoint) {
  const scale = Math.cos((a.latitude + b.latitude + c.latitude + d.latitude) * Math.PI / 720) * 69.172;
  const x = (b.longitude - a.longitude) * scale;
  const y = (b.latitude - a.latitude) * 69;
  const length = Math.hypot(x, y);
  if (length === 0) return 0;
  const project = (point: GeoPoint) => ((point.longitude - a.longitude) * scale * x + (point.latitude - a.latitude) * 69 * y) / length;
  const left = project(c); const right = project(d);
  return Math.max(0, Math.min(length, Math.max(left,right)) - Math.max(0, Math.min(left,right)));
}
export function tracesProperlyCross(left: GeoPoint[][], right: GeoPoint[][]) {
  const orientation = (a: GeoPoint,b: GeoPoint,c: GeoPoint) => (b.longitude-a.longitude)*(c.latitude-a.latitude)-(b.latitude-a.latitude)*(c.longitude-a.longitude);
  for (const a of left) for (const b of right) for (let i=1;i<a.length;i++) for (let j=1;j<b.length;j++) {
    const p=a[i-1],q=a[i],r=b[j-1],s=b[j];
    if (Math.max(p.latitude,q.latitude)<Math.min(r.latitude,s.latitude) || Math.max(r.latitude,s.latitude)<Math.min(p.latitude,q.latitude) || Math.max(p.longitude,q.longitude)<Math.min(r.longitude,s.longitude) || Math.max(r.longitude,s.longitude)<Math.min(p.longitude,q.longitude)) continue;
    const o1=orientation(p,q,r),o2=orientation(p,q,s),o3=orientation(r,s,p),o4=orientation(r,s,q);
    // Touching vertices, common channels, and collinear segments are shared
    // river coverage, not proof of a route crossing.
    if (o1*o2 < -1e-20 && o3*o4 < -1e-20) return true;
  }
  return false;
}
