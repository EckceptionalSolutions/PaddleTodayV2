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
});
