const { expect } = require ('@playwright/test');

class AccountDeletedPage {
    constructor (page) {
        this.page = page;
        this.url = 'https://www.automationexercise.com/delete_account';

        //Locators
        this.accountDeletedHeading = page.getByTestId('account-deleted');
        this.continueButton = page.getByTestId('continue-button');



        //Values
        this.accountDeletedMessage = 'Account Deleted!';
        
    };

    async verifyAccountDeleted(){

        await expect(this.accountDeletedHeading).toContainText(this.accountDeletedMessage);
    };

    async clickContinueButton(){

        await this.continueButton.click();
        
    };
};

module.exports = {AccountDeletedPage};