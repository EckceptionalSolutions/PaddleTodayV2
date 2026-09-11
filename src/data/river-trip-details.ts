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
import { oklahomaRiverTripDetails } from './trip-details/oklahoma';
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
import { wyomingRiverTripDetails } from './trip-details/wyoming';
import { idahoRiverTripDetails } from './trip-details/idaho';
import { georgiaRiverTripDetails } from './trip-details/georgia';
import { floridaRiverTripDetails } from './trip-details/florida';
import { floridaIchetuckneeRoutes } from './routes/florida-ichetucknee';
import { floridaSuwanneeRoutes } from './routes/florida-suwannee';
import { oregonRiverTripDetails } from './trip-details/oregon';
import { southCarolinaRiverTripDetails } from './trip-details/south-carolina';
import { southCarolinaEdistoRiverTripDetails } from './trip-details/south-carolina-edisto';
import { southCarolinaLittlePeeDeeRiverTripDetails } from './trip-details/south-carolina-little-pee-dee';
import { southCarolinaSaludaRiverTripDetails } from './trip-details/south-carolina-saluda';
import { alabamaHatchetRiverTripDetails } from './trip-details/alabama-hatchet';
import { alabamaCahabaRoutes } from './routes/alabama-cahaba';
import { arizonaVerdeRoutes } from './routes/arizona-verde';
import { arizonaSaltRoutes } from './routes/arizona-salt';
import { californiaAmericanRoutes } from './routes/california-american';
import { californiaRussianRoutes } from './routes/california-russian';
import { californiaSouthForkAmericanRoutes } from './routes/california-american';
import { connecticutFarmingtonRoutes } from './routes/connecticut-farmington';
import { connecticutHousatonicRoutes } from './routes/connecticut-housatonic';
import { connecticutQuinebaugRoutes } from './routes/connecticut-quinebaug';
import { louisianaBogueChittoRoutes } from './routes/louisiana-bogue-chitto';
import { massachusettsDeerfieldRoutes } from './routes/massachusetts-deerfield';
import { mississippiBlackCreekRoutes } from './routes/mississippi-black-creek';
import { montanaClarkForkRoutes } from './routes/montana-clark-fork';
import { nevadaColoradoBlackCanyonRoutes } from './routes/nevada-colorado-black-canyon';
import { nevadaTruckeeRoutes } from './routes/nevada-truckee';
import { newHampshirePemigewassetRoutes } from './routes/new-hampshire-pemigewasset';
import { newHampshireContoocookRoutes } from './routes/new-hampshire-contoocook';
import { newMexicoRioGrandeRoutes } from './routes/new-mexico-rio-grande';
import { rhodeIslandWoodPawcatuckRoutes } from './routes/rhode-island-wood-pawcatuck';
import { vermontWinooskiRoutes } from './routes/vermont-winooski';
import { vermontMissisquoiRoutes } from './routes/vermont-missisquoi';
import { washingtonYakimaCanyonRoutes } from './routes/washington-yakima-canyon';
import { washingtonSnoqualmieRoutes } from './routes/washington-snoqualmie';
import { alabamaFlintRoutes } from './routes/alabama-flint';

export const riverTripDetails: Record<string, RiverTripDetails> = {
  ...floridaRiverTripDetails,
  ...oregonRiverTripDetails,
  ...southCarolinaRiverTripDetails,
  ...southCarolinaEdistoRiverTripDetails,
  ...southCarolinaLittlePeeDeeRiverTripDetails,
  ...southCarolinaSaludaRiverTripDetails,
  ...alabamaHatchetRiverTripDetails,
  ...Object.fromEntries(alabamaCahabaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(arizonaVerdeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(arizonaSaltRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(californiaAmericanRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(californiaRussianRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(californiaSouthForkAmericanRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(connecticutFarmingtonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(connecticutHousatonicRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(connecticutQuinebaugRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(floridaIchetuckneeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(floridaSuwanneeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(louisianaBogueChittoRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsDeerfieldRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(mississippiBlackCreekRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(montanaClarkForkRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaColoradoBlackCanyonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaTruckeeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshirePemigewassetRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireContoocookRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newMexicoRioGrandeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(rhodeIslandWoodPawcatuckRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(vermontWinooskiRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(vermontMissisquoiRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonYakimaCanyonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonSnoqualmieRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaFlintRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
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
  ...oklahomaRiverTripDetails,
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
  ...wyomingRiverTripDetails,
  ...idahoRiverTripDetails,
  ...georgiaRiverTripDetails,
};
