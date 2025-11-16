import { test, expect } from '@playwright/test';
test('Login with valid credentials redirects to inventory page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/.*inventory\.html/);
});


test('Login fails', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});
