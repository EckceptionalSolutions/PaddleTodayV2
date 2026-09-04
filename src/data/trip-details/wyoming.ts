import type { RiverTripDetails } from '../../lib/types';
import { wyomingRoutes } from '../routes/wyoming';

export const wyomingRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  wyomingRoutes.map((route) => {
    if (!route.putIn || !route.takeOut || !route.logistics) throw new Error(`Wyoming route ${route.id} is missing trip details.`);
    return [route.id, { putIn: route.putIn, takeOut: route.takeOut, logistics: route.logistics, ...(route.accessPoints ? { accessPoints: route.accessPoints } : {}) } satisfies RiverTripDetails];
  }),
);
