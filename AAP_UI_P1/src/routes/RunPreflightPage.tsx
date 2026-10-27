import { useState } from 'react';
import { Link } from 'react-router-dom';
import { provinceFixture } from '../fixtures/province';
import {
  calculateEntryStaminaCost,
  type RunFixtureLevel,
  runPreflightFixture,
} from '../fixtures/run-preflight';
import { type TranslationKey, t } from '../i18n';

type ResourceId = keyof typeof provinceFixture.resources;

const resourceDefinitions: {
  id: ResourceId;
  labelKey: TranslationKey;
  noteKey: TranslationKey;
  previewOnly: boolean;
}[] = [
  {
    id: 'hp',
    labelKey: 'province.resource.hp',
    noteKey: 'preflight.resource.fixtureOnly',
    previewOnly: false,
  },
  {
    id: 'stamina',
    labelKey: 'province.resource.stamina',
    noteKey: 'preflight.resource.fixtureOnly',
    previewOnly: false,
  },
  {
    id: 'mana',
    labelKey: 'province.resource.mana',
    noteKey: 'preflight.resource.fixtureOnly',
    previewOnly: false,
  },
  {
    id: 'hunger',
    labelKey: 'province.resource.hunger',
    noteKey: 'preflight.resource.hungerInactive',
    previewOnly: true,
  },
  {
    id: 'infection',
    labelKey: 'province.resource.infection',
    noteKey: 'preflight.resource.infectionInactive',
    previewOnly: true,
  },
];

function ResourceSnapshotCard({
  id,
  labelKey,
  noteKey,
  previewOnly,
  currentOverride,
}: (typeof resourceDefinitions)[number] & { currentOverride?: number }) {
  const resource = provinceFixture.resources[id];
  const currentValue = currentOverride ?? resource.current;

  return (
    <article
      data-testid={`preflight-resource-${id}`}
      className={
        previewOnly
          ? 'preflight-resource-card preflight-resource-preview'
          : 'preflight-resource-card'
      }
    >
      <div className="preflight-resource-heading">
        <h3>{t(labelKey)}</h3>
        <strong>
          {currentValue}
          <span aria-hidden="true"> / </span>
          {resource.maximum}
        </strong>
      </div>
      <p>{t(noteKey)}</p>
    </article>
  );
}

function isRunFixtureLevel(value: number): value is RunFixtureLevel {
  return runPreflightFixture.scenarioLevels.some((level) => level === value);
}

type PreflightAvailabilityState = 'ready' | 'missing-fixture' | 'error';

export function RunPreflightPage() {
  const [selectedLevel, setSelectedLevel] = useState<RunFixtureLevel>(1);
  const [lowStaminaPreview, setLowStaminaPreview] = useState(false);
  const [confirmationRecorded, setConfirmationRecorded] = useState(false);
  const [availabilityState, setAvailabilityState] = useState<PreflightAvailabilityState>('ready');
  const entryCost = calculateEntryStaminaCost(selectedLevel);
  const displayedStamina = lowStaminaPreview
    ? runPreflightFixture.lowStaminaExample
    : provinceFixture.resources.stamina.current;
  const canBegin =
    availabilityState === 'ready' && entryCost !== null && displayedStamina >= entryCost;

  function previewAvailabilityState(nextState: PreflightAvailabilityState) {
    setAvailabilityState(nextState);
    setConfirmationRecorded(false);
  }

  function retryLocalPreview() {
    setAvailabilityState('ready');
    setConfirmationRecorded(false);
    setLowStaminaPreview(false);
  }

  function handleLevelChange(value: string) {
    const nextLevel = Number(value);
    if (isRunFixtureLevel(nextLevel)) {
      setSelectedLevel(nextLevel);
      setConfirmationRecorded(false);
    }
  }

  function toggleLowStaminaPreview() {
    setLowStaminaPreview((current) => !current);
    setConfirmationRecorded(false);
  }

  return (
    <section
      className="preflight-page"
      aria-labelledby="preflight-title"
      data-fixture-id={runPreflightFixture.id}
    >
      <nav className="preflight-breadcrumbs" aria-label={t('preflight.breadcrumbLabel')}>
        <Link className="preflight-breadcrumb-link" to="/province">
          {t('province.title')}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t('preflight.title')}</span>
      </nav>

      <header className="preflight-heading">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-marker" aria-hidden="true" />
            {t('preflight.eyebrow')}
          </p>
          <h1 id="preflight-title">{t('preflight.title')}</h1>
          <p className="preflight-intro">{t('preflight.description')}</p>
        </div>
        <span className="preflight-fixture-stamp">{t('preflight.fixtureStamp')}</span>
      </header>

      <div className="preflight-boundary-note" role="note">
        <span className="preflight-boundary-icon" aria-hidden="true">
          !
        </span>
        <p>{t('preflight.boundaryNotice')}</p>
      </div>

      <details className="preflight-state-demo">
        <summary>{t('preflight.stateDemo.summary')}</summary>
        <p>{t('preflight.stateDemo.description')}</p>
        <div className="preflight-state-demo-actions">
          <button type="button" onClick={() => previewAvailabilityState('missing-fixture')}>
            {t('preflight.stateDemo.noFixtureAction')}
          </button>
          <button type="button" onClick={() => previewAvailabilityState('error')}>
            {t('preflight.stateDemo.errorAction')}
          </button>
          <button type="button" onClick={retryLocalPreview}>
            {t('preflight.stateDemo.restoreAction')}
          </button>
        </div>
      </details>

      <div className="preflight-layout">
        <div className="preflight-main-column">
          <section
            className="preflight-panel preflight-overview-panel"
            aria-labelledby="preflight-overview-title"
          >
            <div className="preflight-section-heading">
              <div>
                <p className="card-eyebrow">{t('preflight.overview.eyebrow')}</p>
                <h2 id="preflight-overview-title">{t('preflight.overview.title')}</h2>
              </div>
              <span className="fixture-status">{t(provinceFixture.standardRun.statusKey)}</span>
            </div>

            <div className="preflight-run-identity">
              <div className="preflight-run-icon" aria-hidden="true">
                R
              </div>
              <div>
                <h3>{t(provinceFixture.standardRun.nameKey)}</h3>
                <p>{t('preflight.overview.runDescription')}</p>
              </div>
            </div>

            <div className="preflight-facts-grid">
              <article className="preflight-fact-card">
                <span>{t('preflight.overview.provinceLabel')}</span>
                <strong>{t(provinceFixture.world.currentProvince.nameKey)}</strong>
              </article>
              <article className="preflight-fact-card">
                <span>{t('province.run.recommendedLevel')}</span>
                <strong>{provinceFixture.standardRun.recommendedLevel}</strong>
              </article>
              <article className="preflight-fact-card">
                <span>{t('province.run.threat')}</span>
                <strong>{t(provinceFixture.standardRun.threatKey)}</strong>
              </article>
              <article className="preflight-fact-card">
                <span>{t('preflight.overview.enemyCount')}</span>
                <strong>
                  {runPreflightFixture.normalEnemyCount.minimum}–
                  {runPreflightFixture.normalEnemyCount.maximum}
                </strong>
                <small>{t('preflight.overview.normalEnemies')}</small>
              </article>
            </div>

            <fieldset className="preflight-level-fieldset">
              <legend>{t('preflight.levelScenario.label')}</legend>
              <p className="preflight-fieldset-help">{t('preflight.levelScenario.description')}</p>
              <div className="preflight-level-options">
                {runPreflightFixture.scenarioLevels.map((level) => {
                  const cost = calculateEntryStaminaCost(level);
                  const selected = selectedLevel === level;
                  return (
                    <label
                      className={
                        selected ? 'preflight-level-option selected' : 'preflight-level-option'
                      }
                      key={level}
                    >
                      <input
                        type="radio"
                        name="preflight-level"
                        value={level}
                        checked={selected}
                        onChange={(event) => handleLevelChange(event.currentTarget.value)}
                      />
                      <span className="preflight-level-number">
                        {t('preflight.levelScenario.level')} {level}
                      </span>
                      <strong>
                        {cost}{' '}
                        <span className="preflight-level-cost-unit">
                          {t('preflight.entryCost.unit')}
                        </span>
                      </strong>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="preflight-cost-summary" aria-live="polite">
              <div>
                <span className="preflight-cost-label">{t('preflight.entryCost.label')}</span>
                <p>{t('preflight.entryCost.basis')}</p>
              </div>
              <div className="preflight-cost-value">
                <strong data-testid="preflight-entry-cost">{entryCost ?? '—'}</strong>
                <span>{t('preflight.entryCost.unit')}</span>
              </div>
            </div>
            <p className="preflight-cost-disclaimer">{t('preflight.entryCost.disclaimer')}</p>

            <div className="preflight-timeout-card">
              <span className="preflight-timeout-icon" aria-hidden="true">
                ◷
              </span>
              <div>
                <span>{t('preflight.timeout.label')}</span>
                <strong>
                  {runPreflightFixture.hardTimeoutMinutes} {t('preflight.timeout.minutes')}
                </strong>
                <p>{t('preflight.timeout.description')}</p>
              </div>
            </div>
          </section>

          <section className="preflight-panel" aria-labelledby="preflight-restrictions-title">
            <div className="preflight-section-heading">
              <div>
                <p className="card-eyebrow">{t('preflight.restrictions.eyebrow')}</p>
                <h2 id="preflight-restrictions-title">{t('preflight.restrictions.title')}</h2>
              </div>
            </div>
            <ul className="preflight-rule-list">
              <li>
                <span aria-hidden="true">×</span>
                <p>{t('preflight.restrictions.noPotions')}</p>
              </li>
              <li>
                <span aria-hidden="true">×</span>
                <p>{t('preflight.restrictions.noLoadoutChanges')}</p>
              </li>
            </ul>
          </section>

          <section className="preflight-panel" aria-labelledby="preflight-risk-title">
            <div className="preflight-section-heading">
              <div>
                <p className="card-eyebrow">{t('preflight.risk.eyebrow')}</p>
                <h2 id="preflight-risk-title">{t('preflight.risk.title')}</h2>
              </div>
            </div>
            <ul className="preflight-rule-list preflight-risk-list">
              <li>
                <span aria-hidden="true">!</span>
                <p>{t('preflight.risk.enemyRange')}</p>
              </li>
              <li>
                <span aria-hidden="true">!</span>
                <p>{t('preflight.risk.returnEncounter')}</p>
              </li>
              <li>
                <span aria-hidden="true">!</span>
                <p>{t('preflight.risk.expiry')}</p>
              </li>
              <li>
                <span aria-hidden="true">!</span>
                <p>{t('preflight.risk.infectionInactive')}</p>
              </li>
            </ul>

            <div className="preflight-consequence-details">
              <details>
                <summary>{t('preflight.risk.escapeSummary')}</summary>
                <p>{t('preflight.risk.escapeDetails')}</p>
              </details>
              <details>
                <summary>{t('preflight.risk.surrenderSummary')}</summary>
                <p>{t('preflight.risk.surrenderDetails')}</p>
              </details>
            </div>
          </section>
        </div>

        <aside className="preflight-side-column" aria-label={t('preflight.resources.regionLabel')}>
          <section
            className="preflight-panel preflight-resources-panel"
            aria-labelledby="preflight-resources-title"
          >
            <div className="preflight-section-heading">
              <div>
                <p className="card-eyebrow">{t('preflight.resources.eyebrow')}</p>
                <h2 id="preflight-resources-title">{t('preflight.resources.title')}</h2>
              </div>
              <span className="fixture-status">{t('province.resource.snapshot')}</span>
            </div>
            <p className="preflight-resource-intro">{t('preflight.resources.description')}</p>
            <div className="preflight-resource-list">
              {resourceDefinitions.map((resource) => (
                <ResourceSnapshotCard
                  key={resource.id}
                  {...resource}
                  currentOverride={
                    resource.id === 'stamina' && lowStaminaPreview
                      ? runPreflightFixture.lowStaminaExample
                      : undefined
                  }
                />
              ))}
            </div>

            <div className="preflight-low-stamina-demo">
              <p>{t('preflight.lowStamina.description')}</p>
              <button
                type="button"
                className="preflight-preview-toggle"
                aria-pressed={lowStaminaPreview}
                onClick={toggleLowStaminaPreview}
              >
                {t(
                  lowStaminaPreview
                    ? 'preflight.lowStamina.restoreAction'
                    : 'preflight.lowStamina.previewAction',
                )}
              </button>
              {lowStaminaPreview ? (
                <p className="preflight-low-stamina-active" role="status">
                  {t('preflight.lowStamina.activeNotice')}
                </p>
              ) : null}
            </div>
          </section>

          <section
            className="preflight-panel preflight-confirm-panel"
            aria-labelledby="preflight-confirm-title"
          >
            <p className="card-eyebrow">{t('preflight.confirm.eyebrow')}</p>
            <h2 id="preflight-confirm-title">{t('preflight.confirm.title')}</h2>
            <p>{t('preflight.confirm.description')}</p>
            {availabilityState === 'missing-fixture' ? (
              <p className="preflight-insufficient-notice" role="alert">
                {t('preflight.confirm.fixtureMissing')}
              </p>
            ) : null}
            {availabilityState === 'error' ? (
              <div className="preflight-error-state">
                <p role="alert">{t('preflight.confirm.errorDescription')}</p>
                <button type="button" onClick={retryLocalPreview}>
                  {t('preflight.confirm.retryAction')}
                </button>
              </div>
            ) : null}
            {availabilityState === 'ready' && !canBegin ? (
              <p className="preflight-insufficient-notice" role="alert">
                {t('preflight.confirm.insufficientStamina', {
                  current: displayedStamina,
                  cost: entryCost ?? 0,
                })}
              </p>
            ) : null}
            <button
              type="button"
              className="preflight-begin-action"
              disabled={!canBegin || confirmationRecorded}
              onClick={() => setConfirmationRecorded(true)}
            >
              {t(
                confirmationRecorded
                  ? 'preflight.confirm.recordedAction'
                  : 'preflight.confirm.beginAction',
              )}
              <span aria-hidden="true">→</span>
            </button>
            <Link className="preflight-cancel-action" to="/province">
              {t('preflight.confirm.cancelAction')}
            </Link>
            {confirmationRecorded ? (
              <div className="preflight-confirmed-notice" role="status" aria-live="polite">
                <strong>{t('preflight.confirm.recordedTitle')}</strong>
                <p>{t('preflight.confirm.recordedDescription')}</p>
                <Link className="preflight-begin-action" to="/run/combat">
                  {t('preflight.confirm.openCombatDemo')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            ) : null}
            <p className="preflight-confirm-footer">{t('preflight.confirm.footer')}</p>
          </section>
        </aside>
      </div>

      <footer className="preflight-footer">
        <Link className="return-link" to="/province">
          {t('preflight.backToProvince')}
          <span aria-hidden="true">↗</span>
        </Link>
        <p className="preflight-footer-note">
          {t('province.footerNote')} · {provinceFixture.id}
        </p>
      </footer>
    </section>
  );
}
