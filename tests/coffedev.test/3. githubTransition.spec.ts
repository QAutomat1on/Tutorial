import { test, expect } from '@playwright/test';

test('3. "Github" tab for right transition.', async ({ page }) => {
  const gitHubLoc = page.getByLabel('GitHub page');
  
  await page.goto('/');
  await gitHubLoc.click();
  await expect(page.getByText('Star our repository jecfish/')).toBeVisible();
  await page.getByRole('link', { name: 'jecfish/coffee-cart' }).click();
  await expect(page.getByRole('banner').getByLabel('Homepage')).toBeVisible();
});

