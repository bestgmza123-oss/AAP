import { Link } from 'react-router-dom';
import { prototypeFixture } from '../fixtures/prototype';
import { t } from '../i18n';

export function StartPage() {
  return (
    <section className="start-page" aria-labelledby="start-title">
      <div className="start-hero">
        <p className="eyebrow">
          <span className="eyebrow-marker" aria-hidden="true" />
          {t('start.eyebrow')}
        </p>
        <h1 id="start-title">{t('start.title')}</h1>
        <p className="hero-description">{t('start.description')}</p>
        <div className="start-actions">
          <Link className="primary-action" to="/updates">
            {t('start.updatesAction')} <span aria-hidden="true">→</span>
          </Link>
          <span className="action-note">{t('start.actionNote')}</span>
        </div>
      </div>

      <div className="start-panels">
        <section className="status-card identity-card" aria-labelledby="identity-title">
          <p className="card-eyebrow">{t('identity.sectionLabel')}</p>
          <h2 id="identity-title">{t('identity.title')}</h2>
          <p className="identity-description">{t('identity.description')}</p>
          <div className="identity-id">
            <span>{t('identity.idLabel')}</span>
            <strong>{prototypeFixture.fixtureIdentity}</strong>
          </div>
          <div className="identity-state">
            <span className="state-dot" aria-hidden="true" />
            {t('identity.localState')}
          </div>
        </section>

        <section className="status-card updates-card" aria-labelledby="updates-card-title">
          <p className="card-eyebrow">{t('updates.sectionLabel')}</p>
          <h2 id="updates-card-title">{t('updates.emptyTitle')}</h2>
          <p className="scope-description">{t('updates.emptyDescription')}</p>
          <Link className="text-action" to="/updates">
            {t('updates.viewLink')} <span aria-hidden="true">→</span>
          </Link>
          <div className="version-row">
            <span>
              {t('app.versionPrefix')} {prototypeFixture.version}
            </span>
            <span>{t('app.previewStatus')}</span>
          </div>
        </section>
      </div>
    </section>
  );
}

export function UpdatesPage() {
  return (
    <section className="updates-page" aria-labelledby="updates-title">
      <p className="eyebrow">
        <span className="eyebrow-marker" aria-hidden="true" />
        {t('updates.sectionLabel')}
      </p>
      <h1 id="updates-title">{t('updates.title')}</h1>
      <p className="hero-description">{t('updates.description')}</p>
      <div className="updates-empty-state">
        <span className="empty-state-mark" aria-hidden="true">
          i
        </span>
        <div>
          <h2>{t('updates.emptyTitle')}</h2>
          <p>{t('updates.emptyDescription')}</p>
        </div>
      </div>
      <div className="updates-meta">
        <span>
          {t('app.versionPrefix')} {prototypeFixture.version}
        </span>
        <span>{t('app.previewStatus')}</span>
      </div>
      <Link className="return-link" to="/">
        {t('route.returnToStart')} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
