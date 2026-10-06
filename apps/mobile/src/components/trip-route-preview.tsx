import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { TripRoute } from '@paddletoday/api-contract';
import { useRiverDetailQuery, useRiverGeometryQuery } from '../api/queries';
import { tripDurationLabel, tripRoutePreview } from '../lib/trip-route-preview';
import { colors, radius, spacing } from '../theme/tokens';
import { AppButton } from './app-button';
import { RoutePlotMap, type RoutePlotPoint } from './route-plot-map';

export function TripRoutePreview({ route, onOpenRoute, disabled }: { route: TripRoute; onOpenRoute: () => void; disabled: boolean }) {
  const detail = useRiverDetailQuery(route.slug);
  const geometry = useRiverGeometryQuery(route.slug);
  const preview = useMemo(() => tripRoutePreview(route, detail.data?.result, geometry.data), [route, detail.data, geometry.data]);
  const markers: RoutePlotPoint[] = useMemo(() => preview?.points.map(point => ({
    id: point.kind, label: `${point.kind === 'putIn' ? 'Put-in' : 'Take-out'}: ${point.name}`,
    latitude: point.latitude, longitude: point.longitude, markerLabel: point.kind === 'putIn' ? 'IN' : 'OUT',
    markerAccessibilityLabel: `${point.kind === 'putIn' ? 'Put-in' : 'Take-out'}: ${point.name}`,
    rating: point.kind === 'putIn' ? 'Good' : 'Fair',
  })) ?? [], [preview]);
  if (!route.slug) return null;
  return <View style={styles.card}>
    {markers.length ? <View accessibilityLabel={`Selected route preview. ${markers.map(point => point.label).join('. ')}.`}>
      <RoutePlotMap key={`${route.slug}:${route.putInId}:${route.takeOutId}:${route.putInName}:${route.takeOutName}:${geometry.data?.requestId || 'no-path'}`} points={markers} backgroundSpanSegments={preview?.lines} interactive={false} dimUnselectedMarkers={false} showFooter={false} fitToAllOnReady fitToAllEdgePadding={24} height={180} markerMode="score" />
      <View style={styles.legend}><Text style={styles.legendText}>● IN · Put-in</Text><Text style={styles.legendText}>● OUT · Take-out</Text></View>
    </View> : <Text style={styles.hint}>{detail.isPending ? 'Loading your route preview…' : detail.isError ? 'Route preview unavailable. Your saved plan is still here.' : 'Set access points to show this route on the map.'}</Text>}
    {preview?.missingEndpoints && markers.length ? <Text style={styles.hint}>One selected access point could not be located. Edit the route to confirm it.</Text> : null}
    {preview && markers.length === 2 && !preview.lines.length ? <Text style={styles.hint}>Access locations shown. A river path for this section isn’t available.</Text> : null}
    {preview?.distanceMiles || preview?.estimatedMinutes ? <View style={styles.metrics}>
      {preview.distanceMiles ? <View><Text style={styles.metric}>{preview.distanceMiles} mi</Text><Text style={styles.hint}>Selected distance</Text></View> : null}
      {preview.estimatedMinutes ? <View style={styles.time}><Text style={styles.metric}>{tripDurationLabel(preview.estimatedMinutes)}</Text><Text style={styles.hint}>Estimated paddle time</Text></View> : null}
    </View> : null}
    <AppButton label="Route & current conditions" icon="map-outline" variant="secondary" disabled={disabled} onPress={onOpenRoute} />
    <Text style={styles.hint}>Review current conditions and access before launching.</Text>
  </View>;
}
const styles = StyleSheet.create({
  card: { gap: spacing.sm, borderRadius: radius.lg, backgroundColor: colors.surfaceStrong },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, paddingTop: 6 }, legendText: { fontSize: 11, fontWeight: '700', color: colors.textMuted },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg }, time: { flexShrink: 1 }, metric: { color: colors.text, fontWeight: '800', fontSize: 17, lineHeight: 24 },
  hint: { fontSize: 12, lineHeight: 18, color: colors.textMuted },
});
