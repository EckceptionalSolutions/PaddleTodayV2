import type { RiverTripDetails } from '../../lib/types';
import { oklahomaRoutes } from '../routes/oklahoma';

// Oklahoma's route records already carry the complete trip package. Mirror
// those fields into the enrichment registry so the shared route audit and
// page rendering contracts remain satisfied without duplicating 5 route cards.
export const oklahomaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  oklahomaRoutes.map((route) => {
    if (!route.putIn || !route.takeOut || !route.logistics) {
      throw new Error(`Oklahoma route ${route.id} is missing trip details.`);
    }

    return [route.id, {
      putIn: route.putIn,
      takeOut: route.takeOut,
      logistics: route.logistics,
      ...(route.accessPoints ? { accessPoints: route.accessPoints } : {}),
    } satisfies RiverTripDetails];
  }),
);
