import type { RiverTripDetails } from '../../lib/types';
import { southCarolinaRoutes } from '../routes/south-carolina';
export const southCarolinaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  southCarolinaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }]),
);
