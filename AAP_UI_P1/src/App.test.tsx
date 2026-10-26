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

describe('P1-UI-001 shell boundary', () => {
  it('keeps the exact fixture-only boundary visible on the page', () => {
    renderAt();

    expect(screen.getByLabelText(t('boundary.regionLabel'))).toHaveTextContent(
      'PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER',
    );
  });

  it('uses a development preview label and names the bounded task', () => {
    renderAt();

    expect(screen.getByText(t('app.previewLabel'))).toBeVisible();
    expect(screen.getByRole('heading', { name: 'P1-UI-001' })).toBeVisible();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('states that persistent gameplay state is not connected or enabled', () => {
    renderAt();

    expect(screen.getByText(t('shell.systemStatusDetail'))).toBeVisible();
    expect(screen.getByText(t('shell.noPersistence'))).toBeVisible();
    expect(screen.getByText(t('shell.scopeNetwork'))).toBeVisible();
  });

  it('provides a clear placeholder instead of implying unknown routes work', () => {
    renderAt('/not-yet-implemented');

    expect(screen.getByRole('heading', { name: t('route.unknownTitle') })).toBeVisible();
    expect(screen.getByRole('link', { name: t('route.returnToShell') })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
