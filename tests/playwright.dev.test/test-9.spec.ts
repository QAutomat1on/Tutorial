import { test, expect } from '@playwright/test';

test('9. Check correctness of the "Stack Overflow" integration', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
  await expect(page.getByRole('contentinfo').getByText('Community')).toBeVisible();
  const page1Promise = page.waitForEvent('popup'); // const new page
  await page.getByRole('link', { name: 'Stack Overflow' }).click();
  //interaction with a new page but I haven't known about promise yet.
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: 'Questions tagged [playwright]' })).toBeVisible();
});