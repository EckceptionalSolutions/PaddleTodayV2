import { WebReady } from '../../src/components/web-ready';
import { SectionCard } from '../../src/components/section-card';
import { spacing, type AppColors } from '../../src/theme/tokens';
import { useThemedStyles } from '../../src/theme/theme-provider';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function AuthCallbackWebRoute() {
  const styles = useThemedStyles(createStyles);
  return <WebReady title="Finish signing in"><ScrollView contentContainerStyle={styles.page}>
    <SectionCard title="Finish signing in" subtitle="Return to the PaddleToday app on the device where you requested your email link.">
      <Text style={styles.body}>If the app is not installed, install PaddleToday and request a new sign-in link.</Text>
    </SectionCard>
  </ScrollView></WebReady>;
}
const createStyles = (colors: AppColors) => StyleSheet.create({ page: { padding: spacing.md }, body: { color: colors.textMuted, fontSize: 15, lineHeight: 22 } });
