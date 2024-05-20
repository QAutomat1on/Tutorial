import { test, expect } from '@playwright/test';

test('5. Visibility of modal window with additional promo action', async ({ page }) => {
  const cappuccinoLoc = page.locator('[data-test="Cappuccino"]');
  const cafeBrewLoc = page.locator('[data-test="Cafe_Breve"]');
  const espressoMacchiatoLoc = page.locator('[data-test="Espresso_Macchiato"]');
  
  await page.goto('/');
  await cappuccinoLoc.click();
  await cafeBrewLoc.click();
  await espressoMacchiatoLoc.click();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});