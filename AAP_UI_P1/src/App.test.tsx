import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from './App';
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
    expect(screen.getAllByText('VERSION 0.1.0')).toHaveLength(2);
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
    expect(screen.getByRole('link', { name: t('route.returnToShell') })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
