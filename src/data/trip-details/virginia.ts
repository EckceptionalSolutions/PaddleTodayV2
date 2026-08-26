import type { RiverTripDetails } from '../../lib/types';
import { virginiaRoutes } from '../routes/virginia';

export const virginiaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  virginiaRoutes.map((route) => [
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
