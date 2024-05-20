import { test, expect } from '@playwright/test';

test('4. Adding process of goods to the cart', async ({ page }) => {

  const cartPageLoc = page.getByLabel('Cart page');
  const espressoLoc = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoLoc = page.locator('[data-test="Espresso_Machiato"]');
  const cappuccinoLoc = page.locator('[data-test="Cappuccino"]');

  await page.goto('/');
  await expect(cartPageLoc).toBeVisible();
  await expect(cartPageLoc).toContainText('cart (0)');
  await espressoLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await espressoMacchiatoLoc.click();
  await expect(cartPageLoc).toContainText('cart (2)');
  await cappuccinoLoc.click();
  await expect(cartPageLoc).toContainText('cart (3)');
});