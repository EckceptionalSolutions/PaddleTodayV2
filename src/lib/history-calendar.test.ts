import { describe, expect, it } from 'vitest';
import { historyDatesThrough, isHistoryDate, previousHistoryDate } from './history-calendar';
describe('history calendar boundaries',()=>{
  it('uses actual calendar dates across leap years and both DST transitions',()=>{
    expect(previousHistoryDate('2028-03-01')).toBe('2028-02-29');
    expect(historyDatesThrough('2026-03-07','2026-03-09')).toEqual(['2026-03-07','2026-03-08','2026-03-09']);
    expect(historyDatesThrough('2026-10-31','2026-11-02')).toEqual(['2026-10-31','2026-11-01','2026-11-02']);
  });
  it('rejects malformed/overflow dates and bounds bootstrap lookups',()=>{
    expect(isHistoryDate('2026-02-30')).toBe(false);expect(isHistoryDate('garbage')).toBe(false);
    expect(()=>historyDatesThrough('2024-01-01','2026-01-01')).toThrow('backlog exceeds');
  });
});
