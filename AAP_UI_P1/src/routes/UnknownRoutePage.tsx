import { Link } from 'react-router-dom';
import { t } from '../i18n';

export function UnknownRoutePage() {
  return (
    <section className="unknown-route" aria-labelledby="unknown-route-title">
      <p className="eyebrow">{t('shell.phase')}</p>
      <h1 id="unknown-route-title">{t('route.unknownTitle')}</h1>
      <p>{t('route.unknownDescription')}</p>
      <Link className="return-link" to="/">
        {t('route.returnToShell')}
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
