import { forwardRef, useImperativeHandle } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

const SELECTED_MARKER_COLOR = '#2563EB';

export interface RouteSpanCoordinate {
  latitude: number;
  longitude: number;
}

export interface RoutePlotPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  score?: number | null;
  rating?: string | null;
  meta?: string | null;
  routeCount?: number | null;
  spanCoordinates?: RouteSpanCoordinate[] | null;
}

export interface RoutePlotMapHandle {
  focusSelected: () => void;
  focusAll: () => void;
  focusUserArea: () => void;
}

export const RoutePlotMap = forwardRef<RoutePlotMapHandle, {
  points: RoutePlotPoint[];
  selectedId?: string | null;
  userLocation?: { latitude: number; longitude: number; label?: string | null } | null;
  backgroundSpanCoordinates?: RouteSpanCoordinate[] | null;
  canonicalSpans?: ReadonlyMap<string, RouteSpanCoordinate[]>;
  onSelectPoint?: (point: RoutePlotPoint) => void;
  height?: number;
  showFooter?: boolean;
  fullBleed?: boolean;
  markerMode?: 'score' | 'pin';
}>(function RoutePlotMap({
  points,
  selectedId,
  userLocation,
  backgroundSpanCoordinates,
  canonicalSpans,
  onSelectPoint,
  height = 290,
  showFooter = true,
  fullBleed = false,
}, ref) {
  const backgroundSpan = finiteSpanCoordinates(backgroundSpanCoordinates);
  const bounds = getBounds(points, userLocation, backgroundSpan, canonicalSpans);
  const visiblePoints = points.filter(isFinitePoint);
  const selectedPoint = visiblePoints.find((point) => point.id === selectedId) ?? visiblePoints[0] ?? null;
  const selectedSpan = selectedId && selectedPoint ? routeSpanCoordinates(selectedPoint, canonicalSpans) : [];

  useImperativeHandle(ref, () => ({ focusSelected: () => undefined, focusAll: () => undefined, focusUserArea: () => undefined }), []);

  return (
    <View style={[styles.shell, fullBleed ? styles.fullBleedShell : null]}>
      <View style={[styles.mapCanvas, { height }]}>
        <View style={styles.mapLandPatchNorth} />
        <View style={styles.mapLandPatchSouth} />
        <View style={styles.mapLakeWest} />
        <View style={styles.mapLakeEast} />
        <View style={styles.riverRibbonOne} />
        <View style={styles.riverRibbonTwo} />
        <View style={styles.riverRibbonThree} />
        <View style={styles.primaryRoadNorth} />
        <View style={styles.primaryRoadCentral} />
        <View style={styles.primaryRoadSouth} />
        <View style={styles.secondaryRoadOne} />
        <View style={styles.secondaryRoadTwo} />
        <View style={styles.secondaryRoadThree} />
        <View style={styles.secondaryRoadFour} />
        <MapLabel label="Mississippi River" style={styles.labelMississippi} />
        <MapLabel label="Minnesota River" style={styles.labelMinnesota} />
        <MapLabel label="St. Croix River" style={styles.labelStCroix} />
        <MapLabel label="Minneapolis" style={styles.labelMinneapolis} />
        <MapLabel label="St. Paul" style={styles.labelSaintPaul} />

        {userLocation && Number.isFinite(userLocation.latitude) && Number.isFinite(userLocation.longitude) ? (
          <View
            style={[
              styles.userMarker,
              projectPoint(userLocation.latitude, userLocation.longitude, bounds),
            ]}
          >
            <View style={styles.userMarkerDot} />
          </View>
        ) : null}

        {backgroundSpan.length >= 2 ? <ProjectedRouteSpan coordinates={backgroundSpan} bounds={bounds} tone="background" /> : null}
        {selectedSpan.length >= 2 ? <ProjectedRouteSpan coordinates={selectedSpan} bounds={bounds} tone="selected" /> : null}

        {visiblePoints.map((point) => {
          const selected = point.id === selectedId;
          const dimmed = Boolean(selectedId && !selected);
          const showScore = selected || shouldShowProjectedScoreMarkers(bounds, visiblePoints.length);
          return (
            <Pressable
              key={`${point.id}-${showScore ? 'score' : 'dot'}-${selected ? 'selected' : 'idle'}`}
              style={[
                styles.markerTarget,
                projectPoint(point.latitude, point.longitude, bounds),
              ]}
              onPress={() => onSelectPoint?.(point)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={`${point.label}${point.score ? `, score ${point.score}` : ''}`}
            >
              {selected ? <View style={styles.markerSelectedRing} /> : null}
              <View
                style={[
                  showScore ? styles.marker : styles.dotMarker,
                  dimmed ? styles.markerDimmed : null,
                  toneForRating(point.rating),
                  selected ? styles.markerSelectedTone : null,
                ]}
              >
                {showScore ? (
                  <Text style={[styles.markerText, selected ? styles.markerTextSelected : null]}>
                    {typeof point.score === 'number' ? point.score : ''}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      {showFooter ? <MapFooter selectedPoint={selectedPoint} /> : null}
    </View>
  );
});

function MapLabel({ label, style }: { label: string; style: object }) {
  return (
    <Text style={[styles.mapLabel, style]} numberOfLines={1}>
      {label}
    </Text>
  );
}

function MapFooter({ selectedPoint }: { selectedPoint: RoutePlotPoint | null }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerCopy}>
        <Text style={styles.footerLabel}>Map view</Text>
        <Text style={styles.footerTitle} numberOfLines={1}>
          {selectedPoint?.label ?? 'No routes to show'}
        </Text>
        {selectedPoint?.meta ? (
          <Text style={styles.footerMeta} numberOfLines={1}>
            {selectedPoint.meta}
          </Text>
        ) : null}
      </View>
      <View style={styles.legend}>
        <LegendDot color={colors.strong} label="Good+" />
        <LegendDot color={colors.fair} label="Watch" />
      </View>
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

function ProjectedRouteSpan({
  coordinates,
  bounds,
  tone,
}: {
  coordinates: RouteSpanCoordinate[];
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number };
  tone: 'background' | 'selected';
}) {
  const projected = coordinates.map((point) => projectPointNumber(point.latitude, point.longitude, bounds));
  const left = Math.min(...projected.map((point) => point.left));
  const right = Math.max(...projected.map((point) => point.left));
  const top = Math.min(...projected.map((point) => point.top));
  const bottom = Math.max(...projected.map((point) => point.top));

  return (
    <View
      pointerEvents="none"
      style={[
        tone === 'selected' ? styles.projectedRouteSpanSelected : styles.projectedRouteSpanBackground,
        {
          left: `${left}%`,
          top: `${top}%`,
          width: `${Math.max(right - left, 3)}%`,
          height: `${Math.max(bottom - top, 3)}%`,
        },
      ]}
    />
  );
}

function isFinitePoint(point: RoutePlotPoint) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

function isFiniteCoordinate(point: RouteSpanCoordinate) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

function routeSpanCoordinates(point: RoutePlotPoint, canonicalSpans?: ReadonlyMap<string, RouteSpanCoordinate[]>): RouteSpanCoordinate[] {
  const canonicalSpan = finiteSpanCoordinates(canonicalSpans?.get(point.id));
  if (canonicalSpan.length >= 2) {
    return canonicalSpan;
  }

  const span = finiteSpanCoordinates(point.spanCoordinates);
  if (span.length >= 2) {
    return span;
  }

  return [{ latitude: point.latitude, longitude: point.longitude }];
}

function finiteSpanCoordinates(coordinates: RouteSpanCoordinate[] | null | undefined) {
  return coordinates?.filter(isFiniteCoordinate) ?? [];
}

function getBounds(
  points: RoutePlotPoint[],
  userLocation?: { latitude: number; longitude: number } | null,
  extraCoordinates: RouteSpanCoordinate[] = [],
  canonicalSpans?: ReadonlyMap<string, RouteSpanCoordinate[]>
) {
  const coordinates = [
    ...extraCoordinates,
    ...points
      .filter(isFinitePoint)
      .flatMap((point) => routeSpanCoordinates(point, canonicalSpans)),
  ];

  if (userLocation && Number.isFinite(userLocation.latitude) && Number.isFinite(userLocation.longitude)) {
    coordinates.push({ latitude: userLocation.latitude, longitude: userLocation.longitude });
  }

  if (coordinates.length === 0) {
    return {
      minLat: 43,
      maxLat: 47,
      minLon: -95,
      maxLon: -88,
    };
  }

  const latitudes = coordinates.map((point) => point.latitude);
  const longitudes = coordinates.map((point) => point.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  const latPad = Math.max((maxLat - minLat) * 0.18, 0.08);
  const lonPad = Math.max((maxLon - minLon) * 0.18, 0.08);

  return {
    minLat: minLat - latPad,
    maxLat: maxLat + latPad,
    minLon: minLon - lonPad,
    maxLon: maxLon + lonPad,
  };
}

function projectPoint(
  latitude: number,
  longitude: number,
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }
) {
  const lonSpan = Math.max(bounds.maxLon - bounds.minLon, 0.01);
  const latSpan = Math.max(bounds.maxLat - bounds.minLat, 0.01);
  const left = `${clamp(((longitude - bounds.minLon) / lonSpan) * 100, 5, 95)}%` as const;
  const top = `${clamp((1 - (latitude - bounds.minLat) / latSpan) * 100, 5, 95)}%` as const;

  return { left, top };
}

function projectPointNumber(
  latitude: number,
  longitude: number,
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }
) {
  const lonSpan = Math.max(bounds.maxLon - bounds.minLon, 0.01);
  const latSpan = Math.max(bounds.maxLat - bounds.minLat, 0.01);
  return {
    left: clamp(((longitude - bounds.minLon) / lonSpan) * 100, 5, 95),
    top: clamp((1 - (latitude - bounds.minLat) / latSpan) * 100, 5, 95),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function shouldShowScoreMarkers(latitudeDelta: number, pointCount: number) {
  if (pointCount <= 24) {
    return true;
  }

  if (pointCount <= 80) {
    return latitudeDelta <= 1.5;
  }

  return latitudeDelta <= 0.85;
}

function shouldShowProjectedScoreMarkers(
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number },
  pointCount: number
) {
  return shouldShowScoreMarkers(Math.max(bounds.maxLat - bounds.minLat, 0.12), pointCount);
}

function toneForRating(rating: string | null | undefined) {
  if (rating === 'Strong' || rating === 'Good') {
    return { backgroundColor: colors.strong };
  }

  if (rating === 'Fair') {
    return { backgroundColor: colors.fair };
  }

  return { backgroundColor: colors.noGo };
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  fullBleedShell: {
    borderRadius: 0,
    borderWidth: 0,
  },
  mapCanvas: {
    backgroundColor: '#E6ECDF',
    position: 'relative',
    overflow: 'hidden',
  },
  mapLandPatchNorth: {
    position: 'absolute',
    left: '-12%',
    right: '-18%',
    top: '-8%',
    height: '34%',
    borderRadius: 999,
    backgroundColor: 'rgba(205, 221, 193, 0.62)',
    transform: [{ rotate: '-7deg' }],
  },
  mapLandPatchSouth: {
    position: 'absolute',
    left: '-15%',
    right: '-12%',
    bottom: '-7%',
    height: '29%',
    borderRadius: 999,
    backgroundColor: 'rgba(205, 221, 193, 0.48)',
    transform: [{ rotate: '9deg' }],
  },
  mapLakeWest: {
    position: 'absolute',
    left: '-18%',
    top: '19%',
    width: '42%',
    height: '19%',
    borderRadius: 999,
    backgroundColor: 'rgba(129, 178, 197, 0.28)',
    transform: [{ rotate: '-16deg' }],
  },
  mapLakeEast: {
    position: 'absolute',
    right: '-14%',
    bottom: '18%',
    width: '36%',
    height: '17%',
    borderRadius: 999,
    backgroundColor: 'rgba(129, 178, 197, 0.22)',
    transform: [{ rotate: '13deg' }],
  },
  riverRibbonOne: {
    position: 'absolute',
    left: '-18%',
    right: '-12%',
    top: '28%',
    height: 24,
    borderRadius: 999,
    backgroundColor: 'rgba(55, 133, 168, 0.35)',
    transform: [{ rotate: '-18deg' }],
  },
  riverRibbonTwo: {
    position: 'absolute',
    left: '-12%',
    right: '-16%',
    top: '55%',
    height: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(55, 133, 168, 0.28)',
    transform: [{ rotate: '15deg' }],
  },
  riverRibbonThree: {
    position: 'absolute',
    left: '38%',
    top: '-6%',
    width: 22,
    height: '120%',
    borderRadius: 999,
    backgroundColor: 'rgba(55, 133, 168, 0.22)',
    transform: [{ rotate: '3deg' }],
  },
  primaryRoadNorth: {
    position: 'absolute',
    left: '-8%',
    right: '-6%',
    top: '22%',
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(250, 250, 244, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(200, 184, 141, 0.65)',
    transform: [{ rotate: '8deg' }],
  },
  primaryRoadCentral: {
    position: 'absolute',
    left: '-10%',
    right: '-8%',
    top: '47%',
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(250, 250, 244, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(200, 184, 141, 0.7)',
    transform: [{ rotate: '-9deg' }],
  },
  primaryRoadSouth: {
    position: 'absolute',
    left: '-14%',
    right: '-12%',
    top: '72%',
    height: 9,
    borderRadius: 999,
    backgroundColor: 'rgba(250, 250, 244, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(200, 184, 141, 0.55)',
    transform: [{ rotate: '16deg' }],
  },
  secondaryRoadOne: {
    position: 'absolute',
    top: '-4%',
    bottom: '-6%',
    left: '23%',
    width: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 251, 0.7)',
    transform: [{ rotate: '-11deg' }],
  },
  secondaryRoadTwo: {
    position: 'absolute',
    top: '-8%',
    bottom: '-10%',
    left: '61%',
    width: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 251, 0.68)',
    transform: [{ rotate: '10deg' }],
  },
  secondaryRoadThree: {
    position: 'absolute',
    left: '-8%',
    right: '-8%',
    top: '36%',
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 251, 0.62)',
    transform: [{ rotate: '-2deg' }],
  },
  secondaryRoadFour: {
    position: 'absolute',
    left: '-8%',
    right: '-8%',
    top: '63%',
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 251, 0.62)',
    transform: [{ rotate: '-13deg' }],
  },
  mapLabel: {
    position: 'absolute',
    color: 'rgba(70, 86, 77, 0.58)',
    fontSize: 11,
    fontWeight: '800',
    textShadowColor: 'rgba(255, 255, 255, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  labelMississippi: {
    left: '42%',
    top: '25%',
    transform: [{ rotate: '83deg' }],
  },
  labelMinnesota: {
    left: '12%',
    top: '50%',
    transform: [{ rotate: '-9deg' }],
  },
  labelStCroix: {
    right: '4%',
    top: '37%',
    transform: [{ rotate: '68deg' }],
  },
  labelMinneapolis: {
    left: '26%',
    top: '39%',
  },
  labelSaintPaul: {
    left: '52%',
    top: '41%',
  },
  markerTarget: {
    position: 'absolute',
    width: 50,
    height: 50,
    marginLeft: -25,
    marginTop: -25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectedRouteSpanBackground: {
    position: 'absolute',
    minWidth: 26,
    minHeight: 26,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'rgba(37, 99, 235, 0.24)',
    backgroundColor: 'rgba(37, 99, 235, 0.06)',
  },
  projectedRouteSpanSelected: {
    position: 'absolute',
    minWidth: 26,
    minHeight: 26,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'rgba(37, 99, 235, 0.42)',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  markerSelectedRing: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 4,
    borderColor: SELECTED_MARKER_COLOR,
    backgroundColor: 'transparent',
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surfaceStrong,
  },
  dotMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.surfaceStrong,
  },
  markerText: {
    color: colors.surfaceStrong,
    fontSize: 11,
    fontWeight: '900',
  },
  markerTextSelected: {
    fontSize: 13,
  },
  markerDimmed: {
    opacity: 0.58,
  },
  markerSelectedTone: {
    backgroundColor: SELECTED_MARKER_COLOR,
  },
  userMarker: {
    position: 'absolute',
    width: 22,
    height: 22,
    marginLeft: -11,
    marginTop: -11,
    borderRadius: 11,
    backgroundColor: 'rgba(47, 107, 89, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarkerDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  footerCopy: {
    flex: 1,
    gap: 2,
  },
  footerLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  footerTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  footerMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  legend: {
    gap: spacing.xs,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
});
