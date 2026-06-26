import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { normalizeApiText } from '../lib/format';
import { routePhotoForRiver } from '../lib/route-photos';
import { routeDecisionLine, routePreviewFactItems } from '../lib/route-facts';
import { colors, radius, spacing } from '../theme/tokens';
import { RatingPill } from './rating-pill';
import { SaveToggleButton } from './save-toggle-button';

export function RiverCard({
  river,
  travelLabel,
  saved = false,
  showPhoto = false,
  onToggleSaved,
  onPress,
}: {
  river: RiverSummaryApiItem;
  travelLabel?: string;
  saved?: boolean;
  showPhoto?: boolean;
  onToggleSaved?: () => void;
  onPress: () => void;
}) {
  const facts = routePreviewFactItems(river.river, {
    includeNoCamping: true,
  }).filter((fact) => fact !== river.summary.gaugeNow);
  const showDataWarning = river.liveData.overall !== 'live';

  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: colors.canvasMuted }}>
      {showPhoto ? <RouteCardPhoto river={river} /> : null}

      <View style={styles.header}>
        <View style={styles.scoreBlock}>
          <Text style={styles.score}>{river.score}</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>
        <View style={styles.copy}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{river.river.name}</Text>
            <View style={styles.actions}>
              {onToggleSaved ? <SaveToggleButton compact saved={saved} onPress={onToggleSaved} /> : null}
              <RatingPill rating={river.rating} />
            </View>
          </View>
          <Text style={styles.reach}>{river.river.reach}</Text>
          <Text style={styles.explanation}>{routeDecisionLine(river.rating, river.summary.shortExplanation)}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillLabel}>Gauge</Text>
          <Text style={styles.metaPillValue} numberOfLines={1}>{river.summary.gaugeNow || river.gaugeBandLabel}</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillLabel}>Confidence</Text>
          <Text style={styles.metaPillValue} numberOfLines={1}>{river.confidence.label}</Text>
        </View>
      </View>

      <View style={styles.factRow}>
        {facts.slice(0, 3).map((fact) => (
          <Text key={fact} style={styles.factChip} numberOfLines={1}>{fact}</Text>
        ))}
      </View>

      {showDataWarning ? (
        <View style={styles.warningRow}>
          <Text style={styles.warningLabel}>Check source</Text>
          <Text style={styles.warningText}>{normalizeApiText(river.liveData.summary)}</Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{travelLabel ?? river.river.region}</Text>
        <Text style={styles.footerText}>{river.gaugeBandLabel}</Text>
      </View>
    </Pressable>
  );
}

function RouteCardPhoto({ river }: { river: RiverSummaryApiItem }) {
  const photo = routePhotoForRiver(river.river);

  return (
    <ImageBackground source={{ uri: photo.uri }} style={styles.photo} imageStyle={styles.photoImage}>
      <View style={styles.photoScrim} />
      {photo.isPlaceholder ? (
        <View style={styles.photoBadge}>
          <Text style={styles.photoBadgeText}>Needs photo</Text>
        </View>
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  photo: {
    height: 104,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.canvasMuted,
  },
  photoImage: {
    borderRadius: radius.md,
  },
  photoScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 24, 29, 0.08)',
  },
  photoBadge: {
    position: 'absolute',
    left: spacing.sm,
    bottom: spacing.sm,
    minHeight: 26,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(10, 24, 29, 0.58)',
    paddingHorizontal: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBadgeText: {
    color: colors.surfaceStrong,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  scoreBlock: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    color: colors.accentDeep,
    fontSize: 24,
    fontWeight: '800',
  },
  scoreLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  copy: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  reach: {
    color: colors.textMuted,
    fontSize: 13,
  },
  explanation: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignItems: 'center',
  },
  metaPill: {
    flex: 1,
    minWidth: 110,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: 2,
  },
  metaPillLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metaPillValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  factRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  factChip: {
    maxWidth: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  warningRow: {
    borderRadius: radius.md,
    backgroundColor: '#F3E8CC',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    gap: 2,
  },
  warningLabel: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  warningText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 12,
    flex: 1,
  },
});
