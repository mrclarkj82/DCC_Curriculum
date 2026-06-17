import { Outlet } from 'react-router-dom';
import { DemoModeBanner } from './DemoModeBanner';
import { Header } from './Header';
import { ProgramAreaNav } from './ProgramAreaNav';

export function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <DemoModeBanner />
      <div className="app-layout">
        <ProgramAreaNav />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

