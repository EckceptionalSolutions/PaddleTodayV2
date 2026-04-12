import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DEFAULT_ALERTS_DIR = '.local';

type BlobContainer = {
  base: string;
  query: string;
};

export type RiverAlertThreshold = 'good' | 'strong';
export type RiverAlertType = 'river_threshold';
export type RiverAlertState = 'below_threshold' | 'at_or_above_threshold';

export interface RiverThresholdAlert {
  id: string;
  email: string;
  type: RiverAlertType;
  riverId: string | null;
  riverSlug: string;
  riverName: string;
  riverReach: string;
  threshold: RiverAlertThreshold;
  isActive: boolean;
  lastState: RiverAlertState;
  lastTriggeredAt: string | null;
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
}

interface AlertsStore {
  alerts: RiverThresholdAlert[];
}

interface AlertEventsStore {
  events: RiverAlertEvent[];
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
  email: string;
  riverId?: string | null;
  riverSlug: string;
  riverName: string;
  riverReach: string;
  threshold: RiverAlertThreshold;
  initialState: RiverAlertState;
  now?: string;
}): Promise<{ alert: RiverThresholdAlert; duplicate: boolean; reactivated: boolean }> {
  const email = normalizeEmail(args.email);
  const now = args.now ?? new Date().toISOString();
  const storage = alertsStorage();
  const store = (await storage.readJson<AlertsStore>(alertsBlobName())) ?? { alerts: [] };
  const existing = store.alerts.find(
    (alert) =>
      alert.type === 'river_threshold' &&
      alert.email === email &&
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
    existing.updatedAt = now;
    existing.riverId = args.riverId ?? existing.riverId ?? null;
    existing.riverName = args.riverName;
    existing.riverReach = args.riverReach;
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
    type: 'river_threshold',
    riverId: args.riverId ?? null,
    riverSlug: args.riverSlug,
    riverName: args.riverName,
    riverReach: args.riverReach,
    threshold: args.threshold,
    isActive: true,
    lastState: args.initialState,
    lastTriggeredAt: null,
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
  patch: Partial<Pick<RiverThresholdAlert, 'isActive' | 'lastState' | 'lastTriggeredAt' | 'updatedAt'>>
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
  if (patch.lastTriggeredAt !== undefined) {
    alert.lastTriggeredAt = patch.lastTriggeredAt;
  }
  alert.updatedAt = patch.updatedAt ?? new Date().toISOString();

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
  };
  store.events.push(event);
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

function alertsStorage():
  | {
      kind: 'local';
      readJson<T>(blobName: string): Promise<T | null>;
      writeJson(blobName: string, value: unknown): Promise<void>;
    }
  | {
      kind: 'blob';
      readJson<T>(blobName: string): Promise<T | null>;
      writeJson(blobName: string, value: unknown): Promise<void>;
    } {
  const container = parseContainerSas(process.env.RIVER_ALERTS_CONTAINER_SAS_URL ?? '');
  if (container) {
    return {
      kind: 'blob',
      async readJson<T>(blobName: string) {
        const response = await fetch(blobUrl(container, blobName), {
          method: 'GET',
          headers: { accept: 'application/json' },
        });

        if (response.status === 404) {
          return null;
        }

        if (!response.ok) {
          throw new Error(`Failed to read alerts blob ${blobName}: HTTP ${response.status}`);
        }

        return (await response.json()) as T;
      },
      async writeJson(blobName: string, value: unknown) {
        const payload = JSON.stringify(value, null, 2);
        const response = await fetch(blobUrl(container, blobName), {
          method: 'PUT',
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'content-type': 'application/json; charset=utf-8',
          },
          body: payload,
        });

        if (!response.ok) {
          throw new Error(`Failed to write alerts blob ${blobName}: HTTP ${response.status}`);
        }
      },
    };
  }

  return {
    kind: 'local',
    async readJson<T>(blobName: string) {
      const filePath = localPathFor(blobName);
      try {
        const payload = await readFile(filePath, 'utf8');
        return JSON.parse(payload) as T;
      } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
          return null;
        }
        throw error;
      }
    },
    async writeJson(blobName: string, value: unknown) {
      const filePath = localPathFor(blobName);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, JSON.stringify(value, null, 2), 'utf8');
    },
  };
}

function localPathFor(blobName: string) {
  return resolve(process.cwd(), process.env.RIVER_ALERTS_DIR || DEFAULT_ALERTS_DIR, blobName);
}

function parseContainerSas(value: string): BlobContainer | null {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return {
      base: url.origin + url.pathname.replace(/\/$/, ''),
      query: url.search,
    };
  } catch {
    return null;
  }
}

function blobUrl(container: BlobContainer, blobName: string) {
  return `${container.base}/${blobName}${container.query}`;
}

function cleanPathSegment(value: string) {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9/_-]+/g, '-');
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}
