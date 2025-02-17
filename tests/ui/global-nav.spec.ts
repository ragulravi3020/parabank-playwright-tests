import { test, expect } from './setup';
import { HomePage } from '../../pages/HomePage';

test('Verify Global Navigation Menu', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.verifyNavigation('About Us', 'about.htm', 'h1.title', 'ParaSoft Demo Website');
  await expect(page).toHaveURL(/about\.htm/);
  
  await homePage.verifyNavigation('Services', 'services.htm', 'span.heading', 'Available Bookstore SOAP services:');
  await expect(page).toHaveURL(/services\.htm/);
  
  await homePage.verifyExternalNavigation('Products', 'https://www.parasoft.com/products/');
  await homePage.verifyExternalNavigation('Locations', 'https://www.parasoft.com/solutions/');
  
  await homePage.verifyNavigation('Admin Page', 'admin.htm', 'h1.title', 'Administration');
  await expect(page).toHaveURL(/admin\.htm/);
});

