import type { PropsWithChildren } from 'react';

// Native screens do not need to wait for browser-owned layout or icon fonts.
export function WebReady({ children }: PropsWithChildren<{ title?: string }>) {
  return <>{children}</>;
}
