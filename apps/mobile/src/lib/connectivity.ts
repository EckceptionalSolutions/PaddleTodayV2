export interface ConnectivityState {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
}

export function connectionIsUsable(state: ConnectivityState) {
  // Reachability is intentionally optimistic while the platform is still
  // checking it. A confirmed disconnected interface or unreachable internet
  // is the only state that pauses query retries.
  return state.isConnected !== false && state.isInternetReachable !== false;
}

export function createConnectivityMonitor({
  subscribe,
  refresh,
  onChange,
}: {
  subscribe: (listener: (state: ConnectivityState) => void) => () => void;
  refresh: () => Promise<ConnectivityState>;
  onChange: (online: boolean) => void;
}) {
  let latest: boolean | undefined;
  let revision = 0;
  let disposed = false;
  const apply = (state: ConnectivityState) => {
    if (disposed) return;
    const online = connectionIsUsable(state);
    if (online === latest) return;
    latest = online;
    onChange(online);
  };
  const stop = subscribe(state => { revision++; apply(state); });
  const refreshState = () => {
    const startedAt = ++revision;
    return refresh().then(state => {
      // A delayed fetch must not overwrite a newer network event or refresh.
      if (startedAt === revision) apply(state);
    }).catch(() => {});
  };
  void refreshState();
  return { unsubscribe: () => { disposed = true; stop(); }, refresh: refreshState };
}
