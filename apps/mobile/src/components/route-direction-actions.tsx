import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { openExternalUrl } from '../lib/external-links';
import { colors, radius, spacing } from '../theme/tokens';
import { AppButton } from './app-button';

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
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState<string | null>(null);
  const [reversed, setReversed] = useState(false);
  const request = useRef<object | null>(null);
  useEffect(() => {
    request.current = null;
    setStatus('');
    setPending(null);
    setReversed(false);
    return () => { request.current = null; };
  }, [putIn?.latitude, putIn?.longitude, takeOut?.latitude, takeOut?.longitude]);

  async function openDirections(url: string, app: string) {
    if (request.current) return;
    const current = {};
    request.current = current;
    setStatus('');
    setPending(app);
    try {
      const opened = await openExternalUrl(url, app);
      if (request.current === current && !opened) setStatus(`${app} could not be opened. Try again or choose the other map app.`);
    } finally {
      if (request.current === current) {
        request.current = null;
        setPending(null);
      }
    }
  }

  if (!hasCoordinates(putIn) || !hasCoordinates(takeOut)) {
    return null;
  }

  const from = reversed ? takeOut : putIn;
  const to = reversed ? putIn : takeOut;
  const origin = `${from.latitude},${from.longitude}`;
  const destination = `${to.latitude},${to.longitude}`;
  const appleUrl = `https://maps.apple.com/?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}&dirflg=d`;
  const googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;

  return (
    <View style={styles.directionsPanel}>
      <View style={styles.directionsCopy}>
        <Text style={styles.directionsTitle}>Shuttle directions</Text>
        <Text accessibilityLiveRegion="polite" style={styles.directionsText}>Drive from {from.name} to {to.name}.</Text>
        <Text style={styles.directionsText}>{reversed ? 'Take-out to put-in' : 'Put-in to take-out'} · Driving only; your paddle route stays the same.</Text>
      </View>
      <AppButton label="Reverse shuttle direction" variant="secondary" icon="swap-horizontal" disabled={Boolean(pending)}
        onPress={() => { setReversed(value => !value); setStatus(''); }} />
      <View style={styles.directionsActions}>
        <AppButton
          label="Apple Maps"
          onPress={() => void openDirections(appleUrl, 'Apple Maps')}
          disabled={Boolean(pending)}
          busy={pending === 'Apple Maps'}
          busyLabel="Opening Apple Maps…"
          accessibilityLabel="Open shuttle directions in Apple Maps"
          style={styles.directionButton}
        />
        <AppButton
          label="Google Maps"
          onPress={() => void openDirections(googleUrl, 'Google Maps')}
          disabled={Boolean(pending)}
          busy={pending === 'Google Maps'}
          busyLabel="Opening Google Maps…"
          accessibilityLabel="Open shuttle directions in Google Maps"
          style={styles.directionButton}
        />
      </View>
      {status ? <Text accessibilityLiveRegion="polite" style={styles.directionsText}>{status}</Text> : null}
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
  directionsText: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  directionsActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  directionButton: { flexGrow: 1, flexBasis: 110 },
});
