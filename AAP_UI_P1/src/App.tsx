import { NavLink, Route, Routes } from 'react-router-dom';
import { prototypeFixture } from './fixtures/prototype';
import { t } from './i18n';
import { CombatDemoPage } from './routes/CombatDemoPage';
import { LootDemoPage } from './routes/LootDemoPage';
import { MailInactivePage } from './routes/MailInactivePage';
import { ProvincePage } from './routes/ProvincePage';
import { RunPreflightPage } from './routes/RunPreflightPage';
import { RunResultPage } from './routes/RunResultPage';
import { StartPage, UpdatesPage } from './routes/StartPage';
import { UnknownRoutePage } from './routes/UnknownRoutePage';

export function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {t('shell.skipToContent')}
      </a>

      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">
            <span>A</span>
            <span>A</span>
            <span>P</span>
          </div>
          <div className="brand-copy">
            <span className="brand-name">{t('app.name')}</span>
            <span className="brand-subtitle">{t('app.privateWorkspace')}</span>
          </div>
        </div>

        <div className="build-meta">
          <span className="build-indicator">
            <span className="build-indicator-dot" aria-hidden="true" />
            {t('app.previewLabel')}
          </span>
          <span className="build-id">
            {t('app.versionPrefix')} {prototypeFixture.version}
          </span>
        </div>
      </header>

      <nav className="global-nav" aria-label={t('nav.label')}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'global-nav-link active' : 'global-nav-link')}
        >
          {t('nav.start')}
        </NavLink>
        <NavLink
          to="/updates"
          className={({ isActive }) => (isActive ? 'global-nav-link active' : 'global-nav-link')}
        >
          {t('nav.updates')}
        </NavLink>
        <NavLink
          to="/mail"
          className={({ isActive }) =>
            isActive ? 'global-nav-link mail-nav-link active' : 'global-nav-link mail-nav-link'
          }
          aria-describedby="mail-inactive-reason"
        >
          {t('nav.mail')}
          <span className="nav-soon">{t('nav.unavailable')}</span>
        </NavLink>
        <span className="nav-spacer" />
        <span className="fixture-identity-chip">{t('identity.fixture')}</span>
      </nav>
      <p id="mail-inactive-reason" className="visually-hidden">
        {t('nav.mailInactiveReason')}
      </p>

      <aside className="prototype-boundary" aria-label={t('boundary.regionLabel')}>
        <span className="boundary-icon" aria-hidden="true">
          !
        </span>
        <p>{t(prototypeFixture.boundaryLabelKey)}</p>
      </aside>

      <main id="main-content" className="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/province" element={<ProvincePage />} />
          <Route path="/run/preflight" element={<RunPreflightPage />} />
          <Route path="/run/combat" element={<CombatDemoPage />} />
          <Route path="/run/loot" element={<LootDemoPage />} />
          <Route path="/run/result/:outcome" element={<RunResultPage />} />
          <Route path="/mail" element={<MailInactivePage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="*" element={<UnknownRoutePage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span className="footer-mark">AAP / {prototypeFixture.version}</span>
        <p>{t('shell.footer')}</p>
        <span className="footer-status">{t('shell.fixtureMode')}</span>
      </footer>
    </div>
  );
}
