import type {
  River,
  RouteSafetyProfile,
  SourceStrength,
} from "../../lib/types";

const southForkGuide =
  "https://www.blm.gov/sites/blm.gov/files/documents/files/idaho_southfork_boatingmapsALL.pdf";
const southForkAdvisories = "https://www.blm.gov/idaho/advisories-and-closures";
const payetteGuide = "https://www.blm.gov/visit/payette-river-corridor";
const boiseGuide =
  "https://adacounty.id.gov/parksandwaterways/wp-content/uploads/sites/47/2021-Floater-Info-Guide.pdf";
const upperSalmonGuide =
  "https://www.blm.gov/sites/default/files/documents/files/Media-Center_Public-Room_Idaho_Upper-Salmon-river_BoaterGuide.pdf";
const upperSalmonPage = "https://www.blm.gov/visit/salmon-river";
const lowerSalmonPage = "https://www.blm.gov/visit/lower-salmon-river";
const stJoePlan =
  "https://rivers.gov/rivers/sites/rivers/files/documents/plans/st-joe-plan.pdf";
const stJoeSkookumReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/639/main";
const stJoeSkookumFlow =
  "https://kayakidaho.com/idaho-flows/panhandle-flows";
const idahoBoating = "https://parksandrecreation.idaho.gov/activities/boating/";
const southForkThresholdGuide = "https://www.riverbrain.com/runs/141";
const southForkSpringAccessThreshold =
  "https://idfg.idaho.gov/blog/2022/04/2022-rainbow-trout-suppression-plans-south-fork-snake";
const payetteThresholdGuide =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4360/main";
const lowerPayetteThresholdGuide =
  "https://www.howsyourriver.com/runs/2-beehive-bend-to-jet-boat-ramp-payette-id";
const lowerPayetteAwGuide =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4156/main";
const lowerPayetteAccessGuide =
  "https://www.blm.gov/visit/payette-river-beehive-bend";
const lowerPayetteTakeOutMap = "https://mapcarta.com/N8322603841";
const boiseThresholdGuide =
  "https://www.floattheboise.org/pages/current-conditions";
const downtownBoiseThresholdGuide =
  "https://www.howsyourriver.com/runs/downtown-boise-boise-id";
const downtownBoiseAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/3135/main";
const downtownBoiseWillowAccess =
  "https://www.howsyourriver.com/access_sites/willow-lane-athletic-complex-take-out-id";
const downtownBoiseCityPlan =
  "https://www.cityofboise.org/media/6890/boise-river-resource-management-and-master-plan_final-12-29-14.pdf";
const middleForkBoiseThresholdGuide =
  "https://www.dreamflows.com/triggerLevels.php";
const middleForkBoiseMapGuide =
  "https://www.riverfacts.com/maps/11011.html";
const boiseTroutdaleWillowAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/529/main";
const boiseTroutdaleWillowPutIn =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/110965";
const boiseTroutdaleWillowTakeOut =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/116232";
const upperSalmonThresholdGuides = {
  bayhorseChallis: "https://www.riverbrain.com/runs/330",
  challisWatts: "https://www.riverbrain.com/runs/331",
  pahsimeroiRoyalGorge: "https://www.riverbrain.com/runs/332",
  colstonSalmon: "https://www.riverbrain.com/runs/333",
  salmonNorthFork: "https://www.riverbrain.com/runs/334",
};
const salmonNorthForkCornCreekThreshold =
  "https://www.howsyourriver.com/runs/5-north-fork-to-corn-creek-salmon-id";
const salmonNorthForkCornCreekAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/611/main";
const salmonCareyRigginsThreshold =
  "https://www.howsyourriver.com/runs/7-carey-creek-to-riggins-salmon-id";
const salmonCareyRigginsAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/1464/main";
const salmonStanleyRoughAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/608/main";
const salmonStanleyRoughThreshold =
  "https://www.riverbrain.com/runs/327";
const salmonStanleyRoughHys =
  "https://www.howsyourriver.com/runs/3-rough-creek-bridge-to-torrey-s-hole-river-access-salmon-id";
const salmonStanleyPutInAccess =
  "https://boatrampatlas.com/ramp/id-salmon-river-bridge-access/";
const salmonRigginsCityPark = "https://mapcarta.com/N7560987269";
const lowerSalmonThresholdGuide = "https://www.riverbrain.com/runs/251";
const lowerSalmonAwGuide =
  "https://www.americanwhitewater.org/content/River/view/river-detail/613/main";
const lowerSalmonHammerSource = "https://www.riverbrain.com/accesses/341";
const lowerSalmonPineBarSource = "https://www.riverbrain.com/accesses/345";
const lowerSalmonAmericanBarSource = "https://www.riverbrain.com/accesses/346";
const lowerSalmonHellerBarSource = "https://www.riverbrain.com/accesses/349";
const middleForkSalmonThreshold = "https://www.riverbrain.com/runs/54";
const middleForkSalmonPutInSource = "https://www.riverbrain.com/accesses/26";
const middleForkSalmonConfluenceSource = "https://www.riverbrain.com/accesses/352";
const middleForkSalmonTakeOutSource = "https://www.riverbrain.com/accesses/353";
const middleForkSalmonPermit = "https://www.recreation.gov/permits/234623";
const middleForkSalmonMarshAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/617/main";
const middleForkSalmonMarshPutIn =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/109769";
const middleForkSalmonMarshTakeOut =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/115020";
const mainSalmonThreshold = "https://www.riverbrain.com/runs/250";
const mainSalmonPutInSource = "https://www.riverbrain.com/accesses/354";
const mainSalmonVinegarSource = "https://www.riverbrain.com/accesses/379";
const mainSalmonCareySource = "https://www.riverbrain.com/accesses/380";
const mainSalmonPermit = "https://www.recreation.gov/permits/234622";
const southForkSalmonGoatAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/619/main";
const southForkSalmonGoatGuidebook =
  "https://www.whitewaterguidebook.com/idaho/south-fork-salmon-river/";
const southForkSalmonGoatDreamflows =
  "https://www.dreamflows.com/reachMap/index.php?num=1&rid=215";
const southForkSalmonPovertyEastAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/620/main";
const southForkSalmonPovertyEastMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/620/map";
const southForkSalmonClosure =
  "https://www.fs.usda.gov/detail/payette/passes-permits/?cid=fsm9_030962";
const southForkSalmonExpeditionAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/621/main";
const southForkSalmonExpeditionMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/621/map";
const southForkSalmonPermit =
  "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd526083.pdf";
const southForkSalmonPovertyFlat =
  "https://www.recreation.gov/camping/campgrounds/10176188";
const southForkSalmonGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13310700/";
const seceshCanyonAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/622/main";
const seceshCanyonMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/622/map";
const seceshCanyonGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13310700/";
const seceshCanyonAccessGuide =
  "https://www.fs.usda.gov/detail/payette/passes-permits/?cid=fsm9_030962";
const eastForkSouthForkUpperAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/616/main";
const eastForkSouthForkUpperMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/616/map";
const eastForkSouthForkUpperDreamflows =
  "https://www.dreamflows.com/reachMap/index.php?num=1&rid=683";
const eastForkSouthForkLowerAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/615/main";
const eastForkSouthForkLowerMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/615/map";
const eastForkSouthForkLowerDreamflows =
  "https://www.dreamflows.com/reachMap/index.php?num=2&rid=683";
const northForkPayetteThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/591/main";
const northForkPayetteMcCallThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/590/main";
const lowerMaladThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/574/main";
const lowerMaladMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/574/map";
const lowerMaladFlows = "https://kayakidaho.com/idaho-flows/snake-s";
const lowerMaladGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13152500/";
const lowerMaladParkGuide =
  "https://parksandrecreation.idaho.gov/wp-content/uploads/parks/thousand-springs/Malad-Brochure-2023.pdf";
const lowerMaladDiversionGuide =
  "https://research.idwr.idaho.gov/apps/Shared/LfRelatedDocs/Home/DownloadDoc?eid=2533656";
const middleForkPayetteThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4120/main";
const middleForkPayetteBoilingThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/588/main";
const northForkPayetteClassVThreshold =
  "https://www.riverbrain.com/runs/420";
const kellysWhitewaterThreshold =
  "https://www.riverbreak.com/spots/kellys-whitewater-park/157/";
const kellysWhitewaterPark = "https://kellyswhitewaterpark.com/";
const southForkBoiseThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/531/main";
const southForkBoiseUpperThreshold =
  "https://kayakidaho.com/idaho-flows/boise-flows";
const southForkBoiseUpperReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/532/main";
const southForkBoiseAccessGuide =
  "https://www.usbr.gov/pn/programs/ea/idaho/andersonturbine/2022-03-17%20--%20ARD%20Turbine%20Modernization%20EA%20FINAL.pdf";
const northForkBoiseThreshold =
  "https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/1992/199212-Comprehensive-State-Water-Plan-Upper-Boise-River-Basin.pdf";
const northForkBoiseAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/530/main";
const northForkBoiseBarberAccess =
  "https://sbbchidaho.org/PDF/BarberFlatTrailHead.pdf";
const northForkBoiseTroutdaleAccess =
  "https://mapcarta.com/23566962";
const lowerLochsaThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/570/main";
const upperLochsaThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/569/main";
const upperLochsaFlowGuide =
  "https://snoflo.org/paddle/idaho/white-pine-indian-grave-creek-to-wilderness-gateway-bridge";
const upperLochsaPowellFlowGuide =
  "https://www.howsyourriver.com/runs/1-powell-to-white-pine-indian-grave-creek-lochsa-id";
const lochsaSplitLowellThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/571/main";
const lochsaSplitLowellAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/111253";
const lochsaSplitLowellReports =
  "https://www.americanwhitewater.org/content/River/view/river-detail/571/reports";
const lochsaSplitLowellFlowGuide =
  "https://snoflo.org/paddle/idaho/split-creek-to-lowell";
const lochsaSplitLowellGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13337000/";
const crookedForkAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/549/main";
const crookedForkReports =
  "https://www.americanwhitewater.org/content/River/view/river-detail/549/reports";
const crookedForkWhiteSandsAccess =
  "https://www.howsyourriver.com/access_sites/white-sands-campground-id";
const crookedForkIdfgWater =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1146808465082";
const marshCreekAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/576/main";
const marshCreekIdfgWater =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1152301444493";
const marshCreekMiddleForkGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13309220/";
const marshCreekFlowGuide =
  "https://www.northidahorivers.com/Middle_Fork_Salmon.htm";
const marshCreekIncident =
  "https://www.americanwhitewater.org/accident/2026-05-05-marsh-creek/";
const lowerSelwayThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/624/main";
const upperSelwayAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/623/main";
const upperSelwayRiverBrain = "https://www.riverbrain.com/runs/253";
const upperSelwayParadiseAccess = "https://www.riverbrain.com/accesses/517";
const upperSelwayWhiteCapAccess = "https://www.riverbrain.com/accesses/794";
const upperSelwayPermit = "https://www.recreation.gov/permits/234624";
const upperSelwayGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13336500/";
const littleNorthForkAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/3248/main";
const littleNorthForkReports =
  "https://www.americanwhitewater.org/content/River/view/river-detail/3248/reports";
const littleNorthForkMap = "https://www.riverfacts.com/maps/11024.html";
const littleNorthForkLocal = "https://www.northidahorivers.com/Clearwater_LNF.htm";
const littleNorthForkCampground =
  "https://thedyrt.com/camping/idaho/idaho-little-north-fork";
const littleNorthForkFishAccess =
  "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22232-fishing-and-boating-access-site-north";
const littleNorthForkGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13340600/";
const kellyCreekAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/563/main";
const kellyCreekLocal = "https://www.northidahorivers.com/Kelly_Creek.htm";
const kellyCreekGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13340600/";
const kellyCreekMap = "https://mapcarta.com/23540918";
const kellyForksCampground = "https://mapcarta.com/N3864944214";
const kellyCreekForestService =
  "https://www.fs.usda.gov/r01/nezperce-clearwater/recreation/kelly-forks-cabin";
const northForkClearwaterHeadwatersAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/542/main";
const northForkClearwaterElizabethAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/1000049/main";
const northForkClearwaterElizabethAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118960";
const northForkClearwaterKellyAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118961";
const hiddenCreekCampground = "https://mapcarta.com/23536926";
const northForkClearwaterForestService =
  "https://www.fs.usda.gov/recarea/nezperceclearwater/recarea/?recid=79594";
const weitasCampground = "https://mapcarta.com/W877341977";
const washingtonCreekCampground = "https://mapcarta.com/23568826";
const quartzCreekAccess = "https://mapcarta.com/23554976";
const henrysForkThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/10993/main";
const henrysBoxThreshold =
  "https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/1998/199812-Resource-Inventory-Upper-Snake-River-Basin.pdf";
const henrysBoxAccessMap =
  "https://henrysfork.org/wp-content/uploads/Henrys-Fork-Angler-Access-Upper-River-Updated.pdf";
const henrysBoxFlowGuide =
  "https://www.wildernessportal.com/routes/henrys-fork-box-canyon";
const henrysCoffeePotThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/558/main";
const henrysMesaThreshold = "https://www.riverbrain.com/runs/101";
const henrysMesaAwAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/2038";
const henrysMesaAccessMap =
  "https://henrysfork.org/wp-content/uploads/Access-Map-Side-B-2019-updated.pdf";
const blackfootWolverineThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/528/main";
const blackfootWolverineAccess =
  "https://www.blm.gov/visit/trail-creek-bridge-campground";
const blackfootWolverineMap =
  "https://mapcarta.com/23522394";
const blackfootUpperThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/526/main";
const blackfootCutthroatThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/527/main";
const blackfootUpperAccess = "https://www.blm.gov/visit/blackfoot-river";
const blackfootCorridorMap =
  "https://www.blm.gov/documents/idaho/public-room/map/blackfoot-river-recreation-map";
const blackfootCutthroatAccess =
  "https://www.blm.gov/visit/cutthroat-trout-campground";
const blackfootCutthroatMap = "https://www.riverfacts.com/maps/11009.html";
const blackfootUpperMap = "https://www.riverfacts.com/maps/11008.html";
const oneidaNarrowsThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/1832/main";
const portneufThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/598/main";
const portneufTripReport =
  "https://www.americanwhitewater.org/content/River/view/river-detail/598/reports/100030794";
const portneufAccessReport =
  "https://www.americanwhitewater.org/content/River/view/river-detail/598/reports/101252935";
const portneufLavaGuide = "https://lavahotsprings.org/float-the-portneuf/";
const portneufPocatelloGuide =
  "https://river.pocatello.gov/wp-content/uploads/2024/04/FloatHandout.2024.pdf";
const portneufTopazDiversionStation =
  "https://portneufwatershed.org/sites/ISU-PR-Topaz/";
const bearBlackCanyonThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/515/main";
const bearBlackCanyonReleaseNotice =
  "https://www.pacificorp.com/community/recreation/water-release/bear-river.html";
const bearBlackCanyonMap =
  "https://www.riverfacts.com/maps/10997.html";
const bearBlackCanyonOfficialAccess =
  "https://www.pacificorp.com/content/dam/pcorp/documents/en/pacificorp/energy/hydro/bear-river/project-documents/final-documents/land-management-and-site-plans/2009-11-23_Grace%20Dam%20and%20Last%20Chance%20Site%20Plan.pdf";
const bearBlackCanyonIdfgAccess =
  "https://idfg.idaho.gov/blog/2022/03/fishing-bear-rivers-black-canyon-can-be-fun-spring-just-watch-those-high-whitewater";
const upperLochsaCorridor =
  "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5421285.pdf";
const caribouTargheeAccessGuide =
  "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5370788.pdf";
const clearwaterGuide =
  "https://www.blm.gov/sites/default/files/documents/files/idaho_clearwaterriver_guide-and-maps_0.pdf";
const northForkClearwaterThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/543/main";
const northForkClearwaterBlackCanyonGuide =
  "https://www.northidahorivers.com/Black_Canyon.htm";
const southForkClearwaterThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/545/main";
const southForkClearwaterGoldenThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/544/main";
const southForkClearwaterFlows =
  "https://kayakidaho.com/idaho-flows/clearwater";
const southForkClearwaterPlan =
  "https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/2005/20050113-Comprehensive-State-Water-Plan-South-Fork-Clearwater.pdf";
const southForkClearwaterAccess =
  "https://idfg.idaho.gov/visit/south-fork-clearwater-river-wha";
const southForkClearwaterHwy14Milepoints =
  "https://www.kooskia.com/wp-content/uploads/2025/08/Hwy-14-Milepost-Log.pdf";
const clearwaterMainstemFlowGuide =
  "https://gofloatthatriver.com/idaho/index.html";
const clearwaterMainstemAccessGuide =
  "https://www.blm.gov/sites/default/files/documents/files/idaho_clearwaterriver_guide-and-maps_0.pdf";
const bruneauThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/533/main";
const bruneauPage = "https://www.blm.gov/visit/north-fork-owyhee-river";
const owyheeCrutchersAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/580/main";
const owyheeCrutchersDreamflows =
  "https://www.dreamflows.com/reachMap/index.php?num=5&rid=161";
const owyheeCrutchersFlowGuide = "https://kayakidaho.com/idaho-flows/";
const owyheeCrutchersBlm =
  "https://www.blm.gov/visit/owyhee-river-wilderness-area";
const owyheeBoaterGuide =
  "https://www.blm.gov/sites/default/files/documents/files/Media-Center_Public-Room_Idaho_Bruneau-Jarbidge-Owyhee_BoaterGuide.pdf";
const owyheeThreeForks = "https://www.blm.gov/visit/three-forks";
const owyheeRomeGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13181000/";
const eastForkOwyheeAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/581/main";
const eastForkOwyheeGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13176400/";
const eastForkOwyheeTripReport =
  "https://www.lowercolumbiacanoeclub.org/riverrunnerblog/efowyhee2023";
const owyheeThreeForksRomeFlow =
  "https://site-media.americanwhitewater.org/Document_907.pdf";
const owyheeRomeAccess = "https://www.recreation.gov/gateways/1834";
const owyheeThreeForksAccess = "https://www.blm.gov/visit/three-forks";
const southForkOwyheeAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4141/main";
const southForkOwyheeBlm =
  "https://www.blm.gov/visit/south-fork-owyhee-wild-and-scenic-river";
const southForkOwyheeMap =
  "https://www.blm.gov/sites/default/files/documents/files/Media-Center_Public-Room_Idaho_Bruneau-Jarbidge-Owyhee_BoaterGuide.pdf";
const jarbidgeThreshold = "https://www.riverbrain.com/runs/142";
const jarbidgePutInSource = "https://www.riverbrain.com/accesses/225";
const jarbidgeTakeOutSource = "https://www.riverbrain.com/accesses/226";
const sunbeamThreshold = "https://www.riverbrain.com/runs/327";
const sunbeamDayStretchAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/609/main";
const salmonRoughSunbeamHys =
  "https://www.howsyourriver.com/runs/3-rough-creek-bridge-to-torrey-s-hole-river-access-salmon-id";
const sunbeamPutInSource = "https://www.riverbrain.com/accesses/581";
const sunbeamMormonBendSource = "https://www.riverbrain.com/accesses/583";
const sunbeamTakeOutSource = "https://www.riverbrain.com/accesses/584";
const torreyHoleAccess =
  "https://www.topozone.com/idaho/custer-id/locale/torreys-hole-floatboat-access/";
const lowerYankeeAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/649/main";
const lowerYankeeGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13296000/";
const upperYankeeSegments =
  "https://www.fws.gov/sites/default/files/documents/Yankee%20Fork%20Chinook%20Salmon%20and%20Steelhead%20Projects%2C%202008-2018.pdf";
const eastForkChallisRun = "https://www.riverbrain.com/runs/330";
const eastForkAccess = "https://www.riverbrain.com/accesses/591";
const deadmanHoleAccess = "https://www.riverbrain.com/accesses/592";
const hellsCanyonThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/633/main";
const hellsCanyonPage = "https://www.recreation.gov/permits/234625";
const murtaughThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/631/main";
const murtaughPutInSource =
  "https://www.blm.gov/visit/murtaugh-boating-access";
const murtaughTakeOutSource =
  "https://idahopower.com/recreation/parks-and-campgrounds/twin-falls-park/";
const milnerThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/3147/main";
const milnerReleaseGuide =
  "https://www.idahopower.com/recreation/water-information/milner-whitewater-information/";
const milnerAccessGuide =
  "https://idahopower.com/recreation/parks-and-campgrounds/milner-dam-whitewater-put-in-and-take-out/";
const augerThreshold =
  "https://www.howsyourriver.com/runs/auger-falls-park-snake-id";
const augerAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/11437/main";
const augerParkAccess =
  "https://id-twinfalls2.civicplus.com/Facilities/Facility/Details/Auger-Falls-Heritage-Park-8";
const augerQuaggaRules =
  "https://invasivespecies.idaho.gov/snake-river-access";
const tetonThreshold =
  "https://www.howsyourriver.com/runs/highway-33-bridge-to-spring-hollow-south-of-france-teton-id";
const upperTetonAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/1000040/main";
const upperTetonMap =
  "https://www.tetonwater.org/get-out/recreation-map/";
const upperTetonCountyRules =
  "https://pub-tetoncounty.escribemeetings.com/filestream.ashx?DocumentId=12743";
const upperTetonBatesAccess =
  "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22433-fishing-and-boating-access-site-bates";
const upperTetonGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13052200/";
const upperTetonFoxAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118921";
const upperTetonSouthBatesAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118922";
const upperTetonBatesAwAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118923";
const upperTetonPacksaddleAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118925";
const upperTetonHighway33Access =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118926";
const tetonAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/650/main";
const lowerTetonAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/11632/main";
const tetonDamAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/643/main";
const tetonDamAccessSource =
  "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22510-fishing-and-boating-access-site-teton";
const tetonDamManagementPlan =
  "https://www.usbr.gov/pn/programs/rmp/teton/rmp-teton2006.pdf";
const tetonCanyonGuide = "https://www.blm.gov/sites/blm.gov/files/BLM_ID_TetonRiver.pdf";
const tetonManagementPlan =
  "https://eplanning.blm.gov/public_projects/nepa/49403/138991/171039/FINAL_Snake_River_Planning_Area_%26_Teton_River_Canyon_Capacity_EA_22March2018.pdf";
const pineCreekAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/597/main";
const pineCreekTripReport =
  "https://www.americanwhitewater.org/content/River/view/river-detail/597/reports";
const pineCreekGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13052200/";
const pineCreekAccessGuide =
  "https://www.americanwhitewater.org/content/River/view/river-detail/597/map";
const pineCreekWatershedContext =
  "https://www.tetonwater.org/get-out/recreation-map/";
const bitchCreekAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/524/main";
const upperBitchCreekAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/525/main";
const upperBitchCreekFlowGuide =
  "https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/1998/199812-Resource-Inventory-Upper-Snake-River-Basin.pdf";
const bitchCreekDreamflows = "https://www.dreamflows.com/xlist-id.php";
const bitchCreekAccessPlan =
  "https://www.usbr.gov/pn/programs/rmp/teton/rmp-teton2006.pdf";
const bitchCreekBridgeProject =
  "https://itd.idaho.gov/project/us20osbornesh32bitchcreekbridges/";
const bigWoodAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/11414/main";
const bigWoodRotaryAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/11413/main";
const bigWoodUpperAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/11411/main";
const bigWoodAccessMap =
  "https://www.ketchumidaho.org/sites/default/files/fileattachments/recreation/page/2681/big_wood_fishing_access_map_-_copy.pdf";
const bigWoodLakeCreekTrailhead =
  "https://www.blm.gov/visit/lake-creek-trailhead";
const weiserAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/10972/main";
const weiserRiverAccessGuide =
  "https://weiserrivertrail.org/trail-map-%26-access";
const weiserIdfgWaterPage =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1169722442378";
const weiserGallowayProject =
  "https://eplanning.blm.gov/public_projects/nepa/30458/39415/41316/Weiser-Galloway_EA_Final_508.pdf";
const weiserIdahoManagementPlan =
  "https://idfg.idaho.gov/sites/default/files/fisheriesmanagementplan2025to2030.pdf";
const warmSpringsAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/11412/main";
const warmSpringsPutInSource =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/maouwfGnh6qJOwdqzXqex";
const warmSpringsTakeOutSource =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/QbKYQFXpn3KihwyaB9LO2";
const warmSpringsKetchumAccessMap =
  "https://www.ketchumidaho.org/sites/default/files/fileattachments/recreation/page/2681/big_wood_fishing_access_map_-_copy.pdf";
const warmSpringsCityPlan =
  "https://www.ketchumidaho.org/sites/default/files/fileattachments/planning_and_building/page/2131/ketchum_comp_plan_2001_final_201207091102059300.pdf";
const hagermanThreshold =
  "https://www.whitewaterguidebook.com/idaho/snake-river-hagerman/";
const hagermanChamberGuide =
  "https://hagermanvalleychamber.com/activities/rafting/";
const lowerSalmonFallsAccessGuide =
  "https://www.idahopower.com/community-recreation/recreation/parks-and-campgrounds/lower-salmon-falls-whitewater-put-in/";
const blissAccessGuide =
  "https://www.idahopower.com/recreation/parks-and-campgrounds/bliss-park-river-access-and-bliss-reservoir-boat-launch/";
const moyieThreshold =
  "https://www.grc101.com/IdahoPaddling/GIPMoyieCopper.html";
const moyieGaugeSource =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12306500/";
const moyieIdfgPage =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1161862487149";
const moyieCountyAccessPlan =
  "https://www2.boundarycountyid.org/planning/compplan/final_draft/08recreation.htm";
const moyieCampgroundMap = "https://mapcarta.com/23524778";
const moyieMeadowCampgroundMap = "https://mapcarta.com/23546882";
const moyieTwinBridgesSource =
  "https://www.grc101.com/IdahoPaddling/GIPMoyieTwin.html";
const moyieLowerThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/579/main";
const moyieLowerGuide = "https://www.northidahorivers.com/Moyie_River.htm";
const moyieLowerAccessPlan =
  "https://bonnersferry.id.gov/wp-content/uploads/2025/03/moyie-river_recreation_study-plan.pdf";
const camasThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/538/main";
const camasFlowGuide =
  "https://visitsouthidaho.com/adventure/rafting-camas-creek-idaho-blaine-bridge-moonstone-landing/";
const camasIdfgAccess =
  "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22305-fishing-and-boating-access-site";
const camasAccessGuide =
  "https://idfg.idaho.gov/sites/default/files/fishing-boating-access-guide-2016.pdf";
const moresThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/578/main";
const moresFlowGuide = "https://levels.wkcc.org/?D=yl1";
const moresAccessGuide =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1159889436285";
const moresParkGuide =
  "https://www.nww.usace.army.mil/Locations/District-Locks-and-Dams/Lucky-Peak-Dam-and-Lake/Mores-Creek/";
const potlatchThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/601/main";
const potlatchGuide = "https://www.northidahorivers.com/Potlatch_River.htm";
const potlatchMap = "https://www.riverfacts.com/maps/11100.html";
const potlatchCampground =
  "https://idahocampgroundreview.com/campgrounds/idaho-littlebouldercreek";
const littlePotlatchThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/5013/main";
const littlePotlatchEvidence =
  "https://site-media.americanwhitewater.org/Document_946.pdf";
const littlePotlatchGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13341570/";
const littlePotlatchFlowReport =
  "https://www.spokesman.com/stories/2019/may/26/the-potlatch-river-a-hidden-gem-on-the-edge-of-the/";
const bigBearThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/517/main";
const bigBearMap = "https://www.riverfacts.com/maps/11000.html";
const bigBearGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13341570/";
const bigBearItdBridge =
  "https://itd.idaho.gov/project/d1-bridge-repair-2/";
const lowerPotlatchThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/602/main";
const lowerPotlatchMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/602/map";
const lowerPotlatchGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13341570/";
const bearValleyFlowGuide =
  "https://www.whitewaterguidebook.com/idaho/bear-valley-creek/";
const bearValleySnoflo =
  "https://snoflo.org/paddle/idaho/109643-fir-creek-campground-to-boise-nf-boundary";
const bearValleyAccessGuide = "https://www.go-idaho.com/Bear-Valley-Creek-Idaho/";
const bearValleyMap = "https://www.riverfacts.com/details/10999.html";
const boundaryCreekThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/421/main";
const boundaryCreekGuide =
  "https://www.northidahorivers.com/Boundary_Creek.htm";
const boundaryCreekGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12321500/";
const boundaryCreekMap = "https://mapcarta.com/23518968";
const smithCreekThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/627/main";
const smithUpperThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/10542/main";
const smithCreekFlowProject =
  "https://www.americanwhitewater.org/project/smith-creek-management-id/";
const smithCreekIdfg =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1165299489639";
const smithCreekMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/627/map";
const northForkCdaAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/3917/main";
const northForkCdaGuide =
  "https://www.northidahorivers.com/CDA_North_Fork.htm";
const northForkCdaGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12411000/";
const northForkCdaLowerAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4468/main";
const northForkCdaLowerMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4468/map";
const northForkCdaLowerGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12413000/";
const northForkCdaForestServiceGuide =
  "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5421419.pdf";
const littleNorthForkCdaAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/548/main";
const littleNorthForkCdaMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/548/map";
const littleNorthForkCdaGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12413000/";
const littleNorthForkCdaIdfgWater =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1162388476102";
const boulderCreekAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/10359/main";
const boulderCreekMap =
  "https://www.americanwhitewater.org/content/River/view/river-detail/10359/map";
const boulderCreekGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12304500/";
const boulderCreekIdfgWater =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1160515486249";
const boulderCreekLeoniaAccess =
  "https://idfg.idaho.gov/blog/2016/07/leonia-montana-access-site-open-kootenai-river";
const boulderCreekForestContext =
  "https://www.fs.usda.gov/r01/kootenai/about-area/about-forest";
const stMariesAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/641/main";
const stMariesGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12414900/";
const stMariesIdfgWater =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1165550473172";
const stMariesIdfgAccess =
  "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22216-fishing-and-boating-access-site-st";
const stMariesAccessGuide =
  "https://idfg.idaho.gov/old-web/docs/wildReportsNewsletters/panhandleAccessGuide.pdf";
const stMariesLocalGuide = "https://www.northidahorivers.com/St_Maries.htm";
const southForkCdaAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4452/main";
const southForkCdaGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12413131/";
const southForkCdaGuide =
  "https://www.northidahorivers.com/CDA_South_Fork.htm";
const southForkCdaIdfg =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1162568475572";
const southForkCdaAccessArticle =
  "https://www.americanwhitewater.org/article/2kikod8vyskomgf5i2dkt/";
const southForkCdaTrail =
  "https://parksandrecreation.idaho.gov/state-park/trail-of-the-coeur-dalenes/";
const packGorgetteAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4523/main";
const packSlidesAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4522/main";
const packGrottosAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4521/main";
const packGorgetteGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12392300/";
const packGorgetteLocalGuide =
  "https://sandpointonline.com/sandpointmag/sms11/moving_waters.html";
const packMinimumFlowSource =
  "https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/2011/20110513-IWRB-Meeting-Agenda-3-11.pdf";
const packFlowContextSource =
  "https://www.bonnerswcd.org/files/5d1c8f5fc/RR_Nov_22.pdf";
const packDreamflows = "https://www.dreamflows.com/alphaReaches.php?st=id";
const smithCreekGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12321500/";
const lightningCreekThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/10495/main";
const lightningCreekGuide =
  "https://www.northidahorivers.com/Lightning_Creek.htm";
const lightningCreekGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12392155/";
const lightningCreekAccessGuide =
  "https://apps.itd.idaho.gov/apps/milepointlog/logs/stateHW/SH_200_MPLog.pdf";
const stJoeHellerReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/636/main";
const stJoeHellerGuide =
  "https://www.northidahorivers.com/St_Joe_Heller_Creek.htm";
const stJoeRedIvesGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12413875/";
const stJoeHellerMap = "https://mapcarta.com/N4947738275";
const fallRiverThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/552/main";
const upperFallRiverReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/553/main";
const caveFallsCampgroundSource =
  "https://www.recreation.gov/camping/poi/239007";
const fallRiverGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13047500/";
const fallRiverAccessGuide =
  "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22416-fishing-and-boating-access-site-fall";
const fallRiverAccessMap =
  "https://www.henrysfork.org/wp-content/uploads/Fall-River-Angler-Access.pdf";
const snakePittsburgHellerThreshold = "https://www.riverbrain.com/runs/156";
const snakePittsburgAccessSource = "https://www.riverbrain.com/accesses/347";
const snakeDugBarAccessSource = "https://www.riverbrain.com/accesses/348";
const snakeHellerAccessSource = "https://www.riverbrain.com/accesses/349";
const staircaseThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/596/main";
const southForkPayetteThresholdPlan =
  "https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/1999/19990205-Comprehensive-State-Water-Plan-Payette.pdf";
const southForkPayetteCanyonThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/594/main";
const lowerDeadwoodAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/3087/main";
const lowerDeadwoodJulieAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118380";
const lowerDeadwoodTakeOutAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/116336";
const lowerDeadwoodGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13236500/";
const upperDeadwoodAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/550/main";
const upperDeadwoodPutInAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/111011";
const upperDeadwoodTakeOutAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118425";
const upperDeadwoodGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13236500/";
const henrysLowerMesaAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/559/main";
const henrysLowerMesaPutInAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/110747";
const henrysLowerMesaTakeOutAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/116016";
const henrysLowerMesaGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13046000/";
const westForkBruneauAwReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/535/main";
const westForkBruneauPutInAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/108670";
const westForkBruneauTakeOutAccess =
  "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/113905";
const westForkBruneauGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-13168500/";
const deadwoodAccessSource = "https://mapcarta.com/W1186918225";
const danskinStationAccessSource = "https://mapcarta.com/N900053077";
const grandjeanThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/593/main";
const grandjeanAccessSource = "https://mapcarta.com/23534566";
const northForkStJoeThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/640/main";
const northForkStJoeGuide =
  "https://www.northidahorivers.com/St_Joe_North_Fork.htm";
const stJoeSpruceTreeGuide =
  "https://www.northidahorivers.com/St_Joe_Spruce_Tree.htm";
const stJoeSpruceTreeThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/637/main";
const stJoeSpruceTreeFlow =
  "https://www.wildernessportal.com/routes/st-joe-spruce-tree-camp-to-gold-creek";
const stJoeSpruceTreeMap =
  "https://www.riverfacts.com/maps/11141.html";
const stJoeGoldCreekAnchor =
  "https://www.mindat.org/feature-5594203.html";
const marbleCreekGuide =
  "https://www.northidahorivers.com/St_Joe_Marble_Creek.htm";
const marbleCreekAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/575/main";
const marbleCreekCamp3Map =
  "https://maps.campendium.com/us/calder-id/camping-rv/camp-3-campground";
const marbleCreekMouthAnchor =
  "https://www.google.com/maps/place/Marble+Creek+Historical+Park/@47.2501751,-116.0225783,15z";
const slateCreekGuide =
  "https://www.northidahorivers.com/St_Joe_Slate_Creek.htm";
const slateCreekAw =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4153/main";
const slateCreekFranklinMine =
  "https://www.mindat.org/loc-137397.html";
const slateCreekConfluence =
  "https://waterwaymap.org/river/Saint%20Joe%20River%20002095320289/";
const stJoeTumbledownThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4770/main";
const bigCreekStJoeReach =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4768/main";
const bigCreekStJoeIdfg =
  "https://idfg.idaho.gov/ifwis/fishingplanner/water/1161084472694";
const bigCreekStJoeMvum =
  "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd530188.pdf";
const bigCreekStJoeGauge =
  "https://waterdata.usgs.gov/monitoring-location/USGS-12414500/";
const bigCreekStJoePutInMap = "https://mapcarta.com/23547238";
const bigCreekStJoeTakeOutMap = "https://mapcarta.com/23516762";
const swirlyCanyonThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/4121/main";
const priestRiverThresholdGuide =
  "https://www.grc101.com/IdahoPaddling/GIPPriestOutlet.html";
const priestRiverAccessGuide =
  "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fsm9_018811.pdf";
const priestRiverChipmunkGuide =
  "https://www.grc101.com/IdahoPaddling/GIPPriestChipmunk.html";
const priestRiverMcAbeeGuide =
  "https://www.grc101.com/IdahoPaddling/GIPPriestBelowMcAbee.html";
const priestRiverFlowGuide =
  "https://sandpointonline.com/sandpointmag/sms11/moving_waters.html";
const priestRiverMudholeAccess =
  "https://www.recreation.gov/camping/campgrounds/233596";
const johnsonCreekThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/562/main";
const johnsonCreekFlowTable = "https://levels.wkcc.org/?D=7t2";
const johnsonCreekAirportSource =
  "https://itd.idaho.gov/wp-content/uploads/2025/06/Airport-Facilities-Directory.pdf";
const johnsonCreekCampgroundSource =
  "https://www.recreation.gov/camping/campgrounds/10351680";
const littleSalmonThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/566/main";
const littleSalmonSmokyThreshold =
  "https://www.americanwhitewater.org/content/River/view/river-detail/565/main";
const littleSalmonFlowTable = "https://levels.wkcc.org/?D=nm2";
const littleSalmonMap = "https://www.riverfacts.com/maps/11055.html";
const littleSalmonAccessGuide =
  "https://idfg.idaho.gov/sites/default/files/fishing-boating-access-southwest-2016.pdf";
const littleSalmonMilepointLog =
  "https://apps.itd.idaho.gov/apps/milepointlog/logs/usHW/US_95_MPLog.pdf";

type Access = {
  name: string;
  latitude: number;
  longitude: number;
  mileFromStart: number;
  note: string;
  segmentKind?: "lake" | "transition" | "creek";
};
type Spec = {
  id: string;
  riverId: string;
  name: string;
  reach: string;
  region: string;
  routeType: "recreational" | "whitewater";
  summary: string;
  statusText: string;
  distance: string;
  time: string;
  difficulty: "easy" | "moderate" | "hard";
  risk: RouteSafetyProfile["riskLevel"];
  hazards: RouteSafetyProfile["hazards"];
  safety: string[];
  gauge: string;
  gaugeName: string;
  gaugeKind?: "direct" | "proxy";
  gaugeMetric?: "discharge_cfs" | "gage_height_ft";
  thresholdModel?: "minimum-only" | "two-sided";
  threshold?: {
    tooLow?: number;
    idealMin?: number;
    idealMax?: number;
    tooHigh?: number;
  };
  thresholdLabel: string;
  thresholdUrl?: string;
  thresholdSupportUrl?: string;
  thresholdSourceStrength?: SourceStrength;
  scoreEligibility?: River["scoreEligibility"];
  sourceUrl: string;
  sourceLabel: string;
  mapUrl?: string;
  additionalSourceLinks?: Array<{ label: string; url: string; provider?: "manual" | "local" | "usgs" | "nps" }>;
  putIn: Access;
  takeOut: Access;
  access?: Access[];
  camping: string;
  campingClassification:
    | "none"
    | "nearby_basecamp"
    | "endpoint_campground"
    | "on_route_campsite";
  shuttle: string;
  permits: string;
  watchFor: string[];
  season?: number[];
  imageUrl: string;
  imageLabel: string;
};

const verifiedAccessCoordinates: Record<
  string,
  Pick<Access, "latitude" | "longitude">
> = {
  "Banks River Access": { latitude: 44.08438, longitude: -116.1165 },
  "Tower Rock Recreation Site": { latitude: 45.3125, longitude: -113.905833 },
};

function withVerifiedCoordinates(access: Access): Access {
  return { ...access, ...(verifiedAccessCoordinates[access.name] ?? {}) };
}

function makeRoute(spec: Spec): River {
  const gaugeKind = spec.gaugeKind ?? "direct";
  const scoreEligibility = spec.scoreEligibility ?? "planning";
  const thresholdUrl = spec.thresholdUrl ?? spec.sourceUrl;
  const detailUrl = `https://waterdata.usgs.gov/monitoring-location/USGS-${spec.gauge}/`;
  const hydrographUrl = `https://waterdata.usgs.gov/nwis/uv/?site_no=${spec.gauge}`;
  const putIn = withVerifiedCoordinates(spec.putIn);
  const takeOut = withVerifiedCoordinates(spec.takeOut);
  const accesses = (spec.access ?? [putIn, takeOut]).map(
    withVerifiedCoordinates,
  );
  return {
    id: spec.id,
    slug: spec.id,
    riverId: spec.riverId,
    name: spec.name,
    reach: spec.reach,
    aliases: [`${spec.name} ${spec.reach}`, `${putIn.name} to ${takeOut.name}`],
    state: "Idaho",
    region: spec.region,
    routeType: spec.routeType,
    summary: spec.summary,
    statusText: spec.statusText,
    latitude: putIn.latitude,
    longitude: putIn.longitude,
    safetyProfile: {
      riskLevel: spec.risk,
      hazards: spec.hazards,
      safetyNotes: spec.safety,
      reviewStatus: "reviewed",
    },
    gaugeSource: {
      id: `usgs-${spec.gauge}`,
      provider: "usgs",
      siteId: spec.gauge,
      metric: spec.gaugeMetric ?? "discharge_cfs",
      unit: spec.gaugeMetric === "gage_height_ft" ? "ft" : "cfs",
      kind: gaugeKind,
      siteName: spec.gaugeName,
      detailUrl,
      hydrographUrl,
    },
    profile: {
      thresholdModel:
        spec.thresholdModel === "two-sided" &&
        Number.isFinite(spec.threshold?.tooLow) &&
        Number.isFinite(spec.threshold?.tooHigh)
          ? "two-sided"
          : "minimum-only",
      ...(spec.threshold ?? {}),
      thresholdSource: {
        label: spec.thresholdLabel,
        url: thresholdUrl,
        provider: "local",
      },
      thresholdSourceStrength: spec.thresholdSourceStrength ?? "official",
      rainfallSensitivity: "high",
      seasonMonths: spec.season ?? [5, 6, 7, 8, 9],
      seasonNotes:
        "Late spring through early fall is the normal planning window. Verify snowmelt, releases, fire or fish-protection closures, water temperature, weather, and access status immediately before travel.",
      difficulty: spec.difficulty,
      difficultyNotes:
        "Difficulty follows the cited manager guide where stated and otherwise is deliberately conservative. Current flow, debris, diversions, weather, and party skill can materially change the trip.",
      confidenceNotes:
        "Named public access and the route corridor are supported by the cited government guide. Live gauges provide planning context only; they are not a route-specific safety guarantee.",
    },
    putIn: {
      name: putIn.name,
      latitude: putIn.latitude,
      longitude: putIn.longitude,
    },
    takeOut: {
      name: takeOut.name,
      latitude: takeOut.latitude,
      longitude: takeOut.longitude,
    },
    accessPoints: accesses.map((access, index) => ({
      id: `${spec.id}-${index + 1}-${access.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: access.name,
      latitude: access.latitude,
      longitude: access.longitude,
      mileFromStart: access.mileFromStart,
      segmentKind: access.segmentKind ?? "transition",
      note: access.note,
    })),
    logistics: {
      distanceLabel: spec.distance,
      estimatedPaddleTime: spec.time,
      shuttle: spec.shuttle,
      permits: spec.permits,
      camping: spec.camping,
      campingClassification: spec.campingClassification,
      summary: spec.summary,
      accessCaveats: [
        "Use only the named public launch or landing; a nearby bank, bridge shoulder, fishing easement, or private campground is not substitute access.",
        "Confirm current closures, fire restrictions, seasonal gates, parking capacity, fees, launch condition, and Idaho invasive-species requirements before travel.",
        "Private banks are common. Do not land, scout, portage, or camp outside a signed public site or manager-designated corridor.",
      ],
      watchFor: spec.watchFor,
    },
    evidenceNotes: [
      {
        label: "Official route corridor",
        value: `${spec.reach}; ${spec.distance}`,
        note: `${spec.sourceLabel} identifies the endpoint chain, river miles, or managed float corridor.`,
        sourceUrl: spec.sourceUrl,
      },
      {
        label: "Public access control",
        value: `${putIn.name} to ${takeOut.name}`,
        note: "Coordinates represent named public ramps, bank launches, park landings, or an explicitly described staging point.",
        sourceUrl: spec.mapUrl ?? spec.sourceUrl,
      },
      {
        label:
          gaugeKind === "direct"
            ? "Direct live gauge"
            : "Defensible proxy gauge",
        value: `USGS ${spec.gauge} - ${spec.gaugeName}`,
        note:
          gaugeKind === "direct"
            ? "Gauge is on the named waterbody and supplies context only."
            : "Gauge is downstream on the same river system and must not be treated as a local measurement.",
        sourceUrl: detailUrl,
      },
      {
        label: "Threshold posture",
        value: spec.threshold
          ? scoreEligibility === "scored"
            ? "Gauge-linked range used for live scoring"
            : "Numeric cue retained for planning"
          : "No numeric cutoff published",
        note:
          scoreEligibility === "scored"
            ? "The cited route guidance is tied to this gauge and reach; hazards, closures, weather, and local inspection still override the score."
            : "The route remains planning-only; no live go/no-go score is asserted.",
        sourceUrl: thresholdUrl,
      },
      {
        label: "Safety and land management",
        value: "Current manager notices override this record",
        note: spec.safety.join(" "),
        sourceUrl: spec.sourceUrl,
      },
      {
        label: "Camping classification",
        value: spec.campingClassification,
        note: spec.camping,
        sourceUrl: spec.sourceUrl,
      },
      {
        label: "Image decision",
        value: spec.imageLabel,
        note: "Approved route-area or same-river context; it does not depict every endpoint or current conditions.",
        sourceUrl: spec.imageUrl,
      },
      {
        label: "Overlap decision",
        value: "Retained as a distinct access-to-access itinerary",
        note: "Adjacent cards use different public endpoints and provide a different trip length, hazard set, skill tier, or operating boundary.",
        sourceUrl: spec.sourceUrl,
      },
    ],
    sourceLinks: [
      {
        label: spec.sourceLabel,
        url: spec.sourceUrl,
        provider: spec.sourceUrl.includes("rivers.gov") ? "nps" : "local",
      },
      {
        label: "Official access/map control",
        url: spec.mapUrl ?? spec.sourceUrl,
        provider: "local",
      },
      {
        label: `USGS ${spec.gauge} monitoring location`,
        url: detailUrl,
        provider: "usgs",
      },
      {
        label: `USGS ${spec.gauge} current conditions`,
        url: hydrographUrl,
        provider: "usgs",
      },
      ...(thresholdUrl !== spec.sourceUrl
        ? [
            {
              label: spec.thresholdLabel,
              url: thresholdUrl,
              provider: "manual" as const,
            },
          ]
        : []),
      ...(spec.thresholdSupportUrl
        ? [
            {
              label: "Additional threshold support",
              url: spec.thresholdSupportUrl,
              provider: "manual" as const,
            },
          ]
        : []),
      ...(spec.additionalSourceLinks ?? []).map((link) => ({
        label: link.label,
        url: link.url,
        provider: link.provider ?? ("manual" as const),
      })),
      { label: spec.imageLabel, url: spec.imageUrl, provider: "manual" },
      {
        label: "Idaho boating and invasive-species requirements",
        url: idahoBoating,
        provider: "local",
      },
    ],
    scoreEligibility,
    ...(gaugeKind === "proxy"
      ? { scoreEligibilityReason: "proxy_gauge" as const }
      : {}),
  };
}

const snakeImage =
  "https://upload.wikimedia.org/wikipedia/commons/3/32/Snake_River_view_near_Twin_Falls%2C_Idaho.jpg";
const payetteImage =
  "https://upload.wikimedia.org/wikipedia/commons/2/2d/Payette_River_Scenic_Byway_-_Payette_River%27s_Allure_-_NARA_-_7720998.jpg";
const boiseImage =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/-IDAHO-B-0002-%20Boise%20River%20-%20Boise%20%285563104954%29.jpg?width=1600";
const salmonImage =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Salmon%20River%20north%20of%20Challis%2C%20Idaho%20%2823600914631%29.jpg?width=1600";
const stJoeImage =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/St%20Joe%20River%20at%20Red%20Ives.jpg?width=1600";
const henrysImage =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Henry%27s%20Lake%20State%20Park%2C%20Idaho%20--%20looking%20across%20the%20lake%20towards%20Henrys%20Lake%20Mountains.jpg?width=1600";
const northForkOwyheeImage =
  "https://rivers.gov/sites/rivers/files/2022-12/owyhee_river_nf_idaho.jpg";
const clearwaterImage =
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Clearwater_River_near_Orofino%2C_Idaho.jpg?width=1600";
const fallRiverImage = henrysImage;
const tetonImage =
  "https://www.americanrivers.org/wp-content/uploads/2022/12/Teton_river_in_South_East_Idaho-1024x576.jpg";
const weiserImage = payetteImage;
const warmSpringsImage = salmonImage;

const snakeHazards: RouteSafetyProfile["hazards"] = [
  "dam_release",
  "cold_water",
  "strainers",
  "private_banks",
  "low_water",
  "access_uncertain",
];
const lowerSnakeHazards: RouteSafetyProfile["hazards"] = [
  ...snakeHazards,
  "mandatory_takeout",
];
const salmonHazards: RouteSafetyProfile["hazards"] = [
  "cold_water",
  "strainers",
  "private_banks",
  "low_water",
  "remote",
  "access_uncertain",
];
const commonSnakeSafety = [
  "Cold, swift water, standing waves, whirlpools, wood, bridge piers, gravel bars, and diversions require active boat handling and a worn PFD.",
  "Palisades releases can change current and channel choice; use only designated launches and check the current BLM advisories before departure.",
];
const commonSalmonSafety = [
  "The BLM guide warns that high or low water, shifting channels, cottonwood strainers, diversion structures, bridge piers, cold water, and remote rescue can affect any reach.",
  "Stay off private banks and carry first-aid, repair, and emergency communication appropriate to the corridor.",
];

export const idahoRoutes: River[] = [
  makeRoute({
    id: "secesh-river-canyon-lower",
    riverId: "secesh-river-idaho",
    name: "Secesh River",
    reach: "Loon Creek to Lick Creek / South Fork Salmon",
    region: "Central Idaho / Payette National Forest",
    routeType: "whitewater",
    summary:
      "A 15.7-mile Class IV-V Secesh River canyon and lower reach to the South Fork Salmon, with remote Forest Service access, high-consequence wood, and a broad spring/summer proxy-gauge window.",
    statusText:
      "Threshold-documented planning expedition. American Whitewater correlates the reach to South Fork Salmon gauge 13310700 at 1,000-6,000 cfs; the gauge is a watershed proxy rather than a local Secesh measurement. The AW record says the endpoint coordinates are approximate, so verify road, carry, camping, and current wood before committing.",
    distance: "About 15.7 river miles",
    time: "About 6-10 hours plus a remote shuttle and scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates the Secesh River Canyon and Lower Secesh Class IV-V. Use a proven creek/river-running team, full rescue kit, satellite communication, and a portage plan for wood and unscoutable canyon features.",
      "The 1,000-6,000 cfs correlation is on downstream/adjacent South Fork Salmon gauge 13310700 and is not a local Secesh safety guarantee. Inspect the river and do not launch solely from the online value.",
      "The canyon is remote, endpoint coordinates are explicitly approximate, and road access is seasonal. Confirm Forest Service road status, legal staging, camping, and the South Fork Salmon confluence exit before loading boats.",
    ],
    gauge: "13310700",
    gaugeName: "South Fork Salmon River near Krassel Ranger Station, ID (Secesh proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1000, idealMax: 6000, tooHigh: 6000 },
    thresholdLabel: "American Whitewater proxy correlation: 1,000-6,000 cfs on South Fork Salmon gauge 13310700",
    thresholdUrl: seceshCanyonAw,
    thresholdSupportUrl: seceshCanyonGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: seceshCanyonAw,
    sourceLabel: "American Whitewater Secesh River Canyon and Lower Secesh reach record",
    mapUrl: seceshCanyonMap,
    additionalSourceLinks: [
      { label: "American Whitewater Secesh map/access record", url: seceshCanyonMap },
      { label: "USGS 13310700 South Fork Salmon proxy gauge", url: seceshCanyonGauge },
      { label: "Payette National Forest permit and access guidance", url: seceshCanyonAccessGuide },
      { label: "South Fork Salmon wilderness logistics", url: southForkSalmonPermit },
    ],
    putIn: {
      name: "Secesh / Loon Creek access",
      latitude: 45.1722221374512,
      longitude: -115.814163208008,
      mileFromStart: 0,
      note: "American Whitewater's approximate put-in anchor. Confirm the Loon Creek road-end, parking, carry, and seasonal gate before launch.",
    },
    takeOut: {
      name: "Lick Creek / South Fork Salmon access",
      latitude: 45.0286102294922,
      longitude: -115.712219238281,
      mileFromStart: 15.7,
      note: "American Whitewater's approximate lower access anchor near Lick Creek and the South Fork Salmon. Confirm the take-out, confluence landing, downstream continuation, and legal vehicle staging.",
    },
    camping:
      "Remote backcountry camping may be possible only at lawful Forest Service sites and established river camps; verify permit, fire, sanitation, and seasonal closure rules before departure.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Remote one-way shuttle on seasonal Payette National Forest roads. Stage the lower vehicle and verify road conditions, gates, and confluence landing before committing to the canyon.",
    permits:
      "Follow Payette National Forest and South Fork Salmon permit/closure rules, Idaho AIS/PFD requirements, fire restrictions, and any current wilderness or wildlife notices.",
    watchFor: ["canyon wood", "unscoutable Class IV-V", "cold water", "rapid spring rise", "seasonal roads", "approximate access", "remote rescue"],
    season: [5, 6, 7],
    imageUrl: salmonImage,
    imageLabel: "Central Idaho Salmon watershed context photograph; not a Secesh endpoint image",
  }),
  makeRoute({
    id: "north-fork-coeur-dalene-jordan-teepee",
    riverId: "north-fork-coeur-dalene-idaho",
    name: "North Fork Coeur d'Alene River",
    reach: "Jordan Camp to Teepee Creek",
    region: "North Idaho / Coeur d'Alene National Forest",
    routeType: "whitewater",
    summary:
      "A 6.7-mile Class II+(III) roadless North Fork Coeur d'Alene reach from Jordan Camp to the Teepee Creek bridge/trail exit, with scenic canyon walls and low-flow braid/wood concerns.",
    statusText:
      "Threshold-documented planning route. American Whitewater correlates this reach to the North Fork Coeur d'Alene gauge near Prichard with a 2,000-10,000 cfs runnable envelope; the local guide notes that the gauge is below Teepee Creek, so the live value is proxy context. The field cue is a bankfull river under the take-out bridge, with a short late-April/early-May access window.",
    distance: "About 6.7 river miles",
    time: "About 3-5 hours plus a long forest-road shuttle and scouting",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "access_uncertain"],
    safety: [
      "North Idaho Rivers describes Class II-III swiftwater with braided sections that become scrapy at low flow, brushy banks, and wood. Use a suitable whitewater craft, PFD, throw bag, and a crew comfortable with remote self-rescue.",
      "The nearest online gauge is below Teepee Creek, which is nearly equal in volume to the North Fork. Check the local bankfull cue under the take-out bridge and do not treat the gauge as a direct reach measurement.",
      "The 3099/412 and Shoshone Creek approaches can remain snowed in until flows are already dropping. Scout road conditions, stage the take-out, and carry communication; Trail 20 is the committed hike-out option.",
    ],
    gauge: "12411000",
    gaugeName: "North Fork Coeur d'Alene above Shoshone Creek near Prichard, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2000, idealMin: 2000, idealMax: 10000, tooHigh: 10000 },
    thresholdLabel: "American Whitewater runnable correlation: 2,000-10,000 cfs on downstream 12411000; local field cue is bankfull under the take-out bridge",
    thresholdUrl: northForkCdaAwReach,
    thresholdSupportUrl: northForkCdaGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkCdaAwReach,
    sourceLabel: "American Whitewater North Fork Coeur d'Alene Jordan Camp-to-Teepee reach record",
    mapUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/3917/map",
    additionalSourceLinks: [
      { label: "North Idaho Rivers Jordan Camp-to-Teepee guide", url: northForkCdaGuide },
      { label: "American Whitewater Jordan Camp put-in access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/109729" },
      { label: "American Whitewater Teepee Creek take-out access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/114982" },
      { label: "USGS North Fork Coeur d'Alene proxy gauge", url: northForkCdaGauge },
      { label: "Idaho DEQ North Fork Coeur d'Alene watershed context", url: "https://www.deq.idaho.gov/water-quality/surface-water/total-maximum-daily-loads/coeur-dalene-river-upper-north-fork-subbasin/" },
      { label: "American Whitewater North Fork Coeur d'Alene map", url: "https://www.americanwhitewater.org/content/River/view/river-detail/3917/map" },
    ],
    putIn: {
      name: "Jordan Camp Access",
      latitude: 47.9444,
      longitude: -116.097,
      mileFromStart: 0,
      note: "American Whitewater access-area anchor at Jordan Camp; reach it via Forest Roads 3099/412 or the longer Shoshone Creek approach only after confirming seasonal road and legal staging conditions.",
    },
    takeOut: {
      name: "Teepee Creek Bridge / Trail 20 Exit",
      latitude: 47.8848,
      longitude: -116.13,
      mileFromStart: 6.7,
      note: "American Whitewater take-out anchor at the Teepee Creek bridge; local guidance uses the bridge for a bankfull field check and Trail 20 for the committed river exit. Confirm parking and river-side carry.",
    },
    camping:
      "No on-route developed camping is assumed. Use lawful Forest Service sites near Big Hank Campground or a separately verified North Idaho basecamp; protect the roadless canyon and pack out waste.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Long forest-road shuttle from the Teepee Creek bridge to Jordan Camp, with snow and mud commonly controlling the short spring window. Stage the take-out first and carry a recovery/communication plan.",
    permits:
      "Follow Idaho Panhandle/Coeur d'Alene National Forest rules, Idaho AIS/PFD requirements, fire restrictions, seasonal road closures, and any posted access or wildlife protections.",
    watchFor: ["bankfull bridge cue", "braided low-water channels", "brush and wood", "snowbound access roads", "Trail 20 hike-out", "roadless canyon logistics"],
    season: [4, 5],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho river corridor context photograph; not a Jordan Camp endpoint image",
  }),

  makeRoute({
    id: "north-fork-coeur-dalene-babins-little-north",
    riverId: "north-fork-coeur-dalene-idaho",
    name: "North Fork Coeur d'Alene River",
    reach: "Babins Junction to Little North Fork",
    region: "North Idaho / Coeur d'Alene River corridor",
    routeType: "whitewater",
    summary:
      "A 14.9-mile Class I(II) North Fork Coeur d'Alene float from the Babins Junction steel bridge to the Little North Fork Road bridge, with paved shuttle roads, mostly private high-water frontage, and a required wood/brush inspection.",
    statusText:
      "Threshold-documented planning route. American Whitewater correlates the reach to downstream USGS 12413000 at 2,000-20,000 cfs; the page describes a mostly Class I summer float that becomes more technical during runoff and warns of low-water scraping, brush, private frontage, and a historical log-jam portage. Use the gauge as downstream proxy context and confirm both bridge-area access points before launch.",
    distance: "About 14.9 river miles",
    time: "About 4-7 hours plus a paved shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "private_banks", "access_uncertain"],
    safety: [
      "American Whitewater describes mostly Class I water with Class I(II) runoff character, brushy banks, and low-water riffles that can drag boats. Wear a PFD, carry basic rescue and repair gear, and keep an active lookout around every bend.",
      "The gauge is downstream at Enaville, so 2,000-20,000 cfs is a planning correlation rather than a local go/no-go rule. Inspect the actual channel, any remaining wood, and bridge clearance before committing.",
      "The riverfront is mostly private above the high-water mark. Launch and land only at the named bridge/frontage-road access areas, respect posted restrictions, and do not substitute private shoreline, tubes-only sites, or informal camps.",
    ],
    gauge: "12413000",
    gaugeName: "North Fork Coeur d'Alene River at Enaville, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2000, idealMin: 2000, idealMax: 20000, tooHigh: 20000 },
    thresholdLabel: "American Whitewater downstream-proxy correlation: 2,000-20,000 cfs on USGS 12413000",
    thresholdUrl: northForkCdaLowerAwReach,
    thresholdSupportUrl: northForkCdaLowerGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkCdaLowerAwReach,
    sourceLabel: "American Whitewater North Fork Coeur d'Alene Babins Junction-to-Little North Fork reach record",
    mapUrl: northForkCdaLowerMap,
    additionalSourceLinks: [
      { label: "American Whitewater Babins Junction map/access record", url: northForkCdaLowerMap },
      { label: "USGS 12413000 North Fork Coeur d'Alene at Enaville", url: northForkCdaLowerGauge },
      { label: "Coeur d'Alene River Corridor Forest Service guide", url: northForkCdaForestServiceGuide },
      { label: "Idaho Fish and Game North Fork/Little North Fork water record", url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1162388476102" },
    ],
    putIn: {
      name: "Babins Junction steel bridge / frontage-road access",
      latitude: 47.6525268554688,
      longitude: -116.031066894531,
      mileFromStart: 0,
      note: "American Whitewater's named bridge/frontage-road access. Use the easy river-right trail only after confirming lawful parking, bridge staging, and current road conditions.",
    },
    takeOut: {
      name: "Little North Fork Road bridge",
      latitude: 47.6104888916016,
      longitude: -116.24146270752,
      mileFromStart: 14.9,
      note: "American Whitewater's small parking-area and short-trail take-out just past the Little North Fork confluence. Confirm river-right landing, parking, and private-bank boundaries.",
    },
    camping:
      "Day-use float; no on-route camping is claimed. Nearby Forest Service campgrounds exist in the broader corridor, but use only lawful developed or clearly designated sites and do not camp on private riverfront.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Paved-road shuttle between the Babins Junction and Little North Fork bridge areas. Stage vehicles without blocking frontage roads, bridge approaches, or private driveways.",
    permits:
      "Follow Idaho boating/AIS/PFD rules, Forest Service and county road restrictions, posted private-property signs, fire rules, and any current bridge or road work notices.",
    watchFor: ["low-water scraping", "brushy bends", "strainers and legacy log jams", "private frontage", "bridge clearance", "warm-weekend crowding"],
    season: [5, 6, 7, 8],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho river corridor context photograph; not a Babins Junction endpoint image",
  }),

  makeRoute({
    id: "little-north-fork-coeur-dalene-laverne-mouth",
    riverId: "little-north-fork-coeur-dalene-idaho",
    name: "Little North Fork Coeur d'Alene River",
    reach: "Laverne Creek to Coeur d'Alene River",
    region: "North Idaho / Coeur d'Alene National Forest",
    routeType: "whitewater",
    summary:
      "A 21.1-mile Class II-III Little North Fork Coeur d'Alene reach from Laverne Creek to the main Coeur d'Alene River, with Forest Service road/campground logistics, low-water scraping, wood, and private-bank controls.",
    statusText:
      "Threshold-documented planning route. American Whitewater correlates this reach to downstream USGS 12413000 at 2,000-20,000 cfs and identifies the Laverne Creek and main-river access anchors. The Forest Service corridor guide documents nearby Bumblebee/Honeysuckle campground and bridge logistics but warns that Honeysuckle has no developed river access; verify the actual carry and legal landing before launch.",
    distance: "About 21.1 river miles",
    time: "About 6-9 hours plus a remote forest-road shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "private_banks", "access_uncertain"],
    safety: [
      "American Whitewater rates the reach Class II-III and correlates a broad 2,000-20,000 cfs window. Treat the number as downstream proxy context; inspect actual channel depth, wood, bridge clearance, and weather before committing to this long reach.",
      "The Forest Service corridor guide identifies Bumblebee and Honeysuckle campground logistics, but Honeysuckle is not a developed river launch. Carry boats only from a verified lawful access area and do not substitute campground shoreline or private frontage without permission.",
      "Low-water scraping, brush, strainers, cold water, and a long shuttle can turn a nominally moderate float into a remote self-rescue problem. Carry repair/rescue gear, communication, and a conservative turnaround plan.",
    ],
    gauge: "12413000",
    gaugeName: "North Fork Coeur d'Alene River at Enaville, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2000, idealMin: 2000, idealMax: 20000, tooHigh: 20000 },
    thresholdLabel: "American Whitewater downstream-proxy correlation: 2,000-20,000 cfs on USGS 12413000",
    thresholdUrl: littleNorthForkCdaAwReach,
    thresholdSupportUrl: littleNorthForkCdaGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: littleNorthForkCdaAwReach,
    sourceLabel: "American Whitewater Little North Fork Coeur d'Alene Laverne Creek-to-mouth reach record",
    mapUrl: littleNorthForkCdaMap,
    additionalSourceLinks: [
      { label: "American Whitewater Little North Fork map/access record", url: littleNorthForkCdaMap },
      { label: "USGS 12413000 North Fork Coeur d'Alene downstream proxy", url: littleNorthForkCdaGauge },
      { label: "Coeur d'Alene River Corridor Forest Service guide", url: northForkCdaForestServiceGuide },
      { label: "Idaho Fish and Game Little North Fork water record", url: littleNorthForkCdaIdfgWater },
    ],
    putIn: {
      name: "Laverne Creek access",
      latitude: 47.7063903808594,
      longitude: -116.376670837402,
      mileFromStart: 0,
      note: "American Whitewater's access-area anchor near Laverne Creek. Confirm Forest Service road condition, legal parking, and a river-side carry; no developed ramp is assumed.",
    },
    takeOut: {
      name: "Coeur d'Alene River confluence access",
      latitude: 47.5572204589844,
      longitude: -116.254997253418,
      mileFromStart: 21.1,
      note: "American Whitewater's lower access anchor near the main Coeur d'Alene River. Confirm the exact landing, downstream-current conditions, parking, and private-bank boundaries.",
    },
    camping:
      "Nearby Forest Service basecamp options include Bumblebee and Honeysuckle, but Honeysuckle has no developed river access. No on-route camping or campground landing is assumed; use only lawful designated sites.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Remote forest-road shuttle using the Coeur d'Alene River corridor and Little North Fork roads. Verify seasonal gates, mud/snow, bridge access, and vehicle recovery before committing.",
    permits:
      "Follow Idaho boating/AIS/PFD rules, Forest Service campground and road rules, posted private-property restrictions, fire limits, and current closure notices.",
    watchFor: ["low-water scraping", "brush and wood", "cold water", "campground carry", "private frontage", "seasonal roads", "long shuttle"],
    season: [5, 6, 7, 8],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho river corridor context photograph; not a Laverne Creek endpoint image",
  }),

  makeRoute({
    id: "boulder-creek-gorge",
    riverId: "boulder-creek-idaho",
    name: "Boulder Creek",
    reach: "Upper access to Kootenai River (Gorge)",
    region: "North Idaho / Boundary County / Kootenai corridor",
    routeType: "whitewater",
    summary:
      "A 5.5-mile Class IV-V Boulder Creek run with Red Lobster, Grunge Poser, a mandatory gravel-bar portage around an unrunnable gorge, and Magnolia Falls before the Kootenai confluence.",
    statusText:
      "Threshold-documented planning expedition. American Whitewater correlates the reach to the Yaak River near Troy gauge at 600-2,500 cfs, with roughly 1,000-1,500 cfs described as medium flow; the local put-in staff gauge is the decisive check. AW names exact put-in and take-out access anchors but warns the Kootenai confluence has no obvious public access and requires an exploratory shuttle plan.",
    distance: "About 5.5 river miles",
    time: "About 4-8 hours plus scouting, portage, and an exceptionally long shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "fast_rise",
      "access_uncertain",
      "mandatory_takeout",
    ],
    safety: [
      "American Whitewater describes Class IV-V rapids, Red Lobster, Grunge Poser, Magnolia Falls, wood, and committing canyon features. Use a proven expert creek team, full rescue kit, cold-water protection, and a portage plan for every blind horizon line.",
      "The route has one mandatory gravel-bar exit before the vertical-walled unrunnable gorge. Do not pass that eddy; the documented portage follows a low saddle and reconnects above Magnolia Falls. Scout the portage before entering the gorge.",
      "The Yaak gauge is a cross-border proxy. AW correlates 600-2,500 cfs and describes roughly 1,000-1,500 cfs as medium, while the local put-in gauge at about 3.6 ft is low. Inspect local stage, wood, falls, weather, and same-day trend rather than launching from the proxy number alone.",
      "AW warns that there is no obvious public Kootenai access near the confluence and that the shuttle around the river is extremely long. Confirm the take-out, Leonia-area seasonal access, legal parking, and an evacuation plan before committing.",
    ],
    gauge: "12304500",
    gaugeName: "Yaak River near Troy, MT (proxy for Boulder Creek)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1000, idealMax: 1500, tooHigh: 2500 },
    thresholdLabel:
      "American Whitewater Yaak proxy correlation: 600-2,500 cfs runnable shoulder; roughly 1,000-1,500 cfs medium-flow context, with a local 3.6-ft put-in staff-gauge cue",
    thresholdUrl: boulderCreekAwReach,
    thresholdSupportUrl: boulderCreekGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: boulderCreekAwReach,
    sourceLabel: "American Whitewater Boulder Creek Gorge reach record",
    mapUrl: boulderCreekMap,
    additionalSourceLinks: [
      { label: "American Whitewater Boulder Creek access map", url: boulderCreekMap },
      { label: "American Whitewater Boulder Creek put-in access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/110177" },
      { label: "American Whitewater Boulder Creek take-out access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/115441" },
      { label: "USGS Yaak River near Troy proxy gauge", url: boulderCreekGauge },
      { label: "Idaho Fish and Game Boulder Creek water record", url: boulderCreekIdfgWater },
      { label: "Idaho Fish and Game Leonia Kootenai access site", url: boulderCreekLeoniaAccess },
      { label: "Kootenai National Forest access context", url: boulderCreekForestContext },
    ],
    putIn: {
      name: "Boulder Creek Put-In Access",
      latitude: 48.58652,
      longitude: -116.146907,
      mileFromStart: 0,
      note: "American Whitewater access-area anchor 0.05 miles from the reach start. Approach from Troy or Bonners Ferry only after confirming the road, local staff-gauge reading, parking, and a safe carry.",
    },
    takeOut: {
      name: "Boulder Creek / Kootenai Confluence Take-Out",
      latitude: 48.625465,
      longitude: -116.066503,
      mileFromStart: 5.5,
      note: "American Whitewater access-area anchor 5.36 miles downstream. AW says no obvious public Kootenai access exists near the confluence; verify the landing and use a separately confirmed downstream Leonia access only if the planned shuttle and seasonal opening support it.",
    },
    camping:
      "No on-route camping is claimed. Use a separately verified Boundary County, Kootenai National Forest, or Kootenai corridor basecamp; do not camp at the gravel-bar portage or confluence without current landowner and fire-rule confirmation.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "The shuttle is unusually long around the Kootenai River. AW describes Leonia Road and an ATV-oriented road system near the confluence; stage vehicles only at verified public sites, consider the seasonal Leonia access window, and carry recovery/communication gear.",
    permits:
      "Follow Idaho boating/AIS/PFD rules, Kootenai and Idaho Panhandle road and fire restrictions, posted private-property signs, and any Montana/Idaho access-site closures. No right to use an informal bank or ATV road is implied.",
    watchFor: [
      "Red Lobster and Grunge Poser",
      "mandatory gravel-bar portage before unrunnable gorge",
      "Magnolia Falls and seal-launch/rappel consequences",
      "mobile wood",
      "local 3.6-ft staff-gauge cue",
      "no obvious public confluence access",
      "extremely long shuttle",
    ],
    season: [5, 6, 7],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho Panhandle river context photograph; not a Boulder Creek endpoint image",
  }),
  makeRoute({
    id: "smith-creek-upper",
    riverId: "smith-creek-idaho",
    name: "Smith Creek",
    reach: "Upper Smith Creek",
    region: "North Idaho / Boundary County / Selkirk Mountains",
    routeType: "whitewater",
    summary:
      "A 3.6-mile Class III-IV+(V) Upper Smith Creek reach from the diversion-area access to the lower bridge, with clean bedrock rapids, small cascades, and a local staff-gauge cue.",
    statusText:
      "Threshold-documented planning route. American Whitewater reports a 6.4-foot staff-gauge reading as a low, friendly Upper Smith flow and 8.1 feet as a moderate reading; the same report associates 6.4 feet with roughly 75-80 cfs below the diversion. Boundary Creek 12321500 is regional proxy context only, and the hydro diversion can remove much of the available water.",
    distance: "About 3.6 river miles",
    time: "About 2-4 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates Upper Smith III-IV+(V) and describes a slow start that builds into clean bedrock rapids and small cascades. Use a proven creek boat, helmet, PFD, throw bags, and a team capable of self-rescue in cold water.",
      "Call the Smith Creek diversion at (208) 267-2744 and inspect the local staff gauge below the diversion. The Boundary Creek online gauge is one drainage north and cannot replace the local release/stage check.",
      "The reach has a major drop near the lower half, an undercut left bank, and changing hydro operations. Confirm Forest Service road access, bridge parking, private-bank boundaries, and wood immediately before launch.",
    ],
    gauge: "12321500",
    gaugeName: "Boundary Creek near Porthill, ID (regional proxy for Upper Smith)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 75, idealMin: 75, idealMax: 80 },
    thresholdLabel: "Upper Smith local staff gauge: 6.4 ft is low/friendly and correlated to about 75-80 cfs below diversion; 8.1 ft is moderate",
    thresholdUrl: smithUpperThreshold,
    thresholdSupportUrl: smithCreekFlowProject,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: smithUpperThreshold,
    sourceLabel: "American Whitewater Upper Smith Creek reach record",
    mapUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/10542/map",
    additionalSourceLinks: [
      { label: "American Whitewater Upper Smith Creek put-in access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/109732" },
      { label: "American Whitewater Upper Smith Creek take-out access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/114984" },
      { label: "American Whitewater Smith Creek flow-management project", url: smithCreekFlowProject },
      { label: "USGS Boundary Creek regional proxy gauge", url: smithCreekGauge },
      { label: "Idaho Fish and Game Smith Creek water record", url: smithCreekIdfg },
      { label: "Idaho Panhandle Smith Ridge trail/road context", url: "https://www.fs.usda.gov/r01/idahopanhandle/recreation/smith-ridge-cut-peak-trail-18" },
    ],
    putIn: {
      name: "Upper Smith Creek Diversion Access",
      latitude: 48.889992,
      longitude: -116.699105,
      mileFromStart: 0,
      note: "American Whitewater access point below the hydro diversion; call the operator, inspect the staff gauge, and verify Forest Service road parking and legal carry before launching.",
    },
    takeOut: {
      name: "Upper Smith Creek Lower Bridge",
      latitude: 48.928094,
      longitude: -116.660663,
      mileFromStart: 3.63,
      note: "American Whitewater lower bridge endpoint; confirm river-side landing, bridge parking, and current road/closure conditions rather than assuming a developed ramp.",
    },
    camping:
      "No developed Smith Creek endpoint campground is assumed. Use a separately verified legal Kaniksu/Boundary County basecamp and follow fire, wildlife, and seasonal closure rules.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short Forest Service-road shuttle between the diversion access and lower bridge, but road conditions and gates can change quickly. Stage the lower bridge first and carry satellite communication.",
    permits:
      "Follow Idaho Panhandle National Forest rules, Idaho AIS/PFD requirements, fire and road closures, hydro-facility restrictions, and private-bank boundaries.",
    watchFor: ["6.4-ft local staff-gauge cue", "hydro diversion changes", "large lower-half drop", "undercut left bank", "cold water", "bridge parking and landing"],
    season: [4, 5, 6, 7],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho Panhandle river context photograph; not an Upper Smith endpoint image",
  }),

  makeRoute({
    id: "snake-river-swan-falls-walters-ferry",
    riverId: "snake-river-birds-of-prey-idaho",
    name: "Snake River",
    reach: "Swan Falls Dam to Walters Ferry (Birds of Prey)",
    region: "Southwest Idaho / Morley Nelson Snake River Birds of Prey NCA",
    routeType: "recreational",
    summary:
      "A 16.3-mile Class I(II) desert-canyon float from the developed Swan Falls launch to the Walters Ferry boat ramp, with two Class II rapids and strong raptor-viewing value.",
    statusText:
      "Threshold-documented planning route. American Whitewater and BLM describe a year-round float with seasonal flows roughly 3,000-40,000 cfs, but Swan Falls operations can change discharge quickly and the route has no fixed recreational optimum; use the direct below-Swan-Falls gauge as a conservative planning reference only.",
    distance: "About 16.3 river miles",
    time: "About 4-7 hours plus shuttle, wind, and wildlife-viewing stops",
    difficulty: "easy",
    risk: "caution",
    hazards: ["cold_water", "wind", "dam", "whitewater", "remote", "access_uncertain"],
    safety: [
      "The BLM describes two Class II rapids between Swan Falls and Celebration Park; this is not a beginner-only flatwater trip. Wear a PFD, carry a communication plan, and stay clear of the dam and all posted exclusion zones.",
      "Swan Falls operations create short-term flow fluctuations. Check the direct 13172500/Idaho Power below-Swan-Falls record, weather and wind, and current dam notices immediately before launching.",
      "The route passes through the Morley Nelson Snake River Birds of Prey NCA. Keep distance from nesting cliffs and wildlife, use only developed public launches, and avoid private-bank landings.",
    ],
    gauge: "13172500",
    gaugeName: "Snake River below Swan Falls Dam near Murphy, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 3000 },
    thresholdLabel: "AW/BLM seasonal operating cue: about 3,000 cfs winter flow to 40,000 cfs spring flow; no fixed optimum published",
    thresholdUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/10374/main",
    thresholdSupportUrl: "https://www.blm.gov/visit/swan-falls-picnic-area",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/10374/main",
    sourceLabel: "American Whitewater Swan Falls Dam to Walters Ferry reach record",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13172500/",
    additionalSourceLinks: [
      { label: "BLM Swan Falls Picnic Area launch and boating guidance", url: "https://www.blm.gov/visit/swan-falls-picnic-area" },
      { label: "BLM Morley Nelson Snake River Birds of Prey visitor guide", url: "https://www.blm.gov/sites/default/files/documents/files/Morley%20Nelson%20Visitor%20Guide.pdf" },
      { label: "Idaho Fish and Game Walters Ferry boat ramp", url: "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22295-fishing-and-boating-access-site-walters" },
      { label: "Canyon County public access coordinates", url: "https://www.canyoncounty.id.gov/celebration-park-boat-ramp-area-will-be-closed-august-31-2026-november-2026/" },
      { label: "USGS below-Swan-Falls gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13172500/" },
    ],
    putIn: {
      name: "Swan Falls Dam River Access",
      latitude: 43.245993,
      longitude: -116.378029,
      mileFromStart: 0,
      note: "Developed BLM/Idaho Power launch below Swan Falls Dam; confirm current dam exclusion, parking, and seasonal notices before carrying boats to the river.",
    },
    takeOut: {
      name: "Walters Ferry Boat Ramp",
      latitude: 43.341475,
      longitude: -116.603309,
      mileFromStart: 16.3,
      note: "Idaho Fish and Game day-use ramp with dock and restroom; verify current access and any construction or seasonal restrictions.",
    },
    camping:
      "Swan Falls has nearby free camping areas, but the park itself is day-use only. Walters Ferry is day-use; use lawful BLM/NCA campsites or a Boise/Melba-area basecamp and follow fire and wildlife rules.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "One-way shuttle from Walters Ferry back to Swan Falls is required. Allow extra time for the long canyon road approach, wind, and a slow final reach below Celebration Park.",
    permits:
      "Follow BLM Morley Nelson NCA and Swan Falls site rules, Idaho AIS/PFD requirements, wildlife-closure notices, fire restrictions, and posted dam/private-bank restrictions.",
    watchFor: ["Swan Falls dam exclusion", "two Class II rapids", "wind and heat", "raptor nesting cliffs", "changing dam releases", "Walters Ferry ramp conditions"],
    season: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    imageUrl: snakeImage,
    imageLabel: "Snake River canyon context photograph",
  }),

  makeRoute({
    id: "little-north-fork-clearwater-headwaters-reservoir",
    riverId: "clearwater-little-north-fork-idaho",
    name: "Little North Fork Clearwater River",
    reach: "Headwaters to Dworshak Reservoir",
    region: "North Idaho / Clearwater backcountry",
    routeType: "whitewater",
    summary:
      "A 30.3-mile remote Class II-IV(V) expedition from the Little North Fork campground and bridge corridor to the Dworshak Reservoir backwaters.",
    statusText:
      "Planning-only remote expedition. American Whitewater publishes the named reach, an estimated local gauge, and a 600 cfs bridge-start cue; Riverfacts provides exact put-in/take-out coordinates and North Idaho Rivers documents the unusually complex shuttle, primitive roads, portages, and roadless lower canyon.",
    distance: "About 30.3 river miles across a multi-day backcountry run",
    time: "Two to four days including the long shuttle, portages, scouting, and recovery margin",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the reach Class II-IV(V) and warns that the lower canyon culminates in Bodybag Rapid and other Class IV/V drops; portage wood and scout every blind ledge or constriction.",
      "American Whitewater's reach description says the two bridge starts become available above 600 cfs on the estimated Little North Fork gauge. Treat this as a minimum planning cue only: 2007 reports describe 2,600-3,100 cfs as runnable in the canyon but with multiple wood portages above Canyon Creek.",
      "North Idaho Rivers describes one of Idaho's most complicated shuttles, primitive and sometimes unsigned roads, a roadless lower canyon, limited communications, and scarce take-out camping. Carry maps, satellite communication, repair/portage gear, and a conservative evacuation plan.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID (proxy for Little North Fork)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 600, idealMin: 600 },
    thresholdLabel: "American Whitewater reach cue: bridge starts above 600 cfs on the estimated Little North Fork gauge; trip reports add 2,600-3,100 cfs canyon context",
    thresholdUrl: littleNorthForkAw,
    thresholdSupportUrl: littleNorthForkReports,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: littleNorthForkAw,
    sourceLabel: "American Whitewater Little North Fork Clearwater reach record",
    mapUrl: littleNorthForkMap,
    additionalSourceLinks: [
      { label: "American Whitewater Little North Fork trip reports", url: littleNorthForkReports },
      { label: "Riverfacts exact endpoint map", url: littleNorthForkMap },
      { label: "North Idaho Rivers shuttle and route notes", url: littleNorthForkLocal },
      { label: "Little North Fork Campground context", url: littleNorthForkCampground },
      { label: "Idaho Fish and Game North Fork access site", url: littleNorthForkFishAccess },
      { label: "USGS North Fork Clearwater proxy gauge", url: littleNorthForkGauge },
    ],
    putIn: {
      name: "Little North Fork Campground / upper bridge",
      latitude: 47.06547,
      longitude: -115.84813,
      mileFromStart: 0,
      note: "Riverfacts/AW upper bridge and Little North Fork Campground corridor; verify Forest Service road 301 opening, parking, bridge carry, and current campground access.",
    },
    takeOut: {
      name: "Little North Fork Reservoir backwaters take-out",
      latitude: 46.90233,
      longitude: -115.84746,
      mileFromStart: 30.3,
      note: "Riverfacts take-out coordinate above the Dworshak Reservoir backwaters; confirm the current trail/landing and reservoir level before committing to the lower canyon.",
    },
    camping:
      "Primitive and dispersed camping is described near the upper bridge and lower take-out, but no guaranteed itinerary is implied. Use only current Forest Service sites, pack out waste, and verify fire restrictions and seasonal road access.",
    campingClassification: "on_route_campsite",
    shuttle:
      "North Idaho Rivers describes an exceptionally long, complicated shuttle via Avery, Fishhook Creek, Hobo Pass, and the 1268 Bridge corridor. Do not rely on consumer turn-by-turn directions; carry Forest Service maps, keep vehicles together, and budget weather/road delays.",
    permits:
      "No route-specific river permit was confirmed. Follow Nez Perce-Clearwater National Forest road, campground, fire, wilderness, AIS/PFD, and group-size rules; verify any seasonal closure or access permit before departure.",
    watchFor: ["600 cfs bridge-start floor", "wood portages above Canyon Creek", "Bodybag Rapid and Class IV/V canyon drops", "primitive road 301 / 1268 shuttle", "reservoir backwater take-out and rescue delay"],
    season: [5, 6, 7, 8, 9],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph",
  }),

  makeRoute({
    id: "slate-creek-franklin-mine-st-joe",
    riverId: "slate-creek-idaho",
    name: "Slate Creek",
    reach: "Franklin Mine to St. Joe Confluence",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "whitewater",
    summary:
      "A remote 7.9-mile Class IV-V Slate Creek creek-run from the Franklin Mine primitive campground corridor to the St. Joe confluence.",
    statusText:
      "Threshold-documented planning route. North Idaho Rivers calls for at least about 4,000 cfs on the downstream St. Joe at Calder, while American Whitewater records the named Old Miner's Cabin-to-confluence reach and its IV-V consequences; the Calder reading is only proxy context for Slate.",
    distance: "About 7.9 river miles",
    time: "About 3-6 hours plus scouting and a long shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "North Idaho Rivers describes a steep, narrow canyon with unavoidable holes at higher flows, limited exit options, and Class V Horseshoe Falls/Triple Drop features. This is for an expert creek team with a proven plan, rescue kit, and satellite communication.",
      "Logs are always a serious hazard and many drops cannot be seen from the boat. Scout or portage every blind horizon line; after the first major slide, hiking out becomes nearly impossible in the canyon.",
      "Use 4,000 cfs on the Calder gauge only as a coarse proxy cue. The local painted gauge can be falsely elevated by St. Joe backwater, and the local Slate response, wood, snow, road opening, and same-day beta control the decision.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 4000, idealMin: 4000 },
    thresholdLabel: "North Idaho Rivers Slate Creek cue: at least about 4,000 cfs on downstream Calder proxy; local painted gauge may be backwater-biased",
    thresholdUrl: slateCreekGuide,
    thresholdSupportUrl: slateCreekAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: slateCreekGuide,
    sourceLabel: "North Idaho Rivers Slate Creek guide",
    mapUrl: "https://www.fs.usda.gov/sites/nfs/files/r01/idahopanhandle/publication/SJRD%20MVUM%20Back%202021.pdf",
    additionalSourceLinks: [
      { label: "American Whitewater Slate Creek reach record", url: slateCreekAw },
      { label: "Franklin Mine locality / campground-area context", url: slateCreekFranklinMine },
      { label: "Slate Creek–St. Joe confluence map context", url: slateCreekConfluence },
      { label: "USGS St. Joe at Calder monitoring location", url: "https://waterdata.usgs.gov/monitoring-location/USGS-12414500/" },
    ],
    putIn: {
      name: "Franklin Mine primitive campground / Old Miner's Cabin",
      latitude: 47.30237,
      longitude: -115.92992,
      mileFromStart: 0,
      note: "Named Franklin Mine locality and primitive campground/beach put-in; high-clearance or 4WD and current Road 225 access confirmation required.",
    },
    takeOut: {
      name: "Slate Creek Bridge / St. Joe Confluence",
      latitude: 47.25639,
      longitude: -115.93722,
      mileFromStart: 7.9,
      note: "Approximate Slate Creek bridge/confluence anchor from public river mapping; verify the exact landing, parking, and bridge-side carry before committing to the canyon.",
    },
    camping:
      "The Franklin Mine primitive campground is the named upper endpoint; other St. Joe corridor camps are staging options, but verify seasonal openings, road conditions, fire rules, and sanitation.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Road 225 climbs from the Avery Ranger Station to the Franklin Mine corridor, while St. Joe River Road serves the Slate Creek bridge take-out; check Moon Pass/seasonal road openings and allow a long, rough shuttle.",
    permits:
      "Follow Idaho Panhandle National Forest rules, Wild and Scenic River corridor requirements, fire restrictions, invasive-species/PFD requirements, and current Road 225/St. Joe River Road closures. No private-bank shortcut is assumed.",
    watchFor: ["Class V Horseshoe Falls and Triple Drop", "blind ledges and mobile wood", "near-impossible canyon exits", "painted-gauge backwater bias", "seasonal high-clearance road access"],
    season: [4, 5, 6],
    imageUrl: stJoeImage,
    imageLabel: "St. Joe watershed context photograph; Slate Creek endpoint not depicted",
  }),
  makeRoute({
    id: "marble-creek-camp-3-st-joe",
    riverId: "marble-creek-idaho",
    name: "Marble Creek",
    reach: "Camp 3 to St. Joe Confluence",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "whitewater",
    summary:
      "A 13.9-mile Class III-IV Marble Creek run from the Camp 3/Forest Road 321 corridor to the Marble Creek interpretive center at the St. Joe confluence.",
    statusText:
      "Threshold-documented planning route. North Idaho Rivers recommends roughly 3,500 cfs minimum and looking for about 4,000 cfs on the St. Joe at Calder; that gauge is a downstream proxy for this steep tributary, so the live score remains disabled.",
    distance: "About 13.9 river miles",
    time: "About 4-7 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater and North Idaho Rivers describe continuous Class III+ with standout Class IV drops, long swims, and sparse eddies. Use a proven creeking boat, helmet, rescue kit, and a tight group.",
      "Logs are a serious, shifting hazard on the full creek. Road 321 allows partial scouting, but blind corners and channels still require getting out to inspect; portage only where the Forest Service corridor and terrain make it safe.",
      "The 3,500-4,000 cfs Calder cues are downstream proxy guidance. The local confluence hand gauge is difficult to interpret after channel scour; current wood, weather, road opening, and same-day trend override the number.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 3500, idealMin: 4000 },
    thresholdLabel: "North Idaho Rivers Marble Creek cue: about 3,500 cfs minimum and look for around 4,000 cfs on downstream Calder proxy",
    thresholdUrl: marbleCreekGuide,
    thresholdSupportUrl: marbleCreekAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: marbleCreekGuide,
    sourceLabel: "North Idaho Rivers Marble Creek guide",
    mapUrl: "https://www.fs.usda.gov/sites/nfs/files/r01/idahopanhandle/publication/SJRD%20MVUM%20Back%202021.pdf",
    additionalSourceLinks: [
      { label: "American Whitewater Marble Creek reach record", url: marbleCreekAw },
      { label: "Camp 3 Forest Service campground access context", url: marbleCreekCamp3Map },
      { label: "Marble Creek interpretive center / confluence anchor", url: marbleCreekMouthAnchor },
      { label: "USGS Calder monitoring location", url: "https://waterdata.usgs.gov/monitoring-location/USGS-12414500/" },
    ],
    putIn: {
      name: "Camp 3 Campground / Forest Road 321 Launch",
      latitude: 47.129923,
      longitude: -116.102858,
      mileFromStart: 0,
      note: "Camp 3 is a named Forest Service campground and the upper endpoint of the American Whitewater reach; confirm the exact river carry from the campground/road and current seasonal gate status.",
    },
    takeOut: {
      name: "Marble Creek Interpretive Center Take-Out",
      latitude: 47.2501751,
      longitude: -116.0225783,
      mileFromStart: 13.9,
      note: "Approximate public interpretive-site/confluence anchor; the landing is at the St. Joe confluence area, not a surveyed ramp. Keep the historic-site parking and picnic access clear.",
    },
    camping:
      "Camp 3, Marble Creek Campground, and other named Forest Service sites along Road 321 provide nearby basecamp options; verify seasonal openings, fees, sanitation, fire rules, and road conditions.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Forest Road 321 and St. Joe River Road form a long, rough, seasonal shuttle. Stage the confluence vehicle first, allow extra time for snow/mud and one-lane pullouts, and carry satellite communication.",
    permits:
      "Follow Idaho Panhandle National Forest rules, Wild and Scenic River corridor requirements, fire restrictions, invasive-species/PFD requirements, and current Forest Road 321/50 closures. No private-bank shortcut is assumed.",
    watchFor: ["mobile wood and blind Class IV drops", "sparse eddies and long swims", "seasonal Road 321 access", "hand-gauge scour and downstream Calder proxy"],
    season: [4, 5, 6],
    imageUrl: stJoeImage,
    imageLabel: "St. Joe watershed context photograph; Marble Creek endpoint not depicted",
  }),

  makeRoute({
    id: "st-joe-river-skookum-canyon",
    riverId: "st-joe-river-idaho",
    name: "St. Joe River",
    reach: "Turner Flat Campground to Packsaddle Campground (Skookum Canyon)",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "whitewater",
    summary:
      "A 4.6-mile Class III+ access-to-access run from Turner Flat through the Skookum Canyon rapid chain to Packsaddle Campground.",
    statusText:
      "Planning-only threshold route. American Whitewater identifies Turner Flat/Bird Creek and Packsaddle as the access pair and describes a short Class III+ canyon section; Kayak Idaho lists a 500-1,500 cfs Skookum Canyon band on the Calder gauge. Low-water character, wood, scouting, and campground status still control the go/no-go decision.",
    distance: "About 4.6 river miles",
    time: "About 1-2 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "access_uncertain", "mandatory_takeout"],
    safety: [
      "The first two miles are relatively flat, then the obvious horizon line marks Skookum Canyon. American Whitewater describes the main drops as Class III and the action continuing for roughly a mile; scout from Highway 50 and carry a rescue plan.",
      "At low flows the reach becomes closer to Class II, but that does not remove wood, cold-water, or entrapment hazards. Do not enter the canyon without an experienced whitewater group and a verified take-out plan.",
      "Use 500-1,500 cfs as a conservative planning band from the local Panhandle flow table. The Calder gauge is downstream context rather than a surveyed reach gauge, so local trend, visual level, wood, and road conditions override the numeric cue.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream context)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 500, idealMax: 1500, tooHigh: 1500 },
    thresholdLabel: "Kayak Idaho Skookum Canyon planning band: 500-1,500 cfs on the Calder gauge; lower flows become more Class II",
    thresholdUrl: stJoeSkookumFlow,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-12414500/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: stJoeSkookumReach,
    sourceLabel: "American Whitewater Skookum Canyon reach and access record",
    mapUrl: stJoeSkookumReach,
    additionalSourceLinks: [
      { label: "Kayak Idaho Panhandle flow table", url: stJoeSkookumFlow },
      { label: "USFS St. Joe Wild and Scenic River plan", url: stJoePlan },
      { label: "USGS St. Joe River at Calder gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-12414500/" },
      { label: "Packsaddle Campground map and access anchor", url: "https://mapcarta.com/23551868" },
      { label: "American Whitewater Turner Flat access record", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/110765" },
    ],
    putIn: {
      name: "Turner Flat Campground / Bird Creek Boat Launch",
      latitude: 47.23687,
      longitude: -115.65625,
      mileFromStart: 0,
      note: "Forest Service campground and documented American Whitewater river access; use the signed launch or Trail 17 bridge alternative only when open and lawful.",
    },
    takeOut: {
      name: "Packsaddle Campground River Access",
      latitude: 47.23187,
      longitude: -115.72932,
      mileFromStart: 4.6,
      note: "Forest Service campground with a designated river launch downstream of the first site; the coordinate is a campground/access anchor, so confirm the current carry, parking, and seasonal opening.",
    },
    camping:
      "Turner Flat and Packsaddle are Forest Service endpoint campgrounds. Reserve or confirm seasonal openings, water, toilets, fees, and fire restrictions; no on-route wilderness camping is assumed.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Highway 50 parallels the full run and makes a short paved-road shuttle practical. Stage at Packsaddle before launching and keep vehicles clear of campground loops and highway shoulders.",
    permits:
      "Follow Idaho Panhandle National Forest campground and Wild and Scenic River rules, Idaho AIS/PFD requirements, fire restrictions, and any current Highway 50 or forest-road closures.",
    watchFor: ["Skookum Canyon horizon line", "Class III-IV drops", "wood and cold water", "campground access status", "mandatory Packsaddle take-out"],
    season: [5, 6, 7, 8],
    imageUrl: stJoeImage,
    imageLabel: "USFS St. Joe River same-river context photograph",
  }),

  makeRoute({
    id: "mores-creek-big-gulch-robie",
    riverId: "mores-creek-idaho",
    name: "Mores Creek",
    reach: "Big Gulch to Robie Creek",
    region: "Southwest Idaho / Boise County",
    routeType: "whitewater",
    summary:
      "A roughly 13-15.7-mile spring Class II-III roadside run on Mores Creek east of Boise.",
    statusText:
      "Planning-only direct-gauge route. American Whitewater describes a mostly roadside Class II-III run with approximate access points; the local flow table gives a 600 cfs low-flow floor and 1,000 cfs optimum. Highway shoulders, bridge cables, private frontage, and seasonal wood require scouting before launch.",
    distance: "About 13-15.7 river miles",
    time: "About 4-7 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "strainers",
      "low_water",
      "private_banks",
      "access_uncertain",
      "fast_rise",
    ],
    safety: [
      "American Whitewater describes mostly roadside read-and-run Class II-III water but warns about strainers, bridge cables, rope lines, and a spring-only window. Scout every man-made obstruction from legal roadside pullouts and portage on public land only.",
      "Use 600 cfs as the conservative low-flow floor and about 1,000 cfs as the local optimum reference. The gauge is on Mores Creek, but current wood, bridge clearance, private-bank constraints, and rapidly changing spring runoff override any numeric cue.",
      "Idaho Fish and Game identifies Highway 21 pullouts rather than a developed boat ramp; confirm the exact Big Gulch start, Robie Creek exit, parking, and carry before publishing or launching.",
    ],
    gauge: "13200000",
    gaugeName: "Mores Creek above Robie Creek near Arrowrock Dam, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 600, idealMin: 600, idealMax: 1000 },
    thresholdLabel:
      "American Whitewater/WKCC Mores Creek guidance: 600 cfs low-flow floor and about 1,000 cfs optimum",
    thresholdUrl: moresThreshold,
    thresholdSupportUrl: moresFlowGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: moresThreshold,
    sourceLabel: "American Whitewater Mores Creek Big Gulch-to-Robie reach record",
    mapUrl: moresAccessGuide,
    additionalSourceLinks: [
      { label: "WKCC Mores Creek flow description", url: moresFlowGuide },
      { label: "Idaho Fish and Game Mores Creek access context", url: moresAccessGuide },
      { label: "USACE Mores Creek Park and Lucky Peak access context", url: moresParkGuide },
      { label: "USGS Mores Creek gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13200000/" },
      { label: "American Whitewater Mores Creek reach", url: moresThreshold },
    ],
    putIn: {
      name: "Big Gulch / Highway 21 roadside start",
      latitude: 43.77489,
      longitude: -115.90928,
      mileFromStart: 0,
      note: "American Whitewater identifies the Big Gulch/Grimes start but marks the access approximate. This coordinate is a roadside/landmark anchor, not a surveyed ramp; confirm legal parking and a safe carry to the creek.",
    },
    takeOut: {
      name: "Robie Creek / Mores Creek Park exit",
      latitude: 43.64805556,
      longitude: -115.9897222,
      mileFromStart: 13,
      note: "USACE identifies Mores Creek Park on the Robie Creek/Lucky Peak corridor. Treat this as a facility/road exit anchor and confirm that the intended river take-out remains open and reachable from the water.",
    },
    access: [
      {
        name: "Big Gulch / Highway 21 roadside start",
        latitude: 43.77489,
        longitude: -115.90928,
        mileFromStart: 0,
        note: "Approximate AW start and roadside staging anchor; not a guaranteed ramp.",
      },
      {
        name: "Robie Creek / Mores Creek Park exit",
        latitude: 43.64805556,
        longitude: -115.9897222,
        mileFromStart: 13,
        note: "USACE day-use/facility anchor near the route endpoint; verify river-side landing, parking, and current access rules.",
      },
    ],
    camping:
      "No on-route overnight is assumed. Mores Creek Park and other Lucky Peak facilities provide nearby basecamp context, but this is a spring day run; verify day-use and camping rules separately.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Highway 21 follows most of the corridor, but shoulders are narrow and busy. Stage the Robie Creek exit first, use only legal pullouts, and allow extra time for a long spring shuttle.",
    permits:
      "Follow Idaho boating/PFD and invasive-species requirements, USACE/BLM/Forest Service parking rules, fire notices, and private-property boundaries. Do not block Highway 21 or use an informal bank as automatic public access.",
    watchFor: [
      "bridge cables and low-clearance crossings",
      "river-wide strainers",
      "illegal rope lines and private frontage",
      "spring runoff rise",
      "uncertain Big Gulch and Robie Creek landing points",
    ],
    season: [4, 5],
    imageUrl: boiseImage,
    imageLabel: "Boise River basin context photograph; not a Mores Creek endpoint image",
  }),

  makeRoute({
    id: "potlatch-river-little-boulder-cedar",
    riverId: "potlatch-river-idaho",
    name: "Potlatch River",
    reach: "Little Boulder Campground to Cedar Creek",
    region: "North-Central Idaho / Latah-Nez Perce counties",
    routeType: "whitewater",
    summary:
      "A roughly 16-mile early-season Class IV-V canyon run from Little Boulder Campground to Cedar Creek.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater and North Idaho Rivers describe a technical canyon with Coleman Falls, logs, difficult mid-run exits, and an approximate local stick-gauge window; the downstream USGS gauge is over 30 miles away and does not correlate well to the put-in stick gauge.",
    distance: "About 16 river miles",
    time: "About 6-10 hours, with no easy bailout after the canyon commits",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "access_uncertain",
      "fast_rise",
      "private_banks",
    ],
    safety: [
      "North Idaho Rivers identifies Coleman Falls, multiple Class IV rapids, wood, and difficult unmarked mid-canyon exits. The upper 4.5-ft local stick-gauge level increases the run to Class IV+/V; do not substitute the downstream USGS cfs value for a local level check.",
      "American Whitewater trip reports describe enjoyable local conditions around 325-1,000 cfs at the Spalding gauge, while the guide warns that the old 1,000-8,000 cfs range is misleading. Retain 300 cfs as a conservative planning floor and 1,000 cfs as a rough upper planning cue only.",
      "The route commits to a remote canyon. Carry rescue equipment, cold-water protection, satellite communication, and a portage plan; confirm road and campground status after rain or snowmelt.",
    ],
    gauge: "13341570",
    gaugeName: "Potlatch River below Little Potlatch Creek near Spalding, ID",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 300, idealMin: 325, idealMax: 1000 },
    thresholdLabel:
      "American Whitewater/North Idaho Rivers local-level and Spalding-gauge context: roughly 300 cfs minimum planning cue, 325-1,000 cfs commonly reported, and higher local stage increases difficulty",
    thresholdUrl: potlatchThreshold,
    thresholdSupportUrl: potlatchGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: potlatchThreshold,
    sourceLabel: "American Whitewater Potlatch Little Boulder-to-Cedar reach record",
    mapUrl: potlatchMap,
    additionalSourceLinks: [
      { label: "North Idaho Rivers Potlatch guide and local stick-gauge notes", url: potlatchGuide },
      { label: "RiverFacts Potlatch access map", url: potlatchMap },
      { label: "Little Boulder Campground information", url: potlatchCampground },
      { label: "USGS Potlatch River below Little Potlatch Creek gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13341570/" },
      { label: "American Whitewater Potlatch reach", url: potlatchThreshold },
    ],
    putIn: {
      name: "Little Boulder Campground Put-In",
      latitude: 46.78333,
      longitude: -116.4564,
      mileFromStart: 0,
      note: "Forest Service campground/parking access identified by North Idaho Rivers and RiverFacts; confirm seasonal opening, carry path, and current road condition.",
    },
    takeOut: {
      name: "Cedar Creek Take-Out",
      latitude: 46.65499,
      longitude: -116.54917,
      mileFromStart: 16,
      note: "RiverFacts approximate Cedar Creek endpoint; North Idaho Rivers warns that lower access roads and unmarked mid-canyon trails can be muddy or 4WD-only. Confirm the lawful exit before committing.",
    },
    access: [
      {
        name: "Little Boulder Campground Put-In",
        latitude: 46.78333,
        longitude: -116.4564,
        mileFromStart: 0,
        note: "Named Forest Service campground/parking put-in; verify current seasonal status and carry.",
      },
      {
        name: "Cedar Creek Take-Out",
        latitude: 46.65499,
        longitude: -116.54917,
        mileFromStart: 16,
        note: "Approximate RiverFacts endpoint; current road, parking, and private-bank conditions require field confirmation.",
      },
    ],
    camping:
      "Little Boulder Campground is the practical endpoint basecamp at the put-in when open. No informal canyon camping or unmarked mid-run camp is assumed; use established sites and current Forest Service rules.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Stage the Cedar Creek vehicle first, then use Highway 8, Helmer, Forest Road 1963, and Cedar Ridge Road. The lower access roads can be slick and 4WD-sensitive after rain; plan a recovery day and do not rely on an unmarked ATV trail without current confirmation.",
    permits:
      "Follow Forest Service campground/road rules, Idaho AIS/PFD requirements, fire restrictions, private-bank boundaries, and all current closure notices. This record does not imply a right to use unmarked mid-canyon trails.",
    watchFor: [
      "Coleman Falls and Class IV/V lines",
      "wood and ice during early season",
      "unmarked mid-canyon exits",
      "muddy 4WD access roads",
      "cold water and remote rescue",
    ],
    season: [2, 3, 4],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater basin context photograph; not a Potlatch endpoint image",
  }),

  makeRoute({
    id: "little-potlatch-river-headwaters-potlatch",
    riverId: "potlatch-river-idaho",
    name: "Little Potlatch River",
    reach: "Headwaters to Potlatch River",
    region: "North-Central Idaho / Latah-Nez Perce counties",
    routeType: "whitewater",
    summary:
      "A roughly 7.5-mile Class IV-V Little Potlatch Creek descent through granite and basalt canyon to the Potlatch River.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater documents the IV-V headwaters reach, legal bridge access, private-bank/fence exposure, and a remote committing canyon. Local reports correlate a non-local Spalding gauge with a put-in stick gauge around 3.0-3.5 ft; treat the cfs values as planning cues, not a local safety guarantee.",
    distance: "About 7.5 river miles",
    time: "About 5-8 hours including scouting, portage, and a committing shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "fast_rise",
      "access_uncertain",
      "private_banks",
      "portage",
    ],
    safety: [
      "American Whitewater rates the reach Class IV-V and describes waterfalls, a sieve portage, basalt slot canyons, granite gorges, and a remote feel. Use an expert team with throw bags, pin/rescue equipment, cold-water protection, and a deliberate portage plan.",
      "American Whitewater trip reports and the Spokesman-Review describe a local stick-gauge target around 3.0-3.5 ft, with roughly 325-1,000 cfs at the downstream Spalding gauge in reported runs. The Spalding gauge is far downstream and correlation is blurry; verify the local stick gauge and inspect the actual channel before launch.",
      "The run crosses private property even though floating is described as legal under Idaho law. Expect fences, respect landowners, use only the named bridge access, and do not assume a bank landing or road pullout is public.",
    ],
    gauge: "13341570",
    gaugeName: "Potlatch River below Little Potlatch Creek near Spalding, ID (proxy for Little Potlatch)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 300, idealMin: 325, idealMax: 1000 },
    thresholdLabel:
      "Little Potlatch local-stick-gauge correlation: about 3.0-3.5 ft at the put-in and roughly 325-1,000 cfs on the downstream Spalding proxy; below about 2.8 ft is commonly reported as scrape-prone",
    thresholdUrl: littlePotlatchThreshold,
    thresholdSupportUrl: littlePotlatchFlowReport,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: littlePotlatchThreshold,
    sourceLabel: "American Whitewater Little Potlatch Headwaters-to-Potlatch reach record",
    mapUrl: littlePotlatchThreshold,
    additionalSourceLinks: [
      { label: "American Whitewater Little Potlatch reach", url: littlePotlatchThreshold },
      { label: "American Whitewater / FERC Little Potlatch access and conservation record", url: littlePotlatchEvidence },
      { label: "Spokesman-Review local stick-gauge and flow correlation report", url: littlePotlatchFlowReport },
      { label: "USGS Potlatch River below Little Potlatch Creek proxy gauge", url: littlePotlatchGauge },
      { label: "Idaho Transportation Department Little Potlatch Creek bridge milepoint record", url: "https://apps.itd.idaho.gov/apps/milepointlog/logs/dist/D2_FA_MPLog.pdf" },
      { label: "Little Potlatch Creek mapped stream location", url: "https://www.anyplaceamerica.com/directory/id/nez-perce-county-16069/streams/little-potlatch-creek-373664/" },
      { label: "American Whitewater Idaho river index", url: "https://www.americanwhitewater.org/content/River/view/river-index/state/USA-IDA" },
    ],
    putIn: {
      name: "Little Potlatch upstream bridge access (approximate)",
      latitude: 46.607925,
      longitude: -116.664561,
      mileFromStart: 0,
      note: "American Whitewater describes legal bridge access at the upstream end, but does not publish a dedicated ramp coordinate in the public reach text. Treat this as an approximate bridge/road anchor and confirm the current landing, parking, and private-frontage rules before launch.",
    },
    takeOut: {
      name: "Little Potlatch / Potlatch River bridge access (approximate)",
      latitude: 46.5235,
      longitude: -116.72987,
      mileFromStart: 7.5,
      note: "Mapcarta identifies the Little Potlatch stream near its lower end; American Whitewater describes legal downstream bridge access. Confirm the exact bridge, road approach, landing, and fence conditions immediately before committing.",
    },
    access: [
      {
        name: "Little Potlatch upstream bridge access (approximate)",
        latitude: 46.607925,
        longitude: -116.664561,
        mileFromStart: 0,
        note: "Approximate bridge anchor based on the AW legal-bridge description; field-verify parking and river-side carry.",
      },
      {
        name: "Little Potlatch / Potlatch River bridge access (approximate)",
        latitude: 46.5235,
        longitude: -116.72987,
        mileFromStart: 7.5,
        note: "Approximate lower stream/confluence anchor; do not infer a public ramp from the coordinate alone.",
      },
    ],
    camping:
      "No on-route camping is assumed. Use a legal basecamp near Moscow/Juliaetta or a confirmed private/agency site; the canyon and private frontage are not treated as dispersed camping opportunities.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage the downstream bridge first, then use county roads and current local directions to reach the upstream bridge. Allow extra time for private-road gates, snow/ice, and a difficult recovery if the lower landing is not usable.",
    permits:
      "No route-specific permit was confirmed. Follow Idaho AIS/PFD rules, current road and bridge closures, private-property boundaries, landowner requests, fire restrictions, and any local law-enforcement guidance on navigation and access.",
    watchFor: [
      "waterfalls and sieve portage",
      "fences near the lower run",
      "wood and cold early-season water",
      "private-bank access conflicts",
      "proxy-gauge mismatch",
      "approximate bridge landings",
    ],
    season: [1, 2, 3, 4],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not a Little Potlatch endpoint image",
  }),

  makeRoute({
    id: "big-bear-creek-highway-8-kendrick",
    riverId: "big-bear-creek-idaho",
    name: "Big Bear Creek",
    reach: "Highway 8 Bridge to Kendrick High School",
    region: "North-Central Idaho / Latah County",
    routeType: "whitewater",
    summary:
      "A 14.5-mile Class IV-V Big Bear Creek descent from the Highway 8 bridge west of Deary to the Kendrick High School endpoint.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater publishes an exact 1,000-2,600 cfs runnable correlation on the Potlatch gauge and exact access coordinates, while its 2006 description warns of barbed-wire fences, a major falls portage, wood, a steelhead weir, and a long cold full-day shuttle. Confirm both landings and every in-channel hazard immediately before launch.",
    distance: "14.5 river miles",
    time: "About 6-10 hours including scouting, portage, and a long shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "fast_rise",
      "access_uncertain",
      "portage",
    ],
    safety: [
      "American Whitewater rates the reach Class IV-V and describes nearly continuous rapids, a major falls portage, a dangerous river-wide fence, and mobile wood. Scout the entire corridor from the road where possible and never assume a fence or wire is visible from upstream.",
      "American Whitewater's live correlation for the Potlatch River below Little Potlatch Creek near Spalding is 1,000-2,600 cfs. This is a downstream proxy for Big Bear Creek; use it as a broad planning cue only and override it with a local visual inspection.",
      "American Whitewater reports Idaho Fish and Game steelhead weirs on Big Bear and Little Bear, typically February-June, including a Big Bear weir below the Little Bear Ridge Road bridge. Portage around any installed weir and do not disturb it.",
      "The run is cold, remote, and a full-day commitment with limited bailout options. Carry rescue and repair equipment, a conservative evacuation plan, and current road/bridge information; the Highway 8 bridge corridor may have active maintenance.",
    ],
    gauge: "13341570",
    gaugeName: "Potlatch River below Little Potlatch Creek near Spalding, ID (proxy for Big Bear Creek)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1000, idealMax: 2600, tooHigh: 2600 },
    thresholdLabel:
      "American Whitewater Big Bear correlation: 1,000-2,600 cfs on the Potlatch River below Little Potlatch Creek near Spalding proxy gauge",
    thresholdUrl: bigBearThreshold,
    thresholdSupportUrl: bigBearMap,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: bigBearThreshold,
    sourceLabel: "American Whitewater Big Bear Highway 8-to-Kendrick reach record",
    mapUrl: bigBearMap,
    additionalSourceLinks: [
      { label: "American Whitewater Big Bear reach and flow correlation", url: bigBearThreshold },
      { label: "RiverFacts Big Bear access map and endpoint coordinates", url: bigBearMap },
      { label: "USGS Potlatch River proxy gauge", url: bigBearGauge },
      { label: "Idaho Transportation Department Highway 8 bridge maintenance context", url: bigBearItdBridge },
      { label: "Idaho Fish and Game boating-access directory", url: "https://idfg.idaho.gov/visit/fish-boat-guide" },
    ],
    putIn: {
      name: "Highway 8 Bridge west of Deary",
      latitude: 46.783054,
      longitude: -116.596947,
      mileFromStart: 0,
      note: "American Whitewater access point 109795 at the Highway 8 bridge; the bridge is confirmed in the ITD corridor, but this is not a dedicated IDFG ramp. Verify legal parking, shoulder safety, and the current river-side carry.",
    },
    takeOut: {
      name: "Kendrick High School endpoint",
      latitude: 46.651668548584,
      longitude: -116.661666870117,
      mileFromStart: 14.5,
      note: "American Whitewater access point 115047 / RiverFacts endpoint. Treat the coordinate as a navigation anchor, not proof of a public ramp; confirm legal landing and parking before committing.",
    },
    camping:
      "No on-route camping is assumed. Use a separate legal basecamp in the Kendrick/Deary area and do not camp on agricultural or school frontage.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Long North-Central Idaho shuttle using Highway 8, county roads, and the Kendrick endpoint. Stage the endpoint first, use only legal pullouts, and check ITD/current local road work before launch.",
    permits:
      "No route-specific river permit was confirmed. Follow Idaho AIS/PFD requirements, all posted bridge and school-property rules, current road closures, private-land boundaries, and IDFG weir instructions.",
    watchFor: [
      "river-wide barbed-wire fence",
      "major falls and mandatory portage",
      "mobile wood and strainers",
      "seasonal IDFG steelhead weirs",
      "cold water and limited bailout",
      "downstream proxy-gauge mismatch",
      "uncertain legal endpoint landing",
    ],
    season: [2, 3, 4, 5, 6],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not a Big Bear endpoint image",
  }),

  makeRoute({
    id: "potlatch-river-frog-pond-kendrick",
    riverId: "potlatch-river-idaho",
    name: "Potlatch River",
    reach: "Frog Pond to Kendrick",
    region: "North-Central Idaho / Latah County",
    routeType: "whitewater",
    summary:
      "A 6.4-mile Class II-III lower Potlatch reach from Frog Pond to the Kendrick-area concrete bridge access.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater's 2023 reach record publishes a 700-8,000 cfs Potlatch proxy correlation, exact access coordinates, and several take-out options; North Idaho Rivers describes the local stick-gauge minimum, early-season window, and low-water scraping below roughly four feet. Confirm the intended bridge landing, private frontage, and current strainers before launch.",
    distance: "6.4 river miles",
    time: "About 3-5 hours including scouting and shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "low_water",
      "access_uncertain",
      "private_banks",
    ],
    safety: [
      "American Whitewater rates the reach Class II-III and describes a short lower section with the main rapids near the Frog Pond start, several take-out options, and a 2023 report of a bridge strainer. Scout the concrete bridge and any visible wood before committing downstream.",
      "American Whitewater's 700-8,000 cfs correlation uses the Potlatch River below Little Potlatch Creek near Spalding gauge. North Idaho Rivers says the local stick gauge is the controlling cue, with about 3.0 feet as a minimum and the lower miles becoming scrapy below about 4.0 feet; the online gauge is over 30 miles downstream and does not correlate well.",
      "The corridor follows county roads and residential/agricultural frontage. Use only the named access, keep boats and vehicles out of private yards, and confirm the concrete-bridge landing and parking before launch. A bicycle shuttle is possible but does not establish a public right to every roadside pullout.",
    ],
    gauge: "13341570",
    gaugeName: "Potlatch River below Little Potlatch Creek near Spalding, ID (proxy for lower Potlatch)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 700, idealMin: 700, idealMax: 8000, tooHigh: 8000 },
    thresholdLabel:
      "American Whitewater Lower Potlatch correlation: 700-8,000 cfs on the Spalding proxy; local North Idaho Rivers cue is a 3.0-ft minimum stick level and roughly 4.0 ft for less-scrapey lower miles",
    thresholdUrl: lowerPotlatchThreshold,
    thresholdSupportUrl: potlatchGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lowerPotlatchThreshold,
    sourceLabel: "American Whitewater Lower Potlatch Frog Pond-to-Kendrick reach record",
    mapUrl: lowerPotlatchMap,
    additionalSourceLinks: [
      { label: "American Whitewater Lower Potlatch reach and flow correlation", url: lowerPotlatchThreshold },
      { label: "American Whitewater Lower Potlatch map/access record", url: lowerPotlatchMap },
      { label: "North Idaho Rivers Potlatch flow, access, and shuttle guide", url: potlatchGuide },
      { label: "USGS Potlatch River proxy gauge", url: lowerPotlatchGauge },
      { label: "USGS Potlatch River at Kendrick context gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13341500/" },
      { label: "Idaho Fish and Game Potlatch water record", url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1167653464740" },
    ],
    putIn: {
      name: "Frog Pond access",
      latitude: 46.655,
      longitude: -116.549,
      mileFromStart: 0,
      note: "American Whitewater access point 111258 at Frog Pond. Confirm current roadside parking, river-side carry, and any local/private frontage controls.",
    },
    takeOut: {
      name: "Kendrick first concrete bridge",
      latitude: 46.6275,
      longitude: -116.641,
      mileFromStart: 6.4,
      note: "American Whitewater access point 116528 / Kendrick-area bridge anchor. Treat it as a navigation and landing coordinate, not proof of a dedicated ramp; inspect the bridge for wood and confirm legal parking before launch.",
    },
    camping:
      "No on-route camping is assumed. Use a legal Kendrick/Deary basecamp and do not camp on private agricultural frontage or at an unmarked bridge pullout.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short county-road shuttle along the lower Potlatch; American Whitewater reports that a bicycle shuttle is practical. Use only legal shoulders and private-road approaches, and stage the endpoint before launch.",
    permits:
      "No route-specific river permit was confirmed. Follow Idaho AIS/PFD requirements, private-property signs, bridge and road rules, current fish/weir notices, and any local closure or construction notice.",
    watchFor: [
      "bridge strainer",
      "low-water scraping",
      "private frontage",
      "limited bridge parking",
      "cold early-season water",
      "downstream proxy mismatch",
    ],
    season: [2, 3, 4, 5],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not a Lower Potlatch endpoint image",
  }),

  makeRoute({
    id: "bear-valley-creek-fir-confluence",
    riverId: "bear-valley-creek-idaho",
    name: "Bear Valley Creek",
    reach: "Fir Creek Campground to Middle Fork Salmon confluence",
    region: "Central Idaho / Boise National Forest",
    routeType: "whitewater",
    summary:
      "A 7-mile Class II-III Bear Valley Creek reach from Fir Creek Campground to the Middle Fork Salmon confluence.",
    statusText:
      "Planning-only proxy-gauge route. Whitewater Guidebook, Snoflo, RiverFacts, and Forest Service corridor information agree on the Fir Creek start, confluence endpoint, Class II-III character, and early-summer flow planning; the Middle Fork Lodge gauge is a nearby proxy and the creek has a mandatory fish-trap portage, continuous wood exposure, remote access, and a long carry/shuttle.",
    distance: "About 7 river miles",
    time: "About 4-6 hours including portage, scouting, and the remote shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "access_uncertain", "portage"],
    safety: [
      "Whitewater Guidebook describes mostly Class II with occasional Class III, a mandatory portage around a river-wide fish trap shortly below Fir Creek, and continuous wood potential. Portage the trap and scout every bend; do not use the downstream Middle Fork continuation without a separate permit and Dagger Falls plan.",
      "Snoflo publishes a 600-2,000 cfs ideal streamflow range on the Middle Fork Lodge-area gauge, while Whitewater Guidebook gives a 3-5 ft Middle Fork Lodge stage cue. Both are planning proxies for Bear Valley Creek, not a guarantee of local depth or wood clearance.",
      "Fir Creek Campground and Forest Roads 579/582 provide the named access corridor, but the confluence endpoint is a trail/bridge-area landing rather than a dedicated developed ramp. Confirm seasonal road openings, parking, carry, river-right/left landing, and current wilderness rules before departure.",
    ],
    gauge: "13309220",
    gaugeName: "Middle Fork Salmon River at Middle Fork Lodge near Yellow Pine, ID (proxy for Bear Valley Creek)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 600, idealMax: 2000, tooHigh: 2000 },
    thresholdLabel:
      "Snoflo Bear Valley planning band: 600-2,000 cfs on the Middle Fork Lodge-area proxy; Whitewater Guidebook adds a 3-5 ft stage cue",
    thresholdUrl: bearValleySnoflo,
    thresholdSupportUrl: bearValleyFlowGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: bearValleyFlowGuide,
    sourceLabel: "Whitewater Guidebook Bear Valley Creek route record",
    mapUrl: bearValleyMap,
    additionalSourceLinks: [
      { label: "Whitewater Guidebook Bear Valley Creek route and stage cue", url: bearValleyFlowGuide },
      { label: "Snoflo Fir Creek-to-Boise National Forest boundary flow band", url: bearValleySnoflo },
      { label: "RiverFacts Bear Valley access coordinates", url: bearValleyMap },
      { label: "Bear Valley / Fir Creek campground and road context", url: bearValleyAccessGuide },
      { label: "USGS Middle Fork Salmon proxy gauge", url: marshCreekMiddleForkGauge },
      { label: "Boise National Forest Wild and Scenic corridor study", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5394050.pdf" },
    ],
    putIn: {
      name: "Fir Creek Campground",
      latitude: 44.43111,
      longitude: -115.29139,
      mileFromStart: 0,
      note: "Named campground and trailhead access; verify seasonal Forest Road 579/582 opening, campground status, parking, and the legal river-side carry.",
    },
    takeOut: {
      name: "Middle Fork Salmon confluence / Dagger Falls trail access",
      latitude: 44.52944,
      longitude: -115.29223,
      mileFromStart: 7,
      note: "RiverFacts confluence-area endpoint anchor. This is not a dedicated ramp; confirm the current trail/bridge landing and do not continue below Dagger Falls without the required Middle Fork permit.",
    },
    camping:
      "Fir Creek Campground is the named endpoint campground when open. No informal on-route camping is assumed; verify Forest Service rules, bear storage, fire restrictions, and water treatment.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Remote Forest Road 579/582 shuttle with a trail/bridge carry at the confluence. Stage the endpoint first, confirm road conditions and gates, and carry communications and recovery gear.",
    permits:
      "No permit is assumed for the Bear Valley Creek reach above the Middle Fork Salmon. A separate Middle Fork Salmon permit is required for downstream travel below Dagger Falls; follow Forest Service, AIS/PFD, fire, wildlife, and wilderness rules.",
    watchFor: ["mandatory fish-trap portage", "continuous river-wide wood", "cold high-elevation water", "remote Forest Road 579/582", "confluence trail/bridge landing", "Middle Fork permit boundary"],
    season: [5, 6, 7],
    imageUrl: salmonImage,
    imageLabel: "Middle Fork Salmon watershed context photograph; not a Bear Valley endpoint image",
  }),

  makeRoute({
    id: "big-creek-middle-fork-airstrip-cache-bar",
    riverId: "big-creek-middle-fork-salmon-idaho",
    name: "Big Creek (Middle Fork Salmon tributary)",
    reach: "Big Creek Airstrip to Cache Bar via the Middle Fork Salmon",
    region: "Central Idaho / Frank Church River of No Return Wilderness",
    routeType: "whitewater",
    summary:
      "A 36-mile Class III-IV Big Creek expedition from the public backcountry airstrip, followed by roughly 18 miles on the Middle Fork Salmon to the Cache Bar take-out.",
    statusText:
      "Planning-only wilderness expedition. Whitewater Guidebook uses the Middle Fork Salmon gauge's 3-foot reading as the ideal Big Creek cue; American Whitewater describes Big Creek as Class III-IV with substantial wood and a mandatory Middle Fork permit. The airstrip and Cache Bar are documented access facilities, but flight, permit, seasonal closure, and wood checks are hard gates.",
    distance: "About 54 river miles including the Middle Fork exit; multi-day staged expedition",
    time: "About 3-5 days including flight/logistics, scouting, and wilderness camping",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater and Whitewater Guidebook describe a remote Class III-IV creek with frequent wood portages, limited eddies, and a stronger Class IV character at medium water. Use a proven expedition crew, satellite communication, repair/rescue gear, and a conservative portage plan.",
      "The 3-foot Middle Fork Lodge stage is a local planning cue for the connected Big Creek/Middle Fork trip, not a direct Big Creek gauge or safety guarantee. A 2026 trip report at 5 feet described upper Big Creek as wood-choked and effectively Class V; inspect the trend, current wood, and party capability before launch.",
      "A free Middle Fork permit is required for Big Creek paddling and the connected Middle Fork segment; the corridor is closed to canoe/kayak use in April, May, August, and September for spawning protection. Confirm the current permit, flight/airstrip status, road or air access, wildfire closures, and Cache Bar ramp before committing.",
    ],
    gauge: "13309220",
    gaugeName: "Middle Fork Salmon River at Middle Fork Lodge, ID (tributary/exit proxy)",
    gaugeKind: "proxy",
    gaugeMetric: "gage_height_ft",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2, idealMin: 3, idealMax: 4, tooHigh: 5 },
    thresholdLabel: "Whitewater Guidebook: ideal when Middle Fork stage is about 3 ft; about 2 ft is a low-water benchmark and 5 ft is retained as a high-wood escalation cue",
    thresholdUrl: "https://www.whitewaterguidebook.com/idaho/big-creek/",
    thresholdSupportUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/518/main",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/518/main",
    sourceLabel: "American Whitewater Big Creek Airstrip-to-Cache Bar reach record",
    mapUrl: "https://www.northidahorivers.com/Middle_Fork_Salmon.htm",
    additionalSourceLinks: [
      { label: "Whitewater Guidebook Big Creek flow and permit guide", url: "https://www.whitewaterguidebook.com/idaho/big-creek/" },
      { label: "American Whitewater Big Creek reach and permit record", url: "https://www.americanwhitewater.org/content/River/view/river-detail/518/main" },
      { label: "American Whitewater Big Creek trip report / wood context", url: "https://www.americanwhitewater.org/content/River/view/river-detail/518/reports/100428261" },
      { label: "USGS Middle Fork Lodge stage gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13309220/" },
      { label: "Idaho Transportation Department Big Creek airstrip directory", url: "https://itd.idaho.gov/aero/airport-planning/5010-safety-inspections-airport-economic-impacts/" },
      { label: "North Idaho Rivers Middle Fork access and Cache Bar logistics", url: "https://www.northidahorivers.com/Middle_Fork_Salmon.htm" },
      { label: "U.S. Fish and Wildlife Middle Fork Salmon overview", url: "https://www.fws.gov/rivers/river/salmon-middle-fork" },
    ],
    putIn: {
      name: "Big Creek Backcountry Airstrip / Ranger Station",
      latitude: 45.1332431,
      longitude: -115.3217789,
      mileFromStart: 0,
      note: "Forest Service public-use airstrip and ranger-station access near Big Creek Campground. Flight or overland approach, current NOTAM/airstrip condition, and river carry require advance confirmation; do not treat the runway as a casual public ramp.",
    },
    takeOut: {
      name: "Cache Bar Boat Ramp",
      latitude: 45.31856,
      longitude: -114.63671,
      mileFromStart: 54,
      note: "Public Forest Service Cache Bar take-out on the Salmon corridor, about 18 miles below the Big Creek/Middle Fork connection. Confirm current ramp, trailer staging, permit records, and swift-current landing conditions.",
    },
    access: [
      {
        name: "Big Creek Backcountry Airstrip / Ranger Station",
        latitude: 45.1332431,
        longitude: -115.3217789,
        mileFromStart: 0,
        note: "Named Big Creek airstrip access; flight scheduling, airstrip notices, and a legal boat carry to the creek are required.",
      },
      {
        name: "Middle Fork Salmon confluence / mandatory continuation",
        latitude: 45.0832,
        longitude: -115.0455,
        mileFromStart: 36,
        note: "Approximate Big Creek/Middle Fork connection waypoint; not a take-out. Continue only with the current Middle Fork permit, camping plan, and downstream wood/rapid assessment.",
        segmentKind: "transition",
      },
      {
        name: "Cache Bar Boat Ramp",
        latitude: 45.31856,
        longitude: -114.63671,
        mileFromStart: 54,
        note: "Named Forest Service take-out facility; lower and upper ramps have different eddy/current characteristics. Confirm current landing and trailer staging.",
      },
    ],
    camping:
      "This is a wilderness expedition with designated or durable backcountry camps along Big Creek and the Middle Fork. Use only current Forest Service camps, pack out waste, carry a fire-pan/portable-toilet plan where required, and do not assume private ranch or airstrip camping.",
    campingClassification: "on_route_campsite",
    shuttle:
      "No conventional road shuttle reaches the Big Creek put-in. Arrange an authorized flight or verify the exceptional overland approach, then use a permitted wilderness float to Cache Bar and a current trailer/vehicle shuttle plan from the Salmon corridor.",
    permits:
      "A free Middle Fork Salmon permit is required for Big Creek paddling and the connected Middle Fork; observe the April-May and August-September canoe/kayak closure, Idaho AIS/PFD rules, wilderness regulations, fire restrictions, and current Forest Service closures.",
    watchFor: ["mobile wood and mandatory portages", "rapid escalation at higher Middle Fork stages", "flight/airstrip and carry logistics", "permit and spawning closures", "cold-water wilderness rescue", "Cache Bar swift-current landing"],
    season: [6, 7],
    imageUrl: salmonImage,
    imageLabel: "Middle Fork Salmon watershed context photograph; not a Big Creek endpoint image",
  }),

  makeRoute({
    id: "boundary-creek-canadian-border-kootenai",
    riverId: "boundary-creek-idaho",
    name: "Boundary Creek",
    reach: "Canadian border to Kootenai River confluence",
    region: "North Idaho / Boundary County / Kaniksu National Forest",
    routeType: "whitewater",
    summary:
      "A roughly 7.5-mile, 250-350 fpm Class IV-V creek run from the Canadian border to the Kootenai River.",
    statusText:
      "Planning-only direct-gauge route. North Idaho Rivers and American Whitewater describe a continuous, remote Class IV-V descent with a USGS gauge at the take-out and a narrow 400-600 cfs window. Snowbound Saddle Pass roads, border-security restrictions, wood, and no developed public ramp make this an expert field-confirmation route.",
    distance: "About 7.5 river miles",
    time: "About 5-8 hours of continuous boating plus a long shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "fast_rise",
      "access_uncertain",
      "private_banks",
    ],
    safety: [
      "North Idaho Rivers describes Boundary Creek as continuous read-and-run Class IV/V with 250+ fpm average gradient, a 300-350 fpm steep section, and few meaningful eddies. This is for strong Class V teams with aggressive boat scouting, not a general float route.",
      "Use 400-600 cfs on USGS 12321500 as the local planning band; the guide says flows above 600 cfs are not recommended except for experienced paddlers who know the lines. Check wood, snowmelt rise, and the live hydrograph immediately before committing.",
      "The upper access is near the Canadian border and reached by seasonal Saddle Pass/Boundary Creek roads. Crossing into Canada is unlawful, Border Patrol monitors the area, and the lower gauge/roadside endpoint is an approximate landing rather than a developed ramp.",
    ],
    gauge: "12321500",
    gaugeName: "Boundary Creek near Porthill, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 400, idealMin: 400, idealMax: 600, tooHigh: 600 },
    thresholdLabel:
      "North Idaho Rivers Boundary Creek guidance: 400-600 cfs recommended; above 600 cfs not recommended except for expert teams",
    thresholdUrl: boundaryCreekGuide,
    thresholdSupportUrl: boundaryCreekThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: boundaryCreekThreshold,
    sourceLabel: "American Whitewater Boundary Creek Canadian border-to-confluence reach record",
    mapUrl: boundaryCreekMap,
    additionalSourceLinks: [
      { label: "North Idaho Rivers Boundary Creek flow and access guide", url: boundaryCreekGuide },
      { label: "USGS Boundary Creek near Porthill gauge", url: boundaryCreekGauge },
      { label: "Boundary Creek stream location map", url: boundaryCreekMap },
      { label: "American Whitewater Boundary Creek reach", url: boundaryCreekThreshold },
      { label: "Idaho Boundary-Smith Creek Wildlife Management Area plan", url: "https://idfg.idaho.gov/sites/default/files/2014-2023-BoundarySCWMA-Plan-Final.pdf" },
    ],
    putIn: {
      name: "Boundary Creek / Saddle Pass upper access",
      latitude: 49.005,
      longitude: -116.655,
      mileFromStart: 0,
      note: "North Idaho Rivers identifies the Canadian-border headwater bridge and Saddle Pass road as the upper access. This is an approximate forest-road/stream anchor; do not cross the international boundary and confirm the current gate, road, and legal staging conditions with the land manager.",
    },
    takeOut: {
      name: "Boundary Creek USGS gauge / Kootenai confluence",
      latitude: 48.99722222,
      longitude: -116.56916667,
      mileFromStart: 7.5,
      note: "USGS 12321500 is at the lower end near the mouth of the canyon. Use the gauge coordinate as a lower access-area anchor only; confirm a safe river-right landing, parking, and any seasonal or agency restrictions before launch.",
    },
    access: [
      {
        name: "Boundary Creek / Saddle Pass upper access",
        latitude: 49.005,
        longitude: -116.655,
        mileFromStart: 0,
        note: "Approximate headwater bridge/forest-road anchor near the Canadian border; no developed ramp is assumed.",
      },
      {
        name: "Boundary Creek USGS gauge / Kootenai confluence",
        latitude: 48.99722222,
        longitude: -116.56916667,
        mileFromStart: 7.5,
        note: "Gauge and lower-canyon facility anchor; verify the actual water landing and legal parking rather than treating the monitoring site as a boat ramp.",
      },
    ],
    camping:
      "No developed endpoint campground is documented for this demanding day run. Use only a separately verified, legal Kaniksu/Boundary County basecamp and do not assume roadside or border-area camping is permitted.",
    campingClassification: "none",
    shuttle:
      "The shuttle uses Highway 95/Highway 1, Copeland Hill Road, West Side Road, Smith Creek Road, Boundary Creek Road, and seasonal Saddle Pass roads. The upper road can remain snowbound into June; use a high-clearance vehicle, confirm gates, and stage the lower exit before committing.",
    permits:
      "Follow Idaho Panhandle National Forest and Boundary-Smith Creek WMA rules, Idaho AIS/PFD requirements, current fire/road closures, private-property boundaries, and all U.S. Border Patrol instructions. Never cross into Canada from the primitive border area.",
    watchFor: [
      "continuous Class IV/V read-and-run",
      "250-350 fpm gradient and limited eddies",
      "wood, cold water, and spring runoff rise",
      "snowbound Saddle Pass roads",
      "border surveillance and no international crossing",
      "approximate gauge-area take-out",
    ],
    season: [6, 7],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho Panhandle river context photograph; not a Boundary Creek endpoint image",
  }),

  makeRoute({
    id: "smith-creek-bridge-smith-falls",
    riverId: "smith-creek-idaho",
    name: "Smith Creek",
    reach: "Smith Creek Bridge to above Smith Creek Falls",
    region: "North Idaho / Boundary County / Selkirk Mountains",
    routeType: "whitewater",
    summary:
      "A committing 5.7-mile Class IV-V+ Smith Creek descent from the hydro diversion bridge through a steep, pool-drop canyon to the Smith Falls take-out bridge.",
    statusText:
      "Planning-only local-stage route. American Whitewater gives a route-specific local control posture: 100 cfs below the diversion is minimal but possible, 200-300 cfs is medium, and the hydro project can change the release abruptly. The nearby Boundary Creek USGS station is only a regional proxy; call the diversion operator and inspect the staff gauge before committing.",
    distance: "About 5.7 miles",
    time: "About 6-10 hours including scouting and portage",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater describes Smith Creek as nearly continuous Class IV/V- with a roughly 1,700-foot plunge, little easy water, and long read-and-run sections. This is for an expert creek team with rescue systems, helmet/PFD discipline, and a conservative turn-around plan.",
      "The first section includes a documented unrunnable 20-foot falls/portage and difficult scouting; the final half-mile contains Upper Falls, Smith Falls, and a 40-foot falls into a cauldron. Treat the mapped endpoint as a mandatory take-out above Smith Falls and do not continue downstream.",
      "The hydro project can divert 0-380 cfs and change the creek rapidly; AW reports a local staff gauge, 6.4 ft too low for lower Smith, and 8.1 ft too high. Call the diversion operator at (208) 267-2744 for current/projection information and verify a stable release immediately before launch.",
      "Wood, landslides, rain spikes, cold water, and the absence of developed facilities make this a remote expedition-style day. IDFG lists no boat ramp, dock, toilet, or campground for Smith Creek; confirm legal bridge access, parking, and a vehicle recovery plan.",
    ],
    gauge: "12321500",
    gaugeName: "Boundary Creek near Porthill, ID (regional proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 100, idealMin: 200, idealMax: 300 },
    thresholdLabel:
      "American Whitewater local Smith Creek guidance: 100 cfs below diversion is minimal, 200-300 cfs is medium; hydro release is variable and the USGS station is only a regional proxy",
    thresholdUrl: smithCreekThreshold,
    thresholdSupportUrl: smithCreekFlowProject,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: smithCreekThreshold,
    sourceLabel: "American Whitewater Smith Creek Bridge-to-above-Smith-Falls reach record",
    mapUrl: smithCreekMap,
    additionalSourceLinks: [
      { label: "American Whitewater Smith Creek flow-management project", url: smithCreekFlowProject },
      { label: "Idaho Fish and Game Smith Creek water record", url: smithCreekIdfg },
      { label: "USGS Boundary Creek regional proxy gauge", url: smithCreekGauge },
      { label: "American Whitewater Smith Creek map and access points", url: smithCreekMap },
      { label: "Boundary-Smith Creek WMA management plan", url: "https://idfg.idaho.gov/sites/default/files/2014-2023-BoundarySCWMA-Plan-Final.pdf" },
      { label: "St. Joe Ranger District motor-vehicle-use map", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd530188.pdf" },
    ],
    putIn: {
      name: "Smith Creek Hydro / Smith Creek Bridge Put-In",
      latitude: 48.93,
      longitude: -116.656,
      mileFromStart: 0,
      note: "American Whitewater's mapped bridge/hydro access point at the start of the reach. This is an approximate bridge and diversion-area anchor, not a developed ramp; confirm legal parking, operator coordination, and current road conditions.",
    },
    takeOut: {
      name: "Above Smith Creek Falls Bridge Take-Out",
      latitude: 48.961,
      longitude: -116.555,
      mileFromStart: 5.7,
      note: "American Whitewater's mapped take-out bridge just above Smith Falls. Treat the falls as a mandatory exit; confirm a safe carry, private-frontage limits, parking, and current bridge access before launching.",
    },
    camping:
      "IDFG lists no campground for Smith Creek. Use only a separately verified, legal Boundary County/Idaho Panhandle basecamp; do not assume overnight camping at either bridge or along the hydro corridor.",
    campingClassification: "none",
    shuttle:
      "Use the Boundary-Smith Creek road network and a staged take-out vehicle; the upper hydro bridge and lower Smith Falls bridge are remote and access conditions can change with snow, washouts, private frontage, and hydro operations. Carry satellite communication and a written float plan.",
    permits:
      "Confirm current Idaho Panhandle National Forest, Boundary-Smith Creek WMA, hydro-project, road, fire, AIS/PFD, and private-property requirements. Operator flow information is not a substitute for access permission or a same-day visual scout.",
    watchFor: ["hydro-release swings", "20-foot portage", "long Class IV/V read-and-run", "Upper Falls and Smith Falls", "wood and landslides", "cold water and remote rescue"],
    season: [5, 6, 7],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho Panhandle river context photograph; Smith Creek endpoint not depicted",
  }),

  makeRoute({
    id: "st-joe-heller-creek-spruce-tree",
    riverId: "st-joe-river-idaho",
    name: "St. Joe River",
    reach: "Heller Creek Campground to Spruce Tree Campground",
    region: "Idaho Panhandle / St. Joe Wild and Scenic River",
    routeType: "whitewater",
    summary:
      "An approximately 18-mile remote Class III-IV upper St. Joe run from Heller Camp to Spruce Tree.",
    statusText:
      "Planning-only direct-stage route. American Whitewater and North Idaho Rivers describe a remote Class IV river-trail corridor with major wood hazards, long swiftwater sections, and named Heller/Spruce Tree campground endpoints. The Red Ives gauge gives a 2.5-4 ft operating envelope and 3-3.5 ft optimum, but seasonal Forest Road 320 and river-trail conditions require field confirmation.",
    distance: "About 18-20 river miles",
    time: "About 6-10 hours, or a self-support overnight",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "low_water",
      "fast_rise",
      "access_uncertain",
    ],
    safety: [
      "North Idaho Rivers documents a river-wide Jam Dam and additional wood, narrow Class III-IV ledges, long swims, few eddies, and difficult portages. Scout from the river trail where possible, carry saw/rescue gear, and do not treat the named campgrounds as a guarantee of a clear channel.",
      "Use 2.5 ft as the conservative lower stage, 3-3.5 ft as the preferred Red Ives band, and 4 ft as the upper planning shoulder. The gauge is two miles below Spruce Tree but on the same reach; stage trend, wood, and actual channel conditions override every numeric cue.",
      "Heller Camp is reached by rough Forest Road 320 from Red Ives or Montana, and the road can remain snowbound until late June. The river trail climbs away from the channel and is not a reliable emergency exit; carry satellite communication, first aid, cold-water protection, and a conservative turnaround plan.",
    ],
    gauge: "12413875",
    gaugeName: "St. Joe River at Red Ives Ranger Station, ID",
    gaugeKind: "direct",
    gaugeMetric: "gage_height_ft",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2.5, idealMin: 3, idealMax: 3.5, tooHigh: 4 },
    thresholdLabel:
      "North Idaho Rivers Heller Camp guidance: 2.5 ft lower stage, 3-3.5 ft optimum, and above 4 ft out of banks",
    thresholdUrl: stJoeHellerGuide,
    thresholdSupportUrl: stJoeHellerReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: stJoeHellerReach,
    sourceLabel: "American Whitewater Heller Creek-to-Spruce Tree reach record",
    mapUrl: stJoeHellerMap,
    additionalSourceLinks: [
      { label: "North Idaho Rivers Heller Camp flow, access, and wood guide", url: stJoeHellerGuide },
      { label: "USGS St. Joe River at Red Ives gauge", url: stJoeRedIvesGauge },
      { label: "Heller Creek Campground access map", url: stJoeHellerMap },
      { label: "Spruce Tree Campground map and access", url: "https://mapcarta.com/23562858" },
      { label: "St. Joe Wild and Scenic River management plan", url: stJoePlan },
    ],
    putIn: {
      name: "Heller Creek Campground river access",
      latitude: 47.06481,
      longitude: -115.21862,
      mileFromStart: 0,
      note: "Named Forest Service campground at the upper end; Forest Road 320 is rough/high-clearance and seasonal. Confirm current gate, parking, campground status, and the river carry before committing.",
    },
    takeOut: {
      name: "Spruce Tree Campground river access",
      latitude: 47.03808,
      longitude: -115.34777,
      mileFromStart: 18,
      note: "Named Forest Service campground at the road end and two miles below the Red Ives gauge. North Idaho Rivers warns that the primitive ramp has little eddy room; confirm landing, parking, and seasonal opening.",
    },
    access: [
      {
        name: "Heller Creek Campground river access",
        latitude: 47.06481,
        longitude: -115.21862,
        mileFromStart: 0,
        note: "Forest Service campground/roadside staging anchor; not a surveyed whitewater ramp.",
      },
      {
        name: "Spruce Tree Campground river access",
        latitude: 47.03808,
        longitude: -115.34777,
        mileFromStart: 18,
        note: "Primitive campground landing with limited eddy room; verify current carry, parking, and seasonal road status.",
      },
    ],
    camping:
      "Heller Creek and Spruce Tree are named endpoint campgrounds. A self-support overnight is possible only at legal developed or verified dispersed sites; confirm current Forest Service rules, bear storage, fire restrictions, and road openings.",
    campingClassification: "endpoint_campground",
    shuttle:
      "The shuttle is long and remote: Forest Highway 50/Red Ives Road to Heller Forest Road 320, with a separate Spruce Tree/Forest Road 218 exit. Stage both vehicles before launch and use a high-clearance vehicle; do not assume the river trail can retrieve a vehicle or swimmer.",
    permits:
      "Follow Idaho Panhandle National Forest and Wild and Scenic River rules, seasonal road/campground gates, Idaho AIS/PFD requirements, fire restrictions, bear-storage rules, and any current closure or evacuation notice.",
    watchFor: [
      "Jam Dam and additional river-wide wood",
      "long continuous Class III-IV ledges",
      "limited eddies and difficult portages",
      "2.5-4 ft Red Ives stage envelope",
      "rough seasonal Forest Road 320",
      "remote trail-dependent rescue",
    ],
    season: [6, 7],
    imageUrl: stJoeImage,
    imageLabel: "St. Joe River same-river context photograph; not the Heller reach or current conditions",
  }),

  makeRoute({
    id: "little-salmon-smoky-boulder-hazard",
    riverId: "little-salmon-river-idaho",
    name: "Little Salmon River",
    reach: "Smoky Boulder Road to Hazard Creek",
    region: "West-central Idaho / Riggins",
    routeType: "whitewater",
    summary:
      "A 5.2-mile roadside Class III-V Little Salmon reach from the first Highway 95 waterfalls below Smoky Boulder Road to the Hazard Creek take-out.",
    statusText:
      "Gauge-scored Little Salmon reach. American Whitewater documents the four waterfall sequence, roadside scouting, and the Hazard Creek mandatory take-out; the direct 13316500 gauge and published flow table provide the operating cue, while wood, holes, highway traffic, and limited public access require expert planning.",
    distance: "About 5.2 river miles",
    time: "About 2-4 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "fast_rise", "strainers", "portage", "private_banks", "mandatory_takeout", "access_uncertain"],
    safety: [
      "American Whitewater describes four large waterfalls along Highway 95; all are reported runnable, but the first can damage boats and the drops can hide strainers or submerged rocks. Scout every falls and portage whenever the line is not unquestionably clean.",
      "This is a high-challenge roadside run with limited shoulder space. Stage only at the Smoky Boulder Road / Highway 95 access and the river-right Hazard Creek take-out, keep clear of traffic, and do not cross private frontage or continue downstream by accident.",
      "Use 500 cfs as a conservative low-water floor, about 1,200 cfs as the published optimal cue, and 3,000 cfs as the high-water limit. Verify the direct gauge, current road/fire notices, and the downstream Hazard Creek exit before launching.",
    ],
    gauge: "13316500",
    gaugeName: "Little Salmon River at Riggins, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 1100, idealMax: 1300, tooHigh: 3000 },
    thresholdLabel:
      "Little Salmon flow table: 500 cfs low, 1,200 cfs optimal, 3,000 cfs high",
    thresholdUrl: littleSalmonFlowTable,
    thresholdSupportUrl: littleSalmonSmokyThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: littleSalmonSmokyThreshold,
    sourceLabel: "American Whitewater Smoky Boulder Road-to-Hazard Creek reach record",
    mapUrl: littleSalmonSmokyThreshold,
    additionalSourceLinks: [
      { label: "American Whitewater Smoky Boulder-to-Hazard reach", url: littleSalmonSmokyThreshold },
      { label: "Little Salmon flow table and gauge cues", url: littleSalmonFlowTable },
      { label: "USGS Little Salmon River at Riggins direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13316500/" },
      { label: "Idaho Transportation Department US 95 milepoint log", url: littleSalmonMilepointLog },
      { label: "Dreamflows Little Salmon reach map", url: "https://www.dreamflows.com/reachMap/index.php?num=A&rid=148" },
    ],
    putIn: {
      name: "Smoky Boulder Road / Highway 95 Put-In",
      latitude: 45.124466,
      longitude: -116.295645,
      mileFromStart: 0,
      note: "American Whitewater places the put-in at the first of four waterfalls along US 95 near mile 172.0 below the Smoky Boulder Road turnoff. Coordinates are a Highway 95 milepost access anchor; confirm the current river carry and shoulder parking on site.",
    },
    takeOut: {
      name: "Hazard Creek Take-Out",
      latitude: 45.180089,
      longitude: -116.301522,
      mileFromStart: 4.97,
      note: "River-right access just below the Highway 95 bridge near mile 176.5, immediately upstream of the Hazard Creek confluence. Treat this as the mandatory take-out unless the downstream Hazard Creek-to-Riggins reach is separately planned.",
    },
    access: [
      {
        name: "Smoky Boulder Road / Highway 95 Put-In",
        latitude: 45.124466,
        longitude: -116.295645,
        mileFromStart: 0,
        note: "Roadside Highway 95 mile-172 access anchor below the Smoky Boulder Road turnoff; keep vehicles fully clear of traffic and verify the carry to the first falls.",
      },
      {
        name: "Hazard Creek Take-Out",
        latitude: 45.180089,
        longitude: -116.301522,
        mileFromStart: 4.97,
        note: "River-right landing below the Highway 95 bridge near mile 176.5. Use the signed/public Forest Service-side access if open; avoid private banks and do not miss the exit before the downstream reach.",
      },
    ],
    camping:
      "No endpoint campsite is documented for this short roadside reach. Use a permitted Riggins/New Meadows basecamp or another designated public campground and verify current fire restrictions.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "US 95 parallels the full reach for scouting, but shoulder space is constrained and traffic is active. Stage the take-out first, use a legal pullout at the upper mile-172 access, and never stop in travel lanes.",
    permits:
      "No river permit is listed. Follow Idaho County/IDFG/Forest Service access rules, Idaho AIS/PFD requirements, fire restrictions, and posted highway rules.",
    watchFor: ["four large waterfalls", "hidden strainers and submerged rocks", "holes at waterfall bases", "Highway 95 traffic and limited shoulder", "mandatory Hazard Creek takeout", "private banks"],
    season: [4, 5, 6],
    imageUrl: salmonImage,
    imageLabel: "Little Salmon / Salmon River watershed context photograph",
  }),
  makeRoute({
    id: "little-salmon-hazard-creek-riggins",
    riverId: "little-salmon-river-idaho",
    name: "Little Salmon River",
    reach: "Hazard Creek to Salmon River at Riggins",
    region: "West-central Idaho / Riggins",
    routeType: "whitewater",
    summary:
      "A 20-mile roadside Class III-IV(V) Little Salmon run from the Hazard Creek confluence to Riggins City Park, with a documented mid-run Highway 95 rest-area exit.",
    statusText:
      "Gauge-scored Little Salmon route. American Whitewater documents the endpoint chain, roadside scouting, and the Class V Amphitheater; the 13316500 gauge and published flow table provide the operating cue, while private banks and fast spring water require disciplined access and rescue planning.",
    distance: "About 20 river miles",
    time: "About 4-7 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "fast_rise", "strainers", "private_banks", "mandatory_takeout"],
    safety: [
      "American Whitewater identifies Amphitheater, a Class V rapid about 1.7 miles below the start. Scout from Highway 95 and use the river-right portage/exit only if the line is not unquestionably clean for the crew.",
      "The highway follows the reach, but much of the shoreline is private. Use only the Hazard Creek confluence access, the signed Highway 95 rest-area landing, and Riggins City Park; do not improvise bank access or portage through private yards.",
      "Use 500 cfs as a conservative low-water floor, about 1,200 cfs as the published optimal cue, and 3,000 cfs as the high-water limit. Check the direct gauge, road conditions, fire notices, and the Salmon River takeout before launch.",
    ],
    gauge: "13316500",
    gaugeName: "Little Salmon River at Riggins, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 1100, idealMax: 1300, tooHigh: 3000 },
    thresholdLabel:
      "Little Salmon flow table: 500 cfs low, 1,200 cfs optimal, 3,000 cfs high",
    thresholdUrl: littleSalmonFlowTable,
    thresholdSupportUrl: littleSalmonThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: littleSalmonThreshold,
    sourceLabel: "American Whitewater Hazard Creek-to-Riggins reach record",
    mapUrl: littleSalmonMap,
    additionalSourceLinks: [
      { label: "American Whitewater Little Salmon reach", url: littleSalmonThreshold },
      { label: "Little Salmon flow table and gauge cues", url: littleSalmonFlowTable },
      { label: "USGS Little Salmon River at Riggins direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13316500/" },
      { label: "RiverFacts endpoint map and coordinates", url: littleSalmonMap },
      { label: "Idaho Fish and Game southwest access guide", url: littleSalmonAccessGuide },
      { label: "Idaho Transportation Department US 95 milepoint log", url: littleSalmonMilepointLog },
    ],
    putIn: {
      name: "Hazard Creek Confluence Put-In",
      latitude: 45.1872,
      longitude: -116.30306,
      mileFromStart: 0,
      note: "RiverFacts/American Whitewater endpoint at Highway 95 mile 176.5, immediately upstream of the Hazard Creek confluence on river right; use the Forest Service road access and confirm the current carry/parking surface.",
    },
    takeOut: {
      name: "Riggins City Park Take-Out",
      latitude: 45.41777,
      longitude: -116.31806,
      mileFromStart: 19.5,
      note: "Public city-park landing on the Salmon River near Highway 95 mile 195.7; use the marked ramp and exit before continuing into the Salmon corridor.",
    },
    access: [
      {
        name: "Hazard Creek Confluence Put-In",
        latitude: 45.1872,
        longitude: -116.30306,
        mileFromStart: 0,
        note: "River-right access below the Highway 95 bridge; keep vehicles clear of the bridge and private frontage.",
      },
      {
        name: "Highway 95 Rest Area Alternate Access",
        latitude: 45.3633,
        longitude: -116.3591,
        mileFromStart: 12.8,
        note: "Mid-run river-right rest-area landing described by American Whitewater; use only the signed public access and expect easier Class III+ water downstream.",
      },
      {
        name: "Riggins City Park Take-Out",
        latitude: 45.41777,
        longitude: -116.31806,
        mileFromStart: 19.5,
        note: "Marked public ramp on river left at the Salmon confluence; do not miss the takeout or continue into an unintended Salmon River section.",
      },
    ],
    camping:
      "Riggins provides nearby lodging and developed camping; the route itself is roadside with private frontage, so use only designated public campgrounds and verify fire restrictions rather than treating riverbanks as campsites.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "US 95 parallels the run and makes scouting and a vehicle shuttle straightforward; stage at Riggins City Park first and account for highway traffic and limited shoulder space at the upper access.",
    permits:
      "No river permit is listed. Follow Idaho County/IDFG/Forest Service access rules, Idaho AIS/PFD requirements, fire restrictions, and posted highway-rest-area rules.",
    watchFor: ["Amphitheater Class V rapid", "large holes and continuous spring whitewater", "private shoreline", "Highway 95 traffic and rest-area landing", "mandatory Riggins City Park takeout"],
    season: [4, 5, 6],
    imageUrl: salmonImage,
    imageLabel: "Little Salmon / Salmon River watershed context photograph",
  }),
  makeRoute({
    id: "east-fork-south-fork-salmon-vibika-johnson",
    riverId: "south-fork-salmon-river-idaho",
    name: "East Fork South Fork Salmon River",
    reach: "Vibika Creek to Johnson Creek",
    region: "Central Idaho / Payette National Forest",
    routeType: "whitewater",
    summary:
      "A 2.7-mile Class IV East Fork South Fork Salmon run from the Vibika Creek access to the Johnson Creek bridge, with a short June-July window and frequent wood hazards.",
    statusText:
      "Threshold-documented planning route. American Whitewater lists a Johnson Creek at Yellow Pine proxy correlation of 250-1,500 cfs, exact Vibika Creek and Johnson Creek access points, and a short two- or three-week June-July season; the gauge is nearby watershed context, not a local East Fork measurement.",
    distance: "About 2.7 river miles",
    time: "About 2-4 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "access_uncertain"],
    safety: [
      "American Whitewater rates this nearly continuous Class IV reach and warns about logs, a river-wide log dam, a waterfall near Quartz Creek, and a consequential final drop near the Johnson Creek confluence. Scout every horizon and portage any wood that cannot be cleanly inspected.",
      "The season is short—typically two or three weeks in June or July. Confirm snowmelt, road opening, water temperature, current wood, and same-day trend before driving to Yellow Pine.",
      "The Vibika launch is a roadside staging point and the Johnson Creek bridge landing is a small carry, not a developed ramp. Keep vehicles clear of the bridge, Yellow Pine roads, and private frontage; confirm a lawful carry before unloading.",
      "Use the 250-1,500 cfs Johnson Creek-at-Yellow-Pine correlation as a planning shoulder only. It is a proxy for the East Fork; local level and scout reports override the number.",
    ],
    gauge: "13313000",
    gaugeName: "Johnson Creek at Yellow Pine, ID (proxy for East Fork South Fork Salmon)",
    gaugeKind: "proxy",
    gaugeMetric: "discharge_cfs",
    thresholdModel: "two-sided",
    threshold: { tooLow: 250, idealMin: 250, idealMax: 1500, tooHigh: 1500 },
    thresholdLabel: "American Whitewater Johnson Creek proxy correlation: 250-1,500 cfs",
    thresholdUrl: eastForkSouthForkUpperAw,
    thresholdSupportUrl: eastForkSouthForkUpperDreamflows,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: eastForkSouthForkUpperAw,
    sourceLabel: "American Whitewater East Fork South Fork Salmon upper reach record",
    mapUrl: eastForkSouthForkUpperMap,
    additionalSourceLinks: [
      { label: "American Whitewater East Fork upper reach map", url: eastForkSouthForkUpperMap },
      { label: "Dreamflows East Fork upper reach map", url: eastForkSouthForkUpperDreamflows },
      { label: "USGS Johnson Creek at Yellow Pine proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13313000/" },
    ],
    putIn: {
      name: "Vibika Creek access",
      latitude: 44.96143,
      longitude: -115.46949,
      mileFromStart: 0,
      note: "American Whitewater/Dreamflows map the upper reach launch beside Vibika Creek. Confirm the pullout, parking, road conditions, and a safe carry to the river before loading.",
    },
    takeOut: {
      name: "Johnson Creek bridge access",
      latitude: 44.96294,
      longitude: -115.50143,
      mileFromStart: 2.5,
      note: "Take out under the bridge at the Johnson Creek confluence as described by American Whitewater; keep vehicles clear of the bridge and inspect the final drop before committing.",
    },
    camping:
      "Yellow Pine has limited services and nearby Forest Service camping, but this is a short day run. Use only current designated sites and verify fire restrictions and seasonal road access.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "The Yellow Pine/Stibnite road network provides a short shuttle with roadside scouting, but it is remote and seasonally snowbound. Stage the take-out first and carry reliable emergency communication.",
    permits:
      "Check Payette National Forest road and camping notices, fire restrictions, Idaho AIS/PFD requirements, and any fishery or seasonal closures before launch.",
    watchFor: ["river-wide log dam", "Quartz Creek waterfall", "final Johnson Creek confluence drop", "short season", "cold water"],
    season: [6, 7],
    imageUrl: salmonImage,
    imageLabel: "Salmon River watershed context photograph; East Fork upper reach not depicted",
  }),
  makeRoute({
    id: "east-fork-south-fork-salmon-johnson-indian-point",
    riverId: "south-fork-salmon-river-idaho",
    name: "East Fork South Fork Salmon River",
    reach: "Sheep Creek Trailhead to South Fork Salmon River",
    region: "Central Idaho / Payette National Forest",
    routeType: "whitewater",
    summary:
      "A roughly 9.1-mile Class III-V East Fork South Fork Salmon reach from the standard Sheep Creek Trailhead access to the South Fork Salmon confluence, with roadside scouting and a short high-consequence upper section.",
    statusText:
      "Threshold-documented planning route. American Whitewater's lower East Fork record lists a 300-1,000 cfs Johnson Creek at Yellow Pine proxy correlation, the standard Sheep Creek Trailhead put-in, Caton Creek and Deadman Bar alternates, and the South Fork take-out; this card uses the standard Sheep Creek-to-South Fork endpoint pair, about 9.1 miles, rather than the full Johnson Creek bridge-to-South Fork reach.",
    distance: "About 9.1 river miles",
    time: "About 4-7 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater describes Class V Flight Simulator near the upper section, followed by sustained Class IV and easier Class III water downstream. The standard Sheep Creek Trailhead start avoids the hardest upstream drops but still requires a proven Class IV crew, rescue kit, cold-water protection, and conservative scouting.",
      "Logs, blind horizons, and the active upper section can change by season. Scout Flight Simulator, Ex-Lax, and every wood-affected channel from the road where possible; portage rather than commit to a blind line.",
      "Sheep Creek Trailhead is the standard put-in; Caton Creek and Deadman Bar are named alternates. The South Fork take-out is remote and close to the confluence—verify the landing and do not continue downstream unintentionally.",
      "Use the 300-1,000 cfs Johnson Creek-at-Yellow-Pine correlation as a planning shoulder only. It is a proxy for the East Fork; local level, wood, trend, weather, and scouting override the number.",
    ],
    gauge: "13313000",
    gaugeName: "Johnson Creek at Yellow Pine, ID (proxy for East Fork South Fork Salmon)",
    gaugeKind: "proxy",
    gaugeMetric: "discharge_cfs",
    thresholdModel: "two-sided",
    threshold: { tooLow: 300, idealMin: 300, idealMax: 1000, tooHigh: 1000 },
    thresholdLabel: "American Whitewater Johnson Creek proxy correlation: 300-1,000 cfs",
    thresholdUrl: eastForkSouthForkLowerAw,
    thresholdSupportUrl: eastForkSouthForkLowerDreamflows,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: eastForkSouthForkLowerAw,
    sourceLabel: "American Whitewater East Fork South Fork Salmon lower reach record",
    mapUrl: eastForkSouthForkLowerMap,
    additionalSourceLinks: [
      { label: "American Whitewater East Fork lower reach map", url: eastForkSouthForkLowerMap },
      { label: "Dreamflows East Fork lower reach map", url: eastForkSouthForkLowerDreamflows },
      { label: "USGS Johnson Creek at Yellow Pine proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13313000/" },
    ],
    putIn: {
      name: "Sheep Creek Trailhead put-in",
      latitude: 44.952681,
      longitude: -115.564453,
      mileFromStart: 0,
      note: "American Whitewater identifies Sheep Creek Trailhead as the standard put-in downstream of Flight Simulator. Confirm parking, trail access, and a safe carry to the river.",
    },
    takeOut: {
      name: "South Fork Salmon confluence access",
      latitude: 45.025768,
      longitude: -115.706898,
      mileFromStart: 9.06,
      note: "American Whitewater maps the take-out at the South Fork Salmon confluence. Confirm the exact landing and road-end parking; do not drift into an unintended South Fork expedition.",
    },
    access: [
      {
        name: "Sheep Creek Trailhead put-in",
        latitude: 44.952681,
        longitude: -115.564453,
        mileFromStart: 0,
        note: "Standard Class IV put-in downstream of Flight Simulator; confirm carry and parking.",
      },
      {
        name: "Caton Creek alternate put-in",
        latitude: 44.947672,
        longitude: -115.589019,
        mileFromStart: 1.34,
        note: "American Whitewater names Caton Creek as an alternate downstream put-in; use only if the landing is open and safe.",
      },
      {
        name: "Deadman Bar Campground access",
        latitude: 44.963454,
        longitude: -115.661746,
        mileFromStart: 5.63,
        note: "Named intermediate access with parking and river access; current campground status and landing conditions control.",
      },
      {
        name: "South Fork Salmon confluence access",
        latitude: 45.025768,
        longitude: -115.706898,
        mileFromStart: 9.06,
        note: "Remote South Fork take-out mapped by American Whitewater; verify road-end parking and the landing before launch.",
      },
    ],
    camping:
      "Deadman Bar Campground is a named intermediate staging option when open. This card does not imply a river-camp itinerary; use only current Forest Service sites and posted rules.",
    campingClassification: "endpoint_campground",
    shuttle:
      "The East Fork road closely follows much of the run and supports roadside scouting, but the approach is remote, narrow, and seasonally gated. Stage the South Fork take-out first and carry satellite communication.",
    permits:
      "Check Payette National Forest/Krassel Ranger District road and camping notices, fire restrictions, Idaho AIS/PFD requirements, and any current fishery or seasonal closures.",
    watchFor: ["Flight Simulator", "Ex-Lax and hidden wood", "cold-water swims", "remote confluence take-out", "mandatory South Fork take-out"],
    season: [6, 7],
    imageUrl: salmonImage,
    imageLabel: "Salmon River watershed context photograph; East Fork lower reach not depicted",
  }),
  makeRoute({
    id: "south-fork-salmon-goat-creek-poverty-flat",
    riverId: "south-fork-salmon-river-idaho",
    name: "South Fork Salmon River",
    reach: "Goat Creek to Poverty Flat",
    region: "Central Idaho / Payette National Forest",
    routeType: "whitewater",
    summary:
      "A remote 6.7-mile Class IV-V South Fork Salmon day run from the Goat Creek culvert to Poverty Flat Campground, including the Class V Double Drop.",
    statusText:
      "Threshold-documented planning route. American Whitewater identifies the Goat Creek-to-Poverty Flat reach, its Krassel gauge, Class IV-V character, and seasonal fishery closures; Whitewater Guidebook gives the South Fork's 3-4 ft operating band and warns that below 3 ft becomes technical while above 4 ft escalates rapidly. Poverty Flat is the official campground take-out for Goat Creek floaters.",
    distance: "About 6.7 river miles",
    time: "About 3-6 hours plus scouting, permit checks, and a long remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the run Class IV-V and calls out the Class V Double Drop. This is an expert-only reach with a proven crew, rescue kit, throw bags, cold-water protection, and satellite communication; swim consequences and rescue access are serious.",
      "The Goat Creek access is a small pullout and scramble below a road culvert, while Poverty Flat is a narrow one-lane Forest Service campground road. Inspect the launch and take-out on foot, keep the campground landing clear, and do not assume a roadside carry is a public ramp.",
      "The South Fork Salmon is closed to paddling in April, May, August, and September for spawning according to the American Whitewater reach record. Plan this run for the open June-July window only after checking current Payette National Forest and IDFG notices.",
      "Use the Krassel stage as a reach-level planning cue: about 3-4 ft is the published South Fork band, below 3 ft is technical, above 4 ft becomes exponentially harder, and above 5 ft is treacherous. Local wood, trend, weather, and scout reports override the number.",
    ],
    gauge: "13310700",
    gaugeName: "South Fork Salmon River near Krassel Ranger Station, ID",
    gaugeKind: "direct",
    gaugeMetric: "gage_height_ft",
    thresholdModel: "two-sided",
    threshold: { tooLow: 3, idealMin: 3, idealMax: 4, tooHigh: 5 },
    thresholdLabel:
      "Krassel stage planning band: 3-4 ft; below 3 ft technical, above 4 ft rapidly harder, above 5 ft treacherous",
    thresholdUrl: southForkSalmonGoatGuidebook,
    thresholdSupportUrl: southForkSalmonGoatAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: southForkSalmonGoatAw,
    sourceLabel: "American Whitewater Goat Creek to Poverty Flat reach record",
    mapUrl: southForkSalmonGoatDreamflows,
    additionalSourceLinks: [
      { label: "American Whitewater Goat Creek / Poverty Flat reach", url: southForkSalmonGoatAw },
      { label: "Whitewater Guidebook South Fork Salmon flow guidance", url: southForkSalmonGoatGuidebook },
      { label: "Dreamflows Goat Creek-to-Poverty Flat reach map", url: southForkSalmonGoatDreamflows },
      { label: "USGS South Fork Salmon River near Krassel direct gauge", url: southForkSalmonGauge },
      { label: "Poverty Flat Campground official take-out context", url: southForkSalmonPovertyFlat },
    ],
    putIn: {
      name: "Goat Creek / South Fork Road mile 7.9 culvert",
      latitude: 44.7588,
      longitude: -115.6845,
      mileFromStart: 0,
      note: "Dreamflows maps the put-in at the Goat Creek culvert on South Fork Road; American Whitewater describes a small pullout and scramble to the river. Confirm parking, road opening, and a safe carry before unloading.",
    },
    takeOut: {
      name: "Poverty Flat Campground footbridge",
      latitude: 44.821,
      longitude: -115.7032,
      mileFromStart: 6.7,
      note: "Official Recreation.gov information identifies Poverty Flat as the take-out for floaters coming from Goat Creek. Use the campground footbridge/landing only where signed, and pack out all river gear and waste.",
    },
    camping:
      "Poverty Flat Campground is the named endpoint campground with 10 first-come sites, toilets, and drinking water when open; it is a staging/take-out facility, not a substitute for a river permit or current road check.",
    campingClassification: "endpoint_campground",
    shuttle:
      "The South Fork Road and FR 48/FR 674 approach is paved in places but narrow, remote, and one-lane near Poverty Flat. Stage the take-out first, allow extra time for snow, washouts, and opposing traffic, and carry a satellite communicator.",
    permits:
      "Check Payette National Forest/Krassel Ranger District rules, current IDFG spawning closures, road notices, fire restrictions, and Idaho AIS/PFD requirements. The reach's seasonal closure is a hard no-launch condition.",
    watchFor: ["Class V Double Drop", "cold high-gradient water", "wood and blind horizons", "seasonal spawning closure", "narrow one-lane Poverty Flat road"],
    season: [6, 7],
    imageUrl: salmonImage,
    imageLabel: "Salmon River watershed context photograph; Goat Creek endpoint not depicted",
  }),
  makeRoute({
    id: "south-fork-salmon-poverty-flat-east-fork",
    riverId: "south-fork-salmon-river-idaho",
    name: "South Fork Salmon River",
    reach: "Poverty Flat Campground to East Fork of South Fork",
    region: "Central Idaho / Payette National Forest",
    routeType: "whitewater",
    summary:
      "A 20-mile Class II-III reach from Poverty Flat to the East Fork, with a short high-water Class IV-V canyon and roadside access along the South Fork Road.",
    statusText:
      "Gauge-scored direct-gauge route. American Whitewater lists the Krassel gauge with a 200-6,000 cfs runnable correlation, exact Poverty Flat/East Fork access points, and a detailed road-access sequence; seasonal spawning closure, wood, and remote-road conditions still require a current check before launch.",
    distance: "About 20 river miles",
    time: "About 6-10 hours; commonly split into shorter roadside sections",
    difficulty: "moderate",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater describes mostly Class II-III water, with a short canyon that can become Class IV-V at very high water. Scout the Teapot Hot Springs canyon and any wood before committing.",
      "The South Fork Road provides roadside observation and several named access points, but not every road mile is a legal or easy river landing. Confirm parking, road opening, and the carry at the specific access selected.",
      "The reach is closed to paddling during April, May, August, and September for spawning protection. Treat the closure as a hard no-launch condition and verify current Payette National Forest/IDFG notices.",
      "American Whitewater's direct Krassel-gauge correlation is a broad 200-6,000 cfs planning window, not a guarantee for every subsection; local stage trend, wood, weather, and scout reports override the number.",
    ],
    gauge: "13310700",
    gaugeName: "South Fork Salmon River near Krassel Ranger Station, ID",
    gaugeKind: "direct",
    gaugeMetric: "discharge_cfs",
    thresholdModel: "two-sided",
    threshold: { tooLow: 200, idealMin: 200, idealMax: 6000, tooHigh: 6000 },
    thresholdLabel: "American Whitewater Krassel-gauge correlation: 200-6,000 cfs",
    thresholdUrl: southForkSalmonPovertyEastAw,
    thresholdSupportUrl: southForkSalmonGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkSalmonPovertyEastAw,
    sourceLabel: "American Whitewater Poverty Flat to East Fork reach record",
    mapUrl: southForkSalmonPovertyEastMap,
    additionalSourceLinks: [
      { label: "American Whitewater Poverty Flat-to-East Fork reach", url: southForkSalmonPovertyEastAw },
      { label: "American Whitewater reach map and access coordinates", url: southForkSalmonPovertyEastMap },
      { label: "USGS South Fork Salmon River near Krassel direct gauge", url: southForkSalmonGauge },
      { label: "Payette National Forest seasonal spawning closure notice", url: southForkSalmonClosure },
      { label: "Poverty Flat Campground official access context", url: southForkSalmonPovertyFlat },
    ],
    putIn: {
      name: "Poverty Flat Campground footbridge",
      latitude: 44.821026,
      longitude: -115.703187,
      mileFromStart: 0,
      note: "American Whitewater's exact reach access point is the pack bridge at Poverty Flat Campground. Confirm campground/road status and use only the signed river landing.",
    },
    takeOut: {
      name: "East Fork / Secesh confluence access",
      latitude: 45.025749,
      longitude: -115.707025,
      mileFromStart: 19.62,
      note: "American Whitewater maps the downstream access at 19.62 miles for this East Fork-named reach; its logistics text places the road-end access near the Secesh confluence. Verify the exact landing and road conditions in the field because this is a remote access/parking anchor, not a surveyed ramp.",
    },
    camping:
      "Poverty Flat Campground is an endpoint staging option when open. No overnight river itinerary is assumed; use only current Forest Service campgrounds and posted rules along the South Fork Road.",
    campingClassification: "endpoint_campground",
    shuttle:
      "South Fork Road (FR 474) parallels the reach and allows roadside scouting, but the drive is remote with one-lane sections, seasonal snow, and limited communications. Stage the take-out first and carry a satellite communicator.",
    permits:
      "Check Payette National Forest/Krassel Ranger District rules, the seasonal spawning closure, current road notices, fire restrictions, and Idaho AIS/PFD requirements before launching.",
    watchFor: ["Teapot Hot Springs high-water canyon", "wood across the channel", "cold water", "seasonal spawning closure", "remote road access"],
    season: [6, 7],
    imageUrl: salmonImage,
    imageLabel: "Salmon River watershed context photograph; South Fork endpoint not depicted",
  }),
  makeRoute({
    id: "south-fork-salmon-secesh-confluence-vinegar",
    riverId: "south-fork-salmon-river-idaho",
    name: "South Fork Salmon River",
    reach: "Secesh Confluence to Vinegar Creek",
    region: "Central Idaho / Payette National Forest",
    routeType: "whitewater",
    summary:
      "A 36-mile Class IV-V South Fork Salmon expedition from the Secesh confluence to the Vinegar Creek exit, normally run as a self-sufficient multi-day trip.",
    statusText:
      "Threshold-documented planning expedition. American Whitewater identifies the named 36-mile reach, direct Krassel gauge, Secesh launch, Vinegar Creek take-out, and Forest Service permit; trip reports document good mixed-group runs around 3.2-3.4 ft and a practical low-water floor near 2 ft, but no formal numeric correlation is published.",
    distance: "About 36 river miles, usually split into 2-4 day sections",
    time: "About 2-4 days, self-supported",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the reach Class IV-V and describes Devil Creek, Surprise, Elk Creek, Fall Creek, and other consequential features. This is an expert expedition requiring a proven crew, rescue systems, cold-water protection, satellite communication, and evacuation planning.",
      "Trip reports describe 3.2-3.4 ft as a good level for a mixed kayak/packraft group, while a 1.65 ft report required repeated scraping and portages and called 2 ft a personal practical floor. Treat these as community stage cues, not a guarantee for every rapid.",
      "The standard Vinegar Creek take-out requires a further 20-mile paddle on the Main Salmon unless a flight or Carey Creek exit is arranged. Confirm permit tags, downstream take-out logistics, and the Main Salmon permit boundary before launch.",
      "The South Fork Salmon spawning closure applies to the connected upper reach and current Forest Service restrictions, fire rules, road conditions, wood, trend, weather, and same-day scouting override any stage cue.",
    ],
    gauge: "13310700",
    gaugeName: "South Fork Salmon River near Krassel Ranger Station, ID",
    gaugeKind: "direct",
    gaugeMetric: "gage_height_ft",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 2, idealMin: 3.2 },
    thresholdLabel: "Krassel stage trip-report cues: about 2 ft practical floor; 3.2-3.4 ft documented good mixed-group runs",
    thresholdUrl: southForkSalmonExpeditionAw,
    thresholdSupportUrl: southForkSalmonGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: southForkSalmonExpeditionAw,
    sourceLabel: "American Whitewater South Fork Salmon expedition reach record",
    mapUrl: southForkSalmonExpeditionMap,
    additionalSourceLinks: [
      { label: "American Whitewater South Fork Salmon expedition reach", url: southForkSalmonExpeditionAw },
      { label: "American Whitewater reach map and exact endpoint coordinates", url: southForkSalmonExpeditionMap },
      { label: "USGS South Fork Salmon River near Krassel direct gauge", url: southForkSalmonGauge },
      { label: "Forest Service South Fork Salmon permit document", url: southForkSalmonPermit },
      { label: "Payette National Forest permit and closure page", url: southForkSalmonClosure },
      { label: "Vinegar Creek Main Salmon access context", url: mainSalmonVinegarSource },
    ],
    putIn: {
      name: "Secesh Confluence put-in",
      latitude: 45.025746,
      longitude: -115.707055,
      mileFromStart: 0,
      note: "American Whitewater maps the launch on river left just downstream of the Secesh/South Fork confluence at the end of the road. Confirm the road, parking, carry, and current access before loading boats.",
    },
    takeOut: {
      name: "Vinegar Creek access / Main Salmon exit",
      latitude: 45.459571,
      longitude: -115.893328,
      mileFromStart: 35.48,
      note: "American Whitewater identifies Vinegar Creek as the standard exit; the route description notes a further 20-mile Main Salmon paddle unless a flight or Carey Creek plan is arranged. Confirm the permitted take-out and downstream logistics.",
    },
    camping:
      "This is a self-supported multi-day wilderness expedition. Use only legal river camps and current Forest Service permit/camp rules; no specific camp itinerary is implied by this route card.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Road access ends at the Secesh confluence. The standard Vinegar Creek exit leaves a long Main Salmon paddle-out; arrange a full expedition shuttle, Carey Creek alternative, or approved flight before launch.",
    permits:
      "A Forest Service permit is required for the South Fork Salmon expedition and downstream Main Salmon exit. Check the current McCall Ranger District permit process, spawning closure, fire restrictions, AIS/PFD requirements, and road status.",
    watchFor: ["Devil Creek Rapid", "Elk Creek and Fall Creek sequences", "mobile wood", "cold-water swims", "Vinegar Creek/Main Salmon exit boundary"],
    season: [6, 7],
    imageUrl: salmonImage,
    imageLabel: "Salmon River watershed context photograph; South Fork expedition not depicted",
  }),
  makeRoute({
    id: "johnson-creek-yellow-pine-airport-gauge",
    riverId: "johnson-creek-idaho",
    name: "Johnson Creek",
    reach: "Yellow Pine Airport to Johnson Creek gauge",
    region: "Central Idaho / Yellow Pine",
    routeType: "whitewater",
    summary:
      "A 5-mile Class II(III) Johnson Creek run from the public-use airstrip access south of Yellow Pine to the USGS gauge, with continuous Class II and a few scoutable Class III boulder sections.",
    statusText:
      "Gauge-scored Johnson Creek route. American Whitewater identifies the airport-to-gauge reach and the road provides scouting and portage options; the remote airstrip launch, fish weir, wood, and cold water require current on-site confirmation.",
    distance: "About 5 river miles",
    time: "About 2-4 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "access_uncertain"],
    safety: [
      "American Whitewater notes continuous Class II with two or three Class III boulder zones. Scout from Johnson Creek Road and portage any wood, fish-weir structure, or rapid that is not cleanly visible.",
      "The airport-side launch is a staging point rather than a developed boat ramp. Keep clear of aircraft operations, do not block the airstrip or campground, and confirm current land-manager permission before carrying to the creek.",
      "Use 450 cfs as a conservative low-water floor, about 600 cfs as the published optimal cue, and 1,500 cfs as the high-water limit. Verify the direct gauge, road condition, fire restrictions, and emergency communications before committing.",
    ],
    gauge: "13313000",
    gaugeName: "Johnson Creek at Yellow Pine, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 450, idealMin: 550, idealMax: 650, tooHigh: 1500 },
    thresholdLabel:
      "Johnson Creek flow table: 450 cfs low, 600 cfs optimal, 1,500 cfs high",
    thresholdUrl: johnsonCreekFlowTable,
    thresholdSupportUrl: johnsonCreekThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: johnsonCreekThreshold,
    sourceLabel: "American Whitewater Johnson Creek Yellow Pine reach record",
    mapUrl: johnsonCreekAirportSource,
    additionalSourceLinks: [
      { label: "American Whitewater Johnson Creek reach", url: johnsonCreekThreshold },
      { label: "Johnson Creek flow table and gauge cues", url: johnsonCreekFlowTable },
      { label: "USGS Johnson Creek at Yellow Pine direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13313000/" },
      { label: "Johnson Creek Airport facilities directory", url: johnsonCreekAirportSource },
      { label: "Yellow Pine Campground information", url: johnsonCreekCampgroundSource },
    ],
    putIn: {
      name: "Johnson Creek Airport access staging point",
      latitude: 44.911722,
      longitude: -115.485528,
      mileFromStart: 0,
      note: "Public-use Johnson Creek Airport (3U2) has an adjacent campground and creek corridor, but this is not a guaranteed boat ramp. Coordinate with the airport caretaker, keep clear of aircraft operations, and confirm a lawful carry to the water.",
    },
    takeOut: {
      name: "Johnson Creek USGS gauge access",
      latitude: 44.961667,
      longitude: -115.5,
      mileFromStart: 5,
      note: "Gauge-area endpoint near Yellow Pine; use only a signed or manager-designated pullout and do not climb gauge infrastructure. Confirm the exact landing on site.",
    },
    access: [
      {
        name: "Johnson Creek Airport access staging point",
        latitude: 44.911722,
        longitude: -115.485528,
        mileFromStart: 0,
        note: "Airstrip/campground staging only; verify aircraft activity, parking, and carry route before launch.",
      },
      {
        name: "Yellow Pine Campground shoreline option",
        latitude: 44.95408,
        longitude: -115.49662,
        mileFromStart: 4.3,
        note: "Developed Forest Service campground near Johnson Creek; use only if the current manager allows a landing and do not cross occupied campsites.",
      },
      {
        name: "Johnson Creek USGS gauge access",
        latitude: 44.961667,
        longitude: -115.5,
        mileFromStart: 5,
        note: "Gauge-area endpoint; exact landing and vehicle pullout require on-site confirmation.",
      },
    ],
    camping:
      "Johnson Creek Airport has adjacent fly-in camping, and Yellow Pine Campground is a developed Forest Service option near the lower reach; verify seasonal opening, fees, aircraft activity, and current fire rules.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Johnson Creek Road follows the corridor and supports scouting and a short vehicle shuttle, but access is remote, narrow, and subject to seasonal road and fire restrictions.",
    permits:
      "No river permit is listed. Follow Boise/Payette National Forest and airport rules, Idaho AIS/PFD requirements, fire restrictions, and any posted aircraft or fishery closures.",
    watchFor: ["fish weir near the upper access", "Class III boulder gardens", "wood and strainers", "aircraft operations at 3U2", "remote road and limited cell service"],
    season: [5, 6, 7, 8],
    imageUrl: salmonImage,
    imageLabel: "South Fork Salmon / Johnson Creek watershed context photograph",
  }),
  makeRoute({
    id: "henrys-fork-upper-coffee-pot-mccrea",
    riverId: "henrys-fork-idaho",
    name: "Henrys Fork",
    reach: "Upper Coffee Pot Campground to McCrea Bridge Campground",
    region: "Eastern Idaho / Island Park",
    routeType: "whitewater",
    summary:
      "A 6-mile Class II-III Henrys Fork itinerary linking the Upper Coffee Pot campground access, the Coffee Pot Rapids, and the paved McCrea Bridge campground ramp.",
    statusText:
      "Gauge-scored Upper Henrys Fork route. American Whitewater identifies the campground-to-campground itinerary and a continuous Class III Coffee Pot rapid section; the Upper Snake basin inventory places Coffee Pot flows around 1,000-2,000 cfs.",
    distance: "About 6 river miles",
    time: "About 2-4 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "dam_release", "access_uncertain"],
    safety: [
      "The first mile is a calm campground float before Coffee Pot Rapids become continuous Class III water; scout the whole rapid chain from the river-left trail before committing.",
      "American Whitewater reports occasional wood and warns that a damaged footbridge or plank can create a serious entrapment or puncture hazard. Carry rescue equipment and use a whitewater-capable craft.",
      "Use 1,000-2,000 cfs as a conservative planning band. Check the direct gauge, dam-release notices, campground openings, and the downstream mandatory take-out at McCrea before launch.",
    ],
    gauge: "13042500",
    gaugeName: "Henrys Fork near Island Park, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1000, idealMax: 2000, tooHigh: 2000 },
    thresholdLabel: "Upper Snake basin inventory planning band for Coffee Pot: 1,000-2,000 cfs",
    thresholdUrl: henrysCoffeePotThreshold,
    thresholdSupportUrl: henrysBoxThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: henrysCoffeePotThreshold,
    sourceLabel: "American Whitewater Big Springs / Coffee Pot reach record",
    mapUrl: henrysBoxAccessMap,
    additionalSourceLinks: [
      { label: "American Whitewater Big Springs/Coffee Pot reach", url: henrysCoffeePotThreshold },
      { label: "Upper Snake basin boating inventory", url: henrysBoxThreshold },
      { label: "Henrys Fork Foundation upper-river access map", url: henrysBoxAccessMap },
      { label: "USGS Henrys Fork near Island Park direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13042500/" },
      { label: "Upper Coffee Pot campground information", url: "https://www.fs.usda.gov/recarea/ctnf/recarea/?recid=81108" },
    ],
    putIn: {
      name: "Upper Coffee Pot Campground Put-In",
      latitude: 44.491111,
      longitude: -111.366111,
      mileFromStart: 0,
      note: "Named Caribou-Targhee National Forest campground access; the carry to the river is a facility anchor and must be confirmed open and lawful.",
    },
    takeOut: {
      name: "McCrea Bridge Campground Take-Out",
      latitude: 44.461326,
      longitude: -111.400613,
      mileFromStart: 6,
      note: "Named Forest Service campground with paved boat ramp, parking, and restroom; take out here before the Island Park Reservoir transition.",
    },
    access: [
      {
        name: "Upper Coffee Pot Campground Put-In",
        latitude: 44.491111,
        longitude: -111.366111,
        mileFromStart: 0,
        note: "Seasonal Forest Service campground staging area; verify the carry trail and avoid blocking campers.",
      },
      {
        name: "McCrea Bridge Campground Take-Out",
        latitude: 44.461326,
        longitude: -111.400613,
        mileFromStart: 6,
        note: "Paved Forest Service boat ramp with 15+ parking spaces and restroom per the Henrys Fork access map.",
      },
    ],
    camping:
      "Upper Coffee Pot and McCrea Bridge are developed Forest Service campgrounds when open; reserve or verify seasonal status and use designated sites only.",
    campingClassification: "endpoint_campground",
    shuttle: "Short Island Park shuttle using Upper Coffee Pot Road and local Forest Service roads; stage McCrea first and account for seasonal gates.",
    permits: "No river permit is listed. Follow Caribou-Targhee National Forest campground rules, Idaho AIS/PFD requirements, dam safety closures, and posted parking/fee notices.",
    watchFor: ["Coffee Pot Rapids continuous Class III chain", "dam-release changes", "wood or damaged footbridge debris", "Island Park Reservoir transition"],
    season: [5, 6, 7, 8, 9],
    imageUrl: henrysImage,
    imageLabel: "Henrys Fork / Henrys Lake watershed context photograph",
  }),

  makeRoute({
    id: "henrys-fork-box-canyon-last-chance",
    riverId: "henrys-fork-idaho",
    name: "Henrys Fork",
    reach: "Box Canyon Campground to Last Chance Boat Ramp",
    region: "Eastern Idaho / Island Park",
    routeType: "whitewater",
    summary:
      "A 4-mile Class II tailwater float below Island Park Dam through the Box Canyon basalt corridor to the developed Last Chance ramp.",
    statusText:
      "Gauge-scored Box Canyon route. The Upper Snake River basin inventory and current paddling guidance both place the beginner-friendly run around 1,000-2,000 cfs; dam releases can change quickly, and the canyon has swift current and limited shoreline exits.",
    distance: "About 4 river miles",
    time: "About 1-2 hours plus shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "dam_release", "access_uncertain"],
    safety: [
      "Launch only below Island Park Dam at the Box Canyon access; never approach the dam structure or enter closed shoreline areas.",
      "The confined basalt canyon has fast current, deep water, and limited walk-out options. Use a properly fitted PFD, cold-water protection, and a craft appropriate for Class II water.",
      "Use 1,000-2,000 cfs as a conservative operating band, check the live gauge and dam-release notices, and take out at Last Chance before the downstream Railroad Ranch reach.",
    ],
    gauge: "13042500",
    gaugeName: "Henrys Fork near Island Park, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1000, idealMax: 2000, tooHigh: 2000 },
    thresholdLabel: "Upper Snake basin inventory and current Box Canyon guidance: 1,000-2,000 cfs",
    thresholdUrl: henrysBoxThreshold,
    thresholdSupportUrl: henrysBoxFlowGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: henrysBoxThreshold,
    sourceLabel: "Idaho Upper Snake River Basin boating inventory",
    mapUrl: henrysBoxAccessMap,
    additionalSourceLinks: [
      { label: "Henrys Fork Foundation upper-river access map", url: henrysBoxAccessMap },
      { label: "Box Canyon flow and route guidance", url: henrysBoxFlowGuide },
      { label: "USGS Henrys Fork near Island Park direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13042500/" },
      { label: "How's Your River Henrys Fork access/run index", url: "https://www.howsyourriver.com/access_sites/fun-farm-bridge" },
    ],
    putIn: {
      name: "Box Canyon Boat Ramp",
      latitude: 44.4145,
      longitude: -111.3918,
      mileFromStart: 0,
      note: "Named Caribou-Targhee National Forest ramp below Island Park Dam; confirm current gate, parking, and carry conditions.",
    },
    takeOut: {
      name: "Last Chance Boat Ramp",
      latitude: 44.370717,
      longitude: -111.402405,
      mileFromStart: 4,
      note: "Named Caribou-Targhee National Forest concrete-block ramp with parking and restroom; stop here before the downstream Railroad Ranch reach.",
    },
    access: [
      {
        name: "Box Canyon Boat Ramp",
        latitude: 44.4145,
        longitude: -111.3918,
        mileFromStart: 0,
        note: "Forest Service launch below Island Park Dam; verify the carry to water and current closure notices.",
      },
      {
        name: "Last Chance Boat Ramp",
        latitude: 44.370717,
        longitude: -111.402405,
        mileFromStart: 4,
        note: "Forest Service concrete-block take-out with 25+ parking spaces and restroom per the access map.",
      },
    ],
    camping:
      "Box Canyon Campground and nearby Forest Service sites provide a basecamp when open; Last Chance is a day-use take-out, not an on-route overnight site.",
    campingClassification: "nearby_basecamp",
    shuttle: "Short paved and Forest Service-road shuttle between Box Canyon and Last Chance; stage the take-out first and account for seasonal gates.",
    permits: "No river permit is listed. Follow Caribou-Targhee National Forest site rules, Idaho AIS/PFD requirements, dam safety closures, and posted parking/fee rules.",
    watchFor: ["Island Park Dam boundary", "swift confined current", "limited shoreline exits", "Last Chance mandatory take-out"],
    season: [5, 6, 7, 8, 9, 10],
    imageUrl: henrysImage,
    imageLabel: "Henrys Fork / Henrys Lake watershed context photograph",
  }),

  makeRoute({
    id: "lightning-creek-east-fork-clark-fork",
    riverId: "lightning-creek-idaho",
    name: "Lightning Creek",
    reach: "East Fork Creek to Highway 200 bridge at Clark Fork",
    region: "Idaho Panhandle / Bonner County",
    routeType: "whitewater",
    summary:
      "A roughly 10.1-mile spring Class III+/IV- creek run from the East Fork bridge through the Lightning Creek gorge to Clark Fork.",
    statusText:
      "Planning-only direct-gauge route. American Whitewater and North Idaho Rivers describe a continuous Class III+/IV- run with serious, mobile wood and a public Highway 200 bridge take-out. North Idaho Rivers gives a 900 cfs minimum on the Lightning Creek at Clark Fork gauge; exact upper access, road condition, and wood status require same-day confirmation.",
    distance: "About 10.1 river miles",
    time: "About 3-6 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "strainers",
      "cold_water",
      "low_water",
      "fast_rise",
      "access_uncertain",
      "private_banks",
    ],
    safety: [
      "American Whitewater calls Lightning a continuous Class III run with Class V consequences and says difficulty increases with water level. North Idaho Rivers describes the upper gorge as Class III+/IV- and warns that logs move frequently; scout every blind horizon line and never run without a wood-portage plan.",
      "Use 900 cfs as the local minimum planning cue on USGS 12392155. The gauge is at the lower Highway 200 bridge, while upper inflow and rapidly rising spring water can change the reach; local wood, channel choice, and trend override the numeric cue.",
      "The East Fork put-in is an unmarked bridge/roadside access reached by Lightning Creek Road, and the lower section braids through shifting channels. Confirm lawful parking, road repairs, private frontage, and a safe carry at both ends before committing.",
    ],
    gauge: "12392155",
    gaugeName: "Lightning Creek at Clark Fork, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 900, idealMin: 900 },
    thresholdLabel:
      "North Idaho Rivers Lightning Creek guidance: 900 cfs minimum on the Clark Fork gauge; spring March-April window",
    thresholdUrl: lightningCreekGuide,
    thresholdSupportUrl: lightningCreekThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lightningCreekThreshold,
    sourceLabel: "American Whitewater Lightning Creek East Fork-to-Clark Fork reach record",
    mapUrl: lightningCreekGuide,
    additionalSourceLinks: [
      { label: "North Idaho Rivers Lightning Creek flow and access guide", url: lightningCreekGuide },
      { label: "USGS Lightning Creek at Clark Fork gauge", url: lightningCreekGauge },
      { label: "Idaho Transportation Department Highway 200 milepoint log", url: lightningCreekAccessGuide },
      { label: "American Whitewater Lightning Creek reach", url: lightningCreekThreshold },
      { label: "USGS Lightning Creek station metadata", url: "https://waterdata.usgs.gov/monitoring-location/USGS-12392155/" },
      { label: "Idaho Fish and Game Lightning Creek water page", url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1161909481397" },
    ],
    putIn: {
      name: "East Fork Creek bridge / Lightning Creek Road",
      latitude: 48.258,
      longitude: -116.077,
      mileFromStart: 0,
      note: "North Idaho Rivers identifies the unmarked East Fork bridge about eight miles up Lightning Creek Road. This is an approximate roadside/stream-crossing anchor; confirm current road repairs, legal parking, and the carry to water.",
    },
    takeOut: {
      name: "Highway 200 Lightning Creek bridge, Clark Fork",
      latitude: 48.150885,
      longitude: -116.183309,
      mileFromStart: 10.1,
      note: "North Idaho Rivers identifies paved parking at the Highway 200 bridge; the USGS gauge is immediately upstream. Confirm the current river-side landing, traffic, parking, and any bridge-construction restrictions.",
    },
    access: [
      {
        name: "East Fork Creek bridge / Lightning Creek Road",
        latitude: 48.258,
        longitude: -116.077,
        mileFromStart: 0,
        note: "Approximate unmarked forest-road bridge access; not a surveyed ramp.",
      },
      {
        name: "Highway 200 Lightning Creek bridge, Clark Fork",
        latitude: 48.150885,
        longitude: -116.183309,
        mileFromStart: 10.1,
        note: "Paved bridge parking and gauge-area endpoint; verify a safe water exit rather than treating the bridge as an automatic ramp.",
      },
    ],
    camping:
      "Lightning Creek Road has dispersed Forest Service camping near the upper approach, but no endpoint campground is assumed. Confirm current Kaniksu National Forest road, fire, sanitation, and private-property rules; stage a day run rather than relying on an unverified riverside site.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage at the Highway 200 bridge in Clark Fork, then drive Lightning Creek Road roughly eight miles to the East Fork bridge. Road repairs, seasonal closures, and rough crossings can change the shuttle; use a high-clearance vehicle and do not block the unmarked bridge.",
    permits:
      "Follow Idaho boating/PFD and invasive-species requirements, Idaho Panhandle National Forest road and camping rules, current Highway 200/Lightning Creek Road closures, and private-bank boundaries. Respect posted bridge, road, and construction controls.",
    watchFor: [
      "continuous Class III+/IV- gorge water",
      "river-wide mobile wood and mandatory portages",
      "shifting braided lower channels",
      "900 cfs minimum planning cue",
      "spring snowmelt and rapidly rising gauge",
      "unmarked East Fork bridge access",
    ],
    season: [3, 4],
    imageUrl: stJoeImage,
    imageLabel: "North Idaho Panhandle river context photograph; not a Lightning Creek endpoint image",
  }),

  makeRoute({
    id: "fall-river-cave-falls-concrete",
    riverId: "fall-river-idaho",
    name: "Fall River",
    reach: "Cave Falls Campground to Concrete CCC Bridge (Cave Falls Run)",
    region: "Eastern Idaho / Yellowstone border",
    routeType: "whitewater",
    summary:
      "A 14.7-mile Class III-IV(V) adventure run from Cave Falls Campground to the Concrete CCC Bridge, with named portage/scout features and a direct Squirrel gauge.",
    statusText:
      "Gauge-scored expert route. American Whitewater identifies the named Cave Falls-to-Concrete reach and reports that most locals wait for more than 1,500 cfs at the Squirrel gauge. Sheep Falls is a Class V+ main line with a Class IV+ side channel; grizzly country, wood, diversion dams, and the Yellowstone boundary make scouting and portage decisions mandatory.",
    distance: "About 14.7 river miles",
    time: "About 5-8 hours plus shuttle, scouting, and portages",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "waterfall", "portage", "strainers", "cold_water", "wildlife", "access_uncertain"],
    safety: [
      "American Whitewater rates the reach Class III-IV with a standout Class V feature at Sheep Falls. The main Sheep Falls line is Class V+; use the right-side Class IV+ channel only after a careful scout, or portage on the established right-bank trail.",
      "Most locals reportedly wait for more than 1,500 cfs on the direct Fall River near Squirrel gauge. Treat that as a community flow floor, not a guarantee: higher water increases the consequences at the bedrock ledge, Sheep Falls, diversion dams, and wood.",
      "Cave Falls itself is upstream in Yellowstone National Park and is not a paddling objective. Launch only at the named campground, obey current Forest Service/NPS boundary rules, and carry bear-safe food storage in grizzly habitat.",
      "The route contains multiple diversion structures and a mandatory downstream exit at the Concrete CCC Bridge. Confirm the bridge landing, road access, and current wood before committing; do not continue into the separate lower Fall River reach without a new plan.",
    ],
    gauge: "13047500",
    gaugeName: "Fall River near Squirrel, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 1500, idealMin: 1500 },
    thresholdLabel:
      "American Whitewater local guidance: most boaters wait until the Squirrel gauge is above 1,500 cfs; no hard high-flow cutoff published",
    thresholdUrl: upperFallRiverReach,
    thresholdSupportUrl: fallRiverGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperFallRiverReach,
    sourceLabel: "American Whitewater Cave Falls Run reach record",
    mapUrl: caveFallsCampgroundSource,
    additionalSourceLinks: [
      { label: "American Whitewater Cave Falls Run reach and flow guidance", url: upperFallRiverReach },
      { label: "USGS Fall River near Squirrel direct gauge", url: fallRiverGauge },
      { label: "Cave Falls Campground access and grizzly precautions", url: caveFallsCampgroundSource },
      { label: "Idaho Fish and Game Fall River access-site index", url: fallRiverAccessGuide },
      { label: "Henrys Fork / Fall River access map context", url: fallRiverAccessMap },
      { label: "Caribou-Targhee National Forest recreation gateway", url: "https://www.fs.usda.gov/r04/caribou-targhee/recreation" },
    ],
    putIn: {
      name: "Cave Falls Campground Put-In",
      latitude: 44.13110694041538,
      longitude: -111.01426686449537,
      mileFromStart: 0,
      note: "American Whitewater's named campground launch just outside Yellowstone National Park. Confirm seasonal opening, road conditions, bear-storage rules, and the legal water entry before loading boats.",
    },
    takeOut: {
      name: "Concrete CCC Bridge Take-Out",
      latitude: 44.06775688888254,
      longitude: -111.24611103275933,
      mileFromStart: 14.7,
      note: "American Whitewater's named take-out at the lower-run put-in. Confirm bridge-side parking, carry path, and current landing conditions; do not drift into the lower route without a separate inspection.",
    },
    camping:
      "Cave Falls Campground is the documented endpoint campground when open; no overnight camping is assumed along the whitewater corridor. Use bear-resistant food storage and follow current Caribou-Targhee/Yellowstone boundary rules.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Long one-way shuttle from the Concrete CCC Bridge to Cave Falls via seasonal forest roads. Stage the downstream vehicle first, allow extra time for gravel-road conditions, and do not rely on cell service in the upper corridor.",
    permits:
      "Check current Caribou-Targhee and Yellowstone boundary notices, campground rules, Idaho AIS/PFD requirements, fire restrictions, grizzly precautions, and any seasonal road or closure controls before launch.",
    watchFor: ["Sheep Falls Class V+ main line", "right-bank Class IV+ side channel", "bedrock ledge", "diversion dams", "river wood", "grizzly country", "Concrete CCC mandatory take-out"],
    season: [5, 6, 7, 8],
    imageUrl: fallRiverImage,
    imageLabel: "Fall River / Henrys Fork basin context photograph",
  }),

  makeRoute({
    id: "fall-river-concrete-ccc-kirkham",
    riverId: "fall-river-idaho",
    name: "Fall River",
    reach: "Concrete CCC Bridge to Kirkham Bridge (Lower Run)",
    region: "Eastern Idaho / Henrys Fork basin",
    routeType: "whitewater",
    summary:
      "An 8.5-mile Class III-IV Fall River run with technical boulder rapids, a mid-run diversion dam, and predictable licensed recreation releases below the diversion.",
    statusText:
      "Scored route with a direct USGS gauge and an American Whitewater reach page that cites the licensed 650 cfs recreation minimum and 1,450 cfs spring flushing release. Treat the release values as planning shoulders, not a substitute for scouting the diversion, wood, and take-out.",
    distance: "About 8.5 river miles",
    time: "About 4-6 hours plus shuttle, portage, and scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "dam_release", "portage", "strainers", "cold_water", "access_uncertain"],
    safety: [
      "American Whitewater describes long Class III+ wave trains and technical Class III boulder rapids; run only with an experienced whitewater team, rescue equipment, and a conservative scout plan.",
      "Portage or carefully assess the diversion dam around two-thirds of the run. It can recirculate at high water and may contain wood; never assume a clean line from the road.",
      "The license requires 650 cfs daytime recreation flow around the July 4 weekend and 1,450 cfs spring flushing releases, but operations, weather, debris, and the kayak-only Kirkham take-out still control the decision.",
    ],
    gauge: "13047500",
    gaugeName: "Fall River near Squirrel, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 650, idealMin: 750, idealMax: 1450 },
    thresholdLabel: "Fall River licensed recreation minimum 650 cfs; 1,450 cfs spring flushing release",
    thresholdUrl: fallRiverThreshold,
    thresholdSupportUrl: fallRiverAccessGuide,
    thresholdSourceStrength: "official",
    scoreEligibility: "scored",
    sourceUrl: fallRiverThreshold,
    sourceLabel: "American Whitewater Fall River Lower Run reach and licensed flow guidance",
    mapUrl: fallRiverAccessGuide,
    additionalSourceLinks: [
      { label: "Idaho Fish and Game Fall River boating access site", url: fallRiverAccessGuide },
      { label: "Henrys Fork Angler Access map with Kirkham Bridge details", url: fallRiverAccessMap },
      { label: "Idaho protected-stream plan excerpt for Falls River", url: "https://maps.idwr.idaho.gov/StateProtectedStreams/Plan/Details?streamcode=HENFA2" },
      { label: "USGS Fall River near Squirrel direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13047500/" },
    ],
    putIn: {
      name: "Concrete CCC Bridge Put-In",
      latitude: 44.06972,
      longitude: -111.25917,
      mileFromStart: 0,
      note: "American Whitewater access anchor at the Concrete CCC Bridge area; bridge-side staging is approximate and must be confirmed on site.",
    },
    takeOut: {
      name: "Kirkham Bridge Take-Out",
      latitude: 44.057049,
      longitude: -111.358946,
      mileFromStart: 8.5,
      note: "County-road easement / unpaved boatslide at Kirkham Bridge; kayak take-out only is described, while rafts require the separate upstream drag-out option.",
    },
    camping:
      "The documented endpoints are day-use access points. Use lawful lodging or a developed campground in the Ashton/Henrys Fork area; no on-route camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage at Kirkham Bridge and shuttle via Highway 47 and local county roads. The take-out is not a simple raft ramp, so verify vehicle access and boat-drag logistics before launching.",
    permits:
      "Follow Idaho Fish and Game access rules, private-property signs, Idaho AIS/PFD requirements, fire restrictions, and current hydropower release or road notices.",
    watchFor: ["long Class III+ wave trains", "diversion dam and recirculation", "wood and undercut banks", "cold water", "Kirkham kayak-only take-out"],
    season: [5, 6, 7],
    imageUrl: fallRiverImage,
    imageLabel: "Henrys Fork basin context photograph used for Fall River",
  }),

  makeRoute({
    id: "south-fork-snake-palisades-dam-spring-creek",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Palisades Dam to Spring Creek",
    region: "Eastern Idaho / Swan Valley",
    routeType: "recreational",
    summary:
      "A 12.2-mile dam-tailwater float between two designated interagency concrete ramps.",
    statusText:
      "Gauge-scored cold-water tailwater. Launch below all dam restrictions and verify Palisades releases, the seasonal facility pass, and current fire or access notices.",
    distance: "12.2 river miles",
    time: "About 4-6 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["dam", ...snakeHazards],
    safety: [
      ...commonSnakeSafety,
      "Remain below the dam exclusion and never approach outlet works or buoyed restrictions.",
    ],
    gauge: "13032500",
    gaugeName: "Snake River near Irwin, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 2000,
      idealMin: 6000,
      idealMax: 8000,
      tooHigh: 15000,
    },
    thresholdLabel:
      "RiverBrain 1,500-15,000 cfs route band, tightened to the IDFG 2,000 cfs Spring Creek access floor; 6,000-8,000 cfs ideal band derived around the published 7,000 cfs average",
    thresholdUrl: southForkThresholdGuide,
    thresholdSupportUrl: southForkSpringAccessThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    mapUrl: southForkGuide,
    putIn: {
      name: "Palisades Dam tailwater boat ramp",
      latitude: 43.332803,
      longitude: -111.202003,
      mileFromStart: 0,
      note: "USFS concrete ramp below Palisades Dam; verify the signed launch and dam exclusion.",
    },
    takeOut: {
      name: "Spring Creek boat ramp",
      latitude: 43.449998,
      longitude: -111.39834,
      mileFromStart: 12.2,
      note: "USFS concrete ramp and restroom identified by BLM river mile 12.2.",
    },
    camping:
      "No on-route camping assumed. Palisades Dam campground is an endpoint basecamp subject to current Forest Service status.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Long Highway 26 shuttle; stage the Spring Creek vehicle before launching and do not leave vehicles outside designated parking.",
    permits:
      "Seasonal interagency facility pass/fee, Idaho invasive-species sticker when applicable, one approved PFD per person, and all posted dam rules.",
    watchFor: [
      "dam release changes",
      "cold water and wood",
      "facility pass and closure status",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),
  makeRoute({
    id: "south-fork-snake-spring-creek-conant",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Spring Creek to Conant",
    region: "Eastern Idaho / Swan Valley",
    routeType: "recreational",
    summary:
      "A short 2-mile access-to-access float ending at the primary canyon launch.",
    statusText:
      "Gauge-scored short float. Fire-area land closures can change independently; verify the current BLM advisory and the signed Conant access before launch.",
    distance: "2.0 river miles",
    time: "About 1 hour",
    difficulty: "moderate",
    risk: "caution",
    hazards: [...snakeHazards, "mandatory_takeout"],
    safety: [
      ...commonSnakeSafety,
      "Conant is mandatory for this short card; continuing downstream commits the party to the remote 24.8-mile canyon reach.",
    ],
    gauge: "13032500",
    gaugeName: "Snake River near Irwin, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 2000,
      idealMin: 6000,
      idealMax: 8000,
      tooHigh: 15000,
    },
    thresholdLabel:
      "RiverBrain 1,500-15,000 cfs route band, tightened to the IDFG 2,000 cfs Spring Creek access floor; 6,000-8,000 cfs ideal band derived around the published 7,000 cfs average",
    thresholdUrl: southForkThresholdGuide,
    thresholdSupportUrl: southForkSpringAccessThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    mapUrl: southForkAdvisories,
    putIn: {
      name: "Spring Creek boat ramp",
      latitude: 43.449998,
      longitude: -111.39834,
      mileFromStart: 0,
      note: "USFS concrete ramp.",
    },
    takeOut: {
      name: "Conant Boat Access",
      latitude: 43.463694,
      longitude: -111.426884,
      mileFromStart: 2,
      note: "BLM concrete ramp/raft launch. The BLM facility page coordinate appears to duplicate Spring Creek, so this mapped ramp position must be confirmed against the signed site.",
    },
    camping:
      "No camping at Conant. This short card does not include a canyon campsite.",
    campingClassification: "none",
    shuttle:
      "Very short local shuttle; confirm Conant is open for take-out before launching.",
    permits:
      "Self-issue river registration and seasonal facility pass/fee as posted; Idaho invasive-species and PFD rules apply.",
    watchFor: [
      "mandatory Conant take-out for this card",
      "current fire-area land advisories",
      "roller-coaster waves and gravel bars",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),
  makeRoute({
    id: "south-fork-snake-conant-byington",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Conant to Byington",
    region: "Eastern Idaho / South Fork Canyon",
    routeType: "whitewater",
    summary:
      "The official 24.8-mile South Fork canyon itinerary between the primary BLM raft launch and Byington.",
    statusText:
      "Advanced gauge-scored canyon trip. BLM lifted the August 2026 river-camping closure, but some Big Rock fire-area lands remain closed; verify current advisories, ramp access, camp availability, releases, and daylight before committing.",
    distance: "24.8 river miles",
    time: "One very long day or a permitted overnight",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", ...snakeHazards, "remote", "mandatory_takeout"],
    safety: [
      ...commonSnakeSafety,
      "The canyon has limited escape, turbulent water, remote camps, and long response times. Carry rescue, repair, first-aid, and emergency communication equipment.",
      "Take out at Byington; the Dry Beds Canal diversion lies 1.5 miles downstream and requires the north-bank line on a separate route card.",
    ],
    gauge: "13032500",
    gaugeName: "Snake River near Irwin, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 1500,
      idealMin: 6000,
      idealMax: 8000,
      tooHigh: 15000,
    },
    thresholdLabel:
      "RiverBrain Palisades Dam-Lorenzo 1,500-15,000 cfs band; 6,000-8,000 cfs ideal band derived around the published 7,000 cfs average",
    thresholdUrl: southForkThresholdGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    mapUrl: southForkAdvisories,
    putIn: {
      name: "Conant Boat Access",
      latitude: 43.463694,
      longitude: -111.426884,
      mileFromStart: 0,
      note: "Developed BLM raft/boat launch; confirm the signed facility because the BLM page coordinate appears displaced upstream.",
    },
    takeOut: {
      name: "Byington Boat Access",
      latitude: 43.623056,
      longitude: -111.665556,
      mileFromStart: 24.8,
      note: "Developed BLM concrete ramp and canyon endpoint.",
    },
    access: [
      {
        name: "Conant Boat Access",
        latitude: 43.463694,
        longitude: -111.426884,
        mileFromStart: 0,
        note: "Developed public launch.",
      },
      {
        name: "Fullmer Boat Access",
        latitude: 43.598805,
        longitude: -111.49459,
        mileFromStart: 13.8,
        note: "USFS public access in the canyon; confirm current fire-area land status.",
      },
      {
        name: "Wolf Flat Boat Access",
        latitude: 43.596699,
        longitude: -111.616383,
        mileFromStart: 20.9,
        note: "BLM primitive bank launch; confirm road and site status before relying on it.",
      },
      {
        name: "Byington Boat Access",
        latitude: 43.623056,
        longitude: -111.665556,
        mileFromStart: 24.8,
        note: "Developed public endpoint.",
      },
    ],
    camping:
      "Overnight camping requires a free self-issue permit and is allowed only at designated river camps. Carry the required toilet and fire pan and obey current fire restrictions.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Long canyon shuttle on paved and local roads; stage at Byington and do not rely on closed fire-area roads or primitive ramps for evacuation.",
    permits:
      "Free self-issue overnight permit, designated camps only, portable toilet and fire pan for overnight use, seasonal facility fee/pass, Idaho invasive-species sticker when applicable, and PFDs.",
    watchFor: [
      "current Big Rock fire-area land closures",
      "remote Class II-III canyon water and wood",
      "mandatory Byington take-out for this card",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),
  makeRoute({
    id: "south-fork-snake-byington-heise",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Byington to Heise Bridge",
    region: "Eastern Idaho / Heise",
    routeType: "recreational",
    summary:
      "A short 2.8-mile lower-canyon float from the developed Byington ramp to Heise Bridge.",
    statusText:
      "Gauge-scored route with an extremely hazardous Dry Beds Canal diversion 1.5 miles below launch. Confirm current fire-area land advisories and use the north-bank line described by BLM.",
    distance: "2.8 river miles",
    time: "About 1-2 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["dam", ...lowerSnakeHazards],
    safety: [
      ...commonSnakeSafety,
      "BLM directs boaters to the north bank to avoid the Dry Beds Canal headgate, which captures nearly half the river.",
    ],
    gauge: "13032500",
    gaugeName: "Snake River near Irwin, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 1500,
      idealMin: 6000,
      idealMax: 8000,
      tooHigh: 15000,
    },
    thresholdLabel:
      "RiverBrain Palisades Dam-Lorenzo 1,500-15,000 cfs band; 6,000-8,000 cfs ideal band derived around the published 7,000 cfs average",
    thresholdUrl: southForkThresholdGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    mapUrl: southForkAdvisories,
    putIn: {
      name: "Byington Boat Access",
      latitude: 43.623056,
      longitude: -111.665556,
      mileFromStart: 0,
      note: "BLM concrete ramp at river mile 39.",
    },
    takeOut: {
      name: "Heise Bridge Boat Access",
      latitude: 43.645077,
      longitude: -111.701071,
      mileFromStart: 2.8,
      note: "Public concrete ramp/bank launch at river mile 41.8.",
    },
    camping:
      "Day trip; no camping at Byington. Use a currently open designated campground outside the route corridor.",
    campingClassification: "nearby_basecamp",
    shuttle: "Short paved-road shuttle; inspect Heise landing before launch.",
    permits:
      "Seasonal facility pass/fee where posted, Idaho invasive-species sticker when applicable, and PFD for each person.",
    watchFor: [
      "Dry Beds Canal diversion",
      "current fire-area land status",
      "swift current at Heise",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),
  makeRoute({
    id: "south-fork-snake-heise-twin-bridges",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Heise Bridge to Twin Bridges",
    region: "Eastern Idaho / Heise-Ririe",
    routeType: "recreational",
    summary:
      "A 4.4-mile braided lower South Fork section between public launches.",
    statusText:
      "Gauge-scored braided-river float. Inspect both ramps and stay alert for wood, bridge piers, fast current, and private banks.",
    distance: "4.4 river miles",
    time: "About 1.5-3 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: lowerSnakeHazards,
    safety: commonSnakeSafety,
    gauge: "13032500",
    gaugeName: "Snake River near Irwin, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 1500,
      idealMin: 6000,
      idealMax: 8000,
      tooHigh: 15000,
    },
    thresholdLabel:
      "RiverBrain Palisades Dam-Lorenzo 1,500-15,000 cfs band; 6,000-8,000 cfs ideal band derived around the published 7,000 cfs average",
    thresholdUrl: southForkThresholdGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    putIn: {
      name: "Heise Bridge Boat Access",
      latitude: 43.645077,
      longitude: -111.701071,
      mileFromStart: 0,
      note: "Concrete ramp/bank launch at river mile 41.8.",
    },
    takeOut: {
      name: "Twin Bridges Boat Access",
      latitude: 43.672691,
      longitude: -111.768504,
      mileFromStart: 4.4,
      note: "Madison County concrete ramp, restroom, picnic, and camping at river mile 46.2.",
    },
    camping:
      "Twin Bridges has endpoint camping; verify county rules, capacity, and current status.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Short county-road shuttle; stage at Twin Bridges and keep clear of ramp traffic.",
    permits:
      "Current facility fee/pass where posted, invasive-species sticker when applicable, and PFD for each person.",
    watchFor: [
      "braided channels and wood",
      "bridge piers",
      "swift main channel near Twin Bridges",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),
  makeRoute({
    id: "south-fork-snake-twin-bridges-lorenzo",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Twin Bridges to Lorenzo",
    region: "Eastern Idaho / Rexburg-Menan",
    routeType: "recreational",
    summary:
      "A 7.5-mile braided South Fork float from the county campground ramp to BLM Lorenzo.",
    statusText:
      "Gauge-scored route. The main channel can be fast and the lower river contains diversions; use the mapped public Lorenzo ramp, not the former landing or an informal bank.",
    distance: "7.5 river miles",
    time: "About 2.5-4 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: lowerSnakeHazards,
    safety: commonSnakeSafety,
    gauge: "13032500",
    gaugeName: "Snake River near Irwin, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 1500,
      idealMin: 6000,
      idealMax: 8000,
      tooHigh: 15000,
    },
    thresholdLabel:
      "RiverBrain Palisades Dam-Lorenzo 1,500-15,000 cfs band; 6,000-8,000 cfs ideal band derived around the published 7,000 cfs average",
    thresholdUrl: southForkThresholdGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    putIn: {
      name: "Twin Bridges Boat Access",
      latitude: 43.672691,
      longitude: -111.768504,
      mileFromStart: 0,
      note: "Madison County developed launch.",
    },
    takeOut: {
      name: "Lorenzo Boat Access",
      latitude: 43.736667,
      longitude: -111.881389,
      mileFromStart: 7.5,
      note: "BLM concrete ramp at the current signed location.",
    },
    camping:
      "No camping at Lorenzo; Twin Bridges is an endpoint campground subject to county rules.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Local road shuttle; confirm which signed Lorenzo access road is current.",
    permits:
      "Facility fee/pass where posted, invasive-species sticker when applicable, and PFD for each person.",
    watchFor: [
      "channel splits and wood",
      "diversion structures",
      "correct Lorenzo take-out",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),
  makeRoute({
    id: "south-fork-snake-lorenzo-menan",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Lorenzo to Menan",
    region: "Eastern Idaho / Menan Buttes",
    routeType: "recreational",
    summary:
      "An 8.5-mile lower South Fork float linking two designated concrete ramps.",
    statusText:
      "Planning-only lower-river route. Expect private banks, diversions, wood, and changing channels; inspect the narrow Menan ramp and underwater hazards before launch.",
    distance: "8.5 river miles",
    time: "About 3-5 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: lowerSnakeHazards,
    safety: commonSnakeSafety,
    gauge: "13037500",
    gaugeName: "Snake River near Heise, ID",
    thresholdLabel: "BLM South Fork access and safety guidance",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    putIn: {
      name: "Lorenzo Boat Access",
      latitude: 43.736667,
      longitude: -111.881389,
      mileFromStart: 0,
      note: "BLM concrete ramp.",
    },
    takeOut: {
      name: "Menan Boat Access",
      latitude: 43.751389,
      longitude: -111.979444,
      mileFromStart: 8.5,
      note: "Narrow public concrete ramp; BLM warns of swift current and underwater hazards.",
    },
    camping:
      "No endpoint camping assumed; use an established nearby campground or lodging base.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage the Menan vehicle and inspect the narrow landing before driving to Lorenzo.",
    permits:
      "Facility fee/pass where posted, invasive-species sticker when applicable, and PFD for each person.",
    watchFor: [
      "irrigation diversions",
      "swift Menan landing current",
      "private banks and strainers",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),
  makeRoute({
    id: "south-fork-snake-menan-mike-walker",
    riverId: "south-fork-snake-river-idaho",
    name: "South Fork Snake River",
    reach: "Menan to Mike Walker",
    region: "Eastern Idaho / Menan-Jefferson County",
    routeType: "recreational",
    summary:
      "A 15.4-mile full-day lower South Fork float ending at the Jefferson County access.",
    statusText:
      "Planning-only full-day route. Multiple diversions, private banks, long braided bends, and a mandatory developed take-out make advance scouting and a conservative daylight cutoff essential.",
    distance: "15.4 river miles",
    time: "About 5-8 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: lowerSnakeHazards,
    safety: commonSnakeSafety,
    gauge: "13037500",
    gaugeName: "Snake River near Heise, ID",
    thresholdLabel: "BLM South Fork access and safety guidance",
    sourceUrl: southForkGuide,
    sourceLabel: "BLM South Fork Snake River boating guide",
    putIn: {
      name: "Menan Boat Access",
      latitude: 43.751389,
      longitude: -111.979444,
      mileFromStart: 0,
      note: "Public concrete ramp at river mile 62.2.",
    },
    takeOut: {
      name: "Mike Walker Boat Access",
      latitude: 43.721652,
      longitude: -112.085528,
      mileFromStart: 15.4,
      note: "Jefferson County developed ramp/camp at river mile 77.6; take out before downstream diversion constraints.",
    },
    camping:
      "Mike Walker has endpoint camping; verify county availability, rules, and current access.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Long rural-road shuttle; stage at Mike Walker and verify the ramp before launch.",
    permits:
      "Facility fee/pass where posted, invasive-species sticker when applicable, and PFD for each person.",
    watchFor: [
      "multiple diversion structures",
      "long braided channel and wood",
      "mandatory Mike Walker take-out",
    ],
    imageUrl: snakeImage,
    imageLabel: "Snake River Idaho regional context photograph",
  }),

  makeRoute({
    id: "payette-river-banks-beehive-bend",
    riverId: "payette-river-idaho",
    name: "Payette River",
    reach: "Banks to Beehive Bend",
    region: "Southwest Idaho / Boise County",
    routeType: "whitewater",
    summary:
      "The 7.3-mile classic Main Payette pool-drop run with Class II-III rapids and designated public endpoints.",
    statusText:
      "BLM identifies Class II-III water and a 2,000-10,000 cfs ideal range; American Whitewater supplies the same-gauge runnable shoulders. Cold water, swims, wood, and Class III+ features still demand whitewater equipment and skills.",
    distance: "7.3 river miles",
    time: "About 2-4 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "low_water",
      "fast_rise",
      "mandatory_takeout",
    ],
    safety: [
      "Wear a whitewater PFD and helmet, secure boats, know the named Class III features, and scout or portage whenever the line is uncertain.",
      "BLM lists an ideal 2,000-10,000 cfs range for the section; a number inside that band is not a guarantee of safe wood, temperature, weather, or party readiness.",
    ],
    gauge: "13247500",
    gaugeName: "Payette River near Horseshoe Bend, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 800,
      idealMin: 2000,
      idealMax: 10000,
      tooHigh: 12000,
    },
    thresholdLabel:
      "BLM 2,000-10,000 cfs ideal range with American Whitewater 800-12,000 cfs runnable shoulders",
    thresholdUrl: payetteThresholdGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: payetteGuide,
    sourceLabel: "BLM Payette River corridor and boater map",
    mapUrl: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf",
    putIn: {
      name: "Banks River Access",
      latitude: 44.081922,
      longitude: -116.125363,
      mileFromStart: 0,
      note: "USFS ramp at the North/South Fork confluence.",
    },
    takeOut: {
      name: "Beehive Bend River Access",
      latitude: 44.004444,
      longitude: -116.180278,
      mileFromStart: 7.3,
      note: "BLM developed take-out, parking, toilets, and changing room.",
    },
    camping:
      "Day-use endpoints. Use a legal Boise National Forest or commercial campground; no informal bank camping.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Highway 55 shuttle; stage at Beehive Bend and pay/display the current parking pass.",
    permits:
      "Current day-use fee/pass, Idaho invasive-species sticker when applicable, PFD requirements, and whitewater safety equipment.",
    watchFor: [
      "Class III and III+ rapids",
      "cold water, swims, and wood",
      "busy Highway 55 access and parking",
    ],
    imageUrl: payetteImage,
    imageLabel: "NARA Payette River Scenic Byway same-river context",
  }),
  makeRoute({
    id: "payette-river-beehive-bend-horseshoe-dam",
    riverId: "payette-river-idaho",
    name: "Payette River",
    reach: "Beehive Bend to Horseshoe Dam Boat Ramp (Lower Main)",
    region: "Southwest Idaho / Boise County",
    routeType: "whitewater",
    summary:
      "The 5.5-mile Lower Main warm-up run with mostly Class II water and the optional Class III Climax wave at the end.",
    statusText:
      "Scored route with a direct Horseshoe Bend gauge and a published 1,200-15,000 cfs runnable range. Summer flows commonly fall from about 7,000 toward 2,000 cfs; October can be 800-1,200 cfs and remains runnable but low and technical. Jet boats, wood, cold water, and the Climax feature require current inspection and conservative take-out planning.",
    distance: "5.5 river miles",
    time: "About 2-3 hours",
    difficulty: "moderate",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "low_water",
      "fast_rise",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      "How's Your River and American Whitewater describe mostly Class II water with an optional Class III Climax feature near the lower end; use a whitewater PFD, helmet, rescue gear, and a group capable of self-rescue.",
      "Jet boats use this corridor, especially on summer weekends and higher water. Keep a predictable line, stay alert at bends, and yield when appropriate.",
      "The 1,200-15,000 cfs range is a planning cue tied to the Horseshoe Bend gauge, not a safety guarantee. At the low end the run is bony and technical; at high spring flows hydraulics and rescue consequences increase.",
    ],
    gauge: "13247500",
    gaugeName: "Payette River near Horseshoe Bend, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 1200,
      idealMin: 2000,
      idealMax: 10000,
      tooHigh: 15000,
    },
    thresholdLabel:
      "How's Your River / American Whitewater runnable range: 1,200-15,000 cfs; summer planning band about 2,000-10,000 cfs",
    thresholdUrl: lowerPayetteThresholdGuide,
    thresholdSupportUrl: lowerPayetteAwGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: lowerPayetteThresholdGuide,
    sourceLabel: "How's Your River Lower Main route guide",
    mapUrl: lowerPayetteAccessGuide,
    additionalSourceLinks: [
      {
        label: "American Whitewater Lower Main reach",
        url: lowerPayetteAwGuide,
        provider: "manual",
      },
      {
        label: "Mountaineers Lower Main access and classification",
        url: "https://www.mountaineers.org/activities/routes-places/payette-river",
        provider: "manual",
      },
      {
        label: "Horseshoe Dam Boat Ramp map reference",
        url: lowerPayetteTakeOutMap,
        provider: "manual",
      },
    ],
    putIn: {
      name: "Beehive Bend River Access",
      latitude: 44.00444444,
      longitude: -116.1802778,
      mileFromStart: 0,
      note: "BLM day-use access with gravel parking, vault toilets, changing room, and concrete raft drying area; fee parking applies.",
    },
    takeOut: {
      name: "Horseshoe Dam Boat Ramp",
      latitude: 43.93805,
      longitude: -116.19336,
      mileFromStart: 5.5,
      note: "Named public ramp at Highway 55 mile 66.2; take out before continuing downstream toward Horseshoe Reservoir and dam-related hazards.",
    },
    camping:
      "Day-use endpoints. Use an established Boise National Forest, BLM, or commercial Payette basecamp; do not assume overnight camping at Beehive Bend or the boat ramp.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Highway 55 shuttle between Beehive Bend and the Horseshoe Dam Boat Ramp; stage the vehicle at the lower ramp and confirm parking, fee, and current road conditions.",
    permits:
      "Current Payette River access fee/pass, Idaho invasive-species sticker when applicable, and whitewater PFD/helmet requirements.",
    watchFor: [
      "optional Class III Climax near mile 5.2",
      "jet-boat traffic and blind bends",
      "low-water rocks, wood, and cold swims",
      "mandatory Horseshoe Dam Boat Ramp take-out",
    ],
    season: [4, 5, 6, 7, 8, 9, 10],
    imageUrl: payetteImage,
    imageLabel: "NARA Payette River Scenic Byway same-river context",
  }),
  makeRoute({
    id: "middle-fork-payette-boiling-springs-trail-creek",
    riverId: "middle-fork-payette-river-idaho",
    name: "Middle Fork Payette River",
    reach: "Boiling Springs Campground to upstream of Trail Creek",
    region: "Southwest Idaho / Boise National Forest",
    routeType: "whitewater",
    summary:
      "A 7.5-mile Class IV creek-style reach from Boiling Springs Campground to the Trail Creek endpoint, with roadside scouting and Forest Service access.",
    statusText:
      "Gauge-scored threshold route. American Whitewater identifies the direct Middle Fork Payette gauge and the Class IV reach; trip reports document descents from roughly 450 to 1,330 cfs, while the reach can become Class V above about 1,500 cfs. Use the numeric cue as planning context only and let wood, scouting, and crew competence control the go/no-go decision.",
    distance: "About 7.5 river miles",
    time: "About 3-5 hours plus scouting and possible wood portages",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "The reach includes Kinks (III), Hawking (IV+), Plinko (IV), Tequila (V), and Molly's Nipple; use a proven creek boat, helmet, rescue equipment, and a crew able to self-rescue in cold water.",
      "American Whitewater reports wood-portage history and says the reach may become Class V above roughly 1,500 cfs. Scout every named rapid and do not assume last season's wood clearance remains current.",
      "Boiling Springs and Trail Creek are Forest Service campground/access anchors along Forest Road 698, with the Boise National Forest corridor plan and Recreation.gov describing the public recreation/camping setting. Confirm seasonal gates, fees, parking, campground status, and a lawful carry to the water before committing.",
    ],
    gauge: "13237920",
    gaugeName: "Middle Fork Payette River near Crouch, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 450, idealMin: 750, idealMax: 1330 },
    thresholdLabel:
      "American Whitewater reach reports document descents around 450-1,330 cfs; 750-1,330 cfs is retained as a conservative planning band, with Class V/high-consequence character above roughly 1,500 cfs",
    thresholdUrl: middleForkPayetteBoilingThreshold,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13237920/",
    thresholdSourceStrength: "community",
    scoreEligibility: "scored",
    sourceUrl: middleForkPayetteBoilingThreshold,
    sourceLabel: "American Whitewater Middle Fork Payette Boiling Springs reach record",
    mapUrl: middleForkPayetteBoilingThreshold,
    additionalSourceLinks: [
      { label: "USGS Middle Fork Payette near Crouch direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13237920/" },
      { label: "Boiling Springs Campground recreation map", url: "https://sbbchidaho.org/PDF/BoilingSpring.pdf" },
      { label: "Recreation.gov Boise National Forest Boiling Springs Cabin and river recreation", url: "https://www.recreation.gov/camping/campgrounds/232292" },
      { label: "Boise National Forest Middle Fork Payette corridor plan", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5394050.pdf" },
      { label: "Boiling Springs Campground map reference", url: "https://mapcarta.com/23518546" },
      { label: "Trail Creek Campground access and facilities", url: "https://www.go-idaho.com/Trail-Creek-Campground-ID/" },
      { label: "Boise National Forest Middle Fork Payette corridor guide", url: "https://www.sbbchidaho.org/Directions/Boiling%20Springs%20Directions%202020.pdf" },
    ],
    putIn: {
      name: "Boiling Springs Campground Put-In",
      latitude: 44.359874,
      longitude: -115.858043,
      mileFromStart: 0,
      note: "Named Forest Service campground and river access anchor on Forest Road 698; carry to the river only where signed and keep campground traffic clear.",
    },
    takeOut: {
      name: "Trail Creek Campground Take-Out",
      latitude: 44.275356,
      longitude: -115.874771,
      mileFromStart: 7.5,
      note: "Named Forest Service campground endpoint upstream of the Steeps; confirm the exact landing and do not continue into the undocumented Class V+ sections without separate reconnaissance.",
    },
    access: [
      {
        name: "Boiling Springs Campground Put-In",
        latitude: 44.359874,
        longitude: -115.858043,
        mileFromStart: 0,
        note: "Forest Service campground/access anchor with road staging and seasonal facilities; verify current opening and legal carry to the river.",
      },
      {
        name: "Trail Creek Campground Take-Out",
        latitude: 44.275356,
        longitude: -115.874771,
        mileFromStart: 7.5,
        note: "Forest Service campground access above the river; use the signed landing and stop upstream of the undocumented Steeps.",
      },
    ],
    camping:
      "Boiling Springs and Trail Creek are named Forest Service campgrounds along the reach corridor when open; use designated sites, carry potable water when pumps are seasonal, and verify fire/fee rules.",
    campingClassification: "on_route_campsite",
    shuttle: "Forest Road 698 parallels the corridor but is seasonal and can be rough. Stage the Trail Creek endpoint first, allow time for scouting, and do not block campground or bridge approaches.",
    permits: "No river permit is listed. Follow Boise National Forest campground and road rules, Idaho AIS/PFD requirements, fire restrictions, and posted seasonal closures.",
    watchFor: ["Hawking undercut and black hole", "Plinko and Tequila wood/portage decisions", "Molly's Nipple endpoint rapid", "undocumented Class V+ Steeps downstream"],
    season: [5, 6, 7],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),

  makeRoute({
    id: "middle-fork-payette-hardscrabble-lightning-creek",
    riverId: "middle-fork-payette-river-idaho",
    name: "Middle Fork Payette River",
    reach: "Hardscrabble Campground to Lightning Creek Bridge",
    region: "Southwest Idaho / Boise National Forest",
    routeType: "whitewater",
    summary:
      "A roughly 4.5-mile Class II-III spring runoff run on the Middle Fork Payette, centered on the Nozzle and Steps with roadside scouting and Forest Service campground access.",
    statusText:
      "Gauge-scored creek-style whitewater route. American Whitewater recommends roughly 800-1,500 cfs for the spring run and says it should not be run much below about 400 cfs; the short roadside section is accessible but cold, shallow, and wood-sensitive.",
    distance: "About 4.5 river miles",
    time: "About 2-4 hours including scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "remote", "access_uncertain"],
    safety: [
      "Class II-III creek-style water includes the Nozzle and Steps, with undercut rocks and occasional logs; use a whitewater craft, helmet, PFD, throw bag, and a crew able to self-rescue.",
      "American Whitewater describes the spring 800-1,500 cfs window and a roughly 400 cfs practical floor. These are reach-planning cues, not a guarantee that wood, road access, or a specific rapid is safe on the day.",
      "Forest Road 698 and campground access can be affected by fire, washouts, seasonal gates, or private-property boundaries. Confirm current road and campground status before carrying boats to the river.",
    ],
    gauge: "13237920",
    gaugeName: "Middle Fork Payette River near Crouch, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 400, idealMin: 800, idealMax: 1500 },
    thresholdLabel:
      "American Whitewater spring guidance: about 400 cfs practical floor; 800-1,500 cfs best runoff window",
    thresholdUrl: middleForkPayetteThreshold,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13237920/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: middleForkPayetteThreshold,
    sourceLabel: "American Whitewater Middle Fork Payette Nozzle Section",
    mapUrl: "https://www.riverfacts.com/maps/11084.html",
    additionalSourceLinks: [
      {
        label: "USGS Middle Fork Payette near Crouch gauge",
        url: "https://waterdata.usgs.gov/monitoring-location/USGS-13237920/",
        provider: "manual",
      },
      {
        label: "Hardscrabble Campground access reference",
        url: "https://maps.campendium.com/us/garden-valley-id/nature/hardscrabble-campground-garden-valley",
        provider: "manual",
      },
    ],
    putIn: {
      name: "Hardscrabble Campground Put-In",
      latitude: 44.23822,
      longitude: -115.89881,
      mileFromStart: 0,
      note: "Roadside public access across from Hardscrabble Campground at the Middle Fork Road bridge; confirm parking, campground opening, and a legal carry to the water.",
    },
    takeOut: {
      name: "Lightning Creek Bridge Take-Out",
      latitude: 44.19559,
      longitude: -115.93393,
      mileFromStart: 4.5,
      note: "Roadside take-out near Lightning Creek Road/bridge described by American Whitewater; do not block the road or assume a formal ramp.",
    },
    camping:
      "Hardscrabble and Tie Creek are nearby Forest Service campgrounds when open; use designated sites only and check current fire, fee, and closure notices.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short Middle Fork Road shuttle with roadside staging; keep vehicles clear of bridge approaches and verify Forest Road 698 conditions after fires or storms.",
    permits:
      "No river permit is listed. Follow Boise National Forest campground and road rules, Idaho AIS/PFD requirements, fire restrictions, and any closure orders.",
    watchFor: ["Nozzle and Steps", "undercut rocks and occasional logs", "cold spring runoff", "seasonal road closures"],
    season: [4, 5, 6, 7],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),
  makeRoute({
    id: "south-fork-payette-deer-creek-banks",
    riverId: "south-fork-payette-river-idaho",
    name: "South Fork Payette River",
    reach: "Deer Creek to Banks (Staircase)",
    region: "Southwest Idaho / Garden Valley-Banks",
    routeType: "whitewater",
    summary:
      "The official Staircase section, a roughly 4.5-mile Class II-III run ending at Banks.",
    statusText:
      "Advanced planning route. BLM characterizes Staircase as Class II-III, but release, runoff, wood, cold water, and the final confluence can raise consequences quickly.",
    distance: "About 4.5 river miles",
    time: "About 1.5-3 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "low_water",
      "fast_rise",
      "mandatory_takeout",
    ],
    safety: [
      "Use whitewater craft, helmet, worn PFD, throw gear, and a group capable of self-rescue. Scout current wood and any feature your party cannot read safely.",
      "The Horseshoe Bend gauge is downstream on the combined Payette and is only a proxy for this fork.",
    ],
    gauge: "13247500",
    gaugeName: "Payette River near Horseshoe Bend, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdLabel: "BLM South Fork Staircase difficulty guidance",
    sourceUrl: payetteGuide,
    sourceLabel: "BLM Payette River corridor and boater map",
    mapUrl: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf",
    putIn: {
      name: "Deer Creek Boat Launch",
      latitude: 44.092542,
      longitude: -116.042774,
      mileFromStart: 0,
      note: "Named public launch on the South Fork.",
    },
    takeOut: {
      name: "Banks River Access",
      latitude: 44.081922,
      longitude: -116.125363,
      mileFromStart: 4.5,
      note: "USFS ramp at the confluence; mandatory endpoint for this card.",
    },
    camping:
      "No on-route camping assumed. Use an established Garden Valley/Banks or Boise National Forest basecamp.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Banks-Lowman Road shuttle; inspect both access roads and stage at Banks.",
    permits:
      "Current access fee/pass where posted, Idaho invasive-species sticker when applicable, PFD, helmet, and whitewater rescue equipment.",
    watchFor: [
      "Class II-III Staircase features",
      "wood and cold runoff",
      "confluence traffic at Banks",
    ],
    imageUrl: payetteImage,
    imageLabel: "NARA Payette River watershed context",
  }),

  makeRoute({
    id: "boise-river-barber-ann-morrison",
    riverId: "boise-river-idaho",
    name: "Boise River",
    reach: "Barber Park to Ann Morrison Park",
    region: "Treasure Valley / Boise",
    routeType: "recreational",
    summary:
      "The official six-mile urban Boise float from Barber Park to the signed Ann Morrison take-out.",
    statusText:
      "Seasonal urban float, typically serviced late June through Labor Day when conditions allow. The river is always float-at-your-own-risk; steer actively through three diversion drops and take out on river left at Ann Morrison.",
    distance: "6 river miles",
    time: "About 2 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: [
      "low_head_dam",
      "mandatory_takeout",
      "strainers",
      "cold_water",
      "urban_water_quality",
      "low_water",
    ],
    safety: [
      "Ada County identifies three splashy diversion drops; avoid bridge piers, rocks, debris, and overhanging limbs and never tie boats together.",
      "Children 14 and under must wear a PFD, every vessel must carry one per person, and wearing it is the conservative choice for everyone.",
    ],
    gauge: "13206000",
    gaugeName: "Boise River at Glenwood Bridge near Boise, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 500,
      idealMin: 500,
      idealMax: 1500,
      tooHigh: 1500,
    },
    thresholdLabel:
      "Official Float the Boise typical-season range of 500-1,500 cfs",
    thresholdUrl: boiseThresholdGuide,
    thresholdSourceStrength: "official",
    scoreEligibility: "scored",
    sourceUrl: boiseGuide,
    sourceLabel: "Ada County Boise River Floater Guide",
    putIn: {
      name: "Barber Park Boise River launch",
      latitude: 43.566124,
      longitude: -116.136365,
      mileFromStart: 0,
      note: "Official floater launch/staging area.",
    },
    takeOut: {
      name: "Ann Morrison Park river-left take-out",
      latitude: 43.608342,
      longitude: -116.220682,
      mileFromStart: 6,
      note: "Signed river-left landing identified by Ada County.",
    },
    camping:
      "No camping on this urban float. Use Boise-area lodging or a legal developed campground.",
    campingClassification: "none",
    shuttle:
      "Use the seasonal managed shuttle when operating or stage legally at Ann Morrison; do not block park roads or the take-out.",
    permits:
      "Follow Ada County park rules and Idaho PFD/invasive-species requirements; rentals and shuttle service are seasonal.",
    watchFor: [
      "three diversion drops",
      "bridge piers, debris, and overhanging trees",
      "mandatory river-left Ann Morrison take-out",
    ],
    imageUrl: boiseImage,
    imageLabel: "Boise River same-river archival context",
  }),
  makeRoute({
    id: "boise-river-barber-willow-lane",
    riverId: "boise-river-idaho",
    name: "Boise River",
    reach: "Barber Park to Willow Lane Athletic Complex (Downtown)",
    region: "Treasure Valley / Boise",
    routeType: "whitewater",
    summary:
      "An 8.7-mile urban whitewater itinerary extending the managed Barber float to the Willow Lane trailered-boat ramp, with Class I-II water and a Class III Boise River Park feature.",
    statusText:
      "Scored urban whitewater route with a direct Glenwood Bridge gauge and a published 1,500-3,000 cfs runnable range. This is a different operating boundary from the casual Barber-to-Ann Morrison float: the downstream corridor is less managed, includes diversion hazards and the Boise River Park, and requires active boat handling and a confirmed Willow Lane take-out.",
    distance: "8.7 river miles",
    time: "About 3-5 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "low_head_dam",
      "strainers",
      "cold_water",
      "urban_water_quality",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      "How's Your River and American Whitewater identify Class I-II urban water with a Class III Boise River Park feature; wear a whitewater PFD and helmet, carry rescue equipment, and scout the weir and park features.",
      "The Boise River Resource Management Plan distinguishes the less-managed downstream corridor from the casual floater reach. Expect strainers, bridge/utility structures, changing channel edges, and fewer services below Ann Morrison.",
      "The 1,500-3,000 cfs range is a planning cue for the Glenwood Bridge gauge, not a go/no-go guarantee. Check city closures, water quality, feature schedules, weather, and the Willow Lane ramp before launch.",
    ],
    gauge: "13206000",
    gaugeName: "Boise River at Glenwood Bridge near Boise, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 1500,
      idealMin: 1500,
      idealMax: 3000,
      tooHigh: 3000,
    },
    thresholdLabel:
      "How's Your River / American Whitewater Downtown Boise runnable range: 1,500-3,000 cfs",
    thresholdUrl: downtownBoiseThresholdGuide,
    thresholdSupportUrl: downtownBoiseAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: downtownBoiseThresholdGuide,
    sourceLabel: "How's Your River Downtown Boise run guide",
    mapUrl: downtownBoiseCityPlan,
    additionalSourceLinks: [
      {
        label: "American Whitewater Barber Park to Willow Lane reach",
        url: downtownBoiseAwReach,
        provider: "manual",
      },
      {
        label: "Willow Lane Athletic Complex take-out access",
        url: downtownBoiseWillowAccess,
        provider: "manual",
      },
      {
        label: "Boise River Resource Management and Master Plan",
        url: downtownBoiseCityPlan,
        provider: "manual",
      },
      {
        label: "USGS Boise River near Willow Lane study location",
        url: "https://pubs.usgs.gov/sir/2011/5181/pdf/sir20115181.pdf",
        provider: "usgs",
      },
      {
        label: "Willow Lane Athletic Complex park reference",
        url: "https://mapcarta.com/W445009259",
        provider: "manual",
      },
    ],
    putIn: {
      name: "Barber Park Boise River launch",
      latitude: 43.566124,
      longitude: -116.136365,
      mileFromStart: 0,
      note: "City-managed launch and staging area; confirm seasonal operations, parking, and current Boise River notices.",
    },
    takeOut: {
      name: "Willow Lane Athletic Complex river ramp",
      latitude: 43.640833,
      longitude: -116.248333,
      mileFromStart: 8.7,
      note: "City trailered-boat ramp at the Willow Lane Athletic Complex/Old Osborne Bridge area. Coordinate follows the nearby USGS Boise River near Willow Lane study location; verify the signed ramp and water entry on site.",
    },
    camping:
      "Urban day-use itinerary. No on-route camping; use Boise-area lodging or a legal developed campground and keep all staging within signed park areas.",
    campingClassification: "none",
    shuttle:
      "Urban Boise shuttle from Willow Lane Athletic Complex to Barber Park; avoid blocking athletic-complex lanes and confirm the lower ramp is open before launching.",
    permits:
      "Follow Boise Parks and Recreation access/parking rules, current city water-quality or closure notices, Idaho invasive-species requirements, and PFD/helmet requirements.",
    watchFor: [
      "Barber, Ridenbaugh, and Settlers diversion structures",
      "Boise River Park/Thurman Mill Class III feature",
      "urban strainers, bridge structures, and changing water quality",
      "mandatory Willow Lane take-out and private-bank constraints",
    ],
    season: [5, 6, 7, 8, 9],
    imageUrl: boiseImage,
    imageLabel: "Boise River same-river archival context",
  }),

  makeRoute({
    id: "boise-river-troutdale-badger",
    riverId: "boise-river-idaho",
    name: "Boise River",
    reach: "Troutdale Campground to Badger Creek Campground",
    region: "Southwest Idaho / Middle Fork Boise",
    routeType: "recreational",
    summary:
      "A 9-mile Class II Middle Fork Boise float between two Forest Service campgrounds, with a roadside Forest Road 268 shuttle and a direct Twin Springs gauge.",
    statusText:
      "Gauge-scored recreational route. Dreamflows lists 500-5,000 cfs trigger levels and the regional flow guide identifies about 1,500 cfs as optimal; the rough Forest Road 268 approach is part of the trip plan.",
    distance: "About 9 river miles",
    time: "About 3-5 hours plus the remote shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "Class II water is gentle in character but remains cold, remote, and exposed to strainers; wear PFDs and carry a conservative rescue and repair kit.",
      "Troutdale and Badger Creek are small Forest Service campgrounds reached by narrow, rough Forest Road 268; confirm seasonal opening, road conditions, and parking before staging.",
      "Use 500 cfs as the lower trigger, 1,200-1,800 cfs as a planning ideal around the published 1,500 cfs optimum, and 5,000 cfs as the upper trigger. Recheck weather, wood, and current trend before launch.",
    ],
    gauge: "13185000",
    gaugeName: "Boise River near Twin Springs, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 1200, idealMax: 1800, tooHigh: 5000 },
    thresholdLabel: "Dreamflows trigger levels: 500-5,000 cfs; 1,200-1,800 cfs planning ideal around 1,500 cfs optimum",
    thresholdUrl: middleForkBoiseThresholdGuide,
    thresholdSupportUrl: middleForkBoiseMapGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: middleForkBoiseMapGuide,
    sourceLabel: "Boise River Troutdale-to-Badger access and flow map",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13185000/",
    putIn: {
      name: "Troutdale Campground Put-In",
      latitude: 43.716001,
      longitude: -115.625001,
      mileFromStart: 0,
      note: "Forest Service campground and riverside launch; confirm seasonal opening, parking, and the rough Forest Road 268 approach.",
    },
    takeOut: {
      name: "Badger Creek Campground Take-Out",
      latitude: 43.662181,
      longitude: -115.711701,
      mileFromStart: 9,
      note: "Small Forest Service campground access near the Twin Springs gauge; land only at the developed site and keep the road clear.",
    },
    camping: "Troutdale and Badger Creek are endpoint Forest Service campgrounds when open; both are small and first-come, so confirm current status and bring water for primitive sites.",
    campingClassification: "endpoint_campground",
    shuttle: "Remote Forest Road 268 shuttle follows the Middle Fork/Arrowrock corridor but is narrow and rough; stage the take-out before launching.",
    permits: "Follow Boise National Forest campground and road rules, Idaho AIS/PFD requirements, fire restrictions, and current closure notices.",
    watchFor: ["cold water and strainers", "rough Forest Road 268", "small campground parking and access"],
    imageUrl: boiseImage,
    imageLabel: "Boise River watershed context photograph",
  }),

  makeRoute({
    id: "boise-river-troutdale-willow",
    riverId: "boise-river-idaho",
    name: "Boise River",
    reach: "Troutdale Campground to Willow Creek Campground",
    region: "Southwest Idaho / Middle Fork Boise",
    routeType: "recreational",
    summary:
      "An 11.7-mile Class I-III Middle Fork Boise itinerary between public Forest Service campgrounds, extending the Troutdale-to-Badger corridor to Willow Creek.",
    statusText:
      "Planning-only direct-gauge route. American Whitewater documents the distinct Troutdale-to-Willow reach and exact campground access pair; the shared Twin Springs trigger band provides corridor context, but no reach-specific numeric cutoff is published for this longer section.",
    distance: "About 11.7 river miles",
    time: "About 4-6 hours plus the remote shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates this corridor Class I-III, but cold water, strainers, and changing spring releases still require PFDs, a stable craft, and a crew able to self-rescue.",
      "Use the shared Twin Springs corridor triggers (500-5,000 cfs, with a 1,200-1,800 cfs planning ideal) only as context. The reach page does not publish a route-specific band, so current wood, trend, weather, and craft choice override any threshold cue.",
      "Troutdale and Willow Creek are named Forest Service campground access anchors. Confirm seasonal opening, Forest Road 268 conditions, parking, shoreline carry, and the downstream reservoir boundary before launch.",
    ],
    gauge: "13185000",
    gaugeName: "Boise River near Twin Springs, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 1200, idealMax: 1800, tooHigh: 5000 },
    thresholdLabel:
      "Shared Twin Springs corridor triggers: 500-5,000 cfs; 1,200-1,800 cfs planning ideal; no reach-specific AW cutoff published",
    thresholdUrl: middleForkBoiseThresholdGuide,
    thresholdSupportUrl: boiseTroutdaleWillowAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: boiseTroutdaleWillowAwReach,
    sourceLabel: "American Whitewater Boise Troutdale-to-Willow Creek reach record",
    mapUrl: middleForkBoiseMapGuide,
    additionalSourceLinks: [
      { label: "American Whitewater Troutdale-to-Willow reach", url: boiseTroutdaleWillowAwReach },
      { label: "American Whitewater Troutdale put-in access", url: boiseTroutdaleWillowPutIn },
      { label: "American Whitewater Willow Creek take-out access", url: boiseTroutdaleWillowTakeOut },
      { label: "Dreamflows Twin Springs trigger levels", url: middleForkBoiseThresholdGuide },
      { label: "USGS Boise River near Twin Springs gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13185000/" },
    ],
    putIn: {
      name: "Troutdale Campground Put-In",
      latitude: 43.7162,
      longitude: -115.6226,
      mileFromStart: 0,
      note: "American Whitewater's exact Troutdale access coordinate is a Forest Service campground anchor; confirm seasonal opening, parking, and the carry to water before loading.",
    },
    takeOut: {
      name: "Willow Creek Campground Take-Out",
      latitude: 43.6452,
      longitude: -115.7517,
      mileFromStart: 11.7,
      note: "American Whitewater maps the Willow Creek campground take-out. Confirm the river-side landing, campground status, parking, and the downstream reservoir boundary on site.",
    },
    camping:
      "Troutdale and Willow Creek are endpoint Forest Service campgrounds when open; both are primitive and seasonal, so verify current status, fees, water, and fire restrictions.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Forest Road 268 follows the Middle Fork/Arrowrock corridor but is narrow and rough. Stage the Willow Creek vehicle first and allow extra time for the remote shuttle and seasonal road conditions.",
    permits:
      "Follow Boise National Forest campground and road rules, Idaho AIS/PFD requirements, fire restrictions, and current closure notices. Do not assume dispersed shoreline camping or informal access outside the named campgrounds.",
    watchFor: ["cold water and strainers", "rough Forest Road 268", "spring runoff", "Willow Creek reservoir boundary", "seasonal campground closure"],
    season: [5, 6, 7],
    imageUrl: boiseImage,
    imageLabel: "Boise River watershed context photograph",
  }),

  makeRoute({
    id: "north-fork-boise-barber-flat-troutdale",
    riverId: "north-fork-boise-river-idaho",
    name: "North Fork Boise River",
    reach: "Barber Flat to Troutdale confluence",
    region: "Southwest Idaho / Boise National Forest",
    routeType: "whitewater",
    summary:
      "A 10.8-mile Class III-IV North Fork Boise canyon run from the Barber Flat Forest Service station to the Boise River confluence at Troutdale.",
    statusText:
      "Planning-only expert route. American Whitewater describes mostly Class II-III water with an excellent 1.5-mile Class III-IV inner section and a tricky, roadless canyon shuttle; the Twin Springs gauge is a downstream proxy and Idaho's Upper Boise plan publishes 600-2,000 cfs segment bands.",
    distance: "About 10.8 river miles",
    time: "About 4-8 hours plus scouting and a remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater describes mostly Class II-III water with a concentrated 1.5-mile Class III-IV boulder-garden section; use a whitewater-capable craft, helmet, rescue equipment, and an experienced crew.",
      "The canyon is roadless in its core and the shuttle is tricky. Barber Flat access is reached by the rough North Fork Boise River Road; confirm gates, road conditions, parking, and the Forest Service site before committing.",
      "Use the Idaho basin plan's 600-2,000 cfs segment band only as planning context. The Twin Springs station is downstream of the North Fork, and current wood, weather, cold water, and crew skill override any numeric cue.",
    ],
    gauge: "13185000",
    gaugeName: "Boise River near Twin Springs, ID (downstream proxy)",
    gaugeKind: "proxy",
    threshold: { tooLow: 600, idealMin: 1000, idealMax: 2000 },
    thresholdLabel: "Idaho Upper Boise basin plan segment bands: 600-2,000 cfs (planning-only downstream proxy; 1,000-2,000 cfs working ideal)",
    thresholdUrl: northForkBoiseThreshold,
    thresholdSupportUrl: northForkBoiseAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkBoiseAwReach,
    sourceLabel: "American Whitewater North Fork Boise reach record",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13185000/",
    additionalSourceLinks: [
      { label: "Idaho Upper Boise basin plan flow bands", url: northForkBoiseThreshold },
      { label: "Barber Flat Forest Service cabin and trailhead directions", url: northForkBoiseBarberAccess },
      { label: "Troutdale Campground public access coordinate record", url: northForkBoiseTroutdaleAccess },
      { label: "USFS North Fork Boise canyon research area", url: "https://research.fs.usda.gov/rmrs/rnas/locations/north-fork-boise-river" },
      { label: "USGS Twin Springs proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13185000/" },
    ],
    putIn: {
      name: "Barber Flat Forest Service Station Access",
      latitude: 43.8129514,
      longitude: -115.536488,
      mileFromStart: 0,
      note: "Named Barber Flat Forest Service station/cabin and trailhead on the North Fork Boise River; the North Fork Boise River Road is graded but can be rough and seasonal. Confirm the actual launch edge and parking on site.",
    },
    takeOut: {
      name: "Troutdale Campground / North Fork Confluence Access",
      latitude: 43.7162833,
      longitude: -115.6250999,
      mileFromStart: 10.8,
      note: "Public Forest Service campground and confluence-area access anchor at Troutdale; land only at the developed site and confirm the river-left/right carry because American Whitewater coordinates are approximate.",
    },
    camping:
      "Barber Flat Cabin/nearby durable sites and Troutdale Campground can support a basecamp when open. Do not assume dispersed shoreline camping inside the roadless canyon; verify Forest Service rules and fire restrictions.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Remote shuttle on Highway 21, Granite Creek Road 327, North Fork Boise River Road, and Forest Road 268. Stage the Troutdale vehicle first, inspect road conditions, and carry satellite communication.",
    permits:
      "Follow Boise National Forest site and road rules, Idaho AIS/PFD requirements, fire restrictions, and current closure notices. The proxy gauge and approximate AW coordinates require on-site confirmation.",
    watchFor: ["Class III-IV boulder gardens", "roadless canyon and difficult rescue", "rough seasonal access roads", "cold water and changing wood"],
    season: [5, 6, 7],
    imageUrl: boiseImage,
    imageLabel: "Boise River watershed context photograph",
  }),

  makeRoute({
    id: "salmon-river-stanley-rough-creek",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Stanley Bridge to Rough Creek Bridge",
    region: "Central Idaho / Sawtooth Valley",
    routeType: "whitewater",
    summary:
      "A 9.3-mile Class II Stanley Valley float from the Highway 75 bridge in Stanley to the informal downstream-left Rough Creek Bridge access, using the upper-Salmon 600-6,800 cfs planning envelope as proxy context.",
    statusText:
      "Planning-only threshold route. American Whitewater defines the 9.3-mile Stanley-to-Rough Creek reach and names both access anchors; RiverBrain and How's Your River provide numeric upper-Salmon flow context, but the active gauge is below the Yankee Fork downstream of this reach and the Rough Creek landing is an informal road/bridge access requiring field confirmation.",
    distance: "About 9.3 river miles",
    time: "About 3-5 hours plus shuttle and access inspection",
    difficulty: "moderate",
    risk: "caution",
    hazards: [
      "cold_water",
      "strainers",
      "fast_rise",
      "low_water",
      "access_uncertain",
      "private_banks",
    ],
    safety: [
      "American Whitewater rates this reach Class II and describes a scenic valley float with a small low-bank Stanley launch and an informal Rough Creek Bridge access. Wear a PFD, account for cold water, and carry basic rescue and repair equipment.",
      "Use the 600-6,800 cfs upper-Salmon planning envelope only as a conservative reference. The HYS 600-6,800 cfs run guidance is published for the adjacent Rough Creek-to-Torrey stretch, while RiverBrain lists broader upper-Salmon/Sunbeam cues; the 13296500 gauge is downstream of the reach below Yankee Fork and is therefore proxy context here.",
      "The Stanley bridge launch is a small low-bank access beside Highway 75. Rough Creek is an informal downstream-left bridge access and may not provide a maintained ramp, legal parking, or a safe carry at all water levels; inspect both locations before committing.",
      "Do not continue below Rough Creek without a separate plan: the downstream Sunbeam section adds Shotgun and Sunbeam/Dam rapids whose difficulty increases with flow. Treat Rough Creek as the mandatory take-out for this card.",
    ],
    gauge: "13296500",
    gaugeName: "Salmon River below Yankee Fork near Clayton, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1000, idealMax: 3000, tooHigh: 6800 },
    thresholdLabel:
      "Upper Salmon/Sunbeam planning context: approximately 600 cfs minimum, 1,000-3,000 cfs conservative operating band, and 6,800 cfs upper cue; downstream Yankee Fork gauge is proxy context for this upstream reach",
    thresholdUrl: salmonStanleyRoughThreshold,
    thresholdSupportUrl: salmonStanleyRoughHys,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: salmonStanleyRoughAwReach,
    sourceLabel: "American Whitewater Stanley-to-Rough Creek reach record",
    mapUrl: salmonStanleyRoughAwReach,
    additionalSourceLinks: [
      { label: "American Whitewater Stanley Run map and access record", url: salmonStanleyRoughAwReach },
      { label: "RiverBrain Upper Salmon/Sunbeam flow and rapid context", url: salmonStanleyRoughThreshold },
      { label: "How's Your River adjacent Rough Creek-to-Torrey flow context", url: salmonStanleyRoughHys },
      { label: "Boat Ramp Atlas Stanley Salmon River Bridge access", url: salmonStanleyPutInAccess },
      { label: "USGS Salmon River below Yankee Fork proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13296500/" },
      { label: "BLM Upper Salmon boating and designated-access guidance", url: upperSalmonGuide },
      { label: "Idaho Fish and Game statewide boating-access guide", url: "https://idfg.idaho.gov/sites/default/files/fishing-boating-access-guide-2016.pdf" },
    ],
    putIn: {
      name: "Salmon River Bridge Put-In / Stanley",
      latitude: 44.22353,
      longitude: -114.92768,
      mileFromStart: 0,
      note: "American Whitewater and Boat Ramp Atlas identify the river-left Highway 75 bridge access with a small parking area and low-bank carry. Confirm current public parking and shoreline conditions.",
    },
    takeOut: {
      name: "Rough Creek Bridge Informal Take-Out",
      latitude: 44.256582,
      longitude: -114.856228,
      mileFromStart: 9.3,
      note: "American Whitewater places the access on downstream river left at Highway 75 mile 199.0. Stored point is a matched-flowline bridge-area anchor; confirm exact landing, legal parking, and safe carry before launch.",
    },
    access: [
      {
        name: "Salmon River Bridge Put-In / Stanley",
        latitude: 44.22353,
        longitude: -114.92768,
        mileFromStart: 0,
        note: "Public bridge-area low-bank access; verify parking, traffic, and carry.",
      },
      {
        name: "Rough Creek Bridge Informal Take-Out",
        latitude: 44.256582,
        longitude: -114.856228,
        mileFromStart: 9.3,
        note: "Informal downstream-left bridge access; no maintained ramp or guaranteed parking is assumed.",
      },
    ],
    camping:
      "Use a Stanley-area basecamp or lawful Sawtooth National Recreation Area developed/dispersed site. No on-route campsite or overnight river landing is assumed for this short day section.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Highway 75 parallels the reach. Stage the Rough Creek bridge vehicle first, then inspect the Stanley launch; allow for bridge traffic, shoulder constraints, and a contingency take-out if the informal landing is not usable.",
    permits:
      "Follow Sawtooth National Recreation Area and Forest Service access rules, Idaho AIS/PFD requirements, fire restrictions, designated put-in/take-out requirements, and current Highway 75 notices.",
    watchFor: [
      "cold spring water",
      "low-water rocks and shallow riffles",
      "wood and bridge hydraulics",
      "Highway 75 traffic and shoulder parking",
      "informal Rough Creek landing",
      "downstream Shotgun/Sunbeam transition",
    ],
    season: [5, 6, 7, 8],
    imageUrl: salmonImage,
    imageLabel: "Upper Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "salmon-river-stanley-sunbeam",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Stanley to Sunbeam Dam / Yankee Fork Access",
    region: "Central Idaho / Sawtooth Valley",
    routeType: "whitewater",
    summary:
      "A 13-mile Class III-III+ Upper Salmon run from Stanley to the Sunbeam Dam site, with four named access points, highway scouting, and a direct Yankee Fork gauge.",
    statusText:
      "Gauge-scored threshold route. RiverBrain recommends 600 cfs minimum, 2,500 cfs average, and 6,000 cfs maximum; Shotgun and Sunbeam rapids become more consequential at the upper end and require scouting.",
    distance: "About 13 river miles",
    time: "About 4-7 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "remote", "access_uncertain"],
    safety: [
      "RiverBrain rates the run Class III-III+ and identifies Shotgun Rapid and Sunbeam Rapid as the principal features; both can be scouted from river left near Highway 75.",
      "The reach is cold, swift, and exposed to wood and anglers. Wear a PFD, carry rescue/repair gear, and leave a daylight margin for the long shuttle and any portage.",
      "The Yankee Fork take-out is a primitive pull-off with no ramp, no water, and limited staging; confirm parking and the carry before launching from Stanley.",
      "Use RiverBrain's 600-6,000 cfs shoulders with the 2,500 cfs average reference, then defer to current wood, weather, water temperature, closures, and on-site scouting.",
    ],
    gauge: "13296500",
    gaugeName: "Salmon River below Yankee Fork near Clayton, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1800, idealMax: 3200, tooHigh: 6000 },
    thresholdLabel: "RiverBrain recommended levels: 600 cfs minimum, 2,500 cfs average, 6,000 cfs maximum; 1,800-3,200 cfs planning ideal",
    thresholdUrl: sunbeamThreshold,
    thresholdSupportUrl: upperSalmonGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13296500/",
    additionalSourceLinks: [
      { label: "RiverBrain Stanley put-in access", url: sunbeamPutInSource },
      { label: "RiverBrain Mormon Bend access", url: sunbeamMormonBendSource },
      { label: "RiverBrain Yankee Fork take-out access", url: sunbeamTakeOutSource },
    ],
    putIn: {
      name: "Stanley Put-In",
      latitude: 44.22330603,
      longitude: -114.92772102,
      mileFromStart: 0,
      note: "Exact RiverBrain access anchor: all vehicles and boat ramp, but no camping or water. Confirm the public facility and carry before loading boats.",
    },
    takeOut: {
      name: "Yankee Fork Access Take-Out",
      latitude: 44.26872412,
      longitude: -114.7332716,
      mileFromStart: 13,
      note: "Exact RiverBrain take-out below the Sunbeam dam site: all vehicles, primitive ramp/pull-off, no boat ramp, no camping, no water, and limited staging.",
    },
    access: [
      {
        name: "Stanley Put-In",
        latitude: 44.22330603,
        longitude: -114.92772102,
        mileFromStart: 0,
        note: "Public ramp; launch below any restrictions and inspect the eddy.",
      },
      {
        name: "Mormon Bend Access",
        latitude: 44.26257,
        longitude: -114.84341383,
        mileFromStart: 4.2,
        note: "Named RiverBrain access with camping, water, and a boat ramp; optional shorter start or emergency landing when open.",
      },
      {
        name: "Yankee Fork Access Take-Out",
        latitude: 44.26872412,
        longitude: -114.7332716,
        mileFromStart: 13,
        note: "Primitive pull-off and carry below the former Sunbeam dam site; do not miss the endpoint.",
      },
    ],
    camping: "RiverBrain lists vehicle-accessible camps near the reach, including Mormon Bend and Casino Creek; use only lawful developed or mapped public sites and carry potable water for the day run.",
    campingClassification: "endpoint_campground",
    shuttle: "Highway 75 follows most of the reach, making scouting straightforward; stage at the small Yankee Fork pull-off and account for the long Stanley shuttle.",
    permits: "No general permit is listed for this reach; follow Sawtooth National Recreation Area/USFS rules, Idaho AIS/PFD requirements, fire restrictions, and current closures.",
    watchFor: ["Shotgun Rapid", "Sunbeam Rapid and former dam remnants", "cold water, wood, and angler traffic", "small Yankee Fork staging area"],
    imageUrl: salmonImage,
    imageLabel: "Upper Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "salmon-river-rough-creek-yankee-fork",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Rough Creek Bridge to Yankee Fork Access",
    region: "Central Idaho / Sawtooth Valley",
    routeType: "whitewater",
    summary:
      "A distinct approximately 4.2-mile Class III-IV upper Sunbeam segment from the Rough Creek Bridge to the Yankee Fork access, covering the Shotgun and Sunbeam/Dam features before the existing lower Sunbeam card.",
    statusText:
      "Planning-only expert segment. American Whitewater's Sunbeam reach and How's Your River identify Rough Creek, Shotgun, Sunbeam Dam, and the Yankee Fork access; RiverBrain supplies the numeric upper-Salmon flow cues. The gauge is downstream proxy context for the upper start and the Yankee Fork take-out remains a primitive pull-off with limited staging.",
    distance: "About 4.2 river miles",
    time: "About 2-4 hours plus scouting, portage, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "fast_rise",
      "low_water",
      "access_uncertain",
      "mandatory_takeout",
    ],
    safety: [
      "American Whitewater and How's Your River identify Shotgun as a boulder garden that becomes Class IV at higher flows and the former Sunbeam Dam rapid as a consequential hole. Scout from river left and portage if the line, wood, or water level is not clearly manageable.",
      "RiverBrain's upper-Salmon cues and HYS's adjacent run guidance support a 600-6,800 cfs planning envelope; use 1,800-3,200 cfs as the conservative operating band for this short expert segment. The 13296500 gauge is below the Yankee Fork and is proxy context for the Rough Creek start.",
      "Rough Creek is an informal downstream-left bridge access, not a maintained ramp. The Yankee Fork endpoint is a primitive pull-off with no water and limited staging; inspect both carries and stage vehicles before launch.",
      "This card ends at the Yankee Fork access. Do not continue into the lower Sunbeam/Torrey reach without reassessing the additional Class III features, cold water, wood, daylight, and take-out logistics.",
    ],
    gauge: "13296500",
    gaugeName: "Salmon River below Yankee Fork near Clayton, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1800, idealMax: 3200, tooHigh: 6800 },
    thresholdLabel:
      "Upper Salmon/Sunbeam guidance: approximately 600 cfs minimum, 1,800-3,200 cfs conservative operating band, and 6,800 cfs upper cue; downstream Yankee Fork gauge is proxy context for the Rough Creek start",
    thresholdUrl: sunbeamThreshold,
    thresholdSupportUrl: salmonRoughSunbeamHys,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: sunbeamDayStretchAw,
    sourceLabel: "American Whitewater Rough Creek-to-Sunbeam reach record",
    mapUrl: sunbeamDayStretchAw,
    additionalSourceLinks: [
      { label: "American Whitewater Sunbeam reach and rapid record", url: sunbeamDayStretchAw },
      { label: "How's Your River Rough Creek-to-Torrey flow and rapid context", url: salmonRoughSunbeamHys },
      { label: "RiverBrain Upper Salmon/Sunbeam flow guidance", url: sunbeamThreshold },
      { label: "RiverBrain Yankee Fork access", url: sunbeamTakeOutSource },
      { label: "USGS Salmon River below Yankee Fork proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13296500/" },
      { label: "BLM Upper Salmon boating and designated-access guidance", url: upperSalmonGuide },
      { label: "Idaho boating and invasive-species requirements", url: idahoBoating },
    ],
    putIn: {
      name: "Rough Creek Bridge Informal Put-In",
      latitude: 44.256582,
      longitude: -114.856228,
      mileFromStart: 0,
      note: "American Whitewater places the put-in on downstream river left at Highway 75 mile 199.0; stored point is a matched-flowline bridge-area anchor pending current landing and parking confirmation.",
    },
    takeOut: {
      name: "Yankee Fork Access Primitive Take-Out",
      latitude: 44.26872412,
      longitude: -114.7332716,
      mileFromStart: 4.2,
      note: "RiverBrain/AW access below the former Sunbeam dam site: primitive pull-off, no maintained boat ramp, no water, and limited staging. Confirm the carry and endpoint before launch.",
    },
    access: [
      {
        name: "Rough Creek Bridge Informal Put-In",
        latitude: 44.256582,
        longitude: -114.856228,
        mileFromStart: 0,
        note: "Informal bridge-area launch; legal parking and shoreline carry require current field confirmation.",
      },
      {
        name: "Shotgun Scout / Portage River Left",
        latitude: 44.2615,
        longitude: -114.817,
        mileFromStart: 1.7,
        note: "Approximate river-left scouting/portage corridor from the AW/HYS reach description; not a separate public landing.",
        segmentKind: "transition",
      },
      {
        name: "Yankee Fork Access Primitive Take-Out",
        latitude: 44.26872412,
        longitude: -114.7332716,
        mileFromStart: 4.2,
        note: "Primitive endpoint pull-off below Sunbeam; do not continue downstream without a new plan.",
      },
    ],
    camping:
      "No on-route overnight is assumed. Use a lawful Stanley-area or Mormon Bend basecamp and carry water; the Yankee Fork endpoint has no water or camping according to the access record.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Highway 75 parallels the run. Stage the Yankee Fork vehicle first, then inspect the Rough Creek bridge carry; allow time for scouting Shotgun and Sunbeam, portage, and primitive endpoint staging.",
    permits:
      "Follow Sawtooth National Recreation Area/Forest Service access rules, Idaho AIS/PFD requirements, fire restrictions, posted bridge parking controls, and current road and closure notices.",
    watchFor: [
      "Shotgun boulder garden",
      "Sunbeam/Dam hole and remnants",
      "low-water rocks and high-flow holes",
      "cold water and wood",
      "rough bridge carry",
      "primitive Yankee Fork take-out",
    ],
    season: [5, 6, 7],
    imageUrl: salmonImage,
    imageLabel: "Upper Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "salmon-river-sunbeam-torreys-hole",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Yankee Fork Access to Torrey's Hole",
    region: "Central Idaho / Sawtooth-Salmon corridor",
    routeType: "whitewater",
    summary:
      "An approximately 8.5-mile Class II-III Sunbeam Day Stretch from the Yankee Fork raft-slide access to the developed Torrey's Hole take-out.",
    statusText:
      "Gauge-scored threshold route. American Whitewater identifies the Yankee Fork-to-Torrey's Hole section as the standard lower Sunbeam run, with two Class III features, direct Yankee Fork gauge context, and public raft-slide/ramp access.",
    distance: "About 8.5 river miles",
    time: "About 3-5 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "The lower Sunbeam section is mostly Class II with Piece of Cake and Warm Springs Gorge/Narrows as the principal Class III features; scout the gorge and keep a long-swim margin.",
      "American Whitewater describes the Yankee Fork, Elk Creek, and Snyder Springs access points as raft-slide or steep-carry facilities. Confirm the slide, shoulder parking, boat type, and current landing before launch.",
      "Use the direct 13296500 Yankee Fork gauge with the published 600-6,000 cfs shoulders and 1,800-3,200 cfs planning ideal. Low water makes Piece of Cake boney; rising water increases hole size and consequence.",
      "Torrey's Hole is a formal ramp, but stage the vehicle first and respect Highway 75 traffic, cold water, weather, wood, and current Salmon-Challis access notices.",
    ],
    gauge: "13296500",
    gaugeName: "Salmon River below Yankee Fork near Clayton, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1800, idealMax: 3200, tooHigh: 6000 },
    thresholdLabel:
      "RiverBrain/Sunbeam guidance: 600 cfs minimum, 2,500 cfs average, 6,000 cfs maximum; 1,800-3,200 cfs planning ideal",
    thresholdUrl: sunbeamDayStretchAw,
    thresholdSupportUrl: sunbeamThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: sunbeamDayStretchAw,
    sourceLabel: "American Whitewater Sunbeam Day Stretch reach record",
    mapUrl: upperSalmonPage,
    additionalSourceLinks: [
      { label: "American Whitewater Sunbeam Day Stretch", url: sunbeamDayStretchAw },
      { label: "RiverBrain Sunbeam flow guidance", url: sunbeamThreshold },
      { label: "RiverBrain Yankee Fork access", url: sunbeamTakeOutSource },
      { label: "USGS Yankee Fork gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13296500/" },
      { label: "BLM Salmon River access corridor", url: upperSalmonPage },
      { label: "Torrey's Hole access locality", url: torreyHoleAccess },
    ],
    putIn: {
      name: "Yankee Fork River Access raft slide",
      latitude: 44.26872412,
      longitude: -114.7332716,
      mileFromStart: 0,
      note: "American Whitewater's standard lower Sunbeam start below the former dam site; use the raft slide and park vehicles up on the Highway 75 shoulder without blocking the access.",
    },
    takeOut: {
      name: "Torrey's Hole River Access boat ramp",
      latitude: 44.2546365,
      longitude: -114.5989597,
      mileFromStart: 8.5,
      note: "Formal access with parking and a paved ramp. Stage the vehicle before launch and confirm current construction, parking, and ramp conditions.",
    },
    camping:
      "This is a day stretch. Use designated Salmon-Challis/Sawtooth campgrounds such as nearby Sunbeam or O'Brien-area facilities; do not assume dispersed camping at the raft slide or ramp.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Highway 75 parallels the entire section. Stage at Torrey's Hole, then drive back to the Yankee Fork slide; account for summer traffic and shoulder parking.",
    permits:
      "No general river permit is listed. Follow Salmon-Challis/Sawtooth National Recreation Area rules, Idaho AIS/PFD requirements, fire restrictions, and current Highway 75 or access notices.",
    watchFor: ["Piece of Cake", "Warm Springs Gorge / The Narrows", "cold water and changing holes", "raft-slide carry", "Highway 75 traffic"],
    season: [5, 6, 7, 8],
    imageUrl: salmonImage,
    imageLabel: "Upper Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "yankee-fork-custer-pole-flat",
    riverId: "upper-salmon-river-idaho",
    name: "Yankee Fork Salmon River",
    reach: "Custer Pullout to Pole Flat Campground",
    region: "Central Idaho / Custer County",
    routeType: "whitewater",
    summary:
      "A roughly 7.1-mile roadside Class II+ upper Yankee Fork section from the Custer Pullout through the West Fork confluence to Pole Flat Campground, linking the historic upper corridor to the existing lower Yankee run.",
    statusText:
      "Threshold-informed planning route. American Whitewater's Yankee Fork record identifies the upper-road-end-to-Salmon corridor, direct 13296000 gauge context, and a broad runnable range; USFWS survey mapping supplies the Custer Pullout, West Fork, and Pole Flat segment anchors. Recent AW reports at 1,500 cfs describe a great run while 1,800-2,000 cfs is harder Class IV on the downstream section, so this upper card remains planning-only pending current wood and local-level confirmation.",
    distance: "About 7.1 river miles",
    time: "About 3-5 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "mandatory_takeout"],
    safety: [
      "American Whitewater describes the Yankee Fork as mellow and floatable above the roadside Class III+/IV+ lower miles, but the gradient, wood, and channel character change quickly near the West Fork and Pole Flat. Use a proven crew and scout from Yankee Fork Road before committing.",
      "The direct 13296000 gauge is near Clayton and is most informative for the lower Yankee; do not transfer its reading mechanically to the upper Custer corridor. Confirm local depth, wood, and road access at the launch and at every bridge or campground transition.",
      "AW trip reports describe about 1,500 cfs as a great downstream run and 1,800-2,000 cfs as Class IV; those markers are planning context rather than a hard upper-section safety limit. Reduce the objective or take out early if wood, snowmelt, or private-frontage constraints change the risk.",
      "Pole Flat is a deliberate endpoint. Continuing downstream enters the separate Pole Flat-to-Salmon card; reassess the final bend, wood, daylight, and the next shuttle before linking sections.",
    ],
    gauge: "13296000",
    gaugeName: "Yankee Fork Salmon River near Clayton, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { idealMin: 1300, idealMax: 1800 },
    thresholdLabel:
      "American Whitewater trip-report markers on the Yankee Fork gauge: about 1,300 cfs good, 1,500 cfs great, and 1,800-2,000 cfs harder Class IV downstream; no hard cutoff is published for the upper Custer corridor",
    thresholdUrl: lowerYankeeAwReach,
    thresholdSupportUrl: lowerYankeeGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lowerYankeeAwReach,
    sourceLabel: "American Whitewater Yankee Fork upper-road-end reach record",
    mapUrl: "https://parksandrecreation.idaho.gov/state-park/land-of-the-yankee-fork-state-park/",
    additionalSourceLinks: [
      { label: "American Whitewater Yankee Fork reach and trip reports", url: lowerYankeeAwReach },
      { label: "USGS Yankee Fork gauge 13296000", url: lowerYankeeGauge },
      { label: "USFWS Yankee Fork survey segment coordinates", url: upperYankeeSegments },
      { label: "Land of the Yankee Fork State Park", url: "https://parksandrecreation.idaho.gov/state-park/land-of-the-yankee-fork-state-park/" },
      { label: "Sawtooth National Recreation Area access and road context", url: "https://www.fs.usda.gov/recarea/sawtooth/recarea/?recid=5842" },
    ],
    putIn: {
      name: "Custer Pullout / Yankee Fork Road",
      latitude: 44.385455,
      longitude: -114.701455,
      mileFromStart: 0,
      note: "USFWS Yankee Fork survey identifies the Custer Pullout at this river segment. Treat it as a roadside/turnout carry rather than a guaranteed ramp; confirm legal parking, bank access, and current road conditions before launching.",
    },
    takeOut: {
      name: "Pole Flat Campground / Yankee Fork Weir",
      latitude: 44.303037,
      longitude: -114.720434,
      mileFromStart: 7.1,
      note: "USFWS survey places Pole Flat Weir at this endpoint and the Forest Service lists Pole Flat as a seasonal developed campground. Confirm opening, parking, carry, and any monitoring or restoration restrictions before taking out.",
    },
    access: [
      {
        name: "Custer Pullout / Yankee Fork Road",
        latitude: 44.385455,
        longitude: -114.701455,
        mileFromStart: 0,
        note: "Upper roadside launch anchor from the USFWS survey; current parking and river carry require field confirmation.",
      },
      {
        name: "West Fork Yankee Fork Confluence",
        latitude: 44.349041,
        longitude: -114.726489,
        mileFromStart: 3.6,
        segmentKind: "transition",
        note: "USFWS survey segment break and road-scout transition. Use only as a contingency or scout point if a lawful shoulder and river carry are present; do not assume a formal take-out.",
      },
      {
        name: "Pole Flat Campground / Yankee Fork Weir",
        latitude: 44.303037,
        longitude: -114.720434,
        mileFromStart: 7.1,
        note: "Seasonal Forest Service campground/monitoring-area endpoint; verify current operating status, parking, and carry before relying on it.",
      },
    ],
    camping:
      "Pole Flat is a developed Forest Service campground when open, with additional seasonal campgrounds along the Yankee Fork corridor. Custer is a day-use historic site; do not assume overnight camping at the pullout or any riverbank transition.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Yankee Fork Road parallels the section. Stage at Pole Flat first, then drive upstream to the Custer Pullout; use the West Fork location for a road-side scout only and expect narrow shoulders, seasonal closures, and tourist traffic near the historic sites.",
    permits:
      "No river permit is listed for this day run. Follow Salmon-Challis/Sawtooth National Recreation Area and Land of the Yankee Fork State Park rules, campground fees, Idaho AIS/PFD requirements, fire restrictions, and current road or restoration notices.",
    watchFor: ["mobile wood and changing channels", "West Fork transition", "cold water and fast rise", "roadside carries", "Pole Flat monitoring/campground endpoint"],
    season: [5, 6, 7, 8],
    imageUrl: salmonImage,
    imageLabel: "Yankee Fork-Salmon watershed context photograph",
  }),

  makeRoute({
    id: "yankee-fork-pole-flat-salmon",
    riverId: "upper-salmon-river-idaho",
    name: "Yankee Fork Salmon River",
    reach: "Pole Flat Campground to Salmon River",
    region: "Central Idaho / Custer County",
    routeType: "whitewater",
    summary:
      "A 3.3-mile roadside Class III-IV lower Yankee Fork run from Pole Flat Campground to the Salmon confluence, with nearly continuous road scouting and a direct Yankee Fork gauge.",
    statusText:
      "Threshold-informed planning route. American Whitewater documents the named access pair, direct 13296000 gauge, broad runnable character, and recent trip reports near 1,300 cfs as good and 1,500 cfs as great; 1,800-2,000 cfs reports describe a harder Class IV character. Wood at the final bend and changing channels keep this route planning-only.",
    distance: "About 3.3 river miles",
    time: "About 2-4 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "mandatory_takeout"],
    safety: [
      "American Whitewater describes the lower Yankee as roadside Class III+ or IV+ depending on level, with boulder gardens at low flows and wave trains at higher flows. Use a proven whitewater crew, helmet, throw bag, and craft matched to the current.",
      "Recent American Whitewater reports identify a serious wood pile near the final bend and another river-wide jam above the confluence. Scout the last bend from the road before committing and take out above any blocked channel.",
      "Trip-report flow markers are planning context, not a hard safe range: about 1,300 cfs felt good, 1,500 cfs was described as great, and 1,800-2,000 cfs was reported as Class IV. Confirm the direct gauge trend and current wood before launch.",
      "The route ends at the Salmon confluence; if continuing downstream, treat the lower Yankee take-out as a deliberate transition into the separate Sunbeam reach and re-check the downstream plan.",
    ],
    gauge: "13296000",
    gaugeName: "Yankee Fork Salmon River near Clayton, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { idealMin: 1300, idealMax: 1800 },
    thresholdLabel:
      "American Whitewater trip-report markers: about 1,300 cfs good, 1,500 cfs great, and 1,800-2,000 cfs harder Class IV; no defensible hard cutoff published",
    thresholdUrl: lowerYankeeAwReach,
    thresholdSupportUrl: lowerYankeeGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lowerYankeeAwReach,
    sourceLabel: "American Whitewater Lower Yankee reach record",
    mapUrl: "https://www.fs.usda.gov/visit/destinations/upper-salmon-river",
    additionalSourceLinks: [
      { label: "American Whitewater Lower Yankee reach and trip reports", url: lowerYankeeAwReach },
      { label: "USGS Yankee Fork gauge 13296000", url: lowerYankeeGauge },
      { label: "Sawtooth National Recreation Area access and road context", url: "https://www.fs.usda.gov/recarea/sawtooth/recarea/?recid=5842" },
      { label: "Sunbeam Day Stretch downstream continuation", url: sunbeamDayStretchAw },
    ],
    putIn: {
      name: "Pole Flat Campground Put-In",
      latitude: 44.30339498653518,
      longitude: -114.72009849200768,
      mileFromStart: 0,
      note: "American Whitewater's named roadside Pole Flat access; confirm campground opening, parking, and carry conditions before launching.",
    },
    takeOut: {
      name: "Lower Yankee Salmon Confluence Take-Out",
      latitude: 44.26946869974512,
      longitude: -114.73403316801074,
      mileFromStart: 3.3,
      note: "American Whitewater's named take-out near the Salmon confluence. Inspect the final bend and any wood from the road; do not continue into the Salmon without a separate downstream plan.",
    },
    camping:
      "Pole Flat is a developed Forest Service campground when open; the confluence endpoint is a day-use take-out. Do not assume dispersed overnight camping at the final bend or confluence.",
    campingClassification: "endpoint_campground",
    shuttle:
      "The Yankee Fork road parallels most of the short reach, making a low-mileage shuttle and visual wood check practical. Stage the take-out vehicle before driving to Pole Flat and account for seasonal road and campground conditions.",
    permits:
      "No river permit is listed for this day run. Follow Salmon-Challis/Sawtooth National Recreation Area rules, campground fees, Idaho AIS/PFD requirements, fire restrictions, and current road or closure notices.",
    watchFor: ["final-bend wood pile", "river-wide jam above the confluence", "boulder gardens and pin rocks", "cold water and fast rise", "mandatory take-out before downstream Salmon continuation"],
    season: [5, 6, 7, 8],
    imageUrl: salmonImage,
    imageLabel: "Yankee Fork-Salmon watershed context photograph",
  }),

  makeRoute({
    id: "salmon-river-east-fork-bayhorse",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "East Fork Recreation Site to Bayhorse Recreation Site",
    region: "Central Idaho / Custer County",
    routeType: "recreational",
    summary:
      "A roughly 11.7-mile Class II Upper Salmon section from the public East Fork campground/ramp through Deadman Hole to the developed Bayhorse campground and ramp.",
    statusText:
      "Gauge-scored threshold route. RiverBrain documents the 20-mile East Fork-to-Challis run, the direct Salmon-at-Salmon gauge, a 600-8,000 cfs recommended envelope, 2,000 cfs average, named East Fork/Deadman/Bayhorse access, camping, and two diversion-dam decisions. This scoped East Fork-to-Bayhorse segment ends at the developed Bayhorse ramp before the existing Bayhorse-to-Challis card.",
    distance: "About 11.7 river miles",
    time: "About 4-6 hours plus shuttle and diversion scouting",
    difficulty: "moderate",
    risk: "caution",
    hazards: salmonHazards,
    safety: [
      "RiverBrain rates the East Fork-to-Challis corridor Class II but identifies two diversion dams and the Challis Rock Garden. Stay on the published safe side of each diversion and scout whenever the water is high, turbid, or changing.",
      "The 600-8,000 cfs envelope and 1,500-2,500 cfs planning band are reach guidance from the direct Salmon-at-Salmon gauge, not a safety guarantee for every rapid. Current wood, private frontage, cold water, weather, and craft choice control the launch decision.",
      "East Fork and Deadman Hole are public BLM access/camping areas; Bayhorse is a developed BLM/IDFG campground and ramp. Confirm seasonal opening, fees, parking, ramp condition, and current river-side carry before launch.",
      "This card ends at Bayhorse. Continuing downstream enters the separate Bayhorse-to-Challis Bridge route; re-check daylight, downstream wood, diversion features, and shuttle before linking sections.",
    ],
    gauge: "13302500",
    gaugeName: "Salmon River at Salmon, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1500, idealMax: 2500, tooHigh: 8000 },
    thresholdLabel:
      "RiverBrain East Fork-to-Challis guidance: 600 cfs minimum, 2,000 cfs average, 8,000 cfs maximum; 1,500-2,500 cfs conservative planning band",
    thresholdUrl: eastForkChallisRun,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13302500/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    mapUrl: upperSalmonPage,
    additionalSourceLinks: [
      { label: "RiverBrain East Fork-to-Challis run and access table", url: eastForkChallisRun },
      { label: "USGS Salmon River at Salmon direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13302500/" },
      { label: "RiverBrain East Fork access", url: eastForkAccess },
      { label: "RiverBrain Deadman Hole access", url: deadmanHoleAccess },
      { label: "BLM Bayhorse Recreation Site", url: "https://www.blm.gov/visit/bayhorse-recreation-site" },
      { label: "Idaho Fish and Game Bayhorse boat ramp", url: "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22461-fishing-and-boating-access-site-bayhorse" },
      { label: "Recreation.gov Upper Salmon gateway", url: "https://www.recreation.gov/gateways/16490" },
    ],
    putIn: {
      name: "East Fork Recreation Site boat ramp",
      latitude: 44.267071,
      longitude: -114.326309,
      mileFromStart: 0,
      note: "Public BLM East Fork campground/ramp at the Salmon–East Fork confluence; confirm seasonal opening, parking, fees, and the carry from the facility to the river.",
    },
    takeOut: {
      name: "Bayhorse Recreation Site boat ramp",
      latitude: 44.385555,
      longitude: -114.260278,
      mileFromStart: 11.7,
      note: "Developed BLM/IDFG campground ramp with day-use parking; stage before launch and confirm current ramp, camping, and parking status.",
    },
    access: [
      {
        name: "East Fork Recreation Site boat ramp",
        latitude: 44.267071,
        longitude: -114.326309,
        mileFromStart: 0,
        note: "RiverBrain and BLM identify this as an all-vehicle public access with camping and water; confirm current seasonal operations and carry.",
      },
      {
        name: "Deadman Hole Access",
        latitude: 44.34696959,
        longitude: -114.26590204,
        mileFromStart: 7.7,
        segmentKind: "transition",
        note: "RiverBrain identifies a primitive all-vehicle access with dispersed camping, water, and a boat ramp; use as a contingency or mid-run exit only after confirming current parking and landing.",
      },
      {
        name: "Bayhorse Recreation Site boat ramp",
        latitude: 44.385555,
        longitude: -114.260278,
        mileFromStart: 11.7,
        note: "Developed BLM/IDFG endpoint ramp and campground; verify current fees, parking, carry, and river traffic before relying on the landing.",
      },
    ],
    camping:
      "East Fork offers developed seasonal camping; Deadman Hole has primitive dispersed camping; Bayhorse offers a developed fee campground with water, toilets, and a boat ramp. Confirm seasonal openings, fees, fire restrictions, and occupancy before relying on any site.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Highway 75/93 parallels the reach. Stage at Bayhorse, then drive to East Fork; use Deadman Hole for a contingency exit or scout and leave room for trailers, anglers, and campground traffic.",
    permits:
      "No general river permit is listed for this Upper Salmon day run. Follow BLM/Salmon-Challis rules, developed-campground fees, Idaho AIS/PFD requirements, fire restrictions, and current road/access notices.",
    watchFor: ["two diversion dams", "Challis Rock Garden downstream transition", "spring wood and sweepers", "cold water", "private frontage and campground traffic"],
    season: [3, 4, 5, 6, 7, 8, 9, 10],
    imageUrl: salmonImage,
    imageLabel: "Upper Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "salmon-river-bayhorse-challis-bridge",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Bayhorse to Challis Bridge",
    region: "Central Idaho / Challis",
    routeType: "recreational",
    summary: "An 8.3-mile Upper Salmon reach between two developed BLM ramps.",
    statusText:
      "Gauge-scored Class I-II float. Verify cottonwood wood, diversion structures, fire restrictions, and the Bayhorse/Challis ramp status independently of the score.",
    distance: "8.3 river miles",
    time: "About 3-5 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: salmonHazards,
    safety: commonSalmonSafety,
    gauge: "13302500",
    gaugeName: "Salmon River at Salmon, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 600,
      idealMin: 1500,
      idealMax: 2500,
      tooHigh: 8000,
    },
    thresholdLabel:
      "RiverBrain East Fork-Challis 600-8,000 cfs band; 1,500-2,500 cfs ideal band derived around the published 2,000 cfs average",
    thresholdUrl: upperSalmonThresholdGuides.bayhorseChallis,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    mapUrl: upperSalmonPage,
    putIn: {
      name: "Bayhorse Recreation Site boat ramp",
      latitude: 44.385555,
      longitude: -114.260278,
      mileFromStart: 0,
      note: "BLM developed ramp at guide river mile 50.2.",
    },
    takeOut: {
      name: "Challis Bridge Recreation Site boat ramp",
      latitude: 44.470151,
      longitude: -114.200743,
      mileFromStart: 8.3,
      note: "BLM public ramp at guide river mile 58.5.",
    },
    camping:
      "Bayhorse has a fee campground; use only developed or mapped public camping and confirm current fire restrictions.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Highway 75/93 shuttle; stage at Challis Bridge and avoid ramp congestion.",
    permits:
      "No general Upper Salmon float fee; developed camping fees, Idaho invasive-species sticker, PFD, fishing licenses, and current fire rules may apply.",
    watchFor: [
      "diversion structures and wood",
      "cold water and changing channels",
      "mixed private/public banks",
    ],
    imageUrl: salmonImage,
    imageLabel: "BLM Upper Salmon near Challis same-river context",
  }),
  makeRoute({
    id: "salmon-river-challis-bridge-watts",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Challis Bridge to Watts Bridge",
    region: "Central Idaho / Challis Valley",
    routeType: "recreational",
    summary: "A 14.2-mile Class I-II valley float between mapped public ramps.",
    statusText:
      "Gauge-scored route. BLM warns that this braided cottonwood reach can hold downed or submerged trees and includes diversion structures; do not use the private Challis Hot Springs ramp without permission.",
    distance: "14.2 river miles",
    time: "About 4-7 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: salmonHazards,
    safety: commonSalmonSafety,
    gauge: "13302500",
    gaugeName: "Salmon River at Salmon, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 800,
      idealMin: 2000,
      idealMax: 3000,
      tooHigh: 7000,
    },
    thresholdLabel:
      "RiverBrain Challis-Watts 800-7,000 cfs band; 2,000-3,000 cfs ideal band derived around the published 2,500 cfs average",
    thresholdUrl: upperSalmonThresholdGuides.challisWatts,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    putIn: {
      name: "Challis Bridge Recreation Site boat ramp",
      latitude: 44.470151,
      longitude: -114.200743,
      mileFromStart: 0,
      note: "Public BLM ramp at mile 58.5.",
    },
    takeOut: {
      name: "Watts Bridge Boat Ramp",
      latitude: 44.631987,
      longitude: -114.145458,
      mileFromStart: 14.2,
      note: "Mapped public ramp at guide mile 72.7.",
    },
    camping:
      "Use named public campgrounds such as Watts Bridge; never assume a cottonwood bar or private bank is a legal camp.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Highway 93 shuttle; inspect Watts Bridge parking and landing before launch.",
    permits:
      "Idaho invasive-species sticker when applicable, PFD, and current fishing/camping/fire rules.",
    watchFor: [
      "braided channel and cottonwood strainers",
      "diversion dams",
      "private Challis Hot Springs access",
    ],
    imageUrl: salmonImage,
    imageLabel: "BLM Upper Salmon near Challis same-river context",
  }),
  makeRoute({
    id: "salmon-river-watts-kilpatrick",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Watts Bridge to Kilpatrick",
    region: "Central Idaho / Challis-Ellis",
    routeType: "recreational",
    summary:
      "A 22-mile full-day Upper Salmon float through the Ellis corridor to Kilpatrick.",
    statusText:
      "Long gauge-scored Class I-II route. Stable weather, early launch, current wood reconnaissance, and a conservative daylight cutoff are essential.",
    distance: "22 river miles",
    time: "About 6-10 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: salmonHazards,
    safety: commonSalmonSafety,
    gauge: "13302500",
    gaugeName: "Salmon River at Salmon, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 800,
      idealMin: 1500,
      idealMax: 2500,
      tooHigh: 6000,
    },
    thresholdLabel:
      "RiverBrain adjacent Watts-Kilpatrick corridor reaches: 800-6,000 cfs; 1,500-2,500 cfs ideal band derived around the published 2,000 cfs average",
    thresholdUrl: upperSalmonThresholdGuides.pahsimeroiRoyalGorge,
    thresholdSupportUrl: upperSalmonThresholdGuides.colstonSalmon,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    putIn: {
      name: "Watts Bridge Boat Ramp",
      latitude: 44.631987,
      longitude: -114.145458,
      mileFromStart: 0,
      note: "Public launch at guide mile 72.7.",
    },
    takeOut: {
      name: "Kilpatrick Boat Ramp",
      latitude: 44.830104,
      longitude: -113.987239,
      mileFromStart: 22,
      note: "Public BLM/IDFG access at guide mile 94.7.",
    },
    camping:
      "Kilpatrick is day use; use a legal nearby campground and do not camp on private banks.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Long Highway 93 shuttle; stage the take-out, carry extra supplies, and set a turnaround/daylight plan.",
    permits:
      "No general Upper Salmon float fee; invasive-species, PFD, fishing, camping, and fire requirements apply.",
    watchFor: [
      "long exposure and limited rescue",
      "wood, riffles, and canyon features",
      "private banks",
    ],
    imageUrl: salmonImage,
    imageLabel: "BLM Upper Salmon near Challis same-river context",
  }),
  makeRoute({
    id: "salmon-river-kilpatrick-salmon-island",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Kilpatrick to Salmon Island Park",
    region: "Central Idaho / Lemhi Valley",
    routeType: "recreational",
    summary:
      "A 31.6-mile long-day or carefully planned overnight Upper Salmon itinerary to the City of Salmon.",
    statusText:
      "Gauge-scored endurance route. Use intermediate public accesses only as mapped, avoid private banks, and take the left/north channel approaching Salmon Island as directed by the official guide.",
    distance: "31.6 river miles",
    time: "About 8-12 hours or a planned overnight",
    difficulty: "moderate",
    risk: "caution",
    hazards: salmonHazards,
    safety: [
      ...commonSalmonSafety,
      "The guide directs boaters into the left/north channel approaching Salmon Island and identifies additional diversions near Salmon.",
    ],
    gauge: "13302500",
    gaugeName: "Salmon River at Salmon, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 800,
      idealMin: 1500,
      idealMax: 2500,
      tooHigh: 6000,
    },
    thresholdLabel:
      "RiverBrain Colston-Salmon 800-6,000 cfs band; 1,500-2,500 cfs ideal band derived around the published 2,000 cfs average",
    thresholdUrl: upperSalmonThresholdGuides.colstonSalmon,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    putIn: {
      name: "Kilpatrick Boat Ramp",
      latitude: 44.830104,
      longitude: -113.987239,
      mileFromStart: 0,
      note: "Public access at guide mile 94.7.",
    },
    takeOut: {
      name: "Salmon Island Park boat ramp",
      latitude: 45.170721,
      longitude: -113.894916,
      mileFromStart: 31.6,
      note: "City/public ramp at guide mile 126.3; approach via the left/north channel.",
    },
    access: [
      {
        name: "Kilpatrick Boat Ramp",
        latitude: 44.830104,
        longitude: -113.987239,
        mileFromStart: 0,
        note: "Public launch.",
      },
      {
        name: "Shoup Bridge Recreation Site",
        latitude: 45.098056,
        longitude: -113.893333,
        mileFromStart: 25.1,
        note: "BLM public launch/camp at guide mile 119.8; optional operational break.",
      },
      {
        name: "Salmon Island Park boat ramp",
        latitude: 45.170721,
        longitude: -113.894916,
        mileFromStart: 31.6,
        note: "Public endpoint.",
      },
    ],
    camping:
      "Overnight only at a named public campground such as Shoup Bridge and subject to fees/fire rules; no private-bank camping.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Very long Highway 93 shuttle; stage in Salmon and consider splitting at Shoup Bridge.",
    permits:
      "Invasive-species sticker when applicable, PFD, and current campground, fire, fishing, and municipal park rules.",
    watchFor: [
      "long-distance exposure",
      "Salmon Island left-channel instruction",
      "diversions and private banks",
    ],
    imageUrl: salmonImage,
    imageLabel: "BLM Upper Salmon near Challis same-river context",
  }),
  makeRoute({
    id: "salmon-river-salmon-island-north-fork",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "Salmon Island Park to North Fork",
    region: "Central Idaho / Salmon-North Fork",
    routeType: "recreational",
    summary:
      "A 22.3-mile Class I-II float from Salmon to the developed North Fork ramp.",
    statusText:
      "Gauge-scored long day. Three mapped diversion dams occur above Carmen/Morgan Bar; use the signed public ramp chain and finish at North Fork before committing to the remote Main Salmon.",
    distance: "22.3 river miles",
    time: "About 6-10 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: [...salmonHazards, "dam"],
    safety: [
      ...commonSalmonSafety,
      "The official guide maps several diversion dams between Salmon and Tower Rock; identify them before launch and follow current signed passage or portage directions.",
    ],
    gauge: "13302500",
    gaugeName: "Salmon River at Salmon, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 800,
      idealMin: 1500,
      idealMax: 2500,
      tooHigh: 6000,
    },
    thresholdLabel:
      "RiverBrain Salmon-North Fork 800-6,000 cfs band; 1,500-2,500 cfs ideal band derived around the published 2,000 cfs average",
    thresholdUrl: upperSalmonThresholdGuides.salmonNorthFork,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    putIn: {
      name: "Salmon Island Park boat ramp",
      latitude: 45.170721,
      longitude: -113.894916,
      mileFromStart: 0,
      note: "Public City of Salmon launch.",
    },
    takeOut: {
      name: "North Fork Boat Ramp",
      latitude: 45.405025,
      longitude: -113.995352,
      mileFromStart: 22.3,
      note: "Developed public ramp at guide mile 148.6.",
    },
    access: [
      {
        name: "Salmon Island Park boat ramp",
        latitude: 45.170721,
        longitude: -113.894916,
        mileFromStart: 0,
        note: "Public launch.",
      },
      {
        name: "Tower Rock Recreation Site",
        latitude: 45.313985,
        longitude: -113.899756,
        mileFromStart: 10.8,
        note: "Mapped public campground/boat access at guide mile 137.1; verify exact signed landing.",
      },
      {
        name: "North Fork Boat Ramp",
        latitude: 45.405025,
        longitude: -113.995352,
        mileFromStart: 22.3,
        note: "Public endpoint.",
      },
    ],
    camping:
      "Tower Rock provides a potential developed on-route campground; verify fees, fire restrictions, and availability. Do not camp on private banks.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Long Highway 93 shuttle; stage at North Fork and consider splitting at Tower Rock.",
    permits:
      "Invasive-species sticker when applicable, PFD, and current campground, fire, fishing, and access rules.",
    watchFor: [
      "diversion dams near Carmen",
      "long trip and remote canyon pockets",
      "Main Salmon commitment below North Fork",
    ],
    imageUrl: salmonImage,
    imageLabel: "BLM Upper Salmon near Challis same-river context",
  }),

  makeRoute({
    id: "salmon-river-north-fork-corn-creek",
    riverId: "upper-salmon-river-idaho",
    name: "Salmon River",
    reach: "North Fork to Corn Creek",
    region: "Central Idaho / Salmon-Corn Creek",
    routeType: "whitewater",
    summary:
      "A 46-mile Class III roadside Salmon River run from the public North Fork ramp to the Forest Service Corn Creek launch and campground.",
    statusText:
      "Gauge-scored reach with unusually strong access documentation. How's Your River and American Whitewater publish the same 46-mile endpoint chain and a 600-8,000 cfs runnable band on the direct Salmon River at Salmon gauge; the band is explicitly labeled a broad SWAG, so scouting and current road conditions remain decisive.",
    distance: "46 river miles, multi-day staged section",
    time: "About 2 days for the full reach; many parties split at Spring Creek or Cove Creek",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      ...salmonHazards,
      "remote",
      "fast_rise",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      ...commonSalmonSafety,
      "American Whitewater rates the reach Class III and identifies long roadside exposure, changing wood, current, and limited recovery between named access sites. Use a proven whitewater craft, rescue equipment, and a crew matched to the full day or split section.",
      "The North Fork ramp is an Idaho Fish and Game lease behind the North Fork Store and is open during daylight; Spring Creek Campground and Cove Creek Boating Site provide practical split-trip options. Confirm gates, parking, fees, and the washboard Salmon River Road before committing to Corn Creek.",
      "Corn Creek is the transition to the permit-controlled Main Salmon. Take out at the Forest Service ramp and campground unless the party has the required Main Salmon permit, equipment, and itinerary.",
    ],
    gauge: "13302500",
    gaugeName: "Salmon River at Salmon, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1500, idealMax: 4000, tooHigh: 8000 },
    thresholdLabel:
      "How's Your River/American Whitewater reach guidance: 600-8,000 cfs runnable (broad SWAG); 1,500-4,000 cfs retained as a conservative planning band",
    thresholdUrl: salmonNorthForkCornCreekThreshold,
    thresholdSupportUrl: salmonNorthForkCornCreekAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperSalmonGuide,
    sourceLabel: "BLM/USFS/IDFG Upper Salmon boating guide",
    mapUrl: salmonNorthForkCornCreekAwReach,
    additionalSourceLinks: [
      { label: "How's Your River reach and live gauge context", url: salmonNorthForkCornCreekThreshold },
      { label: "American Whitewater endpoint and access chain", url: salmonNorthForkCornCreekAwReach },
      { label: "USGS Salmon River at Salmon direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13302500/" },
      { label: "Idaho Fish and Game fisheries plan / Salmon River road corridor", url: "https://idfg.idaho.gov/sites/default/files/2025-2030-fish-management-plan-final-web-resolution.pdf" },
      { label: "Forest Service Corn Creek launch and campground context", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5365708.pdf" },
      { label: "Cove Creek Boat Ramp map reference", url: "https://mapcarta.com/N7577961429" },
    ],
    putIn: {
      name: "North Fork Boat Ramp",
      latitude: 45.405025,
      longitude: -113.995352,
      mileFromStart: 0,
      note: "Public daylight access administered by Idaho Fish and Game through a private-land lease behind the North Fork Store and Campground; accessible toilet and boat ramp are documented by American Whitewater.",
    },
    takeOut: {
      name: "Corn Creek Boat Ramp and Campground",
      latitude: 45.37004534,
      longitude: -114.6876955,
      mileFromStart: 46,
      note: "Forest Service ramp and adjacent campground at the end of Salmon River Road; standard Main Salmon launch boundary and mandatory take-out for this permit-free reach.",
    },
    access: [
      {
        name: "North Fork Boat Ramp",
        latitude: 45.405025,
        longitude: -113.995352,
        mileFromStart: 0,
        note: "Idaho Fish and Game leased public ramp behind North Fork Store; daylight access, toilet, and limited private-campground adjacency.",
      },
      {
        name: "Spring Creek Campground Access",
        latitude: 45.39203,
        longitude: -114.25161,
        mileFromStart: 16.2,
        note: "Forest Service campground and ramp documented by American Whitewater; practical split-trip launch or take-out, subject to road and campground status.",
      },
      {
        name: "Cove Creek Boating Site",
        latitude: 45.3261,
        longitude: -114.42841,
        mileFromStart: 27.8,
        note: "Forest Service boating site and ramp commonly used as a day-trip take-out; confirm exact landing and parking on arrival.",
      },
      {
        name: "Corn Creek Boat Ramp and Campground",
        latitude: 45.37004534,
        longitude: -114.6876955,
        mileFromStart: 46,
        note: "Forest Service endpoint ramp with campground, water, and ranger-station context; permit-required Main Salmon begins downstream.",
      },
    ],
    camping:
      "Spring Creek Campground, Cove Creek-area sites, and Corn Creek Campground provide named public overnight options when open; use only designated Forest Service or other lawful sites and follow fire, sanitation, and permit rules.",
    campingClassification: "on_route_campsite",
    shuttle:
      "The Salmon River Road parallels the reach but is long, narrow, and partly washboard. Stage a North Fork vehicle before the one-way drive to Corn Creek, or split at Spring Creek/Cove Creek and use a local shuttle provider.",
    permits:
      "No Main Salmon permit is required for the North Fork-to-Corn Creek roadside reach itself, but a permit is required beyond Corn Creek. Carry Idaho AIS/PFD compliance, verify campground and road closures, and follow Forest Service/IDFG notices.",
    watchFor: [
      "Class III roadside rapids and changing wood",
      "long remote shuttle on Salmon River Road",
      "Spring Creek and Cove Creek split-trip logistics",
      "Corn Creek permit boundary",
    ],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "main-salmon-corn-creek-vinegar-carey",
    riverId: "main-salmon-river-idaho",
    name: "Main Salmon River",
    reach: "Corn Creek to Vinegar Creek/Carey Creek",
    region: "Central Idaho / Frank Church River of No Return Wilderness",
    routeType: "whitewater",
    summary: "A 79-mile permit-controlled Main Salmon wilderness expedition from Corn Creek to the Vinegar Creek or Carey Creek take-outs.",
    statusText: "Planning-only threshold card because the practical gauge is proxy context for this reach. RiverBrain publishes 4,000 cfs minimum, 20,000 cfs average, and 35,000 cfs maximum; Forest Service permit rules apply upstream of Vinegar Creek.",
    distance: "About 79 river miles, multi-day",
    time: "About 5-8 days depending on camps, scouting, and permit itinerary",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "mandatory_takeout", "access_uncertain"],
    safety: [
      "RiverBrain lists Class III-IV water and 50 rapids, including Black Creek, Elkhorn, Big Mallard, Whiplash, Chittam, and Vinegar; scout evolving drops and carry wilderness rescue equipment.",
      "The Frank Church River of No Return Wilderness has limited road access, long evacuation times, changing wood, cold water, and no reliable cell coverage. Carry satellite communication, repair/rescue gear, and first aid.",
      "A Forest Service float permit is required year-round upstream of Vinegar Creek; the June 20-September 7 control season limits launches and trip length. Verify permit, camp assignment, AIS sticker, required gear, fire-pan/portable-toilet rules, closures, and road status.",
      "Corn Creek is a paved ramp with camping, water, and a ranger station. Vinegar Creek has concrete ramps and pit toilets; Carey Creek is a concrete river-left ramp below the pack bridge.",
    ],
    gauge: "13307000",
    gaugeName: "Salmon River near Shoup, ID",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 4000, idealMin: 12000, idealMax: 28000, tooHigh: 35000 },
    thresholdLabel: "RiverBrain recommended 4,000 cfs minimum, 20,000 cfs average, and 35,000 cfs maximum; 12,000-28,000 cfs planning ideal, retained for planning because the gauge is proxy context",
    thresholdUrl: mainSalmonThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: mainSalmonPermit,
    sourceLabel: "Salmon-Challis National Forest Main Salmon permit and river rules",
    mapUrl: mainSalmonThreshold,
    additionalSourceLinks: [
      { label: "RiverBrain Corn Creek Ramp access", url: mainSalmonPutInSource },
      { label: "RiverBrain Vinegar Creek Boat Ramp access", url: mainSalmonVinegarSource },
      { label: "RiverBrain Carey Creek Ramp access", url: mainSalmonCareySource },
      { label: "USGS Salmon River near Shoup monitoring location", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13307000/", provider: "usgs" },
    ],
    putIn: { name: "Corn Creek Ramp Put-In", latitude: 45.37004534, longitude: -114.6876955, mileFromStart: 0, note: "Named paved all-vehicle ramp with camping, water, and ranger station." },
    takeOut: { name: "Vinegar Creek Boat Ramp Take-Out", latitude: 45.45952484, longitude: -115.89294611, mileFromStart: 79, note: "Named concrete all-vehicle ramp with pit toilets; Carey Creek is an alternate public concrete take-out." },
    access: [
      { name: "Corn Creek Ramp Put-In", latitude: 45.37004534, longitude: -114.6876955, mileFromStart: 0, note: "Public paved ramp, camping, water, and ranger station." },
      { name: "Carey Creek Ramp", latitude: 45.45323331, longitude: -115.94587683, mileFromStart: 79.5, note: "Alternate public concrete river-left ramp below the pack bridge; coordinate shuttle before departure." },
      { name: "Vinegar Creek Boat Ramp Take-Out", latitude: 45.45952484, longitude: -115.89294611, mileFromStart: 79, note: "Public concrete ramp and pit toilets; endpoint used for the permit corridor." },
    ],
    camping: "RiverBrain lists 96 dispersed camps along the Main Salmon. Camp only at designated or established sites in the permit itinerary, pack out waste, follow fire-pan and portable-toilet requirements, and use Corn Creek water before entering the wilderness.",
    campingClassification: "on_route_campsite",
    shuttle: "Remote one-way shuttle from Vinegar/Carey Creek back to Corn Creek; use a qualified outfitter or pre-stage vehicles and allow recovery time for seasonal roads.",
    permits: "Recreation.gov requires a year-round permit upstream of Vinegar Creek; the June 20-September 7 control season limits launches and trip length. Confirm current lottery, camp assignment, fees, AIS sticker, required gear, closures, and cancellation rules.",
    watchFor: ["Black Creek, Elkhorn, Big Mallard, Whiplash, Chittam, and Vinegar Rapids", "changing wood and evolving side-channel blowouts", "remote evacuation and no-cell-coverage wilderness conditions", "permit, camp assignment, fire-pan, portable-toilet, and AIS rules", "Vinegar/Carey Creek take-out choice and long shuttle"],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Main Salmon same-river context photograph",
  }),

  makeRoute({
    id: "salmon-river-carey-creek-riggins",
    riverId: "lower-salmon-river-idaho",
    name: "Salmon River",
    reach: "Carey Creek to Riggins City Park",
    region: "North-Central Idaho / Riggins",
    routeType: "whitewater",
    summary:
      "A 23-mile Class III-IV roadside whitewater run from the paved Carey Creek ramp to the public Riggins City Park boat ramp.",
    statusText:
      "Gauge-scored expert day or overnight option. American Whitewater and How's Your River document the Carey Creek-to-Riggins reach, its campground/ramp chain, and a broad 1,000-100,000 cfs White Bird gauge envelope; the high end is an expert hazard context, not a recommendation.",
    distance: "About 23 river miles",
    time: "About 5-9 hours; Spring Bar, Island Bar, or Shorts Bar can shorten the day",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      ...salmonHazards,
      "remote",
      "fast_rise",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      ...commonSalmonSafety,
      "American Whitewater rates the reach Class III-IV and identifies Ruby Rapids, Lake Creek Rapids, Mill Wave, and high-flow holes. Use a proven whitewater craft, helmet, rescue equipment, and a crew that can manage changing hydraulics and long recovery pools.",
      "Carey Creek is a paved ramp with parking, picnic tables, and toilets. Spring Bar, Van Creek, Island Bar, and Shorts Bar provide documented public split-trip or overnight options, while the Salmon River Road becomes single-lane and rough in places.",
      "Riggins City Park is a public ramp at the downstream end. At high spring flows the reach becomes substantially more hazardous; the 1,000-100,000 cfs envelope is a broad source range, not a safe operating limit, and local inspection controls the go/no-go call.",
    ],
    gauge: "13317000",
    gaugeName: "Salmon River at White Bird, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 3000, idealMax: 30000, tooHigh: 100000 },
    thresholdLabel:
      "How's Your River/American Whitewater reach guidance: 1,000-100,000 cfs runnable; 3,000-30,000 cfs retained as a conservative operating band, with high-flow expert hazards above that",
    thresholdUrl: salmonCareyRigginsThreshold,
    thresholdSupportUrl: salmonCareyRigginsAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: salmonCareyRigginsAwReach,
    sourceLabel: "American Whitewater Carey Creek-to-Riggins reach guide",
    mapUrl: salmonCareyRigginsAwReach,
    additionalSourceLinks: [
      { label: "How's Your River reach and live gauge context", url: salmonCareyRigginsThreshold },
      { label: "Riggins City Park Boat Ramp map reference", url: salmonRigginsCityPark },
      { label: "USGS Salmon River at White Bird direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13317000/" },
      { label: "BLM Lower Salmon River access guide", url: lowerSalmonPage },
      { label: "Forest Service Salmon River Road and ramp context", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5300616.pdf" },
    ],
    putIn: {
      name: "Carey Creek Boat Ramp",
      latitude: 45.45323331,
      longitude: -115.94587683,
      mileFromStart: 0,
      note: "Popular paved public ramp with a large parking area, picnic tables, and toilets; alternate Main Salmon take-out and roadside-run put-in.",
    },
    takeOut: {
      name: "Riggins City Park Boat Ramp",
      latitude: 45.42556,
      longitude: -116.31155,
      mileFromStart: 23,
      note: "Public city-park slipway/ramp at Highway 95 mile 195.7, identified by American Whitewater and mapped as a named boat ramp; confirm any construction closure before launch.",
    },
    access: [
      {
        name: "Carey Creek Boat Ramp",
        latitude: 45.45323331,
        longitude: -115.94587683,
        mileFromStart: 0,
        note: "Paved public ramp, parking, picnic tables, and toilets; verify seasonal road status.",
      },
      {
        name: "Spring Bar Campground and Ramp",
        latitude: 45.426837,
        longitude: -116.152075,
        mileFromStart: 12.7,
        note: "Forest Service campground with paved boat ramp, water, toilets, and 18 tent sites; useful split-trip or overnight staging point.",
      },
      {
        name: "Island Bar Recreation Site",
        latitude: 45.41583317,
        longitude: -116.25944467,
        mileFromStart: 19.1,
        note: "BLM public access and dispersed camping; gravel approach and islanding risk increase at flows above 35,000 cfs.",
      },
      {
        name: "Shorts Bar Recreation Site",
        latitude: 45.411944,
        longitude: -116.302222,
        mileFromStart: 21.7,
        note: "BLM public site with paved ramp, toilets, and camping; frequent staging option before the final Riggins reach.",
      },
      {
        name: "Riggins City Park Boat Ramp",
        latitude: 45.42556,
        longitude: -116.31155,
        mileFromStart: 23,
        note: "Public city-park take-out ramp at the historic scow; confirm current paving, fencing, and event closures.",
      },
    ],
    camping:
      "Spring Bar, Van Creek, Island Bar, and Shorts Bar provide named Forest Service or BLM overnight options when open. Use only designated or established sites, pack out waste, and follow fire, sanitation, and seasonal fishing restrictions.",
    campingClassification: "on_route_campsite",
    shuttle:
      "The Salmon River Road parallels the run but is narrow and partly single-lane. Stage at Riggins City Park and drive the long road to Carey Creek, or use a local Riggins shuttle; allow extra time for construction and fire closures.",
    permits:
      "No Main Salmon permit is required for this Carey Creek-to-Riggins roadside section. Carry Idaho AIS/PFD compliance, confirm BLM/Forest Service campground status, and obey current city, fishing, fire, and river-closure notices.",
    watchFor: [
      "Ruby Rapids, Lake Creek Rapids, and Mill Wave",
      "high-flow holes and changing wood",
      "narrow Salmon River Road and long shuttle",
      "Spring Bar/Island Bar/Shorts Bar split-trip logistics",
    ],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "middle-fork-salmon-marsh-boundary",
    riverId: "middle-fork-salmon-river-idaho",
    name: "Middle Fork Salmon River",
    reach: "Marsh Creek to Boundary Creek",
    region: "Central Idaho / Frank Church River of No Return Wilderness",
    routeType: "whitewater",
    summary:
      "A 15.7-mile Class III-IV early-season route from the Highway 21 Marsh Creek launch to the Boundary Creek Middle Fork launch corridor.",
    statusText:
      "Planning-only direct-gauge threshold route. American Whitewater describes Marsh Creek becoming the Middle Fork at Bear Valley and identifies this as an early-season alternative when snow blocks Boundary Creek. RiverBrain's Middle Fork guidance supplies a 1,000-12,000 cfs envelope with a 3,500-5,500 cfs planning ideal; verify wood, stage trend, Highway 21 access, and the permit boundary before continuing below Boundary Creek.",
    distance: "About 15.7 river miles",
    time: "About 1-2 days plus scouting and remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the reach Class III-IV and notes that it becomes the Middle Fork after the Bear Valley confluence. Expect cold water, changing wood, narrow channels, and remote rescue; scout from legal road or Forest Service access and carry satellite communication.",
      "Use the direct Middle Fork Lodge gauge only with the RiverBrain 1,000 cfs minimum, 3,500-5,500 cfs planning ideal, and 12,000 cfs upper shoulder. The gauge is downstream of the early Marsh Creek section, so local snowmelt, wood, weather, and access conditions override any numeric cue.",
      "This card ends at the Boundary Creek launch corridor. American Whitewater says downstream Middle Fork travel requires the Forest Service permit; do not continue through the controlled wilderness corridor without a current permit, camp assignment, and downstream plan.",
    ],
    gauge: "13309220",
    gaugeName: "Middle Fork Salmon River at Middle Fork Lodge near Yellow Pine, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 3500, idealMax: 5500, tooHigh: 12000 },
    thresholdLabel:
      "RiverBrain Middle Fork guidance: 1,000 cfs minimum, 4,500 cfs average, 12,000 cfs maximum; 3,500-5,500 cfs planning ideal",
    thresholdUrl: middleForkSalmonThreshold,
    thresholdSupportUrl: middleForkSalmonMarshAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: middleForkSalmonMarshAwReach,
    sourceLabel: "American Whitewater Marsh Creek to Boundary Creek reach record",
    mapUrl: middleForkSalmonMarshAwReach,
    additionalSourceLinks: [
      { label: "RiverBrain Middle Fork flow guidance", url: middleForkSalmonThreshold },
      { label: "American Whitewater Marsh Creek access", url: middleForkSalmonMarshPutIn },
      { label: "American Whitewater Boundary Creek access", url: middleForkSalmonMarshTakeOut },
      { label: "USGS Middle Fork Lodge gauge", url: marshCreekMiddleForkGauge },
      { label: "Idaho Fish and Game Marsh Creek water record", url: marshCreekIdfgWater },
      { label: "Middle Fork Salmon permit and river rules", url: middleForkSalmonPermit },
    ],
    putIn: {
      name: "State Highway 21 Marsh Creek Put-In",
      latitude: 44.4089,
      longitude: -115.183,
      mileFromStart: 0,
      note: "American Whitewater's mapped Highway 21 access anchor; confirm snow, road shoulders, legal staging, and the carry to water before launch.",
    },
    takeOut: {
      name: "Boundary Creek Boat Ramp",
      latitude: 44.5319,
      longitude: -115.294,
      mileFromStart: 15.7,
      note: "American Whitewater's Boundary Creek access anchor and downstream permit boundary; confirm ramp condition, parking, and current Forest Service restrictions.",
    },
    camping:
      "Use only current Forest Service or lawful dispersed sites along the Marsh Creek/Boundary corridor. Boundary Creek has named camping context, but no campsite, water, or fire availability is guaranteed; pack out waste and verify closures.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Highway 21 provides the upper access corridor; Boundary Creek requires a remote Forest Service road shuttle. Stage the take-out first, verify snow and gate status, and carry maps, repair gear, and satellite communication.",
    permits:
      "American Whitewater identifies the Marsh Creek-to-Dagger Falls section as an early-season alternative and says a permit is required for downstream Middle Fork travel below Dagger Falls/Boundary Creek. Confirm current Salmon-Challis rules, AIS/PFD requirements, fire restrictions, and any closure before launch.",
    watchFor: ["Bear Valley confluence", "changing wood and cold water", "remote rescue", "Dagger Falls/Boundary Creek permit boundary", "snow and road-gate conditions"],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Middle Fork/Salmon River same-watershed context photograph",
  }),

  makeRoute({
    id: "middle-fork-salmon-boundary-cache-bar",
    riverId: "middle-fork-salmon-river-idaho",
    name: "Middle Fork Salmon River",
    reach: "Boundary Creek to Cache Bar",
    region: "Central Idaho / Frank Church River of No Return Wilderness",
    routeType: "whitewater",
    summary:
      "A 100-mile, permit-controlled Middle Fork Salmon wilderness expedition from Boundary Creek through the confluence to the paved Cache Bar take-out.",
    statusText:
      "Gauge-scored Class III-IV+ wilderness route. RiverBrain publishes 1,000 cfs minimum, 4,500 cfs average, and 12,000 cfs maximum at the Middle Fork Lodge gauge; obtain the Forest Service permit and plan for remote rescue.",
    distance: "About 100 river miles, multi-day",
    time: "About 6-10 days depending on camps, scouting, and permit itinerary",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "remote",
      "cold_water",
      "strainers",
      "fast_rise",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      "RiverBrain lists Class III-IV+ water with major rapids including Velvet Falls, Pistol Creek, Tappan Falls, Haystack, Redside, Rubber, Hancock, and Cramer; scout the named drops and carry rescue equipment appropriate to a wilderness expedition.",
      "The Frank Church River of No Return Wilderness has limited road access, long evacuation times, changing wood, cold water, aircraft/airstrip activity, and no reliable cell coverage. Carry satellite communication, repair/rescue gear, first aid, and a conservative daylight plan.",
      "A Forest Service float permit is required year-round between Dagger Falls and the Main Salmon confluence; the lottery control season is May 28-September 3. Verify permit, camp assignment, AIS sticker, required gear, fire-pan/portable-toilet rules, closures, and road status before departure.",
      "Boundary Creek has a named public ramp and camping; Confluence is a dirt emergency/early take-out, and Cache Bar is a busy paved endpoint. Confirm current ramp, shuttle, and downstream Salmon River staging conditions.",
    ],
    gauge: "13309220",
    gaugeName: "Middle Fork Salmon River at Middle Fork Lodge near Yellow Pine, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 1000,
      idealMin: 3500,
      idealMax: 5500,
      tooHigh: 12000,
    },
    thresholdLabel:
      "RiverBrain recommended 1,000 cfs minimum, 4,500 cfs average, and 12,000 cfs maximum; 3,500-5,500 cfs planning ideal around the published average",
    thresholdUrl: middleForkSalmonThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: middleForkSalmonPermit,
    sourceLabel: "Salmon-Challis National Forest Middle Fork Salmon permit and river rules",
    mapUrl: middleForkSalmonThreshold,
    additionalSourceLinks: [
      { label: "RiverBrain Boundary Creek access", url: middleForkSalmonPutInSource },
      { label: "RiverBrain Confluence Boat Ramp access", url: middleForkSalmonConfluenceSource },
      { label: "RiverBrain Cache Bar Ramp access", url: middleForkSalmonTakeOutSource },
      { label: "Middle Fork Salmon Wild and Scenic River overview", url: "https://www.fws.gov/rivers/river/salmon-middle-fork", provider: "nps" },
    ],
    putIn: {
      name: "Boundary Creek Boat Ramp Put-In",
      latitude: 44.53157906,
      longitude: -115.29434144,
      mileFromStart: 0,
      note: "Named RiverBrain/Forest Service launch with all-vehicle access, camping, and boat ramp; no water service is listed.",
    },
    takeOut: {
      name: "Cache Bar Ramp Take-Out",
      latitude: 45.31873468,
      longitude: -114.63698029,
      mileFromStart: 100,
      note: "Named paved, busy all-vehicle ramp about three miles below the Middle Fork/Main Salmon confluence; stage shuttle and downstream traffic plan.",
    },
    access: [
      {
        name: "Boundary Creek Boat Ramp Put-In",
        latitude: 44.53157906,
        longitude: -115.29434144,
        mileFromStart: 0,
        note: "Named public Forest Service/RiverBrain launch; camping allowed and boat ramp present, but no water service is listed.",
      },
      {
        name: "Confluence Boat Ramp",
        latitude: 45.29921093,
        longitude: -114.59565818,
        mileFromStart: 95,
        note: "Dirt all-vehicle ramp and first take-out opportunity; use only for an intentional early exit or to bypass Cramer Creek, not as a substitute for the Cache Bar endpoint.",
      },
      {
        name: "Cache Bar Ramp Take-Out",
        latitude: 45.31873468,
        longitude: -114.63698029,
        mileFromStart: 100,
        note: "Paved, busy all-vehicle ramp; exact RiverBrain endpoint on the Salmon River below the Middle Fork confluence.",
      },
    ],
    camping:
      "RiverBrain lists 88 dispersed camps, including beaches, benches, hot springs, and established wilderness sites. Camp only at designated/established sites in the permit itinerary, pack out waste, follow fire-pan and portable-toilet requirements, and verify water availability because access pages list no water at Boundary, Confluence, or Cache Bar.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Permit-holder shuttle is a major logistics item: the Boundary road is remote and seasonal, while Cache Bar is a busy paved take-out below the confluence. Use a qualified outfitter or pre-stage vehicles and allow recovery time for road, jet-boat, and downstream Salmon River coordination.",
    permits:
      "A Forest Service float permit is required year-round between Dagger Falls and the Main Salmon confluence; Recreation.gov describes the May 28-September 3 lottery control season, camp-request process, fees, AIS stickers, required gear, and cancellation rules. Confirm current permit status and manager notices before travel.",
    watchFor: [
      "Velvet Falls, Pistol Creek, Tappan Falls, Haystack, Redside, Rubber, Hancock, and Cramer Creek Rapids",
      "changing wood, landslides, holes, and cold-water swims",
      "remote evacuation and no-cell-coverage wilderness conditions",
      "permit, camp assignment, fire-pan, portable-toilet, and AIS rules",
      "busy Cache Bar ramp and Salmon River jet-boat/shuttle traffic",
    ],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Middle Fork/Salmon River same-watershed context photograph",
  }),

  makeRoute({
    id: "lower-salmon-island-bar-shorts-bar",
    riverId: "lower-salmon-river-idaho",
    name: "Lower Salmon River",
    reach: "Island Bar to Shorts Bar",
    region: "North-Central Idaho / Riggins",
    routeType: "recreational",
    summary:
      "A short Lower Salmon day float between two BLM public accesses near Riggins.",
    statusText:
      "Gauge-scored moving-water route with jet-boat traffic, cold water, large beaches, changing channels, and limited formal rescue. Verify the BLM map and take-out before launch.",
    distance: "About 4 river miles",
    time: "About 1.5-3 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: [
      "cold_water",
      "strainers",
      "private_banks",
      "remote",
      "fast_rise",
      "access_uncertain",
    ],
    safety: [
      "Wear PFDs, stay visible to jet boats, avoid private banks, and scout wood or wave trains that are not safely readable.",
      "This day card stays above the permit-controlled Hammer Creek wilderness launch; current Lower Salmon rules still govern.",
    ],
    gauge: "13317000",
    gaugeName: "Salmon River at White Bird, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 3000,
      idealMin: 8000,
      idealMax: 12000,
      tooHigh: 20000,
    },
    thresholdLabel:
      "Lower Salmon 3,000-20,000 cfs conservative band; 8,000-12,000 cfs ideal band derived around the published 10,000 cfs average and cross-checked against American Whitewater Riggins-White Bird",
    thresholdUrl: lowerSalmonThresholdGuide,
    thresholdSupportUrl: lowerSalmonAwGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: lowerSalmonPage,
    sourceLabel: "BLM Lower Salmon River guide and access pages",
    putIn: {
      name: "Island Bar Recreation Site",
      latitude: 45.415833,
      longitude: -116.259444,
      mileFromStart: 0,
      note: "BLM frequent put-in with easy river access.",
    },
    takeOut: {
      name: "Shorts Bar Recreation Site",
      latitude: 45.411944,
      longitude: -116.302222,
      mileFromStart: 4,
      note: "BLM frequent put-in/take-out near Riggins.",
    },
    camping:
      "No on-route camping assumed for this short card; use a designated Riggins-area campground.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short Big Salmon Road shuttle; inspect Shorts Bar landing and road condition.",
    permits:
      "Check current Lower Salmon permit/fire-pan/toilet rules, Idaho invasive-species requirements, and PFD requirements.",
    watchFor: [
      "jet-boat traffic",
      "cold water and wave trains",
      "large beaches and private boundaries",
    ],
    imageUrl: salmonImage,
    imageLabel: "Salmon River Idaho same-river context",
  }),
  makeRoute({
    id: "lower-salmon-shorts-bar-lucile",
    riverId: "lower-salmon-river-idaho",
    name: "Lower Salmon River",
    reach: "Shorts Bar to Lucile",
    region: "North-Central Idaho / Riggins-Lucile",
    routeType: "recreational",
    summary:
      "A road-paralleled Lower Salmon float from Shorts Bar to the frequent Lucile take-out.",
    statusText:
      "Gauge-scored river day. The official BLM access chain supports both endpoints, but rapid character, wood, jet boats, heat, and local conditions must be checked independently.",
    distance: "About 12 river miles",
    time: "About 4-7 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: [
      "cold_water",
      "strainers",
      "private_banks",
      "remote",
      "fast_rise",
      "access_uncertain",
    ],
    safety: [
      "Wear PFDs, carry repair and emergency gear, maintain visibility around jet boats, and do not assume road proximity means immediate rescue.",
      "Use the developed Lucile site; the nearby Old Lucile site is a separate signed access and day-use area.",
    ],
    gauge: "13317000",
    gaugeName: "Salmon River at White Bird, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 3000,
      idealMin: 8000,
      idealMax: 12000,
      tooHigh: 20000,
    },
    thresholdLabel:
      "Lower Salmon 3,000-20,000 cfs conservative band; 8,000-12,000 cfs ideal band derived around the published 10,000 cfs average and cross-checked against American Whitewater Riggins-White Bird",
    thresholdUrl: lowerSalmonThresholdGuide,
    thresholdSupportUrl: lowerSalmonAwGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: lowerSalmonPage,
    sourceLabel: "BLM Lower Salmon River guide and access pages",
    putIn: {
      name: "Shorts Bar Recreation Site",
      latitude: 45.411944,
      longitude: -116.302222,
      mileFromStart: 0,
      note: "BLM public river access.",
    },
    takeOut: {
      name: "Lucile Recreation Site",
      latitude: 45.535833,
      longitude: -116.311667,
      mileFromStart: 12,
      note: "BLM frequent take-out with drinking water and restrooms; day use only.",
    },
    camping:
      "Lucile is day use with no camping. Use a designated Riggins/Lucile campground, not an informal beach or private bank.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Highway 95/Big Salmon Road shuttle; distinguish Lucile from Old Lucile and stage at the intended landing.",
    permits:
      "Check current Lower Salmon permit, toilet, fire-pan, invasive-species, and PFD rules.",
    watchFor: [
      "jet boats and wave trains",
      "heat and cold-water immersion",
      "correct Lucile take-out",
    ],
    imageUrl: salmonImage,
    imageLabel: "Salmon River Idaho same-river context",
  }),
  makeRoute({
    id: "lower-salmon-lucile-hammer-creek",
    riverId: "lower-salmon-river-idaho",
    name: "Lower Salmon River",
    reach: "Lucile to Hammer Creek",
    region: "North-Central Idaho / White Bird",
    routeType: "recreational",
    summary:
      "A roughly 22-mile Lower Salmon full-day route through the White Bird corridor to Hammer Creek.",
    statusText:
      "Gauge-scored long day ending at the major Hammer Creek launch. Do not continue into the roadless multi-day section without the current self-issue permit, toilet/fire-pan equipment, logistics, and whitewater plan.",
    distance: "About 22 river miles",
    time: "About 7-11 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "private_banks",
      "remote",
      "fast_rise",
      "mandatory_takeout",
    ],
    safety: [
      "Carry whitewater rescue, repair, first-aid, sun/heat, and emergency communication equipment and maintain a conservative daylight plan.",
      "Hammer Creek is mandatory for this card; continuing below it enters the remote 112-mile Lower Salmon itinerary with separate permit and equipment rules.",
    ],
    gauge: "13317000",
    gaugeName: "Salmon River at White Bird, ID",
    thresholdModel: "two-sided",
    threshold: {
      tooLow: 3000,
      idealMin: 8000,
      idealMax: 12000,
      tooHigh: 20000,
    },
    thresholdLabel:
      "Lower Salmon 3,000-20,000 cfs conservative band; 8,000-12,000 cfs ideal band derived around the published 10,000 cfs average and cross-checked against American Whitewater Riggins-White Bird",
    thresholdUrl: lowerSalmonThresholdGuide,
    thresholdSupportUrl: lowerSalmonAwGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: lowerSalmonPage,
    sourceLabel: "BLM Lower Salmon River guide and access pages",
    putIn: {
      name: "Lucile Recreation Site",
      latitude: 45.535833,
      longitude: -116.311667,
      mileFromStart: 0,
      note: "BLM public day-use launch.",
    },
    takeOut: {
      name: "Hammer Creek Recreation Site",
      latitude: 45.760833,
      longitude: -116.326388,
      mileFromStart: 22,
      note: "Major BLM ramp/camp and permit transition point.",
    },
    access: [
      {
        name: "Lucile Recreation Site",
        latitude: 45.535833,
        longitude: -116.311667,
        mileFromStart: 0,
        note: "Public launch.",
      },
      {
        name: "Slate Creek Recreation Site",
        latitude: 45.646111,
        longitude: -116.291667,
        mileFromStart: 10,
        note: "BLM launch/camp; optional operational break.",
      },
      {
        name: "White Bird Gravel Pit Recreation Site",
        latitude: 45.7375,
        longitude: -116.313056,
        mileFromStart: 19,
        note: "BLM public access upstream of Hammer Creek.",
      },
      {
        name: "Hammer Creek Recreation Site",
        latitude: 45.760833,
        longitude: -116.326388,
        mileFromStart: 22,
        note: "Mandatory endpoint.",
      },
    ],
    camping:
      "Slate Creek and Hammer Creek have designated fee camping. Use numbered sites only and verify current fire restrictions.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Long Highway 95 shuttle; stage at Hammer Creek and set an early launch/daylight cutoff.",
    permits:
      "Current Lower Salmon permit rules apply; below Hammer Creek a self-issue permit is required July 1-Labor Day and for all overnight trips. Portable toilet/fire-pan rules, invasive-species sticker, and PFD requirements apply.",
    watchFor: [
      "long day and increasing remoteness",
      "whitewater and jet boats",
      "mandatory Hammer Creek take-out",
    ],
    imageUrl: salmonImage,
    imageLabel: "Salmon River Idaho same-river context",
  }),

  makeRoute({
    id: "lower-salmon-hammer-heller-bar",
    riverId: "lower-salmon-river-idaho",
    name: "Salmon River",
    reach: "Hammer Creek to Heller Bar (Lower Salmon)",
    region: "North-Central Idaho / Lower Salmon Canyon",
    routeType: "whitewater",
    summary:
      "A 50-mile Class III-IV Lower Salmon expedition from Hammer Creek through the Snake confluence to Heller Bar, with self-issue permit controls, extensive named camps, and a road-accessible endpoint.",
    statusText:
      "Gauge-scored multi-day route. RiverBrain publishes 3,000 cfs minimum, 10,000 cfs average, and 20,000 cfs maximum; Slide Rapids can become Class V-VI at 20,000 cfs and requires mandatory scouting.",
    distance: "About 50 river miles, multi-day",
    time: "3-6 days depending on camps, scouting, and jet-boat logistics",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "mandatory_takeout", "access_uncertain"],
    safety: [
      "The reach contains 41 named rapids, including Snow Hole, China, Blue Canyon, and Slide Rapids. Slide becomes Class V-VI at flows around 20,000 cfs and cannot be safely lined or portaged; scout and set a hard upper-flow cutoff.",
      "This is a remote multi-day canyon with limited exits, jet-boat traffic, heat, wood, and long rescue times. Carry satellite communication, repair/rescue gear, sun and water supplies, and a conservative daylight plan.",
      "Hammer Creek is the major public launch; Heller Bar has the road-accessible concrete endpoint on the Snake. Confirm current closures, ramp conditions, and the downstream Snake logistics before committing.",
      "Use RiverBrain's 3,000-20,000 cfs shoulders with the 10,000 cfs average reference, then defer to the BLM boating guide, current debris, weather, permit status, and on-site scouting.",
    ],
    gauge: "13317000",
    gaugeName: "Salmon River at White Bird, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 3000, idealMin: 8000, idealMax: 12000, tooHigh: 20000 },
    thresholdLabel: "RiverBrain recommended levels: 3,000 cfs minimum, 10,000 cfs average, 20,000 cfs maximum; 8,000-12,000 cfs planning ideal",
    thresholdUrl: lowerSalmonThresholdGuide,
    thresholdSupportUrl: lowerSalmonAwGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: lowerSalmonPage,
    sourceLabel: "BLM Lower Salmon River guide and access pages",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13317000/",
    additionalSourceLinks: [
      { label: "RiverBrain Hammer Creek Access", url: lowerSalmonHammerSource },
      { label: "RiverBrain Pine Bar Boat Launch", url: lowerSalmonPineBarSource },
      { label: "RiverBrain American Bar access", url: lowerSalmonAmericanBarSource },
      { label: "RiverBrain Heller Bar Boat Ramp", url: lowerSalmonHellerBarSource },
    ],
    putIn: {
      name: "Hammer Creek Access Put-In",
      latitude: 45.76496159,
      longitude: -116.3245071,
      mileFromStart: 0,
      note: "Exact RiverBrain/BLM access anchor: all vehicles, boat ramp, camping, and water. Below Hammer Creek, current self-issue permit and overnight equipment rules apply.",
    },
    takeOut: {
      name: "Heller Bar Boat Ramp Take-Out",
      latitude: 46.08601938,
      longitude: -116.98350549,
      mileFromStart: 50,
      note: "Exact RiverBrain Heller Bar endpoint on the Snake River: concrete ramp, toilets, parking, and all-vehicle road exit; coordinate final Snake River jet-boat traffic and staging.",
    },
    camping: "RiverBrain and BLM list extensive dispersed camps along the Lower Salmon, including Lyon's Bar, Pine Bar, Cougar Canyon, Snow Hole, Blue Canyon, and many named beaches. Use durable established sites, pack out waste, and comply with portable-toilet, fire-pan, permit, and fire restrictions.",
    campingClassification: "on_route_campsite",
    shuttle: "Long one-way shuttle from Heller Bar to Hammer Creek; use a qualified Lower Salmon outfitter or stage vehicles with a recovery day and satellite communication.",
    permits: "BLM requires a self-issue permit below Hammer Creek for overnight trips and during the current regulated season; confirm the current permit window, portable-toilet/fire-pan rules, Idaho AIS/PFD requirements, and closures.",
    watchFor: ["Slide Rapids hard upper-flow cutoff", "Snow Hole, China, and Blue Canyon", "jet boats and limited canyon exits", "Heller Bar Snake River endpoint"],
    imageUrl: salmonImage,
    imageLabel: "Lower Salmon River same-river context photograph",
  }),

  makeRoute({
    id: "north-fork-payette-mccall-hartsell",
    riverId: "north-fork-payette-river-idaho",
    name: "North Fork Payette River",
    reach: "McCall to Hartsell Bridge above Cascade Reservoir",
    region: "Southwest Idaho / Long Valley",
    routeType: "whitewater",
    summary:
      "A 15.6-mile Class II-III North Fork Payette reach from the McCall town put-in through the Sheep Creek training section to Hartsell Bridge above Cascade Reservoir.",
    statusText:
      "Planning-only direct-gauge route. American Whitewater gives the upper 2.5 miles a 1,000-3,500 cfs ideal range and says the lower valley can float above 200 cfs, but the combined reach has mixed difficulty, current town-stretch strainer alerts, and access points that require same-day carry and parking confirmation.",
    distance: "About 15.6 river miles",
    time: "About 5-8 hours including the mixed upper/lower reach, scouting, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater describes the first 2.5 miles from McCall to Sheep Bridge as spring Class II-III training water with one Class III rapid and a 1,000-3,500 cfs ideal range; downstream is a lower-gradient valley float that can run above about 200 cfs. Treat those as segment cues, not a single safe envelope for the entire reach.",
      "American Whitewater's 2026 alerts report serious log jams in the broader Lardo-to-Deinhard town stretch, including portages and debris moving toward the reservoir. Inspect every bridge and bend, confirm the current alert, and abort rather than force a wood-choked line.",
      "McCall is a public town launch, while Sheep Creek Bridge and Hartsell/Smylie Bridge are roadside or BLM access anchors. Confirm legal parking, river carry, landing ownership, and the downstream reservoir transition; do not assume a fishing or bridge coordinate is a dedicated ramp.",
    ],
    gauge: "13239000",
    gaugeName: "North Fork Payette River at McCall, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 200, idealMin: 1000, idealMax: 3500 },
    thresholdLabel:
      "American Whitewater split-reach cues: upper McCall-to-Sheep Bridge ideal 1,000-3,500 cfs; lower valley float runnable above about 200 cfs",
    thresholdUrl: northForkPayetteMcCallThreshold,
    thresholdSupportUrl: "https://idahodocs.contentdm.oclc.org/digital/api/collection/p16293coll7/id/107352/download",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkPayetteMcCallThreshold,
    sourceLabel: "American Whitewater McCall to Hartsell Bridge reach record",
    mapUrl: "https://www.blm.gov/visit/payette-river-north-fork",
    additionalSourceLinks: [
      { label: "USGS North Fork Payette at McCall direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13239000/", provider: "usgs" },
      { label: "American Whitewater reach alerts and access division", url: northForkPayetteMcCallThreshold },
      { label: "North Fork Payette McCall-to-Cascade water trail guide", url: "https://idahodocs.contentdm.oclc.org/digital/api/collection/p16293coll7/id/107352/download" },
      { label: "BLM North Fork Payette recreation site at Smylie Lane", url: "https://www.blm.gov/visit/payette-river-north-fork", provider: "local" },
      { label: "Idaho Fish and Game Hartsell/Smylie Bridge water record", url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/72043", provider: "local" },
    ],
    putIn: {
      name: "McCall town / Payette Lake outlet put-in",
      latitude: 44.91194,
      longitude: -116.11772,
      mileFromStart: 0,
      note: "American Whitewater's McCall put-in anchor at the Payette Lake outlet. Use the documented public town launch, confirm current carry and parking, and keep clear of swimmers and bridge traffic.",
    },
    takeOut: {
      name: "Hartsell (Smylie) Bridge take-out",
      latitude: 44.79017,
      longitude: -116.14068,
      mileFromStart: 15.6,
      note: "American Whitewater's Hartsell/Smylie Bridge take-out above Cascade Reservoir; use the signed BLM/roadside landing only after confirming ownership, parking, carry, and reservoir conditions.",
    },
    access: [
      {
        name: "McCall town / Payette Lake outlet put-in",
        latitude: 44.91194,
        longitude: -116.11772,
        mileFromStart: 0,
        note: "Public McCall launch anchor; confirm current river entry and park staging.",
      },
      {
        name: "Sheep Creek Bridge division point",
        latitude: 44.89212,
        longitude: -116.10818,
        mileFromStart: 2.83,
        note: "American Whitewater's division between the upper Class II-III training section and the lower valley float; not a substitute for a same-day landing check.",
        segmentKind: "transition",
      },
      {
        name: "Hartsell (Smylie) Bridge take-out",
        latitude: 44.79017,
        longitude: -116.14068,
        mileFromStart: 15.6,
        note: "Bridge/BLM endpoint above the reservoir; use only the confirmed legal landing and do not continue into reservoir backwater without a separate plan.",
      },
    ],
    camping:
      "Day-use endpoints. Use lawful McCall, Donnelly, or Cascade-area campgrounds or a nearby basecamp; no on-route overnight camping is assumed in the mixed town/agricultural valley corridor.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "One-way valley shuttle between McCall and Hartsell Bridge, with traffic and bridge approaches requiring deliberate staging. Leave the take-out vehicle before launching and keep private driveways and BLM day-use access clear.",
    permits:
      "No river permit is listed. Follow City/BLM access rules, Idaho AIS/PFD requirements, fire restrictions, current strainer alerts, and any seasonal or reservoir closure notices.",
    watchFor: ["mixed upper/lower flow bands", "town-stretch log jams", "Class III rapid below McCall Fish Hatchery", "cold water", "private frontage and bridge parking", "Cascade Reservoir transition"],
    season: [4, 5, 6, 7, 8, 9],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),

  makeRoute({
    id: "north-fork-payette-sheep-smylie-lane",
    riverId: "north-fork-payette-river-idaho",
    name: "North Fork Payette River",
    reach: "Sheep Creek Bridge to Smylie Lane",
    region: "Southwest Idaho / Long Valley",
    routeType: "recreational",
    summary:
      "A roughly 12.8-mile Class II valley float below Sheep Creek Bridge to the public Smylie Lane day-use site, using the direct McCall gauge for a low-flow floor.",
    statusText:
      "Gauge-scored recreational route. American Whitewater describes the lower reach as a good day trip that can be run above 200 cfs, while current alerts require an inspection for wood and log jams between the McCall town stretch and Cascade Reservoir.",
    distance: "About 12.8 river miles",
    time: "About 4-6 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "low_water", "access_uncertain"],
    safety: [
      "This is a long Class II valley float with cold spring water, changing channels, wood, bridges, and limited quick exits; wear a PFD and use a craft suited to the current flow and wind exposure.",
      "American Whitewater says the lower reach is runnable above about 200 cfs. Treat that as a minimum planning cue only: inspect current wood, avoid any log jam, and do not launch when the party cannot self-rescue or the gauge is falling toward the floor.",
      "American Whitewater's 2026 alerts document serious log jams in the broader Lardo-to-Deinhard town stretch and warn that debris may move downstream toward the Cascade reservoir sections. Check alerts immediately before departure and be prepared to portage or abort.",
      "Sheep Creek Bridge is the documented division point and Smylie Lane is a public BLM day-use site, but neither replaces a same-day check of parking, carry path, water level, and legal landing conditions.",
    ],
    gauge: "13239000",
    gaugeName: "NF Payette River at McCall, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 200, idealMin: 200 },
    thresholdLabel:
      "American Whitewater lower-reach guidance: runnable above about 200 cfs (minimum planning cue; no high cutoff published)",
    thresholdUrl: northForkPayetteMcCallThreshold,
    thresholdSupportUrl: "https://www.mccall.id.us/DocumentCenter/View/1032/Valley-Waterways-Management-Plan-PDF",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: northForkPayetteMcCallThreshold,
    sourceLabel: "American Whitewater McCall to Hartsell Bridge reach record",
    mapUrl: "https://www.blm.gov/visit/payette-river-north-fork",
    additionalSourceLinks: [
      {
        label: "USGS North Fork Payette at McCall gauge",
        url: "https://waterdata.usgs.gov/monitoring-location/USGS-13239000",
        provider: "manual",
      },
      {
        label: "Sheep Creek Bridge coordinate reference",
        url: "https://mapcarta.com/23559458",
        provider: "manual",
      },
      {
        label: "BLM Smylie Lane North Fork Payette day-use site",
        url: "https://www.blm.gov/visit/payette-river-north-fork",
        provider: "manual",
      },
      {
        label: "North Fork Payette McCall-Cascade water trail guide",
        url: "https://idahodocs.contentdm.oclc.org/digital/api/collection/p16293coll7/id/107352/download",
        provider: "manual",
      },
    ],
    putIn: {
      name: "Sheep Creek Bridge Put-In",
      latitude: 44.89212,
      longitude: -116.10818,
      mileFromStart: 0,
      note: "American Whitewater's Sheep Creek Bridge division point and the start of the lower Class II valley float; confirm current roadside parking, carry path, and landing permission before rigging.",
    },
    takeOut: {
      name: "Smylie Lane BLM Day-Use Site",
      latitude: 44.7911111,
      longitude: -116.1422222,
      mileFromStart: 12.76,
      note: "BLM public day-use site reached from Smylie Lane, about 11 miles south of McCall; use the signed site and take out before the Cascade Reservoir transition.",
    },
    camping:
      "Day-use endpoints. Use lawful McCall-area campgrounds or a nearby basecamp; BLM lists Smylie Lane as day use only and no on-route overnight camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "One-way shuttle between Sheep Creek Bridge and Smylie Lane, with a longer valley road return; stage the vehicle at the BLM site and keep bridge approaches clear.",
    permits:
      "No river permit is listed for this day float. Follow BLM site rules, Idaho AIS/PFD requirements, fire restrictions, current wood alerts, and any seasonal closure notices.",
    watchFor: ["200 cfs minimum planning cue", "moving log jams and wood", "cold water and changing channels", "Smylie Lane day-use take-out"],
    season: [5, 6, 7, 8, 9],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),
  makeRoute({
    id: "north-fork-payette-rotary-sheep-bridge",
    riverId: "north-fork-payette-river-idaho",
    name: "North Fork Payette River",
    reach: "Rotary Park to Sheep Creek Bridge",
    region: "Southwest Idaho / McCall",
    routeType: "whitewater",
    summary:
      "A roughly 2.8-mile spring Class II-III training reach from McCall's public Rotary Park to Sheep Creek Bridge, with one named Class III rapid and a direct North Fork gauge.",
    statusText:
      "Gauge-scored upper-town reach. American Whitewater identifies the first 2.5 miles to Sheep Bridge as a spring training run with one Class III rapid and an ideal 1,000-3,500 cfs range; the Idaho water plan gives an 800 cfs minimum and no published high cutoff.",
    distance: "About 2.8 river miles",
    time: "About 1-2 hours plus shuttle and scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "access_uncertain"],
    safety: [
      "This is a short Class II-III reach with a Class III rapid about a mile below the McCall Fish Hatchery; use a whitewater-capable craft, helmet, PFD, throw bag, and a crew able to self-rescue.",
      "American Whitewater's 1,000-3,500 cfs ideal range and the Idaho water plan's 800 cfs minimum are reach-planning guidance, not a safe-line guarantee. Inspect current wood, bridge hazards, cold water, and the party's skill before launching.",
      "The 2026 American Whitewater alert history documents serious log jams in the broader McCall town stretch. Confirm current notices and do not assume a recently cleared reach remains clear downstream of the take-out.",
      "Rotary Park is a public non-motorized launch, but river entry is adjacent to the lake outlet and an active town corridor. Keep staging clear of swimmers, pedestrians, and traffic, and use only the named public Sheep Creek Bridge landing.",
    ],
    gauge: "13239000",
    gaugeName: "NF Payette River at McCall, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 800, idealMin: 1000, idealMax: 3500 },
    thresholdLabel:
      "American Whitewater ideal range: 1,000-3,500 cfs; Idaho Payette Basin plan minimum: 800 cfs (no published high cutoff)",
    thresholdUrl: northForkPayetteMcCallThreshold,
    thresholdSupportUrl: "https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/1999/19990205-Comprehensive-State-Water-Plan-Payette.pdf",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: northForkPayetteMcCallThreshold,
    sourceLabel: "American Whitewater McCall to Hartsell Bridge reach record",
    mapUrl: "https://www.mccall.id.us/DocumentCenter/View/1032/Valley-Waterways-Management-Plan-PDF",
    additionalSourceLinks: [
      {
        label: "USGS North Fork Payette at McCall gauge",
        url: "https://waterdata.usgs.gov/monitoring-location/USGS-13239000",
        provider: "manual",
      },
      {
        label: "McCall Rotary Park public non-motorized launch",
        url: "https://www.mccall.id.us/Facilities/Facility/Details/Rotary-Park-12",
        provider: "manual",
      },
      {
        label: "Sheep Creek Bridge coordinate reference",
        url: "https://mapcarta.com/23559458",
        provider: "manual",
      },
      {
        label: "North Fork Payette McCall-Cascade water trail guide",
        url: "https://idahodocs.contentdm.oclc.org/digital/api/collection/p16293coll7/id/107352/download",
        provider: "manual",
      },
    ],
    putIn: {
      name: "Rotary Park Public Launch",
      latitude: 44.91194,
      longitude: -116.11772,
      mileFromStart: 0,
      note: "City of McCall's public non-motorized launch at the east end of Lardo Bridge, where the North Fork exits Payette Lake; use signed parking and carry to the river without blocking park traffic.",
    },
    takeOut: {
      name: "Sheep Creek Bridge Take-Out",
      latitude: 44.89212,
      longitude: -116.10818,
      mileFromStart: 2.83,
      note: "American Whitewater's Sheep Creek Bridge division point between the upper Class III training reach and the lower Class II float; confirm current roadside parking and legal landing conditions before launch.",
    },
    camping:
      "No on-route camping is assumed. Use lawful McCall-area campgrounds or a nearby basecamp; Rotary Park and Sheep Creek Bridge are day-use access points.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short McCall shuttle between Rotary Park and Sheep Creek Bridge; stage before launching, use legal parking, and do not block bridge approaches or neighborhood access.",
    permits:
      "No river permit is listed for this day reach. Follow City of McCall park rules, Idaho AIS/PFD requirements, fire restrictions, current wood advisories, and any seasonal access closures.",
    watchFor: ["Class III rapid below McCall Fish Hatchery", "town-stretch log jams", "cold spring runoff", "Lardo Bridge and Sheep Creek Bridge traffic"],
    season: [4, 5, 6, 7],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),
  makeRoute({
    id: "north-fork-payette-smiths-ferry-banks",
    riverId: "north-fork-payette-river-idaho",
    name: "North Fork Payette River",
    reach: "Smiths Ferry to Banks (North Fork)",
    region: "Southwest Idaho / Long Valley-Payette Canyon",
    routeType: "whitewater",
    summary:
      "A 16-mile roadside Class V-V+ canyon run with continuous technical whitewater, Highway 55 scouting, and a developed Banks take-out.",
    statusText:
      "Gauge-scored expert route. RiverBrain publishes a 750-3,000 cfs recommended envelope with a 1,500 cfs average; American Whitewater identifies the reach as Class V and warns of severe, continuous rapids.",
    distance: "About 16 river miles",
    time: "About 5-8 hours plus scouting and portage decisions",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "remote", "mandatory_takeout"],
    safety: [
      "This is continuous Class V-V+ whitewater with little recovery between named rapids; use a proven expert crew, full rescue kit, helmet, and a whitewater kayak appropriate to the current level.",
      "The entire corridor parallels Highway 55, but road visibility does not reduce the consequences of swims, pins, or missed lines. Treat Jacobs Ladder, Golf Course, Jaws, Juicer, and Crunch as major decision points.",
      "RiverBrain's 750-3,000 cfs envelope and 1,500 cfs average are planning guidance. Scout the current wood, holes, access, and crew readiness; do not infer a safe line from the numeric score alone.",
    ],
    gauge: "13246000",
    gaugeName: "North Fork Payette River near Banks, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 750, idealMin: 1400, idealMax: 1600, tooHigh: 3000 },
    thresholdLabel: "RiverBrain recommended levels: 750-3,000 cfs; 1,400-1,600 cfs ideal band centered on the 1,500 cfs average",
    thresholdUrl: northForkPayetteClassVThreshold,
    thresholdSupportUrl: northForkPayetteThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: northForkPayetteThreshold,
    sourceLabel: "American Whitewater North Fork Payette Class V reach record",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13246000/",
    putIn: {
      name: "Highway 55 Mile 94.6 Top Put-In",
      latitude: 44.265971,
      longitude: -116.06967,
      mileFromStart: 0,
      note: "Roadside top access identified by American Whitewater and ProfessorPaddle; confirm the pullout, parking, and legal river entry before rigging.",
    },
    takeOut: {
      name: "Banks Take-Out",
      latitude: 44.084189,
      longitude: -116.11613,
      mileFromStart: 16,
      note: "Developed river-right Banks access at Highway 55 mile 78.8; expect congestion and use the signed launch/take-out area only.",
    },
    camping: "Big Eddy Campground supports the upper corridor when open; otherwise use lawful BLM/Forest Service campgrounds and do not assume dispersed riverbank camping.",
    campingClassification: "on_route_campsite",
    shuttle: "Highway 55 parallels the entire run and allows roadside scouting, but traffic, narrow shoulders, and limited safe pullouts require disciplined staging.",
    permits: "Payette River federal fee-site rules, Idaho AIS/PFD requirements, fire restrictions, and current Highway 55/road notices apply.",
    watchFor: ["continuous Class V and V+ rapids", "Jacobs Ladder and Jaws", "Banks congestion and mandatory take-out"],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),

  makeRoute({
    id: "north-fork-payette-cabarton-smiths-ferry",
    riverId: "north-fork-payette-river-idaho",
    name: "North Fork Payette River",
    reach: "Cabarton Bridge to Smiths Ferry",
    region: "Southwest Idaho / Cascade-Smiths Ferry",
    routeType: "whitewater",
    summary:
      "A 9.8-mile Class II-III day run on the North Fork Payette, with named rapids, public bridge access, and a developed Smiths Ferry take-out.",
    statusText:
      "Gauge-scored whitewater route. American Whitewater identifies 700-5,000 cfs as the reach's runnable window; weekend congestion, cold water, and named rapids still require a craft-and-skill match and a same-day scout.",
    distance: "About 9.8 river miles",
    time: "About 3-5 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "access_uncertain"],
    safety: [
      "Class II-III pool-drop whitewater with named rapids and limited recovery options; wear a PFD and use a boat and crew appropriate to the current level.",
      "Cabarton parking and the Smiths Ferry take-out can be congested on summer weekends; rig clear of the ramp and confirm the $5 access fees.",
      "Treat American Whitewater's runnable range as planning guidance, not a safety guarantee. Scout wood, bridges, and any rapid whose character has changed.",
    ],
    gauge: "13245000",
    gaugeName: "North Fork Payette River at Cascade, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 700, idealMin: 700, idealMax: 5000, tooHigh: 5000 },
    thresholdLabel: "American Whitewater published runnable window: 700-5,000 cfs",
    thresholdUrl: northForkPayetteThreshold,
    thresholdSupportUrl: payetteGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: payetteGuide,
    sourceLabel: "BLM Payette River boater corridor",
    mapUrl: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf",
    putIn: {
      name: "Cabarton Bridge Put-In",
      latitude: 44.413572,
      longitude: -116.032022,
      mileFromStart: 0,
      note: "Public downstream river-left access at Cabarton Bridge; limited parking and a $5 launch fee are reported by American Whitewater.",
    },
    takeOut: {
      name: "Smith Ferry Take-Out",
      latitude: 44.302424,
      longitude: -116.087096,
      mileFromStart: 9.8,
      note: "Public take-out behind Cougar Mountain Lodge at Smiths Ferry; confirm parking and the $5 fee.",
    },
    camping: "No on-route camping is assumed. Use current BLM/Boise National Forest campgrounds or a lawful nearby basecamp.",
    campingClassification: "nearby_basecamp",
    shuttle: "Stage the Smiths Ferry vehicle before launching; the Highway 55 corridor is straightforward but busy on weekends.",
    permits: "BLM/Boise National Forest day-use fee or pass, Idaho AIS sticker where required, PFDs, and current closures apply.",
    watchFor: ["Cabarton Bridge congestion", "Trestle and named rapids", "wood, cold water, and changing releases"],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),

  makeRoute({
    id: "north-fork-payette-kellys-whitewater-park",
    riverId: "north-fork-payette-river-idaho",
    name: "North Fork Payette River",
    reach: "Kelly's Whitewater Park circuit",
    region: "Southwest Idaho / Cascade",
    routeType: "whitewater",
    summary:
      "A short repeatable Class II-III whitewater-park circuit on the North Fork Payette through Cascade's public Kelly's Whitewater Park.",
    statusText:
      "Gauge-scored park route. Valley County and the park operator confirm public paddling facilities, while Riverbreak ties the Cascade gauge to about 2,000 cfs as a minimum and 3,000-4,000 cfs as an ideal surfing window; park feature changes and same-day conditions still control.",
    distance: "About 1.2 river miles of channels and repeat laps",
    time: "About 1-3 hours, depending on laps and instruction",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "access_uncertain"],
    safety: [
      "Park features change with releases and channel maintenance; wear a PFD and helmet, use a craft appropriate to the feature, and stay within your roll and rescue ability.",
      "The 2,000 cfs minimum and 3,000-4,000 cfs ideal window are published paddling guidance tied to the North Fork gauge, not a guarantee for every channel or paddler; inspect the features and current release before entering.",
      "Use the signed public park entry, observe posted hours and PFD rules, yield to lessons and other users, and leave the water if cold, weather, wood, or crowding changes the risk.",
    ],
    gauge: "13245000",
    gaugeName: "NF Payette River at Cascade, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 2000, idealMin: 3000, idealMax: 4000 },
    thresholdLabel:
      "Riverbreak paddling guidance: about 2,000 cfs minimum; 3,000-4,000 cfs prime park window",
    thresholdUrl: kellysWhitewaterThreshold,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13245000/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: kellysWhitewaterPark,
    sourceLabel: "Kelly's Whitewater Park operator information",
    mapUrl: "https://www.valleycountyid.gov/RaftingKayakingCanoeing",
    additionalSourceLinks: [
      {
        label: "Valley County paddling and access page",
        url: "https://www.valleycountyid.gov/RaftingKayakingCanoeing",
      },
      {
        label: "American Whitewater Kelly's reach record",
        url: "https://www.americanwhitewater.org/content/River/view/river-detail/11051/main",
      },
    ],
    putIn: {
      name: "Kelly's Whitewater Park public launch",
      latitude: 44.51138049,
      longitude: -116.03014112,
      mileFromStart: 0,
      note: "Public park entry and river access in Cascade; confirm seasonal hours, parking, and posted PFD requirements.",
    },
    takeOut: {
      name: "Kelly's Whitewater Park public landing",
      latitude: 44.51138049,
      longitude: -116.03014112,
      mileFromStart: 1.2,
      note: "Same public park landing for a repeatable circuit; do not treat downstream private shoreline as an access point.",
    },
    camping:
      "The whitewater park is day-use. Use designated Lake Cascade State Park or other lawful Cascade-area campgrounds; no on-route camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "No shuttle is needed for the same-park circuit; keep vehicles in signed parking and follow event/lesson traffic controls.",
    permits:
      "No river permit is listed. Follow park rules, Idaho AIS/PFD requirements, posted hours, fire restrictions, and any release or closure notices.",
    watchFor: [
      "man-made features and changing release levels",
      "cold water and crowding",
      "posted park hours and PFD requirements",
    ],
    season: [5, 6, 7, 8, 9],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),

  makeRoute({
    id: "lochsa-powell-white-pine",
    riverId: "lochsa-river-idaho",
    name: "Lochsa River",
    reach: "Powell to White Pine (Indian Grave Creek)",
    region: "North-Central Idaho / Highway 12",
    routeType: "whitewater",
    summary:
      "A 26-mile Class II-III upper Lochsa reach from the Powell campground/ranger-station corridor to White Pine, upstream of the classic Class IV section.",
    statusText:
      "Planning-only direct-stage route. American Whitewater/How's Your River identify Powell-to-White-Pine as a distinct 26-mile Class II-III reach with a 2-10 ft Lowell-stage runnable envelope, but the USGS warns its recorder stage differs from the Lowell bridge staff gauge and high water can escalate rapidly; Powell and White Pine are campground/Forest Service access anchors requiring current carry and parking confirmation.",
    distance: "About 26 river miles",
    time: "About 6-10 hours including the long roadside shuttle, scouting, and cold-water stops",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "remote", "access_uncertain"],
    safety: [
      "How's Your River describes the reach as Class II-III with six named rapids and a 2.0-10.0 ft runnable stage envelope; that is reach-planning guidance, not a safe-line guarantee. The downstream Upper Lochsa becomes Class IV at White Pine, so treat White Pine as a mandatory take-out for this card.",
      "The USGS 13337000 recorder is 0.7 miles upstream of Lowell bridge and warns that its stage may read 2-3 ft higher than the bridge staff gauge. Use one consistent gauge reference, check trend and local staff information, and do not infer the Powell reach's actual depth from a stale or mismatched stage.",
      "Powell Campground/Lochsa Public Service Site and White Sand/White Pine corridor facilities are public Forest Service anchors, not guaranteed wetted-edge ramps. Confirm seasonal opening, parking, river-side carry, private facility boundaries, Highway 12 staging, cold-water gear, and the downstream mandatory take-out before launch.",
    ],
    gauge: "13337000",
    gaugeName: "Lochsa River near Lowell, ID",
    gaugeKind: "direct",
    gaugeMetric: "gage_height_ft",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2, idealMin: 2, idealMax: 10, tooHigh: 10 },
    thresholdLabel:
      "How's Your River/American Whitewater Powell-to-White-Pine stage envelope: 2.0-10.0 ft on the Lowell-stage reference; USGS notes recorder-to-bridge stage offset",
    thresholdUrl: upperLochsaPowellFlowGuide,
    thresholdSupportUrl: upperLochsaThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: upperLochsaThreshold,
    sourceLabel: "American Whitewater Powell-to-White-Pine Lochsa reach record",
    mapUrl: upperLochsaPowellFlowGuide,
    additionalSourceLinks: [
      { label: "How's Your River Powell-to-White-Pine flow and access page", url: upperLochsaPowellFlowGuide },
      { label: "American Whitewater Powell-to-White-Pine reach record", url: "https://www.americanwhitewater.org/content/River/view/river-detail/568/main" },
      { label: "USGS Lochsa River near Lowell stage/discharge gauge warning", url: "https://waterdata.usgs.gov/nwis/uv/?site_no=13337000", provider: "usgs" },
      { label: "Forest Service Upper Lochsa corridor guide", url: upperLochsaCorridor },
      { label: "Powell Campground public river corridor", url: "https://www.recreation.gov/camping/campgrounds/232317" },
      { label: "White Pine River Access staging notes", url: "https://nrt.org/sites/175/files/Clearwater_Lochsa_GRP_2019.pdf" },
    ],
    putIn: {
      name: "Powell Campground / Lochsa Public Service Site",
      latitude: 46.5123,
      longitude: -114.7172,
      mileFromStart: 0,
      note: "Public Forest Service campground and river-corridor anchor near the Powell Ranger Station. Confirm the exact river carry, seasonal opening, parking, and any facility/private-boundary restrictions before treating it as a launch.",
    },
    takeOut: {
      name: "White Pine River Access",
      latitude: 46.445801,
      longitude: -115.09037,
      mileFromStart: 26,
      note: "Named Forest Service White Pine access and mandatory endpoint above the Class IV Upper Lochsa. Use the primitive hand launch/landing only after confirming current carry, parking, and Highway 12 staging.",
    },
    access: [
      {
        name: "Powell Campground / Lochsa Public Service Site",
        latitude: 46.5123,
        longitude: -114.7172,
        mileFromStart: 0,
        note: "Public Forest Service campground corridor; exact wetted-edge launch placement requires current inspection.",
        segmentKind: "transition",
      },
      {
        name: "White Sand Campground corridor",
        latitude: 46.50742,
        longitude: -114.68678,
        mileFromStart: 4.2,
        note: "Named upper-Lochsa campground context from the Forest Service corridor; not assumed to be a separate boat ramp.",
        segmentKind: "transition",
      },
      {
        name: "White Pine River Access",
        latitude: 46.445801,
        longitude: -115.09037,
        mileFromStart: 26,
        note: "Primitive Forest Service hand launch and mandatory endpoint before the Class IV Upper Lochsa section.",
      },
    ],
    camping:
      "Powell Campground and White Sand Campground provide named Forest Service basecamp options when open. No informal on-route camping is assumed; follow current reservations, fire, bear-storage, and Wild and Scenic corridor rules.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Long Highway 12 shuttle between Powell and White Pine with limited shoulders and seasonal construction. Stage the White Pine vehicle first, keep the road clear, and do not continue downstream into the Class IV card without a separate plan.",
    permits:
      "No river permit is listed for this roadside reach. Follow Forest Service campground/access rules, Idaho AIS/PFD requirements, fire restrictions, Wild and Scenic corridor rules, and current Highway 12 notices.",
    watchFor: ["stage-reference mismatch", "cold water and rapid rise", "mobile wood and bridge hazards", "campground/facility carry", "mandatory White Pine take-out", "Highway 12 staging"],
    season: [5, 6, 7, 8],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater-Lochsa watershed context photograph",
  }),

  makeRoute({
    id: "upper-lochsa-white-pine-wilderness-gateway",
    riverId: "lochsa-river-idaho",
    name: "Lochsa River",
    reach: "White Pine (Indian Grave Creek) to Wilderness Gateway Bridge",
    region: "North-Central Idaho / Highway 12",
    routeType: "whitewater",
    summary:
      "A 16-mile Class IV Upper Lochsa run from the White Pine access to the Wilderness Gateway Bridge along Highway 12.",
    statusText:
      "Gauge-scored expert whitewater route. American Whitewater identifies this as the classic Upper Lochsa; Snoflo's reach guidance recommends roughly 3,000-5,000 cfs, while the Lowell gauge and on-site scouting control the decision.",
    distance: "About 16 river miles",
    time: "About 3-4 hours on the water plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise"],
    safety: [
      "American Whitewater rates the reach Class IV with continuous, high-consequence rapids; use a proven whitewater craft, helmet, rescue equipment, and a crew with reliable self-rescue skills.",
      "White Pine is a primitive Forest Service access with a short gravel road, hand launch, limited staging, no potable water, and room for only a few vehicles. Load one group at a time and keep US-12 clear.",
      "The 3,000-5,000 cfs band is a planning recommendation from the cited reach-flow source, not a safety guarantee. Wood, weather, construction, cold water, and rapid changes override any numeric score; high-water incidents have occurred on the Lochsa.",
    ],
    gauge: "13337000",
    gaugeName: "Lochsa River near Lowell, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2000, idealMin: 3000, idealMax: 5000, tooHigh: 8000 },
    thresholdLabel:
      "Snoflo Upper Lochsa recommendation: 3,000-5,000 cfs; 2,000-8,000 cfs retained as a conservative planning envelope around the direct Lowell gauge",
    thresholdUrl: upperLochsaFlowGuide,
    thresholdSupportUrl: upperLochsaThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperLochsaThreshold,
    sourceLabel: "American Whitewater Upper Lochsa reach record",
    mapUrl: upperLochsaThreshold,
    additionalSourceLinks: [
      { label: "Forest Service Upper Lochsa corridor guide", url: upperLochsaCorridor },
      { label: "Wilderness Gateway Campground and river access", url: "https://www.recreation.gov/camping/campgrounds/232326" },
      { label: "White Pine River Access coordinates and staging notes", url: "https://nrt.org/sites/175/files/Clearwater_Lochsa_GRP_2019.pdf" },
      { label: "USGS Lochsa River near Lowell direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13337000/" },
    ],
    putIn: {
      name: "White Pine River Access",
      latitude: 46.445801,
      longitude: -115.09037,
      mileFromStart: 0,
      note: "Named Forest Service White Pine access at US-12 mile 138.5; short gravel approach, hand launch, limited staging, and no potable water.",
    },
    takeOut: {
      name: "Wilderness Gateway Bridge Take-Out",
      latitude: 46.344497,
      longitude: -115.308028,
      mileFromStart: 16,
      note: "Highway 12 Wilderness Gateway Bridge access; cross to the campground side only where signed and keep shuttle vehicles out of the travel lane.",
    },
    access: [
      {
        name: "White Pine River Access",
        latitude: 46.445801,
        longitude: -115.09037,
        mileFromStart: 0,
        note: "Primitive Forest Service hand launch; one group at a time, four-vehicle parking area, no potable water, and no 4WD requirement in the cited corridor record.",
      },
      {
        name: "Nine Mile Access",
        latitude: 46.3824,
        longitude: -115.2478,
        mileFromStart: 9.5,
        note: "Named Highway 12 access used to shorten the Upper Lochsa; verify current parking and landing signs before treating it as an intermediate take-out.",
      },
      {
        name: "Wilderness Gateway Bridge Take-Out",
        latitude: 46.344497,
        longitude: -115.308028,
        mileFromStart: 16,
        note: "Named bridge access at Highway 12 mile 122.7 and adjacent Wilderness Gateway campground; confirm current construction and campground access.",
      },
    ],
    camping:
      "Wilderness Gateway Campground is the developed endpoint basecamp and a popular spring paddler staging area; White Pine has no assumed potable water or developed overnight service.",
    campingClassification: "endpoint_campground",
    shuttle: "US-12 parallels the entire reach. Stage the Wilderness Gateway side first, account for seasonal road construction, and do not stop on blind shoulders.",
    permits: "No river permit is listed for this roadside reach. Follow Nez Perce-Clearwater Forest rules, Idaho AIS/PFD requirements, fire restrictions, and posted Highway 12 notices.",
    watchFor: ["continuous Class IV rapids", "cold water and wood", "Castle Creek and major named drops", "Highway 12 construction and limited shoulder parking"],
    season: [5, 6, 7, 8],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater-Lochsa watershed context photograph",
  }),

  makeRoute({
    id: "lower-lochsa-wilderness-gateway-split-creek",
    riverId: "lochsa-river-idaho",
    name: "Lochsa River",
    reach: "Wilderness Gateway to Split Creek",
    region: "North-Central Idaho / Highway 12",
    routeType: "whitewater",
    summary:
      "A 12-mile Class III-IV Lower Lochsa run along Highway 12, linking the Wilderness Gateway/Fish Creek access family to Split Creek.",
    statusText:
      "Gauge-scored expert whitewater route. American Whitewater lists 1,200-25,000 cfs as the runnable envelope; highway access does not make the rapid sequence forgiving.",
    distance: "About 12 river miles",
    time: "About 3-6 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise"],
    safety: [
      "Class III-IV continuous whitewater with large named rapids; use a proven whitewater craft, helmet, rescue equipment, and a crew with reliable self-rescue skills.",
      "Fish Creek and Split Creek are public Forest Service access points, but construction, seasonal road work, and parking conditions can change.",
      "The 1,200-25,000 cfs band is American Whitewater reach guidance only. River character, wood, weather, and rescue consequences override any numeric score.",
    ],
    gauge: "13337000",
    gaugeName: "Lochsa River near Lowell, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1200, idealMin: 1200, idealMax: 25000, tooHigh: 25000 },
    thresholdLabel: "American Whitewater published runnable window: 1,200-25,000 cfs",
    thresholdUrl: lowerLochsaThreshold,
    thresholdSupportUrl: upperLochsaCorridor,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: upperLochsaCorridor,
    sourceLabel: "Forest Service Upper Lochsa corridor guide",
    mapUrl: "https://www.fs.usda.gov/recarea/nezperceclearwater/recreation/wintersports/recarea/?actid=29&recid=80046",
    putIn: {
      name: "Wilderness Gateway Put-In",
      latitude: 46.344497,
      longitude: -115.308028,
      mileFromStart: 0,
      note: "Forest Service access upstream river-right of the Highway 12 Wilderness Gateway Bridge.",
    },
    takeOut: {
      name: "Split Creek Access",
      latitude: 46.231055,
      longitude: -115.416175,
      mileFromStart: 12,
      note: "Forest Service pack-bridge access at Highway 12 mile 111.4; parking is across the highway.",
    },
    camping: "Use only open Forest Service campgrounds or legal designated sites along the corridor; no informal shoreline camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle: "Highway 12 shuttle parallels the run; verify road work, parking, and vehicle staging before launch.",
    permits: "Follow current Nez Perce-Clearwater Forest rules, Idaho AIS/PFD requirements, fire restrictions, and posted access notices.",
    watchFor: ["continuous Class III-IV rapids", "Fish Creek construction or closure", "cold water, wood, and limited recovery pools"],
    imageUrl: salmonImage,
    imageLabel: "North-Central Idaho whitewater corridor context photograph",
  }),

  makeRoute({
    id: "north-fork-clearwater-washington-quartz",
    riverId: "north-fork-clearwater-river-idaho",
    name: "North Fork Clearwater River",
    reach: "Washington Creek Campground to Quartz Creek Access",
    region: "North-Central Idaho / Clearwater National Forest",
    routeType: "whitewater",
    summary:
      "An approximately 11-mile Class III+(V) Lower Bungalow Run from Washington Creek Campground to the traditional Quartz Creek access.",
    statusText:
      "Planning-only proxy-gauge section. American Whitewater names this Lower Bungalow Run and warns that Quartz Creek access is a cumbersome bridge/camp carry. The Canyon Ranger Station gauge is corridor proxy context; the Irish Railroad boundary, wood, and current road/landing conditions control the decision.",
    distance: "About 11 river miles",
    time: "About 4-7 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the Lower Bungalow Run Class III+(V); scout the sequence from Forest Road 247 and stop before Irish Railroad unless the crew is specifically prepared for that feature.",
      "Use the American Whitewater 2,500-16,000 cfs corridor band as proxy planning guidance on USGS 13340600. The broad range is not a local reach guarantee; wood, trend, and visual scouting override any numeric score.",
      "Washington Creek is a named campground bridge access. Quartz Creek is a traditional access but AW describes the carry as cumbersome and North Idaho Rivers warns that take-out access for inflatables is poor; verify boat type, landing, parking, and current road status before launch.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2500, idealMin: 2500, idealMax: 16000, tooHigh: 16000 },
    thresholdLabel: "American Whitewater North Fork Clearwater corridor guidance: 2,500-16,000 cfs",
    thresholdUrl: northForkClearwaterThreshold,
    thresholdSupportUrl: "https://www.northidahorivers.com/North_Fork_Clearwater.htm",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkClearwaterThreshold,
    sourceLabel: "American Whitewater North Fork Clearwater Kelly Creek-to-Aquarius reach record",
    mapUrl: northForkClearwaterForestService,
    additionalSourceLinks: [
      { label: "American Whitewater North Fork Clearwater section and access chain", url: northForkClearwaterThreshold },
      { label: "North Idaho Rivers North Fork access warning", url: "https://www.northidahorivers.com/North_Fork_Clearwater.htm" },
      { label: "USGS North Fork Clearwater Canyon Ranger Station gauge", url: kellyCreekGauge },
      { label: "Washington Creek Campground map", url: washingtonCreekCampground },
      { label: "Quartz Creek map / bridge locality", url: quartzCreekAccess },
      { label: "Clearwater National Forest recreation corridor", url: northForkClearwaterForestService },
    ],
    putIn: {
      name: "Washington Creek Campground bridge access",
      latitude: 46.70436,
      longitude: -115.55598,
      mileFromStart: 0,
      note: "American Whitewater identifies the upstream river-right side of the Washington Creek bridge as the access; confirm campground carry and current parking.",
    },
    takeOut: {
      name: "Quartz Creek bridge / Forest Road 247 mile 32",
      latitude: 46.80769,
      longitude: -115.45681,
      mileFromStart: 11,
      note: "American Whitewater identifies the traditional Quartz Creek access where Quartz Creek joins the North Fork; the stored map point is an approximate stream/bridge locality and the carry is cumbersome. Confirm the exact landing and legal parking.",
    },
    camping:
      "Washington Creek Campground is the named endpoint campground. Quartz Creek has dispersed camping near the bridge, but do not assume a developed take-out camp or potable water; verify Forest Service rules and current conditions.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Forest Road 247 parallels the reach and supports road scouting, but the road is remote and seasonal. Stage the Quartz vehicle first and allow extra time for the cumbersome carry.",
    permits:
      "Follow Clearwater National Forest road/campground rules, Idaho AIS/PFD requirements, fire restrictions, and current closure notices. The proxy gauge and approximate Quartz anchor do not establish a safe landing.",
    watchFor: ["Lower Bungalow Run", "Class III+(V)", "Irish Railroad boundary", "mobile wood", "Quartz Creek cumbersome carry", "seasonal Forest Road 247"],
    season: [5, 6, 7, 8],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not a Quartz endpoint image",
  }),

  makeRoute({
    id: "north-fork-clearwater-weitas-washington",
    riverId: "north-fork-clearwater-river-idaho",
    name: "North Fork Clearwater River",
    reach: "Weitas Creek Campground to Washington Creek Campground",
    region: "North-Central Idaho / Clearwater National Forest",
    routeType: "whitewater",
    summary:
      "A roughly 10-mile Class III+ Upper Bungalow Run between two named Forest Service campgrounds on the North Fork Clearwater.",
    statusText:
      "Planning-only proxy-gauge section. American Whitewater names this 10-mile Weitas-to-Washington segment and identifies Spray Creek and Whitefish Rapid as the principal features. The Canyon Ranger Station gauge is corridor proxy context; wood, road access, and bridge/campground carries remain decisive.",
    distance: "About 10 river miles",
    time: "About 3-6 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates the Upper Bungalow Run Class III+ and identifies Spray Creek and Whitefish Rapid as significant features. Scout from Forest Roads 247/250 and carry a reliable rescue/repair kit.",
      "Use the American Whitewater 2,500-16,000 cfs corridor band and the 3,070 cfs trip report only as proxy planning context on USGS 13340600. Local level, wood, and trend can differ from the gauge.",
      "Both endpoints are campground/bridge anchors rather than surveyed ramps. Confirm the campground crossing, carry path through the site, seasonal road opening, parking, and current Forest Service notices before launch.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2500, idealMin: 2500, idealMax: 16000, tooHigh: 16000 },
    thresholdLabel: "American Whitewater North Fork Clearwater corridor guidance: 2,500-16,000 cfs; 3,070 cfs reported medium flow",
    thresholdUrl: northForkClearwaterThreshold,
    thresholdSupportUrl: northForkClearwaterHeadwatersAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkClearwaterThreshold,
    sourceLabel: "American Whitewater North Fork Clearwater Kelly Creek-to-Aquarius reach record",
    mapUrl: northForkClearwaterForestService,
    additionalSourceLinks: [
      { label: "American Whitewater North Fork Clearwater section and access chain", url: northForkClearwaterThreshold },
      { label: "American Whitewater 3,070 cfs Weitas-to-Washington trip report", url: "https://www.americanwhitewater.org/content/River/view/river-detail/543/reports/PEcH5MukjPprJBgHeDKqL" },
      { label: "USGS North Fork Clearwater Canyon Ranger Station gauge", url: kellyCreekGauge },
      { label: "Weitas Creek Campground map", url: weitasCampground },
      { label: "Washington Creek Campground map", url: washingtonCreekCampground },
      { label: "Clearwater National Forest recreation corridor", url: northForkClearwaterForestService },
    ],
    putIn: {
      name: "Weitas Creek Campground / bridge access",
      latitude: 46.638612,
      longitude: -115.433329,
      mileFromStart: 0,
      note: "American Whitewater identifies the Weitas campground bridge as fair upstream river access; the carry crosses the campground and is not a surveyed ramp.",
    },
    takeOut: {
      name: "Washington Creek Campground bridge access",
      latitude: 46.70436,
      longitude: -115.55598,
      mileFromStart: 10,
      note: "American Whitewater identifies the upstream river-right side of the Washington Creek bridge as the take-out; confirm the carry and current campground access.",
    },
    camping:
      "Weitas Creek and Washington Creek are named Forest Service campground options when open. Verify fees, water, fire rules, bear storage, and seasonal Forest Road 247/250 conditions.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Forest Road 247/250 follows the corridor and supports scouting, but it is remote and seasonal. Stage the Washington vehicle first and allow daylight for the road shuttle.",
    permits:
      "Follow Clearwater National Forest road/campground rules, Idaho AIS/PFD requirements, fire restrictions, and current closure notices. The proxy gauge is not a local safety guarantee.",
    watchFor: ["Spray Creek Rapid", "Whitefish Rapid", "mobile wood", "cold water", "campground carries", "seasonal Forest Roads 247/250"],
    season: [5, 6, 7, 8],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not a Weitas endpoint image",
  }),

  makeRoute({
    id: "north-fork-clearwater-hidden-kelly",
    riverId: "north-fork-clearwater-river-idaho",
    name: "North Fork Clearwater River",
    reach: "Hidden Creek Campground to Kelly Forks",
    region: "North-Central Idaho / Clearwater National Forest",
    routeType: "whitewater",
    summary:
      "An approximately 11-mile Class III-V North Fork Clearwater section from Hidden Creek Campground through the Black Canyon corridor to Kelly Forks Campground.",
    statusText:
      "Planning-only proxy-gauge expedition section. American Whitewater identifies Hidden Creek as the standard access for an 11-mile run to Kelly Forks, with Black Canyon wood and road-scouting controls. The Canyon Ranger Station gauge is downstream proxy context; local level, wood, and seasonal Forest Road access remain decisive.",
    distance: "About 11 river miles",
    time: "About 4-8 hours plus road scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates the Headwaters-to-Kelly reach Class III-V and identifies the Hidden Creek-to-Kelly Forks segment as the standard 11-mile option. Expect the Black Canyon's wood, blind features, and limited rescue margins.",
      "Use the North Idaho Rivers 3,800 cfs minimum cue and 4,100-4,500 cfs observed context on USGS 13340600 only as a downstream planning reference. Tributaries and local channel conditions can differ materially; scout from Forest Road 250 before committing.",
      "Hidden Creek and Kelly Forks are Forest Service campground/road anchors, not surveyed ramps. Confirm seasonal Forest Road 250 opening, legal parking, campground status, and the river-left take-out above the Kelly Forks bridge.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 3800, idealMin: 4100, idealMax: 4500 },
    thresholdLabel:
      "North Idaho Rivers Black Canyon guidance used as a proxy cue: 3,800 cfs minimum; 4,100-4,500 cfs observed medium-flow runs",
    thresholdUrl: northForkClearwaterBlackCanyonGuide,
    thresholdSupportUrl: northForkClearwaterHeadwatersAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkClearwaterHeadwatersAw,
    sourceLabel: "American Whitewater North Fork Clearwater Headwaters-to-Kelly reach record",
    mapUrl: hiddenCreekCampground,
    additionalSourceLinks: [
      { label: "American Whitewater Headwaters-to-Kelly reach and access chain", url: northForkClearwaterHeadwatersAw },
      { label: "North Idaho Rivers Black Canyon flow and wood guide", url: northForkClearwaterBlackCanyonGuide },
      { label: "USGS North Fork Clearwater Canyon Ranger Station gauge", url: kellyCreekGauge },
      { label: "Hidden Creek Campground map", url: hiddenCreekCampground },
      { label: "Kelly Forks Campground access map", url: kellyForksCampground },
      { label: "Clearwater National Forest recreation corridor", url: northForkClearwaterForestService },
    ],
    putIn: {
      name: "Hidden Creek Campground",
      latitude: 46.83214,
      longitude: -115.17958,
      mileFromStart: 0,
      note: "American Whitewater's standard access for the approximately 11-mile Hidden Creek-to-Kelly Forks run; stored point is the named Forest Service campground anchor, so verify river-side carry and current road conditions.",
    },
    takeOut: {
      name: "Kelly Forks Campground / river-left landing",
      latitude: 46.7167,
      longitude: -115.25515,
      mileFromStart: 11,
      note: "American Whitewater identifies the Kelly Forks campground at the Kelly Creek confluence as the take-out; use the river-left landing above the bridge and confirm current campground/road status.",
    },
    camping:
      "Hidden Creek and Kelly Forks are named Forest Service campground options when open. Treat camping as endpoint logistics only; verify fees, water, fire rules, bear storage, and seasonal road access.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Forest Road 250 follows the corridor but is remote, slow, and seasonal. Stage Kelly Forks first, then road-scout the Hidden Creek access and carry recovery gear for the shuttle.",
    permits:
      "Follow Clearwater National Forest road/campground rules, Idaho AIS/PFD requirements, fire restrictions, and current closure notices. The downstream proxy gauge does not establish a safe local flow.",
    watchFor: [
      "Class III-V Black Canyon sequence",
      "mobile wood and blind rapids",
      "3,800 cfs minimum proxy cue",
      "downstream gauge mismatch",
      "seasonal Forest Road 250",
      "campground carry and river-left landing",
    ],
    season: [5, 6, 7],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not a Hidden Creek endpoint image",
  }),

  makeRoute({
    id: "kelly-creek-moose-kelly-forks",
    riverId: "kelly-creek-idaho",
    name: "Kelly Creek",
    reach: "Moose Creek to Kelly Forks Campground",
    region: "North Idaho / North Fork Clearwater backcountry",
    routeType: "whitewater",
    summary:
      "An 11-mile Class III-IV Kelly Creek run from the Moose Creek work-center corridor to Kelly Forks Campground at the North Fork Clearwater confluence.",
    statusText:
      "Planning-only threshold card. American Whitewater and North Idaho Rivers document the Clayton Creek Class IV crux, road-following access, Kelly Forks campground take-out, and a very approximate 3,000 cfs minimum on the downstream Canyon Ranger Station gauge; 4,100-4,500 cfs reports describe medium-low challenging conditions.",
    distance: "About 11 miles",
    time: "About 4-7 hours including scouting, road shuttle, and the upper access carry",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates the reach Class III-IV and identifies Clayton Creek as the major opening rapid; North Idaho Rivers warns that upper-section wood can be serious in a swim and that several blind spots require road or on-water scouting.",
      "North Idaho Rivers gives a very approximate 3,000 cfs minimum on the downstream USGS gauge and reports 4,100-4,500 cfs as fun but challenging medium-low flows. The gauge is more than 40 miles downstream below major tributaries, so local visual conditions override the numeric cue.",
      "Hoodoo Pass and Forest Road 250 are seasonal and commonly inaccessible until early July. Kelly Forks is a remote fee campground/work-center corridor with limited services; carry maps, repair gear, communications, and a conservative wood/evacuation plan.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID (proxy for Kelly Creek)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 3000, idealMin: 3000 },
    thresholdLabel: "North Idaho Rivers Kelly Creek cue: very approximate 3,000 cfs minimum on downstream proxy; 4,100-4,500 cfs reports were medium-low and challenging",
    thresholdUrl: kellyCreekLocal,
    thresholdSupportUrl: kellyCreekAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: kellyCreekAw,
    sourceLabel: "American Whitewater Kelly Creek Moose Creek-to-Kelly Forks reach record",
    mapUrl: kellyCreekMap,
    additionalSourceLinks: [
      { label: "American Whitewater Kelly Creek reach", url: kellyCreekAw },
      { label: "North Idaho Rivers Kelly Creek flow and shuttle notes", url: kellyCreekLocal },
      { label: "USGS North Fork Clearwater proxy gauge", url: kellyCreekGauge },
      { label: "Kelly Creek Work Center map context", url: kellyCreekMap },
      { label: "Kelly Forks Campground map context", url: kellyForksCampground },
      { label: "Forest Service Kelly Forks access and seasonal road notes", url: kellyCreekForestService },
    ],
    putIn: {
      name: "Moose Creek / Kelly Creek Work Center",
      latitude: 46.72103,
      longitude: -115.08541,
      mileFromStart: 0,
      note: "American Whitewater's Moose Creek access/work-center corridor; verify current Forest Road 255 staging, legal parking, and the entry above Clayton Creek.",
    },
    takeOut: {
      name: "Kelly Forks Campground",
      latitude: 46.7167,
      longitude: -115.25515,
      mileFromStart: 11,
      note: "American Whitewater's Kelly Forks campground take-out at the Kelly Creek/North Fork Clearwater confluence; confirm seasonal opening, fee access, and river-left landing.",
    },
    camping:
      "Kelly Forks Campground has 14 fee sites, a group area, host, and water when open. Primitive spots above Kelly Forks are sparse; do not assume Moose Creek roadside camping is legal or available without current Forest Service confirmation.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Use the road corridor for scouting and shuttle, but plan a long remote drive via Hoodoo Pass/Forest Road 250 or the Pierce approach. Seasonal snow, rough gravel, and limited communications can delay extraction.",
    permits:
      "No route-specific river permit was confirmed. Follow Nez Perce-Clearwater National Forest campground/road rules, seasonal closures, fire restrictions, AIS/PFD requirements, and any posted work-center limits.",
    watchFor: ["Clayton Creek opening rapid", "upper-section wood", "downstream proxy divergence", "Hoodoo Pass seasonal opening", "Kelly Forks campground landing"],
    season: [5, 6, 7, 8, 9],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph",
  }),

  makeRoute({
    id: "lochsa-split-creek-lowell",
    riverId: "lochsa-river-idaho",
    name: "Lochsa River",
    reach: "Split Creek Pack Bridge to Lowell",
    region: "North-Central Idaho / Clearwater-Lochsa",
    routeType: "whitewater",
    summary:
      "A 15-mile Class II-III+ roadside Lochsa reach from Split Creek Pack Bridge to the Lowell/ Selway confluence.",
    statusText:
      "Planning-only threshold card. American Whitewater documents the full reach, exact Split Creek access, the Hellgate crux, and the Lowell confluence take-out; Snoflo supplies a 2,000-4,000 cfs summer planning range while the direct Lowell gauge, visual road scout, and same-day rapid assessment control the decision.",
    distance: "About 15 miles",
    time: "About 5-8 hours including scouting, shuttle, and the Split Creek carry",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater identifies Surprise, Fire Creek, Coolwater, Apgar, and Hellgate; Hellgate has a hidden hole on the right tongue and should be scouted or portaged by the crew.",
      "Snoflo's 2,000-4,000 cfs summer range is a planning envelope, not a universal safe range. AW trip reports show the section being run at 9,600 cfs by a raft team, but high-water rescue and boat-control consequences increase sharply; use Lowell gauge data plus a road scout.",
      "Split Creek requires a highway-side carry down stairs, and the Lowell confluence landing is limited/steep. Wild Goose is the more practical downstream alternative, but this card ends at the named Lowell access and must not imply private Three Rivers Resort access.",
    ],
    gauge: "13337000",
    gaugeName: "Lochsa River near Lowell, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2000, idealMin: 2000, idealMax: 4000, tooHigh: 4000 },
    thresholdLabel: "Snoflo reach guidance: 2,000-4,000 cfs summer range; AW reach and reports add direct Lowell-gauge and high-water context",
    thresholdUrl: lochsaSplitLowellFlowGuide,
    thresholdSupportUrl: lochsaSplitLowellThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lochsaSplitLowellThreshold,
    sourceLabel: "American Whitewater Split Creek Pack Bridge-to-Lowell reach record",
    mapUrl: lochsaSplitLowellThreshold,
    additionalSourceLinks: [
      { label: "American Whitewater Split Creek-to-Lowell reach", url: lochsaSplitLowellThreshold },
      { label: "American Whitewater Split Creek access", url: lochsaSplitLowellAccess },
      { label: "American Whitewater Split Creek-to-Lowell trip reports", url: lochsaSplitLowellReports },
      { label: "Snoflo reach flow range", url: lochsaSplitLowellFlowGuide },
      { label: "USGS Lochsa River near Lowell gauge", url: lochsaSplitLowellGauge },
      { label: "Rivers.gov Clearwater-Lochsa corridor", url: "https://www.rivers.gov/river/clearwater-middle-fork" },
    ],
    putIn: {
      name: "Split Creek Pack Bridge Access",
      latitude: 46.23058,
      longitude: -115.4167,
      mileFromStart: 0,
      note: "American Whitewater access coordinate on downstream river right; parking is across Highway 12 and the stairs/carry are narrow and timing-sensitive.",
    },
    takeOut: {
      name: "Lowell River Access at Selway-Lochsa Confluence",
      latitude: 46.14028,
      longitude: -115.59944,
      mileFromStart: 15,
      note: "Confluence-area Lowell anchor; AW reports limited/steep landing and identifies Wild Goose as the more practical public downstream alternative. Confirm the current legal landing before launch.",
    },
    camping:
      "Roadside campgrounds and developed sites occur along Highway 12, including Wilderness Gateway upstream and Wild Goose downstream. This day-run card assumes no on-route overnight; use only current Forest Service campgrounds and verify openings, fees, and fire rules.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "The reach is roadside and mostly visible from Highway 12, making visual scouting practical. Arrange a vehicle shuttle between Split Creek and Lowell/Wild Goose and account for highway parking, seasonal traffic, and the Split Creek boat carry.",
    permits:
      "No river permit is listed for this roadside Lochsa reach. Follow Nez Perce-Clearwater National Forest, Highway 12, AIS/PFD, fire, and campground rules; verify the confluence landing and any current closure before staging.",
    watchFor: ["Hellgate hidden hole", "Coolwater and Apgar rapids", "Split Creek stairs/highway carry", "limited Lowell confluence landing", "rapid rise and cold water"],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Clearwater-Lochsa watershed context photograph",
  }),

  makeRoute({
    id: "big-creek-st-joe-end-road-bridge",
    riverId: "st-joe-river-idaho",
    name: "Big Creek (St. Joe tributary)",
    reach: "End-of-road / Middle Fork hike-in to Big Creek bridge",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "whitewater",
    summary:
      "A remote 9-mile Class III-IV Big Creek expedition combining the Middle Fork hike-in, roadside upper creek, and the lower Class I-II bridge reach above the St. Joe confluence.",
    statusText:
      "Planning-only proxy-threshold route. American Whitewater gives 5,000 cfs on the St. Joe at Calder as a low-water run cue for the Middle Fork/upper creek and an easy lower float. This is tributary proxy context, not a surveyed Big Creek gauge; a river-wide log jam, narrow gradient, bridge restrictions, and the 600-foot hike require current scouting and a vehicle/access check.",
    distance: "About 9 miles",
    time: "About 4-8 hours including the hike, scouting, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "low_water", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater divides the route into a 2-mile Class III-IV Middle Fork/upper section, a 2-mile Class III (IV) roadside section, and a 5-mile Class I-II lower section. The narrow bed and steep gradient can change character quickly; use a proven creek boat/whitewater crew and scout from the road where possible.",
      "AW documents a river-wide log jam roughly 15 minutes below the hike-in put-in. Assume wood is mobile, carry a rescue saw only if trained, and keep a strong scout boat ahead with a portage plan.",
      "The shuttle road below the standard take-out has been reported closed to full-sized vehicles because bridges were designated unsafe; the AW report says standard ATVs may get around the gate but wide UTVs may not. Confirm current Forest Service road status and do not bypass a closure.",
      "Use 5,000 cfs on the downstream Calder gauge only as a historical planning cue. Current stage trend, snowmelt, wood, weather, and visual creek level override the number; there is no direct Big Creek gauge.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 5000, idealMin: 5000 },
    thresholdLabel:
      "American Whitewater Big Creek guidance: 5,000 cfs on the St. Joe at Calder for a low-water upper run and easy lower float; tributary proxy",
    thresholdUrl: bigCreekStJoeReach,
    thresholdSupportUrl: bigCreekStJoeGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: bigCreekStJoeReach,
    sourceLabel: "American Whitewater Big Creek (St. Joe tributary) reach record",
    mapUrl: bigCreekStJoeMvum,
    additionalSourceLinks: [
      { label: "Idaho Fish and Game Big Creek water record", url: bigCreekStJoeIdfg },
      { label: "USGS St. Joe River at Calder proxy gauge", url: bigCreekStJoeGauge },
      { label: "St. Joe Ranger District motor-vehicle-use map", url: bigCreekStJoeMvum },
      { label: "Big Creek Middle Fork map anchor", url: bigCreekStJoePutInMap },
      { label: "Big Creek campground / lower bridge-area map anchor", url: bigCreekStJoeTakeOutMap },
    ],
    putIn: {
      name: "Big Creek Middle Fork hike-in Put-In",
      latitude: 47.36214,
      longitude: -116.12544,
      mileFromStart: 0,
      note: "Approximate mapped Middle Fork Big Creek anchor used to represent the end-of-road pack-trail put-in; AW describes a roughly 600-foot hike from the road. This is not a surveyed launch—verify the trail, snow, parking, and river carry in person.",
    },
    takeOut: {
      name: "Big Creek lower bridge Take-Out",
      latitude: 47.30353,
      longitude: -116.12016,
      mileFromStart: 9,
      note: "Approximate Big Creek campground/lower-bridge-area map anchor. AW describes the lower run ending at the next bridge about 5 miles above the St. Joe; confirm the actual river landing, road gate, bridge condition, and legal parking.",
    },
    camping:
      "Big Creek Campground and other named Forest Service sites in the St. Joe corridor are nearby basecamp options when open. Do not assume a legal overnight site at the hike-in put-in or lower bridge; verify current reservations, road gates, sanitation, and fire rules.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "This is a long, remote Forest Service shuttle with a hike-in put-in. Stage the lower bridge vehicle first, confirm the MVUM route and bridge/road closures, allow ATV-width restrictions to control the plan, and carry satellite communication.",
    permits:
      "Follow Idaho Panhandle National Forest, St. Joe Wild and Scenic River, Idaho AIS/PFD, fire, camping, and road-closure rules. Do not bypass a gate or use a private driveway as an access assumption.",
    watchFor: ["river-wide log jam", "narrow high-gradient creek bed", "600-foot pack-trail carry", "unsafe bridge/road restrictions", "downstream Calder proxy", "cold water and remote rescue"],
    season: [5, 6, 7],
    imageUrl: stJoeImage,
    imageLabel: "St. Joe watershed context photograph; Big Creek tributary not depicted",
  }),

  makeRoute({
    id: "marsh-creek-highway-21-dagger-falls",
    riverId: "middle-fork-salmon-river-idaho",
    name: "Marsh Creek / Middle Fork Salmon",
    reach: "State Highway 21 to Dagger Falls",
    region: "Central Idaho / Sawtooth–Frank Church corridor",
    routeType: "whitewater",
    summary:
      "A 16-mile Class III+ early-season route from the mapped Marsh Creek launch to the Dagger Falls trail take-out above the Boundary Creek launch.",
    statusText:
      "Planning-only stage-threshold route. American Whitewater calls this an excellent Class III+ run with occasional III-IV sequences and no permit required for the Marsh Creek/Dagger Falls section. Middle Fork Lodge stage is useful proxy context: 2.5-3.5 ft is the preferred broader Middle Fork window, while an AW report noted Dagger Falls at about 4.5 ft. Heavy wood and limited eddies make current Forest Service scouting mandatory.",
    distance: "About 16 miles",
    time: "About 5-8 hours; consider an overnight only with a legal campsite plan",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater describes swift Class II-III water with occasional Class III-IV sequences, rare eddies, and difficult stopping for loaded rafts. Use a whitewater craft, PFD, helmet, rescue equipment, and a crew capable of moving-water self-rescue.",
      "The Forest Service/2026 American Whitewater incident record documents unusually heavy wood, a major obstruction requiring an extended portage, satellite emergency communications, and a fatality context on Marsh Creek. Obtain a current strainer report, send a strong scout boat ahead, and be prepared to turn around or portage.",
      "Use the mapped Highway 21/Marsh Creek launch and the Dagger Falls trail above the Boundary Creek launch. Do not continue into Dagger Falls or the permitted Middle Fork corridor without a separate plan, permit check, and expert assessment.",
      "The 2.5-3.5 ft Middle Fork stage window is broader downstream proxy context, not a Marsh Creek safety rule. The AW 4.5-ft Dagger Falls report is a historical trip marker; stage trend, snow/ice, wood, weather, and party readiness override it.",
    ],
    gauge: "13309220",
    gaugeName: "Middle Fork Salmon River at Middle Fork Lodge, ID (downstream proxy)",
    gaugeKind: "proxy",
    gaugeMetric: "gage_height_ft",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2.5, idealMin: 2.5, idealMax: 3.5, tooHigh: 4.5 },
    thresholdLabel:
      "Middle Fork stage context: North Idaho Rivers 2.5-3.5 ft preferred window; AW trip report notes Dagger Falls at about 4.5 ft; downstream proxy only",
    thresholdUrl: marshCreekFlowGuide,
    thresholdSupportUrl: marshCreekAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: marshCreekAwReach,
    sourceLabel: "American Whitewater Marsh Creek to Middle Fork Salmon reach record",
    mapUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/576/map",
    additionalSourceLinks: [
      { label: "Idaho Fish and Game Marsh Creek water record", url: marshCreekIdfgWater },
      { label: "USGS Middle Fork Lodge stage gauge", url: marshCreekMiddleForkGauge },
      { label: "North Idaho Rivers Middle Fork flow guidance", url: marshCreekFlowGuide },
      { label: "American Whitewater 2026 Marsh Creek wood incident", url: marshCreekIncident },
      { label: "U.S. Fish and Wildlife Middle Fork Salmon overview", url: "https://www.fws.gov/rivers/river/salmon-middle-fork" },
      { label: "Forest Service Middle Fork corridor guide", url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprd3842663.pdf" },
    ],
    putIn: {
      name: "Marsh Creek Highway 21 Put-In",
      latitude: 44.39616037,
      longitude: -115.16993499,
      mileFromStart: 0,
      note: "American Whitewater mapped access point near State Highway 21. Other early-season put-ins may exist upstream; verify snow, parking, and shoulder safety.",
    },
    takeOut: {
      name: "Dagger Falls Trail Take-Out",
      latitude: 44.52832232,
      longitude: -115.28518729,
      mileFromStart: 15.9,
      note: "American Whitewater mapped trail take-out above Dagger Falls and Boundary Creek. Mandatory exit before the falls; confirm the river-left trail, carry, and seasonal road access.",
    },
    camping:
      "American Whitewater notes informal campsites along the Marsh Creek corridor, but use only current Forest Service-designated or otherwise lawful sites. Boundary Creek/Dagger Falls facilities are a staging option when open; do not assume a campsite at the endpoint.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Long mountain-road shuttle from the Dagger Falls/Boundary Creek staging area back to the Highway 21 launch. Stage early, confirm snow and road openings, and allow extra time for the trail take-out carry.",
    permits:
      "No permit is required for the Marsh Creek-to-Dagger Falls section according to American Whitewater, but a permit is required for downstream Middle Fork travel during the controlled season. Follow Sawtooth and Salmon-Challis Forest Service, Idaho AIS/PFD, fire, and closure rules.",
    watchFor: ["heavy wood and strainers", "rare eddies and loaded-raft stopping difficulty", "cold high-elevation water", "Dagger Falls mandatory take-out", "stage trend and snow/ice debris"],
    season: [5, 6, 7],
    imageUrl: salmonImage,
    imageLabel: "Middle Fork Salmon watershed context photograph",
  }),

  makeRoute({
    id: "crooked-fork-highway-12-white-sands",
    riverId: "crooked-fork-idaho",
    name: "Crooked Fork",
    reach: "Highway 12 Bridge to White Sands Campground",
    region: "North-central Idaho / Lochsa corridor",
    routeType: "whitewater",
    summary:
      "A 7.2-mile Class III boogie-water reach from the US 12 Crooked Fork bridge to White Sands Campground, with roadside scouting and a documented Forest Service campground landing.",
    statusText:
      "Planning-only proxy-threshold route. American Whitewater identifies the lower Crooked Fork as a Class III reach and describes 8,000-15,000 cfs Lochsa conditions as best; trip reports put 5,500 cfs at the low end and 11,000 cfs as a great flow. The Lowell gauge is downstream proxy context, and the bridge scramble/campground landing require current confirmation.",
    distance: "About 7.2 river miles",
    time: "About 2-4 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "remote", "access_uncertain"],
    safety: [
      "American Whitewater describes continuous Class II-III boogie water below the Highway 12 bridge. Use a proven moving-water craft, PFD, helmet, rescue equipment, and a crew that can manage swift current and cold snowmelt water.",
      "The Highway 12 access is downstream river-left under the bridge and requires a scramble down a steep slope. Confirm shoulder parking, traffic exposure, the carry, and current bridge/road restrictions before launching.",
      "Trip reports describe 5,500 cfs at Lowell as the low end and 11,000 cfs as a great flow; American Whitewater describes 8,000-15,000 cfs as best. Lowell is downstream proxy context for Crooked Fork, so current wood, weather, trend, and local inspection override the numeric cue.",
      "White Sands Campground offers easier beach access on river right, but the preferred carry may pass through an occupied campsite. Confirm the current campground opening, landing, parking, and lawful exit before committing; do not continue into the Lochsa without a separate plan.",
    ],
    gauge: "13337000",
    gaugeName: "Lochsa River near Lowell, ID",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 5500, idealMin: 8000, idealMax: 15000 },
    thresholdLabel:
      "American Whitewater and trip-report cue: 5,500 cfs low end, 8,000-15,000 cfs best, and about 11,000 cfs described as great on the downstream Lowell proxy",
    thresholdUrl: crookedForkAwReach,
    thresholdSupportUrl: crookedForkReports,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: crookedForkAwReach,
    sourceLabel: "American Whitewater Crooked Fork Highway 12-to-Lochsa reach record",
    mapUrl: upperLochsaCorridor,
    additionalSourceLinks: [
      { label: "American Whitewater Crooked Fork trip reports", url: crookedForkReports },
      { label: "How's Your River White Sands Campground access", url: crookedForkWhiteSandsAccess },
      { label: "Idaho Fish and Game Crooked Fork water record", url: crookedForkIdfgWater },
      { label: "Forest Service Upper Lochsa corridor guide", url: upperLochsaCorridor },
      { label: "USGS Lochsa River near Lowell proxy gauge", url: lochsaSplitLowellGauge },
      { label: "Idaho Transportation Department Crooked Fork bridge record", url: "https://apps.itd.idaho.gov/Apps/Fund/itip2026/draft/Program/FY26-ByProgram-Hwy.pdf" },
    ],
    putIn: {
      name: "US 12 Crooked Fork Bridge Put-In",
      latitude: 46.58041667,
      longitude: -114.61163889,
      mileFromStart: 0,
      note: "ITD bridge coordinate and AW access anchor at US 12 milepost 169.68. The river entry is downstream river-left under the bridge via a steep scramble; verify parking, traffic, and carry conditions.",
    },
    takeOut: {
      name: "White Sands Campground Take-Out",
      latitude: 46.50742,
      longitude: -114.68678,
      mileFromStart: 7.2,
      note: "Forest Service campground/river-right beach access near the Crooked Fork–Lochsa confluence. The preferred carry may pass through a campsite; confirm current occupancy, landing, parking, and legal exit.",
    },
    access: [
      {
        name: "US 12 Crooked Fork Bridge Put-In",
        latitude: 46.58041667,
        longitude: -114.61163889,
        mileFromStart: 0,
        note: "Roadside bridge staging anchor; steep downstream river-left scramble to water.",
      },
      {
        name: "White Sands Campground Take-Out",
        latitude: 46.50742,
        longitude: -114.68678,
        mileFromStart: 7.2,
        note: "Named campground/beach landing; use only current public day-use and campsite carry routes.",
      },
    ],
    camping:
      "White Sands Campground is an endpoint camping option when open, but a campsite is not guaranteed and the route is day-use oriented. Confirm seasonal road, fee, fire, sanitation, and occupancy rules before relying on it.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Stage at White Sands Campground, then shuttle back along US 12 to the Crooked Fork bridge. The highway makes scouting possible, but traffic, shoulder space, and seasonal road work require disciplined staging.",
    permits:
      "Follow Nez Perce-Clearwater National Forest campground and road rules, Idaho AIS/PFD requirements, posted US 12 controls, fire restrictions, and current closure notices.",
    watchFor: ["continuous Class II-III water", "bridge scramble", "cold water", "wood and strainers", "8,000-15,000 cfs planning cue", "occupied-campsite landing"],
    season: [5, 6, 7],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater-Lochsa watershed context photograph",
  }),

  makeRoute({
    id: "selway-paradise-selway-falls",
    riverId: "selway-river-idaho",
    name: "Selway River",
    reach: "Paradise to Selway Falls",
    region: "North-Central Idaho / Selway-Bitterroot Wilderness",
    routeType: "whitewater",
    summary:
      "A 47.8-mile Class IV wilderness expedition from the Paradise launch ramp to the Race Creek take-out above Selway Falls.",
    statusText:
      "Planning-only permit wilderness route. American Whitewater and RiverBrain document the full reach, direct Lowell gauge context, remote camps, exact Paradise access, and 700-35,000 cfs guidance; one-launch-per-day controls, extreme rescue distance, rapid escalation, and Selway Falls make this an expert expedition plan rather than a score-eligible day route.",
    distance: "About 47.8 river miles across a multi-day expedition",
    time: "Three to five days including permit logistics, camps, scouting, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates Paradise to Selway Falls Class IV and identifies consequential rapids including Goat, Moose Juice, Double Drop, Ladle, Wolf Creek, and Jims Creek; scout or portage by team consensus and never continue toward Selway Falls below the designated take-out.",
      "RiverBrain's 700-35,000 cfs Lowell-gauge envelope is planning guidance, not a universal safe range. American Whitewater trip reports describe 7,000-9,000 cfs as very large for non-professionals and 14,000 cfs and above as a materially different, Class V-level management problem; match flow to the crew, boat, and rescue plan.",
      "The route is roadless after Paradise, has limited eddies and delayed rescue, and requires a current Forest Service permit during the May 15-July 31 control season. Carry permit-required sanitation/fire gear, satellite communication, repair supplies, and a contingency for road, weather, and evacuation delays.",
    ],
    gauge: "13336500",
    gaugeName: "Selway River near Lowell, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 700, idealMin: 700, idealMax: 35000, tooHigh: 35000 },
    thresholdLabel:
      "RiverBrain reach guidance: 700 cfs minimum, 12,500 cfs average reference, and 35,000 cfs maximum; AW trip reports add 14,000 cfs escalation context",
    thresholdUrl: upperSelwayRiverBrain,
    thresholdSupportUrl: upperSelwayAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: upperSelwayAwReach,
    sourceLabel: "American Whitewater Paradise-to-Selway Falls reach record",
    mapUrl: "https://www.fs.usda.gov/recarea/nezperceclearwater/recreation/wintersports/recarea/?actid=29&recid=80046",
    additionalSourceLinks: [
      { label: "American Whitewater Paradise-to-Selway Falls reach", url: upperSelwayAwReach },
      { label: "RiverBrain reach flow and camp index", url: upperSelwayRiverBrain },
      { label: "RiverBrain Paradise launch ramp", url: upperSelwayParadiseAccess },
      { label: "RiverBrain White Cap Creek alternative put-in", url: upperSelwayWhiteCapAccess },
      { label: "USGS Selway River near Lowell gauge", url: upperSelwayGauge },
      { label: "Recreation.gov Selway permit rules", url: upperSelwayPermit },
      { label: "Selway River Adventures corridor logistics", url: "https://www.selwayriver.com/the-selway" },
      { label: "Race Creek campground / take-out coordinate context", url: "https://mapcarta.com/W705294776" },
      { label: "Forest Service Selway corridor and road status", url: "https://www.fs.usda.gov/media/61684" },
    ],
    putIn: {
      name: "Paradise Launch Ramp",
      latitude: 45.86055928,
      longitude: -114.74397629,
      mileFromStart: 0,
      note: "RiverBrain's exact Paradise launch-ramp coordinate by Paradise Campground and White Cap Creek; confirm road opening, permit holder, ramp condition, and staging before loading boats.",
    },
    takeOut: {
      name: "Race Creek Take-Out Above Selway Falls",
      latitude: 46.04408,
      longitude: -115.28401,
      mileFromStart: 47.8,
      note: "Race Creek campground/road anchor above Selway Falls. The actual take-out ramp is downstream of the campground; confirm the current landing and stop before the falls.",
    },
    camping:
      "RiverBrain lists named wilderness camps throughout the 47-mile corridor, including Bad Luck Bar, Waldo Bar, Running Creek, Archer Point, Goat Creek, Cougar Flats, Bear Creek, Black Sands, and Rattlesnake Bar. Camp only at designated or established sites and follow Selway sanitation, fire-pan, and portable-toilet rules.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Stage the long road shuttle before launch: the Paradise approach crosses Nez Perce Pass, while the Race Creek road follows the lower Selway and is narrow/seasonal. Plan several days, a recovery margin, and satellite communication rather than relying on same-day vehicle support.",
    permits:
      "A Forest Service Selway permit is required during the May 15-July 31 control season, limited to one launch per day and a maximum 16-person group; outside that season verify current group-size, sanitation, fire, road, and closure rules before departure.",
    watchFor: ["Ladle and Wolf Creek escalation", "Moose Juice tributary rise", "mobile wood and limited eddies", "Race Creek take-out above Selway Falls", "permit and road-status controls"],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Selway-Lochsa watershed context photograph",
  }),

  makeRoute({
    id: "selway-falls-wild-goose-clearwater",
    riverId: "selway-river-idaho",
    name: "Selway River",
    reach: "Below Selway Falls to Wild Goose Campground",
    region: "North-Central Idaho / Selway-Lochsa",
    routeType: "whitewater",
    summary:
      "An 18-mile Class II-III lower Selway section below Selway Falls, with public road access and a developed Wild Goose take-out on the Clearwater.",
    statusText:
      "Gauge-scored lower Selway route. American Whitewater lists 1,000-40,000 cfs on the Lowell reference gauge; this lower section is easier than the permit-only wilderness run but remains remote and cold-water dependent.",
    distance: "About 18 miles",
    time: "About 5-8 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "remote", "strainers", "access_uncertain"],
    safety: [
      "The route begins below Selway Falls, avoiding the more technical wilderness section, but still contains long moving-water stretches and limited roadside recovery.",
      "Three Rivers access is constrained; Wild Goose Campground is the better public downstream landing and should be confirmed open before launch.",
      "American Whitewater's 1,000-40,000 cfs range is a broad runnable reference, not a novice recommendation or safety guarantee.",
    ],
    gauge: "13336500",
    gaugeName: "Selway River near Lowell, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1000, idealMax: 40000, tooHigh: 40000 },
    thresholdLabel: "American Whitewater published runnable window: 1,000-40,000 cfs",
    thresholdUrl: lowerSelwayThreshold,
    thresholdSupportUrl: "https://www.recreation.gov/permits/234624",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: "https://www.recreation.gov/permits/234624",
    sourceLabel: "Forest Service Selway River permit and access information",
    mapUrl: "https://www.fs.usda.gov/recarea/nezperceclearwater/recreation/wintersports/recarea/?actid=29&recid=80046",
    putIn: {
      name: "Put-In Below Selway Falls",
      latitude: 46.054044,
      longitude: -115.310067,
      mileFromStart: 0,
      note: "Public beach access at Selway River Road mile 17.9, below the falls.",
    },
    takeOut: {
      name: "Wild Goose Campground Access",
      latitude: 46.135465,
      longitude: -115.62645,
      mileFromStart: 18,
      note: "Developed Forest Service campground access on river right at Highway 12 mile 95.3.",
    },
    camping: "No overnight itinerary is assumed. Use only currently open Forest Service campgrounds and follow the Selway permit-season rules.",
    campingClassification: "nearby_basecamp",
    shuttle: "Long two-road shuttle between Selway River Road and Highway 12; plan for limited service and communications.",
    permits: "Check Selway control-season permits, Idaho AIS/PFD requirements, fire restrictions, and current Forest Service road status.",
    watchFor: ["Selway Falls boundary", "long moving-water sections", "limited access and cold water"],
    imageUrl: salmonImage,
    imageLabel: "Selway-Lochsa watershed context photograph",
  }),

  makeRoute({
    id: "henrys-fork-riverside-hatchery-ford",
    riverId: "henrys-fork-idaho",
    name: "Henrys Fork",
    reach: "Riverside Campground to Hatchery Ford",
    region: "Eastern Idaho / Island Park",
    routeType: "whitewater",
    summary:
      "A 4.8-mile Class II-III splashy run from the Riverside Campground ramp to the East Hatchery Ford boating site.",
    statusText:
      "Gauge-scored Henrys Fork run. American Whitewater lists 1,000-3,000 cfs as the runnable range; the East Hatchery Ford landing is the last developed take-out before Upper Mesa Falls.",
    distance: "About 4.8 river miles",
    time: "About 2-4 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "mandatory_takeout", "dam"],
    safety: [
      "The reach has splashy Class II-III waves but Upper Mesa Falls is downstream; take out at East Hatchery Ford and do not continue toward the falls.",
      "Riverside Campground is an improved ramp; East Hatchery Ford is a developed take-out only. Confirm road access, parking, and seasonal operations.",
      "The 1,000-3,000 cfs band is a route-planning reference. Scout changing wood and current, and treat the downstream falls boundary as mandatory.",
    ],
    gauge: "13042500",
    gaugeName: "Henrys Fork near Island Park, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1000, idealMax: 3000, tooHigh: 3000 },
    thresholdLabel: "American Whitewater published runnable window: 1,000-3,000 cfs",
    thresholdUrl: henrysForkThreshold,
    thresholdSupportUrl: caribouTargheeAccessGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: caribouTargheeAccessGuide,
    sourceLabel: "Caribou-Targhee Forest Service boating access guide",
    mapUrl: "https://www.fs.usda.gov/visit/destinations?field_fs_states_tid_selective=All&field_rec_activities_target_id=11944",
    putIn: {
      name: "Riverside Campground Boat Ramp",
      latitude: 44.266998,
      longitude: -111.456001,
      mileFromStart: 0,
      note: "Forest Service campground ramp on Henrys Fork.",
    },
    takeOut: {
      name: "East Hatchery Ford Boating Site",
      latitude: 44.216924,
      longitude: -111.431564,
      mileFromStart: 4.8,
      note: "Developed Forest Service take-out upstream of Upper Mesa Falls; last developed boat take-out before the falls.",
    },
    camping: "Riverside is an endpoint campground when open and reserved; no camping downstream of the take-out is assumed.",
    campingClassification: "endpoint_campground",
    shuttle: "Short Island Park-area shuttle on paved and Forest Service roads; confirm the take-out gate and parking.",
    permits: "Follow Forest Service site rules, Idaho AIS/PFD requirements, and all posted Upper Mesa Falls closure boundaries.",
    watchFor: ["Upper Mesa Falls mandatory take-out", "splashy waves and wood", "cold water and changing access"],
    imageUrl: henrysImage,
    imageLabel: "Henrys Fork / Henrys Lake watershed context photograph",
  }),

  makeRoute({
    id: "south-fork-boise-anderson-danskin",
    riverId: "south-fork-boise-river-idaho",
    name: "South Fork Boise River",
    reach: "Anderson Ranch Dam to Danskin Bridge",
    region: "Southwest Idaho / Boise Mountains",
    routeType: "whitewater",
    summary:
      "A remote 10.9-mile Class I-II(III) tailwater run below Anderson Ranch Dam to the Danskin Bridge access, with cold water and changing dam releases.",
    statusText:
      "Gauge-scored upper-run route. American Whitewater identifies the reach and direct Anderson Ranch Dam gauge; Kayak Idaho publishes a 600-2,000 cfs South Fork upper-section band, while American Whitewater's trip report documents substantially more consequential conditions around 2,500 cfs. The score is planning context only: dam releases, cold water, road status, and local inspection control the go/no-go decision.",
    distance: "About 10.9 river miles",
    time: "About 4-7 hours plus scouting",
    difficulty: "moderate",
    risk: "advanced",
    hazards: ["dam_release", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "The canyon has limited shoreline escape and very cold tailwater. Wear a PFD and cold-water protection, carry rescue and repair gear, and use a crew able to manage Class III features at the selected release.",
      "Anderson Ranch releases can change quickly. Confirm the current release schedule, road conditions, and launch status with the managing agencies before entering below the dam.",
      "The 600-2,000 cfs band is a community planning cue on the direct dam gauge. American Whitewater reports a serious cold-water incident near 2,500 cfs; release notices, local inspection, and crew skill override any published band or score.",
    ],
    gauge: "13190500",
    gaugeName: "South Fork Boise River at Anderson Ranch Dam, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 600, idealMax: 2000, tooHigh: 2000 },
    thresholdLabel: "Kayak Idaho South Fork upper-section planning band: 600-2,000 cfs; AW documents higher-flow hazard context",
    thresholdUrl: southForkBoiseUpperThreshold,
    thresholdSupportUrl: southForkBoiseUpperReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkBoiseUpperReach,
    sourceLabel: "American Whitewater South Fork Boise Upper Run reach record",
    mapUrl: southForkBoiseAccessGuide,
    additionalSourceLinks: [
      {
        label: "USBR Anderson Ranch tailwater access and formal launches",
        url: southForkBoiseAccessGuide,
      },
      {
        label: "Idaho Fish and Game South Fork Boise boating and gauge context",
        url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1157355435501",
      },
      {
        label: "USGS Anderson Ranch Dam live gauge",
        url: "https://waterdata.usgs.gov/monitoring-location/USGS-13190500/",
      },
      {
        label: "Wilderness Portal upper South Fork Boise route map and launch coordinate",
        url: "https://www.wildernessportal.com/routes/s-fork-boise-upper-run",
      },
    ],
    putIn: {
      name: "Anderson Ranch Dam Tailwaters Access",
      latitude: 43.3589,
      longitude: -115.454,
      mileFromStart: 0,
      note: "Tailwater staging below Anderson Ranch Dam; the route map corroborates this launch-area coordinate and USBR identifies formal tailwater/village/Danskin launches. Confirm the current wetted-edge entry and release conditions.",
    },
    takeOut: {
      name: "Danskin Floatboat Access",
      latitude: 43.4,
      longitude: -115.557,
      mileFromStart: 10.9,
      note: "Formal Danskin floatboat access identified in USBR and state boating materials; confirm road, parking, and ramp condition before launch.",
    },
    camping:
      "Use a lawful Boise National Forest or Anderson Ranch Reservoir basecamp. No on-route overnight camping or informal shoreline access is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Remote mountain-road shuttle between the dam and Danskin; inspect the road, leave a float plan, and carry satellite communication because cell coverage is unreliable.",
    permits:
      "Follow Boise National Forest, USBR, and Idaho Fish and Game rules, dam-release notices, Idaho AIS/PFD requirements, and current fire and road restrictions.",
    watchFor: ["dam-release changes", "cold water and limited escape shoreline", "wood and Class III features", "remote shuttle and no cell coverage"],
    imageUrl: boiseImage,
    imageLabel: "South Fork Boise watershed context photograph",
  }),

  makeRoute({
    id: "south-fork-boise-danskin-neal",
    riverId: "south-fork-boise-river-idaho",
    name: "South Fork Boise River",
    reach: "Danskin Bridge to Neal Bridge",
    region: "Southwest Idaho / Boise Mountains",
    routeType: "whitewater",
    summary:
      "A remote 16-mile Class III-IV canyon run from Danskin Bridge to the Neal Bridge take-out near Arrowrock Reservoir.",
    statusText:
      "Gauge-scored expert canyon route. American Whitewater lists 600-5,000 cfs as the runnable envelope; there is no cell coverage and the final access is a mandatory take-out before reservoir water.",
    distance: "About 16 river miles",
    time: "About 5-8 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "mandatory_takeout", "fast_rise"],
    safety: [
      "Class III-IV canyon water with roadless stretches and delayed rescue. Carry throw bags, first aid, repair gear, and satellite communication.",
      "The Neal Bridge landing is on river left just before the bridge; do not drift into Arrowrock Reservoir without a separate plan.",
      "American Whitewater's 600-5,000 cfs range is a planning envelope only. Current wood, weather, and crew skill determine whether the run is appropriate.",
    ],
    gauge: "13190500",
    gaugeName: "South Fork Boise River at Anderson Ranch Dam, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 600, idealMax: 5000, tooHigh: 5000 },
    thresholdLabel: "American Whitewater published runnable window: 600-5,000 cfs",
    thresholdUrl: southForkBoiseThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkBoiseThreshold,
    sourceLabel: "American Whitewater South Fork Boise Canyon reach record",
    mapUrl: "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=13190500",
    putIn: {
      name: "Danskin Bridge Put-In",
      latitude: 43.4,
      longitude: -115.557,
      mileFromStart: 0,
      note: "American Whitewater access anchor with large parking and vault toilets; confirm current road and staging conditions.",
    },
    takeOut: {
      name: "Neal Bridge Take-Out",
      latitude: 43.5519,
      longitude: -115.737,
      mileFromStart: 16,
      note: "River-left landing just before Neal Bridge on Blacks Creek Road; mandatory take-out before Arrowrock Reservoir.",
    },
    camping: "No on-route camping is assumed. Use a lawful Boise National Forest basecamp and carry a complete emergency/overnight contingency kit.",
    campingClassification: "nearby_basecamp",
    shuttle: "Long remote shuttle on mountain roads; inspect road conditions and leave a float plan with a responsible contact.",
    permits: "Follow Boise National Forest access rules, Idaho AIS/PFD requirements, fire restrictions, and current reservoir/road notices.",
    watchFor: ["roadless canyon and no cell coverage", "Class III-IV rapids and wood", "mandatory Neal Bridge take-out"],
    imageUrl: boiseImage,
    imageLabel: "Boise River watershed context photograph",
  }),

  makeRoute({
    id: "bear-river-black-canyon-grace-powerhouse",
    riverId: "bear-river-idaho",
    name: "Bear River",
    reach: "Grace Dam Bridge to Grace Powerhouse (Black Canyon)",
    region: "Southeast Idaho / Caribou County",
    routeType: "whitewater",
    summary:
      "A roughly 6-mile Class IV-V Bear River canyon run below Grace Dam, with negotiated PacifiCorp/American Whitewater releases and a Grace Powerhouse take-out.",
    statusText:
      "Gauge-scored release-dependent expert route. American Whitewater and PacifiCorp describe 900 cfs-or-inflow release conditions and 200 cfs between releases; the 2026 Grace flowline project is changing the normal operating pattern. PacifiCorp's recreation plan documents a maintained Black Canyon put-in and take-out, but current release, road, facility, and event instructions must be confirmed before launch.",
    distance: "About 6.2 river miles",
    time: "About 3-6 hours plus scouting and portage decisions",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "dam",
      "dam_release",
      "fast_rise",
      "cold_water",
      "strainers",
      "access_uncertain",
      "mandatory_takeout",
    ],
    safety: [
      "Class IV-V canyon water includes long rocky rapids and significant hydraulic consequences; use a proven expert crew, helmet, rescue kit, and a craft appropriate to the release level.",
      "PacifiCorp and American Whitewater release operations can change during the Grace flowline replacement. Confirm the current flow forecast, release window, road status, and event instructions immediately before traveling.",
      "PacifiCorp's recreation plan documents a maintained Grace Dam put-in and Black Canyon take-out with parking and hand-launch facilities. Confirm current legal staging, road status, facility restrictions, and a safe river entry; Grace Powerhouse remains the required downstream take-out.",
    ],
    gauge: "10080000",
    gaugeName: "Bear River below Grace Dam, near Grace, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 450, idealMin: 900, idealMax: 1200 },
    thresholdLabel:
      "American Whitewater/PacifiCorp release context: 900 cfs or inflow on release days, about 200 cfs between releases; 900-1,200 cfs planning window for the current flowline project",
    thresholdUrl: bearBlackCanyonThreshold,
    thresholdSupportUrl: bearBlackCanyonReleaseNotice,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: bearBlackCanyonThreshold,
    sourceLabel: "American Whitewater Black Canyon of the Bear reach record",
    mapUrl: bearBlackCanyonMap,
    additionalSourceLinks: [
      {
        label: "PacifiCorp Bear River release information",
        url: bearBlackCanyonReleaseNotice,
      },
      {
        label: "American Whitewater 2026 flowline update",
        url: "https://www.americanwhitewater.org/article/black-canyon-of-the-bear-to-flow-all-summer-id/",
      },
      {
        label: "PacifiCorp Grace Dam and Last Chance recreation site plan",
        url: bearBlackCanyonOfficialAccess,
      },
      {
        label: "Idaho Fish and Game Black Canyon public-access description",
        url: bearBlackCanyonIdfgAccess,
      },
      {
        label: "USGS Grace Dam gauge",
        url: "https://waterdata.usgs.gov/monitoring-location/USGS-10080000/",
      },
    ],
    putIn: {
      name: "Grace Dam Bridge / Grace Dam Road put-in",
      latitude: 42.58694,
      longitude: -111.72639,
      mileFromStart: 0,
      note: "PacifiCorp recreation-plan put-in/facility anchor below Grace Dam; confirm the current release-day staging rules, parking, road status, and safe hand-launch path.",
    },
    takeOut: {
      name: "Grace Powerhouse take-out",
      latitude: 42.54166,
      longitude: -111.80028,
      mileFromStart: 6.2,
      note: "PacifiCorp recreation-plan take-out facility upstream of Grace Powerhouse; confirm current parking, hand-launch/egress path, powerhouse restrictions, and daylight exit before launching.",
    },
    camping:
      "No on-route camping is assumed. Use a lawful Grace/Lava Hot Springs-area basecamp; the canyon access points are day-use staging locations.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short but road-condition-sensitive shuttle between Grace Dam Road and the Grace Powerhouse area; stage the take-out before any release-day launch.",
    permits:
      "No special river permit is listed, but release-day instructions, PacifiCorp facility rules, Idaho AIS/PFD requirements, and current road/closure notices control access.",
    watchFor: [
      "release timing and ramp-rate changes",
      "Class V Boo Boo and other rocky rapids",
      "powerhouse restrictions and mandatory take-out",
    ],
    season: [4, 5, 6, 7, 8, 9, 10],
    imageUrl: snakeImage,
    imageLabel: "Bear River regional context photograph",
  }),

  makeRoute({
    id: "bear-river-oneida-narrows",
    riverId: "bear-river-idaho",
    name: "Bear River",
    reach: "Grace Powerhouse to ID-36 / Oneida Narrows",
    region: "Southeast Idaho / Oneida Narrows",
    routeType: "recreational",
    summary:
      "A 4.5-mile Class I-II canyon float through Oneida Narrows, with small rapids, public access, and a direct Bear River gauge near the state line.",
    statusText:
      "Gauge-scored recreational route. American Whitewater lists 350-3,000 cfs as runnable; reservoir operations, cold water, and the take-out choice still require same-day confirmation.",
    distance: "About 4.5 river miles",
    time: "About 2-4 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "wind", "strainers", "remote", "access_uncertain"],
    safety: [
      "Class I-II water with occasional small rapids; wear PFDs and keep a conservative line near canyon walls, strainers, and changing reservoir backwater.",
      "Use only the named public access points and confirm the best take-out for your craft; American Whitewater identifies a lower take-out for most boats.",
      "The 350-3,000 cfs range is a planning reference from a recognized paddling source, not a guarantee of launch quality or reservoir conditions.",
    ],
    gauge: "10092700",
    gaugeName: "Bear River at Idaho-Utah State Line",
    thresholdModel: "two-sided",
    threshold: { tooLow: 350, idealMin: 350, idealMax: 3000, tooHigh: 3000 },
    thresholdLabel: "American Whitewater published runnable window: 350-3,000 cfs",
    thresholdUrl: oneidaNarrowsThreshold,
    thresholdSupportUrl: caribouTargheeAccessGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: caribouTargheeAccessGuide,
    sourceLabel: "Caribou-Targhee public boating access guide",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-10092700/",
    putIn: {
      name: "Oneida Powerhouse Public Access",
      latitude: 42.2677,
      longitude: -111.75,
      mileFromStart: 0,
      note: "Public access anchor at the Oneida Powerhouse reach; confirm current parking and carry conditions.",
    },
    takeOut: {
      name: "ID-36 Oneida Narrows Take-Out",
      latitude: 42.210364,
      longitude: -111.783707,
      mileFromStart: 4.5,
      note: "Public downstream access near ID-36; choose the lower landing appropriate to boat size and current reservoir backwater.",
    },
    camping: "Use designated Oneida-area campgrounds or a nearby basecamp; no informal riverbank camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle: "Short southeast Idaho shuttle; confirm the landing and road approach before launch.",
    permits: "Follow current Caribou-Targhee access rules, Idaho AIS/PFD requirements, reservoir notices, and private-bank restrictions.",
    watchFor: ["reservoir backwater and wind", "small rapids and cold water", "craft-specific take-out choice"],
    imageUrl: snakeImage,
    imageLabel: "Southeast Idaho river context photograph",
  }),

  makeRoute({
    id: "malad-river-dam-snake",
    riverId: "malad-river-idaho",
    name: "Malad River",
    reach: "Malad Dam to Snake River confluence",
    region: "South-Central Idaho / Gooding County",
    routeType: "whitewater",
    summary:
      "A 1.9-mile Class IV lower Malad gorge run from the dam area to the Snake River, with a mandatory dam portage and high-flow big-water character.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater documents the lower gorge, a locked-gate/0.2-mile carry to the official put-in, a mandatory river-left dam portage, and 600-1,300+ cfs observations; the Gooding-area USGS gauge is upstream/proxy, the lower diversion can alter hydraulics, and the Snake access endpoint is approximate.",
    distance: "About 1.9 river miles",
    time: "About 2-4 hours including the dam carry, scouting, and a difficult take-out",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "dam", "cold_water", "strainers", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the lower reach Class IV and requires a river-left portage around the first dam; the official kayaker put-in is below the dam after a locked-gate approach and roughly 0.2-mile hike. Confirm the carry, gate, and landowner rules before bringing a boat.",
      "American Whitewater reports the lower section as continuous at about 1,300 cfs, with a 1,250 cfs April 2025 run and a 600 cfs fall 2023 run. Kayak Idaho's lower-Malad guidance gives a broader 300-1,500 cfs planning band; use current trend and on-site scouting rather than treating either as a safe-line guarantee.",
      "The lower Malad diversion can move or remove up to roughly 1,500 cfs, and the Snake confluence has a difficult, approximate landing. Stay well clear of diversion works, verify the current river-right/parking take-out, and carry rescue communications for a short but committing gorge.",
    ],
    gauge: "13152500",
    gaugeName: "Malad River near Gooding, ID (upstream/proxy for lower Malad)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 300, idealMin: 1000, idealMax: 1500, tooHigh: 2200 },
    thresholdLabel:
      "American Whitewater lower-gorge observations: about 600 cfs fall run and 1,250-1,300 cfs continuous/high-flow runs; Kayak Idaho lower-Malad planning band 300-1,500 cfs",
    thresholdUrl: lowerMaladThreshold,
    thresholdSupportUrl: lowerMaladFlows,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lowerMaladThreshold,
    sourceLabel: "American Whitewater Lower Malad Dam-to-Snake reach record",
    mapUrl: lowerMaladMap,
    additionalSourceLinks: [
      { label: "American Whitewater Lower Malad reach and access record", url: lowerMaladThreshold },
      { label: "American Whitewater Lower Malad map / approximate endpoint", url: lowerMaladMap },
      { label: "Kayak Idaho Snake flows / lower Malad planning band", url: lowerMaladFlows },
      { label: "USGS Malad River near Gooding proxy gauge", url: lowerMaladGauge, provider: "usgs" },
      { label: "Idaho Fish and Game lower Malad water record", url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1149061428630", provider: "local" },
      { label: "Malad Gorge State Park access and safety context", url: lowerMaladParkGuide, provider: "local" },
      { label: "Idaho Water Resources lower Malad diversion record", url: lowerMaladDiversionGuide, provider: "local" },
      { label: "Idaho Power upper Malad access context", url: "https://www.idahopower.com/recreation/parks-and-campgrounds/upper-malad-river/", provider: "local" },
    ],
    putIn: {
      name: "Malad Dam below-gate official kayaker put-in",
      latitude: 42.8735,
      longitude: -114.8765,
      mileFromStart: 0,
      note: "American Whitewater's official kayaker entry below Malad Dam; coordinates are approximate. Expect a locked-gate approach and roughly 0.2-mile boat carry; confirm legal access and current dam operations before launch.",
    },
    takeOut: {
      name: "Snake River access parking near Malad confluence",
      latitude: 42.86306,
      longitude: -114.90194,
      mileFromStart: 1.9,
      note: "Approximate Snake River access/parking anchor near the lower Malad confluence. American Whitewater coordinates are approximate; verify the current river-right landing, parking, and private/park boundaries before committing.",
    },
    access: [
      {
        name: "Malad Dam below-gate official kayaker put-in",
        latitude: 42.8735,
        longitude: -114.8765,
        mileFromStart: 0,
        note: "Below-dam launch after the locked-gate and 0.2-mile carry; mandatory dam portage and legal access confirmation are hard gates.",
        segmentKind: "transition",
      },
      {
        name: "Snake River access parking near Malad confluence",
        latitude: 42.86306,
        longitude: -114.90194,
        mileFromStart: 1.9,
        note: "Approximate lower endpoint; confirm the legal landing and current parking rather than following the coordinate blindly.",
      },
    ],
    camping:
      "Day-use gorge. Use a lawful Gooding/Twin Falls-area basecamp or established Malad Gorge State Park camping where available; no on-route camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short but access-sensitive shuttle from the dam approach to the Snake-side endpoint. Stage the lower vehicle first, confirm the locked gate and 0.2-mile carry, and leave a recovery plan for a difficult confluence landing.",
    permits:
      "No river permit was confirmed. Follow Malad Gorge State Park, Idaho AIS/PFD, dam/diversion operator, road, private-property, and current closure rules; do not enter restricted dam or diversion infrastructure.",
    watchFor: ["mandatory Malad Dam portage", "locked gate and 0.2-mile carry", "Class IV continuous lower gorge", "lower diversion hydraulics", "Snake confluence take-out", "rapid flow changes"],
    season: [3, 4, 5, 6, 7, 8, 9],
    imageUrl: snakeImage,
    imageLabel: "Snake River / southern Idaho context photograph",
  }),

  makeRoute({
    id: "portneuf-river-lava-hot-springs-pvc",
    riverId: "portneuf-river-idaho",
    name: "Portneuf River",
    reach: "Lava Hot Springs to PVC diversion",
    region: "Southeast Idaho / Bannock",
    routeType: "whitewater",
    summary:
      "A 10.1-mile Class III-IV Portneuf reach through Lava Hot Springs and downstream basalt ledges, with a direct Topaz gauge and a documented American Whitewater access pair.",
    statusText:
      "Planning-only threshold route. American Whitewater reports 400-700 cfs as excellent kayak water, 700-900 cfs as increasingly difficult, and flows above 1,000 cfs as extremely sticky and high-consequence. The direct Topaz gauge is useful, but the lower public-park take-out and upstream staging require current confirmation.",
    distance: "About 10.1 river miles",
    time: "About 4-7 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "fast_rise", "access_uncertain", "private_banks"],
    safety: [
      "American Whitewater describes regular lava-rock ledges, AOK Falls, Hydrant, Tuber Falls, bridge hazards, and Class III-IV water. Scout every ledge and carry a rescue plan suited to a committing creek-style run.",
      "Use 400-700 cfs as the conservative preferred planning window. At 700-900 cfs the run becomes substantially tougher, and above 1,000 cfs holes can be extremely sticky with severe swim and pinning consequences.",
      "The American Whitewater endpoint pair includes a Lava-area put-in and an unnamed public park take-out. Confirm current city/park permission, bank access, private-property boundaries, and any diversion or bridge closures before staging.",
      "The Portneuf Watershed Partnership places its Topaz station on the downstream side of the Portneuf Marsh Valley Canal diversion, about 1.5 miles below the USGS Topaz gauge. Treat the PVC area as a diversion hazard and monitoring landmark, not as proof of a legal boat landing; do not approach the structure.",
    ],
    gauge: "13073000",
    gaugeName: "Portneuf River at Topaz, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 300, idealMin: 400, idealMax: 700, tooHigh: 1000 },
    thresholdLabel: "American Whitewater: 400-700 cfs great kayak water; 700-900 cfs tough; above 1,000 cfs extremely sticky; 300 cfs and below is primarily tubing/low-water context",
    thresholdUrl: portneufThreshold,
    thresholdSupportUrl: portneufTripReport,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: portneufThreshold,
    sourceLabel: "American Whitewater Portneuf Lava Hot Springs-to-PVC reach record",
    mapUrl: portneufThreshold,
    additionalSourceLinks: [
      { label: "American Whitewater 2007 Portneuf flow and hazard report", url: portneufTripReport },
      { label: "American Whitewater 2017 Portneuf access and rapid report", url: portneufAccessReport },
      { label: "USGS Portneuf River at Topaz monitoring location", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13073000" },
      { label: "Lava Hot Springs Portneuf float information", url: portneufLavaGuide },
      { label: "Lava Hot Springs public parks and river frontage", url: "https://lavahotsprings.com/parks/" },
      { label: "West Park lower Portneuf put-in map coordinate", url: "https://www.lavatuberental.com/" },
      { label: "Pocatello Portneuf River water-trail handout", url: portneufPocatelloGuide },
      { label: "Idaho Fish and Game Lower Portneuf public access and camping", url: "https://idfg.idaho.gov/press/camping-area-reopened-lower-portneuf-fishing-access-property" },
      { label: "Portneuf Watershed Partnership Topaz/PMVC diversion monitoring station", url: portneufTopazDiversionStation },
    ],
    putIn: {
      name: "Lava Hot Springs West Park / Main Footbridge Put-In",
      latitude: 42.620711,
      longitude: -112.012156,
      mileFromStart: 0,
      note: "Lower public town entry at West Park/Main Footbridge; the City describes West Park as directly adjacent to the Portneuf with no river barrier, while the local float map supplies this river-entry coordinate. Confirm current park hours, carry path, and parking before launching.",
    },
    takeOut: {
      name: "PVC Diversion / Public Park Take-Out",
      latitude: 42.6263999938965,
      longitude: -112.126998901367,
      mileFromStart: 10.1,
      note: "American Whitewater endpoint near the PVC diversion; confirm the current public park/river-right landing and stay clear of diversion infrastructure.",
    },
    access: [
      {
        name: "Lava Hot Springs West Park / Main Footbridge Put-In",
        latitude: 42.620711,
        longitude: -112.012156,
        mileFromStart: 0,
        note: "West Park/Main Footbridge river entry documented by the city frontage page and local float map; current parking, carry path, and crowding require confirmation.",
      },
      {
        name: "PVC Diversion / Public Park Take-Out",
        latitude: 42.6263999938965,
        longitude: -112.126998901367,
        mileFromStart: 10.1,
        note: "American Whitewater take-out anchor near the downstream diversion; confirm public park access and do not approach the structure.",
      },
    ],
    camping:
      "Use a lawful Lava Hot Springs-area campground or private basecamp; no informal camping or private-bank staging is assumed on this committing day run.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage the downstream landing first, then use the Highway 30 and local road corridor for the shuttle. Leave a daylight float plan and allow time for scouting the upper ledges and lower access.",
    permits:
      "No river permit is listed. Follow Idaho boating/PFD and invasive-species requirements, Lava Hot Springs park rules, road restrictions, and any current diversion or closure notices.",
    watchFor: ["lava-rock ledges", "AOK Falls", "Hydrant and Tuber Falls", "bridge piers", "wood and strainers", "700-900 cfs escalation", "PVC diversion"],
    season: [3, 4, 5, 6, 7],
    imageUrl: snakeImage,
    imageLabel: "Southeast Idaho river context photograph",
  }),

  makeRoute({
    id: "north-fork-clearwater-elizabeth-kelly",
    riverId: "north-fork-clearwater-river-idaho",
    name: "North Fork Clearwater River",
    reach: "Elizabeth Creek to Kelly Forks (Black Canyon)",
    region: "North-Central Idaho / Clearwater National Forest",
    routeType: "whitewater",
    summary:
      "A 6.5-mile Class III-IV+ Black Canyon reach from the Elizabeth Creek access to the Kelly Forks Campground take-out.",
    statusText:
      "Planning-only proxy-threshold route. American Whitewater names Elizabeth Creek and Kelly Forks as the access pair and describes a fast Class III-IV+ gorge with hidden rapids, holes, and wood. North Idaho Rivers' 3,800 cfs minimum cue and 4,100-4,500 cfs observed runs on downstream USGS 13340600 remain planning context; local level, Forest Road 250 access, and same-day wood scouting control the decision.",
    distance: "About 6.5 river miles",
    time: "About 2-4 hours plus road scouting and a remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the reach Class III-IV+ and describes strong holes, blind corners, and a fast gorge that eases near the Kelly Forks bridge. Use a proven rescue-capable crew and scout from the road before committing.",
      "Use 3,800 cfs as a conservative minimum cue and 4,100-4,500 cfs as observed medium-flow context on USGS 13340600. The gauge is downstream of major tributaries, so local water level, trend, and wood can differ materially.",
      "Elizabeth Creek and Kelly Forks are remote Forest Service access-area anchors. Confirm Forest Road 250 opening, legal parking, river-left landing, campground status, and the bridge approach before launch; do not use the longer Cedars-to-Kelly card's access assumptions for this shorter reach.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 3800, idealMin: 4100, idealMax: 4500 },
    thresholdLabel:
      "North Idaho Rivers North Fork guidance: about 4,000 cfs minimum cue; 4,100-4,500 cfs observed medium-flow runs on downstream Canyon Ranger Station gauge",
    thresholdUrl: northForkClearwaterBlackCanyonGuide,
    thresholdSupportUrl: northForkClearwaterElizabethAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkClearwaterElizabethAw,
    sourceLabel: "American Whitewater Elizabeth Creek to Kelly Forks Black Canyon reach",
    mapUrl: northForkClearwaterElizabethAw,
    additionalSourceLinks: [
      { label: "North Idaho Rivers Black Canyon flow and wood guide", url: northForkClearwaterBlackCanyonGuide },
      { label: "American Whitewater Elizabeth Creek access", url: northForkClearwaterElizabethAccess },
      { label: "American Whitewater Kelly Forks access", url: northForkClearwaterKellyAccess },
      { label: "USGS North Fork Clearwater Canyon Ranger Station gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13340600/" },
      { label: "Clearwater National Forest recreation corridor", url: northForkClearwaterForestService },
      { label: "Kelly Forks Campground map", url: kellyForksCampground },
    ],
    putIn: {
      name: "Elizabeth Creek access",
      latitude: 46.79073,
      longitude: -115.21916,
      mileFromStart: 0,
      note: "American Whitewater's convenient access immediately upstream of the Elizabeth Creek confluence; confirm Forest Road 250 parking and the legal carry to river-left water.",
    },
    takeOut: {
      name: "Kelly Forks Campground take-out",
      latitude: 46.71759,
      longitude: -115.2555,
      mileFromStart: 6.5,
      note: "American Whitewater's upstream, river-left take-out at the Kelly Forks bridge; campground access is a facility anchor, so confirm landing, parking, and seasonal status.",
    },
    camping:
      "Kelly Forks Campground and nearby Forest Service facilities provide endpoint basecamp context when open. No informal Black Canyon roadside camping is assumed; verify seasonal dates, fees, fire restrictions, and bear storage.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Forest Road 250 follows the corridor but is remote, slow, and seasonal. Stage Kelly Forks first, then drive to Elizabeth Creek; allow a full daylight road-scout window and carry recovery gear.",
    permits:
      "Follow Clearwater National Forest road and campground rules, Idaho AIS/PFD requirements, fire restrictions, private-bank boundaries, and current closure notices. The proxy gauge does not establish safe flow by itself.",
    watchFor: ["hidden Class IV holes", "blind corners and mobile wood", "3,800 cfs minimum cue", "Forest Road 250 access", "Kelly Forks bridge and campground landing"],
    season: [5, 6, 7],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not the Elizabeth Creek or Kelly Forks endpoints",
  }),

  makeRoute({
    id: "north-fork-clearwater-black-canyon",
    riverId: "north-fork-clearwater-river-idaho",
    name: "North Fork Clearwater River",
    reach: "Cedars to Elizabeth Creek (upper Black Canyon)",
    region: "North-Central Idaho / Clearwater National Forest",
    routeType: "whitewater",
    summary:
      "A 12.65-mile Class I-III+ upper Black Canyon run from the Cedars access to the Elizabeth Creek take-out, with a Forest Road 250 shuttle and wood-sensitive canyon scenery.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater's current Cedars-to-Elizabeth reach record lists 12.65 miles of Class I-III+ water, named Cedars/Hidden Creek/Elizabeth access, and persistent wood caution. North Idaho Rivers' broader North Fork guidance reports a 4,000 cfs minimum cue, but the Canyon Ranger Station gauge is downstream below major tributaries; local level, road access, and wood remain decisive.",
    distance: "About 12.65 river miles",
    time: "About 4-6 hours plus road scouting and a remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "fast_rise",
      "access_uncertain",
      "mandatory_takeout",
    ],
    safety: [
      "American Whitewater rates the upper section Class I-III+ but specifically warns boaters to watch continuously for wood; the downstream character increases below Hidden Creek. Scout from Forest Road 250, carry rescue and repair gear, and do not commit without a current wood/portage plan.",
      "Use 4,000 cfs as a broad North Fork minimum cue and 4,100-4,500 cfs as observed medium-flow context on USGS 13340600. The gauge is more than 40 miles downstream below major tributaries, so local water level and trend can differ materially.",
      "Cedars, Hidden Creek, and Elizabeth are remote Forest Service access-area anchors. Confirm seasonal Forest Road 250 opening, legal parking, river-side carry, campground status, and the Elizabeth take-out eddy before launch.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 4000, idealMin: 4100, idealMax: 4500 },
    thresholdLabel:
      "North Idaho Rivers North Fork guidance: about 4,000 cfs minimum cue; 4,100-4,500 cfs observed medium-flow runs on downstream Canyon Ranger Station gauge",
    thresholdUrl: northForkClearwaterBlackCanyonGuide,
    thresholdSupportUrl: northForkClearwaterHeadwatersAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: northForkClearwaterBlackCanyonGuide,
    sourceLabel: "American Whitewater Cedars-to-Elizabeth reach record",
    mapUrl: northForkClearwaterHeadwatersAw,
    additionalSourceLinks: [
      { label: "North Idaho Rivers Black Canyon flow and wood guide", url: northForkClearwaterBlackCanyonGuide },
      { label: "American Whitewater Cedars-to-Elizabeth reach and access chain", url: northForkClearwaterHeadwatersAw },
      { label: "American Whitewater Cedars access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/109777" },
      { label: "American Whitewater Hidden Creek Campground access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/0vFi6wg30p9t2HD93vxiG" },
      { label: "American Whitewater Elizabeth Creek take-out", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/118959" },
      { label: "USGS North Fork Clearwater Canyon Ranger Station gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13340600/" },
      { label: "Clearwater National Forest recreation corridor", url: "https://www.fs.usda.gov/recarea/nezperceclearwater/recarea/?recid=79594" },
      { label: "Kelly Forks Campground access map", url: "https://mapcarta.com/N3864944214" },
      { label: "Kelly Forks Cabin and work-center context", url: "https://www.fs.usda.gov/r01/nezperce-clearwater/recreation/kelly-forks-cabin" },
    ],
    putIn: {
      name: "The Cedars access",
      latitude: 46.87252,
      longitude: -115.07655,
      mileFromStart: 0,
      note: "American Whitewater access point at The Cedars; verify Forest Road 250 opening, parking, exact river carry, and current public entry before staging.",
    },
    takeOut: {
      name: "Elizabeth Creek take-out",
      latitude: 46.79045,
      longitude: -115.22040,
      mileFromStart: 12.65,
      note: "American Whitewater take-out just above the Elizabeth Creek confluence; plan the take-out eddy during shuttle and confirm the current carry and legal landing.",
    },
    access: [
      {
        name: "The Cedars access",
        latitude: 46.87252,
        longitude: -115.07655,
        mileFromStart: 0,
        note: "American Whitewater named launch; confirm Forest Road 250, parking, and river-side carry.",
      },
      {
        name: "Hidden Creek Campground access",
        latitude: 46.83097,
        longitude: -115.17921,
        mileFromStart: 12.34,
        note: "American Whitewater partial-run access and Forest Service campground; confirm current campground opening, river carry, and parking.",
      },
      {
        name: "Elizabeth Creek take-out",
        latitude: 46.79045,
        longitude: -115.22040,
        mileFromStart: 12.65,
        note: "American Whitewater named take-out; plan the eddy before the Elizabeth Creek confluence and confirm current legal landing.",
      },
    ],
    camping:
      "Cedars and Hidden Creek provide Forest Service campground context when open. No informal Black Canyon roadside camping is assumed; verify seasonal dates, fees, fire rules, potable water, and bear storage.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Forest Road 250 follows the corridor but is remote, slow, and seasonal. Stage the Elizabeth vehicle first, then drive to The Cedars; allow a full daylight road-scout window and carry recovery gear.",
    permits:
      "Follow Clearwater National Forest road/campground rules, Idaho AIS/PFD requirements, fire restrictions, private-bank boundaries, and current closure notices. The proxy gauge does not establish a safe flow by itself.",
    watchFor: [
      "Class I-III+ water with continuous wood watch",
      "4,000 cfs broad North Fork minimum cue",
      "4,100-4,500 cfs observed downstream-gauge context",
      "downstream proxy-gauge mismatch",
      "seasonal Forest Road 250 access",
      "Hidden Creek and Elizabeth campground/landing controls",
    ],
    season: [5, 6, 7],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater watershed context photograph; not a Cedars or Elizabeth endpoint image",
  }),

  makeRoute({
    id: "north-fork-clearwater-kelly-aquarius",
    riverId: "north-fork-clearwater-river-idaho",
    name: "North Fork Clearwater River",
    reach: "Kelly Forks to Aquarius Campground",
    region: "North-Central Idaho / Clearwater National Forest",
    routeType: "whitewater",
    summary:
      "A remote 44-mile Class II-III+ North Fork Clearwater corridor with Forest Service camp access, road-side scouting, and an Aquarius Campground take-out.",
    statusText:
      "Gauge-scored remote whitewater route. American Whitewater lists 2,500-16,000 cfs; the long road-accessible corridor still requires a multi-day plan, wood scouting, and a reliable evacuation margin.",
    distance: "About 44 river miles, multi-day",
    time: "1-3 days depending on section and camping",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "The corridor includes Class II-III+ water and a Class V Irish Railroad rapid; choose a take-out before that feature unless the party is specifically prepared.",
      "Forest Road 247/250 parallels much of the river for scouting and evacuation, but pavement ends upstream of Aquarius and road conditions change seasonally.",
      "American Whitewater's 2,500-16,000 cfs band is planning guidance only. Scout wood, weather, water temperature, and each selected section before committing.",
    ],
    gauge: "13340600",
    gaugeName: "North Fork Clearwater River near Canyon Ranger Station, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 2500, idealMin: 2500, idealMax: 16000, tooHigh: 16000 },
    thresholdLabel: "American Whitewater published runnable window: 2,500-16,000 cfs",
    thresholdUrl: northForkClearwaterThreshold,
    thresholdSupportUrl: clearwaterGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: clearwaterGuide,
    sourceLabel: "BLM Clearwater River boating guide",
    mapUrl: "https://www.fs.usda.gov/recarea/nezperceclearwater/recarea/?recid=79594",
    putIn: {
      name: "Kelly Forks Access",
      latitude: 46.716764,
      longitude: -115.256158,
      mileFromStart: 0,
      note: "Forest Service campground and river access at the Kelly Creek confluence; launch conditions and seasonal road access require confirmation.",
    },
    takeOut: {
      name: "Aquarius Campground Access",
      latitude: 46.84076,
      longitude: -115.618757,
      mileFromStart: 44.2,
      note: "Forest Service developed campground access on river right downstream of the bridge; take out before Dworshak Reservoir backwater.",
    },
    camping: "Kelly Forks, Weitas, Washington Creek, Riviera, and Aquarius provide named Forest Service camping options; verify openings, fees, and road conditions.",
    campingClassification: "on_route_campsite",
    shuttle: "Forest Road 247/250 follows much of the corridor but is slow and remote; stage vehicles and carry satellite communications.",
    permits: "Follow Clearwater National Forest rules, Idaho AIS/PFD requirements, fire restrictions, and current road/closure notices.",
    watchFor: ["Irish Railroad Class V rapid", "wood and changing road access", "cold water and long rescue distances"],
    imageUrl: salmonImage,
    imageLabel: "North-Central Idaho Clearwater watershed context photograph",
  }),

  makeRoute({
    id: "south-fork-clearwater-bully-creek-highway-13",
    riverId: "south-fork-clearwater-river-idaho",
    name: "South Fork Clearwater River",
    reach: "Bully Creek to Highway 13 (Mickey Mouse)",
    region: "North-Central Idaho / Clearwater basin",
    routeType: "whitewater",
    summary:
      "A 5.6-mile Class IV South Fork Clearwater reach with road-side scouting, a direct Stites gauge, and a defined Highway 13 take-out.",
    statusText:
      "Gauge-scored advanced route. American Whitewater lists 600-3,000 cfs and warns that Blackerby becomes a long, consequential boulder garden; scout and portage decisions are mandatory.",
    distance: "About 5.6 river miles",
    time: "About 2-4 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "Class IV water includes the long Blackerby boulder garden; use a proven whitewater craft, helmet, rescue kit, and a crew with reliable self-rescue skills.",
      "Highway access enables scouting and portage planning, but the road-side corridor does not remove the consequences of a swim or missed take-out.",
      "Treat the 600-3,000 cfs American Whitewater window as a planning reference. Recheck wood, weather, and same-day flow trend before launch.",
    ],
    gauge: "13338500",
    gaugeName: "South Fork Clearwater River at Stites, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 600, idealMax: 3000, tooHigh: 3000 },
    thresholdLabel: "American Whitewater published runnable window: 600-3,000 cfs",
    thresholdUrl: southForkClearwaterThreshold,
    thresholdSupportUrl: clearwaterGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkClearwaterThreshold,
    sourceLabel: "American Whitewater South Fork Clearwater reach record",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13338500/",
    putIn: {
      name: "Bully Creek Put-In",
      latitude: 45.836,
      longitude: -115.987,
      mileFromStart: 0,
      note: "American Whitewater access anchor near the Bully Creek road corridor; inspect the launch and private-bank boundaries before entry.",
    },
    takeOut: {
      name: "Highway 13 Take-Out",
      latitude: 45.8948,
      longitude: -116.04,
      mileFromStart: 5.6,
      note: "American Whitewater take-out at Highway 13; land only at the described public pullout and confirm traffic/parking conditions.",
    },
    camping: "No on-route camping is assumed; use a lawful nearby basecamp in the Stites/Kooskia area.",
    campingClassification: "nearby_basecamp",
    shuttle: "Short road shuttle with frequent scouting opportunities; stage the vehicle before launching.",
    permits: "Follow Idaho AIS/PFD requirements, current road and access notices, and private-property restrictions.",
    watchFor: ["Blackerby boulder garden", "wood and rapid rise", "highway traffic at take-out"],
    imageUrl: salmonImage,
    imageLabel: "Clearwater basin whitewater context photograph",
  }),

  makeRoute({
    id: "south-fork-clearwater-golden-canyon",
    riverId: "south-fork-clearwater-river-idaho",
    name: "South Fork Clearwater River",
    reach: "Hanging Rock to Cougar Creek Trailhead (Golden Canyon)",
    region: "North-Central Idaho / Clearwater basin",
    routeType: "whitewater",
    summary:
      "A 7.2-mile Class IV-V Golden Canyon run with roadside scouting, a direct Stites gauge, and a free Highway 14 trailhead take-out.",
    statusText:
      "Gauge-scored expert route. American Whitewater describes 1,000-2,000 cfs as technical Class IV, 2,000-4,000 cfs as continuous Class IV-V, and above 4,000 cfs as elite Class V big water. The Idaho basin plan says the river becomes too rocky below 600 cfs; use the Cougar Creek trailhead before the downstream Class II corridor.",
    distance: "About 7.2 river miles",
    time: "About 3-6 hours plus scouting and portage planning",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "portage", "remote", "access_uncertain", "mandatory_takeout"],
    safety: [
      "This is a committing Class IV-V roadside run with steep continuous rapids, cold water, and limited recovery below the major drops. Use a proven expert crew, whitewater kayaks or an appropriately small craft, helmets, throw bags, rescue hardware, repair kit, and satellite communication.",
      "American Whitewater identifies Coyote Falls upstream, Chuck Rollins around highway milepost 25.4, Fish Jump around milepost 22.4, and the Cougar Creek Trailhead around milepost 20.6. Scout or portage these features before committing; the road corridor helps, but does not make a swim safe.",
      "Use 600 cfs as the conservative lower planning floor from the Idaho basin plan and 1,000-2,000 cfs as the lower technical ideal from American Whitewater. At 2,000-4,000 cfs the reach carries multiple solid Class V features; above 4,000 cfs is expert big water, not a scored upper-safe limit.",
      "The Cougar Creek exit is a highway trailhead/parking control rather than a developed ramp. Confirm the trail, roadside parking, seasonal road condition, and current access legality before launch; continue downstream only if separately prepared for the easier but longer corridor.",
    ],
    gauge: "13338500",
    gaugeName: "South Fork Clearwater River at Stites, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 600, idealMin: 1000, idealMax: 2000 },
    thresholdLabel: "Idaho basin plan: below 600 cfs too rocky; American Whitewater: about 1,000-2,000 cfs technical Class IV, 2,000-4,000 cfs Class IV-V, and above 4,000 cfs expert Class V",
    thresholdUrl: southForkClearwaterGoldenThreshold,
    thresholdSupportUrl: southForkClearwaterPlan,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: southForkClearwaterGoldenThreshold,
    sourceLabel: "American Whitewater Golden Canyon reach and access description",
    mapUrl: southForkClearwaterAccess,
    additionalSourceLinks: [
      { label: "American Whitewater Golden Canyon reach", url: southForkClearwaterGoldenThreshold },
      { label: "Kayak Idaho Clearwater flow table", url: southForkClearwaterFlows },
      { label: "Idaho South Fork Clearwater basin plan", url: southForkClearwaterPlan },
      { label: "Idaho Fish and Game South Fork Clearwater WHA access information", url: southForkClearwaterAccess },
      { label: "Idaho Highway 14 milepoint log", url: southForkClearwaterHwy14Milepoints },
      { label: "USGS South Fork Clearwater River at Stites", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13338500/" },
    ],
    putIn: {
      name: "Hanging Rock Highway 14 Put-In",
      latitude: 45.797477,
      longitude: -115.740003,
      mileFromStart: 0,
      note: "American Whitewater reach anchor at Hanging Rock, around Highway 14 milepost 28; use the described wide roadside staging area only after confirming parking and shoulder safety.",
    },
    takeOut: {
      name: "Cougar Creek Trailhead Take-Out",
      latitude: 45.822518,
      longitude: -115.860353,
      mileFromStart: 7.2,
      note: "American Whitewater's free Cougar Creek Trailhead around Highway 14 milepost 20.6; this is a road/trailhead exit rather than a full-size ramp. Confirm the carry and parking before launching.",
    },
    camping: "No on-route camping is assumed. Use a lawful nearby basecamp in the Stites/Kooskia corridor or a current Forest Service campground; the highway trailhead is a take-out, not an overnight site.",
    campingClassification: "nearby_basecamp",
    shuttle: "Highway 14 parallels the reach and allows frequent scouting and a short roadside shuttle, but shoulder parking, traffic, and seasonal road conditions require daylight planning.",
    permits: "Follow Idaho AIS/PFD requirements, current Idaho Fish and Game and Forest Service notices, Highway 14 parking rules, fire restrictions, and private-property boundaries.",
    watchFor: ["Coyote Falls upstream", "Chuck Rollins", "Fish Jump", "continuous Class IV-V", "cold water", "wood and rapid rise", "mandatory Cougar Creek exit", "highway traffic"],
    season: [5, 6, 7, 8],
    imageUrl: clearwaterImage,
    imageLabel: "South Fork Clearwater watershed context photograph",
  }),

  makeRoute({
    id: "lolo-creek-cottonwood-lolo-road",
    riverId: "lolo-creek-idaho",
    name: "Lolo Creek",
    reach: "Cottonwood Flats to Lolo Creek Road bridge",
    region: "North-Central Idaho / Clearwater basin",
    routeType: "whitewater",
    summary:
      "An approximately 8.5-mile upper Lolo Creek Class IV+ reach from the Cottonwood Flats access area to the Lolo Creek Road bridge, with local gauge cues and a seasonal weir/wood review boundary.",
    statusText:
      "Threshold-informed planning route. American Whitewater reports about 400 cfs as a conservative low runnable level and 800-1,000 cfs as a preferred Idaho range on the direct Lolo Creek gauge; BLM and IDFG documents identify Cottonwood Flats and the Lolo Creek Road bridge access context, but current parking, weir operations, and wood require confirmation.",
    distance: "About 8.5 river miles",
    time: "About 4-7 hours plus scouting and portage planning",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "strainers", "cold_water", "fast_rise", "access_uncertain"],
    safety: [
      "This upper reach is continuous technical Class IV+ creek water with landslide and wood exposure. Use a proven Class IV/V crew, helmets, throw bags, repair gear, first aid, and satellite communication.",
      "The Cottonwood Flats and Lolo Creek Road access areas are road/bridge staging points rather than developed ramps. Confirm current public entry, parking, seasonal roads, and the fish-trap/weir operating boundary before launching.",
      "Use about 400 cfs as the conservative lower planning floor and 800-1,000 cfs as the preferred local band on USGS 13339500. Current wood, gauge behavior, weather, and the local staff-gauge/rapid character override any numeric cue.",
    ],
    gauge: "13339500",
    gaugeName: "Lolo Creek near Greer, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 400, idealMin: 800, idealMax: 1000 },
    thresholdLabel: "American Whitewater/local Lolo guidance: about 400 cfs low runnable; Idaho boaters commonly prefer 800-1,000 cfs",
    thresholdUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/572/main",
    thresholdSupportUrl: "https://www.northidahorivers.com/Lolo_Creek.htm",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/572/main",
    sourceLabel: "American Whitewater Lolo Creek upper reach record",
    mapUrl: "https://eplanning.blm.gov/public_projects/nepa/32708/42286/44944/Lolo_Draft_EA_508.pdf",
    additionalSourceLinks: [
      { label: "American Whitewater Lolo access and gauge update", url: "https://www.americanwhitewater.org/article/29972/" },
      { label: "Idaho Fish and Game Lolo Creek access assessment", url: "https://idfg.idaho.gov/ifwis/idnhp/cdc_pdf/lolo96.pdf" },
      { label: "USGS Lolo Creek near Greer live gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13339500/" },
      { label: "Cottonwood Flats map context", url: "https://mapcarta.com/23525218" },
    ],
    putIn: {
      name: "Cottonwood Flats public access area",
      latitude: 46.290731,
      longitude: -115.905665,
      mileFromStart: 0,
      note: "Upper access-area anchor near State Meadows/Cottonwood Flats; confirm the actual river landing, road condition, parking, and any private or seasonal restrictions before committing.",
    },
    takeOut: {
      name: "Lolo Creek Road bridge",
      latitude: 46.29435,
      longitude: -115.97602,
      mileFromStart: 8.5,
      note: "Named bridge/fish-trap access area used by local boaters; seasonal weir operations may require taking out immediately downstream and carrying around the facility.",
    },
    camping: "No on-route camping is assumed. Use a lawful Clearwater National Forest or Idaho County basecamp and carry an emergency overnight contingency.",
    campingClassification: "nearby_basecamp",
    shuttle: "Long rural shuttle on State Meadows/Lolo Creek roads and Highway 11; inspect gates, washouts, and weather before staging, and leave a written float plan.",
    permits: "Follow Clearwater National Forest/BLM access rules, fish-trap and seasonal weir notices, Idaho AIS/PFD requirements, fire restrictions, and current road closures.",
    watchFor: ["continuous Class IV+ creek water", "mobile wood and landslides", "seasonal weir/fish-trap boundary", "remote rescue", "approximate upper access"],
    season: [3, 4, 5, 6],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater basin same-watershed context photograph",
  }),

  makeRoute({
    id: "lolo-creek-lolo-road-greer",
    riverId: "lolo-creek-idaho",
    name: "Lolo Creek",
    reach: "Lolo Creek Road to Greer BLM access",
    region: "North-Central Idaho / Clearwater basin",
    routeType: "whitewater",
    summary:
      "A committing roughly 15-mile Class IV+ Lolo Creek run from the Lolo Creek Road crossing to the BLM access below the Greer bridge.",
    statusText:
      "Gauge-scored expert route. American Whitewater documents the named access pair and direct Lolo Creek gauge; its trip reports describe roughly 400 cfs as a conservative low runnable level and 800-1,000 cfs as a preferred Idaho level. Wood, landslides, remote rescue, and current access confirmation still control the go/no-go decision.",
    distance: "About 15 river miles",
    time: "About 6-10 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "strainers", "cold_water", "fast_rise", "access_uncertain"],
    safety: [
      "This is a committing Class IV+ creek canyon with long technical rapids, frequent wood, landslide changes, and limited hike-out options. Use a proven Class IV/V crew with throw bags, rescue hardware, repair kit, first aid, and satellite communication.",
      "The Idaho Fish and Game conservation assessment identifies multiple public Lolo Creek access roads, and American Whitewater documents the BLM access parcel and bridge approach. Confirm that the Lolo Creek Road entry and Greer BLM landing remain open and legal before staging a vehicle.",
      "The direct gauge is useful context, not a safety guarantee. Treat 400 cfs as a conservative lower planning floor and 800-1,000 cfs as a preferred local range; inspect wood and current channel conditions at the selected flow before committing to the Class IV+ canyon.",
    ],
    gauge: "13339500",
    gaugeName: "Lolo Creek near Greer, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 400, idealMin: 800, idealMax: 1000 },
    thresholdLabel: "American Whitewater/local Lolo guidance: about 400 cfs low runnable; Idaho boaters commonly prefer 800-1,000 cfs",
    thresholdUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/572/main",
    thresholdSupportUrl: "https://www.northidahorivers.com/Lolo_Creek.htm",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/572/main",
    sourceLabel: "American Whitewater Lolo Creek reach record",
    mapUrl: "https://www.americanwhitewater.org/article/29972/",
    additionalSourceLinks: [
      {
        label: "American Whitewater Lolo access and gauge update",
        url: "https://www.americanwhitewater.org/article/29972/",
      },
      {
        label: "Idaho Fish and Game Lolo Creek rules and water context",
        url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1161697463717",
      },
      {
        label: "Idaho Fish and Game Lolo Creek public access assessment",
        url: "https://idfg.idaho.gov/ifwis/idnhp/cdc_pdf/lolo96.pdf",
      },
      {
        label: "Nez Perce-Clearwater Forest Plan Lolo Creek boating context",
        url: "https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/fseprd1152899.pdf",
      },
      {
        label: "USGS Lolo Creek near Greer live gauge",
        url: "https://waterdata.usgs.gov/monitoring-location/USGS-13339500/",
      },
    ],
    putIn: {
      name: "Lolo Creek Road public crossing",
      latitude: 46.29435,
      longitude: -115.97602,
      mileFromStart: 0,
      note: "American Whitewater describes the standard put-in at a Lolo Creek Road crossing near a Forest Service/BLM trailer and fish-trap site; confirm current public entry and parking.",
    },
    takeOut: {
      name: "Greer BLM Lolo Creek access",
      latitude: 46.37212,
      longitude: -116.17181,
      mileFromStart: 15,
      note: "BLM-purchased access parcel downstream of the Greer bridge, documented by American Whitewater; use only the marked driveway/landing and confirm current signage.",
    },
    camping:
      "No on-route camping is assumed for this committing day run. Use a lawful Clearwater National Forest or Idaho County basecamp and carry an emergency overnight contingency.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Long shuttle on Lolo Creek Road and Highway 11/12 with remote road segments; inspect gates, washouts, and seasonal conditions and leave a written float plan.",
    permits:
      "Follow Clearwater National Forest/BLM access rules, Idaho AIS/PFD requirements, fire restrictions, fish-trap closures, and current road notices.",
    watchFor: ["frequent wood and landslide changes", "Class IV+ technical rapids", "limited hike-out and remote rescue", "access signage and parking status"],
    season: [3, 4, 5, 6],
    imageUrl: clearwaterImage,
    imageLabel: "Clearwater basin same-watershed context photograph",
  }),

  makeRoute({
    id: "south-fork-owyhee-yp-east-fork",
    riverId: "owyhee-river-idaho",
    name: "South Fork Owyhee River",
    reach: "South Fork Pipeline Launch Site to East Fork confluence",
    region: "Southwestern Idaho / Owyhee Canyonlands",
    routeType: "whitewater",
    summary:
      "A remote approximately 34-mile Class II-III+ South Fork Owyhee expedition from the BLM-mapped South Fork Pipeline launch area to the East Fork confluence, with primitive camps, rough 4WD access, and a diversion-dam portage consideration.",
    statusText:
      "Planning-only remote route. American Whitewater describes roughly 250 cfs as enough for an amateur open canoe and notes that rapids wash out around 3,000 cfs; the Rome gauge is a downstream proxy. The BLM boater guide maps the South Fork Pipeline launch and 45 Ranch/YP access context, but current road, private-inholding, and permission status must be confirmed before staging.",
    distance: "About 34 river miles",
    time: "About 2-4 days with camps and scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "Treat this as a remote self-support desert expedition: carry satellite communication, rescue and repair gear, first aid, redundant water treatment, and enough food and water for road or weather delays.",
      "American Whitewater describes a roughly 250 cfs lower planning cue for an amateur open canoe and reports that rapids wash out around 3,000 cfs. Those values are reach guidance, not a guarantee; inspect current wood, diversion structures, wind, and channel conditions before committing.",
      "The BLM boater guide maps South Fork Pipeline, 45 Ranch, and YP access, but the approach is rough 4WD and private inholdings/permission issues are material. Confirm current launch legality, road status, landowner permission, and a river-right landing at the East Fork confluence.",
    ],
    gauge: "13181000",
    gaugeName: "Owyhee River near Rome, OR (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 250, idealMin: 250, idealMax: 3000 },
    thresholdLabel: "American Whitewater South Fork Owyhee guidance: roughly 250 cfs minimum for an amateur open canoe; around 3,000 cfs rapids wash out; Rome gauge is a downstream proxy",
    thresholdUrl: southForkOwyheeAw,
    thresholdSupportUrl: southForkOwyheeMap,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: southForkOwyheeAw,
    sourceLabel: "American Whitewater South Fork Owyhee reach record",
    mapUrl: southForkOwyheeMap,
    additionalSourceLinks: [
      { label: "American Whitewater South Fork Owyhee reach and trip reports", url: southForkOwyheeAw },
      { label: "BLM South Fork Owyhee Wild and Scenic River page", url: southForkOwyheeBlm },
      { label: "BLM Bruneau-Jarbidge-Owyhee boater guide and access map", url: southForkOwyheeMap },
      { label: "USGS Owyhee River near Rome downstream proxy gauge", url: owyheeRomeGauge },
      { label: "BLM/National Wild and Scenic Owyhee river plan", url: "https://rivers.gov/apps/sites/rivers/files/documents/plans/owyhee-plan-or.pdf" },
      { label: "Idaho Fish and Game Owyhee access and inholding context", url: "https://www.idfg.idaho.gov/ifwis/idnhp/cdc_pdf/wetinv98.pdf" },
    ],
    putIn: {
      name: "South Fork Pipeline Launch Site",
      latitude: 41.929167,
      longitude: -116.670278,
      mileFromStart: 0,
      note: "BLM boater-guide map callout in Nevada; approach is rough 4WD and current road, landowner, and permit status must be confirmed before unloading.",
    },
    takeOut: {
      name: "East Fork Owyhee Confluence",
      latitude: 42.26528,
      longitude: -116.88806,
      mileFromStart: 34,
      note: "Approximate South Fork/East Fork confluence above the upper Owyhee; confirm a current river-right landing, 45 Ranch/BLM road access, private frontage, and the continuation boundary.",
    },
    access: [
      {
        name: "South Fork Pipeline Launch Site",
        latitude: 41.929167,
        longitude: -116.670278,
        mileFromStart: 0,
        note: "BLM boater-guide launch map callout; rough 4WD approach and current access status require confirmation.",
      },
      {
        name: "45 Ranch access area",
        latitude: 42.172667,
        longitude: -116.8734574,
        mileFromStart: 28,
        segmentKind: "transition",
        note: "Mapped ranch/inholding context only. Do not use without current landowner permission and a confirmed public road/landing; this is not an assumed public take-out.",
      },
      {
        name: "East Fork Owyhee Confluence",
        latitude: 42.26528,
        longitude: -116.88806,
        mileFromStart: 34,
        note: "Approximate confluence landing; confirm current public access, private frontage, and downstream continuation before relying on it as a take-out.",
      },
    ],
    camping:
      "Remote desert dispersed camping is expected only where lawful and durable along the managed corridor. Carry all water, use a fire pan where required, follow current fire restrictions, and do not camp on private inholdings.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Long remote 4WD shuttle on rough cross-state roads. Stage vehicles before launch, carry spare fuel/tires, and recheck road conditions after rain; do not assume YP Ranch or 45 Ranch access is currently granted.",
    permits:
      "Check current BLM Wild and Scenic/Owyhee boating notices, access permissions, fire restrictions, Idaho/Nevada AIS and PFD rules, and private-inholding boundaries before departure.",
    watchFor: ["Class III rapids and changing wood", "diversion dam and portage", "private ranch/inholding boundaries", "remote rescue and no cell coverage", "hot dry desert and limited water", "wet-road impassability"],
    season: [3, 4, 5, 6],
    imageUrl: northForkOwyheeImage,
    imageLabel: "Owyhee canyon context photograph; South Fork endpoint not depicted",
  }),

  makeRoute({
    id: "east-fork-owyhee-duck-crutcher",
    riverId: "owyhee-river-idaho",
    name: "East Fork Owyhee River",
    reach: "Duck Valley Indian Reservation to Crutcher Crossing",
    region: "Southwestern Idaho / Owyhee Canyonlands",
    routeType: "whitewater",
    summary:
      "A remote 65.6-mile Class III-IV(V+) East Fork Owyhee expedition from the Duck Valley launch to Crutcher Crossing, with long flatwater, willow corridors, mandatory portage/scouting hazards, and a direct Crutcher gauge.",
    statusText:
      "Threshold-informed planning route. American Whitewater and recent trip reports identify roughly 1,000-2,000 cfs on the Crutcher gauge as a useful planning window, with about 1,100 cfs described as an ideal padded flow and 700 cfs as a hard-shell/canoe low edge. The BLM guide warns that the reservation access requires approval, upper-fork portages are likely below bank-full, and the canyon is remote; confirm tribal/BLM access, road conditions, water trend, and every major portage before committing.",
    distance: "About 65.6 river miles, usually a 3-5 day expedition",
    time: "About 3-5 days with scouting, portages, and camps",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "strainers", "cold_water", "fast_rise", "low_water", "access_uncertain", "portage"],
    safety: [
      "This is a remote, committing East Fork trip with willow tunnels, fences, changing channels, long flatwater, Class III-IV rapids, sieves, and limited walk-out options. Use experienced expedition paddlers with satellite communication, rescue/repair gear, redundant food/water, and a complete portage plan.",
      "Recent trip reports describe 1,000-2,000 cfs as the target Crutcher gauge range, about 1,100 cfs as well padded, and 700 cfs as a low edge for hard shells or canoes. The BLM guide says the East Fork should be near bank-full or higher on the reservation and that upper portages are likely below high water; local scouting overrides the numeric cue.",
      "The Duck Valley launch requires current reservation approval or confirmation from tribal officials. Garat and Rickard crossings have separate private-road/permission controls, while Crutcher is a remote high-clearance launch; verify the selected access and wet-road conditions before departure.",
    ],
    gauge: "13176400",
    gaugeName: "East Fork Owyhee River at Crutcher Crossing, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 700, idealMin: 1000, idealMax: 2000 },
    thresholdLabel: "East Fork Owyhee planning window: about 700 cfs hard-shell low edge; 1,000-2,000 cfs target; about 1,100 cfs recent ideal trip-report flow",
    thresholdUrl: eastForkOwyheeAw,
    thresholdSupportUrl: eastForkOwyheeTripReport,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: eastForkOwyheeAw,
    sourceLabel: "American Whitewater East Fork Owyhee reach record",
    mapUrl: owyheeBoaterGuide,
    additionalSourceLinks: [
      { label: "American Whitewater East Fork Owyhee reach and trip reports", url: eastForkOwyheeAw },
      { label: "Recent East Fork Owyhee trip report and Duck Valley access notes", url: eastForkOwyheeTripReport },
      { label: "USGS Crutcher Crossing direct gauge", url: eastForkOwyheeGauge },
      { label: "BLM Bruneau-Jarbidge-Owyhee boater guide and access map", url: owyheeBoaterGuide },
      { label: "BLM Owyhee Wilderness access and road conditions", url: owyheeCrutchersBlm },
    ],
    putIn: {
      name: "Duck Valley East Fork Owyhee launch",
      latitude: 42.032,
      longitude: -116.2375,
      mileFromStart: 0,
      note: "Recent paddler coordinates for the Duck Valley launch; confirm current tribal approval, road condition, parking, and river entry with Duck Valley officials before staging.",
    },
    takeOut: {
      name: "Crutcher Crossing launch / take-out",
      latitude: 42.25989,
      longitude: -116.87013,
      mileFromStart: 65.6,
      note: "BLM/American Whitewater and map sources identify Crutcher Crossing; use only the established high-clearance approach and confirm crossing, parking, and current road restrictions.",
    },
    camping:
      "Plan for self-support camping only at lawful, durable BLM or reservation-approved sites. Carry all water, food, waste, fire-pan, and weather contingency equipment; do not assume private ranch or reservation banks are available.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Very long remote shuttle across Idaho/Nevada backcountry roads. Stage vehicles before launch, carry spare fuel/tires and recovery gear, and do not drive the access roads after rain without current local confirmation.",
    permits:
      "Complete the BLM self-registration/boating requirements and obtain current Duck Valley Shoshone-Paiute approval for reservation access; follow AIS/PFD, fire, wilderness, private-property, and seasonal road rules.",
    watchFor: ["willow tunnels and fences", "Thread the Needle and sieve hazards", "mandatory portages and changing channels", "reservation/private access", "remote rescue and no cell coverage", "wet-road impassability"],
    season: [3, 4, 5, 6],
    imageUrl: northForkOwyheeImage,
    imageLabel: "Owyhee canyon context photograph; East Fork access is not depicted",
  }),

  makeRoute({
    id: "owyhee-river-three-forks-rome",
    riverId: "owyhee-river-idaho",
    name: "Owyhee River",
    reach: "Three Forks to Rome",
    region: "Southwestern Idaho / Southeastern Oregon Owyhee Canyonlands",
    routeType: "whitewater",
    summary:
      "A remote approximately 35-mile Class III-IV(V) Owyhee mainstem expedition from the Three Forks confluence to the Rome launch, with pool-and-drop canyon rapids, primitive camps, and a published Rome-gauge optimum.",
    statusText:
      "Threshold-informed planning route. The BLM/American Whitewater boater guidance identifies 1,500-3,000 cfs at the Rome gauge as the optimum Three Forks-to-Rome planning window, with broader upper-river shoulders around 1,000-6,000 cfs. Three Forks is a primitive BLM boat launch/campground and Rome is a developed public launch, but the canyon remains remote and includes Class IV/V rapids, wind, portage decisions, and rapid road/weather changes.",
    distance: "About 35 river miles, usually 2-3 days",
    time: "About 2-3 days with scouting and camps",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "low_water", "wind", "access_uncertain", "portage"],
    safety: [
      "Treat the Three Forks-to-Rome section as an expert self-support expedition with Class III-IV/V consequences, long pools, limited exits, and no reliable cell service. Carry satellite communication, rescue/repair gear, redundant water, and a current evacuation plan.",
      "Use 1,500-3,000 cfs at the Rome gauge as the BLM/American Whitewater optimum planning band and 1,000-6,000 cfs as a broad shoulder only. Cabin, Cable, and other canyon rapids can require scouting, lining, or portage; local conditions and boat type override the gauge range.",
      "Three Forks has five primitive campsites, a boat launch, parking, and vault toilets, while Rome has a public BLM launch/campground. The 36-mile high-clearance approach to Three Forks can become impassable when wet; stage the shuttle and confirm launch/take-out conditions before departure.",
    ],
    gauge: "13181000",
    gaugeName: "Owyhee River near Rome, OR (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1500, idealMax: 3000, tooHigh: 6000 },
    thresholdLabel: "BLM/American Whitewater optimum for Three Forks-to-Rome: 1,500-3,000 cfs; broad planning shoulders 1,000-6,000 cfs on the Rome proxy",
    thresholdUrl: owyheeThreeForksRomeFlow,
    thresholdSupportUrl: owyheeRomeGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: owyheeThreeForksRomeFlow,
    sourceLabel: "American Whitewater/BLM Owyhee boater flow guidance",
    mapUrl: owyheeThreeForksAccess,
    additionalSourceLinks: [
      { label: "BLM Three Forks Recreation Site", url: owyheeThreeForksAccess },
      { label: "Recreation.gov Owyhee Wild and Scenic River / Rome Launch", url: owyheeRomeAccess },
      { label: "American Whitewater Owyhee reach record and trip reports", url: owyheeCrutchersAw },
      { label: "American Whitewater Owyhee boater guide flow table", url: owyheeThreeForksRomeFlow },
      { label: "USGS Owyhee River near Rome proxy gauge", url: owyheeRomeGauge },
    ],
    putIn: {
      name: "Three Forks Recreation Site Boat Launch",
      latitude: 42.545023,
      longitude: -117.167067,
      mileFromStart: 0,
      note: "BLM primitive launch at the North/Middle/Main Owyhee confluence with five campsites and vault toilets; high-clearance access and wet-road conditions require current confirmation.",
    },
    takeOut: {
      name: "Rome Launch Site",
      latitude: 42.83613,
      longitude: -117.6212,
      mileFromStart: 35,
      note: "Public BLM launch/campground at US 95 near Rome; confirm current parking, river access, fire rules, and any seasonal notices.",
    },
    camping:
      "Use the primitive BLM campsites at Three Forks and lawful durable canyon sites only. Carry a fire pan, portable toilet/waste system, all food and water, and a weather contingency; no private-bank camping is assumed.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Remote high-clearance shuttle from Three Forks to Rome. Stage the Three Forks vehicle before rain, allow extra time for the 36-mile access road, and do not rely on cell coverage or an unverified wet-weather exit.",
    permits:
      "Check current BLM Owyhee Wild and Scenic self-registration, fire-pan, AIS/PFD, camping, and seasonal road rules before launch.",
    watchFor: ["Cabin and Cable rapids", "Class IV/V portage decisions", "wind and cold water", "long pools and limited exits", "wet-road access and remote rescue"],
    season: [3, 4, 5, 6],
    imageUrl: northForkOwyheeImage,
    imageLabel: "Owyhee canyon context photograph; Three Forks-to-Rome corridor",
  }),

  makeRoute({
    id: "north-fork-owyhee-campground-three-forks",
    riverId: "north-fork-owyhee-river-idaho",
    name: "North Fork Owyhee River",
    reach: "North Fork Campground to Three Forks",
    region: "Southwestern Idaho / Owyhee Canyonlands",
    routeType: "whitewater",
    summary:
      "An approximately 18-mile Class III-IV(V) Wild and Scenic canyon run from the Idaho BLM campground to the Three Forks confluence in Oregon, with primitive access and multi-day logistics.",
    statusText:
      "Planning-only expert route. BLM and the National Wild and Scenic Rivers System identify vehicle access at North Fork Campground in Idaho and a boat launch at Three Forks; the BLM/American Whitewater guidance places the useful spring window around 1,500-3,000 cfs, but the Rome gauge is downstream proxy context and road/weather conditions can change rapidly.",
    distance: "About 18 river miles",
    time: "About 2-4 days with camps and scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "wind", "low_water", "access_uncertain"],
    safety: [
      "BLM and FWS describe expert-only spring boating in a remote canyon with difficult emergency access and no cell coverage. Carry satellite communication, rescue/repair gear, first aid, and redundant food and water capacity.",
      "The North Fork Campground and Three Forks are primitive facilities on rough backcountry roads. Confirm high-clearance access, road conditions, seasonal closures, vehicle staging, and current launch conditions before committing.",
      "The 1,500-3,000 cfs window is a planning range from BLM/American Whitewater sources; the Rome gauge is not a local North Fork measurement. Expect portages, changing wood, strong wind, and rapid weather-driven changes.",
    ],
    gauge: "13181000",
    gaugeName: "Owyhee River near Rome, OR (downstream proxy)",
    gaugeKind: "proxy",
    threshold: { tooLow: 1000, idealMin: 1500, idealMax: 3000, tooHigh: 6000 },
    thresholdLabel: "BLM/American Whitewater spring planning window: about 1,500-3,000 cfs; 1,000-6,000 cfs broad planning shoulders on the proxy Rome gauge",
    thresholdModel: "minimum-only",
    thresholdUrl: "https://site-media.americanwhitewater.org/Document_907.pdf",
    thresholdSupportUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/3764/main",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: "https://www.blm.gov/visit/north-fork-owyhee-wild-and-scenic-river",
    sourceLabel: "BLM North Fork Owyhee Wild and Scenic River access and safety page",
    mapUrl: "https://www.blm.gov/visit/north-fork-campground",
    additionalSourceLinks: [
      {
        label: "BLM Three Forks launch and primitive facility",
        url: "https://www.blm.gov/visit/three-forks",
      },
      {
        label: "National Wild and Scenic Rivers North Fork Owyhee boating description",
        url: "https://www.fws.gov/rivers/river/owyhee-north-fork-idaho",
      },
      {
        label: "American Whitewater North Fork Owyhee reach record",
        url: "https://www.americanwhitewater.org/content/River/view/river-detail/3764/main",
      },
      {
        label: "USGS Owyhee River near Rome proxy gauge",
        url: "https://waterdata.usgs.gov/monitoring-location/USGS-13181000/",
      },
    ],
    putIn: {
      name: "North Fork Campground Boat Access",
      latitude: 42.591389,
      longitude: -116.982222,
      mileFromStart: 0,
      note: "Semi-developed BLM campground and river access on Juniper Mountain Road; no potable water and high-clearance access required.",
    },
    takeOut: {
      name: "Three Forks Recreation Site Boat Launch",
      latitude: 42.545023,
      longitude: -117.167067,
      mileFromStart: 18,
      note: "Primitive BLM Oregon launch at the North/Middle/Main Owyhee confluence with five campsites and vault toilets; the final road descent may be impassable when wet.",
    },
    camping:
      "Primitive endpoint and on-route camping are part of the Wild and Scenic canyon experience. Use only designated or durable BLM sites, carry a portable toilet/fire-pan plan where required, and never assume a private bank is available.",
    campingClassification: "on_route_campsite",
    shuttle:
      "A long, high-clearance backcountry shuttle between Idaho's North Fork Campground and Oregon's Three Forks; stage vehicles before launch and check both roads after rain.",
    permits:
      "Check current BLM Owyhee boating notices and any self-issue permit requirement for the connected main-stem corridor, plus Idaho/Oregon fire, AIS, and wilderness rules.",
    watchFor: ["Class III-IV(V) rapids and portages", "no cell coverage and remote rescue", "spring wind, cold water, and weather shifts", "rough wet-road access"],
    season: [3, 4, 5, 6],
    imageUrl: northForkOwyheeImage,
    imageLabel: "North Fork Owyhee River same-river canyon context",
  }),

  makeRoute({
    id: "owyhee-river-crutchers-three-forks",
    riverId: "owyhee-river-idaho",
    name: "Owyhee River",
    reach: "Crutcher Crossing to Three Forks",
    region: "Southwestern Idaho / Owyhee Canyonlands",
    routeType: "whitewater",
    summary:
      "A remote 36-mile Class II (IV) Wild and Scenic Owyhee expedition from the public Crutcher Crossing ford to the Three Forks confluence and boat launch.",
    statusText:
      "Threshold-documented planning route. American Whitewater and Dreamflows identify the 36-mile Crutcher Crossing-to-Three Forks reach and the Crutcher gauge, while Kayak Idaho publishes a 1,000-6,000 cfs Owyhee upper-section window based on the Rome gauge. BLM confirms the remote high-clearance access roads and the primitive Three Forks launch/campsites; the Rome reading is downstream proxy context for this reach.",
    distance: "About 36 river miles, usually split into 2-4 day sections",
    time: "About 2-4 days with camps, scouting, and remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "low_water", "access_uncertain", "private_banks"],
    safety: [
      "American Whitewater rates the reach Class II with Class IV consequences. Treat it as a self-support expedition: carry satellite communication, repair/rescue gear, first aid, redundant water treatment, and enough food for road or weather delays.",
      "BLM describes the Owyhee Wilderness access roads as difficult even for high-clearance four-wheel-drive vehicles, with a 4-5 hour one-way approach from Bruneau. Crutcher Crossing is a ford/launch area, not a developed ramp; Three Forks is primitive and the final canyon descent can be impassable when wet.",
      "Kayak Idaho lists 1,000-6,000 cfs for Crutchers-to-Three Forks, but the cutoffs are based on the Rome gauge and the local Crutcher gauge has limited historical coverage. Local wood, canyon wind, weather, road conditions, and scout reports override the numeric cue.",
      "The route crosses a Wild and Scenic canyon corridor with private ranch and reservation boundaries nearby. Use only documented crossings and BLM facilities; never infer a bank landing, hot-spring access, or shortcut from a map line.",
    ],
    gauge: "13181000",
    gaugeName: "Owyhee River near Rome, OR (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 1000, idealMin: 1000, idealMax: 6000 },
    thresholdLabel: "Kayak Idaho upper Owyhee planning window: 1,000-6,000 cfs on the downstream Rome proxy gauge",
    thresholdUrl: owyheeCrutchersFlowGuide,
    thresholdSupportUrl: owyheeCrutchersAw,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: owyheeCrutchersAw,
    sourceLabel: "American Whitewater Crutcher Crossing-to-Three Forks reach record",
    mapUrl: owyheeCrutchersDreamflows,
    additionalSourceLinks: [
      { label: "American Whitewater Upper Owyhee reach", url: owyheeCrutchersAw },
      { label: "Dreamflows Crutcher Crossing-to-Three Forks reach map", url: owyheeCrutchersDreamflows },
      { label: "Kayak Idaho Owyhee flow table", url: owyheeCrutchersFlowGuide },
      { label: "BLM Owyhee River Wilderness Area access directions", url: owyheeCrutchersBlm },
      { label: "BLM Upper Owyhee boater guide and access map", url: owyheeBoaterGuide },
      { label: "BLM Three Forks primitive launch and campground", url: owyheeThreeForks },
      { label: "USGS Owyhee River near Rome proxy gauge", url: owyheeRomeGauge },
    ],
    putIn: {
      name: "Crutcher Crossing Launch Site",
      latitude: 42.2604,
      longitude: -116.8707,
      mileFromStart: 0,
      note: "Dreamflows identifies the Crutcher Crossing put-in; BLM describes the approach as a very remote high-clearance/4WD road. Confirm crossing condition, parking, and any current county/BLM restrictions before unloading.",
    },
    takeOut: {
      name: "Three Forks Recreation Site Boat Launch",
      latitude: 42.5446,
      longitude: -117.1657,
      mileFromStart: 36,
      note: "Dreamflows and BLM identify the primitive Three Forks launch at the North/Middle/Main Owyhee confluence; the last canyon descent is rocky and can be impassable when wet, so park at the rim and hike if conditions require.",
    },
    camping:
      "Use durable, documented BLM primitive sites along the Wild and Scenic corridor and the five-site Three Forks endpoint campground. Carry all food, water-treatment, fire-pan, and human-waste equipment required by current BLM rules; do not camp on unmarked private banks.",
    campingClassification: "on_route_campsite",
    shuttle:
      "This is a remote cross-state shuttle from Crutcher Crossing in Idaho to Three Forks in Oregon. Stage the take-out first, carry spare fuel and tires, allow a full day for the approach, and do not attempt either road after rain without a current local check.",
    permits:
      "Check current BLM Owyhee Wild and Scenic River notices, self-issue/boating requirements, fire restrictions, Idaho/Oregon AIS rules, and private/reservation boundary controls. No informal ranch or hot-spring access is assumed.",
    watchFor: ["remote Class IV canyon consequences", "mobile wood and changing channels", "wind and cold water", "wet-road impassability", "private-bank and boundary restrictions"],
    season: [3, 4, 5, 6],
    imageUrl: northForkOwyheeImage,
    imageLabel: "Owyhee canyon context photograph; Crutcher Crossing endpoint not depicted",
  }),
  makeRoute({
    id: "bruneau-indian-hot-springs-bruneau",
    riverId: "bruneau-river-idaho",
    name: "Bruneau River",
    reach: "Indian Hot Springs to 8 miles south of Bruneau",
    region: "Southwest Idaho / Owyhee Canyonlands",
    routeType: "whitewater",
    summary:
      "A 40.6-mile Class II-IV Wild and Scenic Bruneau canyon trip with BLM self-issue permitting, a direct Hot Spring gauge, and limited exits.",
    statusText:
      "Gauge-scored expedition route. American Whitewater lists 700-2,500 cfs; the BLM corridor is remote, seasonally run, and includes a mandatory take-out before a low-head diversion dam.",
    distance: "About 40.6 river miles, multi-day",
    time: "2-4 days depending on flow and camp plan",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "mandatory_takeout", "access_uncertain"],
    safety: [
      "The canyon has limited exits, possible logjams, poison ivy, rattlesnakes, and long continuous rapids at high flows; carry a complete self-support rescue and repair kit.",
      "The take-out is eight miles south of Bruneau and must be completed before the low-head diversion dam; scout the final miles and never continue past the mandatory landing.",
      "American Whitewater's 700-2,500 cfs window is a broad planning reference. Verify current gauge trend, weather, permit status, and water temperature before committing to a multi-day trip.",
    ],
    gauge: "13168500",
    gaugeName: "Bruneau River near Hot Spring, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 700, idealMin: 700, idealMax: 2500, tooHigh: 2500 },
    thresholdLabel: "American Whitewater published runnable window: 700-2,500 cfs",
    thresholdUrl: bruneauThreshold,
    thresholdSupportUrl: bruneauPage,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: bruneauPage,
    sourceLabel: "BLM Owyhee Canyonlands river information",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13168500/",
    putIn: {
      name: "Indian Hot Springs Put-In",
      latitude: 42.338,
      longitude: -115.647,
      mileFromStart: 0,
      note: "American Whitewater access anchor at the BLM/river corridor; obtain the required self-issue permit and inspect the launch before loading boats.",
    },
    takeOut: {
      name: "Bruneau South Take-Out",
      latitude: 42.769,
      longitude: -115.724,
      mileFromStart: 40.6,
      note: "BLM/American Whitewater take-out about eight miles south of Bruneau, upstream of the low-head diversion dam; mandatory endpoint.",
    },
    camping: "Dispersed canyon camps are part of the multi-day itinerary; use durable established sites, pack out waste, and follow the current BLM permit/fire rules.",
    campingClassification: "on_route_campsite",
    shuttle: "Very long remote shuttle on rough roads; arrange a reliable shuttle or outfitter and carry satellite communications.",
    permits: "BLM self-issue permit required; follow Wild and Scenic corridor rules, Idaho AIS/PFD requirements, fire restrictions, and closures.",
    watchFor: ["limited exits and long rapids", "logjams, heat, and rattlesnakes", "mandatory take-out before diversion dam"],
    imageUrl: snakeImage,
    imageLabel: "Southwest Idaho canyon river context photograph",
  }),

  makeRoute({
    id: "jarbidge-river-murphy-bruneau",
    riverId: "jarbidge-river-idaho",
    name: "Jarbidge River",
    reach: "Murphy Hot Springs / Jarbidge Confluence to Bruneau Launch Site",
    region: "Southwest Idaho / Owyhee Canyonlands",
    routeType: "whitewater",
    summary:
      "A remote 31-mile Class III-V Jarbidge canyon expedition with mandatory portages, exact RiverBrain access anchors, and the Bruneau gauge as the downstream reference.",
    statusText:
      "Gauge-scored expert route. RiverBrain recommends 700 cfs minimum, 1,100 cfs average, and 2,600 cfs maximum on the Bruneau reference gauge; treat the range as a conservative planning envelope, not a safety guarantee.",
    distance: "About 31 river miles, multi-day",
    time: "2-4 days depending on scouting, portages, and camp plan",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "mandatory_takeout", "access_uncertain"],
    safety: [
      "Jarbidge Falls is Class V to V+ and is identified as a highly recommended mandatory portage; scout and portage from shore before the falls lead-in.",
      "Sevy Falls, Wally's Wallow, Maze Rapid, mandatory portages, logjams, and sweepers make this an expert-only expedition. Carry a complete rescue/repair kit, satellite communicator, and redundant emergency plan.",
      "The canyon is remote with difficult helicopter access, heat, poison ivy, rattlesnakes, and no potable water at the named access points. Stage 4WD vehicles and enough water before committing.",
      "Use RiverBrain's 700-2,600 cfs shoulders with the 1,100 cfs average reference, then defer to current wood, weather, water temperature, closures, and on-site scouting.",
    ],
    gauge: "13168500",
    gaugeName: "Bruneau River near Hot Spring, ID (Jarbidge downstream reference)",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 700, idealMin: 900, idealMax: 1300, tooHigh: 2600 },
    thresholdLabel: "RiverBrain recommended levels: 700 cfs minimum, 1,100 cfs average, 2,600 cfs maximum; 900-1,300 cfs planning ideal",
    thresholdUrl: jarbidgeThreshold,
    thresholdSupportUrl: jarbidgePutInSource,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: jarbidgeThreshold,
    sourceLabel: "RiverBrain Jarbidge River reach record",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13168500/",
    additionalSourceLinks: [
      { label: "RiverBrain Jarbidge Confluence access", url: jarbidgePutInSource },
      { label: "RiverBrain Bruneau Launch Site access", url: jarbidgeTakeOutSource },
    ],
    putIn: {
      name: "Jarbidge Confluence Put-In",
      latitude: 42.04984847,
      longitude: -115.39042244,
      mileFromStart: 0,
      note: "Exact RiverBrain access anchor: all vehicles, camping allowed, boat ramp, no water. The approach from Rogerson/Murphy Hot Springs is long and rough; verify roads and stage supplies.",
    },
    takeOut: {
      name: "Bruneau Launch Site Take-Out",
      latitude: 42.33851276,
      longitude: -115.64714203,
      mileFromStart: 31,
      note: "Exact RiverBrain access anchor: 4WD only, camping allowed, no boat ramp, no water. This is the mandatory expedition endpoint and requires a pre-staged vehicle.",
    },
    camping: "RiverBrain lists dispersed camps along the canyon; use durable established sites, pack out waste, carry all potable water, and follow current BLM Owyhee fire and camping rules.",
    campingClassification: "on_route_campsite",
    shuttle: "Very long 4WD shuttle on rough Owyhee roads; stage vehicles and satellite communications before launch, and do not rely on a same-day roadside recovery.",
    permits: "Follow current BLM Owyhee/Wild and Scenic rules, any self-issue or seasonal permit requirement, fire restrictions and closures, and Idaho AIS/PFD requirements.",
    watchFor: ["Jarbidge Falls mandatory portage", "Sevy Falls, Wally's Wallow, and Maze Rapid", "logjams, sweepers, heat, poison ivy, and rattlesnakes", "mandatory Bruneau Launch Site take-out"],
    imageUrl: snakeImage,
    imageLabel: "Southwest Idaho canyon river context photograph",
  }),

  makeRoute({
    id: "priest-river-dickensheet-white-tail",
    riverId: "priest-river-idaho",
    name: "Priest River",
    reach: "Dickensheet Campground to White Tail Butte Landing (Chipmunk Rapids)",
    region: "Idaho Panhandle / Priest Lake",
    routeType: "recreational",
    summary:
      "A roughly 10-mile Class I-II Priest River float with the named Chipmunk Rapids feature, public state access, and a documented White Tail Butte landing.",
    statusText:
      "Threshold-documented planning route. Idaho Paddler lists 1,200-4,500 cfs at the Priest River gauge and a Class II Chipmunk Rapids cue around 3,500 cfs; the public endpoint pair is documented by the Forest Service, but the White Tail landing is undeveloped and low-water channel choice changes.",
    distance: "About 10 river miles",
    time: "About 3-4 hours plus shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "low_water", "fast_rise", "access_uncertain"],
    safety: [
      "This is mostly Class I water with the named Class II Chipmunk Rapids feature; wear a PFD, keep a conservative line around bends and wood, and do not treat the flatwater character as consequence-free.",
      "Dickensheet is a developed state campground. White Tail Butte is an undeveloped state landing; confirm the road, parking, bank condition, and a legal take-out before launch.",
      "Use 1,200-4,500 cfs as the published corridor band and about 3,500 cfs as the Chipmunk Rapids reference. Summer low water can expose dry side channels and require dragging; spring and fall rise increase current and cold-water consequences.",
    ],
    gauge: "12394000",
    gaugeName: "Priest River near Coolin, ID (Dickensheet)",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1200, idealMin: 1200, idealMax: 3500, tooHigh: 4500 },
    thresholdLabel: "Idaho Paddler corridor guidance: 1,200-4,500 cfs; Chipmunk Rapids reference around 3,500 cfs",
    thresholdUrl: priestRiverChipmunkGuide,
    thresholdSupportUrl: priestRiverAccessGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: priestRiverChipmunkGuide,
    sourceLabel: "Idaho Paddler Priest River Chipmunk Rapids guide",
    mapUrl: priestRiverAccessGuide,
    additionalSourceLinks: [
      { label: "USFS Priest River public-access map", url: priestRiverAccessGuide },
      { label: "American Whitewater Priest River reach record", url: priestRiverThresholdGuide },
      { label: "USGS Dickensheet gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-12394000/" },
    ],
    putIn: {
      name: "Dickensheet Campground",
      latitude: 48.45194,
      longitude: -116.89944,
      mileFromStart: 0,
      note: "Developed Idaho State Parks campground and public parking; use the signed river access and keep campground circulation clear.",
    },
    takeOut: {
      name: "White Tail Butte Landing",
      latitude: 48.4146,
      longitude: -116.92161,
      mileFromStart: 10.1,
      note: "Undeveloped state landing shown on the Forest Service float map; confirm bank condition, road access, and legal parking before committing.",
    },
    camping: "Dickensheet Campground is an endpoint basecamp option when open. No overnight use is assumed at the undeveloped White Tail landing.",
    campingClassification: "endpoint_campground",
    shuttle: "Highway 57 and local roads provide the shuttle, but the White Tail approach is undeveloped and may be narrow or seasonal; stage the take-out first.",
    permits: "Follow Idaho State Parks and Idaho Panhandle National Forest rules, campground fees, Idaho AIS/PFD requirements, and seasonal road/closure notices.",
    watchFor: ["Chipmunk Rapids", "low-water side-channel drag", "undeveloped White Tail landing", "cold water and strainers"],
    season: [5, 6, 7, 8, 9, 10],
    imageUrl: stJoeImage,
    imageLabel: "Northern Idaho river corridor context photograph",
  }),

  makeRoute({
    id: "priest-river-mcabee-mudhole",
    riverId: "priest-river-idaho",
    name: "Priest River",
    reach: "McAbee Falls Bridge to Priest River Recreation Area (Mudhole)",
    region: "Idaho Panhandle / Priest River",
    routeType: "whitewater",
    summary:
      "A 13.5-mile Class I-III lower Priest River run with the continuous Eight Mile Rapids section and a developed Corps of Engineers campground/boat-ramp take-out.",
    statusText:
      "Threshold-documented planning route. Idaho Paddler publishes 1,200-4,500 cfs at the Priest River gauge and describes Eight Mile Rapids as continuous Class III around 3,000 cfs; high-water hazards, private frontage, and the undeveloped bridge launch keep this card planning-only.",
    distance: "About 13.5 river miles",
    time: "About 4-5 hours plus shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "private_banks", "access_uncertain"],
    safety: [
      "Eight Mile Rapids is a sustained Class III section with curlers, holes, and a long swim consequence; use a whitewater-capable craft, helmet, rescue kit, and a crew with reliable self-rescue skills.",
      "McAbee is a bridge-side undeveloped launch. The Mudhole is a developed public Corps of Engineers recreation area with a boat ramp, beach, parking, restrooms, and seasonal camping; confirm current opening dates and ramp condition.",
      "Use 1,200-4,500 cfs as the published corridor band, with about 3,000 cfs as the documented Eight Mile reference. The Forest Service warns that Eight Mile becomes hazardous at high water, while low summer flows can make the channel slow or rocky.",
    ],
    gauge: "12394000",
    gaugeName: "Priest River near Coolin, ID (Dickensheet; upstream context)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1200, idealMin: 1200, idealMax: 3500, tooHigh: 4500 },
    thresholdLabel: "Idaho Paddler: 1,200-4,500 cfs at Priest River gauge; Eight Mile Rapids described around 3,000 cfs",
    thresholdUrl: priestRiverMcAbeeGuide,
    thresholdSupportUrl: priestRiverFlowGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: priestRiverMcAbeeGuide,
    sourceLabel: "Idaho Paddler McAbee-to-Priest River guide",
    mapUrl: priestRiverMudholeAccess,
    additionalSourceLinks: [
      { label: "USFS Priest River public-access and hazard map", url: priestRiverAccessGuide },
      { label: "USACE Priest River Recreation Area (Mudhole)", url: priestRiverMudholeAccess },
      { label: "Sandpoint lower Priest flow and Eight Mile context", url: priestRiverFlowGuide },
      { label: "McAbee Falls map coordinate", url: "https://mapcarta.com/23546384" },
    ],
    putIn: {
      name: "McAbee Falls Bridge",
      latitude: 48.28436,
      longitude: -116.87185,
      mileFromStart: 0,
      note: "Bridge-side launch on Peninsula Road described by Idaho Paddler; use the downstream river-left carry only if the current road, parking, and bank access are confirmed.",
    },
    takeOut: {
      name: "Priest River Recreation Area (Mudhole)",
      latitude: 48.17917,
      longitude: -116.89222,
      mileFromStart: 13.5,
      note: "Public Corps of Engineers recreation area at the Priest/Pend Oreille confluence with a boat ramp, dock, beach, parking, and seasonal campground.",
    },
    camping: "Priest River Recreation Area offers reservable seasonal campsites and restrooms. Do not assume camping on private frontage or at the McAbee bridge launch.",
    campingClassification: "endpoint_campground",
    shuttle: "Approximately 8 miles of paved shuttle on local roads and Highway 57, with a narrow shoulder and active traffic; stage the Mudhole vehicle before launching.",
    permits: "Follow Corps of Engineers/Idaho Panhandle access rules, campground reservations, Idaho AIS/PFD requirements, and current seasonal notices.",
    watchFor: ["Eight Mile Rapids sustained Class III", "high-water curlers and holes", "private frontage", "McAbee bridge launch", "Mudhole swim area and boat traffic"],
    season: [5, 6, 7, 8, 9, 10],
    imageUrl: stJoeImage,
    imageLabel: "Northern Idaho river corridor context photograph",
  }),

  makeRoute({
    id: "priest-river-outlet-dickensheet",
    riverId: "priest-river-idaho",
    name: "Priest River",
    reach: "Priest Lake Outlet to Dickensheet Campground",
    region: "Idaho Panhandle / Priest Lake",
    routeType: "whitewater",
    summary:
      "A 4-mile Class II-III outlet run with a continuous rapid, short paved shuttle, and a developed Dickensheet Campground take-out.",
    statusText:
      "Gauge-scored threshold route. Idaho Paddler's guide lists 1,200-4,500 cfs at the Priest River gauge, with 1,200-1,600 cfs the preferred band and 900 cfs the lower runnable shoulder.",
    distance: "About 4 river miles",
    time: "About 1-2 hours plus shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "The outlet section is continuous Class II-III with a half-mile Class III rapid; use a whitewater-capable kayak or inflatable and reliable self-rescue skills.",
      "The outlet dam and first access are immediately upstream. Launch only below the dam at the described pull-off, and take out river-left downstream of the Dickensheet bridge.",
      "Use 1,200-1,600 cfs as the preferred band, 900 cfs as the lower runnable shoulder, and 4,500 cfs as the upper planning shoulder; inspect current wood, weather, and water temperature before launch.",
    ],
    gauge: "12393500",
    gaugeName: "Priest River at Outlet of Priest Lake near Coolin, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 900, idealMin: 1200, idealMax: 1600, tooHigh: 4500 },
    thresholdLabel: "Idaho Paddler published guidance: 900 cfs lower runnable; 1,200-1,600 cfs preferred; 4,500 cfs upper planning shoulder",
    thresholdUrl: priestRiverThresholdGuide,
    thresholdSupportUrl: priestRiverAccessGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: priestRiverAccessGuide,
    sourceLabel: "USFS Priest River access and paddling guide",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-12393500/",
    putIn: {
      name: "Priest Lake Outlet Pull-Off",
      latitude: 48.493252,
      longitude: -116.894374,
      mileFromStart: 0,
      note: "Public pull-off and short trail immediately below the Priest Lake outlet dam; inspect the carry and launch eddy before committing.",
    },
    takeOut: {
      name: "Dickensheet Campground Take-Out",
      latitude: 48.45194,
      longitude: -116.89944,
      mileFromStart: 4,
      note: "Developed Idaho State Parks campground and parking; land river-left downstream of the bridge and keep the campground road clear.",
    },
    camping: "Dickensheet Campground is a developed endpoint option when open; Outlet Campground provides a put-in basecamp option subject to reservation and seasonal rules.",
    campingClassification: "endpoint_campground",
    shuttle: "Short paved shuttle on Idaho 57 and Dickensheet Road, but shoulders are narrow and traffic is active; stage the vehicle before launch.",
    permits: "Follow Idaho State Parks and Idaho Panhandle National Forest rules, campground fees, Idaho AIS/PFD requirements, and seasonal road/closure notices.",
    watchFor: ["outlet dam and launch carry", "half-mile Class III rapid", "Dickensheet bridge and campground traffic"],
    imageUrl: stJoeImage,
    imageLabel: "Northern Idaho river corridor context photograph",
  }),

  makeRoute({
    id: "north-fork-st-joe-loop-creek-confluence",
    riverId: "north-fork-st-joe-river-idaho",
    name: "North Fork St. Joe River",
    reach: "Loop Creek to St. Joe Confluence",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "whitewater",
    summary:
      "A 10.4-mile Class III North Fork St. Joe run through a road-accessible but remote gorge, with primitive Loop Creek access and a confluence take-out.",
    statusText:
      "Threshold-documented planning route. American Whitewater lists 2,500-15,000 cfs on the Calder reference gauge, while the local North Idaho Rivers guide asks for at least 4,000 cfs on Calder; the gauge is downstream of this fork, so the live score remains disabled.",
    distance: "About 10.4 river miles",
    time: "About 3-5 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "access_uncertain"],
    safety: [
      "Class III continuous water and new wood require a proven whitewater craft, helmet, rescue equipment, and an experienced crew.",
      "Loop Creek is a primitive ramp with seasonal Moon Pass access; the confluence landing is a small turnout near dumpsters—do not block the service area.",
      "North Idaho Rivers describes a hand-painted local gauge at Avery and recommends at least 4,000 cfs on the downstream Calder gauge; the 2,500-15,000 cfs American Whitewater range remains planning guidance because Calder is downstream of the North Fork.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 2500, idealMin: 4000, idealMax: 10000 },
    thresholdLabel: "North Idaho Rivers minimum cue: 4,000 cfs on Calder; American Whitewater shoulder: 2,500-15,000 cfs (downstream proxy)",
    thresholdUrl: northForkStJoeThreshold,
    thresholdSupportUrl: northForkStJoeGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: stJoePlan,
    sourceLabel: "USFS St. Joe Wild and Scenic River plan",
    mapUrl: "https://www.fs.usda.gov/sites/nfs/files/r01/idahopanhandle/publication/SJRD%20MVUM%20Back%202021.pdf",
    additionalSourceLinks: [
      { label: "North Idaho Rivers North Fork St. Joe guide", url: northForkStJoeGuide },
    ],
    putIn: {
      name: "Loop Creek Put-In",
      latitude: 47.353283,
      longitude: -115.736178,
      mileFromStart: 0,
      note: "Primitive downstream-river-right ramp at the Loop Creek bridge; confirm Moon Pass road and parking conditions.",
    },
    takeOut: {
      name: "St. Joe Confluence Take-Out",
      latitude: 47.251298,
      longitude: -115.798299,
      mileFromStart: 10.4,
      note: "Small turnout just above the main-St. Joe confluence; keep the nearby garbage-dumpster access clear.",
    },
    camping: "No on-route camping is assumed; use open Forest Service campgrounds or a lawful St. Maries/Avery basecamp.",
    campingClassification: "nearby_basecamp",
    shuttle: "Remote Forest Road 456 shuttle over Moon Pass; stage the take-out and carry satellite communication.",
    permits: "Follow Idaho Panhandle National Forest rules, Idaho AIS/PFD requirements, fire restrictions, and seasonal road closures.",
    watchFor: ["new wood and continuous Class III", "Moon Pass access", "small confluence turnout", "hand gauge at Avery and downstream-gauge mismatch"],
    imageUrl: salmonImage,
    imageLabel: "Northern Idaho St. Joe watershed context photograph",
  }),

  makeRoute({
    id: "st-joe-spruce-tree-gold-creek",
    riverId: "st-joe-river-idaho",
    name: "St. Joe River",
    reach: "Spruce Tree Campground to Gold Creek Meadows",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "whitewater",
    summary:
      "A 13.1-mile Class III St. Joe reach on Forest Road 218, with a named campground launch, a designated Gold Creek Meadows-area boat ramp, and frequent wood-management concerns.",
    statusText:
      "Threshold-documented planning route. American Whitewater and Wilderness Portal use the Calder gauge with a 1,500 cfs minimum, about 4,000 cfs good, and 25,000 cfs maximum; North Idaho Rivers also reports a roughly 900 cfs Red Ives cue on a different local reference. Calder is downstream of the reach, so no live score is asserted.",
    distance: "About 13.1 river miles",
    time: "About 3-6 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "low_water", "access_uncertain"],
    safety: [
      "American Whitewater describes continuous Class II+ with Class III sections; North Idaho Rivers warns that mobile wood can shift throughout the reach. Carry a saw/rescue kit only if trained and scout every blind corner.",
      "Spruce Tree is an easy but informal bank launch at a busy trailhead; the Gold Creek Meadows ramp is designated but primitive, with limited eddy/parking and no assumption of a surveyed ramp coordinate.",
      "The 1,500/4,000/25,000 cfs Calder thresholds are proxy-gauge planning cues. Local Red Ives readings, wood, cold water, road status, and current weather override them.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1500, idealMin: 1500, idealMax: 4000, tooHigh: 25000 },
    thresholdLabel: "Wilderness Portal/American Whitewater Calder planning cues: 1,500 cfs minimum, 4,000 cfs good, 25,000 cfs maximum; local Red Ives cue differs",
    thresholdUrl: stJoeSpruceTreeFlow,
    thresholdSupportUrl: stJoeSpruceTreeThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: stJoePlan,
    sourceLabel: "USFS St. Joe Wild and Scenic River plan",
    mapUrl: "https://www.fs.usda.gov/sites/nfs/files/r01/idahopanhandle/publication/SJRD%20MVUM%20Back%202021.pdf",
    additionalSourceLinks: [
      { label: "North Idaho Rivers Spruce Tree to Gold Creek guide", url: stJoeSpruceTreeGuide },
      { label: "RiverFacts St. Joe Spruce Tree to Gold Creek map", url: stJoeSpruceTreeMap },
      { label: "Gold Creek campground / meadow area anchor", url: stJoeGoldCreekAnchor },
    ],
    putIn: {
      name: "Spruce Tree Campground Launch",
      latitude: 47.0391,
      longitude: -115.3475,
      mileFromStart: 0,
      note: "North Idaho Rivers describes an easy bank launch at the entrance/turnaround of Spruce Tree Campground; keep the horse-trailer turnaround clear and avoid riparian damage.",
    },
    takeOut: {
      name: "Gold Creek Meadows Designated Boat Ramp",
      latitude: 47.1377,
      longitude: -115.40876,
      mileFromStart: 13.1,
      note: "Approximate Gold Creek Meadows/Gold Creek Campground-area anchor from the named locality; North Idaho Rivers says the official ramp is at the extreme downstream end of the meadow. Verify the exact carry, parking, and ramp condition on arrival.",
    },
    camping:
      "Spruce Tree, Fly Flat, and dispersed Gold Flat/Gold Creek meadow sites provide named Forest Service or managed-corridor camping context; verify seasonal openings, fees, sanitation, and fire rules.",
    campingClassification: "on_route_campsite",
    shuttle:
      "Forest Road 218 parallels the reach but is narrow, gravel, and slow with limited pullouts. Stage the Gold Creek vehicle first, keep the Spruce Tree turnaround open, and carry recovery and satellite-communication gear.",
    permits:
      "No special river permit is cited for this Forest Service reach. Follow Idaho Panhandle National Forest, Wild and Scenic River, fire, camping, invasive-species, and PFD rules; confirm current road and campground closures.",
    watchFor: ["mobile wood on every section", "cold Class II+/III water", "primitive Gold Creek Meadows ramp", "downstream Calder proxy and conflicting local gauge cues"],
    season: [4, 5, 6, 7],
    imageUrl: stJoeImage,
    imageLabel: "St. Joe River at Red Ives same-river context photograph",
  }),

  makeRoute({
    id: "st-joe-tumbledown-gold-bluff",
    riverId: "st-joe-river-idaho",
    name: "St. Joe River",
    reach: "Conrad Crossing to River Access below Bluff Creek (Tumbledown)",
    region: "Idaho Panhandle / Highway 50 corridor",
    routeType: "whitewater",
    summary:
      "A 7.4-mile Class III-IV St. Joe run with a developed Conrad Crossing campground launch, roadside scouting, and the Tumbledown Falls crux.",
    statusText:
      "Threshold-documented planning route. American Whitewater lists 800-10,000 cfs on the downstream Calder reference gauge; this route remains proxy-gauge planning coverage.",
    distance: "About 7.4 river miles",
    time: "About 2-4 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "access_uncertain"],
    safety: [
      "Tumbledown Falls is a Class IV ledge after a busy Class III lead-in; scout from Highway 50 and portage only via a safe, legal route.",
      "Conrad Crossing is a developed campground launch. The downstream formal access is the required take-out; Bluff Creek parking is no longer authorized.",
      "The 800-10,000 cfs American Whitewater range is a proxy-gauge planning reference, not a live safety score.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 800 },
    thresholdLabel: "American Whitewater published runnable window: 800-10,000 cfs (minimum planning shoulder; downstream proxy)",
    thresholdUrl: stJoeTumbledownThreshold,
    thresholdSupportUrl: stJoePlan,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: stJoePlan,
    sourceLabel: "USFS St. Joe Wild and Scenic River plan",
    mapUrl: "https://www.fs.usda.gov/sites/nfs/files/r01/idahopanhandle/publication/SJRD%20MVUM%20Back%202021.pdf",
    putIn: {
      name: "Conrad Crossing Campground Launch",
      latitude: 47.158707,
      longitude: -115.417095,
      mileFromStart: 0,
      note: "Developed Forest Service campground and low-bank launch on Highway 50 mile 75.3.",
    },
    takeOut: {
      name: "River Access below Bluff Creek",
      latitude: 47.194755,
      longitude: -115.505744,
      mileFromStart: 7.4,
      note: "Formal access about 1.3 miles below Bluff Creek Bridge; use the signed parking and landing only.",
    },
    camping: "Conrad Crossing is an endpoint campground when open; no downstream overnight camping is assumed.",
    campingClassification: "endpoint_campground",
    shuttle: "Highway 50 parallels the run and provides roadside scouting; stage the formal downstream access before launching.",
    permits: "Follow Idaho Panhandle National Forest rules, campsite reservations, Idaho AIS/PFD requirements, fire restrictions, and closure notices.",
    watchFor: ["Tumbledown Falls", "roadside scouting and wood", "formal take-out below Bluff Creek"],
    imageUrl: salmonImage,
    imageLabel: "St. Joe River same-watershed context photograph",
  }),

  makeRoute({
    id: "south-fork-payette-grandjean-deadwood",
    riverId: "south-fork-payette-river-idaho",
    name: "South Fork Payette River",
    reach: "Grandjean Campground to Deadwood River Access",
    region: "Central Idaho / Grandjean-Lowman corridor",
    routeType: "whitewater",
    summary:
      "A 35.6-mile Upper South Fork Payette itinerary from Grandjean through Bonneville, Helende, Mountain View, and the Deadwood confluence, commonly divided into shorter day sections.",
    statusText:
      "Long planning itinerary. American Whitewater describes the corridor as Class II-III+ with IV character at selected features and recommends splitting it by public campground/access; the Lowman gauge is a proxy context for this multi-section card.",
    distance: "About 35.6 river miles, usually split into 2-4 day sections",
    time: "1-4 days depending on sectioning, scouting, and camps",
    difficulty: "moderate",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "remote", "access_uncertain"],
    safety: [
      "The corridor changes from Class II to III+ and includes named gorges and rapids; use a section-appropriate craft, scout wood, and do not treat the full 35-mile line as one uniform difficulty.",
      "Highway 21 parallels much of the reach, but some landings are steep or primitive. Use only named campground or Forest Service access and carry a shuttle/evacuation plan for each chosen section.",
      "The official Payette basin plan uses a 600 cfs lower planning cue for the upper South Fork sections; above roughly 2,000 cfs selected rapids become more consequential. The Lowman station is proxy context, not a local safety guarantee.",
    ],
    gauge: "13235000",
    gaugeName: "South Fork Payette River at Lowman, ID (proxy context)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 600 },
    thresholdLabel: "Idaho Payette basin plan: 600 cfs minimum planning cue for upper South Fork sections; selected features intensify above 2,000 cfs",
    thresholdUrl: southForkPayetteThresholdPlan,
    thresholdSupportUrl: grandjeanThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: "https://www.blm.gov/sites/default/files/docs/2022-08/Media_Center_Public_Room_BLM_ID_Payette_River_Boater_Guide_2020.pdf",
    sourceLabel: "BLM/Forest Service Payette River boater guide",
    mapUrl: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf",
    additionalSourceLinks: [
      { label: "American Whitewater Grandjean reach", url: grandjeanThreshold },
      { label: "Grandjean Campground coordinate record", url: grandjeanAccessSource },
      { label: "Deadwood River Access coordinate record", url: deadwoodAccessSource },
      { label: "BLM South Fork Payette corridor", url: "https://www.blm.gov/visit/payette-river-south-fork" },
    ],
    putIn: {
      name: "Grandjean Campground Put-In",
      latitude: 44.14852,
      longitude: -115.15204,
      mileFromStart: 0,
      note: "Named Forest Service campground and river access at the upper end of the documented corridor; seasonal road and campground conditions apply.",
    },
    takeOut: {
      name: "Deadwood River Access Take-Out",
      latitude: 44.08092,
      longitude: -115.65812,
      mileFromStart: 35.6,
      note: "Named Forest Service access at the Deadwood confluence; use as the downstream endpoint or divide the itinerary into shorter public-access sections.",
    },
    camping: "Established campgrounds and named river-corridor sites at Grandjean, Bonneville, Helende, Mountain View, and Deadwood support section planning; verify reservations, seasonal openings, fire rules, and current closure notices.",
    campingClassification: "endpoint_campground",
    shuttle: "Highway 21 parallels most of the corridor. Build the shuttle around the chosen day section and do not assume every primitive landing is legal or vehicle-accessible.",
    permits: "Follow Boise National Forest/Sawtooth National Recreation Area camping and day-use rules, Idaho AIS/PFD requirements, fire restrictions, and current road notices.",
    watchFor: ["Canyon Creek and Bonneville features", "wood near Kirkham and changing channel conditions", "cold water and limited primitive landings", "section-specific skill transitions"],
    season: [6, 7, 8, 9],
    imageUrl: payetteImage,
    imageLabel: "Upper South Fork Payette same-river context photograph",
  }),

  makeRoute({
    id: "deadwood-river-julie-creek-deadwood-campground",
    riverId: "south-fork-payette-river-idaho",
    name: "Deadwood River",
    reach: "Julie Creek Campground to South Fork Payette",
    region: "Southwest Idaho / Boise National Forest",
    routeType: "whitewater",
    summary:
      "An 8.7-mile Class III-IV Deadwood River packraft run from the Julie Creek Campground put-in to the Deadwood Campground confluence take-out.",
    statusText:
      "Planning-only direct-release route. American Whitewater documents the reach, exact trailhead/take-out access, a six-mile hike to the put-in, and current 645 cfs great-flow evidence; the direct Deadwood Reservoir release gauge and wood/debris-flow hazards require an expert packraft plan and same-day inspection.",
    distance: "About 8.7 river miles",
    time: "Full day including a six-mile hike, rigging, scouting, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates the reach Class III-IV and identifies a debris-flow-created Class IV+ rapid below Nellies Basin Creek, continuous technical whitewater, scarce eddies, and wood as defining hazards. Use an expert packraft crew with rescue, repair, and communication gear.",
      "A current American Whitewater trip report describes 645 cfs as a great flow and notes manageable but present wood hazards; an older report describes about 900 cfs as moderately high and pushy. These are trip-report cues, not a safety guarantee or a hard upper limit.",
      "The Julie Creek road is gated and the put-in requires a six-mile hike from the trailhead. Carry boats and all rescue gear, scout the debris rapid on the hike in, and confirm Forest Service access, fire, and road conditions before committing.",
    ],
    gauge: "13236500",
    gaugeName: "Deadwood River below Deadwood Reservoir near Lowman, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 645, idealMin: 645 },
    thresholdLabel: "American Whitewater trip-report cues: 645 cfs described as a great flow; about 900 cfs described as moderately high and pushy",
    thresholdUrl: lowerDeadwoodAwReach,
    thresholdSupportUrl: lowerDeadwoodGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lowerDeadwoodAwReach,
    sourceLabel: "American Whitewater Lower Deadwood reach record",
    mapUrl: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf",
    additionalSourceLinks: [
      { label: "American Whitewater Lower Deadwood reach", url: lowerDeadwoodAwReach },
      { label: "American Whitewater Julie Creek trailhead access", url: lowerDeadwoodJulieAccess },
      { label: "American Whitewater Deadwood Campground take-out", url: lowerDeadwoodTakeOutAccess },
      { label: "USGS Deadwood release gauge", url: lowerDeadwoodGauge },
      { label: "Boise National Forest Julie Creek map", url: "https://sbbchidaho.org/PDF/MAP-JulieCreek.pdf" },
      { label: "BLM Payette River corridor map", url: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf" },
      { label: "Deadwood River below Julie Creek monitoring context", url: "https://www.waterqualitydata.us/provider/STORET/1119USBR_WQX/1119USBR_WQX-DEA112/" },
    ],
    putIn: {
      name: "Julie Creek Campground Put-In",
      latitude: 44.14143,
      longitude: -115.65483,
      mileFromStart: 0,
      note: "Approximate river-side campground anchor near the documented Deadwood River below Julie Creek monitoring site; the actual launch is reached only after the six-mile hike from Julie Creek Trailhead. Confirm the carry, campground status, and river entry on site.",
    },
    takeOut: {
      name: "Deadwood Campground Take-Out",
      latitude: 44.08063,
      longitude: -115.65809,
      mileFromStart: 8.7,
      note: "American Whitewater's named campground take-out upstream of the confluence bridge; confirm the landing, parking, and vehicle shuttle before launching.",
    },
    camping:
      "Deadwood Campground is the downstream endpoint basecamp when open. The put-in is a remote campground reached by trail; no informal shoreline camping or vehicle access is assumed.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Leave a vehicle at Deadwood Campground or the Deadwood Access, then hike the six-mile Julie Creek Trail with boats and gear. Arrange a reliable return shuttle because cell service and vehicle access are limited.",
    permits:
      "Follow Boise National Forest trail, campground, fire, and road rules; Idaho AIS/PFD requirements; and current Deadwood Reservoir release notices. The route is packraft/whitewater-only planning and requires a crew prepared for a remote hike-in launch.",
    watchFor: ["Nellies Basin debris-flow rapid", "continuous Class IV whitewater", "wood and strainers", "six-mile hike-in put-in", "cold reservoir-release water"],
    season: [6, 7, 8],
    imageUrl: payetteImage,
    imageLabel: "South Fork Payette watershed context photograph",
  }),

  makeRoute({
    id: "south-fork-payette-canyon-deadwood-danskin",
    riverId: "south-fork-payette-river-idaho",
    name: "South Fork Payette River",
    reach: "Deadwood River Access to Danskin Station (Canyon)",
    region: "Southwest Idaho / Lowman-Banks corridor",
    routeType: "whitewater",
    summary:
      "A 12-mile Class III-IV canyon run from the named Deadwood River Access to Danskin Station, with a no-return point near Pine Flats and roadside scouting along Highway 17.",
    statusText:
      "Threshold-documented planning route. Idaho's Payette basin plan lists 600-3,000 cfs for the Canyon section, while American Whitewater describes the Deadwood-to-Danskin reach as a classic Class III-IV run; the Lowman gauge remains proxy context for this access-to-access card.",
    distance: "About 12 river miles",
    time: "About 4-7 hours plus scouting and rescue planning",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "remote", "mandatory_takeout"],
    safety: [
      "Class III-IV rapids include Gateway, Blackadar, Lone Pine, Little Falls, Surprise, and other named features; scout every rapid from the road or water and portage Big Falls (a waterfall) where signed.",
      "Pine Flats is the practical last easy exit; after that point the canyon has limited escape, cold water, wood, and delayed rescue. Carry throw bags, repair gear, first aid, and reliable emergency communication.",
      "Use the Idaho basin plan's 600-3,000 cfs planning window; above 3,000 cfs the plan identifies advanced/IV+ character. The USGS Lowman station is a downstream proxy, not a local guarantee.",
    ],
    gauge: "13235000",
    gaugeName: "South Fork Payette River at Lowman, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 600 },
    thresholdLabel: "Idaho Payette basin plan: 600-3,000 cfs for Deadwood River to Danskin (minimum-only planning cue; above 3,000 cfs advanced/IV+)",
    thresholdUrl: southForkPayetteThresholdPlan,
    thresholdSupportUrl: southForkPayetteCanyonThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: payetteGuide,
    sourceLabel: "BLM Payette River corridor boater map and guide",
    mapUrl: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf",
    additionalSourceLinks: [
      { label: "Deadwood River Access coordinate record", url: deadwoodAccessSource },
      { label: "Danskin Station Boat Launch coordinate record", url: danskinStationAccessSource },
      { label: "Payette basin protected-stream corridor", url: "https://maps.idwr.idaho.gov/StateProtectedStreams/Plan/Details?streamcode=PAYSP2" },
    ],
    putIn: {
      name: "Deadwood River Access Put-In",
      latitude: 44.08092,
      longitude: -115.65812,
      mileFromStart: 0,
      note: "Named US Forest Service parking/access site at the Deadwood River confluence; verify the current launch surface and any seasonal gate before committing.",
    },
    takeOut: {
      name: "Danskin Station Boat Launch Take-Out",
      latitude: 44.06212,
      longitude: -115.81294,
      mileFromStart: 12,
      note: "Named public boat launch on Highway 17; the canyon's primary take-out and a required endpoint for this card.",
    },
    camping: "Deadwood Campground is an endpoint basecamp option; Pine Flats Campground is a named on-corridor emergency/overnight reference, subject to current Forest Service availability and fire rules.",
    campingClassification: "endpoint_campground",
    shuttle: "Highway 17 parallels much of the reach. Stage at Danskin, scout the road-visible rapids, and do not rely on informal riverbank pullouts as evacuation access.",
    permits: "Boise National Forest/BLM Payette corridor day-use pass or fee where posted, Idaho AIS/PFD requirements, fire restrictions, and current road or closure notices apply.",
    watchFor: ["Big Falls waterfall and portage", "Gateway, Blackadar, Lone Pine, Little Falls, and Surprise", "Pine Flats no-return point", "cold water, wood, and limited canyon exits"],
    season: [5, 6, 7, 8, 9],
    imageUrl: payetteImage,
    imageLabel: "South Fork Payette same-river context photograph",
  }),

  makeRoute({
    id: "south-fork-payette-swirly-danskin-alder",
    riverId: "south-fork-payette-river-idaho",
    name: "South Fork Payette River",
    reach: "Danskin Station to Alder Creek Road Bridge (Swirly Canyon)",
    region: "Southwest Idaho / Banks-Lowman corridor",
    routeType: "whitewater",
    summary:
      "An 8-mile Class II-III South Fork Payette reach through Swirly Canyon, with a defined Danskin launch, roadside scouting, and Alder Creek bridge take-out.",
    statusText:
      "Threshold-documented planning route. American Whitewater lists 330-6,000 cfs, but the available USGS Lowman gauge is an upstream proxy for this reach.",
    distance: "About 8 river miles",
    time: "About 3-5 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "Swirly Canyon has strong eddy lines and boils; downstream of the gorge, the failed Grimes Dam site creates a changing play-wave feature.",
      "Danskin is a steep-stair/raft-slide access and Alder Creek is a bridge landing; verify parking, stairs, and the legal downstream river-left landing.",
      "The 330-6,000 cfs American Whitewater window is planning guidance only because the live gauge is upstream proxy context.",
    ],
    gauge: "13235000",
    gaugeName: "South Fork Payette River at Lowman, ID (upstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 330 },
    thresholdLabel: "American Whitewater published runnable window: 330-6,000 cfs (minimum planning shoulder; upstream proxy)",
    thresholdUrl: swirlyCanyonThreshold,
    thresholdSupportUrl: payetteGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: payetteGuide,
    sourceLabel: "BLM Payette River corridor guidance",
    mapUrl: "https://www.blm.gov/sites/blm.gov/files/BLM_ID_PayetteRiver.pdf",
    putIn: {
      name: "Danskin Station Put-In",
      latitude: 44.062111,
      longitude: -115.813188,
      mileFromStart: 0,
      note: "Fee access at Highway 17 mile 19.5 with stairs and a raft slide; confirm the current Payette pass and launch condition.",
    },
    takeOut: {
      name: "Alder Creek Road Bridge Take-Out",
      latitude: 44.070499,
      longitude: -115.945999,
      mileFromStart: 8,
      note: "Downstream river-left landing at the Alder Creek bridge; approach via the short Alder Creek Road spur.",
    },
    camping: "No on-route camping is assumed; use Hot Springs Campground or a lawful Banks-Lowman basecamp.",
    campingClassification: "nearby_basecamp",
    shuttle: "Banks-Lowman/Highway 17 shuttle with frequent road access and scouting pullouts.",
    permits: "Payette system day-use/season pass, Idaho AIS/PFD requirements, fire restrictions, and current road notices apply.",
    watchFor: ["Swirly Canyon boils and eddy lines", "Grimes Dam play wave", "steep access stairs and bridge take-out"],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),

  makeRoute({
    id: "south-fork-payette-staircase-deer-creek-banks",
    riverId: "south-fork-payette-river-idaho",
    name: "South Fork Payette River",
    reach: "Deer Creek Ramp to Banks (Staircase)",
    region: "Southwest Idaho / Banks-Lowman corridor",
    routeType: "whitewater",
    summary:
      "A 4.8-mile Class IV South Fork Payette run featuring Bronco Billy, Staircase, and Slalom, with roadside scouting and developed Banks access.",
    statusText:
      "Threshold-documented planning route. Idaho's Payette basin water plan lists 600-4,000 cfs for Deer Creek to Banks, while American Whitewater provides a broader 410-10,500 cfs context; the available USGS Lowman gauge is an upstream proxy, so this card is not live-score eligible.",
    distance: "About 4.8 river miles",
    time: "About 2-4 hours plus scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "Class IV rapids include Staircase and Slalom; use a proven whitewater craft, helmet, rescue gear, and a crew with reliable self-rescue skills.",
      "Deer Creek is a seal-launch style access that can expose boat-breaking rocks at low flow; Banks is busy and requires a legal day-use/season pass.",
      "Use the Idaho basin plan's 600-4,000 cfs planning window, with American Whitewater's broader range as context only. Scout the road-side corridor, wood, holes, and changing release character before launch.",
    ],
    gauge: "13235000",
    gaugeName: "South Fork Payette River at Lowman, ID (upstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 600 },
    thresholdLabel: "Idaho Payette basin plan planning window: 600-4,000 cfs; American Whitewater 410-10,500 cfs context",
    thresholdUrl: southForkPayetteThresholdPlan,
    thresholdSupportUrl: staircaseThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: payetteGuide,
    sourceLabel: "BLM Payette River corridor guidance",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13235000/",
    putIn: {
      name: "Deer Creek Ramp",
      latitude: 44.092667,
      longitude: -116.042803,
      mileFromStart: 0,
      note: "Named public ramp on the Banks-Lowman Road; low-flow rocks and a steep launch require a same-day inspection.",
    },
    takeOut: {
      name: "Banks Take-Out",
      latitude: 44.08438,
      longitude: -116.1165,
      mileFromStart: 4.8,
      note: "Developed river-right Banks access with trailer parking, toilets, and changing facilities; expect summer congestion.",
    },
    camping: "No on-route camping is assumed; use lawful nearby BLM/Forest Service campgrounds or a Banks-area basecamp.",
    campingClassification: "nearby_basecamp",
    shuttle: "Short Banks-Lowman Road shuttle that parallels the run and supports roadside scouting.",
    permits: "Payette River system day-use/season pass, Idaho AIS/PFD requirements, fire restrictions, and current road notices apply.",
    watchFor: ["Staircase and Slalom", "low-flow exposed rocks", "Banks congestion and changing big water"],
    imageUrl: payetteImage,
    imageLabel: "Payette River same-watershed context photograph",
  }),

  makeRoute({
    id: "snake-river-hells-canyon-dam-pittsburg",
    riverId: "snake-river-hells-canyon-idaho",
    name: "Snake River",
    reach: "Hells Canyon Dam to Pittsburg Landing",
    region: "Western Idaho / Hells Canyon NRA",
    routeType: "whitewater",
    summary:
      "A 32-mile Class III-IV Wild Snake River expedition through Hells Canyon, with Recreation.gov permit controls, named camps, and a Pittsburg Landing take-out.",
    statusText:
      "Gauge-scored multi-day route. American Whitewater lists 7,000-80,000 cfs at the Hells Canyon Dam gauge; primary-season launches require a Recreation.gov reservation and the canyon has jet-boat traffic, cold water, and limited exits.",
    distance: "About 32.2 river miles, multi-day",
    time: "3-4 days with camps and scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "remote", "strainers", "fast_rise", "access_uncertain", "mandatory_takeout"],
    safety: [
      "Class III-IV canyon water includes Wild Sheep, Granite, and other named rapids; carry rescue, repair, first-aid, and satellite-communication equipment.",
      "The primary season is permit-controlled. Confirm launch reservation/self-issue rules, campsite plan, fire-pan and portable-toilet requirements, and current jet-boat advisories.",
      "American Whitewater's 7,000-80,000 cfs range is a planning envelope only. Scout each rapid and withdraw for unsafe weather, debris, or a take-out that cannot be completed in daylight.",
    ],
    gauge: "13290450",
    gaugeName: "Snake River at Hells Canyon Dam, ID-OR State Line",
    thresholdModel: "two-sided",
    threshold: { tooLow: 7000, idealMin: 7000, idealMax: 80000, tooHigh: 80000 },
    thresholdLabel: "American Whitewater published runnable window: 7,000-80,000 cfs",
    thresholdUrl: hellsCanyonThreshold,
    thresholdSupportUrl: hellsCanyonPage,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: hellsCanyonPage,
    sourceLabel: "Recreation.gov Hells Canyon permit and river information",
    mapUrl: "https://www.fs.usda.gov/recarea/wallowa-whitman/recarea/?recid=79489",
    putIn: {
      name: "Hells Canyon Dam Put-In",
      latitude: 45.253822,
      longitude: -116.696377,
      mileFromStart: 0,
      note: "Developed ramp on river left just downstream of Hells Canyon Dam; follow current permit and staging instructions.",
    },
    takeOut: {
      name: "Pittsburg Landing Take-Out",
      latitude: 45.632821,
      longitude: -116.476296,
      mileFromStart: 32.2,
      note: "Developed river-right landing at Pittsburg Landing; mandatory endpoint for this wild-river section.",
    },
    camping: "Use only reserved or designated Hells Canyon camps and comply with current portable-toilet, fire-pan, and pack-out rules.",
    campingClassification: "on_route_campsite",
    shuttle: "Remote one-way shuttle; stage at Pittsburg Landing or use a permitted outfitter and plan for slow canyon roads.",
    permits: "Primary season requires a Recreation.gov launch reservation; secondary season requires a self-issue permit. Idaho AIS/PFD, fire, and current Forest Service rules apply.",
    watchFor: ["Wild Sheep and Granite rapids", "jet boats and cold water", "permit/camp controls and mandatory take-out"],
    imageUrl: snakeImage,
    imageLabel: "Snake River Hells Canyon context photograph",
  }),

  makeRoute({
    id: "snake-river-pittsburg-heller-bar",
    riverId: "snake-river-hells-canyon-idaho",
    name: "Snake River",
    reach: "Pittsburg Landing to Heller Bar",
    region: "Western Idaho / Hells Canyon downstream corridor",
    routeType: "whitewater",
    summary:
      "A remote 46-mile Class II-III Snake River canyon continuation below Pittsburg Landing, with extensive dispersed camps, jet-boat traffic, and a concrete Heller Bar endpoint.",
    statusText:
      "Gauge-scored expedition route. RiverBrain recommends 6,000 cfs minimum, 30,000 cfs average, and 80,000 cfs maximum on the McDuff Rapids gauge; coordinate boat traffic and plan for a long, remote float.",
    distance: "About 46 river miles, multi-day",
    time: "3-5 days depending on camps, boat traffic, and current",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "remote", "cold_water", "strainers", "fast_rise", "mandatory_takeout", "access_uncertain"],
    safety: [
      "RiverBrain lists 40 named rapids from Class II to III, with large waves, eddy turbulence, and rocks; keep a conservative line and scout from the boat when safe.",
      "Jet boats use this corridor. Yield to committed powerboats and avoid entering a rapid when a jet boat is already running it; carry signaling and emergency communication gear.",
      "Pittsburg Landing has no boat ramp or water, while Heller Bar has a concrete ramp, toilets, and parking. Stage the take-out and supplies before launch.",
      "Use RiverBrain's 6,000-80,000 cfs shoulders with the 30,000 cfs average reference, then defer to current, weather, debris, traffic, and daylight at Heller Bar.",
    ],
    gauge: "13317660",
    gaugeName: "Snake River below McDuff Rapids at China Gardens, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 6000, idealMin: 20000, idealMax: 40000, tooHigh: 80000 },
    thresholdLabel: "RiverBrain recommended levels: 6,000 cfs minimum, 30,000 cfs average, 80,000 cfs maximum; 20,000-40,000 cfs planning ideal",
    thresholdUrl: snakePittsburgHellerThreshold,
    thresholdSupportUrl: hellsCanyonPage,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: snakePittsburgHellerThreshold,
    sourceLabel: "RiverBrain Pittsburg Landing to Heller Bar reach record",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13317660/",
    additionalSourceLinks: [
      { label: "RiverBrain Pittsburg Landing access", url: snakePittsburgAccessSource },
      { label: "RiverBrain Dug Bar Boat Ramp access", url: snakeDugBarAccessSource },
      { label: "RiverBrain Heller Bar Boat Ramp access", url: snakeHellerAccessSource },
    ],
    putIn: {
      name: "Pittsburg Landing Put-In",
      latitude: 45.6324841,
      longitude: -116.47598863,
      mileFromStart: 0,
      note: "Exact RiverBrain access anchor: all vehicles but no boat ramp, camping, or water. The landing is the downstream endpoint of the Hells Canyon run and the start of this continuation.",
    },
    takeOut: {
      name: "Heller Bar Boat Ramp Take-Out",
      latitude: 46.08601938,
      longitude: -116.98350549,
      mileFromStart: 46,
      note: "Exact RiverBrain access anchor: concrete boat ramp, toilets, parking, all vehicles, and no water or camping; road continues 21 miles to Asotin, Washington.",
    },
    access: [
      {
        name: "Pittsburg Landing Put-In",
        latitude: 45.6324841,
        longitude: -116.47598863,
        mileFromStart: 0,
        note: "Public landing and staging point; no developed ramp or water.",
      },
      {
        name: "Dug Bar Boat Ramp",
        latitude: 45.80453222,
        longitude: -116.68640525,
        mileFromStart: 19,
        note: "RiverBrain lists this as a 4WD-only optional access with camping and a boat ramp; verify road and landing before relying on it.",
      },
      {
        name: "Heller Bar Boat Ramp Take-Out",
        latitude: 46.08601938,
        longitude: -116.98350549,
        mileFromStart: 46,
        note: "Concrete ramp, toilets, and parking; mandatory endpoint for this card.",
      },
    ],
    camping: "RiverBrain lists numerous dispersed canyon camps, including Pleasant Valley, Davis Creek, Big Canyon, Imnaha, and Cache Creek; use durable established sites, pack out waste, and carry all potable water.",
    campingClassification: "on_route_campsite",
    shuttle: "Long remote one-way shuttle with rough canyon roads; stage at Heller Bar or use a qualified outfitter and allow a recovery day.",
    permits: "No permit requirement is listed for this reach; follow current Hells Canyon National Recreation Area rules, Idaho AIS/PFD requirements, fire restrictions, and closures.",
    watchFor: ["jet boats and powerboat conflicts", "McDuff, Salmon River Falls, and other named rapids", "remote dispersed camps and cold water", "Heller Bar concrete ramp and road exit"],
    imageUrl: snakeImage,
    imageLabel: "Snake River Hells Canyon context photograph",
  }),

  makeRoute({
    id: "snake-river-murtaugh-bridge-twin-falls",
    riverId: "snake-river-hells-canyon-idaho",
    name: "Snake River",
    reach: "Murtaugh Bridge to Twin Falls Park",
    region: "Southern Idaho / Twin Falls County",
    routeType: "whitewater",
    summary:
      "A roughly 13-mile Class III-IV(V) Snake River canyon run from the BLM Murtaugh access to Idaho Power's Twin Falls Park take-out.",
    statusText:
      "Gauge-scored expert whitewater route. American Whitewater identifies the Murtaugh as a Class III-IV(V) reach with a roughly 1,200 cfs kayak minimum; the BLM and Idaho Power confirm public launch and take-out facilities.",
    distance: "About 13.3 river miles",
    time: "About 4-8 hours",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "fast_rise",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      "This is a big-water canyon with dangerous ledge holes and rapidly changing lines; use a proven whitewater craft, helmet, rescue equipment, and a crew capable of self-rescue.",
      "American Whitewater notes the reach becomes rocky and steep below about 5,500 cfs and that the minimum for kayaks is around 1,200 cfs. Scout Pair-A-Dice, Let's Make a Deal, Duck Blind, and other named features before committing.",
      "The Milner total-flow gauge is an upstream operational reference rather than a local measurement at every rapid. Idaho Power operations, irrigation, wind, and reservoir changes can alter conditions; current local inspection overrides the score.",
    ],
    gauge: "13088000",
    gaugeName: "Snake River at Milner, ID Total Flow",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 1200, idealMin: 2500, idealMax: 5500 },
    thresholdLabel:
      "American Whitewater runnable minimum about 1,200 cfs; rocky/steep below about 5,500 cfs (planning ideal 2,500-5,500 cfs)",
    thresholdUrl: murtaughThreshold,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13088000/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: murtaughThreshold,
    sourceLabel: "American Whitewater Murtaugh reach details",
    mapUrl: murtaughPutInSource,
    additionalSourceLinks: [
      {
        label: "Idaho Power Twin Falls Park take-out",
        url: murtaughTakeOutSource,
      },
      {
        label: "USGS Milner total-flow gauge",
        url: "https://waterdata.usgs.gov/nwis/uv?legacy=1&site_no=13088000",
      },
    ],
    putIn: {
      name: "Murtaugh Boating Access",
      latitude: 42.49916,
      longitude: -114.1475,
      mileFromStart: 0,
      note: "BLM public Murtaugh reach put-in; confirm seasonal road, parking, and launch conditions before carrying boats to the river.",
    },
    takeOut: {
      name: "Twin Falls Park boat ramp",
      latitude: 42.587805,
      longitude: -114.355335,
      mileFromStart: 13.3,
      note: "Idaho Power day-use park with boat ramp/docks, restrooms, and the documented Murtaugh Reach take-out; leave the water before dark.",
    },
    camping:
      "No on-route camping is assumed. Use a lawful Twin Falls or Murtaugh-area basecamp; both endpoints are day-use access facilities.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "One-way Murtaugh Road and Twin Falls local-road shuttle. Stage at Twin Falls Park before launching and account for daylight-only park hours.",
    permits:
      "No special river permit is listed for this reach. Follow BLM and Idaho Power site rules, Idaho AIS/PFD requirements, fire restrictions, and any temporary mid-Snake inspection or closure notices.",
    watchFor: [
      "Pair-A-Dice, Let's Make a Deal, Duck Blind, and other ledge holes",
      "high-water hydraulics and long swims",
      "Twin Falls Park day-use hours and mandatory take-out",
    ],
    season: [3, 4, 5, 6, 7, 8, 9, 10],
    imageUrl: snakeImage,
    imageLabel: "Snake River Hells Canyon context photograph",
  }),

  makeRoute({
    id: "pack-river-upper-grottos",
    riverId: "pack-river-idaho",
    name: "Pack River",
    reach: "Upper Grottos",
    region: "North Idaho / Bonner County",
    routeType: "whitewater",
    summary:
      "A 1.9-mile Class V+ Upper Pack River steep-creek reach with waterfalls, rock slides, undercuts, and a committing sequence that ends at the Upper Slides access.",
    statusText:
      "Planning-only expert threshold route. American Whitewater correlates the direct Pack River near Colburn gauge to 650-1,000 cfs and documents three committing grotto sequences, a 20-foot waterfall, a 30-foot slide, a 45-foot Super Slide, old-growth log hazards, and no easy river exit. This card is intentionally withheld from live scoring despite the direct gauge because current expert scouting, portage decisions, wood, and rescue capability dominate the numeric signal.",
    distance: "About 1.9 river miles",
    time: "About 1-3 hours plus extensive scouting and portage",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "strainers", "cold_water", "remote", "access_uncertain", "waterfall", "portage"],
    safety: [
      "This is Class V+ steep creeking for expert teams only. The reach contains waterfalls, long complex combinations, undercuts, piton rocks, and no easy exit; a swim or pinned boat may be unrecoverable.",
      "American Whitewater identifies a large old-growth log below the first waterfall, a heavily undercut second grotto, and a roughly 45-foot Super Slide. Scout every sequence from legal shore and pre-plan portages; do not treat the 1.9-mile length as a short or forgiving run.",
      "Use the direct Pack River near Colburn gauge's 650-1,000 cfs AW correlation only as a screening cue. Current wood, landing, weather, cold-water, and rescue conditions override the flow number, and the adjacent Slides/Gorgette transitions require a planned exit.",
    ],
    gauge: "12392300",
    gaugeName: "Pack River near Colburn, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 650, idealMin: 650, idealMax: 1000, tooHigh: 1000 },
    thresholdLabel:
      "American Whitewater direct-gauge correlation: 650-1,000 cfs runnable; expert-only Class V+ reach with numeric cue subordinate to scouting and rescue",
    thresholdUrl: packGrottosAwReach,
    thresholdSupportUrl: packGorgetteGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: packGrottosAwReach,
    sourceLabel: "American Whitewater Pack Upper Grottos reach record",
    mapUrl: packGrottosAwReach,
    additionalSourceLinks: [
      { label: "USGS Pack River near Colburn direct gauge", url: packGorgetteGauge },
      { label: "Dreamflows Pack composite reach map", url: "https://www.dreamflows.com/reachMap/index.php?num=A&rid=742" },
      { label: "Sandpoint Magazine Pack River flow and access guide", url: packGorgetteLocalGuide },
      { label: "Idaho Water Resources Board Pack minimum-flow record", url: packMinimumFlowSource },
      { label: "Bonner Soil and Water Conservation District Pack flow context", url: packFlowContextSource },
    ],
    putIn: {
      name: "Pack River Road Grottos put-in",
      latitude: 48.625,
      longitude: -116.627,
      mileFromStart: 0,
      note: "American Whitewater's Upper Grottos road-access anchor; confirm lawful staging, carry, private frontage, and current road conditions before committing to the steep creek.",
    },
    takeOut: {
      name: "Pack River Road Upper Slides access",
      latitude: 48.601,
      longitude: -116.637,
      mileFromStart: 1.9,
      note: "American Whitewater's Grottos endpoint and Upper Slides access anchor; confirm the legal carry, parking, and downstream transition before entering the Slides.",
    },
    camping:
      "No on-route camping is assumed. Use a lawful Sandpoint-area or Forest Service basecamp; do not camp at informal bridge pullouts or private Pack River frontage.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short Pack River Road shuttle with a required take-out vehicle at the Upper Slides access. Keep boats clear of narrow shoulders and do not rely on an unverified roadside pullout as an evacuation point.",
    permits:
      "No special river permit is listed. Follow Idaho AIS/PFD rules, Forest Service and county road restrictions, fire closures, private-property boundaries, and temporary Pack River access notices.",
    watchFor: ["20-foot waterfall", "old-growth log below first drop", "undercut second grotto", "45-foot Super Slide", "mandatory portage and no-exit canyon"],
    season: [4, 5, 6],
    imageUrl: clearwaterImage,
    imageLabel: "North Idaho watershed context photograph; not the Pack River endpoints",
  }),

  makeRoute({
    id: "pack-river-upper-slides",
    riverId: "pack-river-idaho",
    name: "Pack River",
    reach: "Upper Slides",
    region: "North Idaho / Bonner County",
    routeType: "whitewater",
    summary:
      "A 2.3-mile Class III-IV+(V) Upper Pack River section from a Pack River Road access to the second bridge, combining bedrock slides with continuous boulder drops and straightforward roadside portage options.",
    statusText:
      "Planning-only direct-gauge threshold route. American Whitewater correlates the Pack River near Colburn gauge to a 500-2,000 cfs runnable band and describes the Slides as the most popular upper Pack section because the major slides can be portaged. The access points are informal Pack River Road anchors, and the nearby Gorgette begins immediately downstream, so current road, wood, parking, and take-out confirmation are required.",
    distance: "About 2.3 river miles",
    time: "About 1-2 hours plus scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "strainers", "cold_water", "fast_rise", "remote", "access_uncertain"],
    safety: [
      "Use a proven Class IV crew with cold-water protection, throw bags, and a plan to portage the larger bedrock slides. The route is short but consequential, with continuous boulder drops and limited recovery between features.",
      "American Whitewater describes the Slides as popular partly because the major slides are easy to portage, but the final 1.5 miles becomes continuous Class III-IV boulder water. Scout the line and every portage from legal Pack River Road access before launching.",
      "Use the direct Pack River near Colburn gauge with 500 cfs as the AW lower runnable shoulder and 2,000 cfs as the upper correlation. Current wood, bridge approaches, road conditions, and the downstream Gorgette transition override the numeric cue.",
    ],
    gauge: "12392300",
    gaugeName: "Pack River near Colburn, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 500, idealMax: 2000, tooHigh: 2000 },
    thresholdLabel:
      "American Whitewater direct-gauge correlation: 500-2,000 cfs runnable; local Pack context is broader but not a reach-specific safety guarantee",
    thresholdUrl: packSlidesAwReach,
    thresholdSupportUrl: packGorgetteGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: packSlidesAwReach,
    sourceLabel: "American Whitewater Pack Upper Slides reach record",
    mapUrl: packSlidesAwReach,
    additionalSourceLinks: [
      { label: "USGS Pack River near Colburn direct gauge", url: packGorgetteGauge },
      { label: "Sandpoint Magazine Pack River flow and access guide", url: packGorgetteLocalGuide },
      { label: "Dreamflows Pack Slides reach map", url: "https://www.dreamflows.com/reachMap/index.php?num=A&rid=742" },
      { label: "Idaho Water Resources Board Pack minimum-flow record", url: packMinimumFlowSource },
      { label: "Bonner Soil and Water Conservation District Pack flow context", url: packFlowContextSource },
    ],
    putIn: {
      name: "Pack River Road Slides put-in",
      latitude: 48.601,
      longitude: -116.637,
      mileFromStart: 0,
      note: "American Whitewater's roadside Slides access anchor; confirm lawful staging, narrow-shoulder parking, and the carry to the river before launch.",
    },
    takeOut: {
      name: "Pack River Road second bridge take-out",
      latitude: 48.577,
      longitude: -116.612,
      mileFromStart: 2.3,
      note: "American Whitewater's second-vehicle-bridge take-out and downstream Gorgette put-in; confirm legal parking, safe carry, and the transition before continuing downstream.",
    },
    camping:
      "No on-route camping is assumed. Use a lawful Sandpoint-area or Forest Service basecamp; do not camp at bridge pullouts or on private Pack River frontage.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short Pack River Road shuttle between the downstream second bridge and the upper roadside access. Stage the take-out vehicle first and keep boats clear of traffic and bridge approaches.",
    permits:
      "No special river permit is listed. Follow Idaho AIS/PFD rules, Forest Service and county road restrictions, fire closures, private-property boundaries, and temporary Pack River access notices.",
    watchFor: ["bedrock slides and portages", "continuous Class III-IV boulder drops", "logs and sweepers", "downstream Gorgette transition", "cold spring runoff"],
    season: [4, 5, 6],
    imageUrl: clearwaterImage,
    imageLabel: "North Idaho watershed context photograph; not the Pack River endpoints",
  }),

  makeRoute({
    id: "pack-river-upper-gorgette",
    riverId: "pack-river-idaho",
    name: "Pack River",
    reach: "Upper Gorgette",
    region: "North Idaho / Bonner County",
    routeType: "whitewater",
    summary:
      "A 4.7-mile Class III-IV+ Upper Pack River reach from the second Pack River Road bridge through the Gorgette to a roadside take-out, with continuous boulder water, logs, and a committed Class IV-V pinch.",
    statusText:
      "Planning-only direct-gauge threshold route. American Whitewater correlates the Pack River near Colburn gauge to a 600-1,500 cfs runnable band and identifies the second Pack River Road bridge as the Gorgette put-in with a roadside take-out downstream. The local flow guide describes the Pack as best around 500-2,500 cfs, but the access points are informal bridge/road anchors and the Gorgette escalates sharply, so current scouting and legal parking confirmation are mandatory.",
    distance: "About 4.7 river miles",
    time: "About 2-3 hours plus shuttle and full scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "strainers", "cold_water", "fast_rise", "remote", "access_uncertain"],
    safety: [
      "This is an expert Class III-IV+ reach with a rapidly tightening Class IV-V Gorgette section. Use a proven whitewater crew, rescue hardware, cold-water protection, and a plan for portage or retreat before entering the gorge.",
      "American Whitewater describes logs in the upper stretch, few eddies near the Gorgette, and a sharp canyon turn requiring an immediate scout. Inspect the entire rapid sequence from Pack River Road or legal shore access before launching.",
      "Use the direct Pack River near Colburn gauge with 600 cfs as the AW lower runnable shoulder and 1,500 cfs as the upper correlation; the broader 500-2,500 cfs local context is not a substitute for current wood, road, and channel inspection.",
    ],
    gauge: "12392300",
    gaugeName: "Pack River near Colburn, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 600, idealMax: 1500, tooHigh: 1500 },
    thresholdLabel:
      "American Whitewater direct-gauge correlation: 600-1,500 cfs runnable; local Pack guidance gives a broader 500-2,500 cfs spring context",
    thresholdUrl: packGorgetteAwReach,
    thresholdSupportUrl: packGorgetteGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: packGorgetteAwReach,
    sourceLabel: "American Whitewater Pack Upper Gorgette reach record",
    mapUrl: packGorgetteAwReach,
    additionalSourceLinks: [
      { label: "USGS Pack River near Colburn direct gauge", url: packGorgetteGauge },
      { label: "Sandpoint Magazine Pack River flow and access guide", url: packGorgetteLocalGuide },
      { label: "Idaho Water Resources Board Pack minimum-flow record", url: packMinimumFlowSource },
      { label: "Bonner Soil and Water Conservation District Pack flow context", url: packFlowContextSource },
      { label: "Dreamflows Pack reach index", url: packDreamflows },
    ],
    putIn: {
      name: "Pack River Road second bridge / Gorgette put-in",
      latitude: 48.577,
      longitude: -116.612,
      mileFromStart: 0,
      note: "American Whitewater's second-vehicle-bridge Gorgette put-in; confirm lawful river-right staging, bridge/road safety, and current parking before carrying boats to the water.",
    },
    takeOut: {
      name: "Pack River Road roadside Gorgette take-out",
      latitude: 48.524,
      longitude: -116.588,
      mileFromStart: 4.7,
      note: "American Whitewater's roadside take-out anchor near the first downstream bridge; confirm a legal pullout and safe carry away from the road before committing to the reach.",
    },
    camping:
      "No on-route camping is assumed. Use a lawful Sandpoint-area or Forest Service basecamp; do not camp at informal bridge pullouts or on private Pack River frontage.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Pack River Road shuttle from the downstream roadside take-out to the second bridge. Stage the take-out vehicle first, expect narrow shoulders and seasonal road conditions, and keep boats clear of traffic.",
    permits:
      "No special river permit is listed. Follow Idaho AIS/PFD rules, Forest Service and county road restrictions, fire closures, private-property boundaries, and any temporary Pack River access notices.",
    watchFor: ["Gorgette Class IV-V pinch", "logs and sweepers", "few recovery eddies", "roadside bridge access", "cold spring runoff"],
    season: [4, 5, 6],
    imageUrl: clearwaterImage,
    imageLabel: "North Idaho watershed context photograph; not the Pack River endpoints",
  }),

  makeRoute({
    id: "south-fork-coeur-dalene-mullan-wallace",
    riverId: "south-fork-coeur-dalene-river-idaho",
    name: "South Fork Coeur d'Alene River",
    reach: "Mullan to Wallace",
    region: "Idaho Panhandle / Silver Valley",
    routeType: "whitewater",
    summary:
      "An approximately 8-mile Class III-IV Silver Valley run from Mullan toward Wallace, with narrow concrete channels, railroad and highway infrastructure, Tunnel Rapid, and very limited eddies.",
    statusText:
      "Planning-only threshold route. American Whitewater correlates the reach to the direct South Fork gauge above Placer Creek at Wallace with a 250-600 cfs runnable range; North Idaho Rivers describes the run as feeling low and scrapey near 350 cfs and warns that flows above about 1,100 cfs may not fit beneath the low bridge at Wallace. Historic mining debris, low bridges, a railroad trestle, tunnel hydraulics, and a cumbersome riprap take-out require expert scouting and current local confirmation.",
    distance: "About 8 river miles",
    time: "About 3-6 hours plus shuttle and full shore scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "strainers", "remote", "access_uncertain"],
    safety: [
      "This is not a beginner run. The river is narrow, roadside, and often walled in, with blind corners, no-eddy sections, railroad trestles, concrete banks, and Tunnel Rapid near Wallace. Use a proven Class IV crew with rescue hardware, throw bags, first aid, and satellite communication.",
      "North Idaho Rivers recommends full visual scouting from the Trail of the Coeur d'Alenes or shore because many hazards cannot be safely boat-scouted. Inspect every bridge, trestle, culvert, log jam, and concrete channel before launching.",
      "Use 250 cfs as the AW lower runnable shoulder and 350-600 cfs as the conservative planning band. Treat approximately 1,100 cfs as a hard upper bridge-clearance warning from local guidance, not as a runnable target; current bridge clearance, debris, and channel conditions override every numeric cue.",
    ],
    gauge: "12413131",
    gaugeName: "South Fork Coeur d'Alene River above Placer Creek at Wallace, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 250, idealMin: 350, idealMax: 600, tooHigh: 1100 },
    thresholdLabel:
      "American Whitewater direct-gauge correlation: 250-600 cfs runnable; local guidance describes about 350 cfs as low/scrapey and warns of low-bridge clearance above about 1,100 cfs",
    thresholdUrl: southForkCdaAwReach,
    thresholdSupportUrl: southForkCdaGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: southForkCdaAwReach,
    sourceLabel: "American Whitewater South Fork Coeur d'Alene reach record",
    mapUrl: southForkCdaAwReach,
    additionalSourceLinks: [
      { label: "USGS South Fork Coeur d'Alene direct gauge", url: southForkCdaGauge },
      { label: "North Idaho Rivers local flow and hazard guide", url: southForkCdaGuide },
      { label: "Idaho Fish and Game South Fork Coeur d'Alene water record", url: southForkCdaIdfg },
      { label: "American Whitewater Wallace boater-access cleanup project", url: southForkCdaAccessArticle },
      { label: "Idaho Parks Trail of the Coeur d'Alenes scouting corridor", url: southForkCdaTrail },
      { label: "Idaho fisheries plan / Silver Valley river context", url: "https://idfg.idaho.gov/sites/default/files/digital-2025-2030-fisheries-plan.pdf" },
    ],
    putIn: {
      name: "Mullan / Interstate 90 river access",
      latitude: 47.4672,
      longitude: -115.801,
      mileFromStart: 0,
      note: "American Whitewater's Mullan-area access coordinate; confirm current roadside staging, private frontage, and safe entry away from I-90 and railroad infrastructure.",
    },
    takeOut: {
      name: "Wallace visitor-center / Placer Creek-area take-out",
      latitude: 47.4738,
      longitude: -115.924,
      mileFromStart: 8,
      note: "American Whitewater's Wallace-area endpoint; current access improvements have been discussed, but use only a marked lawful landing and confirm riprap, parking, and visitor-center status before launch.",
    },
    camping:
      "No on-route camping is assumed. Use a lawful Mullan or Wallace basecamp; do not camp beside the industrial corridor, railroad, highway, or river-channel concrete.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short but traffic-sensitive I-90 / Trail of the Coeur d'Alenes shuttle. Stage the Wallace vehicle first, keep boats and people clear of railroad and highway corridors, and do not block the visitor-center or trailhead access.",
    permits:
      "Follow Idaho Fish and Game rules, Idaho AIS/PFD requirements, Idaho Parks trail rules, railroad and highway exclusion zones, fire restrictions, and current Wallace/Mullan access notices.",
    watchFor: ["Tunnel Rapid", "low bridges and trestles", "historic mining debris", "blind no-eddy corners", "changing wood and riprap take-out"],
    season: [3, 4, 5, 6],
    imageUrl: stJoeImage,
    imageLabel: "Idaho Panhandle same-watershed context photograph",
  }),

  makeRoute({
    id: "st-maries-river-mashburn-st-joe",
    riverId: "st-maries-river-idaho",
    name: "St. Maries River",
    reach: "Mashburn to St. Joe River",
    region: "Idaho Panhandle / Benewah County",
    routeType: "whitewater",
    summary:
      "A roughly 28-mile Class II-III spring reach from the Highway 3 Mashburn crossing to the St. Joe River, with a long committed roadless corridor and changing wood in braided sections.",
    statusText:
      "Planning-only threshold route. American Whitewater correlates the reach to the direct St. Maries River near Santa gauge with a 600-3,000 cfs runnable envelope; trip reports describe good conditions around 1,070-1,600 cfs and larger rollers near 3,800 cfs. AW's access coordinates are explicitly approximate, so verify the Mashburn launch, the confluence take-out, current wood, and lawful parking before committing.",
    distance: "About 28.1 river miles",
    time: "About 7-10 hours plus shuttle and scouting",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "strainers", "cold_water", "remote", "fast_rise", "access_uncertain"],
    safety: [
      "Treat this as a long committed Class II-III day: once below Mashburn, road access is limited and a full shuttle/float plan, repair kit, throw bags, first aid, and satellite communication are prudent.",
      "American Whitewater and trip reports document a large log in a braided channel near the lower reach. Scout all braids, keep a conservative line around strainers, and never assume an old report describes current wood.",
      "The direct 12414900 gauge is route-specific but the reach record is old and its access coordinates are very approximate. Use 600 cfs as a low runnable shoulder, 1,000-2,000 cfs as a conservative planning band, and 3,000 cfs as the upper published runnable shoulder only after same-day scouting.",
    ],
    gauge: "12414900",
    gaugeName: "St. Maries River near Santa, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1000, idealMax: 2000, tooHigh: 3000 },
    thresholdLabel:
      "American Whitewater direct-gauge correlation: about 600-3,000 cfs runnable; trip reports describe good 1,070-1,600 cfs and larger 3,800 cfs context",
    thresholdUrl: stMariesAwReach,
    thresholdSupportUrl: stMariesGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: stMariesAwReach,
    sourceLabel: "American Whitewater St. Maries Mashburn-to-St. Joe reach record",
    mapUrl: stMariesAwReach,
    additionalSourceLinks: [
      { label: "USGS St. Maries River near Santa direct gauge", url: stMariesGauge },
      { label: "Idaho Fish and Game Saint Maries River water record", url: stMariesIdfgWater },
      { label: "Idaho Fish and Game St. Maries River / Spicer Pond access", url: stMariesIdfgAccess },
      { label: "Idaho Panhandle access guide", url: stMariesAccessGuide },
      { label: "North Idaho Rivers St. Maries flow and access guide", url: stMariesLocalGuide },
    ],
    putIn: {
      name: "Mashburn / Highway 3 bridge put-in",
      latitude: 47.1352767944336,
      longitude: -116.422500610352,
      mileFromStart: 0,
      note: "American Whitewater's approximate Mashburn bridge coordinate; confirm the roadside launch, parking, and private-frontage boundary before staging.",
    },
    takeOut: {
      name: "St. Joe River confluence take-out",
      latitude: 47.3005561828613,
      longitude: -116.549453735352,
      mileFromStart: 22.4,
      note: "American Whitewater's approximate confluence-area take-out; confirm river-right landing, current access, and a lawful vehicle position before launch.",
    },
    camping:
      "No on-route camping is assumed. Use a lawful St. Maries-area basecamp or a pre-arranged private/public site and carry an emergency overnight contingency for the long committed reach.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Long one-way Highway 3 / Benewah County shuttle. Stage the confluence vehicle first, verify bridge and road conditions, and leave a written float plan because cell coverage may be intermittent.",
    permits:
      "Follow Idaho Fish and Game access rules, Idaho AIS/PFD requirements, fire restrictions, and current county/landowner notices at both approximate AW access areas.",
    watchFor: ["braided-channel wood and strainers", "long committed corridor", "cold spring water", "approximate access and parking", "rapidly changing runoff"],
    season: [3, 4, 5, 6],
    imageUrl: stJoeImage,
    imageLabel: "Idaho Panhandle same-watershed context photograph",
  }),

  makeRoute({
    id: "st-joe-river-bluff-turner-flat",
    riverId: "st-joe-river-idaho",
    name: "St. Joe River",
    reach: "Bluff Creek to Turner Flat Campground",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "recreational",
    summary:
      "A 12.3-mile Class II St. Joe float along Highway 50 from the formal Bluff Creek river access to Turner Flat Campground.",
    statusText:
      "Planning-only proxy-threshold route. American Whitewater documents formal river access, Eagle Creek, and Turner Flat campground access along the Highway 50 corridor; Kayak Idaho's 500-1,500 cfs Panhandle band is retained as Calder proxy context. Current campground status, wood, bridge/road staging, and local level control the launch decision.",
    distance: "About 12.3 river miles",
    time: "About 4-7 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "low_water", "access_uncertain", "wind"],
    safety: [
      "American Whitewater rates this section Class II and describes a paved Highway 50 corridor with formal river access and multiple campground options. Wear PFDs, scout bridge approaches, and keep a conservative shoreline plan around wood and private frontage.",
      "Use 500-1,500 cfs only as a broad Calder-gauge proxy band. The gauge is downstream context for this upper corridor; local level, debris, road traffic, weather, and craft choice override the numeric cue.",
      "Turner Flat has easy river access and campground facilities when open. Eagle Creek and the intermediate River Access site are useful staging references, but do not assume every campsite or bank is a public launch; use only signed access and confirm seasonal openings.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 500, idealMax: 1500, tooHigh: 1500 },
    thresholdLabel: "Kayak Idaho Panhandle planning band: 500-1,500 cfs on the Calder proxy gauge",
    thresholdUrl: stJoeSkookumFlow,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-12414500/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/11267/main",
    sourceLabel: "American Whitewater Bluff Creek to Turner Flat reach record",
    mapUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/11267/main",
    additionalSourceLinks: [
      { label: "American Whitewater Bluff Creek river access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/L5lqXpJNl0D2TKNyWcIJr" },
      { label: "American Whitewater Turner Flat campground access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/CigQ4cLdMCPrJscx6HuYB" },
      { label: "American Whitewater Eagle Creek river access", url: "https://www.americanwhitewater.org/content/River/view/river-detail/point-of-interest/access/WbpJzNSgDO1JnZUd9ISbw" },
      { label: "Kayak Idaho Panhandle flow table", url: stJoeSkookumFlow },
      { label: "USFS St. Joe Wild and Scenic River plan", url: stJoePlan },
      { label: "USGS St. Joe River at Calder proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-12414500/" },
    ],
    putIn: {
      name: "Bluff Creek River Access",
      latitude: 47.194762,
      longitude: -115.50607,
      mileFromStart: 0,
      note: "Formal American Whitewater river access 1.3 miles below the Bluff Creek bridge; confirm parking, river-side carry, and current Forest Service signage.",
    },
    takeOut: {
      name: "Turner Flat Campground Take-Out",
      latitude: 47.236839,
      longitude: -115.65587,
      mileFromStart: 12.3,
      note: "Forest Service campground with documented easy river access; confirm seasonal opening, parking, water, toilets, and current Highway 50 conditions.",
    },
    camping:
      "Highway 50 corridor campgrounds and dispersed sites provide nearby basecamp options. Turner Flat has named campground facilities when open; reserve or confirm current status, water, toilets, fees, and fire restrictions.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Highway 50 parallels the reach and makes a paved shuttle practical. Stage Turner Flat first, keep vehicles off highway shoulders, and use only signed campground and river-access pullouts.",
    permits:
      "Follow Idaho Panhandle National Forest, Wild and Scenic River, campground, fire, AIS/PFD, and highway-safety rules. No separate river permit was confirmed for this public day-float corridor.",
    watchFor: ["Eagle Creek access", "wood and bridge approaches", "cold water", "Highway 50 traffic", "seasonal campground closures"],
    season: [5, 6, 7, 8],
    imageUrl: stJoeImage,
    imageLabel: "St. Joe River same-river context photograph",
  }),

  makeRoute({
    id: "st-joe-river-spruce-tree-turner-flat",
    riverId: "st-joe-river-idaho",
    name: "St. Joe River",
    reach: "Spruce Tree Campground to Turner Flat Campground",
    region: "Idaho Panhandle / St. Joe National Forest",
    routeType: "whitewater",
    summary:
      "A 35-mile expert-only Wild and Scenic St. Joe itinerary spanning the official Spruce Tree-Gold Creek, Gold-Bluff, and Bluff-Turner sections.",
    statusText:
      "Advanced multi-section route. The manager plan identifies Class II-IV water, Tumbledown Falls, Skookum Canyon, and a season that can become too low by mid-July. Split the route or use an outfitter unless the party is fully equipped for remote expert whitewater.",
    distance: "About 35 river miles",
    time: "One very long day or a carefully planned overnight",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "remote",
      "low_water",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      "Tumbledown Falls includes a six-foot drop preceded by Class IV water; Skookum Canyon contains sustained violent Class III-IV rapids. Scout and portage only where public land and safe trails allow.",
      "The Calder gauge is far downstream and is a proxy only. Local level, wood, road, fire, and campground checks control the decision.",
      "This is a long, remote multi-section commitment with limited bailout and rescue access. Carry communication, cold-water protection, repair/rescue equipment, and an overnight contingency; do not treat the proxy gauge or campground endpoints as a same-day safety certification.",
    ],
    gauge: "12414500",
    gaugeName: "St. Joe River at Calder, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdLabel: "USFS St. Joe Wild and Scenic River management plan",
    sourceUrl: stJoePlan,
    sourceLabel: "USFS St. Joe Wild and Scenic River plan",
    mapUrl:
      "https://www.fs.usda.gov/sites/nfs/files/r01/idahopanhandle/publication/SJRD%20MVUM%20Back%202021.pdf",
    putIn: {
      name: "Spruce Tree Campground river access",
      latitude: 47.03808,
      longitude: -115.34777,
      mileFromStart: 0,
      note: "USFS campground/access at the upper end of the recreational float sequence.",
    },
    takeOut: {
      name: "Turner Flat Campground river access",
      latitude: 47.236683,
      longitude: -115.655123,
      mileFromStart: 35,
      note: "USFS developed campground endpoint below Skookum Canyon.",
    },
    camping:
      "Use only open Forest Service campgrounds or legal dispersed sites under current forest/fire rules; Spruce Tree and Turner Flat are endpoint campgrounds.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Very long St. Joe River Road shuttle with limited services and communications; stage the take-out and carry emergency communication.",
    permits:
      "Follow current Idaho Panhandle National Forest, Wild and Scenic River, fire, camping, invasive-species, and PFD rules; commercial trips require authorization.",
    watchFor: [
      "Tumbledown Falls Class IV",
      "Skookum Canyon Class III-IV",
      "low water after mid-July and remote rescue",
    ],
    imageUrl: stJoeImage,
    imageLabel: "USFS St. Joe River at Red Ives same-river context",
  }),

  makeRoute({
    id: "st-joe-river-shadowy-st-maries-aqua",
    riverId: "st-joe-river-idaho",
    name: "St. Joe River",
    reach: "Shadowy St. Joe Campground to St. Maries Aqua Park",
    region: "Idaho Panhandle / Benewah County",
    routeType: "recreational",
    summary:
      "A roughly 12.8-mile lower St. Joe float from the Forest Service Shadowy campground to the city Aqua Park ramp at St. Maries.",
    statusText:
      "Gauge-scored recreational route. Recreation.gov confirms a public campground boat launch at Shadowy St. Joe, the city Aqua Park is a public downstream ramp, and Kayak Idaho publishes a 300-1,500 cfs band for the lower St. Joe gauge; local wind, wood, traffic, and same-day access checks still control.",
    distance: "About 12.8 river miles",
    time: "About 4-7 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "wind", "low_water", "access_uncertain"],
    safety: [
      "The lower river is generally slower than the Wild and Scenic upper sections, but current, wood, private banks, and motorized traffic can still create hazards; wear PFDs and keep a conservative shoreline plan.",
      "Shadowy St. Joe is a seasonal Forest Service campground with a boat ramp; Aqua Park is a city launch. Confirm seasonal gates, fees, parking, dock status, and any local no-wake or closure notices before committing.",
      "The 300-1,500 cfs band comes from a local paddling flow table tied to the lower St. Joe gauge. It is a planning range, not a route-specific safety guarantee; current trend, wind, debris, traffic, and craft choice control the decision.",
    ],
    gauge: "12415135",
    gaugeName: "St. Joe River at Ramsdell near St. Maries, ID",
    threshold: { tooLow: 300, idealMin: 300, idealMax: 1500 },
    thresholdLabel:
      "Kayak Idaho lower St. Joe paddling band: 300-1,500 cfs",
    thresholdUrl: "https://kayakidaho.com/idaho-flows/panhandle-flows",
    thresholdSupportUrl: "https://www.waterdata.usgs.gov/monitoring-location/USGS-12415135/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: "https://www.americanwhitewater.org/content/River/view/river-detail/11265/main",
    sourceLabel: "American Whitewater Shadowy St. Joe river details",
    mapUrl: "https://www.recreation.gov/camping/campgrounds/10305337",
    additionalSourceLinks: [
      {
        label: "St. Maries Aqua Park public launch context",
        url: "https://stmarieschamber.org/joeexplore/",
      },
      {
        label: "Benewah County boating ordinance",
        url: "https://parksandrecreation.idaho.gov/wp-content/uploads/activities/boating/BenewahCounty.pdf",
      },
    ],
    putIn: {
      name: "Shadowy St. Joe Campground Boat Launch",
      latitude: 47.325668,
      longitude: -116.393254,
      mileFromStart: 0,
      note: "Forest Service campground with a boat ramp, docks, parking, potable water, toilets, and seasonal camping; confirm launch fee and open season.",
    },
    takeOut: {
      name: "St. Maries Aqua Park",
      latitude: 47.320054,
      longitude: -116.566963,
      mileFromStart: 12.8,
      note: "City of St. Maries public ramp and dock area near Fourth Street; use the signed launch and observe the local no-wake ordinance.",
    },
    camping:
      "Shadowy St. Joe provides developed endpoint camping. Aqua Park is day-use only; do not assume overnight camping at the city landing or on private shoreline.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Stage the Aqua Park vehicle before launch. Forest Highway 50 and local St. Maries roads provide the shuttle, but confirm seasonal campground access and city parking rules.",
    permits:
      "Follow current Idaho Panhandle National Forest rules, City of St. Maries and Benewah County boating ordinances, Idaho AIS/PFD requirements, and fire restrictions.",
    watchFor: [
      "private banks and motorized traffic",
      "cold water, wind, and strainers",
      "seasonal campground and dock status",
    ],
    season: [5, 6, 7, 8, 9, 10],
    imageUrl: stJoeImage,
    imageLabel: "St. Joe River same-river context photograph",
  }),

  makeRoute({
    id: "clearwater-river-mckays-bend-pink-house",
    riverId: "clearwater-river-idaho",
    name: "Clearwater River",
    reach: "McKay's Bend to Pink House",
    region: "North-Central Idaho / Clearwater corridor",
    routeType: "recreational",
    summary:
      "A roughly 20.5-mile mellow Clearwater float linking two developed BLM access sites with camping, concrete ramps, and Highway 12 shuttle options.",
    statusText:
      "Planning-only recreational route. BLM describes this stretch as a heavily used boating and tubing corridor with more than ten access sites; a secondary flow guide estimates a 1,700-6,900 cfs kayak/canoe band, but that estimate is not used for live scoring.",
    distance: "About 20.5 river miles",
    time: "About 5-8 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "wind", "low_water", "access_uncertain"],
    safety: [
      "This is moving water rather than a canalized lazy float; wear PFDs, keep a conservative shoreline plan, and be ready for cold-water immersion and changing wind.",
      "McKay's Bend and Pink House are public BLM sites, but ramps, parking, fees, seasonal closures, and shoreline conditions can change; confirm both endpoints before launch.",
      "The 1,700-6,900 cfs band is a secondary percentile-derived planning estimate. It is not a route-specific safety limit; current conditions, debris, weather, and craft choice control the decision.",
    ],
    gauge: "13340000",
    gaugeName: "Clearwater River at Orofino, ID",
    threshold: { tooLow: 1700, idealMin: 1700, idealMax: 6900 },
    thresholdLabel:
      "GoFloatThatRiver estimated kayak/canoe planning band: 1,700-6,900 cfs (not a scored cutoff)",
    thresholdUrl: clearwaterMainstemFlowGuide,
    thresholdSupportUrl: "https://www.waterdata.usgs.gov/monitoring-location/USGS-13340000/",
    thresholdSourceStrength: "derived",
    sourceUrl: clearwaterMainstemAccessGuide,
    sourceLabel: "BLM Clearwater River guide and maps",
    mapUrl: "https://www.blm.gov/visit/mckays-bend-recreation-site",
    additionalSourceLinks: [
      {
        label: "BLM Pink House Recreation Site",
        url: "https://www.blm.gov/visit/pink-house-recreation-site",
      },
      {
        label: "Idaho Fish and Game Clearwater flow links",
        url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1170397464258",
      },
    ],
    putIn: {
      name: "McKay's Bend Recreation Site",
      latitude: 46.4975,
      longitude: -116.726944,
      mileFromStart: 0,
      note: "Developed BLM/Idaho Fish and Game site at US 12 milepost 18.6 with a river-access area, parking, toilets, and endpoint camping.",
    },
    takeOut: {
      name: "Pink House Recreation Site",
      latitude: 46.50343,
      longitude: -116.34928,
      mileFromStart: 20.5,
      note: "Developed BLM site about five miles west of Orofino with a concrete year-round ramp, trailer parking, toilets, potable water, and RV/tent camping.",
    },
    camping:
      "McKay's Bend and Pink House both provide developed endpoint camping under current BLM fees and rules; do not assume informal shoreline camping between them.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Stage at Pink House before launch. US 12 parallels much of the corridor, but traffic, limited shoulders, and one-way staging constraints require daylight planning.",
    permits:
      "Follow current BLM site rules, Idaho AIS/PFD requirements, fire restrictions, fishing regulations, and any Clearwater River advisories.",
    watchFor: [
      "cold water and wind",
      "strainers and changing channel edges",
      "ramp congestion and seasonal low-water access",
    ],
    season: [5, 6, 7, 8, 9],
    imageUrl: salmonImage,
    imageLabel: "Clearwater-Salmon watershed context photograph",
  }),

  makeRoute({
    id: "snake-river-lower-salmon-falls-bliss",
    riverId: "snake-river-hagerman-idaho",
    name: "Snake River",
    reach: "Lower Salmon Falls Dam to Bliss Bridge (Hagerman reach)",
    region: "Southern Idaho / Hagerman Valley",
    routeType: "whitewater",
    summary:
      "A roughly 7-mile Class II-III Snake River run from the Lower Salmon Falls whitewater access to the Bliss Bridge take-out, with warm-season scenery and regulated flow.",
    statusText:
      "Gauge-scored recreational whitewater route. The Hagerman Valley Chamber and multiple paddling guides describe Class II-III water with a 4,000+ cfs runnable cue; the 13135000 gauge is directly below Lower Salmon Falls, while dam operations and the Bliss exclusion boundary still control the launch decision.",
    distance: "About 7-8 river miles",
    time: "About 3-5 hours plus shuttle and scouting",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "dam_release", "mandatory_takeout", "access_uncertain"],
    safety: [
      "The run starts with a calm warm-up and develops Class II-III wave trains below the Malad confluence; wear a PFD, keep a conservative line, and scout changing wood and current seams.",
      "Launch only at the Idaho Power Lower Salmon Falls whitewater access and take out at the Bliss Bridge parking area before the Bliss Dam exclusion zone. Twin Falls County prohibits public access immediately below the dam, spillway, powerhouse, and upstream buoy line.",
      "Use 4,000 cfs as a published runnable floor, not a guarantee. Recheck the direct 13135000 gauge, dam operations, weather, water temperature, wind, and the current channel before launch.",
    ],
    gauge: "13135000",
    gaugeName: "Snake River below Lower Salmon Falls near Hagerman, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 4000 },
    thresholdLabel: "Hagerman paddling guidance: 4,000+ cfs runnable floor on the direct below-Lower-Salmon-Falls gauge",
    thresholdUrl: hagermanThreshold,
    thresholdSupportUrl: hagermanChamberGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: hagermanChamberGuide,
    sourceLabel: "Hagerman Valley Chamber rafting and boating information",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13135000/",
    additionalSourceLinks: [
      { label: "Idaho Power Lower Salmon Falls whitewater put-in", url: lowerSalmonFallsAccessGuide },
      { label: "Idaho Power Bliss Park river access and boat launch (dam-area context)", url: blissAccessGuide },
      { label: "USGS below Lower Salmon Falls direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13135000/" },
      { label: "Regional Snake River Hagerman paddling flow guidance", url: hagermanThreshold },
      { label: "How's Your River Lower Salmon Falls to Bliss reach record", url: "https://www.howsyourriver.com/runs/g-lower-salmon-falls-dam-to-bliss-reservoir-snake-id" },
      { label: "Twin Falls County hydroelectric-project exclusion rules", url: "https://codelibrary.amlegal.com/codes/twinfallscountyid/latest/twinfallscounty_id/0-0-0-1251" },
      { label: "NPS Hagerman Fossil Beds access and safety context", url: "https://www.nps.gov/hafo/planyourvisit/park-brochure.htm" },
    ],
    putIn: {
      name: "Lower Salmon Falls Whitewater Put-In",
      latitude: 42.84161,
      longitude: -114.90361,
      mileFromStart: 0,
      note: "Idaho Power day-use whitewater access below Lower Salmon Falls with raft/kayak slide, parking, turnaround, and vault toilet; stay clear of the dam and powerhouse exclusion area.",
    },
    takeOut: {
      name: "Bliss Bridge Take-Out",
      latitude: 42.91556,
      longitude: -114.96528,
      mileFromStart: 7.5,
      note: "Public bridge take-out and parking just before River Road climbs out toward Bliss; carry out before the Bliss power-plant exclusion zone. Confirm current parking, bank access, and landowner conditions before launch.",
    },
    camping:
      "Both Idaho Power endpoints are day-use facilities. Use lawful Hagerman Valley lodging or a nearby developed campground; no on-route camping is assumed.",
    campingClassification: "none",
    shuttle:
      "Stage at Bliss Bridge before launching. Highway 30 and local roads provide a short shuttle, but dam-area roads and private plant property require careful staging.",
    permits:
      "Follow Idaho Power site rules, Twin Falls County hydroelectric-project exclusion rules, Idaho AIS/PFD requirements, fire restrictions, and current road or closure notices.",
    watchFor: ["Class II-III wave trains", "Lower Salmon Falls and Bliss dam exclusion zones", "strainers and changing channel edges", "cold water and wind"],
    season: [4, 5, 6, 7, 8, 9, 10],
    imageUrl: snakeImage,
    imageLabel: "Snake River same-river context photograph",
  }),

  makeRoute({
    id: "snake-river-milner-mile",
    riverId: "snake-river-milner-idaho",
    name: "Snake River",
    reach: "Milner Dam to Milner Power Plant (Milner Mile)",
    region: "Southern Idaho / Magic Valley",
    routeType: "whitewater",
    summary:
      "A 1.6-mile Class V Snake River gorge run below Milner Dam, available only during Idaho Power recreational releases and requiring expert-level big-water skills.",
    statusText:
      "Gauge-scored expert release route. American Whitewater describes 8,000 cfs as a lower-flow option with a river-wide keeper hole and 11,000-15,000 cfs as the full runnable range; Idaho Power controls the release window and requires advance requests and two-boater check-in.",
    distance: "About 1.6 river miles",
    time: "About 1-2 hours on release day, plus mandatory scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "dam_release", "cold_water", "fast_rise", "mandatory_takeout", "access_uncertain"],
    safety: [
      "Idaho Power rates the 1.6-mile dam-to-powerhouse reach Class V and recommends experts only. Scout from the south-side trail, wear a properly fitted PFD and helmet, and carry rescue/repair gear appropriate for high-volume canyon water.",
      "The reach is normally dry or very low. Launch only after Idaho Power confirms a recreational release, check in as required, and never enter the dam or powerhouse exclusion areas.",
      "American Whitewater describes a lower-flow option around 8,000 cfs with a river-wide keeper hole and a full runnable range around 11,000-15,000 cfs. The USGS Milner station is direct context, but release confirmation and on-site scouting override the score.",
    ],
    gauge: "13087995",
    gaugeName: "Snake River Gaging Station at Milner, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 8000, idealMin: 11000, idealMax: 15000, tooHigh: 15000 },
    thresholdLabel: "American Whitewater/Idaho Power Milner guidance: about 8,000 cfs lower-flow option; 11,000-15,000 cfs full runnable range",
    thresholdUrl: milnerThreshold,
    thresholdSupportUrl: milnerReleaseGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: milnerReleaseGuide,
    sourceLabel: "Idaho Power Milner Whitewater Information",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13087995/",
    additionalSourceLinks: [
      { label: "Idaho Power Milner Dam whitewater put-in/take-out", url: milnerAccessGuide },
      { label: "American Whitewater Milner Mile reach record", url: milnerThreshold },
      { label: "USGS Milner direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13087995/" },
      { label: "Idaho Power river flow data", url: "https://www.idahopower.com/recreation/water-information/stream-flow-data/" },
      { label: "BLM Milner Historic Recreation Area access context", url: "https://www.blm.gov/visit/milner-historic-recreation-area" },
    ],
    putIn: {
      name: "Milner Dam Whitewater Put-In",
      latitude: 42.52436,
      longitude: -114.00975,
      mileFromStart: 0,
      note: "Idaho Power day-use whitewater access area below Milner Dam with boat ramp/docks, toilets, and signed whitewater access; launch only on a confirmed recreational release.",
    },
    takeOut: {
      name: "Milner Power Plant Whitewater Take-Out",
      latitude: 42.52679,
      longitude: -114.03689,
      mileFromStart: 1.6,
      note: "Idaho Power whitewater take-out at the power plant end of the bypass reach; exit promptly at the signed facility and do not continue into downstream diversion infrastructure.",
    },
    camping:
      "No camping at the day-use Milner whitewater access. Use a lawful Magic Valley campground or lodging and arrive with the release-day plan already staged.",
    campingClassification: "none",
    shuttle:
      "No conventional shuttle is needed for the 1.6-mile reach, but stage vehicles at the Idaho Power take-out and walk the south-side trail for scouting and emergency planning.",
    permits:
      "Submit the Idaho Power whitewater release request by the published deadline, confirm the release by Friday, check in with at least two boaters, and follow Idaho Power, USGS, BLM, Idaho AIS/PFD, and dam-safety rules.",
    watchFor: ["Class V continuous rapids", "river-wide keeper hole near lower flow", "dam/powerhouse exclusion zones", "release timing and rapidly changing water"],
    season: [4, 5, 6],
    imageUrl: snakeImage,
    imageLabel: "Snake River same-watershed context photograph",
  }),

  makeRoute({
    id: "blackfoot-river-government-dam-cutthroat",
    riverId: "blackfoot-river-idaho",
    name: "Blackfoot River",
    reach: "Government Dam Road to Cutthroat Trout Campground",
    region: "Southeast Idaho / Caribou-Bingham",
    routeType: "recreational",
    summary:
      "A 10.4-mile Class II Blackfoot River float from the Government Dam Road bridge to the BLM Cutthroat Trout Campground, with six documented non-motorized access points in the broader corridor.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater and BLM describe easy Class II water, public bridge/campground access, and a 100 cfs minimum with typical summer flows around 200-800 cfs. The downstream Shelley gauge is proxy context because reservoir releases and intervening tributaries can change the reach flow.",
    distance: "About 10.4 river miles",
    time: "About 3-5 hours plus shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "dam_release", "access_uncertain"],
    safety: [
      "The BLM warns that rock gardens and boulders make the river generally unfloated below 100 cfs; at normal summer flows expect Class II and occasional Class III moves rather than flatwater throughout.",
      "Government Dam is immediately below a reservoir release; check current release changes, weather, cold water, and wood before launching. Wear a PFD and keep a conservative line around bridge and diversion structures.",
      "Use only the public Government Dam Road bridge staging and BLM Cutthroat Trout Campground access. The Shelley gauge is a downstream proxy, so treat 200-800 cfs as a planning band, not a reach-specific guarantee.",
    ],
    gauge: "13066000",
    gaugeName: "Blackfoot River near Shelley, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 100, idealMin: 200, idealMax: 800 },
    thresholdLabel: "BLM/American Whitewater Blackfoot guidance: 100 cfs minimum; typical summer flows 200-800 cfs",
    thresholdUrl: blackfootUpperThreshold,
    thresholdSupportUrl: blackfootUpperAccess,
    thresholdSourceStrength: "official",
    scoreEligibility: "planning",
    sourceUrl: blackfootUpperThreshold,
    sourceLabel: "American Whitewater Blackfoot Dam-to-Cutthroat reach record",
    mapUrl: blackfootUpperMap,
    additionalSourceLinks: [
      { label: "American Whitewater Government Dam-to-Cutthroat reach", url: blackfootUpperThreshold },
      { label: "BLM Blackfoot River access and flow guidance", url: blackfootUpperAccess },
      { label: "BLM Cutthroat Trout Campground", url: blackfootCutthroatAccess },
      { label: "USGS Blackfoot River near Shelley gauge (proxy)", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13066000/" },
      { label: "RiverFacts Government Dam-to-Cutthroat map", url: blackfootUpperMap },
      { label: "Blackfoot River Recreation.gov gateway", url: "https://www.recreation.gov/gateways/2072" },
    ],
    putIn: {
      name: "Government Dam Road Bridge Put-In",
      latitude: 43.00464,
      longitude: -111.71718,
      mileFromStart: 0,
      note: "Public bridge-side access immediately below Blackfoot Dam; use the parking/river access described by American Whitewater and confirm current release and road conditions.",
    },
    takeOut: {
      name: "Cutthroat Trout Campground Take-Out",
      latitude: 43.03499,
      longitude: -111.85029,
      mileFromStart: 10.4,
      note: "BLM campground with an undeveloped non-motorized floater take-out; pack out trash and confirm the current bank carry before committing.",
    },
    access: [
      {
        name: "Government Dam Road Bridge Put-In",
        latitude: 43.00464,
        longitude: -111.71718,
        mileFromStart: 0,
        note: "Public bridge-side staging below the dam; keep vehicles clear of the roadway and release infrastructure.",
      },
      {
        name: "Cutthroat Trout Campground Take-Out",
        latitude: 43.03499,
        longitude: -111.85029,
        mileFromStart: 10.4,
        note: "BLM campground and undeveloped floater access; three semi-developed campsites, vault toilet, and no fee are documented by BLM.",
      },
    ],
    camping:
      "Cutthroat Trout Campground is an endpoint BLM campground with three semi-developed sites, vault toilet, picnic tables, and an undeveloped floater take-out; use first-come rules and pack out trash.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Use Blackfoot River Road and the public Government Dam approach for a straightforward shuttle, checking seasonal road conditions and avoiding private or closed side roads.",
    permits:
      "No river permit is listed. Follow BLM campground rules, reservoir/dam safety postings, Idaho boating/PFD and invasive-species requirements, and any seasonal road closure notices.",
    watchFor: ["dam release changes", "rock gardens and shallow boulders", "cold water", "bridge structures", "wood", "100 cfs low-water floor"],
    season: [5, 6, 7, 8, 9],
    imageUrl: snakeImage,
    imageLabel: "Blackfoot / Snake River watershed context photograph",
  }),

  makeRoute({
    id: "blackfoot-river-cutthroat-trail-creek",
    riverId: "blackfoot-river-idaho",
    name: "Blackfoot River",
    reach: "Cutthroat Trout Campground to Trail Creek Bridge",
    region: "Southeast Idaho / Bingham",
    routeType: "recreational",
    summary:
      "A 13.6-mile Class II Blackfoot River float from the BLM Cutthroat Trout Campground to Trail Creek Bridge Campground, with documented campground access and intermediate BLM river sites.",
    statusText:
      "Planning-only proxy-gauge route. American Whitewater documents the Class II Cutthroat Run and a 440 cfs packraft descent; BLM identifies Cutthroat and Trail Creek Bridge as public non-motorized access/camping sites. The downstream Shelley gauge is proxy context and craft size matters at shallow 440 cfs conditions.",
    distance: "About 13.6 river miles",
    time: "About 4-6 hours plus shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "access_uncertain"],
    safety: [
      "American Whitewater's recent packraft report found 440 cfs low-runnable for small craft but unsuitable for larger rafts, canoes, or drift boats in shallow rocky/narrow sections. Match craft and crew to current conditions.",
      "The first miles are mostly Class I-II, then boulders, trees, and short Class II/III rapids increase maneuvering demands. Scout bridge approaches and any wood before committing downstream.",
      "Use the BLM Cutthroat Trout and Trail Creek Bridge campgrounds or other named BLM sites only; the BLM cautions that floating is not recommended below Trail Creek Bridge because the downstream reach turns Class IV and harder.",
    ],
    gauge: "13066000",
    gaugeName: "Blackfoot River near Shelley, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 100, idealMin: 200, idealMax: 800 },
    thresholdLabel: "BLM/American Whitewater Blackfoot guidance: 100 cfs minimum; typical summer flows 200-800 cfs",
    thresholdUrl: blackfootCutthroatThreshold,
    thresholdSupportUrl: blackfootUpperAccess,
    thresholdSourceStrength: "official",
    scoreEligibility: "planning",
    sourceUrl: blackfootCutthroatThreshold,
    sourceLabel: "American Whitewater Cutthroat Run reach record",
    mapUrl: blackfootCutthroatMap,
    additionalSourceLinks: [
      { label: "American Whitewater Cutthroat Run reach", url: blackfootCutthroatThreshold },
      { label: "American Whitewater 440 cfs packraft report", url: "https://www.americanwhitewater.org/content/River/view/river-detail/527/reports/cjHwkHiafzdRx5hK7ZO9a" },
      { label: "BLM Blackfoot River access and flow guidance", url: blackfootUpperAccess },
      { label: "BLM Cutthroat Trout Campground", url: blackfootCutthroatAccess },
      { label: "BLM Trail Creek Bridge Campground", url: "https://www.blm.gov/visit/trail-creek-bridge-campground" },
      { label: "USGS Blackfoot River near Shelley gauge (proxy)", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13066000/" },
      { label: "RiverFacts Cutthroat-to-Trail Creek map", url: blackfootCutthroatMap },
    ],
    putIn: {
      name: "Cutthroat Trout Campground Put-In",
      latitude: 43.03499,
      longitude: -111.85029,
      mileFromStart: 0,
      note: "BLM campground with an undeveloped non-motorized floater put-in; confirm the current bank carry and campsite/parking availability.",
    },
    takeOut: {
      name: "Trail Creek Bridge Campground Take-Out",
      latitude: 43.12990232,
      longitude: -111.91139056,
      mileFromStart: 13.6,
      note: "BLM-published Trail Creek Bridge Campground coordinate and undeveloped floater access. Exit here before the Class IV-and-harder Wolverine Canyon reach below Trail Creek Bridge.",
    },
    access: [
      {
        name: "Cutthroat Trout Campground Put-In",
        latitude: 43.03499,
        longitude: -111.85029,
        mileFromStart: 0,
        note: "BLM campground and undeveloped floater access; use the signed site and pack out trash.",
      },
      {
        name: "Trail Creek Bridge Campground Take-Out",
        latitude: 43.12990232,
        longitude: -111.91139056,
        mileFromStart: 13.6,
        note: "Public BLM campground/floater access at the BLM-published coordinate; do not continue into the downstream Class IV-V canyon without a separate expert plan.",
      },
    ],
    camping:
      "Cutthroat Trout Campground and Trail Creek Bridge Campground are public BLM endpoint campgrounds; use posted first-come rules, toilets/fire rings where provided, and pack out trash.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Blackfoot River Road and campground approaches provide the normal shuttle corridor. Confirm seasonal road access and avoid stopping in bridge travel lanes.",
    permits:
      "No river permit is listed. Follow BLM campground rules, Idaho boating/PFD and invasive-species requirements, and all posted road/river closures.",
    watchFor: ["craft-size limits at low flow", "shallow boulder gardens", "wood and trees", "bridge approaches", "Trail Creek Bridge mandatory exit", "downstream Class IV-V canyon"],
    season: [5, 6, 7, 8, 9],
    imageUrl: snakeImage,
    imageLabel: "Blackfoot / Snake River watershed context photograph",
  }),

  makeRoute({
    id: "blackfoot-river-wolverine-canyon",
    riverId: "blackfoot-river-idaho",
    name: "Blackfoot River",
    reach: "Trail Creek Bridge to Cedar Creek (Wolverine Canyon)",
    region: "Southeast Idaho / Bingham-Caribou",
    routeType: "whitewater",
    summary:
      "A remote 10.1-mile Class IV-V Blackfoot River canyon run from the BLM Trail Creek Bridge campground to the Cedar Creek exit, with steep continuous whitewater and difficult portage logistics.",
    statusText:
      "Planning-only expert route. American Whitewater documents the Trail Creek Bridge-to-Cedar Creek reach and ties it to the Blackfoot near Shelley gauge; its local flow note says 450 cfs was already difficult and the run becomes substantially harder as flow approaches 1,000 cfs. Trail Creek Bridge is a BLM campground with an undeveloped floater put-in, while Cedar Creek requires a steep hike to Blackfoot River Road.",
    distance: "About 10.1 river miles",
    time: "About 4-8 hours plus scouting, portage, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "fast_rise", "strainers", "portage", "remote", "private_banks", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the reach Class IV-V and describes consistent bony Class IV rapids, a steepest continuous section, poison ivy along the banks, and limited portage options. Treat this as an expert-only canyon with a full rescue and communication plan.",
      "The BLM Trail Creek Bridge campground provides the named put-in/take-out, but the downstream Cedar Creek exit is a beach above the rapid followed by a creek crossing and steep use trail to Blackfoot River Road. Confirm current trail condition, road access, and land boundaries before launching.",
      "BLM's current Blackfoot River corridor guidance says floating is not recommended below Trail Creek because of Class IV+ rapids. This card is therefore an expert-only exception to that public-float guidance, not a general continuation of the campground float; use the BLM recreation map to confirm the Trail Creek boundary, seasonal road status, and any current closure before committing to the canyon.",
      "Use the direct Blackfoot near Shelley gauge as a reach-linked planning input. American Whitewater reports 450 cfs as difficult and warns that conditions get more intense near 1,000 cfs; there is no hard upper-safe cutoff in the source, so on-site scouting and local advice control the go/no-go decision.",
    ],
    gauge: "13066000",
    gaugeName: "Blackfoot River near Shelley, ID",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 450, idealMin: 450, idealMax: 900 },
    thresholdLabel: "American Whitewater local cue: 450 cfs was already difficult; conditions become substantially harder as the gauge approaches 1,000 cfs",
    thresholdUrl: blackfootWolverineThreshold,
    thresholdSupportUrl: "https://www.riverbrain.com/flows?state=Idaho",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: blackfootWolverineThreshold,
    sourceLabel: "American Whitewater Wolverine Canyon reach and access description",
    mapUrl: blackfootWolverineAccess,
    additionalSourceLinks: [
      { label: "BLM Trail Creek Bridge campground and undeveloped floater access", url: blackfootWolverineAccess },
      { label: "BLM Blackfoot River corridor guidance", url: blackfootUpperAccess },
      { label: "BLM Blackfoot River recreation map", url: blackfootCorridorMap },
      { label: "RiverBrain Idaho gauge list linking Blackfoot Wolverine Canyon Run", url: "https://www.riverbrain.com/flows?state=Idaho" },
      { label: "USGS Blackfoot River near Shelley direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13066000/" },
      { label: "Bingham County seasonal Blackfoot River Road closure notice", url: "https://www.binghamid.gov/departments/publicworks/news/category/104/" },
      { label: "Cedar Creek geographic reference", url: blackfootWolverineMap },
    ],
    putIn: {
      name: "Trail Creek Bridge Campground Floater Put-In",
      latitude: 43.12990232,
      longitude: -111.91139056,
      mileFromStart: 0,
      note: "BLM campground with an undeveloped put-in/take-out for floaters; confirm seasonal road access, parking, and current riverbank conditions.",
    },
    takeOut: {
      name: "Cedar Creek Road Exit",
      latitude: 43.20881,
      longitude: -112.01386,
      mileFromStart: 10.1,
      note: "Approximate Cedar Creek mouth/river exit reference. American Whitewater describes beaching upstream of Cedar Creek, crossing the creek, and climbing use trails to Blackfoot River Road; this is a steep egress, not a developed ramp.",
    },
    access: [
      {
        name: "Trail Creek Bridge Campground Floater Put-In",
        latitude: 43.12990232,
        longitude: -111.91139056,
        mileFromStart: 0,
        note: "BLM-managed campground and undeveloped non-motorized boat access.",
      },
      {
        name: "Cedar Creek Road Exit",
        latitude: 43.20881,
        longitude: -112.01386,
        mileFromStart: 10.1,
        note: "Beach upstream of Cedar Creek, then creek crossing and steep use trail to Blackfoot River Road; mandatory planned exit for this card.",
      },
    ],
    camping:
      "Trail Creek Bridge campground has six semi-developed BLM sites and the put-in. No on-route canyon camping is assumed; Cedar Creek road access is seasonal and the road is subject to Bingham County winter closure rules.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Stage a vehicle at the Cedar Creek/Blackfoot River Road exit only after confirming the steep trail and legal parking, then shuttle to Trail Creek Bridge. Do not rely on the possible mid-reach side-road access for a normal shuttle.",
    permits:
      "Follow BLM campground rules, seasonal county road closures, Idaho boating/PFD and invasive-species requirements, and any current BLM or tribal access restrictions. Respect Sho-Ban lands where any approach crosses the reservation.",
    watchFor: ["continuous Class IV-V whitewater", "bony ledges", "poison ivy", "strainers", "Cedar Creek mandatory exit", "steep canyon egress", "seasonal road closures"],
    season: [5, 6, 7, 8],
    imageUrl: snakeImage,
    imageLabel: "Snake River watershed context photograph",
  }),

  makeRoute({
    id: "henrys-fork-hatchery-ford-upper-mesa",
    riverId: "henrys-fork-idaho",
    name: "Henrys Fork",
    reach: "Hatchery Ford to above Upper Mesa Falls (Sheep Falls Run)",
    region: "Eastern Idaho / Mesa Falls",
    routeType: "whitewater",
    summary:
      "A 6.9-mile Class III+(V) Henrys Fork canyon run with three portage/scout hazards and a mandatory boardwalk take-out above Upper Mesa Falls.",
    statusText:
      "Gauge-scored expert route. RiverBrain recommends 600 cfs minimum, 1,200 cfs average, and 2,200 cfs maximum on the direct Ashton gauge; American Whitewater and the Forest Service access map identify Sheep Falls, the Upper Mesa shelf, and the East Hatchery Ford/Upper Mesa access boundary.",
    distance: "About 6.9 river miles",
    time: "About 3-6 hours plus scouting and portage",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "fast_rise", "strainers", "portage", "mandatory_takeout", "access_uncertain"],
    safety: [
      "American Whitewater rates the reach Class III+(V) and identifies Sheep Falls, Drop No. 2, and The Ledge Hole as hazards. Scout from the designated road/trail and portage any feature that does not have a verified line for the party.",
      "Upper Mesa Falls is a mandatory take-out. The American Whitewater access note says to eddy out on the shelf and step onto the boardwalk; missing the exit can commit a party to a waterfall. East Hatchery Ford is the last developed take-out before the falls.",
      "Use the direct Ashton gauge only as a flow-planning input. RiverBrain's 600-2,200 cfs recommendation and the route's 1,600 cfs rapid note do not replace inspection of wood, hydraulics, weather, and take-out conditions.",
    ],
    gauge: "13046000",
    gaugeName: "Henrys Fork near Ashton, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 600, idealMin: 1000, idealMax: 2200, tooHigh: 3000 },
    thresholdLabel: "RiverBrain recommendation 600 cfs minimum / 1,200 cfs average / 2,200 cfs maximum, with American Whitewater's 1,000-3,000 cfs runnable context",
    thresholdUrl: henrysMesaThreshold,
    thresholdSupportUrl: henrysMesaAwAccess,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: henrysMesaThreshold,
    sourceLabel: "RiverBrain Hatchery Ford to Above Upper Mesa Falls flow recommendations",
    mapUrl: henrysMesaAccessMap,
    additionalSourceLinks: [
      { label: "American Whitewater Upper Mesa Falls take-out hazard", url: henrysMesaAwAccess },
      { label: "Henrys Fork Foundation upper-river access map", url: henrysMesaAccessMap },
      { label: "How's Your River Hatchery Ford to Upper Mesa Falls reach", url: "https://www.howsyourriver.com/runs/hatchery-ford-to-above-upper-mesa-falls-henrys-fork-id" },
      { label: "USGS Henrys Fork near Ashton direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13046000/" },
      { label: "Fremont County Mesa Falls scenic access roads", url: "https://www.fremontcountyid.gov/192/Scenic-Drives" },
    ],
    putIn: {
      name: "East Hatchery Ford Boating Site Put-In",
      latitude: 44.21686,
      longitude: -111.43128,
      mileFromStart: 0,
      note: "Caribou-Targhee Forest Service concrete-block ramp on FS Road 351; verify seasonal road, parking, and launch conditions.",
    },
    takeOut: {
      name: "Upper Mesa Falls Boardwalk Take-Out",
      latitude: 44.18797,
      longitude: -111.32995,
      mileFromStart: 6.9,
      note: "Fee-area boardwalk shelf immediately above Upper Mesa Falls; eddy out and exit before the falls. This is not a downstream landing option.",
    },
    access: [
      {
        name: "East Hatchery Ford Boating Site Put-In",
        latitude: 44.21686,
        longitude: -111.43128,
        mileFromStart: 0,
        note: "Developed Forest Service ramp and parking; last formal launch before the canyon run.",
      },
      {
        name: "Upper Mesa Falls Boardwalk Take-Out",
        latitude: 44.18797,
        longitude: -111.32995,
        mileFromStart: 6.9,
        note: "Scouted boardwalk exit above the falls; confirm fee-area opening and the eddy before launch.",
      },
    ],
    camping:
      "Use developed Forest Service or Teton Valley lodging/campground options near the endpoints; no on-route canyon camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage a vehicle at the Upper Mesa Falls fee-area parking and shuttle to East Hatchery Ford. Walk the boardwalk and scout the take-out before launching.",
    permits:
      "Follow Forest Service site/fee rules, Idaho AIS/PFD requirements, Mesa Falls closure boundaries, and all current road, fire, and water-safety notices.",
    watchFor: ["Sheep Falls", "Drop No. 2", "The Ledge Hole", "Upper Mesa Falls shelf/boardwalk exit", "wood and cold water"],
    season: [5, 6, 7, 8],
    imageUrl: henrysImage,
    imageLabel: "Henrys Fork / Henrys Lake watershed context photograph",
  }),

  makeRoute({
    id: "teton-river-dam-site-teton-forks",
    riverId: "teton-river-idaho",
    name: "Teton River",
    reach: "Teton Dam Site to Teton Forks",
    region: "Eastern Idaho / Teton River plain",
    routeType: "whitewater",
    summary:
      "A 6.9-mile Class II-III Teton River float from the Teton Dam site to the Teton Forks/2750 E bridge corridor, with repeated 500 cfs trip-report context and a named downstream parking area.",
    statusText:
      "Planning-only threshold route. American Whitewater and How's Your River identify the 6.9-mile reach, while Idaho Fish and Game and the USBR management plan document the Teton Dam access corridor. The upper launch road is gated and requires a several-hundred-yard carry; the St. Anthony gauge is a downstream proxy, so the 500 cfs trip-report cue is not a go/no-go score.",
    distance: "About 6.9 river miles",
    time: "About 3-5 hours plus the launch carry and shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates the reach Class II-III. Trip reports describe only a few mild rapids around 500 cfs, but changing wood, bridge hydraulics, cold water, and current channel conditions still require a moving-water-capable craft and worn PFD.",
      "The Teton Dam launch road is gated by the Bureau of Reclamation; the documented approach requires hiking several hundred yards from the gate to the water. Confirm current gate status, lawful parking, the carry route, and the remnant ramp before committing.",
      "The 500 cfs figure comes from repeated American Whitewater trip reports, not a published threshold. Use the downstream St. Anthony gauge only as general context; trend, debris, weather, and the on-site channel inspection override it.",
      "Take out on river right just after the 2750 E bridge where the trip report describes good parking. Confirm the current landing, private-bank boundaries, and a safe vehicle staging point before launch; do not continue into the next Teton section without a new plan.",
    ],
    gauge: "13055000",
    gaugeName: "Teton River near St. Anthony, ID",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 500, idealMin: 500 },
    thresholdLabel:
      "American Whitewater trip-report cue: approximately 500 cfs was described as a comfortable learning flow; no hard upper/lower cutoff published",
    thresholdUrl: tetonDamAwReach,
    thresholdSupportUrl: "https://www.howsyourriver.com/runs/teton-dam-site-to-teton-forks-teton-id",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: tetonDamAwReach,
    sourceLabel: "American Whitewater Teton Dam site-to-Teton Forks reach record",
    mapUrl: tetonDamAccessSource,
    additionalSourceLinks: [
      { label: "American Whitewater Teton Dam reach trip reports", url: "https://www.americanwhitewater.org/content/River/view/river-detail/643/reports" },
      { label: "How's Your River Teton Dam site-to-Teton Forks overview", url: "https://www.howsyourriver.com/runs/teton-dam-site-to-teton-forks-teton-id" },
      { label: "Idaho Fish and Game Teton Dam boating access site", url: tetonDamAccessSource },
      { label: "USBR Teton River Canyon management plan", url: tetonDamManagementPlan },
      { label: "BLM/IDFG Teton River Canyon map", url: tetonCanyonGuide },
      { label: "USGS Teton River near St. Anthony proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13055000/" },
      { label: "Friends of the Teton River recreation map and access rules", url: "https://www.tetonwater.org/get-out/recreation-map/" },
    ],
    putIn: {
      name: "Teton Dam Site Boat Ramp / Carry-In",
      latitude: 43.9097213745117,
      longitude: -111.538330078125,
      mileFromStart: 0,
      note: "Named Teton Dam site access anchor. The USBR gate may block vehicles; plan the documented several-hundred-yard hike/carry and verify current ramp condition, parking, and public access before launching.",
    },
    takeOut: {
      name: "2750 E Bridge River-Right Take-Out",
      latitude: 43.9122009277344,
      longitude: -111.616302490234,
      mileFromStart: 6.9,
      note: "American Whitewater trip report places the landing just downstream of the 2750 E bridge on river right with good take-out parking. Confirm the current shoreline carry, bridge traffic, and lawful staging.",
    },
    access: [
      {
        name: "Teton Dam Site Boat Ramp / Carry-In",
        latitude: 43.9097213745117,
        longitude: -111.538330078125,
        mileFromStart: 0,
        note: "USBR/IDFG dam-site access corridor; vehicle gate and several-hundred-yard carry require current field confirmation.",
      },
      {
        name: "2750 E Bridge River-Right Take-Out",
        latitude: 43.9122009277344,
        longitude: -111.616302490234,
        mileFromStart: 6.9,
        note: "Named trip-report endpoint; verify legal parking and a safe river-right landing before committing.",
      },
    ],
    camping:
      "The Teton Dam site has dispersed day-use/camping history in the USBR management materials, but no guaranteed campsite is assumed for this route. Confirm current designated camping, sanitation, fire, and gate rules before relying on an overnight stay.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage the 2750 E bridge vehicle first, then drive to the Teton Dam site and confirm the gate/carry. Allow extra time for the gated road, bridge traffic, and any seasonal road or private-property restrictions.",
    permits:
      "Follow Idaho AIS/PFD requirements, Idaho Fish and Game access-site rules, USBR/BLM gate and camping notices, private-bank boundaries, and current road, fire, and closure conditions.",
    watchFor: ["Class II-III rapids", "gated dam-site road", "several-hundred-yard launch carry", "cold water", "wood and bridge hydraulics", "2750 E bridge landing"],
    season: [5, 6, 7, 8],
    imageUrl: tetonImage,
    imageLabel: "Teton River southeast Idaho corridor photograph",
  }),

  makeRoute({
    id: "teton-river-lower-canyon",
    riverId: "teton-river-idaho",
    name: "Teton River",
    reach: "Lower Canyon: Felt Hydro to Spring Hollow",
    region: "Eastern Idaho / Teton Canyon",
    routeType: "whitewater",
    summary:
      "A 6.1-mile Class III+(IV) canyon run below Felt Hydro to Spring Hollow, with a documented portageable Class IV rapid and five large Class III rapids.",
    statusText:
      "Planning-only lower-canyon route. American Whitewater and the BLM/IDFG canyon guide document the rapids and isolated canyon, while the practical flow cue uses the downstream St. Anthony gauge as a proxy and the Spring Hollow landing must be checked because the historic ramp has changed.",
    distance: "About 6.1 river miles",
    time: "About 3-5 hours plus scouting, portage, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "fast_rise", "strainers", "portage", "remote", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the Lower Canyon Class III+(IV), with a Class IV rapid near Badger Creek that can be portaged and a series of large Class III rapids. The BLM/IDFG guide warns of steep canyon walls, limited cell service, and little opportunity to hike out.",
      "Launch below Felt Hydro only after confirming the river-right access road and lawful parking. Scout or portage the Badger Creek rapid and take out at Spring Hollow; do not assume the old reservoir ramp or private banks remain usable.",
      "Dreamflows lists a 500-2,000 cfs Teton near Driggs operating band; the St. Anthony gauge includes tributaries below the reach and is proxy context only. Current flow, wood, weather, and on-site inspection override this planning cue.",
    ],
    gauge: "13055000",
    gaugeName: "Teton River near St. Anthony, ID",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 500, idealMin: 500, idealMax: 2000 },
    thresholdLabel: "Dreamflows Teton near Driggs trigger band 500-2,000 cfs retained as a planning cue; St. Anthony is a downstream proxy",
    thresholdUrl: "https://www.dreamflows.com/triggerLevels.php",
    thresholdSupportUrl: lowerTetonAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: lowerTetonAwReach,
    sourceLabel: "American Whitewater Lower Teton Canyon reach",
    mapUrl: tetonCanyonGuide,
    additionalSourceLinks: [
      { label: "BLM/IDFG Teton River Canyon map and access guide", url: tetonCanyonGuide },
      { label: "Teton River Canyon capacity and access environmental assessment", url: tetonManagementPlan },
      { label: "Dreamflows Idaho trigger levels", url: "https://www.dreamflows.com/triggerLevels.php" },
      { label: "USGS Teton River near St. Anthony proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13055000/" },
      { label: "Spring Hollow IDFG boat-launch listing", url: "https://www.boatlaunchmap.com/ramps/spring-hollow-idaho-boat-launch-49193" },
    ],
    putIn: {
      name: "Felt Hydro Below-Powerhouse Put-In",
      latitude: 43.90758,
      longitude: -111.28473,
      mileFromStart: 0,
      note: "River-right Felt Hydro access-road staging point below the powerhouse; use only a verified lawful launch and carry route.",
    },
    takeOut: {
      name: "Spring Hollow (South of France) Boat Access",
      latitude: 43.94565,
      longitude: -111.35957,
      mileFromStart: 6.1,
      note: "Public Spring Hollow access near the canyon exit; confirm the current ramp/shoreline condition because older descriptions refer to a dry historic reservoir ramp.",
    },
    access: [
      {
        name: "Felt Hydro Below-Powerhouse Put-In",
        latitude: 43.90758,
        longitude: -111.28473,
        mileFromStart: 0,
        note: "Below-powerhouse access-road staging point; verify lawful parking and shoreline carry.",
      },
      {
        name: "Badger Creek Portage/Scout",
        latitude: 43.925,
        longitude: -111.326,
        mileFromStart: 2.7,
        note: "Approximate canyon rapid/portage area near Badger Creek; scout from the river and do not use private banks without permission.",
      },
      {
        name: "Spring Hollow (South of France) Boat Access",
        latitude: 43.94565,
        longitude: -111.35957,
        mileFromStart: 6.1,
        note: "Public developed ramp/landing; current facility condition and gate status require confirmation.",
      },
    ],
    camping:
      "No on-route camping is assumed in the canyon. Use a lawful Teton Valley or Teton Dam-area basecamp and plan for self-rescue.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage a vehicle at Spring Hollow and a separate vehicle at the Felt Hydro rim/road access. The canyon is not a reliable walk-out corridor, and the Badger Creek rapid may require a planned portage.",
    permits:
      "Follow BLM/IDFG access rules, Idaho boating/PFD and invasive-species requirements, posted private-land boundaries, and current road, fire, or water-safety notices.",
    watchFor: ["Badger Creek Class IV rapid", "five large Class III rapids", "wood and strainers", "little cell service", "Spring Hollow landing condition", "steep canyon walls"],
    season: [5, 6, 7, 8, 9],
    imageUrl: tetonImage,
    imageLabel: "Teton River southeast Idaho corridor photograph",
  }),

  makeRoute({
    id: "teton-river-highway-33-spring-hollow",
    riverId: "teton-river-idaho",
    name: "Teton River",
    reach: "Highway 33 Bridge to Spring Hollow (South of France)",
    region: "Eastern Idaho / Teton Canyon",
    routeType: "whitewater",
    summary:
      "A 4.3-mile Class IV-V canyon run from the Highway 33 bridge to Spring Hollow, with a direct Driggs-area gauge and a published 300-2,000 cfs planning band.",
    statusText:
      "Gauge-scored expert route. American Whitewater and How's Your River tie the reach to the Teton River above South Leigh Creek gauge, while the hydrography-aligned Highway 33 launch and Spring Hollow access support the scoped itinerary. The Felt Hydro exit still requires a mandatory above-dam take-out, steep hike, or portage plan.",
    distance: "About 4.3 river miles",
    time: "About 2-5 hours plus scouting, portage, and canyon exit planning",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "fast_rise", "strainers", "portage", "remote", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates this reach Class IV-V with numerous advanced rapids, a deep isolated canyon, and little opportunity to hike out. The BLM/IDFG guide warns that Spring Hollow-to-Teton Dam has steep canyon walls, little cell service, and self-rescue expectations; treat the upper Highway 33-to-Felt segment as expert-only.",
      "Exit on river right above the Felt Hydroelectric Project. Do not run the dam or the Boneyard rapid without a specific expert plan; confirm the above-dam take-out, steep jeep-trail hike, or lawful portage before launch.",
      "300 cfs is approximately the minimum; about 800 cfs at the Driggs gauge is described as fun, and 2,000 cfs is the published upper planning cue. Flow, wood, weather, snowmelt, and changing access can make the reach unsafe outside an on-site inspection.",
    ],
    gauge: "13052200",
    gaugeName: "Teton River above South Leigh Creek near Driggs, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 300, idealMin: 300, idealMax: 2000, tooHigh: 2000 },
    thresholdLabel: "How's Your River/American Whitewater Teton guidance: approximately 300 cfs minimum, about 800 cfs fun at Driggs, and 2,000 cfs upper planning cue",
    thresholdUrl: tetonThreshold,
    thresholdSupportUrl: tetonAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: tetonCanyonGuide,
    sourceLabel: "BLM/Idaho Fish and Game Teton River Canyon guide",
    mapUrl: tetonCanyonGuide,
    additionalSourceLinks: [
      { label: "How's Your River Teton reach and threshold notes", url: tetonThreshold },
      { label: "American Whitewater Highway 33 to Spring Hollow reach", url: tetonAwReach },
      { label: "BLM/IDFG Teton River Canyon map and access guide", url: tetonCanyonGuide },
      { label: "Teton River Canyon capacity and access environmental assessment", url: tetonManagementPlan },
      { label: "USGS Teton River above South Leigh Creek near Driggs gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13052200/" },
      { label: "Spring Hollow IDFG boat-launch listing", url: "https://www.boatlaunchmap.com/ramps/spring-hollow-idaho-boat-launch-49193" },
    ],
    putIn: {
      name: "Highway 33 Bridge Teton Put-In",
      latitude: 43.90975,
      longitude: -111.28564,
      mileFromStart: 0,
      note: "Highway 33 bridge staging coordinate aligned to the Teton River flowline; verify the current legal launch, parking, and private-land boundaries before carrying boats to the river.",
    },
    takeOut: {
      name: "Spring Hollow (South of France) Boat Access",
      latitude: 43.94555,
      longitude: -111.35945,
      mileFromStart: 4.3,
      note: "Developed Spring Hollow public access near the canyon exit; use the signed ramp and confirm the route's mandatory Felt Hydro above-dam exit before continuing downstream.",
    },
    access: [
      {
        name: "Highway 33 Bridge Teton Put-In",
        latitude: 43.90975,
        longitude: -111.28564,
        mileFromStart: 0,
        note: "Approximate bridge access; legal staging and shoreline carry must be confirmed on site.",
      },
      {
        name: "Felt Hydro Above-Dam Exit",
        latitude: 43.9075,
        longitude: -111.2846,
        mileFromStart: 2.3,
        note: "Mandatory river-right exit above Felt Dam; BLM/AW describe a steep jeep-trail hike or portage and no casual downstream continuation.",
      },
      {
        name: "Spring Hollow (South of France) Boat Access",
        latitude: 43.94555,
        longitude: -111.35945,
        mileFromStart: 4.3,
        note: "Public developed ramp and canyon access; verify current gate, parking, and launch conditions.",
      },
    ],
    camping:
      "No on-route camping is assumed in the isolated canyon. Use a lawful Teton Valley or Teton Dam-area basecamp and carry emergency equipment for a self-rescue scenario.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Arrange a full shuttle between the approximate Highway 33 staging point and Spring Hollow, with a separate vehicle/exit plan at Felt Hydro if the party is taking out above the dam. The canyon is not a reliable walk-out corridor.",
    permits:
      "Follow BLM/IDFG access rules, Idaho boating/PFD and invasive-species requirements, posted private-land boundaries, and any current road, fire, or water-safety closure. Outfitters may also be subject to Idaho river-section limits.",
    watchFor: ["Class IV-V canyon rapids", "Felt Dam mandatory take-out", "Boneyard and powerplant hazards", "wood and strainers", "little cell service", "steep hike/portage"],
    season: [5, 6, 7, 8, 9],
    imageUrl: tetonImage,
    imageLabel: "Teton River southeast Idaho corridor photograph",
  }),

  makeRoute({
    id: "bitch-creek-coyote-meadows-highway-32",
    riverId: "bitch-creek-idaho",
    name: "Bitch Creek",
    reach: "Coyote Meadows to Highway 32 Bridge",
    region: "Eastern Idaho / Teton Canyon",
    routeType: "whitewater",
    summary:
      "A 13.6-mile Class III-IV upper Bitch Creek run from the Coyote Meadows confluence area to the Highway 32 bridge, upstream of the isolated canyon section.",
    statusText:
      "Planning-only threshold route. American Whitewater identifies the Coyote Meadows-to-Highway 32 reach as Class III-IV but labels coordinates very approximate and warns the linked Teton gauge drains roughly 25 times the upper reach; the Idaho Upper Snake resource inventory supplies a conservative 500 cfs planning cue on the linked Teton reference, not a direct Bitch Creek measurement.",
    distance: "About 13.6 river miles",
    time: "About 5-8 hours including remote access, scouting, wood checks, and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "remote", "access_uncertain", "portage"],
    safety: [
      "American Whitewater rates this upper reach Class III-IV and explicitly says its latitude/longitude data are very approximate. Treat the Coyote Meadows anchor as a planning area, not a surveyed ramp, and confirm current road, trail, parking, and river-side carry before committing.",
      "The linked Teton gauge drains about 876 square miles while the upper Bitch Creek put-in drains about 35 square miles. Use the 500 cfs inventory cue only as a conservative watershed reference, inspect actual local stage, and do not infer a direct reach flow from the downstream gauge.",
      "Remote canyon wood, cold water, changing spring runoff, and limited exits require a solid Class III-IV crew, rescue equipment, satellite communication, and a daylight plan with a conservative turn-around or take-out decision at Highway 32.",
    ],
    gauge: "13055000",
    gaugeName: "Teton River near St. Anthony, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 500, idealMin: 500 },
    thresholdLabel: "Idaho Upper Snake resource inventory: approximately 500 cfs planning cue for the Coyote Meadows Run; linked Teton gauge is a highly mismatched downstream proxy",
    thresholdUrl: upperBitchCreekFlowGuide,
    thresholdSupportUrl: upperBitchCreekAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: upperBitchCreekAwReach,
    sourceLabel: "American Whitewater Upper Bitch Creek Coyote Meadows reach record",
    mapUrl: upperBitchCreekAwReach,
    additionalSourceLinks: [
      { label: "American Whitewater Upper Bitch Creek reach record", url: upperBitchCreekAwReach },
      { label: "Idaho Upper Snake River whitewater resource inventory", url: upperBitchCreekFlowGuide },
      { label: "American Whitewater Bitch Creek canyon access/gauge context", url: bitchCreekAwReach },
      { label: "USBR Teton River Canyon recreation management plan", url: bitchCreekAccessPlan },
      { label: "ITD State Highway 32 Bitch Creek Bridge project", url: bitchCreekBridgeProject },
      { label: "USGS Teton River near St. Anthony proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13055000/" },
    ],
    putIn: {
      name: "Coyote Meadows / Upper Bitch Creek Confluence Area",
      latitude: 43.99548,
      longitude: -111.00578,
      mileFromStart: 0,
      note: "Approximate American Whitewater Coyote Meadows confluence-area anchor. Confirm seasonal road/trail access, legal parking, and the actual river-side carry; AW warns coordinates are very approximate.",
    },
    takeOut: {
      name: "Highway 32 Bitch Creek Bridge",
      latitude: 43.9406,
      longitude: -111.18,
      mileFromStart: 13.6,
      note: "Named American Whitewater bridge endpoint and start of the separate Bitch Creek Canyon card. Confirm legal shoulder parking and the downstream mandatory take-out boundary before launching.",
    },
    access: [
      {
        name: "Coyote Meadows / Upper Bitch Creek Confluence Area",
        latitude: 43.99548,
        longitude: -111.00578,
        mileFromStart: 0,
        note: "Approximate remote access-area anchor; current road, trail, carry, and public-land confirmation required.",
        segmentKind: "transition",
      },
      {
        name: "Highway 32 Bitch Creek Bridge",
        latitude: 43.9406,
        longitude: -111.18,
        mileFromStart: 13.6,
        note: "Bridge-area endpoint above the isolated canyon run; verify traffic-safe staging, parking, and river-side landing.",
      },
    ],
    camping:
      "No on-route camping is assumed. Use a lawful Teton Valley or Teton Canyon basecamp and carry an emergency overnight contingency for a remote, wood-sensitive reach.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Arrange a full daylight shuttle between the approximate Coyote Meadows access area and Highway 32. Roads may be seasonal and the route has limited reliable exits; do not launch without a confirmed take-out vehicle and communications plan.",
    permits:
      "No river permit is listed. Follow Idaho boating/PFD and invasive-species requirements, Caribou-Targhee/USBR/BLM access restrictions, private-land boundaries, bridge safety rules, and current road, fire, and closure notices.",
    watchFor: ["approximate upper access", "Class III-IV basalt rapids", "wood and strainers", "cold spring runoff", "limited exits", "Highway 32 mandatory endpoint"],
    season: [5, 6, 7],
    imageUrl: tetonImage,
    imageLabel: "Teton River southeast Idaho corridor photograph",
  }),

  makeRoute({
    id: "bitch-creek-highway-32-teton",
    riverId: "bitch-creek-idaho",
    name: "Bitch Creek",
    reach: "Highway 32 Bridge to Teton River",
    region: "Eastern Idaho / Teton Canyon",
    routeType: "whitewater",
    summary:
      "An 8.2-mile Class IV(V) Bitch Creek canyon run from the Highway 32 bridge to the Teton confluence, with a roughly 13-mile listed exit to the downstream take-out island.",
    statusText:
      "Planning-only expert route. American Whitewater documents 1,200-4,000 cfs runnable shoulders on the downstream Teton gauge, technical Class III-IV water with two Class IV-V rapids, and severe wood/isolation consequences. The USBR identifies a steep user-defined Bitch Creek trail and limited parking, so access and rescue logistics require current field confirmation.",
    distance: "About 8.2 river miles to the Teton confluence; roughly 13 miles to the listed downstream take-out",
    time: "About 5-9 hours plus scouting, portage, and remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "portage", "access_uncertain", "mandatory_takeout"],
    safety: [
      "American Whitewater rates the canyon Class IV(V) and names Driscoll's Drop, Hansen's Half Mile, Z-slot, and Balls to the Wall. Use a proven Class IV crew, helmets, rescue equipment, and a craft suited to technical basalt rapids.",
      "Wood can make the reach a full grade harder at high flows, and the canyon has long isolated sections with limited exits. Scout from the rim/road where possible, portage early, and carry satellite communication and an emergency overnight kit.",
      "Use 1,200-4,000 cfs only as the American Whitewater/Teton gauge correlation. A 1,500 cfs trip report described Class IV minimum conditions; current wood, weather, cold water, and crew skill override any threshold.",
      "The Highway 32 put-in is reached by a steep user-defined trail and the downstream parking is small/undefined. Confirm legal shoulder parking, safe boat carry, Teton confluence routing, and the downstream island take-out before committing.",
    ],
    gauge: "13055000",
    gaugeName: "Teton River near St. Anthony, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1200, idealMin: 1500, idealMax: 2500, tooHigh: 4000 },
    thresholdLabel: "American Whitewater correlation: 1,200 cfs low runnable shoulder, 1,500 cfs Class IV trip-report context, 4,000 cfs high runnable shoulder; downstream Teton gauge is proxy",
    thresholdUrl: bitchCreekAwReach,
    thresholdSupportUrl: bitchCreekDreamflows,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: bitchCreekAwReach,
    sourceLabel: "American Whitewater Bitch Creek Canyon reach record",
    mapUrl: bitchCreekAccessPlan,
    additionalSourceLinks: [
      { label: "American Whitewater Bitch Creek 2023 trip report", url: "https://www.americanwhitewater.org/content/River/view/river-detail/524/reports/LRGlSNM07SBe6yiTkAjG4" },
      { label: "Dreamflows Idaho Bitch Creek cross-listing", url: bitchCreekDreamflows },
      { label: "USBR Teton River Canyon recreation management plan", url: bitchCreekAccessPlan },
      { label: "ITD State Highway 32 Bitch Creek Bridge project", url: bitchCreekBridgeProject },
      { label: "BLM/IDFG Teton River Canyon map and access guide", url: tetonCanyonGuide },
      { label: "USGS Teton River near St. Anthony proxy gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13055000/" },
    ],
    putIn: {
      name: "Highway 32 Bitch Creek Bridge Put-In",
      latitude: 43.9406,
      longitude: -111.18,
      mileFromStart: 0,
      note: "American Whitewater access anchor at the Highway 32 bridge; USBR describes a steep user-defined trail to the river. Confirm legal parking and a safe boat carry before launching.",
    },
    takeOut: {
      name: "Teton River Downstream Island Take-Out",
      latitude: 43.9456,
      longitude: -111.359,
      mileFromStart: 13,
      note: "American Whitewater's downstream take-out near the Teton River island split; confirm the current landing, parking, and private-property boundaries before entering the canyon.",
    },
    access: [
      {
        name: "Highway 32 Bitch Creek Bridge Put-In",
        latitude: 43.9406,
        longitude: -111.18,
        mileFromStart: 0,
        note: "Steep user-defined trail from SR 32 to the river; verify shoulder parking, traffic safety, and the carry to water.",
      },
      {
        name: "Teton River Downstream Island Take-Out",
        latitude: 43.9456,
        longitude: -111.359,
        mileFromStart: 13,
        note: "Small/undefined parking and downstream island landing described in the Teton canyon access materials; confirm current public access and carry-out.",
      },
    ],
    camping:
      "No on-route camping is assumed in the isolated canyon. Use a lawful Teton Valley or Teton Dam-area basecamp and carry a complete emergency/overnight contingency kit.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Arrange a full daylight shuttle between the Highway 32 bridge and the downstream Teton island landing. Roads are remote and the canyon is not a reliable walk-out corridor; inspect the access trail and parking before launching.",
    permits:
      "No river permit is listed. Follow Idaho boating/PFD and invasive-species requirements, ITD bridge/road safety rules, USBR/BLM/IDFG access restrictions, private-land boundaries, and current closure or fire notices.",
    watchFor: ["Driscoll's Drop", "Hansen's Half Mile", "Z-slot", "Balls to the Wall", "wood and strainers", "steep canyon and limited exits", "Teton confluence island take-out"],
    season: [5, 6, 7],
    imageUrl: tetonImage,
    imageLabel: "Teton River southeast Idaho corridor photograph",
  }),

  makeRoute({
    id: "big-wood-river-baker-north-fork",
    riverId: "big-wood-river-idaho",
    name: "Big Wood River",
    reach: "Baker Creek to North Fork",
    region: "Central Idaho / Wood River Valley",
    routeType: "whitewater",
    summary:
      "A 9.1-mile Class II Big Wood River float from Baker Creek to the North Fork, with a direct Ketchum gauge correlation and named American Whitewater endpoint pair.",
    statusText:
      "Gauge-scored threshold route. American Whitewater publishes a direct Big Wood near Ketchum correlation of 400-800 cfs and exact Baker Creek/North Fork access points; spring runoff, changing wood, cold water, and private or facility-side access still require a same-day check.",
    distance: "About 9.1 river miles",
    time: "About 3-5 hours plus shuttle and scouting",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates this upper reach Class II and describes it as a scenic high-water float. Use a stable boat, PFD, cold-water protection, and a crew able to manage moving water and wood during runoff.",
      "The 400-800 cfs band is the American Whitewater reach correlation on the direct Big Wood near Ketchum gauge, not a guarantee that every bend is clear. Current wood, weather, trend, and bridge or diversion hydraulics override the numeric score.",
      "The Baker Creek launch and North Fork landing are named reach access anchors rather than guaranteed ramps. Confirm lawful parking, shoreline carry, private-frontage boundaries, and a daylight shuttle before loading.",
    ],
    gauge: "13135500",
    gaugeName: "Big Wood River near Ketchum, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 400, idealMin: 400, idealMax: 800, tooHigh: 800 },
    thresholdLabel: "American Whitewater reach correlation: 400-800 cfs on the direct Big Wood near Ketchum gauge",
    thresholdUrl: bigWoodUpperAwReach,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13135500/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: bigWoodUpperAwReach,
    sourceLabel: "American Whitewater Big Wood Baker Creek-to-North Fork reach record",
    mapUrl: bigWoodUpperAwReach,
    additionalSourceLinks: [
      { label: "USGS Big Wood River near Ketchum gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13135500/" },
      { label: "Ketchum river gauge information", url: "https://www.ketchumidaho.org/234/River-Gauge-Data" },
      { label: "Ketchum Big Wood River public access map", url: bigWoodAccessMap },
    ],
    putIn: {
      name: "Baker Creek access",
      latitude: 43.784896,
      longitude: -114.556579,
      mileFromStart: 0,
      note: "American Whitewater maps the upper reach launch at Baker Creek. Confirm the pullout, parking, private-frontage boundaries, and the carry to water before unloading.",
    },
    takeOut: {
      name: "North Fork access",
      latitude: 43.784191,
      longitude: -114.419017,
      mileFromStart: 9.1,
      note: "American Whitewater maps the take-out near the North Fork. Confirm the landing, parking, and downstream continuation boundary on site.",
    },
    camping:
      "Use a lawful Wood River Valley campground or basecamp. This is a day float with no on-route camping assumption.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "The Wood River corridor provides a manageable daylight shuttle, but spring traffic, private frontage, and changing access conditions require staging both endpoints before launch.",
    permits:
      "No river permit is listed by American Whitewater. Follow Idaho boating/PFD and invasive-species requirements, current land-manager access rules, fire restrictions, and posted road notices.",
    watchFor: ["spring runoff", "wood and strainers", "cold water", "private frontage", "North Fork take-out boundary"],
    season: [4, 5, 6],
    imageUrl: henrysImage,
    imageLabel: "Central Idaho river context photograph; upper Big Wood endpoints not depicted",
  }),
  makeRoute({
    id: "big-wood-river-chocolate-gulch-lake-creek",
    riverId: "big-wood-river-idaho",
    name: "Big Wood River",
    reach: "Chocolate Gulch Bridge to Lake Creek Bridge",
    region: "Central Idaho / Wood River Valley",
    routeType: "whitewater",
    summary:
      "A 3.6-mile Class II-III Big Wood River spring-runoff reach from the Highway 75 Chocolate Gulch bridge to the Lake Creek Trail Bridge, with a direct Ketchum gauge and named access pair.",
    statusText:
      "Gauge-scored threshold route. American Whitewater correlates the reach to Big Wood River near Ketchum and publishes 400-800 cfs runnable shoulders. Spring runoff, bank strainers, bridge traffic, and changing trail access still require same-day inspection.",
    distance: "About 3.6 river miles",
    time: "About 2-4 hours plus shuttle and scouting",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "American Whitewater rates this reach Class II-III and notes spring runoff, eddy-access waves, and bank-lined strainer hazards. Wear PFDs, use a boat suited to moving water, and scout the bridge and bend features before launching.",
      "The 400-800 cfs band is the American Whitewater reach correlation on the direct Ketchum gauge, not a guarantee of clear wood or a safe line. Current runoff, bridge hydraulics, weather, and crew skill override the numeric score.",
      "Chocolate Gulch is adjacent to Highway 75 traffic, while the Lake Creek Trail Bridge is a trail/foot-access landing. Confirm legal parking, the carry to the water, current BLM/trail conditions, and a vehicle shuttle before launch.",
    ],
    gauge: "13135500",
    gaugeName: "Big Wood River near Ketchum, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 400, idealMin: 400, idealMax: 800, tooHigh: 800 },
    thresholdLabel: "American Whitewater reach correlation: 400 cfs low runnable shoulder and 800 cfs high runnable shoulder on the direct Ketchum gauge",
    thresholdUrl: bigWoodAwReach,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13135500/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: bigWoodAwReach,
    sourceLabel: "American Whitewater Big Wood Chocolate Gulch-to-Lake Creek reach record",
    mapUrl: bigWoodAccessMap,
    additionalSourceLinks: [
      { label: "Ketchum Big Wood River public access map", url: bigWoodAccessMap },
      { label: "USGS Big Wood River near Ketchum gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13135500/" },
      { label: "BLM Lake Creek Trailhead", url: bigWoodLakeCreekTrailhead },
      { label: "Ketchum river gauge information", url: "https://www.ketchumidaho.org/234/River-Gauge-Data" },
      { label: "Idaho Fish and Game Big Wood River access and fishing-water listing", url: "https://idfg.idaho.gov/ifwis/fishingplanner/water/1149052428631" },
      { label: "Idaho Highway 75 project and current bridge/traffic notices", url: "https://itd.idaho.gov/project/idaho75/" },
    ],
    putIn: {
      name: "Chocolate Gulch Bridge / Highway 75 Put-In",
      latitude: 43.770578,
      longitude: -114.407092,
      mileFromStart: 0,
      note: "American Whitewater put-in at the Highway 75 Chocolate Gulch bridge; confirm safe shoulder parking, traffic conditions, and the carry to the river.",
    },
    takeOut: {
      name: "Lake Creek Trail Bridge Take-Out",
      latitude: 43.727757,
      longitude: -114.38266,
      mileFromStart: 3.6,
      note: "American Whitewater take-out at the Lake Creek Trail Bridge; confirm BLM trailhead access, landing condition, and the boat carry to the staged vehicle.",
    },
    access: [
      {
        name: "Chocolate Gulch Bridge / Highway 75 Put-In",
        latitude: 43.770578,
        longitude: -114.407092,
        mileFromStart: 0,
        note: "Highway bridge access anchor; use only a safe, lawful shoulder and carry route.",
      },
      {
        name: "Lake Creek Trail Bridge Take-Out",
        latitude: 43.727757,
        longitude: -114.38266,
        mileFromStart: 3.6,
        note: "Trail/foot-access landing at Lake Creek; verify current BLM trailhead and parking conditions.",
      },
    ],
    camping:
      "Use a lawful Ketchum or Sawtooth National Recreation Area campground/basecamp. This short urban-valley reach has no on-route camping assumption.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage at the Lake Creek Trailhead first, then shuttle the short Highway 75 corridor to Chocolate Gulch. Allow extra time for seasonal roadwork and trail/bridge access changes.",
    permits:
      "No river permit is listed. Follow BLM/Sawtooth access rules, Idaho AIS/PFD requirements, Highway 75 traffic controls, fire restrictions, and current closures.",
    watchFor: ["spring runoff", "bank strainers", "Highway 75 bridge traffic", "Lake Creek Trail Bridge landing", "cold water"],
    season: [4, 5, 6],
    imageUrl: henrysImage,
    imageLabel: "Central Idaho river corridor context photograph",
  }),

  makeRoute({
    id: "big-wood-river-rotary-broadway",
    riverId: "big-wood-river-idaho",
    name: "Big Wood River",
    reach: "Ketchum Rotary Park to Broadway Run Road",
    region: "Central Idaho / Ketchum",
    routeType: "whitewater",
    summary:
      "A 4.9-mile Class II spring-runoff float from Ketchum Rotary Park to Broadway Run Road, with city-documented public access and a named river-wide log hazard below the Hospital Bridge.",
    statusText:
      "Planning-only access route. American Whitewater identifies the 4.9-mile Class II reach and the Rotary Park/Broadway Run Road endpoints, while the City of Ketchum access map documents Rotary Park parking and facilities. No route-specific numeric cutoff is published; use the live Big Wood gauge for context and inspect logs immediately before launching.",
    distance: "About 4.9 river miles",
    time: "About 2-4 hours plus shuttle and scouting",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "private_banks", "access_uncertain"],
    safety: [
      "American Whitewater rates this reach Class II and describes spring runoff into early summer as the normal window. Wear PFDs, use a stable moving-water craft, and account for cold snowmelt water and rapidly changing current.",
      "American Whitewater warns of river-wide log jams and specifically reported a log spanning the river below the Highway 75/Hospital Bridge in 2021. Scout the reach from shore or bridge vantage points where possible; do not assume the channel is clear because a prior trip was uneventful.",
      "Ketchum Rotary Park has documented parking, restrooms, and a water fountain, but the downstream Broadway Run Road endpoint and intervening banks may involve easements or private frontage. Use only signed/public carry routes and confirm the take-out before launching.",
      "No route-specific numeric cutoff is published. The Big Wood near Ketchum gauge is same-river context only; flow trend, wood, bridge hydraulics, weather, and current access conditions control the decision.",
    ],
    gauge: "13135500",
    gaugeName: "Big Wood River near Ketchum, ID",
    gaugeKind: "direct",
    thresholdLabel:
      "American Whitewater publishes a spring-runoff/early-summer window but no numeric route-specific cutoff; use the direct Big Wood gauge for context only",
    thresholdUrl: bigWoodRotaryAwReach,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13135500/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: bigWoodRotaryAwReach,
    sourceLabel: "American Whitewater Big Wood Rotary Park-to-Broadway reach record",
    mapUrl: bigWoodAccessMap,
    additionalSourceLinks: [
      { label: "Ketchum Big Wood River public access map", url: bigWoodAccessMap },
      { label: "City of Ketchum river gauge information", url: "https://ketchumidaho.gov/234/River-Gauge-Data" },
      { label: "USGS Big Wood River near Ketchum direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13135500/" },
      { label: "American Whitewater Big Wood access and log-jam description", url: bigWoodRotaryAwReach },
      { label: "American Whitewater Big Wood access discussion", url: "https://groups.google.com/g/american-whitewater-streamteam-forum/c/wqGMpBio8O8" },
    ],
    putIn: {
      name: "Ketchum Rotary Park Put-In",
      latitude: 43.686832,
      longitude: -114.372711,
      mileFromStart: 0,
      note: "City access map documents Rotary Park parking, restrooms, and a water fountain. Confirm current launch carry, river conditions, and any seasonal park restrictions before unloading.",
    },
    takeOut: {
      name: "Broadway Run Road Take-Out",
      latitude: 43.634474,
      longitude: -114.349838,
      mileFromStart: 4.9,
      note: "American Whitewater endpoint on Broadway Run Road. Confirm the current legal pullout, roadside parking, and shoreline carry; do not use private driveways or easements outside their posted terms.",
    },
    access: [
      {
        name: "Ketchum Rotary Park Put-In",
        latitude: 43.686832,
        longitude: -114.372711,
        mileFromStart: 0,
        note: "Named city park access; use the documented public parking and carry route only.",
      },
      {
        name: "Broadway Run Road Take-Out",
        latitude: 43.634474,
        longitude: -114.349838,
        mileFromStart: 4.9,
        note: "Named AW endpoint; verify legal staging and landing before launching.",
      },
    ],
    camping:
      "Rotary Park and the Broadway Run Road endpoint are day-use access points. Use a lawful Ketchum/Sawtooth-area campground or lodging basecamp; no on-route camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage at Broadway Run Road first, then shuttle upriver to Rotary Park. Allow for Ketchum traffic, bridge access, and any seasonal parking or road controls.",
    permits:
      "Follow City of Ketchum park rules, Idaho AIS/PFD requirements, current public-easement conditions, private-bank boundaries, fire restrictions, and any road or river closure notices.",
    watchFor: ["river-wide log jams", "Hospital Bridge area", "spring runoff", "cold water", "private frontage", "Broadway Run Road landing"],
    season: [4, 5, 6, 7],
    imageUrl: warmSpringsImage,
    imageLabel: "Ketchum-area river corridor context photograph",
  }),

  makeRoute({
    id: "snake-river-auger-falls-park",
    riverId: "snake-river-auger-idaho",
    name: "Snake River",
    reach: "Auger Falls Park whitewater run",
    region: "Southern Idaho / Twin Falls Canyon",
    routeType: "whitewater",
    summary:
      "A short 1.9-mile Class III-IV+ Snake River canyon run through Auger Falls Heritage Park, with a 400-1,000 cfs runnable band and mandatory foot-access/shuttle planning.",
    statusText:
      "Gauge-scored foot-shuttle route. The direct 13090500 gauge and published 400-1,000 cfs runnable band are tied to this Auger Falls reach, while City of Twin Falls and Idaho Fish and Game document the park/boating-access corridor. The Broken Bridge endpoint still has no public vehicle access and requires a full foot carry or separately authorized gate arrangement.",
    distance: "About 1.9 river miles",
    time: "About 2-4 hours on the water plus 1.5-mile carry/hike and scouting",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "fast_rise", "strainers", "portage", "access_uncertain", "mandatory_takeout"],
    safety: [
      "How's Your River and American Whitewater describe a Class III-IV+ run that is rocky at low water, becomes powerful around 4,000 cfs, and has a broken-bridge hazard; use a proven whitewater craft, helmet, PFD, and rescue team.",
      "Idaho Fish and Game documents the Auger Falls boating-access site, but there is no public driving access to the Broken Bridge take-out. Plan a full foot carry back to the park or coordinate lawful local gate access; do not cross private property or continue into the Auger Falls hazard zone without a verified exit.",
      "Mid-Snake quagga inspection and decontamination rules apply to watercraft entering and exiting the reach. Check current ISDA restrictions, park hours, weather, water temperature, and the direct gauge before launch.",
    ],
    gauge: "13090500",
    gaugeName: "Snake River near Twin Falls, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 400, idealMin: 400, idealMax: 1000, tooHigh: 4000 },
    thresholdLabel: "Auger Falls published runnable band 400-1,000 cfs; rapids become powerful around 4,000 cfs",
    thresholdUrl: augerThreshold,
    thresholdSupportUrl: augerAwReach,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: augerThreshold,
    sourceLabel: "How's Your River Auger Falls conditions and access summary",
    mapUrl: augerParkAccess,
    additionalSourceLinks: [
      { label: "American Whitewater Auger Falls reach record", url: augerAwReach },
      { label: "City of Twin Falls Auger Falls Heritage Park facility", url: augerParkAccess },
      { label: "Idaho quagga inspection and decontamination rules", url: augerQuaggaRules },
      { label: "Idaho Fish and Game Auger Falls boating access site", url: "https://idfg.idaho.gov/visit/location-idfg-fishing-and-boating-access-sites/22327-fishing-and-boating-access-site-auger" },
      { label: "USGS Snake River near Twin Falls gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13090500/" },
    ],
    putIn: {
      name: "Auger Falls Heritage Park Put-In",
      latitude: 42.6211,
      longitude: -114.5131,
      mileFromStart: 0,
      note: "City park trail/shoreline anchor; carry boats from the marked Heritage Park parking and confirm the current public shoreline route before entering.",
    },
    takeOut: {
      name: "Broken Bridge / Yingst Grade Take-Out",
      latitude: 42.63213,
      longitude: -114.52726,
      mileFromStart: 1.9,
      note: "Broken Bridge/Auger Falls park-side endpoint; no public driving access to the take-out, so plan the documented foot carry and do not use private gates or banks without permission.",
    },
    camping:
      "Auger Falls Heritage Park is day-use only. Use lawful Twin Falls-area lodging or a developed campground; no on-route camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "This is a foot-shuttle route: stage at the park trailhead, carry boats to the river, and plan the 1.5-mile hike back after the take-out. A second vehicle cannot reach the Broken Bridge endpoint without separately verified lawful access.",
    permits:
      "Follow City of Twin Falls park rules, ISDA inspection/decontamination and seasonal closure rules, Idaho AIS/PFD requirements, and all posted canyon/private-property restrictions.",
    watchFor: ["four Class III-IV+ drops", "broken bridge and strainer hazard", "Auger Falls hazard zone", "quagga inspection hours", "foot-carry exit"],
    season: [3, 4, 5, 6, 7, 8, 9, 10],
    imageUrl: snakeImage,
    imageLabel: "Snake River same-watershed context photograph",
  }),

  makeRoute({
    id: "warm-springs-creek-lodge-river-run",
    riverId: "warm-springs-creek-idaho",
    name: "Warm Springs Creek",
    reach: "Warm Springs Lodge to River Run Lodge",
    region: "Central Idaho / Ketchum",
    routeType: "whitewater",
    summary:
      "A short 3.1-mile spring Class II-III creek run from the Warm Springs Lodge area to the River Run Lodge area on the Big Wood River.",
    statusText:
      "Gauge-scored access-controlled route. American Whitewater correlates the reach to Warm Springs Creek near Ketchum gauge 13137000 with a 300-600 cfs runnable window and warns that bridge clearance becomes a concern above 400 cfs. Ketchum’s public-river-access map documents the surrounding public easement network; use only signed carry routes and confirm resort-area conditions before launch.",
    distance: "About 3.1 river miles",
    time: "About 1-3 hours plus access checks",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "cold_water", "strainers", "low_water", "private_banks", "access_uncertain"],
    safety: [
      "American Whitewater describes swift spring water and fun drops, with bridge-clearance concerns above 400 cfs. Wear a PFD and helmet, scout all bridges, and do not commit when debris or standing water blocks the channel.",
      "The route is short but urban/resort-adjacent. Ketchum's current public-river-access map documents public easements and access points along Warm Springs Creek and the Big Wood; private resort, subdivision, parking, and day-use restrictions still control the actual launch and take-out.",
      "Treat 300-600 cfs as a broad runnable shoulder rather than a guarantee. Cold water, fast spring rise, wood, bridge piers, and changing resort operations override the gauge score.",
    ],
    gauge: "13137000",
    gaugeName: "Warm Springs Creek near Ketchum, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 300, idealMin: 300, idealMax: 400, tooHigh: 600 },
    thresholdLabel:
      "American Whitewater direct-gauge correlation: 300-600 cfs runnable; bridge-clearance warning above 400 cfs",
    thresholdUrl: warmSpringsAwReach,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13137000/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: warmSpringsAwReach,
    sourceLabel: "American Whitewater Warm Springs Creek reach record",
    mapUrl: warmSpringsKetchumAccessMap,
    additionalSourceLinks: [
      { label: "USGS Warm Springs Creek direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13137000/" },
      { label: "American Whitewater Warm Springs Lodge put-in record", url: warmSpringsPutInSource },
      { label: "American Whitewater River Run Lodge take-out record", url: warmSpringsTakeOutSource },
      { label: "City of Ketchum / Blaine County river access map", url: warmSpringsKetchumAccessMap },
      { label: "Ketchum comprehensive-plan public-water access policy", url: warmSpringsCityPlan },
      { label: "Ketchum Warm Springs Lodge business listing", url: "https://www.ketchumidaho.org/business-directory-listing/warm-springs-lodge" },
    ],
    putIn: {
      name: "Warm Springs Lodge put-in area",
      latitude: 43.682968,
      longitude: -114.40562,
      mileFromStart: 0,
      note: "American Whitewater access anchor. Resort-area launch status, parking, and any carry-in permission must be confirmed; do not cross private resort facilities without authorization.",
    },
    takeOut: {
      name: "River Run Lodge take-out on Big Wood River",
      latitude: 43.670983,
      longitude: -114.366735,
      mileFromStart: 3.1,
      note: "American Whitewater access anchor near River Run Lodge. Use only a signed public easement or current authorized carry-out; the Ketchum map documents nearby public river easements but not an unrestricted resort ramp.",
    },
    access: [
      {
        name: "Warm Springs Lodge put-in area",
        latitude: 43.682968,
        longitude: -114.40562,
        mileFromStart: 0,
        note: "Named AW endpoint; public access is a documented-review item because the anchor is on a resort corridor.",
      },
      {
        name: "River Run Lodge take-out on Big Wood River",
        latitude: 43.670983,
        longitude: -114.366735,
        mileFromStart: 3.1,
        note: "Named AW endpoint; confirm public carry-out and parking before launch, and use only signed easements or city/BLM access.",
      },
    ],
    camping:
      "No on-route camping is appropriate on this short resort-adjacent creek run. Use lawful Ketchum lodging or a nearby developed campground; do not camp on resort, subdivision, or easement property.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Short urban/resort shuttle between Warm Springs Road and River Run. Stage vehicles only in signed public parking and verify seasonal event, snow, and construction restrictions.",
    permits:
      "No river permit is listed. Follow Idaho boating/PFD and invasive-species requirements, Ketchum access signs, resort rules, easement limits, and current closures.",
    watchFor: ["bridge clearance above 400 cfs", "wood and swift spring water", "private resort/subdivision frontage", "unconfirmed lodge-area access"],
    season: [4, 5, 6],
    imageUrl: warmSpringsImage,
    imageLabel: "Central Idaho watershed context photograph; not the Warm Springs Creek reach",
  }),

  makeRoute({
    id: "weiser-river-midvale-galloway",
    riverId: "weiser-river-idaho",
    name: "Weiser River",
    reach: "Midvale to Galloway Diversion Dam",
    region: "Western Idaho / Washington County",
    routeType: "whitewater",
    summary:
      "A roughly 22-mile Class II-III spring float from the Midvale Bridge access through the Weiser Canyon to the Galloway Diversion Dam ramp.",
    statusText:
      "Gauge-scored seasonal route. American Whitewater correlates the reach to the direct Weiser River near Weiser gauge with a 1,500-5,000 cfs runnable window; the canyon’s Class II+ wave trains are specifically described at 1,500-2,500 cfs. Private agricultural frontage, a diversion dam, and limited take-out parking require a disciplined shuttle.",
    distance: "About 22-23.3 river miles",
    time: "About 6-10 hours plus shuttle",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["whitewater", "strainers", "fast_rise", "private_banks", "mandatory_takeout", "access_uncertain"],
    safety: [
      "American Whitewater describes the reach as Class II-III and notes that the canyon develops wave trains and hydraulics at 1,500-2,500 cfs, with stronger Class III features at higher flows. Wear a PFD, scout bridge and diversion features, and keep a conservative line around wood and private banks.",
      "The Midvale put-in is an unpaved river-left access immediately above the town bridge. The Galloway take-out is a concrete river-right ramp above the diversion dam with only a handful of vehicle spaces; stage the take-out first and never continue toward the dam.",
      "This is a short spring window, and the direct gauge is downstream of the upper agricultural corridor. Recheck the current hydrograph, weather, debris, road access, and landowner/closure notices on the day of the float.",
    ],
    gauge: "13266000",
    gaugeName: "Weiser River near Weiser, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1500, idealMin: 1500, idealMax: 2500, tooHigh: 5000 },
    thresholdLabel:
      "American Whitewater runnable correlation: 1,500-5,000 cfs; Class II+ canyon band 1,500-2,500 cfs",
    thresholdUrl: weiserAwReach,
    thresholdSupportUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13266000/",
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: weiserAwReach,
    sourceLabel: "American Whitewater Weiser Midvale-to-Galloway reach record",
    mapUrl: "https://waterdata.usgs.gov/monitoring-location/USGS-13266000/",
    additionalSourceLinks: [
      { label: "USGS Weiser River near Weiser direct gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13266000/" },
      { label: "Weiser River Trail / Galloway Dam and Midvale access map", url: weiserRiverAccessGuide },
      { label: "Idaho Fish and Game Weiser River water page", url: weiserIdfgWaterPage },
      { label: "BLM Weiser-Galloway environmental assessment", url: weiserGallowayProject },
      { label: "Idaho Fish and Game fisheries management plan", url: weiserIdahoManagementPlan },
      { label: "American Whitewater Weiser River project context", url: "https://www.americanwhitewater.org/project/weiser-river-id/" },
    ],
    putIn: {
      name: "Midvale Bridge river access",
      latitude: 44.471,
      longitude: -116.732,
      mileFromStart: 0,
      note: "American Whitewater’s approximate river-left access immediately upstream of the town bridge; use only the established staging area and verify current parking and private-property boundaries.",
    },
    takeOut: {
      name: "Galloway Diversion Dam concrete ramp",
      latitude: 44.251,
      longitude: -116.776,
      mileFromStart: 22,
      note: "American Whitewater’s approximate river-right concrete ramp above Galloway Diversion Dam; limited vehicle space and a dam hazard make this a mandatory pre-staged take-out.",
    },
    access: [
      {
        name: "Midvale Bridge river access",
        latitude: 44.471,
        longitude: -116.732,
        mileFromStart: 0,
        note: "Unpaved river-left put-in described by American Whitewater; confirm current public access and avoid blocking Bridge Street.",
      },
      {
        name: "Galloway Diversion Dam concrete ramp",
        latitude: 44.251,
        longitude: -116.776,
        mileFromStart: 22,
        note: "Concrete river-right ramp immediately above the diversion dam; exit here and never approach the dam structure.",
      },
    ],
    camping:
      "American Whitewater describes this as a day trip; primitive camping is possible only on lawful public land with no designated sites. Carry all drinking water, use a portable toilet, and do not camp on agricultural or private frontage.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage the Galloway/Presley vehicle before launch. US 95 and local roads provide the shuttle, but the last mile to the ramp is constrained and the take-out has room for only a handful of vehicles.",
    permits:
      "No special river permit is listed. Follow current Idaho boating/PFD and invasive-species requirements, private-property restrictions, road and fire closures, and Galloway Diversion Dam exclusion postings.",
    watchFor: ["rapid spring rise and debris", "private agricultural frontage", "Class II-III canyon hydraulics", "Galloway Diversion Dam mandatory take-out"],
    season: [3, 4, 5],
    imageUrl: weiserImage,
    imageLabel: "Payette-Weiser basin context photograph; not the Weiser reach",
  }),

  makeRoute({
    id: "moyie-river-copper-twin-bridges",
    riverId: "moyie-river-idaho",
    name: "Moyie River",
    reach: "Copper Creek Campground to Twin Bridges",
    region: "North Idaho / Boundary County",
    routeType: "recreational",
    summary:
      "A scenic roughly 10-mile Class I+ Moyie float from the developed Copper Creek Campground to the Twin Bridges road-and-rail crossing.",
    statusText:
      "Gauge-scored direct-gauge recreational route. The Idaho paddling guide publishes a 500-2,300 cfs Eastport gauge window and describes a 3-4 hour, mostly Class I+ run at about 1,500-1,800 cfs. Boundary County documents bridge access along the Moyie corridor and Meadow Creek day use; the Twin Bridges landing remains a road/bridge access anchor requiring current parking and shoreline confirmation.",
    distance: "About 10 river miles",
    time: "About 3-4 hours at roughly 1,500 cfs",
    difficulty: "moderate",
    risk: "caution",
    hazards: ["cold_water", "strainers", "wind", "fast_rise", "access_uncertain"],
    safety: [
      "The guide rates the reach Class I+ at approximately 1,600 cfs, but overhanging trees, bridge approaches, cold water, and rapidly changing spring flows still require a conservative line and PFDs.",
      "Copper Creek Campground is a developed seasonal endpoint. Boundary County's recreation plan identifies multiple bridge access points on the Moyie and day use at Meadow Creek; Twin Bridges is described as a river-right entry/landing immediately downstream of the road bridge, so verify current parking, railroad/road safety, and that the shoreline approach remains lawful before launching.",
      "The 500-2,300 cfs range is route-specific guidance at the Eastport gauge, not a guarantee of safe conditions. Avoid high spring flows, inspect wood and bridge hazards, and carry communication for the remote Boundary County corridor.",
    ],
    gauge: "12306500",
    gaugeName: "Moyie River at Eastport, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 1200, idealMax: 1800, tooHigh: 2300 },
    thresholdLabel: "Idaho paddling guide published window: 500-2,300 cfs; Class I+ around 1,600 cfs and 3-4 hours at 1,500 cfs",
    thresholdUrl: moyieThreshold,
    thresholdSupportUrl: moyieGaugeSource,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: moyieThreshold,
    sourceLabel: "Guide to Idaho Paddling Moyie Copper-to-Twin route record",
    mapUrl: moyieCampgroundMap,
    additionalSourceLinks: [
      { label: "USGS Moyie River at Eastport gauge", url: moyieGaugeSource },
      { label: "Idaho Fish and Game Moyie River water page", url: moyieIdfgPage },
      { label: "Boundary County Moyie recreation and bridge-access plan", url: moyieCountyAccessPlan },
      { label: "Moyie Twin Bridges route access description", url: moyieTwinBridgesSource },
      { label: "GoFloatThatRiver Moyie percentile context", url: "https://gofloatthatriver.com/idaho/index.html" },
      { label: "Copper Creek Campground map and location", url: moyieCampgroundMap },
    ],
    putIn: {
      name: "Copper Creek Campground Put-In",
      latitude: 48.988444,
      longitude: -116.175482,
      mileFromStart: 0,
      note: "Developed Forest Service campground beside the Moyie River near Eastport; confirm seasonal opening, fees, parking, and the carry to the water.",
    },
    takeOut: {
      name: "Twin Bridges Road Bridge Take-Out",
      latitude: 48.861108,
      longitude: -116.157978,
      mileFromStart: 10,
      note: "Paddling guide places the landing river-right just downstream of the Moyie River Road bridge and adjacent railroad bridge. This is an access anchor, not a surveyed ramp; confirm legal parking, railroad safety, and shoreline conditions.",
    },
    access: [
      {
        name: "Copper Creek Campground Put-In",
        latitude: 48.988444,
        longitude: -116.175482,
        mileFromStart: 0,
        note: "Developed seasonal Forest Service campground and river access.",
      },
      {
        name: "Twin Bridges Road Bridge Take-Out",
        latitude: 48.861108,
        longitude: -116.157978,
        mileFromStart: 10,
        note: "Road/rail bridge access anchor described by the paddling guide; current public parking and bank access require confirmation.",
      },
    ],
    camping:
      "Copper Creek Campground provides developed endpoint camping when open. No downstream or informal riverbank camping is assumed; use lawful Boundary County or Forest Service sites only.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Mostly paved Moyie River Road/Highway 34 shuttle with US 95 connection; stage the Twin Bridges vehicle first and account for narrow shoulders, railroad activity, and seasonal road conditions.",
    permits:
      "Follow current Forest Service campground rules, Idaho AIS/PFD requirements, fire restrictions, railroad/road safety rules, and any Boundary County closures or private-bank restrictions.",
    watchFor: ["overhanging trees and strainers", "cold spring water", "road and railroad bridges", "rapidly rising spring flows"],
    season: [5, 6, 7, 8, 9],
    imageUrl: clearwaterImage,
    imageLabel: "North Idaho watershed context photograph; not a Moyie endpoint image",
  }),

  makeRoute({
    id: "moyie-river-twin-bridges-meadow-creek",
    riverId: "moyie-river-idaho",
    name: "Moyie River",
    reach: "Twin Bridges to Meadow Creek Campground",
    region: "North Idaho / Boundary County",
    routeType: "whitewater",
    summary:
      "A compact 4.8-mile Class III Moyie segment from the Twin Bridges road-and-rail crossing to the Forest Service Meadow Creek Campground take-out.",
    statusText:
      "Gauge-scored direct-gauge whitewater route. Idaho Paddler rates the reach Class III at 1,500 cfs, publishes a 500-2,300 cfs Eastport-gauge window, and gives a five-mile shuttle; Boundary County documents bridge access along the Moyie corridor and Meadow Creek day use, while the river-right bridge put-in still needs current parking and shoreline confirmation.",
    distance: "About 4.8 river miles",
    time: "About 2 hours at roughly 1,500 cfs",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "fast_rise", "access_uncertain"],
    safety: [
      "Idaho Paddler describes the segment as Class III at 1,500 cfs, with long connected rapids, a ledge above Meadow Creek Bridge, a limestone-cliff rapid, and a pipeline-crossing rapid. Scout from the road where possible and use a rescue-ready crew.",
      "Boundary County's recreation plan identifies five bridge access points on the Moyie and Meadow Creek as a day-use landing. The guide places this put-in river right just downstream of the Twin Bridges road bridge and the take-out in Meadow Creek Campground; confirm current bridge-side parking, railroad/road safety, campground operating status, and the marked campground eddy before launching.",
      "The 500-2,300 cfs range is route-specific Eastport-gauge guidance, not a safety guarantee. Current trend, wood, bridge hazards, cold water, craft choice, and local inspection control the go/no-go decision.",
    ],
    gauge: "12306500",
    gaugeName: "Moyie River at Eastport, ID",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 1200, idealMax: 1800, tooHigh: 2300 },
    thresholdLabel: "Idaho Paddler published window: 500-2,300 cfs; Class III at 1,500 cfs",
    thresholdUrl: moyieTwinBridgesSource,
    thresholdSupportUrl: moyieGaugeSource,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: moyieTwinBridgesSource,
    sourceLabel: "Idaho Paddler Twin Bridges-to-Meadow Creek route record",
    mapUrl: moyieMeadowCampgroundMap,
    additionalSourceLinks: [
      { label: "USGS Moyie River at Eastport direct gauge", url: moyieGaugeSource },
      { label: "Forest Service Meadow Creek Campground location", url: moyieMeadowCampgroundMap },
      { label: "Boundary County Moyie recreation and bridge-access plan", url: moyieCountyAccessPlan },
      { label: "Idaho Fish and Game Moyie River water page", url: moyieIdfgPage },
      { label: "Moyie Copper Creek-to-Twin Bridges route context", url: moyieThreshold },
    ],
    putIn: {
      name: "Twin Bridges river-right put-in",
      latitude: 48.861108,
      longitude: -116.157978,
      mileFromStart: 0,
      note: "Idaho Paddler places the put-in immediately downstream of the Moyie River Road bridge on river right; verify current parking, railroad/road safety, and lawful shoreline access.",
    },
    takeOut: {
      name: "Meadow Creek Campground Take-Out",
      latitude: 48.81987,
      longitude: -116.14733,
      mileFromStart: 4.8,
      note: "Forest Service campground on the Moyie River; the guide identifies a usable eddy near the campground host and warns that the moving current can carry boats past the landing.",
    },
    camping:
      "Meadow Creek is a developed Forest Service endpoint campground with roughly 22 sites, water when operating, vault toilets, and river access; confirm season, fees, and campground status before using it as the take-out base.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Five-mile Moyie River Road shuttle between Meadow Creek Campground and Twin Bridges; the guide notes a gravel-road bike shuttle, so stage the vehicle first and account for narrow shoulders and railroad activity.",
    permits:
      "Follow current Forest Service campground rules, Idaho AIS/PFD requirements, fire restrictions, road/rail safety rules, and Boundary County closures or private-bank restrictions.",
    watchFor: ["long Class III connected rapids", "bridge approaches", "limestone cliff and pipeline rapids", "cold spring water", "fast Eastport-gauge rises"],
    season: [5, 6, 7, 8, 9],
    imageUrl: clearwaterImage,
    imageLabel: "North Idaho watershed context photograph; not a Moyie endpoint image",
  }),

  makeRoute({
    id: "moyie-river-meadow-creek-reservoir",
    riverId: "moyie-river-idaho",
    name: "Moyie River",
    reach: "Meadow Creek Campground to Moyie Reservoir Take-Out",
    region: "North Idaho / Boundary County",
    routeType: "whitewater",
    summary:
      "A roughly 7.9-mile Class III-IV Moyie canyon run from Meadow Creek Campground to the public Moyie Reservoir boating take-out below the Eileen Dam remnants.",
    statusText:
      "Planning-only direct-gauge route. American Whitewater and North Idaho Rivers describe the Meadow Creek-to-reservoir reach, its dam and Hole-in-the-Wall hazards, and a 500 cfs minimum; 3,000-5,000 cfs is a local favorite band, while flows above 5,000 cfs require heightened caution. The Eastport gauge is upstream and only a rough guide for the lower canyon, so no live score is asserted.",
    distance: "About 7.9 river miles",
    time: "About 3-5 hours plus dam scouting and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "dam",
      "fast_rise",
      "remote",
      "access_uncertain",
      "mandatory_takeout",
    ],
    safety: [
      "American Whitewater rates the reach Class III-IV and identifies the Eileen Dam remains, Hole in the Wall, and the Moyie Falls/Moyie Dam reservoir transition as consequential hazards. Scout from legal public land and never approach the active dam or falls complex.",
      "North Idaho Rivers describes approximately 500 cfs as a minimum, 3,000-5,000 cfs as a preferred band, and high flows as hazardous because the canyon and dam hydraulics change rapidly. These are planning cues, not a substitute for current inspection and a rescue-ready crew.",
      "Meadow Creek Campground is a named Forest Service access point. The lower take-out is the public Moyie Reservoir boating/day-use area at the end of Canyon View Road; confirm the current carry, parking, reservoir level, and posted exclusion zone before launching.",
    ],
    gauge: "12306500",
    gaugeName: "Moyie River at Eastport, ID (upstream rough guide)",
    gaugeKind: "direct",
    thresholdModel: "two-sided",
    threshold: { tooLow: 500, idealMin: 3000, idealMax: 5000, tooHigh: 5000 },
    thresholdLabel:
      "North Idaho Rivers: approximately 500 cfs minimum; 3,000-5,000 cfs favorite; above 5,000 cfs high-caution context",
    thresholdUrl: moyieLowerGuide,
    thresholdSupportUrl: moyieLowerThreshold,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: moyieLowerThreshold,
    sourceLabel: "American Whitewater Moyie Meadow Creek-to-Moyie Falls Dam reach record",
    mapUrl: moyieLowerAccessPlan,
    additionalSourceLinks: [
      { label: "North Idaho Rivers Moyie flow and access description", url: moyieLowerGuide },
      { label: "American Whitewater Moyie lower-canyon reach", url: moyieLowerThreshold },
      { label: "USGS Moyie River at Eastport gauge", url: moyieGaugeSource },
      { label: "Bonners Ferry Moyie River recreation study plan", url: moyieLowerAccessPlan },
      { label: "Forest Service Meadow Creek Campground location", url: moyieMeadowCampgroundMap },
    ],
    putIn: {
      name: "Meadow Creek Campground Put-In",
      latitude: 48.8194,
      longitude: -116.14675,
      mileFromStart: 0,
      note: "Named Forest Service campground and river landing; confirm seasonal operating status, fees, parking, and the marked carry to the river.",
    },
    takeOut: {
      name: "Moyie Reservoir Boating Take-Out",
      latitude: 48.73135,
      longitude: -116.1831,
      mileFromStart: 7.9,
      note: "Public reservoir/day-use facility at the end of Canyon View Road below the lower Moyie canyon; exit before the dam/falls complex and confirm current exclusion postings, parking, and shoreline carry.",
    },
    access: [
      {
        name: "Meadow Creek Campground Put-In",
        latitude: 48.8194,
        longitude: -116.14675,
        mileFromStart: 0,
        note: "Forest Service campground/day-use access on river right; current carry path and seasonal status require confirmation.",
      },
      {
        name: "Eileen Dam Scout / Mandatory Portage Area",
        latitude: 48.774109,
        longitude: -116.159943,
        mileFromStart: 3.8,
        note: "Named former dam hazard and scout landmark from the American Whitewater reach record; the stored point is snapped to the adjacent named flowline for hydrography auditing and is not a landing or public access point. Stay clear of structures and private banks.",
        segmentKind: "transition",
      },
      {
        name: "Moyie Reservoir Boating Take-Out",
        latitude: 48.73135,
        longitude: -116.1831,
        mileFromStart: 7.9,
        note: "Public reservoir/day-use take-out anchor; confirm the current public carry and dam exclusion zone before committing to the lower canyon.",
      },
    ],
    camping:
      "Meadow Creek Campground provides the practical endpoint basecamp when open. No informal canyon camping is assumed; use only posted Forest Service or Boundary County facilities and verify current fire restrictions.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Stage at the Moyie Reservoir boating take-out first, then use US 2, Canyon View Road, and Moyie River Road for the shuttle. Roads and the reservoir shoreline can be seasonal; leave extra time for the long carry and dam scouting.",
    permits:
      "Follow Forest Service campground rules, Boundary County reservoir/day-use postings, Idaho AIS/PFD requirements, fire restrictions, and all dam/falls exclusion notices. Railroad and narrow-road safety apply at the upper access corridor.",
    watchFor: [
      "Eileen Dam remnants",
      "Hole in the Wall",
      "Moyie Falls and active dam exclusion zone",
      "high-flow canyon hydraulics",
      "cold water and wood",
      "mandatory reservoir take-out",
    ],
    season: [5, 6, 7],
    imageUrl: clearwaterImage,
    imageLabel: "North Idaho watershed context photograph; not a Moyie lower-canyon endpoint image",
  }),

  makeRoute({
    id: "camas-creek-blaine-moonstone",
    riverId: "camas-creek-idaho",
    name: "Camas Creek",
    reach: "Blaine Bridge to Moonstone Landing",
    region: "South-Central Idaho / Camas Prairie and Magic Reservoir",
    routeType: "whitewater",
    summary:
      "A roughly 7-10.8-mile seasonal Class I-III Camas Creek run from the Blaine/Macon bridge corridor to the public Moonstone Landing on Magic Reservoir.",
    statusText:
      "Planning-only direct-gauge route. American Whitewater reports Class III conditions at both 500 and 1,800 cfs, while Visit Southern Idaho recommends waiting for flows above 500 cfs and notes the short seasonal window. The Blaine bridge staging point is a road/bridge access anchor rather than a documented developed ramp, so confirm lawful parking and the carry before launch.",
    distance: "About 7-10.8 river miles depending on the exact Blaine Bridge start",
    time: "About 3-5 hours plus reservoir wind and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "low_water",
      "wind",
      "fast_rise",
      "access_uncertain",
      "private_banks",
    ],
    safety: [
      "American Whitewater describes a slow opening followed by straightforward Class II-III rapids below Macon Sheep Bridge and a final flatwater crossing on Magic Reservoir. Scout bridge approaches, wood, and the reservoir transition from legal public land only.",
      "The reach was reported runnable at 500 and 1,800 cfs; Visit Southern Idaho recommends flows above 500 cfs and warns that this may occur for only one or two weeks each year. Use the 500 cfs floor as a conservative planning cue, not a guarantee of safe water.",
      "Camas Creek receives pasture and Fairfield runoff. Wait for several days of clean flow after a major rise, carry drinking water, and treat Moonstone as the only confirmed public landing for this card.",
    ],
    gauge: "13141500",
    gaugeName: "Camas Creek near Blaine, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 500, idealMin: 500, idealMax: 1800 },
    thresholdLabel:
      "American Whitewater/Visit Southern Idaho: Class III observed at 500 and 1,800 cfs; boating recommended above 500 cfs",
    thresholdUrl: camasThreshold,
    thresholdSupportUrl: camasFlowGuide,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: camasThreshold,
    sourceLabel: "American Whitewater Camas Creek Blaine Bridge-to-Moonstone reach record",
    mapUrl: camasIdfgAccess,
    additionalSourceLinks: [
      { label: "Visit Southern Idaho Camas Creek flow and access guide", url: camasFlowGuide },
      { label: "USGS Camas Creek near Blaine gauge", url: "https://waterdata.usgs.gov/monitoring-location/USGS-13141500/" },
      { label: "Idaho Fish and Game Moonstone public boat access", url: camasIdfgAccess },
      { label: "Idaho Fishing and Boating Access Guide", url: camasAccessGuide },
      { label: "American Whitewater Camas Creek reach", url: camasThreshold },
    ],
    putIn: {
      name: "Blaine Bridge / Macon Flat Road Put-In",
      latitude: 43.33444,
      longitude: -114.58861,
      mileFromStart: 0,
      note: "American Whitewater and Visit Southern Idaho identify the Blaine bridge corridor as the put-in. This is a roadside/bridge staging anchor, not a confirmed developed ramp; verify legal parking, traffic safety, and a safe carry to water.",
    },
    takeOut: {
      name: "Moonstone Public Boat Launch",
      latitude: 43.3355,
      longitude: -114.4328,
      mileFromStart: 10.8,
      note: "Idaho Fish and Game public boat launch on Magic Reservoir; exit before wind or reservoir conditions deteriorate and confirm seasonal facilities and shoreline level.",
    },
    access: [
      {
        name: "Blaine Bridge / Macon Flat Road Put-In",
        latitude: 43.33444,
        longitude: -114.58861,
        mileFromStart: 0,
        note: "Road/bridge access anchor described by paddling sources; legal parking and the carry to the wetted edge require current confirmation.",
      },
      {
        name: "Macon Sheep Bridge Scout",
        latitude: 43.33114,
        longitude: -114.548705,
        mileFromStart: 2,
        note: "Named bridge/rapid landmark from the American Whitewater description; the stored point is snapped to the adjacent named flowline for hydrography auditing and is not an assumed public landing or portage.",
        segmentKind: "transition",
      },
      {
        name: "Moonstone Public Boat Launch",
        latitude: 43.3355,
        longitude: -114.4328,
        mileFromStart: 10.8,
        note: "IDFG public boat launch on Magic Reservoir with seasonal facility conditions; confirm ramp level and parking before the reservoir crossing.",
      },
    ],
    camping:
      "Moonstone provides the practical endpoint basecamp when open. No informal Camas Creek bank camping is assumed; use signed IDFG/BLM facilities or a lawful Fairfield-area basecamp.",
    campingClassification: "endpoint_campground",
    shuttle:
      "Stage the Moonstone vehicle first, then use US 20, Macon Flat Road, and local Camas County roads for the shuttle. The last section crosses Magic Reservoir and is wind-exposed, so keep a daylight cutoff and a reserve plan.",
    permits:
      "Follow Idaho boating/PFD and invasive-species requirements, IDFG Moonstone rules, county road restrictions, fire notices, and private-bank boundaries. Do not treat bridge shoulders or pasture frontage as automatic public access.",
    watchFor: [
      "pasture runoff and water quality",
      "bridge and wood hazards",
      "low-water rocks below 500 cfs",
      "Magic Reservoir wind",
      "private banks and uncertain Blaine access",
    ],
    season: [3, 4, 5],
    imageUrl: snakeImage,
    imageLabel: "Southern Idaho river context photograph; not a Camas Creek endpoint image",
  }),

  makeRoute({
    id: "pine-creek-north-fork-highway-21-snake",
    riverId: "pine-creek-idaho",
    name: "Pine Creek",
    reach: "North Fork Pine Creek / Highway 21 to Snake River",
    region: "Eastern Idaho / Teton Valley and Swan Valley",
    routeType: "whitewater",
    summary:
      "A remote approximately 10.7-mile Class II-IV Pine Creek descent from the Highway 21/North Fork corridor to the Snake River, with exact American Whitewater access anchors and a 250-300 cfs local trip-report cue tied to the Teton gauge.",
    statusText:
      "Planning-only threshold route. American Whitewater supplies the named reach, exact endpoint coordinates, Class II-IV rating, and trip-report flow context; the Teton River above South Leigh Creek gauge is only a proxy for Pine Creek, and the remote road, wood, private-inholding, and Snake River landing controls require current field confirmation.",
    distance: "About 10.7 river miles",
    time: "About 5-8 hours plus scouting, shuttle, and a remote take-out plan",
    difficulty: "hard",
    risk: "advanced",
    hazards: [
      "whitewater",
      "cold_water",
      "strainers",
      "fast_rise",
      "remote",
      "access_uncertain",
      "mandatory_takeout",
    ],
    safety: [
      "American Whitewater rates Pine Creek Class II-IV. Treat the upper canyon as advanced moving water: scout wood and blind corners, wear a PFD, and carry rescue and communication equipment for a remote drainage.",
      "The reach is not represented by a Pine Creek stream gauge. The Teton River above South Leigh Creek gauge is a planning proxy only; a trip report describes local Pine Creek around 250-300 cfs when Teton was about 681 cfs and the Snake about 10,000 cfs. Confirm local water, weather, and debris at the launch rather than transferring the proxy number mechanically.",
      "American Whitewater's exact Highway 21/North Fork put-in and Snake River take-out coordinates are access anchors, not a guarantee of a maintained public ramp. Confirm road condition, lawful parking, private inholdings, shoreline carry, and a safe Snake landing before committing.",
      "The Snake River confluence can add larger-volume current and cold-water consequences. Plan the take-out before launch, do not drift into an unintended downstream reach, and keep a conservative turnaround option if the lower creek or landing is not runnable.",
    ],
    gauge: "13052200",
    gaugeName: "Teton River above South Leigh Creek near Driggs, ID (proxy)",
    gaugeKind: "proxy",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 250, idealMin: 250, idealMax: 300 },
    thresholdLabel:
      "American Whitewater trip-report/local cue: Pine Creek was described around 250-300 cfs with Teton near 681 cfs; retain as a local planning window, not a published go/no-go threshold",
    thresholdUrl: pineCreekAwReach,
    thresholdSupportUrl: pineCreekTripReport,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: pineCreekAwReach,
    sourceLabel: "American Whitewater Pine Creek reach record",
    mapUrl: pineCreekAccessGuide,
    additionalSourceLinks: [
      { label: "American Whitewater Pine Creek map and access points", url: pineCreekAccessGuide },
      { label: "American Whitewater Pine Creek trip reports", url: pineCreekTripReport },
      { label: "USGS Teton River above South Leigh Creek proxy gauge", url: pineCreekGauge },
      { label: "Friends of the Teton River recreation map and access rules", url: pineCreekWatershedContext },
      { label: "Idaho Fish and Game statewide boating-access guide", url: "https://idfg.idaho.gov/sites/default/files/fishing-boating-access-guide-2016.pdf" },
      { label: "American Whitewater Pine Creek main reach record", url: pineCreekAwReach },
    ],
    putIn: {
      name: "North Fork Pine Creek / Highway 21 Put-In",
      latitude: 43.560758,
      longitude: -111.275906,
      mileFromStart: 0,
      note: "Exact American Whitewater upper access anchor. Confirm the Highway 21 turn, road condition, lawful parking, and a safe carry to the creek before launching.",
    },
    takeOut: {
      name: "Pine Creek / Snake River Confluence Take-Out",
      latitude: 43.477242,
      longitude: -111.44134,
      mileFromStart: 10.7,
      note: "Exact American Whitewater lower endpoint near the Snake River. Confirm current landing, private-bank boundaries, downstream hazards, and a vehicle-accessible shuttle point.",
    },
    access: [
      {
        name: "North Fork Pine Creek / Highway 21 Put-In",
        latitude: 43.560758,
        longitude: -111.275906,
        mileFromStart: 0,
        note: "American Whitewater upper endpoint; field-verify road, parking, and creek carry.",
      },
      {
        name: "Pine Creek Mid-Reach Access / Scout",
        latitude: 43.509021,
        longitude: -111.357853,
        mileFromStart: 5.7,
        note: "American Whitewater intermediate access anchor; treat as a scout/contingency point only until current parking, legality, and shoreline carry are confirmed.",
      },
      {
        name: "Pine Creek / Snake River Confluence Take-Out",
        latitude: 43.477242,
        longitude: -111.44134,
        mileFromStart: 10.7,
        note: "American Whitewater lower endpoint; confirm a safe landing and lawful vehicle staging before launch.",
      },
    ],
    camping:
      "No on-route camping is assumed. Use a lawful Teton Valley or Swan Valley basecamp and confirm current Forest Service/BLM camping, fire, sanitation, and road rules before relying on an overnight plan.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage the Snake River vehicle first, then inspect the Highway 21 approach and upper carry. Allow a full day for the remote shuttle, road delays, scouting, and a contingency take-out; do not rely on cell coverage in the canyon.",
    permits:
      "Follow Idaho AIS/PFD requirements, current Forest Service/BLM and county road rules, private-property boundaries, fire restrictions, and any Snake River access or closure notices.",
    watchFor: [
      "Class III-IV blind corners and wood",
      "rapidly changing local flow",
      "cold water and remote rescue",
      "Highway 21 road and parking uncertainty",
      "private inholdings",
      "Snake River confluence landing",
    ],
    season: [5, 6, 7],
    imageUrl: tetonImage,
    imageLabel: "Teton watershed context photograph; not a Pine Creek endpoint or current-conditions image",
  }),

  makeRoute({
    id: "henrys-lake-south-shore-loop",
    riverId: "henrys-lake-idaho",
    name: "Henrys Lake",
    reach: "South Shore Boat Access shoreline loop",
    region: "Eastern Idaho / Island Park",
    routeType: "recreational",
    summary:
      "A flexible six-mile high-elevation flatwater loop from the BLM South Shore access.",
    statusText:
      "Planning-only lake route. The official site provides an undeveloped ramp and primitive camping, but wind, lightning, cold water, shallow lake conditions, wildlife, and seasonal road access require a shoreline plan and early turnaround.",
    distance: "About 6 lake miles out and back",
    time: "About 2-5 hours",
    difficulty: "moderate",
    risk: "caution",
    hazards: [
      "wind",
      "cold_water",
      "remote",
      "low_water",
      "mandatory_takeout",
      "access_uncertain",
    ],
    safety: [
      "Stay close enough to the launch-side shore to land safely before wind or lightning builds; wear PFDs and carry cold-water protection and emergency communication.",
      "The route is a planning loop, not a marked trail. Do not land in sensitive wetlands or on private shoreline.",
    ],
    gauge: "13039000",
    gaugeName: "Henrys Lake near Lake, ID",
    gaugeMetric: "gage_height_ft",
    thresholdLabel: "BLM Henrys Lake access and boating requirements",
    sourceUrl: "https://www.blm.gov/visit/henrys-lake-boat-access",
    sourceLabel: "BLM Henrys Lake Boat Access",
    putIn: {
      name: "Henrys Lake South Shore Boat Access",
      latitude: 44.614582,
      longitude: -111.417834,
      mileFromStart: 0,
      note: "BLM undeveloped ramp and primitive campground.",
    },
    takeOut: {
      name: "Henrys Lake South Shore Boat Access",
      latitude: 44.614582,
      longitude: -111.417834,
      mileFromStart: 6,
      note: "Return to the same public ramp; no remote shoreline take-out is assumed.",
    },
    access: [
      {
        name: "Henrys Lake South Shore Boat Access",
        latitude: 44.614582,
        longitude: -111.417834,
        mileFromStart: 0,
        note: "Public launch.",
      },
      {
        name: "South-shore open-water turnaround",
        latitude: 44.6382,
        longitude: -111.3744,
        mileFromStart: 3,
        note: "Planning waypoint only; no landing or access right is implied.",
        segmentKind: "lake",
      },
      {
        name: "Henrys Lake South Shore Boat Access",
        latitude: 44.614582,
        longitude: -111.417834,
        mileFromStart: 6,
        note: "Return landing.",
      },
    ],
    camping:
      "Primitive endpoint camping is available under current BLM rules; pack out waste and do not camp on sensitive or private shoreline.",
    campingClassification: "endpoint_campground",
    shuttle:
      "No shuttle. Launch and recover at South Shore; verify the primitive road and ramp before committing.",
    permits:
      "Idaho invasive-species sticker is required for most non-motorized vessels (inflatable craft under 10 feet exempt); follow current BLM camping and PFD rules.",
    watchFor: [
      "wind, lightning, and cold water",
      "shallow-water grounding",
      "sensitive wetlands and private shoreline",
    ],
    imageUrl: henrysImage,
    imageLabel: "Henrys Lake State Park same-lake context photograph",
  }),

  makeRoute({
    id: "henrys-fork-lower-mesa-warm-river",
    riverId: "henrys-fork-idaho",
    name: "Henrys Fork",
    reach: "Lower Mesa Falls to Warm River",
    region: "Eastern Idaho / Mesa Falls",
    routeType: "whitewater",
    summary:
      "A 6.7-mile Class II+ Henrys Fork reach beginning at the Lower Mesa Falls put-in and ending at the Warm River access, with a USGS Ashton gauge window and a mandatory waterfall-aware launch plan.",
    statusText:
      "Gauge-scored expert-access route. American Whitewater publishes a 1,000-3,500 cfs runnable window on the Henrys Fork near Ashton gauge; the put-in is immediately below the Lower Mesa Falls drops and the downstream reach eases to Class II+.",
    distance: "About 6.7 river miles",
    time: "About 2-4 hours below the falls, plus a full scout and shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "mandatory_takeout", "waterfall", "access_uncertain"],
    safety: [
      "The launch is at the base of Lower Mesa Falls, a two-tier waterfall with a steep hike and no casual roadside put-in. Only a crew that has personally inspected the landing and waterfall lines should consider launching here.",
      "Below the falls the reach is mostly mild Class II+ water, but cold water, wood, changing channels, and the inability to exit quickly still require a whitewater-capable craft and worn PFD.",
      "Use 1,000 cfs as the lower runnable cue and 3,500 cfs as the upper cue on USGS 13046000; the gauge is a planning input, never permission to run the falls or ignore same-day inspection.",
    ],
    gauge: "13046000",
    gaugeName: "Henrys Fork near Ashton, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 1000, idealMin: 1400, idealMax: 2600, tooHigh: 3500 },
    thresholdLabel: "American Whitewater runnable window: 1,000-3,500 cfs on the Henrys Fork near Ashton gauge",
    thresholdUrl: henrysLowerMesaAwReach,
    thresholdSupportUrl: henrysLowerMesaGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "scored",
    sourceUrl: henrysLowerMesaAwReach,
    sourceLabel: "American Whitewater Lower Mesa Falls-to-Warm River reach record",
    mapUrl: henrysLowerMesaAwReach.replace("/main", "/map"),
    additionalSourceLinks: [
      { label: "American Whitewater Lower Mesa Falls put-in access", url: henrysLowerMesaPutInAccess },
      { label: "American Whitewater Warm River take-out access", url: henrysLowerMesaTakeOutAccess },
      { label: "USGS Henrys Fork near Ashton gauge", url: henrysLowerMesaGauge },
      { label: "Caribou-Targhee Forest Service boating access", url: caribouTargheeAccessGuide },
      { label: "Fremont County Mesa Falls scenic access roads", url: "https://www.fremontcountyid.gov/192/Scenic-Drives" },
    ],
    putIn: {
      name: "Lower Mesa Falls base-of-falls put-in",
      latitude: 44.17407,
      longitude: -111.31915,
      mileFromStart: 0,
      note: "American Whitewater access point at the base of Lower Mesa Falls; reach it by the Mesa Falls Scenic Drive/Upper Mesa Falls parking approach and inspect the hike and landing before carrying boats.",
    },
    takeOut: {
      name: "Warm River take-out",
      latitude: 44.11095,
      longitude: -111.33502,
      mileFromStart: 6.7,
      note: "American Whitewater Warm River access point; confirm the current landing, parking, and road conditions before launch.",
    },
    access: [
      {
        name: "Lower Mesa Falls base-of-falls put-in",
        latitude: 44.17407,
        longitude: -111.31915,
        mileFromStart: 0,
        note: "Named American Whitewater access; waterfall landing and carry are not a casual public ramp.",
      },
      {
        name: "Warm River take-out",
        latitude: 44.11095,
        longitude: -111.33502,
        mileFromStart: 6.7,
        note: "Named American Whitewater take-out; verify current public parking and shoreline access.",
      },
    ],
    camping: "Use developed Forest Service, state, or private campground/lodging options near Mesa Falls and Warm River; no on-route camping is assumed.",
    campingClassification: "nearby_basecamp",
    shuttle: "Stage the Warm River vehicle first, then use the Mesa Falls Scenic Drive and Upper Mesa Falls approach; account for the long boat carry and fee-area rules.",
    permits: "Follow Forest Service and fee-area rules, Idaho AIS/PFD requirements, fire restrictions, and all posted Mesa Falls closure boundaries.",
    watchFor: ["Lower Mesa Falls waterfall launch", "cold water and wood", "changing channels", "Warm River landing and parking"],
    season: [5, 6, 7, 8],
    imageUrl: henrysImage,
    imageLabel: "Henrys Fork / Mesa Falls watershed context photograph",
  }),

  makeRoute({
    id: "deadwood-river-upper-reservoir-julie",
    riverId: "deadwood-river-idaho",
    name: "Deadwood River",
    reach: "Deadwood Reservoir to Julie Creek",
    region: "Southwest Idaho / Boise National Forest",
    routeType: "whitewater",
    summary:
      "A 14-mile Class IV-V Upper Deadwood backcountry run below Deadwood Dam to the former Julie Creek Campground, with a direct release gauge and a mandatory continuation plan because the old vehicle access has washed out.",
    statusText:
      "Planning-only expert route. American Whitewater documents a 400-2,000 cfs direct-release runnable window, current wood portages, and the loss of vehicle access at Julie Creek; parties normally continue into the existing Lower Deadwood reach to Deadwood Campground.",
    distance: "About 14.3 river miles to Julie Creek; about 23 miles if continuing to Deadwood Campground",
    time: "About 6-8 hours to Julie Creek, or a full day to the lower take-out, plus a long remote shuttle",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "strainers", "remote", "fast_rise", "portage", "access_uncertain"],
    safety: [
      "The Upper Deadwood is continuous Class IV with Class V rapids and frequent large wood. Scout every horizon line, portage whenever wood or hydraulics are uncertain, and carry rescue gear and satellite communication.",
      "Julie Creek Campground is a former endpoint with no vehicle access. The practical exit is to continue through the Lower Deadwood to the existing Deadwood Campground take-out; do not plan a vehicle shuttle to Julie Creek.",
      "Use the direct Deadwood release gauge's 400-2,000 cfs runnable envelope only as planning context. Dam releases, current wood, cold water, and same-day inspection control the decision.",
    ],
    gauge: "13236500",
    gaugeName: "Deadwood River below Deadwood Reservoir near Lowman, ID",
    thresholdModel: "two-sided",
    threshold: { tooLow: 400, idealMin: 700, idealMax: 1300, tooHigh: 2000 },
    thresholdLabel: "American Whitewater direct-release runnable window: 400-2,000 cfs",
    thresholdUrl: upperDeadwoodAwReach,
    thresholdSupportUrl: upperDeadwoodGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: upperDeadwoodAwReach,
    sourceLabel: "American Whitewater Upper Deadwood reach record",
    mapUrl: upperDeadwoodAwReach.replace("/main", "/map"),
    additionalSourceLinks: [
      { label: "American Whitewater Deadwood Reservoir put-in", url: upperDeadwoodPutInAccess },
      { label: "American Whitewater Julie Creek/Deadwood Campground take-out record", url: upperDeadwoodTakeOutAccess },
      { label: "USGS Deadwood release gauge", url: upperDeadwoodGauge },
      { label: "Boise National Forest Deadwood Reservoir access", url: "https://www.fs.usda.gov/recarea/boise/recarea/?recid=5038" },
      { label: "Existing Lower Deadwood continuation route", url: lowerDeadwoodAwReach },
    ],
    putIn: {
      name: "Deadwood Reservoir put-in",
      latitude: 44.29197,
      longitude: -115.64193,
      mileFromStart: 0,
      note: "Named American Whitewater access below Deadwood Dam; confirm dam-release notice, road conditions, and the actual river entry.",
    },
    takeOut: {
      name: "Julie Creek Campground (former access; continue downstream)",
      latitude: 44.14462,
      longitude: -115.65961,
      mileFromStart: 14.3,
      note: "Former Upper Deadwood endpoint and possible overnight camp, but vehicle access is gone. Continue into the Lower Deadwood to reach the existing Deadwood Campground take-out.",
    },
    access: [
      {
        name: "Deadwood Reservoir put-in",
        latitude: 44.29197,
        longitude: -115.64193,
        mileFromStart: 0,
        note: "Named access below the dam; verify release and road conditions.",
      },
      {
        name: "Julie Creek Campground (former access; continue downstream)",
        latitude: 44.14462,
        longitude: -115.65961,
        mileFromStart: 14.3,
        note: "River access/campsite only; no vehicle shuttle. Continue downstream for the public Deadwood Campground take-out.",
      },
    ],
    camping: "Julie Creek is a possible primitive overnight camp; the practical developed endpoint is the existing Deadwood Campground on the lower reach. Verify Forest Service status and fire restrictions.",
    campingClassification: "on_route_campsite",
    shuttle: "Long remote shuttle to Deadwood Reservoir, with no vehicle access at Julie Creek. Stage the lower Deadwood vehicle separately or commit to the full continuation to Deadwood Campground.",
    permits: "Follow Boise National Forest road, reservoir, campground, fire, and dam-release rules; Idaho AIS/PFD requirements; and current closure notices.",
    watchFor: ["large wood and portage decisions", "Class V drops", "cold dam-release water", "former Julie Creek access", "remote shuttle"],
    season: [6, 7, 8, 9],
    imageUrl: boiseImage,
    imageLabel: "Deadwood / Boise National Forest watershed context photograph",
  }),

  makeRoute({
    id: "west-fork-bruneau-rowland-indian-hot-springs",
    riverId: "bruneau-river-idaho",
    name: "West Fork Bruneau",
    reach: "Below Rowland, Nevada to Indian Hot Springs",
    region: "Southwest Idaho / Bruneau-Jarbidge wilderness corridor",
    routeType: "whitewater",
    summary:
      "A 34-mile Class IV-V West Fork Bruneau expedition from the Rowland access in Nevada through remote canyon to Indian Hot Springs, with a downstream Hot Spring gauge reference and multi-day self-support logistics.",
    statusText:
      "Planning-only expert expedition. American Whitewater describes 220-250 cfs Rowland-gauge conditions as deep enough for the run and publishes a 450-2,500 cfs runnable window on the downstream Hot Spring gauge; access roads are remote and the route has no quick exits.",
    distance: "About 34 river miles",
    time: "About 3-5 days self-support",
    difficulty: "hard",
    risk: "advanced",
    hazards: ["whitewater", "cold_water", "remote", "strainers", "fast_rise", "portage", "access_uncertain", "wildlife"],
    safety: [
      "This is a remote Class IV-V expedition with poison ivy, barbed wire potential, wood, cattle impacts, and long sections without road access. Bring expedition rescue equipment, satellite communication, water treatment, and a conservative portage plan.",
      "American Whitewater recommends the Rowland, Nevada road approach rather than confusing hard-core tracks to Blackrock Crossing. Confirm land status, road conditions, and the current take-out before committing.",
      "Use 450 cfs as the lower and 2,500 cfs as the upper planning cue on USGS 13168500 near Hot Spring; the gauge is downstream reference context and does not substitute for local Rowland flow, weather, or rapid inspection.",
    ],
    gauge: "13168500",
    gaugeName: "Bruneau River near Hot Spring, ID (downstream proxy)",
    gaugeKind: "proxy",
    thresholdModel: "two-sided",
    threshold: { tooLow: 450, idealMin: 700, idealMax: 1500, tooHigh: 2500 },
    thresholdLabel: "American Whitewater downstream-gauge runnable window: 450-2,500 cfs; trip reports note 220-250 cfs on the Rowland gauge can still provide depth",
    thresholdUrl: westForkBruneauAwReach,
    thresholdSupportUrl: westForkBruneauGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: westForkBruneauAwReach,
    sourceLabel: "American Whitewater West Fork Bruneau reach record",
    mapUrl: westForkBruneauAwReach.replace("/main", "/map"),
    additionalSourceLinks: [
      { label: "American Whitewater Rowland put-in access", url: westForkBruneauPutInAccess },
      { label: "American Whitewater Indian Hot Springs take-out access", url: westForkBruneauTakeOutAccess },
      { label: "USGS Bruneau River near Hot Spring gauge", url: westForkBruneauGauge },
      { label: "BLM Bruneau-Jarbidge-Owyhee boater guide", url: owyheeBoaterGuide },
      { label: "BLM Bruneau-Jarbidge-Owyhee access and wilderness guidance", url: bruneauPage },
    ],
    putIn: {
      name: "Rowland, Nevada road access",
      latitude: 41.95,
      longitude: -115.68555,
      mileFromStart: 0,
      note: "Named American Whitewater access near Rowland, Nevada; use the established approach and verify current road, land-status, and river-entry conditions.",
    },
    takeOut: {
      name: "Indian Hot Springs take-out",
      latitude: 42.58055,
      longitude: -115.63722,
      mileFromStart: 34,
      note: "Named American Whitewater take-out at Indian Hot Springs; confirm the public landing, parking, and any BLM restrictions before launch.",
    },
    access: [
      {
        name: "Rowland, Nevada road access",
        latitude: 41.95,
        longitude: -115.68555,
        mileFromStart: 0,
        note: "Remote road-based put-in; route status and land access require current verification.",
      },
      {
        name: "Indian Hot Springs take-out",
        latitude: 42.58055,
        longitude: -115.63722,
        mileFromStart: 34,
        note: "Remote named take-out; verify shoreline, parking, and current BLM conditions.",
      },
    ],
    camping: "American Whitewater describes ample scattered canyon camps; use durable sites, filter water, pack out waste, and follow current BLM restrictions. No developed endpoint campground is assumed.",
    campingClassification: "on_route_campsite",
    shuttle: "Stage the Indian Hot Springs vehicle and arrange a reliable Rowland shuttle; the approach roads are remote dirt tracks and may be impassable when wet.",
    permits: "Follow BLM Bruneau-Jarbidge-Owyhee boating, wilderness, fire, and land-status rules; Idaho AIS/PFD requirements; and all current closure notices.",
    watchFor: ["Pintoe, Al Beam Falls, and Julie Wilson Falls", "poison ivy and barbed wire", "wood and cattle impacts", "heat, water treatment, and long roadless sections"],
    season: [4, 5, 6],
    imageUrl: northForkOwyheeImage,
    imageLabel: "Bruneau-Jarbidge-Owyhee canyon context photograph",
  }),

  makeRoute({
    id: "teton-river-upper-fox-creek-highway-33",
    riverId: "teton-river-idaho",
    name: "Teton River",
    reach: "Fox Creek East to Highway 33 Bridge (Upper Teton)",
    region: "Eastern Idaho / Teton Valley",
    routeType: "recreational",
    summary:
      "A 21-mile Class I-II Upper Teton float from Fox Creek East to the Highway 33 bridge, with shallow braided channels, five named access points, and a direct Driggs-area gauge.",
    statusText:
      "Planning-only low-flow route. American Whitewater describes this as easy water that is shallow but boatable at all flows; its current page labels 240 cfs low runnable. Treat that number as a local planning cue, not a hard cutoff, and verify channel depth, bushes, access parking, weather, and same-day closures before launch.",
    distance: "About 21 river miles, with shorter public-access segments available",
    time: "About 5-8 hours for the full reach; shorter segments can be staged at South Bates, Bates, or Packsaddle",
    difficulty: "easy",
    risk: "caution",
    hazards: ["low_water", "strainers", "cold_water", "fast_rise", "private_banks", "access_uncertain"],
    safety: [
      "American Whitewater describes no sustained whitewater, but shallow braided channels and overhanging bushes can still pin or strand an unprepared boat. Use a craft appropriate for shallow water and wear a PFD throughout.",
      "The 240 cfs American Whitewater reading is a low-runnable reference for this reach, not a guaranteed minimum. Channel depth, weed growth, debris, and the usable branch can change within the same flow band; inspect the first mile and turn around before committing to a braid.",
      "Use only designated access parking. Teton County restricts roadside parking near Fox Creek East, South Bates, and Bates/Buxton, and the old south-side Bates access was decommissioned; confirm the current public-side entrance and daylight rules.",
      "The upper Teton is a long, exposed day with limited convenient exits between access points. Carry communication, water, warm layers, and a shuttle plan; do not assume every bridge or private bank is a legal landing.",
    ],
    gauge: "13052200",
    gaugeName: "Teton River above South Leigh Creek near Driggs, ID",
    gaugeKind: "direct",
    thresholdModel: "minimum-only",
    threshold: { tooLow: 240, idealMin: 240 },
    thresholdLabel: "American Whitewater reach cue: 240 cfs was labeled low runnable; the reach is described as boatable at all flows, so this is a planning cue rather than a hard cutoff",
    thresholdUrl: upperTetonAwReach,
    thresholdSupportUrl: upperTetonGauge,
    thresholdSourceStrength: "mixed",
    scoreEligibility: "planning",
    sourceUrl: upperTetonAwReach,
    sourceLabel: "American Whitewater Upper Teton reach record",
    mapUrl: upperTetonMap,
    additionalSourceLinks: [
      { label: "American Whitewater Fox Creek East access", url: upperTetonFoxAccess },
      { label: "American Whitewater South Bates Bridge access", url: upperTetonSouthBatesAccess },
      { label: "Idaho Fish and Game Bates Bridge access site", url: upperTetonBatesAccess },
      { label: "American Whitewater Bates Bridge access", url: upperTetonBatesAwAccess },
      { label: "American Whitewater Packsaddle Bridge access", url: upperTetonPacksaddleAccess },
      { label: "American Whitewater Highway 33 take-out access", url: upperTetonHighway33Access },
      { label: "USGS Teton River above South Leigh Creek gauge", url: upperTetonGauge },
      { label: "Teton River public-access map and rules", url: upperTetonMap },
      { label: "Teton County river parking and access ordinance", url: upperTetonCountyRules },
    ],
    putIn: {
      name: "Fox Creek East access",
      latitude: 43.65052412187438,
      longitude: -111.1666384566103,
      mileFromStart: 0,
      note: "American Whitewater/IDFG access anchor with a short carry to the water; use designated parking and confirm the current public entrance before launching.",
    },
    takeOut: {
      name: "Highway 33 Bridge take-out",
      latitude: 43.82533001804893,
      longitude: -111.23296414251719,
      mileFromStart: 21,
      note: "Named American Whitewater endpoint; confirm the legal river-side carry, bridge staging, and downstream boundary before extending the trip.",
    },
    access: [
      {
        name: "Fox Creek East access",
        latitude: 43.65052412187438,
        longitude: -111.1666384566103,
        mileFromStart: 0,
        note: "Short walk to the river; suitable for small craft. Designated parking and current access rules apply.",
      },
      {
        name: "South Bates Bridge",
        latitude: 43.69620344532112,
        longitude: -111.16562102174578,
        mileFromStart: 3.58,
        note: "Upper-most trailer-ramp access in the American Whitewater description; use the current public-side parking and ramp.",
      },
      {
        name: "Bates Bridge / Buxton River Park",
        latitude: 43.723679782960744,
        longitude: -111.18754457657357,
        mileFromStart: 7.1,
        note: "Popular public access with IDFG-managed ramp context; day-use, parking, and current county rules apply.",
      },
      {
        name: "Packsaddle Bridge",
        latitude: 43.78129093840931,
        longitude: -111.2100738617457,
        mileFromStart: 14.69,
        note: "Named American Whitewater access anchor; confirm current parking, carry, and lawful landing at the bridge.",
      },
      {
        name: "Highway 33 Bridge take-out",
        latitude: 43.82533001804893,
        longitude: -111.23296414251719,
        mileFromStart: 21,
        note: "Named take-out above the separate Teton canyon routes; do not continue downstream without a new plan and current access confirmation.",
      },
    ],
    camping:
      "No overnight camping is assumed on the route. Big Eddy has a campground in the American Whitewater description, but verify current reservation, day-use, fire, sanitation, and private-bank rules before relying on it.",
    campingClassification: "nearby_basecamp",
    shuttle:
      "Stage the downstream vehicle first and use the named South Bates, Bates/Buxton, Packsaddle, or Highway 33 access points for shorter segments. Parking is managed at designated sites; do not stage on county roads or private frontage.",
    permits:
      "Follow Idaho AIS/PFD rules, IDFG access-site rules, Teton County designated-parking and daylight requirements, wildlife/nesting protections, private-bank boundaries, and current weather or closure notices.",
    watchFor: ["shallow braided channels", "overhanging bushes and strainers", "cold water", "fast weather rise", "designated parking only", "private or sensitive banks"],
    season: [6, 7, 8, 9],
    imageUrl: tetonImage,
    imageLabel: "Teton River southeast Idaho corridor photograph",
  }),
];
