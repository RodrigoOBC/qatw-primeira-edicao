require('dotenv').config()

const { devices } = require('@playwright/test');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'utils', '.env') })

const config = {
  testDir: './features/tests/',
  timeout: 99000,
  expect: {
    timeout: 99000
  },
  fullyParallel: true,
  retries: parseInt(process.env.RETRIES),
  reporter: [['html', { outputFolder: 'test-results' }], ['list'], ['junit', { outputFile: 'test-results/results.xml' }]],

  use: {
    actionTimeout: 0,
    baseURL: process.env.BASE_URL,
    headless: true,
    locale: 'pt-BR'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'pt-BR'
      }
    }
  ],

  outputDir: 'test-results/',
};

module.exports = config;
