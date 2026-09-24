import { WebReady } from '../src/components/web-ready';
import { SectionCard } from '../src/components/section-card';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../src/theme/tokens';

export default function AccountWebScreen() {
  return <WebReady title="Account & backup">
    <ScrollView contentContainerStyle={styles.page}>
      <SectionCard title="Account & backup" subtitle="Your saved routes and trip plans can be backed up from the PaddleToday mobile app.">
        <Text style={styles.body}>Continue browsing rivers on this device. Mobile account sign-in is not available in the web app yet.</Text>
      </SectionCard>
    </ScrollView>
  </WebReady>;
}

const styles = StyleSheet.create({
  page: { padding: spacing.md },
  body: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
});
