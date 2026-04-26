import type {
  ApprovedCommunityPhoto,
  ApprovedTripReport,
  DecisionChecklistItem,
  RiverAccessPoint,
  RiverAlertThreshold,
  RiverDetailApiResult,
} from '@paddletoday/api-contract';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { Stack, useLocalSearchParams } from 'expo-router';
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
import { useCreateRiverAlertMutation, useRiverDetailQuery, useRiverHistoryQuery, useRouteCommunityQuery } from '../api/queries';
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

export default function RiverDetailScreen() {
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? '';
  const detailQuery = useRiverDetailQuery(slug);
  const historyQuery = useRiverHistoryQuery(slug, 7);
  const communityQuery = useRouteCommunityQuery(slug);
  const createAlertMutation = useCreateRiverAlertMutation();
  const { email: storedEmail, setEmail } = useAlertPreferences();
  const { isSaved, toggleSavedRiver } = useSavedRivers();
  const [draftEmail, setDraftEmail] = useState(storedEmail);
  const [alertStatus, setAlertStatus] = useState('Alerts only email on a new threshold crossing.');
  const [pendingThreshold, setPendingThreshold] = useState<RiverAlertThreshold | null>(null);

  const detail = detailQuery.data?.result ?? null;
  const history = historyQuery.data?.result ?? null;
  const community = communityQuery.data ?? null;
  const checklist = useMemo(() => (detail ? detail.checklist.slice(0, 4) : []), [detail]);
  const communityReports = community?.reports ?? [];
  const communityPhotos = community?.photos ?? [];

  useEffect(() => {
    setDraftEmail(storedEmail);
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
          title="Access basics"
          subtitle="Practical launch information first. Route planning can get richer later."
        >
          <View style={styles.accessBlock}>
            <AccessCard label="Put-in" point={detail.river.putIn} fallback="Put-in not mapped yet." />
            <AccessCard label="Take-out" point={detail.river.takeOut} fallback="Take-out not mapped yet." />
          </View>
          <View style={styles.accessMeta}>
            <MetricPill label="Distance" value={detail.river.distanceLabel || 'Check source'} />
            <MetricPill label="Difficulty" value={capitalize(detail.river.profile.difficulty)} />
          </View>
        </SectionCard>
      </ScrollView>
    </>
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
