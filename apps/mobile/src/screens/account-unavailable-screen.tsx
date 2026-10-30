import { WebReady } from '../components/web-ready';
import { SectionCard } from '../components/section-card';
import { spacing, type AppColors } from '../theme/tokens';
import { useThemedStyles } from '../theme/theme-provider';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function AccountUnavailableScreen() {
  const styles = useThemedStyles(createStyles);
  return <WebReady title="Account & backup">
    <ScrollView contentContainerStyle={styles.page}>
      <SectionCard title="Account & backup" subtitle="Sign in to back up saved routes and trip plans.">
        <Text style={styles.body}>Account sign-in isn’t enabled in this build. You can keep browsing routes and planning paddles on this device without an account.</Text>
      </SectionCard>
    </ScrollView>
  </WebReady>;
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  page: { padding: spacing.md },
  body: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
});
