import { test, expect } from '@playwright/test';

test.describe('Cart tests', () => {

  test('Should show an empty cart when no products have been added', async ({ page }) => {
    await page.goto('/view_cart');

    const cartItems = page.locator('#cart_info_table tbody tr');
    expect(await cartItems.count()).toBe(0);
  });

  test('Should add a product to the cart', async ({ page }) => {
    await page.goto('/products');

    // Hover over the first product to reveal the Add to cart button
    const firstProduct = page.locator('.features_items .product-image-wrapper').first();
    await firstProduct.hover();
    await firstProduct.locator('.add-to-cart').first().click();

    // Dismiss the modal
    await page.locator('.modal-footer button').click();

    // Go to cart and verify one item is present
    await page.goto('/view_cart');
    expect(await page.locator('#cart_info_table tbody tr').count()).toBeGreaterThan(0);
  });

  test('Should remove a product from the cart', async ({ page }) => {
    // Add a product first
    await page.goto('/products');
    const firstProduct = page.locator('.features_items .product-image-wrapper').first();
    await firstProduct.hover();
    await firstProduct.locator('.add-to-cart').first().click();
    await page.locator('.modal-footer button').click();

    // Go to cart and remove it
    await page.goto('/view_cart');
    await page.locator('.cart_quantity_delete').first().click();

    // Cart should now be empty
    await expect(page.locator('#empty_cart')).toBeVisible();
  });

  test('Should navigate to cart from the navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: ' Cart' }).click();
    await expect(page).toHaveURL(/.*view_cart/);
  });

});
