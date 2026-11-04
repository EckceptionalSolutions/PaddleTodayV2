import { afterEach, describe, expect, it, vi } from 'vitest';
import { BlobPreconditionError, type JsonStorage } from './blob-storage';
import { withHistoryCaptureLease } from './history-capture-lease';

function fixture(initial: any = null) {
  let value=initial,version=initial?1:0;
  const storage={
    kind:'blob',
    readJsonWithEtag:vi.fn(async()=>({value:structuredClone(value),etag:value?String(version):null})),
    writeJson:vi.fn(async(_name: string,next: unknown,options: {ifMatch?:string;ifNoneMatch?:string}={})=>{
      if((options.ifNoneMatch==='*'&&value)||(options.ifMatch&&options.ifMatch!==String(version)))throw new BlobPreconditionError();
      value=structuredClone(next);version++;
    }),
  } as unknown as JsonStorage;
  return {storage,get:()=>value,replace:(next:any)=>{value=next;version++;}};
}
afterEach(()=>{vi.useRealTimers();vi.restoreAllMocks();});
describe('history capture ownership',()=>{
  it('does not run a competing capture while an unexpired owner exists',async()=>{
    const f=fixture({format:'history-capture-lease-v1',owner:'other',expiresAt:new Date(Date.now()+60_000).toISOString()});
    const operation=vi.fn();
    await expect(withHistoryCaptureLease(f.storage,'lease',operation)).rejects.toThrow('Another history');
    expect(operation).not.toHaveBeenCalled();expect(f.storage.writeJson).not.toHaveBeenCalled();
  });
  it('renews long captures and releases only its own lease',async()=>{
    vi.useFakeTimers();
    const f=fixture();
    await withHistoryCaptureLease(f.storage,'lease',async assertOwned=>{
      await vi.advanceTimersByTimeAsync(180_000);assertOwned();
      expect(Date.parse(f.get().expiresAt)).toBeGreaterThan(Date.now()+120_000);
    });
    expect(f.get().expiresAt).toBe(new Date(0).toISOString());expect(vi.getTimerCount()).toBe(0);
  });
  it('stops after ownership loss and never releases a replacement owner',async()=>{
    vi.useFakeTimers();
    const f=fixture();
    await expect(withHistoryCaptureLease(f.storage,'lease',async assertOwned=>{
      f.replace({format:'history-capture-lease-v1',owner:'replacement',expiresAt:new Date(Date.now()+300_000).toISOString()});
      await vi.advanceTimersByTimeAsync(30_000);assertOwned();
    })).rejects.toThrow('lease was lost');
    expect(f.get().owner).toBe('replacement');
  });
  it('recovers expired leases and leaves a request/retry drain margin if the timer stalls',async()=>{
    vi.useFakeTimers();
    const f=fixture({format:'history-capture-lease-v1',owner:'old',expiresAt:new Date(0).toISOString()});
    await expect(withHistoryCaptureLease(f.storage,'lease',async assertOwned=>{
      vi.setSystemTime(new Date(Date.now()+181_000));assertOwned();
    })).rejects.toThrow('lease was lost');
    expect(f.get().expiresAt).toBe(new Date(0).toISOString());
  });
});
