const { test, expect } = require("@playwright/test");
// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 10000 });



test("attempting a failed log-in for netflix", async ({ page }) => {

  // navigate to netflix.com
  await page.goto('https://www.netflix.com/');
  await page.screenshot({ path: 'screenshots/pageOpen.png' });

  // Click a:has-text("Sign In")
  await page.locator('a:has-text("Sign In")').click();
  await expect(page).toHaveURL('https://www.netflix.com/login');
  await expect(page.locator('[data-uia=login-page-title]')).toHaveText("Sign In");
  await page.screenshot({ path: 'screenshots/emptyInputBoxes.png' });

  // Click text=Email or phone number
  // Check the email/phone number input box is empty
  await page.locator('text=Email or phone number').click();
  await expect(page.locator('input[name="userLoginId"]')).toBeEmpty();

  // Fill input[name="userLoginId"]
  // Confirming automated text entered correctly
  await page.locator('input[name="userLoginId"]').fill('wrongEmail@dontLogMeIn.com');
  await expect(page.locator('input[name="userLoginId"]')).toHaveValue('wrongEmail@dontLogMeIn.com');

  // Click input[name="password"]
  // Confirming password input form is empty
  await page.locator('input[name="password"]').click();
  await expect(page.locator('input[name="password"]')).toBeEmpty();

  // Fill input[name="password"]
  // Confirming automated text entered correctly
  await page.locator('input[name="password"]').fill('WrongPasswordDoNotLogMeIn');
  await expect(page.locator('input[name="password"]')).toHaveValue('WrongPasswordDoNotLogMeIn');
  await page.screenshot({path: 'screenshots/passwordInput.png'})


  // Click button:has-text("Sign In")
  // Want to be sure we are on desired page before clicking "Sign In"
  await Promise.all([
    page.waitForNavigation({ url: 'https://www.netflix.com/login' }),
    page.locator('button:has-text("Sign In")').click()
  ]);

  // Confirms the failed log in attempt. Prompts user to create account.
  await expect(page.locator('[data-uia=text]')).toHaveText("Sorry, we can't find an account with this email address. Please try again or create a new account.")
  await page.screenshot({ path: 'screenshots/failedLoginMessage.png' });

  // take user to create new account once incorrect information has been submitted
  await page.locator('text=create a new account').click();
  await expect(page).toHaveURL('https://www.netflix.com');

});