import { NavLink } from 'react-router-dom';
import { programAreas } from '../data/seedData';

export function ProgramAreaNav() {
  return (
    <aside className="program-nav" aria-label="Program area navigation">
      <p className="nav-eyebrow">Program Areas</p>
      {programAreas.map((area) => (
        <NavLink key={area.id} to={area.defaultRoute}>
          <span>{area.shortTitle}</span>
          <small>{area.supportedContentTypes.join(', ')}</small>
        </NavLink>
      ))}
    </aside>
  );
}

