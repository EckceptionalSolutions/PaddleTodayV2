import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  createAreaNotificationManagementToken,
  createOrUpdateAreaNotificationSubscription,
  getAreaNotificationSubscription,
  verifyAreaNotificationManagementToken,
} from './area-notifications';

let directory = '';
let previousDirectory: string | undefined;

beforeEach(async () => {
  directory = await mkdtemp(join(tmpdir(), 'paddletoday-area-notifications-'));
  previousDirectory = process.env.RIVER_ALERTS_DIR;
  process.env.RIVER_ALERTS_DIR = directory;
  delete process.env.RIVER_ALERTS_CONTAINER_SAS_URL;
});

afterEach(async () => {
  if (previousDirectory === undefined) delete process.env.RIVER_ALERTS_DIR;
  else process.env.RIVER_ALERTS_DIR = previousDirectory;
  await rm(directory, { recursive: true, force: true });
});

describe.sequential('area notification subscriptions', () => {
  it('creates an idempotent subscription and verifies its management token', async () => {
    const input = {
      expoPushToken: 'ExponentPushToken[test-area]',
      latitude: 44.95123,
      longitude: -93.10234,
      locationLabel: 'Minneapolis, MN',
      maxTravelMinutes: 120,
      timeZone: 'America/Chicago',
      todayEnabled: true,
      weekendEnabled: true,
    };
    const first = await createOrUpdateAreaNotificationSubscription({ ...input, now: '2026-08-21T10:00:00.000Z' });
    const second = await createOrUpdateAreaNotificationSubscription({ ...input, locationLabel: 'St. Paul, MN', now: '2026-08-21T11:00:00.000Z' });
    const stored = await getAreaNotificationSubscription(first.subscription.id);
    const token = createAreaNotificationManagementToken(first.subscription);

    expect(first.created).toBe(true);
    expect(second.created).toBe(false);
    expect(stored?.locationLabel).toBe('St. Paul, MN');
    expect(verifyAreaNotificationManagementToken(first.subscription, token)).toBe(true);
    expect(verifyAreaNotificationManagementToken(first.subscription, 'bad-token')).toBe(false);
  });
});
