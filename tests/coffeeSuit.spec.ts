import { test, expect } from '@playwright/test';

test('1. Visibility of cart active element on the page', async ({ page }) => {
  const cartPageLoc = page.locator('[href="/cart"]');
  
  await page.goto('https://coffee-cart.app/');
  await cartPageLoc.click();
});



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

test('3. "Github" tab for right transition.', async ({ page }) => {
  const gitHubLoc = page.locator('[href="/github"]');
  
  await page.goto('/');
  await gitHubLoc.click();
  await expect(page.locator('.container:has-text("Star our repository ")')).toBeVisible();
  await page.locator('[href="https://github.com/jecfish/coffee-cart"]').click();
  await expect(page.locator('[href="/jecfish/coffee-cart"]').nth(0)).toBeVisible(); 
});

test('4. Adding process of goods to the cart', async ({ page }) => {

  const cartPageLoc = page.locator('[href="/cart"]');
  const espressoLoc = page.locator('[data-test="Espresso"]');
  const espressoMacchiatoLoc = page.locator('[data-test="Espresso_Macchiato"]');
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
  await expect(page.locator('.promo')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});

test('6. Adding into the cart, promo good with discounted value', async ({ page }) => {
  const espressoLoc = page.locator('[data-test="Espresso"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const cafeBrewLoc = page.locator('[data-test="Cafe_Breve"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  const discountWindowLoc = page.locator('.promo');

  await page.goto('/');
  await espressoLoc.click();
  await flatWhiteLoc.click();
  await cafeBrewLoc.click();
  await expect(discountWindowLoc).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await cartPageLoc.click();
  await expect(page.locator('.list-item:has-text("(Discounted) Mocha")').first()).toContainText('(Discounted) Mocha');
});

test('7. Declining to add promoted good into the cart', async ({ page }) => {
  const checkoutPageLoc = page.locator('[data-test="checkout"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  const cappuccinoLoc = page.locator('[data-test="Cappuccino"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  const cafeLatteLoc = page.locator('[data-test="Cafe_Latte"]');
  const discountWindowLoc = page.locator('.promo');

  await page.goto('/');
  await expect(checkoutPageLoc).toBeVisible();
  await cappuccinoLoc.click();
  await flatWhiteLoc.click();
  await expect(cartPageLoc).toContainText('cart (2)');
  await cafeLatteLoc.click();
  await expect(discountWindowLoc).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.locator('.buttons:has-text("Nah, I ")').click();
  await expect(cartPageLoc).toContainText('cart (3)');
});

test('8. Adding additional drink with the same name via cart', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const espressoMacchiatoLoc= page.locator('[data-test="Espresso_Macchiato"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  let macchiatoCost = 12.00;
  let totalSum = macchiatoCost *2 ;

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await expect(cartPageLoc).toContainText('cart (0)');
  await espressoMacchiatoLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await cartPageLoc.click();
  await expect(checkoutLoc).toContainText(`Total: $${macchiatoCost}`);  //`Total: $12.00'`
  await page.getByRole('button', { name: 'Add one Espresso Macchiato' }).click();
  await expect(checkoutLoc).toContainText(`Total: $${totalSum.toFixed(2)}`);
});

test('9. Removing process from the cart via using "-" button', async ({ page }) => {
  const cartPageLoc = page.locator('[href="/cart"]');
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const flatWhiteLoc = page.locator('[data-test="Flat_White"]');
  let flatWhiteCost = 18.00;
  
  await page.goto('/');
  await flatWhiteLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await cartPageLoc.click();
  await page.getByRole('button', { name: 'Add one Flat White' }).click();
  await expect(checkoutLoc).toContainText(`Total: $${flatWhiteCost*2}`);
  await page.getByRole('button', { name: 'Remove one Flat White' }).click();
  await expect(checkoutLoc).toContainText(`Total: $${flatWhiteCost}`);
  await page.getByRole('button', { name: 'Remove one Flat White' }).click();
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
});

test('10. Removing process from the cart via using "X" button', async ({ page }) => {
  const espressoConPannaLoc = page.locator('[data-test="Espresso_Con Panna"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  
  await page.goto('/');
  await expect(cartPageLoc).toContainText('cart (0)');
  await espressoConPannaLoc.click();
  await expect(cartPageLoc).toContainText('cart (1)');
  await cartPageLoc.click();
  await page.getByLabel('Remove all Espresso Con Panna').click();
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
});

test('11. Appearance of the "Payment details" modal window', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await checkoutLoc.click();
  await expect(page.locator('h1:has-text("Payment details")')).toBeVisible();
});

test('12. Submitting payment details', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const submitButton = page.locator('#submit-payment');

  await page.goto('/');
  await expect(checkoutLoc).toBeVisible();
  await checkoutLoc.click();
  await expect(page.locator('h1:has-text("Payment details")')).toBeVisible();
  await page.getByLabel('Name').fill('sammy');
  await page.getByLabel('Email').fill('grog@proton.me');
  await submitButton.click();
  await expect(page.locator('.snackbar')).toBeVisible();
});