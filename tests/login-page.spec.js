const { test, expect } = require('@playwright/test');

test('Login page elements should be visible', async ({ page }) => {

  // Load the Login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.orangehrm-login-form');

  // logo
  const logo = page.locator('.orangehrm-login-branding img');
  await expect(logo).toBeVisible();

  // Login title
  const loginTitle = page.locator('h5.orangehrm-login-title');
  await expect(loginTitle).toBeVisible();
  await expect(loginTitle).toHaveText('Login');

  // Username text
  const usernameLabel = page.locator('label.oxd-label', { hasText: 'Username' });
  await expect(usernameLabel).toBeVisible();

  // Username input field
  const usernameInput = page.locator('input[name="username"]');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toHaveAttribute('placeholder', 'Username');

  // Password text
  const passwordLabel = page.locator('label.oxd-label', { hasText: 'Password' });
  await expect(passwordLabel).toBeVisible();

  // Password input field
  const passwordInput = page.locator('input[name="password"]');
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toHaveAttribute('placeholder', 'Password');

  // Login button
  const loginButton = page.locator('button.orangehrm-login-button');
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toContainText('Login');

  // Forgot password link
  const forgotPasswordLink = page.locator('.orangehrm-login-forgot-header');
  await expect(forgotPasswordLink).toBeVisible();
  await expect(forgotPasswordLink).toContainText('Forgot your password?');
});
