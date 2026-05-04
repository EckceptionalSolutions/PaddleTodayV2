import type {
  ApprovedCommunityPhoto,
  ApprovedTripReport,
  DecisionChecklistItem,
  RiverAccessPoint,
  RiverAlertThreshold,
  CreateRouteContributionRequest,
  RiverDetailApiResult,
  RiverOutlook,
  ScoreFactor,
} from '@paddletoday/api-contract';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
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
import { HistoryBars } from '../components/history-bars';
import { RatingPill } from '../components/rating-pill';
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
import { useAlertPreferences } from '../providers/alert-preferences-provider';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

const ROUTE_REPORT_MAX_PHOTOS = 4;
const ROUTE_REPORT_MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const ROUTE_REPORT_ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const DETAIL_SECTIONS = ['Overview', 'Conditions', 'Community', 'Access'] as const;

type DetailSection = (typeof DETAIL_SECTIONS)[number];

interface SelectedReportPhoto {
  id: string;
  uri: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

export default function RiverDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
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
  const [activeSection, setActiveSection] = useState<DetailSection>('Overview');
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

  if (!slug) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>River slug is missing.</Text>
      </View>
    );
  }

  if (detailQuery.isLoading && !detail) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.stateTitle}>Loading river detail</Text>
        <Text style={styles.stateBody}>Pulling the latest river call and score history.</Text>
      </View>
    );
  }

  if (detailQuery.isError && !detail) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>This river call did not load.</Text>
        <Text style={styles.stateBody}>
          Check that the API server is reachable from this device, then try again.
        </Text>
        <Text style={styles.stateMeta} numberOfLines={2}>
          {resolveApiUrl(`/api/rivers/${slug}.json`)}
        </Text>
        <Pressable style={styles.stateButton} onPress={() => void detailQuery.refetch()}>
          <Text style={styles.stateButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!detail) {
    return null;
  }

  const riverSlug = detail.river.slug;

  async function shareRiver(loadedDetail: RiverDetailApiResult) {
    const title = `${loadedDetail.river.name}: ${loadedDetail.river.reach}`;
    const url = `https://paddletoday.com/rivers/${loadedDetail.river.slug}/`;
    await Share.share({
      title,
      message: `${title}\n${url}`,
      url,
    });
  }

  async function submitRiverAlert(threshold: RiverAlertThreshold) {
    const email = draftEmail.trim().toLowerCase();
    if (!isValidEmailAddress(email)) {
      setAlertStatus('Enter a valid email address before turning on alerts.');
      return;
    }

    setPendingThreshold(threshold);
    try {
      await setEmail(email);
      const response = await createAlertMutation.mutateAsync({
        email,
        riverSlug,
        threshold,
      });
      setAlertStatus(alertMutationMessage(response, threshold));
    } catch (error) {
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

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setReportStatus('Allow photo access to attach route photos.');
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
        contentContainerStyle={styles.content}
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
              <View style={styles.heroMeta}>
                <RatingPill rating={detail.rating} />
                <StatusPill status={detail.liveData.overall} />
              </View>
              <View style={styles.heroActions}>
                <Pressable style={styles.heroActionButton} onPress={() => void shareRiver(detail)}>
                  <Text style={styles.heroActionButtonText}>Share</Text>
                </Pressable>
                {detail.river.gaugeSource.detailUrl ? (
                  <Pressable
                    style={styles.heroActionButton}
                    onPress={() => void Linking.openURL(detail.river.gaugeSource.detailUrl!)}
                  >
                    <Text style={styles.heroActionButtonText}>Gauge</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </View>
          <Text style={styles.explanation}>{normalizeApiText(detail.explanation)}</Text>
          <View style={styles.heroFooter}>
            <Text style={styles.heroFooterText}>{detail.gaugeBandLabel}</Text>
            <Text style={styles.heroFooterText}>{detail.confidence.label} confidence</Text>
            <Text style={styles.heroFooterText}>{formatTimestamp(detail.generatedAt)}</Text>
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

        <View style={styles.actionDock}>
          <Pressable style={styles.actionDockButton} onPress={() => openPrimaryDirections(detail)}>
            <Text style={styles.actionDockLabel}>Directions</Text>
            <Text style={styles.actionDockValue}>Put-in</Text>
          </Pressable>
          <Pressable
            style={styles.actionDockButton}
            onPress={() => {
              setActiveSection('Community');
              setReportSheetVisible(true);
            }}
          >
            <Text style={styles.actionDockLabel}>Report</Text>
            <Text style={styles.actionDockValue}>Intel</Text>
          </Pressable>
          <Pressable style={styles.actionDockButton} onPress={() => setActiveSection('Access')}>
            <Text style={styles.actionDockLabel}>Alerts</Text>
            <Text style={styles.actionDockValue}>Email</Text>
          </Pressable>
          <Pressable style={styles.actionDockButton} onPress={() => setActiveSection('Community')}>
            <Text style={styles.actionDockLabel}>Community</Text>
            <Text style={styles.actionDockValue}>{communityReports.length + communityPhotos.length}</Text>
          </Pressable>
        </View>

        {activeSection === 'Overview' ? (
          <>
            <SectionCard title="Current conditions" subtitle={normalizeApiText(detail.liveData.summary)}>
              <View style={styles.metricGrid}>
                <MetricTile
                  label="Gauge now"
                  value={detail.gauge ? formatGaugeValue(detail.gauge.current, detail.gauge.unit) : 'No reading'}
                  detail={normalizeApiText(detail.liveData.gauge.detail)}
                />
                <MetricTile
                  label="Trend"
                  value={
                    detail.gauge
                      ? `${capitalize(detail.gauge.trend)} ${
                          detail.gauge.delta24h !== null
                            ? `(${formatGaugeValue(detail.gauge.delta24h, detail.gauge.unit, '0')})`
                            : ''
                        }`.trim()
                      : 'Unavailable'
                  }
                  detail={normalizeApiText(detail.scoreBreakdown.riverQualityExplanation)}
                />
                <MetricTile
                  label="Weather"
                  value={weatherValue(detail)}
                  detail={normalizeApiText(detail.liveData.weather.detail)}
                />
                <MetricTile
                  label="Confidence"
                  value={`${detail.confidence.label} (${detail.confidence.score}/100)`}
                  detail={normalizeApiText(detail.scoreBreakdown.rainExplanation)}
                />
              </View>
            </SectionCard>

            <SectionCard
              title="Outlooks"
              subtitle="Forward-looking calls stay conservative when forecast or gauge support is weak."
            >
              <OutlookRows outlooks={detail.outlooks} />
            </SectionCard>

            <SectionCard title="Trip checks" subtitle="Conclusion first, supporting checks second.">
              <View style={styles.checklist}>
                {checklist.map((item) => (
                  <ChecklistRow key={`${item.label}-${item.status}`} item={item} />
                ))}
              </View>
            </SectionCard>
          </>
        ) : null}

        {activeSection === 'Conditions' ? (
          <>
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
                  ? `${detail.gauge.gaugeSource} · observed ${formatTimestamp(detail.gauge.observedAt)}`
                  : 'Recent gauge samples are unavailable.'
              }
            >
              <GaugeTrendChart detail={detail} />
            </SectionCard>

            <SectionCard
              title="Why this score"
              subtitle="The main scoring inputs behind the launch call."
            >
              <ScoreFactorRows factors={detail.factors} breakdown={detail.scoreBreakdown} />
            </SectionCard>

            <SectionCard
              title="Confidence and sources"
              subtitle="Use this before driving when the call looks close."
            >
              <ConfidenceSourceBlock detail={detail} />
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

        {activeSection === 'Community' ? (
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
                <Text style={styles.reportCtaText}>Send photos, access notes, wood, pace, or level context for review.</Text>
              </View>
              <Pressable style={styles.reportCtaButton} onPress={() => setReportSheetVisible(true)}>
                <Text style={styles.reportCtaButtonText}>Report</Text>
              </Pressable>
            </View>
          </>
        ) : null}

        {activeSection === 'Access' ? (
          <>
            <SectionCard
              title="Access basics"
              subtitle="Practical launch information first. Route planning can get richer later."
            >
              {routePlotPoints.length > 0 ? (
                <RoutePlotMap points={routePlotPoints} selectedId={routePlotPoints[0]?.id ?? null} />
              ) : null}
              <View style={styles.accessBlock}>
                <AccessCard label="Put-in" point={detail.river.putIn} fallback="Put-in not mapped yet." />
                <AccessCard label="Take-out" point={detail.river.takeOut} fallback="Take-out not mapped yet." />
              </View>
              <RouteDirectionActions detail={detail} />
              <View style={styles.accessMeta}>
                <MetricPill label="Distance" value={detail.river.distanceLabel || 'Check source'} />
                <MetricPill label="Difficulty" value={capitalize(detail.river.profile.difficulty)} />
              </View>
            </SectionCard>

            <SectionCard
              title="Route alerts"
              subtitle="Use email alerts when this route reaching Good or Strong would change your plan."
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
              <Text style={styles.alertStatus}>{alertStatus}</Text>
            </SectionCard>
          </>
        ) : null}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={reportSheetVisible}
        onRequestClose={() => setReportSheetVisible(false)}
      >
        <View style={styles.sheetScrim}>
          <View style={styles.reportSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetHeader}>
              <View style={styles.sheetTitleCopy}>
                <Text style={styles.sheetTitle}>Send a route report</Text>
                <Text style={styles.sheetSubtitle}>Share access, wood, pace, level, or photos for review.</Text>
              </View>
              <Pressable style={styles.sheetCloseButton} onPress={() => setReportSheetVisible(false)}>
                <Text style={styles.sheetCloseText}>Close</Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
              <View style={styles.reportForm}>
                <View style={styles.reportGrid}>
                  <TextInput
                    autoCapitalize="words"
                    placeholder="Name or paddling handle"
                    placeholderTextColor={colors.textMuted}
                    style={styles.reportInput}
                    value={reportName}
                    onChangeText={setReportName}
                  />
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="you@example.com"
                    placeholderTextColor={colors.textMuted}
                    style={styles.reportInput}
                    value={reportEmail}
                    onChangeText={setReportEmail}
                  />
                </View>
                <TextInput
                  placeholder="Trip date, optional"
                  placeholderTextColor={colors.textMuted}
                  style={styles.reportInput}
                  value={reportDate}
                  onChangeText={setReportDate}
                />
                <SentimentPicker value={reportSentiment ?? ''} onChange={setReportSentiment} />
                <TextInput
                  multiline
                  placeholder="What did you see?"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.reportInput, styles.reportTextArea]}
                  value={reportText}
                  onChangeText={setReportText}
                  textAlignVertical="top"
                />
                <TextInput
                  multiline
                  placeholder="Extra notes, optional"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.reportInput, styles.reportNotesArea]}
                  value={reportNotes}
                  onChangeText={setReportNotes}
                  textAlignVertical="top"
                />
                <View style={styles.reportPhotoPanel}>
                  <View style={styles.reportPhotoHeader}>
                    <View style={styles.reportPhotoCopy}>
                      <Text style={styles.reportPhotoTitle}>Route photos</Text>
                      <Text style={styles.reportPhotoMeta}>
                        {reportPhotos.length}/{ROUTE_REPORT_MAX_PHOTOS} attached · JPEG, PNG, or WebP
                      </Text>
                    </View>
                    <Pressable
                      style={[
                        styles.reportPhotoButton,
                        reportPhotos.length >= ROUTE_REPORT_MAX_PHOTOS ? styles.reportPhotoButtonDisabled : null,
                      ]}
                      disabled={reportPhotos.length >= ROUTE_REPORT_MAX_PHOTOS}
                      onPress={() => void pickReportPhotos()}
                    >
                      <Text style={styles.reportPhotoButtonText}>Add</Text>
                    </Pressable>
                  </View>
                  {reportPhotos.length > 0 ? (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.reportPhotoStrip}
                    >
                      {reportPhotos.map((photo) => (
                        <View key={photo.id} style={styles.reportPhotoThumbCard}>
                          <Image source={{ uri: photo.uri }} style={styles.reportPhotoThumb} resizeMode="cover" />
                          <Pressable style={styles.reportPhotoRemove} onPress={() => removeReportPhoto(photo.id)}>
                            <Text style={styles.reportPhotoRemoveText}>Remove</Text>
                          </Pressable>
                        </View>
                      ))}
                    </ScrollView>
                  ) : (
                    <Text style={styles.reportPhotoEmpty}>
                      Optional, but useful for strainers, access changes, water clarity, and gauge references.
                    </Text>
                  )}
                </View>
                {reportPhotos.length > 0 ? (
                  <Pressable
                    style={styles.reportConsentRow}
                    onPress={() => setReportPhotoRights((current) => !current)}
                  >
                    <View style={[styles.checkbox, reportPhotoRights ? styles.checkboxChecked : null]}>
                      {reportPhotoRights ? <Text style={styles.checkboxMark}>✓</Text> : null}
                    </View>
                    <Text style={styles.reportConsentText}>
                      I own these photos or have permission to share them with Paddle Today.
                    </Text>
                  </Pressable>
                ) : null}
                <Pressable
                  style={styles.reportConsentRow}
                  onPress={() => setReportConsent((current) => !current)}
                >
                  <View style={[styles.checkbox, reportConsent ? styles.checkboxChecked : null]}>
                    {reportConsent ? <Text style={styles.checkboxMark}>✓</Text> : null}
                  </View>
                  <Text style={styles.reportConsentText}>
                    It is okay to contact me if more detail is needed before publishing.
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.reportSubmitButton,
                    createContributionMutation.isPending ? styles.reportSubmitButtonDisabled : null,
                  ]}
                  disabled={createContributionMutation.isPending}
                  onPress={() => void submitRouteReport()}
                >
                  <Text style={styles.reportSubmitText}>
                    {createContributionMutation.isPending ? 'Sending...' : 'Send report'}
                  </Text>
                </Pressable>
                <Text style={styles.reportStatus}>{reportStatus}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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

function MetricTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <View style={styles.metricTile}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDetail}>{detail}</Text>
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

function ScoreFactorRows({
  factors,
  breakdown,
}: {
  factors: ScoreFactor[];
  breakdown: RiverDetailApiResult['scoreBreakdown'];
}) {
  const rows = [
    { label: 'River quality', value: breakdown.riverQuality, detail: breakdown.riverQualityExplanation },
    { label: 'Wind', value: breakdown.windAdjustment, detail: breakdown.windExplanation },
    { label: 'Temperature', value: breakdown.temperatureAdjustment, detail: breakdown.temperatureExplanation },
    { label: 'Rain', value: breakdown.rainAdjustment, detail: breakdown.rainExplanation },
    { label: 'Comfort', value: breakdown.comfortAdjustment, detail: breakdown.comfortExplanation },
  ];

  return (
    <View style={styles.scoreStack}>
      <View style={styles.breakdownGrid}>
        {rows.map((row) => (
          <View key={row.label} style={styles.breakdownRow}>
            <View style={styles.breakdownRowTop}>
              <Text style={styles.breakdownLabel}>{row.label}</Text>
              <Text style={[styles.breakdownValue, row.value < 0 ? styles.breakdownValueNegative : null]}>
                {formatSigned(row.value)}
              </Text>
            </View>
            <Text style={styles.breakdownDetail}>{normalizeApiText(row.detail)}</Text>
          </View>
        ))}
      </View>

      {breakdown.capReasons.length > 0 ? (
        <View style={styles.capBox}>
          <Text style={styles.capTitle}>What held the score back</Text>
          {breakdown.capReasons.map((reason) => (
            <Text key={reason} style={styles.capText}>- {normalizeApiText(reason)}</Text>
          ))}
        </View>
      ) : null}

      {factors.length > 0 ? (
        <View style={styles.factorList}>
          {factors.map((factor) => (
            <View key={factor.id} style={styles.factorRow}>
              <View style={[styles.factorImpact, impactTone(factor.impact)]} />
              <View style={styles.factorCopy}>
                <View style={styles.factorHeader}>
                  <Text style={styles.factorLabel}>{factor.label}</Text>
                  <Text style={styles.factorValue}>{normalizeApiText(factor.value)}</Text>
                </View>
                <Text style={styles.factorDetail}>{normalizeApiText(factor.detail)}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function ConfidenceSourceBlock({ detail }: { detail: RiverDetailApiResult }) {
  const profile = detail.river.profile;
  const thresholdValue =
    profile.thresholdModel === 'two-sided' && typeof profile.idealMin === 'number' && typeof profile.idealMax === 'number'
      ? `${formatThreshold(profile.idealMin, detail)} to ${formatThreshold(profile.idealMax, detail)}`
      : profile.thresholdModel === 'minimum-only' && typeof profile.tooLow === 'number'
        ? `Minimum ${formatThreshold(profile.tooLow, detail)}`
        : 'Needs paddler reports';

  return (
    <View style={styles.sourceStack}>
      <View style={styles.sourceSummary}>
        <MetricPill label="Confidence" value={`${detail.confidence.label} ${detail.confidence.score}/100`} />
        <MetricPill label="Thresholds" value={sourceStrengthLabel(profile.thresholdSourceStrength)} />
        <MetricPill label="Model" value={profile.thresholdModel === 'two-sided' ? 'Target band' : 'Minimum only'} />
      </View>

      <View style={styles.sourceTable}>
        <SourceRow label="Gauge source" value={detail.river.gaugeSource.display.label} />
        <SourceRow label="Gauge metric" value={detail.river.gaugeSource.display.primaryMetricLabel} />
        <SourceRow label="Target" value={thresholdValue} />
        <SourceRow label="Weather" value={detail.weather?.weatherSource ?? 'Unavailable'} />
        <SourceRow label="Rainfall" value={detail.weather?.rainfallSource ?? 'Unavailable'} />
      </View>

      {detail.confidence.warnings.length > 0 ? (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Watch-outs</Text>
          {detail.confidence.warnings.map((warning) => (
            <Text key={warning} style={styles.warningText}>- {normalizeApiText(warning)}</Text>
          ))}
        </View>
      ) : null}

      {detail.confidence.rationale.length > 0 ? (
        <View style={styles.rationaleList}>
          {detail.confidence.rationale.slice(0, 4).map((item) => (
            <Text key={item} style={styles.rationaleText}>- {normalizeApiText(item)}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function SourceRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.sourceRow}>
      <Text style={styles.sourceLabel}>{label}</Text>
      <Text style={styles.sourceValue}>{normalizeApiText(value)}</Text>
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
    void Linking.openURL(url);
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

function SentimentPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: CreateRouteContributionRequest['tripSentiment']) => void;
}) {
  const options = [
    { value: '', label: 'No rating' },
    { value: 'great', label: 'Great' },
    { value: 'good', label: 'Good' },
    { value: 'mixed', label: 'Mixed' },
    { value: 'rough', label: 'Rough' },
  ] as const;

  return (
    <View style={styles.sentimentRow}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value || 'none'}
            style={[styles.sentimentChip, selected ? styles.sentimentChipSelected : null]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.sentimentChipText, selected ? styles.sentimentChipTextSelected : null]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
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

function formatSigned(value: number) {
  if (value === 0) return '0';
  return value > 0 ? `+${Math.round(value)}` : `${Math.round(value)}`;
}

function formatThreshold(value: number, detail: RiverDetailApiResult) {
  return formatGaugeValue(value, detail.river.gaugeSource.unit, 'Unknown');
}

function sourceStrengthLabel(value: RiverDetailApiResult['river']['profile']['thresholdSourceStrength']) {
  if (value === 'official') return 'Official';
  if (value === 'mixed') return 'Mixed';
  if (value === 'community') return 'Community';
  return 'Derived';
}

function ratingBackground(rating: string) {
  if (rating === 'Strong') return { backgroundColor: '#E0EFE9' };
  if (rating === 'Good') return { backgroundColor: '#E8EFD9' };
  if (rating === 'Fair') return { backgroundColor: '#F3E8CC' };
  return { backgroundColor: '#F2DDD6' };
}

function impactTone(impact: ScoreFactor['impact']) {
  if (impact === 'positive') return { backgroundColor: colors.strong };
  if (impact === 'warning') return { backgroundColor: colors.fair };
  if (impact === 'negative') return { backgroundColor: colors.noGo };
  return { backgroundColor: colors.textMuted };
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
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  heroActionButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surfaceStrong,
  },
  heroActionButtonText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
  },
  explanation: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
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
  actionDock: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionDockButton: {
    flex: 1,
    minHeight: 58,
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    gap: 2,
  },
  actionDockLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  actionDockValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  metricGrid: {
    gap: spacing.md,
  },
  metricTile: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  metricValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  metricDetail: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
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
  scoreStack: {
    gap: spacing.md,
  },
  breakdownGrid: {
    gap: spacing.sm,
  },
  breakdownRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 5,
  },
  breakdownRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  breakdownLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  breakdownValue: {
    color: colors.strong,
    fontSize: 14,
    fontWeight: '900',
  },
  breakdownValueNegative: {
    color: colors.noGo,
  },
  breakdownDetail: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  capBox: {
    backgroundColor: '#F3E8CC',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  capTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  capText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  factorList: {
    gap: spacing.sm,
  },
  factorRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  factorImpact: {
    width: 5,
    borderRadius: radius.pill,
  },
  factorCopy: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 5,
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  factorLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  factorValue: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  factorDetail: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  sourceStack: {
    gap: spacing.md,
  },
  sourceSummary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sourceTable: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  sourceRow: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 3,
  },
  sourceLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  sourceValue: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  warningBox: {
    backgroundColor: '#F2DDD6',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  warningTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  warningText: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
  rationaleList: {
    gap: spacing.xs,
  },
  rationaleText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
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
  sheetScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(10, 24, 29, 0.34)',
  },
  reportSheet: {
    maxHeight: '88%',
    backgroundColor: colors.canvas,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sheetTitleCopy: {
    flex: 1,
    gap: 3,
  },
  sheetTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '900',
  },
  sheetSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  sheetCloseButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  sheetCloseText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  sheetContent: {
    paddingBottom: spacing.lg,
  },
  reportForm: {
    gap: spacing.sm,
  },
  reportGrid: {
    gap: spacing.sm,
  },
  reportInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  reportTextArea: {
    minHeight: 112,
  },
  reportNotesArea: {
    minHeight: 78,
  },
  reportPhotoPanel: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  reportPhotoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  reportPhotoCopy: {
    flex: 1,
    gap: 3,
  },
  reportPhotoTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  reportPhotoMeta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  reportPhotoButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  reportPhotoButtonDisabled: {
    opacity: 0.55,
  },
  reportPhotoButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  reportPhotoStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  reportPhotoThumbCard: {
    width: 104,
    gap: 6,
  },
  reportPhotoThumb: {
    width: 104,
    height: 82,
    borderRadius: radius.md,
    backgroundColor: colors.canvasMuted,
  },
  reportPhotoRemove: {
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    backgroundColor: colors.surfaceStrong,
  },
  reportPhotoRemoveText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
  reportPhotoEmpty: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  sentimentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sentimentChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceStrong,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  sentimentChipSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  sentimentChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  sentimentChipTextSelected: {
    color: colors.accentDeep,
  },
  reportConsentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  checkbox: {
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
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxMark: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  reportConsentText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  reportSubmitButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reportSubmitButtonDisabled: {
    opacity: 0.65,
  },
  reportSubmitText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  reportStatus: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
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
