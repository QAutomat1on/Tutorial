import { test, expect } from '@playwright/test';

test('5. Check transition from installation page to "Writing tests" ', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByLabel('Docs pages').getByRole('link')).toContainText('NextWriting tests');
  await page.getByRole('link', { name: 'Next Writing tests »' }).click();
  await expect(page.getByRole('heading', { name: 'Writing tests' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Previous « Installation' })).toBeVisible();
});