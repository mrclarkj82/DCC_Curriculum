import { Link, NavLink } from 'react-router-dom';
import { RoleGate } from '../auth/RoleGate';
import { useAuth } from '../auth/useAuth';
import { StatusBadge } from './StatusBadge';

export function Header() {
  const { userProfile, firebaseUser, role, isTeacher, isAdmin, signOut } = useAuth();
  const displayName = userProfile?.displayName || firebaseUser?.displayName || 'Signed in user';
  const photoURL = userProfile?.photoURL || firebaseUser?.photoURL;

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
        {isTeacher && <NavLink to="/teacher">Teacher</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="header-actions">
        {userProfile ? (
          <div className="user-profile">
            {photoURL ? (
              <img className="user-avatar" src={photoURL} alt="" referrerPolicy="no-referrer" />
            ) : (
              <span className="user-avatar" aria-hidden="true">
                {displayName.slice(0, 1).toUpperCase()}
              </span>
            )}
            <span className="user-chip">{displayName}</span>
            {role && <StatusBadge status={role.toUpperCase()} />}
          </div>
        ) : (
          <Link className="outline-button" to="/login">
            Login
          </Link>
        )}
        <RoleGate allowedRoles={['student', 'teacher', 'admin']}>
          <button className="ghost-button" type="button" onClick={() => void signOut()}>
            Sign Out
          </button>
        </RoleGate>
      </div>
    </header>
  );
}
