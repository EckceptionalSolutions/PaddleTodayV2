import type { RiverTripDetails } from '../../lib/types';
import { idahoRoutes } from '../routes/idaho';

export const idahoRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  idahoRoutes.map((route) => {
    if (!route.putIn || !route.takeOut || !route.logistics) throw new Error(`Idaho route ${route.id} is missing trip details.`);
    return [route.id, { putIn: route.putIn, takeOut: route.takeOut, logistics: route.logistics, ...(route.accessPoints ? { accessPoints: route.accessPoints } : {}) } satisfies RiverTripDetails];
  }),
);
