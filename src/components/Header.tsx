import { Link, NavLink } from 'react-router-dom';
import { useDemoAuth } from '../auth/DemoAuthContext';

export function Header() {
  const { user, isDemoMode, signOutDemo } = useDemoAuth();

  return (
    <header className="site-header">
      <Link to="/" className="brand-link" aria-label="DCC Creative Studio home">
        <span className="brand-mark">DCC</span>
        <span>
          <strong>DCC Creative Studio</strong>
          <small>Digital Content Creators portal</small>
        </span>
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        <NavLink to="/today">Today</NavLink>
        <NavLink to="/areas">Program Areas</NavLink>
        <NavLink to="/teacher">Teacher</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>
      <div className="header-actions">
        {user ? <span className="user-chip">{user.displayName}</span> : <Link to="/login">Login</Link>}
        {isDemoMode && (
          <button className="ghost-button" type="button" onClick={signOutDemo}>
            Exit Demo
          </button>
        )}
      </div>
    </header>
  );
}

