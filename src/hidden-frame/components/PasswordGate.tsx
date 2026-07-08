import type { FormEvent, ReactNode } from 'react';
import { useId, useState } from 'react';
import { isHiddenFrameAnswerCorrect } from '../utils/passwordGate';

interface PasswordGateProps {
  correctAnswer: string;
  acceptedAnswers?: string[];
  successContent: ReactNode;
  hintText?: string;
  failureFeedback?: string;
  initiallyUnlocked?: boolean;
  onUnlock?: () => void;
}

export function PasswordGate({
  acceptedAnswers = [],
  correctAnswer,
  successContent,
  hintText,
  failureFeedback = 'The frame does not open yet. Check the signal and try again.',
  initiallyUnlocked = false,
  onUnlock,
}: PasswordGateProps) {
  const gateId = useId();
  const [answer, setAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(initiallyUnlocked);
  const [hintIsVisible, setHintIsVisible] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasSuccessPulse, setHasSuccessPulse] = useState(initiallyUnlocked);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isHiddenFrameAnswerCorrect(answer, correctAnswer, acceptedAnswers)) {
      setIsUnlocked(true);
      setHasSuccessPulse(true);
      setFeedback('Recovered file unlocked.');
      onUnlock?.();
      return;
    }

    setFeedback(failureFeedback);
  };

  if (isUnlocked) {
    return (
      <div
        className={[
          'password-gate',
          'password-gate--unlocked',
          hasSuccessPulse ? 'password-gate--success' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {successContent}
      </div>
    );
  }

  return (
    <section className="password-gate" aria-labelledby={`${gateId}-title`}>
      <div>
        <p className="hidden-frame-kicker">Recovered file locked</p>
        <h2 id={`${gateId}-title`}>Enter signal word</h2>
        {hintText && (
          <div className="password-gate__hint-block">
            <button
              className="hidden-frame-secondary-link"
              type="button"
              aria-expanded={hintIsVisible}
              aria-controls={`${gateId}-hint`}
              onClick={() => setHintIsVisible((currentValue) => !currentValue)}
            >
              {hintIsVisible ? 'Hide hint' : 'Reveal hint'}
            </button>
            {hintIsVisible && (
              <p className="password-gate__hint" id={`${gateId}-hint`}>
                {hintText}
              </p>
            )}
          </div>
        )}
      </div>

      <form className="password-gate__form" onSubmit={handleSubmit}>
        <label htmlFor={`${gateId}-password`}>Signal word</label>
        <div className="password-gate__input-row">
          <input
            id={`${gateId}-password`}
            autoComplete="off"
            aria-invalid={feedback ? 'true' : 'false'}
            aria-describedby={feedback ? `${gateId}-feedback` : undefined}
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
          <button className="hidden-frame-button" type="submit">
            Check
          </button>
        </div>
        {feedback && (
          <p
            className="password-gate__feedback"
            id={`${gateId}-feedback`}
            role="status"
            aria-live="polite"
          >
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
}
