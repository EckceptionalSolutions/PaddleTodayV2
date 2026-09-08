import { describe, expect, it } from 'vitest';
import { validateRouteReport } from './route-report-validation';

const report = { name: 'QA Paddler', email: 'qa@example.test', tripDate: '', report: 'Access is clear at the bridge.', photoCount: 0,
  waterLevel: 'unknown', completion: 'not-launched', verdict: 'fair', consent: true, rights: false };

describe('route report validation', () => {
  it('accepts optional dates and real leap days, rejecting impossible or ambiguous dates', () => {
    expect(validateRouteReport({ ...report, tripDate: '2024-02-29' })).toBeNull();
    expect(validateRouteReport({ ...report, tripDate: '   ' })).toBeNull();
    for (const tripDate of ['2026-02-29', '2026-04-31', '09/08/2026', '2026-13-01']) {
      expect(validateRouteReport({ ...report, tripDate })?.field).toBe('tripDate');
    }
  });
  it('accepts a text-only report without photo rights, including unknown water and no launch', () => {
    expect(validateRouteReport(report)).toBeNull();
  });
  it('accepts a photo-only report only with photo rights', () => {
    expect(validateRouteReport({ ...report, report: '', photoCount: 1 })?.field).toBe('rights');
    expect(validateRouteReport({ ...report, report: '', photoCount: 1, rights: true })).toBeNull();
    expect(validateRouteReport({ ...report, report: '  ', photoCount: 0 })?.field).toBe('report');
  });
  it('keeps contact and observed choices required for either report format', () => {
    expect(validateRouteReport({ ...report, consent: false })?.field).toBe('consent');
    expect(validateRouteReport({ ...report, waterLevel: '' })?.field).toBe('waterLevel');
    expect(validateRouteReport({ ...report, completion: '' })?.field).toBe('completion');
    expect(validateRouteReport({ ...report, verdict: '' })?.field).toBe('verdict');
  });
});
