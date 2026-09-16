import { useState } from 'react';
import { Modal, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type OfflineTrip, offlineTripBytes } from '../lib/offline-trips';
import { openExternalUrl } from '../lib/external-links';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';

export function OfflineTripView({ packet, onClose }: { packet: OfflineTrip; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [shareText, setShareText] = useState('');
  const draftFields = [ ['Launch (local time)', packet.draft.launch], ['Expected take-out (local time)', packet.draft.expected],
    ['Check-in (local time)', packet.draft.checkIn], ['Group size', packet.draft.groupSize], ['Boat / gear', packet.draft.boat],
    ['Vehicle / shuttle notes', packet.draft.vehicle], ['Group note', packet.draft.note] ];
  async function share() {
    const text = [packet.name, `${packet.putIn.name} to ${packet.takeOut.name}`,
      ...[packet.putIn, packet.takeOut].map(p => `${p.name}: ${p.latitude}, ${p.longitude}`),
      ...draftFields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
      `Offline plan saved ${packet.savedAt}. Current conditions unavailable. PaddleToday does not monitor this trip.`].join('\n');
    try { await Share.share({ title: `Float plan - ${packet.name}`, message: text }); }
    catch { setShareText(text); }
  }
  return <Modal visible animationType="none" presentationStyle="pageSheet" onRequestClose={onClose}>
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: Math.max(spacing.md, insets.top), paddingBottom: Math.max(spacing.xl, insets.bottom) }]}>
      <AppButton label="Close offline trip" variant="secondary" onPress={onClose} />
      <Text accessibilityRole="header" style={styles.title}>{packet.name}</Text>
      <Text style={styles.body}>{packet.putIn.name} to {packet.takeOut.name}</Text>
      <Text style={styles.body}>{offlineStatus(packet)} · {Math.ceil(offlineTripBytes(packet) / 1024)} KB on this device</Text>
      <Text style={styles.body}>Saved {new Date(packet.savedAt).toLocaleString()}</Text>
      <SectionCard title="Current conditions unavailable" subtitle="This is a saved reference plan. Scores, gauge readings and forecasts are not available as live conditions here. Expired conditions cannot be used for a launch decision.">
        <Text style={styles.body}>Check current gauge, weather, closures and access before launching. PaddleToday does not monitor your trip or check-in.</Text>
        <Text style={styles.body}>Route reference: {packet.referenceGeneratedAt ? new Date(packet.referenceGeneratedAt).toLocaleString() : 'date unavailable'}. Access information may have changed.</Text>
      </SectionCard>
      {packet.missing.length ? <SectionCard title="Download incomplete" subtitle={`Missing: ${packet.missing.join(', ')}. Available details are saved; this packet is not complete.`} /> : null}
      <SectionCard title="Selected landings" subtitle="Coordinates and access notes are available without a connection.">
        {[['Put-in', packet.putIn], ['Take-out', packet.takeOut]] .map(([label, value]) => {
          const p = value as OfflineTrip['putIn'];
          return <View key={p.id} style={styles.group}>
            <Text style={styles.label}>{String(label)}: {p.name}</Text>
            <Text selectable style={styles.body}>{p.latitude.toFixed(6)}, {p.longitude.toFixed(6)}</Text>
            {p.note ? <Text style={styles.body}>{p.note}</Text> : null}
            <AppButton label={`Directions to ${p.name}`} variant="secondary" hint="Opens an external map app; directions may require a connection or downloaded maps."
              onPress={() => void openExternalUrl(`https://www.google.com/maps/dir/?api=1&destination=${p.latitude},${p.longitude}`, 'Directions')} />
          </View>;
        })}
        <Text style={styles.body}>Directions open another app and may need a connection or previously downloaded maps.</Text>
      </SectionCard>
      <SectionCard title="Your selected segment" subtitle="The downloaded put-in to take-out portion, when route data supports it.">
        {packet.segment?.distanceMiles ? <Text style={styles.body}>Distance: {packet.segment.distanceMiles} miles</Text> : <Text style={styles.body}>Selected segment distance is unavailable for this route.</Text>}
        {packet.segment?.estimatedPaddleMinutes ? <Text style={styles.body}>Planning estimate: {formatMinutes(packet.segment.estimatedPaddleMinutes.min)}–{formatMinutes(packet.segment.estimatedPaddleMinutes.max)} on the water, before shuttle or staging time.</Text> : <Text style={styles.body}>Selected segment time estimate is unavailable; confirm timing with the group.</Text>}
        {packet.segment?.geometry ? <OfflineRouteOutline packet={packet} segmentOnly /> : <Text style={styles.body}>The selected outline was not downloaded. Retry the offline download when connected.</Text>}
        {packet.segment?.missing.length ? <Text style={styles.body}>Unavailable here: {packet.segment.missing.join(', ')}.</Text> : null}
      </SectionCard>
      <SectionCard title="Reference route geometry" subtitle="Full route outline with your selected launch and landing. No background map or live navigation.">
        <OfflineRouteOutline packet={packet} />
        {packet.geometry ? <Text style={styles.body}>Source: {packet.geometry.source}. This is full-route context; the selected segment is shown above when available.</Text> : <Text style={styles.body}>Route geometry was not downloaded. Retry from Saved when connected.</Text>}
      </SectionCard>
      <SectionCard title="Your saved plan" subtitle="Timing and notes captured when you prepared this offline trip. Later draft edits need an updated download.">
        {draftFields.filter(([, value]) => value).map(([label, value]) => <View style={styles.group} key={label}>
          <Text style={styles.label}>{label}</Text><Text selectable style={styles.body}>{value}</Text>
        </View>)}
        <AppButton label="Share saved float plan" onPress={() => void share()} />
        {shareText ? <Text selectable style={styles.body}>{shareText}</Text> : null}
      </SectionCard>
      <SectionCard title="Route and shuttle reference" subtitle={packet.reach}>
        {packet.facts.map(fact => <View key={fact.label} style={styles.group}><Text style={styles.label}>{fact.label}</Text><Text style={styles.body}>{fact.text}</Text></View>)}
        <Text style={styles.body}>Full-route distance and time may differ from your selected access segment.</Text>
      </SectionCard>
    </ScrollView>
  </Modal>;
}
export function offlineStatus(packet: OfflineTrip) { return packet.missing.length ? 'Incomplete offline trip' : 'Ready for offline reference'; }
function formatMinutes(minutes: number) { return minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60 ? `${minutes % 60}m` : ''}`.trim() : `${minutes} min`; }

// Platform-independent coordinate drawing: no map SDK, tiles, fonts or network
// requests are needed to display the saved route after an offline cold start.
function OfflineRouteOutline({ packet, segmentOnly = false }: { packet: OfflineTrip; segmentOnly?: boolean }) {
  const [width, setWidth] = useState(300);
  const height = 280, padding = 26;
  const markers = [packet.putIn, packet.takeOut];
  const lines = segmentOnly ? packet.segment?.geometry?.lines ?? [] : packet.geometry?.lines ?? [];
  const all = [...lines.flat(), ...markers.map(p => [p.longitude, p.latitude])];
  const cos = Math.cos((packet.putIn.latitude + packet.takeOut.latitude) / 2 * Math.PI / 180);
  const xs = all.map(p => p[0] * cos), ys = all.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const scale = Math.min((width - padding * 2) / Math.max(maxX - minX, 0.0001), (height - padding * 2) / Math.max(maxY - minY, 0.0001));
  const project = (p: number[]) => ({ x: width / 2 + (p[0] * cos - (minX + maxX) / 2) * scale,
    y: height / 2 - (p[1] - (minY + maxY) / 2) * scale });
  const count = lines.reduce((sum, line) => sum + line.length, 0);
  const stride = Math.max(1, Math.ceil(count / 700));
  return <View accessibilityLabel={`${segmentOnly ? 'Selected segment' : 'Saved full route'} outline. A is your put-in; B is your take-out. North is up.`} accessibilityRole="image"
    style={[styles.outline, { height }]} onLayout={e => setWidth(Math.max(100, e.nativeEvent.layout.width))}>
    <Text style={styles.north}>N ↑</Text>
    {lines.flatMap((line, lineIndex) => {
      const points = line.filter((_, i) => i % stride === 0 || i === line.length - 1).map(project);
      return points.slice(1).map((end, i) => {
        const start = points[i], dx = end.x - start.x, dy = end.y - start.y, length = Math.hypot(dx, dy);
        return <View key={`${lineIndex}-${i}`} style={{ position: 'absolute', backgroundColor: colors.accent, height: 3, width: length,
          left: (start.x + end.x - length) / 2, top: (start.y + end.y) / 2 - 1.5,
          transform: [{ rotate: `${Math.atan2(dy, dx)}rad` }] }} />;
      });
    })}
    {markers.map((point, index) => { const p = project([point.longitude, point.latitude]);
      return <View key={point.id} style={[styles.marker, { left: p.x - 12, top: p.y - 12 }]}><Text style={styles.markerText}>{index ? 'B' : 'A'}</Text></View>;
    })}
  </View>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas }, content: { padding: spacing.md, gap: spacing.md },
  title: { ...typography.title, color: colors.text }, body: { ...typography.supporting, color: colors.textMuted },
  label: { ...typography.label, color: colors.text }, group: { gap: spacing.xs, marginBottom: spacing.sm },
    outline: { width: '100%', backgroundColor: colors.surfaceStrong, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  north: { position: 'absolute', top: 6, right: 10, color: colors.text },
  marker: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: colors.accentDeep, alignItems: 'center', justifyContent: 'center' },
  markerText: { color: colors.surfaceStrong, fontWeight: '700' },
});
