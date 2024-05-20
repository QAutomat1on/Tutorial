import { test, expect } from '@playwright/test';

test('1. Visibility of cart active element on the page', async ({ page }) => {
  const cartPageLoc = page.getByLabel('Cart page')
  
  await page.goto('/');
  await cartPageLoc.click();
});

