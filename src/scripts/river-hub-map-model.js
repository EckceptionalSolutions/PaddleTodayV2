const EARTH_RADIUS_METERS = 6_371_000;

function radians(value) {
  return value * Math.PI / 180;
}

function coordinateDistance(left, right) {
  const latitudeDelta = radians(right[1] - left[1]);
  const longitudeDelta = radians(right[0] - left[0]);
  const leftLatitude = radians(left[1]);
  const rightLatitude = radians(right[1]);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(leftLatitude) * Math.cos(rightLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(haversine));
}

function geometryLines(geometry) {
  if (geometry?.type === 'LineString') return [geometry.coordinates];
  if (geometry?.type === 'MultiLineString') return geometry.coordinates;
  return [];
}

export function routeGeometryMidpoint(geometry) {
  const segments = [];
  let totalDistance = 0;

  for (const line of geometryLines(geometry)) {
    for (let index = 1; index < line.length; index += 1) {
      const start = line[index - 1];
      const end = line[index];
      if (!Array.isArray(start) || !Array.isArray(end)) continue;
      const distance = coordinateDistance(start, end);
      if (!Number.isFinite(distance) || distance <= 0) continue;
      segments.push({ start, end, distance });
      totalDistance += distance;
    }
  }

  if (segments.length === 0) return null;
  const target = totalDistance / 2;
  let traversed = 0;
  for (const segment of segments) {
    if (traversed + segment.distance >= target) {
      const fraction = (target - traversed) / segment.distance;
      return [
        segment.start[0] + ((segment.end[0] - segment.start[0]) * fraction),
        segment.start[1] + ((segment.end[1] - segment.start[1]) * fraction),
      ];
    }
    traversed += segment.distance;
  }

  return segments.at(-1).end;
}

export function riverHubRouteStatus(route) {
  if (route?.scoreEligibility === 'planning') return 'planning';
  if (route?.rating === 'Strong') return 'strong';
  if (route?.rating === 'Good') return 'good';
  if (route?.rating === 'Fair') return 'fair';
  if (route?.rating === 'No-go') return 'no-go';
  return 'planning';
}

const MISSISSIPPI_MAP_NOTICES = [
  {
    id: 'coon-rapids-portage',
    relatedRoutes: ['mississippi-river-dayton-mississippi-gateway', 'mississippi-river-coon-rapids-riverfront'],
    point: { latitude: 45.1439, longitude: -93.3028 },
    label: 'PORTAGE',
    kind: 'portage',
    detail: 'Coon Rapids Dam: required 0.31 mi portage between the above-dam take-out and below-dam launch.',
  },
  {
    id: 'north-minneapolis-coverage-gap',
    relatedRoutes: ['mississippi-river-coon-rapids-riverfront', 'mississippi-river-east-river-flats-hidden-falls'],
    point: { latitude: 45.025, longitude: -93.272 },
    label: 'GAP',
    kind: 'gap',
    detail: 'No reviewed Paddle Today route currently connects Riverfront Regional Park to the St. Anthony Falls take-out.',
  },
  {
    id: 'saint-anthony-portage',
    relatedRoutes: ['mississippi-river-coon-rapids-riverfront', 'mississippi-river-east-river-flats-hidden-falls'],
    point: { latitude: 44.9817, longitude: -93.2555 },
    label: 'PORTAGE',
    kind: 'portage',
    detail: 'St. Anthony Falls: the Upper lock does not operate and the Lower lock is generally inaccessible to paddle craft; use the 1.54 mi portage.',
  },
  {
    id: 'lock-and-dam-1',
    relatedRoutes: ['mississippi-river-east-river-flats-hidden-falls'],
    point: { latitude: 44.922861, longitude: -93.20325 },
    label: 'LOCK 1',
    kind: 'lock',
    detail: 'Lock & Dam 1 has limited recreational lockage. Verify current hours or use the 1.40 mi river-right portage.',
  },
];

export function riverHubMapNotices(riverId, routes) {
  if (riverId !== 'mississippi-river') return [];
  const visibleSlugs = new Set(routes.map((route) => route.slug));
  return MISSISSIPPI_MAP_NOTICES.filter((notice) =>
    notice.relatedRoutes.some((slug) => visibleSlugs.has(slug))
  );
}
