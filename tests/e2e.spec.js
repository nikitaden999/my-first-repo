const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const ProductsPage = require('../pages/products.page');
const CartPage = require('../pages/cart.page');
const CheckoutPage = require('../pages/checkout.page');
const ConfirmationPage = require('../pages/confirmation.page');

test('E2E покупка самого дорогого товара', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const confirm = new ConfirmationPage(page);

  await login.open();
  await login.login('standard_user', 'secret_sauce');

  expect(await products.getTitle()).toBe('Products');

  const productName = await products.addMostExpensiveProduct();
  await products.goToCart();

  expect(await cart.getItemName()).toBe(productName);

  await cart.checkout();
  await checkout.fillInfo('Test', 'User', '12345');
  await checkout.continue();
  await checkout.finish();

  expect(await confirm.getMessage()).toBe('Thank you for your order!');
});
