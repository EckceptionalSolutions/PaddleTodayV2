import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SectionCard } from '../components/section-card';
import { androidBottomInset } from '../lib/safe-area';
import { colors, spacing } from '../theme/tokens';

type LegalScreenKind = 'privacy' | 'terms';

const legalCopy = {
  privacy: {
    title: 'Privacy',
    kicker: 'PaddleToday',
    heading: 'Privacy Policy',
    updated: 'Last updated: July 16, 2026',
    intro:
      'PaddleToday uses only the information needed to provide route recommendations, feedback and support, alerts, and app diagnostics.',
    sections: [
      {
        title: 'Information we use',
        body:
          'The app may use your approximate or precise location when you choose location-aware route sorting. Feedback, route requests, support emails, alerts, and community submissions may include the contact details and notes you provide.',
      },
      {
        title: 'How it is used',
        body:
          'Location is used to estimate drive-aware route recommendations. Submitted feedback, route, alert, support, and report details are used to operate PaddleToday, improve the app and route data, and respond when needed.',
      },
      {
        title: 'Diagnostics',
        body:
          'Release builds may report crashes and app errors after observability is configured. Diagnostics are used to maintain the app and are not a substitute for official river, weather, access, or safety sources.',
      },
      {
        title: 'Contact',
        body:
          'Email hello@paddletoday.com with privacy questions, access requests, correction requests, or deletion requests.',
      },
    ],
  },
  terms: {
    title: 'Terms',
    kicker: 'PaddleToday',
    heading: 'Terms and Safety',
    updated: 'Last updated: June 17, 2026',
    intro:
      'PaddleToday is a planning aid. Paddling has inherent risks, and the app does not replace official gauges, forecasts, closures, local knowledge, or judgment at the launch.',
    sections: [
      {
        title: 'How route scores work',
        body:
          'Scores, ratings, forecasts, warnings, access points, and explanations are informational only. They are not safety advice, professional instruction, or a guarantee that a route is safe, legal to access, current, or suitable for your group.',
      },
      {
        title: 'Paddler responsibility',
        body:
          'You are responsible for checking official sources, weather, closures, access legality, hazards, takeouts, skill fit, group readiness, and proper equipment before deciding whether to launch.',
      },
      {
        title: 'Changing conditions',
        body:
          'Water levels, strainers, dams, releases, cold water, wind, storms, access status, private-bank issues, and route hazards can change without notice or be reported incorrectly. Paddling can involve serious injury or death.',
      },
      {
        title: 'Emergency services',
        body:
          'PaddleToday is not an emergency, rescue, dispatch, or real-time safety monitoring service. Use official sources, local authorities, and emergency services when needed.',
      },
      {
        title: 'Submissions',
        body:
          'Feedback, route requests, reports, notes, and photos may be reviewed, edited for clarity, rejected, or used to improve PaddleToday. Only submit material you have the right to share.',
      },
      {
        title: 'Contact',
        body:
          'Email hello@paddletoday.com if you spot incorrect route data, unsafe guidance, access changes, or other issues.',
      },
    ],
  },
} satisfies Record<LegalScreenKind, LegalContent>;

interface LegalContent {
  title: string;
  kicker: string;
  heading: string;
  updated: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
}

export function PrivacyScreen() {
  return <LegalScreen kind="privacy" />;
}

export function TermsScreen() {
  return <LegalScreen kind="terms" />;
}

function LegalScreen({ kind }: { kind: LegalScreenKind }) {
  const copy = legalCopy[kind];
  const insets = useSafeAreaInsets();
  const bottomContentInset = androidBottomInset(insets.bottom);

  return (
    <>
      <Stack.Screen options={{ title: copy.title }} />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: spacing.lg + insets.top,
            paddingBottom: spacing.xl + bottomContentInset,
          },
        ]}
      >
        <View style={styles.hero}>
          <Text style={styles.kicker}>{copy.kicker}</Text>
          <Text style={styles.title}>{copy.heading}</Text>
          <Text style={styles.updated}>{copy.updated}</Text>
          <Text style={styles.subtitle}>{copy.intro}</Text>
        </View>

        {copy.sections.map((section) => (
          <SectionCard key={section.title} title={section.title}>
            <Text style={styles.body}>{section.body}</Text>
          </SectionCard>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  hero: {
    gap: spacing.sm,
  },
  kicker: {
    color: colors.accentDeep,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  updated: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
  },
  body: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
});
