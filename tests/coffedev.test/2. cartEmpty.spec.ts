import { test, expect } from '@playwright/test';

test('2. Cart empty and after some actions contain needed value', async ({ page }) => {
  const cartPageLoc = page.getByLabel('Cart page');
  const menuPageLoc = page.getByLabel('Menu page');
  const espressoLoc = page.locator('[data-test="Espresso"]');

  await page.goto('/');
  await cartPageLoc.click();
  await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
  await menuPageLoc.click();
  await espressoLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await cartPageLoc.click();
  await expect(page.locator('div').filter({ hasText: /^Espresso$/ })).toBeVisible();
});