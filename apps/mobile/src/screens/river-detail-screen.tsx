import type {
  ApprovedCommunityPhoto,
  ApprovedTripReport,
  DecisionChecklistItem,
  RiverAccessPoint,
  RiverAlertThreshold,
  CreateRouteContributionRequest,
  RiverDetailApiResult,
  RiverOutlook,
} from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  ViewStyle,
  View,
} from 'react-native';
import {
  useCreateRiverAlertMutation,
  useCreateRouteContributionMutation,
  useRiverDetailQuery,
  useRiverHistoryQuery,
  useRouteCommunityQuery,
} from '../api/queries';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HistoryBars } from '../components/history-bars';
import { AppErrorState, AppLoadingState } from '../components/app-state';
import { RatingPill } from '../components/rating-pill';
import { RouteReportSheet, type SelectedReportPhoto } from '../components/route-report-sheet';
import { RoutePlotMap, type RoutePlotPoint } from '../components/route-plot-map';
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
import { captureAppException, trackAppEvent } from '../lib/observability';
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

const ROUTE_REPORT_MAX_PHOTOS = 4;
const ROUTE_REPORT_MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const ROUTE_REPORT_ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const DETAIL_SECTIONS = ['Today', 'Access', 'Reports', 'More'] as const;

type DetailSection = (typeof DETAIL_SECTIONS)[number];

export default function RiverDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const insets = useSafeAreaInsets();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
  const detailQuery = useRiverDetailQuery(slug);
  const historyQuery = useRiverHistoryQuery(slug, 7);
  const communityQuery = useRouteCommunityQuery(slug);
  const createAlertMutation = useCreateRiverAlertMutation();
  const createContributionMutation = useCreateRouteContributionMutation();
  const { email: storedEmail, setEmail } = useAlertPreferences();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [draftEmail, setDraftEmail] = useState(storedEmail);
  const [alertStatus, setAlertStatus] = useState('Alerts only email on a new threshold crossing.');
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
  const [activeSection, setActiveSection] = useState<DetailSection>('Today');
  const [reportSheetVisible, setReportSheetVisible] = useState(false);

  const detail = detailQuery.data?.result ?? null;
  const history = historyQuery.data?.result ?? null;
  const community = communityQuery.data ?? null;
  const checklist = useMemo(() => (detail ? detail.checklist.slice(0, 4) : []), [detail]);
  const routePlotPoints = useMemo(() => (detail ? buildDetailRoutePoints(detail) : []), [detail]);
  const communityReports = community?.reports ?? [];
  const communityPhotos = community?.photos ?? [];

  useEffect(() => {
    setDraftEmail(storedEmail);
    setReportEmail((current) => current || storedEmail);
  }, [storedEmail]);

  useEffect(() => {
    if (!detail) {
      return;
    }

    trackAppEvent('route_opened', {
      slug: detail.river.slug,
      riverId: detail.river.riverId,
      rating: detail.rating,
      score: detail.score,
    });
  }, [detail]);

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
  async function submitRiverAlert(threshold: RiverAlertThreshold) {
    const email = draftEmail.trim().toLowerCase();
    if (!isValidEmailAddress(email)) {
      setAlertStatus('Enter a valid email address before turning on alerts.');
      return;
    }

    setPendingThreshold(threshold);
    try {
      trackAppEvent('alert_create_started', {
        slug: riverSlug,
        threshold,
      });
      await setEmail(email);
      const response = await createAlertMutation.mutateAsync({
        email,
        riverSlug,
        threshold,
      });
      trackAppEvent('alert_create_succeeded', {
        slug: riverSlug,
        threshold,
        duplicate: response.duplicate,
        reactivated: response.reactivated,
      });
      setAlertStatus(alertMutationMessage(response, threshold));
    } catch (error) {
      captureAppException(error, {
        name: 'alert_create_failed',
        extra: {
          slug: riverSlug,
          threshold,
        },
      });
      setAlertStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : `Could not save the ${alertThresholdLabel(threshold)} alert right now.`
      );
    } finally {
      setPendingThreshold(null);
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

      result.assets.slice(0, remainingSlots).forEach((asset, index) => {
        const normalized = normalizeReportPhotoAsset(asset, index);
        if (normalized) {
          selected.push(normalized);
        } else {
          skipped += 1;
        }
      });

      if (selected.length > 0) {
        setReportPhotos((current) => [...current, ...selected].slice(0, ROUTE_REPORT_MAX_PHOTOS));
        setReportStatus(
          skipped > 0
            ? `Added ${selected.length} photo${selected.length === 1 ? '' : 's'}. Some files were skipped.`
            : `Added ${selected.length} photo${selected.length === 1 ? '' : 's'}.`
        );
      } else if (skipped > 0) {
        setReportStatus('Those photos could not be attached. Use JPEG, PNG, or WebP under 4 MB.');
      }
    } catch {
      setReportStatus('Photos could not be opened. You can still send a text-only report.');
    }
  }

  function removeReportPhoto(id: string) {
    setReportPhotos((current) => current.filter((photo) => photo.id !== id));
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
    <>
      <Stack.Screen options={{ title: detail.river.name }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + Math.max(insets.bottom, spacing.md) }]}
        stickyHeaderIndices={[1]}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={detailQuery.isRefetching || historyQuery.isRefetching || communityQuery.isRefetching}
            onRefresh={() => Promise.all([detailQuery.refetch(), historyQuery.refetch(), communityQuery.refetch()])}
          />
        }
      >
        <View style={styles.hero}>
          <View style={styles.heroHeader}>
            <View style={styles.heroScore}>
              <Text style={styles.scoreValue}>{detail.score}</Text>
              <Text style={styles.scoreLabel}>Score</Text>
            </View>
            <View style={styles.heroCopy}>
              <View style={styles.heroTitleRow}>
                <View style={styles.heroTitleCopy}>
                  <Text style={styles.kicker}>{detail.river.name}</Text>
                  <Text style={styles.title}>{detail.river.reach}</Text>
                </View>
                <SaveToggleButton
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
              <Text style={styles.subtitle}>
                {verdictForRating(detail.rating)} - {detailMessageForRating(detail.rating)}
              </Text>
              <View style={styles.routeFactRow}>
                {routeHeroFacts(detail).map((fact) => (
                  <View key={fact.label} style={styles.routeFactPill}>
                    <MaterialCommunityIcons name={fact.icon as never} color={colors.accent} size={17} />
                    <Text style={styles.routeFactValue}>{fact.value}</Text>
                    <Text style={styles.routeFactLabel}>{fact.label}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.heroMeta}>
                <RatingPill rating={detail.rating} />
                <StatusPill status={detail.liveData.overall} />
              </View>
            </View>
          </View>
          <DecisionSummary detail={detail} />
          <DecisionStrip detail={detail} onDirections={() => openPrimaryDirections(detail)} />
          <View style={styles.heroFooter}>
            <Text style={styles.heroFooterText}>{detail.gaugeBandLabel}</Text>
            <Text style={styles.heroFooterText}>{detail.confidence.label} confidence</Text>
            {detail.liveData.overall !== 'live' ? (
              <Text style={styles.heroFooterWarning}>{normalizeApiText(detail.liveData.summary)}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.sectionTabsSticky}>
          <View style={styles.sectionTabs}>
            {DETAIL_SECTIONS.map((section) => {
              const selected = activeSection === section;
              return (
                <Pressable
                  key={section}
                  style={[styles.sectionTab, selected ? styles.sectionTabSelected : null]}
                  onPress={() => setActiveSection(section)}
                >
                  <Text style={[styles.sectionTabText, selected ? styles.sectionTabTextSelected : null]}>{section}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {activeSection === 'Today' ? (
          <>
            <RouteBasicsCard detail={detail} />

            <SectionCard title="Flow, trend, weather" subtitle={normalizeApiText(detail.liveData.summary)}>
              <View style={styles.conditionList}>
                <ConditionRow
                  icon="waves"
                  label="Flow"
                  value={detail.gauge ? formatGaugeValue(detail.gauge.current, detail.gauge.unit) : detail.gaugeBandLabel}
                  subvalue={detail.gauge ? detail.gaugeBandLabel : 'Current reading unavailable'}
                  detail={normalizeApiText(detail.liveData.gauge.detail)}
                  tone={conditionToneForStatus(checklistStatusForLabel(checklist, 'Gauge window'))}
                />
                <ConditionRow
                  icon="trending-up"
                  label="Trend"
                  value={trendValue(detail)}
                  subvalue={trendSubvalue(detail)}
                  detail={normalizeApiText(detail.scoreBreakdown.riverQualityExplanation)}
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
              </View>
              <GaugeSourceActions detail={detail} />
            </SectionCard>

            <AboutRouteCard detail={detail} />

            <SectionCard title="Checklist" subtitle="Secondary checks before committing to the drive.">
              <View style={styles.checklist}>
                {checklist.map((item) => (
                  <ChecklistRow key={`${item.label}-${item.status}`} item={item} />
                ))}
              </View>
            </SectionCard>
          </>
        ) : null}

        {activeSection === 'Reports' ? (
          <>
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
                <Text style={styles.reportCtaTitle}>Add route intel</Text>
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
          </>
        ) : null}

        {activeSection === 'More' ? (
          <>
            <SectionCard
              title="Outlooks"
              subtitle="Forward-looking calls stay conservative when forecast or gauge support is weak."
            >
              <OutlookRows outlooks={detail.outlooks} />
            </SectionCard>

            <SectionCard
              title="Weather through today"
              subtitle="Short-interval weather for trip timing, not just a single summary."
            >
              <HourlyWeatherStrip detail={detail} />
            </SectionCard>

            <SectionCard
              title="USGS recent trend"
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
          </>
        ) : null}

        {activeSection === 'Access' ? (
          <>
            <SectionCard
              title="Access & logistics"
              subtitle="Put-in, take-out, shuttle, and the route facts that affect planning."
            >
              {Platform.OS !== 'web' && routePlotPoints.length > 0 ? (
                <RoutePlotMap
                  points={routePlotPoints}
                  selectedId={routePlotPoints[0]?.id ?? null}
                  height={220}
                  showFooter={false}
                  markerMode="pin"
                />
              ) : null}
              <View style={styles.accessBlock}>
                <AccessCard label="Put-in" point={detail.river.putIn} fallback="Put-in not mapped yet." />
                <AccessCard label="Take-out" point={detail.river.takeOut} fallback="Take-out not mapped yet." />
              </View>
              <RouteDirectionActions detail={detail} />
              <TripPlanningCard detail={detail} />
              <View style={styles.accessMeta}>
                <MetricPill label="Distance" value={detail.river.distanceLabel || 'Check source'} />
                <MetricPill label="Paddle time" value={detail.river.estimatedPaddleTime || 'Not tracked'} />
                <MetricPill label="Difficulty" value={capitalize(detail.river.profile.difficulty)} />
                <MetricPill label="Camping" value={shortLogisticsValue(detail.river.logistics?.camping)} />
              </View>
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
              subtitle="Email only when this route crosses your chosen threshold. Every alert email includes an unsubscribe link."
            >
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                style={styles.alertInput}
                value={draftEmail}
                onChangeText={setDraftEmail}
              />
              <View style={styles.alertButtonRow}>
                {(['good', 'strong'] as const).map((threshold) => {
                  const isPending = pendingThreshold === threshold;
                  return (
                    <Pressable
                      key={threshold}
                      style={[styles.alertButton, isPending ? styles.alertButtonDisabled : null]}
                      disabled={isPending}
                      onPress={() => void submitRiverAlert(threshold)}
                    >
                      <Text style={styles.alertButtonText}>
                        {isPending ? 'Saving...' : `Notify at ${alertThresholdLabel(threshold)}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={styles.alertHelper}>
                Your email is used for route alerts and stored locally on this device for the next alert form.
              </Text>
              <Text style={styles.alertStatus}>{alertStatus}</Text>
            </SectionCard>
          </>
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
    </>
  );
}

function normalizeReportPhotoAsset(asset: ImagePicker.ImagePickerAsset, index: number): SelectedReportPhoto | null {
  const type = normalizeImageMimeType(asset.mimeType, asset.fileName, asset.uri);
  const size = asset.fileSize ?? estimateBase64ByteSize(asset.base64);

  if (!asset.base64 || !type || !ROUTE_REPORT_ALLOWED_IMAGE_TYPES.has(type)) {
    return null;
  }

  if (!Number.isFinite(size) || size <= 0 || size > ROUTE_REPORT_MAX_PHOTO_BYTES) {
    return null;
  }

  const name = asset.fileName || `route-photo-${index + 1}.${extensionForMimeType(type)}`;
  const base64 = asset.base64.startsWith('data:') ? asset.base64.split(',').pop() ?? '' : asset.base64;

  if (!base64) {
    return null;
  }

  return {
    id: `${asset.assetId ?? asset.uri}-${Date.now()}-${index}`,
    uri: asset.uri,
    name,
    type,
    size,
    dataUrl: `data:${type};base64,${base64}`,
  };
}

function normalizeImageMimeType(
  mimeType: string | null | undefined,
  fileName: string | null | undefined,
  uri: string
) {
  const normalized = mimeType?.toLowerCase();
  if (normalized && ROUTE_REPORT_ALLOWED_IMAGE_TYPES.has(normalized)) {
    return normalized;
  }

  const source = (fileName || uri).toLowerCase();
  if (source.endsWith('.png')) return 'image/png';
  if (source.endsWith('.webp')) return 'image/webp';
  if (source.endsWith('.jpg') || source.endsWith('.jpeg')) return 'image/jpeg';
  return null;
}

function extensionForMimeType(type: string) {
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  return 'jpg';
}

function estimateBase64ByteSize(base64: string | null | undefined) {
  if (!base64) {
    return 0;
  }

  const encoded = base64.startsWith('data:') ? base64.split(',').pop() ?? '' : base64;
  const padding = encoded.endsWith('==') ? 2 : encoded.endsWith('=') ? 1 : 0;
  return Math.floor((encoded.length * 3) / 4) - padding;
}

function decisionSummaryItems(detail: RiverDetailApiResult) {
  const checklistByLabel = new Map(detail.checklist.map((item) => [item.label, item]));
  const warnings = detail.checklist.filter((item) => item.status !== 'go');
  const working = detail.checklist.filter((item) => item.status === 'go');
  const firstWarning = warnings[0];
  const primaryWorking = working[0] ?? detail.checklist[0];

  return [
    {
      label: detail.rating === 'Fair' ? 'Why today may work' : 'Why today works',
      text: normalizeApiText(primaryWorking?.detail ?? detail.explanation),
      tone: conditionToneForStatus(primaryWorking?.status ?? 'watch'),
    },
    {
      label: 'What to watch',
      text: normalizeApiText(firstWarning?.detail ?? checklistByLabel.get('Weather window')?.detail ?? detail.liveData.summary),
      tone: conditionToneForStatus(firstWarning?.status ?? 'watch'),
    },
    {
      label: 'Before committing',
      text: beforeCommittingText(detail),
      tone: conditionToneForStatus(detail.liveData.overall === 'live' ? 'go' : 'watch'),
    },
  ].filter((item) => item.text.trim().length > 0);
}

function beforeCommittingText(detail: RiverDetailApiResult) {
  const bits = [
    detail.river.distanceLabel ? `${detail.river.distanceLabel} route` : null,
    detail.river.estimatedPaddleTime || null,
    `${capitalize(detail.river.profile.difficulty)} difficulty`,
  ].filter(Boolean);
  const routeContext = bits.length > 0 ? ` This is a ${bits.join(', ')}.` : '';

  return detail.liveData.overall === 'live'
    ? `Refresh the route, check access notes, and confirm the shuttle still fits your group.${routeContext}`
    : `Open the source and confirm the latest gauge before relying on this call.${routeContext}`;
}

function routeHeroFacts(detail: RiverDetailApiResult) {
  return [
    { label: 'Length', value: detail.river.distanceLabel || 'Unknown', icon: 'map-marker-distance' },
    { label: 'Time', value: detail.river.estimatedPaddleTime || 'Unknown', icon: 'clock-outline' },
    { label: 'Difficulty', value: capitalize(detail.river.profile.difficulty), icon: 'waves' },
    { label: 'Camping', value: shortLogisticsValue(detail.river.logistics?.camping), icon: 'tent' },
  ];
}

function decisionStatement(detail: RiverDetailApiResult) {
  if (detail.rating === 'Strong') {
    return 'Clear go if the route fits your group.';
  }

  if (detail.rating === 'Good') {
    return 'Good option with normal same-day checks.';
  }

  if (detail.rating === 'Fair') {
    return 'Possible paddle, but review the cautions first.';
  }

  return 'Skip this one today unless sources have changed.';
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

function DecisionSummary({ detail }: { detail: RiverDetailApiResult }) {
  const items = decisionSummaryItems(detail);
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
    </View>
  );
}

function DecisionStrip({
  detail,
  onDirections,
}: {
  detail: RiverDetailApiResult;
  onDirections: () => void;
}) {
  const directionsAvailable = Boolean(mapUrlForAccessPoint(detail.river.putIn) || mapUrlForAccessPoint(detail.river.takeOut));
  const items = [
    {
      label: 'Call',
      value: detail.rating,
      icon: detail.rating === 'No-go' ? 'close-circle-outline' : 'check-circle-outline',
      tone: ratingBackground(detail.rating),
    },
    {
      label: 'Gauge',
      value: detail.gauge ? formatGaugeValue(detail.gauge.current, detail.gauge.unit) : detail.gaugeBandLabel,
      icon: 'waves-arrow-up',
      tone: conditionToneForStatus(checklistStatusForLabel(detail.checklist, 'Gauge window')),
    },
    {
      label: 'Weather',
      value: compactWeatherValue(detail),
      icon: 'weather-partly-cloudy',
      tone: conditionToneForStatus(checklistStatusForLabel(detail.checklist, 'Weather window')),
    },
  ];

  return (
    <View style={styles.decisionStrip}>
      {items.map((item) => (
        <View key={item.label} style={styles.decisionStripItem}>
          <View style={[styles.decisionStripIcon, item.tone]}>
            <MaterialCommunityIcons name={item.icon as never} color={colors.text} size={15} />
          </View>
          <Text style={styles.decisionStripValue} numberOfLines={1}>{item.value}</Text>
          <Text style={styles.decisionStripLabel}>{item.label}</Text>
        </View>
      ))}
      {directionsAvailable ? (
        <Pressable style={styles.decisionStripInlineAction} onPress={onDirections}>
          <MaterialCommunityIcons name="directions" color={colors.accent} size={16} />
          <Text style={styles.decisionStripInlineActionText}>Directions</Text>
        </Pressable>
      ) : null}
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
        <MaterialCommunityIcons name={icon} color={colors.text} size={18} />
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

function RouteBasicsCard({ detail }: { detail: RiverDetailApiResult }) {
  const logistics = detail.river.logistics;
  const basics = [
    { label: 'Paddle time', value: detail.river.estimatedPaddleTime || 'Not tracked', icon: 'clock-outline' },
    { label: 'Difficulty', value: capitalize(detail.river.profile.difficulty), icon: 'waves' },
    { label: 'Shuttle', value: shortLogisticsValue(logistics?.shuttle), icon: 'car' },
    { label: 'Camping', value: shortLogisticsValue(logistics?.camping), icon: 'tent' },
  ];

  const gaugeRange = thresholdRangeLabel(detail);

  return (
    <SectionCard
      title="Trip fit"
      subtitle="The quick facts that decide whether this route fits your group."
    >
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
        <Text style={styles.routeInfoTitle}>Gauge reference</Text>
        <Text style={styles.routeInfoText}>
          {detail.river.gaugeSource.display.label} - {gaugeRange}
        </Text>
      </View>
      <View style={styles.routeInfoPanel}>
        <Text style={styles.routeInfoTitle}>Route</Text>
        <Text style={styles.routeInfoText}>
          {[
            detail.river.distanceLabel || 'Distance not tracked',
            routeTypeLabel(detail.river.routeType),
            `${detail.river.region}, ${detail.river.state}`,
          ].join(' - ')}
        </Text>
      </View>
    </SectionCard>
  );
}

function AboutRouteCard({ detail }: { detail: RiverDetailApiResult }) {
  const logistics = detail.river.logistics;

  return (
    <SectionCard
      title="About this route"
      subtitle="Evergreen planning notes, separate from today's live conditions."
    >
      <Text style={styles.aboutRouteText}>
        {normalizeApiText(logistics?.summary || detail.explanation)}
      </Text>
      <LogisticsBulletList
        title="Watch for"
        items={logistics?.watchFor ?? []}
        empty="Hazards and watch-outs are not tracked yet for this route."
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
            <Text style={styles.tripPlanningValue} numberOfLines={1}>{row.value}</Text>
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

function GaugeTrendChart({ detail }: { detail: RiverDetailApiResult }) {
  const unit = detail.gauge?.unit ?? detail.river.gaugeSource.unit;
  const samples = (detail.gauge?.recentSamples ?? []).slice(-10);

  if (samples.length === 0) {
    return <Text style={styles.emptyText}>Recent USGS samples are unavailable right now.</Text>;
  }

  const values = samples.map((sample) => sample.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1);

  return (
    <View style={styles.gaugeChartWrap}>
      <View style={styles.gaugeSummaryRow}>
        <GaugeSummaryPill
          label="Current"
          value={detail.gauge ? formatGaugeValue(detail.gauge.current, detail.gauge.unit) : 'No reading'}
        />
        <GaugeSummaryPill
          label="24h delta"
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
      <Text style={styles.metricPillLabel}>{label}</Text>
      <Text style={styles.metricPillValue}>{value}</Text>
    </View>
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
  fallback,
}: {
  label: string;
  point: RiverAccessPoint | undefined;
  fallback: string;
}) {
  const url = mapUrlForAccessPoint(point);

  return (
    <View style={styles.accessCard}>
      <Text style={styles.accessLabel}>{label}</Text>
      <Text style={styles.accessName}>{point?.name ?? fallback}</Text>
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

function RouteDirectionActions({ detail }: { detail: RiverDetailApiResult }) {
  if (!hasCoordinates(detail.river.putIn) || !hasCoordinates(detail.river.takeOut)) {
    return null;
  }

  const origin = `${detail.river.putIn.latitude},${detail.river.putIn.longitude}`;
  const destination = `${detail.river.takeOut.latitude},${detail.river.takeOut.longitude}`;
  const appleUrl = `https://maps.apple.com/?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}&dirflg=d`;
  const googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

  return (
    <View style={styles.directionsPanel}>
      <View style={styles.directionsCopy}>
        <Text style={styles.directionsTitle}>Shuttle directions</Text>
        <Text style={styles.directionsText}>Open driving directions from put-in to take-out.</Text>
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

function buildDetailRoutePoints(detail: RiverDetailApiResult): RoutePlotPoint[] {
  const points: RoutePlotPoint[] = [];

  if (hasCoordinates(detail.river.putIn)) {
    points.push({
      id: 'put-in',
      label: detail.river.putIn.name,
      latitude: detail.river.putIn.latitude,
      longitude: detail.river.putIn.longitude,
      rating: detail.rating,
      score: detail.score,
      meta: 'Put-in',
    });
  }

  if (hasCoordinates(detail.river.takeOut)) {
    points.push({
      id: 'take-out',
      label: detail.river.takeOut.name,
      latitude: detail.river.takeOut.latitude,
      longitude: detail.river.takeOut.longitude,
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

function hasCoordinates(point: RiverAccessPoint | undefined): point is RiverAccessPoint & { latitude: number; longitude: number } {
  return Boolean(point && Number.isFinite(point.latitude) && Number.isFinite(point.longitude));
}

function openPrimaryDirections(detail: RiverDetailApiResult) {
  const url = mapUrlForAccessPoint(detail.river.putIn) || mapUrlForAccessPoint(detail.river.takeOut);
  if (url) {
    trackAppEvent('directions_opened', {
      slug: detail.river.slug,
      target: detail.river.putIn ? 'put_in' : 'take_out',
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
    return 'Weather unavailable';
  }

  return normalizeApiText(detail.weather.conditionLabel || detail.weather.rainTimingLabel || 'Today');
}

function formatHourLabel(value: string, fallback: string | null | undefined) {
  const parsed = new Date(value);
  if (Number.isFinite(parsed.getTime())) {
    return parsed.toLocaleTimeString('en-US', {
      hour: 'numeric',
    });
  }

  return fallback ? normalizeApiText(fallback) : 'Later';
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
    padding: spacing.md,
    gap: spacing.md,
  },
  heroHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  heroScore: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: colors.accentDeep,
    fontSize: 28,
    fontWeight: '800',
  },
  scoreLabel: {
    color: colors.textMuted,
    fontSize: 11,
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
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  heroTitleCopy: {
    flex: 1,
    gap: 4,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    color: colors.text,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  routeFactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  routeFactPill: {
    flex: 1,
    flexBasis: 90,
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
  },
  routeFactValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  routeFactLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  decisionSummary: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
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
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
  },
  decisionBulletList: {
    gap: spacing.sm,
  },
  decisionBullet: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  decisionBulletDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginTop: 6,
  },
  decisionBulletCopy: {
    flex: 1,
    gap: 2,
  },
  decisionBulletLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  decisionBulletText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
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
  decisionStripItem: {
    flex: 1,
    minWidth: 0,
    minHeight: 74,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: 7,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  decisionStripIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decisionStripValue: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  decisionStripLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
  decisionStripInlineAction: {
    minWidth: 74,
    minHeight: 74,
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
  },
  sectionTabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
    gap: 3,
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
  },
  routeBasicLabel: {
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
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tripPlanningLabel: {
    width: 68,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tripPlanningValue: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
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
  },
  metricPillLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  metricPillValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  alertInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
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
  },
  alertButtonDisabled: {
    opacity: 0.6,
  },
  alertButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '700',
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
