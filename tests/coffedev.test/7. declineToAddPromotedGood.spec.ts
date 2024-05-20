import { test, expect } from '@playwright/test';

test('7. Declining to add promoted good into the cart', async ({ page }) => {
  const checkoutPageLoc = page.locator('data-test="checkout"]');
  const cartPageLoc = page.locator('[data-test="Cart page"]');
  const cappuccinoLoc = page.locator('[data-test="Cart page"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const cafeLatteLoc = page.locator('[data-test="Cafe_Latte"]');

  await page.goto('/');
  await expect(checkoutPageLoc).toBeVisible();
  await expect(cartPageLoc).toContainText('cart (0)');
  await cappuccinoLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await flatWhiteLoc.click();
  await expect(cartPageLoc).toContainText('cart (2)');
  await cafeLatteLoc.click();
  await expect(cartPageLoc).toContainText('cart (3)');
  await expect(page.getByText('It\'s your lucky day! Get an')).toBeVisible();
  await page.getByRole('button', { name: 'Nah, I\'ll skip.' }).click();
  await expect(cartPageLoc).toContainText('cart (3)');
});