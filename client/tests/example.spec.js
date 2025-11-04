import { test, expect } from '@playwright/test';

test.describe('Home Page - Drink IT', () => {

  // Load homepage and check title
  test('should load the home page and have correct title', async ({ page }) => {
    await page.goto('https://project216.netlify.app/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Receptsida/i, { timeout: 10000 });
  });

  // Check main headings
  test('should display main headings', async ({ page }) => {
    await page.goto('https://project216.netlify.app/');
    await page.waitForLoadState('networkidle');

    const headingH2 = page.locator('h2', { hasText: /Uppfriskande Recept/i });
    const headingH3 = page.locator('h3', { hasText: /Drink IT/i });

    await headingH2.first().waitFor({ state: 'visible', timeout: 10000 });
    await headingH3.first().waitFor({ state: 'visible', timeout: 10000 });

    await expect(headingH2.first()).toBeVisible();
    await expect(headingH3.first()).toBeVisible();
  });

  // ✅ Fixed navigation links
  test('should display navigation links', async ({ page }) => {
    await page.goto('https://project216.netlify.app/');
    await page.waitForLoadState('networkidle');

    const navLinks = [
      { text: 'Hem', url: '/' },
      { text: 'Kategori', url: '/category/Alla' }, // <-- Fixed here
      { text: 'Om', url: '/about' },
      { text: 'Kontakt', url: '/contact' }
    ];

    for (const link of navLinks) {
      const locator = page.locator('a', { hasText: new RegExp(link.text, 'i') });
      await locator.first().waitFor({ state: 'visible', timeout: 10000 });
      await expect(locator.first()).toHaveAttribute('href', link.url);
    }
  });

  // Check recipe cards
  test('should display recipe cards', async ({ page }) => {
    await page.goto('https://project216.netlify.app/');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('.recipe-card');
    await cards.first().waitFor({ state: 'visible', timeout: 10000 });

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Optional: verify first recipe card title
    const firstCardTitle = cards.first().locator('h1');
    await firstCardTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(firstCardTitle).toHaveText(/Aperol Spritz/i);
  });

  // Check search box and button
  test('should display search box and button', async ({ page }) => {
    await page.goto('https://project216.netlify.app/');
    await page.waitForLoadState('networkidle');

    const searchBox = page.locator('input[placeholder="Sök efter ett recept..."]');
    const searchButton = page.locator('button', { hasText: /🔍/i });

    await searchBox.first().waitFor({ state: 'visible', timeout: 10000 });
    await searchButton.first().waitFor({ state: 'visible', timeout: 10000 });

    await expect(searchBox.first()).toBeVisible();
    await expect(searchButton.first()).toBeVisible();
  });

  // Check footer buttons and copyright
  test('should display footer buttons and copyright', async ({ page }) => {
    await page.goto('https://project216.netlify.app/');
    await page.waitForLoadState('networkidle');

    const footerButtons = ['Om oss', 'Kontakt', 'Sociala Medier'];
    for (const text of footerButtons) {
      const button = page.locator('button', { hasText: new RegExp(text, 'i') });
      await button.first().waitFor({ state: 'visible', timeout: 10000 });
      await expect(button.first()).toBeVisible();
    }

    const copyright = page.locator('footer p');
    await copyright.first().waitFor({ state: 'visible', timeout: 10000 });
    await expect(copyright.first()).toHaveText(/© 2025 Receptsida/i);
  });

});
