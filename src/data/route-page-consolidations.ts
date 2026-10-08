const willimanticRouteSlugs = [
  'willimantic-river-commuter-nye-holman',
  'willimantic-river-nye-holman-heron-cove',
  'willimantic-river-heron-cove-pecks-mill',
  'willimantic-river-pecks-mill-merrow-meadow',
  'willimantic-river-merrow-river-park',
  'willimantic-river-river-park-eagleville-lake',
  'willimantic-river-eagleville-route-66',
  'willimantic-river-commuter-heron-cove',
  'willimantic-river-commuter-pecks-mill',
  'willimantic-river-commuter-merrow-meadow',
  'willimantic-river-commuter-river-park',
  'willimantic-river-commuter-eagleville-lake',
  'willimantic-river-nye-holman-pecks-mill',
  'willimantic-river-nye-holman-merrow-meadow',
  'willimantic-river-nye-holman-river-park',
  'willimantic-river-heron-cove-merrow-meadow',
  'willimantic-river-heron-cove-river-park',
  'willimantic-river-nye-holman-eagleville-lake',
  'willimantic-river-heron-cove-eagleville-lake',
  'willimantic-river-pecks-mill-river-park',
  'willimantic-river-pecks-mill-eagleville-lake',
  'willimantic-river-merrow-eagleville-lake',
  'willimantic-river-river-park-eagleville-downstream',
  'willimantic-river-merrow-eagleville-downstream',
  'willimantic-river-heron-cove-eagleville-downstream',
  'willimantic-river-pecks-mill-eagleville-downstream',
  'willimantic-river-nye-holman-eagleville-downstream',
  'willimantic-river-commuter-eagleville-downstream',
  'willimantic-river-commuter-route-66',
  'willimantic-river-nye-holman-route-66',
  'willimantic-river-heron-cove-route-66',
  'willimantic-river-pecks-mill-route-66',
  'willimantic-river-merrow-route-66',
  'willimantic-river-river-park-route-66',
] as const;

const willimanticHubPath = '/rivers/by-river/willimantic-river-connecticut/';
const blackCreekHubPath = '/rivers/by-river/black-creek-mississippi/';
const blackfootHubPath = '/rivers/by-river/blackfoot-river-montana/';
const woonasquatucketHubPath = '/rivers/by-river/woonasquatucket-river-rhode-island/';
const suwanneeHubPath = '/rivers/by-river/suwannee-river-florida/';
const bayouTecheHubPath = '/rivers/by-river/bayou-teche-river-louisiana/';
const willametteHubPath = '/rivers/by-river/willamette-river-oregon/';
const greenRiverHubPath = '/rivers/by-river/green-river-kentucky/';
const floydsForkHubPath = '/rivers/by-river/floyds-fork/';
const millersHubPath = '/rivers/by-river/millers-river-massachusetts/';
const bayouDeViewHubPath = '/rivers/by-river/bayou-deview/';
const americanRiverHubPath = '/rivers/by-river/american-river-california/';
const loupRiverHubPath = '/rivers/by-river/loup-river/';
const verdeRiverHubPath = '/rivers/by-river/verde-river-arizona/';
const broadRiverHubPath = '/rivers/by-river/broad-river/';
const animasRiverHubPath = '/rivers/by-river/animas-river-new-mexico/';
const housatonicRiverHubPath = '/rivers/by-river/housatonic-river-massachusetts/';
const sanJuanRiverHubPath = '/rivers/by-river/san-juan-river-new-mexico/';
const crowWingRiverHubPath = '/rivers/by-river/crow-wing-river/';
const chattahoocheeHubPath = '/rivers/by-river/chattahoochee-river/';
const saukRiverHubPath = '/rivers/by-river/sauk-river/';
const truckeeRiverHubPath = '/rivers/by-river/truckee-river-nevada/';
const farmingtonRiverHubPath = '/rivers/by-river/farmington-river-connecticut/';
const susquehannaRiverHubPath = '/rivers/by-river/susquehanna-river/';
const merrimackRiverHubPath = '/rivers/by-river/merrimack-river-new-hampshire/';
const spokaneRiverHubPath = '/rivers/by-river/spokane-river-washington/';
const saludaRiverHubPath = '/rivers/by-river/saluda-river/';
const wabashRiverHubPath = '/rivers/by-river/wabash-river/';

const wabashRiverConsolidatedRouteSlugs = [
  'wabash-river-linn-grove-white-bridge',
  'wabash-river-vera-cruz-kehoe-park',
  'wabash-river-vera-cruz-hale-street',
  'wabash-river-linn-grove-hale-street',
] as const;

const villageCreekHubPath = '/rivers/by-river/village-creek/';
const villageCreekConsolidatedRouteSlugs = [
  'village-creek-fm418-sh327',
  'village-creek-sh327-baby-galvez',
  'village-creek-fm418-baby-galvez',
  'village-creek-baby-galvez-us-96',
  'village-creek-sh327-us-96',
  'village-creek-us-96-state-park',
  'village-creek-baby-galvez-state-park',
  'village-creek-fm418-state-park',
] as const;

const elevenPointRiverHubPath = '/rivers/by-river/eleven-point-river/';
const elevenPointRiverConsolidatedRouteSlugs = [
  'eleven-point-river-cane-bluff-greer-crossing',
  'eleven-point-river-cane-bluff-narrows',
  'eleven-point-river-cane-bluff-riverton',
  'eleven-point-river-cane-bluff-turner-mill',
  'eleven-point-river-cane-bluff-whitten',
  'eleven-point-river-greer-crossing-narrows',
  'eleven-point-river-greer-crossing-riverton',
  'eleven-point-river-greer-crossing-turner-mill',
  'eleven-point-river-greer-crossing-turner-mill-south',
  'eleven-point-river-greer-crossing-whitten',
  'eleven-point-river-riverton-narrows',
  'eleven-point-river-thomasville-cane-bluff',
  'eleven-point-river-thomasville-turner-mill-south',
  'eleven-point-river-thomasville-whitten',
  'eleven-point-river-turner-mill-south-narrows',
  'eleven-point-river-turner-mill-south-riverton',
  'eleven-point-river-turner-mill-south-whitten',
  'eleven-point-river-whitten-riverton',
  'eleven-point-river-whitten-narrows',
] as const;

const jacksForkRiverHubPath = '/rivers/by-river/jacks-fork-river/';
const jacksForkRiverConsolidatedRouteSlugs = [
  'jacks-fork-river-alley-spring-chilton',
  'jacks-fork-river-bay-creek-chilton',
  'jacks-fork-river-bay-creek-alley-spring',
  'jacks-fork-river-blue-spring-alley-spring',
  'jacks-fork-river-blue-spring-bay-creek',
  'jacks-fork-river-blue-spring-chilton',
  'jacks-fork-river-blue-spring-rymers',
  'jacks-fork-river-highway-17-chilton',
  'jacks-fork-river-highway-17-alley-spring',
  'jacks-fork-river-highway-17-bay-creek',
  'jacks-fork-river-highway-17-blue-spring',
  'jacks-fork-river-buck-hollow-rymers',
  'jacks-fork-river-rymers-alley-spring',
  'jacks-fork-river-rymers-bay-creek',
  'jacks-fork-river-rymers-chilton',
] as const;

const currentRiverHubPath = '/rivers/by-river/current-river/';
const currentRiverConsolidatedRouteSlugs = [
  'current-river-akers-ferry-round-spring',
  'current-river-cedar-grove-round-spring',
  'current-river-van-buren-cataract',
  'current-river-van-buren-gooseneck',
  'current-river-waymeyer-gooseneck',
] as const;

const yellowBreechesHubPath = '/rivers/by-river/yellow-breeches-creek/';
const yellowBreechesConsolidatedRouteSlugs = [
  'yellow-breeches-creek-simpson-park-lower-allen-community-park',
  'yellow-breeches-creek-mccormick-park-liberty-forge',
  'yellow-breeches-creek-lower-allen-community-park-yellow-breeches-park',
] as const;

const saltRiverHubPath = '/rivers/by-river/salt-river-arizona/';
const saltRiverConsolidatedRouteSlugs = [
  'salt-river-water-users-goldfield',
  'salt-river-water-users-phon-d',
  'salt-river-water-users-granite-reef',
  'salt-river-blue-point-phon-d',
  'salt-river-blue-point-granite-reef',
  'salt-river-goldfield-granite-reef',
] as const;

const merrimackRiverConsolidatedRouteSlugs = [
  'merrimack-river-sewalls-falls-ferry-street',
  'merrimack-river-everett-arena-ferry-street',
  'merrimack-river-ferry-street-lambert-park',
  'merrimack-river-sewalls-bow',
  'merrimack-river-bow-lambert-park',
  'merrimack-river-boscawen-intervale',
  'merrimack-river-intervale-riverland',
  'merrimack-river-boscawen-riverland',
  'merrimack-river-boscawen-bow',
  'merrimack-river-boscawen-lambert-park',
  'merrimack-river-intervale-sewalls-falls',
  'merrimack-river-intervale-bow',
  'merrimack-river-intervale-lambert-park',
  'merrimack-river-sewalls-lambert-park',
] as const;

const spokaneRiverConsolidatedRouteSlugs = [
  'spokane-river-harvard-mission',
  'spokane-river-harvard-sullivan',
  'spokane-river-harvard-mirabeau',
  'spokane-river-harvard-islands',
  'spokane-river-harvard-plantes-ferry',
  'spokane-river-harvard-boulder-beach',
  'spokane-river-harvard-upriver-dam',
  'spokane-river-barker-mission',
  'spokane-river-barker-sullivan',
  'spokane-river-barker-islands',
  'spokane-river-barker-plantes-ferry',
  'spokane-river-barker-upriver-dam',
  'spokane-river-tj-meenach-nine-mile-dam',
  'spokane-river-tj-meenach-aubrey-white',
  'spokane-river-aubrey-white-plese-flats',
  'spokane-river-aubrey-white-nine-mile-dam',
  'spokane-river-redband-tj-meenach',
  'spokane-river-redband-aubrey-white',
  'spokane-river-redband-plese-flats',
  'spokane-river-redband-nine-mile-dam',
] as const;

const saludaRiverConsolidatedRouteSlugs = [
  'saluda-river-saluda-shoals-gardendale',
] as const;

const saludaRiverLaunchAliasSlugs = [
  'saluda-river-hope-ferry-gardendale',
] as const;

const saludaRiverAccessNoteRouteSlugs = [
  'saluda-river-saluda-shoals-hope-ferry',
  'saluda-river-saluda-shoals-i26',
  'saluda-river-gardendale-i26',
  'saluda-river-hope-ferry-i26',
] as const;

const susquehannaConsolidatedRouteSlugs = [
  'susquehanna-river-hornbrook-wysox-township-park',
  'susquehanna-river-ulster-bridge-terrytown',
  'susquehanna-river-hornbrook-terrytown',
  'susquehanna-river-towanda-terrytown',
  'susquehanna-river-wysox-township-park-terrytown',
  'susquehanna-river-hornbrook-towanda',
  'susquehanna-river-wrays-shikellamy-west',
  'susquehanna-river-test-track-indian-head',
] as const;

const farmingtonRiverConsolidatedRouteSlugs = [
  'farmington-river-riverton-peoples-forest',
  'farmington-river-peoples-forest-181-318',
  'farmington-river-riverton-181-318',
] as const;

const farmingtonRiverRetiredRouteSlugs = [
  'farmington-river-181-318-lake-mcdonough',
  'farmington-river-riverton-lake-mcdonough',
  'farmington-river-peoples-forest-lake-mcdonough',
] as const;

const animasConsolidatedRouteSlugs = [
  'animas-river-cedar-hill-penny-lane',
  'animas-river-cedar-hill-animas-park',
  'animas-river-aztec-riverside-animas-park',
  'animas-river-aztec-riverside-boyd',
  'animas-river-penny-lane-boyd',
] as const;

const housatonicConsolidatedRouteSlugs = [
  'housatonic-river-fred-garner-woods-pond',
  'housatonic-river-decker-lee-athletic',
  'housatonic-river-fred-garner-lee-athletic',
  'housatonic-river-brookside-rannapo',
  'housatonic-river-division-covered-bridge',
  'housatonic-river-east-sheffield-rannapo',
] as const;

const sanJuanConsolidatedRouteSlugs = [
  'san-juan-river-navajo-dam-vereda',
  'san-juan-river-navajo-dam-among-waters',
  'san-juan-river-blanco-among-waters',
  'san-juan-river-among-waters-lions-park',
  'san-juan-river-vereda-westland-park',
  'san-juan-river-vereda-lions-park',
] as const;

const crowWingConsolidatedRouteSlugs = [
  'crow-wing-river-mary-brown-cottingham',
  'crow-wing-river-mary-brown-frames-landing',
  'crow-wing-river-andersons-crossing-cottingham',
  'crow-wing-river-stigmans-mound-cottingham',
  'crow-wing-river-huntersville-stigmans-mound',
] as const;

const chattahoocheeConsolidatedRouteSlugs = [
  'chattahoochee-river-abbotts-bridge-azalea-park',
  'chattahoochee-river-abbotts-bridge-don-white',
  'chattahoochee-river-abbotts-bridge-garrard-landing',
  'chattahoochee-river-abbotts-bridge-island-ford',
  'chattahoochee-river-abbotts-bridge-jones-bridge',
  'chattahoochee-river-azalea-park-overlook-park',
  'chattahoochee-river-bowmans-island-island-ford',
  'chattahoochee-river-bowmans-island-jones-bridge',
  'chattahoochee-river-bowmans-island-mcginnis-ferry',
  'chattahoochee-river-bowmans-island-medlock-bridge',
  'chattahoochee-river-chattahoochee-pointe-abbotts-bridge',
  'chattahoochee-river-chattahoochee-pointe-azalea-park',
  'chattahoochee-river-chattahoochee-pointe-don-white',
  'chattahoochee-river-chattahoochee-pointe-garrard-landing',
  'chattahoochee-river-chattahoochee-pointe-island-ford',
  'chattahoochee-river-chattahoochee-pointe-jones-bridge',
  'chattahoochee-river-chattahoochee-pointe-mcginnis-ferry',
  'chattahoochee-river-chattahoochee-pointe-medlock-bridge',
  'chattahoochee-river-chattahoochee-pointe-rogers-bridge',
  'chattahoochee-river-don-white-azalea-park',
  'chattahoochee-river-don-white-overlook-park',
  'chattahoochee-river-garrard-landing-azalea-park',
  'chattahoochee-river-garrard-landing-don-white',
  'chattahoochee-river-garrard-landing-island-ford',
  'chattahoochee-river-island-ford-azalea-park',
  'chattahoochee-river-island-ford-johnson-ferry-south',
  'chattahoochee-river-island-ford-overlook-park',
  'chattahoochee-river-island-ford-paces-mill',
  'chattahoochee-river-island-ford-powers-island',
  'chattahoochee-river-johnson-ferry-south-paces-mill',
  'chattahoochee-river-johnson-ferry-south-powers-island',
  'chattahoochee-river-johnson-ferry-paces-mill',
  'chattahoochee-river-jones-bridge-azalea-park',
  'chattahoochee-river-jones-bridge-don-white',
  'chattahoochee-river-jones-bridge-garrard-landing',
  'chattahoochee-river-jones-bridge-island-ford',
  'chattahoochee-river-jones-bridge-johnson-ferry-south',
  'chattahoochee-river-jones-bridge-paces-mill',
  'chattahoochee-river-jones-bridge-powers-island',
  'chattahoochee-river-mcginnis-ferry-abbotts-bridge',
  'chattahoochee-river-mcginnis-ferry-azalea-park',
  'chattahoochee-river-mcginnis-ferry-don-white',
  'chattahoochee-river-mcginnis-ferry-garrard-landing',
  'chattahoochee-river-mcginnis-ferry-island-ford',
  'chattahoochee-river-mcginnis-ferry-johnson-ferry-south',
  'chattahoochee-river-mcginnis-ferry-jones-bridge',
  'chattahoochee-river-mcginnis-ferry-medlock-bridge',
  'chattahoochee-river-mcginnis-ferry-rogers-bridge',
  'chattahoochee-river-medlock-bridge-azalea-park',
  'chattahoochee-river-medlock-bridge-don-white',
  'chattahoochee-river-medlock-bridge-island-ford',
  'chattahoochee-river-medlock-bridge-johnson-ferry-south',
  'chattahoochee-river-medlock-bridge-powers-island',
  'chattahoochee-river-morgan-falls-park-paces-mill',
  'chattahoochee-river-morgan-falls-park-powers-island',
  'chattahoochee-river-morgan-falls-park-whitewater-creek',
  'chattahoochee-river-overlook-park-johnson-ferry',
  'chattahoochee-river-overlook-park-paces-mill',
  'chattahoochee-river-overlook-park-powers-island',
  'chattahoochee-river-powers-island-whitewater-creek',
  'chattahoochee-river-rogers-bridge-abbotts-bridge',
  'chattahoochee-river-rogers-bridge-azalea-park',
  'chattahoochee-river-rogers-bridge-don-white',
  'chattahoochee-river-rogers-bridge-garrard-landing',
  'chattahoochee-river-rogers-bridge-island-ford',
  'chattahoochee-river-rogers-bridge-jones-bridge',
  'chattahoochee-river-rogers-bridge-medlock-bridge',
  'chattahoochee-river-whitewater-creek-paces-mill',
] as const;

const saukRiverConsolidatedRouteSlugs = [
  'sauk-river-eagle-heims-mill',
  'sauk-river-eagle-knights-of-columbus',
  'sauk-river-frogtown-eagle-park',
  'sauk-river-frogtown-heims-mill',
  'sauk-river-frogtown-knights-of-columbus',
  'sauk-river-frogtown-rockville',
  'sauk-river-horseshoe-lions-park',
  'sauk-river-knights-of-columbus-heims-mill',
  'sauk-river-mill-pond-oak-township',
  'sauk-river-miller-landing-knights-of-columbus',
  'sauk-river-richmond-horseshoe-lake',
  'sauk-river-rockville-heims-mill',
  'sauk-river-rockville-knights-of-columbus',
  'sauk-river-rockville-miller-landing',
] as const;

const truckeeRiverConsolidatedRouteSlugs = [
  'truckee-river-crissie-caughlin-cottonwood',
  'truckee-river-crissie-caughlin-idlewild',
  'truckee-river-crissie-caughlin-lockwood',
  'truckee-river-crissie-caughlin-wingfield',
  'truckee-river-crystal-peak-cottonwood',
  'truckee-river-crystal-peak-crissie-caughlin',
  'truckee-river-crystal-peak-idlewild',
  'truckee-river-crystal-peak-lockwood',
  'truckee-river-crystal-peak-wingfield',
  'truckee-river-idlewild-cottonwood',
  'truckee-river-idlewild-lockwood',
  'truckee-river-idlewild-wingfield',
  'truckee-river-mayberry-crissie-caughlin',
  'truckee-river-mayberry-idlewild',
  'truckee-river-mayberry-lockwood',
  'truckee-river-mayberry-wingfield',
  'truckee-river-wingfield-cottonwood',
  'truckee-river-wingfield-lockwood',
] as const;

const broadRiverConsolidatedRouteSlugs = [
  'broad-river-lockhart-neal-shoals',
  'broad-river-lockhart-sandy',
  'broad-river-lockhart-shelton',
  'broad-river-lockhart-strother',
  'broad-river-broad-river-landing-sandy',
  'broad-river-broad-river-landing-shelton',
  'broad-river-broad-river-landing-strother',
  'broad-river-daltons-broad-river-landing',
  'broad-river-daltons-neal-shoals',
  'broad-river-daltons-sandy',
  'broad-river-neal-shoals-shelton',
  'broad-river-neal-shoals-strother',
  'broad-river-sandy-strother',
  'broad-river-ninety-nine-islands-lockhart',
  'broad-river-ninety-nine-islands-broad-river-landing',
  'broad-river-daltons-shelton',
  'broad-river-daltons-strother',
] as const;

const blackCreekCompositeRouteSlugs = [
  'black-creek-big-creek-cypress',
  'black-creek-janice-fairley',
  'black-creek-big-creek-fairley',
  'black-creek-big-creek-janice',
  'black-creek-old-highway-49-janice',
  'black-creek-old-highway-49-cypress',
  'black-creek-old-highway-49-fairley',
  'black-creek-churchwell-old-highway-49',
  'black-creek-moodys-cypress',
  'black-creek-moodys-fairley',
  'black-creek-old-highway-49-ashe-nursery',
  'black-creek-big-creek-ashe-nursery',
  'black-creek-churchwell-ashe-nursery',
  'black-creek-big-creek-moodys',
  'black-creek-churchwell-moodys',
  'black-creek-churchwell-janice',
  'black-creek-churchwell-cypress',
  'black-creek-churchwell-fairley',
  'black-creek-ashe-nursery-moodys',
  'black-creek-ashe-nursery-janice',
  'black-creek-ashe-nursery-cypress',
  'black-creek-ashe-nursery-fairley',
] as const;

const lamoilleCompositeRouteSlugs = [
  'lamoille-river-cadyville-arrowhead',
  'lamoille-river-cadyville-dog-head',
  'lamoille-river-cadyville-dorothy-smith',
  'lamoille-river-cadyville-fairfax',
  'lamoille-river-dog-head-arrowhead',
  'lamoille-river-dog-head-fairfax',
  'lamoille-river-dorothy-smith-arrowhead',
  'lamoille-river-oxbow-arrowhead',
  'lamoille-river-oxbow-cadyville',
  'lamoille-river-oxbow-dog-head',
  'lamoille-river-oxbow-dorothy-smith',
  'lamoille-river-oxbow-fairfax',
  'lamoille-river-oxbow-waterman',
  'lamoille-river-upper-access-arrowhead',
  'lamoille-river-upper-access-cadyville',
  'lamoille-river-upper-access-dog-head',
  'lamoille-river-upper-access-dorothy-smith',
  'lamoille-river-upper-access-fairfax',
  'lamoille-river-upper-access-waterman',
  'lamoille-river-waterman-arrowhead',
  'lamoille-river-waterman-dog-head',
  'lamoille-river-waterman-dorothy-smith',
  'lamoille-river-waterman-fairfax',
] as const;

const woonasquatucketAccessGapRouteSlugs = [
  'woonasquatucket-river-georgiaville-manton',
  'woonasquatucket-river-georgiaville-riverside',
  'woonasquatucket-river-georgiaville-waterplace',
  'woonasquatucket-river-georgiaville-south-water',
  'woonasquatucket-river-whipple-manton',
  'woonasquatucket-river-whipple-riverside',
  'woonasquatucket-river-whipple-waterplace',
  'woonasquatucket-river-whipple-south-water',
  'woonasquatucket-river-esmond-manton',
  'woonasquatucket-river-esmond-riverside',
  'woonasquatucket-river-esmond-waterplace',
  'woonasquatucket-river-esmond-south-water',
  'woonasquatucket-river-cricket-manton',
  'woonasquatucket-river-cricket-riverside',
  'woonasquatucket-river-cricket-waterplace',
  'woonasquatucket-river-cricket-south-water',
] as const;

const woonasquatucketUpperCompositeRouteSlugs = [
  'woonasquatucket-river-georgiaville-whipple',
  'woonasquatucket-river-georgiaville-esmond',
  'woonasquatucket-river-esmond-cricket',
  'woonasquatucket-river-whipple-esmond',
  'woonasquatucket-river-whipple-cricket',
] as const;

const suwanneeConsolidatedRouteSlugs = [
  'suwannee-river-gibson-dowling-park',
  'suwannee-river-state-park-lafayette-blue',
  'suwannee-river-gibson-lafayette-blue',
  'suwannee-river-spirit-holton-creek',
  'suwannee-river-holton-suwannee-state-park',
  'suwannee-river-holton-dowling-park',
  'suwannee-river-spirit-suwannee-state-park',
  'suwannee-river-spirit-dowling-park',
  'suwannee-river-spirit-lafayette-blue',
  'suwannee-river-state-park-peacock-slough',
  'suwannee-river-state-park-adams-tract',
  'suwannee-river-dowling-adams-tract',
  'suwannee-river-holton-lafayette-blue',
  'suwannee-river-holton-peacock-slough',
  'suwannee-river-spirit-peacock-slough',
  'suwannee-river-holton-adams-tract',
  'suwannee-river-stephen-foster-holton',
  'suwannee-river-stephen-foster-suwannee-state-park',
  'suwannee-river-stephen-foster-dowling-park',
  'suwannee-river-stephen-foster-lafayette-blue',
  'suwannee-river-woods-ferry-holton',
  'suwannee-river-woods-ferry-suwannee-state-park',
  'suwannee-river-woods-ferry-dowling-park',
  'suwannee-river-woods-ferry-lafayette-blue',
  'suwannee-river-gibson-holton',
  'suwannee-river-gibson-peacock-slough',
  'suwannee-river-spirit-gibson',
  'suwannee-river-woods-ferry-gibson',
  'suwannee-river-stephen-foster-gibson',
  'suwannee-river-gibson-adams-tract',
  'suwannee-river-spirit-adams-tract',
  'suwannee-river-woods-ferry-peacock-slough',
  'suwannee-river-woods-ferry-adams-tract',
  'suwannee-river-stephen-foster-peacock-slough',
  'suwannee-river-stephen-foster-adams-tract',
] as const;

const suwanneeAccessNoticeRouteSlugs = new Set([
  'suwannee-river-spirit-holton-creek',
  'suwannee-river-holton-suwannee-state-park',
  'suwannee-river-holton-dowling-park',
  'suwannee-river-holton-lafayette-blue',
  'suwannee-river-holton-peacock-slough',
  'suwannee-river-holton-adams-tract',
  'suwannee-river-stephen-foster-holton',
  'suwannee-river-woods-ferry-holton',
  'suwannee-river-gibson-holton',
  'suwannee-river-state-park-peacock-slough',
  'suwannee-river-gibson-peacock-slough',
  'suwannee-river-spirit-peacock-slough',
  'suwannee-river-stephen-foster-peacock-slough',
  'suwannee-river-woods-ferry-peacock-slough',
]);

const bayouTecheConsolidatedRouteSlugs = [
  'bayou-teche-arnaudville-poche-bridge',
  'bayou-teche-poche-bridge-breaux-bridge',
  'bayou-teche-charenton-centerville',
  'bayou-teche-port-barre-arnaudville',
  'bayou-teche-port-barre-poche-bridge',
  'bayou-teche-port-barre-breaux-bridge',
  'bayou-teche-leonville-poche-bridge',
  'bayou-teche-leonville-breaux-bridge',
  'bayou-teche-arnaudville-breaux-bridge',
  'bayou-teche-arnaudville-parks',
  'bayou-teche-poche-bridge-parks',
  'bayou-teche-breaux-bridge-st-martinville',
  'bayou-teche-parks-loreauville',
  'bayou-teche-leonville-parks',
  'bayou-teche-arnaudville-st-martinville',
  'bayou-teche-poche-bridge-st-martinville',
  'bayou-teche-poche-bridge-loreauville',
  'bayou-teche-breaux-bridge-loreauville',
  'bayou-teche-st-martinville-new-iberia',
  'bayou-teche-loreauville-jeanerette',
  'bayou-teche-new-iberia-charenton',
  'bayou-teche-jeanerette-baldwin',
  'bayou-teche-baldwin-centerville',
  'bayou-teche-port-barre-st-martinville',
  'bayou-teche-leonville-st-martinville',
  'bayou-teche-leonville-loreauville',
  'bayou-teche-arnaudville-loreauville',
  'bayou-teche-arnaudville-new-iberia',
  'bayou-teche-poche-bridge-new-iberia',
  'bayou-teche-breaux-bridge-new-iberia',
  'bayou-teche-parks-new-iberia',
  'bayou-teche-st-martinville-jeanerette',
  'bayou-teche-loreauville-charenton',
] as const;

const bayouTecheAccessReviewRouteSlugs = new Set([
  'bayou-teche-arnaudville-poche-bridge',
  'bayou-teche-poche-bridge-breaux-bridge',
  'bayou-teche-port-barre-poche-bridge',
  'bayou-teche-leonville-poche-bridge',
  'bayou-teche-poche-bridge-parks',
  'bayou-teche-poche-bridge-st-martinville',
  'bayou-teche-poche-bridge-loreauville',
  'bayou-teche-poche-bridge-new-iberia',
  'bayou-teche-parks-new-iberia',
]);

const willametteConsolidatedRouteSlugs = [
  'willamette-river-peoria-michaels',
  'willamette-river-crystal-lake-michaels',
  'willamette-river-crystal-lake-hyak',
  'willamette-river-harrisburg-mccartney',
  'willamette-river-mccartney-peoria',
  'willamette-river-harrisburg-irish-bend',
  'willamette-river-irish-bend-peoria',
  'willamette-river-norwood-peoria',
  'willamette-river-harrisburg-harkens',
  'willamette-river-harkens-irish-bend',
  'willamette-river-marshall-island-mccartney',
  'willamette-river-harrisburg-norwood',
  'willamette-river-mccartney-irish-bend',
  'willamette-river-marshall-island-irish-bend',
  'willamette-river-alton-baker-marshall-island',
  'willamette-river-alton-baker-mccartney',
  'willamette-river-alton-baker-harkens',
  'willamette-river-alton-baker-irish-bend',
  'willamette-river-alton-baker-norwood',
  'willamette-river-alton-baker-peoria',
  'willamette-river-marshall-island-peoria',
  'willamette-river-marshall-island-norwood',
  'willamette-river-harkens-peoria',
  'willamette-river-irish-bend-norwood',
  'willamette-river-alton-baker-crystal-lake',
  'willamette-river-alton-baker-michaels',
  'willamette-river-alton-baker-hyak',
  'willamette-river-marshall-island-harkens',
  'willamette-river-marshall-island-crystal-lake',
  'willamette-river-marshall-island-michaels',
  'willamette-river-harrisburg-crystal-lake',
  'willamette-river-mccartney-harkens',
  'willamette-river-mccartney-norwood',
  'willamette-river-harkens-norwood',
  'willamette-river-harrisburg-michaels',
  'willamette-river-harrisburg-hyak',
  'willamette-river-harkens-michaels',
  'willamette-river-harkens-hyak',
  'willamette-river-mccartney-michaels',
  'willamette-river-mccartney-hyak',
  'willamette-river-irish-bend-michaels',
  'willamette-river-irish-bend-hyak',
  'willamette-river-norwood-michaels',
  'willamette-river-norwood-hyak',
  'willamette-river-peoria-hyak',
] as const;

const russianRiverConsolidatedRouteSlugs = [
  'russian-river-forestville-steelhead',
  'russian-river-forestville-sunset',
  'russian-river-healdsburg-steelhead',
  'russian-river-wohler-steelhead',
  'russian-river-healdsburg-sunset',
  'russian-river-healdsburg-forestville',
  'russian-river-wohler-mirabel',
  'russian-river-wohler-sunset',
  'russian-river-mirabel-steelhead',
  'russian-river-mirabel-sunset',
  'russian-river-mirabel-forestville',
  'russian-river-wohler-forestville',
  'russian-river-steelhead-guerneville',
  'russian-river-forestville-guerneville',
  'russian-river-wohler-guerneville',
  'russian-river-mirabel-guerneville',
  'russian-river-sunset-guerneville',
  'russian-river-cloverdale-del-rio',
  'russian-river-cloverdale-healdsburg',
  'russian-river-alexander-del-rio',
  'russian-river-del-rio-healdsburg',
  'russian-river-healdsburg-monte-rio-planning',
  'russian-river-guerneville-monte-rio-planning',
  'russian-river-cloverdale-asti',
  'russian-river-cloverdale-alexander',
  'russian-river-asti-del-rio',
  'russian-river-asti-healdsburg',
  'russian-river-alexander-monte-rio',
  'russian-river-del-rio-monte-rio',
  'russian-river-asti-monte-rio',
  'russian-river-cloverdale-monte-rio',
] as const;

const blackfootConsolidatedRouteSlugs = [
  'blackfoot-river-johnsrud-k-ross-toole',
  'blackfoot-river-k-ross-toole-angevine',
  'blackfoot-river-angevine-marco-flats',
  'blackfoot-river-marco-flats-weigh-station',
  'blackfoot-river-k-ross-toole-marco-flats',
  'blackfoot-river-johnsrud-angevine',
  'blackfoot-river-johnsrud-marco-flats',
  'blackfoot-river-k-ross-toole-weigh-station',
  'blackfoot-river-angevine-weigh-station',
  'blackfoot-river-scotty-brown-russell-gates',
  'blackfoot-river-russell-gates-whitaker',
  'blackfoot-river-russell-gates-johnsrud',
  'blackfoot-river-scotty-brown-roundup',
  'blackfoot-river-scotty-brown-whitaker',
  'blackfoot-river-roundup-whitaker',
  'blackfoot-river-russell-gates-weigh-station',
  'blackfoot-river-scotty-brown-weigh-station',
  'blackfoot-river-roundup-weigh-station',
  'blackfoot-river-whitaker-weigh-station',
  'blackfoot-river-roundup-k-ross-toole',
  'blackfoot-river-roundup-angevine',
  'blackfoot-river-roundup-marco-flats',
  'blackfoot-river-whitaker-k-ross-toole',
  'blackfoot-river-whitaker-angevine',
  'blackfoot-river-whitaker-marco-flats',
  'blackfoot-river-russell-gates-k-ross-toole',
  'blackfoot-river-russell-gates-angevine',
  'blackfoot-river-scotty-brown-k-ross-toole',
  'blackfoot-river-scotty-brown-angevine',
  'blackfoot-river-russell-gates-marco-flats',
  'blackfoot-river-scotty-brown-marco-flats',
] as const;

const blackfootLegacyRouteAliases = [
  ['blackfoot-river-k-ross-toole-johnsrud', 'blackfoot-river-johnsrud-k-ross-toole'],
  ['blackfoot-river-angevine-johnsrud', 'blackfoot-river-johnsrud-angevine'],
  ['blackfoot-river-marco-flats-johnsrud', 'blackfoot-river-johnsrud-marco-flats'],
  ['blackfoot-river-russell-gates-scotty-brown', 'blackfoot-river-scotty-brown-russell-gates'],
] as const;

const greenRiverConsolidatedRouteSlugs = [
  'green-river-green-river-ferry-brownsville-city-park',
  'green-river-dennison-ferry-houchins-ferry',
  'green-river-tailwater-american-legion',
  'green-river-tailwater-russell-ford',
  'green-river-roachville-russell-ford',
  'green-river-roachville-american-legion',
  'green-river-roachville-greensburg-city-ramp',
  'green-river-russell-ford-american-legion',
  'green-river-russell-ford-greensburg-city-ramp',
  'green-river-russell-ford-glenview-road',
  'green-river-greensburg-city-ramp-glenview-road',
  'green-river-american-legion-greensburg',
  'green-river-greensburg-city-ramp-lynn-camp-creek',
  'green-river-american-legion-glenview-road',
  'green-river-american-legion-lynn-camp-creek',
  'green-river-roachville-glenview-road',
  'green-river-glenview-road-lynn-camp-creek',
  'green-river-hh-wilson-park-dennison-ferry',
  'green-river-rio-carrydown-dennison-ferry',
  'green-river-rio-carrydown-stovall-park',
  'green-river-hh-wilson-park-green-river-ferry',
  'green-river-stovall-park-green-river-ferry',
  'green-river-stovall-park-dennison-ferry',
  'green-river-lynn-camp-creek-hh-wilson-park',
] as const;

const floydsForkConsolidatedRouteSlugs = [
  'floyds-fork-fisherville-seaton-valley',
  'floyds-fork-creekside-cane-run',
  'floyds-fork-creekside-seaton-valley',
  'floyds-fork-creekside-broad-run-valley',
  'floyds-fork-fisherville-broad-run-valley',
  'floyds-fork-fisherville-cliffside',
  'floyds-fork-seaton-valley-cliffside',
  'floyds-fork-cane-run-cliffside',
] as const;

const millersConsolidatedRouteSlugs = [
  'millers-river-cass-meadow-farley',
  'millers-river-cass-meadow-millers-falls',
  'millers-river-cass-meadow-railroad',
  'millers-river-cass-meadow-route-2',
  'millers-river-erving-farley',
  'millers-river-erving-railroad',
  'millers-river-erving-route-2-rest-area',
  'millers-river-farley-millers-falls',
  'millers-river-farley-route-2',
  'millers-river-railroad-farley',
  'millers-river-railroad-millers-falls',
  'millers-river-railroad-route-2',
  'millers-river-route-2-rest-area-millers-falls',
  'millers-river-south-main-dam-farley',
  'millers-river-south-main-dam-millers-falls',
  'millers-river-south-main-dam-railroad',
  'millers-river-south-main-dam-route-2',
] as const;

const bayouDeViewConsolidatedRouteSlugs = [
  'bayou-deview-benson-creek-rock-island-road',
  'bayou-deview-benson-creek-apple-lake',
  'bayou-deview-hickson-lake-bank-of-brinkley',
  'bayou-deview-hickson-lake-apple-lake',
  'bayou-deview-rock-island-road-bank-of-brinkley',
] as const;

const americanRiverConsolidatedRouteSlugs = [
  'american-river-sailor-bar-harrington',
  'american-river-sailor-bar-upper-sunrise',
  'american-river-harrington-watt',
  'american-river-watt-howe',
  'american-river-sailor-bar-watt',
  'american-river-upper-sunrise-harrington',
  'american-river-sailor-bar-howe',
  'american-river-harrington-howe',
  'american-river-upper-sunrise-watt',
  'american-river-upper-sunrise-howe',
] as const;

const loupRiverConsolidatedRouteSlugs = [
  'loup-river-monroe-adm-access',
] as const;

const loupRiverCoordinateReviewRouteSlugs = [
  'loup-river-george-syas-columbus',
  'loup-river-george-syas-adm-access',
] as const;

const verdeRiverConsolidatedRouteSlugs = [
  'verde-river-89a-skidmore',
  'verde-river-lower-tapco-89a-bridge',
  'verde-river-lower-tapco-skidmore',
  'verde-river-tuzigoot-skidmore',
  'verde-river-white-bridge-clear-creek',
  'verde-river-clear-creek-beasley-flat',
  'verde-river-white-bridge-childs',
  'verde-river-clear-creek-childs',
  'verde-river-tuzigoot-dead-horse',
  'verde-river-dead-horse-89a',
  'verde-river-skidmore-black-canyon',
  'verde-river-black-canyon-bignotti',
  'verde-river-newton-parsons',
  'verde-river-parsons-black-bridge',
  'verde-river-black-bridge-white',
  'verde-river-skidmore-bignotti',
  'verde-river-skidmore-newton',
  'verde-river-skidmore-parsons',
  'verde-river-skidmore-black-bridge',
  'verde-river-skidmore-white',
  'verde-river-bignotti-newton',
  'verde-river-bignotti-parsons',
  'verde-river-newton-black-bridge',
  'verde-river-tuzigoot-black-canyon',
  'verde-river-tuzigoot-bignotti',
  'verde-river-89a-black-canyon',
  'verde-river-89a-bignotti',
  'verde-river-89a-parsons',
] as const;

const verdeRiverAccessReviewRouteSlugs = [
  'verde-river-bignotti-sheep-crossing',
  'verde-river-sheep-crossing-newton',
  'verde-river-skidmore-sheep-crossing',
  'verde-river-black-canyon-sheep-crossing',
  'verde-river-sheep-parsons',
  'verde-river-tuzigoot-sheep-crossing',
  'verde-river-89a-sheep-crossing',
] as const;

const consolidatedRouteTargets = new Map<string, string>(
  [
    ...willimanticRouteSlugs.map((slug) => [slug, `${willimanticHubPath}#trip-${slug}`] as const),
    ...blackCreekCompositeRouteSlugs.map((slug) => [slug, `${blackCreekHubPath}#trip-${slug}`] as const),
    ...lamoilleCompositeRouteSlugs.map((slug) => [slug, `/rivers/by-river/lamoille-river-vermont/#trip-${slug}`] as const),
    ...woonasquatucketAccessGapRouteSlugs.map((slug) => [slug, `${woonasquatucketHubPath}#woonasquatucket-access-zones`] as const),
    ...woonasquatucketUpperCompositeRouteSlugs.map((slug) => [slug, `${woonasquatucketHubPath}#trip-${slug}`] as const),
    ...suwanneeConsolidatedRouteSlugs.map((slug) => [
      slug,
      suwanneeAccessNoticeRouteSlugs.has(slug)
        ? `${suwanneeHubPath}#suwannee-current-access-notices`
        : `${suwanneeHubPath}#trip-${slug}`,
    ] as const),
    ...bayouTecheConsolidatedRouteSlugs.map((slug) => [
      slug,
      bayouTecheAccessReviewRouteSlugs.has(slug)
        ? `${bayouTecheHubPath}#bayou-teche-access-notices`
        : `${bayouTecheHubPath}#trip-${slug}`,
    ] as const),
    ...willametteConsolidatedRouteSlugs.map((slug) => [slug, `${willametteHubPath}#trip-${slug}`] as const),
    ...broadRiverConsolidatedRouteSlugs.map((slug) => [slug, `${broadRiverHubPath}#trip-${slug}`] as const),
    ...russianRiverConsolidatedRouteSlugs.map((slug) => [slug, `/rivers/by-river/russian-river-california/#trip-${slug}`] as const),
    ...blackfootConsolidatedRouteSlugs.map((slug) => [slug, `${blackfootHubPath}#trip-${slug}`] as const),
    ...blackfootLegacyRouteAliases.map(([legacySlug, currentSlug]) => [legacySlug, `${blackfootHubPath}#trip-${currentSlug}`] as const),
    ...greenRiverConsolidatedRouteSlugs.map((slug) => [slug, `${greenRiverHubPath}#trip-${slug}`] as const),
    ...floydsForkConsolidatedRouteSlugs.map((slug) => [slug, `${floydsForkHubPath}#trip-${slug}`] as const),
    ...millersConsolidatedRouteSlugs.map((slug) => [slug, `${millersHubPath}#trip-${slug}`] as const),
    ['millers-river-erving-south-main-dam', `${millersHubPath}#millers-route-zones`] as const,
    ...bayouDeViewConsolidatedRouteSlugs.map((slug) => [slug, `${bayouDeViewHubPath}#trip-${slug}`] as const),
    ...americanRiverConsolidatedRouteSlugs.map((slug) => [slug, `${americanRiverHubPath}#trip-${slug}`] as const),
    ...loupRiverConsolidatedRouteSlugs.map((slug) => [slug, `${loupRiverHubPath}#trip-${slug}`] as const),
    ...loupRiverCoordinateReviewRouteSlugs.map((slug) => [slug, `${loupRiverHubPath}#loup-coordinate-review`] as const),
    ...verdeRiverConsolidatedRouteSlugs.map((slug) => [slug, `${verdeRiverHubPath}#trip-${slug}`] as const),
    ...verdeRiverAccessReviewRouteSlugs.map((slug) => [slug, `${verdeRiverHubPath}#verde-coordinate-review`] as const),
    ...animasConsolidatedRouteSlugs.map((slug) => [slug, `${animasRiverHubPath}#trip-${slug}`] as const),
    ...housatonicConsolidatedRouteSlugs.map((slug) => [slug, `${housatonicRiverHubPath}#trip-${slug}`] as const),
    ...sanJuanConsolidatedRouteSlugs.map((slug) => [slug, `${sanJuanRiverHubPath}#trip-${slug}`] as const),
    ...crowWingConsolidatedRouteSlugs.map((slug) => [slug, `${crowWingRiverHubPath}#trip-${slug}`] as const),
    ...chattahoocheeConsolidatedRouteSlugs.map((slug) => [slug, `${chattahoocheeHubPath}#trip-${slug}`] as const),
    ...saukRiverConsolidatedRouteSlugs.map((slug) => [slug, `${saukRiverHubPath}#trip-${slug}`] as const),
    ...truckeeRiverConsolidatedRouteSlugs.map((slug) => [slug, `${truckeeRiverHubPath}#trip-${slug}`] as const),
    ...farmingtonRiverConsolidatedRouteSlugs.map((slug) => [slug, `${farmingtonRiverHubPath}#trip-${slug}`] as const),
    ...farmingtonRiverRetiredRouteSlugs.map((slug) => [slug, `${farmingtonRiverHubPath}#farmington-river-access-notes`] as const),
    ...susquehannaConsolidatedRouteSlugs.map((slug) => [slug, `${susquehannaRiverHubPath}#trip-${slug}`] as const),
    ...merrimackRiverConsolidatedRouteSlugs.map((slug) => [slug, `${merrimackRiverHubPath}#trip-${slug}`] as const),
    ...spokaneRiverConsolidatedRouteSlugs.map((slug) => [slug, `${spokaneRiverHubPath}#trip-${slug}`] as const),
    ...wabashRiverConsolidatedRouteSlugs.map((slug) => [slug, `${wabashRiverHubPath}#trip-${slug}`] as const),
    ...villageCreekConsolidatedRouteSlugs.map((slug) => [slug, `${villageCreekHubPath}#trip-${slug}`] as const),
    ...elevenPointRiverConsolidatedRouteSlugs.map((slug) => [slug, `${elevenPointRiverHubPath}#trip-${slug}`] as const),
    ...jacksForkRiverConsolidatedRouteSlugs.map((slug) => [slug, `${jacksForkRiverHubPath}#trip-${slug}`] as const),
    ...currentRiverConsolidatedRouteSlugs.map((slug) => [slug, `${currentRiverHubPath}#trip-${slug}`] as const),
    ...yellowBreechesConsolidatedRouteSlugs.map((slug) => [slug, `${yellowBreechesHubPath}#trip-${slug}`] as const),
    ...saltRiverConsolidatedRouteSlugs.map((slug) => [slug, `${saltRiverHubPath}#trip-${slug}`] as const),
    ...saludaRiverConsolidatedRouteSlugs.map((slug) => [slug, `${saludaRiverHubPath}#trip-${slug}`] as const),
    ...saludaRiverLaunchAliasSlugs.map((slug) => [slug, `${saludaRiverHubPath}#trip-saluda-river-saluda-shoals-gardendale`] as const),
    ...saludaRiverAccessNoteRouteSlugs.map((slug) => [slug, `${saludaRiverHubPath}#saluda-route-access-notes`] as const),
  ],
);

export function routePageConsolidationTarget(slug: string): string | undefined {
  return consolidatedRouteTargets.get(slug);
}

/** Preserve trip selection on consolidated hubs and planner filters on standalone routes. */
export function routePageHref(slug: string, params = new URLSearchParams()): string {
  const consolidated = consolidatedRouteTargets.has(slug);
  const destination = consolidatedRouteTargets.get(slug) ?? `/rivers/${encodeURIComponent(slug)}/`;
  const url = new URL(destination, 'https://paddletoday.invalid');
  if (!consolidated) {
    for (const [key, value] of params) url.searchParams.set(key, value);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export function hasStandaloneRoutePage(slug: string): boolean {
  return !consolidatedRouteTargets.has(slug);
}

export function listRoutePageConsolidations() {
  return [...consolidatedRouteTargets.entries()].map(([slug, target]) => ({ slug, target }));
}
