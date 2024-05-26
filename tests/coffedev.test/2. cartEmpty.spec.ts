import { test, expect } from '@playwright/test';

test('2. Cart empty and after some actions contain needed value', async ({ page }) => {
  const cartPageLoc = page.locator('[href="/cart"]');
  const menuPageLoc = page.locator('[href="/"]');
  const espressoLoc = page.locator('[data-test="Espresso"]');

  await page.goto('/');
  await cartPageLoc.click();
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
  await menuPageLoc.click();
  await espressoLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await cartPageLoc.click();
  await expect(page.locator('.list-item div:has-text("Espresso")').nth(0)).toBeVisible();
});