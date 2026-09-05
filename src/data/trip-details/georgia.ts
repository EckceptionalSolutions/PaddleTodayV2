import type { RiverTripDetails } from '../../lib/types';
import { georgiaRoutes } from '../routes/georgia';

export const georgiaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  georgiaRoutes.map((route) => {
    if (!route.putIn || !route.takeOut || !route.logistics) {
      throw new Error(`Georgia route ${route.id} is missing trip details.`);
    }
    return [route.id, {
      putIn: route.putIn,
      takeOut: route.takeOut,
      logistics: route.logistics,
      accessPoints: route.accessPoints,
    } satisfies RiverTripDetails];
  }),
);
