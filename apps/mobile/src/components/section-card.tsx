import type { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { radius, shadowForColors, spacing, typography, type AppColors } from '../theme/tokens';
import { useThemedStyles } from '../theme/theme-provider';

export function SectionCard({
  title,
  subtitle,
  accessory,
  children,
}: PropsWithChildren<{
  title: string;
  subtitle?: string;
  accessory?: ReactNode;
}>) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text accessibilityRole="header" style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {accessory}
      </View>
      {children}
    </View>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadowForColors(colors),
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headerCopy: {
    flex: 1,
    minWidth: 140,
    gap: 4,
  },
  title: {
    ...typography.section,
    color: colors.text,
  },
  subtitle: {
    ...typography.supporting,
    color: colors.textMuted,
  },
});
