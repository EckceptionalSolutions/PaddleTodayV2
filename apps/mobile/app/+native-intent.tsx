import { incomingRouteLink } from '../src/lib/incoming-route-link';

export function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  return incomingRouteLink(path);
}
