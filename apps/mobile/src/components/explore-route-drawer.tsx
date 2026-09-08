import {
  formatRouteSegmentLabel,
  type RiverSummaryApiItem,
  type RouteSegment,
  type RouteSegmentSummary,
} from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, PanResponder, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, { cancelAnimation, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSavedRivers } from '../providers/saved-rivers-provider';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { routeDecisionPresentation } from '../lib/map-decision';
import { mapUrlForAccessPoint } from '../lib/maps';
import { openExternalUrl } from '../lib/external-links';
import { routeDecisionLine } from '../lib/route-facts';
import { formatPaddleTimeRange } from '../lib/format';
import { RoutePhotoCard } from './route-photo-card';
import { decisionColors } from './rating-pill';
import { colors, radius, spacing } from '../theme/tokens';

export type MapSheetSnap = 'peek' | 'half' | 'full';

export interface ExploreDrawerRiver extends RiverSummaryApiItem {
  distanceMiles: number | null;
  travelLabel: string | null;
  selectedSegment?: RouteSegment | null;
  segmentSummary?: RouteSegmentSummary | null;
}

interface ExploreRouteDrawerProps {
  selectedRiver: ExploreDrawerRiver;
  sheetSnap: MapSheetSnap;
  setSheetSnap: Dispatch<SetStateAction<MapSheetSnap>>;
  bottomInset?: number;
  availableHeight?: number;
  routeCount?: number;
  isSaved: (slug: string) => boolean;
  onClose: () => void;
  onOpenRoute: () => void;
  onOpenRiverRoutes?: () => void;
  onContributePhotos: (slug: string) => void;
  onToggleSaved: (river: RiverSummaryApiItem) => void;
}

export function ExploreRouteDrawer({
  selectedRiver,
  sheetSnap,
  setSheetSnap,
  bottomInset = 0,
  availableHeight,
  routeCount = 1,
  isSaved,
  onClose,
  onOpenRoute,
  onOpenRiverRoutes,
  onContributePhotos,
  onToggleSaved,
}: ExploreRouteDrawerProps) {
  const { isUpdatingSavedRiver } = useSavedRivers();
  const saving = isUpdatingSavedRiver(selectedRiver.river.slug);
  const { height: windowHeight } = useWindowDimensions();
  const maxSheetHeight = Math.max(0, availableHeight ?? Math.round((windowHeight - bottomInset) * 0.86));
  const compactLayout = maxSheetHeight < 480;
  const collapsedHeight = drawerCollapsedHeight(maxSheetHeight, routeCount > 1 && Boolean(onOpenRiverRoutes) && !selectedRiver.selectedSegment);
  const sheetGesture = useMapSheetPanResponder(sheetSnap, setSheetSnap, maxSheetHeight, collapsedHeight, onClose);
  const selectedPutIn = selectedRiver.selectedSegment?.putIn ?? selectedRiver.river.putIn;
  const selectedDirectionsUrl = mapUrlForAccessPoint(selectedPutIn);
  const full = sheetSnap === 'full';
  const decision = routeDecisionPresentation(selectedRiver);
  const tone = decisionColors(selectedRiver.rating, decision.readiness);
  const segmentLabel = formatRouteSegmentLabel(selectedRiver.segmentSummary ?? null, selectedRiver.selectedSegment ?? null);
  const photo = <RoutePhotoCard key={`photo:${selectedRiver.river.slug}`} river={selectedRiver.river} compact
    height={full ? 86 : 78} onContributePhotos={() => onContributePhotos(selectedRiver.river.slug)} />;

  return (
    <Animated.View style={[styles.mapSheet, styles.fullMapSheet, sheetGesture.animatedStyle]}>
      <View style={styles.mapSheetHandleWrap} collapsable={false} {...sheetGesture.panHandlers}>
        <Pressable
          style={styles.mapSheetHandleButton}
          onPress={() => setSheetSnap(nextSheetSnap(sheetSnap))}
          accessibilityRole="button"
          accessibilityLabel={sheetSnap === 'full' ? 'Collapse route drawer' : 'Expand route drawer'}
          accessibilityState={{ expanded: full }}
          aria-expanded={full}
        >
          <View style={styles.mapSheetHandle} />
        </Pressable>
      </View>
      <View style={styles.mapPreviewHeader}>
        <View style={styles.mapPreviewDragRegion} collapsable={false} {...sheetGesture.panHandlers}>
          <View style={[styles.mapPreviewScore, { backgroundColor: tone.backgroundColor }]}>
            <Text style={[styles.mapPreviewScoreText, { color: tone.textColor }]} accessibilityLabel={decision.description} selectable={false}>{decision.score ?? '—'}</Text>
          </View>
          <View style={styles.mapPreviewCopy}>
            <Text style={styles.mapPreviewLabel} selectable={false}>
              {decision.label}
            </Text>
            <Text style={styles.mapPreviewTitle} numberOfLines={1} selectable={false}>
              {selectedRiver.river.name}
            </Text>
          <Text style={styles.mapPreviewMeta} numberOfLines={1} selectable={false}>
            {[selectedRiver.river.reach, selectedRiver.travelLabel].filter(Boolean).join(' - ')}
          </Text>
          {segmentLabel ? (
            <Text style={styles.mapPreviewSegment} numberOfLines={1} selectable={false}>
              {selectedRiver.selectedSegment
                ? `${segmentLabel} · ${selectedRiver.selectedSegment.putIn.name} → ${selectedRiver.selectedSegment.takeOut.name}`
                : segmentLabel}
            </Text>
          ) : null}
          </View>
        </View>
        <Pressable
          style={styles.mapPreviewSave}
          onPress={() => onToggleSaved(selectedRiver)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={isSaved(selectedRiver.river.slug) ? 'Remove saved route' : 'Save route'}
          accessibilityHint={isSaved(selectedRiver.river.slug) ? 'Removes this route from Saved routes.' : 'Adds this route to Saved routes.'}
          disabled={saving}
          aria-busy={saving}
          accessibilityState={{ selected: isSaved(selectedRiver.river.slug), disabled: saving, busy: saving }}
        >
          {saving ? <ActivityIndicator size="small" color={colors.accent} /> : <MaterialCommunityIcons
            name={isSaved(selectedRiver.river.slug) ? 'bookmark' : 'bookmark-outline'}
            color={colors.accent}
            size={22}
          />}
        </Pressable>
        <Pressable
          style={styles.mapPreviewClose}
          onPress={onClose}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Close route drawer"
        >
          <MaterialCommunityIcons name="close" color={colors.textMuted} size={21} />
        </Pressable>
      </View>
      {!compactLayout ? photo : null}
      <View style={styles.mapSheetActions}>
        <View style={styles.mapSheetPrimaryActions}>
          <Pressable
            style={({ pressed }) => [styles.mapPreviewOpenButton, pressed ? { opacity: 0.75 } : null]}
            onPress={onOpenRoute}
            accessibilityRole="button"
            accessibilityLabel={`Open route: ${selectedRiver.river.name}, ${selectedRiver.river.reach}`}
          >
            <Text style={styles.mapPreviewOpenText} numberOfLines={1}>Open route</Text>
          </Pressable>
          <Pressable
            style={[styles.mapDirectionsButton, selectedDirectionsUrl ? null : styles.mapDirectionsButtonDisabled]}
            disabled={!selectedDirectionsUrl}
            onPress={() => selectedDirectionsUrl ? void openExternalUrl(selectedDirectionsUrl, 'Directions') : undefined}
            accessibilityRole="button"
            accessibilityLabel={`Directions to ${selectedPutIn?.name ?? selectedRiver.river.name} put-in`}
          >
            <MaterialCommunityIcons name="directions" color={selectedDirectionsUrl ? colors.accent : colors.textMuted} size={18} />
            <Text style={[styles.mapDirectionsText, selectedDirectionsUrl ? null : styles.mapDirectionsTextDisabled]} numberOfLines={1}>
              Directions
            </Text>
          </Pressable>
          <Pressable
            style={styles.mapSheetSnapButton}
            onPress={() => setSheetSnap(nextSheetSnap(sheetSnap))}
            accessibilityRole="button"
            accessibilityLabel={sheetSnap === 'full' ? 'Collapse route drawer' : 'Expand route drawer'}
            accessibilityState={{ expanded: full }}
            aria-expanded={full}
          >
            <MaterialCommunityIcons name={sheetSnap === 'full' ? 'chevron-down' : 'chevron-up'} color={colors.text} size={21} />
          </Pressable>
        </View>
        {routeCount > 1 && onOpenRiverRoutes && !selectedRiver.selectedSegment ? (
          <Pressable
            style={styles.drawerCompareButton}
            onPress={onOpenRiverRoutes}
            accessibilityRole="button"
            accessibilityLabel={`Compare ${routeCount} ${selectedRiver.river.name} routes`}
          >
            <MaterialCommunityIcons name="map-marker-path" color={colors.accent} size={18} />
            <Text style={styles.drawerCompareText} numberOfLines={1}>Compare {routeCount} routes</Text>
          </Pressable>
        ) : null}
      </View>
      {full ? (
        <ScrollView
          key={`details:${selectedRiver.river.slug}`}
          style={styles.drawerContentScroll}
          showsVerticalScrollIndicator
          persistentScrollbar
          contentContainerStyle={[styles.drawerContent, { paddingBottom: spacing.sm + bottomInset }]}
        >
          <Text style={styles.mapPreviewReason}>
            {drawerDecisionLine(selectedRiver)}
          </Text>
          {selectedRiver.selectedSegment ? (
            <View style={styles.selectedNote}>
              <Text style={styles.selectedNoteTitle}>Selected segment</Text>
              <Text style={styles.selectedNoteText}>
                {selectedRiver.selectedSegment.putIn.name} to {selectedRiver.selectedSegment.takeOut.name} · {selectedRiver.selectedSegment.distanceMiles.toFixed(1)} mi
              </Text>
            </View>
          ) : null}
          <View style={styles.drawerDetailGrid}>
            <DrawerDetailItem
              icon="map-marker-distance"
              label={selectedRiver.selectedSegment ? 'Selected distance' : 'Distance'}
              value={selectedRiver.selectedSegment ? `${selectedRiver.selectedSegment.distanceMiles.toFixed(1)} mi` : selectedRiver.river.distanceLabel || 'Unknown'}
            />
            <DrawerDetailItem
              icon="clock-outline"
              label={selectedRiver.selectedSegment ? 'Selected paddle time' : 'Paddle time'}
              value={selectedRiver.selectedSegment
                ? formatPaddleTimeRange(selectedRiver.selectedSegment.estimatedHours.min, selectedRiver.selectedSegment.estimatedHours.max)
                : selectedRiver.river.estimatedPaddleTime || 'Unknown'}
            />
            <DrawerDetailItem
              icon="waves"
              label="Difficulty"
              value={capitalize(selectedRiver.river.difficulty)}
            />
          </View>
          <View style={styles.conditionChipRow}>
            {drawerConditionItems(selectedRiver).map((item) => (
              <View key={item.label} style={styles.conditionChip}>
                <Text style={styles.conditionChipLabel}>{item.label}</Text>
                <Text style={styles.conditionChipValue} numberOfLines={1}>{item.value}</Text>
              </View>
            ))}
          </View>
          {compactLayout ? photo : null}
        </ScrollView>
      ) : (
        <Text style={styles.mapPreviewReason} numberOfLines={2}>
          {drawerDecisionLine(selectedRiver)}
        </Text>
      )}
    </Animated.View>
  );
}

function DrawerDetailItem({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.drawerDetailItem}>
      <MaterialCommunityIcons name={icon} color={colors.accent} size={16} />
      <Text style={styles.drawerDetailLabel}>{label}</Text>
      <Text style={styles.drawerDetailValue} numberOfLines={2}>{value}</Text>
    </View>
  );
}

function useMapSheetPanResponder(
  sheetSnap: MapSheetSnap,
  setSheetSnap: Dispatch<SetStateAction<MapSheetSnap>>,
  maxSheetHeight: number,
  collapsedHeight: number,
  onClose: () => void
) {
  const reducedMotion = useReducedMotion();
  const animatedHeight = useSharedValue(sheetHeightValue(sheetSnap, maxSheetHeight, collapsedHeight));
  const animatedStyle = useAnimatedStyle(() => ({ height: animatedHeight.value }));
  const currentSnapRef = useRef(sheetSnap);

  useEffect(() => {
    currentSnapRef.current = sheetSnap;
    const target = sheetHeightValue(sheetSnap, maxSheetHeight, collapsedHeight);
    animatedHeight.value = reducedMotion ? target : withSpring(target, SHEET_SPRING);
    return () => cancelAnimation(animatedHeight);
  }, [animatedHeight, maxSheetHeight, collapsedHeight, sheetSnap, reducedMotion]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onMoveShouldSetPanResponderCapture: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onPanResponderGrant: () => {
          cancelAnimation(animatedHeight);
        },
        onPanResponderMove: (_event, gestureState) => {
          const baseHeight = sheetHeightValue(currentSnapRef.current, maxSheetHeight, collapsedHeight);
          animatedHeight.value = clampSheetHeight(baseHeight - gestureState.dy, maxSheetHeight, collapsedHeight);
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_event, gestureState) => {
          const nextSnap = snapSheetAfterDrag(currentSnapRef.current, gestureState.dy);
          if (!nextSnap) {
            onClose();
            return;
          }

          const changed = currentSnapRef.current !== nextSnap;
          currentSnapRef.current = nextSnap;
          setSheetSnap(nextSnap);
          // A changed snap starts its spring in the effect. A short drag back
          // to the same snap still needs to settle, without two competing springs.
          if (!changed) {
            const target = sheetHeightValue(nextSnap, maxSheetHeight, collapsedHeight);
            animatedHeight.value = reducedMotion ? target : withSpring(target, SHEET_SPRING);
          }
        },
        onPanResponderTerminate: () => {
          const target = sheetHeightValue(currentSnapRef.current, maxSheetHeight, collapsedHeight);
          animatedHeight.value = reducedMotion ? target : withSpring(target, SHEET_SPRING);
        },
      }),
    [animatedHeight, maxSheetHeight, collapsedHeight, onClose, setSheetSnap, reducedMotion]
  );

  return { panHandlers: panResponder.panHandlers, animatedStyle };
}

// The live preference hook owns reduced motion, including changes after launch.
const SHEET_SPRING = { damping: 22, stiffness: 210, mass: 0.75, reduceMotion: ReduceMotion.Never };

export function sheetHeightValue(value: MapSheetSnap, maxHeight = 510, collapsedHeight = 304) {
  // Keep the expanded tray close to its content height. The previous 500pt
  // cap left a large dead zone above the tab bar on phone-sized screens.
  if (value === 'full') return Math.min(430, maxHeight);
  return Math.min(maxHeight, collapsedHeight);
}

export function drawerCollapsedHeight(availableHeight: number, hasComparison: boolean) {
  return (availableHeight < 480 ? 252 : 304) + (hasComparison ? 44 : 0);
}

function nextSheetSnap(value: MapSheetSnap): MapSheetSnap {
  if (value === 'full') return 'half';
  return 'full';
}

function snapSheetAfterDrag(value: MapSheetSnap, dragY: number): MapSheetSnap | null {
  if (dragY < -48) {
    return 'full';
  }

  if (dragY > 28) {
    if (value === 'full') return 'half';
    return null;
  }

  return value;
}

function clampSheetHeight(height: number, maxSheetHeight: number, collapsedHeight: number) {
  return Math.min(sheetHeightValue('full', maxSheetHeight), Math.max(sheetHeightValue('peek', maxSheetHeight, collapsedHeight), height));
}

function drawerDecisionLine(river: ExploreDrawerRiver) {
  return routeDecisionPresentation(river).call === 'unavailable' ? river.readiness.reason : routeDecisionLine(river.summary.shortExplanation);
}

function drawerConditionItems(river: ExploreDrawerRiver) {
  return [
    { label: 'Gauge', value: river.gaugeBandLabel },
    { label: 'Drive', value: river.travelLabel ?? river.river.region },
  ];
}

function capitalize(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

const styles = StyleSheet.create({
  fullMapSheet: {
    bottom: 0,
  },
  mapSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceStrong,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 16,
    zIndex: 20,
  },
  mapSheetHandleWrap: {
    alignItems: 'center',
    paddingTop: 9,
    paddingBottom: 8,
    minHeight: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mapSheetHandleButton: {
    minWidth: 72,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetHandle: {
    width: 42,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  mapPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mapPreviewDragRegion: {
    flex: 1,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mapPreviewScore: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewScoreText: {
    color: colors.accentDeep,
    fontSize: 17,
    fontWeight: '900',
  },
  mapPreviewCopy: {
    flex: 1,
    gap: 2,
  },
  mapPreviewLabel: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  mapPreviewTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  mapPreviewMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  mapPreviewSegment: {
    color: colors.accentDeep,
    fontSize: 11,
    fontWeight: '900',
  },
  mapPreviewSave: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.canvasMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewClose: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewReason: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '800',
  },
  conditionChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  conditionChip: {
    flexGrow: 1,
    minWidth: '47%',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    gap: 2,
  },
  conditionChipLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.25,
  },
  conditionChipValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  mapPreviewOpenButton: {
    flex: 1,
    minWidth: 0,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewOpenText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  mapDirectionsButton: {
    flex: 1,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: spacing.sm,
  },
  mapDirectionsButtonDisabled: {
    borderColor: colors.border,
    backgroundColor: colors.canvasMuted,
  },
  mapDirectionsText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  mapDirectionsTextDisabled: {
    color: colors.textMuted,
  },
  mapSheetActions: {
    gap: 8,
  },
  mapSheetPrimaryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  mapSheetSnapButton: {
    width: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContentScroll: {
    flex: 1,
    minHeight: 0,
  },
  drawerContent: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  drawerDetailGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  drawerDetailItem: {
    flex: 1,
    minHeight: 76,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    justifyContent: 'center',
    gap: 3,
  },
  drawerDetailLabel: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.25,
  },
  drawerDetailValue: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '900',
  },
  drawerCompareButton: {
    width: '100%',
    minHeight: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 5,
  },
  drawerCompareText: {
    color: colors.accent,
    flexShrink: 1,
    fontSize: 11,
    fontWeight: '900',
  },
  selectedNote: {
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: 4,
  },
  selectedNoteTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  selectedNoteText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
