import { test, expect } from '@playwright/test';

test('1. Opening root page Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  //header has word "Playwright".
  await expect(page.getByLabel('Main', { exact: true }).locator('b')).toContainText('Playwright');
  //header contains logo and it's visible.
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
});

