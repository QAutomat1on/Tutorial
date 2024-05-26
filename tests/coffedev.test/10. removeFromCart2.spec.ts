import { test, expect } from '@playwright/test';

test('10. Removing process from the cart via using "X" button', async ({ page }) => {
  const espressoConPannaLoc = page.locator('[data-test="Espresso_Con Panna"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  
  await page.goto('/');
  await expect(cartPageLoc).toContainText('cart (0)');
  await espressoConPannaLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await cartPageLoc.click();
  await page.getByLabel('Remove all Espresso Con Panna').click();
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
});