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
  const apply = (state: ConnectivityState) => {
    const online = connectionIsUsable(state);
    if (online === latest) return;
    latest = online;
    onChange(online);
  };
  const unsubscribe = subscribe(apply);
  const refreshState = () => refresh().then(apply).catch(() => {});
  void refreshState();
  return { unsubscribe, refresh: refreshState };
}
