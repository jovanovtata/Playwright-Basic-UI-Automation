import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {

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

    await page.goto('/products');
  });

  test('should display the All Products heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  });

  test('should display a list of products', async ({ page }) => {
    const products = page.locator('.features_items .product-image-wrapper');
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('should return results when searching for a valid product', async ({ page }) => {
    await page.locator('#search_product').fill('Top');
    await page.locator('#submit_search').click();

    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
    expect(await page.locator('.features_items .product-image-wrapper').count()).toBeGreaterThan(0);
  });

  test('should show Searched Products heading even when no results found', async ({ page }) => {
    await page.locator('#search_product').fill('xyznotexist99999');
    await page.locator('#submit_search').click();

    await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
  });

  test('should navigate to product detail page', async ({ page }) => {
    await page.locator('a[href*="/product_details/"]').first().click();
    await expect(page).toHaveURL(/.*product_details.*/);
  });

  test('should display product name, price and category on detail page', async ({ page }) => {
    await page.locator('a[href*="/product_details/"]').first().click();

    await expect(page.locator('.product-information h2')).toBeVisible();
    await expect(page.locator('.product-information span span')).toBeVisible();
    await expect(page.locator('.product-information p').first()).toBeVisible();
  });

});
