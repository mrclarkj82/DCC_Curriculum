import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import { isHiddenFrameAnswerCorrect } from '../utils/passwordGate';

interface PasswordGateProps {
  correctAnswer: string;
  successContent: ReactNode;
  hintText?: string;
  failureFeedback?: string;
  initiallyUnlocked?: boolean;
  onUnlock?: () => void;
}

export function PasswordGate({
  correctAnswer,
  successContent,
  hintText,
  failureFeedback = 'The signal did not match. Check the frame and try again.',
  initiallyUnlocked = false,
  onUnlock,
}: PasswordGateProps) {
  const [answer, setAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(initiallyUnlocked);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isHiddenFrameAnswerCorrect(answer, correctAnswer)) {
      setIsUnlocked(true);
      setFeedback('Recovered file unlocked.');
      onUnlock?.();
      return;
    }

    setFeedback(failureFeedback);
  };

  if (isUnlocked) {
    return <div className="password-gate password-gate--unlocked">{successContent}</div>;
  }

  return (
    <section className="password-gate" aria-labelledby="password-gate-title">
      <div>
        <p className="hidden-frame-kicker">Recovered file locked</p>
        <h2 id="password-gate-title">Enter signal word</h2>
        {hintText && <p className="password-gate__hint">{hintText}</p>}
      </div>

      <form className="password-gate__form" onSubmit={handleSubmit}>
        <label htmlFor="hidden-frame-password">Signal word</label>
        <div className="password-gate__input-row">
          <input
            id="hidden-frame-password"
            autoComplete="off"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
          <button className="hidden-frame-button" type="submit">
            Check
          </button>
        </div>
        {feedback && (
          <p className="password-gate__feedback" role="status" aria-live="polite">
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
}
