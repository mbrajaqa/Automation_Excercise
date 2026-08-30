const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.automationexercise.com/';

        //Locators
        this.homePageLink = page.locator('#header');
        this.signupOrLoginLink = page.getByRole('link', { name: ' Signup / Login' });
        this.loggedInAsUser = page.getByText('Logged in as ');
        this.deleteLink = page.getByRole('link', { name: 'Delete Account' });
        this.logoutLink = page.getByText('Logout');
        this.contactUsLink = page.getByText('Contact us');
        this.testCasesLink = page.getByRole('link', { name :  'Test Cases' }).first();
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.cartLink = page.getByText('Cart', { exact: true });

        this.products = page.locator('div.single-products');
        this.viewProductLink = page.getByRole('link', {name: 'View Product'});
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
        this.continueShoppingButton = page.getByText('Continue Shopping');

        this.subscriptionHeading = page.getByRole('heading', { name: 'Subscription' });
        this.subscriptionEmailBox = page.getByPlaceholder('Your email address');
        this.subscriptionButton = page.locator('#subscribe');
        this.subscribeSuccess = page.getByText('You have been successfully subscribed!');

        //Values
        this.homePageLinkText = 'Home';
        
        
    };

    async openHomePage (){
        await this.page.goto(this.url);

        //await this.page.goto(this.url);
        //await this.page.waitForLoadState('networkidle');
        await this.verifyHomePageIsDisplayed();

    };

    async verifyHomePageIsDisplayed() {
        
        await expect(this.page).toHaveURL(/automationexercise\.com/);
    };

    async verifyTheHomeLinkIsPresent(){

        await expect(this.homePageLink).toContainText(this.homePageLinkText);
    };
    
    async clickOnSignupOrLoginLink(){

        await this.signupOrLoginLink.click();
        //await this.page.waitForLoadState('networkidle');
    };

    async clickOnTestCasesLink(){
        await this.testCasesLink.click();
    };

    async clickOnProductsLink(){
        await this.productsLink.click();
    };

    async clickOnCartLink(){
        await this.cartLink.click();
    };

    async verifyUserNameInHomePage(name){

        await expect(this.loggedInAsUser).toContainText(name);
    };

    async deleteAccount(){
        
        await this.deleteLink.click();
        //await this.page.waitForLoadState('networkidle');
    };

    async logout(){
        await this.logoutLink.click();
        //await this.page.waitForLoadState('networkidle');
    };

    async contactUs() {
        await this.contactUsLink.click();
    };

    async addProductToCartByIndex(index){

        const product = this.products.nth(index);
        await product.hover();
        await product.locator('.product-overlay a.add-to-cart').click();
    };

    async clickOnViewProduct(index){
        await this.viewProductLink.nth(index).click();
    };

    async clickOnViewCart(){
        await this.viewCartLink.click();
    };

    async clickOnContinueShopping(){
        await this.continueShoppingButton.click();
    }

    async verifySubscriptionHeadingIsDisplayed(){

        await expect(this.subscriptionHeading).toBeVisible();
        
    };

    async subscribe (email){

        await this.subscriptionEmailBox.fill(email);
        await this.subscriptionButton.click();
        
    };

    async verifySubscribeSuccessMessageIsDisplayed(){
        await expect(this.subscribeSuccess).toBeVisible();
    };


};

module.exports = { HomePage };