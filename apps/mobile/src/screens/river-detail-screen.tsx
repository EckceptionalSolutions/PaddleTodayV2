import type {
  ApprovedCommunityPhoto,
  ApprovedTripReport,
  DecisionChecklistItem,
  RiverAccessPoint,
  RiverAlertThreshold,
  RiverDetailApiResult,
} from '@paddletoday/api-contract';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
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
import MapView, { Marker, Polyline, type Region } from 'react-native-maps';
import {
  useCreateRiverAlertMutation,
  useCreateRouteReportMutation,
  useRiverDetailQuery,
  useRiverHistoryQuery,
  useRouteCommunityQuery,
} from '../api/queries';
import { HistoryBars } from '../components/history-bars';
import { RatingPill } from '../components/rating-pill';
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

type SelectedReportPhoto = {
  uri: string;
  fileName: string;
  mimeType: string;
  size: number;
  dataUrl: string;
};

export default function RiverDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
  const detailQuery = useRiverDetailQuery(slug);
  const historyQuery = useRiverHistoryQuery(slug, 7);
  const communityQuery = useRouteCommunityQuery(slug);
  const createAlertMutation = useCreateRiverAlertMutation();
  const createRouteReportMutation = useCreateRouteReportMutation();
  const { email: storedEmail, setEmail } = useAlertPreferences();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [draftEmail, setDraftEmail] = useState(storedEmail);
  const [alertStatus, setAlertStatus] = useState('Alerts only email on a new threshold crossing.');
  const [pendingThreshold, setPendingThreshold] = useState<RiverAlertThreshold | null>(null);
  const [reportName, setReportName] = useState('');
  const [reportEmail, setReportEmail] = useState(storedEmail);
  const [reportDate, setReportDate] = useState('');
  const [reportSentiment, setReportSentiment] = useState('');
  const [tripReport, setTripReport] = useState('');
  const [reportNotes, setReportNotes] = useState('');
  const [reportConsent, setReportConsent] = useState(false);
  const [reportPhotos, setReportPhotos] = useState<SelectedReportPhoto[]>([]);
  const [reportStatus, setReportStatus] = useState('Share level, pace, wood, access, or anything that would help the next paddler.');

  const detail = detailQuery.data?.result ?? null;
  const history = historyQuery.data?.result ?? null;
  const community = communityQuery.data ?? null;
  const checklist = useMemo(() => (detail ? detail.checklist.slice(0, 4) : []), [detail]);
  const communityReports = community?.reports ?? [];
  const communityPhotos = community?.photos ?? [];

  useEffect(() => {
    setDraftEmail(storedEmail);
    setReportEmail(storedEmail);
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
        <Text style={styles.stateBody}>Couldn't load river data. Pull to retry.</Text>
      </View>
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

  async function submitRouteReport() {
    const contributorName = reportName.trim();
    const contributorEmail = reportEmail.trim().toLowerCase();
    const cleanReport = tripReport.trim();

    if (contributorName.length < 2) {
      setReportStatus('Add your name or paddling handle.');
      return;
    }

    if (!isValidEmailAddress(contributorEmail)) {
      setReportStatus('Enter a valid email address.');
      return;
    }

    if (cleanReport.length < 12) {
      setReportStatus('Add a little more detail to the route report.');
      return;
    }

    if (!reportConsent) {
      setReportStatus("Confirm that it's okay to contact you about this report.");
      return;
    }

    try {
      await createRouteReportMutation.mutateAsync({
        riverSlug,
        contributorName,
        contributorEmail,
        tripDate: reportDate.trim(),
        tripSentiment: reportSentiment,
        tripReport: cleanReport,
        notes: reportNotes.trim(),
        rightsConfirmed: reportPhotos.length > 0,
        reviewConsent: reportConsent,
        files: reportPhotos.map((photo) => ({
          name: photo.fileName,
          type: photo.mimeType,
          size: photo.size,
          dataUrl: photo.dataUrl,
        })),
      });

      setReportStatus('Route report sent. Thank you.');
      setReportName('');
      setReportDate('');
      setReportSentiment('');
      setTripReport('');
      setReportNotes('');
      setReportConsent(false);
      setReportPhotos([]);
      void communityQuery.refetch();
    } catch (error) {
      setReportStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : 'Could not send this route report right now.'
      );
    }
  }

  async function pickReportPhotos() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setReportStatus('Photo library permission is needed to attach route photos.');
      return;
    }

    const remainingSlots = ROUTE_REPORT_MAX_PHOTOS - reportPhotos.length;
    if (remainingSlots <= 0) {
      setReportStatus(`Upload up to ${ROUTE_REPORT_MAX_PHOTOS} photos with a report.`);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      mediaTypes: ['images'],
      quality: 0.85,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const nextPhotos: SelectedReportPhoto[] = [];
    for (const asset of result.assets) {
      const mimeType = asset.mimeType ?? mimeTypeForFileName(asset.fileName ?? '');
      const size = asset.fileSize ?? estimateBase64Bytes(asset.base64 ?? '');
      const fileName = asset.fileName ?? `route-photo-${Date.now()}-${nextPhotos.length + 1}.${extensionForMimeType(mimeType)}`;

      if (!asset.base64) {
        setReportStatus('Could not read one selected photo.');
        continue;
      }

      if (!isSupportedReportPhotoType(mimeType)) {
        setReportStatus('Photos must be JPG, PNG, or WebP.');
        continue;
      }

      if (size <= 0 || size > ROUTE_REPORT_MAX_PHOTO_BYTES) {
        setReportStatus('Each photo must be 4 MB or smaller.');
        continue;
      }

      nextPhotos.push({
        uri: asset.uri,
        fileName,
        mimeType,
        size,
        dataUrl: `data:${mimeType};base64,${asset.base64}`,
      });
    }

    if (nextPhotos.length > 0) {
      setReportPhotos((current) => [...current, ...nextPhotos].slice(0, ROUTE_REPORT_MAX_PHOTOS));
      setReportStatus(`${nextPhotos.length} photo${nextPhotos.length === 1 ? '' : 's'} attached.`);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: detail.river.name }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
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
            </View>
          </View>
          <Text style={styles.explanation}>{normalizeApiText(detail.explanation)}</Text>
          <View style={styles.heroFooter}>
            <Text style={styles.heroFooterText}>{detail.gaugeBandLabel}</Text>
            <Text style={styles.heroFooterText}>{detail.confidence.label} confidence</Text>
            <Text style={styles.heroFooterText}>{formatTimestamp(detail.generatedAt)}</Text>
          </View>
        </View>

        {detail.river.riverId ? (
          <Pressable
            style={styles.riverHubLink}
            onPress={() =>
              router.push({ pathname: '/river-hub/[riverId]', params: { riverId: detail.river.riverId ?? '' } })
            }
          >
            <View style={styles.riverHubLinkCopy}>
              <Text style={styles.riverHubLinkLabel}>River hub</Text>
              <Text style={styles.riverHubLinkTitle}>Compare routes on {detail.river.name}</Text>
              <Text style={styles.riverHubLinkBody}>
                See how the tracked stretches on this river stack up before you pick a plan.
              </Text>
            </View>
            <Text style={styles.riverHubLinkAction}>Open</Text>
          </Pressable>
        ) : null}

        <SectionCard
          title="Route snapshot"
          subtitle="Put-in and take-out context before you commit to the drive."
        >
          <RouteSnapshotMap detail={detail} />
        </SectionCard>

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

        <SectionCard
          title="Why this call"
          subtitle="The route score combines water level, weather, trend, and confidence checks."
        >
          <ScoreFactorList detail={detail} />
        </SectionCard>

        <SectionCard title="Trip checks" subtitle="Conclusion first, supporting checks second.">
          <View style={styles.checklist}>
            {checklist.map((item) => (
              <ChecklistRow key={`${item.label}-${item.status}`} item={item} />
            ))}
          </View>
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

        <SectionCard
          title="Send a route report"
          subtitle="A short on-water note helps calibrate level, access, wood, and timing."
        >
          <RouteReportForm
            name={reportName}
            email={reportEmail}
            tripDate={reportDate}
            sentiment={reportSentiment}
            report={tripReport}
            notes={reportNotes}
            consent={reportConsent}
            photos={reportPhotos}
            status={reportStatus}
            pending={createRouteReportMutation.isPending}
            onChangeName={setReportName}
            onChangeEmail={setReportEmail}
            onChangeTripDate={setReportDate}
            onChangeSentiment={setReportSentiment}
            onChangeReport={setTripReport}
            onChangeNotes={setReportNotes}
            onToggleConsent={() => setReportConsent((current) => !current)}
            onPickPhotos={() => void pickReportPhotos()}
            onRemovePhoto={(uri) => setReportPhotos((current) => current.filter((photo) => photo.uri !== uri))}
            onSubmit={() => void submitRouteReport()}
          />
        </SectionCard>

        <SectionCard
          title="Planning basics"
          subtitle="Practical route information first. Confirm access rules and conditions before launch."
        >
          <View style={styles.accessBlock}>
            <AccessCard label="Put-in" point={detail.river.putIn} fallback="Put-in not mapped yet." />
            <AccessCard label="Take-out" point={detail.river.takeOut} fallback="Take-out not mapped yet." />
          </View>
          <View style={styles.accessMeta}>
            <MetricPill label="Distance" value={detail.river.distanceLabel || 'Check source'} />
            <MetricPill label="Paddle time" value={detail.river.estimatedPaddleTime || 'Check source'} />
            <MetricPill label="Difficulty" value={capitalize(detail.river.profile.difficulty)} />
            <MetricPill label="Route type" value={routeTypeLabel(detail.river.routeType)} />
            <MetricPill label="Gauge source" value={detail.river.gaugeSource.display.shortLabel} />
            <MetricPill label="Calibration" value={thresholdSourceLabel(detail.river.profile.thresholdSourceStrength)} />
          </View>
        </SectionCard>
      </ScrollView>
    </>
  );
}

function RouteSnapshotMap({ detail }: { detail: RiverDetailApiResult }) {
  const putIn = validMapPoint(detail.river.putIn);
  const takeOut = validMapPoint(detail.river.takeOut);
  const region = routeMapRegion(detail);

  if (!region) {
    return <Text style={styles.emptyText}>Route coordinates are not available yet.</Text>;
  }

  return (
    <View style={styles.routeMapBlock}>
      <View style={styles.routeMapFrame}>
        <MapView style={styles.routeMap} initialRegion={region} scrollEnabled={false} zoomEnabled={false} rotateEnabled={false} pitchEnabled={false}>
          {putIn ? <Marker coordinate={putIn} title="Put-in" description={detail.river.putIn?.name} pinColor={colors.accent} /> : null}
          {takeOut ? <Marker coordinate={takeOut} title="Take-out" description={detail.river.takeOut?.name} pinColor={colors.noGo} /> : null}
          {putIn && takeOut ? <Polyline coordinates={[putIn, takeOut]} strokeColor={colors.accent} strokeWidth={3} /> : null}
        </MapView>
      </View>
      <View style={styles.routeMapActions}>
        {detail.river.putIn ? <MapLink label="Open put-in" point={detail.river.putIn} /> : null}
        {detail.river.takeOut ? <MapLink label="Open take-out" point={detail.river.takeOut} /> : null}
      </View>
    </View>
  );
}

function MapLink({ label, point }: { label: string; point: RiverAccessPoint }) {
  const url = mapUrlForAccessPoint(point);
  if (!url) {
    return null;
  }

  return (
    <Pressable style={styles.mapActionButton} onPress={() => void Linking.openURL(url)}>
      <Text style={styles.mapActionText}>{label}</Text>
    </Pressable>
  );
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

function ScoreFactorList({ detail }: { detail: RiverDetailApiResult }) {
  const visibleFactors = detail.factors.slice(0, 6);

  return (
    <View style={styles.factorList}>
      <View style={styles.confidenceCallout}>
        <Text style={styles.confidenceTitle}>{detail.confidence.label} confidence ({detail.confidence.score}/100)</Text>
        <Text style={styles.confidenceBody}>
          {detail.confidence.reasons[0] ?? detail.confidence.rationale[0] ?? 'Confidence depends on gauge fit, source quality, and live data freshness.'}
        </Text>
      </View>
      {visibleFactors.map((factor) => (
        <View key={factor.id} style={styles.factorRow}>
          <View style={[styles.factorImpact, factorTone(factor.impact)]} />
          <View style={styles.factorCopy}>
            <View style={styles.factorHeader}>
              <Text style={styles.factorLabel}>{factor.label}</Text>
              <Text style={styles.factorValue}>{normalizeApiText(factor.value)}</Text>
            </View>
            <Text style={styles.factorDetail}>{normalizeApiText(factor.detail)}</Text>
          </View>
        </View>
      ))}
      {detail.confidence.warnings.length > 0 ? (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Watch-outs</Text>
          {detail.confidence.warnings.slice(0, 3).map((warning) => (
            <Text key={warning} style={styles.warningText}>- {normalizeApiText(warning)}</Text>
          ))}
        </View>
      ) : null}
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

function RouteReportForm({
  name,
  email,
  tripDate,
  sentiment,
  report,
  notes,
  consent,
  photos,
  status,
  pending,
  onChangeName,
  onChangeEmail,
  onChangeTripDate,
  onChangeSentiment,
  onChangeReport,
  onChangeNotes,
  onToggleConsent,
  onPickPhotos,
  onRemovePhoto,
  onSubmit,
}: {
  name: string;
  email: string;
  tripDate: string;
  sentiment: string;
  report: string;
  notes: string;
  consent: boolean;
  photos: SelectedReportPhoto[];
  status: string;
  pending: boolean;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeTripDate: (value: string) => void;
  onChangeSentiment: (value: string) => void;
  onChangeReport: (value: string) => void;
  onChangeNotes: (value: string) => void;
  onToggleConsent: () => void;
  onPickPhotos: () => void;
  onRemovePhoto: (uri: string) => void;
  onSubmit: () => void;
}) {
  return (
    <View style={styles.reportForm}>
      <ReportField label="Your name" value={name} onChangeText={onChangeName} placeholder="Name or paddling handle" />
      <ReportField
        label="Your email"
        value={email}
        onChangeText={onChangeEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <ReportField label="Trip date" value={tripDate} onChangeText={onChangeTripDate} placeholder="YYYY-MM-DD" />

      <View style={styles.sentimentGroup}>
        <Text style={styles.reportFieldLabel}>How did it feel?</Text>
        <View style={styles.sentimentRow}>
          {[
            ['great', 'Great'],
            ['good', 'Good'],
            ['mixed', 'Mixed'],
            ['rough', 'Rough'],
          ].map(([value, label]) => {
            const active = sentiment === value;
            return (
              <Pressable
                key={value}
                style={[styles.sentimentButton, active ? styles.sentimentButtonActive : null]}
                onPress={() => onChangeSentiment(active ? '' : value)}
              >
                <Text style={[styles.sentimentButtonText, active ? styles.sentimentButtonTextActive : null]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ReportField
        label="Route report"
        value={report}
        onChangeText={onChangeReport}
        placeholder="Example: level felt good, one new strainer river right, take-out stairs were slick."
        multiline
      />
      <ReportField
        label="Extra notes"
        value={notes}
        onChangeText={onChangeNotes}
        placeholder="Optional extra context for review."
        multiline
      />

      <View style={styles.photoPickerBlock}>
        <View style={styles.photoPickerHeader}>
          <View style={styles.photoPickerCopy}>
            <Text style={styles.reportFieldLabel}>Photos</Text>
            <Text style={styles.photoPickerHelp}>Attach up to {ROUTE_REPORT_MAX_PHOTOS} JPG, PNG, or WebP images.</Text>
          </View>
          <Pressable
            style={[styles.photoPickerButton, photos.length >= ROUTE_REPORT_MAX_PHOTOS ? styles.photoPickerButtonDisabled : null]}
            disabled={photos.length >= ROUTE_REPORT_MAX_PHOTOS}
            onPress={onPickPhotos}
          >
            <Text style={styles.photoPickerButtonText}>Add photos</Text>
          </Pressable>
        </View>

        {photos.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoPreviewStrip}>
            {photos.map((photo) => (
              <View key={photo.uri} style={styles.photoPreviewCard}>
                <Image source={{ uri: photo.uri }} style={styles.photoPreviewImage} resizeMode="cover" />
                <Text style={styles.photoPreviewName} numberOfLines={1}>{photo.fileName}</Text>
                <Pressable style={styles.photoRemoveButton} onPress={() => onRemovePhoto(photo.uri)}>
                  <Text style={styles.photoRemoveText}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.photoPickerEmpty}>No photos attached.</Text>
        )}
      </View>

      <Pressable style={styles.consentRow} onPress={onToggleConsent}>
        <View style={[styles.checkbox, consent ? styles.checkboxChecked : null]}>
          {consent ? <Text style={styles.checkboxMark}>X</Text> : null}
        </View>
        <Text style={styles.consentText}>It's okay to contact me if more detail is needed before publishing.</Text>
      </Pressable>

      <Pressable
        style={[styles.reportSubmitButton, pending ? styles.reportSubmitButtonDisabled : null]}
        disabled={pending}
        onPress={onSubmit}
      >
        <Text style={styles.reportSubmitText}>{pending ? 'Sending...' : 'Send route report'}</Text>
      </Pressable>
      <Text style={styles.reportStatus}>{status}</Text>
    </View>
  );
}

function ReportField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) {
  return (
    <View style={styles.reportField}>
      <Text style={styles.reportFieldLabel}>{label}</Text>
      <TextInput
        style={[styles.reportInput, multiline ? styles.reportTextarea : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={keyboardType === 'email-address' ? false : undefined}
      />
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

function validMapPoint(point: RiverAccessPoint | undefined) {
  if (
    !point ||
    typeof point.latitude !== 'number' ||
    !Number.isFinite(point.latitude) ||
    typeof point.longitude !== 'number' ||
    !Number.isFinite(point.longitude)
  ) {
    return null;
  }

  return {
    latitude: point.latitude,
    longitude: point.longitude,
  };
}

function routeMapRegion(detail: RiverDetailApiResult): Region | null {
  const points = [validMapPoint(detail.river.putIn), validMapPoint(detail.river.takeOut)].filter(
    (point): point is { latitude: number; longitude: number } => Boolean(point)
  );

  if (points.length === 0) {
    if (Number.isFinite(detail.river.latitude) && Number.isFinite(detail.river.longitude)) {
      return {
        latitude: detail.river.latitude,
        longitude: detail.river.longitude,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      };
    }

    return null;
  }

  const latitudes = points.map((point) => point.latitude);
  const longitudes = points.map((point) => point.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLon + maxLon) / 2,
    latitudeDelta: Math.max(0.06, (maxLat - minLat) * 2.4),
    longitudeDelta: Math.max(0.06, (maxLon - minLon) * 2.4),
  };
}

function factorTone(impact: RiverDetailApiResult['factors'][number]['impact']) {
  if (impact === 'positive') return { backgroundColor: colors.strong };
  if (impact === 'negative') return { backgroundColor: colors.noGo };
  if (impact === 'warning') return { backgroundColor: colors.fair };
  return { backgroundColor: colors.textMuted };
}

function routeTypeLabel(value: RiverDetailApiResult['river']['routeType']) {
  return value === 'whitewater' ? 'Whitewater' : 'Recreational';
}

function thresholdSourceLabel(value: RiverDetailApiResult['river']['profile']['thresholdSourceStrength']) {
  if (value === 'official') return 'Official';
  if (value === 'mixed') return 'Mixed sources';
  if (value === 'community') return 'Community';
  return 'Derived';
}

function isSupportedReportPhotoType(value: string) {
  return value === 'image/jpeg' || value === 'image/png' || value === 'image/webp';
}

function mimeTypeForFileName(fileName: string) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

function extensionForMimeType(mimeType: string) {
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/webp') return 'webp';
  return 'jpg';
}

function estimateBase64Bytes(value: string) {
  if (!value) return 0;
  const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((value.length * 3) / 4) - padding);
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
    padding: spacing.lg,
    gap: spacing.lg,
  },
  hero: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroHeader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  heroScore: {
    width: 86,
    height: 86,
    borderRadius: 26,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: colors.accentDeep,
    fontSize: 36,
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
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  heroMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  explanation: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
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
  riverHubLink: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#BFD6CC',
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  riverHubLinkCopy: {
    flex: 1,
    gap: 4,
  },
  riverHubLinkLabel: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  riverHubLinkTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  riverHubLinkBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  riverHubLinkAction: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '900',
  },
  routeMapBlock: {
    gap: spacing.md,
  },
  routeMapFrame: {
    height: 240,
    overflow: 'hidden',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.canvasMuted,
  },
  routeMap: {
    flex: 1,
  },
  routeMapActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  mapActionButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  mapActionText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
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
    fontSize: 19,
    fontWeight: '800',
  },
  metricDetail: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
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
  factorList: {
    gap: spacing.md,
  },
  confidenceCallout: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 5,
  },
  confidenceTitle: {
    color: colors.accentDeep,
    fontSize: 16,
    fontWeight: '900',
  },
  confidenceBody: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  factorRow: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  factorImpact: {
    width: 5,
    borderRadius: radius.pill,
  },
  factorCopy: {
    flex: 1,
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
    fontSize: 15,
    fontWeight: '900',
  },
  factorValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'right',
    maxWidth: 130,
  },
  factorDetail: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  warningBox: {
    backgroundColor: '#F3E8CC',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 6,
  },
  warningTitle: {
    color: colors.fair,
    fontSize: 14,
    fontWeight: '900',
  },
  warningText: {
    color: colors.text,
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
  reportForm: {
    gap: spacing.md,
  },
  reportField: {
    gap: 7,
  },
  reportFieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  reportInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  reportTextarea: {
    minHeight: 104,
    lineHeight: 22,
  },
  photoPickerBlock: {
    gap: spacing.sm,
  },
  photoPickerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  photoPickerCopy: {
    flex: 1,
    gap: 3,
  },
  photoPickerHelp: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  photoPickerButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  photoPickerButtonDisabled: {
    opacity: 0.5,
  },
  photoPickerButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '800',
  },
  photoPreviewStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
  },
  photoPreviewCard: {
    width: 130,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: 7,
  },
  photoPreviewImage: {
    width: '100%',
    height: 86,
    borderRadius: radius.sm,
    backgroundColor: colors.canvasMuted,
  },
  photoPreviewName: {
    color: colors.textMuted,
    fontSize: 12,
  },
  photoRemoveButton: {
    alignSelf: 'flex-start',
  },
  photoRemoveText: {
    color: colors.noGo,
    fontSize: 12,
    fontWeight: '800',
  },
  photoPickerEmpty: {
    color: colors.textMuted,
    fontSize: 13,
  },
  sentimentGroup: {
    gap: 8,
  },
  sentimentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sentimentButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  sentimentButtonActive: {
    backgroundColor: colors.accent,
  },
  sentimentButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  sentimentButtonTextActive: {
    color: colors.surfaceStrong,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
  },
  checkboxMark: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
  consentText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  reportSubmitButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 12,
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
    fontSize: 13,
    lineHeight: 19,
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
});
