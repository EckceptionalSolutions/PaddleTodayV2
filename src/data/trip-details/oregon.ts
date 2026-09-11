import type { RiverTripDetails } from '../../lib/types';
import { oregonRoutes } from '../routes/oregon';
export const oregonRiverTripDetails: Record<string, RiverTripDetails> = Object.fromEntries(
  oregonRoutes.map(route => [route.id, {putIn:route.putIn!,takeOut:route.takeOut!,logistics:route.logistics!,accessPoints:route.accessPoints}]),
);
