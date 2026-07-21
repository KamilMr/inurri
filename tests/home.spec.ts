import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and show the main title', async ({ page }) => {
    await page.goto('/en');

    await expect(page.getByRole('link', { name: 'Inurri Logo' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Leave it to Inurri' })).toBeVisible();
    await expect(page.locator('[data-hero-variant="centered"]')).toBeVisible();
  });

  test('navigation to Contact should work via the hero CTA', async ({ page }) => {
    await page.goto('/en');

    await page.getByRole('link', { name: /Let’s talk/i }).click();
    await expect(page).toHaveURL(/\/en\/contact\/?$/);
  });

  test('navigation to Work should work via the projects CTA', async ({ page }) => {
    await page.goto('/en');

    await page.getByRole('link', { name: /View projects/i }).click();
    await expect(page).toHaveURL(/\/en\/portfolio\/?$/);
  });

  test('Company nav dropdown links to the About page', async ({ page }) => {
    await page.goto('/en');

    const companyButton = page.getByRole('button', { name: 'Company' });
    await expect(companyButton.locator('xpath=ancestor::astro-island')).not.toHaveAttribute('ssr', '');
    await companyButton.hover();

    const aboutLink = page.getByRole('menuitem', { name: /About/i });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute('href', '/en/about');
  });
});
