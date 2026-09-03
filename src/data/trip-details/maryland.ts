import type { RiverTripDetails } from '../../lib/types';
import { marylandRoutes } from '../routes/maryland';

export const marylandRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  marylandRoutes.map((route) => [
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
