import type { ScoreRating } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRiverSummaryQuery } from '../api/queries';
import { useStoredLocation } from '../hooks/use-stored-location';
import {
  completeWelcome,
} from '../lib/onboarding';
import { trackAppEvent } from '../lib/observability';
import { selectBestNowPicks, selectNearbyPicks } from '../lib/ranking';
import { colors, radius, spacing } from '../theme/tokens';

type Feature = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  label: string;
};

type WelcomeStep = 'welcome' | 'location';
type StartingPointMethod = 'device' | 'search' | 'skipped';

const welcomeRiverImage = require('../../assets/images/welcome-river.jpg');
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
  const { location, status: locationStatus, requestLocation, setLocationFromQuery } = useStoredLocation();
  const carouselRef = useRef<ScrollView | null>(null);
  const carouselIndexRef = useRef(0);
  const dragStartIndexRef = useRef(0);
  const [step, setStep] = useState<WelcomeStep>('welcome');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [locationQuery, setLocationQuery] = useState('');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const rivers = summaryQuery.data?.rivers ?? [];
  const compactLayout = windowHeight < 740;
  const shortLayout = windowHeight < 680;
  const veryShortLayout = windowHeight < 620;
  const slideWidth = carouselWidth || Math.max(280, windowWidth - 36);
  const previewRoute = useMemo(() => {
    if (location) {
      const nearbyRoute = selectNearbyPicks(rivers, location, 1)[0];
      if (nearbyRoute) {
        return nearbyRoute;
      }
    }

    return selectBestNowPicks(rivers, undefined, 1)[0] ?? null;
  }, [location, rivers]);
  const previewTone = scoreTone(previewRoute?.rating);
  const previewBreakdown = previewRoute?.scoreBreakdown;
  const previewScoreFactors = [
    { label: 'Water', value: previewBreakdown?.riverQuality ?? 84 },
    { label: 'Wind', value: previewBreakdown?.windAdjustment ?? 0 },
    { label: 'Temp', value: previewBreakdown?.temperatureAdjustment ?? 0 },
    { label: 'Rain', value: previewBreakdown?.rainAdjustment ?? 0 },
  ];
  if (previewBreakdown?.comfortAdjustment) {
    previewScoreFactors.push({ label: 'Other', value: previewBreakdown.comfortAdjustment });
  }
  if (previewBreakdown && previewBreakdown.finalScore !== previewBreakdown.rawTripScore) {
    previewScoreFactors.push({
      label: 'Score cap',
      value: previewBreakdown.finalScore - previewBreakdown.rawTripScore,
    });
  }

  useEffect(() => {
    trackAppEvent('welcome_shown', { entry: 'first_run' });
  }, []);

  useEffect(() => {
    if (step === 'welcome') {
      return;
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setStep('welcome');
      return true;
    });

    return () => subscription.remove();
  }, [step]);

  async function finishOnboarding(startingPoint?: StartingPointMethod) {
    if (saving) return;
    setSaving(true);
    trackAppEvent('welcome_completed', {
      starting_point: startingPoint ?? 'skipped',
      last_slide_viewed: carouselIndex + 1,
    });
    await completeWelcome({ trackFirstRouteOpen: true });
    router.replace({
      pathname: '/explore',
      params: { intent: 'best-nearby', intentKey: Date.now().toString(), transientIntent: '1' },
    });
  }

  async function useDeviceStartingPoint() {
    if (saving || locationStatus === 'requesting') return;
    setLocationError(null);
    if (location) {
      trackAppEvent('starting_point_selected', { method: location.source });
      await finishOnboarding(location.source);
      return;
    }

    const result = await requestLocation();
    if (!result.location) {
      trackAppEvent('starting_point_failed', { method: 'device' });
      if (result.permission === 'denied' && !result.canAskAgain) {
        setLocationError('Location permission is off. Open Settings, or enter a city or ZIP instead.');
      } else if (result.permission === 'denied') {
        setLocationError('Location permission was not granted. Enter a city or ZIP instead.');
      } else {
        setLocationError('We could not get your location. Enter a city or ZIP instead.');
      }
      return;
    }

    trackAppEvent('starting_point_selected', { method: 'device' });
    await finishOnboarding('device');
  }

  async function useSearchedStartingPoint() {
    const cleanQuery = locationQuery.trim();
    if (!cleanQuery || saving || locationStatus === 'requesting') {
      if (!cleanQuery) {
        setLocationError('Enter a city or ZIP.');
      }
      return;
    }

    setLocationError(null);
    const resolvedLocation = await setLocationFromQuery(cleanQuery);
    if (!resolvedLocation) {
      trackAppEvent('starting_point_failed', { method: 'search' });
      setLocationError('We could not find that place. Try a city with its state or a five-digit ZIP.');
      return;
    }

    trackAppEvent('starting_point_selected', { method: 'search' });
    await finishOnboarding('search');
  }

  async function skipStartingPoint() {
    trackAppEvent('starting_point_skipped');
    await finishOnboarding('skipped');
  }

  async function skipWelcome() {
    if (saving) return;
    setSaving(true);
    trackAppEvent('welcome_skipped', { entry: 'first_run' });
    await completeWelcome({ trackFirstRouteOpen: true });
    router.replace('/');
  }

  function openStartingPoint() {
    trackAppEvent('welcome_find_paddle_tapped', { slide: carouselIndex + 1 });
    trackAppEvent('starting_point_shown', { reason: 'welcome_cta' });
    setStep('location');
  }

  function showCarouselSlide(index: number) {
    const nextIndex = Math.max(0, Math.min(2, index));
    dragStartIndexRef.current = nextIndex;
    carouselRef.current?.scrollTo({ x: slideWidth * nextIndex, animated: true });
    updateCarouselIndex(nextIndex);
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

  function syncCarouselIndex(offsetX: number, viewportWidth: number) {
    const measuredWidth = viewportWidth > 0 ? viewportWidth : slideWidth;
    const rawIndex = Math.round(offsetX / measuredWidth);
    const nextIndex = Math.max(
      dragStartIndexRef.current - 1,
      Math.min(dragStartIndexRef.current + 1, rawIndex),
    );
    updateCarouselIndex(nextIndex);
    return { rawIndex, nextIndex };
  }

  if (step === 'location') {
    return (
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.screen}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.intentContent,
            { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
          ]}
        >
          <View style={styles.topRow}>
            <BrandLockup />
            <View style={styles.intentActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back to welcome"
                hitSlop={8}
                onPress={() => setStep('welcome')}
                style={styles.backButton}
              >
                <MaterialCommunityIcons name="arrow-left" size={21} color={colors.textMuted} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Skip starting location"
                disabled={saving}
                onPress={() => void skipStartingPoint()}
              >
                <Text style={styles.skipText}>Not now</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.intentHeading}>
            <Text style={styles.intentEyebrow}>START NEAR HOME</Text>
            <Text style={styles.intentTitle}>Where should we start?</Text>
            <Text style={styles.intentSubtitle}>We’ll put nearby routes first. You can change this later.</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Use my current location"
            disabled={saving || locationStatus === 'requesting'}
            onPress={() => void useDeviceStartingPoint()}
            style={({ pressed }) => [
              styles.locationChoice,
              pressed ? styles.choicePressed : null,
              saving ? styles.disabled : null,
            ]}
          >
            <View style={styles.locationChoiceIcon}>
              {locationStatus === 'requesting' ? (
                <ActivityIndicator color={colors.accent} />
              ) : (
                <MaterialCommunityIcons name="crosshairs-gps" size={25} color={colors.accent} />
              )}
            </View>
            <View style={styles.choiceCopy}>
              <Text style={styles.choiceTitle}>{location ? `Continue with ${location.label}` : 'Use my location'}</Text>
              <Text style={styles.choiceBody}>Fastest way to sort routes by drive time</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textMuted} />
          </Pressable>

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.locationSearchCard}>
            <Text style={styles.locationSearchLabel}>City or ZIP</Text>
            <View style={styles.locationSearchRow}>
              <TextInput
                accessibilityLabel="Starting city or ZIP"
                autoCapitalize="words"
                autoCorrect={false}
                editable={!saving && locationStatus !== 'requesting'}
                enterKeyHint="search"
                onChangeText={(value) => {
                  setLocationQuery(value);
                  setLocationError(null);
                }}
                onSubmitEditing={() => void useSearchedStartingPoint()}
                placeholder="Minneapolis, MN or 55401"
                placeholderTextColor={colors.textMuted}
                returnKeyType="search"
                style={styles.locationInput}
                value={locationQuery}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Use entered city or ZIP"
                disabled={saving || locationStatus === 'requesting'}
                onPress={() => void useSearchedStartingPoint()}
                style={({ pressed }) => [
                  styles.locationSearchButton,
                  pressed ? styles.primaryButtonPressed : null,
                ]}
              >
                <MaterialCommunityIcons name="arrow-right" size={21} color={colors.surfaceStrong} />
              </Pressable>
            </View>
          </View>

          {locationError ? (
            <View style={styles.locationError}>
              <MaterialCommunityIcons name="alert-circle-outline" size={18} color={colors.noGo} />
              <View style={styles.locationErrorCopy}>
                <Text style={styles.locationErrorText}>{locationError}</Text>
                {locationError.startsWith('Location permission is off') ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Open device settings"
                    onPress={() => {
                      trackAppEvent('starting_point_settings_opened');
                      void Linking.openSettings();
                    }}
                  >
                    <Text style={styles.locationSettingsLink}>Open Settings</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          ) : null}

          <View style={styles.localNote}>
            <MaterialCommunityIcons name="shield-lock-outline" size={17} color={colors.textMuted} />
            <Text style={styles.footnote}>Location stays on this device. Analytics records only the method.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
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
        <Pressable accessibilityRole="button" accessibilityLabel="Skip welcome and open Today" disabled={saving} onPress={() => void skipWelcome()}>
          <Text style={styles.skipText}>Skip to Today</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={carouselRef}
        horizontal
        pagingEnabled
        bounces={false}
        decelerationRate="fast"
        disableIntervalMomentum
        snapToOffsets={[0, slideWidth, slideWidth * 2]}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        contentContainerStyle={[styles.carouselContent, { width: slideWidth * 3 }]}
        onLayout={(event) => {
          const measuredWidth = Math.round(event.nativeEvent.layout.width);
          if (measuredWidth > 0 && measuredWidth !== carouselWidth) {
            setCarouselWidth(measuredWidth);
          }
        }}
        onScrollBeginDrag={(event) => {
          const measuredWidth = event.nativeEvent.layoutMeasurement.width || slideWidth;
          dragStartIndexRef.current = Math.round(event.nativeEvent.contentOffset.x / measuredWidth);
        }}
        onScroll={(event) => {
          syncCarouselIndex(
            event.nativeEvent.contentOffset.x,
            event.nativeEvent.layoutMeasurement.width,
          );
        }}
        onMomentumScrollEnd={(event) => {
          const { rawIndex, nextIndex } = syncCarouselIndex(
            event.nativeEvent.contentOffset.x,
            event.nativeEvent.layoutMeasurement.width,
          );
          if (rawIndex !== nextIndex) {
            carouselRef.current?.scrollTo({ x: slideWidth * nextIndex, animated: true });
          }
          dragStartIndexRef.current = nextIndex;
        }}
      >
        <View style={[styles.slide, { width: slideWidth }]}>
          <ImageBackground
            accessible={false}
            accessibilityIgnoresInvertColors
            source={welcomeRiverImage}
            style={[
              styles.hero,
              compactLayout ? styles.heroCompact : null,
              shortLayout ? styles.heroShort : null,
            ]}
            imageStyle={styles.heroImage}
            resizeMode="cover"
          >
            <View
              style={[
                styles.heroOverlay,
                compactLayout ? styles.heroOverlayCompact : null,
                shortLayout ? styles.heroOverlayShort : null,
              ]}
            >
              <View
                accessible
                accessibilityLabel={
                  previewRoute
                    ? `Current PaddleToday route call. ${previewRoute.river.name}, ${previewRoute.river.reach}. Score ${previewRoute.score}, ${previewRoute.rating}.`
                    : 'Checking current PaddleToday route calls.'
                }
                style={styles.routePreview}
              >
                <View style={[styles.scoreOrb, { backgroundColor: previewTone.background }]}>
                  {previewRoute ? (
                    <>
                      <Text style={[styles.scoreValue, { color: previewTone.text }]}>{previewRoute.score}</Text>
                      <Text style={[styles.scoreLabel, { color: previewTone.text }]}>{previewRoute.rating.toUpperCase()}</Text>
                    </>
                  ) : (
                    <ActivityIndicator color={colors.accent} />
                  )}
                </View>
                <View style={styles.routePreviewCopy}>
                  <Text style={[styles.routePreviewKicker, { color: previewTone.text }]}>
                    {location ? 'CURRENT CALL NEAR YOU' : 'ONE OF TODAY’S TOP CALLS'}
                  </Text>
                  <Text style={styles.routePreviewName}>{previewRoute?.river.name ?? 'Checking today’s routes'}</Text>
                  <Text style={styles.routePreviewReach} numberOfLines={1}>
                    {previewRoute?.river.reach ?? 'Loading water, weather, and access'}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          <View style={[styles.slideHeading, compactLayout ? styles.slideHeadingCompact : null]}>
            <Text style={[styles.title, compactLayout ? styles.titleCompact : null]}>Welcome to Paddle Today</Text>
            <Text style={[styles.body, compactLayout ? styles.bodyCompact : null]}>
              Find nearby river routes that fit today’s conditions—and understand the call before you go.
            </Text>
          </View>

          {!veryShortLayout ? (
            <View style={[styles.welcomeBenefits, compactLayout ? styles.welcomeBenefitsCompact : null]}>
              <View style={styles.welcomeBenefit}>
                <MaterialCommunityIcons name="chart-timeline-variant" size={20} color={colors.accent} />
                <Text style={styles.welcomeBenefitTitle}>Live conditions</Text>
                {!shortLayout ? <Text style={styles.welcomeBenefitLabel}>Updated water and weather</Text> : null}
              </View>
              <View style={styles.welcomeBenefit}>
                <MaterialCommunityIcons name="map-search-outline" size={20} color={colors.accent} />
                <Text style={styles.welcomeBenefitTitle}>Nearby routes</Text>
                {!shortLayout ? <Text style={styles.welcomeBenefitLabel}>Options that fit today</Text> : null}
              </View>
              <View style={styles.welcomeBenefit}>
                <MaterialCommunityIcons name="chart-donut-variant" size={20} color={colors.accent} />
                <Text style={styles.welcomeBenefitTitle}>Clear scores</Text>
                {!shortLayout ? <Text style={styles.welcomeBenefitLabel}>See what shaped the call</Text> : null}
              </View>
            </View>
          ) : null}
        </View>

        <View style={[styles.slide, styles.explainerSlide, { width: slideWidth }]}>
          <View style={[styles.slideHeading, veryShortLayout ? styles.slideHeadingShort : null]}>
            <Text style={styles.slideEyebrow}>HOW IT WORKS</Text>
            <Text
              style={[
                styles.slideTitle,
                compactLayout ? styles.slideTitleCompact : null,
                veryShortLayout ? styles.slideTitleShort : null,
              ]}
            >
              A practical score for every route
            </Text>
            <Text
              style={[
                styles.slideIntro,
                compactLayout ? styles.slideIntroCompact : null,
                veryShortLayout ? styles.slideIntroShort : null,
              ]}
            >
              Paddle Today compares live water and weather with route-specific guidance, then turns the result into a clear call.
            </Text>
          </View>

          <View
            style={[
              styles.howCard,
              shortLayout ? styles.howCardShort : null,
              veryShortLayout ? styles.howCardVeryShort : null,
            ]}
          >
            <View style={[styles.signalGrid, veryShortLayout ? styles.signalGridShort : null]}>
              {scoreSignals.map((signal) => (
                <View
                  key={signal.title}
                  style={[styles.signalTile, veryShortLayout ? styles.signalTileShort : null]}
                >
                  <View style={[styles.signalIcon, veryShortLayout ? styles.signalIconShort : null]}>
                    <MaterialCommunityIcons name={signal.icon} size={veryShortLayout ? 17 : 20} color={colors.accent} />
                  </View>
                  <View style={styles.signalCopy}>
                    <Text style={styles.signalTitle}>{signal.title}</Text>
                    <Text style={styles.signalLabel} numberOfLines={2}>{signal.label}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={[styles.scoreConnector, veryShortLayout ? styles.scoreConnectorShort : null]}>
              <View style={styles.connectorLine} />
              <MaterialCommunityIcons name="arrow-down" size={18} color={colors.accent} />
              <View style={styles.connectorLine} />
            </View>

            <View style={[styles.scoreResult, veryShortLayout ? styles.scoreResultShort : null]}>
              <View
                style={[
                  styles.scoreOrb,
                  styles.scoreResultOrb,
                  veryShortLayout ? styles.scoreResultOrbShort : null,
                  { backgroundColor: previewTone.background },
                ]}
              >
                <Text style={[styles.scoreValue, { color: previewTone.text }]}>{previewRoute?.score ?? 84}</Text>
                <Text style={[styles.scoreLabel, { color: previewTone.text }]}>
                  {(previewRoute?.rating ?? 'Good').toUpperCase()}
                </Text>
              </View>
              <View style={styles.scoreResultCopy}>
                <Text style={styles.scoreResultKicker}>WHY THIS SCORE?</Text>
                <Text style={styles.scoreResultTitle}>Example score breakdown</Text>
                <View style={styles.scoreExampleGrid}>
                  {previewScoreFactors.map((factor) => (
                    <View key={factor.label} style={styles.scoreExampleFactor}>
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
      </ScrollView>

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
          accessibilityLabel="Find my paddle"
          disabled={saving}
          onPress={openStartingPoint}
          style={({ pressed }) => [
            styles.primaryButton,
            shortLayout ? styles.primaryButtonShort : null,
            pressed ? styles.primaryButtonPressed : null,
          ]}
        >
          <Text style={styles.primaryButtonText}>Find my paddle</Text>
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
  carousel: { flex: 1, minHeight: 0 },
  carouselContent: { flexDirection: 'row' },
  slide: {
    height: '100%',
    paddingTop: spacing.xs,
  },
  explainerSlide: { justifyContent: 'flex-start' },
  featuresSlide: { justifyContent: 'flex-start' },
  slideHeading: { alignItems: 'center', marginTop: spacing.lg },
  slideHeadingCompact: { marginTop: spacing.md },
  slideHeadingShort: { marginTop: spacing.sm },
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
  intentContent: { paddingHorizontal: spacing.lg },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandLogo: { width: 36, height: 36 },
  brand: {
    color: colors.accentDeep,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia' }),
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  skipText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  intentActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  backButton: { width: 32, height: 40, alignItems: 'center', justifyContent: 'center' },
  hero: {
    minHeight: 285,
    marginTop: spacing.md,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.accentDeep,
  },
  heroCompact: { minHeight: 205, marginTop: spacing.sm },
  heroShort: { minHeight: 160, marginTop: spacing.sm },
  heroImage: { width: '100%', height: '100%', borderRadius: 24 },
  heroOverlay: {
    flex: 1,
    minHeight: 250,
    justifyContent: 'flex-start',
    padding: spacing.md,
    backgroundColor: 'rgba(15, 25, 22, 0.08)',
  },
  heroOverlayCompact: { minHeight: 205 },
  heroOverlayShort: { minHeight: 160 },
  routePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: 10,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
  },
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
  routePreviewCopy: { flex: 1, gap: 2 },
  routePreviewKicker: { color: colors.good, fontSize: 9, fontWeight: '900', letterSpacing: 0.4 },
  routePreviewName: { color: colors.text, fontSize: 18, lineHeight: 21, fontWeight: '900' },
  routePreviewReach: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
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
    minHeight: 82,
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
  signalTileShort: { minHeight: 52, padding: 6, gap: 6 },
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
  scoreExampleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.sm,
    rowGap: 2,
    marginTop: 5,
  },
  scoreExampleFactor: {
    width: '45%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreExampleLabel: { color: colors.textMuted, fontSize: 9.5, lineHeight: 13, fontWeight: '700' },
  scoreExampleValue: { fontSize: 10, lineHeight: 13, fontWeight: '900' },
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
  intentHeading: { marginTop: spacing.xl },
  intentEyebrow: { color: colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  intentTitle: { color: colors.text, fontSize: 30, lineHeight: 36, fontWeight: '900', marginTop: spacing.sm },
  intentSubtitle: { color: colors.textMuted, fontSize: 16, lineHeight: 24, marginTop: spacing.sm },
  choiceList: { gap: spacing.sm, marginTop: spacing.xl },
  choice: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, minHeight: 74, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.surface },
  choicePressed: { backgroundColor: colors.surfaceStrong },
  disabled: { opacity: 0.65 },
  choiceIcon: { alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accentSoft },
  choiceCopy: { flex: 1 },
  choiceTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  choiceBody: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 2 },
  locationChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 82,
    marginTop: spacing.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  locationChoiceIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: colors.accentSoft,
  },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginVertical: spacing.xl },
  orLine: { flex: 1, height: 1, backgroundColor: colors.border },
  orText: { color: colors.textMuted, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  locationSearchCard: {
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  locationSearchLabel: { color: colors.text, fontSize: 13, fontWeight: '800' },
  locationSearchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  locationInput: {
    flex: 1,
    minHeight: 50,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceStrong,
    color: colors.text,
    fontSize: 16,
  },
  locationSearchButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.accent,
  },
  locationError: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: '#F2DDD6',
  },
  locationErrorCopy: { flex: 1, gap: spacing.sm },
  locationErrorText: { flex: 1, color: colors.noGo, fontSize: 13, lineHeight: 19, fontWeight: '700' },
  locationSettingsLink: { color: colors.noGo, fontSize: 13, fontWeight: '900', textDecorationLine: 'underline' },
  localNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.xl },
  footnote: { color: colors.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
