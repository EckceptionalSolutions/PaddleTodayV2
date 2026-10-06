import { describe, expect, it } from 'vitest';
import { newTripPlan } from '@paddletoday/api-contract';
import { parseEditorDraft } from './trip-editor-draft';

const route = newTripPlan().route;
const recap = { sourceTripId: null, route, date: '', time: '9:', timeZone: 'America/', notes: '', paddleAgain: '', water: [] };
describe('trip editor draft recovery', () => {
  it('keeps incomplete dates, itinerary times, group details, and long text unchanged', () => {
    const editing = { ...newTripPlan(), title: '', date: '2026-10-', launch: '9:', timeZone: 'America/',
      route: { ...route, putInName: 'Launch '.repeat(60) },
      itinerary: [{ id: 'stop', time: '9:', location: 'Meeting place', note: 'Some notes' }],
      preparation: { checkInLocal: '2026-10-05 9:', groupSize: 0, boatDescription: '', vehicleDescription: '', note: 'Note '.repeat(500) } };
    const result = parseEditorDraft(JSON.stringify({ editing, log: null, planStep: 'details' }));
    expect(result?.editing).toEqual(editing);
    expect(result?.planStep).toBe('details');
  });
  it.each(['record', 'past', 'edit'])('restores the %s entry flow and private recap text', logMode => {
    const log = { ...recap, notes: 'Draft '.repeat(2000), water: [{ gaugeId: '', gaugeName: '', value: 'unknown', unit: '', measuredAt: '10/', source: '', note: 'Water '.repeat(500) }] };
    const result = parseEditorDraft(JSON.stringify({ editing: null, log, logMode, logId: 'private-log', logRevision: 3 }));
    expect(result?.log).toEqual(log);
    expect(result?.logMode).toBe(logMode);
    expect(result?.logId).toBe('private-log');
    expect(result?.logRevision).toBe(3);
  });
  it('retains a valid edit baseline and supports drafts written before flow metadata existed', () => {
    const baseline = newTripPlan({ name: 'River' });
    const result = parseEditorDraft(JSON.stringify({ editing: { ...baseline, title: '' }, baseline, editId: 'saved-trip' }));
    expect(result?.baseline).toEqual(baseline);
    expect(result?.editId).toBe('saved-trip');
    expect(result?.logMode).toBe('edit'); expect(result?.planStep).toBe('details');
  });
  it('rejects malformed structures without throwing or creating usable tracks', () => {
    for (const raw of ['{', 'null', '[]', JSON.stringify({ editing: { ...newTripPlan(), itinerary: [{ time: 9 }] } }),
      JSON.stringify({ log: { ...recap, track: { polylines: [] } } }), JSON.stringify({ log: { ...recap, water: [null] } })]) {
      expect(parseEditorDraft(raw)).toBeNull();
    }
  });
});
