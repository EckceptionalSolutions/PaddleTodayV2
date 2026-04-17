import type { RiverAlertThreshold } from '../lib/alerts';

export function parseQueryNumber(value: string | null | undefined, fallback: number): number {
  if (value == null || value === '') {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function parseRiverAlertThreshold(value: unknown): RiverAlertThreshold | null {
  const normalized = String(value ?? '').trim().toLowerCase();

  if (normalized === 'good' || normalized === 'strong') {
    return normalized;
  }

  return null;
}
