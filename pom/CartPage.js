const { expect } = require ('@playwright/test');

class CartPage {

    constructor(page){

        this.page = page;


        //Cart Info Table Locators
        this.cartTable = page.getByRole('table');

        this.tableHead = this.cartTable.locator('thead');
        this.tableBody = this.cartTable.locator('tbody');

        this.dataRows  = this.tableBody.locator('tr');

        this.itemDescription = this.dataRows.locator('td.cart_description');
        this.itemPrice = this.dataRows.locator('td.cart_price');
        this.itemQuantity = this.dataRows.locator('td.cart_quantity');
        this.itemTotalPrice = this.dataRows.locator('td.cart_total');
        this.itemDelete = this.dataRows.locator('td.cart_delete');

        this.itemName = this.itemDescription.getByRole('link');
        this.itemCategory = this.itemDescription.locator('p');




        this.subscriptionHeading = page.getByRole('heading', { name: 'Subscription' });
        this.subscribeEmail = page.getByPlaceholder('Your email address');
        this.subcribeButton = page.locator('#subscribe');
        this.subcribeSuccessMessage = page.getByText('You have been successfully subscribed!');
    };

    async verifySubscriptionHeadingIsDisplayed(){

        await expect(this.subscriptionHeading).toBeVisible();
        
    };

    async subscribe (email){

        await this.subscribeEmail.fill(email);
        await this.subcribeButton.click();
        
    };

    async verifySubscribeSuccessMessageIsDisplayed(){
        await expect(this.subcribeSuccessMessage).toBeVisible();
    };

    async verifyProductName(index, productName){
        await expect(this.itemName.nth(index)).toHaveText(productName);

    };

    async verifyProductCategory(index, productcategory){
        await expect(this.itemCategory.nth(index)).toHaveText(productcategory);
    };

    async verifyProductQuanity(index, productQuantity){
        await expect(this.itemQuantity.nth(index)).toHaveText(productQuantity);
    };

    async verifyProductPrice(index, productPrice){
        await expect(this.itemPrice.nth(index)).toHaveText(productPrice);
    };

    async verifyProductTotalPrice(index, productTotalPrice){
        await expect(this.itemTotalPrice.nth(index)).toHaveText(productTotalPrice);
    }

    async verifyProductDetailsDisplayed (index, productName, productCategory, productQuantity, productPrice){
        await this.verifyProductName(index, productName);
        await this.verifyProductCategory(index, productCategory);
        await this.verifyProductQuanity(index, productQuantity);
        await this.verifyProductPrice(index, productPrice);

        const quantity = Number(productQuantity);
        const price = Number(productPrice.replace(/[^\d]/g, ''));
        const totalPrice = `Rs. ${quantity * price}`

        await this.verifyProductTotalPrice(index, totalPrice);
    };


};

module.exports = {CartPage};