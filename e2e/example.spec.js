// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto(' http://localhost:8888/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/recipesite/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:8888/');
  

  // Click the get started link.
  await page.getByRole('link', { name: 'Logout' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
