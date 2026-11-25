export interface RiverOutfitter {
  name: string;
  url: string;
  service: string;
  /** Only list trips where the described service is documented. */
  routes: string[];
  /** Additional evidence for service boundaries or landing names. */
  sources?: string[];
}

type RiverReview =
  | { reviewedOn: string; outfitters: RiverOutfitter[] }
  | { reviewedOn: string; noMatch: string; sources: string[] };

// A missing river ID is pending. A noMatch records the scope of the search.
export const riverOutfitterReviews: Record<string, RiverReview> = {
  'allagash-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Allagash Guide Service',
      url: 'https://www.allagashguideservice.com/maine-canoe-trips/canoe-trip-shuttle-transportation/',
      service: 'Arrange transport from Allagash Village to Churchill Dam, with canoe delivery available. For a trip ending at Umsaskis, request a quote for vehicle delivery to your take-out.',
      routes: ['allagash-river-churchill-dam-umsaskis'],
    }],
  },
  'allegheny-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Allegheny Adventures',
      url: 'https://mail.enchantedmountains.net/place/allegheny-adventures',
      service: 'The county tourism office lists canoe and kayak rentals for the downstream paddle from Portville to the outfitter’s landing on Greene Street in Olean.',
      routes: [],
    }],
  },
  'allen-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked both the Corbett’s Glen whitewater run in New York and the Highway 59 to Old Highway 92 reach in Wisconsin. Found access descriptions and a bike shuttle, but no named outfitter serving either stretch.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/11782/main', 'https://www.wisconsinrivertrips.com/segments/allen-creek-hwy-59'],
  },
  'alloway-creek-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'Searched for guides, rental operators and shuttles serving Quinton and Hancocks Bridge. Launch listings identify access. Nearby rental listings did not establish service on Alloway Creek.',
    sources: ['https://openboatlaunch.org/water/alloway-creek-nj/'],
  },
  'american-river-california': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'American River Raft Rentals',
      url: 'https://www.visitranchocordova.com/directory/american-river-raft-rentals/',
      service: 'Rent a raft, kayak, tube or paddleboard at Sunrise for a seasonal float on the lower American River. The local visitor bureau lists the outfitter’s address and contact details.',
      routes: [],
    }],
  },
  'american-river-south-fork-california': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Coloma Shuttle',
      url: 'https://colomashuttle.com/schedule/',
      service: 'Private-boater shuttle stops include Marshall Gold Discovery State Historic Park in Coloma, Henningsen-Lotus Park and Greenwood Creek. Check the timetable for your pair of stops.',
      routes: ['south-fork-american-coloma-henningsen', 'south-fork-american-coloma-greenwood', 'south-fork-american-henningsen-greenwood'],
      sources: ['https://colomashuttle.com/south-fork-river-map/'],
    }],
  },
  'anacostia-river-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Akwatribe RiverSports',
      url: 'https://www.akwatribe.com/bookatour-1',
      service: 'Akwatribe has run RiverFit kayaking sessions from Bladensburg Waterfront Park to Anacostia Park. Ask about upcoming dates and the meeting point.',
      routes: ['anacostia-river-bladensburg-anacostia-park'],
    }],
  },
  'androscoggin-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bethel Outdoor Adventure',
      url: 'https://betheloutdooradventure.com/gilead-maine-river-trips/',
      service: 'The seasonal Gilead trip includes a canoe or kayak rental and an upstream shuttle. Paddle back to the campground in Bethel.',
      routes: [],
    }],
  },
  'androscoggin-river-new-hampshire': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Miller Outdoors',
      url: 'https://milleroutdoors.com/recreation/river-expeditions/canoe-kayak-rentals.html',
      service: 'Rent a canoe or kayak in Dummer for the Androscoggin between Errol and Milan. Arrange pickup and an upstream shuttle with the outfitter.',
      routes: [],
    }],
  },
  'animas-river-new-mexico': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Desert River Guides',
      url: 'https://desertriverguides.com/',
      service: 'Guided Animas River raft trips in Farmington include a short Berg Park float and a longer trip through the Penny Lane, Gateway and Berg Park rapids.',
      routes: [],
    }],
  },
  'anthony-kill': {
    reviewedOn: '2026-11-24',
    noMatch: 'Found rentals on Round Lake and a public Anthony Kill launch. Could not verify a rental, guided trip or shuttle serving the creek to Mechanicville.',
    sources: ['https://saratogaplan.org/explore-parks-and-trails/round-lake-preserve/', 'https://www.saratoga.com/itineraries/explore-waterways/'],
  },
  'antietam-creek-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'South Mountain Adventures',
      url: 'https://southmountainadventures.com/kayak-trips/antietam-creek/',
      service: 'Book a kayak trip on Antietam Creek. The operator lists drop points at Devil’s Backbone Park, Shepherdstown Pike (MD 34), Burnside Bridge and the C&O Canal park at the Potomac.',
      routes: ['antietam-creek-devils-backbone-md34', 'antietam-creek-md34-potomac'],
    }],
  },
  'appomattox-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Eco Trek Adventures',
      url: 'https://appomattoxboatharbor.com/eco-trek-adventures',
      service: 'Appomattox Small Boat Harbor offers kayak rentals and guided group nature tours on the tidal lower river.',
      routes: [],
    }],
  },
  'arkansas-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Salida River Adventures',
      url: 'https://www.salidariveradventures.com/river-shuttles',
      service: 'Private boaters can have their vehicle moved from Fisherman’s Bridge to Stone Bridge, from Stone Bridge to downtown Salida, or from downtown Salida to Rincon. Check seasonal dates and select the put-in and take-out when booking.',
      routes: ['arkansas-river-browns-canyon-fishermans-stone', 'arkansas-river-stone-bridge-salida', 'arkansas-river-salida-rincon'],
    }],
  },
  'aroostook-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Arndt’s Aroostook River Lodge & Campground',
      url: 'https://arndtscamp.com/',
      service: 'The lodge in Presque Isle offers paddling rentals and access to the Aroostook River. Ask which landings its transport service covers.',
      routes: [],
    }],
  },
  'ashippun-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Searched for rental and shuttle service between Druid Lake and Highway O. The reach guide describes a bike shuttle and the DNR identifies public access. Lake rentals elsewhere did not establish river service.',
    sources: ['https://www.wisconsinrivertrips.com/segments/ashippun-river/druid-lake-to-hwy-o', 'https://apps.dnr.wi.gov/water/waterDetail.aspx?key=11543'],
  },
  'ausable-east-branch': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Whiteface regional guide describes the Keene to Upper Jay run. Nearby guided trips reviewed focus on the West Branch. I could not verify a paddling outfitter on the East Branch through Keene.',
    sources: ['https://www.whitefaceregion.com/paddling/ausable-east-keene-to-upper-jay', 'https://www.strykerscustomflies.com/guide-service.html'],
  },
  'ausable-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Ausable Chasm’s commercial float launches at Table Rock. The listed public whitewater run starts below Rainbow Falls. No guide or shuttle was verified for that public trip.',
    sources: ['https://www.ausablechasm.com/raft-float-tours', 'https://www.americanwhitewater.org/content/River/view/river-detail/1236/main'],
  },
  'ausable-west-branch': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Town of Wilmington',
      url: 'https://www.townofwilmington.org/parks/',
      service: 'Rent a canoe, kayak or paddleboard at Lake Everest Beach on the impounded West Branch in Wilmington during the summer beach season.',
      routes: [],
    }],
  },
  'autauga-creek-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Prattville Paddle Sports',
      url: 'https://www.alabamascenicrivertrail.com/outfitters-guides/central-alabama/',
      service: 'The Alabama Scenic River Trail lists single and tandem kayak rentals on Autauga Creek from Prattville Paddle Sports on Reuben Road. Contact the outfitter for launch and pickup options.',
      routes: [],
    }],
  },
  'badfish-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paddlin Pleasures Water Rentals',
      url: 'https://www.paddlinpleasureswaterrentals.com/',
      service: 'The Badfish Creek float includes a kayak rental and an upstream shuttle to Old Stage Road. Paddle downstream to Casey Road.',
      routes: ['badfish-creek-old-stage-casey'],
    }],
  },
  'badger-mill-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked the Old County Road PB to Highway 69 run and the nearby Verona livery. Its advertised trips use the Sugar River. No service on Badger Mill Creek was verified.',
    sources: ['https://sugarriveroutfitterswi.com/services/customer-care/', 'https://milespaddled.com/badger-mill-creek/'],
  },
  'baltimore-blueway-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Eastern Watersports',
      url: 'https://www.easternwatersports.com/baltimore-peninsula/',
      service: 'Rent a kayak or paddleboard at The Cove on the Baltimore Peninsula. The operator also offers guided paddles from its East Cromwell Street location.',
      routes: ['baltimore-blueway-baltimore-peninsula'],
    }],
  },
  'banister-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked King\'s Bridge to Terry’s Bridge against the county’s outfitter and Blueway information. The county describes a self-arranged take-out. Current operator coverage of this Banister River stretch could not be verified.',
    sources: ['https://gohalifaxva.com/the-banister-river-and-banister-lake/', 'https://gohalifaxva.com/tours-and-itineraries/get-outdoors/'],
  },
  'baptism-river-minnesota': {
    reviewedOn: '2026-11-24',
    noMatch: 'Hard Water Sports describes the Eckbeck to Illgen Falls run but does not identify a commercial trip on it. State park canoe rentals are for an inland lake. No service was verified for the Eckbeck to river-mouth trip.',
    sources: ['https://hardwatersports.com/mn_whitewater/mn_whitewater_baptism_river/', 'https://www.dnr.state.mn.us/state-parks/virtual-tours/tettegouche/dialup.html'],
  },
  'baraboo-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Baraboo River Canoe & Kayak Rentals',
      url: 'https://www.travelwisconsin.com/outdoors/on-the-water/baraboo-river-canoe-kayak-rentals-llc',
      service: 'Travel Wisconsin lists seasonal canoe and kayak trips and shuttle service from North Freedom. Ask the operator which take-outs it is serving.',
      routes: [],
    }],
  },
  'bark-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'PRS Watersports',
      url: 'https://www.travelwisconsin.com/outdoors/on-the-water/prs-watersports-llc',
      service: 'Rent a boat for a self-guided Bark River float near Delafield. From Sawyer Road, the trip ends at Genesee Lake Road, with a return shuttle or an equipment lockup arranged in advance.',
      routes: [],
      sources: ['https://www.prswatersports.com/delafield-tour/'],
    }],
  },
  'barren-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked the Barren tailwater and Bowling Green reaches. The state dock rents kayaks on the reservoir above the dam. Drakes Creek Canoe runs trips on a tributary. Neither source documents rentals or shuttles on the mapped Barren River reaches.',
    sources: ['https://barrenriverstatedock.com/boat-rentals/', 'https://www.drakescreekcanoe.com/reservations', 'https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx'],
  },
  'bartram-canoe-trail-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'WildNative Tours',
      url: 'https://coastalalabamaecotourism.com/certified-tours-and-guides/wild-native-tours/',
      service: 'WildNative offers an interpretive kayak trip to the Bottle Creek Indian Mounds in the Mobile-Tensaw Delta. Ask the guide for the departure landing.',
      routes: [],
    }],
  },
  'batsto-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pinelands Adventures',
      url: 'https://www.pinelandsadventures.org/adventure/batsto-river-quaker-bridget-to-batsto-lake/',
      service: 'For a shorter paddle on the lower part of this route, the outfitter shuttles rental canoes and kayaks to Quaker Bridge and collects paddlers at Batsto Lake. Its trip starts downstream of Lower Forge.',
      routes: ['batsto-river-lower-forge-batsto'],
    }],
  },
  'batten-kill': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Battenkill Valley Outdoors',
      url: 'https://battenkillvalleyoutdoors.com/faq/',
      service: 'The outfitter selects a Batten Kill launch and take-out to suit the length of your trip. Rentals include transport to the launch and pickup downstream.',
      routes: [],
    }],
  },
  'bayou-deview': {
    reviewedOn: '2026-11-24',
    noMatch: 'Searched for rentals, guides and shuttles around Brinkley, Dagmar and the Cache River refuge. Cache Bayou Outfitters serves the Illinois Cache River. No paddling outfitter could be verified on the Arkansas bayou.',
    sources: ['https://www.cachebayououtfitters.com/', 'https://southwestpaddler.com/docs/whitear22.html'],
  },
  'bayou-teche-river-louisiana': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wanderlust Rentals',
      url: 'https://www.wanderlustrentalsla.com/how-to-rent/kiosk-info/',
      service: 'Reserve a self-service kayak for Bayou Teche from the downtown New Iberia kiosk at 108 Duperier Avenue. The operator requires advance booking for this location.',
      routes: [],
    }],
  },
  'bear-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Family Fun Tubing',
      url: 'https://familyfuntubing.com/',
      service: 'Rent tubes for a shuttle-supported float on the Bear River at Oneida Narrows near Preston. Check the operator’s put-in and pickup when reserving.',
      routes: [],
    }],
  },
  'beaver-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Beaver Creek Cabin and Canoe Rentals',
      url: 'https://www.beavercreekcampground.com/rates',
      service: 'Rent a canoe or kayak at the Brownbranch campground put-in. The campground also lists personal-boat and vehicle shuttles. Confirm the Bradleyville pickup when booking.',
      routes: ['beaver-creek-brownbranch-bradleyville'],
    }],
  },
  'beaver-dam-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The city rents boats at Waterworks Park on Beaver Dam Lake. A separate directory names a river livery, but current operator coverage from Cotton Mill Park to County Road J could not be verified.',
    sources: ['https://www.ci.beaverdam.wi.gov/333/Watercraft-Rentals', 'https://www.wisconsinrivertrips.com/liveries.html'],
  },
  'beaver-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked Moshier to High Falls and Soft Maple Reservoir. The regional visitor guide and DEC describe launches and portages. No operator itinerary, rental delivery or shuttle for this corridor was verified.',
    sources: ['https://visitadirondacks.com/recreation/beaver-river-canoe-route', 'https://dec.ny.gov/things-to-do/boating/launch-sites/lewis-county'],
  },
  'beaver-river-minnesota': {
    reviewedOn: '2026-11-24',
    noMatch: 'Beaver Bay Sport Shop advertises portable recreational kayaks. Neither its state tourism listing nor the whitewater reach guide establishes outfitting for the Lax Lake Road to Highway 61 run.',
    sources: ['https://www.exploreminnesota.com/profile/beaver-bay-sport-shop/2122', 'https://www.americanwhitewater.org/content/River/view/river-detail/2521/main'],
  },
  'big-bureau-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Searched Princeton and the Red Covered Bridge to County Road 1150 stretch. Local visitor and paddling resources describe the creek and bridge, without identifying a livery serving the trip.',
    sources: ['https://princetontourism.org/attractions/covered-bridges/', 'https://illinoispaddling.org/online-resources/'],
  },
  'big-coal-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Coal River Group',
      url: 'https://coalrivergroup.com/kayak-rentals/',
      service: 'Pick up a seasonal kayak rental at Tornado and transport it to your chosen launch. The group offers shuttles on selected routes. Ask which Big Coal landings it serves.',
      routes: [],
      sources: ['https://wvtourism.com/company/coal-river-kayak-and-canoe-rentl/'],
    }],
  },
  'big-creek-middle-fork-salmon-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Salmon River Transportation Company',
      url: 'https://rivershuttles.com/routes/',
      service: 'If you fly in from McCall, the company lists a vehicle shuttle from McCall Airport to the Cache Bar take-out. Arrange the flight to Big Creek Airstrip separately.',
      routes: ['big-creek-middle-fork-airstrip-cache-bar'],
      sources: ['https://www.mccallaviation.com/backcountry-charters/'],
    }],
  },
  'big-cypress-bayou': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Riverbend Outfitters',
      url: 'https://riverbendoutfitters.com/',
      service: 'Riverbend rents kayaks and canoes on Big Cypress Bayou and monitors the stretch from the Lake O’ the Pines spillway to Jefferson. Ask which launches and take-outs are available for your date.',
      routes: ['big-cypress-bayou-lake-o-pines-spillway-jefferson'],
    }],
  },
  'big-eau-pleine-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wausau Paddle',
      url: 'https://wausaupaddle.weebly.com/rent.html',
      service: 'Wausau Paddle offers kayak delivery and pickup at waterfront locations in Marathon County. Cherokee Park is on the Big Eau Pleine at the county’s western edge. Arrange the handoff and discuss boat suitability before reserving.',
      routes: ['big-eau-pleine-river-cherokee-march-rapids'],
      sources: ['https://www.marathoncounty.gov/Home/Components/FacilityDirectory/FacilityDirectory/32/'],
    }],
  },
  'big-fork-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rivers North Outfitters',
      url: 'https://bigfalls.govoffice.com/index.asp?DE=65F2B3E9-FAD2-44C0-B622-7376768FC943&SEC=941FB0C6-6896-4ABF-9758-E69EB0B945B2',
      service: 'Based in Big Falls, Rivers North outfits day and overnight Big Fork River trips with canoes, kayaks and shuttle service. Arrange the landings for your itinerary.',
      routes: [],
      sources: ['https://www.exploreminnesota.com/profile/rivers-north-outfitters-minnesota/2521'],
    }],
  },
  'big-pine-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked the Big Pine water trail through Warren County and the nearby Wildcat livery. The livery operates on Wildcat Creek. No operator was verified between Harrison Bridge and Twin Bridges.',
    sources: ['https://storymaps.arcgis.com/stories/d8087ab3186348618106349d0be2c5c1', 'https://www.wildcatcanoeandkayaktoo.com/'],
  },
  'big-piney-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wilderness Ridge Resort',
      url: 'https://wildernessridgeresort.com/rates.html',
      service: 'The resort lists multiday canoe floats starting at Mason Bridge and Slabtown. Confirm your take-out with the resort when choosing a trip.',
      routes: [],
    }],
  },
  'big-pipe-creek-maryland': {
    reviewedOn: '2026-11-24',
    noMatch: 'County water-trail materials document Hapes Mill Road and Double Pipe Creek Park. Searches for rentals, guides and shuttle service turned up public launch information and Monocacy operators without verifiable service on Big Pipe Creek.',
    sources: ['https://ccgprod1.carrollcountymd.gov/government/directory/recreation-parks/places-to-go/water-trails/', 'https://frederickcountymd.gov/DocumentCenter/View/330545/MonocacyRiverMngtPlan-Council-Approved-04-16-2019?bidId='],
  },
  'big-rib-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wausau Paddle',
      url: 'https://wausaupaddle.weebly.com/rent.html',
      service: 'Wausau Paddle rents kayaks with delivery and pickup at Marathon County waterfront locations. Amco Park has Big Rib River access. Arrange rental handoffs directly with the operator.',
      routes: ['big-rib-river-amco-park-highway-a'],
      sources: ['https://www.marathoncounty.gov/Home/Components/FacilityDirectory/FacilityDirectory/20/33'],
    }],
  },
  'big-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Washington State Park’s float trips finish upstream of Mammoth Access. Cherokee Landing operates near Bonne Terre. No operator coverage was verified for the cataloged Mammoth to Merrill Horse trip.',
    sources: ['https://www.washingtonstateparkmo.com/all-rentals/float-trips/', 'https://mdc.mo.gov/discover-nature/places/mammoth-access', 'https://cherokeelanding.com/'],
  },
  'big-sioux-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Boundless Adventures 605',
      url: 'https://www.boundlessadventures605.com/routes',
      service: 'The outfitter lists Farm Field Park to Rotary Park as a Sioux Falls kayak route. Select the trip when arranging your rental.',
      routes: ['big-sioux-river-farm-field-rotary'],
    }],
  },
  'big-south-fork': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Big South Fork Adventures',
      url: 'https://www.bigsouthforkadventures.net/copy-of-blue-heron-tube-rentals/',
      service: 'Rent a canoe or kayak for Blue Heron to Yamacraw or Yamacraw to Alum Ford. The full-day float combines both sections from Blue Heron to Alum Ford.',
      routes: ['big-south-fork-blue-heron-yamacraw', 'big-south-fork-yamacraw-alum-ford', 'big-south-fork-blue-heron-alum-ford'],
    }],
  },
  'big-wood-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked Ketchum and Hailey operators. Sources identify Big Wood fly-fishing guides and outfitters running raft trips on the Salmon. Could not verify guided paddling, rental delivery or shuttles for the two Big Wood routes.',
    sources: ['https://www.anglingservices.com/guided-trips/', 'https://www.whiteotter.com/contact.php', 'https://www.idahoriverrentals.com/about/'],
  },
  'bighorn-river-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Thermopolis Fly Shop',
      url: 'https://thermopolisflyshop.com/shuttle-services',
      service: 'The shop lists a shuttle from Wedding of the Waters to Hot Springs State Park. Its shuttle menu also lists other put-in and take-out combinations around Thermopolis.',
      routes: ['bighorn-river-wedding-hot-springs'],
    }],
  },
  'bitch-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked Coyote Meadows, Highway 32 and the Teton confluence. Found whitewater run descriptions, but no outfitter listing a paddling trip, rental or shuttle on Bitch Creek.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/524/main', 'https://idwr.idaho.gov/wp-content/uploads/sites/2/iwrb/1998/199812-Resource-Inventory-Upper-Snake-River-Basin.pdf'],
  },
  'bitterroot-river-montana': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rainy Day River Shuttles',
      url: 'https://blackfootriver.com/pages/shuttle-services',
      service: 'Blackfoot River Outfitters lists Rainy Day River Shuttles for the Bitterroot from Highbank to Florence. Use the outfitter’s directory to contact the driver about a specific landing pair.',
      routes: [],
    }],
  },
  'black-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked Lighthouse Kayak & Canoe Rental in Churchville. Directory references mention the business, while the county documents a public launch. Could not verify current rental or shuttle service between Churchville Park and Black Creek Park.',
    sources: ['https://www.monroecounty.gov/parks-churchville', 'https://maps.roadtrippers.com/us/churchville-ny/sports/lighthouse-kayak-canoe-rental'],
  },
  'black-creek-mississippi': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Black Creek Canoe Rental',
      url: 'https://blackcreekcanoe.com/trips/',
      service: 'Rent a canoe or kayak from the Brooklyn livery. Its trips end at Brooklyn Bridge from Camp Dantzler or Big Creek Landing. Trips starting at Brooklyn run to Moody’s Landing, Janice, Cypress Creek Landing or Fairley Bridge Landing.',
      routes: ['black-creek-churchwell-old-highway-49', 'black-creek-big-creek-old-highway-49', 'black-creek-old-highway-49-moodys', 'black-creek-old-highway-49-janice', 'black-creek-old-highway-49-cypress', 'black-creek-old-highway-49-fairley'],
    }],
  },
  'black-hawk-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Hudson confirms creek access at Franck Park. Black Hawk Recreation Rentals operates at a different waterbody in Lake View. No paddle operator was verified for the Hudson to Waterloo corridor.',
    sources: ['https://www.cityofhudsonia.com/c/-/?p=parkrecreation.html', 'https://www.blackhawkrecreationrentals.com/'],
  },
  'black-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adirondack River Outfitters',
      url: 'https://www.aroadventures.com/white-water-rafting/black-river/',
      service: 'Book a guided whitewater raft trip through the Black River canyon between Watertown and Dexter.',
      routes: ['black-river-watertown-dexter-canyon'],
    }],
  },
  'black-river-south-carolina': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Black River Cypress Preserve',
      url: 'https://www.cypresspreserve.org/visit/',
      service: 'Groups of six or more can arrange a guided paddle at the preserve near Andrews. Its trails include a section on the Black River and routes in the cypress swamp. Request a group visit in advance.',
      routes: [],
      sources: ['https://www.cypresspreserve.org/'],
    }],
  },
  'black-river-wisconsin': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'North Bend Canoe Rental',
      url: 'https://northbendcanoerental.com/',
      service: 'The Melrose day trip includes a shuttle to Melrose Public Landing and ends at North Bend. For a longer paddle to the same take-out, the livery also lists a shuttle to Hansen Memorial Landing at Irving.',
      routes: ['black-river-melrose-north-bend'],
    }],
  },
  'blackberry-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Searched for outfitting from Jaycee Pond Park to River Road. Yorkville’s Yak Shack specifies the Marge Cline course for its whitewater rentals. That facility is on the Fox River.',
    sources: ['https://yakshackonline.com/', 'https://www.yorkville.il.us/facilities/facility/details/marge-cline-whitewater-course-37'],
  },
  'blackbird-creek-delaware': {
    reviewedOn: '2026-11-24',
    noMatch: 'DNREC has run educational canoe outings from the reserve and documents the public launch. No currently offered guided trip, rental or shuttle covering the reserve to The Rocks was verified.',
    sources: ['https://dnrec.delaware.gov/coastal-programs/research-reserve/blackbird-creek/', 'https://dnrec.delaware.gov/events/canoe-trip-at-blackbird-creek-reserve-3/'],
  },
  'blackfoot-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked Trail Creek Bridge to Cedar Creek through Wolverine Canyon. BLM describes public boating and American Whitewater documents the canyon. Could not verify a guided paddle, rental or shuttle for this reach.',
    sources: ['https://www.blm.gov/visit/blackfoot-river', 'https://www.americanwhitewater.org/content/River/view/river-detail/528/main'],
  },
  'blackfoot-river-montana': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Montana River Guides',
      url: 'https://montanariverguides.com/package/blackfoot-river-trips/',
      service: 'The outfitter runs guided Blackfoot floats from Russell Gates to Roundup and from Roundup to Johnsrud. Ask which stretch is running on the day you plan to paddle.',
      routes: [],
    }],
  },
  'blacklick-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked the county outfitter directory and the Saltsburg rental itinerary. Its shuttle serves the Conemaugh below the dam. No operator was verified between Heshbon and Saylor Park on Blacklick Creek.',
    sources: ['https://www.visitindianacountypa.org/member-category/water-adventures/', 'https://skco.squarespace.com/kayaks'],
  },
  'blackstone-river-rhode-island': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Blackstone River Watershed Council',
      url: 'https://blackstoneriver.org/resources/river-access/',
      service: 'The volunteer-led Connecting with Canoes program paddles the section between Manville Dam and Albion Dam. Check the council’s event calendar for trip dates.',
      routes: ['blackstone-river-manville-albion'],
    }],
  },
  'blackwater-river-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Blackwater Adventures',
      url: 'https://blackwateradventuresmd.com/vacation-rental',
      service: 'Arrange a kayak rental delivered in Dorchester County for a Blackwater River paddle. Confirm the handoff location before choosing a refuge trail. The outfitter’s guided trip from Key Wallace Drive follows the Little Blackwater River.',
      routes: [],
      sources: ['https://visitdorchester.org/blog/post/2024-on-the-water-guide-dorchester-county-maryland', 'https://blackwateradventuresmd.com/kayak-tour'],
    }],
  },
  'blanco-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'TPWD documents public float access between Fischer Store Road and John Knox Ranch. The ranch’s guest canoeing takes place on Carpers Creek and Blue Hole. Could not verify paddle rentals or a shuttle for the mapped Blanco stretch.',
    sources: ['https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/blanco_knox.phtml', 'https://johnknoxranch.org/guided-adventure-activities'],
  },
  'blue-river-oklahoma': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state identifies kayaking opportunities on the Blue River. Scotty’s is listed for supplies and fishing access. Found no operator confirming kayak rental, shuttle or guided paddling between SH-7 and Cheadle Road.',
    sources: ['https://www.wildlifedepartment.com/fishing/wheretofish/southeast/blue-river-pfha', 'https://web1.travelok.com/at/listings/view.profile/id.646'],
  },
  'blue-river-wisconsin': {
    reviewedOn: '2026-11-24',
    noMatch: 'Checked Highway G to Forest Road and local transport options. The reach report describes a bicycle shuttle. Nearby Wisconsin River outfitters did not establish delivery or service on this tributary.',
    sources: ['https://www.wisconsinrivertrips.com/segments/blue-river/hwy-g', 'https://canoe-camping.com/transport-service/'],
  },
  'bog-river-flow': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'St. Regis Canoe Outfitters',
      url: 'https://www.canoeoutfitters.com/guided-trips/bog-river-and-lows-ridge',
      service: 'For a shorter outing on the approach to Lows Lake, paddle the Bog River to Hitchins Pond with a guide, then hike Lows Ridge. The trip includes return transportation to Saranac Lake.',
      routes: ['bog-river-flow-lower-dam-lows-lake'],
      sources: ['https://dec.ny.gov/places/five-ponds-and-pepperbox-wildernesses'],
    }],
  },
  'bogue-chitto-river-louisiana': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bogue Chitto Tubing',
      url: 'https://boguechitto.com/kayaks-%26-canoes',
      service: 'Rent a canoe or kayak on the Bogue Chitto River through the Choctaw Road outfitter near Bogalusa. Check in at the outfitter and confirm the day’s launch arrangements.',
      routes: [],
    }],
  },
  'bohemia-river-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bohemia River State Park',
      url: 'https://dnr.maryland.gov/publiclands/Pages/central/Bohemia.aspx',
      service: 'Park rangers lead scheduled kayak outings on Great Bohemia Creek. Use the state park meeting point for the guided trip and reserve ahead.',
      routes: ['bohemia-river-bridge-great-bohemia-loop'],
      sources: ['https://dnr.maryland.gov/publiclands/Documents/Bohemia/FAQ-Paddle-at-the-Park.pdf'],
    }],
  },
  'bois-brule-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Brule River Canoe Rental',
      url: 'https://brulerivercanoerental.com/our-trips/trip-types/canoe/',
      service: 'Book a rental for Stones Bridge to Winneboujou, Pine Tree to Highway 13, or Highway 13 to Lake Superior. The outfitter lists each as a separate trip.',
      routes: ['bois-brule-river-stones-winneboujou', 'bois-brule-river-pine-tree-highway-13', 'bois-brule-river-highway-13-mouth'],
    }],
  },
  'boise-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Boise River Raft & Tube',
      url: 'https://boiseriverraftandtube.com/',
      service: 'Pick up rental equipment at Barber Park and return it at Ann Morrison Park. A seasonal shuttle runs back to Barber Park.',
      routes: ['boise-river-barber-ann-morrison'],
    }],
  },
  'boone-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Hamilton County Conservation',
      url: 'https://www.mycountyparks.com/County/Hamilton/Content/Kayak-Canoe-Rentals',
      service: 'Pick up rental kayaks from the Briggs Woods Park campground host. For Boone River floats, renters transport the boats and arrange their own shuttle. Check the county’s water-level limits before pickup.',
      routes: ['boone-river-briggs-woods-albright'],
      sources: ['https://www.mycountyparks.com/County/Hamilton/FAQ'],
    }],
  },
  'boquet-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The regional paddling guide and whitewater run description identify Boquet access. I could not verify a guide, rental or shuttle serving these sections.',
    sources: ['https://www.lakechamplainregion.com/outdoors/on-the-water/paddling', 'https://www.americanwhitewater.org/content/River/view/river-detail/10295/main'],
  },
  'braddock-bay': {
    reviewedOn: '2026-11-24',
    noMatch: 'The town lists a hand launch. BayCreek documents rentals at its own docks and designated shuttle locations, with no confirmed Braddock Bay service.',
    sources: ['https://greeceny.gov/departments/parksandrecreation/parks/braddock-bay-park/', 'https://www.baycreek.com/rentals'],
  },
  'brandywine-creek-delaware': {
    reviewedOn: '2026-11-24',
    noMatch: 'Delaware Tourism identifies Wilderness Canoe Trips on the Brandywine. I could not verify its service on the Smith Bridge to Thompsons Bridge stretch described by the National Park Service.',
    sources: ['https://www.visitdelaware.com/listing/wilderness-canoe-trips-inc/4532/', 'https://www.nps.gov/frst/planyourvisit/water-recreation.htm'],
  },
  'brays-bayou': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Houston-area outfitting services reviewed cover Buffalo Bayou and Armand Bayou. I could not verify coverage on Brays Bayou at Fonde Park.',
    sources: ['https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/', 'https://www.trailexpeditions.com/armand-bayou-kayak-tour.html'],
  },
  'brazos-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Fuller’s Folly River Ranch',
      url: 'https://fullersfolly.com/brazos-river-fun/',
      service: 'Ranch guests can use kayaks on the Brazos or take the ranch’s upstream tube shuttle and float back to the property.',
      routes: [],
    }],
  },
  'broad-creek-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Delmarva Birding Weekends',
      url: 'https://delmarvabirding.com/broad-creek-excursions/',
      service: 'Guided kayak outings paddle from the Quest Adventures launch in Laurel to Bethel and return to Laurel. Check the event calendar for dates.',
      routes: ['broad-creek-fisher-phillips'],
      sources: ['https://paddlethenanticoke.com/?page_id=1572'],
    }],
  },
  'broad-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'JK Adventure Guides',
      url: 'https://jkadventureguides.com/broad-river',
      service: 'This guided kayak trip starts near Broad River Road in Columbia and finishes on the Congaree below the Gervais Street Bridge.',
      routes: [],
    }],
  },
  'broad-river-georgia': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Broad River Outpost',
      url: 'https://www.broadriveroutpost.com/altamahacom',
      service: 'Rent a sit-on-top kayak at the outpost on GA 281. The lower trip ends at the outfitter’s take-out half a mile below GA 172, with a return shuttle to the outpost.',
      routes: ['broad-river-us281-us172'],
      sources: ['https://www.broadriveroutpost.com/contact'],
    }],
  },
  'bronx-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bronx River Alliance',
      url: 'https://bronxriver.org/visit-the-river/paddle-the-river/trip-description',
      service: 'Guided canoe trips explore the Bronx River Forest, Botanical Garden and estuary. The program lists the sections included in each trip.',
      routes: ['bronx-river-219th-soundview'],
    }],
  },
  'brule-river-minnesota': {
    reviewedOn: '2026-11-24',
    noMatch: 'The whitewater inventory identifies the Minnesota North Shore run. The Brule rental trips reviewed operate in Wisconsin.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/948/main', 'https://brulerivercanoerental.com/our-trips/'],
  },
  'brule-river-wisconsin-michigan': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Forest Service describes the boundary river. The similarly named canoe rental serves the Bois Brule in Douglas County. I could not confirm an operator on the boundary river.',
    sources: ['https://www.fs.usda.gov/media/112628', 'https://brulerivercanoerental.com/our-trips/'],
  },
  'bruneau-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'ROW Adventures',
      url: 'https://www.rowadventures.com/bruneau-jarbidge-river-rafting',
      service: 'Guided multiday Bruneau Canyon raft trips launch near Indian Hot Springs and run the canyon downstream.',
      routes: ['bruneau-indian-hot-springs-bruneau'],
      sources: ['https://www.rowadventures.com/be-prepared/bruneau-and-jarbidge-river-trip'],
    }],
  },
  'brushy-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Brushy Creek Lake Park is upstream in Cedar Park. I could not confirm an outfitter for the Round Rock creek section from Chisholm Trail to Red Bud.',
    sources: ['https://www.cedarparktexas.gov/Facilities/Facility/Details/Brushy-Creek-Lake-Park-1', 'https://www.wilcotx.gov/1288/Brushy-Creek-Regional-Trail'],
  },
  'bryant-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The county visitor guide describes Bryant Creek as lacking public canoe outfitters. Missouri Conservation lists Warren Bridge as a public access.',
    sources: ['https://www.ozarkcountytimes.com/sites/default/files/2024%20Real%20Ozarks%20.pdf', 'https://mdc.mo.gov/discover-nature/places/warren-bridge-access'],
  },
  'buck-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The county tourism article names past outfitting services. I could not verify current rental or shuttle arrangements at the access points listed by Kentucky Fish and Wildlife.',
    sources: ['https://lctourism.com/kayak-adventure/', 'https://fw.ky.gov/Education/Pages/Buck-Creek.aspx'],
  },
  'buffalo-bayou': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Buffalo Bayou Kayak Tours',
      url: 'https://buffalobayoukayak.com/kayak-tours/sunset-skyline-tour/',
      service: 'The outfitter at Allen’s Landing offers a guided sunset kayak tour of downtown Houston. See the operator’s itinerary for meeting details.',
      routes: ['buffalo-bayou-sabine-street-allens-landing'],
      sources: ['https://buffalobayou.org/location/buffalo-bayou-downtown/'],
    }],
  },
  'buffalo-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Buffalo Outdoor Center',
      url: 'https://www.buffaloriver.com/float-the-buffalo/boat-rental-shuttle-rates/',
      service: 'Rent canoes or kayaks and arrange a separate vehicle shuttle. The rate table lists trips from Ponca, Kyles Landing and Pruitt by destination.',
      routes: ['buffalo-river-ponca-steel-creek', 'buffalo-river-ponca-kyles-landing', 'buffalo-river-ponca-erbie', 'buffalo-river-ponca-hasty', 'buffalo-river-kyles-landing-pruitt', 'buffalo-river-pruitt-hasty'],
    }],
  },
  'buffalo-river-new-york': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Elevator Alley Kayak',
      url: 'https://www.elevatoralleykayak.com/rentals',
      service: 'Rent a kayak at the outfitter’s Buffalo River launch. Paddle toward Canalside or upstream to Red Jacket River Front Park and return the kayak at the launch.',
      routes: ['buffalo-river-canalside-red-jacket'],
    }],
  },
  'butternut-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Jamesville Beach recreation is on the reservoir. I could not confirm outfitting on the downstream whitewater run to Route 481.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/10621/main', 'https://www.iloveny.com/listing/jamesville-beach-county-park/43648/'],
  },
  'cacapon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cacapon River Outfitters',
      url: 'https://cacaponriveroutfitters.com/',
      service: 'Book a kayak or tube trip on the stretch above Largent Bridge. Meet at Stoney Creek Country Store for the upstream shuttle.',
      routes: [],
    }],
  },
  'cache-la-poudre-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rocky Mountain Adventures',
      url: 'https://shoprma.com/outdoor-gear-rentals/',
      service: 'Pick up paddling gear at the Fort Collins rental shop and arrange your own transport to Shields Street and back from Legacy Park.',
      routes: ['cache-la-poudre-fort-collins-shields-legacy'],
      sources: ['https://www.visitftcollins.com/listing/rocky-mountain-adventures/918/', 'https://www.fortcollins.gov/Parks-and-Natural-Areas-Directory/Natural-Areas/Shields-Street-River-Access'],
    }],
  },
  'cahaba-river-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cahaba River Coalition',
      url: 'https://cahabarivercoalition.org/take-action/',
      service: 'The coalition organizes guided canoe paddles, including scheduled Irondale programs from Grants Mill to Old Overton Road. Check its calendar for registration.',
      routes: ['cahaba-river-grants-mill-old-overton'],
      sources: ['https://cityofirondaleal.gov/wp-content/uploads/Resolution-2025-R-75-Authorizing-the-execution-of-a-Service-Agreement-with-Cahaba-River-Society-Inc.pdf'],
    }],
  },
  'calvert-county-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Proteus Bicycles',
      url: 'https://www.proteusbicycles.com/articles/kayak-rentals-pg296.htm',
      service: 'Reserve a kayak or paddleboard on Solomons Island. The outfitter gives directions to its Williams Street launch at Fishermans Wharf.',
      routes: ['calvert-solomons-island-patuxent-loop'],
    }],
  },
  'camas-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The local visitor bureau and American Whitewater describe the Blaine Bridge to Moonstone Landing run. I could not verify a commercial guide or shuttle serving it.',
    sources: ['https://visitsouthidaho.com/adventure/rafting-camas-creek-idaho-blaine-bridge-moonstone-landing/', 'https://www.americanwhitewater.org/content/River/view/river-detail/538/main'],
  },
  'canandaigua-outlet': {
    reviewedOn: '2026-11-24',
    noMatch: 'City concession material describes rentals at the lakefront outlet mouth. I could not confirm outfitted paddling on the Littleville to Manchester section.',
    sources: ['https://www.canandaiguanewyork.gov/AgendaCenter/ViewFile/Agenda/_03022026-485'],
  },
  'canisteo-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Steuben County lists paddling and regional gear providers, but I could not verify a trip, delivery or shuttle on the Canisteo to Addison section.',
    sources: ['https://exploresteuben.com/experience-the-outdoors/paddling/', 'https://www.americanwhitewater.org/content/River/view/river-detail/1271/main'],
  },
  'cannon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Welch Mill',
      url: 'https://www.welchmill.com/canoeing-kayaking',
      service: 'Check in at Welch Mill for a canoe or kayak rental and an upstream ride. Both rental itineraries finish at the mill’s private landing in Welch.',
      routes: ['cannon-river-welch'],
    }],
  },
  'carmans-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Brookhaven awarded a new concession license after the former outfitter closed. I could not verify an operating rental or booking page for the replacement.',
    sources: ['https://dec.ny.gov/things-to-do/boating/launch-sites/boat-launch-suffolk', 'https://newsday.atexcloud.io/long-island/suffolk/carmans-river-kayak-izadora-meares-gev4hp13'],
  },
  'caroga-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Caroga Lake Marina permits transport to other lakes. I could not verify rentals or shuttle service for the Ephratah to Route 5 whitewater run.',
    sources: ['https://www.carogalakemarina.com/', 'https://visitmontgomerycountyny.com/listing/whitewater-and-paddling/'],
  },
  'carson-river-nevada': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'BlueZone Sports',
      url: 'https://www.bluezonesports.com/rentals/carson-city-watersports-rentals',
      service: 'The Carson City shop rents kayaks, paddleboards and life jackets for pickup. Paddlers arrange their own transport between river access sites.',
      routes: ['carson-river-carson-river-park-morgan-mill'],
      sources: ['https://visitcarsoncity.com/things-to-do/outdoor-recreation/carson-city-water-sports/'],
    }],
  },
  'cass-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Frankenmuth Kayak Adventures',
      url: 'https://www.kayakfrankenmuth.com/rates',
      service: 'Book the Tuscola to Frankenmuth kayak trip with an upstream ride to the put-in and a self-guided paddle back to town.',
      routes: ['cass-river-tuscola-frankenmuth'],
      sources: ['https://cassriverwatertrail.org/planatrip/rentals/'],
    }],
  },
  'catatonk-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The paddling shop between Candor and Owego has a showroom and a test pond. I could not verify a rental or shuttle for running Catatonk Creek.',
    sources: ['https://www.tiogachamber.com/list/member/route-96-power-paddle-196'],
  },
  'catawba-river-south-carolina': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Optimist Training',
      url: 'https://www.optimisttraining.com/kayak-rentals',
      service: 'Reserve a kayak and shuttle from below the Lake Wylie Dam at Fort Mill to Riverwalk or River Park in Rock Hill. The outfitter also leads seasonal paddles at Landsford Canal.',
      routes: ['catawba-river-fort-mill-rock-hill'],
    }],
  },
  'catharine-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Seneca Lake Kayak',
      url: 'https://www.senecalakekayak.com/paddleboarding/catharine-creek-marsh-may-jun-1-pm',
      service: 'The outfitter offers guided Catharine Creek exploration from Watkins Glen. Its itinerary has a separate meeting point from the wildlife area’s cartop launches.',
      routes: ['catharine-creek-wma-marsh-connector'],
    }],
  },
  'catoctin-creek-maryland': {
    reviewedOn: '2026-11-24',
    noMatch: 'County park programs describe creek exploration. Nearby outfitters advertise the Potomac and Shenandoah. I could not verify a paddling service on Catoctin Creek.',
    sources: ['https://www.recreater.com/999/Activities-Programs', 'https://www.canaltrust.org/pyvactivities/paddle/'],
  },
  'catskill-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'FlotSam Kayak Rental',
      url: 'https://flotsamkayak.com/',
      service: 'Rent a kayak at Dutchman’s Landing for a paddle into the sheltered mouth of Catskill Creek.',
      routes: ['catskill-creek-kiwanis-dutchmans'],
    }],
  },
  'cattaraugus-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Zoar Valley Expedition Company',
      url: 'https://zoarvalleyrafting.com/',
      service: 'The Gowanda outfitter leads spring rafting trips through Zoar Valley and guided kayak or packraft trips as summer flows allow.',
      routes: ['cattaraugus-creek-zoar-bridge-gowanda'],
      sources: ['https://dec.ny.gov/places/zoar-valley-multiple-use-area-and-unique-area'],
    }],
  },
  'cayuga-inlet': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cornell Outdoor Education Outfitting Center',
      url: 'https://scl.cornell.edu/coe/outfitting',
      service: 'Reserve a canoe or sea kayak for pickup at the Ithaca outfitting center. Arrange your own transport to the inlet launch.',
      routes: ['cayuga-inlet-treman-cass-park'],
    }],
  },
  'cayuga-seneca-canal': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Waterloo Harbor Canoe & Kayak Company',
      url: 'https://www.paddlewaterloo.com/paddle-waterloo.html',
      service: 'Rentals launch from the company’s dock in Waterloo Harbor. The outfitter lists Oak Island, Lock CS4 and Seneca Falls as destinations to the east.',
      routes: ['cayuga-seneca-canal-oak-island-locks-cs2-3'],
    }],
  },
  'cazenovia-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Buffalo-area rental and tour descriptions cover the Buffalo River and City Ship Canal. I could not confirm coverage on the Cazenovia Park or West Falls reaches.',
    sources: ['https://dec.ny.gov/places/cazenovia-creek-fish-and-wildlife-management-area', 'https://visitbuffalo.com/seven-soul-restoring-places-to-kayak-around-buffalo/'],
  },
  'cedar-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Ozaukee County documents the Covered Bridge Park launch. The rental operators reviewed serve other waterways, and I could not verify a Cedar Creek trip to Grafton Lions Park.',
    sources: ['https://www.ozaukeecounty.gov/Facilities/Facility/Details/Covered-Bridge-Park-1', 'https://milwaukeekayak.com/reservations-rates/'],
  },
  'cedar-creek-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'FROG Canoe & Kayak Rentals',
      url: 'https://www.frogrentscanoeskayaks.com/cedar-creek',
      service: 'FROG offers a rental trip from Ore Pond through Double Trouble State Park. Its take-out is the old railroad trestle in Lanoka Harbor.',
      routes: ['cedar-creek-ore-pond-dudley-park'],
    }],
  },
  'cedar-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Woods River Rentals',
      url: 'https://www.traveliowa.com/places/woods-river-rentals/4260/',
      service: 'Reserve canoes, kayaks, paddleboards or tubes for the Cedar River in Waverly, Iowa. Contact the operator to confirm launch and pickup locations.',
      routes: [],
    }],
  },
  'cedar-river-adirondacks': {
    reviewedOn: '2026-11-24',
    noMatch: 'The regional paddling guide describes the Cedar River Flow launch. The commercial rafting itineraries reviewed serve the Indian and Hudson rivers. I could not verify outfitting at Wakely Dam or Pelon Road.',
    sources: ['https://www.experienceouradirondacks.com/paddling/cedar-river-flow-moose-river-plains', 'https://dec.ny.gov/places/hudson-gorge-wilderness'],
  },
  'chadakoin-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Evergreen Outfitters',
      url: 'https://www.evergreen-outfitters.com/summer-tours.html',
      service: 'Summer outlet paddles meet at McCrea Point Park in Jamestown. The meeting place can change with algae conditions, so check the outing calendar before heading out.',
      routes: ['chautauqua-lake-chadakoin-celoron-mccrea'],
      sources: ['https://www.tourchautauqua.com/learn/natural-world'],
    }],
  },
  'chamberlain-lake': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Allagash Guide Service',
      url: 'https://www.allagashguideservice.com/maine-canoe-trips/canoe-trip-shuttle-transportation/',
      service: 'The guide service lists Chamberlain Bridge as a shuttle destination for Allagash canoe trips. Contact the operator for transport options and availability.',
      routes: ['chamberlain-lake-dacf-remote-loop'],
    }],
  },
  'champlain-canal': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Upstate Kayak Rentals',
      url: 'https://www.hudsoncrossingpark.org/kayak-launches',
      service: 'Reserve a kayak at the self-service kiosk on the canal side of Lock C5. The rental kiosk is at the adaptive launch across the road from the Alfred Z. Solomon river launch.',
      routes: ['champlain-canal-lock-c5-stillwater', 'champlain-canal-moreau-lock-c5'],
    }],
  },
  'charles-county-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Charles County Recreation, Parks & Tourism',
      url: 'https://charlescountymd.myrec.com/info/facilities/details.aspx?ActivityID=155682',
      service: 'Join a guided tandem kayak tour of the Ghost Fleet from Mallows Bay Park. The county provides boats, paddles and life jackets.',
      routes: ['lower-potomac-purse-mallows-bay'],
      sources: ['https://www.charlescountyparks.com/parks/kayak-tours'],
    }, {
      name: 'Atlantic Kayak Company',
      url: 'https://www.atlantickayak.com/kayak-rentals.html',
      service: 'Rent kayaks at the Mattingly Avenue launch in Indian Head for a paddle on Mattawoman Creek. Staff provide a launch demonstration and help plan the outing.',
      routes: ['mattawoman-creek-mattlingy-smallwood'],
    }],
  },
  'chattahoochee-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Whitewater Express',
      url: 'https://chattahoochee.whitewaterexpress.com/activity/classic-whitewater-rafting/',
      service: 'Book a guided raft trip on the downtown Columbus whitewater course. The classic trip follows the Chattahoochee along the Georgia–Alabama state line.',
      routes: ['chattahoochee-river-columbus-whitewater-park'],
    }, {
      name: 'Nantahala Outdoor Center',
      url: 'https://noc.com/trips/chattahoochee-river-inflatable-kayak-ducky-rentals-metro/',
      service: 'The Atlanta outpost offers inflatable kayak rentals on the metro Chattahoochee with a return shuttle from Paces Mill. Check the trip listing for meeting instructions.',
      routes: ['chattahoochee-river-powers-island-paces-mill'],
      sources: ['https://noc.com/locations/chattahoochee-river-metro-ga/'],
    }],
  },
  'cheat-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cheat River Outfitters',
      url: 'https://www.cheatriveroutfitters.com/cheat-canyon/',
      service: 'The guided Cheat Canyon rafting trip runs from Albright to Jenkinsburg Bridge. The outfitter confirms the section according to river levels.',
      routes: ['wv-cheat-albright-jenkinsburg'],
    }],
  },
  'chemung-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Friends of the Chemung River Watershed',
      url: 'https://chemungriverfriends.org/wp/programs/',
      service: 'The group runs scheduled guided kayak trips on the Chemung, including outings from Cohocton Street to Bottcher’s Landing. Consult its events calendar for the next itinerary.',
      routes: ['chemung-river-cohocton-street-bottchers'],
      sources: ['https://chemungriverfriends.org/wp/events/list/'],
    }],
  },
  'chenango-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Take Adventures Everyday',
      url: 'https://www.takeadventureseveryday.com/',
      service: 'River trips meet at Farm by Beer Tree in Port Crane. The outfitter offers kayak rentals and shuttle trips with a Chenango Forks launch option.',
      routes: ['chenango-river-chenango-forks-port-crane'],
    }],
  },
  'chesapeake-bay-environmental-center-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Chesapeake Bay Environmental Center',
      url: 'https://bayrestoration.org/activities-overview/kayaking-paddleboarding/',
      service: 'Rent kayaks or paddleboards at the center’s dock for Marshy Creek and the bay. Guided tours explore Marshy Creek with a naturalist.',
      routes: ['cbec-marshy-creek-water-trail', 'cbec-prospect-bay-water-trail'],
    }],
  },
  'chestnut-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The nearby Galax outfitter lists New River boat trips and bike shuttles to Galax. I could not confirm boat service on Chestnut Creek from Galax to Byllesby.',
    sources: ['https://newriveroutdooradventures.com/canoe-kayak-tube/', 'https://newriveroutdooradventures.com/shuttles/'],
  },
  'chesuncook-lake': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Katahdin Gear Library',
      url: 'https://www.outdoorsi.org/kgl',
      service: 'Arrange a canoe or kayak rental for pickup in Millinocket and transport it to the lake. The gear library rents to visitors as well as members and includes paddles and life jackets.',
      routes: ['chesuncook-lake-t3r12-remote-loop'],
    }],
  },
  'chippewa-river-minnesota': {
    reviewedOn: '2026-11-24',
    noMatch: 'Minnesota DNR documents the water trail through Watson. I could not verify a current rental or shuttle serving these Chippewa River landings near Montevideo.',
    sources: ['https://www.dnr.state.mn.us/state-water-trails/chippewa-river/segments-maps.html', 'https://www.dnr.state.mn.us/state-parks/starter-kit/paddle.html'],
  },
  'chippewa-river-wisconsin': {
    reviewedOn: '2026-11-24',
    noMatch: 'Rusk County documents the Bruce, Imalone and Flambeau confluence trips. I could not verify current rental or shuttle arrangements for these sections from an operator.',
    sources: ['https://ruskcountywi.com/recreation/canoeing-kayaking/', 'https://ruskcountywi.com/chippewa-river-imalone-to-bruce/'],
  },
  'chittenango-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Chittenango Landing’s rentals are on the Old Erie Canal. I could not confirm outfitting for either of the creek’s whitewater sections above or below Chittenango Falls.',
    sources: ['https://chittenangolanding.org/kayak-rentals', 'https://www.americanwhitewater.org/content/River/view/river-detail/10879/main'],
  },
  'christina-river-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Delaware Nature Society',
      url: 'https://delawarenaturesociety.org/programs-events/field-trips-overnights/scouts-and-groups/',
      service: 'Groups can arrange a guided canoe program on the Christina River and the tidal marsh at the DuPont Environmental Education Center in Wilmington.',
      routes: ['christina-river-newport-7th-street'],
      sources: ['https://www.newcastlede.gov/DocumentCenter/View/19167/Christina-River-Guide'],
    }],
  },
  'clark-fork-river-montana': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Clark Fork Yacht Club',
      url: 'https://www.clarkforkyachtclub.com/',
      service: 'Rent a river tube and ride the shuttle to the Sha-Ron access in East Missoula. Follow the operator’s take-out instructions in downtown Missoula.',
      routes: ['clark-fork-river-sharon-silver-park', 'clark-fork-river-sharon-jacobs-island'],
      sources: ['https://www.clarkforkyachtclub.com/frequently-asked-questions'],
    }],
  },
  'clear-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Golden River Sports',
      url: 'https://www.goldenriversports.net/kayaking-demos-rentals',
      service: 'The Golden shop rents whitewater kayaks near Clear Creek Whitewater Park. See its demo and rental policies for boat selection, experience and transport requirements.',
      routes: ['clear-creek-golden-whitewater-park'],
      sources: ['https://www.goldenvisitorsbureau.com/activities/gvckayaking.php'],
    }],
  },
  'clear-creek-utah': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater describes the short run below Fish Creek. Nearby commercial rafting trips are on the Sevier. I could not confirm service on Clear Creek.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-index/state/USA-UTA', 'https://www.blm.gov/visit/sevier-river'],
  },
  'clear-fork-trinity-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'TC Paddlesports',
      url: 'https://www.trinitycoalition.org/programs/tc-paddlesports-at-panther-island',
      service: 'Trinity Coalition rents kayaks, canoes and paddleboards at Panther Island in Fort Worth for exploring the Clear and West forks near their confluence.',
      routes: [],
    }],
  },
  'clinch-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Clinch Life Outfitters',
      url: 'https://www.clinchlifeoutfitters.com/',
      service: 'The outfitter offers kayak rentals, guided trips and shuttles. Its usual service area begins at Nash’s Ford and continues downstream to Dungannon.',
      routes: [],
    }],
  },
  'clinton-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Clinton River Canoe & Kayak',
      url: 'https://www.clintonriverkayak.com/river-trips.html',
      service: 'The Sterling Heights paddling trip passes through Dodge Park and the former Rambler golf course. Check in at the Utica Road meeting point.',
      routes: ['clinton-river-downtown-utica-budd'],
      sources: ['https://www.macombgov.org/make-macomb-your-home/outdoor-activities/trail-network/water-trails/main-branch-clinton-river'],
    }],
  },
  'cloquet-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The DNR documents the Indian Lake reach. Swiftwater Adventures’ kayak itinerary is on the St. Louis River. I could not verify service on this Cloquet River section.',
    sources: ['https://files.dnr.state.mn.us/maps/canoe_routes/cloquet2.pdf', 'https://swiftwatermn.com/trips-pricing/inflatable-kayak-whitewater-adventure/'],
  },
  'coal-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Coal River Group',
      url: 'https://coalrivergroup.com/kayak-rentals/',
      service: 'Pick up rental kayaks at Meadowood Park. The operator offers independent rentals and shuttle options, with availability and meeting arrangements listed at booking.',
      routes: ['wv-coal-meadowood-lower-falls'],
      sources: ['https://kcprc.com/activity/canoe-and-kayak-rentals/'],
    }],
  },
  'cobleskill-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The regional guide documents the Cobleskill run. The nearby Schoharie Valley rental business lists trips on Schoharie Creek. I could not confirm service on Cobleskill Creek.',
    sources: ['https://visitmontgomerycountyny.com/listing/whitewater-and-paddling/', 'https://paddlethecreek.com/'],
  },
  'cohansey-river-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'Eagle Manor offers a private launch and storage for guests bringing their own boats. I could not verify a paddle outfitter serving the Bridgeton to Back Neck reach.',
    sources: ['https://www.eaglemanor.com/kayaking', 'https://cohansey.org/recreation-in-the-cohansey-watershed/'],
  },
  'cohocton-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The published group paddle starts at Mulholland Road in Painted Post, near the downstream end of the catalog trip. I could not confirm rental or shuttle service from Campbell to Kinsella.',
    sources: ['https://chemungriverfriends.org/wp/events/list/', 'https://paddle607.com/application/files/4817/4423/0090/NY_Susquehanna_Basin_Water_Trail_Itinerary_9_Kinsella-Cohocton_rev.pdf'],
  },
  'colorado-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Colorado Bend State Park',
      url: 'https://tpwd.texas.gov/state-parks/colorado-bend',
      service: 'The state park map marks kayak rentals at the riverfront. Contact the park about equipment availability for paddling from the park end of this reach.',
      routes: ['colorado-river-fm580-colorado-bend'],
      sources: ['https://tpwd.texas.gov/publications/pwdpubs/media/park_maps/pwd_mp_p4507_0140n.pdf'],
    }],
  },
  'colorado-river-nevada': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Desert Adventures',
      url: 'https://www.desert-adventures.com/kayak-tours/black-canyon-kayaking',
      service: 'This guided full-day kayak trip launches below Hoover Dam and follows Black Canyon to Willow Beach. The operator provides the booking and launch instructions.',
      routes: ['colorado-river-hoover-dam-willow-beach'],
    }],
  },
  'colorado-river-texas': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bastrop River Company',
      url: 'https://bastropriverco.com/',
      service: 'The outfitter in Fisherman’s Park rents kayaks and canoes. Its Wilbarger itinerary starts at the FM 969 bridge at Utley and ends in Bastrop.',
      routes: ['colorado-river-utley-bridge-fishermans-park'],
      sources: ['https://bastropriverco.com/non-profit-groups-kayaking-and-river-camping-activities/', 'https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bastrop-wilbarger/'],
    }],
  },
  'colorado-river-utah': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'OARS',
      url: 'https://www.oars.com/before-you-go/moab-fisher-towers-rafting-1-day/',
      service: 'The one-day Fisher Towers rafting trip includes transport to Hittle Bottom and a guided float to Takeout Beach.',
      routes: ['colorado-river-hittle-bottom-takeout-beach'],
    }],
  },
  'connecticut-river-massachusetts': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater describes the Turners Falls Dam bypass reach. The western Massachusetts outfitter reviewed lists clinics on the Deerfield. I could not verify service on the bypass.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/10911/main', 'https://www.zoaroutdoor.com/lessons-clinics'],
  },
  'connecticut-river-new-hampshire': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ledyard Canoe Club',
      url: 'https://sites.dartmouth.edu/ledyardcanoeclub/rentals/day-rentals/',
      service: 'Rent a canoe, kayak or paddleboard at the club’s Connecticut River dock in Hanover. The day-rental page lists availability and return times.',
      routes: ['connecticut-river-ledyard-east-wilder', 'connecticut-river-wilson-ledyard'],
      sources: ['https://outdoors.dartmouth.edu/facilities/connecticut-river-waterfront'],
    }],
  },
  'conococheague-creek-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'South Mountain Adventures',
      url: 'https://southmountainadventures.com/kayak-trips/conococheague-creek/',
      service: 'The outfitter lists a 3.5-mile kayak trip from Kemp’s Mill to the Williamsport boat ramp. Its trip page includes both access addresses.',
      routes: ['conococheague-creek-kemps-mill-williamsport'],
    }],
  },
  'conodoguinet-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Appalachian Kayak',
      url: 'https://appalachiankayak.com/pricing-information/',
      service: 'Book a rental and shuttle from Willow Mill to Hidden Creek. The outfitter lists launch options and separate rates for shuttling a personal kayak.',
      routes: ['conodoguinet-creek-willow-mill-acri-meadow', 'conodoguinet-creek-willow-mill-good-hope', 'conodoguinet-creek-willow-mill-vincent-difilippo'],
    }],
  },
  'contoocook-river-new-hampshire': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Contoocook River Canoe Company',
      url: 'https://contoocookcanoe.com/contoocook-river-rentals/',
      service: 'Rent a boat at the company’s riverfront beach in Concord or reserve the nine-mile shuttle trip. The Riverway Park paddle ends at the company’s landing on Horse Hill Road.',
      routes: ['contoocook-riverway-park-canoe-company'],
      sources: ['https://www.forestsociety.org/document/contoocook-river-paddleedited2023pdf.pdf'],
    }],
  },
  'coosa-river-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Coosa River Adventures',
      url: 'https://www.wetumpkaal.gov/396/Kayaking-Paddle-Sports',
      service: 'The Wetumpka outfitter offers kayaks, canoes and shuttles on the run below Jordan Dam through the Moccasin Gap rapids. Confirm the operator’s take-out when reserving.',
      routes: ['coosa-river-jordan-dam-gold-star', 'coosa-river-jordan-dam-corn-creek'],
      sources: ['https://www.coosariveradventures.com/features.html'],
    }],
  },
  'corkers-creek-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pocomoke River State Park',
      url: 'https://dnr.maryland.gov/publiclands/pages/eastern/pocomoke/boating-fishing.aspx',
      service: 'Rent a canoe or kayak at the Shad Landing boat rental building for a paddle on Corkers Creek and through the cypress swamp.',
      routes: ['corkers-creek-blackwater-canoe-trail'],
    }],
  },
  'corsica-river-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Tackle Cove',
      url: 'https://www.tacklecove.com/kayak-rentals.aspx',
      service: 'The kayak outfitter is at Centreville Wharf, where all three Corsica River water trails start. Contact the shop for rental reservations.',
      routes: ['corsica-river-alder-branch-trail', 'corsica-river-mill-stream-trail', 'corsica-river-yellow-bank-stream-trail'],
      sources: ['https://www.townofcentreville.org/309/On-the-River-and-Trails'],
    }],
  },
  'cossatot-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'A regional directory mentions a campground shuttle. The campground’s current site describes lodging, and I could not confirm present service from Ed Banks to Highway 278.',
    sources: ['https://www.cossatotcabinsrv.com/', 'https://www.arkansaslandcan.org/local-resources/Cossatot-River-RV-ParkCabins/25096', 'https://www.arkansasstateparks.com/sites/default/files/2025-10/cossatotriver_2014pibweb.pdf'],
  },
  'cottonwood-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Redwood-Cottonwood Rivers Control Area',
      url: 'https://rcrca.com/',
      service: 'The watershed agency rents canoes, kayaks and transport trailers for exploring the Cottonwood and Redwood watersheds. Arrange equipment pickup and your own river shuttle.',
      routes: ['cottonwood-river-county-road-10-county-road-11', 'cottonwood-river-county-road-11-flandrau', 'cottonwood-river-flandrau-highway-15', 'cottonwood-river-highway-15-courtland', 'cottonwood-river-highway-4-county-road-10', 'cottonwood-river-springfield-highway-4'],
    }],
  },
  'cowpasture-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Town of Buchanan identifies Twin River Outfitters on the Cowpasture. I could not confirm service on the Sharon Park to Evans Tract stretch from the operator’s trip listings.',
    sources: ['https://www.buchanan-va.gov/238/Twin-River-Outfitters', 'https://canoevirginia.net/day-trips/', 'https://cowpastureriver.org/wp-content/uploads/2025/06/The-River-Runs-Spring-2025-FINAL.pdf'],
  },
  'crawfish-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Dodge County Parks',
      url: 'https://www.co.dodge.wi.gov/lrp-parks/astico-park',
      service: 'Astico Park rents canoes and kayaks beside its Crawfish River launch. Contact the park about equipment for paddling from the Danville Mill Pond.',
      routes: ['crawfish-river-columbus-astico'],
    }],
  },
  'crooked-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Crooked Creek Outfitters',
      url: 'https://fishandfloattheozarks.com/',
      service: 'Reserve a rental kayak, guided fishing float or shuttle on Crooked Creek. Contact the outfitter with the access points for your planned float.',
      routes: [],
      sources: ['https://www.agfc.com/things-to-do/water-trails/crooked-creek/'],
    }],
  },
  'crooked-fork-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Forest Service identifies outfitters on the Lochsa, and American Whitewater describes the Crooked Fork tributary. I could not verify outfitting between the highway bridge and White Sands.',
    sources: ['https://www.fs.usda.gov/media/61266', 'https://www.americanwhitewater.org/content/River/view/river-detail/549/main'],
  },
  'cross-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Vail-area outfitters list trips on the Eagle and Upper Colorado rivers. I could not confirm commercial paddling or a shuttle on the Cross Creek run near Minturn.',
    sources: ['https://www.vail.com/travel-guide/vail-kayaking-tours.aspx', 'https://www.vail.gov/home/showpublisheddocument/5762/639141993308770000'],
  },
  'croton-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Hudson River Recreation',
      url: 'https://kayakhudson.com/product/croton-river-rentals/',
      service: 'Rent a canoe, kayak or paddleboard at the Echo launch by Croton-Harmon station to explore the lower Croton River.',
      routes: ['croton-river-dam-echo-point'],
    }],
  },
  'crow-wing-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Gloege’s Northern Sun Canoe & Kayak Outfitting',
      url: 'https://canoethecrowwing.com/suggested-canoe-trips',
      service: 'The outfitter offers a day paddle from Mary Brown Bridge to its landing near Nimrod. Longer itineraries pass Anderson’s Crossing and Little White Dog with pickup at Cottingham Park.',
      routes: ['crow-wing-river-mary-brown-cottingham', 'crow-wing-river-andersons-crossing-cottingham', 'crow-wing-river-little-white-dog-cottingham'],
    }],
  },
  'crystal-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adventure Outfitters',
      url: 'https://www.adventureoutfittersllc.com/crystal-river-adventure',
      service: 'Check in at Lower South Park for a five-mile kayak trip on the Crystal River. The paddle finishes across Shadow Lake at the park.',
      routes: ['crystal-river-rural-shadow-lake'],
    }],
  },
  'crystal-river-colorado': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Marble tourism association and American Whitewater document the Bogan Canyon run. I could not confirm an operator offering paddling services for Marble to Redstone.',
    sources: ['https://marblecolorado.org/activities/kayaking/', 'https://www.americanwhitewater.org/content/River/view/river-detail/2105/main'],
  },
  'cumberland-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sheltowee Trace Adventure Resort',
      url: 'https://www.ky-rafting.com/cumberland-canoeingkayaking-trips.html',
      service: 'The resort offers canoe and kayak trips from Redbird and Thunderstruck to the designated take-out at Cumberland Falls State Resort Park. Trip availability depends on water levels.',
      routes: ['cumberland-river-redbird-cumberland-falls', 'cumberland-river-thunderstruck-cumberland-falls'],
    }],
  },
  'current-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'The Landing',
      url: 'https://www.thelandingcurrentriver.com/how-to-float.php',
      service: 'The Van Buren outfitter transports paddlers upriver. All of its floats return to the outfitter’s riverfront take-out in town.',
      routes: ['current-river-waymeyer-van-buren'],
      sources: ['https://www.nps.gov/thingstodo/paddle-the-lower-current-river.htm'],
    }, {
      name: 'Akers Ferry Canoe Rental',
      url: 'https://www.currentrivercanoe.com/crfloats.html',
      service: 'The outfitter lists canoe and kayak trips starting at Cedar Grove or Akers, with itineraries to Akers, Pulltite and Round Spring. Some trips have limited bus departures.',
      routes: ['current-river-cedar-grove-akers', 'current-river-cedar-grove-pulltite', 'current-river-cedar-grove-round-spring', 'current-river-akers-ferry-pulltite', 'current-river-akers-ferry-round-spring'],
    }],
  },
  'cuyahoga-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The park directs paddlers to bring equipment. KayakHoga lists trips starting at Boston Store or farther downstream, but I could not verify an outfitted Lock 29 to Boston Store trip.',
    sources: ['https://www.nps.gov/cuva/planyourvisit/paddling-the-river.htm', 'https://www.kayakhoga.com/plan-your-trip'],
  },
  'dan-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'The General Dan Tubing Company',
      url: 'https://danburytubing.com/',
      service: 'Check in beside Moratock Park in Danbury for a tube and an upstream shuttle. The float returns to the company’s own landing.',
      routes: ['dan-river-hanging-rock-moratock'],
      sources: ['https://danburytubing.com/faq/'],
    }],
  },
  'dead-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Raquette River Outfitters',
      url: 'https://www.tupperlake.com/guide-services/raquette-river-outfitters',
      service: 'The Tupper Lake outfitter rents canoes and kayaks. Contact the shop about equipment pickup and arrange transport to the Route 3 access.',
      routes: ['dead-creek-route-3-headwaters-out-and-back'],
      sources: ['https://www.tupperlake.com/paddling/dead-creek-primitive-area'],
    }],
  },
  'deadwood-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Deadwood Outfitters advertises fishing, hunting and trail rides. I could not confirm a commercial whitewater trip or shuttle from Deadwood Reservoir to Julie Creek.',
    sources: ['https://www.deadwoodoutfitters.com/', 'https://www.fs.usda.gov/media/113863'],
  },
  'deer-creek-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Eden Mill Nature Center',
      url: 'https://edenmill.org/',
      service: 'The center schedules guided canoe outings on Deer Creek at Eden Mill. Check its events calendar for launch details, dates and registration.',
      routes: [],
      sources: ['https://www.harfordcountymd.gov/Calendar.aspx?EID=13947&calType=0&day=7&month=9&year=2026'],
    }],
  },
  'deerfield-river-massachusetts': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Zoar Outdoor',
      url: 'https://www.zoaroutdoor.com/adventures/item/guided-river-kayaking',
      service: 'The guided kayaking trip runs on the Fife Brook section of the Deerfield. The outfitter provides kayaks and safety gear and schedules trips around dam releases.',
      routes: ['deerfield-river-fife-brook-east-charlemont', 'deerfield-river-fife-brook-zoar-picnic', 'deerfield-river-fife-brook-shunpike'],
    }],
  },
  'delaware-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Lander’s River Trips',
      url: 'https://landersrivertrips.com/kayaking-trip/',
      service: 'The outfitter offers Upper Delaware kayak trips through the Skinners Falls area. Use its river map and current conditions to choose a launch and landing.',
      routes: ['delaware-river-callicoon-narrowsburg'],
      sources: ['https://landersrivertrips.com/directions/', 'https://www.nps.gov/upde/planyourvisit/paddling-times.htm'],
    }],
  },
  'delaware-river-delaware-shoreline': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bay Venture Outfitters',
      url: 'https://northeast.bayventureoutfitters.com/offsite-rental-information/',
      service: 'The outfitter delivers off-site kayak rentals in New Castle County by advance arrangement. Confirm the equipment and handoff location for your trip and plan your own passenger shuttle.',
      routes: ['delaware-river-fort-dupont-augustine-beach'],
      sources: ['https://deldot.gov/Programs/byways/pdfs/bayshore_byway_cmp/Chapter_4.pdf'],
    }],
  },
  'delaware-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Big Bear Gear',
      url: 'https://bigbeargearnj.com/pages/kayak-and-canoe-rental',
      service: 'Pick up a boat at the Lambertville store for a self-transport trip, including Fireman’s Eddy to Washington Crossing. The separate Kingwood location offers a five-mile paddle with a return shuttle.',
      routes: ['delaware-river-firemens-eddy-washington-crossing', 'delaware-river-kingwood-byram', 'delaware-river-kingwood-fairview'],
    }],
  },
  'des-moines-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Seven Oaks Recreation',
      url: 'https://sevenoaksrec.com/canoe-kayak-iowa-river-floats/',
      service: 'Meet at Seven Oaks in Boone for a canoe or kayak rental and transport. The trip paddles from the lower Boone Water Works ramp to the Highway 30 access.',
      routes: [],
      sources: ['https://sevenoaksrec.com/first-timer-summer-guide/'],
    }],
  },
  'drakes-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Drakes Creek Canoe',
      url: 'https://www.drakescreekcanoe.com/reservations',
      service: 'Reserve a boat for the paddle from Romanza Johnson Park to Phil Moore Park. The rental includes the shuttle.',
      routes: ['drakes-creek-romanza-johnson-phil-moore'],
    }],
  },
  'duck-creek-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bay Venture Outfitters',
      url: 'https://northeast.bayventureoutfitters.com/offsite-rental-information/',
      service: 'Bay Venture offers advance kayak rentals with delivery in Kent County, Delaware. Arrange the handoff location and return time with the outfitter for a Woodland Beach outing.',
      routes: ['duck-creek-woodland-beach-loop'],
      sources: ['https://documents.dnrec.delaware.gov/fw/Education/Documents/AREC/Woodland-Beach-Map.pdf'],
    }],
  },
  'ea-vaughn-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pocomoke River Canoe Company',
      url: 'https://www.pocomokeriverpaddle.com/',
      service: 'The Snow Hill outfitter offers off-site canoe and kayak rentals. Contact the shop about pickup for the E.A. Vaughn trails and arrange transport to your chosen landing.',
      routes: ['ea-vaughn-george-island-4-mile', 'ea-vaughn-taylors-landing-6-mile', 'ea-vaughn-taylors-landing-3-mile'],
      sources: ['https://dnr.maryland.gov/publiclands/Pages/eastern/Pocomoke/Boating-Fishing.aspx', 'https://dnr.maryland.gov/boating/Pages/eastern_south.aspx'],
    }],
  },
  'eagle-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Timberline Tours',
      url: 'https://timberlinetours.com/timberline-trips/lower-eagle-river/',
      service: 'Timberline runs guided early-season whitewater rafting trips on the Lower Eagle. Check its trip page for the meeting location and current itinerary.',
      routes: ['eagle-river-lower-edwards-eagle'],
      sources: ['https://eagleoutside.com/explore/river/paddle/eagle-river-rafting/'],
    }],
  },
  'east-branch-delaware-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Al’s Sport Store',
      url: 'https://www.alssportstore.com/canoe-kayak-rentals',
      service: 'Rent a canoe or kayak for the six-mile trip from Downsville to Shinhopple. The shop helps stage your vehicle at the take-out before the paddle.',
      routes: ['east-branch-delaware-river-downsville-shinhopple'],
    }],
  },
  'east-branch-pecatonica-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Argyle’s river guide mentions Cork Down Saloon, but the village’s outfitter listing specifies use at Yellowstone Lake State Park. I could not verify service on the East Branch.',
    sources: ['https://www.argylewi.gov/directory/area-attractions/pecatonica-river/', 'https://www.argylewi.gov/directory/business/cork-down-saloon-boat-rentals/'],
  },
  'east-branch-sacandaga-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Griffin Gorge run is on the East Branch. The nearby rafting and riverfront rental shop describes the Sacandaga whitewater recreation area at Lake Luzerne. I could not confirm a Griffin Gorge trip.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/1401/main', 'https://www.4soc.com/rafting/'],
  },
  'east-canada-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'DEC identifies the Powley Place paddle, and the regional guide identifies the Dolgeville run. Caroga Lake Marina permits transporting rentals to other lakes. Creek use could not be verified.',
    sources: ['https://dec.ny.gov/places/ferris-lake-wild-forest', 'https://visitmontgomerycountyny.com/listing/whitewater-and-paddling/', 'https://www.carogalakemarina.com/'],
  },
  'east-fork-carson-river-nevada': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Raft California',
      url: 'https://reservations.raftcalifornia.com/reserve/tt15-east-fork-carson-river',
      service: 'Reserve a two-day guided raft trip on the East Fork Carson through the canyon between Markleeville and the Carson Valley. Check the operator’s itinerary for meeting and camp details.',
      routes: ['east-fork-carson-hangmans-bridge-washoe-road'],
      sources: ['https://www.blm.gov/programs/national-conservation-lands/nevada/east-fork-carson-river-wsr'],
    }],
  },
  'east-fork-little-miami-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The East Fork State Park rental kiosk serves Harsha Lake. I could not verify a rental or shuttle serving the Williamsburg to Tunnel Mill river trip.',
    sources: ['https://wheneverwatersports.com/bethel', 'https://www.americanwhitewater.org/content/River/view/river-detail/10632/main'],
  },
  'east-fork-white-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pathfinder Outfitters',
      url: 'https://www.pathfinderoutfitters.com/trips-east-fork-white-river/',
      service: 'Pathfinder lists Columbus to Azalia among its East Fork White River trips, with kayak rental and shuttle-only options.',
      routes: ['east-fork-white-river-columbus-azalia'],
    }],
  },
  'east-kill': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater documents the Beaches Corners to Jewett Center reach. The area rental operator reviewed offers paddling on Catskill Creek and the Hudson, with no East Kill service identified.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/1296/main', 'https://www.catskillcharters.com/boat-rentals'],
  },
  'east-nishnabotna-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The county identifies East Nishnabotna access near Red Oak. Rubber Duck Outfitters operates on the West Nishnabotna. I could not confirm paddling services between Red Oak and Essex.',
    sources: ['https://montgomeryccb.org/parks-wildlife-areas/bonds-landing-canoe-access/', 'https://www.wattaway.com/play/rubber_duck_outfitters_seasonal/'],
  },
  'east-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The nearby Almont outfitter’s public rafting itineraries cover the Taylor and Gunnison rivers. I could not verify a paddling service on the lower East River between Crested Butte South and Almont.',
    sources: ['https://3riversresort.com/rafting-details/', 'https://www.americanwhitewater.org/content/River/view/river-detail/11055/main'],
  },
  'east-walker-river-nevada': {
    reviewedOn: '2026-11-24',
    noMatch: 'Nevada State Parks describes paddling and supplies the Pitchfork Ranch water trail map. I could not verify a rental, guided paddle or shuttle serving the trail landings.',
    sources: ['https://parks.nv.gov/parks/walker-river', 'https://parks.nv.gov/uploads/documents/PITCHFORK_water_trail_map.pdf'],
  },
  'eastern-neck-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'East Neck Boat Rental',
      url: 'https://eastneckboatrental.com/',
      service: 'Rent a kayak to explore Eastern Neck Narrows from the outfitter on Eastern Neck Road. Confirm the permitted paddling area when planning a refuge outing.',
      routes: ['eastern-neck-island-water-trail-loop'],
      sources: ['https://friendsofeasternneck.org/the-refuge/'],
    }],
  },
  'eau-claire-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wausau Paddle',
      url: 'https://wausaupaddle.weebly.com/rent.html',
      service: 'Wausau Paddle offers kayak delivery and pickup at Marathon County waterfront locations, including the Weston area. Arrange handoff times and your own passenger transport.',
      routes: ['eau-claire-river-county-j-ross-avenue', 'eau-claire-river-clubhouse-county-j', 'eau-claire-river-ross-avenue-yellow-banks'],
      sources: ['https://westonwi.gov/506/9892'],
    }],
  },
  'eau-claire-river-east-branch': {
    reviewedOn: '2026-11-24',
    noMatch: 'The East Branch reaches near Antigo are in Langlade County. The Wausau rental company’s published waterfront delivery area is Marathon County. I could not confirm service at the East Branch launches.',
    sources: ['https://www.langladeforestryandparks.com/i/f/files/%2315-%20East%20Branch%20Spring%20Road%202024%20Trout%20Project%281%29.pdf', 'https://wausaupaddle.weebly.com/rent.html'],
  },
  'eau-galle-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Corps of Engineers describes boating at the Eau Galle impoundment. I could not confirm a guide or shuttle on the flowing river sections in the catalog.',
    sources: ['https://www.mvp.usace.army.mil/Missions/Recreation/Eau-Galle-Recreation-Area/', 'https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/eaugalle'],
  },
  'edisto-river-south-carolina': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Edisto River Adventures',
      url: 'https://edistoriveradventures.com/',
      service: 'The seasonal tubing trip at Givhans Ferry State Park includes a tube and shuttle. Check the outfitter’s operating dates and meeting instructions for this part of the Edisto.',
      routes: ['edisto-river-mars-oldfield-good-hope', 'edisto-river-mars-oldfield-messervy'],
      sources: ['https://southcarolinaparks.com/givhans-ferry/faqs'],
    }],
  },
  'eleven-point-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Hufstedler’s Canoe Rental',
      url: 'https://www.hufstedlers.com/product-category/float-trips/',
      service: 'Book an Eleven Point float to Riverton from Greer, Turner Mill South or Whitten. The outfitter also lists a spring and early-summer trip from Cane Bluff.',
      routes: ['eleven-point-river-cane-bluff-riverton', 'eleven-point-river-greer-crossing-riverton', 'eleven-point-river-turner-mill-south-riverton', 'eleven-point-river-whitten-riverton'],
      sources: ['https://www.hufstedlers.com/product-category/float-trips/other-trips/'],
    }],
  },
  'elk-neck-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bay Venture Outfitters',
      url: 'https://northeast.bayventureoutfitters.com/offsite-rental-information/',
      service: 'Bay Venture rents kayaks and paddleboards for off-site use in Cecil County. Arrange a delivery location and pickup time with the shop before traveling to Elk Neck.',
      routes: ['northeast-river-north-east-beach-loop', 'elk-river-rogues-harbor-loop'],
      sources: ['https://northeast.bayventureoutfitters.com/elk-neck-state-park/'],
    }],
  },
  'elk-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Elk River Get-A-Way',
      url: 'https://www.elkgetaway.com/',
      service: 'Rent a canoe or kayak, or book the personal-boat shuttle from Queen Shoals up to King Shoals to paddle back to your vehicle.',
      routes: ['wv-elk-king-shoals-queen-shoals'],
    }],
  },
  'elkhorn-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Canoe Kentucky',
      url: 'https://www.canoeky.com/rentals',
      service: 'Canoe Kentucky offers Elkhorn Creek rentals and guided trips. Its creek map identifies Church’s Grove and Elkhorn Acres and distinguishes the company’s private access from the public landings.',
      routes: ['elkhorn-creek-vpa-3-aw-access'],
      sources: ['https://www.canoeky.com/about-us/elkhorn-creek-map'],
    }],
  },
  'elkhorn-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state lists Elkhorn outfitters, including North Fork Outfitting in Norfolk. I could not confirm a rental or shuttle for the Wisner to West Point reach.',
    sources: ['https://outdoornebraska.gov/wp-content/uploads/2024/08/Nebraska-River-Outfitters-Updated-2024.pdf', 'https://visitnebraska.com/norfolk/north-fork-outfitting-llc'],
  },
  'ellicott-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paths, Peaks & Paddles',
      url: 'https://pathspeakspaddles.com/canoe-and-kayak-rental-rates/',
      service: 'Rent a canoe or kayak at the Tonawanda shop and use its dock across the street. The outfitter describes a five-mile Ellicott Creek loop returning to the same dock.',
      routes: ['ellicott-creek-park-eastern-park'],
    }],
  },
  'elm-fork-trinity-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Trinity River Kayak Company',
      url: 'https://trinityriverkayak.com/',
      service: 'Trips meet at the outfitter in Coppell. Paddle from Lake Lewisville Dam or Hebron Parkway to the outfitter, or start there for a trip down to California Crossing. Shuttle-only options are available.',
      routes: ['elm-fork-trinity-river-llela-hebron-parkway', 'elm-fork-trinity-river-hebron-parkway-mcinnish-park', 'elm-fork-trinity-river-mcinnish-california-crossing'],
      sources: ['https://www.llela.org/visit/things-to-do-or-see/kayaking-and-canoeing'],
    }],
  },
  'erie-canal': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Chittenango Landing Canal Boat Museum',
      url: 'https://chittenangolanding.org/kayak-rentals',
      service: 'Rent a kayak at the museum to paddle the Old Erie Canal near Chittenango Landing. Check in at the visitor center.',
      routes: ['old-erie-canal-cedar-bay-chittenango-landing'],
    }, {
      name: 'Little Falls Canal Harbor and Rotary Park',
      url: 'https://eriecanalway.org/explore/Plan-Visit/itineraries/battles-boats-big-views-mohawk-valley-journey',
      service: 'Rent a canoe or kayak at Little Falls Marina and Rotary Park for the round trip to Lock E18.',
      routes: ['erie-canal-little-falls-lock-e18-return'],
    }, {
      name: 'Upstate Kayak Rentals',
      url: 'https://www.upstatekayakrentals.com/self-serve-rentals.html',
      service: 'The Waterford flight-of-locks trip starts at Alcathy’s launch, passes through locks E2–E6 and ends at the operator’s Waterford location. Reserve the trip and follow the operator’s instructions for returning the boat.',
      routes: ['erie-canal-waterford-flight'],
    }, {
      name: 'Erie Canal Boat Company',
      url: 'https://eriecanalboatcompany.com/fairport',
      service: 'The company rents kayaks at the canalfront in Fairport. Start and finish at the rental dock or ask the operator about its available paddling itineraries.',
      routes: ['erie-canal-fairport-bushnells-basin', 'erie-canal-bushnells-basin-macedon'],
      sources: ['https://eriecanalway.org/explore/watertrail/paddling-rentals'],
    }],
  },
  'esopus-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'I Paddle New York',
      url: 'https://ipaddlenewyork.com/',
      service: 'Rent a kayak or paddleboard in Saugerties or join a guided outing exploring the Esopus Bend area.',
      routes: ['esopus-creek-mount-marion-saugerties'],
      sources: ['https://visitulstercountyny.com/plan-your-visit/things-to-do/i-paddle-new-york-2/'],
    }],
  },
  'etowah-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Appalachian Outfitters',
      url: 'https://www.canoegeorgia.com/canoe-kayak/',
      service: 'The Dawson Forest trip follows the Etowah through the wildlife management area. Groups meet at the company’s Kelly Bridge Road outpost.',
      routes: ['etowah-river-highway136-kelly-bridge'],
      sources: ['https://www.canoegeorgia.com/locations', 'https://www.dawsoncountyga.gov/Facilities/Facility/Details/River-Park-10'],
    }],
  },
  'fall-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cornell Outing Club',
      url: 'https://cornelloutingclub.org/activities',
      service: 'Cornell Outing Club lists Fall Creek among its whitewater runs. Members can arrange a club trip and check out whitewater gear under the club’s trip rules.',
      routes: ['fall-creek-route-13-flat-rock'],
      sources: ['https://cornelloutingclub.org/lead-a-trip'],
    }],
  },
  'fall-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Yellow Sally River Shuttle',
      url: 'https://yellowsallyrivershuttle.com/',
      service: 'Yellow Sally offers custom vehicle shuttles on Idaho’s Fall River. Ask whether it can move your vehicle between Cave Falls and the Concrete CCC Bridge for your trip date.',
      routes: ['fall-river-cave-falls-concrete'],
    }],
  },
  'farmington-river-connecticut': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Farmington River Tubing',
      url: 'https://ctvisit.com/listings/farmington-river-tubing',
      service: 'Seasonal tube rentals and return transportation at Satan’s Kingdom in New Hartford, downstream of the Riverton and Pleasant Valley paddling routes.',
      routes: [],
    }],
  },
  'fish-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The outfitter at Westdale publishes trips upstream toward Gifford Lake and trips ending at Westdale. Its itineraries do not establish rental or shuttle service downstream to Camden.',
    sources: ['https://tughilloutfitters.com/guided-paddling-trips/', 'https://fishcreekcabinresort.wordpress.com/calmwater-kayaking-3/'],
  },
  'fishing-bay-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Blackwater Adventures',
      url: 'https://blackwateradventuresmd.com/vacation-rental',
      service: 'Blackwater Adventures delivers rental kayaks and paddleboards to waterways in Dorchester County. Arrange the launch, pickup location and time when reserving.',
      routes: ['fishing-bay-island-creek-out-and-back', 'fishing-bay-transquaking-river-loop'],
      sources: ['https://dnr.maryland.gov/boating/Documents/FB_Watertrails_2.pdf'],
    }],
  },
  'fishing-brook': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cloud-Splitter Outfitters',
      url: 'https://www.cloudsplitteroutfitters.com/',
      service: 'The Newcomb shop rents portable canoes and kayaks for self-guided Adirondack trips. Ask about boat pickup and transport to the Fishing Brook access on Route 28N.',
      routes: ['fishing-brook-pickwickett-county-line-flow'],
      sources: ['https://www.cloudsplitteroutfitters.com/download/watercraft-rental-rates.pdf', 'https://www.experienceouradirondacks.com/node/7821'],
    }],
  },
  'fishkill-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The watershed guide identifies the Fishkill parks. The Beacon outfitter publishes Hudson River tours, with no verified service between Jean Van Pelt Park and Sarah Taylor Park.',
    sources: ['https://www.fishkillwatershed.org/parks', 'https://www.hudsonriverexpeditions.com/beacon-tours.html'],
  },
  'flagstaff-lake': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Maine Huts & Trails',
      url: 'https://mainehuts.org/activity/paddling/',
      service: 'Summer overnight guests at Flagstaff Lake Hut can use the hut’s canoes, kayaks and paddleboards to explore the lake near the hut.',
      routes: [],
    }],
  },
  'flint-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The regional blueway plan and American Whitewater document the Ontario County reach. No operator was verified for the Orleans to Phelps run.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/3405/main', 'https://webgen1files.revize.com/geneseeny/Document%20Center/Program%20Areas/Land%20And%20Water%20Resources/Regional%20Planning%20Projects/bluewaysreport.pdf'],
  },
  'flint-creek-oklahoma': {
    reviewedOn: '2026-11-24',
    noMatch: 'Local float operators advertise Illinois River trips below Chewey. No operator was verified for Flint Creek from US 412 to Chewey.',
    sources: ['https://www.illinoisriveroutfitters.com/', 'https://grda.com/wp-content/uploads/2024/06/Illinois-River-Guide-and-Map-2024_FNL.pdf'],
  },
  'flint-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Flint River Outdoor Center',
      url: 'https://flintriveroutdoor.com/rates/',
      service: 'The center offers a shorter trip from Sprewell Bluff to its Highway 36 landing, with boat rentals and shuttle service. Its published day trip ends before Po Biddy Road.',
      routes: ['flint-river-sprewell-bluff-po-biddy'],
    }],
  },
  'flint-river-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'North Alabama Canoe & Kayak',
      url: 'https://www.alabamascenicrivertrail.com/52-weekends-on-the-water/flint-river-adventure-paddle-huntsvilles-hidden-gem/',
      service: 'NACK rents boats and shuttles personal boats on the middle Flint. Its floats finish at a private take-out on river right just before the Little Cove Road public access.',
      routes: ['flint-river-ryland-little-cove', 'flint-river-talado-little-cove'],
    }],
  },
  'floyds-fork': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Parklands says it no longer offers on-site canoe or kayak rentals. Its paddling FAQ and the state float guide did not identify a replacement provider for these reaches.',
    sources: ['https://theparklands.org/faqs/', 'https://fw.ky.gov/Fish/Pages/Floyds-Fork.aspx'],
  },
  'fox-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'High Roller Fun Rentals',
      url: 'https://www.travelwisconsin.com/outdoors/on-the-water/high-roller-fun-rentals',
      service: 'Rent a boat at Frame Park to paddle the Fox River in downtown Waukesha.',
      routes: ['fox-river-frame-park-greenway-waukesha'],
      sources: ['https://www.downtownwaukesha.com/parks-and-rec/'],
    }],
  },
  'fox-river-illinois': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Yak Shack',
      url: 'https://yakshackonline.com/',
      service: 'Yak Shack rents whitewater boats for the Marge Cline Whitewater Course in Yorkville.',
      routes: ['fox-river-yorkville-whitewater-course'],
      sources: ['https://www.yorkville.il.us/Facilities/Facility/Details/Marge-Cline-Whitewater-Course-37'],
    }],
  },
  'french-broad-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Headwaters Outfitters',
      url: 'https://headwatersoutfitters.com/shuttle-service-for-the-french-broad-river/',
      service: 'Arrange a vehicle shuttle between upper French Broad public accesses. The outfitter lists individual landings and shuttle rates.',
      routes: ['french-broad-blantyre-horse-shoe', 'french-broad-island-ford-hap-simpson', 'french-broad-penrose-blantyre', 'french-broad-river-pisgah-forest-penrose'],
    }],
  },
  'french-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Outdoor Allegheny River Services',
      url: 'https://oarsontheallegheny.com/index.php/french-creek-pricing/',
      service: 'OARS lists rental and shuttle rates for French Creek trips starting at Cochranton. Confirm your take-out with its Franklin office when booking.',
      routes: ['french-creek-cochranton-utica'],
    }],
  },
  'ganargua-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Wayne County documents access at Swift’s Landing. Canalway rental listings did not establish a rental or shuttle operator for the creek to Norsen Bridge.',
    sources: ['https://www.waynecountyny.gov/facilities/facility/details/swiftslanding-23', 'https://eriecanalway.org/explore/watertrail/paddling-rentals'],
  },
  'gasconade-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Hilkemeyer’s General Store',
      url: 'https://visitosagecounty.com/outdoors/',
      service: 'Osage County lists Hilkemeyer’s in Freeburg for Gasconade floats and personal-boat shuttles. Call to arrange the landings for a Rollins Ferry area trip.',
      routes: ['gasconade-river-rollins-ferry-pointers-creek'],
    }],
  },
  'gauley-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'WVU distinguishes Curtin Bridge to Persinger Creek from the commercial Upper Gauley run downstream of Summersville Dam. No outfitter was verified for the upstream reach.',
    sources: ['https://diyoutdoors.wvu.edu/whitewater/gauley-river-curtin-bridge-to-persinger-creek', 'https://diyoutdoors.wvu.edu/whitewater/gauley-river-upper'],
  },
  'genesee-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adventure Calls Outfitters',
      url: 'https://www.exploreletchworth.com/listings/adventure-calls-outfitters',
      service: 'The outfitter guides Genesee River gorge trips from the Lower Falls area to St. Helena in Letchworth State Park, with return transportation.',
      routes: ['genesee-river-lee-landing-st-helena'],
    }, {
      name: 'Genesee Waterways Center',
      url: 'https://www.geneseewaterways.org/paddling',
      service: 'Rent a canoe or kayak from the center’s dock in Rochester’s Genesee Valley Park for a self-guided paddle on the Genesee.',
      routes: ['genesee-river-waterways-center-corn-hill'],
    }],
  },
  'gila-river-arizona': {
    reviewedOn: '2026-11-24',
    noMatch: 'BLM identifies the Gila Box boat launch and permitting for commercial activity. No named outfitter was verified for the Old Safford Bridge to Dry Canyon trip.',
    sources: ['https://www.blm.gov/visit/gila-river-boat-put-in', 'https://www.americanwhitewater.org/content/River/view/river-detail/117/main'],
  },
  'goose-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Manchester Tourism and Kentucky Fish and Wildlife document paddling accesses on Goose Creek in Clay County. No rental, guide or shuttle was verified for these segments.',
    sources: ['https://www.manchesterkytourism.com/attractions/fishing-kayaking', 'https://fw.ky.gov/Fish/Pages/Goose_Creek.aspx'],
  },
  'grand-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Grand River Canoe & Kayak Rentals',
      url: 'https://grandrivercanoe.com/trips-rates/',
      service: 'Book the Harpersfield Dam to Hidden Valley trip. The outfitter publishes this itinerary and boat rental rates.',
      routes: ['grand-river-harpersfield-hidden-valley'],
    }],
  },
  'grass-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Nature Up North',
      url: 'https://www.natureupnorth.org/sponsoring-organization/nature-north',
      service: 'Nature Up North runs scheduled community paddles in the Canton area with boats and gear supplied. See its event calendar for the launch and sign-up details.',
      routes: [],
      sources: ['https://slcha.org/2024/07/pyrites-guided-paddling-tour/', 'https://www.natureupnorth.org/event/community-paddle-river-dynamics'],
    }],
  },
  'great-egg-harbor-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Winding River Campground',
      url: 'https://windingrivercamping.com/canoe_kayak.htm',
      service: 'Winding River arranges canoe and kayak rentals with transportation on the Great Egg Harbor River. Pinelands Adventures lists Lake Lenape in its service area. Confirm the Weymouth Furnace launch and Lake Lenape pickup when reserving.',
      routes: ['great-egg-harbor-river-weymouth-lake-lenape'],
      sources: ['https://www.pinelandsadventures.org/explore-the-pine-barrens/pine-barrens-canoe-kayak/'],
    }],
  },
  'great-miami-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Colerain Township provides ramps but no rental equipment. The Cleves livery’s published trip ends at the Harrison Avenue bridge, with no verified booking for Heritage Park to Dravo Park.',
    sources: ['https://www.colerain.org/m/faq', 'https://tippecanoeandkayakstoo.com/'],
  },
  'green-river-kentucky': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Big Buffalo Crossing Canoe & Kayak',
      url: 'https://bigbuffalocrossingcanoe.com/',
      service: 'Book a Green River float between Lynn Camp, Rio, Johnson Springs at Harry Wilson Park, or Munfordville. The outfitter lists each of these sections separately.',
      routes: ['green-river-lynn-camp-creek-rio-carrydown', 'green-river-rio-carrydown-hh-wilson-park', 'green-river-hh-wilson-stovall'],
      sources: ['https://fw.ky.gov/Education/Pages/Green-River---Hart-County.aspx'],
    }, {
      name: 'Green River Canoeing',
      url: 'https://mammothcavecanoe.com/rates',
      service: 'Rent canoes or kayaks for the Mammoth Cave National Park reaches from Dennison Ferry to Green River Ferry and from Green River Ferry to Houchin Ferry.',
      routes: ['green-river-dennison-green-river-ferry', 'green-river-green-river-ferry-houchins'],
      sources: ['https://www.nps.gov/maca/planyourvisit/canoe-and-kayak-outfitters.htm'],
    }],
  },
  'green-river-lakes-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Great Outdoor Shop',
      url: 'https://www.greatoutdoorshop.com/services/',
      service: 'Pick up a canoe, kayak or paddleboard in Pinedale for a self-guided lake outing. The shop also rents a flat-deck trailer for transporting boats.',
      routes: ['green-river-lakes-lower-lake-out-and-back'],
      sources: ['https://www.visitpinedale.org/things-to-do/boating'],
    }],
  },
  'green-river-utah': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Trout Creek Flies',
      url: 'https://troutcreekflies.com/shuttle-service-3/',
      service: 'Arrange a vehicle shuttle for the Flaming Gorge Dam to Little Hole float or the next reach from Little Hole to Indian Crossing.',
      routes: ['green-river-flaming-gorge-dam-little-hole', 'green-river-little-hole-indian-crossing'],
    }],
  },
  'green-river-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Laughing Bear Shuttles',
      url: 'https://laughingbearshuttles.com/boat-ramp-shuttle-services/',
      service: 'Laughing Bear moves vehicles between lower Green River ramps at Fontenelle Dam, Slate Creek, Dodge Bottom, Hay Farm, Highway 28 and Six-Mile.',
      routes: ['green-river-tailrace-slate-creek', 'green-river-slate-creek-dodge-bottom', 'green-river-dodge-bottom-hay-farm', 'green-river-hay-farm-highway-28', 'green-river-highway-28-six-mile'],
    }],
  },
  'greenbrier-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Greenbrier River Campground',
      url: 'https://www.greenbrierrivercampground.com/river-trips/',
      service: 'Book a rental with drop-off at Fort Spring and pickup at Alderson. The campground also offers a shorter float ending at its riverfront.',
      routes: ['wv-greenbrier-fort-spring-alderson'],
    }],
  },
  'greens-bayou': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kayaking Texas',
      url: 'https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/greens-bayou/',
      service: 'Texas Parks and Wildlife lists Kayaking Texas for this trail. The outfitter has delivered boats at the start and collected them at the finish for the annual regatta. Ask directly about rentals on other dates.',
      routes: ['greens-bayou-brock-adventure-thomas-bell-foster'],
      sources: ['https://www.greensbayou.org/_files/ugd/b0fff3_7fdc0d89dce843caa7ad635066659aab.pdf'],
    }],
  },
  'guadalupe-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bergheim Campground & River Outfitter',
      url: 'https://bergheimcampground.com/',
      service: 'Rent a canoe or kayak for the FM 3351 to Guadalupe River State Park float. The outfitter also shuttles personal boats and asks paddlers to confirm state park pickups on busy weekends.',
      routes: ['guadalupe-river-fm3351-state-park'],
    }],
  },
  'gunnison-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Black Canyon Anglers',
      url: 'https://blackcanyonanglers.com/rafting/',
      service: 'Join a guided whitewater rafting trip through the Gunnison Gorge. Paddlers help maneuver the raft through the rapids.',
      routes: ['gunnison-river-chukar-gunnison-forks'],
      sources: ['https://www.blm.gov/sites/default/files/docs/2023-12/BLM%20UFO%20Authorized%20Outfitters%202023.pdf'],
    }, {
      name: 'Gunnison River Shuttles',
      url: 'https://gunnisonrivershuttles.com/',
      service: 'Book a vehicle shuttle from Almont to the Shady Island boat ramp, also called North Bridge.',
      routes: ['gunnison-river-almont-north-bridge'],
    }],
  },
  'gunpowder-falls-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Monkton Bike',
      url: 'https://www.monktonbike.com/',
      service: 'For a shorter float ending at Monkton Bridge, rent a tube in Monkton and walk upstream on the NCR Trail to one of the shop’s suggested entry points.',
      routes: ['gunpowder-falls-masemore-monkton'],
    }],
  },
  'guyandotte-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mountaintop Adventures',
      url: 'https://www.gilbertwv.com/kayaking',
      service: 'Gilbert lists Mountaintop Adventures for seasonal kayak rentals on the Guyandotte. Call about availability and arrange the launch near Gilbert.',
      routes: [],
    }],
  },
  'hammocks-beach': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paddle NC',
      url: 'https://paddlenc.com/rentals/',
      service: 'Reserve a kayak or paddleboard from the concession at Hammocks Beach State Park for a self-guided paddle from the mainland launch.',
      routes: ['hammocks-beach-huggins-island-loop'],
      sources: ['https://www.ncparks.gov/state-parks/hammocks-beach-state-park'],
    }],
  },
  'hardware-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Virginia river plan identifies the Hardware access and outfitters serving the nearby James River. No rental or shuttle was verified for Route 6 to the WMA bridge on the Hardware itself.',
    sources: ['https://www.dcr.virginia.gov/recreational-planning/document/MiddleJamesPlan.pdf', 'https://www.howsyourriver.com/access_sites/take-out-va-62'],
  },
  'hatchet-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Coosa River Adventures',
      url: 'https://www.alabamascenicrivertrail.com/52-weekends-on-the-water/hatchet-creek-paddle-camp/',
      service: 'The Alabama Scenic River Trail recommends Coosa River Adventures’ take-away boat rentals for this creek. Pick up in Wetumpka and transport the boat to your chosen landing with your own vehicle and straps.',
      routes: ['hatchet-creek-highway-280-kings-bridge', 'hatchet-creek-highway-231-kings-bridge', 'hatchet-creek-highway-280-highway-231'],
      sources: ['https://www.coosariveradventures.com/sched.html'],
    }],
  },
  'haw-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Haw River Canoe & Kayak',
      url: 'https://hawrivercanoe.com/three-outposts-three-ways-to-experience-the-haw-river/',
      service: 'Choose a self-guided trip from Swepsonville River Park to Saxapahaw Lake or from Saxapahaw Mill Race to Union Bridge. The outfitter supplies the boat and shuttle.',
      routes: ['haw-river-swepsonville-saxapahaw-lake', 'haw-river-saxapahaw-union-bridge'],
      sources: ['https://hawrivercanoe.com/swepsonville-river-park-to-saxapahaw-lake/', 'https://hawrivercanoe.com/saxapahaw-mill-race-to-union-bridge-self-guided-trip/'],
    }],
  },
  'hay-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Wisconsin DNR documents public paddling on Dunn County’s Hay River. The nearby Menomonie campground is on the Red Cedar, and no provider was verified for County FF to Highway 25.',
    sources: ['https://dnr.wisconsin.gov/topic/Lands/WildlifeAreas/hayriver', 'https://www.masirvingtoncampground.com/', 'https://www.wisconsinrivertrips.com/segments/hay-river-dunn-county'],
  },
  'henrys-fork-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Yellow Sally River Shuttle',
      url: 'https://yellowsallyrivershuttle.com/',
      service: 'Yellow Sally moves vehicles for Henrys Fork float trips and takes custom shuttle requests. Arrange the exact launch and take-out when booking.',
      routes: [],
      sources: ['https://trouthunt.com/fishing/shuttle-services/'],
    }],
  },
  'henrys-lake-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wild Rose Ranch',
      url: 'https://www.wildroseranch.com/copy-of-cabin-rooms-units-1',
      service: 'The ranch rents canoes and paddleboards on Henrys Lake from its own waterfront. Its launch is separate from the BLM South Shore access.',
      routes: ['henrys-lake-south-shore-loop'],
      sources: ['https://www.blm.gov/visit/henrys-lake-boat-access'],
    }],
  },
  'hickory-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Illinois documents the Pilcher Park waterway. Will County’s self-service kayak rentals are at Lake Chaminwood, and no provider was verified for the Hickory Creek run to South Joliet Street.',
    sources: ['https://dnr.illinois.gov/inpc/area.area3willpilcherpark.html', 'https://www.rent.fun/kayak-rental/joliet-il'],
  },
  'honeoye-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'New York documents the Fishell Road launch in Rush. Local services list Honeoye Lake delivery or on-site Rochester rentals, with no verified coverage for this creek launch.',
    sources: ['https://extapps.dec.ny.gov/docs/fish_marine_pdf/nyboatlaunching.pdf', 'https://canadicelakeoutfitters.com/', 'https://www.baycreek.com/rentals'],
  },
  'honey-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Walworth County trip report describes a bicycle shuttle. The local paddle club provides rentals for its scheduled outings, but a trip on this stretch was not verified.',
    sources: ['https://www.wisconsinrivertrips.com/segments/honey-creek-walworth-county/carver-school-road', 'https://bigfootrecreation.org/Pages/SocialPaddleClub.html'],
  },
  'hoosic-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Ashton-to-Lauren’s Launch community float required participants to bring boats. The Cheshire outfitter advertises shuttles to Cheshire Reservoir, with no verified outfitting for the cataloged Hoosic reaches.',
    sources: ['https://www.hoosicriverrevival.org/events/hoosic-river-float', 'https://www.berkshireoutfitters.com/rentals.html', 'https://hoorwa.org/recreation/paddling-the-hoosic/'],
  },
  'horicon-marsh-paddle-trail': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Blue Heron Landing',
      url: 'https://www.horiconmarsh.com/',
      service: 'Blue Heron Landing rents canoes and kayaks in Horicon for exploring the marsh. Ask about pickup or transport if you plan to start at Green Head Road.',
      routes: ['horicon-marsh-greenhead-nebraska'],
      sources: ['https://horiconmarsh.org/visit/maps-points-of-interest/'],
    }],
  },
  'housatonic-river-connecticut': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Housatonic River Guides',
      url: 'https://www.housatonicriverguides.com/drift-trips',
      service: 'The Cornwall guide service offers Housatonic fly-fishing trips by drift boat. The guide rows and selects the stretch for the day’s conditions.',
      routes: [],
    }],
  },
  'housatonic-river-massachusetts': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mass Audubon',
      url: 'https://www.massaudubon.org/places-to-explore/wildlife-sanctuaries/pleasant-valley/programs-activities/canoeing-paddling',
      service: 'Join a naturalist-led canoe outing in the Housatonic Valley Wildlife Management Area in Lenox. Check the program listing for the meeting point or arrange a private group trip.',
      routes: ['housatonic-river-decker-woods-pond'],
      sources: ['https://www.mass.gov/info-details/george-l-darey-housatonic-valley-wma'],
    }],
  },
  'hudson-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adventure Sports Rafting',
      url: 'https://www.adventuresportsrafting.com/',
      service: 'The guided Hudson Gorge raft trip starts on the Indian River, joins the Hudson at the confluence and continues to North River.',
      routes: ['hudson-river-indian-confluence-north-river'],
      sources: ['https://www.indian-lake.com/what-do/whitewater-rafting'],
    }],
  },
  'huron-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ann Arbor Canoe Liveries',
      url: 'https://www.a2gov.org/parks-and-recreation/activities/canoe-kayak-and-tube/',
      service: 'The city operates the Argo to Gallup river trip. Check the livery’s seasonal schedule for where to pick up the boat and catch the return shuttle.',
      routes: ['huron-river-argo-gallup'],
    }],
  },
  'ichetucknee-river-florida': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ichetucknee Springs State Park concession',
      url: 'https://ichetuckneesprings.com/ichetucknee-springs/plan-your-day/kayaking/',
      service: 'Rent a boat for the full North Launch to Last Takeout trip or an upstream out-and-back from Dampier’s Landing. For the shorter downstream float from Dampier’s to Last Takeout, the concession rents tubes.',
      routes: ['ichetucknee-river-north-launch-south-takeout', 'ichetucknee-river-north-launch-dampiers', 'ichetucknee-river-dampiers-south-takeout'],
      sources: ['https://ichetuckneesprings.com/ichetucknee-springs/plan-your-day/tubing/'],
    }],
  },
  'illinois-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Float 59',
      url: 'https://illinoisrivercampground.com/',
      service: 'Float 59 rents boats with a shuttle from Siloam Springs Kayak Park to its private take-out below WOKA. A shorter option ends at the Arkansas 59 bridge.',
      routes: ['upper-illinois-river-siloam-kayak-park-woka'],
      sources: ['https://www.irwp.org/recreation-on-the-illinois-river'],
    }],
  },
  'independence-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'NYSDEC and American Whitewater document the Independence River reach. Tug Hill Outfitters lists other regional trips, with no verified rental, guide or shuttle for Bailey Road to Donnattsburg Road.',
    sources: ['https://dec.ny.gov/places/independence-river-wild-forest', 'https://www.americanwhitewater.org/content/River/view/river-detail/10866/main', 'https://tughilloutfitters.com/guided-paddling-trips/'],
  },
  'indian-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adventure Sports Rafting',
      url: 'https://www.adventuresportsrafting.com/',
      service: 'The outfitter’s guided gorge trip starts below the dam on the Indian River and continues past the Hudson confluence to North River. The full trip extends beyond Outer Gooley.',
      routes: ['indian-river-abanakee-dam-outer-gooley'],
      sources: ['https://www.indian-lake.com/what-do/whitewater-rafting'],
    }],
  },
  'iowa-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'University of Iowa Outdoor Rental Center',
      url: 'https://recserv.uiowa.edu/outdoor-rental-center',
      service: 'Community members can pick up canoes and kayaks in Iowa City for self-guided trips. The rental center also lists a canoe trailer. Arrange transport to the river separately.',
      routes: ['iowa-river-tailwater-east-sturgis-ferry', 'iowa-river-sturgis-ferry-hills-access', 'iowa-river-hills-river-junction'],
    }],
  },
  'iron-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paddlers and Pedalers',
      url: 'https://www.iron.org/outdoors/kayak/',
      service: 'The Iron County chamber lists Paddlers and Pedalers for canoe and kayak rentals in the Iron River area. Confirm boat pickup and transport to Mattioli Park when reserving.',
      routes: ['iron-river-mattioli-brady'],
    }],
  },
  'irondequoit-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'BayCreek Paddling Center',
      url: 'https://www.baycreek.com/ellison-park-shuttle',
      service: 'Meet at BayCreek for a shuttle to Ellison Park, then paddle the creek through its wetlands back to the outfitter’s dock near LaSalle’s Landing.',
      routes: ['irondequoit-creek-ellison-lasalles'],
      sources: ['https://www.monroecounty.gov/irobay-recreation'],
    }],
  },
  'iroquois-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Jasper County documents public launches and canoe distances. No outfitter was verified for Laird’s Landing to the Newton County Fairgrounds.',
    sources: ['https://www.jaspercountyswcd.org/uiwi-our-efforts-mobile', 'https://www.jaspercountyswcd.org/copy-of-conservation-resources', 'https://www.in.gov/dnr/state-parks/recreation/water-trails/canoekayak-rentals'],
  },
  'jacks-fork-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Harvey’s Alley Spring',
      url: 'https://harveysalleyspring.com/our-float-trips/',
      service: 'Harvey’s rents boats for Bay Creek to Alley Spring, Bay Creek to Eminence and Alley Spring to Eminence. The upper trips depend on river depth. Confirm the outfitter’s meeting point and take-out.',
      routes: ['jacks-fork-river-bay-creek-alley-spring', 'jacks-fork-river-bay-creek-chilton', 'jacks-fork-river-alley-spring-chilton'],
      sources: ['https://www.nps.gov/thingstodo/paddle-jacks-fork-river.htm'],
    }],
  },
  'jackson-lake-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Colter Bay Village Marina',
      url: 'https://www.gtlc.com/activities/kayak-canoe-motorboat-rentals',
      service: 'Rent a canoe or kayak at Colter Bay Marina to explore Jackson Lake. Rentals are first come, first served and depend on water levels and marina operations.',
      routes: ['jackson-lake-colter-bay-hermitage-out-and-back'],
    }],
  },
  'jackson-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Alleghany Outdoors',
      url: 'https://alleghanyoutdoors.com/paddle-trips/indian-draft-to-intervale/',
      service: 'Rent a boat or book a private-boat shuttle at Indian Draft. The outfitter’s published take-out is Intervale Park, so confirm transport separately if you plan to finish at Interstate Park.',
      routes: ['jackson-river-indian-draft-interstate'],
    }],
  },
  'james-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Finley & James River Co.',
      url: 'https://finleyandjames.com/',
      service: 'The outfitter at Hooten Town runs floats on the James River. Ask about the Shelvin Rock launch and its take-out when booking.',
      routes: ['james-river-shelvin-rock-hooten-town'],
      sources: ['https://www.jamesriverbasin.com/explore', 'https://www.floatmissouri.com/plan/missouri-rivers/james-river/'],
    }, {
      name: 'Lake Springfield Boathouse',
      url: 'https://www.parkboard.org/841/Kayak-and-Canoe-Rentals',
      service: 'Rent a kayak or canoe at the Lake Springfield end of the James River Water Trail. Start at the boathouse for an out-and-back rental.',
      routes: ['james-river-joe-crighton-lake-springfield'],
      sources: ['https://ozarkgreenways.org/explore/greenway-trails/james-river-water-trail/'],
    }],
  },
  'james-river-virginia': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Maury River Smallmouth',
      url: 'https://upperjamesriverwatertrail.com/plan-a-trip/outfitters/',
      service: 'The Upper James River Water Trail lists Maury River Smallmouth for kayak rentals and paddler shuttles between Iron Gate and Snowden. Arrange your two landings when booking.',
      routes: ['james-river-iron-gate-glen-wilton', 'james-river-buchanan-arcadia'],
    }, {
      name: 'Riverside Outfitters',
      url: 'https://www.riversideoutfitters.com/whitewater-rafting/upper-river-rafting-trip/',
      service: 'Join a guided raft trip on Richmond’s upper James from Pony Pasture to Reedy Creek.',
      routes: ['james-river-pony-pasture-reedy-creek'],
      sources: ['https://www.riversideoutfitters.com/whitewater-rafting/'],
    }],
  },
  'janes-island-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Janes Island State Park',
      url: 'https://dnr.maryland.gov/publiclands/pages/eastern/janesisland.aspx',
      service: 'Rent a canoe or kayak at the park marina, where all seven marked water trails begin and end. Check rental hours and discuss your planned loop with park staff.',
      routes: ['janes-island-black-trail-loop', 'janes-island-blue-trail-loop', 'janes-island-brown-trail-loop', 'janes-island-green-trail-loop', 'janes-island-red-trail-loop', 'janes-island-short-trail-loop', 'janes-island-yellow-trail-loop'],
    }],
  },
  'jarbidge-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Barker River Expeditions',
      url: 'https://www.barkerriver.com/book-trip',
      service: 'Barker offers guided multiday Jarbidge and combined Jarbidge–Bruneau expeditions. Ask about launches and take-outs for the available departure.',
      routes: ['jarbidge-river-murphy-bruneau'],
      sources: ['https://www.blm.gov/visit/jarbidge-river-launch-site'],
    }],
  },
  'jenny-lake-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Jenny Lake Boating',
      url: 'https://jennylakeboating.com/boat-trips/rental-boats/',
      service: 'Pick up a rental canoe or kayak at Jenny Lake’s East Boat Dock, beside the visitor center. The outfitter uses a different launch from the public Lupine Meadows ramp.',
      routes: ['jenny-lake-lupine-launch-inspiration-out-and-back'],
      sources: ['https://jennylakeboating.com/day-of-information/'],
    }],
  },
  'jessup-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Discover Kayak Rentals',
      url: 'https://www.discoverkayakrentals.com/',
      service: 'Pick up a kayak in North River for a self-guided trip. The outfitter also delivers to local waterways by arrangement. Confirm delivery to the Route 30 launch before planning around it.',
      routes: ['jessup-river-route-30-indian-lake'],
    }],
  },
  'jordan-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Jordan Valley Outfitters',
      url: 'https://www.jvoutfitters.com/canoeing-and-kayaking',
      service: 'The Michigan outfitter offers canoe and kayak trips starting at Graves Crossing, plus a shorter option from Old State Road to Rogers Road.',
      routes: ['jordan-river-graves-crossing-rogers-bridge'],
    }],
  },
  'jump-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Flambeau Adventures',
      url: 'https://ruskcountywi.com/flambeau-adventures/',
      service: 'Wisconsin River Trips lists this Ladysmith-area canoe and kayak rental shop for the Jump River. Call to arrange a boat and confirm transport between Wayside Park and Sheldon.',
      routes: ['jump-river-wayside-park-sheldon'],
      sources: ['https://www.wisconsinrivertrips.com/liveries.html', 'https://ruskcountywi.com/jump-river-hwy-73-to-sheldon/'],
    }],
  },
  'juniata-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Appalachian Kayak',
      url: 'https://appalachiankayak.com/juniata-river/',
      service: 'The mobile outfitter rents kayaks and runs shuttles on the lower Juniata. Its published trips include Mifflintown to Walker and Muskrat Springs to Greenwood. Check the access pair when reserving.',
      routes: ['juniata-river-mifflintown-muskrat-springs'],
      sources: ['https://www.visitcentralpa.org/things-to-do/outdoor-recreation/water-activities/'],
    }],
  },
  'kalamazoo-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'WaterTrail Ventures',
      url: 'https://www.watertrailventures.com/',
      service: 'Rent a kayak at New Richmond for the lower Kalamazoo trip to Hacklander Landing. The outfitter publishes shuttle directions for this stretch.',
      routes: ['kalamazoo-river-new-richmond-hacklander'],
      sources: ['https://kalamazooriver.org/explore/water-trail/kalamazoo-river/'],
    }],
  },
  'kansas-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Friends of the Kaw',
      url: 'https://kansasriver.org/programs/fok-educational-paddle-trips/',
      service: 'Join a scheduled educational paddle or arrange a guided Kansas River outing for a group. Check the event listing for the launch, take-out and registration.',
      routes: [],
      sources: ['https://kansasriver.org/paddle-and-fish/paddle-faq/'],
    }, {
      name: 'Great Blue Heron Outdoors',
      url: 'https://www.greatblueheronoutdoors.com/heron-adventures/canoe-and-kayak-rentals',
      service: 'The Lawrence shop rents canoes and kayaks and has organized Eudora to De Soto paddles. Check current dates or arrange a rental and your own return ride.',
      routes: ['kansas-river-eudora-de-soto'],
      sources: ['https://www.greatblueheronoutdoors.com/event-details-registration/weekly-canoe-trip-eudora-to-desoto'],
    }],
  },
  'kayaderosseras-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kayak Shak',
      url: 'https://www.kayakshak.com/faqs/',
      service: 'The Saratoga Springs shop allows off-site kayak rentals by arrangement. Pick up the boat and arrange your own transport to Gray’s Crossing and from Driscoll Road.',
      routes: ['kayaderosseras-creek-grays-crossing-driscoll-road'],
      sources: ['https://kayadeross.org/activities/paddling/'],
    }],
  },
  'kelly-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The local river guide and American Whitewater describe the road shuttle to Kelly Forks. No commercial boat shuttle or outfitted paddling trip was verified on Kelly Creek from Moose Creek.',
    sources: ['https://www.northidahorivers.com/Kelly_Creek.htm', 'https://www.americanwhitewater.org/content/River/view/river-detail/563/main', 'https://www.fs.usda.gov/media/61266'],
  },
  'kennebec-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Seaspray Kayaking',
      url: 'https://www.seaspraykayaking.com/rent/',
      service: 'Pick up a sea kayak in Brunswick or arrange delivery in Midcoast Maine. Confirm the two landing locations and shuttle availability for a tidal Kennebec trip.',
      routes: ['kennebec-river-bath-phippsburg', 'kennebec-river-richmond-bath'],
    }, {
      name: 'Watson Canoe and Kayak Rental',
      url: 'https://swanislandmaine.org/plan-your-visit',
      service: 'Rent a canoe or kayak in Richmond to explore the Kennebec around Swan Island. Ask about boat return arrangements before planning a longer river trip.',
      routes: ['kennebec-river-richmond-bath'],
      sources: ['https://www.maine.gov/ifw/programs-resources/recreational-opportunities/swan-island/getting-here-fees.html'],
    }],
  },
  'kent-island-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bay Venture Outfitters',
      url: 'https://northeast.bayventureoutfitters.com/offsite-rental-information/',
      service: 'Bay Venture delivers rental kayaks and paddleboards in Queen Anne’s County. Reserve in advance and agree on the Kent Island delivery and collection points.',
      routes: ['kent-island-cabin-creek-trail-loop', 'kent-island-kent-narrows-goodhands-creek-trail', 'kent-island-kent-narrows-jackson-creek-trail', 'kent-island-eastern-bay-trail', 'kent-island-thompson-warehouse-creek-trail'],
    }],
  },
  'kettle-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Hard Water Sports',
      url: 'https://hardwatersports.com/kettle-river-shuttle-service/',
      service: 'The Sandstone outfitter shuttles boats and paddlers on the Kettle River, including overnight parties. Reserve ahead and confirm the numbered landings for your trip.',
      routes: [],
    }],
  },
  'keuka-outlet': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Shoreline Rentals',
      url: 'https://shorelinerentalsny.com/',
      service: 'Rent a kayak at the Penn Yan end of the outlet for a local paddle. The downstream whitewater reach to Dresden includes falls and portages. Confirm the permitted rental area with the shop.',
      routes: ['keuka-outlet-penn-yan-dresden'],
      sources: ['https://shorelinerentalsny.com/contact/', 'https://www.americanwhitewater.org/content/River/view/river-detail/1332/main'],
    }],
  },
  'kickapoo-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Titanic Canoe Rental',
      url: 'https://titaniccanoerental.com/content/trip-information',
      service: 'The Ontario livery lists upper Kickapoo rental trips by take-out, including the Rockton area and Landing 20 at La Farge. Check which landings are available for your trip date.',
      routes: ['kickapoo-river-ontario-rockton'],
      sources: ['https://kvr.state.wi.us/Documents/Maps/RecreationMaps/2026%20WEB%20Upper%20Kickapoo%20River%20Guide%202026.pdf'],
    }],
  },
  'kinderhook-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Columbia County lists the Valatie shop for kayak sales and service. No rental operator or river shuttle was verified for the East Nassau to Valatie reach.',
    sources: ['https://columbiacountytourism.org/business/steiners-sports/', 'https://www.americanwhitewater.org/content/River/view/river-detail/10620/main', 'https://hudsontaconic.org/htl-preserves/kinderhook-creek-preserve/'],
  },
  'kings-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kings River Outfitters',
      url: 'https://kingsriveroutfitters.com/trip-pricing',
      service: 'The outfitter lists canoe and kayak rentals for the Rockhouse to Trigger Gap float on Arkansas’s Kings River.',
      routes: ['kings-river-rockhouse-trigger-gap'],
    }],
  },
  'kinnickinnic-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kinni Creek Lodge and Outfitters',
      url: 'https://kinnicreek.com/kinni-kayak-trips-rentals/',
      service: 'Meet at Glen Park in River Falls for the Lower Kinni kayak trip. The outfitter also arranges shuttles for private boats.',
      routes: ['kinnickinnic-river-glen-park-state-park'],
      sources: ['https://kinnicreek.com/private-boat-shuttle/'],
    }],
  },
  'kinniconick-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Next Outdoor Adventure',
      url: 'https://nextoutdooradventure.com/lodging',
      service: 'Lodging guests in Lewis County have access to Kinniconick Creek and can arrange a kayak rental through the property.',
      routes: [],
    }],
  },
  'kishwaukee-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paddle On Outfitters',
      url: 'https://www.paddleonoutfitters.com/trips',
      service: 'Paddle On has offered kayak trips from Hickory Bill’s through Distillery Road to Baumann Park. Check the current launch and pickup points before booking.',
      routes: ['kishwaukee-river-hickory-bills-distillery'],
      sources: ['https://www.tickettailor.com/events/paddleonoutfitters/1266781'],
    }],
  },
  'knife-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater documents a whitewater run from County Road 102 to Lake Superior. The marina and beach listings at the mouth did not verify outfitting or shuttles for this river descent.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/2514/main', 'https://www.krhcc.org/visit-knife-river'],
  },
  'kunjamuk-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'CampStore lists kayak rentals near Moffitt Beach for Sacandaga Lake. No rental transport or guided outing was verified for the separate Kunjamuk trip from the Speculator Ball Field launch.',
    sources: ['https://www.lpcampstore.com/kayak-sup-rentals', 'https://www.speculatorchamber.com/shop/campstore', 'https://dec.ny.gov/places/perkins-clearing-and-speculator-tree-farm-conservation-easement-tracts'],
  },
  'la-chute-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Brookwood RV Resort',
      url: 'https://www.brookwoodrvresort.com/canoe-and-kayak-rentals/',
      service: 'Pick up a rental canoe or kayak in Ticonderoga and transport it to the Bicentennial Park launch. Brookwood requires two people to load and return the boat.',
      routes: ['la-chute-river-bicentennial-fort-ticonderoga'],
      sources: ['https://www.lakechamplainregion.com/boating/la-chute-river-boat-launch'],
    }],
  },
  'la-crosse-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ellistone Canoe Rental',
      url: 'https://ellistonecanoerental.com/schedule_canoe_trip.html',
      service: 'Ellistone offers canoe and kayak trips from Fisherman’s Park in Sparta to Amundson Park, Rockland or Bangor. Confirm the take-out before planning a Hammer Road finish.',
      routes: ['la-crosse-river-fishermans-hammer'],
    }],
  },
  'lake-champlain': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adirondack River Rentals',
      url: 'https://www.adirondackriverrentals.com/',
      service: 'The Peru, New York, shop offers kayaks with car-top transport equipment for use elsewhere in the Adirondack region. Pick up the boat and arrange your own lakeshore transport.',
      routes: ['great-chazy-river-point-au-roche', 'lake-champlain-rouses-point-great-chazy'],
      sources: ['https://passageport.org/journey/lake-champlain-blueway-trail-valcour-crab-islands/guides-charters-and-rentals/'],
    }],
  },
  'lake-george': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Lake George Regional Park',
      url: 'https://lakegeorgepark.org/product/kayak-sup-rentals/',
      service: 'The regional park rents kayaks and stand-up paddleboards on Lake George near Skowhegan, Maine.',
      routes: ['lake-george-skowhegan-access-loop'],
      sources: ['https://skowhegan.org/Facilities/Facility/Details/Lake-George-Regional-Park-East-Side-43'],
    }],
  },
  'lake-onawa': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wild Ones Rental',
      url: 'https://www.wildonesrentals.com/non-motorized-watercraft/',
      service: 'Pick up a rental canoe or kayak in the Greenville area with a suitable vehicle and transport it to the public launch on Lake Onawa.',
      routes: ['lake-onawa-difw-access-loop'],
      sources: ['https://www.onawalake.com/contact.html'],
    }],
  },
  'lamoille-river-vermont': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Vermont Canoe & Kayak',
      url: 'https://vtcanoeandkayak.com/rentals-unguided-tours/',
      service: 'The Jeffersonville outfitter offers self-guided Lamoille River trips with an upriver shuttle. Choose from its published distances and return to the outfitter’s landing.',
      routes: [],
      sources: ['https://www.lamoilleriverpaddlerstrail.org/services-along-the-river/'],
    }],
  },
  'laurel-hill-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The park concession publishes boat rentals for Laurel Hill Lake. The state’s creek trail continues to Kings Covered Bridge, but no outfitter was verified for that downstream trip.',
    sources: ['https://www.hazelbakerscanoes.com/laurelhill.php', 'https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/laurel-hill-state-park/boating'],
  },
  'leaf-river-mississippi': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pinebelt Blueways',
      url: 'https://www.pinebeltblueways.com/copy-of-wildlife-vegetation',
      service: 'Arrange a guided Leaf River paddle near Hattiesburg for a group of at least five. The program requests advance notice and confirms the route and available boats when booking.',
      routes: [],
      sources: ['https://www.sevenriverscanoe.com/leaf-river'],
    }],
  },
  'lehigh-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Whitewater Challengers',
      url: 'https://whitewaterchallengers.com/locations/lehigh-river-poconos-pa/',
      service: 'Book a guided raft trip in Lehigh Gorge. The outfitter offers different sections according to river levels and the release schedule. Confirm the departure and take-out for your date.',
      routes: [],
      sources: ['https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-parks/find-a-park/lehigh-gorge-state-park/whitewater-boating'],
    }],
  },
  'lemon-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Kayak Staten Island publishes supervised programs at Page Avenue and Front Street. No rental or guided paddle was verified at Lemon Creek’s Bayview Avenue launch.',
    sources: ['https://www.kayakstatenisland.org/', 'https://dec.ny.gov/places/lemon-creek'],
  },
  'lemonweir-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Country Cruisin’ Canoes & Kayaks',
      url: 'https://www.travelwisconsin.com/outdoors/on-the-water/country-cruisin-canoes-kayaks',
      service: 'The livery on 19th Avenue near Mauston offers Lemonweir River canoe rentals by appointment. Arrange the launch and take-out before leaving a vehicle.',
      routes: ['lemonweir-river-mauston-dam-19th-ave'],
    }],
  },
  'levisa-fork': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Hatfield and McCoy River Trails',
      url: 'https://tourpikecounty.com/things-to-see-do/outdoor_adventure/hatfield-and-mccoy-river-trails/',
      service: 'Book a Pikeville kayak trip or a shuttle for your own boat. Meet the operator at the Thompson Road ramp and confirm the upstream launch for your trip.',
      routes: ['levisa-fork-cedar-creek-thompson-road', 'levisa-fork-island-creek-thompson-road', 'levisa-fork-jubilee-thompson-road'],
      sources: ['https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx'],
    }],
  },
  'lewes-rehoboth-canal-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Quest Kayak',
      url: 'https://www.questkayak.com/rentals',
      service: 'Quest offers kayak rentals with local delivery and pickup in the Lewes area. Confirm the two landings for a one-way canal trip. Its guided Delaware Bay outing also includes part of the canal.',
      routes: ['lewes-rehoboth-canal-lewes-grove-park'],
      sources: ['https://www.questkayak.com/tours'],
    }],
  },
  'lightning-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Sandpoint shop advertises recreational kayaks. No qualified whitewater outfitter or shuttle was verified for the East Fork to Clark Fork descent on Lightning Creek.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/10495/main', 'https://www.northidahorivers.com/Lightning_Creek.htm', 'https://www.outdoorexperience.us/gear-rentals'],
  },
  'little-beaver-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Beaver Creek Kayak Company',
      url: 'https://beavercreekkayak.wordpress.com/',
      service: 'The company lists group outings from Beaver Creek State Park and from Gretchen’s Lock near Sprucevale to Lock 57. Contact the operator to confirm current availability.',
      routes: ['little-beaver-creek-pioneer-village-lock-57-park', 'little-beaver-creek-sprucevale-lock-57-park'],
      sources: ['https://ohiodnr.gov/go-and-do/plan-a-visit/find-a-property/beaver-creek-state-park'],
    }],
  },
  'little-coal-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Coal River Group',
      url: 'https://coalrivergroup.com/kayak-rentals/',
      service: 'Pick up a kayak through the Coal River Group’s Grab n Go program. It offers shuttles on select routes. Ask which Little Coal landings it can serve when reserving.',
      routes: ['wv-little-coal-waterways-corridor-g', 'wv-little-coal-donald-kuhn-waterways', 'wv-little-coal-madison-donald-kuhn'],
      sources: ['https://coalrivergroup.com/coal-river-water-trail/little-coal-river/'],
    }],
  },
  'little-fork-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Littlefork Community Education and Recreation',
      url: 'https://littleforkmn.gov/campground',
      service: 'Reserve a canoe, kayak or trailer through the Lofgren Memorial Park campground host or Littlefork City Hall. The park has a launch on the Little Fork River.',
      routes: ['little-fork-river-lofgren-kuttes', 'little-fork-river-fiedler-lofgren-park', 'little-fork-river-devereaux-lofgren-park'],
      sources: ['https://www.littleforkmn.gov/documents/515/City_of_Littlefork_Campground_Policy__2_.pdf'],
    }],
  },
  'little-miami-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Dogs Paddlesports',
      url: 'https://www.riverdogspaddlesports.com/',
      service: 'River Dogs offers outfitted canoe and kayak trips from its South Lebanon base at Rogers Park. Check its trip itinerary for the shuttle launch and finish.',
      routes: [],
      sources: ['https://southlebanonohio.org/download/2025_council_meeting_agenda_packets/03.06.25-Council-Meeting-Packet.pdf'],
    }],
  },
  'little-missouri-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Medora’s shuttle operator lists a canoeist vehicle drop at CCC Campground for a much longer trip. No service was verified for the short Rough Rider State Park to Medora Bridge reach.',
    sources: ['https://www.dakotacyclingadventures.com/shuttles', 'https://www.parkrec.nd.gov/rough-rider-state-park', 'https://www.nps.gov/thro/planyourvisit/canoeing-kayaking.htm'],
  },
  'little-pee-dee-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state park lists boat rentals and public river access. Neither its rental information nor the state river guide confirmed that boats are supplied for Carmichael’s Bridge to Huggins Bridge.',
    sources: ['https://southcarolinaparks.com/little-pee-dee/things-to-do', 'https://southcarolinaparks.com/little-pee-dee/faqs', 'https://www.dnr.sc.gov/assets/maps/LittlePeeDeeTrailGuide.pdf'],
  },
  'little-pipe-creek-maryland': {
    reviewedOn: '2026-11-24',
    noMatch: 'Union Bridge and American Whitewater document the water trail to Detour. No rental, guide or shuttle was verified for the Little Pipe Creek put-in or take-out.',
    sources: ['https://www.townofub.org/parks', 'https://www.americanwhitewater.org/content/River/view/river-detail/11774/main', 'https://dnr.maryland.gov/outdoorrec/Pages/Lets-Go-Paddling.aspx'],
  },
  'little-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Raquette River Outfitters',
      url: 'https://www.raquetteriveroutfitters.com/',
      service: 'Pick up a rental canoe or kayak in Tupper Lake. The shop also arranges boat deliveries and vehicle moves. Ask about the Youngs Road and Streeter Lake Road accesses before reserving a shuttle.',
      routes: ['little-river-youngs-streeter-lake-road'],
      sources: ['https://www.tupperlake.com/paddling/little-river-from-youngs-road', 'https://dec.ny.gov/places/aldrich-pond-wild-forest'],
    }],
  },
  'little-river-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bay Venture Outfitters',
      url: 'https://northeast.bayventureoutfitters.com/offsite-rental-information/',
      service: 'Bay Venture delivers rental kayaks and paddleboards in Kent County, Delaware. Arrange delivery to the Little Creek area and confirm both access points when booking.',
      routes: ['little-river-delaware-wildlife-town'],
      sources: ['https://littlecreek.delaware.gov/points-of-interest/'],
    }],
  },
  'little-salmon-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Commercial guides and transport services found for the Salmon River do not list the steep Little Salmon descent from Smoky Boulder Road to Hazard Creek.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/565/main', 'https://idahosalmonriver.org/find-outfitter/', 'https://rigginsidaho.com/directory/wpbdp_category/outfitters/'],
  },
  'little-sioux-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cherokee County Conservation',
      url: 'https://www.mycountyparks.com/County/Cherokee/Park/Cherokee-County-Conservation-Offices/Facility/Canoe-Kayak-Rental',
      service: 'Groups can reserve a county trailer with multiple canoes or kayaks for the Little Sioux. A tow vehicle and a group reservation are needed. Ask about the Linn Grove and Peterson accesses when booking.',
      routes: ['little-sioux-river-linn-grove-peterson'],
    }],
  },
  'little-sugar-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sugar River Rental & Repair',
      url: 'https://www.sugarriverrental.com/',
      service: 'Pick up a canoe or kayak between Brodhead and Albany. The shop allows pickup customers to transport their boats elsewhere, including for a self-arranged Little Sugar float.',
      routes: ['little-sugar-river-tin-can-american-legion'],
    }],
  },
  'little-turkey-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Turkey River Rentals',
      url: 'https://www.turkeyriverrentals.com/rentals-rates',
      service: 'Turkey River Rentals takes phone or text requests for custom rentals and shuttles on the regional water trail. Confirm Gouldsburg Park and Eldorado before booking.',
      routes: ['little-turkey-river-gouldsburg-eldorado'],
      sources: ['https://turkeyriver.org/map/', 'https://www.turkeyriverrentals.com/'],
    }],
  },
  'lizard-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Webster County Conservation',
      url: 'https://www.webstercountyia.gov/departments/conservation/index.php',
      service: 'The county publishes canoe and kayak checkout options in Fort Dodge for paddlers with proof of basic paddling instruction. Ask which boats are available for the chosen reach and arrange your own shuttle.',
      routes: ['lizard-creek-cunningham-rasch', 'lizard-creek-lentsch-cunningham'],
      sources: ['https://portal.mycountyparks.com/Handler.ashx?Item_ID=9FC32AE9-0D05-46CC-B009-76CB9A652ADD', 'https://www.traveliowa.com/trails/lizard-creek-water-trail/85/'],
    }],
  },
  'llano-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Llano River Region Adventures',
      url: 'https://headforthehillcountry.com/pricing-info/',
      service: 'The Mason-area outfitter offers kayak and canoe rentals, guided paddles and shuttles on the Llano River. It describes the water downstream of James Crossing. Arrange the take-out when reserving.',
      routes: ['llano-river-james-river-martin-simonsville'],
      sources: ['https://headforthehillcountry.com/'],
    }],
  },
  'lochsa-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'ROW Adventures',
      url: 'https://www.rowadventures.com/lochsa-rafting',
      service: 'The two-day raft trip typically launches at White Pine and ends at Knife Edge. ROW also runs shorter trips on the lower Lochsa. Launches and take-outs vary with water levels.',
      routes: ['upper-lochsa-white-pine-wilderness-gateway', 'lower-lochsa-wilderness-gateway-split-creek'],
      sources: ['https://www.rowadventures.com/be-prepared/lochsa-river-rafting', 'https://www.rowadventures.com/be-prepared/lochsa-rafting'],
    }],
  },
  'locust-fork-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Beach Outfitters',
      url: 'https://www.friendsofthelocustforkriver.org/lfriver_access_resources.html',
      service: 'Friends of the Locust Fork lists River Beach Outfitters for kayak and canoe rentals and shuttle service in Blount County. Contact the outfitter to select a stretch and confirm access.',
      routes: [],
    }],
  },
  'lolo-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Forest Service lists commercial whitewater guides for other Clearwater basin rivers. Neither its list nor the Lolo Creek route guide confirmed an outfitter for the Cottonwood Flats to Greer corridor.',
    sources: ['https://www.fs.usda.gov/media/61266', 'https://www.americanwhitewater.org/content/River/view/river-detail/572/main'],
  },
  'long-prairie-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Hangloose MN',
      url: 'https://www.hangloosemn.com/paddle',
      service: 'Rent a kayak or paddleboard at Lake Carlos Marina for the Long Prairie River. The outfitter lists a river pickup option and allows renters to take equipment to other launches.',
      routes: ['long-prairie-river-lake-carlos-highway-29'],
      sources: ['https://www.lakecarlosmarinamn.com/activityrentals'],
    }],
  },
  'looking-glass-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'DeWitt Township documents its river launch. Lansing boat rentals checked serve the Grand River or Lake Lansing, with no verified outfitted trip between DeWitt’s Riverfront and Riverside parks.',
    sources: ['https://www.dewitttownship.gov/Facilities/Facility/Details/Looking-Glass-Riverfront-Park-2', 'https://booking.rivertownadventures.com/', 'https://recsports.msu.edu/sailing-center/paddle-sports'],
  },
  'loup-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state lists outfitters for the North Loup, and the Columbus campground describes a Platte River float. No operator was verified for the Loup main stem between George Syas, Monroe and Columbus.',
    sources: ['https://outdoornebraska.gov/parks/explore-trails/water-trails/', 'https://outdoornebraska.gov/wp-content/uploads/2024/08/Nebraska-River-Outfitters-Updated-2024.pdf', 'https://riverlandcampground.com/info/'],
  },
  'lower-colorado-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Glenwood Canyon Rafting',
      url: 'https://raftingglenwoodsprings.com/rafting/half-day-mild-adventure/',
      service: 'The guided scenic half-day raft trip starts at Grizzly Creek below the Shoshone Rapids and follows the Colorado River through Glenwood Canyon.',
      routes: ['grizzly-creek-two-rivers'],
    }],
  },
  'lower-mountain-fork-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wild Goose Canoe & Kayak Rental',
      url: 'https://brokenbowareachamber.com/business/wild-goose-canoe-kayak-rental/',
      service: 'Wild Goose rents boats for the lower Mountain Fork below the re-regulation dam. Its longer float continues past the US 70 bridge, so choose the take-out when booking.',
      routes: ['lower-mountain-fork-reregulation-dam-us70'],
    }],
  },
  'lower-salmon-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Salmon River Drifters',
      url: 'https://www.salmonriverdrifters.com/shuttles',
      service: 'Vehicle shuttles for Carey Creek, Island Bar, Shorts Bar, Lucile and Hammer Creek, plus the multiday run from Hammer Creek to Heller Bar.',
      routes: ['salmon-river-carey-creek-riggins', 'lower-salmon-island-bar-shorts-bar', 'lower-salmon-shorts-bar-lucile', 'lower-salmon-lucile-hammer-creek', 'lower-salmon-hammer-heller-bar'],
    }],
  },
  'loyalhanna-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Two Dam Kayak Rentals',
      url: 'https://www.twodamkayakrentals.com/loyalhanna-creek-trip-s',
      service: 'Two Dam runs Loyalhanna Creek paddles ending at Bush Recreation Area on the lake above the dam. Its creek trip has a separate take-out from the tailwater run into Saltsburg.',
      routes: [],
      sources: ['https://events.dcnr.pa.gov/event/loyalhanna-sojourn'],
    }],
  },
  'lumber-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Lumber River Outfitter',
      url: 'https://www.canoelumberriver.com/shuttle.html',
      service: 'The Fair Bluff outfitter accepts shuttle requests for self-guided Lumber River trips. Include Boardman and Princess Ann in the request and confirm the pickup before launching.',
      routes: ['lumber-river-boardman-princess-ann'],
      sources: ['https://www.ncparks.gov/state-parks/lumber-river-state-park'],
    }],
  },
  'lusk-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Shawnee Guided Tours and Shuttles',
      url: 'https://www.enjoyillinois.com/explore/listing/shawnee-guided-tours-and-shuttles/',
      service: 'This Eddyville provider offers transport for paddlers in Shawnee National Forest. Ask whether the Saltpeter access road and your take-out can be served on your trip date.',
      routes: ['lusk-creek-saltpeter-eddyville'],
      sources: ['https://www.recreation.gov/camping/poi/10080890'],
    }],
  },
  'lynches-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'RiverRat’s Canoe and Kayak Rentals',
      url: 'https://www.riverratsc.com/tours',
      service: 'RiverRat’s offers kayak rentals and guided paddles on the Lynches River from its Indigo Landing Road base. Confirm the pickup location for a Wicklow finish.',
      routes: ['lynches-river-indigo-wicklow'],
      sources: ['https://visitflo.com/play/p/riverrats-canoe-and-kayak-rentals-64eced2f45b1985c7a71ae40/'],
    }],
  },
  'machias-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sunrise Canoe and Kayak',
      url: 'https://visitstcroixvalley.com/directory#:~:text=Sunrise%20Canoe',
      service: 'This Machias-based outfitter supplies canoes, shuttles and guided multiday trips on the Machias River. Its usual take-outs include Whitneyville. Confirm the access pair for a longer trip.',
      routes: ['machias-river-t31md-machias'],
      sources: ['https://www.sunrisecanoeandkayak.com/maine-canoe-trips/machias-river-outfitting.htm'],
    }],
  },
  'main-salmon-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'OARS',
      url: 'https://www.oars.com/adventures/main-salmon-river-rafting-on-the-river-of-no-return/',
      service: 'Join a guided Main Salmon expedition from Corn Creek to Carey Creek. OARS lists an alternate take-out at Spring Bar in high water.',
      routes: ['main-salmon-corn-creek-vinegar-carey'],
      sources: ['https://www.oars.com/before-you-go/main-salmon-river-rafting-on-the-river-of-no-return/'],
    }],
  },
  'manasquan-river-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'Monmouth County offers rentals and nature tours at Manasquan Reservoir. No outfitter was verified for the separate river reach between Hospital Road and Brice Park.',
    sources: ['https://www.monmouthcountyparks.com/page.aspx?id=4003', 'https://www.monmouthcountyparks.com/page.aspx?Id=4392', 'https://www.nj.gov/dep/fgw/mansqnaccess.htm'],
  },
  'manitowoc-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Simply Paddle',
      url: 'https://www.simplypaddle.net/home/rent',
      service: 'Pick up a self-service kayak at River Point in downtown Manitowoc for a lower-river paddle near Lake Michigan. The kiosk is downstream of the rural Clarks Mills and County S reaches.',
      routes: [],
      sources: ['https://www.visitmanitowoc.com/listing/simply-paddle/408/'],
    }],
  },
  'maquoketa-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Monticello River Rentals',
      url: 'https://monticelloriverrentals.com/',
      service: 'Rent a canoe or kayak just below Mon-Maq Dam in Monticello for the trip to Pictured Rocks Park. The company provides trip-specific parking and shuttle directions.',
      routes: ['maquoketa-river-mon-maq-pictured-rocks'],
      sources: ['https://www.traveljonescounty.com/outdoor-adventures/'],
    }],
  },
  'marble-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater documents the Camp 3 descent and road shuttle. Commercial float listings for the St. Joe did not establish guide or shuttle service on its Marble Creek tributary.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/575/main', 'https://files.dfm.idaho.gov/dfm-admin-website/rules/current/24/243501.pdf'],
  },
  'marion-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'St. Regis Canoe Outfitters',
      url: 'https://www.canoeoutfitters.com/rentals-services/canoekayak-transportation',
      service: 'The outfitter lists Blue Mountain Lake and Raquette Lake on its paddler transportation schedule. Reserve transport and specify both ends of your Marion River trip.',
      routes: ['marion-river-blue-mountain-raquette-lake'],
      sources: ['https://dec.ny.gov/places/sargent-ponds-wild-forest'],
    }],
  },
  'marshyhope-creek-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    noMatch: 'Caroline County lists public launches at Federalsburg, but its advertised rentals are at other waterways, including Martinak State Park in Denton. No outfitter was verified for the Federalsburg town trail.',
    sources: ['https://visitcaroline.org/listings/marinas-boat-ramps/', 'https://visitcaroline.org/listings/mathews-landing-rentals/', 'https://dnr.maryland.gov/boating/pages/eastern_north.aspx'],
  },
  'mattituck-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Eagle’s Neck Paddling',
      url: 'https://eaglesneckpaddling.com/rentals-1-1',
      service: 'Eagle’s Neck delivers multiday boat rentals to homes from Mattituck to Orient with advance notice. Arrange transport from your lodging to the creek access.',
      routes: ['mattituck-creek-dec-waterway-access-route-48'],
      sources: ['https://www.mattituckparks.gov/love-lane-boathouse-mattituck'],
    }],
  },
  'maumee-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Visit Fort Wayne documents the route below Hosey Dam. Fort Wayne Outfitters publishes rentals from its downtown base, but transport to the Niagara Drive launch or pickup at Kreager Park could not be verified.',
    sources: ['https://www.visitfortwayne.com/things-to-do/parks-and-outdoors/kayaking-canoeing/', 'https://www.fwoutfitters.com/articles/kayak-canoe-rentals-pg202.htm'],
  },
  'maurice-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'CU Maurice River',
      url: 'https://cumauriceriver.org/programs-offered/',
      service: 'CU Maurice River leads bring-your-own-boat paddles at different locations in the watershed. Check its current program for the meeting point and registration.',
      routes: [],
    }],
  },
  'maury-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Maury River Smallmouth',
      url: 'https://upperjamesriverwatertrail.com/plan-a-trip/outfitters/',
      service: 'Maury River Smallmouth offers paddler shuttles, kayak rentals and guided kayak fishing on the Maury. Arrange the Glen Maury Park launch and Locher Landing take-out directly.',
      routes: ['maury-river-glen-maury-locher'],
      sources: ['https://dwr.virginia.gov/waterbody/maury-river/'],
    }],
  },
  'mayo-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Dan River Basin Association',
      url: 'https://www.danriver.org/events',
      service: 'The association organizes group paddles on the Mayo, including outings from Anglin Mill. Participants bring their own boats. Check the calendar for the next Mayo trip.',
      routes: [],
      sources: ['https://www.danriver.org/events/day/date/2026-6-6'],
    }],
  },
  'mecan-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mecan River Outfitters & Lodge',
      url: 'https://www.travelmarquettecounty.com/things_to_do_categories/kayak-canoe/#:~:text=Mecan%20River%20Outfitters',
      service: 'The Princeton outfitter rents canoes and kayaks and offers boat shuttles and vehicle moves on the Mecan. Go over the map and agree on the two landings when booking.',
      routes: ['mecan-river-highway-22-germania'],
      sources: ['https://www.wisconsinrivertrips.com/segments/mecan-river/hwy-22', 'https://mecanriveroutfitters.com/summer.html'],
    }],
  },
  'medina-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Medina River Company',
      url: 'https://www.themedinarivercompany.com/',
      service: 'The Bandera outfitter offers kayak and tube rentals with shuttle service. Confirm the day’s available stretch and meeting point before booking.',
      routes: [],
      sources: ['https://www.banderacowboycapital.com/business/medina-river-company'],
    }],
  },
  'menominee-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wildman Adventure Resort',
      url: 'https://wildmanranch.com/outdoor-adventures-in-wisconsin/whitewater-rafting/white-water-rafting-menominee-river/',
      service: 'Guided rafts run Piers Gorge twice, with a walk back upstream between runs. Check the operator’s age and portage requirements when booking.',
      routes: ['menominee-river-piers-gorge'],
      sources: ['https://www.michigan.gov/recsearch/parks/menominee'],
    }],
  },
  'meramec-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Meramec State Park Concessions',
      url: 'https://www.meramecpark.com/river-float-trips/canoes-kayaks-and-rafts/',
      service: 'Meet at the park’s River Stop Store for the bus to Sappington Bridge, then paddle five miles back to the park by canoe, kayak or raft.',
      routes: ['meramec-river-sappington-bridge-meramec-state-park'],
    }],
  },
  'merrimack-river-new-hampshire': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Outdoor New England',
      url: 'https://outdoornewengland.com/pages/tours',
      service: 'Guided and self-guided trips launch in Franklin on the Winnipesaukee and continue onto the upper Merrimack below the confluence. Ask where the trip ends before arranging transportation.',
      routes: [],
    }],
  },
  'miami-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Lewey Lake Campground',
      url: 'https://newyorkstateparks.reserveamerica.com/camping/lewey-lake/r/campgroundDetails.do?contractCode=NY&parkId=657',
      service: 'The state campground rents canoes and kayaks at Lewey Lake, the launch for this out-and-back. Ask about rental hours and using a boat up the Miami River.',
      routes: ['miami-river-lewey-lake-out-and-back'],
      sources: ['https://dec.ny.gov/places/lewey-lake-campground-and-day-use-area'],
    }],
  },
  'middle-branch-ontonagon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sylvania Outfitters',
      url: 'https://www.snowriver.com/things-to-do/sylvania-wilderness-outfitters',
      service: 'This Watersmeet canoe and kayak outfitter is listed for the Middle Branch run to Forest Road 5250. Confirm rental availability and shuttle arrangements for those landings.',
      routes: ['ontonagon-middle-branch-watersmeet-forest-road-5250'],
      sources: ['https://milespaddled.com/ontonagon-river-middle-branch/', 'https://www.michigandnr.com/publications/pdfs/ifr/ifrlibra/special/Reports/sr46/SR46_text.pdf'],
    }],
  },
  'middle-branch-st-regis-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The outfitter’s published transport stops cover Adirondack lake and river accesses. Service between Fort Jackson and Buckton could not be verified.',
    sources: ['https://www.canoeoutfitters.com/rentals-services/canoekayak-transportation', 'https://dec.ny.gov/places/buckton-state-forest'],
  },
  'middle-fork-payette-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The tourism guide covers the easier float at Crouch. No paddling operator was verified for the upper Boiling Springs or Hardscrabble runs.',
    sources: ['https://www.visitsouthwestidaho.org/wp-content/uploads/2025/04/SWITA_TravelGuide_WhereToFloat.pdf', 'https://www.americanwhitewater.org/content/River/view/river-detail/588/main'],
  },
  'middle-fork-salmon-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Middle Fork Adventures',
      url: 'https://www.middleforkadventures.com/the-middle-fork-of-the-salmon',
      service: 'Six-day guided rafting trips finish at Cache Bar. The operator starts at Boundary Creek or Indian Creek depending on water levels.',
      routes: ['middle-fork-salmon-boundary-cache-bar'],
    }],
  },
  'middle-fork-vermilion-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kickapoo Adventures',
      url: 'https://kickapooadventures.com/paddling-trips/',
      service: 'The full-day trip runs from Kinney’s Ford to Kickapoo State Park. The concession also rents canoes and kayaks for shorter sections and changes trips when water is low.',
      routes: ['middle-fork-vermilion-kinneys-ford-kickapoo'],
    }],
  },
  'middle-raccoon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Whiterock Conservancy',
      url: 'https://www.whiterockconservancy.org/equipment-rentals',
      service: 'Reserve a canoe or kayak with shuttle service for the conservancy’s float near Coon Rapids, upstream of Panora. Trips depart from its River Campground when water levels allow.',
      routes: [],
    }],
  },
  'middle-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Middle River Rentals',
      url: 'https://www.middleriverrentals.com/',
      service: 'The local chamber lists canoe and kayak rentals with drop-off and pickup on the Middle River near Winterset. Contact the operator about dates and which covered-bridge accesses it can serve.',
      routes: [],
      sources: ['https://www.madisoncounty.com/front-page/spend-your-summer-in-madison-county/'],
    }],
  },
  'mill-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The water trail lists Huron River liveries and identifies Mill Creek Rapids separately as a park-and-play feature. A whitewater rental or instruction service for the feature could not be verified.',
    sources: ['https://huronriverwatertrail.org/trip-planner/trip-wash/', 'https://www.americanwhitewater.org/content/River/view/river-detail/6820/main'],
  },
  'miller-creek-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Coastal Kayak',
      url: 'https://coastalkayak.com/kayak-and-stand-up-paddle-rentals/',
      service: 'The Fenwick outfitter offers multiday off-site kayak rentals and describes the Miller Creek estuary and Sassafras Landing in its launch guide. Arrange boat transport separately for this route.',
      routes: ['miller-creek-strawberry-sassafras'],
      sources: ['https://coastalkayak.com/where-to-launch-at-the-beach/'],
    }],
  },
  'millers-river-massachusetts': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Billy Goat Boats',
      url: 'https://www.billygoatboats.com/boats',
      service: 'Rent a canoe or kayak at Riverfront Park in Orange. The shop is at the downstream end of the Cass Meadow trip. Ask about moving a boat to Athol before planning a one-way paddle.',
      routes: ['millers-river-cass-meadow-orange-riverfront'],
      sources: ['https://www.townoforange.org/233/Leisure-Activity'],
    }],
  },
  'millstone-river-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state identifies the Lincoln Avenue river launch. The Griggstown rental base serves the canal farther upstream, and service at the Manville launch could not be verified.',
    sources: ['https://www.nj.gov/dep/fgw/artmillstone.htm', 'https://www.griggstowncanoe.com/'],
  },
  'milwaukee-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Forward Outdoor',
      url: 'https://forwardoutdoor.com/resources/',
      service: 'Book a scheduled kayak rental and shuttle for a Milwaukee River section. Newburg to Fredonia and Thiensville to Badger Meter each run as individual trips. The Grafton and Mequon stretches are also offered in shorter sections on different dates.',
      routes: ['milwaukee-river-newburg-fredonia', 'milwaukee-river-thiensville-badger-meter', 'milwaukee-river-waubedonia-veterans', 'milwaukee-river-lime-kiln-village-park'],
    }],
  },
  'minnesota-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bent River Outfitter',
      url: 'https://mankatolife.com/welcome-on-the-river-bent-river-outfitter/',
      service: 'The Mankato outfitter rents kayaks by the day with a paddle and life jacket. Ask which Minnesota River accesses it can serve and whether you need to move the boat yourself.',
      routes: [],
      sources: ['https://greatermankato.com/stay-enjoy/outdoor-adventures/water-activities/', 'https://exploreorigin.com/en/listings/873387-24hr-solo-kayak'],
    }],
  },
  'mispillion-river-delaware': {
    reviewedOn: '2026-11-24',
    noMatch: 'Milford identifies public kayak docks. The documented eco-tour includes a riverwalk, and no canoe or kayak service could be verified for the tidal trip to Cedar Creek.',
    sources: ['https://www.cityofmilford.com/546/Parks-Pavilions', 'https://delawarenaturesociety.org/news-updates/press-releases/milford-eco-tour-highlights-mispillion-river/'],
  },
  'missisquoi-river-vermont': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Enosburg River Craft Project',
      url: 'https://www.umatrvt.org/enosburg-kayak-canoe-rental',
      service: 'This community program loans canoes and kayaks at the Brownway River Trail in Enosburgh, downstream of the Lowell and Westfield routes. Check eligibility and key pickup before visiting.',
      routes: [],
    }],
  },
  'mississippi-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Twin Cities Kayaking',
      url: 'https://www.twincitieskayaking.com/book-a-trip/friday-fieldtrips',
      service: 'The Twin Cities operator lists Hidden Falls to Harriet Island among its occasional field trips. Check the schedule for the date, meeting place and kayak availability.',
      routes: ['mississippi-river-hidden-falls-harriet-island'],
    }, {
      name: 'Clear Waters Outfitting',
      url: 'https://www.cwoutfitting.com/',
      service: 'The Clearwater, Minnesota, shop rents canoes and kayaks and runs Mississippi River shuttles. Its eight-mile downstream reach ends at Snuffies Landing. Confirm the trip and boat pickup when reserving.',
      routes: ['mississippi-river-clearwater-snuffies'],
      sources: ['https://www.cwoutfitting.com/fishing-tournament-rules.htm', 'https://www.cwoutfitting.com/shop/River-Trips/Recreational-Trips.htm'],
    }],
  },
  'mohawk-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Upstate Kayak Rentals',
      url: 'https://upstatekayakrentals.com/index.html',
      service: 'Rent kayaks at Mohawk Harbor Marina in Schenectady. Check the operator’s launch and return instructions for a paddle from the marina.',
      routes: [],
      sources: ['https://eriecanalway.org/explore/watertrail/paddling-rentals'],
    }],
  },
  'mongaup-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kayak and Canoe Club of New York',
      url: 'https://kccny.org/locations/mongaup-river/',
      service: 'The club organizes paddles and occasional whitewater training on the dam-release run down to Route 97. Check its calendar, registration and equipment requirements before joining.',
      routes: ['mongaup-river-rio-powerhouse-delaware'],
      sources: ['https://kccny.org/events/swr_l4_september2026/'],
    }],
  },
  'monie-bay-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    noMatch: 'The reserve and county identify self-guided water trails from Dames Quarter. A rental delivery, guided paddle or shuttle for the mapped loops could not be verified.',
    sources: ['https://dnr.maryland.gov/waters/cbnerr/pages/moniebay.aspx', 'https://visitsomerset.com/listing/dames-quarter-boat-ramp'],
  },
  'monocacy-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'South Mountain Adventures',
      url: 'https://southmountainadventures.com/kayak-trips/monocacy-river/',
      service: 'Book a single-kayak trip with a choice of drop points along the Monocacy. The published list includes Rocky Ridge, Creagerstown and Devilbiss Bridge. Confirm the distance and pickup point when reserving.',
      routes: ['monocacy-river-rocky-ridge-devilbiss'],
    }],
  },
  'moose-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mountainman Outdoor Supply Company',
      url: 'https://mountainmanoutdoors.com/pages/rentals-trips-rentals-trips-copy-3',
      service: 'The Old Forge outfitter runs a flatwater rental trip with a shuttle to North Street Bridge and a return paddle to its Moose River outpost.',
      routes: [],
    }],
  },
  'moosehead-lake': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Moosehead Area Rentals',
      url: 'https://www.mooseheadarearentals.com/canoe-kayak-rentals/',
      service: 'Canoes and kayaks can be delivered to vacation properties around Greenville, Beaver Cove and Rockwood for a fee. Agree on lake access, boat collection and trip length before reserving.',
      routes: ['moosehead-lake-greenville-beaver-cove', 'moosehead-lake-rockwood-greenville'],
    }],
  },
  'mores-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater documents the Big Gulch run and the Corps describes access at the reservoir downstream. No paddling outfitter was verified for the creek run.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/578/main', 'https://www.nww.usace.army.mil/Locations/District-Locks-and-Dams/Lucky-Peak-Dam-and-Lake/Robie-Creek-Park/'],
  },
  'moyie-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'ROW describes guided spring rafting on the Moyie but explicitly marks the trip unavailable for the 2026 season. A current booking or another confirmed operator for the catalog reaches could not be verified.',
    sources: ['https://rowadventurecenter.com/moyie-river-whitewater-rafting', 'https://rowadventurecenter.com/1-day-rafting'],
  },
  'mukwonago-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Eagle Springs Pub',
      url: 'https://mukwonagoriver.org/summer-mukwonago-river-paddles/#:~:text=Eagle%20Spring%20Pub',
      service: 'The local river group lists this canoe rental near Eagle Spring Lake for paddlers arranging their own trips. Call about taking a boat to Rainbow Springs and returning it after the paddle.',
      routes: ['mukwonago-river-rainbow-springs-beulah-road'],
      sources: ['https://members.tlw.org/directory/Details/eagle-springs-pub-2849429'],
    }],
  },
  'mulberry-fork-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Birmingham Canoe Club',
      url: 'https://bccofficial205.wixsite.com/bhmcanoeclub',
      service: 'This Alabama paddling club schedules outings and lists the Mulberry Fork among its local rivers. Check its trip calendar for the reach, experience level and membership arrangements.',
      routes: [],
    }],
  },
  'mulberry-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Turner Bend',
      url: 'https://www.turnerbend.com/Single-Kayak-Rental/',
      service: 'Rent a kayak at Turner Bend and arrange the shuttle upstream to Redding for the paddle back to the outfitter’s landing. Confirm the launch when booking.',
      routes: ['mulberry-river-redding-turner-bend'],
      sources: ['https://www.turnerbend.com/SingleKayakRental.html'],
    }],
  },
  'mullet-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Plymouth’s visitors guide documents the public kayak launch in town. Rental, guide or shuttle service for the Sumac Road to River Park trip could not be verified.',
    sources: ['https://www.plymouthwisconsin.com/assets/PDFs/2025_PlymouthWI_VisitorsGuide-websize.pdf', 'https://dnr.wisconsin.gov/topic/parks/rentals'],
  },
  'mullica-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pinelands Adventures',
      url: 'https://www.pinelandsadventures.org/adventure/mullica-river-5-hour-trip/',
      service: 'The outfitter’s eight-mile Mullica trip starts at Lock’s Bridge and finishes at the Pleasant Mills take-out. It supplies boats and transports paddlers from its Shamong base. Ask separately about starting at Batsto Village.',
      routes: ['mullica-river-batsto-pleasant-mills'],
    }],
  },
  'murderkill-river-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bowers Bayside Bait and Kayak Rentals',
      url: 'https://visitcentraldelaware.com/directory/bowers-bayside-bait-and-kayak-rentals/',
      service: 'The local visitor bureau lists kayak rentals in Bowers Beach at the mouth of the Murderkill. Contact the shop about the launch, rental hours and tidal conditions.',
      routes: ['murderkill-river-bowers-beach-loop'],
      sources: ['https://bowersbeach.delaware.gov/visitor-information/'],
    }],
  },
  'musconetcong-river-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state documents the Waterloo–Saxton Falls water trail. The watershed association’s Saxton Lake paddles were dated events, and a current outfitter for this reach could not be verified.',
    sources: ['https://dep.nj.gov/parksandforests/state-park/allamuchy-mountain-state-park/', 'https://www.musconetcong.org/event-details/great-waters-paddle-saxton-lake-rescheduled'],
  },
  'muskegon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'J & J’s River Run',
      url: 'https://www.jjriverrun.com/tripstimesrates.html',
      service: 'The Evart livery offers a canoe or kayak trip from Crawford Park to its US-10 landing. Confirm the private landing and meeting time when reserving.',
      routes: ['muskegon-river-crawford-park-evart'],
    }, {
      name: 'Croton Dam Float Trips',
      url: 'https://www.crotondamfloattrips.com/',
      service: 'The Croton livery offers river rentals and a return shuttle. Its six-mile option ends at Thornapple. Check which watercraft are offered for that distance.',
      routes: ['muskegon-river-croton-dam-thornapple'],
    }],
  },
  'namekagon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Log Cabin Resort',
      url: 'https://www.logcabin-resort.com/tube-canoe-kayak',
      service: 'This Trego resort rents canoes and kayaks and arranges shuttles. The park service lists its coverage through Riverside Landing. Ask about pickup for the lower Namekagon reaches.',
      routes: ['namekagon-river-fritz-riverside', 'namekagon-river-county-k-whispering-pines'],
      sources: ['https://www.nps.gov/sacn/planyourvisit/namekagon-outfitters.htm'],
    }, {
      name: 'Camp Namekagon',
      url: 'https://campnamekagon.com/',
      service: 'The National Park Service lists canoe and kayak rentals and shuttle service between Namekagon Dam and Trego. Call the Springbrook base to choose landings within that stretch.',
      routes: ['namekagon-river-namekagon-dam-hwy-63', 'namekagon-river-hayward-stinnett', 'namekagon-river-springbrook-big-bend', 'namekagon-river-big-bend-trego'],
      sources: ['https://www.nps.gov/sacn/planyourvisit/namekagon-outfitters.htm'],
    }],
  },
  'nanticoke-river-delaware': {
    reviewedOn: '2026-11-24',
    noMatch: 'The water trail documents the Seaford and Woodland launches. The nearby Laurel paddling service is on Broad Creek. Mainstem outfitting or a ferry-reach shuttle could not be verified.',
    sources: ['https://paddlethenanticoke.com/?page_id=1724', 'https://sussexoutdoors.org/nanticoke-river-paddling/'],
  },
  'nanticoke-river-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Blackwater Adventures',
      url: 'https://blackwateradventuresmd.com/vacation-rental',
      service: 'The trail directory lists this outfitter for the Maryland area. It delivers rental kayaks in Dorchester County and parts of Wicomico County. Confirm your delivery address and arrange transport to the launch.',
      routes: ['nanticoke-river-vienna-chicone-loop', 'nanticoke-river-vienna-cherry-beach'],
      sources: ['https://paddlethenanticoke.com/?page_id=388'],
    }],
  },
  'nassawango-creek-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pocomoke River Canoe Company',
      url: 'https://www.pocomokeriverpaddle.com/self-guided-trips',
      service: 'The Snow Hill livery shuttles paddlers to Red House Road. Its rental trip follows Nassawango Creek into the Pocomoke and finishes back at the shop. Ask about pickup before choosing an earlier take-out.',
      routes: ['nassawango-creek-red-house-pocomoke', 'nassawango-creek-red-house-nassawango-road'],
      sources: ['https://visitmarylandscoast.org/stories/post/on-the-water-experiences-along-the-pocomoke-river'],
    }],
  },
  'neuse-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paddle Creek',
      url: 'https://paddlecreeknc.com/trips/',
      service: 'The Raleigh outfitter’s short trip runs from Falls Dam to its private Capital Boulevard landing. Its longer trip starts at Capital Boulevard and ends at Buffaloe Road. Check which rental trip overlaps your planned paddle.',
      routes: ['neuse-river-falls-dam-thornton', 'neuse-river-river-bend-buffaloe'],
    }],
  },
  'neversink-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The paddling club’s gorge trip ends at Oakland Valley, where the catalog route begins. No rental, guide or shuttle was verified for the downstream run to US 209.',
    sources: ['https://kccny.org/locations/neversink-river-gorge/', 'https://www.americanwhitewater.org/content/River/view/river-detail/1357/main'],
  },
  'new-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Zaloo’s Canoes',
      url: 'https://zaloos.com/our-trips/kayak-rentals/',
      service: 'The North Carolina livery runs kayak trips to Wagoner Access and arranges overnight trips past Wagoner and US 221. Confirm the launch and reserve campsites separately for an overnight.',
      routes: ['new-river-nc88-wagoner', 'new-river-wagoner-us221'],
    }, {
      name: 'Hills to Hills Shuttle & Tours',
      url: 'https://www.hillstohills.com/services/',
      service: 'In West Virginia, this shuttle picks paddlers up at Fayette Station for the ride to Cunard. It also arranges other river shuttles between Sandstone and Fayette Station.',
      routes: ['wv-new-cunard-fayette-station', 'wv-new-mccreery-stone-cliff', 'wv-new-thurmond-cunard', 'wv-new-glade-creek-grandview-sandbar'],
    }, {
      name: 'Foster Falls Boat and Bike Livery',
      url: 'https://www.dcr.virginia.gov/state-parks/new-river-trail',
      service: 'Virginia’s New River Trail State Park offers seasonal canoe and kayak rentals for the Austinville to Foster Falls trip, plus shuttle service for paddlers with their own boats.',
      routes: ['new-river-austinville-foster-falls'],
      sources: ['https://www.dcr.virginia.gov/state-parks/document/nr-boat-bike-flier.pdf'],
    }],
  },
  'niagara-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Niagara Outfitters',
      url: 'https://niagaraoutfitters.com/tours',
      service: 'The one-way guided paddle starts in Lewiston and ends at the Youngstown public dock, upstream of Fort Niagara. Check the tour finish and return transportation when planning this stretch.',
      routes: ['niagara-river-lewiston-fort-niagara'],
      sources: ['https://niagaraoutfitters.com/rentals'],
    }],
  },
  'niangua-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sand Spring Resort',
      url: 'https://sandspringresort.com/canoeing-rafting/',
      service: 'This Niangua River livery near Bennett Spring rents canoes, kayaks and rafts. It advertises vehicle shuttles to Barclay for paddlers with their own boats. Confirm the put-in and meeting time when reserving.',
      routes: ['niangua-river-bennett-spring-barclay'],
    }],
  },
  'nine-mile-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The creek council describes self-guided paddling. Rental listings for Onondaga Lake and tours on the Erie Canal did not establish service on the Munro Park or Pumphouse reaches.',
    sources: ['https://ninemilecreekconservationcouncil.org/activities/paddling/', 'https://eriecanalcamillus.org/visit-us/boat-tour/', 'https://www.wcny.org/support-wcny/member-benefits/connect-card/camillus-kayak-shop/'],
  },
  'nissequogue-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bob’s Canoe Rental',
      url: 'https://www.canoerentalslongisland.com/',
      service: 'This Smithtown livery offers canoe and kayak trips on the tidal Nissequogue between the headwaters and the state park. Confirm the starting park and departure time for the day’s tide.',
      routes: ['nissequogue-river-paul-given-state-park'],
      sources: ['https://www.canoerentalslongisland.com/park.htm', 'https://www.canoerentalslongisland.com/map.htm'],
    }],
  },
  'north-branch-au-sable-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'North Branch Outing Club',
      url: 'https://www.northbranchclub.com/fly-shop-guide-services.html',
      service: 'At Lovells, the club offers guided fly-fishing floats in traditional Au Sable river boats and drift boats. Ask the guide about fishing the reach toward Kelloggs Bridge.',
      routes: ['north-branch-au-sable-lovells-kelloggs'],
      sources: ['https://www.northbranchclub.com/'],
    }],
  },
  'north-branch-potomac-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Clyde’s River Guides & Outfitters',
      url: 'https://www.govisitmineralwv.com/outdoor-activities#:~:text=River%20Guides',
      service: 'Clyde’s rents kayaks near Cumberland and arranges shuttles between Keyser and Paw Paw for paddlers with their own boats. Its rental floats to Spring Gap are offered in two sections. Call for the landings you need.',
      routes: ['north-branch-potomac-mccoole-black-oak', 'north-branch-potomac-black-oak-fairgrounds', 'north-branch-potomac-mason-spring-gap'],
      sources: ['https://clydesriverguides.com/products/rental-tandem-kayak', 'https://clydesriverguides.com/pages/shuttle-services'],
    }],
  },
  'north-branch-raritan-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Raritan Headwaters',
      url: 'https://www.raritanheadwaters.org/education/family-and-adult-programs/sojourns-and-paddles/',
      service: 'The watershed group organizes scheduled paddles and has offered the Burnt Mills to Branchburg trip with kayak rentals. Check its calendar for the next outing and available equipment.',
      routes: ['north-branch-raritan-river-burnt-mills-confluence'],
      sources: ['https://www.raritanheadwaters.org/event/raritan-river-sojourn-north-branch-burnt-mills-to-the-confluence/'],
    }],
  },
  'north-branch-saranac-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'St. Regis Canoe Outfitters',
      url: 'https://www.canoeoutfitters.com/rentals-services/canoekayak-transportation',
      service: 'The outfitter supplies car-top equipment with rental boats and publishes a route from nearby Lake Kushaqua. Plan to carry your boat from North Branch Road and ask separately about delivery.',
      routes: ['north-branch-saranac-river-north-branch-road-out-and-back'],
      sources: ['https://www.canoeoutfitters.com/trip-planning/routes/lake-kushaqua-st-regis-canoe-area', 'https://dec.ny.gov/places/kushaqua-conservation-easement-tract'],
    }],
  },
  'north-fork-clearwater-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Idaho lists the lower North Fork as licensable outfitter water. A named paddling operator offering the Kelly Forks, Weitas or Black Canyon reaches could not be verified.',
    sources: ['https://files.dfm.idaho.gov/dfm-admin-website/bulletin/2025/12.pdf', 'https://www.fs.usda.gov/media/61266'],
  },
  'north-fork-coeur-dalene-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Albert’s Landing',
      url: 'https://albertsrvcampground.com/',
      service: 'Near Kingston, Albert’s runs a seasonal shuttle to Bumblebee Bridge for the float back to the campground. Contact the operator for available rental equipment. Its standard shuttle serves this lower section.',
      routes: [],
    }],
  },
  'north-fork-crow-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Riverside Store & Tavern',
      url: 'https://www.litchfieldmn.com/canoe-and-kayak-rental/',
      service: 'The Litchfield visitors bureau lists canoe rentals at the Riverside Store & Tavern in Forest City. Ask about availability and a return plan before paddling toward Kingston.',
      routes: ['north-fork-crow-river-forest-city-kingston'],
      sources: ['https://www.dnr.state.mn.us/state-water-trails/crow-river-north-fork/segments-maps.html'],
    }],
  },
  'north-fork-edisto-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state documents the North Fork launches at Baughman’s and Orangeburg. Published livery trips on the lower Edisto do not establish service on this fork.',
    sources: ['https://www.dnr.sc.gov/water/river/pdf/edistoboatingguide.pdf', 'https://www.canoesc.com/day-trips', 'https://ercktrail.org/outfitters/'],
  },
  'north-fork-holston': {
    reviewedOn: '2026-11-24',
    noMatch: 'Adventure Mendota offers trips on the North Fork near Mendota, upstream of these landings. Service from Wadlow Gap to Yuma could not be verified.',
    sources: ['https://www.adventuremendota.com/', 'https://www.scottcountyva.gov/DocumentCenter/View/408/Holston-River-Access'],
  },
  'north-fork-kentucky-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Three Forks Adventure Company',
      url: 'https://www.threeforksadventureco.com/services/',
      service: 'This Beattyville outfitter offers kayak rentals and boat delivery on the North Fork in Lee and Breathitt counties. Call 606-560-9059 to confirm a landing. Paddlers arrange their own ride for a one-way trip.',
      routes: ['north-fork-kentucky-river-douthitt-park-roy-spencer', 'north-fork-kentucky-river-roy-spencer-beattyville'],
      sources: ['https://www.threeforksadventureco.com/contact/'],
    }],
  },
  'north-fork-maquoketa-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Jones County distinguishes the Cascade-area North Fork from the mainstem at Monticello. The commercial floats found serve the mainstem, and no operator was verified for the North Fork accesses.',
    sources: ['https://www.jonescountyiowa.gov/conservation/rivers/', 'https://www.traveljonescounty.com/outdoor-adventures/', 'https://monticelloriverrentals.com/'],
  },
  'north-fork-of-the-white-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Dawt Mill',
      url: 'https://dawtmill.com/floating/',
      service: 'Check in at the mill for a bus to Blair Bridge, then paddle back to Dawt by canoe, kayak or raft. The outfitter lists this as an eight-mile float.',
      routes: ['north-fork-white-river-blair-dawt'],
    }],
  },
  'north-fork-owyhee-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Owyhee River Runners',
      url: 'https://www.owyheerivershuttles.com/',
      service: 'The shuttle operator serves the Three Forks take-out. Ask whether it can also reach North Fork Campground before relying on it for the full shuttle.',
      routes: ['north-fork-owyhee-campground-three-forks'],
      sources: ['https://www.blm.gov/visit/north-fork-campground'],
    }],
  },
  'north-fork-payette-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kelly’s Academy',
      url: 'https://kellyswhitewaterpark.com/academy/',
      service: 'The academy offers kayak and other whitewater lessons at Kelly’s Whitewater Park for eligible Valley County children. Check residency, age and registration requirements.',
      routes: ['north-fork-payette-kellys-whitewater-park'],
    }, {
      name: 'Bear Valley Rafting',
      url: 'https://bearvalleyrafting.com/full-day-cabarton-north-fork-payette/',
      service: 'Join a guided full-day whitewater raft trip on the Cabarton section of the North Fork. This is the reach upstream of Smiths Ferry.',
      routes: ['north-fork-payette-cabarton-smiths-ferry'],
      sources: ['https://raftidaho.org/trips/cabarton'],
    }],
  },
  'north-fork-shenandoah-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Shenandoah River Adventures',
      url: 'https://www.shenandoahriveradventures.com/rates-policies/',
      service: 'Pick up a canoe or kayak at the shop in the town of Shenandoah for an off-site rental. Transport it to Meems Bottom and arrange your own takeout at Chapman’s Landing.',
      routes: ['north-fork-shenandoah-meems-chapmans'],
      sources: ['https://dwr.virginia.gov/waterbody/shenandoah-river-north-fork/'],
    }],
  },
  'north-fork-st-joe-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Local paddlers describe self-shuttling the Loop Creek run. No public rental, shuttle or guided whitewater trip could be verified for this fork.',
    sources: ['https://www.northidahorivers.com/St_Joe_North_Fork.htm', 'https://www.americanwhitewater.org/content/River/view/river-detail/640/main'],
  },
  'north-fork-zumbro-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Rental services found are on Lake Zumbro and at Zumbro Falls. Neither documents service between Covered Bridge Park and Walking Bridge Park on the North Fork.',
    sources: ['https://files.dnr.state.mn.us/maps/canoe_routes/zumbro1.pdf', 'https://www.olmstedcounty.gov/residents/parks-recreation/recreation/boating', 'https://zumbrovalleycanoerental.com/'],
  },
  'north-loup-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kamp Kaleo Adventures',
      url: 'https://kampkaleo.com/outfitters/',
      service: 'The Burwell outfitter starts its canoe and kayak trips at camp and finishes six miles downstream. Tubing starts at Burwell City Park. Reserve ahead and confirm your take-out if you plan to continue toward Ord.',
      routes: ['north-loup-river-burwell-ord'],
    }],
  },
  'north-platte-river-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'RBR Shuttles',
      url: 'https://redbutteranchlodging.com/shuttle-service',
      service: 'Arrange to have your vehicle and trailer moved to the take-out. This Casper-area service covers the North Platte from Gray Reef through Glenrock.',
      routes: ['north-platte-gray-reef-lusby', 'north-platte-bessemer-robertson'],
    }],
  },
  'north-prong-medina-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Bandera operator advertises rentals and shuttles on the main Medina. Service above the town of Medina at 3rd Crossing, Freeman Crossing or Moffett Park could not be verified.',
    sources: ['https://txrivers.org/discover-texas-rivers/medina-river/', 'https://www.themedinarivercompany.com/'],
  },
  'north-raccoon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sac County Conservation',
      url: 'https://sacconservation.wixsite.com/sccb/all-fees',
      service: 'The county lists canoe and kayak rentals and manages river access at its Hagge Park headquarters. Call about reserving a boat and arranging transport from the take-out.',
      routes: ['north-raccoon-river-hagge-white-horse'],
      sources: ['https://www.saccountyiowa.gov/conservation/parks/north_raccoon_river_water_trail/'],
    }],
  },
  'north-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Forest Service and whitewater reach guide identify the North River Campground run. No public livery, guide or boat shuttle was verified for this mountain reach to Camp May Flather.',
    sources: ['https://www.fs.usda.gov/r08/gwj/recreation/north-river-campground', 'https://www.americanwhitewater.org/content/River/view/river-detail/1976/main'],
  },
  'north-skunk-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Keokuk County documents river recreation. The listed Skunk River water-trail rentals in Story County are on a different fork. No outfitter was verified for the Delta–Sigourney reach.',
    sources: ['https://keokukcounty.iowa.gov/conservation/', 'https://www.skunkriverpaddlers.org/skunk-river-water-trail'],
  },
  'nottoway-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Courtland has a rental station and a documented outfitted trip downstream to Cypress Bridge. Neither source confirms service at the Double Bridge or Route 630 ramps farther upstream.',
    sources: ['https://www.rent.fun/kayak-rental/courtland-va', 'https://www.virginia.org/blog/post/fantastic-family-floats-virginia/', 'https://dwr.virginia.gov/waterbody/nottoway-river/'],
  },
  'oak-orchard-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Oak Orchard Canoe Kayak Experts',
      url: 'https://oakorchardcanoe.com/pages/rentals',
      service: 'Pick up a canoe or kayak in Waterport for self-transport to the refuge. Arrange your own shuttle between the Route 63 and Knowlesville launches. The shop’s scheduled river trips depart elsewhere.',
      routes: ['oak-orchard-creek-route-63-knowlesville'],
      sources: ['https://www.oakorchardcanoe.com/rentals.php', 'https://www.fws.gov/locations/iroquois-national-wildlife-refuge/boating-non-motorized'],
    }],
  },
  'oatka-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The county and visitor bureau document launches at Scottsville and Le Roy. An older Le Roy livery mention could not be confirmed as a current rental or shuttle on the catalog reaches.',
    sources: ['https://visitgeneseeny.com/blog/five-great-kayak-and-canoe-launch-sites', 'https://www.monroecounty.gov/parks-oatka'],
  },
  'ocmulgee-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ocmulgee Outdoor Expeditions',
      url: 'https://ocmulgeeoutdoorexpeditions.com/boat-shuttle-service-juliette-to-hwy-83/',
      service: 'The Macon outfitter lists boat shuttles from Spring Street to Amerson and from Amerson to Pope’s Ferry for the downstream paddle back. Check departure times and minimum group size.',
      routes: ['ocmulgee-river-amerson-spring-street', 'ocmulgee-river-popes-ferry-amerson'],
      sources: ['https://www.ocmulgeeoutdoorexpeditions.com/popes-to-amerson-class-i-adventure/'],
    }],
  },
  'ogden-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Weber State Outdoor Program',
      url: 'https://www.weber.edu/outdoor/river-lake-rentals.html',
      service: 'The Ogden rental center offers whitewater kayak packages for pickup. Its local paddling guide describes the Lorin Farr to Crystal Wave run. Arrange transport to and from the river.',
      routes: ['ogden-river-lorin-farr-crystal-wave'],
      sources: ['https://www.weber.edu/outdoor/aquatic-rec.html'],
    }],
  },
  'old-place-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kayak Staten Island',
      url: 'https://www.kayakstatenisland.org/?page_id=9',
      service: 'This volunteer program has paddled Old Place Creek with the city. Check the calendar for a public outing at this site. Some scheduled sessions are private.',
      routes: ['old-place-creek-gulf-avenue-arthur-kill-out-and-back'],
      sources: ['https://www.kayakstatenisland.org/', 'https://www.cb9m.org/pdf-archives/reports/dm-report/may-2025.pdf'],
    }],
  },
  'onondaga-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Syracuse offers a rental station at the Inner Harbor with limits on where its boats may go. The city identifies Meachem as a launch, but a rental or shuttle for the one-way creek trip could not be verified.',
    sources: ['https://www.syr.gov/Living/Our-Community/Parks-Recreation-Youth-Services/Parks-Activities-and-Programs/Kayaking-in-Syracuse', 'https://www.syr.gov/News/City-News/City-2023/2023-05-25-Mayors-Office-News'],
  },
  'oriskany-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater documents the Clinton run. Central New York guided-trip and canal-rental listings did not establish whitewater instruction, rentals or a shuttle for this stretch of creek.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/10867/main', 'https://tughilloutfitters.com/', 'https://eriecanalway.org/explore/watertrail/paddling-rentals'],
  },
  'osgood-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adirondack Lakes & Trails Outfitters',
      url: 'https://www.adirondackoutfitters.com/trips/osgood-pond-and-river',
      service: 'The outfitter lists an Osgood Pond and River paddling package with your choice of boat, transport, paddle, life jacket and map. Confirm the launch when booking.',
      routes: ['osgood-river-osgood-pond-out-and-back'],
    }],
  },
  'oswegatchie-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Raquette River Outfitters',
      url: 'https://www.raquetteriveroutfitters.com/three-day-trips',
      service: 'The Tupper Lake outfitter describes the multiday portage route from the Bog River and Lows Lake into the upper Oswegatchie and also offers East Branch day paddles. Confirm the carry plan and shuttle for your itinerary.',
      routes: ['bog-river-lows-oswegatchie-inlet', 'oswegatchie-river-inlet-high-falls'],
      sources: ['https://www.raquetteriveroutfitters.com/day-trips', 'https://www.tupperlake.com/paddling/oswegatchie-river-from-inlet-road'],
    }],
  },
  'oswego-canal': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wright’s Landing Marina',
      url: 'https://eriecanalway.org/explore/watertrail/paddling-rentals#:~:text=Oswego%20Canal',
      service: 'The canal heritage corridor lists kayak rentals at Wright’s Landing on the Oswego waterfront. Contact the marina about departure and return limits before planning a trip through a lock.',
      routes: [],
    }],
  },
  'oswego-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mick’s Pine Barrens Canoe & Kayak Rental',
      url: 'https://www.mickscanoerental.com/copy-of-rentals',
      service: 'Mick’s lists the Oswego Lake to Harrisville Lake trip. Canoe and kayak rentals include paddles, life vests and transport to and from the river.',
      routes: ['oswego-river-harrisville'],
      sources: ['https://www.mickscanoerental.com/rates'],
    }],
  },
  'otselic-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Area rentals were found at Dorchester Park on Whitney Point Reservoir and on the Tioughnioga at Marathon. Neither documents shuttle or rental service for the Willet and Upper Lisle river reaches.',
    sources: ['https://www.experiencecortland.com/partners/otselic-river', 'https://broomecountyny.gov/sites/default/files/dept/parks/images/Parks_DorchesterPark_Brochure%20_2026.pdf', 'https://lighthouselandings.org/rental-rates/'],
  },
  'otter-tail-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Charlie’s Ottertail Tubing',
      url: 'https://www.beckercountymn.gov/dept/parks_recreation/tubing.aspx',
      service: 'Becker County lists this tubing operator on the Otter Tail near Detroit Lakes. Contact the operator for its float and pickup location.',
      routes: [],
    }],
  },
  'ouachita-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ouachita River Haven',
      url: 'https://www.ouachitahaven.com/kayaks-and-canoes',
      service: 'The Oden outfitter rents kayaks and canoes with shuttles from upper Ouachita accesses including Pencil Bluff and Rocky Shoals. Confirm the take-out and river conditions before reserving.',
      routes: [],
    }],
  },
  'owego-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The local kayak shop documents retail sales and a test pond. Nearby published Susquehanna trips did not establish a rental, guide or boat shuttle at the Owego Creek hand launch.',
    sources: ['https://www.tiogachamber.com/list/member/route-96-power-paddle-196', 'https://broomecountyny.gov/wp-content/uploads/dept/planning/pdfs/Broome_River%20Guide_Inserts-2024.pdf'],
  },
  'owyhee-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Owyhee River Runners',
      url: 'https://www.owyheerivershuttles.com/',
      service: 'Arrange a vehicle shuttle for a remote Owyhee trip. The operator lists Crutcher Crossing, Three Forks and Rome among its service points. Confirm road conditions and the access pair when booking.',
      routes: ['owyhee-river-crutchers-three-forks', 'owyhee-river-three-forks-rome'],
    }],
  },
  'pack-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sandpoint Water Rentals',
      url: 'https://sandpointwaterrentals.com/',
      service: 'Rent a recreational kayak or paddleboard at the Pack River Store for the lower-river float. The store access is downstream of the upper whitewater runs.',
      routes: [],
    }],
  },
  'pascagoula-river-mississippi': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Eco-Tours of South Mississippi',
      url: 'https://www.coastalmississippi.com/directory/eco-tours-of-south-mississippi/',
      service: 'This operator offers guided kayak trips through the marshes and swamps of the lower Pascagoula. Contact the guide to choose the launch and distinguish kayak outings from motorboat tours.',
      routes: [],
      sources: ['https://msgulfcoastheritage.ms.gov/innovative/nautical/'],
    }],
  },
  'passaic-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Livingston Trails & Greenways Committee',
      url: 'https://livingstonnj.org/582/Trails-Greenways-Committee',
      service: 'The township organizes preregistered paddles on the Passaic in Livingston and supplies canoes, paddles and life jackets. Dates depend on water levels.',
      routes: [],
    }],
  },
  'patapsco-river-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Atlantic Marinas on the Patapsco',
      url: 'https://www.atlanticmarinasmd.com/patapsco-marina',
      service: 'The Pasadena marina offers kayak rentals on the tidal Patapsco, downstream of Patapsco Valley State Park. Check local launch and return arrangements with the marina.',
      routes: [],
    }],
  },
  'patuxent-river-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Patuxent River Park',
      url: 'https://www.pgparks.com/parks_trails/patuxent-river-park',
      service: 'The county park rents canoes and kayaks at Jug Bay on seasonal weekends and holidays. Jackson’s and Selby’s landings are in the park. Confirm where the rental must be returned before planning a one-way trip.',
      routes: ['patuxent-river-jacksons-selbys-landing'],
    }],
  },
  'paulins-kill-river-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'State access records and the paddling reach guide describe this part of the Paulins Kill. No paddling rental, shuttle or guided trip could be verified for Garrison Road to Route 94.',
    sources: ['https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-alphabetical/', 'https://www.americanwhitewater.org/content/River/view/river-detail/1196/main'],
  },
  'paw-paw-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Third Coast Paddling',
      url: 'https://thirdcoastpaddling.com/location/paw-paw-river',
      service: 'Kayak and paddleboard rentals start and return at Graham Avenue in Benton Harbor. The operator offers a local round trip. Arrange a separate shuttle for the one-way paddle from Riverside.',
      routes: ['paw-paw-river-riverside-graham-avenue'],
    }],
  },
  'pawcatuck-river-rhode-island': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Watch Hill Outfitters',
      url: 'https://www.watchhilloutfitters.com/kayaks',
      service: 'Rent kayaks from the shop’s own Pawcatuck River launch in Westerly. Ask about the tidal section and where to return the boat before planning a longer trip.',
      routes: [],
      sources: ['https://www.watchhilloutfitters.com/'],
    }],
  },
  'payette-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bear Valley Rafting',
      url: 'https://bearvalleyrafting.com/go-rafting/',
      service: 'The Banks outfitter runs guided half-day whitewater trips on the Main Payette. Banks to Beehive Bend is the standard main-stem run. Confirm the day’s launch and take-out when reserving.',
      routes: ['payette-river-banks-beehive-bend'],
      sources: ['https://raftidaho.org/trips/main-payette', 'https://www.blm.gov/visit/payette-river-beehive-bend'],
    }],
  },
  'peace-river-florida': {
    reviewedOn: '2026-11-24',
    noMatch: 'The campground and operator identify the current Canoe Outpost at UpRiver Adventures in Nocatee. Their advertised trips finish downstream. The Brownville-to-DeSoto Veterans access pair could not be verified for a current outfitted trip.',
    sources: ['https://peacerivercampground.com/canoe-rentals/', 'https://upriveradventures.com/our-tours/canoe-and-camping/', 'https://floridadep.gov/sites/default/files/Peace_R_Guide_6.pdf'],
  },
  'pecatonica-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pec-N-Paddle Kayak Rental',
      url: 'https://www.pecriver.org/support/',
      service: 'The local river foundation lists this seasonal Freeport kayak rental and its contact numbers. Ask about the Wes Block and Tutty’s Crossing landings and whether a shuttle is available.',
      routes: ['pecatonica-river-wes-block-tuttys'],
      sources: ['https://greaterfreeport.com/visit-2/outdoor-rec/'],
    }],
  },
  'pecatonica-river-mineral-point-branch': {
    reviewedOn: '2026-11-24',
    noMatch: 'The paddler’s account gives a bicycle shuttle for this run. Nearby livery references concern other branches or the main Pecatonica, with no service verified for Ludden Lake to North Oak Park Road.',
    sources: ['https://www.wisconsinrivertrips.com/segments/pecatonica-river/mineral-point-branch/ludden-lake', 'https://www.argylewi.gov/directory/area-attractions/pecatonica-river/'],
  },
  'peconic-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Peconic Paddler',
      url: 'https://peconicpaddlerli.info/',
      service: 'The Riverhead outfitter rents kayaks and canoes and lists a through-trip starting on Connecticut Avenue in Calverton and finishing at the shop. Confirm portages and take-out arrangements when choosing a trip.',
      routes: [],
      sources: ['https://www.peconicestuary.org/peconic-estuary/on-the-water/'],
    }],
  },
  'pembina-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pembina Gorge State Park',
      url: 'https://www.parkrec.nd.gov/pembina-gorge-state-park',
      service: 'Pick up and return a rental kayak at the state park campground near Walhalla. The park supplies a paddle and life jacket. Bring a way to transport the boat and arrange your own shuttle.',
      routes: ['pembina-river-vang-riverside-park'],
    }],
  },
  'pemigewasset-river-new-hampshire': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Plymouth Ski & Sports',
      url: 'https://www.plymouthski.com/canoe-and-kayak-rentals.php',
      service: 'The Plymouth shop offers canoe and kayak rentals for the Pemigewasset. Call about availability and the launch and return options for your planned section.',
      routes: [],
      sources: ['https://www.plymouthski.com/excursions.php'],
    }],
  },
  'penobscot-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Skyline Maine Adventures',
      url: 'https://skylinekayakrentals.com/services/',
      service: 'Rent a canoe or kayak at Hampden Marina or join a guided Penobscot River paddle from Hampden.',
      routes: ['penobscot-river-bangor-hampden', 'penobscot-river-hampden-eddington'],
    }],
  },
  'pequest-river-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'New Jersey lists fishing access on the Pequest. A paddling outfitter covering the Route 46 to Orchard Street run could not be verified.',
    sources: ['https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-alphabetical/', 'https://www.americanwhitewater.org/content/River/view/river-detail/1198/main'],
  },
  'pere-marquette-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Run Canoe Rental',
      url: 'https://www.michigan.org/property/river-run-canoe-livery',
      service: 'Rent a boat for the Custer to Scottville float or arrange a shuttle for your own canoe or kayak.',
      routes: ['pere-marquette-river-custer-scottville'],
      sources: ['https://www.riverruncanoerental.com/information.php'],
    }],
  },
  'peshtigo-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kosir’s Whitewater Rafting',
      url: 'https://kosirs.com/peshtigo-rafting',
      service: 'Guided rafting on the Roaring Rapids section of the Peshtigo from the outfitter’s Silver Cliff base.',
      routes: ['peshtigo-river-roaring-rapids'],
    }],
  },
  'pigeon-river-minnesota': {
    reviewedOn: '2026-11-24',
    noMatch: 'The National Park Service describes the Grand Portage bypass. A guide or shuttle for the Highway 61 river reach could not be verified.',
    sources: ['https://www.nps.gov/thingstodo/visit-grand-portage-state-park.htm'],
  },
  'pigeon-river-ottawa': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ottawa County Parks',
      url: 'https://miottawa.org/park-locations/hemlock-crossing/',
      service: 'Check the county’s guided kayak calendar for Pigeon River paddles from Hemlock Crossing through Pine Bend to Sheldon Landing.',
      routes: ['pigeon-river-hemlock-crossing-sheldon-landing'],
      sources: ['https://miottawacountyweb.myvscloud.com/webtrac/web/search.html?FMID=27330726&Module=AR&display=detail'],
    }],
  },
  'pigeon-river-tennessee': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rapid Expeditions',
      url: 'https://www.rapidexpeditions.com/index.html',
      service: 'Choose a guided upper Pigeon whitewater trip or a gentler lower Pigeon float from Hartford.',
      routes: ['pigeon-river-waterville-hartford', 'pigeon-river-hartford-denton'],
    }],
  },
  'pigg-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Franklin County identifies the Waid and Lynch public launches. A regular boat rental or shuttle serving that float could not be confirmed.',
    sources: ['https://www.playfranklincounty.com/200/Blueway-Access-Maps', 'https://visitfranklincountyva.com/156/Rivers'],
  },
  'pike-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Wisconsin river guide documents a self-shuttle and the DNR lists river access. No outfitter was verified for the Amberg or Yellow Bridge runs.',
    sources: ['https://dnr.wisconsin.gov/topic/lands/pikeriver/info', 'https://wisconsintrailguide.com/2024/paddle/pdf/guide-pike.pdf'],
  },
  'pine-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater documents the tributary near Swan Valley. The local outfitter advertises horseback trips on West Pine Creek and no paddle guide was confirmed for this reach.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/597/main', 'https://www.swanvalleyoutfitters.net/trail-rides-1.html'],
  },
  'pine-river-michigan': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Horina’s Pine River Canoe & Kayak Rental',
      url: 'https://www.horinasprcanoe.com/pricing',
      service: 'Canoe and kayak rentals with boat placement and pickup at Edgetts and Lincoln. The outfitter also spots private boats.',
      routes: ['pine-river-edgetts-lincoln'],
    }, {
      name: 'Hoxeyville Outfitters',
      url: 'https://hoxeyvilleoutfitters.com/river-trips-prices/',
      service: 'Book a canoe, kayak or raft trip from Peterson Bridge to Low Bridge.',
      routes: ['pine-river-peterson-low-bridge'],
    }],
  },
  'pine-river-minnesota': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Crow Wing Kayaks',
      url: 'https://www.crowwingkayaks.com/pine-river-kayak-routes',
      service: 'Kayak rentals and shuttles from the city of Pine River downstream. Published trips include Crosslake Dam to Rock Dam and Rock Dam to Harvey Drake Landing.',
      routes: ['pine-river-cross-lake-rock-dam', 'pine-river-pine-river-1-cross-lake', 'pine-river-rock-dam-harvey-drake'],
    }],
  },
  'pine-river-wisconsin': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Nature’s Water Park',
      url: 'https://florencecountychamber.org/project/natures-water-park',
      service: 'Tube and paddlecraft rentals on the Pine River in Florence County, with check-in at County Highway N. Ask which sections the shuttle serves.',
      routes: [],
      sources: ['https://www.exploreflorencecounty.com/tourism/wild-rivers-fun/'],
    }, {
      name: 'Pine River Paddle',
      url: 'https://www.richlandcenterwi.gov/tourism/page/kayak-or-canoe-pine-river',
      service: 'Richland Center lists canoe and kayak rentals with transportation on its Pine River water trail.',
      routes: ['pine-river-richland-center-canoe-port-1-port-4'],
    }],
  },
  'piscataquis-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bullfrog Adventures',
      url: 'https://bullfrogadventures.com/piscataquis-river-kayak-trip/',
      service: 'Guided spring canoe and kayak trips between Blanchard and Abbot Village, upstream of Guilford. Equipment and shuttle are included.',
      routes: [],
    }],
  },
  'piseco-outlet': {
    reviewedOn: '2026-11-24',
    noMatch: 'DEC lists rentals at the lake campground. Off-site rentals or a guide for the Big Bay hand launch on the outlet could not be confirmed.',
    sources: ['https://dec.ny.gov/places/piseco-lake-campground-and-day-use-area', 'https://dec.ny.gov/places/ferris-lake-wild-forest'],
  },
  'platte-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Platte River Rentals',
      url: 'https://www.platteriverrentals.com/faq/',
      service: 'Rent a boat in Louisville for a Platte River float with an upstream shuttle and a takeout at the Highway 50 bridge.',
      routes: [],
    }],
  },
  'pleasant-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The local fish and game association maintains launch sites in Columbia and Columbia Falls. No outfitter or equipment service was verified for this Washington County river.',
    sources: ['https://www.prfgca.org/activities/water-activities.php', 'https://pleasant-river.org/access/'],
  },
  'pocomoke-river-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pocomoke River Canoe Company',
      url: 'https://www.pocomokeriverpaddle.com/',
      service: 'Rent canoes or kayaks in Snow Hill. Pocomoke River State Park lists the company for off-site rentals, deliveries and shuttle arrangements at Shad Landing.',
      routes: ['pocomoke-river-snow-hill-shad'],
      sources: ['https://dnr.maryland.gov/publiclands/pages/eastern/pocomoke/boating-fishing.aspx'],
    }],
  },
  'point-lookout-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Point Lookout State Park',
      url: 'https://dnr.maryland.gov/publiclands/pages/southern/ptlookout/day-use-and-beaches.aspx',
      service: 'The park store offers first-come canoe rentals near Lake Conoy when weather allows.',
      routes: ['point-lookout-lake-conoy-water-trail'],
    }],
  },
  'pomme-de-terre-river-minnesota': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pomme de Terre River Association',
      url: 'https://www.pdtriver.org/get-involved/2026-river-run/',
      service: 'The association organizes River Run outings with a carpool and a limited number of rental boats for participants. Check the event date and meeting place.',
      routes: [],
    }],
  },
  'pomme-de-terre-river-missouri': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Corps and Missouri conservation department document launches below the dam. The state park’s boat services are on the reservoir, and a provider for the Outlet to Cross Timbers float could not be verified.',
    sources: ['https://www.nwk.usace.army.mil/Locations/District-Lakes/Pomme-de-Terre-Lake/', 'https://mdc.mo.gov/discover-nature/places/cross-timbers-access', 'https://mostateparks.com/park/pomme-de-terre-state-park/boating'],
  },
  'popple-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The regional outfitter checks customers in on the Pine River. No service for the Popple at Morgan Lake Road or Highway 101 was verified.',
    sources: ['https://florencecountychamber.org/project/natures-water-park', 'https://dnr.wisconsin.gov/topic/lands/pinepopple/recreation/water'],
  },
  'portage-river-three-rivers': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Liquid Therapy',
      url: 'https://www.michigan.org/property/liquid-therapy-canoe-kayak-rental-three-rivers',
      service: 'Michigan’s tourism office lists seasonal canoe and kayak trips with shuttle service on the Portage at Three Rivers. Contact the livery for its current launch and pickup points.',
      routes: ['portage-river-north-fisher-three-rivers'],
    }],
  },
  'potlatch-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'University of Idaho Outdoor Rental Center',
      url: 'https://www.uidaho.edu/recreation/outdoor-program/rentals',
      service: 'The Moscow rental center supplies whitewater kayak packages and paddling accessories for self-supported trips. Ask about boat models and fit for the intended section.',
      routes: [],
    }],
  },
  'potomac-river-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Greenridge Canoe Outfitter',
      url: 'https://berkeleysprings.com/shop/greenridge-canoe-outfitter/',
      service: 'Paw Paw-based canoe and kayak rentals and shuttles for trips through the Paw Paw Bends.',
      routes: ['potomac-river-paw-paw-bonds'],
      sources: ['https://greenridgecanoeoutfitterllc.com/', 'https://dnr.maryland.gov/forests/Pages/publiclands/Greenridge/recreation-trails.aspx'],
    }, {
      name: 'River & Trail Outfitters',
      url: 'https://www.rivertrail.com/potomac-river-public-access-points/',
      service: 'Self-guided kayak and canoe trips on the six-mile Potomac float from Brunswick to Point of Rocks.',
      routes: ['potomac-river-brunswick-point-of-rocks'],
    }],
  },
  'prairie-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Merrill and its Chamber describe launches and trips on the Prairie. The local rental information did not establish a provider on the county-road or Stange’s Park river reaches.',
    sources: ['https://ci.merrill.wi.us/canoeing', 'https://www.merrillchamber.org/2024/04/24/paddle-merrill/'],
  },
  'prairie-river-nottawa': {
    reviewedOn: '2026-11-24',
    noMatch: 'Michigan lists a livery on the Prairie near Three Rivers. Its listing does not establish service on the distinct Prairie Lake to Nottawa float, and the county does not provide rentals at its parks.',
    sources: ['https://www.michigan.org/property/liquid-therapy-canoe-kayak-rental-three-rivers', 'https://stjosephcountymi.gov/government/parks-recreation/rentals/', 'https://stjosephcountymi.gov/government/parks-recreation/our-parks/sand-lake-county-park/'],
  },
  'presumpscot-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Portland Paddle',
      url: 'https://www.portlandpaddle.net/tours/presumpscot-river/',
      service: 'Guided seasonal paddles on the Presumpscot in Westbrook. The city also lists kayak and paddleboard rentals at Riverbank Park.',
      routes: ['presumpscot-river-gorham-falmouth'],
      sources: ['https://www.westbrookmaine.gov/374/Kayak-Rentals-in-Riverbank-Park'],
    }],
  },
  'priest-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The state park advertises lake rentals. Public guides document the river runs and a road shuttle, but an outfitter covering the Priest River below the outlet was not confirmed.',
    sources: ['https://parksandrecreation.idaho.gov/state-park/priest-lake-state-park/', 'https://visitnorthidaho.com/activity/priest-river/', 'https://www.grc101.com/IdahoPaddling/GIPPriestOutlet.html'],
  },
  'prime-hook-creek-delaware': {
    reviewedOn: '2026-11-24',
    noMatch: 'The refuge maps Foord’s Landing and Waples. Nearby commercial tours describe Cape Henlopen and Rehoboth Bay, with no verified service on this creek.',
    sources: ['https://www.fws.gov/sites/default/files/documents/2024-07/prime-hook-map-2024.pdf', 'https://www.questkayak.com/tours', 'https://www.delmarvaboardsportadventures.com/watersports/kayaking.html'],
  },
  'quaboag-river-massachusetts': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'White’s Landing',
      url: 'https://www.opacumlt.org/events/journey-down-the-quaboag-river/',
      service: 'White’s Landing provides kayak rentals on the Brookfield section of the Quaboag, upriver of the Warren whitewater runs.',
      routes: [],
      sources: ['https://www.discovercentralma.org/articles/post/day-trip-from-worcester-to-brookfield/'],
    }],
  },
  'quinebaug-river-connecticut': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'The Last Green Valley',
      url: 'https://thelastgreenvalley.org/directory-events/paddling-the-quinebaug-river-trail/',
      service: 'The nonprofit’s rangers lead scheduled bring-your-own-boat outings from the Brooklyn Riverside Canoe Launch. Check its event calendar for dates.',
      routes: [],
    }],
  },
  'raccoon-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'CanoeSport’s confirmed river rental starts at Blue Heron Lake and ends at the 1st Street Recreation Area. It is downstream of the Van Meter to Walnut Woods trip.',
    sources: ['https://www.canoesportoutfitters.com/raccoonriverrentals', 'https://dmampo.org/wp-content/uploads/2016/06/report-to-idnr-river-programs-dsm-metro-raccoon-river-final.pdf'],
  },
  'ramapo-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Kayak and Canoe Club of New York',
      url: 'https://kccny.org/locations/ramapo-river/',
      service: 'Check the club calendar for whitewater paddles from Tuxedo toward Torne Valley. Members can request loaner gear for eligible club events.',
      routes: ['ramapo-river-tuxedo-pierson-mapes'],
      sources: ['https://kccny.org/events/ramapo-river/', 'https://kccny.org/loaner-equipment/'],
    }],
  },
  'ramshorn-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Audubon New York',
      url: 'https://www.audubon.org/ramshorn',
      service: 'The sanctuary’s naturalists offer occasional guided paddles in the RamsHorn marsh. Contact the sanctuary for its program schedule.',
      routes: ['ramshorn-livingston-sanctuary-dutchmans'],
      sources: ['https://www.greatnortherncatskills.com/explore/ramshorn-livingston-sanctuary'],
    }],
  },
  'rancocas-creek-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rancocas Pathways',
      url: 'https://rcnwt.com/guided-kayak-excursions/',
      service: 'Guided tidal-creek paddles around the North and South Branch confluence. The outfitter describes trips connecting Mount Holly and Hainesport and rents kayaks.',
      routes: ['rancocas-creek-hainesport-mount-holly'],
      sources: ['https://rcnwt.com/kayak-rentals/'],
    }],
  },
  'rappahannock-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Virginia Outdoor Center',
      url: 'https://www.playva.com/trips/',
      service: 'Canoe and kayak trips end at Motts Run. For the lower end of the Fredericksburg reach, the center also runs a shorter tubing trip to Old Mill Park.',
      routes: ['rappahannock-river-motts-run-old-mill'],
      sources: ['https://www.playva.com/faq/'],
    }],
  },
  'raquette-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'St. Regis Canoe Outfitters',
      url: 'https://www.canoeoutfitters.com/guided-trips/axton-crusher-raquette-river',
      service: 'Guided paddles from Axton Landing to the Crusher. The outfitter also lists both landings for canoe and kayak transportation.',
      routes: ['raquette-river-axton-crusher'],
      sources: ['https://www.canoeoutfitters.com/rentals-services/canoekayak-transportation'],
    }],
  },
  'red-cedar-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Ma’s Irvington Campground & Rentals',
      url: 'https://www.masirvingtoncampground.com/rental-services',
      service: 'Rent canoes or kayaks for the Menomonie to Downsville portion of the Red Cedar. Shorter trips start at the campground.',
      routes: ['red-cedar-river-menomonie-dunnville'],
    }],
  },
  'red-cedar-river-east-lansing': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Town Adventures',
      url: 'https://adventures.rivertownadventures.com/banks-of-the-red-cedar',
      service: 'By advance request, paddle the portion from Ferguson Park in Okemos through the Michigan State campus as part of the outfitter’s longer trip to Lansing.',
      routes: ['red-cedar-river-roadside-msu'],
    }],
  },
  'red-cedar-river-williamston': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Town Adventures',
      url: 'https://www.redcedarriver.org/riverdayinfo',
      service: 'The water trail organizer lists kayak rentals from McCormick Park during River Day. Check the event schedule before planning a rental.',
      routes: ['red-cedar-river-mccormick-roadside'],
    }],
  },
  'red-lake-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Oliver’s Canoe Outfitters',
      url: 'https://www.visitriverland.net/waterways',
      service: 'Canoe and kayak rentals with river drop-off and pickup by arrangement. The regional tourism office lists service from Red Lake Falls through Crookston to Fisher.',
      routes: ['red-lake-river-crookston-fisher', 'red-lake-river-crookston-highway-75-bypass', 'red-lake-river-highway-75-bypass-fisher', 'red-lake-river-huot-crookston', 'red-lake-river-huot-highway-75-bypass'],
      sources: ['https://www.exploreminnesota.com/profile/olivers-canoe-outfitters/5432'],
    }],
  },
  'red-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Local tourism lists whitewater outfitters on the Wolf, and the Weed Dam to Zeimer’s Falls river guide describes private access logistics. No commercial service was verified for this Red River reach.',
    sources: ['https://www.shawanocountry.com/sports-and-recreation/', 'https://wisconsintrailguide.com/paddle/red-river.html'],
  },
  'red-river-of-the-north': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Boathouse on the Red',
      url: 'https://www.visitgrandforks.com/directory/boathouse-on-the-red/',
      service: 'Seasonal canoe, kayak and paddleboard rentals from Riverboat Road in downtown Grand Forks, just north of the Sorlie Bridge.',
      routes: ['red-river-lincoln-drive-downtown'],
    }],
  },
  'redbank-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Redbank Valley Outfitters advertises kayak rentals and shuttles on the creek. A published service point on the Climax to St. Charles reach could not be confirmed.',
    sources: ['https://www.redbankvalleyoutfitters.com/', 'https://www.redbankvalleytrails.org/maps/'],
  },
  'redwood-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Lake Redwood Paddle Share',
      url: 'https://redwoodareacommunitycenter.com/lake-redwood-paddle-share/',
      service: 'Reserve a kayak or paddleboard for a round trip from the Lake Redwood rental station in Redwood Falls. Return equipment to the same station.',
      routes: [],
      sources: ['https://www.dnr.state.mn.us/state-water-trails/redwood-river/segments-maps.html'],
    }],
  },
  'reed-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Wythe County documents access at Kents Lane and Millers Creek. The regional livery is on the New River at Foster Falls. No service for the Reed Creek Blueway was verified.',
    sources: ['https://www.wytheco.org/294/The-Reed-Creek-Blueway', 'https://visitwytheville.com/new-river-trail-state-park/'],
  },
  'rehoboth-bay-delaware': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Delaware Seashore State Park',
      url: 'https://sites.google.com/view/dsspprograms/programs',
      service: 'The park schedules guided kayak trips from Savages Ditch through the marshes of Rehoboth Bay. Its longer guided trip finishes at Tower Road.',
      routes: ['rehoboth-bay-new-road-savages-ditch'],
    }],
  },
  'rice-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Anoka County documents the Peltier to Long Lake water trail. Its current equipment list does not confirm canoe or kayak rentals for this through trip.',
    sources: ['https://www.anokacountyparks.com/rental-equipment', 'https://www.anokacountyparks.com/rice-creek-water-trail'],
  },
  'rio-chama-new-mexico': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'New Mexico River Adventures',
      url: 'https://www.newmexicoriveradventures.com/rivers-we-raft/rio-chama/',
      service: 'Guided multiday Rio Chama rafting through the wilderness below El Vado, with shorter trips on the lower canyon above Big Eddy.',
      routes: ['rio-chama-chavez-big-eddy', 'rio-chama-el-vado-big-eddy', 'rio-chama-el-vado-chavez'],
      sources: ['https://www.blm.gov/programs/recreation/permits-and-passes/lotteries-and-permit-systems/new-mexico/rio-chama-river'],
    }],
  },
  'rio-grande': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Big Bend River Tours',
      url: 'https://bigbendrivertours.com/shuttles.html',
      service: 'Arrange river shuttles for Santa Elena Canyon or for Mariscal Canyon between Talley and Solis.',
      routes: ['rio-grande-lajitas-santa-elena-canyon', 'rio-grande-mariscal-canyon-talley-solis'],
    }],
  },
  'rio-grande-new-mexico': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'New Mexico River Adventures',
      url: 'https://www.newmexicoriveradventures.com/trips/',
      service: 'Choose among guided Taos Box whitewater, family floats in Orilla Verde and Racecourse rafting below Quartzite. Check the itinerary for the landings used on each trip.',
      routes: ['rio-grande-john-dunn-taos-junction', 'rio-grande-quartzite-county-line', 'rio-grande-taos-junction-quartzite', 'rio-grande-taos-junction-lone-juniper', 'rio-grande-lone-juniper-quartzite'],
      sources: ['https://www.fws.gov/rivers/sites/rivers/files/2024-07/rio-grande-nm-plan.pdf'],
    }],
  },
  'rivanna-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Fluvanna County Parks and Recreation',
      url: 'https://www.fluvanna.gov/parksrec',
      service: 'Check the county’s recreation schedule for guided Crofton to Palmyra kayak outings. Its published river program includes a shuttle from the Palmyra landing.',
      routes: ['rivanna-river-crofton-palmyra'],
      sources: ['https://www.fluvannacounty.org/sites/default/files/fileattachments/parks_and_recreation/page/12031/2025_summer_program_guide_web.pdf'],
    }],
  },
  'roanoke-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Roanoke Mountain Adventures',
      url: 'https://www.roanokemountainadventures.com/kayaks',
      service: 'The Wasena Park shop rents kayaks for self-transport on the Roanoke. Check its latest shuttle notice and arrange your own transport for a gear-only rental.',
      routes: ['roanoke-river-salem-rotary-wasena'],
    }],
  },
  'roaring-fork-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Aspen Whitewater Rafting',
      url: 'https://aspenwhitewater.com/rafting/',
      service: 'Guided whitewater trips through Slaughterhouse Falls and a separate paddleboard rental and shuttle for the North Star reach above Aspen.',
      routes: ['roaring-fork-slaughterhouse', 'roaring-fork-south-gate-north-star'],
      sources: ['https://aspenwhitewater.com/rafting/slaughterhouse-falls/', 'https://aspenwhitewater.com/rafting/stand-up-paddle-board-rental-and-shuttle/'],
    }],
  },
  'rock-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Drift Away Paddle Company',
      url: 'https://www.driftawaypaddleco.com/services-rates',
      service: 'Canoe and kayak rentals with shuttles on the lower Yahara and Rock rivers in the Edgerton area. Takeout options vary with the water level.',
      routes: [],
    }],
  },
  'roeliff-jansen-kill': {
    reviewedOn: '2026-11-24',
    noMatch: 'Germantown documents the public launch at Roe-Jan Kill Park. A local outfitter serving the out-and-back paddle from Dales Bridge Road could not be confirmed.',
    sources: ['https://germantownny.org/recreational-facilities/', 'https://www.germantownpc.org/'],
  },
  'rondout-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'A Day Away Kayak Rentals',
      url: 'https://visitulstercountyny.com/plan-your-visit/things-to-do/a-day-away-kayak-rentals/',
      service: 'Rent a canoe or kayak on Rondout Creek at Eddyville, the upstream turnaround for the Kingston loop.',
      routes: ['rondout-creek-kingston-eddyville-loop'],
      sources: ['https://www.kingston-ny.gov/content/8391/8409/'],
    }],
  },
  'root-river-minnesota': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Root River Outfitters',
      url: 'https://www.rootriveroutfitters.net/kayakshorttrip',
      service: 'Rent a kayak for the Old Barn Resort to Lanesboro portion of the South Branch. The trip ends above Lanesboro Dam at Riverview Campground.',
      routes: ['root-river-preston-lanesboro'],
    }],
  },
  'root-river-wisconsin': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Bend Nature Center',
      url: 'https://riverbendracine.org/rentals/equipment-rental/',
      service: 'Rent a canoe or kayak at the nature center’s Root River landing upstream of Horlick Dam. The center suspends rentals when flows are high.',
      routes: ['root-river-five-mile-horlick'],
      sources: ['https://www.racinecounty.gov/departments/public-works-and-development-services/parks-department/boat-launches'],
    }],
  },
  'rum-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rum River Kayaking',
      url: 'https://www.rumriverkayaking.com/book-a-trip',
      service: 'The outfitter delivers kayaks to North County Park in St. Francis and collects them at Central Regional Park in Ramsey. Paddlers arrange their own return ride.',
      routes: ['rum-river-north-county-central'],
    }],
  },
  'russell-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Green River Paddle Trail',
      url: 'https://www.greencountykyrvpark.com/adventure-opportunities',
      service: 'The trail’s rental coordinator arranges canoe and kayak outings in Green County. The trail includes lower Russell Creek. Confirm available launches when scheduling.',
      routes: [],
      sources: ['https://www.greensburgonline.com/o/cog/page/green-river-paddle-trail'],
    }],
  },
  'russian-river-california': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River’s Edge Kayak & Canoe',
      url: 'https://riversedgekayakandcanoe.com/trips/the-rio-trip/',
      service: 'The Rio Trip shuttles paddlers five miles upstream of Healdsburg for a self-guided float back to Veterans Memorial Beach.',
      routes: ['russian-river-del-rio-healdsburg'],
    }, {
      name: 'King’s Sport & Tackle',
      url: 'https://www.kingsrussianriver.com/blank',
      service: 'Seasonal kayak rentals from Guerneville to Monte Rio. The shop also rents boats for self-transport.',
      routes: ['russian-river-guerneville-monte-rio-planning'],
    }, {
      name: 'Burke’s Canoe Trips',
      url: 'https://burkescanoetrips.com/',
      service: 'Self-guided canoe and kayak trips from Forestville downstream to the outfitter’s pickup near Guerneville.',
      routes: ['russian-river-forestville-guerneville'],
    }, {
      name: 'Russian River Adventures',
      url: 'https://russianriveradventures.com/full-day-memorial-beach-to-wohler-bridge-9-miles/',
      service: 'Book the full-day paddle from Healdsburg’s Memorial Beach to Wohler Bridge.',
      routes: ['russian-river-healdsburg-wohler'],
    }],
  },
  'sacandaga-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sacandaga Outdoor Center',
      url: 'https://www.4soc.com/rafting/',
      service: 'Guided rafting below Stewart’s Bridge Dam on the lower Sacandaga, finishing at the outfitter’s riverside base in Hadley.',
      routes: ['sacandaga-river-stewarts-bridge-hudson'],
      sources: ['https://passageport.org/things-to-do/sacandaga-whitewater-recreation-area/'],
    }],
  },
  'saco-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Saco River Canoe & Kayak',
      url: 'https://www.sacorivercanoe.com/maine-canoe-kayak-rentals/',
      service: 'Rent canoes or kayaks from Swan’s Falls in Fryeburg. The outfitter serves Canal Bridge and offers overnight trips ending at Brownfield Bridge.',
      routes: ['saco-river-fryeburg-brownfield', 'saco-river-route-160-brownfield'],
    }],
  },
  'saco-river-new-hampshire': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Saco Canoe Rental Company',
      url: 'https://www.sacorivertubing.com/canoe-kayak',
      service: 'Rent canoes or kayaks for the North Conway corridor near Cathedral Ledge. A separate inflatable kayak outing runs the Redstone rapids below Conway’s covered bridge.',
      routes: ['saco-river-first-bridge-davis-park', 'saco-river-davis-park-smith-eastman'],
    }],
  },
  'saint-croix-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Canoe the Wild',
      url: 'https://canoethewild.com/st-croix-river-canoe-trips/',
      service: 'Guided upper St. Croix canoe trips from Vanceboro to Little Falls, Loon Bay or Kellyland, depending on the itinerary.',
      routes: ['saint-croix-river-lambert-dyer'],
    }],
  },
  'salem-river-new-jersey': {
    reviewedOn: '2026-11-24',
    noMatch: 'New Jersey documents the Mannington launch. A historical club paddle starts there, but current rentals or outfitted trips on the route to Salem could not be confirmed.',
    sources: ['https://dep.nj.gov/nrr/restoration/completed-restoration-projects/salem-river-boat-ramp/', 'https://wilmingtontrailclub.org/events/salem-river-nj/'],
  },
  'saline-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Saline River Canoe',
      url: 'https://www.salinerivercanoe.com/booking/',
      service: 'Paddle from Peeler Bend to Lyle Park with a canoe or kayak rental and an upstream shuttle. Private-boat shuttles are also available.',
      routes: ['saline-river-peeler-bend-lyle-park'],
    }],
  },
  'salmon-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paddle-N-More',
      url: 'https://www.lansingtownny.gov/1257/Myers-Park',
      service: 'Rent canoes, kayaks or paddleboards at Myers Park where Salmon Creek enters Cayuga Lake. The rental station serves the lake end of this route.',
      routes: ['salmon-creek-ludlowville-cayuga-lake'],
      sources: ['https://cayugalake.com/locations/blueway-destinations/paddle-n-more-myers-park/'],
    }],
  },
  'salmon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Healy Outdoors',
      url: 'https://healyoutdoors.com/river-trips',
      service: 'Guided drift-boat fishing trips on New York’s Salmon River. The guide chooses the day’s water based on river conditions.',
      routes: [],
    }],
  },
  'salt-river-arizona': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Saguaro Lake Guest Ranch',
      url: 'https://www.saguarolakeranch.com/shuttles',
      service: 'Reserve a kayak or paddleboard and check the shuttle schedule for Water Users to Phon D Sutton or Phon D Sutton to Granite Reef.',
      routes: ['salt-river-water-users-phon-d', 'salt-river-phon-d-granite-reef'],
      sources: ['https://www.saguarolakeranch.com/kayak-paddleboard'],
    }],
  },
  'saluda-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Saluda Shoals Park',
      url: 'https://icrc.net/programs-and-activities/kayak-rentals-saluda-shoals-park',
      service: 'Rent a kayak for the park’s section of the lower Saluda. Rentals include a shuttle from the park’s lower boat launch. Confirm separate transport for a Gardendale finish.',
      routes: ['saluda-river-saluda-shoals-gardendale'],
    }],
  },
  'san-antonio-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Canoe Trail Goliad',
      url: 'https://canoetrailgoliad.com/member-registration/',
      service: 'Members of the local paddling nonprofit can reserve boats for the Goliad Paddling Trail, which connects Riverdale Lane with Goliad State Park.',
      routes: ['san-antonio-river-riverdale-goliad-state-park'],
      sources: ['https://tpwd.texas.gov/boating/paddling-trails/south-texas-plains/goliad/'],
    }, {
      name: 'Mission Kayak',
      url: 'https://www.missionkayak.com/faq.html',
      service: 'The operator lists kayak outings on the King William stretch near downtown San Antonio.',
      routes: [],
    }],
  },
  'san-juan-river-new-mexico': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Desert River Guides',
      url: 'https://desertriverguides.com/',
      service: 'Guided floats on the San Juan at Farmington. The Among the Waters and Westland trips can be combined for a longer float toward Kirtland.',
      routes: ['san-juan-river-among-waters-westland-park', 'san-juan-river-westland-lions-park', 'san-juan-river-among-waters-lions-park'],
      sources: ['https://farmingtonnm.org/listings/desert-river-guides'],
    }],
  },
  'san-marcos-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Texas Canoes & Kayaks',
      url: 'https://www.texascanoesandkayaks.com/rental-san-marcos',
      service: 'Rent a canoe or kayak for the 6.5-mile float from San Marcos City Park to the San Marcos River Retreat.',
      routes: ['san-marcos-river-city-park-smrr'],
    }],
  },
  'san-miguel-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Telluride Outside',
      url: 'https://tellurideoutside.com/guide-services/rafting/',
      service: 'The outfitter’s Lower River half-day rafting trip runs nine miles from Specie Creek to the Beaver Creek access.',
      routes: ['san-miguel-river-specie-beaver'],
    }],
  },
  'sangerfield-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Hamilton and Madison County document the Nine Mile Park launch. No equipment rental or outfitted trip from Wickwire Road on the Sangerfield was confirmed.',
    sources: ['https://townofhamiltonny.gov/218/9-Mile-Park', 'https://www.visitmadisoncny.com/directory/9-mile-park/'],
  },
  'santa-fe-river-florida': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rum 138',
      url: 'https://rum138.com/rent',
      service: 'Rent a kayak, paddleboard or canoe and arrange transportation for the Santa Fe between the US 27 bridge, Rum Island and the SR 47 bridge.',
      routes: ['santa-fe-river-us27-rum-island', 'santa-fe-river-rum-island-sr47'],
      sources: ['https://www.highsprings.gov/parksrec/page/santa-fe-canoe-outpost'],
    }],
  },
  'saranac-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Adirondack Lakes & Trails Outfitters',
      url: 'https://www.adirondackoutfitters.com/trips/second-pond-to-saranac-lake',
      service: 'A self-guided trip from Second Pond to Lake Flower includes rental equipment and transport to the launch.',
      routes: ['saranac-river-second-pond-lake-flower'],
    }],
  },
  'sauk-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Riverside Resort',
      url: 'https://www.riversideresortmn.com/resort-amenities.html',
      service: 'Registered guests can use canoes, kayaks and paddleboards at Cedar Island Lake, where the Sauk River passes through the Horseshoe Chain.',
      routes: [],
      sources: ['https://www.riversideresortmn.com/faqs.html'],
    }],
  },
  'schoharie-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Upstate Kayak Rentals',
      url: 'https://eriecanalway.org/explore/watertrail/paddling-rentals',
      service: 'Rent a kayak at Schoharie Crossing State Historic Site in Fort Hunter, at the confluence with the Mohawk.',
      routes: ['schoharie-creek-burtonsville-fort-hunter'],
    }, {
      name: 'Schoharie Valley Kayak Rentals',
      url: 'https://www.schoharievillage.org/outdoor-adventure',
      service: 'Based in Schoharie village between Middleburgh and Central Bridge, the livery rents paddlecraft and arranges guided trips and creek shuttles by appointment.',
      routes: ['schoharie-creek-middleburgh-central-bridge'],
      sources: ['https://visitschohariecounty.com/listing/schoharie-county-kayak-rentals', 'https://paddlethecreek.com/'],
    }],
  },
  'schroon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Warrensburg Travel Park',
      url: 'https://www.warrensburgtravelpark.com/kayak-canoe-row-boat-tube-rentals-campground/',
      service: 'Kayak and tube rentals from the campground’s Schroon River frontage near Warrensburg. Check with the campground about launch and return arrangements.',
      routes: [],
    }],
  },
  'sebec-lake': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Two Falls Camps',
      url: 'https://twofalls.com/boat-rentals/',
      service: 'Rent an Old Town canoe by the day or week on Sebec Lake.',
      routes: ['sebec-lake-dover-sebec'],
    }],
  },
  'selway-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Selway River Adventures',
      url: 'https://www.selwayriver.com/the-selway',
      service: 'Guided multiday wilderness rafting on the Selway from the Paradise corridor to the takeout above Selway Falls.',
      routes: ['selway-paradise-selway-falls'],
    }],
  },
  'seneca-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Montezuma Audubon offers equipped kayak excursions in the wetlands complex. The published tour information does not identify the Howland Island loop as a serviced route.',
    sources: ['https://www.audubon.org/montezuma/explore/programs-montezuma-audubon-center', 'https://friendsofmontezuma.org/visit-the-mwc/'],
  },
  'sheboygan-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'City of Sheboygan Falls',
      url: 'https://www.seehafernews.com/2026/05/29/kayak-rentals-now-available-at-river-park-in-sheboygan-falls/',
      service: 'Use the self-service rental station beside the River Park boat launch for a local paddle at the Sheboygan Falls end of the route.',
      routes: ['sheboygan-river-dassow-river-park'],
      sources: ['https://www.facebook.com/share/p/1JVDmRUY2m/'],
    }],
  },
  'shell-rock-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Albert Lea Community Education',
      url: 'https://www.cityofalbertlea.org/departments/parks/parks-trails-fun-spots/brookside-park/',
      service: 'Seasonal canoe and kayak rentals at Brookside Park in Albert Lea, at the upper end of Minnesota’s Shell Rock water trail.',
      routes: [],
      sources: ['https://www.cityofalbertlea.org/parks_trails_fun_spo/shell-rock-river-water-trail/'],
    }],
  },
  'sheyenne-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Fort Ransom State Park',
      url: 'https://www.parkrec.nd.gov/fort-ransom-state-park',
      service: 'Rent canoes or kayaks for the Sheyenne River at Fort Ransom State Park. Check with the park for pickup and return arrangements.',
      routes: [],
      sources: ['https://www.parkrec.nd.gov/equipment-rentals'],
    }],
  },
  'shoal-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The older Undercliff canoe listing is unavailable. Current tourism information confirms float trips at Grand Falls downstream of Wildcat, and no provider was verified for the Tipton Ford reach.',
    sources: ['https://www.visitjoplinmo.com/directory/zans-creekside-rv-park-camping-and-floating/', 'https://mdc.mo.gov/discover-nature/places/tipton-ford-access', 'https://www.riversbendfamilyresort.com/glamping'],
  },
  'sinepuxent-bay-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Assateague Outfitters',
      url: 'https://www.assateagueoutfitters.com/hours.html',
      service: 'Seasonal kayak, canoe and paddleboard rentals and wildlife tours at the national seashore’s Bayside rental stand.',
      routes: ['sinepuxent-bay-bayside-drive-loop'],
      sources: ['https://www.assateagueoutfitters.com/faq.html'],
    }],
  },
  'sipsey-fork-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Riverside Fly Shop',
      url: 'https://riversideflyshop.com/kayaking/',
      service: 'Rent a sit-on-top kayak for the Sipsey Fork tailwater near Highway 69 below Smith Lake Dam. The shop publishes launch options and its upstream limit.',
      routes: [],
    }],
  },
  'skagit-river-washington': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'North Sound Scenic Tours',
      url: 'https://www.northsoundscenictours.com/tours.html',
      service: 'Scenic guided floats from Marblemount to Howard Miller Steelhead Park in Rockport, including seasonal eagle-watching trips.',
      routes: ['skagit-river-marblemount-howard-miller'],
    }, {
      name: 'Alpine Adventures',
      url: 'https://alpineadventures.com/skagit-river-whitewater-rafting/',
      service: 'Guided Skagit whitewater rafting from Goodell Creek near Newhalem on the upper river.',
      routes: ['skagit-river-goodell-copper'],
      sources: ['https://www.nps.gov/thingstodo/rafting-in-the-north-cascades.htm'],
    }],
  },
  'skunk-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Sioux Falls Kayak Rental advertises a Big Sioux paddle starting at Farm Field. Its service information does not confirm the Skunk Creek approach from Legacy Park.',
    sources: ['https://www.siouxfallskayakrentals.com/services', 'https://siouxempirepaddlers.org/rivers-and-creeks/'],
  },
  'skunk-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Basin Canoe & Kayak',
      url: 'https://www.canoeskayaks.com/rentals.htm',
      service: 'Pick up rental canoes or kayaks in Burlington for a self-shuttled paddle. The outfitter’s usual guided logistics on the Skunk are upstream near Oakland Mills and Lowell.',
      routes: ['skunk-river-cottonwood-sycamore'],
      sources: ['https://desmoinescounty.iowa.gov/conservation/parks/welter_recreation_area/'],
    }],
  },
  'slate-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Kentucky Fish and Wildlife documents the Lions Club to Old Slate Furnace float. A rental, shuttle or guided paddle covering the Owingsville reach could not be confirmed.',
    sources: ['https://fw.ky.gov/Fish/Pages/Slate-Creek.aspx', 'https://fw.ky.gov/Education/Pages/Slate-Creek.aspx'],
  },
  'slate-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The North Idaho river guide documents the Franklin Mine reach to the St. Joe. Regional listings for the St. Joe do not establish a shuttle or guide on Slate Creek itself.',
    sources: ['https://www.northidahorivers.com/St_Joe_Slate_Creek.htm', 'https://www.americanwhitewater.org/content/River/view/river-detail/4153/main'],
  },
  'slippery-rock-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The club runs a whitewater clinic at McConnells Mill. Its published itinerary does not establish instruction on the lower Eckert-to-Harris reach.',
    sources: ['https://www.threeriverspaddlingclub.org/slip-clinic-2026', 'https://www.americanwhitewater.org/content/River/view/river-detail/2504/main'],
  },
  'smith-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'American Whitewater documents the Smith Creek hydro run and flow management. No outfitted trip or shuttle was verified for the creek above Smith Falls.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/627/main', 'https://www.americanwhitewater.org/project/smith-creek-management-id/'],
  },
  'smith-island-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: '3 Knots Marine',
      url: 'https://sites.google.com/view/3knotsmarine/home/kayak-rentals-and-tours',
      service: 'Rent a kayak or join a local guide for a two-hour Smith Island paddle departing from Ewell.',
      routes: ['smith-island-ewell-loop'],
      sources: ['https://www.smithisland.org/rentals-activities'],
    }],
  },
  'smith-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Smith River Adventures',
      url: 'https://smithriveradventures.com/paddling/',
      service: 'Kayak rentals and shuttles on the Smith River at Bassett. Confirm the launch and takeout with the operator when booking.',
      routes: ['smith-river-bassett-great-road'],
      sources: ['https://smithriveradventures.com/faq/'],
    }],
  },
  'snake-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pine City River Rentals',
      url: 'https://www.pinecityriverrentals.com/rentals',
      service: 'Rent a kayak or canoe for the Snake River and Cross Lake in the Pine City area. The operator offers local delivery.',
      routes: ['snake-river-canary-cross-lake'],
    }],
  },
  'snake-river-auger-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Twin Falls visitor information documents guided trips from Centennial Park toward Pillar Falls. An operator covering the Auger Falls to Broken Bridge reach could not be verified.',
    sources: ['https://visitsouthidaho.com/adventure/pillar-falls/', 'https://www.americanwhitewater.org/content/River/view/river-detail/11437/main'],
  },
  'snake-river-birds-of-prey-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Idaho Guide Service',
      url: 'https://idahoguideservice.com/rafting-trips/birds-of-prey-white-water-rafting-in-hagerman-idaho/',
      service: 'Join a guided scenic float from Swan Falls Dam to Celebration Park on the upper portion of the route to Walters Ferry.',
      routes: ['snake-river-swan-falls-walters-ferry'],
    }],
  },
  'snake-river-hagerman-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Idaho Guide Service',
      url: 'https://idahoguideservice.com/rafting-trips/whitewater-rafting-hagerman-idaho-hagerman/',
      service: 'Guided whitewater rafting on the Snake’s Hagerman reach, meeting below Lower Salmon Falls Dam.',
      routes: ['snake-river-lower-salmon-falls-bliss'],
    }],
  },
  'snake-river-hells-canyon-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'OARS',
      url: 'https://www.oars.com/before-you-go/snake-river-rafting-through-hells-canyon/',
      service: 'Guided multiday Snake River trips through Hells Canyon. Shorter itineraries take out at Pittsburg Landing and longer trips continue to Heller Bar.',
      routes: ['snake-river-hells-canyon-dam-pittsburg', 'snake-river-pittsburg-heller-bar'],
    }],
  },
  'snake-river-milner-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Idaho Power documents the Milner release and Class V reach. Commercial rafting found on the Hagerman and Murtaugh stretches did not establish a guide for the Milner Mile.',
    sources: ['https://www.idahopower.com/recreation/water-information/milner-whitewater-information/', 'https://idahoguideservice.com/rafting-trips/'],
  },
  'snake-river-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Barker-Ewing Scenic Float Trips',
      url: 'https://barkerewing.com/where-to-meet/',
      service: 'Guided scenic floats through Grand Teton National Park from Deadmans Bar to Moose, with the group meeting in Moose Village.',
      routes: ['snake-river-deadmans-bar-moose'],
    }, {
      name: 'Jackson Hole Whitewater',
      url: 'https://jhww.com/whitewater/',
      service: 'Guided rafting for the eight-mile Snake River Canyon run from West Table to Sheep Gulch.',
      routes: ['snake-river-west-table-sheep-gulch'],
    }],
  },
  'snoqualmie-river-washington': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Fall City Floating',
      url: 'https://www.fallcityfloating.com/faq1',
      service: 'Rent a tube or reserve a shuttle pass for the Snoqualmie float from Plum Boat Launch to Fall City.',
      routes: ['snoqualmie-river-plum-fall-city'],
    }],
  },
  'south-branch-black-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The DEC documents the South Lake access. No local operator was confirmed for the South Branch out-and-back from this launch.',
    sources: ['https://dec.ny.gov/places/black-river-wild-forest', 'https://www.americanwhitewater.org/content/River/view/river-detail/1258/main'],
  },
  'south-branch-grass-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Raquette River Outfitters',
      url: 'https://www.tupperlake.com/guide-services/raquette-river-outfitters',
      service: 'Rent a lightweight canoe in Tupper Lake to transport yourself to the Balsam Pond carry on Route 3.',
      routes: ['balsam-pond-carry-south-branch-grass-river'],
      sources: ['https://www.tupperlake.com/paddling/balsam-pond-to-grass-river-flow', 'https://www.raquetteriveroutfitters.com/'],
    }],
  },
  'south-branch-kishwaukee-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Genoa Township Park District specifies Carroll Park to Kingston Park in its rental agreement. Its trips end where the Kingston to Irene route starts. Service farther downstream could not be confirmed.',
    sources: ['https://www.genoaparkdistrict.com/canoe-and-kayak-rental/', 'https://www.genoaparkdistrict.com/wp-content/uploads/2021/03/canoe-kayak-rental-agreement.pdf'],
  },
  'south-branch-moose-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'DEC and American Whitewater document the special access arrangements for passage across Adirondack League Club land. An outfitter for the Rock Dam to McKeever run could not be confirmed.',
    sources: ['https://extapps.dec.ny.gov/docs/lands_forests_pdf/mrpwfump.pdf', 'https://www.americanwhitewater.org/content/River/view/river-detail/1355/main'],
  },
  'south-branch-raritan-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Philadelphia Canoe Club',
      url: 'https://philacanoe.org/Paddling-Trips',
      service: 'Check the club’s trip calendar for South Branch paddles. Its Clinton to Stanton Station outing follows this stretch. Ask the trip coordinator about available rental gear.',
      routes: ['south-branch-raritan-river-sunnyside-stanton-station'],
      sources: ['https://pcc40.wildapricot.org/event-5249773'],
    }],
  },
  'south-chickamauga-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Tennessee Valley Canoe Club',
      url: 'https://www.tvccpaddler.org/content.aspx?club_id=409132&item_id=2854226&page_id=4091',
      service: 'The club has organized the five-mile Shallowford to Sterchi Farm float. Check its calendar for upcoming trips and participation requirements.',
      routes: ['south-chickamauga-creek-shallowford-sterchi'],
    }],
  },
  'south-fork-boise-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Anderson Ranch to Danskin Bridge is documented as a float-fishing reach. The similarly named South Fork Shuttle serves the Snake River, and a Boise River operator for this reach was not verified.',
    sources: ['https://visitidaho.org/things-to-do/fishing/south-fork-of-the-boise-river/', 'https://www.southforkshuttle.com/'],
  },
  'south-fork-catawba-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Catawba Riverkeeper',
      url: 'https://www.catawbariverkeeper.org/riverfest',
      service: 'The Riverkeeper offers scheduled paddles and kayak rentals around McAdenville. Past trips include Spencer Mountain to McAdenville and the stretch downstream toward Cramerton.',
      routes: ['south-fork-catawba-spencer-mcadenville', 'south-fork-catawba-mcadenville-cramerton'],
      sources: ['https://www.catawbariverkeeper.org/summer-activities-and-events-with-catawba-riverkeeper', 'https://www.catawbariverkeeper.org/floating-concert'],
    }],
  },
  'south-fork-clearwater-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'Regional guide permits and trip offerings reviewed cover the Middle Fork Clearwater, Selway and Lochsa. No provider was verified for Bully Creek or Golden Canyon on the South Fork.',
    sources: ['https://www.fs.usda.gov/media/61266', 'https://www.americanwhitewater.org/content/River/view/river-detail/545/main'],
  },
  'south-fork-coeur-dalene-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The local paddling guide documents the Mullan to Wallace whitewater reach. No licensed paddling trip or shuttle service on that stretch was confirmed.',
    sources: ['https://www.northidahorivers.com/CDA_South_Fork.htm', 'https://visitidaho.org/travel-tips/a-guide-to-idahos-whitewater-rafting-adventures/'],
  },
  'south-fork-crow-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Lake Rebecca Park Reserve lists lake activities and separate carry-in access to the Crow. A provider serving the Hutchinson or Delano river stretches could not be confirmed.',
    sources: ['https://www.threeriversparks.org/location/lake-rebecca-park-reserve', 'https://www.dnr.state.mn.us/state-water-trails/crow-river-south-fork/segments-maps.html'],
  },
  'south-fork-flambeau-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Big Bear Recreational Rentals',
      url: 'https://www.travelwisconsin.com/stay/cabins/big-bear-recreational-rentals',
      service: 'The Winter-area livery lists canoe rentals and transportation for South Fork trips. Confirm the landings it can serve before setting out.',
      routes: ['south-fork-flambeau-county-w-county-m'],
      sources: ['https://bigbearrecreationalrentals.com/water-sports.html', 'https://dnr.wisconsin.gov/topic/StateForests/flambeauriver/recreation/paddle'],
    }],
  },
  'south-fork-holston': {
    reviewedOn: '2026-11-24',
    noMatch: 'Virginia documents the Damascus-area float. Bike shuttles along the Creeper Trail and listings for other Holston forks do not confirm boat service between Route 58 and Alvarado.',
    sources: ['https://dwr.virginia.gov/waterbody/holston-river-south-fork/', 'https://visitdamascus.org/the-virginia-creeper-trail/', 'https://fishblueridge.com/outfitters/'],
  },
  'south-fork-jump-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Price County documents river access and American Whitewater describes local shuttling. A boat rental or shuttle service for either South Fork reach could not be verified.',
    sources: ['https://parks.pricecounty.wi.gov/parks/shelters/big_falls_county_park_shelter/', 'https://www.americanwhitewater.org/content/River/view/river-detail/2296/main'],
  },
  'south-fork-kentucky-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Three Forks Adventure Company',
      url: 'https://www.threeforksadventureco.com/services/',
      service: 'Kayak rentals, guided paddles and equipment transport on the South Fork in Lee and Owsley counties. Arrange the launch and takeout with the Beattyville outfitter.',
      routes: [],
      sources: ['https://fw.ky.gov/Fish/Pages/SFKY_River.aspx'],
    }],
  },
  'south-fork-licking-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Thaxton’s advertises South Fork shuttles within Pendleton County. The Lair to Terry Dam float is in Harrison County, outside the stated shuttle area.',
    sources: ['https://thaxtonscanoe.com/', 'https://fw.ky.gov/Education/Pages/South-Fork-Licking-River.aspx'],
  },
  'south-fork-ogden-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Weber State Outdoor Program',
      url: 'https://www.weber.edu/outdoor/river-lake-rentals.html',
      service: 'Pick up an inflatable tube or whitewater kayak at Weber State in Ogden for a self-transported outing. The rental center lists equipment options and return terms.',
      routes: ['south-fork-ogden-river-willows-magpie'],
      sources: ['https://www.visitogden.com/blog/family-outdoor-adventures-in-ogden/', 'https://www.recreation.gov/camping/campgrounds/10047995'],
    }],
  },
  'south-fork-payette-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Cascade Raft & Kayak',
      url: 'https://www.cascaderaft.com/activity/south-fork-payette-river-rafting-half-day',
      service: 'Guided half-day whitewater rafting through the lower South Fork’s Staircase section above Banks.',
      routes: ['south-fork-payette-staircase-deer-creek-banks', 'south-fork-payette-deer-creek-banks'],
      sources: ['https://www.blm.gov/visit/payette-river-corridor'],
    }],
  },
  'south-fork-salmon-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'All Rivers Shuttle',
      url: 'https://allriversshuttle.com/rates/',
      service: 'Vehicle shuttle from the Secesh confluence to Vinegar Creek or Carey Creek for multiday South Fork Salmon trips.',
      routes: ['south-fork-salmon-secesh-confluence-vinegar'],
    }],
  },
  'south-fork-shenandoah-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Page Valley lists South Fork outfitters, but Shenandoah River Adventures’ published trips end at Grove Hill or farther upstream. A trip or shuttle from Newport toward White House was not confirmed.',
    sources: ['https://www.shenandoahriveradventures.com/trip-information/', 'https://www.pagevalley.org/things-to-do/attractions/shenandoah-river/outfitters/', 'https://dwr.virginia.gov/waterbody/shenandoah-river-south-fork/'],
  },
  'south-fork-snake-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'South Fork Shuttle',
      url: 'https://www.southforkshuttle.com/book-online',
      service: 'Vehicle shuttles between public river accesses from Palisades Dam to Mike Walker in Roberts. Select your launch and takeout when booking.',
      routes: ['south-fork-snake-palisades-dam-spring-creek', 'south-fork-snake-spring-creek-conant', 'south-fork-snake-conant-byington', 'south-fork-snake-byington-heise', 'south-fork-snake-heise-twin-bridges', 'south-fork-snake-twin-bridges-lorenzo', 'south-fork-snake-lorenzo-menan', 'south-fork-snake-menan-mike-walker'],
      sources: ['https://www.southforkshuttle.com/'],
    }],
  },
  'south-fork-tenmile-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'Greene County lists the launches. The local paddling directory lists rental shops on other waters and does not document boat service from Beagle Club Road to Clarksville.',
    sources: ['https://greenecountypa.gov/resources/1395', 'https://www.kayakgreenecounty.com/rent-kayaks.html'],
  },
  'south-llano-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Bloody Bucket Kayaks and Canoes',
      url: 'https://tpwd.texas.gov/state-parks/south-llano-river',
      service: 'Texas Parks and Wildlife lists this outfitter for kayak and canoe rentals and shuttles at South Llano River State Park. Contact the operator to arrange a stop on the Junction trail.',
      routes: ['south-llano-river-cupgrass-state-park', 'south-llano-river-state-park-flatrock-lane', 'south-llano-river-state-park-junction-city-park'],
      sources: ['https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/'],
    }],
  },
  'south-raccoon-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The county documents the trail between Redfield and Van Meter. The confirmed rental float at Raccoon River Park in West Des Moines is farther downstream.',
    sources: ['https://www.dallascountyiowa.gov/332/Middle-South-Raccoon-River-Water-Trail', 'https://www.canoesportoutfitters.com/raccoonriverrentals'],
  },
  'south-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Waynesboro Parks and Recreation',
      url: 'https://www.waynesboro.va.us/958/9789/Kayak-Rental',
      service: 'Rent a solo or tandem kayak to paddle within Ridgeview Park. The city separately schedules guided trips on the water trail from Ridgeview toward Basic Park.',
      routes: ['south-river-waynesboro-ridgeview-basic'],
      sources: ['https://www.waynesboro.va.us/889/8275/Waynesboro-Water-Trail'],
    }],
  },
  'south-sandy-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The DEC documents lower creek access in Lakeview WMA. The regional outfitter’s named tours are on other waters. No service was verified for the outlet or upstream Route 95 run.',
    sources: ['https://dec.ny.gov/places/lakeview-wildlife-management-area', 'https://tughilloutfitters.com/guided-paddling-trips/'],
  },
  'south-skunk-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Story County lists the water trail, but Iowa State currently suspends paddlecraft rentals and the Ames commercial rental is at Ada Hayden Lake. No service on these river reaches was confirmed.',
    sources: ['https://storycountyiowa.gov/1496/South-Skunk-River-Water-Trail', 'https://cyclonehealth.iastate.edu/adventure', 'https://crawdaddyoutdoors.com/rentals'],
  },
  'spearfish-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The city identifies tubing and fishing at City Park. The tourism outfitter directory does not establish a paddle rental or shuttle to Jorgensen Park.',
    sources: ['https://spearfish.gov/798/Spearfish-City-Park', 'https://visitspearfish.com/things-to-do/outfitters-rentals'],
  },
  'split-rock-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Garretson rental trip returns to its launch above the dam. The separate downstream launch leads to Palisades, and outfitting on that reach could not be confirmed.',
    sources: ['https://www.siouxfallskayakrentals.com/services', 'https://visitgarretsonsd.com/things-to-do/split-rock-park/'],
  },
  'spokane-river-washington': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Spokane River Rafting',
      url: 'https://spokaneriverraft.com/home/whitewater/',
      service: 'Guided rafts launch at TJ Meenach Bridge and run Bowl and Pitcher and Devil’s Toenail before taking out at Plese Flats.',
      routes: ['spokane-river-tj-meenach-plese-flats'],
    }],
  },
  'st-croix-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pardun’s Canoe Rental and Shuttle Service',
      url: 'https://pardunscanoerental.com/danbury/',
      service: 'The Danbury base rents canoes and kayaks and arranges shuttles on the upper St. Croix between Gordon Dam and Highway 70. Confirm your landings when reserving.',
      routes: ['st-croix-river-gordon-dam-riverside', 'st-croix-river-riverside-thayers', 'st-croix-river-thayers-norway-point', 'st-croix-river-sand-creek-highway-70', 'st-croix-river-fox-highway-70'],
      sources: ['https://www.nps.gov/sacn/planyourvisit/paddlesport-and-tube-rentals-sc.htm'],
    }, {
      name: 'Taylors Falls Canoe & Kayak Rental',
      url: 'https://www.taylorsfallscanoe.com/canoe-and-kayak/',
      service: 'Rent canoes or kayaks at Minnesota Interstate State Park for the trip to Osceola or the longer paddle through Osceola to William O’Brien State Park.',
      routes: ['st-croix-river-interstate-osceola', 'st-croix-river-osceola-william-obrien'],
    }],
  },
  'st-joe-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'ROW Adventure Center',
      url: 'https://www.rowadventurecenter.com/st-joe-river-rafting',
      service: 'Guided rafts meet at Gold Creek Campground, run the Tumbledown rapids and return paddlers to their vehicles by bus.',
      routes: ['st-joe-tumbledown-gold-bluff'],
    }],
  },
  'st-john-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Canoes-R-Us',
      url: 'https://www.visitaroostook.com/listing/canoes-r-us',
      service: 'Pick up a canoe or kayak at the Fish River base in Fort Kent for a self-transport trip on the St. John. Call ahead if you need delivery to a landing.',
      routes: ['st-john-river-fort-kent-frenchville', 'st-john-river-saint-francis-fort-kent', 'st-john-river-fort-kent-van-buren'],
    }],
  },
  'st-jones-river-delaware': {
    reviewedOn: '2026-11-24',
    noMatch: 'The reserve and byway document access at Lebanon and Scotton. No current public booking for rentals or a guided paddle between the landings was established.',
    sources: ['https://dnrec.delaware.gov/coastal-programs/research-reserve/st-jones/', 'https://delawarebayshorebyway.org/attractions/lebanon-landing/'],
  },
  'st-lawrence-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Blevins RV & Boat Center',
      url: 'https://www.blevinsrvandboat.com/Kayak-Rentals',
      service: 'Pick up a self-service kayak in Massena and transport it to your chosen St. Lawrence River landing. The rental includes a paddle and life jacket.',
      routes: ['st-lawrence-river-louisville-massena'],
    }],
  },
  'st-louis-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Swiftwater Adventures',
      url: 'https://swiftwatermn.com/trips-pricing/whitewater-rafting-st-louis/',
      service: 'Offers guided St. Louis River whitewater rafting near Carlton, downstream of the Floodwood and Brookston routes.',
      routes: [],
    }],
  },
  'st-maries-river-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The University of Idaho describes the Mashburn run. The local equipment rental listing does not establish paddlecraft or shuttle service on the St. Maries River.',
    sources: ['https://stmarieschamber.org/northwest-outdoor-rental-co/', 'https://www.uidaho.edu/-/media/uidaho-responsive/files/current-students/recreation-wellbeing/outdoor-program/regional-outdoor-activities/north-idaho-river-trips.pdf'],
  },
  'st-marys-county-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'PAC Paddle Sports',
      url: 'https://paxadventure.wixsite.com/paddlesports/rentals-new',
      service: 'Rent a kayak or paddleboard at McIntosh Run beside the Port of Leonardtown Winery. Contact the shop about pickup arrangements for a one-way paddle.',
      routes: ['mcintosh-run-port-leonardtown-abells'],
      sources: ['https://www.visitstmarysmd.com/directory/port-of-leonardtown-park-mcintosh-run/'],
    }],
  },
  'st-regis-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Falls campsite lists lodging and river access. St. Regis Canoe Outfitters advertises the canoe wilderness, but outfitting for the mapped river branches was not confirmed.',
    sources: ['https://www.townofwaverlyny.org/campsite', 'https://www.canoeoutfitters.com/guided-trips/guided-overnight-trips'],
  },
  'staunton-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Hazel Branch delivers to Staunton River State Park and surrounding waters near Scottsburg. No delivery or shuttle on the upstream Long Island to Brookneal reach was established.',
    sources: ['https://www.hazelbranchoutfitters.com/', 'https://dwr.virginia.gov/wp-content/uploads/media/Staunton-River-Fisheries-Management-Report-2025.pdf'],
  },
  'stillaguamish-river-washington': {
    reviewedOn: '2026-11-24',
    noMatch: 'The city and county confirm river access at the Arlington parks. No provider offering a trip, rental or shuttle between Twin Rivers and Haller was identified.',
    sources: ['https://www.arlingtonwa.gov/facilities/facility/details/Haller-Park-9', 'https://www.snohomishcountywa.gov/Facilities/Facility/Details/Twin-Rivers-Park-90'],
  },
  'straight-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Owatonna lists paddling on the Straight and rentals at area lakes. The Faribault-area livery equips the Cannon River and Union Lake. No rental on the catalog reaches was confirmed.',
    sources: ['https://owatonna.org/visit/things-to-do/outdoors/water-activities/', 'https://www.farmsteadoutdooradventures.com/'],
  },
  'string-leigh-lakes-wyoming': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Dornans Adventure Sports',
      url: 'https://dornans.com/adventure/',
      service: 'Pick up a lake-use canoe or kayak in Moose and transport it to the String Lake launch. Reaching Leigh Lake from String Lake requires carrying the boat over the portage.',
      routes: ['string-leigh-lakes-portage-loop'],
      sources: ['https://www.nps.gov/grte/planyourvisit/stringleighplan.htm'],
    }],
  },
  'sturgeon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sturgeon River Paddlesports',
      url: 'https://www.sturgeonriverpaddle.com/shuttle-u-haul',
      service: 'The Wolverine livery offers self-transport canoe and kayak rentals for independent trips on the upper Sturgeon. Ask about shuttle availability for Trowbridge and Haakwood.',
      routes: ['sturgeon-river-trowbridge-haakwood'],
    }],
  },
  'sugar-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sugar Valley Canoe Trips',
      url: 'https://www.sugarvalleycanoes.com/trips-and-pricing',
      service: 'Rents boats for Sugar Creek trips through Shades and Turkey Run, including a longer trip through both parks. Check its launch and pickup points when choosing a trip.',
      routes: ['sugar-creek-deers-mill-cox-ford'],
    }],
  },
  'sugar-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'S&B Tubing',
      url: 'https://sandbtubing.com/about.html',
      service: 'Float from the outfitter’s riverfront shop in Albany to its pickup point about four miles downstream, on the Albany-to-Brodhead reach.',
      routes: ['sugar-river-albany-brodhead'],
    }],
  },
  'susquehanna-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Riverside Adventure Company',
      url: 'https://david-decoteau.squarespace.com/day-paddle-trips',
      service: 'Offers Bloomsburg-to-Danville paddle packages with rental boats or shuttle-only service, and a separate Danville-to-Sunbury trip.',
      routes: ['susquehanna-river-pfbc-bloomsburg-montgomery-park'],
    }, {
      name: 'Canoe & Kayak Rentals and Sales',
      url: 'https://canoeandkayakrentals.com/rentals/',
      service: 'Launch a rental in Portlandville on the Susquehanna for access to Goodyear Lake.',
      routes: ['susquehanna-river-crumhorn-goodyear-lake'],
    }, {
      name: 'Endless Mountain Outfitters',
      url: 'https://emo444.com/rates/',
      service: 'The Sugar Run shop offers kayak trips starting at Wysox, Homet’s Ferry and Terrytown. Its Wysox trip continues past Terrytown to the shop.',
      routes: ['susquehanna-river-wysox-township-park-terrytown'],
    }],
  },
  'susquehanna-river-water-trail-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Havre de Grace Marine Center',
      url: 'https://hdgmarinas.com/kayak-sup-rentals/',
      service: 'Rent a kayak or paddleboard in Havre de Grace for local paddling. Groups can reserve customized tours through the marine center. Confirm the itinerary for a trip toward Lapidum.',
      routes: ['susquehanna-river-frank-hutchins-lapidum'],
    }],
  },
  'suwannee-river-florida': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Suwannee River Outpost',
      url: 'https://www.suwanneeoutpost.com/overnight-trips',
      service: 'Rent boats for overnight trips from White Springs through Woods Ferry to the Music Park or downstream to Suwannee River State Park. Its longer itinerary includes Dowling Park, Lafayette Blue Springs, Peacock Slough and Adams Tract. Arrange shuttle stops separately.',
      routes: ['suwannee-river-wayside-woods-ferry', 'suwannee-river-woods-ferry-spirit', 'suwannee-river-spirit-suwannee-state-park', 'suwannee-river-suwannee-state-park-dowling-park', 'suwannee-river-dowling-lafayette-blue', 'suwannee-river-lafayette-blue-peacock-slough', 'suwannee-river-peacock-slough-adams-tract', 'suwannee-river-spirit-dowling-park', 'suwannee-river-spirit-lafayette-blue', 'suwannee-river-spirit-adams-tract', 'suwannee-river-state-park-lafayette-blue', 'suwannee-river-state-park-adams-tract', 'suwannee-river-dowling-peacock-slough', 'suwannee-river-dowling-adams-tract'],
      sources: ['https://www.suwanneeoutpost.com/rentals-and-shuttles'],
    }],
  },
  'tallapoosa-river-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Tallapoosa Wilds',
      url: 'https://www.aotourism.com/listing/tallapoosa-wilds/1764/',
      service: 'Offers canoe and kayak rentals on the Harold Banks Canoe Trail, with a shuttle from Jaybird Landing to the Horseshoe Bend put-in. Call ahead for availability.',
      routes: ['tallapoosa-river-horseshoe-bend-jay-bird'],
      sources: ['https://explorelakemartin.com/the-magical-thing-that-happens-on-the-tallapoosa-river-between-mothers-day-and-fathers-day/'],
    }],
  },
  'taylor-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Three Rivers Resort',
      url: 'https://3riversresort.com/rafting/',
      service: 'Offers guided floats on the lower Taylor into Almont and whitewater trips farther upstream.',
      routes: ['taylor-river-five-mile-almont'],
      sources: ['https://www.harmels.com/whitewater-rafting'],
    }],
  },
  'terrapin-creek-alabama': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Nelson’s Redneck Yacht Club',
      url: 'https://redneckyachtclub.rentals/directions-%26-maps',
      service: 'Rent a canoe or kayak for the lower creek. Trips use the private launch on County Road 175 and take out at Hippie Hole or County Road 59, with a shuttle back to the launch before paddling.',
      routes: ['terrapin-creek-cr8-ellisville'],
      sources: ['https://www.piedmontcity.org/parks/terrapin-creek', 'https://alabamarecreationtrails.org/trail/terrapin-creek-county-road-8-to-ellisville/'],
    }],
  },
  'teton-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wai Mauna',
      url: 'https://www.paddleboarddriggs.com/',
      service: 'Rents kayaks and paddleboards for the valley section, with shuttled trips between South Bates, Bates, Big Eddy and Packsaddle. Driggs pickup is available for self-transport.',
      routes: ['teton-river-upper-fox-creek-highway-33'],
    }],
  },
  'tilghman-bay-hundred-water-trails-maryland': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Tilghman Island Marina & Rentals',
      url: 'https://tourtalbot.org/place/tilghman-island-marina-rentals-66eb1d393625521b93bcf6d0/',
      service: 'Rent canoes, kayaks or paddleboards from the marina at Knapps Narrows on Tilghman Island. Ask the marina which water trails you can reach from its dock.',
      routes: [],
    }],
  },
  'tioga-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Chemung River Friends documents a guided trip starting at Mulholland and continuing downstream. Service on the upstream Lindley to Mulholland reach could not be confirmed.',
    sources: ['https://www.chemungriverfriends.org/resources.html', 'https://www.discoverchemung.com/event/guided-river-paddle%3A-mullholland-rd-to-conhocton-street-boat-launch/2018/'],
  },
  'tioughnioga-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Take Adventures Everyday',
      url: 'https://www.takeadventureseveryday.com/',
      service: 'The outfitter’s longer paddle starts in Whitney Point, follows the Tioughnioga through Chenango Forks, and continues on the Chenango to its Port Crane meeting point.',
      routes: ['tioughnioga-river-itaska-chenango-forks'],
    }],
  },
  'toccoa-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Toccoa River Outfitter',
      url: 'https://www.toccoariveroutfitter.com/river-trips.php',
      service: 'Offers a full-day Deep Hole to Sandy Bottom trip on the Toccoa River Canoe Trail, with boat rentals and shuttle arrangements.',
      routes: ['toccoa-river-deep-hole-sandy-bottoms'],
    }],
  },
  'tomorrow-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Schmeeckle Reserve Outdoor Gear Rentals',
      url: 'https://www.uwsp.edu/schmeeckle-reserve/outdoor-gear-rentals/',
      service: 'Pick up an off-site canoe or kayak rental in Stevens Point and transport it to Nelsonville. Canoe packages include foam pads and straps for the drive.',
      routes: ['tomorrow-river-nelsonville-amherst'],
      sources: ['https://www.stevenspointarea.com/blog/stories/post/tomorrow-river/'],
    }],
  },
  'toms-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Jersey Paddle',
      url: 'https://jerseypaddle.com/collections/mobile-daily-rentals',
      service: 'Reserve a kayak at the Money Island base in Toms River. Local take-away rentals let you bring the boat to the Pine Beach launch.',
      routes: ['toms-river-pine-beach-gilford', 'toms-river-pine-beach-henley'],
    }],
  },
  'tradewater-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Tradewater Kayaking',
      url: 'https://visitmadisonvilleky.com/listing/tradewater-river/',
      service: 'Hopkins County tourism lists rentals and shuttles for seven miles around Dawson Springs. Contact the tourism office for current arrangements.',
      routes: [],
    }],
  },
  'trinity-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Trinity River Expeditions',
      url: 'https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/dallas-trinity/',
      service: 'Texas Parks and Wildlife lists this Dallas provider for guided trips, canoe and kayak rentals and shuttle service on the Trammell Crow to Loop 12 paddling trail. Call to arrange a trip.',
      routes: ['trinity-river-trammell-crow-loop-12'],
    }],
  },
  'truckee-river-nevada': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sierra Adventures',
      url: 'https://m.wildsierra.com/truckee-river-rafting/',
      service: 'Offers Truckee River rafting and downtown Reno kayaking clinics near Wingfield Park. Confirm the meeting point and section for your booking.',
      routes: [],
    }],
  },
  'tualatin-river-oregon': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Tualatin Riverkeepers',
      url: 'https://www.tualatinriverkeepers.org/river-experiences/river-rentals',
      service: 'Rent a paddlecraft for a round trip from Cook Family Park between Jurgens and Tualatin Community Park. Return the boat to Cook Park.',
      routes: ['tualatin-river-jurgens-community'],
    }],
  },
  'tuckasegee-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Dillsboro River Company',
      url: 'https://www.northcarolinarafting.com/self-guided-rafting',
      service: 'Offers raft and inflatable kayak rentals on the Tuckasegee below Dillsboro. The outfitter handles the trip shuttle.',
      routes: ['tuckasegee-river-dillsboro-barkers-creek'],
    }],
  },
  'turkey-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Turkey River Rentals',
      url: 'https://www.turkeyriverrentals.com/rentals-rates',
      service: 'Book a canoe, kayak or shuttle for the Elkader-to-Motor Mill trip.',
      routes: ['turkey-river-elkader-motor-mill'],
    }],
  },
  'turtle-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Paddle On Outfitters',
      url: 'https://www.paddleonoutfitters.com/turtle-creek-trips',
      service: 'Offers kayak rentals and personal-boat shuttles from O’Riley Road to Sweet Allyn Park. Its float starts downstream of East Creek Road and continues beyond Highway 140.',
      routes: ['turtle-creek-east-creek-road-highway-140'],
    }],
  },
  'two-lick-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The county tourism guide lists this as an independent paddle. Its Saltsburg livery entry describes trips on other waterways, with no Two Lick service confirmed.',
    sources: ['https://www.visitindianacountypa.org/explore/expedition/', 'https://indianacountyparks.org/our-parks/waterworks-park/'],
  },
  'tygart-valley-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The documented community float ends above Valley Falls. The university describes the falls as whitewater, and no outfitter was verified for the mapped run to Hammond.',
    sources: ['https://diyoutdoors.wvu.edu/whitewater/valleyfallstygart', 'https://www.savethetygart.org/boatfloat'],
  },
  'tygarts-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Carter Caves State Resort Park',
      url: 'https://parks.ky.gov/things-to-do/caving/carter-caves-state-resort-park',
      service: 'The park offers seasonal canoe floats through Tygarts Creek Gorge. Contact park recreation staff for dates and meeting points.',
      routes: ['tygarts-creek-olive-hill-carter-caves'],
      sources: ['https://fw.ky.gov/Education/Pages/Tygarts-Creek.aspx'],
    }],
  },
  'tyler-forks': {
    reviewedOn: '2026-11-24',
    noMatch: 'Copper Falls rentals are for Loon Lake. No outfitter was confirmed for the separate Tyler Forks whitewater run to Vogues Road.',
    sources: ['https://dnr.wisconsin.gov/topic/parks/copperfalls/concessions', 'https://www.americanwhitewater.org/content/River/view/river-detail/2759/main'],
  },
  'unadilla-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'NY River Adventures at Tall Pines',
      url: 'https://nyriveradventures.com/',
      service: 'Rent a canoe or kayak for an out-and-back paddle from Tall Pines Campground on the Unadilla near Bainbridge. Boats are provided at the campground launch.',
      routes: [],
    }],
  },
  'uncompahgre-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Best Slope Adventure Company',
      url: 'https://www.bestslopeadventure.com/rentals',
      service: 'Pick up an inflatable kayak or raft at the Ridgway shop for a self-guided river trip. Confirm craft choice and vehicle arrangements with the outfitter.',
      routes: ['uncompahgre-river-ridgway-town-run'],
    }],
  },
  'upper-colorado-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rancho Del Rio',
      url: 'https://ranchodelrio.com/shuttles/',
      service: 'Arrange a vehicle shuttle between Upper Colorado landings, including Pumphouse, Radium, Rancho Del Rio, State Bridge, Two Bridges and Catamount. Delivery times depend on the take-out.',
      routes: ['upper-colorado-pumphouse-radium', 'upper-colorado-pumphouse-state-bridge', 'upper-colorado-radium-rancho', 'upper-colorado-state-bridge-catamount', 'upper-colorado-state-bridge-two-bridges', 'upper-colorado-two-bridges-catamount'],
    }],
  },
  'upper-cumberland-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Sheltowee Trace Adventure Resort',
      url: 'https://www.ky-rafting.com/cumberland-canoeingkayaking-shuttles.html',
      service: 'Rents boats for Williamsburg to Redbird and separate trips from Redbird or Thunderstruck to the designated takeout upstream of Cumberland Falls.',
      routes: ['upper-cumberland-river-williamsburg-redbird', 'upper-cumberland-river-williamsburg-cumberland-falls'],
    }],
  },
  'upper-iowa-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Upper Iowa Resort & Rental',
      url: 'https://www.upperiowaresort.com/river-rentals',
      service: 'Rent a canoe or kayak, or arrange transport for your own boat. The standard trip starts at Iverson Bridge and ends at the resort.',
      routes: ['upper-iowa-river-iverson-bridge-kumpf'],
    }],
  },
  'upper-salmon-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'White Otter Outdoor Adventures',
      url: 'https://www.whiteotter.com/half-day.php',
      service: 'Guided half-day rafting on the upper Salmon from the outfitter’s Sunbeam base downstream of Stanley.',
      routes: ['salmon-river-sunbeam-torreys-hole'],
    }],
  },
  'upper-salt-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Kentucky lists the Rice Road, Drydock and other public access sites. The similarly named rental business operates near Rough River Lake, and service on the upper Salt was not confirmed.',
    sources: ['https://fw.ky.gov/Fish/Pages/Upper_Salt_River.aspx', 'https://www.saltriverboys.com/kayak-rentals'],
  },
  'uwharrie-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'River Daisy Outdoor Co.',
      url: 'https://riverdaisy.com/',
      service: 'Reserve a canoe or kayak through the Troy outfitter near the NC 109 access. Call to agree on the launch, pickup and any delivery charge for your trip.',
      routes: ['uwharrie-river-low-water-bridge-hwy-109'],
      sources: ['https://visitlaketillery.com/paddling'],
    }],
  },
  'valley-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The watershed guide names Wood’s Outdoor Adventures for trips using private access. Its current operation on the Andrews to Tomotla reach could not be independently confirmed.',
    sources: ['https://www.paddlehiwassee.com/valleyriver.htm', 'https://andrewstrails.com/2_trail_at_valley_river_park.pdf'],
  },
  'verde-river-arizona': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Verde Adventures',
      url: 'https://sedonaadventuretours.com/shuttle-verde-river-clear-creek/',
      service: 'Book a shuttle for your own boat between Clear Creek and Beasley Flat in Camp Verde.',
      routes: ['verde-river-clear-creek-beasley-flat'],
    }],
  },
  'vermilion-river-illinois': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Vermillion River Rafting',
      url: 'https://www.vermillionriverrafting.com/',
      service: 'Provides whitewater raft and kayak rentals on the Big Vermilion near Oglesby. Check river levels and the day’s launch arrangements with the outfitter.',
      routes: ['vermilion-river-lowell-oglesby'],
    }],
  },
  'vermilion-river-minnesota': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Anderson’s Canoe Outfitters',
      url: 'https://www.anderson-outfitters.com/rentals',
      service: 'The Crane Lake outfitter rents canoes at the downstream end of the Vermilion River region. Contact the shop about transport to an inland landing.',
      routes: [],
    }],
  },
  'vermilion-river-ohio': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'West River Paddling Company',
      url: 'https://westriverkayak.com/',
      service: 'Rent a kayak on the lower Vermilion at West River Road in town. The shop’s launch is near the downstream end of the Mill Hollow route.',
      routes: ['vermilion-river-mill-hollow-vermilion-boat-ramp'],
    }],
  },
  'village-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Eastex Canoe Trails',
      url: 'https://www.beaumontcvb.com/listing/eastex-canoe-trails/550/',
      service: 'The Silsbee outfitter serves the Village Creek Paddling Trail from FM 418 toward Village Creek State Park. Confirm the access points and pickup for your chosen trip.',
      routes: ['village-creek-fm418-state-park', 'village-creek-fm418-baby-galvez', 'village-creek-fm418-sh327', 'village-creek-sh327-baby-galvez', 'village-creek-sh327-us-96', 'village-creek-baby-galvez-us-96', 'village-creek-baby-galvez-state-park', 'village-creek-us-96-state-park'],
      sources: ['https://tpwd.texas.gov/boating/paddling-trails/pineywoods/village-creek/'],
    }],
  },
  'volga-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Upper Iowa University lists student equipment checkout in Fayette. A public rental, shuttle or guided trip for the mapped Volga reaches could not be confirmed.',
    sources: ['https://uiu.edu/experience/wellness/outdoor-pursuits/', 'https://uiu.edu/wp-content/uploads/2026-FYI-Booklet-rfs.pdf', 'https://www.iowadnr.gov/places-go/state-parks/all-parks/volga-river-state-recreation-area'],
  },
  'wabash-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Wells County Trails lists launches and a kayak club on the Wabash, while its rental location serves Kunkel Lake. No public rental or shuttle for the mapped river reaches was verified.',
    sources: ['https://www.wellscountytrails.org/kayaking', 'https://www.in.gov/dnr/state-parks/recreation/water-trails/canoekayak-rentals'],
  },
  'wading-river-new-jersey': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mick’s Canoe & Kayak Rental',
      url: 'https://www.mickscanoerental.com/rates',
      service: 'Rents canoes and kayaks with transport to and from Wading River access points in Wharton State Forest, including the Hawkin Bridge and Godfrey Bridge area.',
      routes: ['wading-river-hawkin-godfrey'],
      sources: ['https://www.mickscanoerental.com/camping-info'],
    }],
  },
  'wallkill-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'New Paltz Kayaking',
      url: 'https://npkayaking.com/',
      service: 'Rent a canoe or kayak in New Paltz for a Wallkill River paddle. Confirm launch, return and any one-way arrangements with the shop.',
      routes: [],
      sources: ['https://travelhudsonvalley.com/hit-the-water-hudson-valley-kayak-rental-locations/'],
    }],
  },
  'wapsipinicon-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Pinicon Ridge Park Watercraft Concession',
      url: 'https://www.linncountyiowa.gov/1448/Watercraft-Concession',
      service: 'Rent a canoe or kayak for an in-park paddle at Pinicon Ridge in Central City. Boats return to the park, and the county has discontinued upriver drop-offs.',
      routes: [],
    }],
  },
  'ware-river-massachusetts': {
    reviewedOn: '2026-11-24',
    noMatch: 'The watershed association and town document the Ware River Park and New Furnace launches. No outfitter was verified for the connecting river reach.',
    sources: ['https://c4rivers.org/blue-trails/', 'https://www.hardwick-ma.gov/media/6631'],
  },
  'warm-springs-creek-idaho': {
    reviewedOn: '2026-11-24',
    noMatch: 'The whitewater inventory and city access map identify the Ketchum run. Listings for Idaho raft rentals did not establish outfitting on this creek.',
    sources: ['https://www.americanwhitewater.org/content/River/view/river-detail/11412/main', 'https://www.idahosmiddlefork.com/private-permits/'],
  },
  'watonwan-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The county lists a landing at Garden City and rentals elsewhere at Bray Park. Mankato outfitters offer rentals, but service for Madelia or the Garden City reach was not established.',
    sources: ['https://www.blueearthcountymn.gov/575/Boat-Rentals-Boat-Launches', 'https://www.blueearthcountymn.gov/facilities/facility/details/Watonwan-Stop-9', 'https://greatermankato.com/stay-enjoy/outdoor-adventures/water-activities/'],
  },
  'webb-lake': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mount Blue State Park',
      url: 'https://www.wiltonmaine.gov/area-attractions/mt-blue-state-park/',
      service: 'The park rents paddlecraft at its Webb Lake waterfront in Weld. Check with park staff for seasonal rental hours and launch arrangements.',
      routes: ['webb-lake-dacf-access-loop'],
      sources: ['https://www.maine.gov/dacf/parksearch/PropertyGuides/PDF_GUIDE/mtbluetumbledownguide.pdf'],
    }],
  },
  'weiser-river-idaho': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Frontier Motel',
      url: 'https://frontiermotelcambridge.com/',
      service: 'The Idaho Conservation League lists the Cambridge motel for vehicle shuttles on the Midvale-to-Galloway float. Call to confirm the river landings and reserve a driver.',
      routes: ['weiser-river-midvale-galloway'],
      sources: ['https://archive.idahoconservation.org/plan-your-own-adventure/weiser-river/'],
    }],
  },
  'west-branch-delaware-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'West Branch Angler Resort',
      url: 'https://www.westbranchresort.com/drift-boat-rentals',
      service: 'Rents drift boats for catch-and-release fly fishing. One option on this reach is the resort’s own ramp to Balls Eddy. Arrange your vehicle shuttle separately.',
      routes: ['west-branch-delaware-river-hale-eddy-balls-eddy'],
    }],
  },
  'west-branch-dupage-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Naperville Kayak starts its trips at Knoch Knolls and paddles downstream. The mapped route ends there. The forest preserve and park district rentals are on lakes or the quarry.',
    sources: ['https://www.napervillekayak.com/services/river-trips/', 'https://www.dupageforest.org/things-to-do/recreational-activities/boating', 'https://openlands.org/paddle-illinois/mcdowell-grove-to-knoch-knolls-park/'],
  },
  'west-branch-penobscot-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'North Country Rivers',
      url: 'https://www.northcountryrivers.com/rafting/penobscot-rafting.htm',
      service: 'Guides whitewater rafting trips on the West Branch below Ripogenus Dam. Contact the outfitter for the rapids included in each itinerary and its meeting point.',
      routes: ['west-branch-penobscot-river-t3r11-t2r10'],
    }],
  },
  'west-branch-sacandaga-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'The Balsam Inn & Café',
      url: 'https://www.ariettany.com/service-page/west-branch-sacandaga-kayak-trips',
      service: 'Offers kayak trips on the upper West Branch near Shaker Place, with a guide available by request.',
      routes: ['west-branch-sacandaga-chub-lake-shaker-place'],
    }],
  },
  'west-branch-sugar-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Sugar River Outfitters lists the Verona-to-Paoli main-stem trip and Belleville lake rentals. No rental or shuttle was verified for the separate Fritz Road branch.',
    sources: ['https://sugarriveroutfitterswi.com/services/customer-care/', 'https://www.wisconsinrivertrips.com/segments/west-branch-sugar-river'],
  },
  'west-branch-white-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Wautoma-area reach guide describes a bike shuttle. The nearby Mecan River livery lists trips on other waterways, without confirmed service for the Cottonville reach.',
    sources: ['https://www.wisconsinrivertrips.com/segments/white-river/west-branch', 'https://mecanriveroutfitters.com/summer.html'],
  },
  'west-canada-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'West Canada Creek Tubing',
      url: 'https://westcanadacreektubing.com/',
      service: 'Runs seasonal tube rentals with a shuttle to its West Canada Creek launch near Poland. Check the outfitter’s own trip section when booking.',
      routes: [],
    }],
  },
  'west-fork-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'WVU Jackson’s Mill',
      url: 'https://jacksonsmill.wvu.edu/recreation',
      service: 'Offers organized paddling on the West Fork River at Jackson’s Mill. Ask the recreation staff about group programs, equipment and launch arrangements.',
      routes: [],
    }],
  },
  'west-fork-trinity-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'TC Paddlesports',
      url: 'https://www.trinitycoalition.org/programs/tc-paddlesports-at-panther-island',
      service: 'Rent a kayak, canoe or paddleboard at Panther Island in Fort Worth. Classes and tours also run from this riverfront base.',
      routes: ['west-fork-trinity-river-panther-island-handley-ederville'],
    }],
  },
  'west-nishnabotna-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Rubber Duck Outfitters',
      url: 'https://www.wattaway.com/play/rubber_duck_outfitters_seasonal/',
      service: 'Seasonal rentals are based at Botna Bend Park in Hancock. County tourism reports a low-water closure for the season. Call to confirm reopening before planning a float.',
      routes: ['west-nishnabotna-river-hancock-oakland'],
    }],
  },
  'west-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Canandaigua Sailboard',
      url: 'https://www.cdgasailboard.com/canandaigua-sailboard-price-list',
      service: 'Reserve an off-site rental in Canandaigua and arrange transport to the Sunnyside Road marsh launch at the south end of the lake.',
      routes: ['west-river-marsh-sunnyside-out-and-back'],
    }],
  },
  'white-river-indiana': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Canoe Country',
      url: 'https://canoeindiana.com/river-map/',
      service: 'The Daleville livery offers White River canoe and kayak trips including the paddle from Morrow’s Meadow in Yorktown back to its landing.',
      routes: ['west-fork-white-river-morrows-meadow-canoe-country', 'west-fork-white-river-canoe-country-edgewater'],
    }],
  },
  'white-river-wisconsin-northwest-wisconsin': {
    reviewedOn: '2026-11-24',
    noMatch: 'Wisconsin DNR identifies the Maple Ridge access. The Ashland-area outfitters found advertise Lake Superior or island trips, without confirmed service on the White River to Highway 112.',
    sources: ['https://dnr.wisconsin.gov/topic/statenaturalareas/WhiteRiverBreaks', 'https://www.visitashland.com/plan-your-visit/recreation/kayakingpaddling/'],
  },
  'whitewater-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'Minnesota DNR describes the water trail below Elba. The local campground advertises paddling among area activities, but a rental, guided river trip or shuttle could not be verified.',
    sources: ['https://www.dnr.state.mn.us/state-water-trails/whitewater-river/index.html', 'https://sites.google.com/site/towerviewcampgroundllc'],
  },
  'wildcat-creek': {
    reviewedOn: '2026-11-24',
    noMatch: 'The Lafayette livery advertises short floats and a shuttle. Its standard trip could not be tied to the upstream Knop Lake to Mis-So-La reach.',
    sources: ['https://www.wildcatcanoeandkayaktoo.com/about-us', 'https://www.wildcatcreek.net/river_segments/north_fork/knoplake_to_mis-so-la/index.htm'],
  },
  'willamette-river-oregon': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Oregon Paddle Sports',
      url: 'https://www.oregonpaddlesports.com/rentals/rental-equipment/',
      service: 'Pick up rental boats and transport straps in Eugene for an independent Willamette trip. Arrange your own launch and takeout transportation.',
      routes: ['willamette-river-alton-baker-harrisburg', 'willamette-river-marshall-island-harrisburg'],
      sources: ['https://willamettewatertrail.org/plan-your-trip/local-outfitters/'],
    }],
  },
  'willimantic-river-connecticut': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Mansfield Community Center',
      url: 'https://www.mansfieldct.gov/1601/Rentals',
      service: 'Pick up rental kayaks or paddleboards at the community center and transport them to your launch. The town’s River Park provides access to the Eagleville Lake paddle.',
      routes: ['willimantic-river-river-park-eagleville-lake'],
      sources: ['https://www.cttrailfinder.com/trails/trail/river-park'],
    }],
  },
  'winnebago-river': {
    reviewedOn: '2026-11-24',
    noMatch: 'The counties describe river access and the new Mason City canoe landing. No public rental or guided trip on the Fertile to Mason City reach was confirmed.',
    sources: ['https://cerrogordo.gov/news/new_canoe_access/', 'https://www.winnebagocountyiowa.gov/conservation/parks/winnebago_river_water_trail/'],
  },
  'winooski-river-vermont': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Umiak Outdoor Outfitters',
      url: 'https://www.umiak.com/activity/winooski-river-4-mile-paddle',
      service: 'Offers a four-mile Winooski River paddle from its Waterbury-area operation with kayaks, tandem canoes and paddleboards.',
      routes: [],
    }],
  },
  'wisconsin-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wisconsin River Outings',
      url: 'https://canoe-camping.com/transport-service/',
      service: 'Transports private boats and drivers on the lower Wisconsin. The Boscobel shop lists landings from Sauk City and Arena through Muscoda, Blue River, Woodman, Bridgeport and Wyalusing. Confirm availability for the downstream trips.',
      routes: ['wisconsin-river-blue-river-boscobel', 'wisconsin-river-boscobel-bridgeport', 'wisconsin-river-muscoda-blue-river', 'wisconsin-river-muscoda-woodman', 'wisconsin-river-millville-wyalusing-beach', 'wisconsin-river-spring-green-muscoda', 'wisconsin-river-arena-spring-green', 'wisconsin-river-gotham-muscoda-west', 'wisconsin-river-sauk-city-arena'],
    }],
  },
  'wolf-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Shotgun Eddy Raft Rental',
      url: 'https://www.shotguneddy.com/Trips.html',
      service: 'Offers Wolf River raft trips over Sullivan Falls, Ducknest, the Wolf River Dalles and Smokey Falls. Contact the outfitter about its launch and takeout on the Menominee section.',
      routes: ['wolf-river-markton-big-smokey-falls'],
    }],
  },
  'woonasquatucket-river-rhode-island': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Woonasquatucket River Watershed Council',
      url: 'https://wrwc.org/recreation/',
      service: 'Leads seasonal paddles with rental boats, including an out-and-back on Greystone Mill Pond from Cricket Park and a separate circuit of Georgiaville Pond.',
      routes: ['woonasquatucket-river-esmond-cricket', 'woonasquatucket-river-georgiaville-cricket'],
    }],
  },
  'yadkin-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'North Carolina River Riders',
      url: 'https://northcarolinariverriders.com/services',
      service: 'Offers kayak, canoe and tube trips from the Ronda area on the Yadkin. Confirm the booked launch and takeout for the trip toward Elkin.',
      routes: ['yadkin-river-ronda-crater-park'],
      sources: ['https://www.townofronda.org/outdoor-adventures3bafbdf7'],
    }],
  },
  'yahara-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Drift Away Paddle Co.',
      url: 'https://www.driftawaypaddleco.com/services-rates',
      service: 'Rents boats with a shuttle for lower Yahara trips, including Stebbinsville to Murwin Park. Takeout arrangements depend on water levels.',
      routes: ['yahara-river-highway-59-murwin-park'],
    }],
  },
  'yakima-river-washington': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Red’s Fly Shop',
      url: 'https://redsflyfishing.com/pages/yakima-canyon-shuttle-service',
      service: 'Book a vehicle shuttle for a Yakima River Canyon float. Select your access points when reserving and confirm vehicle and key arrangements with the shop.',
      routes: [],
      sources: ['https://www.blm.gov/sites/default/files/documents/files/spo_yakimarivercan_brochure.pdf'],
    }],
  },
  'yampa-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'OARS',
      url: 'https://www.oars.com/before-you-go/yampa-river-rafting/',
      service: 'Guides multiday Yampa rafting trips through Dinosaur National Monument from Deerlodge Park, downstream of the Hayden, Craig and Maybell reaches.',
      routes: [],
      sources: ['https://www.nps.gov/dino/planyourvisit/commercialguidedrivertrips.htm'],
    }],
  },
  'yellow-breeches-creek': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Yellow Breeches Outfitters',
      url: 'https://www.ybopa.com/the-adventure-spots',
      service: 'Offers kayak rentals with shuttle service, including the float from McCormick to Lower Allen Community Park.',
      routes: ['yellow-breeches-creek-mccormick-park-lower-allen-community-park'],
    }],
  },
  'yellow-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Scenic View Campground',
      url: 'https://scenicviewcampiowa.com/pricing',
      service: 'Rents canoes and kayaks on Iowa’s Yellow River and offers shuttle service by arrangement. Contact the campground to agree on put-in and takeout.',
      routes: [],
      sources: ['https://scenicviewcampiowa.com/'],
    }],
  },
  'youghiogheny-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Wilderness Voyageurs',
      url: 'https://wilderness-voyageurs.com/pennsylvania-white-water-rafting/',
      service: 'Middle Yough rentals include a shuttle to Ramcat for the float back to Ohiopyle. The outfitter also guides the Lower Yough whitewater run from Ohiopyle to Bruner Run.',
      routes: ['youghiogheny-river-middle-ramcat-ohiopyle', 'youghiogheny-river-lower-yough-ohiopyle-bruner-run'],
      sources: ['https://wilderness-voyageurs.com/adventures/middle-yough-rafting-rentals/', 'https://wilderness-voyageurs.com/adventures/lower-yough-rafting/'],
    }],
  },
  'zumbro-river': {
    reviewedOn: '2026-11-24',
    outfitters: [{
      name: 'Zumbro Valley Canoe Rental',
      url: 'https://zumbrovalleycanoerental.com/',
      service: 'Rents boats and tubes from its Zumbro Falls base and offers a seven-mile river float. Confirm the pickup point for your trip.',
      routes: ['zumbro-river-zumbro-falls-hammond'],
      sources: ['https://zumbrofallsmn.org/local-businesses/'],
    }],
  },
};
