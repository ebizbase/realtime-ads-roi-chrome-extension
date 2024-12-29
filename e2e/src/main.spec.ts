import { test, expect } from './fixtures';

test('should have popup, options, devtool panel pages', async ({
  page,
  extensionId,
}) => {
  await page.goto(`chrome-extension://${extensionId}/popup/index.html`);
  await expect(page.locator('h1')).toHaveText('Chome Extensions Angular', {
    timeout: 10000,
  });

  await page.goto(`chrome-extension://${extensionId}/options/index.html`);
  await expect(page.locator('h1')).toHaveText(
    'Chome Extensions Angular - Options',
    { timeout: 10000 }
  );

  await page.goto(
    `chrome-extension://${extensionId}/devtools-panel/index.html`
  );
  await expect(page.locator('h1')).toHaveText(
    'Chome Extensions Angular - Devtool Panel',
    { timeout: 10000 }
  );
});
