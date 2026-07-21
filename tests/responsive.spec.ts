import { test, expect } from '@playwright/test';

test.describe('Responsive', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should show mobile menu and navigate to Work', async ({ page }) => {
    await page.goto('/en');

    const mobileMenuButton = page.getByRole('button', { name: 'Open Mobile Menu' });
    await expect(mobileMenuButton.locator('xpath=ancestor::astro-island')).not.toHaveAttribute('ssr', '');
    await mobileMenuButton.click();

    const menuPanel = page.getByRole('dialog', { name: 'Mobile Navigation' });
    await expect(menuPanel).toBeVisible();
    await menuPanel.getByRole('link', { name: 'Work' }).click();

    await expect(page).toHaveURL(/\/en\/portfolio\/?$/);
  });
});
