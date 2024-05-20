import { test, expect } from '@playwright/test';

test('8. Adding additional drink with the same name via cart', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const espressoMacchiatoLoc= page.locator('[data-test="Espresso_Macchiato"]');
  const cartPageLoc = page.getByLabel('Cart page');
  let macchiatoCost = 12.00;
  let totalSum = macchiatoCost *2 ;

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await expect(page.locator('li').filter({ hasText: 'cart (0)' })).toBeVisible();
  await espressoMacchiatoLoc.click();
  await expect(page.locator('li').filter({ hasText: 'cart (1)' })).toBeVisible();
  await cartPageLoc.click();
  await expect(checkoutLoc).toContainText(`Total: $${macchiatoCost}`);  //`Total: $12.00'`
  await page.getByRole('button', { name: 'Add one Espresso Macchiato' }).click();
  await expect(checkoutLoc).toContainText(`Total: $${totalSum.toFixed(2)}`);
});