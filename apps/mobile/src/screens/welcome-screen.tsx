import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  completeWelcome,
} from '../lib/onboarding';
import {
  labelForExploreIntent,
  type ExploreIntentId,
} from '../lib/explore-intents';
import { trackAppEvent } from '../lib/observability';
import { colors, radius, spacing } from '../theme/tokens';

type IntroCard = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  eyebrow: string;
  title: string;
  body: string;
};

const introCards: IntroCard[] = [
  {
    icon: 'kayaking',
    eyebrow: 'PADDLE TODAY',
    title: 'Find a route that fits today',
    body: 'PaddleToday checks public river routes and combines current water levels, recent trends, weather, route characteristics, access information, and data confidence to produce a practical call for today.',
  },
  {
    icon: 'chart-donut-variant',
    eyebrow: 'DECISION SUPPORT',
    title: 'A score is a starting point, not a promise',
    body: 'Strong and Good mean the available data lines up well. Fair means there are tradeoffs or uncertainty. Watch and Skip calls tell you when to recheck conditions before committing.',
  },
  {
    icon: 'clipboard-text-search-outline',
    eyebrow: 'BEFORE YOU LAUNCH',
    title: 'See what shaped the call',
    body: 'Open any route to review the score breakdown, gauge and weather details, access logistics, hazards, freshness, and official sources. Conditions can change after the app refreshes.',
  },
];

const intentChoices: Array<{
  intent: ExploreIntentId;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  body: string;
}> = [
  { intent: 'best-nearby', icon: 'map-marker-radius-outline', title: 'Best option near me', body: 'Drive-aware recommendations' },
  { intent: 'clean-now', icon: 'weather-sunny', title: 'A clean call today', body: 'Strong and Good route calls' },
  { intent: 'quick-float', icon: 'timer-outline', title: 'A quick float', body: 'Easy-to-moderate routes up to three hours' },
  { intent: 'full-day', icon: 'white-balance-sunny', title: 'A full-day outing', body: 'Longer single-day routes' },
  { intent: 'camping', icon: 'tent', title: 'Camping or base camp', body: 'Routes with camping support' },
];

export default function WelcomeScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const insets = useSafeAreaInsets();
  const [cardIndex, setCardIndex] = useState(0);
  const [showIntentPicker, setShowIntentPicker] = useState(params.mode === 'intent');
  const [saving, setSaving] = useState(false);
  const card = introCards[cardIndex];

  useEffect(() => {
    trackAppEvent('welcome_shown', { entry: params.mode === 'intent' ? 'change_preference' : 'first_run' });
  }, [params.mode]);

  const buttonLabel = useMemo(
    () => (cardIndex === introCards.length - 1 ? "See today's routes" : 'Next'),
    [cardIndex]
  );

  async function finish(intent?: ExploreIntentId) {
    if (saving) return;
    setSaving(true);
    trackAppEvent(intent ? 'trip_intent_selected' : 'trip_intent_skipped', {
      intent: intent ? labelForExploreIntent(intent) : null,
    });
    await completeWelcome(intent);
    if (intent) {
      router.replace({ pathname: '/explore', params: { intent, intentKey: Date.now().toString() } });
    } else {
      router.replace('/');
    }
  }

  if (showIntentPicker) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.intentContent, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl }]}
      >
        <View style={styles.topRow}>
          <Text style={styles.brand}>PADDLE TODAY</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Skip trip preference" onPress={() => void finish()}>
            <Text style={styles.skipText}>Skip for now</Text>
          </Pressable>
        </View>
        <Text style={styles.intentTitle}>What kind of paddle are you looking for?</Text>
        <Text style={styles.intentSubtitle}>We’ll tune Explore and your first set of suggestions. You can change this anytime.</Text>
        <View style={styles.choiceList}>
          {intentChoices.map((choice) => (
            <Pressable
              key={choice.intent}
              accessibilityRole="button"
              accessibilityLabel={`${choice.title}. ${choice.body}`}
              disabled={saving}
              onPress={() => void finish(choice.intent)}
              style={({ pressed }) => [styles.choice, pressed ? styles.choicePressed : null]}
            >
              <View style={styles.choiceIcon}>
                <MaterialCommunityIcons name={choice.icon} size={24} color={colors.accent} />
              </View>
              <View style={styles.choiceCopy}>
                <Text style={styles.choiceTitle}>{choice.title}</Text>
                <Text style={styles.choiceBody}>{choice.body}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textMuted} />
            </Pressable>
          ))}
        </View>
        <Text style={styles.footnote}>This is a preference, not a profile. It stays on this device and does not replace checking the route details before launch.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl }]}
    >
      <View style={styles.topRow}>
        <Text style={styles.brand}>PADDLE TODAY</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Skip welcome" onPress={() => void finish()}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
      <View style={styles.heroIcon}>
        <MaterialCommunityIcons name={card.icon} size={54} color={colors.accent} />
      </View>
      <Text style={styles.eyebrow}>{card.eyebrow}</Text>
      <Text style={styles.title}>{card.title}</Text>
      <Text style={styles.body}>{card.body}</Text>
      <View style={styles.noteCard}>
        <MaterialCommunityIcons name="shield-check-outline" size={22} color={colors.accent} />
        <Text style={styles.noteText}>Always confirm gauges, weather, access, closures, and hazards before launching.</Text>
      </View>
      <View style={styles.bottomArea}>
        <View style={styles.progress} accessibilityLabel={`Welcome page ${cardIndex + 1} of ${introCards.length}`}>
          {introCards.map((_, index) => <View key={index} style={[styles.progressDot, index === cardIndex ? styles.progressDotActive : null]} />)}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={buttonLabel}
          onPress={() => {
            if (cardIndex < introCards.length - 1) {
              setCardIndex((current) => current + 1);
            } else {
              trackAppEvent('welcome_completed', { card: cardIndex + 1 });
              setShowIntentPicker(true);
            }
          }}
          style={({ pressed }) => [styles.primaryButton, pressed ? styles.primaryButtonPressed : null]}
        >
          <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={colors.surfaceStrong} />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  content: { flexGrow: 1, paddingHorizontal: spacing.lg },
  intentContent: { paddingHorizontal: spacing.lg },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 1.4 },
  skipText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  heroIcon: { alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: 112, height: 112, marginTop: spacing.xl, marginBottom: spacing.xl, borderRadius: 56, backgroundColor: colors.surfaceStrong },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 1.4, textAlign: 'center' },
  title: { color: colors.text, fontSize: 32, lineHeight: 38, fontWeight: '800', textAlign: 'center', marginTop: spacing.sm },
  body: { color: colors.textMuted, fontSize: 17, lineHeight: 26, textAlign: 'center', marginTop: spacing.md },
  noteCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, padding: spacing.md, borderRadius: radius.lg, backgroundColor: colors.surfaceStrong },
  noteText: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 19, fontWeight: '600' },
  bottomArea: { marginTop: 'auto', paddingTop: spacing.xl },
  progress: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, marginBottom: spacing.md },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  progressDotActive: { width: 24, backgroundColor: colors.accent },
  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, minHeight: 54, paddingHorizontal: spacing.lg, borderRadius: radius.md, backgroundColor: colors.accent },
  primaryButtonPressed: { opacity: 0.8 },
  primaryButtonText: { color: colors.surfaceStrong, fontSize: 16, fontWeight: '800' },
  intentTitle: { color: colors.text, fontSize: 30, lineHeight: 36, fontWeight: '800', marginTop: spacing.xl },
  intentSubtitle: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginTop: spacing.sm },
  choiceList: { gap: spacing.sm, marginTop: spacing.xl },
  choice: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, minHeight: 76, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.surface },
  choicePressed: { backgroundColor: colors.surfaceStrong },
  choiceIcon: { alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 22, backgroundColor: colors.canvas },
  choiceCopy: { flex: 1 },
  choiceTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  choiceBody: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 2 },
  footnote: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: spacing.xl },
});
