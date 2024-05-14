import { test, expect } from '@playwright/test';

test('3. Testing the "Search" field with simple request', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').fill('Installation');
  await expect(page.getByRole('link', { name: 'Introduction​ Installation' })).toBeVisible();
  await page.getByRole('link', { name: 'Introduction​ Installation' }).click();
  await expect(page.getByRole('article')).toContainText('Node.js 18+');
});