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
import { southCarolinaEdistoMainRiverTripDetails } from './trip-details/south-carolina-edisto-main';
import { southCarolinaLittlePeeDeeRiverTripDetails } from './trip-details/south-carolina-little-pee-dee';
import { southCarolinaSaludaRiverTripDetails } from './trip-details/south-carolina-saluda';
import { southCarolinaBroadRoutes } from './routes/south-carolina-broad';
import { southCarolinaCatawbaRoutes } from './routes/south-carolina-catawba';
import { southCarolinaBlackRoutes } from './routes/south-carolina-black';
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
import { connecticutWillimanticRoutes } from './routes/connecticut-willimantic';
import { louisianaBogueChittoRoutes } from './routes/louisiana-bogue-chitto';
import { louisianaBayouTecheRoutes } from './routes/louisiana-bayou-teche';
import { massachusettsDeerfieldDrywayRoutes, massachusettsDeerfieldLowerRoutes, massachusettsDeerfieldRoutes } from './routes/massachusetts-deerfield';
import { allMassachusettsMillersRoutes } from './routes/massachusetts-millers';
import { massachusettsHoosicRoutes } from './routes/massachusetts-hoosic';
import { massachusettsHousatonicExpansionRoutes } from './routes/massachusetts-housatonic-expansion';
import { mississippiBlackCreekRoutes } from './routes/mississippi-black-creek';
import { mississippiLeafRoutes } from './routes/mississippi-leaf';
import { montanaClarkForkRoutes } from './routes/montana-clark-fork';
import { montanaBlackfootRoutes } from './routes/montana-blackfoot';
import { nevadaColoradoBlackCanyonRoutes } from './routes/nevada-colorado-black-canyon';
import { nevadaTruckeeRoutes } from './routes/nevada-truckee';
import { nevadaTruckeeExpansionRoutes } from './routes/nevada-truckee-expansion';
import { nevadaCarsonRoutes } from './routes/nevada-carson';
import { nevadaEastForkCarsonRoutes } from './routes/nevada-east-fork-carson';
import { nevadaWalkerRoutes } from './routes/nevada-walker';
import { arizonaGilaBoxRoutes } from './routes/arizona-gila-box';
import { newHampshirePemigewassetRoutes } from './routes/new-hampshire-pemigewasset';
import { newHampshireContoocookRoutes } from './routes/new-hampshire-contoocook';
import { newHampshireSacoRoutes } from './routes/new-hampshire-saco';
import { newHampshireAndroscogginRoutes } from './routes/new-hampshire-androscoggin';
import { newHampshireConnecticutRiverRoutes } from './routes/new-hampshire-connecticut-river';
import { newHampshireMerrimackRoutes } from './routes/new-hampshire-merrimack';
import { newHampshireMerrimackExpansionRoutes } from './routes/new-hampshire-merrimack-expansion';
import { newHampshireMerrimackFranklinExpansionRoutes } from './routes/new-hampshire-merrimack-franklin-expansion';
import { newMexicoRioGrandeRoutes } from './routes/new-mexico-rio-grande';
import { newMexicoRioChamaRoutes } from './routes/new-mexico-rio-chama';
import { newMexicoAlbuquerqueRioGrandeRoutes } from './routes/new-mexico-albuquerque-rio-grande';
import { newMexicoBosqueRioGrandeRoutes } from './routes/new-mexico-bosque-rio-grande';
import { newMexicoSanJuanRoutes } from './routes/new-mexico-san-juan';
import { newMexicoAnimasRoutes } from './routes/new-mexico-animas';
import { rhodeIslandWoodPawcatuckRoutes } from './routes/rhode-island-wood-pawcatuck';
import { rhodeIslandWoonasquatucketRoutes } from './routes/rhode-island-woonasquatucket';
import { vermontWinooskiRoutes } from './routes/vermont-winooski';
import { vermontMissisquoiRoutes } from './routes/vermont-missisquoi';
import { vermontLamoilleRoutes } from './routes/vermont-lamoille';
import { vermontWinooskiLowerRoutes } from './routes/vermont-winooski-lower';
import { washingtonYakimaCanyonRoutes } from './routes/washington-yakima-canyon';
import { washingtonSnoqualmieRoutes } from './routes/washington-snoqualmie';
import { washingtonSkagitRoutes } from './routes/washington-skagit';
import { washingtonStillaguamishRoutes } from './routes/washington-stillaguamish';
import { washingtonSpokaneRoutes, washingtonSpokaneExpansionRoutes } from './routes/washington-spokane';
import { massachusettsConnecticutTurnersRoutes } from './routes/massachusetts-connecticut-turners';
import { massachusettsQuaboagRoutes } from './routes/massachusetts-quaboag';
import { massachusettsWareExpansionRoutes } from './routes/massachusetts-ware-expansion';
import { alabamaFlintRoutes } from './routes/alabama-flint';
import { alabamaSipseyRoutes } from './routes/alabama-sipsey';
import { alabamaSipseyLowerRoutes } from './routes/alabama-sipsey-lower';
import { alabamaMulberryRoutes } from './routes/alabama-mulberry';
import { alabamaLocustForkRoutes } from './routes/alabama-locust-fork';
import { alabamaCoosaRoutes } from './routes/alabama-coosa';
import { alabamaTallapoosaRoutes } from './routes/alabama-tallapoosa';
import { alabamaBartramRoutes } from './routes/alabama-bartram';
import { alabamaTerrapinAutaugaRoutes } from './routes/alabama-terrapin-autauga';
import { arizonaVerdeExpansionRoutes } from './routes/arizona-verde-expansion';
import { californiaRussianExpansionRoutes } from './routes/california-russian-expansion';

export const riverTripDetails: Record<string, RiverTripDetails> = {
  ...floridaRiverTripDetails,
  ...oregonRiverTripDetails,
  ...southCarolinaRiverTripDetails,
  ...southCarolinaEdistoRiverTripDetails,
  ...southCarolinaEdistoMainRiverTripDetails,
  ...southCarolinaLittlePeeDeeRiverTripDetails,
  ...southCarolinaSaludaRiverTripDetails,
  ...Object.fromEntries(southCarolinaBroadRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(southCarolinaCatawbaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(southCarolinaBlackRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...alabamaHatchetRiverTripDetails,
  ...Object.fromEntries(alabamaCahabaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(arizonaVerdeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(arizonaSaltRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(californiaAmericanRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(californiaRussianRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(californiaRussianExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(californiaSouthForkAmericanRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(connecticutFarmingtonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(connecticutHousatonicRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(connecticutQuinebaugRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(connecticutWillimanticRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(floridaIchetuckneeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(floridaSuwanneeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(louisianaBogueChittoRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(louisianaBayouTecheRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsDeerfieldRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsDeerfieldDrywayRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsDeerfieldLowerRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(allMassachusettsMillersRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsHoosicRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsHousatonicExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(mississippiBlackCreekRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(mississippiLeafRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(montanaClarkForkRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(montanaBlackfootRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaColoradoBlackCanyonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaTruckeeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaTruckeeExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaCarsonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaEastForkCarsonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(nevadaWalkerRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(arizonaGilaBoxRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshirePemigewassetRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireContoocookRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireSacoRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireAndroscogginRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireConnecticutRiverRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireMerrimackRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireMerrimackExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newHampshireMerrimackFranklinExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newMexicoRioGrandeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newMexicoRioChamaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newMexicoAlbuquerqueRioGrandeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newMexicoBosqueRioGrandeRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newMexicoSanJuanRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(newMexicoAnimasRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(rhodeIslandWoodPawcatuckRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(rhodeIslandWoonasquatucketRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(vermontWinooskiRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(vermontMissisquoiRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(vermontLamoilleRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(vermontWinooskiLowerRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonYakimaCanyonRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonSnoqualmieRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonSkagitRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonStillaguamishRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonSpokaneRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(washingtonSpokaneExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsConnecticutTurnersRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsQuaboagRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(massachusettsWareExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaFlintRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaSipseyRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaSipseyLowerRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaMulberryRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaLocustForkRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaCoosaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaTallapoosaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaBartramRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(alabamaTerrapinAutaugaRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
  ...Object.fromEntries(arizonaVerdeExpansionRoutes.map(route => [route.id, { putIn: route.putIn!, takeOut: route.takeOut!, logistics: route.logistics!, accessPoints: route.accessPoints }])),
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
