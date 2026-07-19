import { Pressable, StyleSheet, Text, View } from 'react-native';
import { openExternalUrl } from '../lib/external-links';
import { colors, radius, spacing } from '../theme/tokens';

export interface RouteDirectionPoint {
  name: string;
  latitude?: number | null;
  longitude?: number | null;
}

export function RouteDirectionActions({
  putIn,
  takeOut,
}: {
  putIn?: RouteDirectionPoint;
  takeOut?: RouteDirectionPoint;
}) {
  if (!hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return null;
  }

  const origin = `${putIn.latitude},${putIn.longitude}`;
  const destination = `${takeOut.latitude},${takeOut.longitude}`;
  const appleUrl = `https://maps.apple.com/?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}&dirflg=d`;
  const googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

  return (
    <View style={styles.directionsPanel}>
      <View style={styles.directionsCopy}>
        <Text style={styles.directionsTitle}>Shuttle directions</Text>
        <Text style={styles.directionsText}>Open driving directions from {putIn.name} to {takeOut.name}.</Text>
      </View>
      <View style={styles.directionsActions}>
        <Pressable
          style={styles.directionButton}
          onPress={() => void openExternalUrl(appleUrl, 'Apple Maps')}
          accessibilityRole="button"
          accessibilityLabel="Open shuttle directions in Apple Maps"
        >
          <Text style={styles.directionButtonText}>Apple</Text>
        </Pressable>
        <Pressable
          style={styles.directionButton}
          onPress={() => void openExternalUrl(googleUrl, 'Google Maps')}
          accessibilityRole="button"
          accessibilityLabel="Open shuttle directions in Google Maps"
        >
          <Text style={styles.directionButtonText}>Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

function hasCoordinates(point: RouteDirectionPoint | undefined): point is RouteDirectionPoint & { latitude: number; longitude: number } {
  return Boolean(
    point &&
      typeof point.latitude === 'number' &&
      Number.isFinite(point.latitude) &&
      typeof point.longitude === 'number' &&
      Number.isFinite(point.longitude)
  );
}

const styles = StyleSheet.create({
  directionsPanel: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  directionsCopy: { gap: 3 },
  directionsTitle: { color: colors.text, fontSize: 14, fontWeight: '900' },
  directionsText: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  directionsActions: { flexDirection: 'row', gap: spacing.sm },
  directionButton: {
    minHeight: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionButtonText: { color: colors.surfaceStrong, fontSize: 12, fontWeight: '900' },
});
