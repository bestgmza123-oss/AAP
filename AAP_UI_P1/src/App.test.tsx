import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
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
