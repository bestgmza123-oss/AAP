import { Link } from 'react-router-dom';
import { t } from '../i18n';

export function MailInactivePage() {
  return (
    <section
      className="mail-inactive-page"
      aria-labelledby="mail-page-title"
      data-testid="mail-inactive-page"
    >
      <nav className="mail-breadcrumbs" aria-label={t('mail.page.breadcrumbLabel')}>
        <Link to="/">{t('nav.start')}</Link>
        <span aria-hidden="true">/</span>
        <Link to="/updates">{t('nav.updates')}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t('nav.mail')}</span>
      </nav>
      <header className="mail-page-heading">
        <p className="mail-eyebrow">{t('mail.page.eyebrow')}</p>
        <h1 id="mail-page-title">{t('mail.page.title')}</h1>
        <p>{t('mail.page.description')}</p>
      </header>
      <aside className="mail-inactive-boundary" role="note">
        <strong>{t('mail.page.inactiveStatus')}</strong>
        <p>{t('mail.page.inactiveDescription')}</p>
      </aside>
      <section
        className="mail-empty-state"
        aria-labelledby="mail-empty-title"
        data-testid="mail-empty-state"
      >
        <span className="mail-empty-icon" aria-hidden="true">
          ✉
        </span>
        <p className="mail-eyebrow">{t('mail.page.emptyEyebrow')}</p>
        <h2 id="mail-empty-title">{t('mail.page.emptyTitle')}</h2>
        <p>{t('mail.page.emptyDescription')}</p>
        <div className="mail-disabled-actions">
          <button type="button" disabled aria-describedby="mail-actions-disabled-reason">
            {t('mail.page.claimDisabled')}
          </button>
          <button type="button" disabled aria-describedby="mail-actions-disabled-reason">
            {t('mail.page.deleteDisabled')}
          </button>
        </div>
        <p className="mail-disabled-reason" id="mail-actions-disabled-reason">
          {t('mail.page.actionsDisabledReason')}
        </p>
        <Link className="mail-return-link" to="/updates">
          {t('mail.page.updatesLink')}
        </Link>
      </section>
    </section>
  );
}
