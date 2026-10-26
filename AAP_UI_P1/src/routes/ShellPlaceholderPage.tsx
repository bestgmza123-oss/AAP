import { prototypeFixture } from '../fixtures/prototype';
import { t } from '../i18n';

export function ShellPlaceholderPage() {
  return (
    <section className="shell-content" aria-labelledby="shell-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-marker" aria-hidden="true" />
          {t('shell.phase')}
        </p>
        <h1 id="shell-title">{t('shell.title')}</h1>
        <p className="hero-description">{t('shell.description')}</p>

        <div className="boundary-reminder">
          <span className="boundary-reminder-icon" aria-hidden="true">
            !
          </span>
          <p>{t('boundary.detail')}</p>
        </div>
      </div>

      <div className="status-stack">
        <section className="status-card task-card" aria-labelledby="task-card-title">
          <div className="card-heading">
            <p className="card-eyebrow">{t('shell.currentBound')}</p>
            <span className="task-index">{t('shell.taskIndex')}</span>
          </div>
          <h2 id="task-card-title">{prototypeFixture.taskId}</h2>
          <p className="task-name">{t('shell.taskName')}</p>
          <div className="card-rule" />
          <div className="local-state-row">
            <span className="state-dot" aria-hidden="true" />
            <span>{t('shell.localOnly')}</span>
            <span className="status-value">{t('shell.notConnected')}</span>
          </div>
        </section>

        <section className="status-card scope-card" aria-labelledby="scope-card-title">
          <p className="card-eyebrow">{t('shell.systemStatus')}</p>
          <h2 id="scope-card-title">{t('shell.runtimeBoundary')}</h2>
          <p className="scope-description">{t('shell.systemStatusDetail')}</p>
          <ul className="scope-list">
            <li>
              <span className="scope-symbol" aria-hidden="true">
                —
              </span>
              {t('shell.scopeRoute')}
            </li>
            <li>
              <span className="scope-symbol" aria-hidden="true">
                —
              </span>
              {t('shell.scopeFixtures')}
            </li>
            <li>
              <span className="scope-symbol" aria-hidden="true">
                —
              </span>
              {t('shell.scopeNetwork')}
            </li>
          </ul>
          <div className="persistence-chip">{t('shell.noPersistence')}</div>
        </section>
      </div>
    </section>
  );
}
