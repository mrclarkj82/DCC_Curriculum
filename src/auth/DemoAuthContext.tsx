import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { UserRole } from '../types';

interface DemoUser {
  displayName: string;
  role: UserRole;
}

interface DemoAuthContextValue {
  user: DemoUser | null;
  isDemoMode: boolean;
  continueAsDemoStudent: () => void;
  signOutDemo: () => void;
}

const DemoAuthContext = createContext<DemoAuthContextValue | undefined>(undefined);

const storageKey = 'dcc-demo-mode';

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(() => localStorage.getItem(storageKey) === 'true');

  const value = useMemo<DemoAuthContextValue>(() => {
    const user = isDemoMode
      ? {
          displayName: 'Demo Student',
          role: 'demo-student' as const,
        }
      : null;

    return {
      user,
      isDemoMode,
      continueAsDemoStudent: () => {
        localStorage.setItem(storageKey, 'true');
        setIsDemoMode(true);
      },
      signOutDemo: () => {
        localStorage.removeItem(storageKey);
        setIsDemoMode(false);
      },
    };
  }, [isDemoMode]);

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error('useDemoAuth must be used inside DemoAuthProvider');
  }
  return context;
}

