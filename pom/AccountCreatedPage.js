const { expect } = require ('@playwright/test');

class AccountCreatedPage {
    
    constructor (page) {
        this.page = page;
        this.url = 'https://www.automationexercise.com/account_created';

        //Locators
        this.accountCreatedMsg = page.getByTestId('account-created');
        this.continueButton = page.getByTestId('continue-button');


        //Values
        this.msg = 'Account Created!';
        
    };

    async verifyAccountCreated (){
        await expect(this.accountCreatedMsg).toContainText(this.msg);
    };

    async clickContinueButton(){
        await this.continueButton.click();
        //await this.page.waitForLoadState('networkidle');
    };
};

module.exports = {AccountCreatedPage};