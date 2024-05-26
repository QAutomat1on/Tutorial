import { test, expect } from '@playwright/test';

test('6. Adding into the cart, promo good with discounted value', async ({ page }) => {
  const espressoLoc = page.locator('[data-test="Espresso"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const cafeBrewLoc = page.locator('[data-test="Cafe_Breve"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  const discountWindowLoc = page.locator('.promo');

  await page.goto('/');
  await espressoLoc.click();
  await flatWhiteLoc.click();
  await cafeBrewLoc.click();
  await expect(discountWindowLoc).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await cartPageLoc.click();
  await expect(page.locator('.list-item:has-text("(Discounted) Mocha")').first()).toContainText('(Discounted) Mocha');
});