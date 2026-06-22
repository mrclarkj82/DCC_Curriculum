import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { subscribeToClass } from '../services/classService';
import { firestoreErrorMessage } from '../services/firestoreService';
import type { ClassRecord, UserProfile } from '../types';

interface PrimaryClassRecordState {
  userProfile: UserProfile | null;
  classRecord: ClassRecord | null;
  isLoading: boolean;
  error: string | null;
}

export function usePrimaryClassRecord(): PrimaryClassRecordState {
  const { classIds, loading: authLoading, userProfile } = useAuth();
  const [classRecord, setClassRecord] = useState<ClassRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !userProfile || !classIds.length) {
      setClassRecord(null);
      setIsLoading(false);
      setError(null);
      return undefined;
    }

    setIsLoading(true);
    setError(null);

    return subscribeToClass(
      classIds[0],
      (nextClassRecord) => {
        setClassRecord(nextClassRecord);
        setIsLoading(false);
      },
      (nextError) => {
        setClassRecord(null);
        setError(firestoreErrorMessage(nextError, 'Unable to load your class record.'));
        setIsLoading(false);
      },
    );
  }, [authLoading, classIds, userProfile]);

  return {
    userProfile,
    classRecord,
    isLoading,
    error,
  };
}
