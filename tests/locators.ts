import { Page } from '@playwright/test';

// const locators = 
// {
// // BASE_URL: 'https://coffee-cart.app/'
// // MENU : page.getByLabel('Menu page'),
// cartPage : 'Cart page', 
// } 

// export default locators; 

export const getEspressoLocator = (page: Page) => page.locator('[data-test="Espresso"]');

