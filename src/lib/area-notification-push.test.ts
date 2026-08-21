import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendAreaNotificationPush } from './area-notification-push';

const subscription = {
  id: 'area_test',
  expoPushToken: 'ExponentPushToken[test]',
} as any;

const originalDryRun = process.env.AREA_NOTIFICATIONS_DRY_RUN;

afterEach(() => {
  vi.restoreAllMocks();
  if (originalDryRun === undefined) delete process.env.AREA_NOTIFICATIONS_DRY_RUN;
  else process.env.AREA_NOTIFICATIONS_DRY_RUN = originalDryRun;
});

describe('area notification push delivery', () => {
  it('supports a dry-run without contacting Expo', async () => {
    process.env.AREA_NOTIFICATIONS_DRY_RUN = 'true';
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await sendAreaNotificationPush({
      subscription,
      notificationType: 'nearby_today',
      routeSlugs: ['rice-creek-peltier-to-long-lake'],
      title: 'Rice Creek looks good today',
      body: 'Conditions are lining up nearby.',
      windowKey: '2026-08-21',
    });

    expect(result).toMatchObject({ provider: 'log', id: null, deliveryStatus: 'accepted' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
