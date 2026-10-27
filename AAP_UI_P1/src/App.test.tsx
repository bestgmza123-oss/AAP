import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import {
  combatFixture,
  createInitialCombatState,
  getCombatActionDisabledReason,
  performCombatAction,
  resolveEnemyAction,
} from './fixtures/combat';
import { prototypeFixture } from './fixtures/prototype';
import { provinceFixture } from './fixtures/province';
import { calculateEntryStaminaCost, runPreflightFixture } from './fixtures/run-preflight';
import { t } from './i18n';

function renderAt(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('P1-UI-002 Start and global navigation', () => {
  it('shows a fixture identity without implying a real account', () => {
    renderAt();
    expect(screen.getByRole('heading', { name: t('start.title') })).toBeVisible();
    expect(screen.getByText('AAP-LOCAL-001')).toBeVisible();
    expect(screen.getByText(t('identity.localState'))).toBeVisible();
    expect(screen.getByText(t('boundary.notice'))).toBeVisible();
  });

  it('shows a truthful version label and navigates to Updates', async () => {
    renderAt();
    const expectedVersion = `${t('app.versionPrefix')} ${prototypeFixture.version}`;
    expect(screen.getAllByText(expectedVersion)).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Updates' })).toHaveAttribute('href', '/updates');
    expect(screen.getByText(t('updates.emptyTitle'))).toBeVisible();
  });

  it('keeps Mail visibly disabled with a reason', () => {
    renderAt();
    expect(screen.getByRole('button', { name: /Mail/ })).toBeDisabled();
    expect(screen.getByText(t('nav.mailDisabledReason'))).toBeInTheDocument();
  });

  it('provides keyboard-focusable Start and Updates links', () => {
    renderAt('/updates');
    expect(screen.getByRole('link', { name: t('nav.start') })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { name: t('updates.title') })).toBeVisible();
    expect(screen.getByText(t('updates.emptyDescription'))).toBeVisible();
  });

  it('keeps unknown routes explicit and returns to Start', () => {
    renderAt('/not-yet-implemented');
    expect(screen.getByRole('heading', { name: t('route.unknownTitle') })).toBeVisible();
    expect(screen.getByRole('link', { name: t('route.returnToStart') })).toHaveAttribute(
      'href',
      '/',
    );
  });
});

describe('P1-UI-003 Province and resource preview', () => {
  it('navigates from Start into the Province hub', () => {
    renderAt();
    fireEvent.click(screen.getByRole('link', { name: t('start.provinceAction') }));
    expect(screen.getByRole('heading', { name: t('province.title') })).toBeVisible();
    expect(screen.getByRole('heading', { name: t('province.location.title') })).toBeVisible();
    expect(screen.getByText(t(provinceFixture.world.currentProvince.nameKey))).toBeVisible();
    expect(screen.getByRole('heading', { name: t('province.safeZone.title') })).toBeVisible();
    expect(screen.getByRole('heading', { name: t('province.run.title') })).toBeVisible();
    expect(screen.getByText(t('boundary.notice'))).toBeVisible();
  });

  it('shows all resources as static values and labels Hunger and Infection inactive', () => {
    renderAt('/province');
    const hp = screen.getByRole('progressbar', { name: t('province.resource.hp') });
    const stamina = screen.getByRole('progressbar', { name: t('province.resource.stamina') });
    const mana = screen.getByRole('progressbar', { name: t('province.resource.mana') });
    const hunger = screen.getByRole('progressbar', { name: t('province.resource.hunger') });
    const infection = screen.getByRole('progressbar', { name: t('province.resource.infection') });
    expect(hp).toHaveAttribute('value', String(provinceFixture.resources.hp.current));
    expect(stamina).toHaveAttribute('value', String(provinceFixture.resources.stamina.current));
    expect(mana).toHaveAttribute('value', String(provinceFixture.resources.mana.current));
    expect(hunger).toHaveAttribute('value', '84');
    expect(hunger).toHaveAttribute('max', '100');
    expect(infection).toHaveAttribute('value', '12');
    expect(infection).toHaveAttribute('max', '100');
    expect(screen.getByText(t('province.resource.hungerMeaning'))).toBeVisible();
    expect(screen.getAllByText(t('province.resource.previewOnly'))).toHaveLength(2);
    expect(screen.getByText(t('province.resource.inactiveDescription'))).toBeVisible();
  });

  it('distinguishes current location from safe-zone/destination fixtures and disables unfinished actions', () => {
    renderAt('/province');
    expect(screen.getByText(t(provinceFixture.world.safeZone.currentStatusKey))).toBeVisible();
    expect(screen.getByText(t(provinceFixture.world.safeZone.nameKey))).toBeVisible();
    expect(screen.getByText(t('province.location.currentPositionNote'))).toBeVisible();

    const runLink = screen.getByRole('link', { name: t('province.run.detailsAction') });
    expect(runLink).toHaveAttribute('href', '/run/preflight');
    expect(screen.getByText(t('province.run.preflightNotAvailable'))).toBeVisible();
    const unavailable = screen.getAllByRole('button', {
      name: t('province.destinations.unavailable'),
    });
    expect(unavailable).toHaveLength(provinceFixture.destinations.length);
    for (const button of unavailable) expect(button).toBeDisabled();
    expect(screen.getAllByText(t('province.destinations.disabledReason'))).toHaveLength(
      provinceFixture.destinations.length,
    );
  });

  it('shows Carry Weight preview separately without enabling inventory mutations', () => {
    renderAt('/province');
    const carryPanel = screen.getByRole('region', { name: t('province.carry.title') });
    expect(within(carryPanel).getByText('8.5')).toBeVisible();
    expect(within(carryPanel).getByText('/ 20.0 kg')).toBeVisible();
    expect(within(carryPanel).getByText('11.5 kg')).toBeVisible();
    expect(within(carryPanel).getByText(t('province.carry.description'))).toBeVisible();
  });
});

describe('P1-UI-004 Run preflight disclosure and local confirmation', () => {
  it('calculates canonical entry costs for Levels 1, 5, 6 and 50 and rejects unsupported levels', () => {
    const expected = [
      [1, 20],
      [5, 20],
      [6, 22],
      [50, 38],
    ] as const;

    for (const [level, cost] of expected) {
      expect(calculateEntryStaminaCost(level)).toBe(cost);
    }
    expect(calculateEntryStaminaCost(0)).toBeNull();
    expect(calculateEntryStaminaCost(51)).toBeNull();
    expect(calculateEntryStaminaCost(1.5)).toBeNull();
    expect(runPreflightFixture.normalEnemyCount).toEqual({ minimum: 4, maximum: 7 });
    expect(runPreflightFixture.hardTimeoutMinutes).toBe(30);
  });

  it('renders required pre-entry disclosures and fixture-only resource values on direct route access', () => {
    renderAt('/run/preflight');

    expect(screen.getByRole('heading', { name: t('preflight.title') })).toBeVisible();
    expect(screen.getByText(t('preflight.boundaryNotice'))).toBeVisible();
    expect(screen.getByText(t('preflight.risk.enemyRange'))).toBeVisible();
    expect(screen.getByText(t('preflight.risk.returnEncounter'))).toBeVisible();
    expect(screen.getByText(t('preflight.risk.expiry'))).toBeVisible();
    expect(screen.getByText(t('preflight.restrictions.noPotions'))).toBeVisible();
    expect(screen.getByText(t('preflight.restrictions.noLoadoutChanges'))).toBeVisible();
    expect(screen.getByText(t('preflight.timeout.description'))).toBeVisible();
    expect(screen.getByRole('radio', { name: /Level 1.*20.*Stamina/ })).toBeChecked();
    expect(screen.getByTestId('preflight-entry-cost')).toHaveTextContent('20');
    expect(screen.getByTestId('preflight-resource-hp')).toHaveTextContent('86 / 120');
    expect(screen.getByTestId('preflight-resource-stamina')).toHaveTextContent('186 / 240');
    expect(screen.getByTestId('preflight-resource-mana')).toHaveTextContent('42 / 60');
    expect(screen.getByTestId('preflight-resource-hunger')).toHaveTextContent('84 / 100');
    expect(screen.getByTestId('preflight-resource-infection')).toHaveTextContent('12 / 100');
    expect(screen.getByRole('button', { name: t('preflight.confirm.beginAction') })).toBeEnabled();
    expect(screen.getByRole('link', { name: t('preflight.confirm.cancelAction') })).toHaveAttribute(
      'href',
      '/province',
    );
    fireEvent.click(screen.getByText(t('preflight.risk.escapeSummary')));
    expect(screen.getByText(t('preflight.risk.escapeDetails'))).toBeVisible();
    fireEvent.click(screen.getByText(t('preflight.risk.surrenderSummary')));
    expect(screen.getByText(t('preflight.risk.surrenderDetails'))).toBeVisible();
  });

  it('updates the selected level cost and records confirmation without spending resources or starting a Run', () => {
    renderAt('/run/preflight');
    fireEvent.click(screen.getByRole('radio', { name: /Level 6.*22.*Stamina/ }));
    expect(screen.getByTestId('preflight-entry-cost')).toHaveTextContent('22');

    fireEvent.click(screen.getByRole('radio', { name: /Level 50.*38.*Stamina/ }));
    expect(screen.getByTestId('preflight-entry-cost')).toHaveTextContent('38');
    fireEvent.click(screen.getByRole('button', { name: t('preflight.confirm.beginAction') }));

    expect(screen.getByRole('status')).toHaveTextContent(
      t('preflight.confirm.recordedDescription'),
    );
    expect(screen.getByRole('heading', { name: t('preflight.title') })).toBeVisible();
    expect(screen.getByTestId('preflight-resource-stamina')).toHaveTextContent('186 / 240');
    expect(
      screen.getByRole('button', { name: t('preflight.confirm.recordedAction') }),
    ).toBeDisabled();
    expect(screen.getByRole('link', { name: /Open Combat Demo/ })).toHaveAttribute(
      'href',
      '/run/combat',
    );
  });

  it('disables confirmation when the displayed fixture Stamina is insufficient and Cancel returns to Province', () => {
    renderAt('/run/preflight');
    fireEvent.click(screen.getByRole('button', { name: t('preflight.lowStamina.previewAction') }));

    expect(screen.getByTestId('preflight-resource-stamina')).toHaveTextContent('18 / 240');
    expect(screen.getByRole('alert')).toHaveTextContent('18 available, 20 required');
    expect(screen.getByRole('button', { name: t('preflight.confirm.beginAction') })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: t('preflight.lowStamina.restoreAction') }));
    expect(screen.getByRole('button', { name: t('preflight.confirm.beginAction') })).toBeEnabled();
    fireEvent.click(screen.getByRole('link', { name: t('preflight.confirm.cancelAction') }));
    expect(screen.getByRole('heading', { name: t('province.title') })).toBeVisible();
  });

  it('previews missing-fixture and retryable-error states without network or gameplay mutation', () => {
    renderAt('/run/preflight');
    fireEvent.click(screen.getByText(t('preflight.stateDemo.summary')));

    fireEvent.click(screen.getByRole('button', { name: t('preflight.stateDemo.noFixtureAction') }));
    expect(screen.getByRole('alert')).toHaveTextContent(t('preflight.confirm.fixtureMissing'));
    expect(screen.getByRole('button', { name: t('preflight.confirm.beginAction') })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: t('preflight.stateDemo.errorAction') }));
    expect(screen.getByRole('alert')).toHaveTextContent(t('preflight.confirm.errorDescription'));
    expect(screen.getByRole('button', { name: t('preflight.confirm.beginAction') })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: t('preflight.confirm.retryAction') }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: t('preflight.confirm.beginAction') })).toBeEnabled();
    expect(screen.getByTestId('preflight-resource-stamina')).toHaveTextContent('186 / 240');
  });
});

describe('P1-UI-005 Combat interaction demo', () => {
  it('shows a single Normal fixture, separate classification fields, conditional Mana and only telegraphed intent', () => {
    renderAt('/run/combat');

    expect(screen.getByRole('heading', { name: t('combat.title') })).toBeVisible();
    expect(screen.getByText(t('combat.boundaryNotice'))).toBeVisible();
    expect(screen.getByRole('heading', { name: t('combat.enemy.fixtureAName') })).toBeVisible();
    expect(screen.getByText(t('combat.species.zombie'))).toBeVisible();
    expect(screen.getByText(t('combat.tier.normal'))).toBeVisible();
    expect(screen.getByText('F', { exact: true })).toBeVisible();
    expect(screen.getByTestId('combat-turn-number')).toHaveTextContent('1');
    expect(screen.getByText(t('combat.eventTag.standardRun'))).toBeVisible();
    expect(screen.getByTestId('combat-defeated-count')).toHaveTextContent('0 / 4');
    expect(screen.getByTestId('combat-intent-name')).toHaveTextContent(t('combat.intent.claw'));
    expect(
      screen.queryByRole('progressbar', { name: t('combat.enemy.mana') }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: t('combat.player.hp') })).toHaveValue(86);
    expect(screen.getByRole('progressbar', { name: t('combat.player.mana') })).toHaveValue(42);
    expect(screen.getByTestId('combat-action-attack')).toBeEnabled();
    expect(screen.getByTestId('combat-action-skill')).toBeEnabled();
    expect(screen.getByTestId('combat-action-skill')).toHaveTextContent(
      t(combatFixture.skill.nameKey),
    );
    expect(screen.getByTestId('combat-action-skill')).toHaveTextContent(
      t(combatFixture.skill.targetKey),
    );
    expect(screen.getByTestId('combat-action-skill')).toHaveTextContent(
      t(combatFixture.skill.effectKey),
    );
    expect(screen.getByTestId('combat-action-skill')).toHaveTextContent(
      'Cooldown: 2 valid player actions after casting',
    );
    expect(screen.getByTestId('combat-action-guard')).toBeEnabled();
    expect(
      screen.getByRole('button', { name: t('combat.actions.escapeUnavailable') }),
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: t('combat.actions.surrenderUnavailable') }),
    ).toBeDisabled();
  });

  it('runs Normal Attack and a separate enemy step without spending Stamina', () => {
    renderAt('/run/combat');
    fireEvent.click(screen.getByTestId('combat-action-attack'));

    expect(screen.getByTestId('combat-phase')).toHaveTextContent(t('combat.status.enemyTurn'));
    expect(screen.getByTestId('combat-action-attack')).toBeDisabled();
    expect(screen.getByText('186 / 240')).toBeVisible();
    expect(screen.getByText(/Normal Attack hit Fixture Enemy A.*Stamina cost: 0/)).toBeVisible();

    fireEvent.click(screen.getByTestId('combat-resolve-enemy'));
    expect(screen.getByTestId('combat-phase')).toHaveTextContent(t('combat.status.playerTurn'));
    expect(screen.getByRole('progressbar', { name: t('combat.player.hp') })).toHaveValue(77);
    expect(
      screen.getByText(/Fixture Enemy A resolved its telegraphed fixture action for 9 damage/),
    ).toBeVisible();
    expect(screen.getByTestId('combat-turn-number')).toHaveTextContent('2');
  });

  it('Guard reduces the next eligible enemy action after mitigation', () => {
    renderAt('/run/combat');
    fireEvent.click(screen.getByTestId('combat-action-guard'));

    expect(screen.getByTestId('combat-phase')).toHaveTextContent(t('combat.status.enemyTurn'));
    expect(
      screen.getByText(/Guard is ready and will reduce the next eligible enemy action by 50%/),
    ).toBeVisible();
    fireEvent.click(screen.getByTestId('combat-resolve-enemy'));

    expect(screen.getByRole('progressbar', { name: t('combat.player.hp') })).toHaveValue(82);
    expect(screen.getByText(/Guard reduced Fixture Enemy A to 4 fixture damage/)).toBeVisible();
    expect(screen.getByText(t('combat.status.guardInactive'))).toBeVisible();
  });

  it('Skill spends only local Mana, applies cooldown, and advances to the next enemy without leaking untelegraphed intent', () => {
    renderAt('/run/combat');
    fireEvent.click(screen.getByTestId('combat-action-skill'));

    expect(screen.getByTestId('combat-defeated-count')).toHaveTextContent('1 / 4');
    expect(screen.getByRole('heading', { name: t('combat.enemy.fixtureBName') })).toBeVisible();
    expect(screen.getByRole('progressbar', { name: t('combat.player.mana') })).toHaveValue(32);
    expect(screen.getByTestId('combat-skill-cooldown')).toHaveTextContent('2');
    expect(screen.getByTestId('combat-phase')).toHaveTextContent(t('combat.status.playerTurn'));
    expect(screen.queryByTestId('combat-intent-name')).not.toBeInTheDocument();
    expect(screen.getByTestId('combat-intent')).toHaveTextContent(t('combat.intent.notShownTitle'));
    expect(screen.getByRole('progressbar', { name: t('combat.enemy.mana') })).toHaveValue(8);
    expect(screen.getByRole('progressbar', { name: t('combat.enemy.mana') })).toHaveAttribute(
      'max',
      '12',
    );
    expect(screen.getByTestId('combat-action-skill')).toBeDisabled();
    expect(screen.getByText(t('combat.actionReason.cooldown'))).toBeVisible();

    fireEvent.click(screen.getByTestId('combat-action-attack'));
    expect(screen.getByTestId('combat-skill-cooldown')).toHaveTextContent('1');
    expect(screen.getByTestId('combat-phase')).toHaveTextContent(t('combat.status.enemyTurn'));
    expect(screen.getByRole('progressbar', { name: t('combat.player.mana') })).toHaveValue(32);
  });

  it('rejects invalid skill actions without advancing the turn or consuming Mana/cooldown', () => {
    const initial = createInitialCombatState();
    const noMana = { ...initial, playerMana: 0 };
    const rejectedMana = performCombatAction(noMana, 'skill');
    expect(rejectedMana.rejection).toBe('insufficient-mana');
    expect(rejectedMana.state).toBe(noMana);

    const cooldown = { ...initial, skillCooldownRemaining: 1 };
    const rejectedCooldown = performCombatAction(cooldown, 'skill');
    expect(rejectedCooldown.rejection).toBe('skill-cooldown');
    expect(rejectedCooldown.state).toBe(cooldown);

    const enemyTurn = performCombatAction(initial, 'attack').state;
    const rejectedEnemyPhase = performCombatAction(enemyTurn, 'attack');
    expect(rejectedEnemyPhase.rejection).toBe('not-player-turn');
    expect(rejectedEnemyPhase.state).toBe(enemyTurn);

    const noPlayerMana = { ...initial, playerMana: 0 };
    expect(getCombatActionDisabledReason(noPlayerMana, 'skill')).toBe('combat.actionReason.mana');
    expect(combatFixture.player.stamina).toBe(186);
  });

  it('previews insufficient Mana as a disabled Skill state and restores the local fixture', () => {
    renderAt('/run/combat');
    fireEvent.click(screen.getByText(t('combat.stateDemo.summary')));
    fireEvent.click(screen.getByRole('button', { name: t('combat.stateDemo.lowManaAction') }));

    expect(screen.getByRole('progressbar', { name: t('combat.player.mana') })).toHaveValue(9);
    expect(screen.getByTestId('combat-phase')).toHaveTextContent(t('combat.status.playerTurn'));
    expect(screen.getByTestId('combat-action-skill')).toBeDisabled();
    expect(screen.getByText(t('combat.actionReason.mana'))).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: t('combat.stateDemo.restoreAction') }));
    expect(screen.getByRole('progressbar', { name: t('combat.player.mana') })).toHaveValue(42);
    expect(screen.getByTestId('combat-action-skill')).toBeEnabled();
  });

  it('can play a complete predetermined encounter sequence with no RNG or persistence', () => {
    let state = createInitialCombatState();
    let actionCount = 0;

    while (state.phase !== 'complete' && state.phase !== 'paused' && actionCount < 32) {
      actionCount += 1;
      if (state.phase === 'player-turn') {
        const action = getCombatActionDisabledReason(state, 'skill') ? 'attack' : 'skill';
        state = performCombatAction(state, action).state;
      } else if (state.phase === 'enemy-turn') {
        state = resolveEnemyAction(state).state;
      }
    }

    expect(state.phase).toBe('complete');
    expect(state.defeatedCount).toBe(4);
    expect(state.playerHp).toBeGreaterThan(0);
    expect(state.logs.map((entry) => entry.id)).toEqual(
      [...state.logs.map((entry) => entry.id)].sort((a, b) => a - b),
    );
    expect(new Set(state.logs.map((entry) => entry.id)).size).toBe(state.logs.length);
  });
});
