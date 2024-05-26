import { test, expect } from '@playwright/test';

test('1. Visibility of cart active element on the page', async ({ page }) => {
  const cartPageLoc = page.locator('[href="/cart"]');
  
  await page.goto('https://coffee-cart.app/');
  await cartPageLoc.click();
});

