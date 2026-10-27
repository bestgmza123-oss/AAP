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

test.describe('P1-UI-005 Combat interaction demo', () => {
  test('Combat demo exposes fixture-only status and guarded enemy turns on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/run/combat');
    await expect(page.getByRole('heading', { name: 'Combat Demo', exact: true })).toBeVisible();
    await expect(page.getByText(/This page changes only in-memory UI fixtures/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fixture Enemy A' })).toBeVisible();
    await expect(page.getByText('SPECIES', { exact: true })).toBeVisible();
    await expect(page.getByText('TIER', { exact: true })).toBeVisible();
    await expect(page.getByText('THREAT RANK', { exact: true })).toBeVisible();
    await expect(page.getByText('LEVEL', { exact: true })).toBeVisible();
    await expect(page.getByText('EVENT TAG', { exact: true })).toBeVisible();
    await expect(page.getByTestId('combat-intent-name')).toHaveText(
      'Claw (telegraphed fixture action)',
    );
    await expect(page.getByTestId('combat-defeated-count')).toHaveText('0 / 4');
    await expect(page.getByTestId('combat-action-attack')).toBeEnabled();
    await expect(page.getByTestId('combat-action-skill')).toBeEnabled();
    await expect(page.getByTestId('combat-action-guard')).toBeEnabled();
    await expect(page.getByTestId('combat-action-escape')).toBeEnabled();
    await expect(page.getByTestId('combat-action-surrender')).toBeEnabled();
    await page.screenshot({ path: 'test-results/p1-ui-005-combat-desktop.png', fullPage: true });

    await page.getByTestId('combat-action-guard').click();
    await expect(page.getByTestId('combat-phase')).toHaveText('ENEMY TURN');
    await expect(
      page.getByText(/Guard is ready and will reduce the next eligible enemy action by 50%/),
    ).toBeVisible();
    await page.getByTestId('combat-resolve-enemy').click();
    await expect(page.getByRole('progressbar', { name: 'Player HP' })).toHaveAttribute(
      'value',
      '82',
    );
    await expect(
      page.getByText('Guard reduced Fixture Enemy A to 4 fixture damage.'),
    ).toBeVisible();

    await page.getByTestId('combat-action-skill').click();
    await expect(page.getByTestId('combat-defeated-count')).toHaveText('1 / 4');
    await expect(page.getByRole('heading', { name: 'Fixture Enemy B' })).toBeVisible();
    await expect(page.getByTestId('combat-intent')).toContainText('No telegraphed intent');
    await expect(page.getByTestId('combat-intent-name')).toHaveCount(0);
    await expect(page.getByRole('progressbar', { name: 'Enemy Mana' })).toHaveAttribute(
      'value',
      '8',
    );
    await expect(page.getByTestId('combat-action-skill')).toBeDisabled();
    await expect(page.getByText('Disabled: the Skill cooldown has not cleared.')).toBeVisible();

    await page.getByText('Preview additional Combat UI states', { exact: true }).click();
    await page.getByRole('button', { name: 'Preview insufficient Mana' }).click();
    await expect(page.getByRole('progressbar', { name: 'Player Mana' })).toHaveAttribute(
      'value',
      '9',
    );
    await expect(page.getByTestId('combat-action-skill')).toBeDisabled();
    await expect(
      page.getByText('Disabled: there is not enough fixture Mana for this Skill.'),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Restore Combat demo' }).click();
    await expect(page.getByRole('progressbar', { name: 'Player Mana' })).toHaveAttribute(
      'value',
      '42',
    );
    await expect(page.getByTestId('combat-action-skill')).toBeEnabled();
  });

  test('Combat demo is readable and fits the narrow mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/run/combat');
    await expect(page.getByRole('heading', { name: 'Combat Demo', exact: true })).toBeVisible();
    await expect(page.getByTestId('combat-action-attack')).toBeVisible();
    await expect(page.getByTestId('combat-action-skill')).toBeVisible();
    await expect(page.getByTestId('combat-action-guard')).toBeVisible();
    await expect(page.getByTestId('combat-intent-name')).toBeVisible();
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    await page.screenshot({ path: 'test-results/p1-ui-005-combat-mobile.png', fullPage: true });
  });

  test('Preflight local confirmation opens the Combat UI demo without creating a Run', async ({
    page,
  }) => {
    await page.goto('/run/preflight');
    await page.getByRole('button', { name: 'Begin Demo Run' }).click();
    await expect(page.getByRole('status')).toContainText(
      'No Run was created, no Stamina was deducted, no enemy roll was made and no timer started.',
    );
    await page.getByRole('link', { name: /Open Combat Demo/ }).click();
    await expect(page).toHaveURL('/run/combat');
    await expect(page.getByRole('heading', { name: 'Combat Demo', exact: true })).toBeVisible();
    await expect(page.getByText(/No server Run, RNG, initiative roll, real timer/)).toBeVisible();
  });

  test('Combat actions are keyboard reachable and can be activated without a pointer', async ({
    page,
  }) => {
    await page.goto('/run/combat');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Start', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Updates', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Province', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Run Preflight', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.getByText('Preview additional Combat UI states', { exact: true }),
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('combat-action-attack')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('combat-phase')).toHaveText('ENEMY TURN');
    await expect(page.getByTestId('combat-resolve-enemy')).toBeVisible();
  });
});

test.describe('P1-UI-006 Escape and Surrender confirmations', () => {
  test('Escape shows exact fixture calculation, cancels cleanly and handles return-encounter loot', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/run/combat');
    const hp = page.getByRole('progressbar', { name: 'Player HP' });
    const mana = page.getByRole('progressbar', { name: 'Player Mana' });

    await page.getByTestId('combat-action-escape').click();
    const dialog = page.getByRole('dialog', { name: 'Confirm Escape?' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId('combat-escape-gold-cost')).toHaveText('65 Gold');
    await expect(
      dialog.getByText(/pending Run loot \(3.2 kg\) is forfeited and excluded from W/i),
    ).toBeVisible();
    await expect(
      dialog.getByText(/current Province.*no home is required.*no additional Encounter/i),
    ).toBeVisible();
    await page.screenshot({ path: 'test-results/p1-ui-006-escape-desktop.png', fullPage: true });

    await page.getByTestId('combat-exit-cancel').click();
    await expect(page.getByTestId('combat-action-escape')).toBeFocused();
    await expect(hp).toHaveAttribute('value', '86');
    await expect(mana).toHaveAttribute('value', '42');
    await expect(page.getByTestId('combat-turn-number')).toHaveText('1');
    await expect(page.getByRole('heading', { name: 'Fixture Enemy A' })).toBeVisible();

    await page.getByText('Preview additional Combat UI states', { exact: true }).click();
    await page.getByTestId('combat-exit-fixture-select').selectOption('return-encounter-gold');
    await expect(page.getByTestId('combat-escape-fixture-summary')).toContainText(
      'retained W 9.6 kg',
    );
    await expect(page.getByTestId('combat-escape-fixture-summary')).toContainText(
      'example cost 85 Gold',
    );

    await page.getByTestId('combat-action-escape').click();
    await expect(page.getByTestId('combat-escape-gold-cost')).toHaveText('85 Gold');
    await expect(
      page.getByText(/chosen main-dungeon loot \(3.2 kg\) is kept and included in W/i),
    ).toBeVisible();
    await expect(page.getByText(/return-encounter reward \(1.8 kg\) is not gained/i)).toBeVisible();
    await page.getByTestId('combat-exit-confirm-escape').click();
    await expect(page.getByTestId('combat-exit-outcome')).toContainText('already chosen main loot');
    await expect(page.getByTestId('combat-exit-outcome')).toContainText(
      'does not award the return-encounter reward',
    );
    await expect(page.getByTestId('combat-phase')).toHaveText('ESCAPED · DEMO');
    await expect(page.getByRole('link', { name: 'Return to Province preview' })).toBeVisible();
  });

  test('insufficient Gold blocks Escape, Warp Stone is conditional and confirm is local-only', async ({
    page,
  }) => {
    await page.goto('/run/combat');
    await page.getByText('Preview additional Combat UI states', { exact: true }).click();
    await page
      .getByTestId('combat-exit-fixture-select')
      .selectOption('pre-clear-insufficient-gold');
    await page.getByTestId('combat-action-escape').click();

    const dialog = page.getByTestId('combat-exit-dialog');
    await expect(dialog.getByTestId('combat-escape-gold-cost')).toHaveText('65 Gold');
    await expect(dialog.getByTestId('combat-escape-insufficient-gold')).toContainText(
      'Not enough fixture Gold',
    );
    await expect(dialog.getByTestId('combat-exit-confirm-escape')).toBeDisabled();
    await expect(dialog.getByTestId('combat-escape-payment-warp-stone')).toHaveCount(0);
    await page.getByTestId('combat-exit-cancel').click();

    await page.getByTestId('combat-exit-fixture-select').selectOption('pre-clear-warp-stone');
    await page.getByTestId('combat-action-escape').click();
    await expect(page.getByTestId('combat-escape-payment-warp-stone')).toBeVisible();
    await page.getByTestId('combat-escape-payment-warp-stone').check();
    await expect(page.getByTestId('combat-exit-confirm-escape')).toBeEnabled();
    await page.getByTestId('combat-exit-confirm-escape').click();
    await expect(page.getByTestId('combat-exit-outcome')).toHaveCount(1);
    await expect(page.getByTestId('combat-exit-outcome')).toContainText(
      '1 carried Warp Stone selected (fixture only)',
    );
    await expect(page.getByTestId('combat-exit-outcome')).toContainText('No debit is performed');
    await expect(page.getByRole('progressbar', { name: 'Player HP' })).toHaveAttribute(
      'value',
      '86',
    );
  });

  test('Surrender warns about all canonical consequences and stays available during enemy-turn preview', async ({
    page,
  }) => {
    await page.goto('/run/combat');
    await page.getByTestId('combat-action-attack').click();
    await expect(page.getByTestId('combat-phase')).toHaveText('ENEMY TURN');
    await page.getByTestId('combat-action-surrender').click();

    const dialog = page.getByRole('dialog', { name: 'Confirm Surrender?' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('FAILED');
    await expect(dialog).toContainText('No Run rewards or EXP are granted.');
    await expect(dialog).toContainText('Entry Stamina is not refunded.');
    await expect(dialog).toContainText('Surrender does not kill the Character.');
    await expect(dialog).toContainText('HP is not refilled; the current HP value is preserved.');
    await page.getByTestId('combat-surrender-cancel').click();

    await expect(page.getByTestId('combat-phase')).toHaveText('ENEMY TURN');
    await expect(page.getByRole('progressbar', { name: 'Player HP' })).toHaveAttribute(
      'value',
      '86',
    );
    await page.getByTestId('combat-action-surrender').click();
    await page.getByTestId('combat-exit-confirm-surrender').click();

    await expect(page.getByTestId('combat-exit-outcome')).toContainText('FAILED');
    await expect(page.getByTestId('combat-exit-outcome')).toContainText(
      'No Run rewards or EXP are granted.',
    );
    await expect(page.getByTestId('combat-exit-outcome')).toContainText('no server Run changed');
    await expect(page.getByTestId('combat-phase')).toHaveText('FAILED · DEMO');
    await expect(page.getByRole('progressbar', { name: 'Player HP' })).toHaveAttribute(
      'value',
      '86',
    );
    await expect(page.getByTestId('combat-action-surrender')).toBeDisabled();
  });

  test('Escape confirmation is readable on mobile with no horizontal viewport overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/run/combat');
    await page.getByTestId('combat-action-escape').click();
    const dialog = page.getByTestId('combat-exit-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId('combat-exit-cancel')).toBeVisible();
    await expect(dialog.getByTestId('combat-exit-confirm-escape')).toBeVisible();
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    await page.screenshot({ path: 'test-results/p1-ui-006-escape-mobile.png', fullPage: false });
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('combat-exit-dialog')).toHaveCount(0);
    await expect(page.getByTestId('combat-action-escape')).toBeFocused();
  });
});

test('P1-UI-006 confirmation dialog traps keyboard focus and restores it on Escape', async ({
  page,
}) => {
  await page.goto('/run/combat');
  const opener = page.getByTestId('combat-action-escape');
  await opener.click();
  const dialog = page.getByTestId('combat-exit-dialog');
  const goldOption = page.getByTestId('combat-escape-payment-gold');
  const confirm = page.getByTestId('combat-exit-confirm-escape');

  await expect(page.getByTestId('combat-exit-cancel')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(goldOption).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(confirm).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(goldOption).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});
