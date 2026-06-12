import type { WeekendSummaryApiItem } from '@paddletoday/api-contract';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { normalizeApiText } from '../lib/format';
import { routeFactItems } from '../lib/route-facts';
import { photoForRiver } from '../lib/route-photos';
import { colors, radius, spacing } from '../theme/tokens';
import { RatingPill } from './rating-pill';
import { SaveToggleButton } from './save-toggle-button';

export function WeekendRiverCard({
  river,
  travelLabel,
  saved = false,
  onToggleSaved,
  onPress,
}: {
  river: WeekendSummaryApiItem;
  travelLabel?: string | null;
  saved?: boolean;
  onToggleSaved?: () => void;
  onPress: () => void;
}) {
  const riskExplanation = cardRiskExplanation(river);

  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: colors.canvasMuted }}>
      <ImageBackground
        source={{ uri: photoForRiver(river.river) }}
        style={styles.media}
        imageStyle={styles.mediaImage}
      >
        <View style={styles.mediaOverlay}>
          <View style={styles.scoreBlock}>
            <Text style={styles.score}>{river.weekend.score}</Text>
          </View>
          <View style={styles.actions}>
            {onToggleSaved ? <SaveToggleButton compact saved={saved} onPress={onToggleSaved} /> : null}
            <RatingPill rating={river.weekend.rating} />
          </View>
        </View>
      </ImageBackground>

      <View style={styles.header}>
        <View style={styles.copy}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{river.river.name}</Text>
          </View>
          <Text style={styles.reach}>{river.river.reach}</Text>
          {!riskExplanation ? <Text style={styles.summary}>{normalizeApiText(river.weekend.summary)}</Text> : null}
        </View>
      </View>

      <View style={styles.metaRow}>
        {weekendFactItems(river, travelLabel).map((fact) => (
          <Text key={fact} style={styles.factChip} numberOfLines={1}>{fact}</Text>
        ))}
      </View>

      {riskExplanation ? (
        <View style={[styles.riskPanel, riskToneStyle(river)]}>
          <Text style={styles.riskLabel}>{planRiskLabel(river)}</Text>
          <Text style={styles.explanation}>{riskExplanation}</Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerText} numberOfLines={1}>
          {[travelLabel, river.river.region].filter(Boolean).join(' - ')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    gap: spacing.sm,
  },
  media: {
    height: 142,
  },
  mediaImage: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  mediaOverlay: {
    flex: 1,
    backgroundColor: 'rgba(12, 22, 19, 0.24)',
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  scoreBlock: {
    width: 62,
    height: 62,
    borderRadius: 17,
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
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    fontWeight: '800',
  },
  reach: {
    color: colors.textMuted,
    fontSize: 14,
  },
  summary: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  factChip: {
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  riskPanel: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: 4,
    marginHorizontal: spacing.md,
  },
  riskStable: {
    backgroundColor: '#E0EFE9',
  },
  riskWeather: {
    backgroundColor: '#F3E8CC',
  },
  riskUncertain: {
    backgroundColor: '#F2DDD6',
  },
  riskLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  explanation: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 12,
    flex: 1,
    minWidth: 0,
  },
});

function weekendFactItems(river: WeekendSummaryApiItem, travelLabel?: string | null) {
  const facts = routeFactItems(river.river, { includePaddleTime: true });
  return travelLabel ? [travelLabel, ...facts].slice(0, 4) : facts;
}

function planRiskLabel(river: WeekendSummaryApiItem) {
  if (river.weekend.confidence === 'High' && river.weekend.rating === river.current.rating) {
    return 'Looks steady';
  }

  const explanation = normalizeApiText(`${river.weekend.explanation} ${river.weekend.signalLine}`).toLowerCase();
  if (explanation.includes('rain') || explanation.includes('storm') || explanation.includes('wind') || explanation.includes('forecast')) {
    return 'Forecast watch';
  }

  return river.weekend.confidence === 'Low' ? 'Gauge watch' : 'Recheck before launch';
}

function cardRiskExplanation(river: WeekendSummaryApiItem) {
  const cleaned = normalizeApiText(river.weekend.explanation)
    .replace(/\bWeekend outlooks stay a little more conservative\.\s*/gi, '')
    .replace(/\bWeekend picks stay a little more conservative than today\.\s*/gi, '')
    .trim();

  if (!cleaned || cleaned === normalizeApiText(river.weekend.summary)) {
    return '';
  }

  return cleaned;
}

function riskToneStyle(river: WeekendSummaryApiItem) {
  const label = planRiskLabel(river);
  if (label === 'Looks steady') return styles.riskStable;
  if (label === 'Forecast watch' || label === 'Recheck before launch') return styles.riskWeather;
  return styles.riskUncertain;
}
