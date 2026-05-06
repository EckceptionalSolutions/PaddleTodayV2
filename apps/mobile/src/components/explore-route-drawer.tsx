import type { RiverSummaryApiItem } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import {
  GestureResponderEvent,
  Linking,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { mapUrlForAccessPoint } from '../lib/maps';
import { colors, radius, spacing } from '../theme/tokens';

export type MapSheetSnap = 'peek' | 'half' | 'full';

export interface ExploreDrawerRiver extends RiverSummaryApiItem {
  distanceMiles: number | null;
  travelLabel: string | null;
}

interface ExploreRouteDrawerProps {
  results: ExploreDrawerRiver[];
  selectedRiver: ExploreDrawerRiver;
  selectedSlug: string | null;
  sheetSnap: MapSheetSnap;
  setSheetSnap: Dispatch<SetStateAction<MapSheetSnap>>;
  isSaved: (slug: string) => boolean;
  onOpenRoute: (slug: string) => void;
  onSelectSlug: (slug: string) => void;
  onToggleSaved: (river: ExploreDrawerRiver) => void;
}

export function ExploreRouteDrawer({
  results,
  selectedRiver,
  selectedSlug,
  sheetSnap,
  setSheetSnap,
  isSaved,
  onOpenRoute,
  onSelectSlug,
  onToggleSaved,
}: ExploreRouteDrawerProps) {
  const sheetGesture = useMapSheetPanResponder(sheetSnap, setSheetSnap);
  const selectedDirectionsUrl = mapUrlForAccessPoint(selectedRiver.river.putIn);

  return (
    <View style={[styles.mapSheet, styles.fullMapSheet, sheetHeightStyle(sheetSnap, sheetGesture.dragOffset)]}>
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
      <View style={styles.mapSheetActions}>
        {selectedDirectionsUrl ? (
          <Pressable style={styles.mapDirectionsButton} onPress={() => void Linking.openURL(selectedDirectionsUrl)}>
            <MaterialCommunityIcons name="directions" color={colors.accent} size={18} />
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.mapRouteStripViewport}
        contentContainerStyle={styles.mapRouteStrip}
      >
        {results.slice(0, 12).map((river) => {
          const selected = river.river.slug === selectedSlug;
          return (
            <Pressable
              key={river.river.slug}
              style={[styles.mapRouteChip, selected ? styles.mapRouteChipSelected : null]}
              onPress={() => onSelectSlug(river.river.slug)}
            >
              <Text style={[styles.mapRouteChipScore, selected ? styles.mapRouteChipScoreSelected : null]}>
                {river.score}
              </Text>
              <Text style={[styles.mapRouteChipText, selected ? styles.mapRouteChipTextSelected : null]} numberOfLines={1}>
                {river.river.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {sheetSnap !== 'peek' ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mapSheetList}>
          {results.slice(0, sheetSnap === 'full' ? 10 : 4).map((river) => (
            <MapSheetRouteRow
              key={river.river.slug}
              river={river}
              selected={river.river.slug === selectedSlug}
              saved={isSaved(river.river.slug)}
              onSelect={() => onSelectSlug(river.river.slug)}
              onOpen={() => onOpenRoute(river.river.slug)}
              onDirections={() => {
                const url = mapUrlForAccessPoint(river.river.putIn);
                if (url) void Linking.openURL(url);
              }}
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

function MapSheetRouteRow({
  river,
  selected,
  saved,
  onSelect,
  onOpen,
  onDirections,
}: {
  river: ExploreDrawerRiver;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onDirections: () => void;
}) {
  function handleDirections(event: GestureResponderEvent) {
    event.stopPropagation();
    onDirections();
  }

  function handleOpen(event: GestureResponderEvent) {
    event.stopPropagation();
    onOpen();
  }

  return (
    <Pressable style={[styles.mapSheetRow, selected ? styles.mapSheetRowSelected : null]} onPress={onSelect}>
      <View style={styles.mapSheetRowScore}>
        <Text style={styles.mapSheetRowScoreText}>{river.score}</Text>
      </View>
      <View style={styles.mapSheetRowCopy}>
        <Text style={styles.mapSheetRowTitle} numberOfLines={1}>{river.river.name}</Text>
        <Text style={styles.mapSheetRowMeta} numberOfLines={1}>
          {[river.river.reach, river.travelLabel, river.rating].filter(Boolean).join(' - ')}
        </Text>
      </View>
      {saved ? <MaterialCommunityIcons name="bookmark" color={colors.accent} size={17} /> : null}
      <Pressable style={styles.mapSheetRowDirections} onPress={handleDirections}>
        <MaterialCommunityIcons name="directions" color={colors.accent} size={18} />
      </Pressable>
      <Pressable style={styles.mapSheetRowOpen} onPress={handleOpen}>
        <MaterialCommunityIcons name="chevron-right" color={colors.surfaceStrong} size={18} />
      </Pressable>
    </Pressable>
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
          if (Math.abs(gestureState.dy) < 8) {
            setSheetSnap(nextSheetSnap(sheetSnap));
            return;
          }

          setSheetSnap(snapSheetAfterDrag(sheetSnap, gestureState.dy));
        },
        onPanResponderTerminate: () => setDragOffset(0),
      }),
    [setSheetSnap, sheetSnap]
  );

  return { panHandlers: panResponder.panHandlers, dragOffset };
}

function sheetHeightStyle(value: MapSheetSnap, dragOffset = 0) {
  return { height: clampSheetHeight(sheetHeightValue(value) + dragOffset) };
}

export function sheetHeightValue(value: MapSheetSnap) {
  if (value === 'full') return 430;
  if (value === 'half') return 296;
  return 168;
}

function nextSheetSnap(value: MapSheetSnap): MapSheetSnap {
  if (value === 'peek') return 'half';
  if (value === 'half') return 'full';
  return 'peek';
}

function snapSheetAfterDrag(value: MapSheetSnap, dragY: number): MapSheetSnap {
  if (dragY < -36) {
    if (value === 'peek') return 'half';
    return 'full';
  }

  if (dragY > 36) {
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
  mapPreviewOpenButton: {
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    minHeight: 38,
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
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  mapDirectionsText: {
    color: colors.accent,
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
  mapRouteStrip: {
    gap: spacing.sm,
    paddingRight: spacing.sm,
    alignItems: 'center',
  },
  mapRouteStripViewport: {
    flexGrow: 0,
    height: 48,
    maxHeight: 48,
  },
  mapRouteChip: {
    maxWidth: 150,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  mapRouteChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  mapRouteChipScore: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '900',
  },
  mapRouteChipScoreSelected: {
    color: colors.surfaceStrong,
  },
  mapRouteChipText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
    maxWidth: 104,
  },
  mapRouteChipTextSelected: {
    color: colors.surfaceStrong,
  },
  mapSheetList: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  mapSheetRow: {
    minHeight: 58,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mapSheetRowSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  mapSheetRowScore: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetRowScoreText: {
    color: colors.accentDeep,
    fontSize: 14,
    fontWeight: '900',
  },
  mapSheetRowCopy: {
    flex: 1,
    gap: 2,
  },
  mapSheetRowTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  mapSheetRowMeta: {
    color: colors.textMuted,
    fontSize: 12,
  },
  mapSheetRowOpen: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSheetRowDirections: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
