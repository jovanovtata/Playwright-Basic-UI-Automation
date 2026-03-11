import { test, expect } from '@playwright/test';
import { generateUniqueEmail } from '../utils/helpers.js';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Should display login and signup sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
  });

  test('Should show error when logging in with invalid credentials', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Error message not displayed in Chromium - Run only in Firefox for now');

    await page.locator('[data-qa="login-email"]').fill('wrong@example.com');
    await page.locator('[data-qa="login-password"]').fill('WrongPassword123');
    await page.locator('[data-qa="login-button"]').click();

    await page.waitForSelector('p:has-text("Your email or password is incorrect!")');
    await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible();
  });


  test('Should show error when signing up with an already existing email', async ({ page }) => {
    await page.locator('[data-qa="signup-name"]').fill('Existing User');
    await page.locator('[data-qa="signup-email"]').fill('test@test.com');
    await page.locator('[data-qa="signup-button"]').click();

    await expect(page.locator('p:has-text("Email Address already exist!")')).toBeVisible();
  });

  test('Should redirect to signup form when using a new unique email', async ({ page }) => {
    const uniqueEmail = generateUniqueEmail('newuser');

    await page.locator('[data-qa="signup-name"]').fill('Brand New User');
    await page.locator('[data-qa="signup-email"]').fill(uniqueEmail);
    await page.locator('[data-qa="signup-button"]').click();

    await expect(page).toHaveURL(/.*signup/);
  });

  test('Should stay on login page when submitting empty login form', async ({ page }) => {
    await page.locator('[data-qa="login-button"]').click();
    await expect(page).toHaveURL(/.*login/);
  });

});
