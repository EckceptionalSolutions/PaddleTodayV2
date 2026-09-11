import type { RiverTripDetails } from '../../lib/types';
import { floridaRoutes } from '../routes/florida';

export const floridaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  floridaRoutes.map(route => [route.id, {
    putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints,
  }]),
);
