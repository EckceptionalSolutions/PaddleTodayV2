import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { captureHistorySnapshotForResults, DAILY_HISTORY_SUMMARY_MODE, getRiverHistory, summarizeSnapshots, type RiverHistorySnapshot } from './history';
import * as blobStorage from './blob-storage';
import { forgetCache } from './server-cache';
import { listScoredRivers } from './rivers';
import { scoreRiverCondition } from './scoring';

const routes = listScoredRivers().slice(0,2);
let directory: string;
const result = (score: number, index = 0) => ({ ...scoreRiverCondition({ river: routes[index], gauge: null, weather: null }), score, rating: 'Fair' as const });
const dailyName = (index=0) => `river-history/daily/${routes[index].slug}.json`;
const hourlyName = (date: string, index=0) => `river-history/hourly/${routes[index].slug}/${date}.json`;
const journalName = 'river-history/_daily-finalization.json';
const get = async (name: string) => JSON.parse(await readFile(join(directory,name),'utf8'));
async function seed(name: string, value: unknown) { const path=join(directory,name);await mkdir(dirname(path),{recursive:true});await writeFile(path,JSON.stringify(value)); }
async function capture(at: string, scores=[60], mode: typeof DAILY_HISTORY_SUMMARY_MODE | 'legacy'=DAILY_HISTORY_SUMMARY_MODE) {
  vi.setSystemTime(new Date(at));
  return captureHistorySnapshotForResults({ results:scores.map((score,index)=>result(score,index)), now:new Date(at), dailySummaryMode:mode });
}
function sample(at: string, score: number, index=0): RiverHistorySnapshot {
  const date=at.slice(0,10);
  return {slug:routes[index].slug,capturedAt:at,localDate:date,localHour:'10:00',score,rating:'Fair',riverQuality:80,
    windAdjustment:0,temperatureAdjustment:0,rainAdjustment:0,comfortAdjustment:0,gaugeBandLabel:'Unknown',gaugeNow:null,temperatureF:null,windMph:null,rainChance:null};
}
beforeEach(async()=>{
  directory=await mkdtemp(join(tmpdir(),'paddle-history-finalize-'));
  vi.useFakeTimers();vi.setSystemTime(new Date('2026-11-04T16:00:00Z'));
  vi.stubEnv('RIVER_HISTORY_DIR',directory);vi.stubEnv('RIVER_HISTORY_CONTAINER_SAS_URL','');vi.stubEnv('RIVER_HISTORY_BLOB_PREFIX','river-history');
  forgetCache('history:',{prefix:true});
});
afterEach(async()=>{
  vi.restoreAllMocks();vi.unstubAllEnvs();vi.useRealTimers();forgetCache('history:',{prefix:true});
  if(dirname(directory)!==tmpdir())throw new Error('Unexpected history test directory');
  await rm(directory,{recursive:true,force:true});
});

describe('daily history finalization',()=>{
  it('keeps current aggregates live without daily writes and finalizes once after midnight',async()=>{
    expect((await capture('2026-11-04T16:00:00Z',[60])).dailySummaryWrites).toBe(0);
    expect((await capture('2026-11-04T17:00:00Z',[80])).dailySummaryWrites).toBe(0);
    const today=await getRiverHistory({slug:routes[0].slug});
    expect(today.days).toMatchObject([{date:'2026-11-04',avgScore:70,sampleCount:2,latestScore:80}]);
    expect(today.todayHourly).toHaveLength(2);
    await expect(get(dailyName())).rejects.toThrow();
    expect((await capture('2026-11-05T07:00:00Z',[75])).dailySummaryWrites).toBe(1);
    const persisted=await get(dailyName());
    expect(persisted).toMatchObject([{date:'2026-11-04',sampleCount:2,avgScore:70}]);
    expect((await capture('2026-11-05T08:00:00Z',[85])).dailySummaryWrites).toBe(0);
    expect(await get(dailyName())).toEqual(persisted);
    expect((await getRiverHistory({slug:routes[0].slug})).days).toMatchObject([{date:'2026-11-04',avgScore:70},{date:'2026-11-05',avgScore:80}]);
  });

  it('derives unfinished past days during missed runs and does not invent empty days',async()=>{
    await capture('2026-11-04T16:00:00Z',[60]);
    vi.setSystemTime(new Date('2026-11-06T16:00:00Z'));
    const before=await getRiverHistory({slug:routes[0].slug});
    expect(before.days).toMatchObject([{date:'2026-11-04',sampleCount:1}]);expect(before.todayHourly).toEqual([]);
    await capture('2026-11-07T16:00:00Z',[70]);
    expect((await get(dailyName())).map((day:any)=>day.date)).toEqual(['2026-11-04']);
    expect((await getRiverHistory({slug:routes[0].slug})).days.map(day=>day.date)).toEqual(['2026-11-04','2026-11-07']);
  });

  it('announces partial captures before writes and finalizes routes removed from a later catalog',async()=>{
    const create=blobStorage.createJsonStorage;
    const spy=vi.spyOn(blobStorage,'createJsonStorage').mockImplementation(options=>{
      const storage=create(options);
      return {...storage,writeJson:async(name,value,writeOptions)=>{
        if(name===hourlyName('2026-11-04',1))throw new Error('injected hourly failure');
        return storage.writeJson(name,value,writeOptions);
      }};
    });
    await expect(capture('2026-11-04T16:00:00Z',[60,80])).rejects.toThrow('injected hourly');
    spy.mockRestore();
    expect((await get(journalName)).pending['2026-11-04']).toContain(routes[0].slug);
    vi.setSystemTime(new Date('2026-11-05T16:00:00Z'));
    await captureHistorySnapshotForResults({results:[result(75,1)],dailySummaryMode:DAILY_HISTORY_SUMMARY_MODE});
    expect(await get(dailyName())).toMatchObject([{date:'2026-11-04',avgScore:60}]);
    expect((await get(journalName)).pending['2026-11-04']).toBeUndefined();
    expect((await getRiverHistory({slug:routes[0].slug})).days).toMatchObject([{date:'2026-11-04',avgScore:60}]);
  });

  it('retries partial daily persistence without rewriting already correct summaries',async()=>{
    await capture('2026-11-04T16:00:00Z',[60,80]);
    const create=blobStorage.createJsonStorage;
    const spy=vi.spyOn(blobStorage,'createJsonStorage').mockImplementation(options=>{
      const storage=create(options);
      return {...storage,writeJson:async(name,value,writeOptions)=>{
        if(name===dailyName(1))throw new Error('injected daily failure');
        return storage.writeJson(name,value,writeOptions);
      }};
    });
    await expect(capture('2026-11-05T16:00:00Z',[65,85])).rejects.toThrow('injected daily');
    const first=await get(dailyName());
    spy.mockRestore();
    expect((await capture('2026-11-05T16:15:00Z',[65,85])).dailySummaryWrites).toBe(1);
    expect(await get(dailyName())).toEqual(first);
    expect((await get(dailyName(1)))[0].avgScore).toBe(80);
    expect((await get(journalName)).pending['2026-11-04']).toBeUndefined();
  });

  it('preserves legacy arrays, repairs their last known boundary, and supports legacy-writer rollback',async()=>{
    const old=sample('2026-11-01T16:00:00Z',50),late=sample('2026-11-01T17:00:00Z',90),missing=sample('2026-11-02T16:00:00Z',70);
    await seed(dailyName(),[summarizeSnapshots([old],'2026-11-01')]);
    await seed(hourlyName('2026-11-01'),[old,late]);await seed(hourlyName('2026-11-02'),[missing]);
    await capture('2026-11-04T16:00:00Z',[80]);
    expect(await get(dailyName())).toMatchObject([{date:'2026-11-01',avgScore:70,sampleCount:2},{date:'2026-11-02',avgScore:70}]);
    await capture('2026-11-04T17:00:00Z',[60],'legacy');
    expect((await get(dailyName())).at(-1)).toMatchObject({date:'2026-11-04',avgScore:70,sampleCount:2});
  });

  it('persists a late correction to an already closed date',async()=>{
    await capture('2026-11-04T16:00:00Z',[50]);await capture('2026-11-05T16:00:00Z',[80]);
    await captureHistorySnapshotForResults({results:[result(90)],now:new Date('2026-11-04T17:00:00Z'),dailySummaryMode:DAILY_HISTORY_SUMMARY_MODE});
    expect((await get(dailyName()))[0]).toMatchObject({avgScore:70,sampleCount:2,latestScore:90});
  });

  it('preserves both repeated fall-DST hours and replaces retries within the same UTC hour',async()=>{
    await capture('2026-11-01T06:15:00Z',[50]);await capture('2026-11-01T07:15:00Z',[90]);await capture('2026-11-01T07:45:00Z',[70]);
    const hourly=await get(hourlyName('2026-11-01'));
    expect(hourly.map((row:any)=>row.localHour)).toEqual(['01:00','01:00']);
    expect(hourly.map((row:any)=>row.score)).toEqual([50,70]);
    await capture('2026-11-02T07:00:00Z',[60]);
    expect((await get(dailyName()))[0]).toMatchObject({date:'2026-11-01',avgScore:60,sampleCount:2});
  });

  it('handles the spring-DST missing hour without adding synthetic samples',async()=>{
    await capture('2026-03-08T07:15:00Z',[50]);await capture('2026-03-08T08:15:00Z',[90]);
    expect((await get(hourlyName('2026-03-08'))).map((row:any)=>row.localHour)).toEqual(['01:00','03:00']);
    await capture('2026-03-09T06:00:00Z',[60]);
    expect((await get(dailyName()))[0].sampleCount).toBe(2);
  });

  it('serializes concurrent captures and advances no journal for empty or invalid input',async()=>{
    const at=new Date('2026-11-04T16:00:00Z');
    await Promise.all([captureHistorySnapshotForResults({results:[result(60)],now:at,dailySummaryMode:DAILY_HISTORY_SUMMARY_MODE}),
      captureHistorySnapshotForResults({results:[result(70)],now:new Date(at.getTime()+60_000),dailySummaryMode:DAILY_HISTORY_SUMMARY_MODE})]);
    expect(await get(hourlyName('2026-11-04'))).toHaveLength(1);
    const before=await get(journalName);
    await captureHistorySnapshotForResults({results:[],dailySummaryMode:DAILY_HISTORY_SUMMARY_MODE});
    await expect(captureHistorySnapshotForResults({results:[result(60),result(70)],dailySummaryMode:DAILY_HISTORY_SUMMARY_MODE})).rejects.toThrow('Duplicate');
    expect(await get(journalName)).toEqual(before);
  });
});
