import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and show the main title', async ({ page }) => {
    await page.goto('/en');
    const brandName = page.getByText(/Cooper/i).first();
    await expect(brandName).toBeVisible();
    await expect(page.getByText(/Ship Faster with/i)).toBeVisible();
    await expect(page.locator('[data-hero-variant="centered"]')).toBeVisible();
  });

  test('navigation to Docs should work via Get Started button', async ({ page }) => {
    await page.goto('/en');
    const getStartedBtn = page.getByRole('link', { name: /Get Started/i }).first();
    await getStartedBtn.click();
    await expect(page).toHaveURL(/\/docs/);
  });

  test('search palette should open when clicking the search button', async ({ page }) => {
    await page.goto('/en');
    
    // Wait for hydration
    await page.waitForTimeout(2000);
    
    // 1. Click search button
    const searchBtn = page.getByRole('button', { name: /Search.../i });
    await searchBtn.click();
    
    // 2. Check if search input is visible
    const input = page.getByPlaceholder(/Search.../i);
    await expect(input).toBeVisible({ timeout: 10000 });
  });

  test('Demos nav dropdown links to the split hero demo page', async ({ page }) => {
    await page.goto('/en');
    const demosButton = page.getByRole('button', { name: /Demos/i });
    await expect(demosButton).toBeVisible({ timeout: 10000 }); // wait for DesktopNav hydration (client:only="react")
    await demosButton.click();
    const splitLink = page.getByRole('menuitem', { name: /Home Split/i });
    await expect(splitLink).toBeVisible();
    await expect(splitLink).toHaveAttribute('href', '/demo/home-split');
  });
});

test.describe('Hero variant demo pages', () => {
  const variants = ['centered', 'split', 'cinematic', 'terminal'];

  for (const variant of variants) {
    test(`/demo/home-${variant} renders the ${variant} hero variant`, async ({ page }) => {
      await page.goto(`/demo/home-${variant}`);
      await expect(page.locator(`[data-hero-variant="${variant}"]`)).toBeVisible();
    });
  }
});
