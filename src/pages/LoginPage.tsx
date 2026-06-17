import { useNavigate } from 'react-router-dom';
import { useDemoAuth } from '../auth/DemoAuthContext';

export function LoginPage() {
  const { continueAsDemoStudent } = useDemoAuth();
  const navigate = useNavigate();

  const handleDemo = () => {
    continueAsDemoStudent();
    navigate('/today');
  };

  return (
    <main className="login-page synth-grid-bg">
      <section className="login-panel">
        <p className="eyebrow">Phase 3 Login Placeholder</p>
        <h1>DCC Creative Studio Login</h1>
        <p>
          This scaffold uses a temporary demo student mode so the protected route layout can be
          tested locally without enabling Firebase Authentication yet.
        </p>
        <button className="primary-button" type="button" onClick={handleDemo}>
          Continue as Demo Student
        </button>
        <p className="muted">Temporary local scaffold testing only. Not real authentication.</p>
      </section>
    </main>
  );
}
