import { Page, Locator, expect } from '@playwright/test';

export class OpenAccountPage {
  readonly page: Page;
  readonly accountTypeDropdown: Locator;
  readonly fromAccountDropdown: Locator;
  readonly openAccountButton: Locator;
  readonly newAccountIdLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountTypeDropdown = page.locator('#type');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.openAccountButton = page.getByRole('button', { name: 'Open New Account' });
    this.newAccountIdLink = page.locator('#newAccountId');
  }

  async open() {
    await this.page.getByRole('link', { name: 'Open New Account' }).click();
    await expect(this.page.locator('#openAccountForm h1.title')).toHaveText('Open New Account');
  }

  async openSavingsAccount(): Promise<string> {
    await this.accountTypeDropdown.selectOption('1');

    await expect(this.fromAccountDropdown).toBeVisible();
    await this.fromAccountDropdown.selectOption({ index: 0 });

    await this.openAccountButton.click();

    const successMessage = this.page.locator('#openAccountResult h1.title');
    await expect(successMessage).toHaveText('Account Opened!');

    await expect(this.newAccountIdLink).toBeVisible();
    const newAccountNumber = await this.newAccountIdLink.textContent();

    return newAccountNumber?.trim() ?? '';
}

}
