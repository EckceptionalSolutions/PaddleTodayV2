import type { RiverTripDetails } from '../../lib/types';
import { southCarolinaSaludaRoutes } from '../routes/south-carolina-saluda';

export const southCarolinaSaludaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  southCarolinaSaludaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }]),
);
