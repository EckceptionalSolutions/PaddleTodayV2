import type { RiverTripDetails } from '../../lib/types';
import { southCarolinaLittlePeeDeeRoutes } from '../routes/south-carolina-little-pee-dee';
export const southCarolinaLittlePeeDeeRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(southCarolinaLittlePeeDeeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }]));
