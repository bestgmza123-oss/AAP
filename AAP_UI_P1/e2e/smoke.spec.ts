import { expect, test } from '@playwright/test';

test.describe('P1-UI-002 browser smoke', () => {
  test('Start shows fixture identity, version and the prototype boundary', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('AAP — Private UI Prototype');
    await expect(
      page.getByRole('heading', { name: 'A private preview. A clear starting point.' }),
    ).toBeVisible();
    await expect(page.getByText('AAP-LOCAL-001', { exact: true })).toBeVisible();
    await expect(page.getByText('VERSION 0.1.0', { exact: true })).toHaveCount(2);
    await expect(
      page.getByText('PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER', {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /Mail/ })).toBeDisabled();
    await page.screenshot({ path: 'test-results/p1-ui-002-start-desktop.png', fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(
      page.getByRole('heading', { name: 'A private preview. A clear starting point.' }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /Mail/ })).toBeDisabled();
    await page.screenshot({ path: 'test-results/p1-ui-002-start-mobile.png', fullPage: true });
  });

  test('Updates is navigable and honestly reports no published patch history', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Updates', exact: true }).first().click();
    await expect(page).toHaveURL('/updates');
    await expect(page.getByRole('heading', { name: 'Updates', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No published updates' })).toBeVisible();
    await expect(page.getByText('PRIVATE PREVIEW', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Start', exact: true }).click();
    await expect(page).toHaveURL('/');
    await expect(
      page.getByRole('heading', { name: 'A private preview. A clear starting point.' }),
    ).toBeVisible();
  });

  test('unknown route stays a placeholder and returns to Start', async ({ page }) => {
    await page.goto('/not-yet-implemented');
    await expect(page.getByRole('heading', { name: 'Route not implemented' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Return to Start' })).toHaveAttribute('href', '/');
  });
});

test.describe('P1-UI-003 Province and resource preview', () => {
  test('Province hierarchy and preview-only resource states render on desktop and mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('link', { name: 'Continue to Province', exact: true }).click();
    await expect(page).toHaveURL('/province');
    await expect(page.getByRole('heading', { name: 'Province', exact: true })).toBeVisible();
    await expect(page.getByText('Acheria', { exact: true })).toBeVisible();
    await expect(page.getByText('Velra Province', { exact: true })).toBeVisible();
    await expect(page.getByText('Velra Outskirts', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Safe Zone status' })).toBeVisible();
    await expect(page.getByText('OUTSIDE SAFE ZONE', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Standard Run' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Run Preflight' })).toHaveAttribute(
      'href',
      '/run/preflight',
    );
    await expect(page.getByText('100 = Fed · 0 = Death')).toBeVisible();
    await expect(
      page.getByText('PREVIEW ONLY · NOT ACTIVE IN PHASE 1', { exact: true }),
    ).toHaveCount(2);
    await expect(
      page.getByText(
        'No elapsed-time decay, regeneration, Infection rolls, alerts, or death transitions run on this page.',
      ),
    ).toBeVisible();
    await expect(
      page.getByText('PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER'),
    ).toBeVisible();
    await page.screenshot({ path: 'test-results/p1-ui-003-province-desktop.png', fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole('heading', { name: 'Province', exact: true })).toBeVisible();
    await expect(page.getByText('100 = Fed · 0 = Death')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Run Preflight' })).toHaveAttribute(
      'href',
      '/run/preflight',
    );
    await page.screenshot({ path: 'test-results/p1-ui-003-province-mobile.png', fullPage: true });
  });
});

test.describe('P1-UI-004 Run preflight', () => {
  test('shows cost boundaries, risks, restrictions and local-only confirm/cancel on desktop and mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('link', { name: 'Continue to Province', exact: true }).click();
    await page.getByRole('link', { name: 'View Run Preflight', exact: true }).click();
    await expect(page).toHaveURL('/run/preflight');
    await expect(page.getByRole('heading', { name: 'Run Preflight', exact: true })).toBeVisible();
    await expect(page.getByText('4–7', { exact: true })).toBeVisible();
    await expect(page.getByText('30 minutes', { exact: true })).toBeVisible();
    await expect(page.getByText('Potions cannot be used during the Run.')).toBeVisible();
    await expect(
      page.getByText('Equipment and skill loadout cannot be changed after entering the Run.'),
    ).toBeVisible();
    await expect(
      page.getByText(
        'This is a private UI fixture. Confirmation records only this screen state; it does not debit Stamina, roll enemies, create a server Run, start a timer, or open Combat.',
      ),
    ).toBeVisible();
    await page.getByText('Preview additional UI states', { exact: true }).click();
    await page.getByRole('button', { name: 'Preview missing Run fixture' }).click();
    await expect(page.getByRole('alert')).toContainText('No Run fixture is available.');
    await expect(page.getByRole('button', { name: 'Begin Demo Run' })).toBeDisabled();
    await page.getByRole('button', { name: 'Preview preflight error' }).click();
    await expect(page.getByRole('alert')).toContainText(
      'The preflight preview could not be displayed.',
    );
    await page.getByRole('button', { name: 'Retry local preview' }).click();
    await expect(page.getByRole('button', { name: 'Begin Demo Run' })).toBeEnabled();
    await page.getByText('Escape consequences', { exact: true }).click();
    await expect(
      page.getByText(/Escape returns to the current Province, needs no home/),
    ).toBeVisible();
    await page.getByText('Surrender consequences', { exact: true }).click();
    await expect(page.getByText(/Surrender is available only during active Combat/)).toBeVisible();

    await page.getByRole('radio', { name: /Level 5.*20.*Stamina/ }).check();
    await expect(page.getByTestId('preflight-entry-cost')).toHaveText('20');
    await page.getByRole('radio', { name: /Level 6.*22.*Stamina/ }).check();
    await expect(page.getByTestId('preflight-entry-cost')).toHaveText('22');
    await page.screenshot({
      path: 'test-results/p1-ui-004-run-preflight-desktop.png',
      fullPage: true,
    });
    await page.getByRole('radio', { name: /Level 50.*38.*Stamina/ }).check();
    await expect(page.getByTestId('preflight-entry-cost')).toHaveText('38');

    await page.getByRole('button', { name: 'Preview insufficient Stamina' }).click();
    await expect(page.getByTestId('preflight-resource-stamina')).toContainText('18 / 240');
    await expect(page.getByRole('button', { name: 'Begin Demo Run' })).toBeDisabled();
    await expect(page.getByRole('alert')).toContainText('18 available, 38 required');
    await page.getByRole('button', { name: 'Restore current fixture Stamina' }).click();
    await expect(page.getByTestId('preflight-resource-stamina')).toContainText('186 / 240');
    await page.getByRole('button', { name: 'Begin Demo Run' }).click();
    await expect(page.getByRole('status')).toContainText(
      'No Run was created, no Stamina was deducted, no enemy roll was made and no timer started.',
    );
    await expect(page).toHaveURL('/run/preflight');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/run/preflight');
    await expect(page.getByRole('heading', { name: 'Run Preflight', exact: true })).toBeVisible();
    await expect(page.getByTestId('preflight-entry-cost')).toHaveText('20');
    await expect(page.getByRole('link', { name: 'Cancel and return to Province' })).toBeVisible();
    await page.screenshot({
      path: 'test-results/p1-ui-004-run-preflight-mobile.png',
      fullPage: true,
    });
    await page.getByRole('link', { name: 'Cancel and return to Province' }).click();
    await expect(page).toHaveURL('/province');
    await expect(page.getByRole('heading', { name: 'Province', exact: true })).toBeVisible();
  });
});
