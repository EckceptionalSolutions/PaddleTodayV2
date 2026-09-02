import { readFileSync, writeFileSync } from 'node:fs';

import { virginiaRoutes } from '../src/data/routes/virginia.ts';

type DwrAttributes = Record<string, string | number | null | undefined>;

type DwrFeature = {
  attributes?: DwrAttributes;
  geometry?: { x?: number; y?: number };
};

type Candidate = {
  state?: string;
  river?: string;
  route?: string;
  id?: string;
  candidateId?: string;
  status?: string;
  routeSlugs?: string[];
};

type GaugeReview = {
  key?: string;
  status?: string;
  routeReadiness?: string;
  routeFamilies?: string[];
  routeSlugs?: string[];
};

const dwrLayerUrl =
  'https://services.dwr.virginia.gov/arcgis/rest/services/Public/BoatingAccessSites/FeatureServer/0';
const dwrQueryUrl = `${dwrLayerUrl}/query?where=1%3D1&outFields=OBJECTID%2CSITENAME%2CWATERBODY%2CBODYOFWATE%2CACCESSAREA%2CTYPE%2CCOUNTY%2CLOCATION%2CLat%2CLong%2COwner%2CMaintenance_Provider%2CType_of_Ramp&returnGeometry=true&outSR=4326&f=json`;
const inventoryPath = 'docs/operations/virginia-statewide-inventory.json';

const dwrRiverCatalog = [
  ['Appomattox River', 'https://dwr.virginia.gov/waterbody/appomattox-river/'],
  ['Big Tumbling Creek (Clinch Fee Fishing Area)', 'https://dwr.virginia.gov/waterbody/big-tumbling-creek-clinch-fee-fishing-area/'],
  ['Blackwater River', 'https://dwr.virginia.gov/waterbody/blackwater-river/'],
  ['Chickahominy River', 'https://dwr.virginia.gov/waterbody/chickahominy-river/'],
  ['Clinch River', 'https://dwr.virginia.gov/waterbody/clinch-river/'],
  ['Conway River', 'https://dwr.virginia.gov/waterbody/conway-river/'],
  ['Cowpasture River', 'https://dwr.virginia.gov/waterbody/cowpasture-river/'],
  ['Dan River', 'https://dwr.virginia.gov/waterbody/dan-river/'],
  ['Dragon Run / Piankatank River', 'https://dwr.virginia.gov/waterbody/dragon-run-piankatank-river/'],
  ['Holston River - Middle Fork', 'https://dwr.virginia.gov/waterbody/holston-river-middle-fork/'],
  ['Holston River - North Fork', 'https://dwr.virginia.gov/waterbody/holston-river-north-fork/'],
  ['Holston River - South Fork', 'https://dwr.virginia.gov/waterbody/holston-river-south-fork/'],
  ['Jackson River', 'https://dwr.virginia.gov/waterbody/jackson-river/'],
  ['James River - Tidal', 'https://dwr.virginia.gov/waterbody/james-river-tidal/'],
  ['James River - Upper & Middle', 'https://dwr.virginia.gov/waterbody/james-river-upper-middle/'],
  ['Mattaponi River', 'https://dwr.virginia.gov/waterbody/mattaponi-river/'],
  ['Maury River', 'https://dwr.virginia.gov/waterbody/maury-river/'],
  ['Meherrin River', 'https://dwr.virginia.gov/waterbody/meherrin-river/'],
  ['Mossy Creek', 'https://dwr.virginia.gov/waterbody/mossy-creek/'],
  ['New River', 'https://dwr.virginia.gov/waterbody/new-river/'],
  ['North Fork Moormans River', 'https://dwr.virginia.gov/waterbody/north-fork-moormans-river/'],
  ['North Fork Thorton River', 'https://dwr.virginia.gov/waterbody/north-fork-thorton-river/'],
  ['North Landing and Northwest Rivers', 'https://dwr.virginia.gov/waterbody/north-landing-and-northwest-rivers/'],
  ['North River', 'https://dwr.virginia.gov/waterbody/north-river/'],
  ['Nottoway River', 'https://dwr.virginia.gov/waterbody/nottoway-river/'],
  ['Occoquan River', 'https://dwr.virginia.gov/waterbody/occoquan-river/'],
  ['Pamunkey River', 'https://dwr.virginia.gov/waterbody/pamunkey-river/'],
  ['Pound River', 'https://dwr.virginia.gov/waterbody/pound-river/'],
  ['Powell River', 'https://dwr.virginia.gov/waterbody/powell-river/'],
  ['Rapidan River (Trout Section)', 'https://dwr.virginia.gov/waterbody/rapidan-river-trout-section/'],
  ['Rappahannock River - Tidal', 'https://dwr.virginia.gov/waterbody/rappahannock-river-tidal/'],
  ['Rappahannock River - Upper', 'https://dwr.virginia.gov/waterbody/rappahannock-river-upper/'],
  ['Rivanna River', 'https://dwr.virginia.gov/waterbody/rivanna-river/'],
  ['Shenandoah River - Main Stem', 'https://dwr.virginia.gov/waterbody/shenandoah-river-main-stem/'],
  ['Shenandoah River - North Fork', 'https://dwr.virginia.gov/waterbody/shenandoah-river-north-fork/'],
  ['Shenandoah River - South Fork', 'https://dwr.virginia.gov/waterbody/shenandoah-river-south-fork/'],
  ['Smith River', 'https://dwr.virginia.gov/waterbody/smith-river/'],
  ['South River', 'https://dwr.virginia.gov/waterbody/south-river/'],
  ['St. Marys River', 'https://dwr.virginia.gov/waterbody/st-marys-river/'],
  ['Staunton River', 'https://dwr.virginia.gov/waterbody/staunton-river/'],
  ['Whitetop Laurel', 'https://dwr.virginia.gov/waterbody/whitetop-laurel/'],
] as const;

const dwrAccessReview: Record<string, {
  disposition: 'route_candidate' | 'blocked_threshold_endpoint_package' | 'screened_out';
  reason: string;
  sourceLinks: string[];
}> = {
  'Jackson River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR and USFS identify multiple public Jackson River accesses, and American Whitewater names distinct moving-water reaches. The strongest Low Moor-to-James/Rainbow Gap reach has complex multi-gauge guidance and an existing overlapping James River take-out, while the Poor Farm-to-Hidden Valley reach is described with public access but its exact endpoint coordinates and manager-grade water-entry controls were not verified in the current public source set. Preserve both as retryable leads instead of inferring a route package from fishing/recreation access alone.',
    sourceLinks: ['https://dwr.virginia.gov/vbwt/mountain-trail/mah/', 'https://www.americanwhitewater.org/content/River/view/river-detail/1947/main', 'https://www.americanwhitewater.org/content/River/view/river-detail/11668/main', 'https://waterdata.usgs.gov/monitoring-location/USGS-02011400/', 'https://waterdata.usgs.gov/monitoring-location/USGS-02013100/'],
  },
  'Rivanna River': {
    disposition: 'route_candidate',
    reason: 'DWR publishes a five-section public-landings float map and the current layer includes Crofton and Palmyra public accesses. Advance the strongest distinct public segment as a planning route; do not transfer upstream American Whitewater thresholds to the lower Crofton-to-Palmyra reach.',
    sourceLinks: ['https://dwr.virginia.gov/wp-content/uploads/rivanna-river-public-landings-float-map.pdf', 'https://dwr.virginia.gov/place/palmyra/', 'https://waterdata.usgs.gov/monitoring-location/USGS-02034000/'],
  },
  'Mattaponi River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms four public access areas and a tidal/freshwater river corridor, but the reviewed evidence does not provide a bounded point-to-point paddle route with station-specific flow or tide operating guidance, rescue limits, and a complete camping/imagery package.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/mattaponi-river/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'Pamunkey River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms public access at Little Page and Lester Manor, but the reviewed evidence describes a tidal navigation corridor without a bounded PaddleToday endpoint pair and station-specific operating/tide guidance for a safe point-to-point paddle route.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/pamunkey-river/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'Potomac River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'The statewide access layer spans unrelated Point of Rocks, Gravelly Point, and Coles Point reaches with cross-state and tidal jurisdiction. No single Virginia-bounded route package with endpoint, flow/tide, channel-traffic, and rescue controls was selected.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  'Morris Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR access and wildlife-trail records establish a tidal Chickahominy tributary, but the two access anchors do not yet establish a verified point-to-point route with station-specific flow/tide guidance, hazards, and take-out logistics.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/chickahominy-river/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'Swift Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR identifies White Bank Park as access to a short tidal Swift Creek reach that joins the Appomattox. The reviewed evidence does not establish a distinct public point-to-point moving-water route or station-specific tidal operating band.',
    sourceLinks: ['https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'Totuskey Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR describes approximately five miles of tidal creek above and below the public ramp, but the source identifies a single public landing and does not establish a separate public take-out or station-specific tide/flow operating band.',
    sourceLinks: ['https://dwr.virginia.gov/blog/explore-the-wild-by-putting-in-on-the-rappahannock-at-totuskey-creek/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'Farnham Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one public kayak/canoe launch on a tidal Rappahannock tributary. A second lawful endpoint and station-specific tide/flow guidance were not verified.',
    sourceLinks: ['https://dwr.virginia.gov/vbwt/sites/farnham-creek-public-landing/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'East River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one saltwater public ramp in Mathews County, but no second endpoint, bounded paddle corridor, or station-specific tide/navigation package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/required-equipment/'],
  },
  'Great Wicomico River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one public ramp on a tidal coastal river. No bounded point-to-point endpoint pair or station-specific tide/flow and channel-safety package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'Parrotts Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one public Mill Stone access on a small tidal creek. No second lawful endpoint or station-specific tide/flow package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/rivers/'],
  },
  'Piankatank River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one public Deep Point ramp and describes saltwater/tidal conditions. No bounded Virginia endpoint pair or station-specific tide/navigation package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/place/deep-point/', 'https://dwr.virginia.gov/boating/boaters-guide/required-equipment/'],
  },
  'Porpoptank River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'The DWR layer contains one legacy-labeled Tanyard access, but no current DWR river catalog entry, second public endpoint, or station-specific flow/tide package was verified. Preserve as a data-quality follow-up, not a route.',
    sourceLinks: ['https://services.dwr.virginia.gov/arcgis/rest/services/Public/BoatingAccessSites/FeatureServer/0', 'https://dwr.virginia.gov/rivers/'],
  },
  'Jones Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one public landing on a tidal Isle of Wight creek. No second public endpoint or station-specific tide/navigation package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  "Hoskin's Creek": {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one public Tappahannock-area access on a tidal creek. No second endpoint or station-specific tide/flow package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  'Cockerell Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one public Shell Landing on a Northumberland coastal creek and describes it as an access point for scenic/fishing destinations, but no bounded paddle route, second endpoint, or station-specific tide package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/blog/category/boating/page/7/', 'https://dwr.virginia.gov/boating/access/'],
  },
  'Cape Charles River': {
    disposition: 'screened_out',
    reason: 'DWR classifies the single Cape Charles access as saltwater; the reviewed evidence supports coastal/open-water use, not a distinct moving-water point-to-point corridor with gauge-based route guidance.',
    sourceLinks: ['https://dwr.virginia.gov/place/cape-charles/', 'https://dwr.virginia.gov/boating/boaters-guide/required-equipment/'],
  },
  'Greenvale Creek': {
    disposition: 'screened_out',
    reason: 'DWR’s current alert says extreme shoaling caused the Coast Guard to remove navigation markers and the creek is no longer considered navigable. Do not promote a PaddleToday route without materially new navigability evidence.',
    sourceLinks: ['https://dwr.virginia.gov/place/greenvale-creek/', 'https://dwr.virginia.gov/alerts/'],
  },
  'Messongo Creek': {
    disposition: 'screened_out',
    reason: 'DWR confirms one saltwater Hammock access on a coastal creek; no distinct public point-to-point moving-water route or station-specific tide package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  'Pungoteague Creek': {
    disposition: 'screened_out',
    reason: 'DWR confirms one saltwater Harborton access on a coastal creek; no distinct public point-to-point moving-water route or station-specific tide/navigation package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  'Red Bank Creek': {
    disposition: 'screened_out',
    reason: 'DWR confirms one saltwater Red Bank access on the Eastern Shore; no distinct public point-to-point moving-water route or station-specific tide/navigation package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  'Hyco River': {
    disposition: 'screened_out',
    reason: 'The DWR access record is a legacy label conflict: the current Hyco access page identifies the waterbody as Dan River. Treat it as a data reconciliation item under the Dan River family, not as a separate Virginia river corridor.',
    sourceLinks: ['https://dwr.virginia.gov/place/hyco/', 'https://dwr.virginia.gov/waterbody/dan-river/'],
  },
  'York River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR confirms one Gloucester Point saltwater access on the tidal York River. No bounded Virginia point-to-point paddle corridor or station-specific tide/navigation package was verified.',
    sourceLinks: ['https://dwr.virginia.gov/boating/access/', 'https://dwr.virginia.gov/boating/boaters-guide/required-equipment/'],
  },
};

const dwrRiverCatalogReview: Record<string, {
  disposition: 'blocked_threshold_endpoint_package' | 'screened_out';
  reason: string;
  sourceLinks: string[];
}> = {
  'Conway River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR catalogs Conway River, but the statewide maintained-access baseline and reviewed public-land sources did not establish a current public endpoint pair, named paddle reach, or station-specific flow guidance. Retain as a retryable small-river lead rather than infer access from crossings or private banks.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/conway-river/', 'https://services.dwr.virginia.gov/arcgis/rest/services/Public/BoatingAccessSites/FeatureServer', 'https://waterdata.usgs.gov/va/nwis/current/?type=flow'],
  },
  'Dragon Run / Piankatank River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR catalogs the combined Dragon Run / Piankatank family, but the reviewed statewide access and public-land sources did not establish a bounded point-to-point moving-water route with two lawful endpoints, tide/flow guidance, and route-specific hazard and rescue controls.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/dragon-run-piankatank-river/', 'https://services.dwr.virginia.gov/arcgis/rest/services/Public/BoatingAccessSites/FeatureServer', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  'Mossy Creek': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR catalogs Mossy Creek as a distinct waterbody, but no current public launch/take-out pair, moving-water route description, or station-specific paddling threshold cleared the strict package review. Do not convert fishing or crossing access into a paddle route without manager-grade evidence.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/mossy-creek/', 'https://services.dwr.virginia.gov/arcgis/rest/services/Public/BoatingAccessSites/FeatureServer', 'https://waterdata.usgs.gov/va/nwis/current/?type=flow'],
  },
  'Occoquan River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR catalogs Occoquan River, but the reviewed public-access evidence is not a single bounded moving-water corridor with a defensible endpoint pair and station-specific flow/tide guidance. Reservoir, urban, and tidal segments require separate route packages and must not be conflated.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/occoquan-river/', 'https://services.dwr.virginia.gov/arcgis/rest/services/Public/BoatingAccessSites/FeatureServer', 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/'],
  },
  'Shenandoah River - Main Stem': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR catalogs a main-stem Shenandoah family, while the current Virginia route inventory covers separate North Fork and South Fork corridors. The reviewed statewide sources did not establish a distinct main-stem endpoint pair, route-specific gauge relationship, or complete safety/logistics package; no main-stem route is inferred from fork routes.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/shenandoah-river-main-stem/', 'https://dwr.virginia.gov/rivers/', 'https://waterdata.usgs.gov/va/nwis/current/?type=flow'],
  },
  'St. Marys River': {
    disposition: 'blocked_threshold_endpoint_package',
    reason: 'DWR catalogs St. Marys River, but no current Virginia public endpoint pair, named moving-water reach, or station-specific paddling threshold and safety package was verified. Preserve as a documented statewide catalog lead with a retry condition, not as an implied route.',
    sourceLinks: ['https://dwr.virginia.gov/waterbody/st-marys-river/', 'https://services.dwr.virginia.gov/arcgis/rest/services/Public/BoatingAccessSites/FeatureServer', 'https://waterdata.usgs.gov/va/nwis/current/?type=flow'],
  },
};

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeWaterbody(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.’'()-]/g, ' ')
    .replace(/\bs\s+fork\b/g, 'south fork')
    .replace(/\bn\s+fork\b/g, 'north fork')
    .replace(/\bs\s+branch\b/g, 'south branch')
    .replace(/\bw\s+branch\b/g, 'west branch')
    .replace(/\briver\b/g, '')
    .replace(/\bcreek\b/g, '')
    .replace(/\bwaterbody\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getWaterbody(attributes: DwrAttributes): string {
  return clean(attributes.WATERBODY) || clean(attributes.BODYOFWATE) || '(unnamed)';
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  return typeof value === 'string' ? [value] : [];
}

function classifyWaterbody(label: string): 'moving_water_or_ambiguous' | 'still_or_open_water' {
  const stillWaterOverrides = new Set(['Diascund Creek Reservior', 'Great Creek', 'Slate River Watershed']);
  return stillWaterOverrides.has(label) || /\b(lake|reservoir|reservior|pond|inlet|bay|sound|harbor|channel|roads)\b/i.test(label)
    ? 'still_or_open_water'
    : 'moving_water_or_ambiguous';
}

function namesMatch(left: string, right: string): boolean {
  const a = normalizeWaterbody(left);
  const b = normalizeWaterbody(right);
  return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}

async function main(): Promise<void> {
  const response = await fetch(dwrQueryUrl);
  if (!response.ok) {
    throw new Error(`DWR boating-access query failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as { features?: DwrFeature[]; error?: unknown };
  if (payload.error) {
    throw new Error(`DWR boating-access query returned an error: ${JSON.stringify(payload.error)}`);
  }

  const features = payload.features ?? [];
  const ledger = JSON.parse(readFileSync('docs/route-candidate-ledger.json', 'utf8')) as {
    candidates?: Candidate[];
  };
  const candidates = (ledger.candidates ?? []).filter((candidate) => candidate.state === 'VA');
  const gaugeLedger = JSON.parse(readFileSync('docs/operations/gauge-review-ledger.json', 'utf8')) as {
    reviews?: GaugeReview[];
  };
  const gaugeReviews = gaugeLedger.reviews ?? [];

  const rows = features.map((feature) => {
    const attributes = feature.attributes ?? {};
    const label = getWaterbody(attributes);
    const latitude = Number(attributes.Lat ?? feature.geometry?.y);
    const longitude = Number(attributes.Long ?? feature.geometry?.x);
    return {
      objectId: Number(attributes.OBJECTID),
      siteName: clean(attributes.SITENAME),
      waterbody: label,
      waterbodyClass: classifyWaterbody(label),
      accessArea: clean(attributes.ACCESSAREA),
      bodyOfWater: clean(attributes.BODYOFWATE),
      type: clean(attributes.TYPE),
      county: clean(attributes.COUNTY),
      location: clean(attributes.LOCATION),
      owner: clean(attributes.Owner),
      maintenanceProvider: clean(attributes.Maintenance_Provider),
      rampType: clean(attributes.Type_of_Ramp),
      latitude: Number.isFinite(latitude) ? latitude : null,
      longitude: Number.isFinite(longitude) ? longitude : null,
    };
  });

  const grouped = new Map<string, {
    waterbody: string;
    waterbodyClass: 'moving_water_or_ambiguous' | 'still_or_open_water';
    accessSiteCount: number;
    siteNames: string[];
    counties: string[];
  }>();

  for (const row of rows) {
    const key = normalizeWaterbody(row.waterbody);
    const existing = grouped.get(key) ?? {
      waterbody: row.waterbody,
      waterbodyClass: row.waterbodyClass,
      accessSiteCount: 0,
      siteNames: [],
      counties: [],
    };
    existing.accessSiteCount += 1;
    if (row.siteName && !existing.siteNames.includes(row.siteName)) existing.siteNames.push(row.siteName);
    if (row.county && !existing.counties.includes(row.county)) existing.counties.push(row.county);
    grouped.set(key, existing);
  }

  const waterbodies = [...grouped.entries()]
    .sort(([, left], [, right]) => left.waterbody.localeCompare(right.waterbody))
    .map(([normalizedWaterbody, summary]) => {
      const routeSlugs = virginiaRoutes
        .filter((route) => namesMatch(summary.waterbody, route.name))
        .map((route) => route.slug);
      const candidateRows = candidates.filter((candidate) =>
        namesMatch(summary.waterbody, candidate.river ?? ''),
      );
      const candidateIds = candidateRows.map((candidate) => candidate.id ?? candidate.candidateId ?? '').filter(Boolean);
      const statuses = [...new Set(candidateRows.map((candidate) => candidate.status).filter(Boolean))];
      const manualReview = dwrAccessReview[summary.waterbody] ?? null;
      const reconciliationStatus = routeSlugs.length
        ? 'covered_by_route'
        : candidateIds.length
          ? 'tracked_candidate'
          : manualReview
            ? 'manually_dispositioned'
            : summary.waterbodyClass === 'still_or_open_water'
              ? 'screened_out_still_or_open_water'
            : 'unreconciled_access_waterbody';

      return {
        ...summary,
        normalizedWaterbody,
        routeSlugs,
        candidateIds,
        candidateStatuses: statuses,
        manualReview,
        reconciliationStatus,
      };
    });

  const riverCatalog = dwrRiverCatalog.map(([name, url]) => {
    const relatedGaugeReviews = gaugeReviews.filter((review) =>
      asStringArray(review.routeFamilies).some((family) => namesMatch(name, family)),
    );
    return {
      name,
      url,
      routeSlugs: virginiaRoutes.filter((route) => namesMatch(name, route.name)).map((route) => route.slug),
      candidateIds: candidates
        .filter((candidate) => namesMatch(name, candidate.river ?? ''))
        .map((candidate) => candidate.id ?? candidate.candidateId ?? '')
        .filter(Boolean),
      gaugeKeys: relatedGaugeReviews.map((review) => review.key).filter(Boolean),
      gaugeStatuses: [...new Set(relatedGaugeReviews.map((review) => review.status).filter(Boolean))],
      manualReview: dwrRiverCatalogReview[name] ?? null,
    };
  });

  const artifact = {
    version: 1,
    stateId: 'VA',
    stateName: 'Virginia',
    generatedAt: new Date().toISOString(),
    inventoryMethod: {
      primaryBaseline: 'Virginia DWR maintained boating-access FeatureServer, queried statewide with where=1=1.',
      inclusionRule: 'Every returned DWR access feature is retained. Waterbody labels are grouped only for reconciliation; no access point is silently discarded.',
      movingWaterRule: 'Labels containing lake, reservoir, pond, inlet, bay, sound, harbor, channel, or roads are marked still_or_open_water; all other labels remain moving_water_or_ambiguous and require human corridor review.',
      qualificationRule: 'An access label is not a route qualification. A route still requires the strict PaddleToday evidence package and an explicit implemented or blocked disposition.',
      catalogDispositionRule: 'Every DWR named-river catalog family without a route, candidate, or gauge-review linkage receives an explicit blocked or screened-out disposition with a retryable evidence condition.',
      limitations: [
        'The DWR maintained layer is the statewide authoritative public-access baseline, not a complete census of municipal, county, park, federal, or outfitter launches.',
        'Waterbody naming includes legacy abbreviations and typos; normalization is deliberately conservative and reviewable.',
        'Coordinates are DWR access-point anchors and do not by themselves prove a wetted-edge entry.',
      ],
    },
    sources: [
      {
        id: 'va-dwr-maintained-boating-access',
        authority: 'Virginia Department of Wildlife Resources',
        url: dwrLayerUrl,
        coverage: 'Statewide maintained public boating-access point layer',
      },
      {
        id: 'va-dcr-river-paddling-catalog',
        authority: 'Virginia Department of Conservation and Recreation',
        url: 'https://www.dcr.virginia.gov/state-parks/paddling-rivers',
        coverage: 'State-park river-paddling destinations and river access context',
      },
      {
        id: 'va-dwr-waterbody-pages',
        authority: 'Virginia Department of Wildlife Resources',
        url: 'https://dwr.virginia.gov/boating/boaters-guide/enjoying-the-water/',
        coverage: 'Waterbody guidance, access context, and boating safety rules',
      },
      {
        id: 'va-dwr-rivers-and-streams-catalog',
        authority: 'Virginia Department of Wildlife Resources',
        url: 'https://dwr.virginia.gov/rivers/',
        coverage: 'Statewide named rivers and streams catalog used to detect corridor families absent from the access layer reconciliation',
      },
      {
        id: 'va-usgs-stream-gauges',
        authority: 'U.S. Geological Survey',
        url: 'https://waterdata.usgs.gov/va/nwis/current/?type=flow',
        coverage: 'Hydrologic stations for direct or clearly labeled proxy review',
      },
      {
        id: 'va-public-land-access',
        authority: 'Virginia State Parks and U.S. Forest Service',
        url: 'https://www.dcr.virginia.gov/state-parks/paddling',
        coverage: 'Park and public-land paddling, camping, and access corroboration',
      },
    ],
    statewideDwrAccess: {
      layerUrl: dwrLayerUrl,
      queryUrl: dwrQueryUrl,
      featureCount: rows.length,
      rawDistinctWaterbodyLabelCount: new Set(rows.map((row) => row.waterbody)).size,
      normalizedWaterbodyGroupCount: waterbodies.length,
      waterbodies,
      accessSites: rows,
    },
    statewideDwrRiverCatalog: riverCatalog,
    reconciliation: {
      currentVirginiaRouteCount: virginiaRoutes.length,
      currentVirginiaCandidateCount: candidates.length,
      routeCoveredWaterbodyCount: waterbodies.filter((waterbody) => waterbody.reconciliationStatus === 'covered_by_route').length,
      trackedCandidateWaterbodyCount: waterbodies.filter((waterbody) => waterbody.reconciliationStatus === 'tracked_candidate').length,
      unreconciledAccessWaterbodyCount: waterbodies.filter((waterbody) => waterbody.reconciliationStatus === 'unreconciled_access_waterbody').length,
      stillOrOpenWaterGroupCount: waterbodies.filter((waterbody) => waterbody.reconciliationStatus === 'screened_out_still_or_open_water').length,
      unreconciledMovingWaterLabels: waterbodies
        .filter((waterbody) => waterbody.reconciliationStatus === 'unreconciled_access_waterbody' && waterbody.waterbodyClass === 'moving_water_or_ambiguous')
        .map((waterbody) => waterbody.waterbody),
      dwrRiverCatalogCount: dwrRiverCatalog.length,
      dwrRiverCatalogWithoutRouteOrCandidate: dwrRiverCatalog
        .filter(([name]) => !virginiaRoutes.some((route) => namesMatch(name, route.name)) && !candidates.some((candidate) => namesMatch(name, candidate.river ?? '')))
        .map(([name]) => name),
      dwrRiverCatalogWithoutRouteCandidateOrGaugeReview: riverCatalog
        .filter((river) => !river.routeSlugs.length && !river.candidateIds.length && !river.gaugeKeys.length)
        .map((river) => river.name),
      dwrRiverCatalogWithoutRouteCandidateGaugeReviewOrDisposition: riverCatalog
        .filter((river) => !river.routeSlugs.length && !river.candidateIds.length && !river.gaugeKeys.length && !river.manualReview)
        .map((river) => river.name),
      dwrRiverCatalogManualDispositionCounts: riverCatalog
        .filter((river) => river.manualReview)
        .reduce<Record<string, number>>((counts, river) => {
          const disposition = river.manualReview!.disposition;
          counts[disposition] = (counts[disposition] ?? 0) + 1;
          return counts;
        }, {}),
      pendingRouteCandidateWaterbodies: waterbodies
        .filter((waterbody) => waterbody.manualReview?.disposition === 'route_candidate' && !waterbody.routeSlugs.length)
        .map((waterbody) => waterbody.waterbody),
      manualDispositionCounts: waterbodies
        .filter((waterbody) => waterbody.manualReview)
        .reduce<Record<string, number>>((counts, waterbody) => {
          const disposition = waterbody.manualReview!.disposition;
          counts[disposition] = (counts[disposition] ?? 0) + 1;
          return counts;
        }, {}),
      nextAction: 'Review every unreconciled moving-water-or-ambiguous label against DWR waterbody pages, local/park/federal access authorities, USGS station coverage, and the strict route package before any completeness claim.',
    },
  };

  writeFileSync(inventoryPath, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(`Wrote ${inventoryPath}: ${rows.length} access sites across ${waterbodies.length} waterbody labels.`);
  console.log(JSON.stringify(artifact.reconciliation, null, 2));
}

await main();
