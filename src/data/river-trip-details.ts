import type { RiverTripDetails } from '../lib/types';
import { arkansasRiverTripDetails } from './trip-details/arkansas';
import { illinoisRiverTripDetails } from './trip-details/illinois';
import { indianaRiverTripDetails } from './trip-details/indiana';
import { iowaRiverTripDetails } from './trip-details/iowa';
import { kansasRiverTripDetails } from './trip-details/kansas';
import { kentuckyRiverTripDetails } from './trip-details/kentucky';
import { michiganRiverTripDetails } from './trip-details/michigan';
import { minnesotaRiverTripDetails } from './trip-details/minnesota';
import { missouriRiverTripDetails } from './trip-details/missouri';
import { nebraskaRiverTripDetails } from './trip-details/nebraska';
import { northDakotaRiverTripDetails } from './trip-details/north-dakota';
import { ohioRiverTripDetails } from './trip-details/ohio';
import { pennsylvaniaRiverTripDetails } from './trip-details/pennsylvania';
import { southDakotaRiverTripDetails } from './trip-details/south-dakota';
import { tennesseeRiverTripDetails } from './trip-details/tennessee';
import { texasRiverTripDetails } from './trip-details/texas';
import { utahRiverTripDetails } from './trip-details/utah';
import { wisconsinRiverTripDetails } from './trip-details/wisconsin';
import { retiredRiverTripDetails } from './trip-details/retired';

export const riverTripDetails: Record<string, RiverTripDetails> = {
  ...arkansasRiverTripDetails,
  ...illinoisRiverTripDetails,
  ...indianaRiverTripDetails,
  ...iowaRiverTripDetails,
  ...kansasRiverTripDetails,
  ...kentuckyRiverTripDetails,
  ...michiganRiverTripDetails,
  ...minnesotaRiverTripDetails,
  ...missouriRiverTripDetails,
  ...nebraskaRiverTripDetails,
  ...northDakotaRiverTripDetails,
  ...ohioRiverTripDetails,
  ...pennsylvaniaRiverTripDetails,
  ...southDakotaRiverTripDetails,
  ...tennesseeRiverTripDetails,
  ...texasRiverTripDetails,
  ...utahRiverTripDetails,
  ...wisconsinRiverTripDetails,
  ...retiredRiverTripDetails,
};
