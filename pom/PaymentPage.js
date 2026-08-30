const { expect } = require ('@playwright/test');


class PaymentPage {

    constructor(page){

        this.page = page;

        //Heading Locator
        this.paymentHeading      = page.getByRole('heading',{name:'Payment'});

        //Payment Details Locators
        this.nameOnCardInputBox  = page.getByTestId('name-on-card');
        this.cardNumberInputBox  = page.getByTestId('card-number');
        this.cvcInputBox         = page.getByTestId('cvc');
        this.monthInputBox       = page.getByTestId('expiry-month');
        this.yearInputBox        = page.getByTestId('expiry-year');
        this.payAndConfirmButton = page.getByTestId('pay-button');

        //Success Message Locator
        this.successMessage      = page.locator('div.alert-success.alert').filter({hasText:'Your order has been placed successfully!'});
    };

    async verifyPaymentPageIsDisplayed(){

        await expect(this.paymentHeading).toBeVisible();

    };

    async enterNameOnCard(name){
        await this.nameOnCardInputBox.fill(name);
    };

    async enterCardNumber(cardNumber){
        await this.cardNumberInputBox.fill(cardNumber);
    };

    async enterCVC(cvc){
        await this.cvcInputBox.fill(cvc);
    };

    async enterExpiration(month, year){
        await this.monthInputBox.fill(month);
        await this.yearInputBox.fill(year);
    };

    async enterPaymentDetails(name, cardNumber, cvc, month, year){
        await this.verifyPaymentPageIsDisplayed();
        await this.enterNameOnCard(name);
        await this.enterCardNumber(cardNumber);
        await this.enterCVC(cvc);
        await this.enterExpiration(month, year);
    };

    async clickOnPayAndConfirmOrder(){
        await this.payAndConfirmButton.click();
        //await this.verifySuccessMessage();
    };

    // async verifySuccessMessage(){
    //     await expect(this.successMessage).toBeVisible();
    // };
};

module.exports = {PaymentPage};