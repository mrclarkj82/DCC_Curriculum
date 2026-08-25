import { httpsCallable } from 'firebase/functions';
import { cloudFunctions } from '../firebase/client';

interface CheckDccAccountAccessResult {
  allowed: boolean;
}

const checkDccAccountAccessCallable = httpsCallable<
  Record<string, never>,
  CheckDccAccountAccessResult
>(cloudFunctions, 'checkDccAccountAccess');

export async function checkDccAccountAccess(): Promise<boolean> {
  const result = await checkDccAccountAccessCallable({});
  return result.data.allowed;
}
