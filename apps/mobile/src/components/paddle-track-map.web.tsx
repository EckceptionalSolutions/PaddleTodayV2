import type { PaddleTrack } from '@paddletoday/api-contract';
import { StyleSheet, Text, View } from 'react-native';
import { decodePaddleTrackPolylines } from '../lib/paddle-tracking';
import { colors, radius } from '../theme/tokens';

export function PaddleTrackMap({ track, height = 220 }: { track: PaddleTrack; height?: number }) {
  const segments = decodePaddleTrackPolylines(track);
  const points = segments.flat();
  if (!points.length) return null;
  const minLatitude = Math.min(...points.map(point => point.latitude)), maxLatitude = Math.max(...points.map(point => point.latitude));
  const minLongitude = Math.min(...points.map(point => point.longitude)), maxLongitude = Math.max(...points.map(point => point.longitude));
  const project = (point: { latitude: number; longitude: number }) => ({
    x: 18 + (point.longitude - minLongitude) / Math.max(0.00001, maxLongitude - minLongitude) * 264,
    y: height - 38 - (point.latitude - minLatitude) / Math.max(0.00001, maxLatitude - minLatitude) * Math.max(1, height - 76),
  });
  const first = project(points[0]!); const last = project(points[points.length - 1]!);
  return <View style={[styles.frame, { height }]} accessibilityLabel="Recorded paddle route map">
    <Text style={styles.label}>Paddle route</Text>
    {segments.map((segment, segmentIndex) => {
      const projected = segment.map(project);
      return projected.slice(1).map((point, index) => {
        const previous = projected[index]!;
        const dx = point.x - previous.x, dy = point.y - previous.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const rotation = `${Math.atan2(dy, dx) * 180 / Math.PI}deg`;
        return <View key={`${segmentIndex}-${index}`} style={[styles.line, { width: length, left: (previous.x + point.x) / 2 - length / 2, top: (previous.y + point.y) / 2, transform: [{ rotate: rotation }] }]} />;
      });
    })}
    <View style={[styles.marker, styles.start, { left: first.x - 6, top: first.y - 6 }]} />
    <View style={[styles.marker, styles.finish, { left: last.x - 6, top: last.y - 6 }]} />
  </View>;
}

const styles = StyleSheet.create({
  frame: { height: 220, overflow: 'hidden', borderRadius: radius.md, backgroundColor: colors.canvasMuted, position: 'relative' },
  label: { position: 'absolute', top: 12, left: 14, zIndex: 2, color: colors.textMuted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  line: { position: 'absolute', height: 4, borderRadius: 2, backgroundColor: colors.accentDeep },
  marker: { position: 'absolute', width: 12, height: 12, borderWidth: 2, borderColor: colors.surfaceStrong, borderRadius: 6 },
  start: { backgroundColor: '#26845E' },
  finish: { backgroundColor: '#C45442' },
});
