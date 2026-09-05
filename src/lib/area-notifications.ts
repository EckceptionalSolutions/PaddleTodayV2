import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import {
  cleanBlobPath as cleanPathSegment,
  createJsonStorage,
  mutateJson,
  type JsonStorage,
} from './blob-storage';
import {
  isArrayOf,
  isBoolean,
  isNumber,
  isNullableString,
  isRecord,
  isString,
} from './json-guards';
import type { AreaNotificationType } from '@paddletoday/api-contract';

export const DEFAULT_AREA_NOTIFICATION_TRAVEL_MINUTES = 120;
export const AREA_NOTIFICATION_TYPES: AreaNotificationType[] = ['nearby_today', 'weekend_outlook'];

export interface AreaNotificationSubscription {
  id: string;
  expoPushToken: string;
  managementToken: string;
  latitude: number;
  longitude: number;
  locationLabel: string;
  maxTravelMinutes: number;
  timeZone: string;
  todayEnabled: boolean;
  weekendEnabled: boolean;
  isActive: boolean;
  lastTodaySentAt: string | null;
  lastWeekendSentAt: string | null;
  lastTodayEligibleSlugs: string[];
  lastWeekendKey: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AreaNotificationEvent {
  id: string;
  subscriptionId: string;
  notificationType: AreaNotificationType;
  routeSlugs: string[];
  title: string;
  body: string;
  sentAt: string;
  provider?: 'expo' | 'log';
  deliveryId?: string | null;
  deliveryKey?: string;
  deliveryStatus?: 'accepted' | 'delivered' | 'failed';
  deliveryUpdatedAt?: string;
  deliveryError?: string | null;
}

interface SubscriptionStore {
  subscriptions: AreaNotificationSubscription[];
}

interface EventStore {
  events: AreaNotificationEvent[];
}

export async function listAreaNotificationSubscriptions(args: { activeOnly?: boolean } = {}) {
  const store = (await areaNotificationStorage().readJson<SubscriptionStore>(subscriptionsBlobName())) ?? {
    subscriptions: [],
  };
  return (args.activeOnly ? store.subscriptions.filter((item) => item.isActive) : store.subscriptions)
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
}

export async function getAreaNotificationSubscription(id: string) {
  const subscriptions = await listAreaNotificationSubscriptions();
  return subscriptions.find((item) => item.id === id) ?? null;
}

export async function createOrUpdateAreaNotificationSubscription(args: {
  expoPushToken: string;
  latitude: number;
  longitude: number;
  locationLabel: string;
  maxTravelMinutes: number;
  timeZone: string;
  todayEnabled: boolean;
  weekendEnabled: boolean;
  now?: string;
}) {
  const now = args.now ?? new Date().toISOString();
  const storage = areaNotificationStorage();
  let result!: { subscription: AreaNotificationSubscription; created: boolean };
  await mutateJson({ storage, blobName: subscriptionsBlobName(), initial: { subscriptions: [] } as SubscriptionStore, mutate: (store) => {
    const existing = store.subscriptions.find((item) => item.expoPushToken === args.expoPushToken);
    if (existing) {
      Object.assign(existing, normalizedSubscriptionFields(args), { isActive: true, updatedAt: now });
      result = { subscription: existing, created: false };
      return store;
    }

    const subscription: AreaNotificationSubscription = {
      id: `area_${randomUUID()}`,
      managementToken: randomUUID().replaceAll('-', ''),
      ...normalizedSubscriptionFields(args),
      isActive: true,
      lastTodaySentAt: null,
      lastWeekendSentAt: null,
      lastTodayEligibleSlugs: [],
      lastWeekendKey: null,
      createdAt: now,
      updatedAt: now,
    };
    store.subscriptions.push(subscription);
    result = { subscription, created: true };
    return store;
  }});
  return result;
}

export async function updateAreaNotificationSubscription(
  id: string,
  patch: Partial<Pick<AreaNotificationSubscription, 'expoPushToken' | 'latitude' | 'longitude' | 'locationLabel' | 'maxTravelMinutes' | 'timeZone' | 'todayEnabled' | 'weekendEnabled' | 'isActive' | 'lastTodaySentAt' | 'lastWeekendSentAt' | 'lastTodayEligibleSlugs' | 'lastWeekendKey'>>,
  now = new Date().toISOString(),
) {
  const storage = areaNotificationStorage();
  let result: AreaNotificationSubscription | null = null;
  await mutateJson({ storage, blobName: subscriptionsBlobName(), initial: { subscriptions: [] } as SubscriptionStore, mutate: (store) => {
    const subscription = store.subscriptions.find((item) => item.id === id);
    if (subscription) {
      Object.assign(subscription, patch, { updatedAt: now });
      result = subscription;
    }
    return store;
  }});
  return result;
}

export function verifyAreaNotificationManagementToken(
  subscription: Pick<AreaNotificationSubscription, 'id' | 'managementToken'>,
  token: string,
) {
  const expected = Buffer.from(createAreaNotificationManagementToken(subscription));
  const actual = Buffer.from(token);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function createAreaNotificationManagementToken(
  subscription: Pick<AreaNotificationSubscription, 'id' | 'managementToken'>,
) {
  return createHmac('sha256', areaNotificationSigningSecret())
    .update(`${subscription.id}|${subscription.managementToken}`)
    .digest('base64url');
}

export async function listAreaNotificationEvents() {
  const store = (await areaNotificationStorage().readJson<EventStore>(eventsBlobName())) ?? { events: [] };
  return store.events.sort((left, right) => left.sentAt.localeCompare(right.sentAt));
}

export async function appendAreaNotificationEvent(args: Omit<AreaNotificationEvent, 'id'>) {
  const storage = areaNotificationStorage();
  const event: AreaNotificationEvent = { id: `area_event_${randomUUID()}`, ...args };
  await mutateJson({ storage, blobName: eventsBlobName(), initial: { events: [] } as EventStore, mutate: (store) => {
    store.events.push(event);
    return store;
  }});
  return event;
}

export async function updateAreaNotificationEvent(
  id: string,
  patch: Partial<Pick<AreaNotificationEvent, 'deliveryStatus' | 'deliveryUpdatedAt' | 'deliveryError'>>,
) {
  const storage = areaNotificationStorage();
  let result: AreaNotificationEvent | null = null;
  await mutateJson({ storage, blobName: eventsBlobName(), initial: { events: [] } as EventStore, mutate: (store) => {
    const event = store.events.find((item) => item.id === id);
    if (event) {
      Object.assign(event, patch);
      result = event;
    }
    return store;
  }});
  return result;
}

export function isAreaNotificationsEnabled() {
  const configured = String(process.env.AREA_NOTIFICATIONS_ENABLED ?? '').trim().toLowerCase();
  if (configured === 'true') return true;
  if (configured === 'false') return false;
  return process.env.NODE_ENV !== 'production';
}

function normalizedSubscriptionFields(args: Pick<AreaNotificationSubscription, 'expoPushToken' | 'latitude' | 'longitude' | 'locationLabel' | 'maxTravelMinutes' | 'timeZone' | 'todayEnabled' | 'weekendEnabled'>) {
  return {
    expoPushToken: args.expoPushToken.trim().slice(0, 320),
    latitude: roundCoordinate(args.latitude),
    longitude: roundCoordinate(args.longitude),
    locationLabel: args.locationLabel.trim().slice(0, 120),
    maxTravelMinutes: Math.round(args.maxTravelMinutes),
    timeZone: args.timeZone.trim().slice(0, 80),
    todayEnabled: args.todayEnabled,
    weekendEnabled: args.weekendEnabled,
  };
}

function roundCoordinate(value: number) {
  return Math.round(value * 100) / 100;
}

function areaNotificationStorage(): JsonStorage {
  return createJsonStorage({
    containerSasUrl: process.env.RIVER_ALERTS_CONTAINER_SAS_URL,
    localDirectory: process.env.RIVER_ALERTS_DIR || '.local',
    validate: (value) => isSubscriptionStore(value) || isEventStore(value),
    label: 'area notification storage',
  });
}

function subscriptionsBlobName() {
  return `${cleanPathSegment(process.env.RIVER_ALERTS_BLOB_PREFIX || 'river-alerts')}/area-notifications/subscriptions.json`;
}

function eventsBlobName() {
  return `${cleanPathSegment(process.env.RIVER_ALERTS_BLOB_PREFIX || 'river-alerts')}/area-notifications/events.json`;
}

function isSubscriptionStore(value: unknown): value is SubscriptionStore {
  return isRecord(value) && isArrayOf(value.subscriptions, isAreaNotificationSubscription);
}

function isEventStore(value: unknown): value is EventStore {
  return isRecord(value) && isArrayOf(value.events, isAreaNotificationEvent);
}

function isAreaNotificationSubscription(value: unknown): value is AreaNotificationSubscription {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.expoPushToken) &&
    isString(value.managementToken) &&
    isNumber(value.latitude) &&
    isNumber(value.longitude) &&
    isString(value.locationLabel) &&
    isNumber(value.maxTravelMinutes) &&
    isString(value.timeZone) &&
    isBoolean(value.todayEnabled) &&
    isBoolean(value.weekendEnabled) &&
    isBoolean(value.isActive) &&
    isNullableString(value.lastTodaySentAt) &&
    isNullableString(value.lastWeekendSentAt) &&
    Array.isArray(value.lastTodayEligibleSlugs) &&
    value.lastTodayEligibleSlugs.every(isString) &&
    isNullableString(value.lastWeekendKey) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

function isAreaNotificationEvent(value: unknown): value is AreaNotificationEvent {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.subscriptionId) &&
    (value.notificationType === 'nearby_today' || value.notificationType === 'weekend_outlook') &&
    Array.isArray(value.routeSlugs) &&
    value.routeSlugs.every(isString) &&
    isString(value.title) &&
    isString(value.body) &&
    isString(value.sentAt) &&
    (value.provider === undefined || value.provider === 'expo' || value.provider === 'log') &&
    (value.deliveryId === undefined || isNullableString(value.deliveryId)) &&
    (value.deliveryKey === undefined || isString(value.deliveryKey)) &&
    (value.deliveryStatus === undefined || value.deliveryStatus === 'accepted' || value.deliveryStatus === 'delivered' || value.deliveryStatus === 'failed') &&
    (value.deliveryUpdatedAt === undefined || isString(value.deliveryUpdatedAt)) &&
    (value.deliveryError === undefined || isNullableString(value.deliveryError))
  );
}

function areaNotificationSigningSecret() {
  const configured = String(process.env.ALERTS_SIGNING_SECRET || '').trim();
  if (configured) return configured;
  if (process.env.NODE_ENV !== 'production') return 'paddletoday-dev-area-notification-secret';
  throw new Error('Missing ALERTS_SIGNING_SECRET for area notification management.');
}
