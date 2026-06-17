import { Link } from 'react-router-dom';
import { ProgramAreaCard } from '../components/ProgramAreaCard';
import { programAreas } from '../data/seedData';

export function LandingPage() {
  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div>
          <p className="eyebrow">Digital Content Creators</p>
          <h1>DCC Creative Studio</h1>
          <p>
            A classroom portal for Digital Content Creators that supports Unreal Engine lessons,
            Video Production projects, Broadcast Desk Updates, student submissions, and portfolio
            work.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/login">
              Go to Login
            </Link>
            <Link className="secondary-button" to="/areas">
              Preview Program Areas
            </Link>
          </div>
        </div>
        <div className="landing-panel" aria-label="Program area preview">
          <h2>Built for multiple studios</h2>
          <p>
            Students will eventually sign in with Google and see the active class item for their
            course, whether it is an Unreal lesson, a video project, or a Broadcast Desk Update.
          </p>
        </div>
      </section>

      <section className="landing-section">
        <h2>Program Areas</h2>
        <div className="card-grid two">
          {programAreas.map((area) => (
            <ProgramAreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>
    </main>
  );
}

