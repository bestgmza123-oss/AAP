import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  isRunResultOutcome,
  normalizeRunResultPayload,
  type RunResultOutcome,
  type RunResultPayload,
  sumResultWeightGrams,
} from '../fixtures/run-result';
import { type TranslationKey, type TranslationValues, t, tExpanded } from '../i18n';

type ReviewState = 'ready' | 'loading' | 'waiting' | 'empty' | 'error' | 'blocked';

function formatWeight(grams: number): string {
  return `${(grams / 1000).toFixed(3)} kg (${grams.toLocaleString('en-US')} g)`;
}

function itemSummary(
  items: RunResultPayload['chosenPendingItems'],
  translate: (key: TranslationKey, values?: TranslationValues) => string,
): string {
  if (items.length === 0) return translate('result.bucket.none');
  return items.map((item) => `${translate(item.nameKey)} × ${item.quantity}`).join(' · ');
}

function outcomeKeys(outcome: RunResultOutcome): {
  title: TranslationKey;
  description: TranslationKey;
  status: TranslationKey;
} {
  switch (outcome) {
    case 'completed':
      return {
        title: 'result.outcome.completedTitle',
        description: 'result.outcome.completedDescription',
        status: 'result.outcome.completedStatus',
      };
    case 'escaped':
      return {
        title: 'result.outcome.escapedTitle',
        description: 'result.outcome.escapedDescription',
        status: 'result.outcome.escapedStatus',
      };
    case 'failed':
      return {
        title: 'result.outcome.failedTitle',
        description: 'result.outcome.failedDescription',
        status: 'result.outcome.failedStatus',
      };
    case 'expired':
      return {
        title: 'result.outcome.expiredTitle',
        description: 'result.outcome.expiredDescription',
        status: 'result.outcome.expiredStatus',
      };
  }
}

export function RunResultPage() {
  const { outcome: routeOutcome } = useParams();
  const outcomeIsValid = isRunResultOutcome(routeOutcome);
  const outcome: RunResultOutcome = outcomeIsValid ? routeOutcome : 'completed';
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const [reviewState, setReviewState] = useState<ReviewState>('ready');
  const [returnState, setReturnState] = useState<ReviewState>('ready');
  const pseudoExpanded = searchParams.get('copy') === 'expanded';
  const rawPayload = location.state as unknown;
  const payload = normalizeRunResultPayload(outcomeIsValid ? rawPayload : undefined, outcome);
  const keys = outcomeKeys(outcome);

  const translate = (key: TranslationKey, values?: TranslationValues) =>
    pseudoExpanded ? tExpanded(key, values) : t(key, values);

  useEffect(() => {
    if (location.pathname.startsWith('/run/result/')) resultHeadingRef.current?.focus();
  }, [location.pathname]);

  function changeCopyMode(mode: string) {
    const next = new URLSearchParams(searchParams);
    if (mode === 'expanded') next.set('copy', 'expanded');
    else next.delete('copy');
    setSearchParams(next, { replace: true });
  }

  function showReviewState(next: ReviewState) {
    setReturnState(reviewState === 'ready' ? 'ready' : returnState);
    setReviewState(next);
  }

  function cancelReviewState() {
    setReviewState(returnState === 'ready' ? 'ready' : returnState);
  }

  function retryLocalFixture() {
    setReviewState('ready');
    setReturnState('ready');
  }

  const chosenWeightGrams = sumResultWeightGrams(payload.chosenPendingItems);
  const receivedWeightGrams = sumResultWeightGrams(payload.receivedDemoItems);
  const forfeitedWeightGrams = sumResultWeightGrams(payload.forfeitedItems);
  const isExpired = outcome === 'expired';
  const isFailed = outcome === 'failed';
  const isEscaped = outcome === 'escaped';
  const isCompleted = outcome === 'completed';
  const escapeDescriptionKey: TranslationKey =
    payload.escapeContext === 'return-encounter'
      ? 'result.outcome.escapedReturnContext'
      : 'result.outcome.escapedPreClearContext';

  return (
    <section
      className="result-page"
      aria-labelledby="result-page-title"
      data-testid="run-result-page"
    >
      <nav className="result-breadcrumbs" aria-label={translate('result.breadcrumb.label')}>
        <Link to="/province">{translate('province.title')}</Link>
        <span aria-hidden="true">/</span>
        <Link to="/run/preflight">{translate('preflight.title')}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{translate('result.page.title')}</span>
      </nav>

      <header className="result-heading">
        <div>
          <p className="result-eyebrow">{translate('result.page.eyebrow')}</p>
          <h1
            id="result-page-title"
            data-testid="result-page-title"
            tabIndex={-1}
            ref={resultHeadingRef}
          >
            {translate('result.page.title')}
          </h1>
          <p>{translate('result.page.description')}</p>
        </div>
        <span className="result-fixture-stamp">{translate('result.page.fixtureStamp')}</span>
      </header>

      <aside
        className="result-boundary"
        role="note"
        aria-label={translate('result.page.boundaryLabel')}
      >
        <strong>{translate('result.page.boundaryTitle')}</strong>
        <p>{translate('result.page.boundaryDescription')}</p>
      </aside>

      <section className="result-review-tools" aria-labelledby="result-review-tools-title">
        <div>
          <p className="result-eyebrow">{translate('result.review.eyebrow')}</p>
          <h2 id="result-review-tools-title">{translate('result.review.title')}</h2>
          <p>{translate('result.review.description')}</p>
        </div>
        <label className="result-select-label">
          {translate('result.review.copyModeLabel')}
          <select
            value={pseudoExpanded ? 'expanded' : 'normal'}
            onChange={(event) => changeCopyMode(event.currentTarget.value)}
            data-testid="result-text-mode"
          >
            <option value="normal">{translate('result.review.copyNormal')}</option>
            <option value="expanded">{translate('result.review.copyExpanded')}</option>
          </select>
        </label>
        <label className="result-select-label">
          {translate('result.review.stateLabel')}
          <select
            value={reviewState}
            onChange={(event) => showReviewState(event.currentTarget.value as ReviewState)}
            data-testid="result-state-mode"
          >
            <option value="ready">{translate('result.review.stateReady')}</option>
            <option value="loading">{translate('result.review.stateLoading')}</option>
            <option value="waiting">{translate('result.review.stateWaiting')}</option>
            <option value="empty">{translate('result.review.stateEmpty')}</option>
            <option value="error">{translate('result.review.stateError')}</option>
            <option value="blocked">{translate('result.review.stateBlocked')}</option>
          </select>
        </label>
      </section>

      {reviewState === 'loading' || reviewState === 'waiting' ? (
        <section
          className="result-state-panel"
          role="status"
          aria-live="polite"
          aria-busy="true"
          data-testid={reviewState === 'loading' ? 'result-loading-state' : 'result-waiting-state'}
        >
          <span className="result-state-icon" aria-hidden="true">
            {reviewState === 'loading' ? '…' : '◷'}
          </span>
          <h2>
            {translate(
              reviewState === 'loading'
                ? 'result.review.loadingTitle'
                : 'result.review.waitingTitle',
            )}
          </h2>
          <p>
            {translate(
              reviewState === 'loading'
                ? 'result.review.loadingDescription'
                : 'result.review.waitingDescription',
            )}
          </p>
          <button
            type="button"
            className="result-secondary-action"
            onClick={cancelReviewState}
            data-testid="result-state-cancel"
          >
            {translate('result.review.cancel')}
          </button>
        </section>
      ) : null}

      {reviewState === 'empty' ? (
        <section
          className="result-state-panel"
          aria-labelledby="result-empty-title"
          data-testid="result-empty-state"
        >
          <p className="result-eyebrow">{translate('result.review.stateEmpty')}</p>
          <h2 id="result-empty-title">{translate('result.review.emptyTitle')}</h2>
          <p>{translate('result.review.emptyDescription')}</p>
          <button
            type="button"
            className="result-primary-action"
            onClick={retryLocalFixture}
            data-testid="result-empty-restore"
          >
            {translate('result.review.restoreSample')}
          </button>
          <button
            type="button"
            className="result-secondary-action"
            onClick={() => navigate('/province')}
          >
            {translate('result.returnToProvince')}
          </button>
        </section>
      ) : null}

      {reviewState === 'error' ? (
        <section
          className="result-state-panel error"
          aria-labelledby="result-error-title"
          data-testid="result-error-state"
        >
          <p className="result-eyebrow">{translate('result.review.stateError')}</p>
          <h2 id="result-error-title">{translate('result.review.errorTitle')}</h2>
          <p>{translate('result.review.errorDescription')}</p>
          <div className="result-actions">
            <button
              type="button"
              className="result-primary-action"
              onClick={retryLocalFixture}
              data-testid="result-retry-local"
            >
              {translate('result.review.retryLocal')}
            </button>
            <button type="button" className="result-secondary-action" onClick={cancelReviewState}>
              {translate('result.review.cancel')}
            </button>
          </div>
        </section>
      ) : null}

      {reviewState === 'blocked' ? (
        <section
          className="result-state-panel blocked"
          aria-labelledby="result-blocked-title"
          data-testid="result-blocked-state"
        >
          <p className="result-eyebrow">{translate('result.review.stateBlocked')}</p>
          <h2 id="result-blocked-title">{translate('result.review.blockedTitle')}</h2>
          <p>{translate('result.review.blockedDescription')}</p>
          <button type="button" className="result-primary-action" onClick={retryLocalFixture}>
            {translate('result.review.backToResult')}
          </button>
        </section>
      ) : null}

      {reviewState === 'ready' && outcomeIsValid ? (
        <section
          className={`result-terminal-panel ${outcome}`}
          aria-labelledby="result-terminal-title"
          data-testid={`result-outcome-${outcome}`}
        >
          <div className="result-terminal-heading">
            <div>
              <p className="result-eyebrow">{translate('result.outcome.eyebrow')}</p>
              <h2 id="result-terminal-title" data-testid="result-outcome-title">
                {translate(keys.title)}
              </h2>
            </div>
            <span className="result-outcome-status">{translate(keys.status)}</span>
          </div>
          <p>{translate(keys.description)}</p>
          {isEscaped ? <p>{translate(escapeDescriptionKey)}</p> : null}
          {isCompleted ? <p>{translate('result.outcome.completedPendingNotice')}</p> : null}
          {isFailed ? (
            <ul>
              <li>{translate('result.outcome.noRewards')}</li>
              <li>{translate('result.outcome.noEntryRefund')}</li>
              <li>{translate('result.outcome.surrenderNoDeath')}</li>
            </ul>
          ) : null}
          {isExpired ? (
            <ul>
              <li>{translate('result.outcome.noRewards')}</li>
              <li>{translate('result.outcome.noEntryRefund')}</li>
              <li>{translate('result.outcome.expiryNotDeath')}</li>
            </ul>
          ) : null}
          {payload.escapeCostGold !== undefined && payload.escapePaymentMethod === 'gold' ? (
            <p>{translate('result.outcome.escapePaymentGold', { cost: payload.escapeCostGold })}</p>
          ) : null}
          {payload.escapePaymentMethod === 'warp-stone' ? (
            <p>{translate('result.outcome.escapePaymentStone')}</p>
          ) : null}

          <section
            className="result-buckets"
            aria-label={translate('result.bucket.region')}
            data-testid="result-buckets"
          >
            <article className="result-bucket">
              <span>{translate('result.bucket.carriedIn')}</span>
              <strong data-testid="result-carried-in-weight">
                {formatWeight(payload.carriedInWeightGrams)}
              </strong>
              <p>{translate('result.bucket.carriedInDescription')}</p>
            </article>
            <article className="result-bucket">
              <span>{translate('result.bucket.chosenPending')}</span>
              <strong data-testid="result-chosen-weight">{formatWeight(chosenWeightGrams)}</strong>
              <p data-testid="result-chosen-items">
                {itemSummary(payload.chosenPendingItems, translate)}
              </p>
              <p>{translate('result.bucket.chosenPendingDescription')}</p>
            </article>
            <article className="result-bucket">
              <span>{translate('result.bucket.receivedDemo')}</span>
              <strong data-testid="result-received-weight">
                {formatWeight(receivedWeightGrams)}
              </strong>
              <p data-testid="result-received-items">
                {itemSummary(payload.receivedDemoItems, translate)}
              </p>
              <p>{translate('result.bucket.receivedDemoDescription')}</p>
            </article>
            {payload.forfeitedItems.length > 0 ? (
              <article className="result-bucket forfeited">
                <span>{translate('result.bucket.forfeited')}</span>
                <strong data-testid="result-forfeited-weight">
                  {formatWeight(forfeitedWeightGrams)}
                </strong>
                <p>{itemSummary(payload.forfeitedItems, translate)}</p>
                <p>{translate('result.bucket.forfeitedDescription')}</p>
              </article>
            ) : null}
          </section>

          <p className="result-capacity-note">{translate('result.outcome.noPersistence')}</p>
          <div className="result-disabled-action" data-testid="result-disabled-action">
            <button type="button" disabled aria-describedby="result-claim-disabled-reason">
              {translate('result.actions.claimUnavailable')}
            </button>
            <p id="result-claim-disabled-reason">
              {translate('result.actions.claimDisabledReason')}
            </p>
          </div>
          <div className="result-actions">
            <Link
              className="result-primary-action"
              to="/province"
              data-testid="result-return-province"
            >
              {translate('result.returnToProvince')}
            </Link>
            <Link className="result-secondary-action" to="/run/combat">
              {translate('result.actions.openCombatFixture')}
            </Link>
          </div>
        </section>
      ) : null}

      {!outcomeIsValid ? (
        <section
          className="result-state-panel error"
          role="alert"
          data-testid="result-invalid-outcome"
        >
          <h2>{translate('result.review.invalidOutcomeTitle')}</h2>
          <p>{translate('result.review.invalidOutcomeDescription')}</p>
          <Link className="result-primary-action" to="/province">
            {translate('result.returnToProvince')}
          </Link>
        </section>
      ) : null}
    </section>
  );
}
