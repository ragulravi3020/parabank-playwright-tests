import { Locator, Page, expect } from '@playwright/test';

export class FindTransactionsPage {
  private readonly page: Page;
  private readonly amountInput: Locator;
  private readonly findByAmountButton: Locator;
  private readonly transactionResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');
    this.transactionResults = page.locator('#transactionTable tbody tr');
  }

  async open() {
    await this.page.goto('/findtrans.htm');
  }

  async searchByAmount(amount: number) {
    await this.amountInput.fill(amount.toFixed(2));
    await this.findByAmountButton.click();
  }

  async verifyTransactionExists(amount: number) {
    await expect(this.transactionResults).toContainText(amount.toFixed(2));
  }
}
