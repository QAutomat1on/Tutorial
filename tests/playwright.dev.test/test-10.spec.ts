import { test, expect } from '@playwright/test';

test('10. Check correctness of the "GitHub" integration in the footer' , async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'GitHub', exact: true }).click();
  const page1 = await page1Promise;
  await expect(page1.getByText('microsoft / playwright Public')).toBeVisible();
});