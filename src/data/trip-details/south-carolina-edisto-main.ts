import type { RiverTripDetails } from '../../lib/types';
import { southCarolinaEdistoMainRoutes } from '../routes/south-carolina-edisto-main';
export const southCarolinaEdistoMainRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  southCarolinaEdistoMainRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }]),
);
