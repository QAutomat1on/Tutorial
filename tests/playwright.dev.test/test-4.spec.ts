import { test, expect } from '@playwright/test';

test('4. Check supported version of Node.js for Playwright package, should be matched with version 18+', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'How to install Playwright' }).click();
  //find locator and expect selected version of node.js
  await expect(page.getByRole('article')).toContainText('Node.js 18+');
});