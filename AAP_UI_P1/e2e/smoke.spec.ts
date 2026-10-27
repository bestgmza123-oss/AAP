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
