import { describe, expect, it, vi } from 'vitest';
import { connectionIsUsable, createConnectivityMonitor } from './connectivity';

describe('connectivity monitor', () => {
  it('only treats confirmed disconnection or unreachable internet as offline', () => {
    expect(connectionIsUsable({ isConnected: true, isInternetReachable: true })).toBe(true);
    expect(connectionIsUsable({ isConnected: true, isInternetReachable: null })).toBe(true);
    expect(connectionIsUsable({ isConnected: false, isInternetReachable: null })).toBe(false);
    expect(connectionIsUsable({ isConnected: true, isInternetReachable: false })).toBe(false);
  });

  it('deduplicates connectivity notifications and refreshes on demand', async () => {
    let listener!: (state: { isConnected: boolean | null; isInternetReachable: boolean | null }) => void;
    const onChange = vi.fn();
    const refresh = vi.fn(async () => ({ isConnected: true, isInternetReachable: true }));
    const monitor = createConnectivityMonitor({ subscribe: next => { listener = next; return vi.fn(); }, refresh, onChange });
    await Promise.resolve();
    listener({ isConnected: true, isInternetReachable: true });
    listener({ isConnected: false, isInternetReachable: false });
    listener({ isConnected: false, isInternetReachable: false });
    await monitor.refresh();
    expect(refresh).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenCalledWith(false);
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
