import type { PaddleTrack } from '@paddletoday/api-contract';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { decodePaddleTrackPolylines } from '../lib/paddle-tracking';
import { colors, radius } from '../theme/tokens';

export function PaddleTrackMap({ track, height = 220 }: { track: PaddleTrack; height?: number }) {
  const segments = useMemo(() => decodePaddleTrackPolylines(track), [track]);
  const points = segments.flat();
  if (!points.length) return null;
  const minLatitude = Math.min(...points.map(point => point.latitude)), maxLatitude = Math.max(...points.map(point => point.latitude));
  const minLongitude = Math.min(...points.map(point => point.longitude)), maxLongitude = Math.max(...points.map(point => point.longitude));
  const latitude = (minLatitude + maxLatitude) / 2, longitude = (minLongitude + maxLongitude) / 2;
  const latitudeDelta = Math.max(0.008, (maxLatitude - minLatitude) * 1.5);
  const longitudeDelta = Math.max(0.008, (maxLongitude - minLongitude) * 1.5);
  return <View style={[styles.frame, { height }]}>
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
      toolbarEnabled={false}
      accessibilityLabel="Recorded paddle route map"
    >
      {segments.map((coordinates, index) => <Polyline key={`segment-${index}`} coordinates={coordinates} strokeColor={colors.accentDeep} strokeWidth={4} lineCap="round" lineJoin="round" />)}
      <Marker coordinate={points[0]!} pinColor="#26845E" title="Started here" />
      <Marker coordinate={points[points.length - 1]!} pinColor="#C45442" title="Finished here" />
    </MapView>
  </View>;
}

const styles = StyleSheet.create({
  frame: { height: 220, overflow: 'hidden', borderRadius: radius.md, backgroundColor: colors.canvasMuted },
});
