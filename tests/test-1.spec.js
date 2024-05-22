import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const declineButtonLoc = page.getByRole('button', { name: 'Nah, I\'ll skip.' });
  const espressoLoc = page.locator('[data-test="Espresso"]'); 
  const espressoMacchiatoLoc = page.locator('[data-test="Espresso_Macchiato"]');
  const cappuccinoLoc = page.locator('[data-test="Cappuccino"]');
  const mochaLoc = page.locator('[data-test="Mocha"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const americanoLoc = page.locator('[data-test="Americano"]');
  const cafeLatteLoc = page.locator('[data-test="Cafe_Latte"]');
  const espressoConPannaLoc = page.locator('[data-test="Espresso_Con Panna"]');
  const cafeBreveLoc = page.locator('[data-test="Cafe_Breve"]'); 
  const cartPageLoc = page.getByLabel('Cart page');


  await page.goto('/');
  await espressoLoc.click();
  await espressoMacchiatoLoc.click();
  await cappuccinoLoc.click();
  await declineButtonLoc.click();
  await mochaLoc.click();
  await flatWhiteLoc.click();
  await americanoLoc.click();
  await declineButtonLoc.click();
  await cafeLatteLoc.click();
  await espressoConPannaLoc.click();
  await cafeBreveLoc.click();
  await declineButtonLoc.click();
  await cartPageLoc.click();
  // await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $119.00');
  const coffeeNames = await page.locator('//ul').last().locator('.list-item').allTextContents();
  console.log('Coffee name', coffeeNames);
  const pricesOfCoffee = coffeeNames.map(item => item.match(/\$([0-9]+)/)).map(match => parseFloat(match[1]));
  console.log(pricesOfCoffee);
  const totalSum = prices.reduce((sum, price) => sum + price, 0);
  console.log('Total sum:', totalSum);
  
  expect(totalSum).toBe(119.00);
});