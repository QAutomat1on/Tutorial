import { test, expect } from '@playwright/test';

test('1. Opening root page Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  //header has word "Playwright".
  await expect(page.getByLabel('Main', { exact: true }).locator('b')).toContainText('Playwright');
  //header contains logo and it's visible.
  await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
});

test("2. The presence of header's mandatory elements", async ({ page }) => {
    await page.goto('https://playwright.dev/');
    //The whole test oriented to verifying the presence of all mandatory elements in the header of the site.
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API', exact: true })).toBeVisible();
  });

  test('3. The "Search" field with simple request', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await page.getByLabel('Search').click();
    await page.getByPlaceholder('Search docs').fill('Installation');
    await expect(page.getByRole('link', { name: 'Introduction​ Installation' })).toBeVisible();
    await page.getByRole('link', { name: 'Introduction​ Installation' }).click();
    await expect(page.getByRole('article')).toContainText('Node.js 18+');
  });

  test('4. Supported version of Node.js for Playwright package', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'How to install Playwright' }).click();
    //find locator and expect selected version of node.js
    await expect(page.getByRole('article')).toContainText('Node.js 18+');
  });

  test('5. Transition from installation page to "Writing tests" ', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByLabel('Docs pages').getByRole('link')).toContainText('NextWriting tests');
    await page.getByRole('link', { name: 'Next Writing tests »' }).click();
    await expect(page.getByRole('heading', { name: 'Writing tests' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Previous « Installation' })).toBeVisible();
  });

  test('6. Left drawer for correct transition', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'Fixtures', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Fixtures', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Test generator' }).click();
    await expect(page.getByRole('heading', { name: 'Running CodegenDirect link to' })).toBeVisible();
  });

  test('7. Items of supported languages in the Left drawer', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'Supported languages' }).click();
    await expect(page.getByRole('heading', { name: 'Supported languages' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'JavaScript and' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PythonDirect link to Python' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'JavaDirect link to Java' })).toBeVisible();
    await expect(page.locator('#net')).toContainText('.NET');
  });

  test('8. Transition from the right drawer to the needed section.', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'Assertions', exact: true }).click();
    await expect(page.getByRole('link', { name: 'expect.configure', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'expect.configure', exact: true }).click();
    await expect(page.getByRole('article')).toContainText('You can create your own pre-configured expect instance to have its own defaults such as timeout and soft.');
  });

  test('9. Correctness of the "Stack Overflow" integration', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByText('Community')).toBeVisible();
    const page1Promise = page.waitForEvent('popup'); // const new page
    await page.getByRole('link', { name: 'Stack Overflow' }).click();
    //interaction with a new page but I haven't known about promise yet.
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading', { name: 'Questions tagged [playwright]' })).toBeVisible();
  });
  
  test('10. Correctness of the "GitHub" integration in the footer' , async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'GitHub', exact: true }).click();
    const page1 = await page1Promise;
    await expect(page1.getByText('microsoft / playwright Public')).toBeVisible();
  });