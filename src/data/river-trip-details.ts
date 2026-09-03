import type { RiverTripDetails } from '../lib/types';
import { arkansasRiverTripDetails } from './trip-details/arkansas';
import { coloradoRiverTripDetails } from './trip-details/colorado';
import { illinoisRiverTripDetails } from './trip-details/illinois';
import { indianaRiverTripDetails } from './trip-details/indiana';
import { iowaRiverTripDetails } from './trip-details/iowa';
import { kansasRiverTripDetails } from './trip-details/kansas';
import { kentuckyRiverTripDetails } from './trip-details/kentucky';
import { marylandRiverTripDetails } from './trip-details/maryland';
import { michiganRiverTripDetails } from './trip-details/michigan';
import { minnesotaRiverTripDetails } from './trip-details/minnesota';
import { missouriRiverTripDetails } from './trip-details/missouri';
import { northCarolinaRiverTripDetails } from './trip-details/north-carolina';
import { nebraskaRiverTripDetails } from './trip-details/nebraska';
import { northDakotaRiverTripDetails } from './trip-details/north-dakota';
import { newYorkRiverTripDetails } from './trip-details/new-york';
import { ohioRiverTripDetails } from './trip-details/ohio';
import { pennsylvaniaRiverTripDetails } from './trip-details/pennsylvania';
import { southDakotaRiverTripDetails } from './trip-details/south-dakota';
import { tennesseeRiverTripDetails } from './trip-details/tennessee';
import { texasRiverTripDetails } from './trip-details/texas';
import { utahRiverTripDetails } from './trip-details/utah';
import { virginiaRiverTripDetails } from './trip-details/virginia';
import { wisconsinRiverTripDetails } from './trip-details/wisconsin';
import { westVirginiaRiverTripDetails } from './trip-details/west-virginia';
import { retiredRiverTripDetails } from './trip-details/retired';
import { newJerseyRiverTripDetails } from './trip-details/new-jersey';
import { delawareRiverTripDetails } from './trip-details/delaware';

export const riverTripDetails: Record<string, RiverTripDetails> = {
  ...arkansasRiverTripDetails,
  ...coloradoRiverTripDetails,
  ...illinoisRiverTripDetails,
  ...indianaRiverTripDetails,
  ...iowaRiverTripDetails,
  ...kansasRiverTripDetails,
  ...kentuckyRiverTripDetails,
  ...marylandRiverTripDetails,
  ...michiganRiverTripDetails,
  ...minnesotaRiverTripDetails,
  ...missouriRiverTripDetails,
  ...northCarolinaRiverTripDetails,
  ...nebraskaRiverTripDetails,
  ...northDakotaRiverTripDetails,
  ...newYorkRiverTripDetails,
  ...ohioRiverTripDetails,
  ...pennsylvaniaRiverTripDetails,
  ...southDakotaRiverTripDetails,
  ...tennesseeRiverTripDetails,
  ...texasRiverTripDetails,
  ...utahRiverTripDetails,
  ...virginiaRiverTripDetails,
  ...wisconsinRiverTripDetails,
  ...westVirginiaRiverTripDetails,
  ...retiredRiverTripDetails,
  ...newJerseyRiverTripDetails,
  ...delawareRiverTripDetails,
};
