import type { OfflineTrip } from './offline-trips';
import type { TripDraft, TripDraftRecord } from './trip-drafts';

export type OfflineTripDraftFreshness =
  | { state: 'matches'; changedFields: [] }
  | { state: 'differs'; changedFields: Array<keyof TripDraft> }
  | { state: 'no-saved-draft'; changedFields: [] }
  | { state: 'unavailable'; changedFields: [] };

const fieldLabels: Record<keyof TripDraft, string> = {
  launch: 'launch time', expected: 'return time', checkIn: 'check-in', groupSize: 'group size', boat: 'boat', vehicle: 'vehicle', note: 'notes',
};
const fields = Object.keys(fieldLabels) as Array<keyof TripDraft>;

export function sameTripTarget(a: OfflineTrip['target'], b: TripDraftRecord['target']) {
  return a.routeSlug === b.routeSlug && a.putInId === b.putInId && a.takeOutId === b.takeOutId;
}

export function compareOfflineTripDraft(packet: OfflineTrip, draft: TripDraftRecord | undefined, draftsReadable = true): OfflineTripDraftFreshness {
  if (!draftsReadable) return { state: 'unavailable', changedFields: [] };
  if (!draft || !sameTripTarget(packet.target, draft.target)) return { state: 'no-saved-draft', changedFields: [] };
  return compareOfflineTripDraftValues(packet, draft.draft);
}

export function compareOfflineTripDraftValues(packet: OfflineTrip, draft: TripDraft): OfflineTripDraftFreshness {
  const changedFields = fields.filter(field => packet.draft[field] !== draft[field]);
  return changedFields.length ? { state: 'differs', changedFields } : { state: 'matches', changedFields: [] };
}

export function offlineTripDraftFreshnessLabel(freshness: OfflineTripDraftFreshness) {
  if (freshness.state === 'matches') return 'Offline copy matches your saved draft.';
  if (freshness.state === 'no-saved-draft') return 'No separate saved draft is available for this offline copy.';
  if (freshness.state === 'unavailable') return 'Saved draft comparison is unavailable. Retry loading drafts before updating this copy.';
  const labels = freshness.changedFields.map(field => fieldLabels[field]);
  return `Offline copy differs from your saved draft: ${labels.join(', ')}.`;
}
