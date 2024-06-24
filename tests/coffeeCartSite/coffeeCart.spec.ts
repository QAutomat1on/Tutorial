import { test, expect, Page } from '@playwright/test';

const coffeeNames = [
"Espresso", 
"Espresso_Macchiato", 
"Cappuccino", 
"Mocha", 
"Flat_White",
"Americano",
"Cafe_Latte",
"Espresso_Con Panna",
"Cafe_Breve" ];

async function navigateToStartPage(page?) {
  await page.goto('https://coffee-cart.app/');
};

async function clickOnTheCart(page) {
  const cartPageLoc = page.locator('[href="/cart"]');
  await cartPageLoc.click();
};

async function clickOnTheMenuButton(page){
  const menuPageLoc = page.locator('[href="/"]');
  await menuPageLoc.click();
};

async function clickOnTheCoffeeCard(page, title){
  await page.locator(`[data-test="${title}"]`).click();
}

async function clickOnTheCoffeeCards(page: Page, titles: Array<string>) {
  for(const title of titles) {
    await clickOnTheCoffeeCard(page, title);
  }
}

async function clickOnCheckout(page){
  const checkoutLoc = page.locator('[data-test="checkout"]');
  await checkoutLoc.click();
};

async function fillName(page,name) {
  await page.locator('#name').fill(name);
};

async function fillEmail(page,email) {
  await page.locator('#email').fill(email);
};

async function clickSubmit(page) {
  await page.locator('#submit-payment').click();
};


async function submitOrder(page, name, email) { 
  await fillName(page, name);
  await fillEmail(page, email);
  await clickSubmit(page);
};

test('CC1 Open cart', async ({ page }) => {
  await navigateToStartPage(page);
  await clickOnTheCart(page);
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
});



test('CC2 Add product to the cart', async ({ page }) => {
  const cartPageLoc = page.locator('[href="/cart"]');
 
  await navigateToStartPage(page);
  await clickOnTheCart(page);
  await clickOnTheMenuButton(page);
  await clickOnTheCoffeeCard(page,'Espresso');
  await expect(cartPageLoc).toContainText('cart (1)');
  await clickOnTheCart(page);
  await expect(page.locator('.list-item div:has-text("Espresso")').nth(1)).toBeVisible();
});

test('CC3 Add a few goods to the cart', async ({ page }) => {
  const cartPageLoc = page.locator('[href="/cart"]');

  await navigateToStartPage(page);
  await expect(cartPageLoc).toContainText('cart (0)');
  await clickOnTheCoffeeCards(page, ["Espresso","Espresso_Macchiato","Cappuccino"]);
  await expect(cartPageLoc).toContainText('cart (3)');
});

test('CC4 Modal window with promo action', async ({ page }) => {
  
  await navigateToStartPage(page);
  await clickOnTheCoffeeCards(page, ["Espresso","Cafe_Breve","Espresso_Macchiato"] );
  await expect(page.locator('.promo')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});

test('CC5 Add discounted position in the cart', async ({ page }) => {
  const discountWindowLoc = page.locator('.promo');

  await navigateToStartPage(page);
  await clickOnTheCoffeeCards(page, ["Espresso", "Flat_White", "Cafe_Breve"]);
  await expect(discountWindowLoc).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await clickOnTheCart(page);
  await expect(page.locator('.list-item:has-text("(Discounted) Mocha")').first()).toContainText('(Discounted) Mocha');
});

test('CC6 Declining to add promoted good into the cart', async ({ page }) => {
  const checkoutPageLoc = page.locator('[data-test="checkout"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  const discountWindowLoc = page.locator('.promo');

  await navigateToStartPage(page);
  await expect(checkoutPageLoc).toBeVisible();
  await clickOnTheCoffeeCards(page, ["Cappuccino","Flat_White" ,"Cafe_Latte"])
  await expect(discountWindowLoc).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
  await page.locator('.buttons:has-text("Nah, I ")').click();
  await expect(cartPageLoc).toContainText('cart (3)');
});

test('CC7 Add additional drink via cart and remove it', async ({ page }) => {
  const checkoutLoc = page.locator('[data-test="checkout"]');
  const cartPageLoc = page.locator('[href="/cart"]');
  const macchiatoCost = 12.00;
  let totalSum = macchiatoCost *2 ;

  await navigateToStartPage(page);
  await expect(checkoutLoc).toBeVisible();
  await expect(cartPageLoc).toContainText('cart (0)');
  await clickOnTheCoffeeCard(page,"Espresso_Macchiato");
  await clickOnTheCart(page);
  await expect(checkoutLoc).toContainText(`Total: $${macchiatoCost}`);  //`Total: $12.00'`
  await page.getByRole('button', { name: 'Add one Espresso Macchiato' }).click();
  await expect(checkoutLoc).toContainText(`Total: $${totalSum.toFixed(2)}`);
  await page.getByRole('button', { name: 'Remove one Espresso Macchiato' }).dblclick();
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
});

test('CC8 Remove product from the cart via "X" button', async ({ page }) => {
  const cartPageLoc = page.locator('[href="/cart"]');
  
  await navigateToStartPage(page);
  await clickOnTheCoffeeCard(page,"Espresso_Con Panna");
  await expect(cartPageLoc).toContainText('cart (1)');
  await clickOnTheCart(page);
  await page.getByLabel('Remove all Espresso Con Panna').click();
  await expect(page.locator('.list')).toContainText('No coffee, go add some.');
});

test('CC9 Submit payment details', async ({ page }) => {

  await navigateToStartPage(page);
  await clickOnCheckout(page);
  await expect(page.locator('h1:has-text("Payment details")')).toBeVisible();
  await submitOrder(page, 'Stan Li', 'samsam@yopmail.com');
  await expect(page.locator('.snackbar')).toBeVisible();
});

test('CC10 E2E whole scenario', async ({ page }) => {
  await navigateToStartPage(page);
  await clickOnTheCoffeeCards(page, coffeeNames)
  await clickOnCheckout(page);
  await submitOrder(page, 'Soul', 'goodman@gmail.com' );
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});