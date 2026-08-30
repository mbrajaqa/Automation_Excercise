const { expect } = require ('@playwright/test');

class PaymentDonePage {

    constructor (page){

        this.page = page;

        //Heading Locator
        this.orderPlacedHeading     = page.getByRole('heading',{name:'Order Placed!'});

        //Order Placed Message Locator
        this.orderPlacedMessage     = page.getByText('Congratulations! Your order has been confirmed!', { exact: true });

        //Buttons Locators
        this.downloadInvoiceLink    = page.getByRole('link', { name: 'Download Invoice' });
        this.continueLink           = page.getByTestId('continue-button');

    };

    async verifyPaymentDonePageIsDisplayed(){
        await expect(this.orderPlacedHeading).toBeVisible();
        await expect(this.orderPlacedMessage).toBeVisible();
    };

    async clickOnDownloadInvoice(){
        await this.verifyPaymentDonePageIsDisplayed();
        await this.downloadInvoiceLink.click();
    };

    async clickOnContinue(){
        await this.verifyPaymentDonePageIsDisplayed();
        await this.continueLink.click();
    }


};

module.exports = {PaymentDonePage};