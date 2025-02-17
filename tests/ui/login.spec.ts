import { test, expect } from './setup'; 
import * as fs from 'fs';

test('Verify user can log in successfully', async ({ page }) => {
  // Read stored username
  const userData = JSON.parse(fs.readFileSync('test-data/user.json', 'utf-8'));
  const expectedUsername = userData.username;

  const welcomeMessage = page.locator('p.smallText');

  await expect(welcomeMessage).toBeVisible();
  await expect(welcomeMessage).toContainText(`Welcome ${expectedUsername}`);
});
