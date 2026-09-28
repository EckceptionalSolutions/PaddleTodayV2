import { WebReady } from '../src/components/web-ready';
import { SectionCard } from '../src/components/section-card';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../src/theme/tokens';
import { AppButton } from '../src/components/app-button';
import { openExternalUrl } from '../src/lib/external-links';
import { resolveWebUrl } from '../src/lib/api-base-url';

export default function AccountWebScreen() {
  return <WebReady title="Account">
    <ScrollView contentContainerStyle={styles.page}>
      <SectionCard title="Welcome to PaddleToday" subtitle="Your next paddle starts here.">
        <Text style={styles.body}>Open My trips on the PaddleToday website to sign in, plan a paddle, and see your paddling log.</Text>
        <AppButton label="Open My trips" onPress={() => { void openExternalUrl(resolveWebUrl('/trips/')); }} />
      </SectionCard>
    </ScrollView>
  </WebReady>;
}

const styles = StyleSheet.create({
  page: { padding: spacing.md },
  body: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
});
