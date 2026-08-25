import type { RiverTripDetails } from '../../lib/types';
import { westVirginiaRoutes } from '../routes/west-virginia';

// Keep trip-detail access and logistics synchronized with the researched route
// records. The route file is the canonical source for this cohort.
export const westVirginiaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  westVirginiaRoutes.map((route) => [
    route.id,
    {
      putIn: route.putIn!,
      takeOut: route.takeOut!,
      logistics: route.logistics!,
      accessPoints: route.accessPoints,
      continuityStatus: 'verified' as const,
    },
  ]),
);
