import type { default as NativeMapView } from 'react-native-maps';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

declare const require: <T = unknown>(moduleName: string) => T;

const SELECTED_MARKER_COLOR = '#2563EB';

export interface RoutePlotPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  score?: number | null;
  rating?: string | null;
  meta?: string | null;
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
  onSelectPoint?: (point: RoutePlotPoint) => void;
  height?: number;
  showFooter?: boolean;
  fullBleed?: boolean;
  markerMode?: 'score' | 'pin';
}>(function RoutePlotMap({
  points,
  selectedId,
  userLocation,
  onSelectPoint,
  height = 290,
  showFooter = true,
  fullBleed = false,
  markerMode = 'score',
}, ref) {
  const bounds = getBounds(points, userLocation);
  const visiblePoints = points.filter(isFinitePoint);
  const nativeMarkerPoints = useMemo(
    () => [...visiblePoints].sort(compareMapPointIds),
    [visiblePoints]
  );
  const selectedPoint = visiblePoints.find((point) => point.id === selectedId) ?? visiblePoints[0] ?? null;
  const nativeMaps = getNativeMaps();
  const mapRef = useRef<NativeMapView | null>(null);
  const previousSelectedIdRef = useRef<string | null | undefined>(selectedId);
  const previousPointSignatureRef = useRef<string | null>(null);
  const initialRegion = regionFromBounds(bounds);
  const pointSignature = nativeMarkerPoints.map((point) => point.id).join('|');
  const hasUserLocation = Boolean(
    userLocation && Number.isFinite(userLocation.latitude) && Number.isFinite(userLocation.longitude)
  );
  const nativeUserLocation = hasUserLocation ? userLocation : null;
  const nativeMapKey = `${markerMode}:${hasUserLocation ? 'user' : 'nouser'}:${pointSignature}`;
  const [regionDelta, setRegionDelta] = useState({
    latitudeDelta: initialRegion.latitudeDelta,
    longitudeDelta: initialRegion.longitudeDelta,
  });
  const showScoreMarkers = shouldShowScoreMarkers(regionDelta.latitudeDelta, visiblePoints.length);
  const [trackMarkerViews, setTrackMarkerViews] = useState(true);

  function focusSelected() {
    if (!nativeMaps || !selectedPoint) {
      return;
    }

    mapRef.current?.animateToRegion?.(regionAroundPoint(selectedPoint), 260);
  }

  function focusAll() {
    if (!nativeMaps || visiblePoints.length === 0) {
      return;
    }

    const coordinates = visiblePoints.map((point) => ({
      latitude: point.latitude,
      longitude: point.longitude,
    }));

    if (userLocation && Number.isFinite(userLocation.latitude) && Number.isFinite(userLocation.longitude)) {
      coordinates.push({ latitude: userLocation.latitude, longitude: userLocation.longitude });
    }

    mapRef.current?.fitToCoordinates?.(coordinates, {
      animated: true,
      edgePadding: { top: 88, right: 64, bottom: showFooter ? 140 : 250, left: 64 },
    });
  }

  function focusUserArea() {
    if (!nativeMaps) {
      return;
    }

    if (!userLocation || !Number.isFinite(userLocation.latitude) || !Number.isFinite(userLocation.longitude)) {
      focusAll();
      return;
    }

    const nearbyPoints = visiblePoints
      .map((point) => ({
        point,
        miles: distanceMiles(userLocation.latitude, userLocation.longitude, point.latitude, point.longitude),
      }))
      .sort((left, right) => left.miles - right.miles)
      .slice(0, 12)
      .map(({ point }) => point);

    const coordinates = [
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      ...nearbyPoints.map((point) => ({ latitude: point.latitude, longitude: point.longitude })),
    ];

    if (coordinates.length === 1) {
      mapRef.current?.animateToRegion?.(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 2.6,
          longitudeDelta: 2.6,
        },
        260
      );
      return;
    }

    mapRef.current?.fitToCoordinates?.(coordinates, {
      animated: true,
      edgePadding: { top: 108, right: 74, bottom: showFooter ? 150 : 270, left: 74 },
    });
  }

  useImperativeHandle(ref, () => ({ focusSelected, focusAll, focusUserArea }), [selectedPoint, nativeMaps, visiblePoints, userLocation, showFooter]);

  useEffect(() => {
    const previousSelectedId = previousSelectedIdRef.current;
    previousSelectedIdRef.current = selectedId;

    if (!previousSelectedId || !selectedId || previousSelectedId === selectedId) {
      return;
    }

    focusSelected();
  }, [nativeMaps, selectedId, selectedPoint]);

  useEffect(() => {
    setRegionDelta({
      latitudeDelta: initialRegion.latitudeDelta,
      longitudeDelta: initialRegion.longitudeDelta,
    });
  }, [initialRegion.latitudeDelta, initialRegion.longitudeDelta]);

  useEffect(() => {
    const previousPointSignature = previousPointSignatureRef.current;
    previousPointSignatureRef.current = pointSignature;

    if (!nativeMaps || !previousPointSignature || previousPointSignature === pointSignature) {
      return;
    }

    focusAll();
  }, [nativeMaps, pointSignature, userLocation]);

  useEffect(() => {
    if (!nativeMaps) {
      return;
    }

    setTrackMarkerViews(true);
    const timeout = setTimeout(() => setTrackMarkerViews(false), 450);
    return () => clearTimeout(timeout);
  }, [nativeMaps, pointSignature, selectedId, showScoreMarkers]);

  if (nativeMaps && visiblePoints.length > 0) {
    const MapView = nativeMaps.default;
    const Marker = nativeMaps.Marker;

    return (
      <View style={[styles.shell, fullBleed ? styles.fullBleedShell : null]}>
        <MapView
          key={nativeMapKey}
          ref={mapRef}
          style={[styles.nativeMap, { height }]}
          initialRegion={initialRegion}
          onRegionChangeComplete={(region) => {
            setRegionDelta((current) => {
              if (
                Math.abs(current.latitudeDelta - region.latitudeDelta) < 0.01 &&
                Math.abs(current.longitudeDelta - region.longitudeDelta) < 0.01
              ) {
                return current;
              }

              return { latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta };
            });
          }}
          showsUserLocation={false}
          showsCompass
          showsScale
          toolbarEnabled={false}
        >
          {nativeUserLocation ? (
            <Marker
              coordinate={{ latitude: nativeUserLocation.latitude, longitude: nativeUserLocation.longitude }}
              title={nativeUserLocation.label ?? 'Current location'}
              zIndex={999}
            >
              <View style={styles.nativeUserMarker}>
                <View style={styles.nativeUserMarkerDot} />
              </View>
            </Marker>
          ) : null}

          {nativeMarkerPoints.map((point) => {
            const selected = point.id === selectedId;
            const dimmed = Boolean(selectedId && !selected);
            const showScore = selected || showScoreMarkers;
            if (markerMode === 'pin') {
              const pinColor = pinColorForPoint(point, selected);

              return (
                <Marker
                  key={`${point.id}-${selected ? 'selected' : 'idle'}-${pinColor}`}
                  coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                  onPress={() => onSelectPoint?.(point)}
                  zIndex={selected ? 10 : 1}
                  pinColor={pinColor}
                  tracksViewChanges={false}
                />
              );
            }

            return (
              <Marker
                key={point.id}
                coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                onPress={() => onSelectPoint?.(point)}
                zIndex={selected ? 10 : 1}
                anchor={{ x: 0.5, y: 0.5 }}
                centerOffset={{ x: 0, y: 0 }}
                tracksViewChanges={trackMarkerViews}
              >
                <View
                  style={[
                    styles.nativeMarker,
                    showScore ? styles.nativeScoreMarker : styles.nativeDotMarker,
                    dimmed ? styles.nativeMarkerDimmed : null,
                    selected ? styles.nativeMarkerSelected : null,
                    toneForRating(point.rating),
                    selected ? styles.nativeMarkerSelectedTone : null,
                  ]}
                  collapsable={false}
                >
                  {showScore ? (
                    <Text style={styles.nativeMarkerText}>
                      {typeof point.score === 'number' ? point.score : ''}
                    </Text>
                  ) : null}
                </View>
              </Marker>
            );
          })}
        </MapView>

        {showFooter ? <MapFooter selectedPoint={selectedPoint} /> : null}
      </View>
    );
  }

  return (
    <View style={[styles.shell, fullBleed ? styles.fullBleedShell : null]}>
      <View style={[styles.mapCanvas, { height }]}>
        <View style={styles.gridLineHorizontal} />
        <View style={styles.gridLineVertical} />
        <View style={styles.riverRibbonOne} />
        <View style={styles.riverRibbonTwo} />

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

        {visiblePoints.map((point) => {
          const selected = point.id === selectedId;
          const dimmed = Boolean(selectedId && !selected);
          const showScore = selected || shouldShowProjectedScoreMarkers(bounds, visiblePoints.length);
          return (
            <Pressable
              key={point.id}
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

function getNativeMaps(): typeof import('react-native-maps') | null {
  if (Platform.OS === 'web') {
    return null;
  }

  return require<typeof import('react-native-maps')>('react-native-maps');
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

function isFinitePoint(point: RoutePlotPoint) {
  return Number.isFinite(point.latitude) && Number.isFinite(point.longitude);
}

function compareMapPointIds(left: RoutePlotPoint, right: RoutePlotPoint) {
  return left.id.localeCompare(right.id);
}

function getBounds(
  points: RoutePlotPoint[],
  userLocation?: { latitude: number; longitude: number } | null
) {
  const coordinates = points
    .filter(isFinitePoint)
    .map((point) => ({ latitude: point.latitude, longitude: point.longitude }));

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

function regionFromBounds(bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }) {
  const latitudeDelta = Math.max(bounds.maxLat - bounds.minLat, 0.12);
  const longitudeDelta = Math.max(bounds.maxLon - bounds.minLon, 0.12);

  return {
    latitude: (bounds.minLat + bounds.maxLat) / 2,
    longitude: (bounds.minLon + bounds.maxLon) / 2,
    latitudeDelta,
    longitudeDelta,
  };
}

function regionAroundPoint(point: RoutePlotPoint) {
  return {
    latitude: point.latitude,
    longitude: point.longitude,
    latitudeDelta: 0.35,
    longitudeDelta: 0.35,
  };
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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distanceMiles(latA: number, lonA: number, latB: number, lonB: number) {
  const radiusMiles = 3958.8;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const dLat = toRadians(latB - latA);
  const dLon = toRadians(lonB - lonA);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(latA)) * Math.cos(toRadians(latB)) * Math.sin(dLon / 2) ** 2;

  return radiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

function pinColorForPoint(point: RoutePlotPoint, selected: boolean) {
  if (selected) {
    return SELECTED_MARKER_COLOR;
  }

  if (point.rating === 'Strong' || point.rating === 'Good') {
    return colors.strong;
  }

  if (point.rating === 'Fair') {
    return colors.fair;
  }

  return colors.noGo;
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
  nativeMap: {
    width: '100%',
  },
  nativeMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surfaceStrong,
  },
  nativeScoreMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  nativeDotMarker: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  nativeMarkerSelected: {
    borderColor: colors.surfaceStrong,
  },
  nativeMarkerSelectedTone: {
    backgroundColor: SELECTED_MARKER_COLOR,
  },
  nativeMarkerDimmed: {
    opacity: 0.58,
  },
  nativeMarkerText: {
    color: colors.surfaceStrong,
    fontSize: 11,
    fontWeight: '900',
  },
  nativeUserMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(47, 107, 89, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceStrong,
  },
  nativeUserMarkerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  mapCanvas: {
    backgroundColor: '#DDE7E0',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1,
    backgroundColor: 'rgba(31, 42, 36, 0.09)',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    backgroundColor: 'rgba(31, 42, 36, 0.09)',
  },
  riverRibbonOne: {
    position: 'absolute',
    left: '-10%',
    right: '-8%',
    top: '34%',
    height: 40,
    borderRadius: 999,
    backgroundColor: 'rgba(77, 132, 159, 0.18)',
    transform: [{ rotate: '-12deg' }],
  },
  riverRibbonTwo: {
    position: 'absolute',
    left: '-8%',
    right: '-12%',
    top: '58%',
    height: 32,
    borderRadius: 999,
    backgroundColor: 'rgba(77, 132, 159, 0.14)',
    transform: [{ rotate: '17deg' }],
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
