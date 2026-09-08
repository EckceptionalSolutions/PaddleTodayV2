import { useEffect, useState, type PropsWithChildren } from 'react';
import { AppLoadingState } from './app-state';

export function WebReady({ children, title = 'Loading screen' }: PropsWithChildren<{ title?: string }>) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready ? <>{children}</> : <AppLoadingState title={title} />;
}
