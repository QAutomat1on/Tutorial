import { test, expect } from '@playwright/test';

test('3. "Github" tab for right transition.', async ({ page }) => {
  const gitHubLoc = page.locator('[href="/github"]');
  
  await page.goto('/');
  await gitHubLoc.click();
  await expect(page.locator('.container:has-text("Star our repository ")')).toBeVisible();
  await page.locator('[href="https://github.com/jecfish/coffee-cart"]').click();
  await expect(page.locator('[href="/jecfish/coffee-cart"]').nth(0)).toBeVisible(); 
});

