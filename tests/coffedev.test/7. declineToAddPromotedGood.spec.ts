import { test, expect } from '@playwright/test';

test('7. Declining to add promoted good into the cart', async ({ page }) => {
  const checkoutPageLoc = page.locator('[data-test="checkout"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  const cappuccinoLoc = page.locator('[data-test="Cappuccino"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const cafeLatteLoc = page.locator('[data-test="Cafe_Latte"]');
  const discountWindowLoc = page.locator('.promo');

  await page.goto('/');
  await expect(checkoutPageLoc).toBeVisible();
  await cappuccinoLoc.click();
  await flatWhiteLoc.click();
  await expect(cartPageLoc).toContainText('cart (2)');
  await cafeLatteLoc.click();
  await expect(discountWindowLoc).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.locator('.buttons:has-text("Nah, I ")').click();
  await expect(cartPageLoc).toContainText('cart (3)');
});