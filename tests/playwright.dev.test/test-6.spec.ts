import { test, expect } from '@playwright/test';

test('6. Check left drawer for correct transition', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'Fixtures', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Fixtures', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Test generator' }).click();
  await expect(page.getByRole('heading', { name: 'Running CodegenDirect link to' })).toBeVisible();
});