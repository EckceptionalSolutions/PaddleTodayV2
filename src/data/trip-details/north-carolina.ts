import type { RiverTripDetails } from '../../lib/types';
import { northCarolinaRoutes } from '../routes/north-carolina';

export const northCarolinaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  northCarolinaRoutes.map((route) => [
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
