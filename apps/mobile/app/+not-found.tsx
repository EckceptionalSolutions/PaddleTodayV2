import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../src/theme/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text accessibilityRole="header" style={styles.title}>Page not found</Text>
        <Text style={styles.body}>This link may be outdated, or the screen may no longer be available.</Text>

        <Link href="/" replace style={styles.link}>
          <Text style={styles.linkText}>Go to today&apos;s routes</Text>
        </Link>
        <Link href="/explore" replace style={styles.link}>
          <Text style={styles.linkText}>Explore routes</Text>
        </Link>
        <Link href="/saved" replace style={styles.link}>
          <Text style={styles.linkText}>Open saved routes</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.canvas,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 360,
    marginVertical: spacing.sm,
  },
  link: {
    minHeight: 44,
    marginTop: spacing.sm,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
  },
  linkText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
});
