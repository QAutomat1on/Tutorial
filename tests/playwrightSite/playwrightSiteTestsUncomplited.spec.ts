import { test, expect } from '@playwright/test';

async function navigateToStartPage (page) {
  await page.goto('https://playwright.dev/');
}

const headerNames = ["Docs", "API", "Community"];

async function clickOnTheHeader(page,title) {
  await page.locator(`.navbar__item:has-text("${title}")`).click();
};

async function clickGetStartedButton(page) { 
  await page.locator('.getStarted_Sjon').click();
}

test('PWS1 Opening root page Playwright', async ({ page }) => {
  const playwrightHeaderLoc = page.locator('.navbar__title ');

  await navigateToStartPage(page);
  await expect(playwrightHeaderLoc).toContainText('Playwright');
});

test('PWS2 Opening "Docs","API","Community" tabs' , async ({ page }) => {
    await navigateToStartPage(page);
    await clickOnTheHeader(page, "Docs");
    await expect(page.locator('header h1')).toContainText("Installation");
    await clickOnTheHeader(page, "API");
    await expect(page.locator('header h1')).toContainText("Playwright Library");
    await clickOnTheHeader(page, "Community");
    await expect(page.locator('//h1')).toContainText("Welcome");
  });

  test('PWS3 The "Search" field with a request', async ({ page }) => {
    const searchFieldLoc = await page.locator('.DocSearch');
    
    await navigateToStartPage(page);
    searchFieldLoc.click();
    await page.locator('#docsearch-input').fill('Installation');
    await expect(page.locator('.DocSearch-Hit-title:has-text("Installing Playwright​")')).toContainText('Installing Playwright​');
    await page.locator('.DocSearch-Hit-title:has-text("Installing Playwright​")').click();
    await expect(page.locator('[id="installing-playwright"]')).toBeVisible();
  });

  test('PWS4 Supported version of Node.js for Playwright package', async ({ page }) => {
    await navigateToStartPage(page);
    await clickGetStartedButton(page);
    await expect(page.locator('header h1')).toContainText("Installation");
  });

  test('PWS5 Transition from installation page to "Writing tests" ', async ({ page }) => {
    await navigateToStartPage(page);
    await clickGetStartedButton(page);
    const leftDrawerListLoc = await page.locator('.menu.thin-scrollbar.menu_SIkG .menu__link');
    const listOfValues = await page.locator('.menu.thin-scrollbar.menu_SIkG .menu__link').allTextContents();
    console.log(listOfValues);
    const leftMenuCount = await leftDrawerListLoc.count();
    console.log(leftMenuCount);
    
    for (let i = 0; i < leftMenuCount ; i++){
      if(await leftDrawerListLoc.textContent() === 'Writing tests') {
        await leftDrawerListLoc.click();
        break;
      }
    }; 
    // const articleBlockLocator = page.locator('.preview-link');
    // const descriptionListText = await page.locator('.preview-link [data-qa-type="preview-description"]').allTextContents();
    // console.log(descriptionListText);
    // const blockCount = await articleBlockLocator.count();
    // console.log(blockCount);

    // for ( let i = 0; i < blockCount; ++i)
    //   {
    //     if(await articleBlockLocator.nth(i).locator('p').textContent() === articleDescription)
    //       {
    //         await articleBlockLocator.nth(i).locator('[data-qa-type="article-favorite"]').click();
    //         break;
    //       }
    //   }

    // await expect(page.getByLabel('Docs pages').getByRole('link')).toContainText('NextWriting tests');
    // await page.getByRole('link', { name: 'Next Writing tests »' }).click();
    await expect(page.locator('header h1')).toContainText('Writing tests');
    // await expect(page.getByRole('link', { name: 'Previous « Installation' })).toBeVisible();
  });

  test('PWS6 Left drawer for correct transition', async ({ page }) => {
    await navigateToStartPage(page);
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'Fixtures', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Fixtures', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Test generator' }).click();
    await expect(page.getByRole('heading', { name: 'Running CodegenDirect link to' })).toBeVisible();
  });

  test('PWS7 Items of supported languages in the Left drawer', async ({ page }) => {
    await navigateToStartPage(page);
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'Supported languages' }).click();
    await expect(page.getByRole('heading', { name: 'Supported languages' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'JavaScript and' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PythonDirect link to Python' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'JavaDirect link to Java' })).toBeVisible();
    await expect(page.locator('#net')).toContainText('.NET');
  });

  test('PWS8 Transition from the right drawer to the needed section.', async ({ page }) => {
    await navigateToStartPage(page);
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'Assertions', exact: true }).click();
    await expect(page.getByRole('link', { name: 'expect.configure', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'expect.configure', exact: true }).click();
    await expect(page.getByRole('article')).toContainText('You can create your own pre-configured expect instance to have its own defaults such as timeout and soft.');
  });

  test('PWS9 Correctness of the "Stack Overflow" integration', async ({ page }) => {
    await navigateToStartPage(page);
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByText('Community')).toBeVisible();
    const page1Promise = page.waitForEvent('popup'); // const new page
    await page.getByRole('link', { name: 'Stack Overflow' }).click();
    //interaction with a new page but I haven't known about promise yet.
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading', { name: 'Questions tagged [playwright]' })).toBeVisible();
  });
  
  test('PWS10 Correctness of the "GitHub" integration in the footer' , async ({ page }) => {
    await navigateToStartPage(page);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'GitHub', exact: true }).click();
    const page1 = await page1Promise;
    await expect(page1.getByText('microsoft / playwright Public')).toBeVisible();
  });