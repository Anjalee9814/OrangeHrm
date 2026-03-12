const { test, expect } = require('@playwright/test');


// Check login process - valid credentials lead to dashboard
test('check login process', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForSelector('input[name="username"]');

  // Enter valid username and password
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Check URL changed to dashboard
  await expect(page).toHaveURL(/dashboard/);

  // Check dashboard header is visible
  await expect(page.locator('.oxd-topbar-header-breadcrumb')).toBeVisible();
});
