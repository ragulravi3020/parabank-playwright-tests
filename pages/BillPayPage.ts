import { Page, Locator, expect } from '@playwright/test';

export class BillPayPage {
  readonly page: Page;
  readonly billPayLink: Locator;
  readonly payeeNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly accountNumberInput: Locator;
  readonly verifyAccountInput: Locator;
  readonly amountInput: Locator;
  readonly fromAccountDropdown: Locator;
  readonly sendPaymentButton: Locator;
  readonly successMessage: Locator;
  readonly successPayee: Locator;
  readonly successAmount: Locator;
  readonly successFromAccount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.addressInput = page.locator('input[name="payee.address.street"]');
    this.cityInput = page.locator('input[name="payee.address.city"]');
    this.stateInput = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.phoneNumberInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.fromAccountDropdown = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });

    this.successMessage = page.locator('#billpayResult h1.title');
    this.successPayee = page.locator('#payeeName');
    this.successAmount = page.locator('#amount');
    this.successFromAccount = page.locator('#fromAccountId');
  }

  async open() {
    await this.billPayLink.click();
  }

  async payBill(fromAccount: string, amount: number) {
    await this.payeeNameInput.fill('John Doe');
    await this.addressInput.fill('123 Main St');
    await this.cityInput.fill('New York');
    await this.stateInput.fill('NY');
    await this.zipCodeInput.fill('10001');
    await this.phoneNumberInput.fill('1234567890');

    await this.accountNumberInput.fill(fromAccount);
    await this.verifyAccountInput.fill(fromAccount);

    await this.amountInput.fill(amount.toFixed(2));

    await this.fromAccountDropdown.selectOption(fromAccount);

    await this.sendPaymentButton.click();
  }

  async verifyPaymentSuccess(amount: number, fromAccount: string) {
    await expect(this.successMessage).toHaveText('Bill Payment Complete');
    await expect(this.successAmount).toHaveText(`$${amount.toFixed(2)}`);
    await expect(this.successFromAccount).toHaveText(fromAccount);
  }
}
