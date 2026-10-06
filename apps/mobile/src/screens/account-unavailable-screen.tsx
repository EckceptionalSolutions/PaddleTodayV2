import { WebReady } from '../components/web-ready';
import { SectionCard } from '../components/section-card';
import { colors, spacing } from '../theme/tokens';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function AccountUnavailableScreen() {
  return <WebReady title="Account & backup">
    <ScrollView contentContainerStyle={styles.page}>
      <SectionCard title="Account & backup" subtitle="Sign in to back up saved routes and trip plans.">
        <Text style={styles.body}>Account sign-in isn’t enabled in this build. You can keep browsing routes and planning paddles on this device without an account.</Text>
      </SectionCard>
    </ScrollView>
  </WebReady>;
}

const styles = StyleSheet.create({
  page: { padding: spacing.md },
  body: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
});
