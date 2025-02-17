import { Page, Locator, expect } from '@playwright/test';

export class TransferFundsPage {
  readonly page: Page;
  readonly transferFundsLink: Locator;
  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly toAccountDropdown: Locator;
  readonly transferButton: Locator;
  readonly successMessage: Locator;
  readonly transferredAmount: Locator;
  readonly fromAccountResult: Locator;
  readonly toAccountResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
    this.amountInput = page.locator('#amount');
    this.fromAccountDropdown = page.locator('#fromAccountId');
    this.toAccountDropdown = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.successMessage = page.locator('#showResult h1.title');
    this.transferredAmount = page.locator('#amountResult');
    this.fromAccountResult = page.locator('#fromAccountIdResult');
    this.toAccountResult = page.locator('#toAccountIdResult');
  }

  async open() {
    await this.transferFundsLink.click();
  }

  async transferFunds(amount: number, fromAccount: string, toAccount: string) {
    await this.amountInput.fill(amount.toString());
    await this.fromAccountDropdown.selectOption(fromAccount);
    await this.toAccountDropdown.selectOption(toAccount);
    await this.transferButton.click();
  }

  async verifyTransferSuccess(amount: number, fromAccount: string, toAccount: string) {
    await expect(this.successMessage).toHaveText('Transfer Complete!');
    await expect(this.transferredAmount).toHaveText(`$${amount.toFixed(2)}`);
    await expect(this.fromAccountResult).toHaveText(fromAccount);
    await expect(this.toAccountResult).toHaveText(toAccount);
  }
}
