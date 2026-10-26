import { Route, Routes } from 'react-router-dom';
import { prototypeFixture } from './fixtures/prototype';
import { t } from './i18n';
import { ShellPlaceholderPage } from './routes/ShellPlaceholderPage';
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
            {t(prototypeFixture.buildLabelKey)}
          </span>
          <span className="build-id">{prototypeFixture.taskId}</span>
        </div>
      </header>

      <aside className="prototype-boundary" aria-label={t('boundary.regionLabel')}>
        <span className="boundary-icon" aria-hidden="true">
          !
        </span>
        <p>{t(prototypeFixture.boundaryLabelKey)}</p>
      </aside>

      <main id="main-content" className="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<ShellPlaceholderPage />} />
          <Route path="*" element={<UnknownRoutePage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span className="footer-mark" aria-hidden="true">
          AAP / 01
        </span>
        <p>{t('shell.footer')}</p>
        <span className="footer-status">{t('shell.fixtureMode')}</span>
      </footer>
    </div>
  );
}
