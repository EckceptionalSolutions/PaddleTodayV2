import type { RiverTripDetails } from '../../lib/types';
import { alabamaHatchetRoutes } from '../routes/alabama-hatchet';
export const alabamaHatchetRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(alabamaHatchetRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }]));
