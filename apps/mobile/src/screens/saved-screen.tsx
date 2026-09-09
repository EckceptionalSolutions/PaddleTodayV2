import { stateAbbreviation } from '../lib/state-labels';
import { RouteComparisonSheet } from '../components/route-comparison-sheet';
import { ROUTE_COMPARISON_LIMIT, toggleRouteComparison } from '../lib/route-comparison';
import { useStoredLocation } from '../hooks/use-stored-location';
import { selectionKeyboardProps } from '../lib/selection-keyboard';
import { AppButton } from '../components/app-button';
import { AlertPreferencesNotice } from '../components/alert-preferences-notice';
import { SavedRouteNotes, SavedRouteNotesEditor } from '../components/saved-route-notes';
import { SavedTripDrafts } from '../components/saved-trip-drafts';
import { RecentRoutes } from '../components/recent-routes';
import type { SavedRiverRecord } from '../providers/saved-rivers-provider';
import { useSavedRouteChanges } from '../hooks/use-saved-route-changes';
import {
  formatRouteSegmentLabel,
  normalizeSearchText,
  routeSegmentSummary,
  type RiverAlertThreshold,
  type RiverSummaryApiItem,
} from '@paddletoday/api-contract';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateRiverAlertMutation, useRiverSummaryQuery } from '../api/queries';
import { AppLoadingState, AppRefreshNotice } from '../components/app-state';
import { RiverCard } from '../components/river-card';
import { SectionCard } from '../components/section-card';
import { SaveToggleButton } from '../components/save-toggle-button';
import { alertMutationMessage, alertThresholdLabel } from '../lib/alerts';
import { routeDecisionPresentation } from '../lib/map-decision';
import { registerForRiverAlertPushNotifications } from '../lib/native-notifications';
import { androidBottomInset } from '../lib/safe-area';
import { tabKeyboardProps } from '../lib/selection-keyboard';
import { useAlertPreferences, type SavedRouteAlertRecord } from '../providers/alert-preferences-provider';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { colors, radius, spacing } from '../theme/tokens';

type SavedTab = 'routes' | 'alerts';
interface SavedComparisonSelection { slugs: string[]; toggle: (slug: string) => void }

export default function SavedScreen() {
  const router = useRouter();
  const { location } = useStoredLocation();
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const [comparisonBarHeight, setComparisonBarHeight] = useState(130);
  const compareStart = useRef<View>(null);
  const searchInput = useRef<TextInput>(null);
  const [savedSearch, setSavedSearch] = useState('');
  const params = useLocalSearchParams<{ tab?: string | string[] }>();
  const requestedTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom);
  const summaryQuery = useRiverSummaryQuery();
  const createAlertMutation = useCreateRiverAlertMutation();
  const { savedRivers, isHydrated, hasLoadError, isSaved, toggleSavedRiver } = useSavedRivers();
  const { routeAlerts, recordRouteAlert, alertForRiver, isHydrated: alertsHydrated, loadError: alertsLoadError } = useAlertPreferences();
  const [alertStatus, setAlertStatus] = useState('You will get a phone notification when a route reaches your selected call.');
  const [pendingAlertKey, setPendingAlertKey] = useState<string | null>(null);
  const alertSubmissionInFlight = useRef(false);
  const [activeTab, setActiveTab] = useState<SavedTab>('routes');
  useEffect(() => {
    if (requestedTab === 'alerts' || requestedTab === 'routes') setActiveTab(requestedTab);
  }, [requestedTab]);
  const [notesRiver, setNotesRiver] = useState<SavedRiverRecord | null>(null);

  const rivers = useMemo(() => summaryQuery.data?.rivers ?? [], [summaryQuery.data?.rivers]);
  const riverLookup = new Map(rivers.map((river) => [river.river.slug, river]));
  const savedSummaries = savedRivers
    .map((savedRiver) => riverLookup.get(savedRiver.slug))
    .filter((river): river is NonNullable<typeof river> => Boolean(river));
  const alertSlugs = [...new Set([...savedRivers.map(route => route.slug), ...routeAlerts.map(alert => alert.riverSlug)])];
  const alertSummaries = alertSlugs.flatMap(slug => riverLookup.has(slug) ? [riverLookup.get(slug)!] : []);
  const missingAlertSlugs = alertSlugs.filter(slug => !riverLookup.has(slug));
  const savedAlertCount = useMemo(
    () => savedRivers.filter((river) => alertForRiver(river.slug)).length,
    [alertForRiver, savedRivers, routeAlerts]
  );
  const changes = useSavedRouteChanges(savedRivers, rivers, isHydrated && summaryQuery.isSuccess && !summaryQuery.isFetching && summaryQuery.data?.snapshotStatus !== 'stale');
  const savedGroups = groupSavedRoutes(savedSummaries);
  const searchTerms = normalizeSearchText(savedSearch).split(' ').filter(Boolean);
  const filtering = activeTab === 'routes' && searchTerms.length > 0;
  const visibleSavedRivers = searchTerms.length ? savedRivers.filter(record => {
    const details = riverLookup.get(record.slug)?.river;
    const searchable = normalizeSearchText([record.name, record.reach, record.notes, details?.state, details?.state ? stateAbbreviation(details.state) : '', details?.region].filter(Boolean).join(' '));
    return searchTerms.every(term => searchable.includes(term));
  }) : savedRivers;
  const visibleSlugs = new Set(visibleSavedRivers.map(record => record.slug));
  const visibleSummaries = savedSummaries.filter(route => visibleSlugs.has(route.river.slug));
  const visibleGroups = groupSavedRoutes(visibleSummaries);

  useEffect(() => {
    setComparedSlugs(current => {
      const next = current.filter(slug => savedRivers.some(route => route.slug === slug) && rivers.some(route => route.river.slug === slug));
      return next.length === current.length ? current : next;
    });
  }, [savedRivers, rivers]);
  const comparedRoutes = comparedSlugs.flatMap(slug => riverLookup.has(slug) ? [riverLookup.get(slug)!] : []);
  const compareSelection: SavedComparisonSelection | undefined = comparisonMode ? {
    slugs: comparedSlugs,
    toggle: slug => { Keyboard.dismiss(); setComparedSlugs(current => toggleRouteComparison(current, slug, savedSummaries.map(route => route.river.slug))); },
  } : undefined;
  const showComparisonBar = comparisonMode && activeTab === 'routes';
  function cancelComparison() {
    setComparisonMode(false);
    setComparedSlugs([]);
    setComparisonVisible(false);
    requestAnimationFrame(() => compareStart.current?.focus());
  }


  async function submitSavedRouteAlert(river: RiverSummaryApiItem, threshold: RiverAlertThreshold) {
    if (alertSubmissionInFlight.current) return;
    alertSubmissionInFlight.current = true;
    const key = `${river.river.slug}:${threshold}`;
    setPendingAlertKey(key);
    setAlertStatus(`Saving ${alertThresholdLabel(threshold)} alert for ${river.river.name}...`);
    try {
      const registration = await registerForRiverAlertPushNotifications();
      if (!registration.ok || !registration.expoPushToken) {
        setAlertStatus(registration.message);
        return;
      }

      const response = await createAlertMutation.mutateAsync({
        riverSlug: river.river.slug,
        threshold,
        deliveryMethod: 'push',
        expoPushToken: registration.expoPushToken,
      });
      await recordRouteAlert({ riverSlug: river.river.slug, threshold, deliveryMethod: 'push' });
      setAlertStatus(alertMutationMessage(response, threshold, 'push'));
    } catch (error) {
      setAlertStatus(
        error instanceof PaddleTodayApiError && error.message
          ? error.message
          : `Could not save the ${alertThresholdLabel(threshold)} alert right now.`
      );
    } finally {
      alertSubmissionInFlight.current = false;
      setPendingAlertKey(null);
    }
  }

  if (!isHydrated) {
    return (
      <AppLoadingState title="Loading saved routes" />
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : undefined}>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.screen}
      refreshControl={<RefreshControl refreshing={summaryQuery.isFetching} onRefresh={() => void summaryQuery.refetch()} tintColor={colors.accent} />}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: spacing.md + insets.top,
          paddingBottom: spacing.xl + bottomContentInset + (showComparisonBar ? comparisonBarHeight : 0),
        },
      ]}
    >
      <AlertPreferencesNotice />
      <AppRefreshNotice
        label={activeTab === 'alerts' ? 'Recorded alert choices remain on this device.' : hasLoadError ? 'Route details could not be refreshed.' : 'Your saved-route list is still available.'}
        isError={summaryQuery.isError}
        isStale={summaryQuery.data?.snapshotStatus === 'stale'}
        retrying={summaryQuery.isFetching}
        dataUpdatedAt={summaryQuery.dataUpdatedAt}
        onRetry={() => void summaryQuery.refetch()}
      />
      <Text accessibilityRole="header" style={styles.title}>Saved routes</Text>
      <Text style={styles.subtitle}>
        A status board for rivers you check often.
      </Text>
      <SavedTabs activeTab={activeTab} onChange={setActiveTab} />
      {activeTab === 'routes' && (savedRivers.length > 1 || savedSearch.length > 0) ? <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={22} color={colors.textMuted} accessible={false} />
        <TextInput ref={searchInput} style={styles.searchInput} accessibilityLabel="Search saved routes" placeholder="River, reach, area, or note"
          placeholderTextColor={colors.textMuted} value={savedSearch} onChangeText={setSavedSearch}
          autoCorrect={false} autoCapitalize="none" returnKeyType="search" onSubmitEditing={() => Keyboard.dismiss()} />
        {savedSearch ? <Pressable accessibilityRole="button" accessibilityLabel="Clear saved route search" style={styles.searchClear}
          onPress={() => { setSavedSearch(''); searchInput.current?.focus(); }}>
          <MaterialCommunityIcons name="close" size={20} color={colors.textMuted} />
        </Pressable> : null}
      </View> : null}
      {filtering ? <Text accessibilityLiveRegion="polite" style={styles.compareHelp}>Showing {visibleSavedRivers.length} of {savedRivers.length} saved routes.</Text> : null}
      {filtering && savedRivers.length > 0 && visibleSavedRivers.length === 0 ? <SectionCard title="No saved routes match" subtitle="Try a river name, reach, area, or words from your personal notes.">
        <AppButton label="Show all saved routes" variant="secondary" onPress={() => { setSavedSearch(''); Keyboard.dismiss(); }} />
      </SectionCard> : null}
      {activeTab === 'routes' && savedSummaries.length >= 2 && !comparisonMode ? (
        <Pressable ref={compareStart} accessibilityRole="button" accessibilityLabel="Compare saved routes" style={styles.compareStart} onPress={() => setComparisonMode(true)}>
          <MaterialCommunityIcons name="compare-horizontal" accessible={false} size={20} color={colors.accentDeep} />
          <Text style={styles.compareStartText}>Compare saved routes</Text>
        </Pressable>
      ) : null}
      {activeTab === 'alerts' ? <SectionCard title="Nearby alerts and delivery" subtitle="Manage area-wide Today and Weekend updates, planning location, and device notification settings.">
        <AppButton label="Open notification settings" variant="secondary" icon="bell-outline" onPress={() => router.push('/notifications')} />
      </SectionCard> : null}
      {activeTab === 'routes' && !filtering ? <SavedTripDrafts routeNames={Object.fromEntries([...savedRivers.map(river => [river.slug, river.name]), ...rivers.map(river => [river.river.slug, river.river.name])])}
        onResume={record => router.push({ pathname: '/river/[slug]', params: { slug: record.target.routeSlug,
          putin: record.target.putInId ?? '', takeout: record.target.takeOutId ?? '', prepare: Date.now().toString() } })} /> : null}
      {activeTab === 'routes' && !filtering ? <RecentRoutes onOpen={slug => router.push({ pathname: '/river/[slug]', params: { slug } })} /> : null}

      {activeTab === 'routes' && savedRivers.length > 0 && !filtering ? (
        <View style={styles.savedOverview}>
          <OverviewTile icon="bookmark-check-outline" label="Saved" value={String(savedRivers.length)} />
          <OverviewTile icon="bell-ring-outline" label="Alerts" value={alertsHydrated && !alertsLoadError ? `${savedAlertCount}/${savedRivers.length}` : 'Unknown'} />
          <OverviewTile icon="waves" label="Current calls" value={`${savedGroups.paddle.length + savedGroups.watch.length + savedGroups.skip.length}/${savedRivers.length}`} />
        </View>
      ) : null}

      {activeTab === 'routes' && savedRivers.length === 0 && !hasLoadError ? (
        <View style={styles.emptyPanel}>
          <View style={styles.emptyIcon}>
            <MaterialCommunityIcons name="bookmark-outline" color={colors.accent} size={26} />
          </View>
          <Text style={styles.emptyTitle}>No saved routes yet</Text>
          <Text style={styles.emptyBody}>
            Save repeat routes here, then turn on alerts for the conditions you care about.
          </Text>
          <View style={styles.emptyActions}>
            <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={() => router.push('/')}>
              <Text style={styles.primaryButtonText}>Find today's picks</Text>
            </Pressable>
            <Pressable accessibilityRole="button" style={styles.secondaryButton} onPress={() => router.push('/explore')}>
              <Text style={styles.secondaryButtonText}>Open map</Text>
            </Pressable>
          </View>
        </View>
      ) : null}



      {activeTab === 'routes' && visibleSummaries.length > 0 ? (
        <>
          <View style={styles.statusBoard}>
            <StatusTile label="Paddle" value={visibleGroups.paddle.length} tone={styles.statusPaddle} />
            <StatusTile label="Watch" value={visibleGroups.watch.length} tone={styles.statusWatch} />
            <StatusTile label="No call" value={visibleGroups.unavailable.length} tone={styles.statusUnavailable} />
            <StatusTile label="Skip" value={visibleGroups.skip.length} tone={styles.statusSkip} />
          </View>

          <SavedRouteGroup
            comparison={compareSelection}
            title="Paddle today"
            subtitle="Saved routes with a current Paddle call."
            changes={changes}
            savedRivers={savedRivers}
            onEditNotes={setNotesRiver}
            rivers={visibleGroups.paddle}
            isSaved={isSaved}
            onToggleSaved={toggleSavedRiver}
            onOpen={(slug) => router.push({ pathname: '/river/[slug]', params: { slug } })}
          />
          <SavedRouteGroup
            comparison={compareSelection}
            title="Watch closely"
            subtitle="Saved routes that need a closer look."
            changes={changes}
            savedRivers={savedRivers}
            onEditNotes={setNotesRiver}
            rivers={visibleGroups.watch}
            isSaved={isSaved}
            onToggleSaved={toggleSavedRiver}
            onOpen={(slug) => router.push({ pathname: '/river/[slug]', params: { slug } })}
          />
          <SavedRouteGroup
            comparison={compareSelection}
            title="Call unavailable"
            subtitle="Saved routes that need current evidence before PaddleToday can make a call."
            changes={changes}
            savedRivers={savedRivers}
            onEditNotes={setNotesRiver}
            rivers={visibleGroups.unavailable}
            isSaved={isSaved}
            onToggleSaved={toggleSavedRiver}
            onOpen={(slug) => router.push({ pathname: '/river/[slug]', params: { slug } })}
          />
          <SavedRouteGroup
            comparison={compareSelection}
            title="Skip today"
            subtitle="Saved routes to recheck later."
            changes={changes}
            savedRivers={savedRivers}
            onEditNotes={setNotesRiver}
            rivers={visibleGroups.skip}
            isSaved={isSaved}
            onToggleSaved={toggleSavedRiver}
            onOpen={(slug) => router.push({ pathname: '/river/[slug]', params: { slug } })}
          />
        </>
      ) : null}

      {activeTab === 'routes' && visibleSavedRivers.some(route => !riverLookup.has(route.slug)) ? (
        <SectionCard
          title={summaryQuery.isPending ? 'Checking saved routes' : 'Saved routes without a call'}
          subtitle={summaryQuery.isPending ? 'Your list is ready while current calls load.' : 'Still saved. You can open route details or try refreshing the calls.'}
        >
          <View style={styles.list}>
            {visibleSavedRivers
              .filter((river) => !riverLookup.has(river.slug))
              .map((river) => (
                <View key={river.slug} style={styles.savedFallbackCard}>
                  <View style={styles.savedFallbackCopy}>
                    <Pressable
                      accessibilityRole="link"
                      accessibilityLabel={`Open ${river.name}: ${river.reach}`}
                      onPress={() => router.push({ pathname: '/river/[slug]', params: { slug: river.slug } })}
                    >
                      <Text style={styles.savedFallbackName}>{river.name}</Text>
                      <Text style={styles.savedFallbackReach}>{river.reach}</Text>
                    </Pressable>
                    <Text style={styles.savedFallbackNote}>
                      {summaryQuery.isPending ? 'Loading current call…' : 'Current call unavailable.'}
                    </Text>
                    <SavedRouteNotes river={river} onEdit={setNotesRiver} />
                    <SaveToggleButton routeSlug={river.slug} routeLabel={`${river.name}: ${river.reach}`} saved onPress={() => void toggleSavedRiver(river)} />
                  </View>
                </View>
              ))}
          </View>
        </SectionCard>
      ) : null}

      {activeTab === 'alerts' && alertSummaries.length > 0 ? (
        <SectionCard
          title="Condition alerts"
          subtitle="Alert choices recorded on this device. Good and Strong are separate phone alerts; you can enable either or both."
        >
          <View style={styles.alertRouteList}>
            {alertSummaries.map((river) => (
              <SavedAlertRow
                key={river.river.slug}
                river={river}
                alerts={routeAlerts.filter(alert => alert.riverSlug === river.river.slug)}
                preferencesReady={alertsHydrated && !alertsLoadError}
                pendingAlertKey={pendingAlertKey}
                onOpen={() => router.push({ pathname: '/river/[slug]', params: { slug: river.river.slug } })}
                onSubmitAlert={(threshold) => void submitSavedRouteAlert(river, threshold)}
              />
            ))}
          </View>
          <Text accessibilityLiveRegion="polite" style={styles.alertStatus}>{alertStatus}</Text>
        </SectionCard>
      ) : null}

      {activeTab === 'alerts' && missingAlertSlugs.length > 0 ? (
        <SectionCard
          title="Alert routes without current details"
          subtitle="Recorded choices remain available. Open a route or refresh to load its controls."
        >
          {missingAlertSlugs.map(slug => {
            const saved = savedRivers.find(route => route.slug === slug);
            const name = saved?.name ?? slug.replace(/-/g, ' ');
            const summary = recordedAlertSummary(routeAlerts.filter(alert => alert.riverSlug === slug));
            return <View key={slug} style={styles.list}><View style={styles.alertEmptyPanel}>
            <MaterialCommunityIcons name="bell-alert-outline" color={colors.accent} size={24} />
            <View style={styles.alertEmptyCopy}>
              <Text style={styles.alertEmptyTitle}>{name}</Text>
              {saved?.reach ? <Text style={styles.alertEmptyBody}>{saved.reach}</Text> : null}
              <Text style={styles.alertEmptyBody}>
                {summary || (alertsHydrated && !alertsLoadError ? 'No recorded alert on this device.' : 'Recorded alert choice unavailable.')}
              </Text>
            </View>
          </View><AppButton label="Open route" accessibilityLabel={`Open alert route: ${name}`} variant="secondary"
            onPress={() => router.push({ pathname: '/river/[slug]', params: { slug } })} /></View>;
          })}
        </SectionCard>
      ) : null}
      {activeTab === 'alerts' && alertSlugs.length === 0 && alertsHydrated && !alertsLoadError && !hasLoadError ? <SectionCard
        title="No route alerts recorded" subtitle="Open a route to choose Good or Strong alerts. Nearby alerts are managed separately above.">
        <AppButton label="Browse routes for alerts" variant="secondary" onPress={() => router.push('/explore')} />
      </SectionCard> : null}

      {notesRiver ? <SavedRouteNotesEditor key={notesRiver.slug} river={notesRiver} onClose={() => setNotesRiver(null)} /> : null}
    </ScrollView>
    {showComparisonBar ? <View style={styles.comparisonBar} onLayout={event => setComparisonBarHeight(event.nativeEvent.layout.height)}>
      <Text accessibilityLiveRegion="polite" style={styles.compareHelp}>{comparedRoutes.length} of {ROUTE_COMPARISON_LIMIT} selected. {savedSummaries.length < 2 ? 'Two saved routes with details are needed.' : comparedRoutes.length < 2 ? 'Select at least two saved routes.' : 'Ready to compare.'}</Text>
      <View style={styles.comparisonActions}>
        <AppButton label={`Compare (${comparedRoutes.length})`} accessibilityLabel={`Compare ${comparedRoutes.length} selected saved ${comparedRoutes.length === 1 ? 'route' : 'routes'}`}
          disabled={comparedRoutes.length < 2} onPress={() => { Keyboard.dismiss(); setComparisonVisible(true); }} />
        <AppButton label="Cancel comparison" variant="secondary" onPress={cancelComparison} />
      </View>
    </View> : null}
    <RouteComparisonSheet visible={comparisonVisible} routes={comparedRoutes} location={location}
      isStale={summaryQuery.data?.snapshotStatus === 'stale'} onClose={() => setComparisonVisible(false)}
      onRemove={slug => setComparedSlugs(current => current.filter(value => value !== slug))}
      onOpen={route => { setComparisonVisible(false); router.push({ pathname: '/river/[slug]', params: { slug: route.river.slug } }); }} />
    </KeyboardAvoidingView>
  );
}

function OverviewTile({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.overviewTile} accessible accessibilityLabel={`${label}: ${value}`}>
      <MaterialCommunityIcons name={icon as never} color={colors.accent} size={18} />
      <View style={styles.overviewCopy}>
        <Text style={styles.overviewLabel}>{label}</Text>
        <Text style={styles.overviewValue}>{value}</Text>
      </View>
    </View>
  );
}

function SavedTabs({
  activeTab,
  onChange,
}: {
  activeTab: SavedTab;
  onChange: (tab: SavedTab) => void;
}) {
  return (
    <View accessibilityRole="tablist" accessibilityLabel="Saved route sections" style={styles.tabs}>
      <SavedTabButton
        keyboardProps={tabKeyboardProps(0, activeTab === 'routes', 2, (index) => onChange(index === 0 ? 'routes' : 'alerts'))}
        icon="bookmark-outline"
        label="Saved routes"
        active={activeTab === 'routes'}
        onPress={() => onChange('routes')}
      />
      <SavedTabButton
        keyboardProps={tabKeyboardProps(1, activeTab === 'alerts', 2, (index) => onChange(index === 0 ? 'routes' : 'alerts'))}
        icon="bell-outline"
        label="Alerts"
        active={activeTab === 'alerts'}
        onPress={() => onChange('alerts')}
      />
    </View>
  );
}

function SavedTabButton({
  keyboardProps,
  icon,
  label,
  active,
  onPress,
}: {
  keyboardProps: ReturnType<typeof tabKeyboardProps>;
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      {...keyboardProps}
      style={[styles.tabButton, active ? styles.tabButtonActive : null]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      aria-selected={active}
      accessibilityState={{ selected: active }}
    >
      <MaterialCommunityIcons name={icon as never} color={active ? colors.surfaceStrong : colors.accent} size={18} />
      <Text style={[styles.tabButtonText, active ? styles.tabButtonTextActive : null]}>{label}</Text>
    </Pressable>
  );
}

function StatusTile({ label, value, tone }: { label: string; value: number; tone: object }) {
  return (
    <View style={[styles.statusTile, tone]}>
      <Text style={styles.statusValue}>{value}</Text>
      <Text style={styles.statusLabel}>{label}</Text>
    </View>
  );
}

function recordedAlertSummary(alerts: SavedRouteAlertRecord[]) {
  const thresholds = ['good', 'strong'] as const;
  const labelsFor = (method: 'push' | 'email') => thresholds.filter(threshold => alerts.some(alert => alert.threshold === threshold && alert.deliveryMethod === method)).map(alertThresholdLabel).join(', ');
  const phone = labelsFor('push');
  const email = labelsFor('email');
  return [phone ? `Phone alerts: ${phone}` : null, email ? `Email alerts: ${email}` : null].filter(Boolean).join(' · ');
}

function SavedAlertRow({
  river,
  alerts,
  preferencesReady,
  pendingAlertKey,
  onOpen,
  onSubmitAlert,
}: {
  river: RiverSummaryApiItem;
  alerts: SavedRouteAlertRecord[];
  preferencesReady: boolean;
  pendingAlertKey: string | null;
  onOpen: () => void;
  onSubmitAlert: (threshold: RiverAlertThreshold) => void;
}) {
  const summary = recordedAlertSummary(alerts);
  return (
    <View style={styles.savedAlertRow}>
      <Pressable accessibilityRole="button" accessibilityLabel={`Open ${river.river.name}: ${river.river.reach}`} style={styles.savedAlertCopy} onPress={onOpen}>
        <Text style={styles.savedAlertName}>{river.river.name}</Text>
        <Text style={styles.savedAlertReach}>{river.river.reach}</Text>
        <Text style={styles.savedAlertState}>
          {summary || (preferencesReady ? 'No alert set' : 'Saved alert choice unavailable')}
        </Text>
      </Pressable>
      <View style={styles.savedAlertActions}>
        {(['good', 'strong'] as const).map((threshold) => {
          const pending = pendingAlertKey === `${river.river.slug}:${threshold}`;
          const selected = alerts.some(alert => alert.threshold === threshold && alert.deliveryMethod === 'push');
          return (
            <Pressable
              key={threshold}
              style={[styles.alertMiniButton, selected ? styles.alertMiniButtonSelected : null, pendingAlertKey ? styles.alertMiniButtonDisabled : null]}
              accessibilityRole="button"
              accessibilityLabel={`${alertThresholdLabel(threshold)} phone alert for ${river.river.name}: ${river.river.reach}`}
              accessibilityState={{ disabled: Boolean(pendingAlertKey), busy: pending, selected }}
              aria-busy={pending}
              aria-pressed={selected}
              disabled={Boolean(pendingAlertKey)}
              onPress={() => onSubmitAlert(threshold)}
            >
              <Text style={[styles.alertMiniButtonText, selected ? styles.alertMiniButtonTextSelected : null]}>
                {pending ? '...' : `${alertThresholdLabel(threshold)}${selected ? ' · On' : ''}`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function SavedRouteGroup({
  comparison,
  title,
  subtitle,
  rivers,
  changes,
  savedRivers,
  onEditNotes,
  isSaved,
  onToggleSaved,
  onOpen,
}: {
  title: string;
  subtitle: string;
  comparison?: SavedComparisonSelection;
  rivers: RiverSummaryApiItem[];
  changes: Record<string, string[]>;
  savedRivers: SavedRiverRecord[];
  onEditNotes: (river: SavedRiverRecord) => void;
  isSaved: (slug: string) => boolean;
  onToggleSaved: (river: { slug: string; riverId?: string; name: string; reach: string }) => void | Promise<void>;
  onOpen: (slug: string) => void;
}) {
  if (rivers.length === 0) return null;
  return (
    <SectionCard title={title} subtitle={subtitle}>
      <View style={styles.list}>
        {rivers.map((river) => (
          <View key={river.river.slug}>
          <RiverCard
            river={river}
            changes={changes[river.river.slug]}
            showPhoto
            saved={isSaved(river.river.slug)}
            onToggleSaved={() =>
              void onToggleSaved({
                slug: river.river.slug,
                riverId: river.river.riverId,
                name: river.river.name,
                reach: river.river.reach,
              })
            }
            onPress={() => onOpen(river.river.slug)}
            segmentLabel={formatRouteSegmentLabel(routeSegmentSummary(river.river), null)}
          />
          {comparison ? <SavedCompareChoice river={river} comparison={comparison} /> : null}
          {savedRivers.find((item) => item.slug === river.river.slug) ? <SavedRouteNotes river={savedRivers.find((item) => item.slug === river.river.slug)!} onEdit={onEditNotes} /> : null}
          </View>
        ))}
      </View>
    </SectionCard>
  );
}

function SavedCompareChoice({ river, comparison }: { river: RiverSummaryApiItem; comparison: SavedComparisonSelection }) {
  const selected = comparison.slugs.includes(river.river.slug);
  const disabled = !selected && comparison.slugs.length >= ROUTE_COMPARISON_LIMIT;
  const toggle = () => comparison.toggle(river.river.slug);
  return <Pressable accessibilityRole="checkbox" accessibilityLabel={`Compare route: ${river.river.name}: ${river.river.reach}`}
    accessibilityHint={disabled ? 'Remove a route from the comparison to choose another.' : 'Select up to three saved routes.'}
    aria-checked={selected} accessibilityState={{ checked: selected, disabled }} disabled={disabled}
    onPress={toggle} {...selectionKeyboardProps(toggle, disabled)} style={[styles.compareChoice, disabled ? styles.compareChoiceDisabled : null]}>
    <MaterialCommunityIcons name={selected ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} size={22} color={colors.accent} />
    <Text style={styles.compareStartText}>{selected ? 'In comparison' : 'Compare this route'}</Text>
  </Pressable>;
}

function groupSavedRoutes(rivers: RiverSummaryApiItem[]) {
  return rivers.reduce(
    (groups, river) => {
      groups[routeDecisionPresentation(river).call].push(river);

      return groups;
    },
    {
      paddle: [] as RiverSummaryApiItem[],
      watch: [] as RiverSummaryApiItem[],
      unavailable: [] as RiverSummaryApiItem[],
      skip: [] as RiverSummaryApiItem[],
    }
  );
}

const styles = StyleSheet.create({
  searchBox: { flexDirection: 'row', alignItems: 'center', minHeight: 48, paddingLeft: spacing.sm, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong, gap: spacing.xs },
  searchInput: { flex: 1, minWidth: 0, minHeight: 48, color: colors.text, fontSize: 15, paddingVertical: spacing.sm, paddingRight: spacing.sm },
  searchClear: { width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  compareStart: { minHeight: 44, padding: spacing.sm, borderRadius: radius.md, borderWidth: 1, borderColor: colors.accent, backgroundColor: colors.surfaceStrong, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  compareStartText: { color: colors.accentDeep, fontSize: 14, lineHeight: 20, fontWeight: '700', flexShrink: 1 },
  compareChoice: { minHeight: 44, paddingHorizontal: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  compareChoiceDisabled: { opacity: 0.5 },
  comparisonBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.md, gap: spacing.sm, borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceStrong },
  comparisonActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  compareHelp: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    padding: spacing.md,
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  savedOverview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  overviewTile: {
    flexGrow: 1,
    flexBasis: '31%',
    minWidth: 96,
    minHeight: 58,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  overviewCopy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  overviewLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    flexShrink: 1,
  },
  overviewValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  tabs: {
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    padding: 4,
    flexDirection: 'row',
    gap: 4,
  },
  tabButton: {
    flex: 1,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  tabButtonActive: {
    backgroundColor: colors.accent,
  },
  tabButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  tabButtonTextActive: {
    color: colors.surfaceStrong,
  },
  list: {
    gap: spacing.sm,
  },
  statusBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  statusTile: {
    flexGrow: 1,
    flexBasis: '20%',
    minWidth: 60,
    alignItems: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
    gap: 2,
  },
  statusPaddle: {
    backgroundColor: '#E0EFE9',
  },
  statusWatch: {
    backgroundColor: '#F3E8CC',
  },
  statusUnavailable: {
    backgroundColor: '#E7E5E0',
  },
  statusSkip: {
    backgroundColor: '#F2DDD6',
  },
  statusValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  statusLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
  },
  alertRouteList: {
    gap: spacing.sm,
  },
  savedAlertRow: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  savedAlertCopy: {
    flex: 1,
    minWidth: 150,
    gap: 2,
  },
  savedAlertName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  savedAlertReach: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  savedAlertState: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '800',
  },
  savedAlertActions: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 6,
  },
  alertMiniButton: {
    minWidth: 54,
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  alertMiniButtonSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  alertMiniButtonDisabled: {
    opacity: 0.6,
  },
  alertMiniButtonText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  alertMiniButtonTextSelected: {
    color: colors.surfaceStrong,
  },
  alertStatus: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  alertEmptyPanel: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  alertEmptyCopy: {
    flex: 1,
    gap: 3,
  },
  alertEmptyTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  alertEmptyBody: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
  },
  emptyPanel: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  emptyActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryButton: {
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  primaryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  secondaryButton: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  secondaryButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  savedFallbackCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
  },
  savedFallbackCopy: {
    gap: 4,
  },
  savedFallbackName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  savedFallbackReach: {
    color: colors.textMuted,
    fontSize: 14,
  },
  savedFallbackNote: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});
