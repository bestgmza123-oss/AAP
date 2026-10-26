import { expect, test } from '@playwright/test';

test.describe('P1-UI-001 browser smoke', () => {
  test('root route renders the fixture-only shell and boundary notice', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('AAP — Private UI Prototype');
    await expect(page.getByRole('heading', { name: 'The shell is in place.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'P1-UI-001' })).toBeVisible();
    await expect(
      page.getByText('PRIVATE PROTOTYPE · FIXTURE DATA · NOT CONNECTED TO GAME SERVER', {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText('PERSISTENCE DISABLED', { exact: true })).toBeVisible();
  });

  test('unknown route renders a placeholder and can return to the shell', async ({ page }) => {
    await page.goto('/not-yet-implemented');

    await expect(page.getByRole('heading', { name: 'Route not implemented' })).toBeVisible();
    await expect(
      page.getByText('This route is a placeholder. No gameplay screen is available in P1-UI-001.'),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Return to shell' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'The shell is in place.' })).toBeVisible();
  });
});
