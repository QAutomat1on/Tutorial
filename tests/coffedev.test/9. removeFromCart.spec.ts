import { test, expect } from '@playwright/test';

test('9. Removing process from the cart via using "-" button', async ({ page }) => {
  const cartPageLoc = page.getByLabel('Cart page');
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  let flatWhiteCost = 18.00;
  
  await page.goto('/');
  await flatWhiteLoc.click();
  await expect(page.locator('li').filter({ hasText: 'cart (1)' })).toBeVisible();
  await cartPageLoc.click();
  await page.getByRole('button', { name: 'Add one Flat White' }).click();
  await expect(checkoutLoc).toContainText(`Total: $${flatWhiteCost*2}`);
  await page.getByRole('button', { name: 'Remove one Flat White' }).click();
  await expect(checkoutLoc).toContainText(`Total: $${flatWhiteCost}`);
  await page.getByRole('button', { name: 'Remove one Flat White' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
});