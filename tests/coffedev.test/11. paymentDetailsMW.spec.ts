import { test, expect } from '@playwright/test';

test('11. Appearance of the "Payment details" modal window', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await checkoutLoc.click();
  await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
});