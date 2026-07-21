import { test, expect } from '@playwright/test';

test.describe('I18n', () => {
  test('should switch language from English to Polish', async ({ page }) => {
    await page.goto('/en');

    await page.getByRole('button', { name: 'Select Language (EN)' }).click();
    await page.getByRole('link', { name: 'Polski' }).click();

    await expect(page).toHaveURL(/\/pl\/?$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Zleć to Inurri' })).toBeVisible();
  });

  test('should switch language from Polish to English', async ({ page }) => {
    await page.goto('/pl');

    await page.getByRole('button', { name: 'Select Language (PL)' }).click();
    await page.getByRole('link', { name: 'English' }).click();

    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Leave it to Inurri' })).toBeVisible();
  });
});
