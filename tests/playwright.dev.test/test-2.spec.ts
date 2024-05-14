import { test, expect } from '@playwright/test';

test('2. Check the presence of all mandatory elements in the header', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  //The whole test oriented to verifying the presence of all mandatory elements in the header of the site.
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'API', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
  await expect(page.getByLabel('GitHub repository')).toBeVisible();
  await expect(page.getByLabel('Discord server')).toBeVisible();
  await expect(page.getByLabel('Switch between dark and light')).toBeVisible();
  await expect(page.getByLabel('Search')).toBeVisible();
});