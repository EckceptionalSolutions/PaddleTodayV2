import { randomUUID } from 'node:crypto';
import { normalizeEmailAddress } from '@paddletoday/api-contract';
import {
  cleanBlobPath as cleanPathSegment,
  createJsonStorage,
  type JsonStorage,
} from './blob-storage';
import { isArrayOf, isBoolean, isNullableString, isNumber, isOneOf, isRecord, isString } from './json-guards';

const DEFAULT_ALERTS_DIR = '.local';

export type RiverAlertThreshold = 'good' | 'strong';
export type RiverAlertType = 'river_threshold';
export type RiverAlertState = 'below_threshold' | 'at_or_above_threshold';
export type RiverAlertDeliveryMethod = 'email' | 'push';

export interface RiverThresholdAlert {
  id: string;
  email: string;
  expoPushToken: string | null;
  deliveryMethod: RiverAlertDeliveryMethod;
  type: RiverAlertType;
  riverId: string | null;
  riverSlug: string;
  riverName: string;
  riverReach: string;
  threshold: RiverAlertThreshold;
  isActive: boolean;
  lastState: RiverAlertState;
  belowSince?: string | null;
  lastTriggeredAt: string | null;
  lastEvaluatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RiverAlertEvent {
  id: string;
  alertId: string;
  riverId: string | null;
  riverSlug: string;
  triggeredScore: number;
  triggeredLabel: string;
  threshold: RiverAlertThreshold;
  message: string;
  sentAt: string;
  deliveryMethod?: RiverAlertDeliveryMethod;
  provider?: 'azure' | 'expo' | 'log';
  deliveryId?: string | null;
  deliveryKey?: string;
  deliveryStatus?: 'accepted' | 'delivered' | 'failed';
  deliveryUpdatedAt?: string;
  deliveryError?: string | null;
}

interface AlertsStore {
  alerts: RiverThresholdAlert[];
}

interface AlertEventsStore {
  events: RiverAlertEvent[];
}

function isRiverThresholdAlert(value: unknown): value is RiverThresholdAlert {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.email) &&
    (value.expoPushToken === undefined || isNullableString(value.expoPushToken)) &&
    (value.deliveryMethod === undefined || isOneOf(value.deliveryMethod, ['email', 'push'] as const)) &&
    value.type === 'river_threshold' &&
    isNullableString(value.riverId) &&
    isString(value.riverSlug) &&
    isString(value.riverName) &&
    isString(value.riverReach) &&
    isOneOf(value.threshold, ['good', 'strong'] as const) &&
    isBoolean(value.isActive) &&
    isOneOf(value.lastState, ['below_threshold', 'at_or_above_threshold'] as const) &&
    (value.belowSince === undefined || isNullableString(value.belowSince)) &&
    isNullableString(value.lastTriggeredAt) &&
    isNullableString(value.lastEvaluatedAt) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

function isRiverAlertEvent(value: unknown): value is RiverAlertEvent {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isString(value.id) &&
    isString(value.alertId) &&
    isNullableString(value.riverId) &&
    isString(value.riverSlug) &&
    isNumber(value.triggeredScore) &&
    isString(value.triggeredLabel) &&
    isOneOf(value.threshold, ['good', 'strong'] as const) &&
    isString(value.message) &&
    isString(value.sentAt) &&
    (value.deliveryMethod === undefined || isOneOf(value.deliveryMethod, ['email', 'push'] as const)) &&
    (value.provider === undefined || isOneOf(value.provider, ['azure', 'expo', 'log'] as const)) &&
    (value.deliveryId === undefined || isNullableString(value.deliveryId)) &&
    (value.deliveryKey === undefined || isString(value.deliveryKey)) &&
    (value.deliveryStatus === undefined || isOneOf(value.deliveryStatus, ['accepted', 'delivered', 'failed'] as const)) &&
    (value.deliveryUpdatedAt === undefined || isString(value.deliveryUpdatedAt)) &&
    (value.deliveryError === undefined || isNullableString(value.deliveryError))
  );
}

function isAlertsStore(value: unknown): value is AlertsStore {
  return isRecord(value) && isArrayOf(value.alerts, isRiverThresholdAlert);
}

function isAlertEventsStore(value: unknown): value is AlertEventsStore {
  return isRecord(value) && isArrayOf(value.events, isRiverAlertEvent);
}

export async function listRiverAlerts(args: { activeOnly?: boolean } = {}): Promise<RiverThresholdAlert[]> {
  const store = (await alertsStorage().readJson<AlertsStore>(alertsBlobName())) ?? { alerts: [] };
  return (args.activeOnly ? store.alerts.filter((alert) => alert.isActive) : store.alerts).sort((left, right) =>
    left.createdAt.localeCompare(right.createdAt)
  );
}

export async function getRiverAlertById(id: string): Promise<RiverThresholdAlert | null> {
  const store = (await alertsStorage().readJson<AlertsStore>(alertsBlobName())) ?? { alerts: [] };
  return store.alerts.find((alert) => alert.id === id) ?? null;
}

export async function createRiverThresholdAlert(args: {
  email?: string;
  expoPushToken?: string;
  deliveryMethod?: RiverAlertDeliveryMethod;
  riverId?: string | null;
  riverSlug: string;
  riverName: string;
  riverReach: string;
  threshold: RiverAlertThreshold;
  initialState: RiverAlertState;
  now?: string;
}): Promise<{ alert: RiverThresholdAlert; duplicate: boolean; reactivated: boolean }> {
  const deliveryMethod = args.deliveryMethod ?? 'email';
  const email = normalizeEmailAddress(args.email ?? '');
  const expoPushToken = normalizeExpoPushToken(args.expoPushToken);
  const now = args.now ?? new Date().toISOString();
  const storage = alertsStorage();
  const store = (await storage.readJson<AlertsStore>(alertsBlobName())) ?? { alerts: [] };
  const existing = store.alerts.find(
    (alert) =>
      alert.type === 'river_threshold' &&
      alertDeliveryMethod(alert) === deliveryMethod &&
      alertContactKey(alert) === (deliveryMethod === 'push' ? expoPushToken : email) &&
      alert.riverSlug === args.riverSlug &&
      alert.threshold === args.threshold
  );

  if (existing?.isActive) {
    return {
      alert: existing,
      duplicate: true,
      reactivated: false,
    };
  }

  if (existing) {
    existing.isActive = true;
    existing.lastState = args.initialState;
    existing.belowSince = null;
    existing.updatedAt = now;
    existing.riverId = args.riverId ?? existing.riverId ?? null;
    existing.riverName = args.riverName;
    existing.riverReach = args.riverReach;
    existing.email = email || existing.email;
    existing.expoPushToken = expoPushToken || existing.expoPushToken || null;
    existing.deliveryMethod = deliveryMethod;
    await storage.writeJson(alertsBlobName(), store);
    return {
      alert: existing,
      duplicate: false,
      reactivated: true,
    };
  }

  const alert: RiverThresholdAlert = {
    id: `alert_${randomUUID()}`,
    email,
    expoPushToken,
    deliveryMethod,
    type: 'river_threshold',
    riverId: args.riverId ?? null,
    riverSlug: args.riverSlug,
    riverName: args.riverName,
    riverReach: args.riverReach,
    threshold: args.threshold,
    isActive: true,
    lastState: args.initialState,
    belowSince: null,
    lastTriggeredAt: null,
    lastEvaluatedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  store.alerts.push(alert);
  await storage.writeJson(alertsBlobName(), store);

  return {
    alert,
    duplicate: false,
    reactivated: false,
  };
}

export async function updateRiverAlert(
  id: string,
  patch: Partial<Pick<RiverThresholdAlert, 'isActive' | 'lastState' | 'belowSince' | 'lastTriggeredAt' | 'lastEvaluatedAt' | 'updatedAt'>>
): Promise<RiverThresholdAlert | null> {
  const storage = alertsStorage();
  const store = (await storage.readJson<AlertsStore>(alertsBlobName())) ?? { alerts: [] };
  const alert = store.alerts.find((candidate) => candidate.id === id);
  if (!alert) {
    return null;
  }

  if (typeof patch.isActive === 'boolean') {
    alert.isActive = patch.isActive;
  }
  if (patch.lastState) {
    alert.lastState = patch.lastState;
  }
  if (patch.belowSince !== undefined) {
    alert.belowSince = patch.belowSince;
  }
  if (patch.lastTriggeredAt !== undefined) {
    alert.lastTriggeredAt = patch.lastTriggeredAt;
  }
  if (patch.lastEvaluatedAt !== undefined) {
    alert.lastEvaluatedAt = patch.lastEvaluatedAt;
  }
  if (patch.updatedAt) {
    alert.updatedAt = patch.updatedAt;
  }

  await storage.writeJson(alertsBlobName(), store);
  return alert;
}

export async function appendRiverAlertEvent(args: {
  alertId: string;
  riverId?: string | null;
  riverSlug: string;
  threshold: RiverAlertThreshold;
  triggeredScore: number;
  triggeredLabel: string;
  message: string;
  sentAt?: string;
  deliveryMethod?: RiverAlertDeliveryMethod;
  provider?: 'azure' | 'expo' | 'log';
  deliveryId?: string | null;
  deliveryKey?: string;
  deliveryStatus?: 'accepted' | 'delivered' | 'failed';
}): Promise<RiverAlertEvent> {
  const sentAt = args.sentAt ?? new Date().toISOString();
  const storage = alertsStorage();
  const store = (await storage.readJson<AlertEventsStore>(eventsBlobName())) ?? { events: [] };
  const event: RiverAlertEvent = {
    id: `event_${randomUUID()}`,
    alertId: args.alertId,
    riverId: args.riverId ?? null,
    riverSlug: args.riverSlug,
    threshold: args.threshold,
    triggeredScore: args.triggeredScore,
    triggeredLabel: args.triggeredLabel,
    message: args.message,
    sentAt,
    deliveryMethod: args.deliveryMethod,
    provider: args.provider,
    deliveryId: args.deliveryId,
    deliveryKey: args.deliveryKey,
    deliveryStatus: args.deliveryStatus,
    deliveryUpdatedAt: args.deliveryStatus ? sentAt : undefined,
    deliveryError: null,
  };
  store.events.push(event);
  await storage.writeJson(eventsBlobName(), store);
  return event;
}

export async function listRiverAlertEvents(): Promise<RiverAlertEvent[]> {
  const store = (await alertsStorage().readJson<AlertEventsStore>(eventsBlobName())) ?? { events: [] };
  return [...store.events].sort((left, right) => left.sentAt.localeCompare(right.sentAt));
}

export async function updateRiverAlertEvent(
  id: string,
  patch: Partial<Pick<RiverAlertEvent, 'deliveryStatus' | 'deliveryUpdatedAt' | 'deliveryError'>>
): Promise<RiverAlertEvent | null> {
  const storage = alertsStorage();
  const store = (await storage.readJson<AlertEventsStore>(eventsBlobName())) ?? { events: [] };
  const event = store.events.find((candidate) => candidate.id === id);
  if (!event) {
    return null;
  }

  if (patch.deliveryStatus) {
    event.deliveryStatus = patch.deliveryStatus;
  }
  if (patch.deliveryUpdatedAt) {
    event.deliveryUpdatedAt = patch.deliveryUpdatedAt;
  }
  if (patch.deliveryError !== undefined) {
    event.deliveryError = patch.deliveryError;
  }

  await storage.writeJson(eventsBlobName(), store);
  return event;
}

function alertsBlobName() {
  return `${alertsPrefix()}/alerts.json`;
}

function eventsBlobName() {
  return `${alertsPrefix()}/events.json`;
}

function alertsPrefix() {
  return cleanPathSegment(process.env.RIVER_ALERTS_BLOB_PREFIX || 'river-alerts');
}

function alertsStorage(): JsonStorage {
  return createJsonStorage({
    containerSasUrl: process.env.RIVER_ALERTS_CONTAINER_SAS_URL,
    localDirectory: process.env.RIVER_ALERTS_DIR || DEFAULT_ALERTS_DIR,
    validate: (value) => isAlertsStore(value) || isAlertEventsStore(value),
    label: 'alerts',
  });
}

function normalizeExpoPushToken(value: string | null | undefined) {
  const token = String(value || '').trim();
  return token || null;
}

function alertDeliveryMethod(alert: RiverThresholdAlert) {
  return alert.deliveryMethod ?? (alert.expoPushToken ? 'push' : 'email');
}

function alertContactKey(alert: RiverThresholdAlert) {
  return alertDeliveryMethod(alert) === 'push' ? alert.expoPushToken ?? '' : alert.email;
}
