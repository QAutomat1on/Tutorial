import { test, expect } from '@playwright/test';
// import * as locators from './locators';

test('1. Visibility of cart active element on the page', async ({ page }) => {
  const cartPage = page.getByLabel('Cart page')
  
  await page.goto('https://coffee-cart.app/');
  await cartPage.click();
});



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

test('3. "Github" tab for right transition.', async ({ page }) => {
  const gitHubLoc = page.getByLabel('GitHub page');
  
  await page.goto('/');
  await gitHubLoc.click();
  await expect(page.getByText('Star our repository jecfish/')).toBeVisible();
  await page.getByRole('link', { name: 'jecfish/coffee-cart' }).click();
  await expect(page.getByRole('banner').getByLabel('Homepage')).toBeVisible();
});

test('4. Adding process of goods to the cart', async ({ page }) => {

  const cartPageLoc = page.getByLabel('Cart page');
  const espressoLoc = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoLoc = page.locator('[data-test="Espresso_Machiato"]');
  const cappuccinoLoc = page.locator('[data-test="Cappuccino"]');

  await page.goto('/');
  await expect(cartPageLoc).toBeVisible();
  await expect(cartPageLoc).toContainText('cart (0)');
  await espressoLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await espressoMacchiatoLoc.click();
  await expect(cartPageLoc).toContainText('cart (2)');
  await cappuccinoLoc.click();
  await expect(cartPageLoc).toContainText('cart (3)');
});

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

test('6. Adding into the cart, promo good with discounted value', async ({ page }) => {
  const espressoLoc = page.locator('[data-test="Espresso"');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const cafeBrewLoc = page.locator('[data-test="Cafe_Breve"]');
  const cartPageLoc = page.getByLabel('Cart page');

  await page.goto('/');
  await espressoLoc.click();
  await flatWhiteLoc.click();
  await cafeBrewLoc.click();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await cartPageLoc.click();
  await expect(page.locator('#app')).toContainText('(Discounted) Mocha');
});

test('7. Declining to add promoted good into the cart', async ({ page }) => {
  const checkoutPageLoc = page.locator('data-test="checkout"]');
  const cartPageLoc = page.locator('[data-test="Cart page"]');
  const cappuccinoLoc = page.locator('[data-test="Cart page"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const cafeLatteLoc = page.locator('[data-test="Cafe_Latte"]');

  await page.goto('/');
  await expect(checkoutPageLoc).toBeVisible();
  await expect(cartPageLoc).toContainText('cart (0)');
  await cappuccinoLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await flatWhiteLoc.click();
  await expect(cartPageLoc).toContainText('cart (2)');
  await cafeLatteLoc.click();
  await expect(cartPageLoc).toContainText('cart (3)');
  await expect(page.getByText('It\'s your lucky day! Get an')).toBeVisible();
  await page.getByRole('button', { name: 'Nah, I\'ll skip.' }).click();
  await expect(cartPageLoc).toContainText('cart (3)');
});

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

test('11. Appearance of the "Payment details" modal window', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await checkoutLoc.click();
  await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
});

test('12. Submitting payment details', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const submitButton = page.getByRole('button', { name: 'Submit' });

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await checkoutLoc.click();
  await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
  await page.getByLabel('Name').fill('sammy');
  await page.getByLabel('Email').fill('grog@proton.me');
  await submitButton.click();
});