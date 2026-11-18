import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform, Text, View } from 'react-native';
import { createTripsClient, TripApiError } from '@paddletoday/api-client';
import type { PublicTrip } from '@paddletoday/api-contract';
import { resolveApiBaseUrl } from '../lib/api-base-url';
import { useAppTheme } from '../theme/theme-provider';
import { spacing, typography } from '../theme/tokens';
import { AppButton } from './app-button';
import { SectionCard } from './section-card';

type ReaderState = 'loading' | 'failed' | 'unavailable' | PublicTrip;

export function SharedTripPlan({ id, token }: { id: string; token: string }) {
  const { colors } = useAppTheme();
  const [state, setState] = useState<ReaderState>('loading');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    const client = createTripsClient(resolveApiBaseUrl(), async () => '');
    void client.view(id, token).then(({ trip }) => { if (active) setState(trip); }).catch(error => {
      if (active) setState(error instanceof TripApiError && [400, 403, 404, 410].includes(error.status) ? 'unavailable' : 'failed');
    });
    return () => { active = false; };
  }, [attempt, id, token]);

  const trip = typeof state === 'object' ? state : null;
  const status = trip ? 'Shared trip plan loaded.' : state === 'loading' ? 'Loading shared trip plan…'
    : state === 'unavailable' ? 'This link is unavailable or has expired. Ask the organizer for a new link.'
    : 'Could not load this shared trip plan. Check your connection and try again.';
  useEffect(() => {
    if (Platform.OS === 'ios' && state !== 'loading') AccessibilityInfo.announceForAccessibility(status);
  }, [state, status]);
  const body = { ...typography.body, color: colors.text };
  const heading = { ...typography.section, color: colors.text };
  return <SectionCard title={trip?.title ?? 'Shared trip plan'}>
    <Text accessibilityLiveRegion="polite" style={body}>{status}</Text>
    {state === 'failed' ? <AppButton label="Retry" onPress={() => { setState('loading'); setAttempt(value => value + 1); }} /> : null}
    {trip ? <>
      <Text accessibilityRole="header" style={heading}>Access</Text>
      <Text style={body}>{trip.route.name}</Text>
      <Text style={body}>Put-in: {trip.route.putInName || 'To be decided'}</Text>
      <Text style={body}>Take-out: {trip.route.takeOutName || 'To be decided'}</Text>
      <Text accessibilityRole="header" style={heading}>Schedule</Text>
      <Text style={body}>Launch: {[trip.date, trip.launch].filter(Boolean).join(' · ') || 'To be decided'}</Text>
      {trip.expected || trip.expectedDate ? <Text style={body}>Expected return: {[trip.expectedDate || trip.date, trip.expected].filter(Boolean).join(' · ')}</Text> : null}
      <Text style={body}>Time zone: {trip.timeZone}</Text>
      <Text accessibilityRole="header" style={heading}>Stops</Text>
      {trip.itinerary.length ? trip.itinerary.map(stop => <View key={stop.id} style={{ gap: spacing.xs }}>
        <Text style={body}>{[stop.time, stop.location].filter(Boolean).join(' · ')}</Text>
        {stop.note ? <Text style={body}>{stop.note}</Text> : null}
      </View>) : <Text style={body}>No meeting stops listed.</Text>}
    </> : null}
  </SectionCard>;
}
