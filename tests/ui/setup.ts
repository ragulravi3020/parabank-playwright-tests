import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';
import * as fs from 'fs';

export const test = base.extend({
  async page({ page }, use) {
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);

    let username: string;
    let password: string;

    try {
      const userData = JSON.parse(fs.readFileSync('test-data/user.json', 'utf-8'));
      username = userData.username;
      password = userData.password;
    } catch (error) {
      console.warn('⚠️ No stored user found. A new user will be created.');
      username = '';
      password = '';
    }

    await page.goto('https://parabank.parasoft.com/');

    const loginFailed = await loginPage.login(username, password);

    if (loginFailed) {
      console.warn('❌ Login failed. Registering a new user.');

      username = `user_${Date.now()}`;
      password = 'Test@1234';

      await registrationPage.register({
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        phoneNumber: '1234567890',
        ssn: '123-45-6789',
        username,
        password,
      });

      fs.writeFileSync('test-data/user.json', JSON.stringify({ username, password }), 'utf-8');

      await loginPage.logout();

      const retryLoginFailed = await loginPage.login(username, password);

      if (retryLoginFailed) {
        throw new Error(`🚨 Login failed again even after registering a new user: ${username}`);
      }
    }

    await use(page);
  }
});

export { expect };
