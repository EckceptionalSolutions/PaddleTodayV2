import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

export function AppLoadingState({
  title,
  body,
}: {
  title: string;
  body?: string;
}) {
  return (
    <View style={styles.centerState}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={styles.stateTitle}>{title}</Text>
      {body ? <Text style={styles.stateBody}>{body}</Text> : null}
    </View>
  );
}

export function AppErrorState({
  title,
  body,
  detail,
  actionLabel = 'Try again',
  onRetry,
}: {
  title: string;
  body: string;
  detail?: string;
  actionLabel?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.centerState}>
      <View style={styles.iconShell}>
        <MaterialCommunityIcons name="wifi-off" color={colors.noGo} size={24} />
      </View>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateBody}>{body}</Text>
      {detail ? (
        <Text style={styles.stateDetail} numberOfLines={4}>
          {detail}
        </Text>
      ) : null}
      {onRetry ? (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <MaterialCommunityIcons name="refresh" color={colors.surfaceStrong} size={18} />
          <Text style={styles.retryButtonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function AppRefreshNotice({
  label = 'Showing the last available call.',
  isError,
  dataUpdatedAt,
  onRetry,
}: {
  label?: string;
  isError: boolean;
  dataUpdatedAt?: number;
  onRetry: () => void;
}) {
  if (!isError) {
    return null;
  }

  return (
    <View style={styles.refreshNotice} accessibilityRole="alert">
      <View style={styles.refreshNoticeCopy}>
        <Text style={styles.refreshNoticeTitle}>Could not refresh</Text>
        <Text style={styles.refreshNoticeBody}>
          {label} {dataUpdatedAt ? `Updated ${formatRelativeTime(dataUpdatedAt)}.` : ''}
        </Text>
      </View>
      <Pressable
        style={styles.refreshNoticeButton}
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Retry refresh"
      >
        <Text style={styles.refreshNoticeButtonText}>Retry</Text>
      </Pressable>
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
  centerState: {
    flex: 1,
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
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  stateBody: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  stateDetail: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  retryButton: {
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: spacing.sm,
  },
  retryButtonText: {
    color: colors.surfaceStrong,
    fontSize: 14,
    fontWeight: '900',
  },
  refreshNotice: {
    borderRadius: radius.md,
    backgroundColor: '#F3E8CC',
    borderWidth: 1,
    borderColor: '#D8C58E',
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  refreshNoticeCopy: {
    flex: 1,
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
  refreshNoticeButton: {
    minHeight: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshNoticeButtonText: {
    color: colors.surfaceStrong,
    fontSize: 12,
    fontWeight: '900',
  },
});
