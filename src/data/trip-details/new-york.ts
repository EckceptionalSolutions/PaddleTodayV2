import type { RiverTripDetails } from '../../lib/types';
import { newYorkRoutes } from '../routes/new-york';

export const newYorkRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  newYorkRoutes.map((route) => [
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
