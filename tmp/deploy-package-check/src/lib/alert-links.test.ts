import { describe, expect, it } from 'vitest';

import { createRiverAlertActionToken, verifyRiverAlertActionToken } from './alert-links';

const alert = {
  id: 'alert_123',
  email: 'paddler@example.com',
  threshold: 'good',
  createdAt: '2026-04-06T12:00:00.000Z',
  riverSlug: 'rice-creek-peltier-to-long-lake',
  riverName: 'Rice Creek',
} as const;

describe('alert links', () => {
  it('creates a token that verifies for the same alert', () => {
    const token = createRiverAlertActionToken(alert, 'unsubscribe');
    expect(verifyRiverAlertActionToken(alert, token, 'unsubscribe')).toBe(true);
  });

  it('rejects a token if the alert details do not match', () => {
    const token = createRiverAlertActionToken(alert, 'unsubscribe');
    expect(
      verifyRiverAlertActionToken(
        {
          ...alert,
          threshold: 'strong',
        },
        token,
        'unsubscribe'
      )
    ).toBe(false);
  });
});
