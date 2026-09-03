import type { RiverTripDetails } from '../../lib/types';
import { newJerseyRoutes } from '../routes/new-jersey';

export const newJerseyRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  newJerseyRoutes.map((route) => [
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
