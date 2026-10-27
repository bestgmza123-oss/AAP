import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  type CombatAction,
  type CombatLogEntry,
  combatFixture,
  createInitialCombatState,
  getCombatActionDisabledReason,
  performCombatAction,
  resolveEnemyAction,
} from '../fixtures/combat';
import { runPreflightFixture } from '../fixtures/run-preflight';
import { type TranslationKey, t } from '../i18n';

function renderCombatLogEntry(entry: CombatLogEntry): string {
  const values = { ...entry.values };
  if (entry.enemyId) {
    const enemy = combatFixture.enemies.find((item) => item.id === entry.enemyId);
    if (enemy) values.enemy = t(enemy.nameKey);
  }
  return t(entry.key, values);
}

function ResourceBar({
  id,
  labelKey,
  current,
  maximum,
}: {
  id: string;
  labelKey: TranslationKey;
  current: number;
  maximum: number;
}) {
  return (
    <div className="combat-resource">
      <div className="combat-resource-heading">
        <label htmlFor={id}>{t(labelKey)}</label>
        <strong>
          {current} <span aria-hidden="true">/</span> {maximum}
        </strong>
      </div>
      <progress id={id} aria-label={t(labelKey)} value={current} max={maximum} />
    </div>
  );
}

export function CombatDemoPage() {
  const [state, setState] = useState(createInitialCombatState);
  const activeEnemy = combatFixture.enemies[state.enemyIndex];
  const isPlayerTurn = state.phase === 'player-turn';
  const isEnemyTurn = state.phase === 'enemy-turn';
  const isActive = isPlayerTurn || isEnemyTurn;
  const skillDisabledReason = getCombatActionDisabledReason(state, 'skill');

  function handlePlayerAction(action: CombatAction) {
    setState((current) => performCombatAction(current, action).state);
  }

  function handleEnemyAction() {
    setState((current) => resolveEnemyAction(current).state);
  }

  function resetDemo() {
    setState(createInitialCombatState());
  }

  function previewInsufficientMana() {
    setState({
      ...createInitialCombatState(),
      playerMana: combatFixture.skill.manaCost - 1,
    });
  }

  return (
    <section
      className="combat-page"
      aria-labelledby="combat-title"
      data-fixture-id={combatFixture.id}
    >
      <nav className="combat-breadcrumbs" aria-label={t('combat.breadcrumbLabel')}>
        <Link to="/province" className="combat-breadcrumb-link">
          {t('province.title')}
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/run/preflight" className="combat-breadcrumb-link">
          {t('preflight.title')}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t('combat.title')}</span>
      </nav>

      <header className="combat-heading">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-marker" aria-hidden="true" />
            {t('combat.eyebrow')}
          </p>
          <h1 id="combat-title">{t('combat.title')}</h1>
          <p className="combat-intro">{t('combat.description')}</p>
        </div>
        <span className="combat-fixture-stamp">{t('combat.fixtureStamp')}</span>
      </header>

      <aside className="combat-boundary-note" role="note">
        <span className="combat-boundary-icon" aria-hidden="true">
          !
        </span>
        <p>{t('combat.boundaryNotice')}</p>
      </aside>

      <details className="combat-state-demo">
        <summary>{t('combat.stateDemo.summary')}</summary>
        <p>{t('combat.stateDemo.description')}</p>
        <div className="combat-state-demo-actions">
          <button type="button" onClick={previewInsufficientMana}>
            {t('combat.stateDemo.lowManaAction')}
          </button>
          <button type="button" onClick={resetDemo}>
            {t('combat.stateDemo.restoreAction')}
          </button>
        </div>
      </details>

      <section className="combat-status-strip" aria-label={t('combat.status.regionLabel')}>
        <article className="combat-status-cell">
          <span>{t('combat.status.turnOrder')}</span>
          <strong>{t('combat.status.fixedTurnOrder')}</strong>
        </article>
        <article className="combat-status-cell">
          <span>{t('combat.status.currentTurn')}</span>
          <strong data-testid="combat-phase">
            {t(
              state.phase === 'player-turn'
                ? 'combat.status.playerTurn'
                : state.phase === 'enemy-turn'
                  ? 'combat.status.enemyTurn'
                  : state.phase === 'complete'
                    ? 'combat.status.complete'
                    : 'combat.status.paused',
            )}
          </strong>
        </article>
        <article className="combat-status-cell">
          <span>{t('combat.status.turnNumber')}</span>
          <strong data-testid="combat-turn-number">{state.turnNumber}</strong>
        </article>
        <article className="combat-status-cell">
          <span>{t('combat.status.demoProgress')}</span>
          <strong data-testid="combat-defeated-count">
            {state.defeatedCount} / {combatFixture.enemies.length}
          </strong>
        </article>
        <article className="combat-status-cell">
          <span>{t('combat.status.demoClock')}</span>
          <strong>{runPreflightFixture.hardTimeoutMinutes}:00</strong>
          <small>{t('combat.status.demoClockInactive')}</small>
        </article>
      </section>

      <div className="combat-layout">
        <div className="combat-main-column">
          <section className="combat-panel combat-enemy-panel" aria-labelledby="combat-enemy-title">
            <div className="combat-section-heading">
              <div>
                <p className="card-eyebrow">{t('combat.enemy.eyebrow')}</p>
                <h2 id="combat-enemy-title">
                  {state.phase === 'complete'
                    ? t('combat.enemy.sequenceCompleteTitle')
                    : t(activeEnemy.nameKey)}
                </h2>
              </div>
              <span
                className={
                  state.phase === 'complete' ? 'combat-enemy-state complete' : 'combat-enemy-state'
                }
              >
                {t(
                  state.phase === 'complete'
                    ? 'combat.enemy.defeatedStatus'
                    : 'combat.enemy.normalFixtureStatus',
                )}
              </span>
            </div>
            {state.phase !== 'complete' ? (
              <>
                <div className="combat-enemy-profile">
                  <div className="combat-enemy-avatar" aria-hidden="true">
                    {state.enemyIndex + 1}
                  </div>
                  <div className="combat-enemy-identity">
                    <strong>{t(activeEnemy.nameKey)}</strong>
                    <p>{t('combat.enemy.profileFixtureNotice')}</p>
                  </div>
                  <div className="combat-enemy-count">
                    <span>{t('combat.enemy.fixtureIndex')}</span>
                    <strong>
                      {state.enemyIndex + 1} / {combatFixture.enemies.length}
                    </strong>
                  </div>
                </div>

                <dl className="combat-enemy-fields">
                  <div>
                    <dt>{t('combat.enemy.species')}</dt>
                    <dd>{t(activeEnemy.speciesKey)}</dd>
                  </div>
                  <div>
                    <dt>{t('combat.enemy.tier')}</dt>
                    <dd>{t(activeEnemy.tierKey)}</dd>
                  </div>
                  <div>
                    <dt>{t('combat.enemy.threatRank')}</dt>
                    <dd>{activeEnemy.threatRank}</dd>
                  </div>
                  <div>
                    <dt>{t('combat.enemy.level')}</dt>
                    <dd>{activeEnemy.level}</dd>
                  </div>
                  <div>
                    <dt>{t('combat.enemy.eventTag')}</dt>
                    <dd>{t(activeEnemy.eventTagKey)}</dd>
                  </div>
                </dl>

                <div className="combat-enemy-resources">
                  <ResourceBar
                    id="combat-enemy-hp"
                    labelKey="combat.enemy.hp"
                    current={state.enemyHp}
                    maximum={activeEnemy.maxHp}
                  />
                  {'mana' in activeEnemy && activeEnemy.mana ? (
                    <ResourceBar
                      id="combat-enemy-mana"
                      labelKey="combat.enemy.mana"
                      current={activeEnemy.mana.current}
                      maximum={activeEnemy.mana.maximum}
                    />
                  ) : (
                    <p className="combat-no-enemy-mana">{t('combat.enemy.noManaBar')}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="combat-complete-state" role="status">
                <span className="combat-complete-mark" aria-hidden="true">
                  ✓
                </span>
                <p>{t('combat.enemy.sequenceCompleteDescription')}</p>
                <p className="combat-boundary-inline">{t('combat.enemy.noResultYet')}</p>
                <button type="button" className="combat-secondary-action" onClick={resetDemo}>
                  {t('combat.actions.resetDemo')}
                </button>
              </div>
            )}

            {state.phase !== 'complete' && state.phase !== 'paused' ? (
              <div className="combat-intent-panel" data-testid="combat-intent">
                <div className="combat-intent-icon" aria-hidden="true">
                  !
                </div>
                <div>
                  <span>{t('combat.intent.label')}</span>
                  {activeEnemy.telegraphed && activeEnemy.intentKey ? (
                    <>
                      <strong data-testid="combat-intent-name">{t(activeEnemy.intentKey)}</strong>
                      <p>{t('combat.intent.telegraphedNotice')}</p>
                    </>
                  ) : (
                    <>
                      <strong>{t('combat.intent.notShownTitle')}</strong>
                      <p>{t('combat.intent.notTelegraphedNotice')}</p>
                    </>
                  )}
                </div>
                <span className="combat-intent-tag">
                  {activeEnemy.telegraphed
                    ? t('combat.intent.telegraphedTag')
                    : t('combat.intent.hiddenTag')}
                </span>
              </div>
            ) : null}
          </section>

          <section
            className="combat-panel combat-actions-panel"
            aria-labelledby="combat-actions-title"
          >
            <div className="combat-section-heading">
              <div>
                <p className="card-eyebrow">{t('combat.actions.eyebrow')}</p>
                <h2 id="combat-actions-title">{t('combat.actions.title')}</h2>
              </div>
              <span className="combat-turn-badge">
                {t(
                  isPlayerTurn
                    ? 'combat.status.playerTurn'
                    : isEnemyTurn
                      ? 'combat.status.enemyTurn'
                      : state.phase === 'complete'
                        ? 'combat.status.complete'
                        : 'combat.status.paused',
                )}
              </span>
            </div>

            <p className="combat-actions-intro">{t('combat.actions.description')}</p>
            <div className="combat-action-grid">
              <button
                type="button"
                className="combat-action-card"
                data-testid="combat-action-attack"
                disabled={!isPlayerTurn}
                onClick={() => handlePlayerAction('attack')}
              >
                <span className="combat-action-symbol" aria-hidden="true">
                  A
                </span>
                <span className="combat-action-title">{t('combat.actions.attack')}</span>
                <strong>{t('combat.actions.attackCost')}</strong>
                <small>{t('combat.actions.attackDescription')}</small>
                {!isPlayerTurn ? <small>{t('combat.actionReason.playerTurn')}</small> : null}
              </button>

              <button
                type="button"
                className="combat-action-card skill"
                data-testid="combat-action-skill"
                aria-describedby="combat-skill-reason"
                disabled={Boolean(skillDisabledReason)}
                onClick={() => handlePlayerAction('skill')}
              >
                <span className="combat-action-symbol" aria-hidden="true">
                  S
                </span>
                <span className="combat-action-title">
                  {t('combat.actions.skill')} · {t(combatFixture.skill.nameKey)}
                </span>
                <strong>
                  {t('combat.skill.manaCost', { cost: combatFixture.skill.manaCost })}
                </strong>
                <small>{t(combatFixture.skill.targetKey)}</small>
                <small>{t(combatFixture.skill.effectKey)}</small>
                <small>
                  {t('combat.skill.cooldownSummary', {
                    actions: combatFixture.skill.cooldownPlayerActions,
                  })}
                </small>
                <small id="combat-skill-reason">
                  {skillDisabledReason ? t(skillDisabledReason) : t('combat.actionReason.ready')}
                </small>
              </button>

              <button
                type="button"
                className="combat-action-card guard"
                data-testid="combat-action-guard"
                disabled={!isPlayerTurn}
                onClick={() => handlePlayerAction('guard')}
              >
                <span className="combat-action-symbol" aria-hidden="true">
                  G
                </span>
                <span className="combat-action-title">{t('combat.actions.guard')}</span>
                <strong>
                  {t('combat.actions.guardReduction', {
                    percent: combatFixture.guardReductionPercent,
                  })}
                </strong>
                <small>{t('combat.actions.guardDescription')}</small>
                {!isPlayerTurn ? <small>{t('combat.actionReason.playerTurn')}</small> : null}
              </button>
            </div>

            <p className="combat-cooldown-status" role="status" data-testid="combat-skill-cooldown">
              {state.skillCooldownRemaining > 0
                ? t('combat.skill.cooldownRemaining', { actions: state.skillCooldownRemaining })
                : t('combat.skill.cooldownReady')}
            </p>
            {isEnemyTurn ? (
              <section
                className="combat-enemy-turn-panel"
                aria-labelledby="combat-enemy-turn-title"
              >
                <div>
                  <p className="card-eyebrow">{t('combat.status.enemyTurn')}</p>
                  <h3 id="combat-enemy-turn-title">{t('combat.enemyTurn.title')}</h3>
                  <p>{t('combat.enemyTurn.description')}</p>
                  {state.guardActive ? (
                    <p className="combat-guard-ready" role="status">
                      {t('combat.enemyTurn.guardReady', {
                        percent: combatFixture.guardReductionPercent,
                      })}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="combat-resolve-action"
                  data-testid="combat-resolve-enemy"
                  onClick={handleEnemyAction}
                >
                  {t('combat.enemyTurn.resolveAction')} <span aria-hidden="true">→</span>
                </button>
              </section>
            ) : null}

            {state.phase === 'paused' ? (
              <div className="combat-paused-panel" role="alert">
                <strong>{t('combat.pause.title')}</strong>
                <p>{t(state.pauseReasonKey ?? 'combat.pause.hpBoundary')}</p>
                <button type="button" className="combat-secondary-action" onClick={resetDemo}>
                  {t('combat.actions.resetDemo')}
                </button>
              </div>
            ) : null}
          </section>

          <section className="combat-panel combat-log-panel" aria-labelledby="combat-log-title">
            <div className="combat-section-heading">
              <div>
                <p className="card-eyebrow">{t('combat.log.eyebrow')}</p>
                <h2 id="combat-log-title">{t('combat.log.title')}</h2>
              </div>
              <span className="combat-log-count">{state.logs.length}</span>
            </div>
            <ol
              className="combat-log-list"
              aria-label={t('combat.log.regionLabel')}
              aria-live="polite"
              aria-relevant="additions text"
            >
              {state.logs.map((entry) => (
                <li key={entry.id} data-log-key={entry.key}>
                  <span className="combat-log-index">{String(entry.id).padStart(2, '0')}</span>
                  <p>{renderCombatLogEntry(entry)}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="combat-side-column" aria-label={t('combat.player.regionLabel')}>
          <section
            className="combat-panel combat-player-panel"
            aria-labelledby="combat-player-title"
          >
            <div className="combat-section-heading">
              <div>
                <p className="card-eyebrow">{t('combat.player.eyebrow')}</p>
                <h2 id="combat-player-title">{t('combat.player.title')}</h2>
              </div>
              <span className="combat-fixture-mini">{t('combat.player.fixtureStatus')}</span>
            </div>
            <p className="combat-player-notice">{t('combat.player.resourceNotice')}</p>
            <ResourceBar
              id="combat-player-hp"
              labelKey="combat.player.hp"
              current={state.playerHp}
              maximum={combatFixture.player.maxHp}
            />
            <ResourceBar
              id="combat-player-mana"
              labelKey="combat.player.mana"
              current={state.playerMana}
              maximum={combatFixture.player.maxMana}
            />

            <div className="combat-stamina-snapshot">
              <span>{t('province.resource.stamina')}</span>
              <strong>
                {combatFixture.player.stamina} / {combatFixture.player.maxStamina}
              </strong>
              <small>{t('combat.player.staminaNotice')}</small>
            </div>

            <div className="combat-status-list">
              <div>
                <span>{t('combat.status.skillCooldown')}</span>
                <strong>{state.skillCooldownRemaining}</strong>
              </div>
              <div>
                <span>{t('combat.status.guardState')}</span>
                <strong>
                  {t(
                    state.guardActive ? 'combat.status.guardActive' : 'combat.status.guardInactive',
                  )}
                </strong>
              </div>
            </div>
          </section>

          <section className="combat-panel combat-rules-panel" aria-labelledby="combat-rules-title">
            <p className="card-eyebrow">{t('combat.rules.eyebrow')}</p>
            <h2 id="combat-rules-title">{t('combat.rules.title')}</h2>
            <ul>
              <li>{t('combat.rules.noPotions')}</li>
              <li>{t('combat.rules.noLoadoutChanges')}</li>
              <li>{t('combat.rules.noEscapeOrSurrender')}</li>
            </ul>
            <div className="combat-unavailable-actions">
              <button type="button" disabled aria-describedby="combat-future-actions-reason">
                {t('combat.actions.escapeUnavailable')}
              </button>
              <button type="button" disabled aria-describedby="combat-future-actions-reason">
                {t('combat.actions.surrenderUnavailable')}
              </button>
              <p id="combat-future-actions-reason">{t('combat.actions.futureActionsReason')}</p>
            </div>
          </section>
        </aside>
      </div>

      <footer className="combat-footer">
        <Link className="combat-back-link" to="/run/preflight">
          {t('combat.actions.backToPreflight')} <span aria-hidden="true">↗</span>
        </Link>
        <Link className="combat-back-link secondary" to="/province">
          {t('preflight.backToProvince')} <span aria-hidden="true">↗</span>
        </Link>
        {isActive ? (
          <p>{t('combat.footer.activeBoundary')}</p>
        ) : (
          <p>{t('combat.footer.inactiveBoundary')}</p>
        )}
      </footer>
    </section>
  );
}
