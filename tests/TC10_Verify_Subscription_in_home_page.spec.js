const { test, expect } = require('@playwright/test');
const { HomePage } = require ('../pom/HomePage');

test('Verify Subscription in home page', async ({ page }) => {


  const homePage = new HomePage(page);
  const email = 'mano@gmail.com';

  await homePage.openHomePage();
  await homePage.verifyHomePageIsDisplayed();

  await homePage.verifySubscriptionHeadingIsDisplayed();
  await homePage.subscribe(email);
  await homePage.verifySubscribeSuccessMessageIsDisplayed();

});