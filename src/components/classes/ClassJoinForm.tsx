import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { joinClassWithCode } from '../../services/classJoinCodeService';
import { firestoreErrorMessage } from '../../services/firestoreService';
import type { JoinClassResult } from '../../types';
import { ErrorState } from '../ErrorState';

const studentDomain = 'student.doralacademynv.org';

const normalizeCodeInput = (value: string): string =>
  value.replace(/\s+/g, '').toUpperCase().slice(0, 6);

export function ClassJoinForm() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<JoinClassResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const isSchoolStudentAccount =
    userProfile?.email.toLowerCase().endsWith(`@${studentDomain}`) ?? false;
  const isStudentRole = userProfile?.role === 'student';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);
    setError(null);

    if (!isStudentRole) {
      setError('Class codes are only for approved student accounts.');
      return;
    }

    if (!code.trim()) {
      setError('Enter the class code your teacher gave you.');
      return;
    }

    setIsJoining(true);

    try {
      const joinedClass = await joinClassWithCode(code);
      setResult(joinedClass);
      setCode('');
      window.setTimeout(() => navigate('/today'), 900);
    } catch (nextError) {
      setError(firestoreErrorMessage(nextError, 'Something went wrong. Please ask your teacher.'));
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <section className="card mission-panel neon-border class-join-form-card">
      <p className="retro-label">Join Your Class</p>
      <h2>Enter your class code</h2>
      <p>Enter the class code your teacher gave you.</p>
      <p className="muted">
        Use your @{studentDomain} school Google account or a teacher-approved account exception.
      </p>

      <form className="class-join-form" onSubmit={handleSubmit}>
        <label>
          Class code
          <input
            value={code}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            placeholder="A7K9QZ"
            onChange={(event) => setCode(normalizeCodeInput(event.target.value))}
          />
        </label>
        <button className="gradient-button" type="submit" disabled={isJoining}>
          {isJoining ? 'Joining...' : 'Join Class'}
        </button>
      </form>

      {!isSchoolStudentAccount && isStudentRole && (
        <p className="form-message">
          This account is using a teacher-approved class exception. The class code will work only
          for the approved class.
        </p>
      )}

      {error && <ErrorState message={error} />}
      {result && (
        <p className="form-message">
          Joined {result.className} / {result.period}. Sending you back to Today...
        </p>
      )}

      <Link className="outline-button" to="/areas">
        Explore Program Areas
      </Link>
    </section>
  );
}
