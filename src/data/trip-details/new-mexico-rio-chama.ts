import type { RiverTripDetails } from '../../lib/types';
import { newMexicoRioChamaRoutes } from '../routes/new-mexico-rio-chama';
export const newMexicoRioChamaRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  newMexicoRioChamaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }]),
);
