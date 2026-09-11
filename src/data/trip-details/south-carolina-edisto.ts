import type { RiverTripDetails } from '../../lib/types';
import { southCarolinaEdistoRoutes } from '../routes/south-carolina-edisto';
export const southCarolinaEdistoRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  southCarolinaEdistoRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }]),
);
