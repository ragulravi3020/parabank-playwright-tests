import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly welcomeMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.errorMessage = page.locator('.error');
    this.welcomeMessage = page.locator('p.smallText');
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async login(username: string, password: string): Promise<boolean> {
    console.log(`🔵 Attempting login with: ${username} / ${password}`);

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    if (await this.errorMessage.isVisible({ timeout: 3000 })) {
      console.error(`❌ Login failed: ${await this.errorMessage.textContent()}`);
      return true;
    }

    try {
      await expect(this.welcomeMessage).toBeVisible({ timeout: 10000 });
      console.log('✅ Login successful');
      return false;
    } catch (error) {
      console.error('❌ Login failed: Welcome message not found');
      return true;
    }
  }

  async logout() {
    console.log('🔴 Logging out...');
    await this.logoutLink.click();

    await expect(this.usernameInput).toBeVisible({ timeout: 5000 });
    console.log('✅ Logout successful');
  }
}
