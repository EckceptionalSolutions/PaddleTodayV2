import type { ScoreRating } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import {
  completeWelcome,
} from '../lib/onboarding';
import { trackAppEvent } from '../lib/observability';
import { selectBestNowPicks } from '../lib/ranking';
import { colors, radius, spacing } from '../theme/tokens';

type Feature = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  label: string;
};

const welcomeLogo = require('../../assets/images/welcome-logo.png');

const scoreSignals: Feature[] = [
  { icon: 'waves', title: 'Water', label: 'Level, trend, and guidance' },
  { icon: 'weather-windy', title: 'Wind', label: 'Sustained wind and gusts' },
  { icon: 'thermometer', title: 'Temperature', label: 'Air and water temperature' },
  { icon: 'weather-pouring', title: 'Rain & season', label: 'Rain timing and season' },
];

const appFeatures: Feature[] = [
  { icon: 'waves', title: 'Current conditions', label: 'See what the water is doing now' },
  { icon: 'map-marker-path', title: 'Route details', label: 'Review access, distance, and logistics' },
  { icon: 'calendar-weekend-outline', title: 'Weekend picks', label: 'Compare the best upcoming options' },
  { icon: 'heart-outline', title: 'Save favorites', label: 'Keep your regular rivers close' },
  { icon: 'bell-outline', title: 'Get alerts', label: 'Know when conditions improve' },
  { icon: 'chart-donut-variant', title: 'Understand scores', label: 'See what shaped every call' },
];

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const summaryQuery = useRiverSummaryQuery();
  const carouselIndexRef = useRef(0);
  const carouselTranslateX = useRef(new Animated.Value(0)).current;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [saving, setSaving] = useState(false);
  const rivers = summaryQuery.data?.rivers ?? [];
  const compactLayout = windowHeight < 740;
  const shortLayout = windowHeight < 680;
  const veryShortLayout = windowHeight < 620;
  const compactExplainer = windowHeight < 860;
  const slideWidth = carouselWidth || Math.max(280, windowWidth - 36);
  const previewRoute = useMemo(
    () => selectBestNowPicks(rivers, undefined, 1)[0] ?? null,
    [rivers],
  );
  const previewTone = scoreTone(previewRoute?.rating);
  const previewBreakdown = previewRoute?.scoreBreakdown;
  const previewScoreFactors = [
    { label: 'Water', value: previewBreakdown?.riverQuality ?? 84 },
    { label: 'Wind', value: previewBreakdown?.windAdjustment ?? 0 },
    { label: 'Temp', value: previewBreakdown?.temperatureAdjustment ?? 0 },
    {
      label: 'Rain/season',
      value:
        (previewBreakdown?.rainAdjustment ?? 0) +
        (previewBreakdown?.comfortAdjustment ?? 0),
    },
  ];
  if (previewBreakdown && previewBreakdown.finalScore !== previewBreakdown.rawTripScore) {
    previewScoreFactors.push({
      label: 'Score cap',
      value: previewBreakdown.finalScore - previewBreakdown.rawTripScore,
    });
  }
  const carouselPanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_event, gesture) =>
          Math.abs(gesture.dx) > 8 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderMove: (_event, gesture) => {
          const currentIndex = carouselIndexRef.current;
          const currentOffset = -currentIndex * slideWidth;
          const movingPastStart = currentIndex === 0 && gesture.dx > 0;
          const movingPastEnd = currentIndex === 2 && gesture.dx < 0;
          const resistedDistance = movingPastStart || movingPastEnd ? gesture.dx * 0.2 : gesture.dx;
          carouselTranslateX.setValue(currentOffset + resistedDistance);
        },
        onPanResponderRelease: (_event, gesture) => {
          const currentIndex = carouselIndexRef.current;
          const movedFarEnough = Math.abs(gesture.dx) >= Math.min(56, slideWidth * 0.16);
          const movedFastEnough = Math.abs(gesture.vx) >= 0.35;
          const direction =
            movedFarEnough || movedFastEnough
              ? gesture.dx < 0
                ? 1
                : -1
              : 0;
          showCarouselSlide(currentIndex + direction);
        },
        onPanResponderTerminate: () => {
          showCarouselSlide(carouselIndexRef.current);
        },
        onPanResponderTerminationRequest: () => false,
      }),
    [carouselTranslateX, slideWidth],
  );

  useEffect(() => {
    trackAppEvent('welcome_shown', { entry: 'first_run' });
  }, []);

  useEffect(() => {
    carouselTranslateX.setValue(-carouselIndexRef.current * slideWidth);
  }, [carouselTranslateX, slideWidth]);

  async function finishOnboarding() {
    if (saving) return;
    setSaving(true);
    trackAppEvent('welcome_completed', {
      last_slide_viewed: carouselIndex + 1,
    });
    await completeWelcome({ trackFirstRouteOpen: true });
    router.replace({
      pathname: '/explore',
      params: { intent: 'clean-now', intentKey: Date.now().toString(), transientIntent: '1' },
    });
  }

  function viewBestPaddles() {
    trackAppEvent('welcome_best_paddles_tapped', { slide: carouselIndex + 1 });
    void finishOnboarding();
  }

  function showCarouselSlide(index: number) {
    const nextIndex = Math.max(0, Math.min(2, index));
    updateCarouselIndex(nextIndex);
    Animated.timing(carouselTranslateX, {
      toValue: -slideWidth * nextIndex,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }

  function updateCarouselIndex(index: number) {
    const nextIndex = Math.max(0, Math.min(2, index));
    if (nextIndex === carouselIndexRef.current) {
      return;
    }

    carouselIndexRef.current = nextIndex;
    setCarouselIndex(nextIndex);
    trackAppEvent('welcome_slide_viewed', { slide: nextIndex + 1 });
  }

  return (
    <View
      style={[
        styles.screen,
        styles.carouselScreen,
        {
          paddingTop: insets.top + (shortLayout ? spacing.sm : spacing.lg),
          paddingBottom: insets.bottom + (shortLayout ? spacing.sm : spacing.md),
        },
      ]}
    >
      <View style={styles.topRow}>
        <BrandLockup />
      </View>

      <View
        style={styles.carousel}
        onLayout={(event) => {
          const measuredWidth = Math.round(event.nativeEvent.layout.width);
          if (measuredWidth > 0 && measuredWidth !== carouselWidth) {
            setCarouselWidth(measuredWidth);
          }
        }}
        {...carouselPanResponder.panHandlers}
      >
        <Animated.View
          style={[
            styles.carouselContent,
            { width: slideWidth * 3, transform: [{ translateX: carouselTranslateX }] },
          ]}
        >
        <View style={[styles.slide, { width: slideWidth }]}>
          <View
            accessible
            accessibilityLabel="A paddler following a river from the launch marker toward the finish"
            style={[
              styles.welcomeHero,
              compactLayout ? styles.welcomeHeroCompact : null,
              shortLayout ? styles.welcomeHeroShort : null,
            ]}
          >
            <View style={styles.welcomeSun}>
              <MaterialCommunityIcons name="weather-sunny" size={shortLayout ? 19 : 24} color="#D9A62E" />
            </View>
            <View style={styles.welcomeCloud}>
              <MaterialCommunityIcons name="weather-cloudy" size={shortLayout ? 24 : 30} color="#FFFFFF" />
            </View>

            <View style={[styles.riverBand, styles.riverBandBack]} />
            <View style={[styles.riverBand, styles.riverBandMiddle]} />
            <View style={[styles.riverBand, styles.riverBandFront]} />

            <View style={[styles.routeMarker, styles.routeMarkerStart]}>
              <MaterialCommunityIcons name="map-marker" size={shortLayout ? 17 : 20} color={colors.surfaceStrong} />
            </View>
            <View style={[styles.routeMarker, styles.routeMarkerFinish]}>
              <MaterialCommunityIcons name="flag-checkered" size={shortLayout ? 15 : 18} color={colors.surfaceStrong} />
            </View>

            <View style={[styles.paddlerHalo, shortLayout ? styles.paddlerHaloShort : null]}>
              <MaterialCommunityIcons
                name="kayaking"
                size={shortLayout ? 39 : 54}
                color={colors.accent}
              />
            </View>
          </View>

          <View style={[styles.slideHeading, compactLayout ? styles.slideHeadingCompact : null]}>
            <Text style={[styles.title, compactLayout ? styles.titleCompact : null]}>
              Let’s find a river worth paddling today
            </Text>
            <Text style={[styles.body, compactLayout ? styles.bodyCompact : null]}>
              Compare routes using current water, weather, and practical trip details.
            </Text>
          </View>

          {!veryShortLayout ? (
            <View style={[styles.welcomeBenefits, compactLayout ? styles.welcomeBenefitsCompact : null]}>
              <View style={styles.welcomeBenefit}>
                <MaterialCommunityIcons name="chart-timeline-variant" size={20} color={colors.accent} />
                <Text style={styles.welcomeBenefitTitle}>Know today</Text>
                {!veryShortLayout ? <Text style={styles.welcomeBenefitLabel}>Fresh water and weather</Text> : null}
              </View>
              <View style={styles.welcomeBenefit}>
                <MaterialCommunityIcons name="map-search-outline" size={20} color={colors.accent} />
                <Text style={styles.welcomeBenefitTitle}>Compare routes</Text>
                {!veryShortLayout ? <Text style={styles.welcomeBenefitLabel}>Find today’s best options</Text> : null}
              </View>
              <View style={styles.welcomeBenefit}>
                <MaterialCommunityIcons name="chart-donut-variant" size={20} color={colors.accent} />
                <Text style={styles.welcomeBenefitTitle}>See why</Text>
                {!veryShortLayout ? <Text style={styles.welcomeBenefitLabel}>Understand every score</Text> : null}
              </View>
            </View>
          ) : null}

          {!veryShortLayout ? (
            <View style={styles.welcomeSwipeCue}>
              <MaterialCommunityIcons name="gesture-swipe-horizontal" size={17} color={colors.textMuted} />
              <Text style={styles.welcomeSwipeCueText}>Swipe to see how Paddle Today works</Text>
            </View>
          ) : null}
        </View>

        <View style={[styles.slide, styles.explainerSlide, { width: slideWidth }]}>
          <View
            style={[
              styles.slideHeading,
              compactExplainer ? styles.explainerHeadingCompact : null,
              veryShortLayout ? styles.slideHeadingShort : null,
            ]}
          >
            <Text style={styles.slideEyebrow}>HOW IT WORKS</Text>
            <Text
              style={[
                styles.slideTitle,
                compactExplainer ? styles.slideTitleCompact : null,
                veryShortLayout ? styles.slideTitleShort : null,
              ]}
            >
              A practical score for every route
            </Text>
            <Text
              style={[
                styles.slideIntro,
                compactExplainer ? styles.slideIntroCompact : null,
                veryShortLayout ? styles.slideIntroShort : null,
              ]}
            >
              Paddle Today compares live water and weather with route-specific guidance, then turns the result into a clear call.
            </Text>
          </View>

          <View
            style={[
              styles.howCard,
              compactExplainer ? styles.howCardShort : null,
              veryShortLayout ? styles.howCardVeryShort : null,
            ]}
          >
            <View style={[styles.signalGrid, compactExplainer ? styles.signalGridShort : null]}>
              {scoreSignals.map((signal) => (
                <View
                  key={signal.title}
                  style={[styles.signalTile, compactExplainer ? styles.signalTileCompact : null]}
                >
                  <View style={[styles.signalIcon, compactExplainer ? styles.signalIconShort : null]}>
                    <MaterialCommunityIcons name={signal.icon} size={compactExplainer ? 17 : 20} color={colors.accent} />
                  </View>
                  <View style={styles.signalCopy}>
                    <Text style={styles.signalTitle}>{signal.title}</Text>
                    <Text style={styles.signalLabel} numberOfLines={2}>{signal.label}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={[styles.scoreConnector, compactExplainer ? styles.scoreConnectorShort : null]}>
              <View style={styles.connectorLine} />
              <MaterialCommunityIcons name="arrow-down" size={18} color={colors.accent} />
              <View style={styles.connectorLine} />
            </View>

            <View style={[styles.scoreResult, compactExplainer ? styles.scoreResultShort : null]}>
              <View
                style={[
                  styles.scoreOrb,
                  styles.scoreResultOrb,
                  compactExplainer ? styles.scoreResultOrbShort : null,
                  { backgroundColor: previewTone.background },
                ]}
              >
                {previewRoute ? (
                  <>
                    <Text style={[styles.scoreValue, { color: previewTone.text }]}>{previewRoute.score}</Text>
                    <Text style={[styles.scoreLabel, { color: previewTone.text }]}>
                      {previewRoute.rating.toUpperCase()}
                    </Text>
                  </>
                ) : (
                  <ActivityIndicator color={colors.accent} />
                )}
              </View>
              <View style={styles.scoreResultCopy}>
                <Text style={styles.scoreResultKicker}>EXAMPLE FROM TODAY</Text>
                <Text style={styles.scoreResultTitle}>
                  {previewRoute?.river.name ?? 'Checking today’s routes'}
                </Text>
                <Text style={styles.scoreResultReach} numberOfLines={1}>
                  {previewRoute?.river.reach ?? 'Loading current conditions'}
                </Text>
              </View>
              <View style={styles.scoreExampleSection}>
                <Text style={styles.scoreExampleHeading}>WHY THIS SCORE?</Text>
                <View style={styles.scoreExampleGrid}>
                  {previewScoreFactors.map((factor) => (
                    <View
                      key={factor.label}
                      style={[
                        styles.scoreExampleFactor,
                        previewScoreFactors.length > 4 ? styles.scoreExampleFactorDense : null,
                      ]}
                    >
                      <Text style={styles.scoreExampleLabel}>{factor.label}</Text>
                      <Text style={[styles.scoreExampleValue, scorePointTone(factor.value)]}>
                        {signedPoints(factor.value)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.slide, styles.featuresSlide, { width: slideWidth }]}>
          <View style={[styles.slideHeading, veryShortLayout ? styles.slideHeadingShort : null]}>
            <Text style={styles.slideEyebrow}>MORE THAN A SCORE</Text>
            <Text
              style={[
                styles.slideTitle,
                compactLayout ? styles.slideTitleCompact : null,
                veryShortLayout ? styles.slideTitleShort : null,
              ]}
            >
              Everything you need to plan
            </Text>
            <Text
              style={[
                styles.slideIntro,
                compactLayout ? styles.slideIntroCompact : null,
                veryShortLayout ? styles.slideIntroShort : null,
              ]}
            >
              Explore today, look ahead to the weekend, and keep track of the rivers you care about.
            </Text>
          </View>

          <View
            style={[
              styles.featureGrid,
              shortLayout ? styles.featureGridShort : null,
              veryShortLayout ? styles.featureGridVeryShort : null,
            ]}
          >
            {appFeatures.map((feature) => (
              <View
                key={feature.title}
                style={[
                  styles.featureTile,
                  shortLayout ? styles.featureTileShort : null,
                  veryShortLayout ? styles.featureTileVeryShort : null,
                ]}
              >
                <View style={styles.featureIcon}>
                  <MaterialCommunityIcons name={feature.icon} size={20} color={colors.accent} />
                </View>
                <View style={styles.featureCopy}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureLabel} numberOfLines={shortLayout ? 1 : 2}>{feature.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        </Animated.View>
      </View>

      <View style={styles.carouselFooter}>
        <View style={styles.paginationRow}>
          <Text style={styles.paginationLabel}>{carouselIndex + 1} of 3</Text>
          <View style={styles.paginationDots}>
            {[0, 1, 2].map((index) => (
              <Pressable
                key={index}
                accessibilityRole="button"
                accessibilityLabel={`Show welcome page ${index + 1}`}
                onPress={() => showCarouselSlide(index)}
                style={[styles.paginationDot, carouselIndex === index ? styles.paginationDotActive : null]}
              />
            ))}
          </View>
          {carouselIndex < 2 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Show welcome page ${carouselIndex + 2}`}
              onPress={() => showCarouselSlide(carouselIndex + 1)}
              style={styles.nextPageButton}
            >
              <Text style={styles.nextPageLabel}>Next</Text>
              <MaterialCommunityIcons name="chevron-right" size={16} color={colors.accent} />
            </Pressable>
          ) : (
            <Text style={styles.swipeLabel}>Ready to explore</Text>
          )}
        </View>

        <View style={styles.safetyNote}>
          <MaterialCommunityIcons name="shield-check-outline" size={17} color={colors.accent} />
          <Text style={styles.safetyText}>
            Always confirm gauges, weather, access, closures, and hazards before launching.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View today’s best paddles"
          disabled={saving}
          onPress={viewBestPaddles}
          style={({ pressed }) => [
            styles.primaryButton,
            shortLayout ? styles.primaryButtonShort : null,
            pressed ? styles.primaryButtonPressed : null,
          ]}
        >
          <Text style={styles.primaryButtonText}>View today’s best paddles</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color={colors.surfaceStrong} />
        </Pressable>
      </View>
    </View>
  );
}

function BrandLockup() {
  return (
    <View style={styles.brandLockup}>
      <Image
        accessible={false}
        accessibilityIgnoresInvertColors
        source={welcomeLogo}
        style={styles.brandLogo}
        resizeMode="contain"
      />
      <Text style={styles.brand}>Paddle Today</Text>
    </View>
  );
}

function scoreTone(rating?: ScoreRating) {
  if (rating === 'Strong') {
    return { background: '#E0EFE9', text: colors.strong };
  }
  if (rating === 'Good') {
    return { background: '#E8EFD9', text: colors.good };
  }
  if (rating === 'Fair') {
    return { background: '#F3E8CC', text: colors.fair };
  }
  if (rating === 'No-go') {
    return { background: '#F2DDD6', text: colors.noGo };
  }
  return { background: colors.accentSoft, text: colors.accent };
}

function signedPoints(value: number) {
  return value > 0 ? `+${value}` : String(value);
}

function scorePointTone(value: number) {
  if (value > 0) {
    return { color: colors.accentDeep };
  }
  if (value < 0) {
    return { color: colors.noGo };
  }
  return { color: colors.textMuted };
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.canvas },
  carouselScreen: { paddingHorizontal: 18 },
  carousel: { flex: 1, minHeight: 0, overflow: 'hidden' },
  carouselContent: { height: '100%', flexDirection: 'row' },
  slide: {
    height: '100%',
    paddingTop: spacing.xs,
  },
  explainerSlide: { justifyContent: 'flex-start' },
  featuresSlide: { justifyContent: 'flex-start' },
  slideHeading: { alignItems: 'center', marginTop: spacing.lg },
  slideHeadingCompact: { marginTop: spacing.md },
  slideHeadingShort: { marginTop: spacing.sm },
  explainerHeadingCompact: { marginTop: spacing.sm },
  slideEyebrow: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  slideTitle: {
    color: colors.text,
    fontSize: 29,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  slideTitleCompact: { fontSize: 25, lineHeight: 29 },
  slideTitleShort: { fontSize: 22, lineHeight: 25, marginTop: spacing.xs },
  slideIntro: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  slideIntroCompact: { fontSize: 14, lineHeight: 19, marginTop: 6 },
  slideIntroShort: { fontSize: 12, lineHeight: 16, marginTop: spacing.xs },
  content: { flexGrow: 1, paddingHorizontal: 18 },
  topRow: { minHeight: 42, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandLogo: { width: 40, height: 40 },
  brand: {
    color: colors.accentDeep,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  welcomeHero: {
    position: 'relative',
    minHeight: 285,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#C9DDD3',
    backgroundColor: '#DDEBE5',
  },
  welcomeHeroCompact: { minHeight: 215, marginTop: spacing.sm },
  welcomeHeroShort: { minHeight: 165, marginTop: spacing.sm },
  welcomeSun: {
    position: 'absolute',
    top: 18,
    right: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#FFF4CB',
  },
  welcomeCloud: {
    position: 'absolute',
    top: 34,
    left: 26,
    opacity: 0.78,
  },
  riverBand: {
    position: 'absolute',
    left: -28,
    right: -28,
    borderRadius: radius.pill,
    transform: [{ rotate: '-7deg' }],
  },
  riverBandBack: {
    height: 80,
    bottom: 38,
    backgroundColor: '#A8D1CA',
  },
  riverBandMiddle: {
    height: 62,
    bottom: 16,
    backgroundColor: '#69AEB0',
  },
  riverBandFront: {
    height: 38,
    bottom: -4,
    backgroundColor: '#3F8791',
  },
  routeMarker: {
    position: 'absolute',
    zIndex: 2,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.surfaceStrong,
  },
  routeMarkerStart: { left: 30, bottom: 42 },
  routeMarkerFinish: { right: 28, bottom: 64 },
  paddlerHalo: {
    zIndex: 3,
    width: 92,
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: colors.surfaceStrong,
    backgroundColor: '#EDF6F2',
  },
  paddlerHaloShort: { width: 68, height: 68, marginTop: -16, borderRadius: 34 },
  scoreOrb: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8EFD9',
  },
  scoreValue: { color: colors.good, fontSize: 23, lineHeight: 25, fontWeight: '900' },
  scoreLabel: { color: colors.good, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  title: { color: colors.text, fontSize: 31, lineHeight: 36, fontWeight: '900', textAlign: 'center' },
  titleCompact: { fontSize: 27, lineHeight: 31 },
  body: { color: colors.textMuted, fontSize: 16, lineHeight: 23, textAlign: 'center', marginTop: spacing.sm },
  bodyCompact: { fontSize: 14, lineHeight: 19 },
  welcomeBenefits: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  welcomeBenefitsCompact: { marginTop: spacing.md, gap: 6 },
  welcomeBenefit: {
    flex: 1,
    minHeight: 76,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  welcomeBenefitTitle: {
    color: colors.text,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 5,
  },
  welcomeBenefitLabel: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  welcomeSwipeCue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.md,
  },
  welcomeSwipeCueText: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
  },
  howCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  howCardShort: { marginTop: spacing.md, padding: 10 },
  howCardVeryShort: { marginTop: spacing.sm, padding: spacing.sm },
  signalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  signalGridShort: { gap: spacing.xs },
  signalTile: {
    width: '48%',
    minHeight: 66,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceStrong,
  },
  signalTileCompact: { minHeight: 54, padding: 6, gap: 6 },
  signalIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
  },
  signalIconShort: { width: 28, height: 28, borderRadius: 14 },
  signalCopy: { flex: 1, minWidth: 0 },
  signalTitle: { color: colors.text, fontSize: 13, fontWeight: '900' },
  signalLabel: { color: colors.textMuted, fontSize: 9.5, lineHeight: 12, marginTop: 1 },
  scoreConnector: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  scoreConnectorShort: { height: 20 },
  connectorLine: { width: 36, height: 1, backgroundColor: colors.border },
  scoreResult: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.canvasMuted,
  },
  scoreResultShort: { padding: spacing.sm, gap: spacing.sm },
  scoreResultOrb: { width: 58, height: 58 },
  scoreResultOrbShort: { width: 48, height: 48, borderRadius: 14 },
  scoreResultCopy: { flex: 1, minWidth: 0 },
  scoreResultKicker: { color: colors.accent, fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  scoreResultTitle: { color: colors.text, fontSize: 15, lineHeight: 19, fontWeight: '900', marginTop: 2 },
  scoreResultReach: { color: colors.textMuted, fontSize: 10.5, lineHeight: 14, fontWeight: '700', marginTop: 1 },
  scoreExampleSection: {
    width: '100%',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  scoreExampleHeading: { color: colors.accent, fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  scoreExampleGrid: {
    flexDirection: 'row',
    alignItems: 'stretch',
    columnGap: 4,
    marginTop: 5,
  },
  scoreExampleFactor: {
    width: '24%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceStrong,
  },
  scoreExampleFactorDense: { width: '18%' },
  scoreExampleLabel: {
    color: colors.textMuted,
    fontSize: 8.5,
    lineHeight: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  scoreExampleValue: { fontSize: 10, lineHeight: 13, fontWeight: '900', marginTop: 1 },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  featureGridShort: { marginTop: spacing.md, gap: 6 },
  featureGridVeryShort: { marginTop: spacing.sm, gap: spacing.xs },
  featureTile: {
    width: '48%',
    minHeight: 78,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  featureTileShort: { minHeight: 60, padding: 7 },
  featureTileVeryShort: { minHeight: 54, padding: 6, gap: 6 },
  featureIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
  },
  featureCopy: { flex: 1, minWidth: 0 },
  featureTitle: { color: colors.text, fontSize: 12, lineHeight: 15, fontWeight: '900' },
  featureLabel: { color: colors.textMuted, fontSize: 10, lineHeight: 14, marginTop: 2 },
  carouselFooter: { gap: spacing.sm, paddingTop: spacing.sm },
  paginationRow: {
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  paginationLabel: { width: 46, color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  paginationDots: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  paginationDotActive: { width: 24, backgroundColor: colors.accent },
  swipeLabel: { width: 112, color: colors.textMuted, fontSize: 10, fontWeight: '700', textAlign: 'right' },
  nextPageButton: {
    width: 112,
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nextPageLabel: { color: colors.accent, fontSize: 11, fontWeight: '900' },
  safetyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  safetyText: { flex: 1, color: colors.textMuted, fontSize: 10.5, lineHeight: 14, fontWeight: '600' },
  primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, minHeight: 54, paddingHorizontal: spacing.lg, borderRadius: radius.md, backgroundColor: colors.accent },
  primaryButtonShort: { minHeight: 50 },
  primaryButtonPressed: { opacity: 0.8 },
  primaryButtonText: { color: colors.surfaceStrong, fontSize: 16, fontWeight: '800' },
});
