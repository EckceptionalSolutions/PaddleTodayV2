import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import { Linking, PanResponder, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { mapUrlForAccessPoint } from '../lib/maps';
import { routeFactItems, routeFactLine } from '../lib/route-facts';
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
  isSaved: (slug: string) => boolean;
  onOpenRoute: (slug: string) => void;
  onToggleSaved: (river: ExploreDrawerRiver) => void;
}

export function ExploreRouteDrawer({
  selectedRiver,
  sheetSnap,
  setSheetSnap,
  bottomInset = 0,
  isSaved,
  onOpenRoute,
  onToggleSaved,
}: ExploreRouteDrawerProps) {
  const sheetGesture = useMapSheetPanResponder(sheetSnap, setSheetSnap);
  const selectedDirectionsUrl = mapUrlForAccessPoint(selectedRiver.river.putIn);

  return (
    <View style={[styles.mapSheet, styles.fullMapSheet, sheetHeightStyle(sheetSnap, sheetGesture.dragOffset, bottomInset)]}>
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
        <Pressable style={styles.mapPreviewSave} onPress={() => onToggleSaved(selectedRiver)} hitSlop={8}>
          <MaterialCommunityIcons
            name={isSaved(selectedRiver.river.slug) ? 'bookmark' : 'bookmark-outline'}
            color={colors.accent}
            size={22}
          />
        </Pressable>
      </View>
      {sheetSnap !== 'peek' ? (
        <View style={styles.mapPreviewFacts}>
          {drawerFactItems(selectedRiver).slice(0, 3).map((fact) => (
            <View key={fact} style={styles.mapPreviewFactPill}>
              <Text style={styles.mapPreviewFactText} numberOfLines={1}>{fact}</Text>
            </View>
          ))}
        </View>
      ) : null}
      <View style={styles.mapSheetActions}>
        {selectedDirectionsUrl ? (
          <Pressable style={styles.mapDirectionsButton} onPress={() => void Linking.openURL(selectedDirectionsUrl)}>
            <MaterialCommunityIcons name="directions" color={colors.surfaceStrong} size={18} />
            <Text style={styles.mapDirectionsText}>Directions</Text>
          </Pressable>
        ) : null}
        <Pressable style={styles.mapPreviewOpenButton} onPress={() => onOpenRoute(selectedRiver.river.slug)}>
          <Text style={styles.mapPreviewOpenText}>Open route</Text>
        </Pressable>
        <Pressable style={styles.mapSheetSnapButton} onPress={() => setSheetSnap(nextSheetSnap(sheetSnap))}>
          <Text style={styles.mapSheetSnapText}>{sheetSnap === 'full' ? 'Less' : 'More'}</Text>
        </Pressable>
      </View>
      {sheetSnap !== 'peek' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.selectedDetails}>
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
    </View>
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
  setSheetSnap: Dispatch<SetStateAction<MapSheetSnap>>
) {
  const [dragOffset, setDragOffset] = useState(0);
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onMoveShouldSetPanResponderCapture: (_event, gestureState) => Math.abs(gestureState.dy) > 3,
        onPanResponderGrant: () => setDragOffset(0),
        onPanResponderMove: (_event, gestureState) => {
          setDragOffset(clampSheetDragOffset(sheetSnap, -gestureState.dy));
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: (_event, gestureState) => {
          setDragOffset(0);
          setSheetSnap(snapSheetAfterDrag(sheetSnap, gestureState.dy));
        },
        onPanResponderTerminate: () => setDragOffset(0),
      }),
    [setSheetSnap, sheetSnap]
  );

  return { panHandlers: panResponder.panHandlers, dragOffset };
}

function sheetHeightStyle(value: MapSheetSnap, dragOffset = 0, bottomInset = 0) {
  return {
    height: clampSheetHeight(sheetHeightValue(value) + dragOffset) + bottomInset,
    paddingBottom: spacing.md + bottomInset,
  };
}

export function sheetHeightValue(value: MapSheetSnap) {
  if (value === 'full') return 430;
  if (value === 'half') return 310;
  return 164;
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

function clampSheetDragOffset(value: MapSheetSnap, dragOffset: number) {
  const baseHeight = sheetHeightValue(value);
  return clampSheetHeight(baseHeight + dragOffset) - baseHeight;
}

function clampSheetHeight(height: number) {
  return Math.min(sheetHeightValue('full'), Math.max(sheetHeightValue('peek'), height));
}

function drawerFactItems(river: ExploreDrawerRiver) {
  return routeFactItems(river.river, {
    includePaddleTime: true,
    includeNoCamping: true,
    campingAvailableLabel: 'Camping info',
  }).filter((fact) => fact !== river.river.distanceLabel || !river.travelLabel)
    .slice(0, river.travelLabel ? 2 : 3)
    .concat(river.travelLabel ? [river.travelLabel] : []);
}

function drawerFactLine(river: ExploreDrawerRiver) {
  const base = routeFactLine(river.river, {
    includePaddleTime: true,
    includeNoCamping: true,
    campingAvailableLabel: 'Camping info',
  });

  if (river.travelLabel) {
    return [base, river.travelLabel].filter(Boolean).join(' - ');
  }

  return base;
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
    paddingBottom: spacing.md,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 16,
    zIndex: 20,
  },
  mapSheetHandleWrap: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    minHeight: 32,
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
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPreviewOpenText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  mapDirectionsButton: {
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  mapDirectionsText: {
    color: colors.surfaceStrong,
    fontSize: 13,
    fontWeight: '900',
  },
  mapSheetActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mapSheetSnapButton: {
    minWidth: 74,
    borderRadius: radius.pill,
    backgroundColor: colors.canvasMuted,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetSnapText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
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
