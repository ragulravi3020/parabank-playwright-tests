# Playwright E2E Test Automation Framework for Para Bank

## **Project Overview**
This repository contains an **End-to-End (E2E) test automation framework** using **Playwright** for testing the [Para Bank Application](https://parabank.parasoft.com/).  
It covers both **UI and API test scenarios** to ensure robust validation of key banking functionalities.

---

## **1️⃣ UI Test Scenarios**
The framework automates the following UI test cases:

1. **Navigate to Para Bank application**.
2. **User Registration**:  
   - Create a new user with a **randomly generated unique username** during each test execution.
3. **User Login**:  
   - Login using the newly created user.
4. **Validate Global Navigation Menu** on the Home Page.
5. **Create a Savings Account** from the “Open New Account” page and capture the account number.
6. **Validate Account Overview Page**:  
   - Ensure the newly created account appears with the correct balance details.
7. **Transfer Funds**:  
   - Transfer funds from the **newly created account** to another account.
8. **Bill Payment**:  
   - Pay a bill using the **same newly created account**.
9. **Assertions**:  
   - Each test step contains necessary **assertions** to validate UI elements and data.

---

## **2️⃣ API Test Scenarios**
The framework also includes API test automation for verifying transaction history:

1. **Find Transactions API**:  
   - Use the **"Find Transactions" API** to search transactions by amount (from the bill payment in step 8).
   - Validate the JSON response for **correct transaction details**.

---

## **3️⃣ Project Structure**
📦 para-bank-test-framework
 ┣ 📂 pages               # Page Object Model (POM) classes
 ┃ ┣ 📜 LoginPage.ts
 ┃ ┣ 📜 OpenAccountPage.ts
 ┃ ┣ 📜 AccountsOverviewPage.ts
 ┃ ┣ 📜 AccountDetailsPage.ts
 ┃ ┣ 📜 TransferFundsPage.ts
 ┃ ┣ 📜 BillPayPage.ts
 ┃ ┣ 📜 HomePage.ts
 ┃ ┣ 📜 FindTransactionsPage.ts
 ┃ ┣ 📜 RegisterationPage.ts
 ┣ 📂 tests/📂 ui              # Test case files
 ┃ ┣ 📜 account.spec.ts   
 ┃ ┣ 📜 create-user.spec.ts       
 ┃ ┣ 📜 global-nav.spec.ts       
 ┃ ┣ 📜 login.spec.ts
 ┃ ┣ 📜 setup.ts            # Auto-login & test setup       
 ┣ 📂 utils               # Utility functions (if any)
 ┣ 📜 playwright.config.ts # Playwright configuration
 
 ┣ 📜 README.md           # Project documentation

---

## **4️⃣ Setup & Installation**
### **Prerequisites**
- Install **Node.js** (Latest LTS version recommended)
- Install **Playwright** and dependencies

### **Installation Steps**
1. Clone the repository:
   \`\`\`
   git clone https://github.com/ragulravi3020/parabank-playwright-tests.git
   cd para-bank-test-framework
   \`\`\`
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Install Playwright Browsers:
   \`\`\`
   npx playwright install
   \`\`\`

---

## **5️⃣ Running the Tests**
### **Run All Tests**
\`\`\`
npx playwright test
\`\`\`

### **Run UI Tests Only**
\`\`\`
npx playwright test tests/account.spec.ts
\`\`\`

### **Run Tests in Headed Mode (with UI)**
\`\`\`
npx playwright test --headed
\`\`\`

### **Run Tests with HTML Report**
\`\`\`
npx playwright test --reporter=html
\`\`\`
After execution, open the report:
\`\`\`
npx playwright show-report
\`\`\`

---

## **6️⃣ CICD Integration (Optional)**
This framework can be **integrated with Jenkins** to trigger test execution from a pipeline.

### **Steps for Jenkins Integration**
1. **Install Jenkins & Required Plugins**:
   - Install **Node.js** and **Playwright** on the Jenkins machine.
2. **Configure a Jenkins Job**:
   - Set up a **Pipeline Job**.
   - Use the following script to execute tests:
     \`\`\`
     npm install
     npx playwright install
     npx playwright test
     \`\`\`
3. **Enable Report Generation**:
   - Add \`npx playwright test --reporter=html\` to generate a test report.

---

## **7️⃣ Best Practices Followed**
✅ **Modular Page Object Model (POM)** for reusability.  
✅ **Randomized Test Data** to ensure test independence.  
✅ **Assertions at every step** to validate expected behavior.  
✅ **Configurable & Scalable** for future test additions.  
✅ **Readable & Maintainable Code Structure**.  

---

## **8️⃣ Contributing**
1. **Fork the repository**.
2. **Create a feature branch** (\`feature/new-test-case\`).
3. **Commit your changes** and push to GitHub.
4. **Create a Pull Request** for review.

---

## **9️⃣ Contact**
For any queries or enhancements, reach out via:
- **Email**: ragulravi3020@gmail.com
- **GitHub Issues**: [Open an issue](https://github.com/ragulravi3020/parabank-playwright-tests/issues)

🚀 **Happy Testing with Playwright!** 🎭
