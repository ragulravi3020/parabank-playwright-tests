import { Page, Locator, expect } from '@playwright/test';

export class AccountDetailsPage {
  readonly page: Page;
  readonly accountId: Locator;
  readonly accountType: Locator;
  readonly balance: Locator;
  readonly availableBalance: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountId = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');
  }

  async validateAccountDetails(accountNumber: string, expectedType: string, expectedBalance: string, expectedAvailable: string) {
    await expect(this.accountId).toHaveText(accountNumber);
    await expect(this.accountType).toHaveText(expectedType);
    await expect(this.balance).toHaveText(expectedBalance);
    await expect(this.availableBalance).toHaveText(expectedAvailable);
  }
}
