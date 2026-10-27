import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
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
import {
  calculateEscapeFixtureCost,
  canConfirmEscape,
  type EscapePaymentMethod,
  type EscapeScenarioId,
  escapeSurrenderFixture,
  getEscapeScenario,
} from '../fixtures/escape-surrender';
import { runPreflightFixture } from '../fixtures/run-preflight';
import { type TranslationKey, t } from '../i18n';

type ExitDialogKind = 'escape' | 'surrender';

type ExitOutcome =
  | {
      kind: 'escaped';
      fixtureId: string;
      paymentMethod: EscapePaymentMethod;
      goldCost: number;
      retainedWeightKg: number;
    }
  | { kind: 'surrendered' };

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
  const [exitDialog, setExitDialog] = useState<ExitDialogKind | null>(null);
  const [exitOutcome, setExitOutcome] = useState<ExitOutcome | null>(null);
  const [escapeScenarioId, setEscapeScenarioId] = useState<EscapeScenarioId>('pre-clear-gold');
  const [escapePaymentMethod, setEscapePaymentMethod] = useState<EscapePaymentMethod>('gold');
  const exitDialogRef = useRef<HTMLDivElement>(null);
  const exitTriggerRef = useRef<HTMLButtonElement | null>(null);
  const exitOutcomeHeadingRef = useRef<HTMLHeadingElement>(null);
  const activeEnemy = combatFixture.enemies[state.enemyIndex];
  const escapeScenario = getEscapeScenario(escapeScenarioId);
  const escapeCalculation = calculateEscapeFixtureCost(escapeScenario);
  const escapeConfirmEnabled = canConfirmEscape(
    escapeScenario,
    escapePaymentMethod,
    escapeCalculation.goldCost,
  );
  const isPlayerTurn = state.phase === 'player-turn' && exitOutcome === null;
  const isEnemyTurn = state.phase === 'enemy-turn' && exitOutcome === null;
  const isActive =
    (state.phase === 'player-turn' || state.phase === 'enemy-turn') && exitOutcome === null;
  const skillDisabledReason = getCombatActionDisabledReason(state, 'skill');
  const phaseLabelKey: TranslationKey = exitOutcome
    ? exitOutcome.kind === 'escaped'
      ? 'combat.status.escaped'
      : 'combat.status.failed'
    : state.phase === 'player-turn'
      ? 'combat.status.playerTurn'
      : state.phase === 'enemy-turn'
        ? 'combat.status.enemyTurn'
        : state.phase === 'complete'
          ? 'combat.status.complete'
          : 'combat.status.paused';

  useEffect(() => {
    if (exitDialog) {
      exitDialogRef.current?.querySelector<HTMLButtonElement>('[data-dialog-cancel]')?.focus();
      return;
    }
    if (exitOutcome) {
      exitOutcomeHeadingRef.current?.focus();
      return;
    }
    exitTriggerRef.current?.focus();
  }, [exitDialog, exitOutcome]);

  function handleExitDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setExitDialog(null);
      return;
    }
    if (event.key !== 'Tab') return;

    const controls = Array.from(
      exitDialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]',
      ) ?? [],
    );
    if (controls.length === 0) {
      event.preventDefault();
      return;
    }
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handlePlayerAction(action: CombatAction) {
    setState((current) => performCombatAction(current, action).state);
  }

  function handleEnemyAction() {
    setState((current) => resolveEnemyAction(current).state);
  }

  function resetDemo() {
    setState(createInitialCombatState());
    setExitDialog(null);
    setExitOutcome(null);
    setEscapeScenarioId('pre-clear-gold');
    setEscapePaymentMethod('gold');
  }

  function confirmEscape() {
    if (!isActive || !escapeConfirmEnabled) return;
    setExitOutcome({
      kind: 'escaped',
      fixtureId: escapeScenario.fixture_id,
      paymentMethod: escapePaymentMethod,
      goldCost: escapeCalculation.goldCost,
      retainedWeightKg: escapeCalculation.retainedWeightKg,
    });
    setExitDialog(null);
  }

  function confirmSurrender() {
    if (!isActive) return;
    setExitOutcome({ kind: 'surrendered' });
    setExitDialog(null);
  }

  function previewInsufficientMana() {
    setExitDialog(null);
    setExitOutcome(null);
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

      {exitOutcome ? (
        <section
          className={`combat-exit-outcome ${exitOutcome.kind}`}
          role="status"
          aria-labelledby="combat-exit-outcome-title"
          data-testid="combat-exit-outcome"
        >
          <p className="card-eyebrow">{t('combat.exitOutcome.eyebrow')}</p>
          <h2 id="combat-exit-outcome-title" ref={exitOutcomeHeadingRef} tabIndex={-1}>
            {t(
              exitOutcome.kind === 'escaped'
                ? 'combat.exitOutcome.escapeTitle'
                : 'combat.exitOutcome.surrenderTitle',
            )}
          </h2>
          {exitOutcome.kind === 'escaped' ? (
            <>
              <p>
                {t('combat.exitOutcome.escapePayment', {
                  payment:
                    exitOutcome.paymentMethod === 'gold'
                      ? t('combat.exitFixture.paymentGold', { cost: exitOutcome.goldCost })
                      : t('combat.exitFixture.paymentWarpStone'),
                })}
              </p>
              <p>
                {t(
                  exitOutcome.fixtureId === 'return-encounter-gold'
                    ? 'combat.exitOutcome.escapeReturnDescription'
                    : 'combat.exitOutcome.escapePreClearDescription',
                  { weight: exitOutcome.retainedWeightKg.toFixed(1) },
                )}
              </p>
              <p>{t('combat.exitOutcome.escapeDestination')}</p>
              <p className="combat-exit-outcome-boundary">{t('combat.exitOutcome.noMutation')}</p>
              <Link className="combat-exit-outcome-link" to="/province">
                {t('combat.exitOutcome.returnToProvince')}
              </Link>
            </>
          ) : (
            <>
              <p>{t('combat.exitOutcome.surrenderDescription')}</p>
              <ul>
                <li>{t('combat.exitOutcome.surrenderNoRewards')}</li>
                <li>{t('combat.exitOutcome.surrenderNoRefund')}</li>
                <li>{t('combat.exitOutcome.surrenderNoDeath')}</li>
                <li>{t('combat.exitOutcome.surrenderNoHpRefill')}</li>
              </ul>
              <p className="combat-exit-outcome-boundary">{t('combat.exitOutcome.noMutation')}</p>
            </>
          )}
          <button type="button" className="combat-secondary-action" onClick={resetDemo}>
            {t('combat.actions.resetDemo')}
          </button>
        </section>
      ) : null}

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
        <div className="combat-exit-fixture-picker">
          <label htmlFor="combat-exit-fixture-select">
            {t('combat.exitFixture.selectorLabel')}
          </label>
          <select
            id="combat-exit-fixture-select"
            data-testid="combat-exit-fixture-select"
            value={escapeScenarioId}
            onChange={(event) => {
              setEscapeScenarioId(event.currentTarget.value as EscapeScenarioId);
              setEscapePaymentMethod('gold');
            }}
          >
            {escapeSurrenderFixture.scenarios.map((scenario) => (
              <option key={scenario.fixture_id} value={scenario.fixture_id}>
                {t(scenario.labelKey)}
              </option>
            ))}
          </select>
          <p data-testid="combat-escape-fixture-summary">
            {t('combat.exitFixture.scenarioSummary', {
              carried: (escapeScenario.fixture_carried_weight_grams / 1000).toFixed(1),
              retainedWeight: escapeCalculation.retainedWeightKg.toFixed(1),
              multiplier: escapeScenario.fixture_danger_multiplier,
              cost: escapeCalculation.goldCost,
              gold: escapeScenario.fixture_gold_balance,
              stones: escapeScenario.fixture_warp_stone_count,
            })}
          </p>
          <p>{t('combat.exitFixture.nonFinalNotice')}</p>
        </div>
      </details>

      <section className="combat-status-strip" aria-label={t('combat.status.regionLabel')}>
        <article className="combat-status-cell">
          <span>{t('combat.status.turnOrder')}</span>
          <strong>{t('combat.status.fixedTurnOrder')}</strong>
        </article>
        <article className="combat-status-cell">
          <span>{t('combat.status.currentTurn')}</span>
          <strong data-testid="combat-phase">{t(phaseLabelKey)}</strong>
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

            {!exitOutcome && state.phase !== 'complete' && state.phase !== 'paused' ? (
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
              <span className="combat-turn-badge">{t(phaseLabelKey)}</span>
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
              <li>{t('combat.rules.exitActionRestriction')}</li>
            </ul>
            <div className="combat-unavailable-actions">
              <button
                type="button"
                data-testid="combat-action-escape"
                disabled={!isActive}
                onClick={(event) => {
                  exitTriggerRef.current = event.currentTarget;
                  setExitDialog('escape');
                }}
              >
                {t('combat.actions.escape')}
              </button>
              <button
                type="button"
                data-testid="combat-action-surrender"
                disabled={!isActive}
                onClick={(event) => {
                  exitTriggerRef.current = event.currentTarget;
                  setExitDialog('surrender');
                }}
              >
                {t('combat.actions.surrender')}
              </button>
              <p id="combat-future-actions-reason">
                {isActive
                  ? t('combat.actions.exitActiveReason')
                  : t('combat.actions.exitInactiveReason')}
              </p>
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

      {exitDialog === 'escape' ? (
        <div className="combat-exit-overlay">
          <div
            ref={exitDialogRef}
            className="combat-exit-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="combat-exit-dialog-title"
            aria-describedby="combat-exit-dialog-description"
            tabIndex={-1}
            onKeyDown={handleExitDialogKeyDown}
            data-testid="combat-exit-dialog"
          >
            <p className="card-eyebrow">{t('combat.exitDialog.escapeEyebrow')}</p>
            <h2 id="combat-exit-dialog-title">{t('combat.exitDialog.escapeTitle')}</h2>
            <p id="combat-exit-dialog-description">{t('combat.exitDialog.escapeDescription')}</p>
            <p className="combat-exit-context">
              {t(
                escapeScenario.fixture_context === 'pre-clear'
                  ? 'combat.exitDialog.escapePreClear'
                  : 'combat.exitDialog.escapeReturnEncounter',
                {
                  pendingWeight: (
                    escapeScenario.fixture_pending_run_loot_weight_grams / 1000
                  ).toFixed(1),
                  chosenWeight: (
                    escapeScenario.fixture_chosen_main_loot_weight_grams / 1000
                  ).toFixed(1),
                  encounterWeight: (
                    escapeScenario.fixture_return_encounter_loot_weight_grams / 1000
                  ).toFixed(1),
                },
              )}
            </p>
            <dl className="combat-exit-cost-grid">
              <div>
                <dt>{t('combat.exitFixture.formulaLabel')}</dt>
                <dd>{escapeSurrenderFixture.fixture_formula}</dd>
              </div>
              <div>
                <dt>{t('combat.exitFixture.retainedWeightLabel')}</dt>
                <dd>
                  {t('combat.exitFixture.retainedWeightValue', {
                    weight: escapeCalculation.retainedWeightKg.toFixed(1),
                  })}
                </dd>
              </div>
              <div>
                <dt>{t('combat.exitFixture.multiplierLabel')}</dt>
                <dd>
                  {t('combat.exitFixture.multiplierValue', {
                    multiplier: escapeScenario.fixture_danger_multiplier,
                  })}
                </dd>
              </div>
              <div>
                <dt>{t('combat.exitFixture.goldCostLabel')}</dt>
                <dd data-testid="combat-escape-gold-cost">
                  {t('combat.exitFixture.goldCostValue', { cost: escapeCalculation.goldCost })}
                </dd>
              </div>
            </dl>
            <fieldset className="combat-exit-payment-options">
              <legend>{t('combat.exitFixture.paymentLegend')}</legend>
              {escapeScenario.fixture_warp_stone_count > 0 ? (
                <label>
                  <input
                    type="radio"
                    name="combat-escape-payment"
                    data-testid="combat-escape-payment-warp-stone"
                    value="warp-stone"
                    checked={escapePaymentMethod === 'warp-stone'}
                    onChange={() => setEscapePaymentMethod('warp-stone')}
                  />
                  <span>
                    {t('combat.exitFixture.warpStoneOption', {
                      count: escapeScenario.fixture_warp_stone_count,
                    })}
                  </span>
                </label>
              ) : null}
              <label>
                <input
                  type="radio"
                  name="combat-escape-payment"
                  data-testid="combat-escape-payment-gold"
                  value="gold"
                  checked={escapePaymentMethod === 'gold'}
                  onChange={() => setEscapePaymentMethod('gold')}
                />
                <span>
                  {t('combat.exitFixture.goldOption', {
                    cost: escapeCalculation.goldCost,
                    gold: escapeScenario.fixture_gold_balance,
                  })}
                </span>
              </label>
            </fieldset>
            {escapePaymentMethod === 'gold' && !escapeConfirmEnabled ? (
              <p
                className="combat-exit-warning"
                role="alert"
                data-testid="combat-escape-insufficient-gold"
              >
                {t('combat.exitFixture.insufficientGold', {
                  cost: escapeCalculation.goldCost,
                  gold: escapeScenario.fixture_gold_balance,
                })}
              </p>
            ) : null}
            <p className="combat-exit-dialog-note">{t('combat.exitDialog.escapeDestination')}</p>
            <p className="combat-exit-dialog-note">{t('combat.exitFixture.nonFinalNotice')}</p>
            <div className="combat-exit-dialog-actions">
              <button
                type="button"
                className="combat-secondary-action"
                data-dialog-cancel
                data-testid="combat-exit-cancel"
                onClick={() => setExitDialog(null)}
              >
                {t('combat.exitDialog.cancelEscape')}
              </button>
              <button
                type="button"
                className="combat-exit-confirm"
                data-testid="combat-exit-confirm-escape"
                disabled={!isActive || !escapeConfirmEnabled}
                onClick={confirmEscape}
              >
                {t('combat.exitDialog.confirmEscape')}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {exitDialog === 'surrender' ? (
        <div className="combat-exit-overlay">
          <div
            ref={exitDialogRef}
            className="combat-exit-dialog surrender"
            role="dialog"
            aria-modal="true"
            aria-labelledby="combat-surrender-dialog-title"
            aria-describedby="combat-surrender-dialog-description"
            tabIndex={-1}
            onKeyDown={handleExitDialogKeyDown}
            data-testid="combat-surrender-dialog"
          >
            <p className="card-eyebrow">{t('combat.exitDialog.surrenderEyebrow')}</p>
            <h2 id="combat-surrender-dialog-title">{t('combat.exitDialog.surrenderTitle')}</h2>
            <p id="combat-surrender-dialog-description">
              {t('combat.exitDialog.surrenderDescription')}
            </p>
            <ul className="combat-exit-consequence-list">
              <li>{t('combat.exitOutcome.surrenderNoRewards')}</li>
              <li>{t('combat.exitOutcome.surrenderNoRefund')}</li>
              <li>{t('combat.exitOutcome.surrenderNoDeath')}</li>
              <li>{t('combat.exitOutcome.surrenderNoHpRefill')}</li>
            </ul>
            <p className="combat-exit-dialog-note">{t('combat.exitDialog.surrenderContrast')}</p>
            <p className="combat-exit-dialog-note">{t('combat.exitFixture.nonFinalNotice')}</p>
            <div className="combat-exit-dialog-actions">
              <button
                type="button"
                className="combat-secondary-action"
                data-dialog-cancel
                data-testid="combat-surrender-cancel"
                onClick={() => setExitDialog(null)}
              >
                {t('combat.exitDialog.cancelSurrender')}
              </button>
              <button
                type="button"
                className="combat-exit-confirm surrender"
                data-testid="combat-exit-confirm-surrender"
                disabled={!isActive}
                onClick={confirmSurrender}
              >
                {t('combat.exitDialog.confirmSurrender')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
