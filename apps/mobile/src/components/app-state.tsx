import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';

export function AppLoadingState({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <ScrollView style={styles.stateScroll} contentContainerStyle={styles.centerState}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text accessibilityRole="header" style={styles.stateTitle}>{title}</Text>
      {body ? <Text style={styles.stateBody}>{body}</Text> : null}
    </ScrollView>
  );
}

export function AppErrorState({
  title,
  body,
  detail,
  actionLabel = 'Try again',
  icon = 'wifi-off',
  retrying = false,
  onRetry,
}: {
  title: string;
  body: string;
  detail?: string;
  actionLabel?: string;
  icon?: 'wifi-off' | 'map-marker-question-outline';
  retrying?: boolean;
  onRetry?: () => void;
}) {
  return (
    <ScrollView style={styles.stateScroll} contentContainerStyle={styles.centerState}>
      <View style={styles.iconShell}>
        <MaterialCommunityIcons name={icon} color={colors.noGo} size={24} />
      </View>
      <Text accessibilityRole="header" style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateBody}>{body}</Text>
      {detail ? (
        <Text style={styles.stateDetail} numberOfLines={4}>
          {detail}
        </Text>
      ) : null}
      {onRetry ? (
        <AppButton label={actionLabel} onPress={onRetry} busy={retrying} busyLabel="Retrying…" icon="refresh" style={{ marginTop: spacing.sm }} />
      ) : null}
    </ScrollView>
  );
}

export function AppRefreshNotice({
  label = 'Showing the last available update.',
  actionLabel = 'Retry refresh',
  isError,
  isStale = false,
  dataUpdatedAt,
  retrying = false,
  onRetry,
}: {
  label?: string;
  actionLabel?: string;
  isError: boolean;
  isStale?: boolean;
  dataUpdatedAt?: number;
  retrying?: boolean;
  onRetry: () => void;
}) {
  if (!isError && !isStale) {
    return null;
  }

  return (
    <View style={styles.refreshNotice} accessibilityRole="alert">
      <View style={styles.refreshNoticeCopy}>
        <Text style={styles.refreshNoticeTitle}>{isError ? 'Could not refresh' : 'Update needed'}</Text>
        <Text style={styles.refreshNoticeBody}>
          {label} {!isStale && dataUpdatedAt ? `Updated ${formatRelativeTime(dataUpdatedAt)}.` : ''}
        </Text>
      </View>
      <AppButton label={isError ? 'Retry' : 'Refresh'} accessibilityLabel={isError ? actionLabel : 'Refresh cached conditions'} onPress={onRetry} busy={retrying} busyLabel={isError ? 'Retrying…' : 'Refreshing…'} />
    </View>
  );
}

function formatRelativeTime(timestamp: number) {
  const elapsedMinutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (elapsedMinutes < 1) return 'just now';
  if (elapsedMinutes === 1) return '1 minute ago';
  if (elapsedMinutes < 60) return `${elapsedMinutes} minutes ago`;
  const elapsedHours = Math.round(elapsedMinutes / 60);
  return elapsedHours === 1 ? '1 hour ago' : `${elapsedHours} hours ago`;
}

const styles = StyleSheet.create({
  stateScroll: { flex: 1, backgroundColor: colors.canvas },
  centerState: {
    flexGrow: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  iconShell: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F2DDD6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  stateTitle: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
  },
  stateBody: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
  stateDetail: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  refreshNotice: {
    borderRadius: radius.md,
    backgroundColor: '#F3E8CC',
    borderWidth: 1,
    borderColor: '#D8C58E',
    padding: spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  refreshNoticeCopy: {
    flex: 1,
    minWidth: 140,
    gap: 2,
  },
  refreshNoticeTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
  },
  refreshNoticeBody: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
});
