import { test, expect } from '@playwright/test';

test.describe('User Flows', () => {
  test('contact form submission should work', async ({ page }) => {
    await page.route('**/en/contact/', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 200, body: 'OK' });
      } else {
        await route.continue();
      }
    });
    await page.goto('/en/contact');

    await page.getByRole('textbox', { name: 'Name *' }).fill('John Doe');
    await page.getByRole('textbox', { name: 'Email address *' }).fill('john@example.com');
    await page.getByRole('textbox', { name: 'Message *' }).fill('This is a test message from Playwright.');
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByText('Message sent', { exact: true })).toBeVisible();
  });

  test('contact form should validate required fields', async ({ page }) => {
    await page.goto('/en/contact');

    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByText('Please enter your name', { exact: true })).toBeVisible();
    await expect(page.getByText('Please enter your email address', { exact: true })).toBeVisible();
    await expect(page.getByText('Please write a short message', { exact: true })).toBeVisible();
  });
});
