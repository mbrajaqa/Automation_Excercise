const { test } = require ('@playwright/test');

const { HomePage } = require ('../pom/HomePage');
const { CartPage } = require ('../pom/CartPage');
const { LoginPage } = require ('../pom/LoginPage');
const { SignUpPage } = require ('../pom/SignUpPage');
const { AccountCreatedPage } = require ('../pom/AccountCreatedPage');
const { AccountDeletedPage } = require ('../pom/AccountDeletedPage');
const { CheckOutPage } = require ('../pom/CheckOutPage');
const { PaymentPage } = require ('../pom/PaymentPage');
const { PaymentDonePage } = require ('../pom/PaymentDonePage');

const productDetails = require ('../.lib/data/productDetails.json');

test ( 'Place Order: Register before Checkout', async ({page}) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignUpPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const accountDeletedPage = new AccountDeletedPage(page);
    const checkOutPage = new CheckOutPage(page);
    const paymentPage = new PaymentPage(page);
    const paymentDonePage = new PaymentDonePage(page);

    const productIndex = 0;

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await homePage.openHomePage();

    // 3. Verify that home page is visible successfully
    await homePage.verifyHomePageIsDisplayed();

    // 4. Click 'Signup / Login' button
    await homePage.clickOnSignupOrLoginLink();

    // 5. Fill all details in Signup and create account
    await loginPage.signup('TestUser', `TestUser${Date.now()}@gmail.com`);
    await signupPage.selectTitle('Mr.');
    await signupPage.enterPassword('12345');
    await signupPage.selectDate('10');
    await signupPage.selectMonth('8');
    await signupPage.selectYear('2016');
    await signupPage.checkNewsLetterCheckbox();
    await signupPage.checkSpecialOfferCheckbox();
    await signupPage.enterFirstName('Test');
    await signupPage.enterlastName('User');
    await signupPage.enterCompany('Test Company');
    await signupPage.enterAddress('Test Street');
    await signupPage.enterAddress2('Test City');
    await signupPage.enterState('Test Nadu');
    await signupPage.enterCity('Test City');
    await signupPage.enterZipCode('123456');
    await signupPage.enterMobileNumber('1234567890');
    await signupPage.createAccount();

    // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinueButton();

    // 7. Verify ' Logged in as username' at top
    await homePage.verifyUserNameInHomePage('TestUser');

    // 8. Add products to cart
    await homePage.addProductToCartByIndex(productIndex);

    // 9. Click 'Cart' button
    await homePage.clickOnViewCart();

    // 10. Verify that cart page is displayed
    await cartPage.verifyCartPageIsDisplayed();

    // 11. Click Proceed To Checkout
    await cartPage.clickOnProceedToCheckOut();

    // 12. Verify Address Details and Review Your Order
    await checkOutPage.verifyDeliveryAddress(
        'Mr.',
        'Test',
        'User',
        'Test Company',
        'Test Street',
        'Test City',
        'Test Nadu',
        '123456',
        'India',
        '1234567890'
    );
    await checkOutPage.VerifyBillingAddress(
        'Mr.',
        'Test',
        'User',
        'Test Company',
        'Test Street',
        'Test City',
        'Test Nadu',
        '123456',
        'India',
        '1234567890'
    );

    await checkOutPage.verifyProductDetailsDisplayed(
        productIndex,
        productDetails.data[productIndex].productName,
        productDetails.data[productIndex].category,
        '1',
        productDetails.data[productIndex].price
    );


    // 13. Enter description in comment text area and click 'Place Order'
    await checkOutPage.updateComment("Hi");
    await checkOutPage.clickOnPlaceOrderLink();

    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await paymentPage.enterPaymentDetails(
        'Test User',
        '1234567890',
        '123',
        '12',
        '2050'
    );

    // 15. Click 'Pay and Confirm Order' button
    await paymentPage.clickOnPayAndConfirmOrder();

    // 16. Verify success message 'Your order has been placed successfully!'
    await paymentDonePage.clickOnContinue();

    // 17. Click 'Delete Account' button
    await homePage.verifyUserNameInHomePage('TestUser');
    await homePage.deleteAccount();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await accountDeletedPage.verifyAccountDeleted();
    await accountDeletedPage.clickContinueButton();

    await homePage.verifyHomePageIsDisplayed();

    
    
    //await cartPage.clickOnRegisterOrLoginLink();
    // await homePage.clickOnCartLink();
    // await cartPage.clickOnProceedToCheckOut();

});