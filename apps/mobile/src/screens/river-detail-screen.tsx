import {
  routeHazardLabels,
  routeSafetyLevelLabels,
  routeSafetySummary,
  type ApprovedCommunityPhoto,
  type CampingClassification,
  type ApprovedTripReport,
  type DecisionChecklistItem,
  type HourlyWeatherPoint,
  type RiverAccessPoint,
  type RiverRouteAccessPoint,
  type RiverAlertThreshold,
  type CreateRouteContributionRequest,
  type RiverDetailApiResult,
  type RiverOutlook,
  type ScoreBreakdown,
} from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  RefreshControl,
  Share,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  View,
} from 'react-native';
import {
  useCreateRiverAlertMutation,
  useCreateRouteContributionMutation,
  useRiverDetailQuery,
  useRiverGroupQuery,
  useRiverHistoryQuery,
  useRouteCommunityQuery,
} from '../api/queries';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HistoryBars } from '../components/history-bars';
import { AppErrorState, AppLoadingState } from '../components/app-state';
import { RatingPill } from '../components/rating-pill';
import { RoutePhotoCard } from '../components/route-photo-card';
import { RouteReportSheet, type SelectedReportPhoto } from '../components/route-report-sheet';
import { RoutePlotMap, type RoutePlotPoint, type RouteSpanCoordinate } from '../components/route-plot-map';
import { SaveToggleButton } from '../components/save-toggle-button';
import { SectionCard } from '../components/section-card';
import { StatusPill } from '../components/status-pill';
import { alertMutationMessage, alertThresholdLabel, isValidEmailAddress } from '../lib/alerts';
import { resolveApiUrl } from '../lib/api-base-url';
import {
  detailMessageForRating,
  formatGaugeValue,
  formatPercent,
  formatRainInches,
  formatTemperature,
  formatTimestamp,
  normalizeApiText,
  verdictForRating,
} from '../lib/format';
import { mapUrlForAccessPoint } from '../lib/maps';
import { registerForRiverAlertPushNotifications } from '../lib/native-notifications';
import { captureAppException, trackAppEvent } from '../lib/observability';
import {
  normalizeReportPhotoAsset,
  ROUTE_REPORT_MAX_PHOTOS,
} from '../lib/report-photos';
import { androidBottomInset } from '../lib/safe-area';
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

const DETAIL_SECTIONS = ['Today', 'Access', 'Reports', 'More'] as const;
const ANDROID_NAV_CONTROL_MIN_INSET = 96;

type DetailSection = (typeof DETAIL_SECTIONS)[number];

type GaugeBandVisualModel = {
  currentPercent: number;
  idealLeftPercent: number;
  idealWidthPercent: number;
  currentLabel: string;
  statusLabel: string;
  targetRangeLabel: string;
  lowLabel: string;
  idealLabel: string;
  highLabel: string;
  markerTone: object;
};

export default function RiverDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom, ANDROID_NAV_CONTROL_MIN_INSET);
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
  const detailQuery = useRiverDetailQuery(slug);
  const historyQuery = useRiverHistoryQuery(slug, 7);
  const communityQuery = useRouteCommunityQuery(slug);
  const createAlertMutation = useCreateRiverAlertMutation();
  const createContributionMutation = useCreateRouteContributionMutation();
  const { email: storedEmail, setEmail, recordRouteAlert } = useAlertPreferences();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const scrollRef = useRef<ScrollView | null>(null);
  const sectionTabsYRef = useRef(0);
  const sectionTabsHeightRef = useRef(0);
  const sectionContentYRef = useRef(0);
  const pendingSectionScrollRef = useRef<DetailSection | null>(null);
  const conditionsYRef = useRef(0);
  const [alertStatus, setAlertStatus] = useState('');
  const [pendingThreshold, setPendingThreshold] = useState<RiverAlertThreshold | null>(null);
  const [reportName, setReportName] = useState('');
  const [reportEmail, setReportEmail] = useState(storedEmail);
  const [reportDate, setReportDate] = useState('');
  const [reportSentiment, setReportSentiment] = useState<CreateRouteContributionRequest['tripSentiment']>('');
  const [reportText, setReportText] = useState('');
  const [reportNotes, setReportNotes] = useState('');
  const [reportPhotos, setReportPhotos] = useState<SelectedReportPhoto[]>([]);
  const [reportPhotoRights, setReportPhotoRights] = useState(false);
  const [reportConsent, setReportConsent] = useState(false);
  const [reportStatus, setReportStatus] = useState('Reports are reviewed before they appear on Paddle Today.');
  const [shareStatus, setShareStatus] = useState('');
  const [activeSection, setActiveSection] = useState<DetailSection>('Today');
  const [reportSheetVisible, setReportSheetVisible] = useState(false);
  const [alertSheetVisible, setAlertSheetVisible] = useState(false);
  const [selectedPutInId, setSelectedPutInId] = useState<string | null>(null);
  const [selectedTakeOutId, setSelectedTakeOutId] = useState<string | null>(null);

  const detail = detailQuery.data?.result ?? null;
  const groupQuery = useRiverGroupQuery(detail?.river.riverId ?? '');
  const history = historyQuery.data?.result ?? null;
  const community = communityQuery.data ?? null;
  const checklist = useMemo(() => (detail ? detail.checklist.slice(0, 4) : []), [detail]);
  const accessPoints = useMemo(() => (detail ? routeAccessPoints(detail) : []), [detail]);
  const selectedPutInAccess = selectedPutInId ? accessPoints.find((point) => point.id === selectedPutInId) : undefined;
  const selectedTakeOutAccess = selectedTakeOutId ? accessPoints.find((point) => point.id === selectedTakeOutId) : undefined;
  const selectedPutIn = selectedPutInAccess ?? detail?.river.putIn;
  const selectedTakeOut = selectedTakeOutAccess ?? detail?.river.takeOut;
  const routePlotPoints = useMemo(
    () => (detail ? buildDetailRoutePoints(detail, selectedPutIn, selectedTakeOut) : []),
    [detail, selectedPutIn, selectedTakeOut]
  );
  const routeBackgroundSpan = useMemo(
    () => (detail ? fullRouteSpanCoordinates(detail) : null),
    [detail]
  );
  const communityReports = community?.reports ?? [];
  const communityPhotos = community?.photos ?? [];
  const siblingRouteCount = groupQuery.data?.result.routes.length ?? 0;
  const detailSlug = detail?.river.slug ?? null;

  useEffect(() => {
    setReportEmail((current) => current || storedEmail);
  }, [storedEmail]);

  useEffect(() => {
    if (!detail) {
      return;
    }

    const points = routeAccessPoints(detail);
    setSelectedPutInId(points[0]?.id ?? null);
    setSelectedTakeOutId(points[points.length - 1]?.id ?? null);

    trackAppEvent('route_opened', {
      slug: detail.river.slug,
      riverId: detail.river.riverId,
      rating: detail.rating,
      score: detail.score,
    });
  }, [detailSlug]);

  useEffect(() => {
    if (pendingSectionScrollRef.current !== activeSection) {
      return;
    }

    const timeout = setTimeout(() => {
      scrollToSectionTop();
      pendingSectionScrollRef.current = null;
    }, 0);

    return () => clearTimeout(timeout);
  }, [activeSection]);

  if (!slug) {
    return (
      <AppErrorState
        title="River route is missing"
        body="Open this route again from Today, Explore, Weekend, or Saved."
      />
    );
  }

  if (detailQuery.isLoading && !detail) {
    return (
      <AppLoadingState title="Loading river detail" body="Pulling the latest river call and score history." />
    );
  }

  if (detailQuery.isError && !detail) {
    return (
      <AppErrorState
        title="This river call did not load"
        body="Check your connection, then try again."
        detail={resolveApiUrl(`/api/rivers/${slug}.json`)}
        onRetry={() => detailQuery.refetch()}
      />
    );
  }

  if (!detail) {
    return null;
  }

  const riverSlug = detail.river.slug;
  async function submitNativeRiverAlert(threshold: RiverAlertThreshold) {
    setPendingThreshold(threshold);
    try {
      trackAppEvent('native_alert_create_started', {
        slug: riverSlug,
        threshold,
      });
      const registration = await registerForRiverAlertPushNotifications();
      if (!registration.ok || !registration.expoPushToken) {
        setAlertStatus(registration.message);
        return;
      }

      const response = await createAlertMutation.mutateAsync({
        riverSlug,
        threshold,
        deliveryMethod: 'push',
        expoPushToken: registration.expoPushToken,
      });
      await recordRouteAlert({ riverSlug, threshold, deliveryMethod: 'push' });
      trackAppEvent('native_alert_create_succeeded', {
        slug: riverSlug,
        threshold,
        duplicate: response.duplicate,
        reactivated: response.reactivated,
      });
      setAlertStatus(alertMutationMessage(response, threshold, 'push'));
    } catch (error) {
      captureAppException(error, {
        name: 'native_alert_create_failed',
        extra: {
          slug: riverSlug,
          threshold,
        },
      });
      setAlertStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : `Could not save the ${alertThresholdLabel(threshold)} phone alert right now.`
      );
    } finally {
      setPendingThreshold(null);
    }
  }

  async function shareRouteCall() {
    if (!detail) {
      return;
    }

    const message = buildRouteShareMessage(detail, selectedPutIn, selectedTakeOut);
    setShareStatus('Opening share sheet with score, reason, and access links.');
    trackAppEvent('route_share_started', {
      slug: riverSlug,
      rating: detail.rating,
      score: detail.score,
    });
    try {
      await Share.share({
        title: `${detail.river.name} - ${detail.river.reach}`,
        message,
      });
      setShareStatus('Shared score, reason, access links, and safety reminder.');
    } catch {
      setShareStatus('Share sheet unavailable here. Route summary is ready from this screen.');
    }
  }

  async function pickReportPhotos() {
    const remainingSlots = ROUTE_REPORT_MAX_PHOTOS - reportPhotos.length;
    if (remainingSlots <= 0) {
      setReportStatus(`You can attach up to ${ROUTE_REPORT_MAX_PHOTOS} photos per report.`);
      return;
    }

    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        setReportStatus('Photo access is off. You can still send a text-only report, or enable photos in system settings.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        base64: true,
        mediaTypes: ['images'],
        orderedSelection: true,
        quality: 0.82,
        selectionLimit: remainingSlots,
      });

      if (result.canceled) {
        return;
      }

      const selected: SelectedReportPhoto[] = [];
      let skipped = 0;

      for (const [index, asset] of result.assets.slice(0, remainingSlots).entries()) {
        const normalized = await normalizeReportPhotoAsset(asset, index);
        if (normalized) {
          selected.push(normalized);
        } else {
          skipped += 1;
        }
      }

      if (selected.length > 0) {
        setReportPhotos((current) => [...current, ...selected].slice(0, ROUTE_REPORT_MAX_PHOTOS));
        setReportStatus(
          skipped > 0
            ? `Added ${selected.length} photo${selected.length === 1 ? '' : 's'}. Some photos could not be added.`
            : `Added ${selected.length} photo${selected.length === 1 ? '' : 's'}.`
        );
      } else if (skipped > 0) {
        setReportStatus('Those photos could not be added.');
      }
    } catch {
      setReportStatus('Photos could not be opened. You can still send a text-only report.');
    }
  }

  function removeReportPhoto(id: string) {
    setReportPhotos((current) => current.filter((photo) => photo.id !== id));
  }

  function scrollToY(y: number) {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        y: Math.max(y - spacing.sm, 0),
        animated: true,
      });
    });
  }

  function scrollToSectionTop() {
    const sectionTop = sectionContentYRef.current || sectionTabsYRef.current;
    const stickyOffset = sectionTabsHeightRef.current + spacing.sm;
    scrollToY(Math.max(sectionTop - stickyOffset, 0));
  }

  function showSection(section: DetailSection) {
    pendingSectionScrollRef.current = section;
    setActiveSection(section);
    if (section === activeSection) {
      scrollToSectionTop();
      pendingSectionScrollRef.current = null;
    }
  }

  function showConditions() {
    setActiveSection('Today');
    scrollToY(conditionsYRef.current || sectionTabsYRef.current);
  }

  async function submitRouteReport() {
    const contributorName = reportName.trim();
    const contributorEmail = reportEmail.trim().toLowerCase();
    const tripReport = reportText.trim();

    if (contributorName.length < 2) {
      setReportStatus('Add your name or paddling handle.');
      return;
    }

    if (!isValidEmailAddress(contributorEmail)) {
      setReportStatus('Enter a valid email address for follow-up questions.');
      return;
    }

    if (tripReport.length < 12 && reportPhotos.length === 0) {
      setReportStatus('Add at least a sentence or attach route photos.');
      return;
    }

    if (!reportConsent) {
      setReportStatus("Confirm that it's okay to contact you about this report.");
      return;
    }

    if (reportPhotos.length > 0 && !reportPhotoRights) {
      setReportStatus('Confirm that you own or have permission to share the attached photos.');
      return;
    }

    try {
      setReportStatus('Sending route report...');
      trackAppEvent('route_report_submitted', {
        slug: riverSlug,
        hasPhotos: reportPhotos.length > 0,
        photoCount: reportPhotos.length,
      });
      await setEmail(contributorEmail);
      await createContributionMutation.mutateAsync({
        riverSlug,
        contributorName,
        contributorEmail,
        tripDate: reportDate.trim(),
        tripSentiment: reportSentiment,
        tripReport,
        notes: reportNotes.trim(),
        reviewConsent: reportConsent,
        rightsConfirmed: reportPhotos.length > 0 ? reportPhotoRights : false,
        files: reportPhotos.map((photo) => ({
          name: photo.name,
          type: photo.type,
          size: photo.size,
          dataUrl: photo.dataUrl,
        })),
      });
      setReportText('');
      setReportNotes('');
      setReportDate('');
      setReportSentiment('');
      setReportPhotos([]);
      setReportPhotoRights(false);
      setReportConsent(false);
      setReportStatus('Thank you. Your report was sent for review.');
      setReportSheetVisible(false);
      void communityQuery.refetch();
    } catch (error) {
      captureAppException(error, {
        name: 'route_report_failed',
        extra: {
          slug: riverSlug,
          hasPhotos: reportPhotos.length > 0,
          photoCount: reportPhotos.length,
        },
      });
      setReportStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : 'Could not send this route report right now.'
      );
    }
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.screenSafeArea}>
      <Stack.Screen options={{ title: detail.river.name }} />
      <ScrollView
        ref={scrollRef}
        style={styles.screen}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: spacing.xl + bottomContentInset },
        ]}
        stickyHeaderIndices={[2]}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={detailQuery.isRefetching || historyQuery.isRefetching || communityQuery.isRefetching}
            onRefresh={() => Promise.all([detailQuery.refetch(), historyQuery.refetch(), communityQuery.refetch()])}
          />
        }
      >
        <RoutePhotoCard
          river={detail.river}
          height={126}
          showCaption={false}
          onContributePhotos={() => {
            trackAppEvent('route_photo_contribution_started', { slug: riverSlug, source: 'route_detail' });
            router.push({ pathname: '/contribute-photo/[slug]', params: { slug: riverSlug } });
          }}
        />

        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <View style={styles.heroScore}>
              <Text style={styles.scoreValue}>{detail.score}</Text>
            </View>
            <View style={styles.heroCopy}>
              <View style={styles.heroTitleRow}>
                <View style={styles.heroTitleCopy}>
                  <Text style={styles.kicker}>{detail.river.name}</Text>
                  <Text style={styles.title}>{detail.river.reach}</Text>
                </View>
                <View style={styles.heroActions}>
                  <HeroIconButton
                    icon="bell-outline"
                    selected={alertSheetVisible}
                    accessibilityLabel="Set route alert"
                    onPress={() => {
                      trackAppEvent('route_alert_sheet_opened', { slug: riverSlug, source: 'hero' });
                      setAlertSheetVisible(true);
                    }}
                  />
                  <HeroIconButton
                    icon="share-variant-outline"
                    accessibilityLabel="Share route"
                    onPress={() => void shareRouteCall()}
                  />
                  <SaveToggleButton
                    compact
                    saved={isSaved(detail.river.slug)}
                    onPress={() =>
                      void toggleSavedRiver({
                        slug: detail.river.slug,
                        riverId: detail.river.riverId,
                        name: detail.river.name,
                        reach: detail.river.reach,
                      })
                    }
                  />
                </View>
              </View>
              <Text style={styles.subtitle}>{detailMessageForRating(detail.rating)}</Text>
              <Text style={styles.routeMetaLine} numberOfLines={2}>{routeHeroLine(detail)}</Text>
              <View style={styles.heroMeta}>
                <RatingPill rating={detail.rating} />
                <StatusPill status={detail.liveData.overall} />
              </View>
              {shareStatus ? <Text style={styles.shareStatus}>{shareStatus}</Text> : null}
            </View>
          </View>
          <DecisionSummary detail={detail} />
          <RouteSafetyPanel detail={detail} />
          <DecisionStrip
            detail={detail}
            onConditions={showConditions}
            onDirections={() => openPrimaryDirections(detail, selectedPutIn, selectedTakeOut)}
            onAccess={() => showSection('Access')}
          />
          {detail.liveData.overall !== 'live' ? (
            <View style={styles.heroFooter}>
              <Text style={styles.heroFooterWarning}>{normalizeApiText(detail.liveData.summary)}</Text>
            </View>
          ) : null}
        </View>

        <View
          collapsable={false}
          renderToHardwareTextureAndroid
          style={styles.sectionTabsSticky}
          onLayout={(event) => {
            sectionTabsYRef.current = event.nativeEvent.layout.y;
            sectionTabsHeightRef.current = event.nativeEvent.layout.height;
          }}
        >
          <DetailSectionTabs activeSection={activeSection} onSelect={showSection} />
        </View>

        {activeSection === 'Today' ? (
          <View
            onLayout={(event) => {
              sectionContentYRef.current = event.nativeEvent.layout.y;
            }}
          >
            <RouteBasicsCard detail={detail} />

            <View
              onLayout={(event) => {
                conditionsYRef.current = event.nativeEvent.layout.y;
              }}
            >
              <SectionCard title="Gauge, trend, weather" subtitle={normalizeApiText(detail.liveData.summary)}>
                <View style={styles.conditionList}>
                  <ConditionRow
                    icon="waves"
                    label={detail.river.gaugeSource.display.primaryMetricLabel || 'Gauge'}
                    value={detail.gauge ? formatGaugeValue(detail.gauge.current, detail.gauge.unit) : detail.gaugeBandLabel}
                    subvalue={detail.gauge ? detail.gaugeBandLabel : 'Current reading unavailable'}
                    detail={normalizeApiText(detail.liveData.gauge.detail)}
                    tone={conditionToneForStatus(checklistStatusForLabel(checklist, 'Gauge window'))}
                  />
                  <GaugeBandCard detail={detail} />
                  <ConditionRow
                    icon="trending-up"
                    label="Trend"
                    value={trendValue(detail)}
                    subvalue={trendSubvalue(detail)}
                    detail={trendDetailText(detail)}
                    tone={conditionToneForStatus(checklistStatusForLabel(checklist, 'Trend check'))}
                  />
                  <ConditionRow
                    icon="weather-partly-cloudy"
                    label="Weather"
                    value={compactWeatherValue(detail)}
                    subvalue={weatherSubvalue(detail)}
                    detail={normalizeApiText(detail.liveData.weather.detail)}
                    tone={conditionToneForStatus(checklistStatusForLabel(checklist, 'Weather window'))}
                  />
                  <WeatherDecisionCard detail={detail} />
                </View>
                <GaugeSourceActions detail={detail} />
              </SectionCard>
            </View>

            <AboutRouteCard detail={detail} />
          </View>
        ) : null}

        {activeSection === 'Reports' ? (
          <View
            onLayout={(event) => {
              sectionContentYRef.current = event.nativeEvent.layout.y;
            }}
          >
            <SectionCard
              title="Community reports"
              subtitle={
                communityReports.length > 0
                  ? `${communityReports.length} approved reports for route context and access reality checks.`
                  : communityQuery.isLoading
                    ? 'Loading approved paddler reports.'
                    : 'No approved reports yet.'
              }
            >
              {communityPhotos.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.communityPhotoStrip}>
                  {communityPhotos.slice(0, 6).map((photo) => (
                    <CommunityPhotoCard key={photo.id} photo={photo} />
                  ))}
                </ScrollView>
              ) : null}
              {communityReports.length > 0 ? (
                <View style={styles.communityReportList}>
                  {communityReports.slice(0, 3).map((report) => (
                    <CommunityReportCard key={report.id} report={report} />
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyText}>
                  {communityQuery.isError
                    ? 'Approved community notes could not be loaded right now.'
                    : 'Photos and trip reports will show up here after approval.'}
                </Text>
              )}
            </SectionCard>

            <View style={styles.reportCta}>
              <View style={styles.reportCtaCopy}>
                <Text style={styles.reportCtaTitle}>Contribute route photos</Text>
                <Text style={styles.reportCtaText}>
                  Add access, condition, and route photos with an optional caption. Photos are reviewed before publishing.
                </Text>
              </View>
              <Pressable
                style={styles.reportCtaButton}
                onPress={() => {
                  trackAppEvent('route_photo_contribution_started', { slug: riverSlug, source: 'reports_section' });
                  router.push({ pathname: '/contribute-photo/[slug]', params: { slug: riverSlug } });
                }}
              >
                <Text style={styles.reportCtaButtonText}>Photos</Text>
              </Pressable>
            </View>

            <View style={styles.reportCta}>
              <View style={styles.reportCtaCopy}>
                <Text style={styles.reportCtaTitle}>Add a full report</Text>
                <Text style={styles.reportCtaText}>
                  Send access notes, wood, pace, level context, or optional photos. Reports are reviewed before anything appears publicly.
                </Text>
              </View>
              <Pressable
                style={styles.reportCtaButton}
                onPress={() => {
                  trackAppEvent('route_report_started', { slug: riverSlug });
                  setReportSheetVisible(true);
                }}
              >
                <Text style={styles.reportCtaButtonText}>Report</Text>
              </Pressable>
            </View>
          </View>
        ) : null}

        {activeSection === 'More' ? (
          <View
            onLayout={(event) => {
              sectionContentYRef.current = event.nativeEvent.layout.y;
            }}
          >
            {detail.river.riverId && siblingRouteCount > 1 ? (
              <SectionCard
                title="More routes on this river"
                subtitle={`${detail.river.name} has ${siblingRouteCount} tracked route options with separate gauges, access, and scores.`}
              >
                <Pressable
                  style={styles.riverHubLink}
                  onPress={() => router.push({ pathname: '/river-hub/[riverId]', params: { riverId: detail.river.riverId ?? '' } })}
                >
                  <View style={styles.riverHubLinkIcon}>
                    <MaterialCommunityIcons name="routes" color={colors.accent} size={20} />
                  </View>
                  <View style={styles.riverHubLinkCopy}>
                    <Text style={styles.riverHubLinkTitle}>Compare route options</Text>
                    <Text style={styles.riverHubLinkText}>Open the river hub before choosing a stretch.</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={22} />
                </Pressable>
              </SectionCard>
            ) : null}

            <SectionCard
              title="Outlooks"
              subtitle="Forecast calls stay cautious."
            >
              <OutlookRows outlooks={detail.outlooks} />
            </SectionCard>

            <SectionCard
              title="Weather through today"
              subtitle="Hourly weather for timing."
            >
              <HourlyWeatherStrip detail={detail} />
            </SectionCard>

            <SectionCard
              title="Recent gauge trend"
              subtitle={
                detail.gauge?.gaugeSource
                  ? `${detail.gauge.gaugeSource} - observed ${formatTimestamp(detail.gauge.observedAt)}`
                  : 'Recent gauge samples are unavailable.'
              }
            >
              <GaugeTrendChart detail={detail} />
            </SectionCard>

            <SectionCard
              title="Score history"
              subtitle={
                history?.latestSnapshotAt
                  ? `Last captured ${formatTimestamp(history.latestSnapshotAt)}`
                  : 'History will fill in as snapshots are captured.'
              }
            >
              <HistoryBars days={history?.days ?? []} />
            </SectionCard>
          </View>
        ) : null}

        {activeSection === 'Access' ? (
          <View
            onLayout={(event) => {
              sectionContentYRef.current = event.nativeEvent.layout.y;
            }}
          >
            <SectionCard
              title="Access & logistics"
              subtitle="Access, shuttle, and route basics."
            >
              {Platform.OS !== 'web' && routePlotPoints.length > 0 ? (
                <RoutePlotMap
                  points={routePlotPoints}
                  selectedId={routePlotPoints[0]?.id ?? null}
                  backgroundSpanCoordinates={routeBackgroundSpan}
                  height={220}
                  showFooter={false}
                  markerMode="pin"
                />
              ) : null}
              <View style={styles.accessBlock}>
                <AccessPlanner
                  detail={detail}
                  points={accessPoints}
                  selectedPutInId={selectedPutInId}
                  selectedTakeOutId={selectedTakeOutId}
                  onPutInChange={(point) => {
                    setSelectedPutInId(point.id);
                    if (selectedTakeOutAccess && point.mileFromStart >= selectedTakeOutAccess.mileFromStart) {
                      const nextTakeOut = accessPoints.find((candidate) => candidate.mileFromStart > point.mileFromStart);
                      setSelectedTakeOutId(nextTakeOut?.id ?? point.id);
                    }
                  }}
                  onTakeOutChange={(point) => setSelectedTakeOutId(point.id)}
                />
                <AccessCard label="Put-in" point={selectedPutIn} emptyLabel="Put-in not mapped yet." />
                <AccessCard label="Take-out" point={selectedTakeOut} emptyLabel="Take-out not mapped yet." />
                {accessPoints.length <= 2 ? (
                  <AccessMetrics detail={detail} distanceLabel={detail.river.distanceLabel || 'Check source'} />
                ) : null}
              </View>
              <RouteDirectionActions putIn={selectedPutIn} takeOut={selectedTakeOut} />
              <TripPlanningCard detail={detail} />
              <LogisticsPanel
                title="Shuttle"
                body={detail.river.logistics?.shuttle || 'Shuttle notes are not tracked yet for this route.'}
              />
              <LogisticsPanel
                title="Permits"
                body={detail.river.logistics?.permits || 'Permit notes are not tracked yet for this route.'}
              />
              <LogisticsBulletList
                title="Access notes"
                items={detail.river.logistics?.accessCaveats ?? []}
                empty="Access caveats are not tracked yet for this route."
              />
            </SectionCard>

            <SectionCard
              title="Route alerts"
              subtitle="Get a notification when this route improves."
            >
              <Pressable
                style={styles.alertCta}
                onPress={() => {
                  trackAppEvent('route_alert_sheet_opened', { slug: riverSlug, source: 'access' });
                  setAlertSheetVisible(true);
                }}
              >
                <View style={styles.alertCtaIcon}>
                  <MaterialCommunityIcons name="bell-outline" color={colors.accent} size={20} />
                </View>
                <View style={styles.alertCtaCopy}>
                  <Text style={styles.alertCtaTitle}>Alert me at Good or Strong</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" color={colors.textMuted} size={22} />
              </Pressable>
              {alertStatus ? <Text style={styles.alertStatus}>{alertStatus}</Text> : null}
            </SectionCard>
          </View>
        ) : null}
      </ScrollView>

      <RouteReportSheet
        visible={reportSheetVisible}
        name={reportName}
        email={reportEmail}
        tripDate={reportDate}
        sentiment={reportSentiment}
        report={reportText}
        notes={reportNotes}
        photos={reportPhotos}
        maxPhotos={ROUTE_REPORT_MAX_PHOTOS}
        photoRightsConfirmed={reportPhotoRights}
        contactConsentConfirmed={reportConsent}
        isSubmitting={createContributionMutation.isPending}
        status={reportStatus}
        onClose={() => setReportSheetVisible(false)}
        onNameChange={setReportName}
        onEmailChange={setReportEmail}
        onTripDateChange={setReportDate}
        onSentimentChange={setReportSentiment}
        onReportChange={setReportText}
        onNotesChange={setReportNotes}
        onPickPhotos={() => void pickReportPhotos()}
        onRemovePhoto={removeReportPhoto}
        onTogglePhotoRights={() => setReportPhotoRights((current) => !current)}
        onToggleContactConsent={() => setReportConsent((current) => !current)}
        onSubmit={() => void submitRouteReport()}
      />

      <AlertSetupSheet
        visible={alertSheetVisible}
        routeName={detail.river.name}
        routeReach={detail.river.reach}
        status={alertStatus}
        bottomInset={bottomContentInset}
        pendingThreshold={pendingThreshold}
        mutationPending={createAlertMutation.isPending}
        onClose={() => setAlertSheetVisible(false)}
        onNativeAlert={(threshold) => void submitNativeRiverAlert(threshold)}
      />
    </SafeAreaView>
  );
}

function decisionSummaryItems(detail: RiverDetailApiResult) {
  const checklistByLabel = new Map(detail.checklist.map((item) => [item.label, item]));
  const warnings = detail.checklist.filter((item) => item.status !== 'go');
  const working = detail.checklist.filter((item) => item.status === 'go');
  const firstWarning = warnings[0];
  const primaryWorking = working[0] ?? detail.checklist[0];
  const conditionItem = firstWarning
    ? {
        label: 'Cautions',
        text: normalizeApiText(firstWarning.detail),
        tone: conditionToneForStatus(firstWarning.status),
      }
    : {
        label: 'Quick facts',
        text: conditionQuickFactText(detail, checklistByLabel),
        tone: styles.conditionGood,
      };

  return [
    {
      label: 'Pros',
      text: normalizeApiText(primaryWorking?.detail ?? detail.explanation),
      tone: conditionToneForStatus(primaryWorking?.status ?? 'watch'),
    },
    conditionItem,
  ].filter((item) => item.text.trim().length > 0);
}

function conditionQuickFactText(
  detail: RiverDetailApiResult,
  checklistByLabel: Map<string, DecisionChecklistItem>
) {
  return normalizeApiText(
    checklistByLabel.get('Weather window')?.detail
      ?? checklistByLabel.get('Temperature')?.detail
      ?? detail.liveData.summary
  );
}

function routeHeroLine(detail: RiverDetailApiResult) {
  return [
    detail.river.distanceLabel || null,
    compactPaddleTime(detail.river.estimatedPaddleTime),
    `${capitalize(detail.river.profile.difficulty)} difficulty`,
  ].filter(Boolean).join(' - ');
}

function buildRouteShareMessage(
  detail: RiverDetailApiResult,
  putIn: RiverAccessPoint | undefined,
  takeOut: RiverAccessPoint | undefined
) {
  const putInUrl = mapUrlForAccessPoint(putIn);
  const takeOutUrl = mapUrlForAccessPoint(takeOut);
  const lines = [
    `${detail.river.name} - ${detail.river.reach}`,
    `${detail.score} / ${detail.rating}: ${decisionStatement(detail)}`,
    normalizeApiText(detail.explanation),
    routeHeroLine(detail),
    putInUrl ? `Put-in: ${putIn?.name ?? 'Open map'} ${putInUrl}` : null,
    takeOutUrl ? `Take-out: ${takeOut?.name ?? 'Open map'} ${takeOutUrl}` : null,
    'Confirm gauges, weather, access, and group fit before launching.',
  ];

  return lines.filter(Boolean).join('\n');
}

function compactPaddleTime(value: string) {
  if (!value) return null;
  return value
    .replace(/^About\s+/i, '')
    .replace(/roughly\s+/i, '')
    .replace(/\s+depending.*$/i, '')
    .replace(/\s+longer.*$/i, '')
    .replace(/\s+hr\b/gi, 'h')
    .replace(/\s+min\b/gi, 'm')
    .replace(/\s+to\s+/gi, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function decisionStatement(detail: RiverDetailApiResult) {
  if (detail.rating === 'Strong') {
    return 'Good to go if it fits your group.';
  }

  if (detail.rating === 'Good') {
    return 'Good with normal checks.';
  }

  if (detail.rating === 'Fair') {
    return 'Possible paddle with caution.';
  }

  return 'Skip today unless sources changed.';
}

function checklistStatusForLabel(checklist: DecisionChecklistItem[], label: string) {
  return checklist.find((item) => item.label === label)?.status ?? 'watch';
}

function conditionToneForStatus(status: DecisionChecklistItem['status']) {
  if (status === 'go') return styles.conditionGood;
  if (status === 'watch') return styles.conditionWatch;
  return styles.conditionSkip;
}

function trendValue(detail: RiverDetailApiResult) {
  if (!detail.gauge) {
    return 'Trend unavailable';
  }

  const trend = capitalize(detail.gauge.trend);
  const delta =
    detail.gauge.delta24h !== null
      ? formatGaugeValue(detail.gauge.delta24h, detail.gauge.unit, '0')
      : null;
  return delta ? `${trend} (${delta})` : trend;
}

function trendDetailText(detail: RiverDetailApiResult) {
  const explanation = normalizeApiText(detail.scoreBreakdown.riverQualityExplanation);
  if (/falling water helps when river is above its preferred band/i.test(explanation)) {
    return detail.gauge?.delta24h !== null && detail.gauge
      ? `Changed ${formatGaugeValue(detail.gauge.delta24h, detail.gauge.unit, '0')} in 24h.`
      : 'Check the source graph before committing.';
  }

  return explanation;
}

function DecisionSummary({ detail }: { detail: RiverDetailApiResult }) {
  const items = decisionSummaryItems(detail).slice(0, 2);
  return (
    <View style={styles.decisionSummary}>
      <View style={styles.decisionSummaryHeader}>
        <Text style={styles.decisionSummaryLabel}>Today's call</Text>
        <Text style={styles.decisionSummaryScore}>{detail.score} / {detail.rating}</Text>
      </View>
      <Text style={styles.decisionSummaryTitle}>{decisionStatement(detail)}</Text>
      <View style={styles.decisionBulletList}>
        {items.map((item) => (
          <View key={item.label} style={styles.decisionBullet}>
            <View style={[styles.decisionBulletDot, item.tone]} />
            <View style={styles.decisionBulletCopy}>
              <Text style={styles.decisionBulletLabel}>{item.label}</Text>
              <Text style={styles.decisionBulletText}>{item.text}</Text>
            </View>
          </View>
        ))}
      </View>
      <ScoreExplanationCard breakdown={detail.scoreBreakdown} />
    </View>
  );
}

function ScoreExplanationCard({ breakdown }: { breakdown: ScoreBreakdown }) {
  const [expanded, setExpanded] = useState(false);
  const rows = scoreBreakdownRows(breakdown);
  const capReasons = breakdown.capReasons
    .map((reason) => friendlyCapReason(reason))
    .filter(Boolean);

  return (
    <View style={styles.scoreWhyCard}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={expanded ? 'Collapse score explanation' : 'Expand score explanation'}
        onPress={() => setExpanded((current) => !current)}
        style={styles.scoreWhyHeader}
      >
        <View style={styles.scoreWhyHeaderCopy}>
          <Text style={styles.scoreWhyTitle}>Why this score?</Text>
        </View>
        <View style={styles.scoreWhyToggle}>
          <MaterialCommunityIcons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            color={colors.accentDeep}
            size={18}
          />
        </View>
      </Pressable>
      {expanded ? (
        <>
          <View style={styles.scoreWhyRows}>
            {rows.map((row) => (
              <View key={row.label} style={styles.scoreWhyRow}>
                <Text style={styles.scoreWhyLabel}>{row.label}</Text>
                <Text style={[styles.scoreWhyValue, scoreBreakdownValueTone(row.value)]}>{signedPoints(row.value)}</Text>
              </View>
            ))}
          </View>
          {capReasons.length > 0 ? (
            <View style={styles.scoreCapList}>
              {capReasons.slice(0, 2).map((reason) => (
                <Text key={reason} style={styles.scoreCapText}>- {reason}</Text>
              ))}
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

function scoreBreakdownRows(breakdown: ScoreBreakdown) {
  const rows = [
    { label: 'River', value: breakdown.riverQuality },
    { label: 'Wind', value: breakdown.windAdjustment },
    { label: 'Temp', value: breakdown.temperatureAdjustment },
    { label: 'Rain', value: breakdown.rainAdjustment },
  ];

  if (breakdown.comfortAdjustment !== 0) {
    rows.push({ label: 'Other', value: breakdown.comfortAdjustment });
  }

  return rows;
}

function signedPoints(value: number) {
  if (value > 0) return `+${value}`;
  return String(value);
}

function scoreBreakdownValueTone(value: number) {
  if (value > 0) {
    return { color: colors.accentDeep };
  }

  if (value < 0) {
    return { color: colors.noGo };
  }

  return { color: colors.textMuted };
}

function friendlyCapReason(reason: string) {
  const normalized = String(reason || '').trim();
  if (!normalized) {
    return '';
  }

  if (/Near-freezing air caps today at 70\./i.test(normalized)) {
    return 'Cold air keeps today from scoring higher.';
  }

  if (/High wind caps today at 75\./i.test(normalized)) {
    return 'Strong wind puts a ceiling on today.';
  }

  if (/Imminent heavy rain caps today at 65\./i.test(normalized)) {
    return 'Rain expected soon keeps today cautious.';
  }

  if (/Minimum-only guidance caps the trip score at 74\./i.test(normalized)) {
    return 'This route has minimum-only gauge guidance.';
  }

  return normalized;
}

function DecisionStrip({
  detail,
  onConditions,
  onDirections,
  onAccess,
}: {
  detail: RiverDetailApiResult;
  onConditions: () => void;
  onDirections: () => void;
  onAccess: () => void;
}) {
  const directionsAvailable = Boolean(mapUrlForAccessPoint(detail.river.putIn) || mapUrlForAccessPoint(detail.river.takeOut));

  return (
    <View style={styles.decisionStrip}>
      <Pressable style={styles.decisionStripInlineAction} onPress={onConditions}>
        <MaterialCommunityIcons name="chart-timeline-variant" color={colors.accent} size={16} />
        <Text style={styles.decisionStripInlineActionText}>Conditions</Text>
      </Pressable>
      {directionsAvailable ? (
        <Pressable style={styles.decisionStripInlineAction} onPress={onDirections}>
          <MaterialCommunityIcons name="directions" color={colors.accent} size={16} />
          <Text style={styles.decisionStripInlineActionText}>Directions</Text>
        </Pressable>
      ) : null}
      <Pressable style={styles.decisionStripInlineAction} onPress={onAccess}>
        <MaterialCommunityIcons name="map-marker-path" color={colors.accent} size={16} />
        <Text style={styles.decisionStripInlineActionText}>Access</Text>
      </Pressable>
    </View>
  );
}

function ConditionRow({
  icon,
  label,
  value,
  subvalue,
  detail,
  tone,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  subvalue: string;
  detail: string;
  tone: object;
}) {
  return (
    <View style={styles.conditionRow}>
      <View style={[styles.conditionIcon, tone]}>
        <MaterialCommunityIcons name={icon} color={colors.surfaceStrong} size={18} />
      </View>
      <View style={styles.conditionCopy}>
        <Text style={styles.conditionLabel}>{label}</Text>
        <Text style={styles.conditionValue} numberOfLines={1}>{value}</Text>
        <Text style={styles.conditionSubvalue} numberOfLines={1}>{subvalue}</Text>
        <Text style={styles.conditionDetail}>{detail}</Text>
      </View>
    </View>
  );
}

function GaugeBandCard({ detail }: { detail: RiverDetailApiResult }) {
  const model = gaugeBandVisualModel(detail);

  if (!model) {
    return null;
  }

  return (
    <View style={styles.gaugeBandPanel}>
      <View style={styles.gaugeBandHeader}>
        <View style={styles.gaugeBandTitleWrap}>
          <Text style={styles.gaugeBandKicker}>Gauge band</Text>
          <Text style={styles.gaugeBandStatus}>{model.statusLabel}</Text>
          <Text style={styles.gaugeBandRange} numberOfLines={1}>
            Target {model.targetRangeLabel}
          </Text>
        </View>
        <View style={[styles.gaugeBandCurrentPill, model.markerTone]}>
          <Text style={styles.gaugeBandCurrentText}>{model.currentLabel}</Text>
        </View>
      </View>
      <View style={styles.gaugeBandMeter}>
        <View style={styles.gaugeBandTrack}>
          <View
            style={[
              styles.gaugeBandIdealSegment,
              {
                left: `${model.idealLeftPercent}%`,
                width: `${model.idealWidthPercent}%`,
              },
            ]}
          />
          <View
            style={[
              styles.gaugeBandMarker,
              model.markerTone,
              {
                left: `${model.currentPercent}%`,
              },
            ]}
          />
        </View>
        <View style={styles.gaugeBandLabels}>
          <Text style={styles.gaugeBandLabel} numberOfLines={1}>{model.lowLabel}</Text>
          <Text style={[styles.gaugeBandLabel, styles.gaugeBandLabelCenter]} numberOfLines={1}>{model.idealLabel}</Text>
          <Text style={[styles.gaugeBandLabel, styles.gaugeBandLabelRight]} numberOfLines={1}>{model.highLabel}</Text>
        </View>
      </View>
    </View>
  );
}

function GaugeSourceActions({ detail }: { detail: RiverDetailApiResult }) {
  const sourceUrl = detail.river.gaugeSource.detailUrl;
  const hydrographUrl = detail.river.gaugeSource.hydrographUrl;

  if (!sourceUrl && !hydrographUrl) {
    return null;
  }

  return (
    <View style={styles.sourceActionsPanel}>
      <View style={styles.sourceActionsCopy}>
        <Text style={styles.sourceActionsTitle}>Verify the gauge</Text>
        <Text style={styles.sourceActionsText} numberOfLines={2}>
          {detail.river.gaugeSource.display.shortLabel || detail.river.gaugeSource.display.label}
        </Text>
      </View>
      <View style={styles.sourceActionsButtons}>
        {sourceUrl ? (
          <Pressable style={styles.sourceActionButton} onPress={() => openGaugeSource(detail, sourceUrl, 'detail')}>
            <MaterialCommunityIcons name="open-in-new" color={colors.accent} size={16} />
            <Text style={styles.sourceActionText}>Source</Text>
          </Pressable>
        ) : null}
        {hydrographUrl ? (
          <Pressable style={styles.sourceActionButton} onPress={() => openGaugeSource(detail, hydrographUrl, 'hydrograph')}>
            <MaterialCommunityIcons name="chart-line" color={colors.accent} size={16} />
            <Text style={styles.sourceActionText}>Graph</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function RouteSafetyPanel({ detail }: { detail: RiverDetailApiResult }) {
  const profile = detail.river.safetyProfile;
  const riskLevel = profile?.riskLevel ?? 'standard';
  const summary = routeSafetySummary(profile);
  const body = mobileSafetyBody(riskLevel, summary);
  const notes = dedupeSafetyNotes(profile?.safetyNotes ?? [], summary);
  const advanced = riskLevel === 'advanced';
  const caution = riskLevel === 'caution';

  return (
    <View style={[styles.safetyPanel, advanced ? styles.safetyPanelAdvanced : caution ? styles.safetyPanelCaution : null]}>
      <View style={styles.safetyHeader}>
        <MaterialCommunityIcons
          name={advanced ? 'alert-octagon-outline' : caution ? 'alert-outline' : 'shield-check-outline'}
          color={advanced ? colors.noGo : caution ? '#9A5F19' : colors.accent}
          size={20}
        />
        <View style={styles.safetyHeaderText}>
          <Text style={styles.safetyKicker}>Safety</Text>
          <Text style={styles.safetyTitle}>{mobileSafetyTitle(riskLevel)}</Text>
        </View>
      </View>
      <Text style={styles.safetyBody}>{body}</Text>
      {profile?.hazards && profile.hazards.length > 0 ? (
        <View style={styles.safetyChipRow}>
          {profile.hazards.map((hazard) => (
            <Text key={hazard} style={styles.safetyChip}>{routeHazardLabels[hazard]}</Text>
          ))}
        </View>
      ) : null}
      {notes.map((note) => (
        <Text key={note} style={styles.safetyNote}>{normalizeApiText(note)}</Text>
      ))}
    </View>
  );
}

function mobileSafetyTitle(riskLevel: NonNullable<RiverDetailApiResult['river']['safetyProfile']>['riskLevel'] | 'standard') {
  if (riskLevel === 'standard') return 'Before you launch';
  return routeSafetyLevelLabels[riskLevel];
}

function mobileSafetyBody(
  riskLevel: NonNullable<RiverDetailApiResult['river']['safetyProfile']>['riskLevel'] | 'standard',
  summary: string
) {
  if (riskLevel === 'standard') {
    return 'Confirm access, shuttle, source data, hazards, closures, and takeouts before launching.';
  }

  return summary;
}

function dedupeSafetyNotes(notes: string[], summary: string) {
  const summaryKey = normalizeSafetyText(summary);
  const seen = new Set<string>();
  return notes.filter((note) => {
    const key = normalizeSafetyText(note);
    if (!key || key === summaryKey || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function normalizeSafetyText(value: string) {
  return normalizeApiText(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

function RouteBasicsCard({ detail }: { detail: RiverDetailApiResult }) {
  const basics = [
    { label: 'Paddle time', value: compactPaddleTime(detail.river.estimatedPaddleTime) || 'Not tracked', icon: 'clock-outline' },
    { label: 'Difficulty', value: capitalize(detail.river.profile.difficulty), icon: 'waves' },
    { label: 'Camping', value: campingFitLabel(detail.river.logistics?.campingClassification), icon: 'tent' },
  ];

  const gaugeRange = thresholdRangeLabel(detail);

  return (
    <SectionCard title="Trip fit">
      <View style={styles.routeBasicsGrid}>
        {basics.map((item) => (
          <View key={item.label} style={styles.routeBasicCell}>
            <View style={styles.routeBasicLabelRow}>
              <MaterialCommunityIcons name={item.icon as never} color={colors.accent} size={16} />
              <Text style={styles.routeBasicLabel}>{item.label}</Text>
            </View>
            <Text style={styles.routeBasicValue}>{item.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.routeInfoPanel}>
        <Text style={styles.routeInfoTitle}>Gauge range</Text>
        <Text style={styles.routeInfoText}>
          {detail.river.gaugeSource.display.label} - {gaugeRange}
        </Text>
      </View>
    </SectionCard>
  );
}

function campingFitLabel(classification: CampingClassification | null | undefined) {
  if (classification === 'nearby_basecamp') return 'Camp nearby';
  if (classification === 'endpoint_campground') return 'Campground access';
  if (classification === 'sandbar_or_gravel_bar') return 'Sandbar camping';
  if (classification === 'on_route_campsite' || classification === 'overnight_capable') return 'Overnight-friendly';
  return 'No camping';
}

function AboutRouteCard({ detail }: { detail: RiverDetailApiResult }) {
  const logistics = detail.river.logistics;

  return (
    <SectionCard title="About this route">
      <Text style={styles.aboutRouteText}>
        {normalizeApiText(logistics?.summary || detail.explanation)}
      </Text>
      <LogisticsBulletList
        title="Watch for"
        items={logistics?.watchFor ?? []}
        empty="No hazards noted yet."
        tone="warning"
      />
      <LogisticsPanel
        title="Camping"
        body={logistics?.camping || 'Camping information is not tracked yet for this route.'}
      />
    </SectionCard>
  );
}

function LogisticsPanel({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.logisticsPanel}>
      <View style={styles.logisticsPanelHeader}>
        <LogisticsIcon title={title} />
        <Text style={styles.logisticsPanelTitle}>{title}</Text>
      </View>
      <Text style={styles.logisticsPanelText}>{normalizeApiText(body)}</Text>
    </View>
  );
}

function LogisticsBulletList({
  title,
  items,
  empty,
  tone = 'normal',
}: {
  title: string;
  items: string[];
  empty: string;
  tone?: 'normal' | 'warning';
}) {
  const visibleItems = items.map(normalizeApiText).filter(Boolean);

  return (
    <View style={[styles.logisticsPanel, tone === 'warning' ? styles.logisticsPanelWarning : null]}>
      <View style={styles.logisticsPanelHeader}>
        <LogisticsIcon title={title} warning={tone === 'warning'} />
        <Text style={styles.logisticsPanelTitle}>{title}</Text>
      </View>
      {visibleItems.length > 0 ? (
        <View style={styles.logisticsBulletList}>
          {visibleItems.slice(0, 4).map((item) => (
            <View key={item} style={styles.logisticsBullet}>
              <View style={[styles.logisticsBulletDot, tone === 'warning' ? styles.logisticsBulletDotWarning : null]} />
              <Text style={styles.logisticsBulletText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.logisticsPanelText}>{empty}</Text>
      )}
    </View>
  );
}

function LogisticsIcon({ title, warning = false }: { title: string; warning?: boolean }) {
  return (
    <MaterialCommunityIcons
      name={logisticsIconName(title) as never}
      color={warning ? colors.noGo : colors.accent}
      size={18}
    />
  );
}

function TripPlanningCard({ detail }: { detail: RiverDetailApiResult }) {
  const logistics = detail.river.logistics;
  const rows = [
    { label: 'Shuttle', value: shortLogisticsValue(logistics?.shuttle), icon: 'car' },
    { label: 'Permits', value: shortLogisticsValue(logistics?.permits), icon: 'ticket-confirmation-outline' },
    { label: 'Camping', value: shortLogisticsValue(logistics?.camping), icon: 'tent' },
  ];

  return (
    <View style={styles.tripPlanningCard}>
      <Text style={styles.tripPlanningTitle}>Trip planning</Text>
      <View style={styles.tripPlanningRows}>
        {rows.map((row) => (
          <View key={row.label} style={styles.tripPlanningRow}>
            <MaterialCommunityIcons name={row.icon as never} color={colors.accent} size={18} />
            <Text style={styles.tripPlanningLabel}>{row.label}</Text>
            <Text style={styles.tripPlanningValue} numberOfLines={2}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function OutlookRows({ outlooks }: { outlooks: RiverOutlook[] }) {
  if (outlooks.length === 0) {
    return <Text style={styles.emptyText}>No forward outlooks are available for this route yet.</Text>;
  }

  return (
    <View style={styles.outlookList}>
      {outlooks.map((outlook) => (
        <View key={outlook.id} style={styles.outlookCard}>
          <View style={styles.outlookHeader}>
            <View style={styles.outlookTitleWrap}>
              <Text style={styles.outlookLabel}>{outlook.label}</Text>
              <Text style={styles.outlookAvailability}>
                {outlook.availability === 'available' ? 'Available' : 'Withheld'}
              </Text>
            </View>
            <View style={[styles.outlookScore, outlook.rating ? ratingBackground(outlook.rating) : styles.outlookScoreMuted]}>
              <Text style={styles.outlookScoreValue}>{outlook.score ?? '--'}</Text>
              <Text style={styles.outlookScoreLabel}>{outlook.rating ?? 'No call'}</Text>
            </View>
          </View>
          <Text style={styles.outlookText}>{normalizeApiText(outlook.explanation)}</Text>
          {outlook.confidence ? (
            <Text style={styles.outlookMeta}>{outlook.confidence} confidence</Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}

function HourlyWeatherStrip({ detail }: { detail: RiverDetailApiResult }) {
  const points = (detail.weather?.todayHourly ?? []).slice(0, 10);

  if (points.length === 0) {
    return <Text style={styles.emptyText}>Hourly weather is unavailable right now.</Text>;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weatherStrip}>
      {points.map((point, index) => (
        <View
          key={`${point.time}-${index}`}
          style={[
            styles.weatherCard,
            index === 0 ? styles.weatherCardCurrent : null,
          ]}
        >
          <Text style={styles.weatherHour}>{formatHourLabel(point.time, point.label)}</Text>
          <Text style={styles.weatherTemp}>{formatTemperature(point.temperatureF, '--')}</Text>
          <Text style={styles.weatherCondition}>
            {normalizeApiText(point.conditionLabel || 'Mixed')}
          </Text>
          <Text style={styles.weatherMeta}>
            {formatPercent(point.precipProbability, '0%')} rain
          </Text>
          <Text style={styles.weatherMeta}>
            {Math.round(point.windMph ?? 0)} mph wind
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

function WeatherDecisionCard({ detail }: { detail: RiverDetailApiResult }) {
  const model = weatherTimingModel(detail);

  if (!model) {
    return null;
  }

  return (
    <View style={styles.weatherDecisionPanel}>
      <View style={styles.weatherDecisionHeader}>
        <View style={styles.weatherDecisionTitleWrap}>
          <Text style={styles.weatherDecisionKicker}>Paddle window</Text>
          <Text style={styles.weatherDecisionTitle}>{model.title}</Text>
        </View>
        <View style={[styles.weatherDecisionBadge, model.badgeStyle]}>
          <MaterialCommunityIcons name={model.badgeIcon} color={colors.surfaceStrong} size={15} />
          <Text style={styles.weatherDecisionBadgeText}>{model.badgeLabel}</Text>
        </View>
      </View>
      <Text style={styles.weatherDecisionText}>{model.summary}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weatherTimeline}>
        {model.points.map((point, index) => {
          const risk = hourlyWeatherRisk(point);
          return (
            <View
              key={`${point.time}-${index}`}
              style={[
                styles.weatherTimelineCell,
                index === 0 ? styles.weatherTimelineCellCurrent : null,
                risk.level === 'watch' ? styles.weatherTimelineCellWatch : null,
                risk.level === 'skip' ? styles.weatherTimelineCellSkip : null,
              ]}
            >
              <Text style={styles.weatherTimelineHour}>{index === 0 ? 'Now' : formatHourLabel(point.time, point.label)}</Text>
              <MaterialCommunityIcons name={risk.icon} color={risk.color} size={18} />
              <Text style={styles.weatherTimelineRain}>{formatPercent(point.precipProbability, '0%')}</Text>
              <Text style={styles.weatherTimelineWind}>{Math.round(point.windMph ?? 0)} mph</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function GaugeTrendChart({ detail }: { detail: RiverDetailApiResult }) {
  const unit = detail.gauge?.unit ?? detail.river.gaugeSource.unit;
  const samples = (detail.gauge?.recentSamples ?? []).slice(-10);

  if (samples.length === 0) {
    return <Text style={styles.emptyText}>Recent gauge samples are unavailable right now.</Text>;
  }

  const values = samples.map((sample) => sample.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1);

  return (
    <View style={styles.gaugeChartWrap}>
      <View style={styles.gaugeSummaryRow}>
        <GaugeSummaryPill
          label={detail.river.gaugeSource.display.primaryMetricLabel || 'Current gauge'}
          value={detail.gauge ? formatGaugeValue(detail.gauge.current, detail.gauge.unit) : 'No reading'}
        />
        <GaugeSummaryPill
          label={detail.river.gaugeSource.unit === 'cfs' ? '24h flow change' : '24h gauge change'}
          value={
            detail.gauge?.delta24h !== null && detail.gauge
              ? formatGaugeValue(detail.gauge.delta24h, detail.gauge.unit, '0')
              : 'Unavailable'
          }
        />
      </View>

      <View style={styles.gaugeChart}>
        {samples.map((sample, index) => {
          const normalized = (sample.value - min) / span;
          const height = 26 + normalized * 96;
          const isLatest = index === samples.length - 1;
          return (
            <View key={`${sample.observedAt}-${index}`} style={styles.gaugeColumn}>
              <Text style={[styles.gaugeValue, isLatest ? styles.gaugeValueLatest : null]}>
                {compactGaugeSample(sample.value, unit)}
              </Text>
              <View style={styles.gaugeBarTrack}>
                <View
                  style={[
                    styles.gaugeBar,
                    { height },
                    isLatest ? styles.gaugeBarLatest : null,
                  ]}
                />
              </View>
              <Text style={styles.gaugeTime}>{formatShortTime(sample.observedAt)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function GaugeSummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.gaugeSummaryPill}>
      <Text style={styles.gaugeSummaryLabel}>{label}</Text>
      <Text style={styles.gaugeSummaryValue}>{value}</Text>
    </View>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricPill}>
      <Text style={styles.metricPillLabel} numberOfLines={1}>{label}</Text>
      <Text style={styles.metricPillValue} numberOfLines={2}>{value}</Text>
    </View>
  );
}

function HeroIconButton({
  icon,
  selected = false,
  accessibilityLabel,
  onPress,
}: {
  icon: string;
  selected?: boolean;
  accessibilityLabel: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.heroIconButton, selected ? styles.heroIconButtonSelected : null]}
      onPress={onPress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      android_ripple={{ color: colors.canvasMuted, borderless: true }}
    >
      <MaterialCommunityIcons name={icon as never} size={20} color={selected ? colors.surfaceStrong : colors.accent} />
    </Pressable>
  );
}

function DetailSectionTabs({
  activeSection,
  onSelect,
}: {
  activeSection: DetailSection;
  onSelect: (section: DetailSection) => void;
}) {
  return (
    <View style={styles.sectionTabs}>
      {DETAIL_SECTIONS.map((section) => {
        const selected = activeSection === section;
        return (
          <Pressable
            key={section}
            style={[styles.sectionTab, selected ? styles.sectionTabSelected : null]}
            hitSlop={4}
            pressRetentionOffset={8}
            android_ripple={{ color: selected ? 'rgba(255,255,255,0.16)' : colors.canvasMuted, borderless: false }}
            accessibilityRole="button"
            accessibilityLabel={`Show ${section} section`}
            accessibilityState={{ selected }}
            onPress={() => onSelect(section)}
          >
            <Text style={[styles.sectionTabText, selected ? styles.sectionTabTextSelected : null]}>{section}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function AlertSetupSheet({
  visible,
  routeName,
  routeReach,
  status,
  bottomInset,
  pendingThreshold,
  mutationPending,
  onClose,
  onNativeAlert,
}: {
  visible: boolean;
  routeName: string;
  routeReach: string;
  status: string;
  bottomInset: number;
  pendingThreshold: RiverAlertThreshold | null;
  mutationPending: boolean;
  onClose: () => void;
  onNativeAlert: (threshold: RiverAlertThreshold) => void;
}) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.alertSheetScrim}>
        <View style={[styles.alertSheet, { paddingBottom: spacing.md + bottomInset }]}>
          <View style={styles.alertSheetHandle} />
          <View style={styles.alertSheetHeader}>
            <View style={styles.alertSheetTitleWrap}>
              <Text style={styles.alertSheetKicker}>{routeName}</Text>
              <Text style={styles.alertSheetTitle}>Route alerts</Text>
              <Text style={styles.alertSheetSubtitle} numberOfLines={2}>
                Get notified when {routeReach} reaches Good or Strong.
              </Text>
            </View>
            <Pressable style={styles.alertSheetClose} onPress={onClose} accessibilityLabel="Close route alerts">
              <MaterialCommunityIcons name="close" color={colors.textMuted} size={20} />
            </Pressable>
          </View>

          <View style={styles.alertSheetSection}>
            <Text style={styles.alertSheetSectionTitle}>Phone notifications</Text>
            <View style={styles.alertButtonRow}>
              {(['good', 'strong'] as const).map((threshold) => {
                const isPending = pendingThreshold === threshold && mutationPending;
                return (
                  <Pressable
                    key={`native-${threshold}`}
                    style={[styles.alertButton, isPending ? styles.alertButtonDisabled : null]}
                    disabled={isPending}
                    onPress={() => onNativeAlert(threshold)}
                  >
                    <MaterialCommunityIcons name="bell-ring-outline" color={colors.surfaceStrong} size={16} />
                    <Text style={styles.alertButtonText}>
                      {isPending ? 'Saving...' : `At ${alertThresholdLabel(threshold)}`}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {status ? <Text style={styles.alertStatus}>{status}</Text> : null}
        </View>
      </View>
    </Modal>
  );
}

function ChecklistRow({ item }: { item: DecisionChecklistItem }) {
  return (
    <View style={styles.checklistRow}>
      <View style={[styles.checkStatus, checklistTone(item.status)]}>
        <Text style={styles.checkStatusText}>{item.status}</Text>
      </View>
      <View style={styles.checkCopy}>
        <Text style={styles.checkTitle}>{item.label}</Text>
        <Text style={styles.checkDetail}>{normalizeApiText(item.detail)}</Text>
      </View>
    </View>
  );
}

function AccessCard({
  label,
  point,
  emptyLabel,
}: {
  label: string;
  point: RiverAccessPoint | undefined;
  emptyLabel: string;
}) {
  const url = mapUrlForAccessPoint(point);

  return (
    <View style={styles.accessCard}>
      <Text style={styles.accessLabel}>{label}</Text>
      <Text style={styles.accessName}>{point?.name ?? emptyLabel}</Text>
      <Text style={styles.accessCoords}>
        {point?.latitude && point?.longitude
          ? `${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}`
          : 'Coordinates unavailable'}
      </Text>
      {url ? (
        <Pressable onPress={() => void Linking.openURL(url)}>
          <Text style={styles.linkText}>Open in maps</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function AccessPlanner({
  detail,
  points,
  selectedPutInId,
  selectedTakeOutId,
  onPutInChange,
  onTakeOutChange,
}: {
  detail: RiverDetailApiResult;
  points: RiverRouteAccessPoint[];
  selectedPutInId: string | null;
  selectedTakeOutId: string | null;
  onPutInChange: (point: RiverRouteAccessPoint) => void;
  onTakeOutChange: (point: RiverRouteAccessPoint) => void;
}) {
  if (points.length <= 2) {
    return null;
  }

  const selectedPutIn = points.find((point) => point.id === selectedPutInId) ?? points[0];
  const selectedTakeOut = points.find((point) => point.id === selectedTakeOutId) ?? points[points.length - 1];
  const distance = Math.max(0, selectedTakeOut.mileFromStart - selectedPutIn.mileFromStart);
  const distanceLabel = formatSegmentDistance(distance);
  const paddleTime = estimateSegmentPaddleTime(detail, distance);
  const takeOutOptions = points.filter((point) => point.mileFromStart > selectedPutIn.mileFromStart);

  return (
    <View style={styles.accessPlanner}>
      <View style={styles.accessPlannerHeader}>
        <View style={styles.accessPlannerTitleWrap}>
          <Text style={styles.accessPlannerKicker}>Access planner</Text>
          <Text style={styles.accessPlannerTitle}>Pick a shorter segment</Text>
        </View>
        <View style={styles.accessPlannerDistance}>
          <Text style={styles.accessPlannerDistanceValue}>{distanceLabel}</Text>
          <Text style={styles.accessPlannerDistanceLabel}>selected</Text>
        </View>
      </View>
      <Text style={styles.accessPlannerText}>
        This changes launch and take-out logistics, not today's river score.
      </Text>
      <AccessPointSelector
        label="Put-in"
        points={points.slice(0, -1)}
        selectedId={selectedPutIn.id}
        onSelect={onPutInChange}
      />
      <AccessPointSelector
        label="Take-out"
        points={takeOutOptions}
        selectedId={selectedTakeOut.id}
        onSelect={onTakeOutChange}
      />
      <AccessMetrics detail={detail} distanceLabel={distanceLabel} paddleTime={paddleTime} />
      <Text style={styles.accessPlannerSummary}>
        {selectedPutIn.name} to {selectedTakeOut.name}
        {selectedPutIn.note || selectedTakeOut.note ? ` - ${selectedPutIn.note ?? selectedTakeOut.note}` : ''}
      </Text>
      <Text style={styles.accessPlannerRoute}>Full route: {detail.river.distanceLabel || 'distance not tracked'}.</Text>
    </View>
  );
}

function AccessPointSelector({
  label,
  points,
  selectedId,
  onSelect,
}: {
  label: string;
  points: RiverRouteAccessPoint[];
  selectedId: string | null;
  onSelect: (point: RiverRouteAccessPoint) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedPoint = points.find((point) => point.id === selectedId) ?? points[0];

  return (
    <View style={styles.accessSelector}>
      <Text style={styles.accessSelectorLabel}>{label}</Text>
      <Pressable style={styles.accessDropdownButton} onPress={() => setOpen(true)}>
        <View style={styles.accessDropdownCopy}>
          <Text style={styles.accessDropdownValue} numberOfLines={2}>
            {selectedPoint?.name ?? 'Select access'}
          </Text>
          <Text style={styles.accessDropdownMeta}>
            {selectedPoint ? formatSegmentMile(selectedPoint.mileFromStart) : 'Choose an access point'}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-down" color={colors.accent} size={22} />
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.accessDropdownBackdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.accessDropdownSheet}>
            <View style={styles.accessDropdownSheetHeader}>
              <Text style={styles.accessDropdownSheetTitle}>{label}</Text>
              <Pressable style={styles.accessDropdownClose} onPress={() => setOpen(false)}>
                <MaterialCommunityIcons name="close" color={colors.textMuted} size={20} />
              </Pressable>
            </View>
            <ScrollView style={styles.accessDropdownList} contentContainerStyle={styles.accessDropdownListContent}>
              {points.map((point) => {
                const selected = point.id === selectedId;
                return (
                  <Pressable
                    key={`${label}-${point.id}`}
                    style={[styles.accessDropdownItem, selected ? styles.accessDropdownItemSelected : null]}
                    onPress={() => {
                      onSelect(point);
                      setOpen(false);
                    }}
                  >
                    <View style={styles.accessDropdownItemCopy}>
                      <Text
                        style={[styles.accessDropdownItemName, selected ? styles.accessDropdownItemNameSelected : null]}
                        numberOfLines={2}
                      >
                        {point.name}
                      </Text>
                      <Text style={[styles.accessDropdownItemMeta, selected ? styles.accessDropdownItemMetaSelected : null]}>
                        {formatSegmentMile(point.mileFromStart)}
                      </Text>
                    </View>
                    {selected ? <MaterialCommunityIcons name="check" color={colors.surfaceStrong} size={19} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function AccessMetrics({
  detail,
  distanceLabel,
  paddleTime,
}: {
  detail: RiverDetailApiResult;
  distanceLabel: string;
  paddleTime?: string;
}) {
  return (
    <View style={styles.accessMeta}>
      <MetricPill label="Distance" value={distanceLabel} />
      <MetricPill label="Paddle time" value={paddleTime || detail.river.estimatedPaddleTime || 'Not tracked'} />
      <MetricPill label="Difficulty" value={capitalize(detail.river.profile.difficulty)} />
      <MetricPill label="Camping" value={shortLogisticsValue(detail.river.logistics?.camping)} />
    </View>
  );
}

function RouteDirectionActions({
  putIn,
  takeOut,
}: {
  putIn: RiverAccessPoint | undefined;
  takeOut: RiverAccessPoint | undefined;
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
        <Text style={styles.directionsText}>
          Open driving directions from {putIn.name} to {takeOut.name}.
        </Text>
      </View>
      <View style={styles.directionsActions}>
        <Pressable style={styles.directionButton} onPress={() => void Linking.openURL(appleUrl)}>
          <Text style={styles.directionButtonText}>Apple</Text>
        </Pressable>
        <Pressable style={styles.directionButton} onPress={() => void Linking.openURL(googleUrl)}>
          <Text style={styles.directionButtonText}>Google</Text>
        </Pressable>
      </View>
    </View>
  );
}

function buildDetailRoutePoints(
  detail: RiverDetailApiResult,
  putIn: RiverAccessPoint | undefined = detail.river.putIn,
  takeOut: RiverAccessPoint | undefined = detail.river.takeOut
): RoutePlotPoint[] {
  const points: RoutePlotPoint[] = [];
  const selectedSpan = selectedSegmentSpanCoordinates(putIn, takeOut);

  if (hasCoordinates(putIn)) {
    points.push({
      id: 'put-in',
      label: putIn.name,
      latitude: putIn.latitude,
      longitude: putIn.longitude,
      rating: detail.rating,
      score: detail.score,
      meta: 'Put-in',
      spanCoordinates: selectedSpan,
    });
  }

  if (hasCoordinates(takeOut)) {
    points.push({
      id: 'take-out',
      label: takeOut.name,
      latitude: takeOut.latitude,
      longitude: takeOut.longitude,
      rating: detail.rating,
      score: detail.score,
      meta: 'Take-out',
    });
  }

  if (points.length === 0 && Number.isFinite(detail.river.latitude) && Number.isFinite(detail.river.longitude)) {
    points.push({
      id: 'route',
      label: detail.river.name,
      latitude: detail.river.latitude,
      longitude: detail.river.longitude,
      rating: detail.rating,
      score: detail.score,
      meta: detail.river.reach,
    });
  }

  return points;
}

function fullRouteSpanCoordinates(detail: RiverDetailApiResult): RouteSpanCoordinate[] | null {
  const accessCoordinates = routeAccessPoints(detail)
    .map(accessCoordinate)
    .filter(isRouteSpanCoordinate);

  if (accessCoordinates.length >= 2) {
    return accessCoordinates;
  }

  return selectedSegmentSpanCoordinates(detail.river.putIn, detail.river.takeOut);
}

function selectedSegmentSpanCoordinates(
  putIn: RiverAccessPoint | undefined,
  takeOut: RiverAccessPoint | undefined
): RouteSpanCoordinate[] | null {
  const putInCoordinate = accessCoordinate(putIn);
  const takeOutCoordinate = accessCoordinate(takeOut);

  if (!putInCoordinate || !takeOutCoordinate) {
    return null;
  }

  return [putInCoordinate, takeOutCoordinate];
}

function hasCoordinates(point: RiverAccessPoint | undefined): point is RiverAccessPoint & { latitude: number; longitude: number } {
  return Boolean(point && Number.isFinite(point.latitude) && Number.isFinite(point.longitude));
}

function accessCoordinate(point: { latitude?: number; longitude?: number } | null | undefined): RouteSpanCoordinate | null {
  if (!point || !Number.isFinite(point.latitude) || !Number.isFinite(point.longitude)) {
    return null;
  }

  return {
    latitude: point.latitude as number,
    longitude: point.longitude as number,
  };
}

function isRouteSpanCoordinate(coordinate: RouteSpanCoordinate | null): coordinate is RouteSpanCoordinate {
  return coordinate !== null;
}

function routeAccessPoints(detail: RiverDetailApiResult): RiverRouteAccessPoint[] {
  return (detail.river.accessPoints ?? []).slice().sort((left, right) => left.mileFromStart - right.mileFromStart);
}

function formatSegmentDistance(distance: number) {
  if (!Number.isFinite(distance) || distance <= 0) {
    return '0 mi';
  }

  return `${distance.toFixed(distance >= 10 ? 0 : 1).replace(/\.0$/, '')} mi`;
}

function formatSegmentMile(mile: number) {
  if (!Number.isFinite(mile)) {
    return 'Mile --';
  }

  return `Mile ${mile.toFixed(mile >= 10 ? 0 : 1).replace(/\.0$/, '')}`;
}

function estimateSegmentPaddleTime(detail: RiverDetailApiResult, distanceMiles: number) {
  const fullDistance =
    parseDistanceMiles(detail.river.distanceLabel) ??
    routeAccessPoints(detail).at(-1)?.mileFromStart ??
    null;
  const fullTime = parsePaddleTimeHours(detail.river.estimatedPaddleTime);

  if (!fullDistance || !fullTime || !Number.isFinite(distanceMiles) || distanceMiles <= 0) {
    return detail.river.estimatedPaddleTime || 'Not tracked';
  }

  const ratio = Math.min(1, Math.max(0, distanceMiles / fullDistance));
  return formatPaddleTimeRange(fullTime.min * ratio, fullTime.max * ratio);
}

function parseDistanceMiles(value: string) {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  if (!match) {
    return null;
  }

  const miles = Number(match[1]);
  return Number.isFinite(miles) && miles > 0 ? miles : null;
}

function parsePaddleTimeHours(value: string) {
  const numbers = value.match(/\d+(?:\.\d+)?/g)?.map(Number).filter(Number.isFinite) ?? [];
  if (numbers.length === 0) {
    return null;
  }

  const min = numbers[0];
  const max = numbers[1] ?? numbers[0];
  return min > 0 && max > 0 ? { min, max: Math.max(min, max) } : null;
}

function formatPaddleTimeRange(minHours: number, maxHours: number) {
  const min = Math.max(0.5, roundPaddleHours(minHours));
  const max = Math.max(min, roundPaddleHours(maxHours));

  if (min === max) {
    return `About ${formatPaddleHours(min)}`;
  }

  return `About ${formatPaddleHours(min)} to ${formatPaddleHours(max)}`;
}

function roundPaddleHours(hours: number) {
  if (!Number.isFinite(hours)) {
    return 0.5;
  }

  return Math.round(hours * 2) / 2;
}

function formatPaddleHours(hours: number) {
  if (hours < 1) {
    return '30 min';
  }

  return `${hours.toFixed(hours % 1 === 0 ? 0 : 1)} hr`;
}

function openPrimaryDirections(
  detail: RiverDetailApiResult,
  putIn: RiverAccessPoint | undefined = detail.river.putIn,
  takeOut: RiverAccessPoint | undefined = detail.river.takeOut
) {
  const url = mapUrlForAccessPoint(putIn) || mapUrlForAccessPoint(takeOut);
  if (url) {
    trackAppEvent('directions_opened', {
      slug: detail.river.slug,
      target: putIn ? 'put_in' : 'take_out',
    });
    void Linking.openURL(url);
  }
}

function openGaugeSource(detail: RiverDetailApiResult, url: string, target: 'detail' | 'hydrograph') {
  trackAppEvent('gauge_source_opened', {
    slug: detail.river.slug,
    provider: detail.river.gaugeSource.provider,
    target,
  });
  void Linking.openURL(url);
}

async function shareRoute(detail: RiverDetailApiResult) {
  const url = `https://paddletoday.com/rivers/${detail.river.slug}/`;
  const title = `${detail.river.name}: ${detail.river.reach}`;
  const message = `${title}\n${verdictForRating(detail.rating)} - ${detailMessageForRating(detail.rating)}\n${url}`;

  try {
    trackAppEvent('route_share_started', {
      slug: detail.river.slug,
      rating: detail.rating,
    });
    await Share.share(
      Platform.select({
        ios: { title, url },
        default: { title, message },
      }) ?? { title, message }
    );
    trackAppEvent('route_share_completed', {
      slug: detail.river.slug,
    });
  } catch (error) {
    captureAppException(error, {
      name: 'route_share_failed',
      extra: {
        slug: detail.river.slug,
      },
    });
  }
}

function CommunityPhotoCard({ photo }: { photo: ApprovedCommunityPhoto }) {
  const imageUrl = resolveApiUrl(photo.src);

  return (
    <Pressable style={styles.communityPhotoCard} onPress={() => void Linking.openURL(imageUrl)}>
      <Image source={{ uri: imageUrl }} style={styles.communityPhotoImage} resizeMode="cover" />
      <Text style={styles.communityPhotoCaption} numberOfLines={2}>
        {normalizeApiText(photo.caption || 'Approved route photo')}
      </Text>
      <Text style={styles.communityPhotoMeta} numberOfLines={1}>
        {photo.credit ? `Photo by ${photo.credit}` : 'Approved photo'}
      </Text>
    </Pressable>
  );
}

function CommunityReportCard({ report }: { report: ApprovedTripReport }) {
  const metaBits = [formatTripDate(report.tripDate), sentimentLabel(report.sentiment), report.contributorName].filter(Boolean);

  return (
    <View style={styles.communityReportCard}>
      <View style={styles.communityReportHeader}>
        <Text style={styles.communityReportTitle}>{metaBits[0] || 'Recent paddle'}</Text>
        <Text style={styles.communityReportAge}>{ageLabel(report.approvedAt)}</Text>
      </View>
      {metaBits.length > 1 ? (
        <Text style={styles.communityReportMeta}>{metaBits.slice(1).join(' / ')}</Text>
      ) : null}
      <Text style={styles.communityReportBody}>{normalizeApiText(report.report)}</Text>
      {report.notes ? <Text style={styles.communityReportNotes}>{normalizeApiText(report.notes)}</Text> : null}
      {report.photos?.length ? (
        <Text style={styles.communityReportPhotos}>{report.photos.length} photo{report.photos.length === 1 ? '' : 's'} attached</Text>
      ) : null}
    </View>
  );
}

function weatherValue(detail: RiverDetailApiResult) {
  if (!detail.weather) {
    return 'Weather unavailable';
  }

  return normalizeApiText(
    [
      formatTemperature(detail.weather.temperatureF, 'No air temp'),
      `${formatPercent(detail.weather.next12hPrecipProbabilityMax, '0%')} rain`,
      `${Math.round(detail.weather.next12hWindMphMax ?? detail.weather.windMph ?? 0)} mph wind`,
      detail.weather.recentRain24hIn ? `${formatRainInches(detail.weather.recentRain24hIn)} recent rain` : null,
    ]
      .filter(Boolean)
      .join(' - ')
  );
}

function compactWeatherValue(detail: RiverDetailApiResult) {
  if (!detail.weather) {
    return 'Unknown';
  }

  const temp = formatTemperature(detail.weather.temperatureF, '--');
  const wind = Math.round(detail.weather.next12hWindMphMax ?? detail.weather.windMph ?? 0);
  const rain = formatPercent(detail.weather.next12hPrecipProbabilityMax, '0%');
  return `${temp} / ${wind} mph / ${rain}`;
}

function trendSubvalue(detail: RiverDetailApiResult) {
  if (!detail.gauge) {
    return 'Recent samples unavailable';
  }

  if (detail.gauge.changePercent24h !== null) {
    return `${formatPercent(detail.gauge.changePercent24h)} over 24h`;
  }

  if (detail.gauge.delta24h !== null) {
    return `${formatGaugeValue(detail.gauge.delta24h, detail.gauge.unit, '0')} over 24h`;
  }

  return '24h change unavailable';
}

function weatherSubvalue(detail: RiverDetailApiResult) {
  if (!detail.weather) {
    return 'No forecast';
  }

  return normalizeApiText(detail.weather.conditionLabel || detail.weather.rainTimingLabel || 'Today');
}

function weatherTimingModel(detail: RiverDetailApiResult) {
  const weather = detail.weather;
  const points = (weather?.todayHourly ?? []).slice(0, 8);

  if (!weather || points.length === 0) {
    return null;
  }

  const firstRiskIndex = points.findIndex((point) => hourlyWeatherRisk(point).level !== 'clear');
  const firstRiskPoint = firstRiskIndex >= 0 ? points[firstRiskIndex] : null;
  const firstRisk = firstRiskPoint ? hourlyWeatherRisk(firstRiskPoint) : null;
  const stormRisk = weather.next12hStormRisk || points.some((point) => hourlyWeatherRisk(point).kind === 'storm');
  const riskStartsLater = firstRiskIndex >= 3;
  const noEarlyRisk = firstRiskIndex === -1 || riskStartsLater;
  const firstRiskTime = firstRiskPoint ? formatHourLabel(firstRiskPoint.time, firstRiskPoint.label) : null;
  const riskLabel = firstRisk?.kind === 'storm' ? 'storm risk' : firstRisk?.kind === 'rain' ? 'rain risk' : 'wind';

  if (firstRiskIndex === -1) {
    return {
      points,
      title: 'No early weather block',
      summary: 'No rain, storm, or wind spike is showing in the next few hours. Still re-check before launch.',
      badgeLabel: 'Open',
      badgeIcon: 'check-circle' as const,
      badgeStyle: styles.weatherDecisionBadgeGood,
    };
  }

  if (noEarlyRisk && firstRiskTime) {
    return {
      points,
      title: `Aim to be off before ${firstRiskTime}`,
      summary: `${normalizeApiText(riskLabel)} starts later in the forecast. A short paddle may still fit if shuttle, pace, and exit timing are conservative.`,
      badgeLabel: stormRisk ? 'Storm later' : 'Later risk',
      badgeIcon: stormRisk ? 'weather-lightning' as const : 'clock-outline' as const,
      badgeStyle: styles.weatherDecisionBadgeWatch,
    };
  }

  return {
    points,
    title: firstRiskTime ? `Weather risk near ${firstRiskTime}` : 'Weather needs attention',
    summary: stormRisk
      ? 'Storm risk is close enough that this should be treated as a launch-time safety check, not just an afternoon forecast note.'
      : 'Rain or wind risk is early in the forecast. Confirm the latest radar and be ready to shorten or skip.',
    badgeLabel: stormRisk ? 'Storm watch' : 'Check now',
    badgeIcon: stormRisk ? 'weather-lightning' as const : 'alert-circle' as const,
    badgeStyle: styles.weatherDecisionBadgeSkip,
  };
}

function hourlyWeatherRisk(point: HourlyWeatherPoint): {
  level: 'clear' | 'watch' | 'skip';
  kind: 'clear' | 'rain' | 'storm' | 'wind';
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
} {
  const condition = point.conditionLabel ?? '';
  const rain = point.precipProbability ?? 0;
  const wind = Math.max(point.windMph ?? 0, point.windGustMph ?? 0);

  if (/(storm|thunder)/i.test(condition)) {
    return { level: 'skip', kind: 'storm', icon: 'weather-lightning', color: colors.noGo };
  }

  if (rain >= 60 || (point.precipitationIn ?? 0) >= 0.08) {
    return { level: 'skip', kind: 'rain', icon: 'weather-pouring', color: colors.noGo };
  }

  if (wind >= 20) {
    return { level: 'skip', kind: 'wind', icon: 'weather-windy', color: colors.noGo };
  }

  if (rain >= 35 || (point.precipitationIn ?? 0) >= 0.02 || /(rain|showers)/i.test(condition)) {
    return { level: 'watch', kind: 'rain', icon: 'weather-rainy', color: colors.fair };
  }

  if (wind >= 14) {
    return { level: 'watch', kind: 'wind', icon: 'weather-windy', color: colors.fair };
  }

  return { level: 'clear', kind: 'clear', icon: 'weather-partly-cloudy', color: colors.accent };
}

function formatHourLabel(value: string, defaultLabel: string | null | undefined) {
  const parsed = new Date(value);
  if (Number.isFinite(parsed.getTime())) {
    return parsed.toLocaleTimeString('en-US', {
      hour: 'numeric',
    });
  }

  return defaultLabel ? normalizeApiText(defaultLabel) : 'Later';
}

function formatShortTime(value: string) {
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) {
    return '--';
  }

  return parsed.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function compactGaugeSample(value: number, unit: RiverDetailApiResult['river']['gaugeSource']['unit']) {
  if (unit === 'ft') {
    return value.toFixed(2).replace(/\.00$/, '');
  }

  const rounded = Math.round(value);
  if (rounded >= 1000) {
    return `${(rounded / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }

  return `${rounded}`;
}

function routeTypeLabel(value: RiverDetailApiResult['river']['routeType']) {
  return value
    .split('-')
    .map(capitalize)
    .join(' ');
}

function thresholdRangeLabel(detail: RiverDetailApiResult) {
  const unit = detail.river.gaugeSource.unit;
  const { idealMin, idealMax, tooLow, tooHigh, thresholdModel } = detail.river.profile;

  if (thresholdModel === 'two-sided' && typeof idealMin === 'number' && typeof idealMax === 'number') {
    return `ideal around ${formatGaugeValue(idealMin, unit)} to ${formatGaugeValue(idealMax, unit)}`;
  }

  if (typeof tooLow === 'number') {
    return `minimum around ${formatGaugeValue(tooLow, unit)}`;
  }

  if (typeof tooHigh === 'number') {
    return `high-water caution around ${formatGaugeValue(tooHigh, unit)}`;
  }

  return 'threshold details are still being refined';
}

function gaugeBandVisualModel(detail: RiverDetailApiResult): GaugeBandVisualModel | null {
  const gauge = detail.gauge;
  const unit = detail.river.gaugeSource.unit;
  const { idealMin, idealMax, tooLow, tooHigh, thresholdModel } = detail.river.profile;

  if (
    !gauge ||
    thresholdModel !== 'two-sided' ||
    typeof idealMin !== 'number' ||
    typeof idealMax !== 'number' ||
    idealMax <= idealMin
  ) {
    return null;
  }

  const idealSpan = Math.max(idealMax - idealMin, 1);
  const lowEdge = typeof tooLow === 'number' && tooLow < idealMin ? tooLow : idealMin - idealSpan * 0.75;
  const highEdge = typeof tooHigh === 'number' && tooHigh > idealMax ? tooHigh : idealMax + idealSpan * 0.75;
  const rawMin = Math.min(lowEdge, idealMin, gauge.current);
  const rawMax = Math.max(highEdge, idealMax, gauge.current);
  const domainSpan = Math.max(rawMax - rawMin, 1);
  const domainMin = rawMin - domainSpan * 0.05;
  const domainMax = rawMax + domainSpan * 0.05;
  const domain = Math.max(domainMax - domainMin, 1);
  const percent = (value: number) => clampToRange(((value - domainMin) / domain) * 100, 0, 100);

  return {
    currentPercent: percent(gauge.current),
    idealLeftPercent: percent(idealMin),
    idealWidthPercent: Math.max(percent(idealMax) - percent(idealMin), 8),
    currentLabel: formatGaugeValue(gauge.current, gauge.unit),
    statusLabel: gaugeBandStatusLabel(detail, idealMin, idealMax),
    targetRangeLabel: `${formatGaugeValue(idealMin, unit)} to ${formatGaugeValue(idealMax, unit)}`,
    lowLabel: formatGaugeValue(lowEdge, unit),
    idealLabel: 'Target',
    highLabel: formatGaugeValue(highEdge, unit),
    markerTone: gaugeBandMarkerTone(detail.gaugeBand),
  };
}

function gaugeBandStatusLabel(detail: RiverDetailApiResult, idealMin: number, idealMax: number) {
  const current = detail.gauge?.current;

  if (typeof current !== 'number') {
    return detail.gaugeBandLabel;
  }

  if (current < idealMin) {
    return 'Below target band';
  }

  if (current > idealMax) {
    return 'Above target band';
  }

  const position = (current - idealMin) / Math.max(idealMax - idealMin, 1);

  if (position < 0.35) {
    return 'Low side of target';
  }

  if (position > 0.65) {
    return 'High side of target';
  }

  return 'Middle of target';
}

function gaugeBandMarkerTone(gaugeBand: RiverDetailApiResult['gaugeBand']) {
  if (gaugeBand === 'too-low' || gaugeBand === 'too-high') {
    return styles.conditionSkip;
  }

  if (gaugeBand === 'low-shoulder' || gaugeBand === 'high-shoulder' || gaugeBand === 'minimum-met') {
    return styles.conditionWatch;
  }

  return styles.conditionGood;
}

function clampToRange(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function shortLogisticsValue(value: string | null | undefined) {
  const normalized = normalizeApiText(value);
  if (!normalized) {
    return 'Not tracked';
  }

  if (/^(none|no )/i.test(normalized)) {
    return 'None noted';
  }

  if (normalized.length <= 34) {
    return normalized;
  }

  return 'Details below';
}

function logisticsIconName(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes('watch')) return 'alert-outline';
  if (normalized.includes('camp')) return 'tent';
  if (normalized.includes('shuttle')) return 'car';
  if (normalized.includes('permit')) return 'ticket-confirmation-outline';
  if (normalized.includes('access')) return 'map-marker-alert-outline';
  return 'information-outline';
}

function ratingBackground(rating: string) {
  if (rating === 'Strong') return { backgroundColor: '#E0EFE9' };
  if (rating === 'Good') return { backgroundColor: '#E8EFD9' };
  if (rating === 'Fair') return { backgroundColor: '#F3E8CC' };
  return { backgroundColor: '#F2DDD6' };
}

function checklistTone(status: DecisionChecklistItem['status']) {
  if (status === 'go') return { backgroundColor: '#E0EFE9' };
  if (status === 'watch') return { backgroundColor: '#F3E8CC' };
  return { backgroundColor: '#F2DDD6' };
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

function formatTripDate(value: string) {
  if (!value) {
    return '';
  }

  const parsed = new Date(`${value}T12:00:00`);
  if (!Number.isFinite(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function sentimentLabel(value: string) {
  switch ((value || '').trim().toLowerCase()) {
    case 'great':
      return 'Great day';
    case 'good':
      return 'Good day';
    case 'mixed':
      return 'Mixed day';
    case 'rough':
      return 'Rough day';
    default:
      return '';
  }
}

function ageLabel(value: string) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return 'Recent';
  }

  const diffHours = Math.max(0, Math.round((Date.now() - timestamp) / (1000 * 60 * 60)));
  if (diffHours < 24) {
    return `${diffHours || 1}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays}d ago`;
  }

  const diffMonths = Math.round(diffDays / 30);
  return `${diffMonths}mo ago`;
}

const styles = StyleSheet.create({
  screenSafeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  hero: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  heroHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  heroScore: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: colors.accentDeep,
    fontSize: 24,
    fontWeight: '800',
  },
  scoreLabel: {
    color: colors.textMuted,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  heroCopy: {
    flex: 1,
    gap: 4,
  },
  heroTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  heroTitleCopy: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: spacing.xs,
  },
  heroIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroIconButtonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  routeMetaLine: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  shareStatus: {
    color: colors.accentDeep,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
  },
  decisionSummary: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  decisionSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  decisionSummaryLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  decisionSummaryScore: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '900',
  },
  decisionSummaryTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '900',
  },
  scoreWhyCard: {
    borderRadius: radius.md,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.sm,
    gap: 6,
  },
  scoreWhyHeader: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  scoreWhyHeaderCopy: {
    flex: 1,
    gap: 2,
  },
  scoreWhyToggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  scoreWhyTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  scoreWhySummary: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  scoreWhyRows: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  scoreWhyRow: {
    minWidth: 68,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 2,
  },
  scoreWhyLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  scoreWhyValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  scoreCapList: {
    gap: 2,
  },
  scoreCapText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  decisionBulletList: {
    gap: spacing.xs,
  },
  decisionBullet: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  decisionBulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  decisionBulletCopy: {
    flex: 1,
    gap: 2,
  },
  decisionBulletLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  decisionBulletText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  decisionStrip: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    gap: spacing.xs,
  },
  decisionStripInlineAction: {
    flex: 1,
    minWidth: 0,
    minHeight: 62,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: spacing.xs,
  },
  decisionStripInlineActionText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '900',
  },
  heroFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  heroFooterText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  heroFooterWarning: {
    color: colors.noGo,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  sectionTabsSticky: {
    backgroundColor: colors.canvas,
    paddingVertical: spacing.xs,
    zIndex: 30,
    elevation: 16,
    overflow: 'visible',
  },
  sectionTabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
    gap: 3,
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  sectionTab: {
    flex: 1,
    minHeight: 38,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  sectionTabSelected: {
    backgroundColor: colors.accent,
  },
  sectionTabText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
  },
  sectionTabTextSelected: {
    color: colors.surfaceStrong,
  },
  conditionList: {
    gap: spacing.sm,
  },
  conditionRow: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  conditionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionGood: {
    backgroundColor: colors.strong,
  },
  conditionWatch: {
    backgroundColor: colors.fair,
  },
  conditionSkip: {
    backgroundColor: colors.noGo,
  },
  conditionCopy: {
    flex: 1,
    gap: 3,
  },
  conditionLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  conditionValue: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
  },
  conditionSubvalue: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
  },
  conditionDetail: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  gaugeBandPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.md,
    gap: spacing.md,
  },
  gaugeBandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  gaugeBandTitleWrap: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  gaugeBandKicker: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  gaugeBandStatus: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
  },
  gaugeBandRange: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
  },
  gaugeBandCurrentPill: {
    minWidth: 78,
    borderRadius: radius.pill,
    paddingHorizontal: 11,
    paddingVertical: 7,
    alignItems: 'center',
  },
  gaugeBandCurrentText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  gaugeBandMeter: {
    gap: spacing.sm,
  },
  gaugeBandTrack: {
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
  },
  gaugeBandIdealSegment: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: '#A8C1B7',
  },
  gaugeBandMarker: {
    position: 'absolute',
    top: -4,
    width: 10,
    height: 24,
    marginLeft: -5,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.surfaceStrong,
  },
  gaugeBandLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  gaugeBandLabel: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '800',
  },
  gaugeBandLabelCenter: {
    flex: 1.4,
    color: colors.accentDeep,
    textAlign: 'center',
  },
  gaugeBandLabelRight: {
    textAlign: 'right',
  },
  sourceActionsPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  sourceActionsCopy: {
    flex: 1,
    gap: 2,
  },
  sourceActionsTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  sourceActionsText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  sourceActionsButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sourceActionButton: {
    minHeight: 38,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surface,
    paddingHorizontal: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sourceActionText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  routeBasicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  routeBasicCell: {
    width: '48%',
    minHeight: 70,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    justifyContent: 'center',
    gap: 4,
  },
  routeBasicLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 0,
  },
  routeBasicLabel: {
    flexShrink: 1,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  routeBasicValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
    flexShrink: 1,
  },
  routeInfoPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.md,
    gap: 3,
  },
  routeInfoTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  routeInfoText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  safetyPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.md,
    gap: spacing.sm,
  },
  safetyPanelCaution: {
    borderColor: '#D8A45E',
    backgroundColor: '#FFF5E5',
  },
  safetyPanelAdvanced: {
    borderColor: '#D99A86',
    backgroundColor: '#FBE9E4',
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  safetyHeaderText: {
    flex: 1,
    minWidth: 0,
  },
  safetyKicker: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  safetyTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900',
  },
  safetyBody: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  safetyChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  safetyChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    color: colors.text,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '900',
  },
  safetyNote: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  aboutRouteText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  logisticsPanel: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  logisticsPanelWarning: {
    backgroundColor: '#F7E9E3',
    borderWidth: 1,
    borderColor: '#E1B8A7',
  },
  logisticsPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logisticsPanelTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  logisticsPanelText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  logisticsBulletList: {
    gap: spacing.sm,
  },
  logisticsBullet: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  logisticsBulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accent,
    marginTop: 6,
  },
  logisticsBulletDotWarning: {
    backgroundColor: colors.noGo,
  },
  logisticsBulletText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  tripPlanningCard: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
  },
  tripPlanningTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  tripPlanningRows: {
    gap: spacing.xs,
  },
  tripPlanningRow: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  tripPlanningLabel: {
    width: 68,
    paddingTop: 2,
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tripPlanningValue: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
    textAlign: 'right',
  },
  outlookList: {
    gap: spacing.sm,
  },
  outlookCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  outlookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  outlookTitleWrap: {
    flex: 1,
    gap: 2,
  },
  outlookLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  outlookAvailability: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  outlookScore: {
    minWidth: 58,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  outlookScoreMuted: {
    backgroundColor: colors.canvasMuted,
  },
  outlookScoreValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  outlookScoreLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  outlookText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  outlookMeta: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  checklist: {
    gap: spacing.md,
  },
  checklistRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  checkStatus: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  checkStatusText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  checkCopy: {
    flex: 1,
    gap: 3,
  },
  checkTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  checkDetail: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  accessBlock: {
    gap: spacing.md,
  },
  accessPlanner: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.md,
    gap: spacing.sm,
  },
  accessPlannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  accessPlannerTitleWrap: {
    flex: 1,
    gap: 2,
  },
  accessPlannerKicker: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  accessPlannerTitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
  },
  accessPlannerDistance: {
    minWidth: 72,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  accessPlannerDistanceValue: {
    color: colors.accentDeep,
    fontSize: 17,
    fontWeight: '900',
  },
  accessPlannerDistanceLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  accessPlannerText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  accessSelector: {
    gap: spacing.xs,
  },
  accessSelectorLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  accessDropdownButton: {
    minHeight: 58,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  accessDropdownCopy: {
    flex: 1,
    gap: 3,
  },
  accessDropdownValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  accessDropdownMeta: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  accessDropdownBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.36)',
    justifyContent: 'flex-end',
  },
  accessDropdownSheet: {
    maxHeight: '72%',
    backgroundColor: colors.surfaceStrong,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  accessDropdownSheetHeader: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  accessDropdownSheetTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  accessDropdownClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessDropdownList: {
    maxHeight: 420,
  },
  accessDropdownListContent: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  accessDropdownItem: {
    minHeight: 62,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  accessDropdownItemSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  accessDropdownItemCopy: {
    flex: 1,
    gap: 3,
  },
  accessDropdownItemName: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  accessDropdownItemNameSelected: {
    color: colors.surfaceStrong,
  },
  accessDropdownItemMeta: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  accessDropdownItemMetaSelected: {
    color: colors.surfaceStrong,
  },
  accessPlannerSummary: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  accessPlannerRoute: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  accessCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
  },
  accessLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  accessName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  accessCoords: {
    color: colors.textMuted,
    fontSize: 13,
  },
  linkText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  directionsPanel: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  directionsCopy: {
    gap: 2,
  },
  directionsTitle: {
    color: colors.accentDeep,
    fontSize: 15,
    fontWeight: '900',
  },
  directionsText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
  directionsActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  directionButton: {
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingVertical: 10,
    alignItems: 'center',
  },
  directionButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  accessMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metricPill: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
    minWidth: 116,
    flexGrow: 1,
    flexBasis: 116,
  },
  metricPillLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontWeight: '900',
  },
  metricPillValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
  },
  alertCta: {
    minHeight: 70,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#BFD6CC',
    backgroundColor: colors.accentSoft,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  alertCtaIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertCtaCopy: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  alertCtaTitle: {
    color: colors.accentDeep,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '900',
  },
  alertCtaText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  alertSheetScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(10, 24, 29, 0.34)',
  },
  alertSheet: {
    maxHeight: '88%',
    backgroundColor: colors.surfaceStrong,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  alertSheetHandle: {
    alignSelf: 'center',
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
  },
  alertSheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  alertSheetTitleWrap: {
    flex: 1,
    minWidth: 0,
    gap: 3,
  },
  alertSheetKicker: {
    color: colors.accentDeep,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  alertSheetTitle: {
    color: colors.text,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '900',
  },
  alertSheetSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  alertSheetClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertSheetSection: {
    gap: spacing.sm,
  },
  alertSheetSectionTitle: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '900',
  },
  alertButtonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  alertButton: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  alertButtonDisabled: {
    opacity: 0.6,
  },
  alertButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  alertStatus: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  alertHelper: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  communityPhotoStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  communityPhotoCard: {
    width: 156,
    gap: 6,
  },
  communityPhotoImage: {
    width: 156,
    height: 108,
    borderRadius: radius.md,
    backgroundColor: colors.canvasMuted,
  },
  communityPhotoCaption: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  communityPhotoMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  communityReportList: {
    gap: spacing.md,
  },
  communityReportCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
  },
  communityReportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  communityReportTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
  },
  communityReportAge: {
    color: colors.textMuted,
    fontSize: 12,
  },
  communityReportMeta: {
    color: colors.textMuted,
    fontSize: 13,
  },
  communityReportBody: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  communityReportNotes: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  communityReportPhotos: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '700',
  },
  quickPhotoForm: {
    gap: spacing.sm,
  },
  quickPhotoInputGrid: {
    gap: spacing.sm,
  },
  quickPhotoInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  quickPhotoPanel: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  quickPhotoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  quickPhotoCopy: {
    flex: 1,
    gap: 3,
  },
  quickPhotoTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  quickPhotoMeta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  quickPhotoAddButton: {
    minHeight: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickPhotoAddText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  quickPhotoButtonDisabled: {
    opacity: 0.6,
  },
  quickPhotoStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  quickPhotoThumbCard: {
    width: 104,
    gap: 6,
  },
  quickPhotoThumb: {
    width: 104,
    height: 82,
    borderRadius: radius.md,
    backgroundColor: colors.canvasMuted,
  },
  quickPhotoRemove: {
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    backgroundColor: colors.surfaceStrong,
  },
  quickPhotoRemoveText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  quickPhotoEmpty: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  quickPhotoConsentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  quickPhotoCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  quickPhotoCheckboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  quickPhotoConsentText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  quickPhotoSubmitButton: {
    minHeight: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  quickPhotoSubmitText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  quickPhotoStatus: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  reportCta: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#BFD6CC',
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  reportCtaCopy: {
    flex: 1,
    gap: 3,
  },
  reportCtaTitle: {
    color: colors.accentDeep,
    fontSize: 15,
    fontWeight: '900',
  },
  reportCtaText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
  reportCtaButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  reportCtaButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  riverHubLink: {
    minHeight: 68,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  riverHubLinkIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riverHubLinkCopy: {
    flex: 1,
    gap: 2,
  },
  riverHubLinkTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  riverHubLinkText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  weatherStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  weatherCard: {
    width: 102,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  weatherCardCurrent: {
    backgroundColor: colors.accentSoft,
    borderColor: '#BFD6CC',
  },
  weatherHour: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  weatherTemp: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  weatherCondition: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    minHeight: 36,
  },
  weatherMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  weatherDecisionPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.md,
    gap: spacing.md,
  },
  weatherDecisionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  weatherDecisionTitleWrap: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  weatherDecisionKicker: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  weatherDecisionTitle: {
    color: colors.text,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
  },
  weatherDecisionText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  weatherDecisionBadge: {
    minHeight: 30,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  weatherDecisionBadgeGood: {
    backgroundColor: colors.strong,
  },
  weatherDecisionBadgeWatch: {
    backgroundColor: colors.fair,
  },
  weatherDecisionBadgeSkip: {
    backgroundColor: colors.noGo,
  },
  weatherDecisionBadgeText: {
    color: colors.surfaceStrong,
    fontSize: 11,
    fontWeight: '900',
  },
  weatherTimeline: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  weatherTimelineCell: {
    width: 72,
    minHeight: 92,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  weatherTimelineCellCurrent: {
    borderColor: '#BFD6CC',
    backgroundColor: colors.accentSoft,
  },
  weatherTimelineCellWatch: {
    borderColor: 'rgba(138, 106, 42, 0.46)',
    backgroundColor: '#F7EEDB',
  },
  weatherTimelineCellSkip: {
    borderColor: 'rgba(140, 74, 54, 0.5)',
    backgroundColor: '#F5E2D9',
  },
  weatherTimelineHour: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  weatherTimelineRain: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  weatherTimelineWind: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  gaugeChartWrap: {
    gap: spacing.md,
  },
  gaugeSummaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  gaugeSummaryPill: {
    backgroundColor: colors.canvasMuted,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  gaugeSummaryLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  gaugeSummaryValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  gaugeChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    minHeight: 150,
  },
  gaugeColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  gaugeValue: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  gaugeValueLatest: {
    color: colors.accentDeep,
  },
  gaugeBarTrack: {
    height: 124,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  gaugeBar: {
    width: '100%',
    maxWidth: 18,
    minHeight: 14,
    borderRadius: 999,
    backgroundColor: '#A8C1B7',
  },
  gaugeBarLatest: {
    backgroundColor: colors.accent,
  },
  gaugeTime: {
    color: colors.textMuted,
    fontSize: 11,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  centerState: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  stateTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  stateBody: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  stateMeta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
  stateButton: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
});
