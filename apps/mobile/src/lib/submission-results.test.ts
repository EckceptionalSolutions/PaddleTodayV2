import { describe, expect, it } from 'vitest';
import { PaddleTodayApiError } from '@paddletoday/api-client';
import { requireConfirmedAreaSubscription, requireSavedAlert, requireStoredSubmission, submissionFailureMessage } from './submission-results';

describe('mobile submission confirmation', () => {
  it('preserves actionable server errors and uses form-specific fallback for network failures', () => {
    expect(submissionFailureMessage(new PaddleTodayApiError({ status: 429, message: 'Wait a moment.' }), 'Fallback')).toBe('Wait a moment.');
    expect(submissionFailureMessage(new TypeError('Failed to fetch'), 'Entries remain.')).toBe('Entries remain.');
    try { requireStoredSubmission({ ok: true, stored: false }); } catch (error) {
      expect(submissionFailureMessage(error, 'Fallback')).toBe('Your submission was not saved. Please try again.');
    }
  });
  it('distinguishes an absent confirmation from a confirmed rejection', () => {
    expect(submissionFailureMessage(new PaddleTodayApiError({ status: 0, code: 'request_timeout', message: '12000ms' }), 'Fallback')).toContain('No confirmation arrived');
    expect(submissionFailureMessage(new PaddleTodayApiError({ status: 200, message: 'Unreadable body' }), 'Fallback')).toContain('could not confirm whether');
  });
  const confirmed = { ok: true as const, requestId: 'qa', created: false, subscription: {
    id: 'qa', managementToken: 'qa-token', locationLabel: 'Duluth', maxTravelMinutes: 120,
    todayEnabled: true, weekendEnabled: false, isActive: true,
  } };
  it('preserves a complete area subscription confirmation', () => {
    expect(requireConfirmedAreaSubscription(confirmed)).toBe(confirmed);
  });
  it.each([
    null,
    { ...confirmed, ok: false },
    { ok: true },
    { ...confirmed, subscription: { ...confirmed.subscription, managementToken: '' } },
    { ...confirmed, subscription: { ...confirmed.subscription, todayEnabled: 'false' } },
    { ...confirmed, subscription: { ...confirmed.subscription, maxTravelMinutes: NaN } },
  ])('rejects an incomplete area subscription confirmation: %j', (response) => {
    expect(() => requireConfirmedAreaSubscription(response as typeof confirmed)).toThrow('could not confirm');
  });
  it('does not confirm a submission the server declined to store', () => {
    expect(() => requireStoredSubmission({ ok: true, stored: false, requestId: 'test' })).toThrow('not saved');
  });
  it('requires explicit confirmation and preserves successful response details', () => {
    const saved = { ok: true, stored: true, submissionId: 'test-submission' };
    expect(requireStoredSubmission(saved)).toBe(saved);
    expect(() => requireStoredSubmission({ ok: false, stored: true })).toThrow('not saved');
  });
  it('rejects malformed alert confirmation without an alert record', () => {
    expect(() => requireSavedAlert({ ok: true } as Parameters<typeof requireSavedAlert>[0])).toThrow('not saved');
  });
  it('retains duplicate/reactivated information for confirmed alerts', () => {
    const response = { ok: true, duplicate: true, reactivated: false, alert: { id: 'test-alert' } };
    expect(requireSavedAlert(response)).toBe(response);
  });
});
