import { test, expect } from '@playwright/test';

test('12. Submitting payment details', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const submitButton = page.locator('#submit-payment');

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await checkoutLoc.click();
  await expect(page.locator('h1:has-text("Payment details")')).toBeVisible();
  await page.getByLabel('Name').fill('sammy');
  await page.getByLabel('Email').fill('grog@proton.me');
  await submitButton.click();
  await expect(page.locator('.snackbar')).toBeVisible();
});