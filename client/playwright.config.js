import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // ✅ Only run tests inside this folder
  fullyParallel: true,
  retries: 1,
  reporter: [['list'], ['html']],
  use: {
    baseURL: 'https://project216.netlify.app/', // optional if testing deployed site
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
