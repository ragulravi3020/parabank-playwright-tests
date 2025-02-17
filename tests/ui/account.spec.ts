import { test, expect } from './setup';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { AccountsOverviewPage } from '../../pages/AccountsOverviewPage';
import { AccountDetailsPage } from '../../pages/AccountDetailsPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { BillPayPage } from '../../pages/BillPayPage';
import { XMLParser } from 'fast-xml-parser';

test('Open an account, transfer funds, pay a bill, and verify transaction via API (XML response)', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const accountsOverviewPage = new AccountsOverviewPage(page);
  const accountDetailsPage = new AccountDetailsPage(page);
  const transferFundsPage = new TransferFundsPage(page);
  const billPayPage = new BillPayPage(page);
  const xmlParser = new XMLParser();

  await openAccountPage.open();
  const fromAccount = await openAccountPage.openSavingsAccount();
  expect(fromAccount).not.toBeNull();

  await accountsOverviewPage.open();
  await expect(accountsOverviewPage.getAccountLocator(fromAccount).first()).toBeVisible();

  await accountsOverviewPage.clickAccount(fromAccount);
  await accountDetailsPage.validateAccountDetails(fromAccount, 'SAVINGS', '$100.00', '$100.00');

  await openAccountPage.open();
  const toAccount = await openAccountPage.openSavingsAccount();
  expect(toAccount).not.toBeNull();
  expect(toAccount).not.toBe(fromAccount);

  await transferFundsPage.open();
  const transferAmount = (Math.random() * 90 + 10).toFixed(2); // Random between $10.00 and $100.00
  await transferFundsPage.transferFunds(parseFloat(transferAmount), fromAccount, toAccount);
  await transferFundsPage.verifyTransferSuccess(parseFloat(transferAmount), fromAccount, toAccount);

  await billPayPage.open();
  const billAmount = (Math.random() * 50 + 5).toFixed(2); // Random between $5.00 and $50.00
  const billDescription = `Bill Payment to John Doe`; // Adjust based on actual format
  await billPayPage.payBill(fromAccount, parseFloat(billAmount));
  await billPayPage.verifyPaymentSuccess(parseFloat(billAmount), fromAccount);

  const apiUrl = `https://parabank.parasoft.com/parabank/services/bank/accounts/${fromAccount}/transactions/amount/${billAmount}`;

  const response = await page.request.get(apiUrl);
  expect(response.ok()).toBeTruthy();

  const xmlResponse = await response.text();
  const jsonResponse = xmlParser.parse(xmlResponse);

  expect(jsonResponse).toHaveProperty('transactions');
  expect(jsonResponse.transactions).toHaveProperty('transaction');

  const transactions = jsonResponse.transactions.transaction;

// ✅ Ensure at least one transaction matches expected details
  const transactionMatch = transactions.some((transaction: any) => 
    String(transaction.accountId) === fromAccount &&
    transaction.type === 'Debit' &&
    Number(transaction.amount).toFixed(2) === Number(billAmount).toFixed(2) &&
    transaction.description === billDescription
  );

expect(transactionMatch).toBeTruthy();  
});
