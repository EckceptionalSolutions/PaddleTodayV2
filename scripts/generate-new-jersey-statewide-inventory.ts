import { writeFileSync } from 'node:fs';
import { newJerseyRoutes } from '../src/data/routes/new-jersey';

type Feature = {
  attributes?: Record<string, unknown>;
  geometry?: { x?: number; y?: number };
};

const layerUrl = 'https://mapsdep.nj.gov/arcgis/rest/services/Features/Environmental_admin/MapServer/7';
const usgsSiteInventoryUrl = 'https://waterservices.usgs.gov/nwis/site/?format=rdb&stateCd=nj&siteType=ST&siteStatus=all&siteOutput=expanded';
const inventoryPath = 'docs/operations/new-jersey-statewide-inventory.json';

const corridorCatalog = [
  ['Musconetcong River', 'route_candidate', 'NJDEP names a three-mile Waterloo Road-to-Saxton Falls water trail.'],
  ['Wading River', 'route_candidate', 'NJDEP publishes a marked canoe/kayak water trail with named bridge, campground, level, and obstacle guidance.'],
  ['Oswego River', 'route_candidate', 'NJDEP publishes a marked canoe/kayak water trail with Harrisville access and USGS level guidance.'],
  ['Batsto River', 'route_candidate', 'NJDEP publishes a Batsto/Mullica water-trail map; the Hampton Furnace-to-Lower Forge section is currently closed and requires an explicit closure gate.'],
  ['Mullica River', 'route_candidate', 'NJDEP names the Batsto/Mullica canoe-and-kayak water-trail family, and the public-access inventory identifies the Pleasant Mills canoe/kayak facility; the bounded reach retains operator-permission, current access, shallow-water, and visual-condition gates.'],
  ['Rancocas Creek', 'route_candidate', 'NJDEP’s water-trail map/application names a connected public-access corridor from Iron Works Park through Hainesport and a municipal launch family; the selected records preserve current launch, tide, waterline, and state-park-advisory gates.'],
  ['Delaware River', 'route_candidate', 'NJDEP and NPS list public New Jersey river accesses with GPS coordinates, NPS publishes the Middle Delaware access chain and mileage, and DRBC indexes the non-tidal Delaware River Water Trail; selected reaches use direct or clearly labeled route-context USGS evidence.'],
  ['Pequest River', 'route_candidate', 'American Whitewater identifies a Class I–II Route 46-to-Delaware recreational reach with direct USGS 01445500 context and named access options; NJDEP lists Route 46 Fish & Wildlife and Orchard Street Bridge access, while NJDEP monitoring records provide on/near-water anchors for this bounded package before the Belvidere dams.'],
  ['Stony Brook', 'blocked_threshold_endpoint_package', 'USGS identifies a distinct moving-water family, but the reviewed access records are not enough to infer a public paddle route or a defensible endpoint package.'],
  ['Manasquan River', 'route_candidate', 'NJDEP identifies Hospital Road and Brice Park as public Manasquan River access settings, the NJDEP education guide supplies Brice Park parking/carry and coordinates, NJDEP Water Quality Portal supplies a named Hospital Road on/near-water anchor, and USGS 01408000 supplies clearly labeled upstream route-context telemetry for the bounded freshwater-tidal reach.'],
  ['Alloway Creek', 'route_candidate', 'NJDEP identifies QT00115 at Quinton Alloway Road as a kayak launch, Lower Alloways Creek Township publishes the Hancocks Bridge Front Street public ramp and current registration/no-overnight-parking controls, USGS 01483050 supplies direct estuary telemetry at the downstream endpoint area, and a public-domain USGS survey image documents the same reach.'],
  ['Millstone River', 'route_candidate', 'NJDEP identifies the primitive Lincoln Avenue Park boat launch and kayak/canoe drifting context; the associated NJDEP access-coordinate record and continuous USGS Millstone telemetry support a bounded same-access planning route with explicit day-of access and proxy-flow controls.'],
  ['South Branch Raritan River', 'route_candidate', 'Hunterdon County identifies Sunnyside and Stanton Station as recommended canoe/kayak access sites; NJDEP monitoring records provide named on/near-water Kiceniuk and Stanton Station anchors, and USGS 01397000 provides continuous direct Stanton telemetry for a bounded short reach.'],
  ['North Branch Raritan River', 'route_candidate', 'Raritan Headwaters documents a public seven-mile mostly flat-water kayak/canoe paddle from Burnt Mills Road to the North/South Branch confluence, with event-specific USGS 01397000 stage controls; NJDEP current access material identifies North Branch Park, and NJDEP monitoring records provide Burnt Mills and confluence-area on/near-water anchors.'],
  ['Crosswicks Creek', 'blocked_threshold_endpoint_package', 'USGS identifies a distinct moving-water family, but current public water-entry, tidal-transition, and route-specific safety controls remain unresolved.'],
  ['Abbott Marshlands Tidal Water Trail', 'blocked_tidal_marsh_route_package', 'DRBC indexes the Abbott Marshlands Tidal Water Trail, and the Friends of the Abbott Marshlands identifies canoe access at Watson Woods, Bordentown Beach, and the Trenton Boat Launch with dangerous tidal-current warnings. The reviewed material does not establish one named moving-water corridor with same-waterway endpoints, canonical route continuity, current launch controls, or a route-specific gauge/tide package; retain as a distinct tidal-marsh lead rather than silently treating it as a river route.'],
  ['Cohansey River', 'route_candidate', 'NJDEP’s current public-access inventory identifies BRIC01315 Bridgeton Municipal Ramp and FT02517 Back Neck Road as public Fishing, Boat sites with coordinates; the dated ramp guide adds a route-specific low-tide depth warning, and USGS 01412800/01413038 provide clearly labeled same-river discharge and tidal context for a bounded planning reach.'],
  ['Toms River', 'route_candidate', 'Bounded Pine Beach-to-Gilford and Pine Beach-to-Henley segments now have current NJDEP public Boat access anchors. PBP01215 Pine Beach Municipal Boat Ramp and TRT25315 Riverside Drive/Garfield Avenue are corroborated by the Toms River Township municipal access plan’s public Gilford-area ramp-for-fee context; the dated NJDEP ramp guide supplies Pine Beach low-tide context, USGS 01408500 provides clearly labeled upstream route-context telemetry, and NOAA Toms River tide context supports planning-only packages with permit, seasonal, tide, water-quality, wake, dock, landing, and current-facility gates.'],
  ['Cooper Creek', 'blocked_threshold_endpoint_package', 'USGS and NJDEP access records identify an urban/tidal family, but no current point-to-point paddle package with water-quality, traffic, and endpoint controls was verified.'],
  ['Assunpink Creek', 'blocked_threshold_endpoint_package', 'USGS identifies a distinct moving-water family, but the reviewed access records did not establish two public water entries and route-specific flow/safety guidance.'],
  ['Delaware and Raritan Canal', 'blocked_nonriver_canal_gauge_package', 'NJDEP confirms canoe/kayak use and several boat launches, but this managed canal requires a distinct lock/permit/current-management package and lacks a directly linked river-gauge control in this pass.'],
  ['Hackensack River', 'blocked_threshold_endpoint_package', 'USGS identifies a major urban/tidal river family, but the reviewed NJDEP baseline did not establish a continuous public paddle reach with current water-entry, traffic, and water-quality controls.'],
  ['Rahway River', 'blocked_threshold_endpoint_package', 'USGS and NJDEP access records identify a developed river family, but no current two-endpoint paddle package with local flow and urban hazard controls cleared review.'],
  ['Pompton River', 'blocked_threshold_endpoint_package', 'USGS identifies multiple Pompton reaches, but dams, impoundments, urban access, and the reviewed endpoint sources prevent a single defensible route package.'],
  ['Whippany River', 'blocked_threshold_endpoint_package', 'USGS identifies a distinct moving-water family, but current public water entries and route-specific safety/water-quality controls were not verified.'],
  ['Wanaque River', 'blocked_threshold_endpoint_package', 'USGS identifies a reservoir and tributary family, but reservoir/intake segmentation and public paddle access remain unresolved.'],
  ['Lockatong Creek', 'blocked_threshold_endpoint_package', 'USGS identifies a Delaware tributary family, but the reviewed source set did not establish two lawful public paddle endpoints with local flow and hazard guidance.'],
  ['Pohatcong Creek', 'blocked_threshold_endpoint_package', 'USGS identifies a Delaware tributary family, but no named current public paddle endpoint pair or route-specific controls cleared review.'],
  ['Mantua Creek', 'blocked_threshold_endpoint_package', 'USGS and NJDEP access records identify an urban/tidal creek family, but no bounded route with current launch, tide, water-quality, and traffic controls was verified.'],
  ['Metedeconk River', 'blocked_threshold_endpoint_package', 'USGS and NJDEP access records identify a tidal/urban river family, but no single defensible moving-water route with current endpoint and navigation controls cleared review.'],
  ['Salem River', 'route_candidate', 'NJDEP’s current access layer identifies MANT00716 Hawk Ridge Road as public Fishing, Boat access with a kayak-launch comment and SC00515 Eighth Street as public access with a kayak-launch comment; NJDEP’s 2023 restoration page confirms the Route 540 canoe/kayak launch and parking improvements, while USGS 01482650 and NOAA Salem tide context support a bounded tidal planning package with explicit low-tide, navigation, water-quality, and landing gates.'],
  ['Cedar Creek', 'route_candidate', 'NJDEP names the Ore Pond, White Bridge, Western Boulevard, and Dudley Park Cedar Creek access chain and provides route-specific timing, portage, and safety guidance. The selected Ore Pond-to-Dudley package remains planning-only and closed for practical purposes under the current winter-storm debris advisory until NJDEP confirms clearance.'],
  ['Great Egg Harbor River', 'route_candidate', 'NPS identifies the Penny Pot-to-Lake Lenape stretch as the best 22-mile canoeing reach and says Weymouth can cut it roughly in half; Atlantic County documents canoe/kayak access, a Lake Lenape boat ramp, wild-and-scenic entry/removal permits, and endpoint camping, while NJDEP on/near-water anchors and direct USGS Weymouth telemetry support the bounded package.'],
  ['Maurice River', 'route_candidate', 'Current NJDEP public-access inventory identifies Fowser Road and Matts Landing public boat-access points, and the official ramp guide documents low-tide depth cautions; the bounded tidal reach retains tide, wind, waterline, traffic, and water-quality gates.'],
  ['Raritan River', 'blocked_threshold_endpoint_package', 'The access baseline contains tidal visual/fishing points and the river has multiple urban/tidal reaches; no single defensible route package was inferred.'],
  ['Passaic River', 'route_candidate', 'PVSC documents the Lower Passaic River Blueway as an approximately 32-mile canoe/kayak trail with 20 public launch/access sites; the bounded Suchorsky-to-Pennington reach uses two municipal canoe launches, a direct Little Falls USGS station, and explicit Great Falls/urban-water-quality controls.'],
  ['Rockaway River', 'blocked_threshold_endpoint_package', 'NJDEP’s current trout-water access listing names several public Rockaway River fishing/access locations, and USGS 01379845 provides current Dover telemetry, but the reviewed access source does not establish independent paddle launch rights or one bounded route package; the Boonton Gorge whitewater reach also requires separate Class IV–V and legal/access review.'],
  ['Ramapo River', 'blocked_threshold_endpoint_package', 'NJDEP’s current trout-water access listing names public Ramapo River fishing/access locations in Mahwah, Oakland, and Wayne, and USGS 01387500 provides current route-context telemetry near Mahwah, but the reviewed sources do not establish independent canoe/kayak launch rights or a continuous New Jersey endpoint pair; the available Tuxedo-to-Suffern whitewater description does not supply New Jersey-specific authorization.'],
  ['Pequannock River', 'blocked_threshold_endpoint_package', 'Gauge coverage exists, but reservoir/intake/dam segmentation and public endpoint controls remain unresolved.'],
  ['Wallkill River', 'blocked_threshold_endpoint_package', 'Gauge coverage exists, but the NJ reach needs a distinct access and boundary package rather than inference from crossings.'],
  ['Paulins Kill', 'route_candidate', 'NJDEP Fish & Wildlife lists Garrison Road walk-in access on the East Branch, NJDEP monitoring records provide named on/near-water anchors at Garrison Road and State Highway 94, American Whitewater documents the Class I–II moving-water family and dam/wood hazards, and USGS 01443500 supplies clearly labeled downstream proxy flow context for the bounded reach.'],
  ['Rockaway Creek', 'blocked_whitewater_access_package', 'American Whitewater identifies a distinct 3.9-mile Mountainville-to-McCrea Mills reach at Class II–IV with short-duration storm flow, strainers, low bridges, and no developed or standard put-ins/take-outs. NJDEP’s current access list is an angling-access baseline rather than paddle-launch authorization, while USGS provides same-creek monitoring context.'],
  ['Spruce Run Creek', 'blocked_threshold_endpoint_package', 'NJDEP’s current trout-water access list names School Street and Van Syckel’s Corner Road fishing-access settings, and American Whitewater lists an Upper Spruce Run Class II reach with USGS gauge context. The reviewed sources do not establish a current lawful canoe/kayak endpoint pair independent of fishing access, and the downstream reservoir transition requires separate controls.'],
  ['Wickecheoke Creek', 'blocked_whitewater_access_package', 'American Whitewater identifies a distinct Class III–IV Upper Creek Road-to-Covered Bridge reach, but the available flow listing is stale and NJDEP’s current access listing is a fishing/roadside setting rather than a verified paddle launch. No current two-endpoint package with route-specific hazard and access authorization cleared review.'],
  ['Raccoon Creek', 'blocked_threshold_endpoint_package', 'USGS identifies Raccoon Creek at Wrights Mill as a current monitored stream and NJDEP identifies Raccoon Creek WMA and fishing-access holdings, but the reviewed official sources do not establish two lawful paddle endpoints or a route-specific safety and landing package. County canoe/kayak facilities found in this pass are on Wilson Lake/Scotland Run, not the moving Raccoon Creek channel.'],
  ['Saddle River', 'blocked_threshold_endpoint_package', 'Bergen County and NJDEP identify Saddle River County Park and its Wild Duck Pond car-top access setting, but the reviewed material is oriented to fishing and park recreation, notes a waterfall, and does not establish a continuous public moving-water paddle reach with route-specific flow thresholds. USGS has direct Saddle River station context, but not a verified recreational threshold package.'],
  ['Oldmans Creek', 'blocked_tidal_endpoint_package', 'South Jersey Land & Water Trust authorizes canoe/kayak use at the Oldmans Creek Preserve landing but requires hand-portage from the parking area, prohibits camping, and describes the creek as tidal with flow reversing or stopping at tide change. The reviewed municipal planning material reports no designated launch sites in the broader Woolwich reach, and USGS provides only historical or non-continuous context; no independent second endpoint or complete tidal package cleared review.'],
  ['Tidal bays, creeks, and marsh routes', 'screened_out_tidal_open_water', 'The NJDEP baseline contains many tidal visual, beach, and fishing points. They remain a separate tide/navigation inventory and are not counted as freshwater moving-water corridors without a bounded route package.'],
] as const;

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function expandWaterwayAbbreviations(value: string) {
  return normalize(value)
    .replace(/\bsb\b/g, 'south branch')
    .replace(/\bnb\b/g, 'north branch')
    .replace(/\bswb\b/g, 'southwest branch')
    .replace(/\bwb\b/g, 'west branch')
    .replace(/\beb\b/g, 'east branch')
    .replace(/\bs br\b/g, 'south branch')
    .replace(/\bn br\b/g, 'north branch')
    .replace(/\bs b\b/g, 'south branch')
    .replace(/\bn b\b/g, 'north branch')
    .replace(/\bck\b/g, 'creek')
    .replace(/\bbk\b/g, 'brook')
    .replace(/\brn\b/g, 'run')
    .replace(/\briv\b/g, 'river')
    .replace(/\s+/g, ' ')
    .trim();
}

function catalogFamilyForLead(leadName: string) {
  const expandedLead = expandWaterwayAbbreviations(leadName);
  return corridorCatalog.find(([catalogName]) => {
    const expandedCatalog = expandWaterwayAbbreviations(catalogName);
    return expandedLead === expandedCatalog
      || expandedLead.startsWith(`${expandedCatalog} `)
      || expandedCatalog.startsWith(`${expandedLead} `);
  })?.[0] ?? null;
}

function buildPrioritizedLeadReviews(leads: Array<{
  name: string;
  normalizedName: string;
  siteCount: number;
  siteIds: string[];
  sampleStations: string[];
  catalogMatch: string | null;
}>) {
  return leads.map((lead) => {
    const relatedFamily = catalogFamilyForLead(lead.name);
    if (relatedFamily) {
      return {
        lead: lead.name,
        normalizedName: lead.normalizedName,
        siteCount: lead.siteCount,
        siteIds: lead.siteIds,
        sampleStations: lead.sampleStations,
        disposition: 'covered_by_catalog_family',
        relatedFamily,
        reason: `The USGS lead is a naming or subreach variant of the cataloged ${relatedFamily} family; it is not an independent route omission. The parent family disposition controls publication, and station presence alone does not add a route.`,
        retryCondition: `Reopen only if current authoritative access and route evidence establish a distinct ${lead.name} paddle reach that is not already covered by ${relatedFamily}.`,
        sourceIds: ['usgs-new-jersey-site-inventory', 'njdep-public-access-layer'],
      };
    }
    return {
      lead: lead.name,
      normalizedName: lead.normalizedName,
      siteCount: lead.siteCount,
      siteIds: lead.siteIds,
      sampleStations: lead.sampleStations,
      disposition: 'blocked_pending_route_package',
      relatedFamily: null,
      reason: `The statewide USGS inventory identifies ${lead.name} as a named lead with ${lead.siteCount} stream-site records, but this lead is not a cataloged PaddleToday route family. The baseline review did not establish the complete lawful two-endpoint, on/near-water coordinate, flow/tide, safety, logistics, camping, imagery, and geometry package required for publication.`,
      retryCondition: `Reopen only after a dedicated ${lead.name} review verifies two current lawful paddle endpoints, route-specific flow/tide and hazard guidance, camping posture, exact coordinates, approved imagery, and canonical geometry.`,
      sourceIds: ['usgs-new-jersey-site-inventory', 'njdep-public-access-layer'],
    };
  });
}

function classifyAccessType(value: string) {
  return /boat|launch|canoe|kayak|ramp/i.test(value) ? 'boat_or_launch_like' : /visual|fishing|beach/i.test(value) ? 'visual_fishing_or_beach' : 'other';
}

type UsgsStreamSite = {
  siteId: string;
  stationName: string;
  latitude: number;
  longitude: number;
  waterwayName: string;
};

function parseRdb(text: string) {
  const lines = text.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => line.startsWith('agency_cd\t'));
  if (headerIndex < 0) throw new Error('USGS site inventory header was not found.');
  const headers = lines[headerIndex].split('\t');
  return lines.slice(headerIndex + 2)
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => {
      const values = line.split('\t');
      return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
    });
}

function waterwayNameFromStation(stationName: string) {
  const withoutState = stationName.replace(/\s+(?:NJ|New Jersey)\s*$/i, '').trim();
  const boundary = withoutState.search(/\s+(?:at|near|above|below|d\/s|u\/s|upstream|downstream|off|in|on|500\s*ft|700\s*ft|800\s*ft|900\s*ft)\b/i);
  const base = (boundary > 0 ? withoutState.slice(0, boundary) : withoutState)
    .replace(/\s+trib(?:utary)?\b.*$/i, '')
    .replace(/\s+trib\.?\s*\d*$/i, '')
    .replace(/\s+(?:Ck|Cr|C)\b/gi, ' Creek')
    .replace(/\s+(?:Bk|B)\b/gi, ' Brook')
    .replace(/\s+(?:Br)\b/gi, ' Branch')
    .replace(/\s+(?:Rn)\b/gi, ' Run')
    .replace(/\s+(?:Riv|R)\b/gi, ' River')
    .replace(/\s+(?:Ca)\b/gi, ' Canal')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return base;
}

async function queryUsgsStreamInventory(catalogNames: string[]) {
  const response = await fetch(usgsSiteInventoryUrl);
  if (!response.ok) throw new Error(`USGS site inventory failed: ${response.status}`);
  const records = parseRdb(await response.text());
  const sites: UsgsStreamSite[] = records
    .filter((record) => String(record.site_tp_cd) === 'ST')
    .map((record) => ({
      siteId: clean(record.site_no),
      stationName: clean(record.station_nm),
      latitude: Number(record.dec_lat_va),
      longitude: Number(record.dec_long_va),
      waterwayName: waterwayNameFromStation(clean(record.station_nm)),
    }))
    .filter((site) => site.siteId && site.stationName && Number.isFinite(site.latitude) && Number.isFinite(site.longitude) && site.waterwayName);
  const catalogNormalized = catalogNames.map((name) => normalize(name));
  const byWaterway = new Map<string, UsgsStreamSite[]>();
  for (const site of sites) {
    const key = normalize(site.waterwayName);
    const existing = byWaterway.get(key) ?? [];
    existing.push(site);
    byWaterway.set(key, existing);
  }
  const leads = [...byWaterway.values()]
    .map((waterwaySites) => {
      const name = waterwaySites[0].waterwayName;
      const normalizedName = normalize(name);
      const catalogMatch = catalogNormalized.find((catalogName) => catalogName === normalizedName || catalogName.startsWith(`${normalizedName} `) || normalizedName.startsWith(`${catalogName} `)) ?? null;
      return {
        name,
        normalizedName,
        siteCount: waterwaySites.length,
        siteIds: waterwaySites.map((site) => site.siteId).slice(0, 25),
        sampleStations: [...new Set(waterwaySites.map((site) => site.stationName))].slice(0, 5),
        catalogMatch,
      };
    })
    .sort((left, right) => right.siteCount - left.siteCount || left.name.localeCompare(right.name));
  const prioritizedUnreconciledLeads = leads.filter((lead) => (
    !lead.catalogMatch
    && lead.siteCount >= 2
    && /(?:river|creek|brook|branch|run|kill|canal|ditch|swamp|marsh)/i.test(lead.name)
    && !/(?:unnamed|tributary|ephemeral)/i.test(lead.name)
  ));
  return {
    queryUrl: usgsSiteInventoryUrl,
    siteCount: sites.length,
    waterwayLeadCount: leads.length,
    prioritizedUnreconciledLeadCount: prioritizedUnreconciledLeads.length,
    leads,
  };
}

async function queryAllAccessSites() {
  const countUrl = `${layerUrl}/query?where=1%3D1&returnCountOnly=true&f=json`;
  const countResponse = await fetch(countUrl);
  if (!countResponse.ok) throw new Error(`NJDEP access count failed: ${countResponse.status}`);
  const countPayload = await countResponse.json() as { count?: number; error?: unknown };
  if (countPayload.error) throw new Error(JSON.stringify(countPayload.error));
  const count = Number(countPayload.count ?? 0);
  const rows: Array<Record<string, unknown>> = [];
  for (let offset = 0; offset < count; offset += 2000) {
    const url = `${layerUrl}/query?where=1%3D1&outFields=PA_ID%2CSTREET%2CACCESS_TYP%2CCOUNTY_LAB%2CMUN_LABEL%2CCOMMENTS%2CREVIEW_TYPE&returnGeometry=true&outSR=4326&resultOffset=${offset}&resultRecordCount=2000&f=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NJDEP access page failed: ${response.status}`);
    const payload = await response.json() as { features?: Feature[]; error?: unknown };
    if (payload.error) throw new Error(JSON.stringify(payload.error));
    for (const feature of payload.features ?? []) {
      const attributes = feature.attributes ?? {};
      rows.push({
        id: clean(attributes.PA_ID),
        street: clean(attributes.STREET),
        accessType: clean(attributes.ACCESS_TYP),
        accessTypeClass: classifyAccessType(clean(attributes.ACCESS_TYP)),
        county: clean(attributes.COUNTY_LAB),
        municipality: clean(attributes.MUN_LABEL),
        comments: clean(attributes.COMMENTS),
        reviewType: clean(attributes.REVIEW_TYPE),
        latitude: Number.isFinite(Number(feature.geometry?.y)) ? Number(feature.geometry?.y) : null,
        longitude: Number.isFinite(Number(feature.geometry?.x)) ? Number(feature.geometry?.x) : null,
      });
    }
  }
  return { count, rows };
}

async function main() {
  const access = await queryAllAccessSites();
  const usgsStreamInventory = await queryUsgsStreamInventory(corridorCatalog.map(([name]) => name));
  const prioritizedLeadReviews = buildPrioritizedLeadReviews(usgsStreamInventory.leads.filter((lead) => (
    !lead.catalogMatch
    && lead.siteCount >= 2
    && /(?:river|creek|brook|branch|run|kill|canal|ditch|swamp|marsh)/i.test(lead.name)
    && !/(?:unnamed|tributary|ephemeral)/i.test(lead.name)
  )));
  const byType = access.rows.reduce<Record<string, number>>((counts, row) => {
    const key = String(row.accessTypeClass);
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});
  const routeFamilies = corridorCatalog.map(([name, disposition, reason]) => ({
    name,
    normalizedName: normalize(name),
    disposition,
    reason,
    routeSlugs: newJerseyRoutes.filter((route) => normalize(route.name) === normalize(name)).map((route) => route.slug),
    gaugeEvidence: newJerseyRoutes.filter((route) => normalize(route.name) === normalize(name)).map((route) => ({ siteId: route.gaugeSource.siteId, siteName: route.gaugeSource.siteName, kind: route.gaugeSource.kind })),
  }));
  const artifact = {
    version: 1,
    stateId: 'NJ',
    stateName: 'New Jersey',
    generatedAt: new Date().toISOString(),
    inventoryMethod: {
      primaryBaseline: 'NJDEP Public Access point layer, queried statewide with where=1=1 and paginated at the ArcGIS service limit.',
      secondaryBaseline: `USGS New Jersey stream-site inventory was queried and summarized (${usgsStreamInventory.siteCount} stream sites, ${usgsStreamInventory.waterwayLeadCount} named waterway leads) alongside the current-station index; USGS presence alone never qualifies a route.`,
      inclusionRule: 'Every returned NJDEP public-access feature is retained in the artifact; access-type grouping is descriptive and does not qualify a route by itself.',
      qualificationRule: 'A public-access point is not a PaddleToday route. A route requires two lawful named boundaries, on/near-water coordinates, direct or clearly labeled proxy gauge evidence, route-specific flow/tide guidance, safety, logistics, camping posture, and approved imagery.',
      limitations: ['NJDEP describes this layer as an inventory collected to date; it is not a complete census of every municipal, county, federal, or outfitter access.', 'The layer is primarily a tidal-water public-access inventory and includes visual, fishing, and beach points that must not be treated as boat launches.', 'Coordinates are access-area anchors and require current water-entry, parking, carry, and closure verification.'],
    },
    sources: [
      { id: 'njdep-public-access-layer', authority: 'New Jersey Department of Environmental Protection', url: layerUrl, coverage: 'Statewide public-access inventory baseline' },
      { id: 'njdep-water-trail-guides', authority: 'New Jersey Department of Environmental Protection', url: 'https://dep.nj.gov/parksandforests/brochures-and-trail-guides/', coverage: 'State-park water trails, access, hazards, and camping context' },
      { id: 'drbc-water-trails', authority: 'Delaware River Basin Commission', url: 'https://www.nj.gov/drbc/basin/recreation/water-trail-guides.html', coverage: 'Delaware and tributary water-trail guidance' },
      { id: 'nps-dewa-boating', authority: 'National Park Service, Delaware Water Gap National Recreation Area', url: 'https://www.nps.gov/dewa/planyourvisit/boating-and-boating-safety.htm', coverage: 'Middle Delaware New Jersey access chain, mileage, and boating safety guidance' },
      { id: 'njdep-millstone-boating', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://www.nj.gov/dep/fgw/artmillstone.htm', coverage: 'Millstone River kayak/canoe drifting and Lincoln Avenue Park primitive-launch context' },
      { id: 'njdep-millstone-access-coordinate', authority: 'New Jersey Department of Environmental Protection Bureau of Freshwater and Biological Monitoring', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BFBM/NJDEP_BFBM-AN0414A/', coverage: 'Millstone River at park access of Lincoln Ave on/near-water coordinate' },
      { id: 'hunterdon-south-branch-canoe-kayak', authority: 'Hunterdon County Division of Parks and Recreation', url: 'https://co.hunterdon.nj.us/DocumentCenter/View/3088/South-Branch-Reservation-Main-Brochure-PDF?bidId=', coverage: 'South Branch Nature Preserve canoe/kayak access and named Sunnyside/Stanton Station sections' },
      { id: 'njdep-south-branch-kiceniuk-coordinate', authority: 'New Jersey Department of Environmental Protection Bureau of Freshwater and Biological Monitoring', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BFBM/NJDEP_BFBM-NJS11-112/', coverage: 'South Branch Raritan River at Kiceniuk Road on/near-water coordinate' },
      { id: 'njdep-south-branch-stanton-coordinate', authority: 'New Jersey Department of Environmental Protection Bureau of Environmental Analysis, Restoration and Standards', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BEARS/NJDEP_BEARS-SBRR8/', coverage: 'South Branch Raritan River at Stanton Station Road on/near-water coordinate' },
      { id: 'pvsc-passaic-blueway', authority: 'Passaic Valley Sewerage Commission', url: 'https://www.nj.gov/pvsc/protect/', coverage: 'Lower Passaic River Blueway canoe/kayak trail, public launch network, portage, and river-restoration context' },
      { id: 'pvsc-passaic-blueway-launch-layer', authority: 'Passaic Valley Sewerage Commission / ArcGIS', url: 'https://services6.arcgis.com/vR6eTUofaLAKDxrt/arcgis/rest/services/Passaic_River_Blueway_2_WFL1/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=json', coverage: 'Official WGS84 canoe-launch features for Suchorsky and Pennington endpoints' },
      { id: 'nps-great-egg-harbor-directions', authority: 'National Park Service, Great Egg Harbor River', url: 'https://www.nps.gov/greg/planyourvisit/directions.htm', coverage: 'Recommended canoeing reach and Weymouth halfway access context' },
      { id: 'atlantic-county-great-egg-small-vessels', authority: 'Atlantic County Division of Parks and Recreation', url: 'https://www.atlanticcountynj.gov/government/county-departments/department-of-public-works/division-of-parks-and-recreation/boating/wild-and-scenic-access-for-small-vessels', coverage: 'Great Egg Harbor/Lake Lenape small-vessel entry, removal, permit, carry, and dusk controls' },
      { id: 'atlantic-county-lake-lenape', authority: 'Atlantic County Division of Parks and Recreation', url: 'https://www.atlanticcountynj.gov/Home/Components/FacilityDirectory/FacilityDirectory/6/320', coverage: 'Lake Lenape Park West boat ramp, canoe access, boating, and camping context' },
      { id: 'njdep-great-egg-weymouth-coordinate', authority: 'NJDEP AmeriCorps / Water Quality Portal', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_AMERICORPS/NJDEP_AMERICORPS-WAWeymouth123/', coverage: 'Weymouth Furnace Park/Great Egg Harbor River on/near-water coordinate' },
      { id: 'njdep-great-egg-lake-coordinate', authority: 'NJDEP Bureau of Freshwater and Biological Monitoring / Water Quality Portal', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BFBM/NJDEP_BFBM-FTM029/', coverage: 'Lake Lenape on/near-water coordinate anchor' },
      { id: 'usgs-great-egg-weymouth', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01411110/', coverage: 'Direct Great Egg Harbor River at Weymouth flow/stage telemetry' },
      { id: 'american-whitewater-pequest', authority: 'American Whitewater', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/1198/main', coverage: 'Pequest Class I–II reach, Route 46 put-in, flow-status context, public access options, and Belvidere dam hazards' },
      { id: 'njdep-pequest-access', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-alphabetical/', coverage: 'Pequest Route 46 Fish & Wildlife and Orchard Street Bridge public access settings' },
      { id: 'njdep-pequest-route46-coordinate', authority: 'NJDEP AmeriCorps / Water Quality Portal', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_AMERICORPS/NJDEP_AMERICORPS-WA2468/', coverage: 'Pequest River at Route 46 on/near-water coordinate' },
      { id: 'njdep-pequest-orchard-coordinate', authority: 'NJDEP Bureau of Freshwater and Biological Monitoring / Water Quality Portal', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BFBM/NJDEP_BFBM-FIBI130/', coverage: 'Pequest River at Orchard Street on/near-water coordinate' },
      { id: 'usgs-pequest', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01445500/', coverage: 'Direct Pequest River at Pequest flow/stage telemetry' },
      { id: 'american-whitewater-paulins-kill', authority: 'American Whitewater', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/1196/main', coverage: 'Paulins Kill Class I–II moving-water, low-flow, wood, dam, and access context' },
      { id: 'njdep-paulins-access', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-alphabetical/', coverage: 'Paulins Kill Garrison Road public walk-in access and route access context' },
      { id: 'njdep-paulins-garrison-coordinate', authority: 'New Jersey Department of Environmental Protection Bureau of Freshwater and Biological Monitoring', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BFBM/NJDEP_BFBM-BFBM000176/', coverage: 'Paulins Kill at Garrison Road on/near-water coordinate' },
      { id: 'njdep-paulins-route94-coordinate', authority: 'New Jersey Department of Environmental Protection Bureau of Freshwater and Biological Monitoring', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BFBM/NJDEP_BFBM-FIBI128a/', coverage: 'Paulins Kill at State Highway 94 on/near-water coordinate' },
      { id: 'usgs-paulins-kill', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01443500/', coverage: 'Paulins Kill at Blairstown continuous discharge and stage proxy telemetry' },
      { id: 'njdep-manasquan-access', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://www.nj.gov/dep/fgw/mansqnaccess.htm', coverage: 'Manasquan River Hospital Road and Brice Park public access, freshwater-tidal conditions, and intake-weir hazard context' },
      { id: 'njdep-manasquan-trout-access', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-alphabetical/', coverage: 'Current-ish Manasquan Hospital Road and Brice Park access directions' },
      { id: 'njdep-manasquan-brice-coordinate', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://www.nj.gov/dep/fgw/pdf/education/tic_release_day_guide.pdf', coverage: 'Brice Park at Allenwood-Lakewood Road public parking, carry-in/carry-out, water distance, and coordinate' },
      { id: 'njdep-manasquan-hospital-coordinate', authority: 'NJDEP Bureau of Freshwater and Biological Monitoring / Water Quality Portal', url: 'https://www.waterqualitydata.us/provider/STORET/NJDEP_BFBM/NJDEP_BFBM-0140802850/', coverage: 'Manasquan River off Hospital Road on/near-water coordinate' },
      { id: 'usgs-manasquan', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01408000/', coverage: 'Manasquan River at Squankum upstream route-context discharge and stage telemetry' },
      { id: 'njdep-alloway-access', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-alphabetical/', coverage: 'Current NJDEP QT00115 Quinton Alloway Road Fishing, Boat access explicitly commented as a kayak launch' },
      { id: 'njdep-cohansey-access', authority: 'New Jersey Department of Environmental Protection', url: layerUrl, coverage: 'Current public-access inventory anchors for BRIC01315 Bridgeton Municipal Ramp and FT02517 Back Neck Road Cohansey River Watershed Wetland Restoration Site' },
      { id: 'njdep-cohansey-ramp-guide', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://www.nj.gov/dep/fgw/pdf/boat_ramp_guide.pdf', coverage: 'Cohansey River ramp listings and route-specific low-tide depth warning at the Back Neck wetland-restoration site' },
      { id: 'usgs-cohansey-seeley', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01412800/', coverage: 'Same-river Cohansey discharge and gage-height route-context proxy at Seeley' },
      { id: 'usgs-cohansey-greenwich', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01413038/', coverage: 'Nearby Cohansey tidal-elevation context at Greenwich' },
      { id: 'usgs-cohansey-tidal-study', authority: 'U.S. Geological Survey', url: 'https://pubs.usgs.gov/publication/sir20255090/full', coverage: 'Current Cohansey/Maurice tidal-reach mapping and freshwater-saltwater interface context' },
      { id: 'njdep-toms-access-layer', authority: 'New Jersey Department of Environmental Protection', url: layerUrl, coverage: 'Current public Boat access anchors for PBP01215 Pine Beach Municipal Boat Ramp and PBP00315 Henley Pier' },
      { id: 'njdep-toms-ramp-guide', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://www.nj.gov/dep/fgw/pdf/boat_ramp_guide.pdf', coverage: 'Pine Beach Municipal Boat Ramp low-tide and facility context; dated source retained as planning context only' },
      { id: 'usgs-toms-river', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01408500/', coverage: 'Toms River near Toms River discharge/stage route-context proxy for the Pine Beach tidal segment' },
      { id: 'noaa-toms-river-tide', authority: 'National Oceanic and Atmospheric Administration', url: 'https://tidesandcurrents.noaa.gov/benchmarks.html?id=8533051', coverage: 'Toms River tide benchmark context for tidal planning' },
      { id: 'toms-river-township-municipal-plan', authority: 'Toms River Township', url: 'https://tomsrivertownship.com/DocumentCenter/View/346/Municipal-Public-Access-Plan-Final-PDF', coverage: 'Gilford Park/Riverside Drive public ramp-for-fee, parking, fishing-hour, and adjacent-site access context' },
      { id: 'lower-alloways-creek-hancocks-ramp', authority: 'Lower Alloways Creek Township', url: 'https://www.lowerallowayscreek-nj.gov/home/news/hb-boat-ramp', coverage: 'Hancocks Bridge Front Street public boat ramp rules, registration fees, and current local operating controls' },
      { id: 'lower-alloways-creek-ramp-registration', authority: 'Lower Alloways Creek Township', url: 'https://www.lowerallowayscreek-nj.gov/home/files/boat-rmap-application-form', coverage: 'Hancocks Bridge Front Street resident/non-resident ramp registration and fee form' },
      { id: 'usgs-alloway-hancocks', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01483050', coverage: 'Direct Alloway Creek at Hancocks Bridge estuary telemetry and official on/near-water coordinate' },
      { id: 'noaa-salem-tides', authority: 'National Oceanic and Atmospheric Administration', url: 'https://tidesandcurrents.noaa.gov/stationhome.html?id=8537979', coverage: 'Salem-area tide prediction and tidal-planning context for Alloway Creek' },
      { id: 'usgs-alloway-survey-image', authority: 'U.S. Geological Survey, New Jersey Water Science Center', url: 'https://www.usgs.gov/media/images/alloway-creek-survey', coverage: 'Public-domain same-reach Alloway Creek survey image from the Quinton boat-launch area' },
      { id: 'njdep-salem-river-launch', authority: 'New Jersey Department of Environmental Protection, Office of Natural Resources Restoration', url: 'https://dep.nj.gov/nrr/restoration/completed-restoration-projects/salem-river-boat-ramp/', coverage: 'Salem River Route 540 boat ramp and canoe/kayak launch, parking, clearance-bar, riprap, and lighting project; last update May 1, 2023' },
      { id: 'njdep-salem-access-layer', authority: 'New Jersey Department of Environmental Protection', url: layerUrl, coverage: 'Current MANT00716 Hawk Ridge Road and SC00515 Eighth Street public-access-layer records and coordinates' },
      { id: 'njdep-salem-ramp-guide', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://www.nj.gov/dep/fgw/pdf/boat_ramp_guide.pdf', coverage: 'Salem River public-ramp and low-tide depth context; dated guide used as planning context only' },
      { id: 'usgs-salem-at-salem', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01482650/', coverage: 'Salem River at Salem tidal-stream station and official station coordinate; currently no continuous data listed' },
      { id: 'noaa-salem-tides', authority: 'National Oceanic and Atmospheric Administration', url: 'https://tidesandcurrents.noaa.gov/stationhome.html?id=8537979', coverage: 'Salem-area tide prediction and tidal-navigation planning context' },
      { id: 'njdep-toms-trout-access', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-alphabetical/', coverage: 'Current-ish Toms River FREC and Riverwood Park fishing-access listings; not treated as paddle-launch proof' },
      { id: 'njdep-toms-frec', authority: 'New Jersey Department of Environmental Protection, State Parks, Forests & Historic Sites', url: 'https://dep.nj.gov/parksandforests/conservation/forest-resource-education-center-2/', coverage: 'Current FREC grounds, hours, construction/parking advisory, recreation, and fishing context' },
      { id: 'njdep-toms-frec-appointment', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://www.nj.gov/dep/fgw/pdf/education/tic_mou.pdf', coverage: 'FREC and Riverwood named Toms River access coordinates; FREC appointment restriction and Riverwood fishing-access context' },
      { id: 'toms-river-township-mpap', authority: 'New Jersey Department of Environmental Protection / Toms River Township', url: 'https://www.nj.gov/dep/cmp/access/docs/draftmpaps/toms-river-township.pdf', coverage: 'Municipal Toms River access-plan restrictions, shallow-water and low-bridge limits, and visual-only exclusions' },
      { id: 'usgs-toms-river', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01408500/', coverage: 'Direct Toms River near Toms River discharge/stage context; gauge presence does not cure unresolved paddle endpoints' },
      { id: 'drbc-abbott-marshlands-water-trail', authority: 'Delaware River Basin Commission', url: 'https://www.nj.gov/drbc/basin/recreation/water-trail-guides.html', coverage: 'Official index entry for the Abbott Marshlands Tidal Water Trail' },
      { id: 'abbott-marshlands-tidal-water-trail', authority: 'Friends for the Abbott Marshlands', url: 'https://abbottmarshlands.org/visit/tidal-water-trail/', coverage: 'Canoe/kayak launch settings at Bordentown Beach, Watson Woods, and Trenton Boat Launch plus tidal-current hazards' },
      { id: 'abbott-marshlands-access', authority: 'Friends for the Abbott Marshlands', url: 'https://abbottmarshlands.org/getting-there/', coverage: 'Named marsh access points, public directions, coordinates, tidal-water trail scope, and paddling safety controls' },
      { id: 'american-whitewater-rockaway-creek', authority: 'American Whitewater', url: 'https://www.americanwhitewater.org/content/River/view/river-detail/2860/main', coverage: 'Rockaway Creek Mountainville-to-McCrea Mills reach classification, flow thresholds, bridge/strainer hazards, and informal access limitations' },
      { id: 'njdep-trout-access-current', authority: 'New Jersey Department of Environmental Protection, Fish and Wildlife', url: 'https://dep.nj.gov/njfw/fishing/freshwater/trout-waters-by-county/', coverage: 'Current-ish fishing-access baseline used to distinguish angling access from verified paddle-launch authorization for Rockaway Creek, Spruce Run Creek, Wickecheoke Creek, and related leads' },
      { id: 'usgs-rockaway-creek-whitehouse', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01399670/', coverage: 'Same-creek South Branch Rockaway Creek flow/stage monitoring context' },
      { id: 'american-whitewater-new-jersey-index', authority: 'American Whitewater', url: 'https://www.americanwhitewater.org/content/River/view/river-index/state/USA-NJR', coverage: 'New Jersey whitewater corridor index for Spruce Run, Wickecheoke Creek, and other specialist moving-water leads' },
      { id: 'usgs-spruce-run-glen-gardner', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01396582/', coverage: 'Spruce Run at Main Street at Glen Gardner gauge context' },
      { id: 'usgs-wickecheoke-gary-corner', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01461200/', coverage: 'Wickecheoke Creek near Gary Corner stream-monitoring context' },
      { id: 'njdep-spruce-run-recreation-area', authority: 'New Jersey Department of Environmental Protection, State Parks, Forests & Historic Sites', url: 'https://dep.nj.gov/parksandforests/state-park/spruce-run-recreation-area/', coverage: 'Spruce Run reservoir boundary, boating, wind, HAB, camping, and operating controls' },
      { id: 'usgs-raccoon-creek-wrights-mill', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01477070/', coverage: 'Raccoon Creek at Wrights Mill current monitored-stream context' },
      { id: 'njdep-raccoon-wma', authority: 'New Jersey Department of Environmental Protection, Fish & Wildlife', url: 'https://dep.nj.gov/njfw/conservation/wildlife-management-areas/', coverage: 'Raccoon Creek WMA land and fishing-access baseline' },
      { id: 'gloucester-scotland-run-boat-launch', authority: 'Gloucester County', url: 'https://www.gloucestercountynj.gov/facilities/facility/details/Scotland-Run-Park-4', coverage: 'County canoe/kayak launch on Wilson Lake/Scotland Run, explicitly distinguished from the moving Raccoon Creek channel' },
      { id: 'bergen-saddle-river-county-park', authority: 'Bergen County', url: 'https://bergencountynj.gov/bergen-county-department-of-parks/saddle-river-county-park/', coverage: 'Saddle River County Park recreation, fishing, waterfall, and park-access context' },
      { id: 'usgs-saddle-river-upper-saddle', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01390450/', coverage: 'Saddle River at Upper Saddle River station and direct stream-monitoring context' },
      { id: 'sjlwt-oldmans-preserve-rules', authority: 'South Jersey Land & Water Trust', url: 'https://www.sjlandwater.org/rules-and-regulations', coverage: 'Oldmans Creek Preserve canoe/kayak landing, hand-portage, tidal, no-camping, and preserve-use controls' },
      { id: 'sjlwt-oldmans-paddling', authority: 'South Jersey Land & Water Trust', url: 'https://www.sjlandwater.org/ocp-things-to-do', coverage: 'Oldmans Creek tidal flow-reversal and creek-paddling context' },
      { id: 'dvrpc-woolwich-open-space-plan', authority: 'Delaware Valley Regional Planning Commission', url: 'https://www.dvrpc.org/reports/04017.pdf', coverage: 'Woolwich/Oldmans Creek planning evidence regarding absence of designated canoe/kayak launch sites in the broader reach' },
      { id: 'usgs-oldmans-jessups-mill', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/monitoring-location/USGS-01477440/', coverage: 'Oldmans Creek at Jessups Mill stream-site and historical-monitoring context' },
      { id: 'nps-dewa-conditions', authority: 'National Park Service, Delaware Water Gap National Recreation Area', url: 'https://www.nps.gov/dewa/planyourvisit/river-conditions.htm', coverage: 'Middle Delaware stage, temperature, closure, and current-condition screens' },
      { id: 'usgs-new-jersey-current', authority: 'U.S. Geological Survey', url: 'https://waterdata.usgs.gov/nj/nwis/current', coverage: 'Current New Jersey stage/discharge stations' },
      { id: 'usgs-new-jersey-site-inventory', authority: 'U.S. Geological Survey', url: usgsSiteInventoryUrl, coverage: 'Statewide New Jersey stream-site and named-waterway inventory used to identify additional corridor families' },
    ],
    statewideAccess: { layerUrl, queryUrl: `${layerUrl}/query`, featureCount: access.count, returnedFeatureCount: access.rows.length, accessTypeCounts: byType, sites: access.rows },
    usgsStreamInventory,
    prioritizedLeadReviews,
    corridorFamilies: routeFamilies,
    reconciliation: {
      currentNewJerseyRouteCount: newJerseyRoutes.length,
      implementedCorridorCount: routeFamilies.filter((row) => row.routeSlugs.length > 0).length,
      routeCandidateCount: routeFamilies.filter((row) => row.disposition === 'route_candidate').length,
      blockedCount: routeFamilies.filter((row) => row.disposition.startsWith('blocked')).length,
      screenedOutCount: routeFamilies.filter((row) => row.disposition.startsWith('screened')).length,
      usgsStreamSiteCount: usgsStreamInventory.siteCount,
      usgsWaterwayLeadCount: usgsStreamInventory.waterwayLeadCount,
      prioritizedUnreconciledUsgsLeadCount: usgsStreamInventory.prioritizedUnreconciledLeadCount,
      prioritizedLeadReviewCount: prioritizedLeadReviews.length,
      blockedPendingLeadReviewCount: prioritizedLeadReviews.filter((review) => review.disposition === 'blocked_pending_route_package').length,
      coveredByCatalogLeadReviewCount: prioritizedLeadReviews.filter((review) => review.disposition === 'covered_by_catalog_family').length,
      nextAction: 'Every prioritized USGS lead has an explicit covered-by-family or blocked-pending-route-package disposition. Continue dedicated evidence refresh for blocked leads and promote only after the strict package clears; update blocked dispositions when endpoint, flow, closure, or imagery evidence changes.',
    },
  };
  writeFileSync(inventoryPath, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(`Wrote ${inventoryPath}: ${access.rows.length} NJDEP access sites and ${routeFamilies.length} corridor families.`);
}

await main();
