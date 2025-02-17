import { Page, Locator, expect } from '@playwright/test';

export class AccountsOverviewPage {
  readonly page: Page;
  readonly accountsTable: Locator;
  readonly errorMessage: Locator;
  readonly overviewTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsTable = page.locator('#accountTable');
    this.errorMessage = page.locator('#rightPanel h1.title', { hasText: 'Error!' });
    this.overviewTitle = page.locator('#rightPanel h1.title', { hasText: 'Accounts Overview' });
  }

  async open() {
    await this.page.getByRole('link', { name: 'Accounts Overview' }).click();

    // Check if error message is displayed
    if (await this.errorMessage.isVisible({ timeout: 5000 })) {
      throw new Error('🚨 Failed to load Accounts Overview page! Error message detected.');
    }

    // Ensure "Accounts Overview" is displayed
    await expect(this.overviewTitle).toBeVisible({ timeout: 5000 });
  }

  getAccountLocator(accountNumber: string): Locator {
    return this.accountsTable.getByRole('link', { name: accountNumber });
  }

  async clickAccount(accountNumber: string) {
    await this.getAccountLocator(accountNumber).click();
  }
}
