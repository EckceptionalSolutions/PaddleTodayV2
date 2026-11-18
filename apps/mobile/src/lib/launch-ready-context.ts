import { createContext } from 'react';

// The navigator must mount before welcome can redirect a first-time visitor.
// Defer opening shared content until that visitor has completed entry.
export const LaunchReadyContext = createContext(false);
