import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { Animated, Linking, PanResponder, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { normalizeApiText } from '../lib/format';
import { mapUrlForAccessPoint } from '../lib/maps';
import { routeFactItems, routeFactLine } from '../lib/route-facts';
import { RoutePhotoCard } from './route-photo-card';
import { colors, radius, spacing } from '../theme/tokens';

export type MapSheetSnap = 'peek' | 'half' | 'full';

export interface ExploreDrawerRiver extends RiverSummaryApiItem {
  distanceMiles: number | null;
  travelLabel: string | null;
}

interface ExploreRouteDrawerProps {
  selectedRiver: ExploreDrawerRiver;
  sheetSnap: MapSheetSnap;
  setSheetSnap: Dispatch<SetStateAction<MapSheetSnap>>;
  bottomInset?: number;
  routeCount?: number;
  isSaved: (slug: string) => boolean;
  onOpenRoute: () => void;
  onOpenRiverRoutes?: () => void;
  onContributePhotos: (slug: string) => void;
  onToggleSaved: (river: ExploreDrawerRiver) => void;
}

export function ExploreRouteDrawer({
  selectedRiver,
  sheetSnap,
  setSheetSnap,
  bottomInset = 0,
  routeCount = 1,
  isSaved,
  onOpenRoute,
  onOpenRiverRoutes,
  onContributePhotos,
  onToggleSaved,
}: ExploreRouteDrawerProps) {
  const { height: windowHeight } = useWindowDimensions();
  const maxSheetHeight = Math.max(sheetHeightValue('half'), Math.round(windowHeight * 0.86));
  const sheetGesture = useMapSheetPanResponder(sheetSnap, setSheetSnap, maxSheetHeight);
  const selectedDirectionsUrl = mapUrlForAccessPoint(selectedRiver.river.putIn);
  const expanded = sheetSnap !== 'peek';
  const full = sheetSnap === 'full';

  return (
    <Animated.View style={[styles.mapSheet, styles.fullMapSheet, sheetHeightStyle(bottomInset), { height: sheetGesture.animatedHeight }]}>
      <View style={styles.mapSheetHandleWrap} collapsable={false} {...sheetGesture.panHandlers}>
        <View style={styles.mapSheetHandle} />
      </View>
      <View style={styles.mapPreviewHeader}>
        <View style={styles.mapPreviewDragRegion} collapsable={false} {...sheetGesture.panHandlers}>
          <View style={styles.mapPreviewScore}>
            <Text style={styles.mapPreviewScoreText} selectable={false}>{selectedRiver.score}</Text>
          </View>
          <View style={styles.mapPreviewCopy}>
            <Text style={styles.mapPreviewLabel} selectable={false}>{selectedRiver.rating}</Text>
            <Text style={styles.mapPreviewTitle} numberOfLines={1} selectable={false}>
              {selectedRiver.river.name}
            </Text>
            <Text style={styles.mapPreviewMeta} numberOfLines={1} selectable={false}>
              {[selectedRiver.river.reach, selectedRiver.travelLabel].filter(Boolean).join(' - ')}
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.mapPreviewSave}
          onPress={() => onToggleSaved(selectedRiver)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={isSaved(selectedRiver.river.slug) ? 'Remove saved route' : 'Save route'}
          accessibilityHint={isSaved(selectedRiver.river.slug) ? 'Removes this route from Saved.' : 'Adds this route to Saved.'}
          accessibilityState={{ selected: isSaved(selectedRiver.river.slug) }}
        >
          <MaterialCommunityIcons
            name={isSaved(selectedRiver.river.slug) ? 'bookmark' : 'bookmark-outline'}
            color={colors.accent}
            size={22}
          />
        </Pressable>
      </View>
      {expanded ? (
        <RoutePhotoCard
          river={selectedRiver.river}
          compact
          height={82}
          onContributePhotos={() => onContributePhotos(selectedRiver.river.slug)}
        />
      ) : null}
      {expanded ? (
        <View style={styles.mapPreviewFacts}>
          {drawerFactItems(selectedRiver).slice(0, 3).map((fact) => (
            <View key={fact} style={styles.mapPreviewFactPill}>
              <Text style={styles.mapPreviewFactText} numberOfLines={1}>{fact}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <Text style={styles.mapPreviewReason} numberOfLines={expanded ? 2 : 1}>
        {drawerDecisionLine(selectedRiver)}
      </Text>
      {expanded ? (
        <View style={styles.conditionChipRow}>
          {drawerConditionItems(selectedRiver).map((item) => (
            <View key={item.label} style={styles.conditionChip}>
              <Text style={styles.conditionChipLabel}>{item.label}</Text>
              <Text style={styles.conditionChipValue} numberOfLines={1}>{item.value}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View style={styles.mapSheetActions}>
        <Pressable
          style={styles.mapPreviewOpenButton}
          onPress={onOpenRoute}
          accessibilityRole="button"
          accessibilityLabel={`Open ${selectedRiver.river.name}, ${selectedRiver.river.reach}`}
        >
          <Text style={styles.mapPreviewOpenText} numberOfLines={1}>Open route</Text>
        </Pressable>
        {routeCount > 1 && onOpenRiverRoutes ? (
          <Pressable
            style={styles.mapPreviewCompareButton}
            onPress={onOpenRiverRoutes}
            accessibilityRole="button"
            accessibilityLabel={`Compare ${routeCount} ${selectedRiver.river.name} routes`}
          >
            <Text style={styles.mapPreviewCompareText} numberOfLines={1}>Compare routes</Text>
          </Pressable>
        ) : null}
        {selectedDirectionsUrl ? (
          <Pressable
            style={styles.mapDirectionsButton}
            onPress={() => void Linking.openURL(selectedDirectionsUrl)}
            accessibilityRole="button"
            accessibilityLabel={`Directions to ${selectedRiver.river.name} put-in`}
          >
            <MaterialCommunityIcons name="directions" color={colors.accent} size={19} />
          </Pressable>
        ) : null}
        <Pressable
          style={styles.mapSheetSnapButton}
          onPress={() => setSheetSnap(nextSheetSnap(sheetSnap))}
          accessibilityRole="button"
          accessibilityLabel={sheetSnap === 'full' ? 'Collapse route drawer' : 'Expand route drawer'}
        >
          <MaterialCommunityIcons name={sheetSnap === 'full' ? 'chevron-down' : 'chevron-up'} color={colors.text} size={21} />
        </Pressable>
      </View>
      {full ? (
        <ScrollView
          style={styles.selectedDetailsScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.selectedDetails}
        >
          <View style={styles.selectedStatGrid}>
            <DrawerStat label="Score" value={`${selectedRiver.score} / ${selectedRiver.rating}`} icon="chart-donut" />
            <DrawerStat label="Distance" value={selectedRiver.river.distanceLabel || 'Unknown'} icon="map-marker-distance" />
            <DrawerStat label="Paddle time" value={selectedRiver.river.estimatedPaddleTime || 'Unknown'} icon="clock-outline" />
            <DrawerStat label="Difficulty" value={capitalize(selectedRiver.river.difficulty)} icon="waves" />
          </View>
          <View style={styles.selectedNote}>
            <Text style={styles.selectedNoteTitle}>Route context</Text>
            <Text style={styles.selectedNoteText}>{drawerFactLine(selectedRiver)}</Text>
          </View>
        </ScrollView>
      ) : null}
    </Animated.View>
  );
}

function DrawerStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}) {
  return (
    <View style={styles.selectedStat}>
      <MaterialCommunityIcons name={icon} color={colors.accent} size={17} />
      <Text style={styles.selectedStatLabel}>{label}</Text>
      <Text style={styles.selectedStatValue} numberOfLines={2}>{value}</Text>
    </View>
  );
}

function useMapSheetPanResponder(
  sheetSnap: MapSheetSnap,
  setSheetSnap: Dispatch<SetStateAction<MapSheetSnap>>,
  maxSheetHeight: number
) {
  const animatedHeight = useRef(new Animated.Value(sheetHeightValue(sheetSnap, maxSheetHeight))).current;
  const currentSnapRef = useRef(sheetSnap);

  useEffect(() => {
    currentSnapRef.current = sheetSnap;
    Animated.spring(animatedHeight, {
      toValue: sheetHeightValue(sheetSnap, maxSheetHeight),
      useNativeDriver: false,
      damping: 22,
      stiffness: 210,
      mass: 0.75,
    }).start();
  }, [animatedHeight, maxSheetHeight, sheetSnap]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onMoveShouldSetPanResponderCapture: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onPanResponderGrant: () => {
          animatedHeight.stopAnimation();
        },
        onPanResponderMove: (_event, gestureState) => {
          const baseHeight = sheetHeightValue(currentSnapRef.current, maxSheetHeight);
          animatedHeight.setValue(clampSheetHeight(baseHeight - gestureState.dy, maxSheetHeight));
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_event, gestureState) => {
          const nextSnap = snapSheetAfterDrag(currentSnapRef.current, gestureState.dy);
          currentSnapRef.current = nextSnap;
          setSheetSnap(nextSnap);
          Animated.spring(animatedHeight, {
            toValue: sheetHeightValue(nextSnap, maxSheetHeight),
            useNativeDriver: false,
            damping: 22,
            stiffness: 210,
            mass: 0.75,
          }).start();
        },
        onPanResponderTerminate: () => {
          Animated.spring(animatedHeight, {
            toValue: sheetHeightValue(currentSnapRef.current, maxSheetHeight),
            useNativeDriver: false,
            damping: 22,
            stiffness: 210,
            mass: 0.75,
          }).start();
        },
      }),
    [animatedHeight, maxSheetHeight, setSheetSnap]
  );

  return { panHandlers: panResponder.panHandlers, animatedHeight };
}

function sheetHeightStyle(bottomInset = 0) {
  return {
    paddingBottom: spacing.sm + bottomInset,
  };
}

export function sheetHeightValue(value: MapSheetSnap, maxHeight = 510) {
  if (value === 'full') return Math.min(510, maxHeight);
  if (value === 'half') return Math.min(356, Math.max(300, maxHeight - 96));
  return 168;
}

function nextSheetSnap(value: MapSheetSnap): MapSheetSnap {
  if (value === 'peek') return 'half';
  if (value === 'half') return 'full';
  return 'peek';
}

function snapSheetAfterDrag(value: MapSheetSnap, dragY: number): MapSheetSnap {
  if (dragY < -48) {
    if (value === 'peek') return 'half';
    return 'full';
  }

  if (dragY > 28) {
    if (value === 'full') return 'half';
    return 'peek';
  }

  return value;
}

function clampSheetHeight(height: number, maxSheetHeight: number) {
  return Math.min(sheetHeightValue('full', maxSheetHeight), Math.max(sheetHeightValue('peek', maxSheetHeight), height));
}

function drawerFactItems(river: ExploreDrawerRiver) {
  return routeFactItems(river.river, {
    includePaddleTime: true,
    includeNoCamping: true,
  }).filter((fact) => fact !== river.river.distanceLabel || !river.travelLabel)
    .slice(0, river.travelLabel ? 2 : 3)
    .concat(river.travelLabel ? [river.travelLabel] : []);
}

function drawerFactLine(river: ExploreDrawerRiver) {
  const base = routeFactLine(river.river, {
    includePaddleTime: true,
    includeNoCamping: true,
  });

  if (river.travelLabel) {
    return [base, river.travelLabel].filter(Boolean).join(' - ');
  }

  return base;
}

function drawerDecisionLine(river: ExploreDrawerRiver) {
  return `${river.rating}: ${normalizeApiText(river.summary.shortExplanation)}`;
}

function drawerConditionItems(river: ExploreDrawerRiver) {
  return [
    { label: 'Gauge', value: normalizeApiText(river.gaugeBandLabel) },
    { label: 'Confidence', value: river.confidence.label },
    { label: 'Data', value: river.liveData.overall === 'live' ? 'Live' : normalizeApiText(river.liveData.overall) },
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
    paddingBottom: spacing.sm,
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
    paddingBottom: 4,
    minHeight: 18,
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
  mapPreviewSave: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.canvasMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewFacts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
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
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.25,
  },
  conditionChipValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  mapPreviewFactPill: {
    maxWidth: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  mapPreviewFactText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '900',
  },
  mapPreviewOpenButton: {
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewOpenText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  mapPreviewCompareButton: {
    flex: 1,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  mapPreviewCompareText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  mapDirectionsButton: {
    width: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mapSheetSnapButton: {
    width: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDetailsScroll: {
    flex: 1,
    minHeight: 0,
  },
  selectedDetails: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  selectedStatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  selectedStat: {
    width: '48%',
    minHeight: 78,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    justifyContent: 'center',
    gap: 3,
  },
  selectedStatLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  selectedStatValue: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 17,
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
