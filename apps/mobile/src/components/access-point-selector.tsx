import type { RiverRouteAccessPoint } from '@paddletoday/api-contract';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { colors, radius, spacing } from '../theme/tokens';

export function AccessPointSelector({
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
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const selectedPoint = points.find((point) => point.id === selectedId) ?? points[0];

  return (
    <View style={styles.accessSelector}>
      <Text style={styles.accessSelectorLabel}>{label}</Text>
      <Pressable
        style={styles.accessDropdownButton}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Select ${label}, currently ${selectedPoint?.name ?? 'not selected'}`}
        accessibilityState={{ expanded: open }}
        aria-expanded={open}
      >
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
      <Modal visible={open} transparent animationType={reducedMotion ? "none" : "fade"} onRequestClose={() => setOpen(false)}>
        <View style={styles.accessDropdownBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessible={false} focusable={false} aria-hidden />
          <View style={[styles.accessDropdownSheet, { paddingBottom: Math.max(spacing.md, insets.bottom + spacing.sm) }]}>
            <View style={styles.accessDropdownSheetHeader}>
              <Text accessibilityRole="header" style={styles.accessDropdownSheetTitle}>{label}</Text>
              <Pressable style={styles.accessDropdownClose} onPress={() => setOpen(false)} accessibilityRole="button" accessibilityLabel={`Close ${label} selection`}>
                <MaterialCommunityIcons name="close" color={colors.textMuted} size={20} />
              </Pressable>
            </View>
            <ScrollView style={styles.accessDropdownList} contentContainerStyle={styles.accessDropdownListContent}>
              {points.map((point) => {
                const selected = point.id === selectedPoint?.id;
                return (
                  <Pressable
                    key={`${label}-${point.id}`}
                    style={[styles.accessDropdownItem, selected ? styles.accessDropdownItemSelected : null]}
                    accessibilityRole="button"
                    accessibilityLabel={`${label}: ${point.name}`}
                    accessibilityState={{ selected }}
                    aria-pressed={selected}
                    onPress={() => {
                      onSelect(point);
                      setOpen(false);
                    }}
                  >
                    <View style={styles.accessDropdownItemCopy}>
                      <Text
                        style={[styles.accessDropdownItemName, selected ? styles.accessDropdownItemNameSelected : null]}
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
          </View>
        </View>
      </Modal>
    </View>
  );
}


function formatSegmentMile(mile: number) {
  if (!Number.isFinite(mile)) {
    return 'Mile --';
  }

  return `Mile ${mile.toFixed(mile >= 10 ? 0 : 1).replace(/\.0$/, '')}`;
}

const styles = StyleSheet.create({
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
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
});
