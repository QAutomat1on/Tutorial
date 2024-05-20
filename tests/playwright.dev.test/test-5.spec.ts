import { test, expect } from '@playwright/test';

test('5. Check transition from installation page to "Writing tests" ', async ({ page }) => {
  const logoIconLocator = page.getByRole('link', { name: 'Playwright logo Playwright' });
  const getStartedButtonLocator = page.getByRole('link', { name: 'Get started' })
  const docPagesButtonLocator = page.getByLabel('Docs pages').getByRole('link'); 
  await page.goto('https://playwright.dev/');
  await expect(logoIconLocator).toBeVisible();
  await getStartedButtonLocator.click();
  await expect(docPagesButtonLocator).toContainText('NextWriting tests');
  await page.getByRole('link', { name: 'Next Writing tests »' }).click();
  await expect(page.getByRole('heading', { name: 'Writing tests' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Previous « Installation' })).toBeVisible();
});