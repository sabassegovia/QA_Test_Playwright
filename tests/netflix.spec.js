const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });

// test("my first test", async ({ page }) => {
//   // go to Netflix.com
//   await page.goto("https://www.netflix.com");

//   // assert page title appears
//   await expect(page.locator('[data-uia="hero-title"]')).toHaveText(
//     "Unlimited movies, TV shows, and more."
//   );
// });

test("attempting a failed log-in for netflix", async ({ page }) => {
  // navigate to netflix.com
  await page.goto('https://www.netflix.com/');

  // Click a:has-text("Sign In")
  await page.locator('a:has-text("Sign In")').click();
  await expect(page).toHaveURL('https://www.netflix.com/login');

  // Click text=Email or phone number
  await page.locator('text=Email or phone number').click();

  // Fill input[name="userLoginId"]
  await page.locator('input[name="userLoginId"]').fill('wrongEmail@dontLogMeIn.com');

  // Click input[name="password"]
  await page.locator('input[name="password"]').click();

  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill('WrongPasswordDoNotLogMeIn');

  // Click button:has-text("Sign In")
  await Promise.all([
    page.waitForNavigation({ url: 'https://www.netflix.com/login' }),
    page.locator('button:has-text("Sign In")').click()
  ]);

});

// ADD YOUR TESTS HERE!
//sign in button
{/* <a href="/login" class="authLinks redButton" data-uia="header-login-link">Sign In</a> */}

// email input
{/* <input type="text" data-uia="login-field" name="userLoginId" class="nfTextField error" id="id_userLoginId" value="" tabindex="0" autocomplete="email" dir="" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=&quot;); cursor: auto;"></input> */}


//passwowd
{/* <input type="password" data-uia="password-field" name="password" class="nfTextField error" id="id_password" value="" tabindex="0" autocomplete="password" dir="" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=&quot;); cursor: auto;"></input> */ }

//submit button
{/* <button class="btn login-button btn-submit btn-small" type="submit" autocomplete="off" tabindex="0" data-uia="login-submit-button">Sign In</button> */ }


//invalid email
{/* <button class="btn login-button btn-submit btn-small" type="submit" autocomplete="off" tabindex="0" data-uia="login-submit-button">Sign In</button> */ }

//incorrect password
{/* <div data-uia="error-message-container" class="ui-message-container ui-message-error"><div class="ui-message-icon"></div><div data-uia="text" class="ui-message-contents"><b>Incorrect password.</b> Please try again or you can <a href="/loginHelp">reset your password.</a></div></div><div data-uia="error-message-container" class="ui-message-container ui-message-error"><div class="ui-message-icon"></div><div data-uia="text" class="ui-message-contents"><b>Incorrect password.</b> Please try again or you can <a href="/loginHelp">reset your password.</a></div></div> */}