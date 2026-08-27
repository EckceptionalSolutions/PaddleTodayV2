import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const routeId = 'james-river-pony-pasture-reedy-creek';
const sourceUrl = 'https://www.americanwhitewater.org/content/River/view/river-detail/1951/main';
const canalWayId = 303497404;
const canalSourceUrl = `https://www.openstreetmap.org/way/${canalWayId}`;
const putIn = [-77.53012072, 37.55949468];
const takeOut = [-77.4694, 37.52439];

function distanceFeet(left, right) {
  const latitudeScale = Math.cos(((left[1] + right[1]) * Math.PI) / 360);
  return Math.hypot((left[0] - right[0]) * latitudeScale, left[1] - right[1]) * 69 * 5280;
}

const response = await fetch(sourceUrl, {
  headers: { 'user-agent': 'PaddleToday canonical route geometry generator' },
});
if (!response.ok) throw new Error(`American Whitewater request failed (${response.status})`);

const decoded = (await response.text()).replaceAll('\\"', '"');
const marker = `"reachId":"1951","geometry":`;
const markerIndex = decoded.indexOf(marker);
if (markerIndex < 0) throw new Error('Could not find the American Whitewater reach geometry marker.');

const geometryStart = decoded.indexOf('{', markerIndex + marker.length);
let depth = 0;
let geometryEnd = -1;
for (let index = geometryStart; index < decoded.length; index += 1) {
  if (decoded[index] === '{') depth += 1;
  if (decoded[index] === '}' && --depth === 0) {
    geometryEnd = index + 1;
    break;
  }
}
if (geometryStart < 0 || geometryEnd < 0) throw new Error('Could not isolate the reach geometry payload.');

const geometry = JSON.parse(decoded.slice(geometryStart, geometryEnd));
if (geometry.type !== 'LineString' || geometry.coordinates.length < 2) {
  throw new Error('American Whitewater returned an unusable reach geometry.');
}

const osmResponse = await fetch(`https://api.openstreetmap.org/api/0.6/way/${canalWayId}/full.json`, {
  headers: { 'user-agent': 'PaddleToday canonical route geometry generator' },
});
if (!osmResponse.ok) throw new Error(`OpenStreetMap request failed (${osmResponse.status})`);
const osmElements = (await osmResponse.json()).elements;
const canalWay = osmElements.find((element) => element.type === 'way' && element.id === canalWayId);
const osmNodes = new Map(
  osmElements
    .filter((element) => element.type === 'node')
    .map((element) => [element.id, [element.lon, element.lat]]),
);
let canalCoordinates = canalWay?.nodes.map((nodeId) => osmNodes.get(nodeId)).filter(Boolean) ?? [];
if (canalCoordinates.length < 2) throw new Error('OpenStreetMap returned an unusable Manchester Canal geometry.');
if (distanceFeet(canalCoordinates[0], takeOut) < distanceFeet(canalCoordinates.at(-1), takeOut)) {
  canalCoordinates = canalCoordinates.reverse();
}

let channelEntranceIndex = 0;
let channelEntranceGapFeet = Infinity;
for (let index = 0; index < geometry.coordinates.length; index += 1) {
  const gapFeet = distanceFeet(geometry.coordinates[index], canalCoordinates[0]);
  if (gapFeet < channelEntranceGapFeet) {
    channelEntranceIndex = index;
    channelEntranceGapFeet = gapFeet;
  }
}
// AW follows the main river line while the signed takeout route moves river
// right across the open channel to the historic Manchester Canal. Preserve
// that short cross-channel transition before following the mapped canal to
// the accessible Reedy Creek ramp.
if (channelEntranceGapFeet > 1500) {
  throw new Error(`American Whitewater and Manchester Canal geometries are ${Math.round(channelEntranceGapFeet)} ft apart: ${JSON.stringify({ whitewater: geometry.coordinates[channelEntranceIndex], canal: canalCoordinates[0] })}`);
}

const routeCoordinates = [
  ...geometry.coordinates.slice(0, channelEntranceIndex + 1),
  ...canalCoordinates,
  takeOut,
];
const endpointSnapMaxFeet = Math.round(Math.max(
  distanceFeet(routeCoordinates[0], putIn),
  distanceFeet(routeCoordinates.at(-1), takeOut),
));
if (endpointSnapMaxFeet > 100) {
  throw new Error(`Curated geometry misses a route endpoint by ${endpointSnapMaxFeet} ft.`);
}

const feature = {
  type: 'Feature',
  properties: {
    routeId,
    riverId: 'james-river',
    name: 'James River',
    state: 'Virginia',
    source: 'American Whitewater reach geometry + OpenStreetMap Manchester Canal',
    sourceUrls: [sourceUrl, canalSourceUrl],
    endpointSnapMaxFeet,
  },
  geometry: {
    type: 'MultiLineString',
    coordinates: [routeCoordinates],
  },
};

const outputPath = path.resolve('public', 'data', 'canonical-river-geometries', 'routes', `${routeId}.json`);
await writeFile(outputPath, JSON.stringify(feature));
console.log(`Wrote ${outputPath} with ${routeCoordinates.length} points, a ${Math.round(channelEntranceGapFeet)} ft source join, and ${endpointSnapMaxFeet} ft maximum endpoint error.`);
