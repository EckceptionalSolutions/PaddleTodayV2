export function geometryLines(geometry) {
  return geometry?.type === 'LineString' ? [geometry.coordinates]
    : geometry?.type === 'MultiLineString' ? geometry.coordinates : [];
}

export function coordinateBounds(coordinates) {
  if (!coordinates.length) return null;
  const bounds = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y] of coordinates) {
    bounds[0] = Math.min(bounds[0], x);
    bounds[1] = Math.min(bounds[1], y);
    bounds[2] = Math.max(bounds[2], x);
    bounds[3] = Math.max(bounds[3], y);
  }
  return bounds;
}

/** Iterative Douglas–Peucker; endpoints remain exact, even for very long lines. */
export function simplifyOverviewLine(line, tolerance = 0.0025) {
  if (line.length <= 2) return line;
  const keep = new Set([0, line.length - 1]);
  const pending = [[0, line.length - 1]];
  while (pending.length) {
    const [first, last] = pending.pop();
    const [x, y] = line[first];
    const dx = line[last][0] - x;
    const dy = line[last][1] - y;
    const length = dx * dx + dy * dy;
    let farthest = -1;
    let distance = tolerance * tolerance;
    for (let index = first + 1; index < last; index++) {
      const [px, py] = line[index];
      const t = length ? Math.max(0, Math.min(1, ((px - x) * dx + (py - y) * dy) / length)) : 0;
      const squared = (px - x - t * dx) ** 2 + (py - y - t * dy) ** 2;
      if (squared > distance) { distance = squared; farthest = index; }
    }
    if (farthest >= 0) {
      keep.add(farthest);
      pending.push([first, farthest], [farthest, last]);
    }
  }
  return [...keep].sort((a, b) => a - b).map((index) => line[index]);
}

/** A padded geographic window; supports wrapped bounds near the date line. */
export function paddedMapBounds(bounds, padding = 0.15) {
  if (!bounds?.toArray) return null;
  const [[west, south], [rawEast, north]] = bounds.toArray();
  const east = rawEast < west ? rawEast + 360 : rawEast;
  const dx = (east - west) * padding;
  const dy = (north - south) * padding;
  return [west - dx, Math.max(-90, south - dy), east + dx, Math.min(90, north + dy)];
}

export function boundsIntersect(a, b) {
  if (!a || !b) return true;
  return [-360, 0, 360].some((offset) =>
    a[0] + offset <= b[2] && a[2] + offset >= b[0] && a[1] <= b[3] && a[3] >= b[1]);
}
