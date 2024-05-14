import { test, expect } from '@playwright/test';

test('8. Check transition from the right drawer to the needed section.', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'Assertions', exact: true }).click();
  await expect(page.getByRole('link', { name: 'expect.configure', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'expect.configure', exact: true }).click();
  await expect(page.getByRole('article')).toContainText('You can create your own pre-configured expect instance to have its own defaults such as timeout and soft.');
});