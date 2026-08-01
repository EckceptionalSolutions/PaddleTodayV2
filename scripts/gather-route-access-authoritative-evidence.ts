import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { accessNamesAgree } from './lib/access-name-match';

type Coordinate = { latitude: number; longitude: number };
type AuditEndpoint = Coordinate & {
  routeId: string;
  routeName: string;
  state: string;
  endpoint: string;
  endpointName: string;
  nearestMatchedLatitude: number | null;
  nearestMatchedLongitude: number | null;
};
type AuditReport = { generatedAt: string; endpoints: AuditEndpoint[] };
type ArcGisAttributes = Record<string, string | number | null>;
type ArcGisFeature = { attributes?: ArcGisAttributes; geometry?: { x?: number; y?: number } };
type ArcGisResponse = { features?: ArcGisFeature[]; exceededTransferLimit?: boolean; error?: { message?: string; details?: string[] } };
type InventoryCache = { fetchedAt: string; layerUrl: string; features: ArcGisFeature[] };
type Provider = {
  id: string;
  cacheName: string;
  state: string;
  name: string;
  layerUrl: string;
  itemUrl: string;
  objectIdField: string;
  featureIdField: string;
  nameField: string;
  outputFields: string;
  where?: string;
  metadata: (attributes: ArcGisAttributes) => Record<string, string | number | null>;
};
type OfficialMapControl = Coordinate & {
  featureId: string;
  name: string;
  aliases?: string[];
  waterbody: string;
  riverMile: number | null;
  uncertaintyFeet: number;
  matchedRiverDistanceFeet: number;
  onNhdWaterbody?: boolean;
  layer?: string;
  layerFeatureIndex?: number;
  textMatrix?: number[];
  glyphAnchor?: string;
  sourcePage?: number;
  coordinateText?: string;
  terminalAlternateWaterbody?: {
    routeWaterbody: string;
    relationship: 'downstream-after-confluence' | 'tributary-before-confluence' | 'connected-water-trail-waterbody';
    sourceUrl: string;
    sourceLabel: string;
    maximumDownstreamDistanceFeet?: number;
    maximumConnectionDistanceFeet?: number;
  };
};
type OfficialMapProvider = {
  id: string;
  name: string;
  state: string;
  sourceUrl: string;
  sourceType: 'official-geospatial-map' | 'official-coordinate-table' | 'official-site-map-derived' | 'official-identity-aerial-derived'
    | 'official-area-representative-coordinate' | 'official-fishing-area-centroid';
  sourceDocumentDate: string | null;
  sourceSha256: string | null;
  coordinateRole: 'authoritative-water-entry' | 'authoritative-access-anchor' | 'authoritative-area-anchor';
  method: string;
  controls: OfficialMapControl[];
};
type OfficialMapControls = { schemaVersion: number; providers: OfficialMapProvider[] };

const root = process.cwd();
const auditPath = path.join(root, 'docs', 'route-coordinate-river-audit.json');
const outputPath = path.join(root, 'docs', 'route-coordinate-authoritative-evidence.json');
const officialMapControlsPath = path.join(root, 'src', 'data', 'route-access-official-map-controls.json');
const cacheDir = path.join(root, 'node_modules', '.cache', 'route-coordinate-authoritative-evidence');
const feetPerMile = 5280;
const earthRadiusMiles = 3958.8;
const candidateRadiusFeet = 5 * feetPerMile;
const pageSize = 2000;

const providers: Provider[] = [
  {
    id: 'mn_dnr', cacheName: 'mn-dnr', state: 'Minnesota', name: 'Minnesota DNR Public Water Access Sites',
    layerUrl: 'https://arcgis.metc.state.mn.us/server/rest/services/GDRS/DNR_loc_water_access_sites_in_mn_ad/FeatureServer/0',
    itemUrl: 'https://gisdata.mn.gov/dataset/loc-water-access-sites-in-mn',
    objectIdField: 'OBJECTID', featureIdField: 'UNIQUE_SWAS_ID', nameField: 'WATER_ACCESS_SITE_NAME',
    outputFields: 'OBJECTID,WATER_ACCESS_SITE_NAME,ADMINISTRATOR,DIRECTIONS,BOAT_LAUNCH_METHOD,LAUNCH_SURFACE_TYPE,PARKING_LOT_COUNT,WATER_TRAIL_RIVER_MILE,UNIQUE_SWAS_ID,COMMENTS',
    metadata: (attributes) => ({
      administrator: attributes.ADMINISTRATOR ?? null,
      directions: attributes.DIRECTIONS ?? null,
      launchMethod: attributes.BOAT_LAUNCH_METHOD ?? null,
      launchSurface: attributes.LAUNCH_SURFACE_TYPE ?? null,
      parkingLotCount: attributes.PARKING_LOT_COUNT ?? null,
      riverMile: attributes.WATER_TRAIL_RIVER_MILE ?? null,
      comments: attributes.COMMENTS ?? null,
    }),
  },
  {
    id: 'ia_dnr', cacheName: 'ia-dnr', state: 'Iowa', name: 'Iowa DNR Public Water Accesses',
    layerUrl: 'https://services2.arcgis.com/r6iFVcMJeA4kB4GC/arcgis/rest/services/Water_Accesses_NEW_PUBLIC/FeatureServer/0',
    itemUrl: 'https://www.arcgis.com/home/item.html?id=a904e625559d42f48864b6484111a26d',
    objectIdField: 'OBJECTID', featureIdField: 'GlobalID', nameField: 'NAME',
    outputFields: 'OBJECTID,GlobalID,NAME,ACC_NUMBER,ACC_OWNER,ACC_MGR,PKG_STALLS,PKG_SURFACE,TurnAround,Acc_Surface,MaxSlope,RESTROOM,DrinkingWTR,CAMPING,Access_Code,County,Waterbody,State,WT_Name,URL_1,URL_2,URL_3,URL_4,URL_5,Notes,Notes_Field,Parking_to_Access',
    metadata: (attributes) => ({
      administrator: attributes.ACC_MGR ?? attributes.ACC_OWNER ?? null,
      owner: attributes.ACC_OWNER ?? null,
      launchMethod: attributes.Access_Code ?? null,
      launchSurface: attributes.Acc_Surface ?? null,
      parkingLotCount: attributes.PKG_STALLS ?? null,
      parkingSurface: attributes.PKG_SURFACE ?? null,
      parkingToAccessFeet: attributes.Parking_to_Access ?? null,
      waterbody: attributes.Waterbody ?? null,
      waterTrailName: attributes.WT_Name ?? null,
      county: attributes.County ?? null,
      comments: attributes.Notes ?? attributes.Notes_Field ?? null,
      directions: null,
    }),
  },
  {
    id: 'wi_dnr', cacheName: 'wi-dnr', state: 'Wisconsin', name: 'Wisconsin DNR Public Boat Access Sites',
    layerUrl: 'https://dnrmaps.wi.gov/arcgis2/rest/services/PR_Recreation/PR_Boat_Access_Shore_Fishing_WTM_Ext/MapServer/2',
    itemUrl: 'https://www.arcgis.com/home/item.html?id=ba31a86f566241bf9d127597271ac71c',
    objectIdField: 'OBJECTID', featureIdField: 'BOATLANDING_SEQ_NO', nameField: 'LMS_BOAT_LANDING_NAME',
    outputFields: 'OBJECTID,BOATLANDING_SEQ_NO,LMS_BOAT_LANDING_NAME,LANDING_TYPE_CODE,RAMP_TYPE_CODE,ADA_ACCESSIBLE_FEATURE_CODE,OWNERSHIP_NAME_TEXT,OWNERSHIP_MANAGER_NAME_TEXT,OWNERSHIP_MANAGER_PHONE_TEXT,LL_LAT_DD_AMT,LL_LONG_DD_AMT,WATERBODY_NAME_TEXT,COUNTY_NAME_TEXT,MUNICIPALITY_NAME_TEXT,ABANDON_FLAG',
    metadata: (attributes) => ({
      administrator: attributes.OWNERSHIP_MANAGER_NAME_TEXT ?? attributes.OWNERSHIP_NAME_TEXT ?? null,
      owner: attributes.OWNERSHIP_NAME_TEXT ?? null,
      launchMethod: attributes.LANDING_TYPE_CODE ?? null,
      launchSurface: attributes.RAMP_TYPE_CODE ?? null,
      waterbody: attributes.WATERBODY_NAME_TEXT ?? null,
      county: attributes.COUNTY_NAME_TEXT ?? null,
      municipality: attributes.MUNICIPALITY_NAME_TEXT ?? null,
      phone: attributes.OWNERSHIP_MANAGER_PHONE_TEXT ?? null,
      comments: attributes.ABANDON_FLAG ? `Abandon flag: ${attributes.ABANDON_FLAG}` : null,
      directions: null,
    }),
  },
  {
    id: 'pa_pfbc', cacheName: 'pa-pfbc', state: 'Pennsylvania', name: 'Pennsylvania Fish and Boat Commission Water Access',
    layerUrl: 'https://services8.arcgis.com/qnunbWxvlJsj1oVm/ArcGIS/rest/services/Fishing_and_Boating_Access/FeatureServer/20',
    itemUrl: 'https://www.arcgis.com/home/item.html?id=c7d9c6de2e9a44668d232a1c9b344197',
    objectIdField: 'FID', featureIdField: 'WT_ID2', nameField: 'ACC_NAME',
    outputFields: 'FID,WT_ID,WT_ID2,ACC_NAME,WATERBODY,OWNER,OWNERSHIP,LOCATION_U,HP,HP_FullDes,RAMP,RAMP_PAVE,DOCK,PARKING,Parking_Fu,FEE,ACCESSABLE,COUNTY,MUNICPAL,PFBC_Verif,Ftr_Page',
    metadata: (attributes) => ({
      administrator: attributes.OWNERSHIP ?? attributes.OWNER ?? null,
      owner: attributes.OWNER ?? null,
      launchMethod: attributes.HP_FullDes ?? attributes.HP ?? null,
      launchSurface: attributes.RAMP_PAVE ?? null,
      parkingLotCount: attributes.Parking_Fu ?? null,
      waterbody: attributes.WATERBODY ?? null,
      county: attributes.COUNTY ?? null,
      municipality: attributes.MUNICPAL ?? null,
      fee: attributes.FEE ?? null,
      dock: attributes.DOCK ?? null,
      accessibility: attributes.ACCESSABLE ?? null,
      comments: attributes.PFBC_Verif ?? null,
      directions: null,
    }),
  },
  {
    id: 'ky_kdfwr', cacheName: 'ky-kdfwr', state: 'Kentucky', name: 'Kentucky Department of Fish and Wildlife Resources Fishing Access Sites',
    layerUrl: 'https://services3.arcgis.com/ghsX9CKghMvyYjBU/ArcGIS/rest/services/Ky_KDFWR_Fishing_Access_Sites_WM_gdb/FeatureServer/0',
    itemUrl: 'https://services3.arcgis.com/ghsX9CKghMvyYjBU/ArcGIS/rest/services/Ky_KDFWR_Fishing_Access_Sites_WM_gdb/FeatureServer/0',
    objectIdField: 'OBJECTID', featureIdField: 'ASID', nameField: 'SiteName',
    outputFields: 'OBJECTID,ASID,AccessType,Type,WaterBody,NAME,SiteName,Directions,Shoreline,Boat_Ramp,Surface,Lanes,Parking,Capacity,Fee,Courtesy_Dock,Picnic,Camp,Restroom,Marina,Notes,display,SiteWeb,Region',
    where: "display = 1 AND Boat_Ramp <> 'None'",
    metadata: (attributes) => ({
      administrator: 'Kentucky Department of Fish and Wildlife Resources',
      owner: null,
      launchMethod: attributes.AccessType ?? attributes.Type ?? null,
      launchSurface: attributes.Surface ?? null,
      parkingLotCount: attributes.Capacity ?? null,
      parkingSurface: attributes.Parking ?? null,
      waterbody: attributes.WaterBody ?? attributes.NAME ?? null,
      fee: attributes.Fee ?? null,
      dock: attributes.Courtesy_Dock ?? null,
      restroom: attributes.Restroom ?? null,
      marina: attributes.Marina ?? null,
      comments: attributes.Notes ?? null,
      directions: attributes.Directions ?? null,
      detailUrl: attributes.SiteWeb ?? null,
    }),
  },
  {
    id: 'ne_ngpc', cacheName: 'ne-ngpc', state: 'Nebraska', name: 'Nebraska Game and Parks Commission Public Access Boat Ramps',
    layerUrl: 'https://services5.arcgis.com/IOshH1zLrIieqrNk/arcgis/rest/services/Boating_App_Web_Layers_Boat_Ramps_OPEN_DATA_PORTAL/FeatureServer/0',
    itemUrl: 'https://www.arcgis.com/home/item.html?id=590ac9dd7c0946c5b42b6f9a5046eb93',
    objectIdField: 'OBJECTID', featureIdField: 'rUID', nameField: 'rAreaName',
    outputFields: 'OBJECTID,rUID,rWaterbodyCode,rAreaName,rYearBuilt,rNumLanes,rMaxWidth,rLength,rYearDockInstalled,rNumLaunchDocks,rNumAdditionalSlips,rParkingWithTrailers,rParkingAdditional,rParkingAda,Restroom,FishingPier,ParkingType,DockType,RampType,RampLights,BreakwaterStructure,DockADA,RampADA,RampOwner,RampMaintainer,DateModified,GlobalID',
    metadata: (attributes) => ({
      administrator: attributes.RampMaintainer ?? attributes.RampOwner ?? null,
      owner: attributes.RampOwner ?? null,
      launchMethod: 'Public boat ramp',
      launchSurface: attributes.RampType ?? null,
      parkingLotCount: attributes.rParkingWithTrailers ?? null,
      additionalParkingCount: attributes.rParkingAdditional ?? null,
      parkingSurface: attributes.ParkingType ?? null,
      waterbody: null,
      dock: attributes.DockType ?? null,
      restroom: attributes.Restroom ?? null,
      accessibility: attributes.RampADA ?? null,
      comments: null,
      directions: null,
    }),
  },
];

function radians(value: number) { return value * Math.PI / 180; }
function distanceFeet(left: Coordinate, right: Coordinate) {
  const deltaLat = radians(right.latitude - left.latitude);
  const deltaLon = radians(right.longitude - left.longitude);
  const leftLat = radians(left.latitude);
  const rightLat = radians(right.latitude);
  const h = Math.sin(deltaLat / 2) ** 2 + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(deltaLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(h)) * feetPerMile;
}

function matchedCoordinate(endpoint: AuditEndpoint): Coordinate | null {
  return Number.isFinite(endpoint.nearestMatchedLatitude) && Number.isFinite(endpoint.nearestMatchedLongitude)
    ? { latitude: endpoint.nearestMatchedLatitude!, longitude: endpoint.nearestMatchedLongitude! }
    : null;
}

async function fetchInventory(provider: Provider) {
  await mkdir(cacheDir, { recursive: true });
  const cachePath = path.join(cacheDir, `${provider.cacheName}-inventory-v1.json`);
  try {
    const cached = JSON.parse(await readFile(cachePath, 'utf8')) as InventoryCache;
    if (cached.layerUrl === provider.layerUrl && Array.isArray(cached.features) && cached.features.length > 0) return cached;
  } catch {
    // Populate the durable cache below.
  }

  const features: ArcGisFeature[] = [];
  let offset = 0;
  while (true) {
    const params = new URLSearchParams({
      f: 'json', where: provider.where ?? '1=1', outSR: '4326', outFields: provider.outputFields,
      returnGeometry: 'true', orderByFields: provider.objectIdField,
      resultOffset: String(offset), resultRecordCount: String(pageSize),
    });
    const fetched = await fetch(`${provider.layerUrl}/query?${params}`, {
      headers: { 'user-agent': 'PaddleToday route-coordinate verifier (https://paddletoday.com)' },
    });
    if (!fetched.ok) throw new Error(`${provider.name} query failed: ${fetched.status} ${fetched.statusText}`);
    const response = JSON.parse(await fetched.text()) as ArcGisResponse;
    if (response.error) throw new Error([response.error.message, ...(response.error.details ?? [])].filter(Boolean).join(': '));
    const page = response.features ?? [];
    features.push(...page);
    if (page.length === 0 || (page.length < pageSize && response.exceededTransferLimit !== true)) break;
    offset += page.length;
  }

  const cache: InventoryCache = { fetchedAt: new Date().toISOString(), layerUrl: provider.layerUrl, features };
  await writeFile(cachePath, `${JSON.stringify(cache)}\n`);
  return cache;
}

function candidateFor(endpoint: AuditEndpoint, feature: ArcGisFeature, provider: Provider) {
  const latitude = feature.geometry?.y;
  const longitude = feature.geometry?.x;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  const coordinate = { latitude: latitude!, longitude: longitude! };
  const matched = matchedCoordinate(endpoint);
  const attributes = feature.attributes ?? {};
  const objectId = attributes[provider.objectIdField];
  const distanceFromCurrentFeet = distanceFeet(endpoint, coordinate);
  const distanceFromMatchedRiverPointFeet = matched ? distanceFeet(matched, coordinate) : null;
  if (Math.min(distanceFromCurrentFeet, distanceFromMatchedRiverPointFeet ?? Infinity) > candidateRadiusFeet) return null;
  const featureId = attributes[provider.featureIdField] ?? objectId ?? '';
  return {
    provider: provider.id,
    featureId: String(featureId),
    name: typeof attributes[provider.nameField] === 'string' ? attributes[provider.nameField] : null,
    latitude: coordinate.latitude,
    longitude: coordinate.longitude,
    distanceFromCurrentFeet,
    distanceFromMatchedRiverPointFeet,
    sourceUrl: `${provider.layerUrl}/${objectId ?? ''}`,
    ...provider.metadata(attributes),
  };
}

async function main() {
  const [audit, officialMapControls, ...inventories] = await Promise.all([
    readFile(auditPath, 'utf8').then((value) => JSON.parse(value) as AuditReport),
    readFile(officialMapControlsPath, 'utf8').then((value) => JSON.parse(value) as OfficialMapControls),
    ...providers.map((provider) => fetchInventory(provider)),
  ]);
  const inventoryItems = providers.flatMap((provider, providerIndex) => {
    const inventory = inventories[providerIndex]!;
    return audit.endpoints.filter((endpoint) => endpoint.state === provider.state).map((endpoint) => ({
      routeId: endpoint.routeId,
      endpoint: endpoint.endpoint,
      endpointName: endpoint.endpointName,
      provider: provider.id,
      candidates: inventory.features
        .map((feature) => candidateFor(endpoint, feature, provider))
        .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null)
        .sort((left, right) => Math.min(left.distanceFromCurrentFeet, left.distanceFromMatchedRiverPointFeet ?? Infinity)
          - Math.min(right.distanceFromCurrentFeet, right.distanceFromMatchedRiverPointFeet ?? Infinity))
        .slice(0, 50),
      error: null,
    }));
  });
  const officialMapItems = officialMapControls.providers.flatMap((provider) => audit.endpoints
    .filter((endpoint) => endpoint.state === provider.state)
    .map((endpoint) => ({
      routeId: endpoint.routeId,
      endpoint: endpoint.endpoint,
      endpointName: endpoint.endpointName,
      provider: provider.id,
      candidates: provider.controls
        .filter((control) => accessNamesAgree(endpoint.endpointName, control.name)
          || (control.aliases ?? []).some((alias) => accessNamesAgree(endpoint.endpointName, alias)))
        .map((control) => ({
          provider: provider.id,
          featureId: control.featureId,
          name: (control.aliases ?? []).find((alias) => accessNamesAgree(endpoint.endpointName, alias)) ?? control.name,
          officialName: control.name,
          aliases: control.aliases ?? [],
          latitude: control.latitude,
          longitude: control.longitude,
          distanceFromCurrentFeet: distanceFeet(endpoint, control),
          distanceFromMatchedRiverPointFeet: matchedCoordinate(endpoint) ? distanceFeet(matchedCoordinate(endpoint)!, control) : null,
          sourceUrl: provider.sourceUrl,
          coordinateRole: provider.coordinateRole,
          sourceType: provider.sourceType,
          sourceDocumentDate: provider.sourceDocumentDate,
          sourceSha256: provider.sourceSha256,
          extractionMethod: provider.method,
          waterbody: control.waterbody,
          riverMile: control.riverMile,
          uncertaintyFeet: control.uncertaintyFeet,
          matchedRiverDistanceFeet: control.matchedRiverDistanceFeet,
          onNhdWaterbody: control.onNhdWaterbody ?? false,
          ...(control.layer ? { layer: control.layer } : {}),
          ...(control.layerFeatureIndex !== undefined ? { layerFeatureIndex: control.layerFeatureIndex } : {}),
          ...(control.textMatrix ? { textMatrix: control.textMatrix } : {}),
          ...(control.glyphAnchor ? { glyphAnchor: control.glyphAnchor } : {}),
          ...(control.sourcePage !== undefined ? { sourcePage: control.sourcePage } : {}),
          ...(control.coordinateText ? { coordinateText: control.coordinateText } : {}),
          ...(control.terminalAlternateWaterbody
            ? { terminalAlternateWaterbody: control.terminalAlternateWaterbody }
            : {}),
        })),
      error: null,
    })));
  const items = [...inventoryItems, ...officialMapItems];

  await writeFile(outputPath, `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    auditGeneratedAt: audit.generatedAt,
    providers: [
      ...providers.map((provider, index) => ({
      id: provider.id,
      name: provider.name,
      state: provider.state,
      url: provider.itemUrl,
      layerUrl: provider.layerUrl,
      coordinateRole: 'authoritative-access-anchor',
      inventoryFetchedAt: inventories[index]!.fetchedAt,
      inventoryFeatureCount: inventories[index]!.features.length,
      matchedEndpointCount: items.filter((item) => item.provider === provider.id && item.candidates.length > 0).length,
      })),
      ...officialMapControls.providers.map((provider) => ({
        id: provider.id,
        name: provider.name,
        state: provider.state,
        url: provider.sourceUrl,
        layerUrl: provider.sourceUrl,
        coordinateRole: provider.coordinateRole,
        inventoryFetchedAt: null,
        inventoryFeatureCount: provider.controls.length,
        sourceDocumentDate: provider.sourceDocumentDate,
        sourceSha256: provider.sourceSha256,
        extractionMethod: provider.method,
        matchedEndpointCount: items.filter((item) => item.provider === provider.id && item.candidates.length > 0).length,
      })),
    ],
    itemCount: items.length,
    items,
  }, null, 2)}\n`);
  console.log(`Generated ${path.relative(root, outputPath)} with ${providers.length + officialMapControls.providers.length} authoritative source(s) covering ${items.length} endpoint-source pair(s).`);
  for (const [index, provider] of providers.entries()) {
    console.log(`${provider.state}: ${inventories[index]!.features.length} official access records.`);
  }
  for (const provider of officialMapControls.providers) {
    const role = provider.coordinateRole === 'authoritative-water-entry'
      ? 'water-entry'
      : provider.coordinateRole === 'authoritative-area-anchor'
        ? 'area-anchor-not-access'
        : 'access-anchor';
    console.log(`${provider.state}: ${provider.controls.length} official ${role} controls from ${provider.name}.`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
