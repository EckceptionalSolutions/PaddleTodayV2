import { gaugeContextRows } from '@paddletoday/api-contract';
import { useQuery } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { apiClient } from '../api/client';
import { useNearViewport } from '../hooks/use-near-viewport';
import { useFreshnessClock } from '../hooks/use-freshness-clock';
import { useOnlineStatus } from '../hooks/use-online-status';
import { openExternalUrl } from '../lib/external-links';
import { colors, spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';

export function RiverGaugeContextCard({ slug, viewportCheck }: {
  slug: string; viewportCheck: MutableRefObject<(() => void) | null>;
}) {
  const { anchor, nearViewport, checkViewport } = useNearViewport(viewportCheck);
  const online = useOnlineStatus();
  const now = useFreshnessClock(nearViewport);
  const query = useQuery({ queryKey: ['river-gauge-context', slug],
    queryFn: ({ signal }) => apiClient.getRiverGaugeContext(slug, { signal }),
    enabled: nearViewport && online, retry: false, staleTime: 5 * 60_000,
    refetchInterval: nearViewport && online ? 5 * 60_000 : false,
  });
  const context = query.data?.context;
  return <View ref={anchor} collapsable={false} onLayout={checkViewport}>
    {context ? <SectionCard title="USGS gauge context"
      subtitle="Measurements at the gauge may differ from your paddling reach. These observations supplement the route’s paddling guidance.">
      <Text style={styles.detail}>{!online ? 'Offline · ' : ''}{now - Date.parse(context.fetchedAt) > 15 * 60_000 ? 'Saved update · ' : ''}Retrieved {new Date(context.fetchedAt).toLocaleString()}</Text>
      {gaugeContextRows(context).map(row => <View key={row.label} style={styles.row}>
        <Text style={styles.label}>{row.label}</Text>
        <Text style={styles.value}>{row.value}</Text>
        <Text style={styles.detail}>{row.detail}</Text>
        {row.observedAt ? <Text style={styles.detail}>{now - Date.parse(row.observedAt) > (row.staleAfterHours ?? 2) * 3_600_000 ? 'Older observation · ' : ''}{row.observedAt.length === 10 ? `Daily mean for ${row.observedAt}` : `Observed ${new Date(row.observedAt).toLocaleString()}`}</Text> : null}
      </View>)}
      <AppButton label="View USGS gauge data" variant="secondary" onPress={() => void openExternalUrl(context.sourceUrl)} />
    </SectionCard> : null}
  </View>;
}

const styles = StyleSheet.create({
  row: { gap: spacing.xs, marginVertical: spacing.xs },
  label: { ...typography.label, color: colors.textMuted },
  value: { ...typography.section, color: colors.text },
  detail: { ...typography.supporting, color: colors.textMuted },
});
