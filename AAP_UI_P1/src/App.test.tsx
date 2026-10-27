import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { prototypeFixture } from './fixtures/prototype';
import { provinceFixture } from './fixtures/province';
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

    const runButton = screen.getByRole('button', { name: t('province.run.detailsAction') });
    expect(runButton).toBeDisabled();
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
