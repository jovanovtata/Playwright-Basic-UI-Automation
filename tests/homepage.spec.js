import { test, expect } from '@playwright/test';
import { scrollToBottom } from '../utils/helpers.js';


test.describe('Home Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.route('**/*', (route) => {
     const url = route.request().url();
      if (
         url.includes('googlesyndication') ||
         url.includes('doubleclick') ||
         url.includes('adservice')
     ) {
        route.abort();
      } else {
        route.continue();
     }
    });
    await page.goto('/');
  });

  test('Should load the home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.locator('#header .logo')).toBeVisible();
  });

  test('Should display the navigation bar with all links', async ({ page }) => {
    await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible();
  });

  test('Should display featured products section', async ({ page }) => {
    const products = page.locator('.features_items .product-image-wrapper');
    await expect(products.first()).toBeVisible();
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('Should navigate to login page when clicking Signup / Login', async ({ page }) => {
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('Should navigate to products page when clicking Products', async ({ page }) => {
    await page.getByRole('link', { name: ' Products' }).click();
    await expect(page).toHaveURL(/.*products/);
  });

  test('Should navigate to cart page when clicking Cart', async ({ page }) => {
    await page.getByRole('link', { name: ' Cart' }).click();
    await expect(page).toHaveURL(/.*view_cart/);
  });

  test('Should successfully subscribe with a valid email', async ({ page }) => {
    await scrollToBottom(page);
    await page.locator('#susbscribe_email').fill('subscribe_test@kummiki.com');
    await page.locator('#subscribe').click();
    await expect(page.locator('#success-subscribe')).toBeVisible();
  });

});
