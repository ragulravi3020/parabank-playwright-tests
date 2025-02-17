import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import * as fs from 'fs';

test('User Registration and Save Credentials', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await page.goto('https://parabank.parasoft.com/');

  await page.getByRole('link', { name: 'Register' }).click();

  const uniqueUsername = `user_${Date.now()}`;
  const password = 'Test@1234';
  const firstName = 'John';
  const lastName = 'Doe';

  await registrationPage.register({
    firstName,
    lastName,
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phoneNumber: '1234567890',
    ssn: '123-45-6789',
    username: uniqueUsername,
    password,
  });

  await expect(page.locator('h1.title')).toHaveText(`Welcome ${uniqueUsername}`);
  await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();

  fs.writeFileSync('test-data/user.json', JSON.stringify({ username: uniqueUsername, password }), 'utf-8');
});
