import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyNavigation(linkName: string, expectedUrlPart: string, contentSelector: string, expectedText: string) {
    const header = this.page.locator('#headerPanel'); // Restrict to header panel
    const navLink = header.getByRole('link', { name: linkName, exact: true });
  
    await expect(navLink).toBeVisible();
  
    await navLink.click();
  
    await expect(this.page).toHaveURL(new RegExp(expectedUrlPart));
  
    await expect(this.page.getByText(expectedText, { exact: true })).toBeVisible();
  
    await this.page.goBack();
  }
  
  

  async verifyExternalNavigation(linkName: string, expectedUrl: string) {
    const header = this.page.locator('#headerPanel'); 
    const navLink = header.getByRole('link', { name: linkName, exact: true });
  
    await Promise.all([
      this.page.waitForURL(expectedUrl, { timeout: 10000 }),
      navLink.click()
    ]);
  
    await this.page.goBack();
  }
  
  
}
