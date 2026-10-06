import { describe, expect, it } from 'vitest';
import { newTripPlan } from '@paddletoday/api-contract';
import { tripSyncRecovery } from './trip-sync-recovery';

describe('readable sync recovery', () => {
  it('shows only edited plan details and no internal identifiers', () => {
    const baseline = newTripPlan({ name: 'River' });
    const plan = { ...baseline, preparation: { ...baseline.preparation!, groupSize: 2, note: 'Bring water' } };
    const summary = tripSyncRecovery({ kind: 'trip', id: 'private-trip-id', key: 'private-operation', input: { operationId: 'private-operation', baseRevision: 8, command: { type: 'plan', baseline, plan } } });
    expect(summary.facts).toEqual([{ label: 'Group size', value: '2' }, { label: 'Group note', value: 'Bring water' }]);
    expect(summary.shareText).not.toMatch(/private-|operationId|baseRevision|\{/);
  });
  it('summarizes the private track without exposing coordinates', () => {
    const summary = tripSyncRecovery({ kind: 'log', id: 'log-id', key: 'op-id', error: 'Use the trip ID for its personal log.', input: { operationId: 'op-id', baseRevision: 0, value: { sourceTripId: 'trip-id', route: newTripPlan({ name: 'River' }).route, date: '2026-10-05', time: '', timeZone: 'UTC', notes: 'Quiet water', paddleAgain: 'yes', water: [], track: { startedAt: '', endedAt: '', distanceMeters: 1609.344, elapsedSeconds: 97, polylines: ['private-path'] } } } });
    expect(summary.facts).toContainEqual({ label: 'Private GPS track', value: '1.0 mi · 1 min 37 sec' });
    expect(summary.shareText).not.toContain('private-path');
    expect(summary.error).toContain('kept on this device');
  });
  it('shows vehicle meeting details without seats, passengers, or member IDs', () => {
    const summary = tripSyncRecovery({ kind: 'trip', id: 'trip', key: 'op', input: { operationId: 'op', baseRevision: 0, command: { type: 'vehicle', vehicle: { id: 'car-id', driverUid: 'driver-id', label: 'Blue car', seats: 3, passengers: ['passenger-id'], meeting: 'Lower landing', time: '08:00', parkedAt: '', note: '' } } } });
    expect(summary.shareText).toContain('Lower landing · 08:00');
    expect(summary.shareText).not.toMatch(/seat|passenger|driver-id|car-id/);
  });
  it('handles queued deletion and photo upload without a technical payload', () => {
    expect(tripSyncRecovery({ kind: 'log', id: 'log', key: 'op', input: { operationId: 'op', baseRevision: 1, value: null } }).title).toBe('Delete paddle');
    expect(tripSyncRecovery({ kind: 'photo', id: 'log', key: 'op', photoId: 'photo', parts: 3, caption: 'Sunset' }).facts).toEqual([{ label: 'Caption', value: 'Sunset' }]);
  });
});
