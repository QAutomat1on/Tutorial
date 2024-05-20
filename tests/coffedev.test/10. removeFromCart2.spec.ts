import { test, expect } from '@playwright/test';

test('10. Removing process from the cart via using "X" button', async ({ page }) => {
  const espressoConPannaLoc = page.locator('[data-test="Espresso_Con Panna"]');
  const cartPageLoc = page.getByLabel('Cart page');
  
  await page.goto('/');
  await expect(page.locator('li').filter({ hasText: 'cart (0)' })).toBeVisible();
  await espressoConPannaLoc.click();
  await expect(page.locator('li').filter({ hasText: 'cart (1)' })).toBeVisible();
  await cartPageLoc.click();
  await page.getByLabel('Remove all Espresso Con Panna').click();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});