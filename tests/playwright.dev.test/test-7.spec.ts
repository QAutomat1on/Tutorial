import { test, expect } from '@playwright/test';

test('7. Check items of supported languages in the Left drawer', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('link', { name: 'Supported languages' }).click();
  await expect(page.getByRole('heading', { name: 'Supported languages' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'JavaScript and' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'PythonDirect link to Python' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'JavaDirect link to Java' })).toBeVisible();
  await expect(page.locator('#net')).toContainText('.NET');
});