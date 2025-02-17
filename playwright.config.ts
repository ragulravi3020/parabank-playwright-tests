import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://parabank.parasoft.com/',
    browserName: 'chromium',
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  reporter: [['html', { outputFolder: 'reports' }]],
});
