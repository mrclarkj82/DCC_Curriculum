import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth';
import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { isAllowedEmailDomain } from '../config/authConfig';
import { auth, googleProvider } from '../firebase/client';
import { createUserProfileIfNeeded, subscribeToUserProfile } from '../services/userService';
import type { UserProfile, UserRole } from '../types';

interface AuthContextValue {
  firebaseUser: User | null;
  userProfile: UserProfile | null;
  role: UserRole | null;
  classIds: string[];
  loading: boolean;
  authError: string | null;
  isTeacher: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  isLocalDemoMode: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsLocalDemo: () => void;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const localDemoStorageKey = 'dcc-local-demo-mode';
const unauthorizedDomainMessage =
  'This Google account is not on an approved school email domain. Please use your school Google account.';

const createLocalDemoProfile = (): UserProfile => ({
  uid: 'local-demo-student',
  displayName: 'Local Demo Student',
  email: 'local-demo@student.doralacademynv.org',
  photoURL: '',
  role: 'student',
  classIds: [],
  createdAt: '',
  updatedAt: '',
  lastLoginAt: '',
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [localDemoProfile, setLocalDemoProfile] = useState<UserProfile | null>(() => {
    if (!import.meta.env.DEV || localStorage.getItem(localDemoStorageKey) !== 'true') {
      return null;
    }

    return createLocalDemoProfile();
  });

  useEffect(() => {
    return onAuthStateChanged(auth, (nextUser) => {
      setFirebaseUser(nextUser);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (authLoading) {
      return undefined;
    }

    if (localDemoProfile && !firebaseUser) {
      setProfileLoading(false);
      setUserProfile(localDemoProfile);
      return undefined;
    }

    if (!firebaseUser) {
      setProfileLoading(false);
      setUserProfile(null);
      return undefined;
    }

    if (!isAllowedEmailDomain(firebaseUser.email)) {
      setProfileLoading(false);
      setUserProfile(null);
      setAuthError(unauthorizedDomainMessage);
      void firebaseSignOut(auth);
      return undefined;
    }

    let unsubscribe: () => void = () => undefined;
    let didCancel = false;

    setProfileLoading(true);
    setAuthError(null);

    createUserProfileIfNeeded(firebaseUser)
      .then(() => {
        if (didCancel) {
          return;
        }

        unsubscribe = subscribeToUserProfile(
          firebaseUser.uid,
          (nextProfile) => {
            setUserProfile(nextProfile);
            setProfileLoading(false);
          },
          (error) => {
            setAuthError(
              error.message ||
                'Unable to load your user profile. Please check your connection and try again.',
            );
            setUserProfile(null);
            setProfileLoading(false);
          },
        );
      })
      .catch((error: Error) => {
        if (!didCancel) {
          setAuthError(
            error.message ||
              'Unable to create or update your user profile. Please try signing in again.',
          );
          setUserProfile(null);
          setProfileLoading(false);
        }
      });

    return () => {
      didCancel = true;
      unsubscribe();
    };
  }, [authLoading, firebaseUser, localDemoProfile]);

  const signInWithGoogle = async () => {
    setAuthError(null);
    setLocalDemoProfile(null);
    localStorage.removeItem(localDemoStorageKey);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to sign in with Google. Please try again.';
      setAuthError(message);
      throw error;
    }
  };

  const signInAsLocalDemo = () => {
    if (!import.meta.env.DEV) {
      return;
    }

    setAuthError(null);
    localStorage.setItem(localDemoStorageKey, 'true');
    setLocalDemoProfile(createLocalDemoProfile());
  };

  const signOut = async () => {
    setAuthError(null);
    localStorage.removeItem(localDemoStorageKey);
    setLocalDemoProfile(null);
    setUserProfile(null);

    if (firebaseUser) {
      await firebaseSignOut(auth);
    }
  };

  const value = useMemo<AuthContextValue>(() => {
    const role = userProfile?.role ?? null;

    return {
      firebaseUser,
      userProfile,
      role,
      classIds: userProfile?.classIds ?? [],
      loading: authLoading || profileLoading,
      authError,
      isTeacher: role === 'teacher' || role === 'admin',
      isAdmin: role === 'admin',
      isStudent: role === 'student',
      isLocalDemoMode: Boolean(localDemoProfile),
      signInWithGoogle,
      signInAsLocalDemo,
      signOut,
    };
  }, [authError, authLoading, firebaseUser, localDemoProfile, profileLoading, userProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
