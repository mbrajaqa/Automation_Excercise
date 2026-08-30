const { expect } = require ('@playwright/test');

class CheckOutPage {

    constructor(page){

        this.page = page;

        //Headings Locators
        this.checkOutHeading = page.getByText('Checkout', { exact: true })
        this.addressDetailHeading = page.getByRole('heading', { name: 'Address Details' });
        this.reviewYourOrderHeading = page.getByRole('heading', { name: 'Review Your Order' });

        //Address Locators
        this.deliveryAddress = page.locator('#address_delivery');
        this.deliveryAddressHeading = this.deliveryAddress.locator('.page-subheading');
        this.deliveryAddressFirstNameAndLastName = this.deliveryAddress.locator('.address_firstname.address_lastname');
        this.deliveryAddressCompany = this.deliveryAddress.locator('.address_address1.address_address2').nth(0);
        this.deliveryAddressStreet = this.deliveryAddress.locator('.address_address1.address_address2').nth(1);
        this.deliveryAddressCity1 = this.deliveryAddress.locator('.address_address1.address_address2').nth(2);
        this.delievryAddressCity2 = this.deliveryAddress.locator('.address_city');
        this.delievryAddressState  = this.deliveryAddress.locator('.address_state_name');
        this.delievryAddressPostCode = this.deliveryAddress.locator('.address_postcode');
        this.deliveryAddressCountry = this.deliveryAddress.locator('.address_country_name');
        this.deliveryAddressPhoneNumber = this.deliveryAddress.locator('.address_phone');

        this.billingAddress = page.locator('#address_invoice');
        this.billingAddressHeading = this.billingAddress.locator('.page-subheading');
        this.billingAddressFirstNameAndLastName = this.billingAddress.locator('.address_firstname.address_lastname');
        this.billingAddressCompany = this.billingAddress.locator('.address_address1.address_address2').nth(0);
        this.billingAddressStreet = this.billingAddress.locator('.address_address1.address_address2').nth(1);
        this.billingAddressCity1 = this.billingAddress.locator('.address_address1.address_address2').nth(2);
        this.billingAddressCity2 = this.billingAddress.locator('.address_city');
        this.billingAddressState  = this.billingAddress.locator('.address_state_name');
        this.billingAddressPostCode = this.billingAddress.locator('.address_postcode');
        this.billingAddressCountry = this.billingAddress.locator('.address_country_name');
        this.billingAddressPhoneNumber = this.billingAddress.locator('.address_phone');


        //Cart Table Locators
        this.cartTable = page.getByRole('table');
        this.tableHead = this.cartTable.locator('thead');
        this.tableBody = this.cartTable.locator('tbody');

        this.dataRows = this.tableBody.locator('tr');

        this.itemDescription = this.dataRows.locator('td.cart_description');
        this.itemPrice = this.dataRows.locator('td.cart_price');
        this.itemQuantity = this.dataRows.locator('td.cart_quantity');
        this.itemTotalPrice = this.dataRows.locator('td.cart_total');

        this.itemName = this.itemDescription.getByRole('link');
        this.itemCategory = this.itemDescription.locator('p');


        //Comment Box Locator
        this.commectBox = page.locator('textarea[name="message"]');

        //Place Order Link Locator
        this.placeOrderLink = page.getByRole('link', { name: 'Place Order' });
    };

    async verifyCheckOutPageIsDisplayed(){
        await expect(this.checkOutHeading).toBeVisible();
        await expect(this.addressDetailHeading).toBeVisible();
        await expect(this.reviewYourOrderHeading).toBeVisible();
    };

    async verifyDeliveryAddress(gender, firstName, lastName, company, street, city, state, postCode, country, phoneNumber){
        await expect(this.deliveryAddressHeading).toBeVisible();
        await expect(this.deliveryAddressFirstNameAndLastName).toHaveText(gender+" "+firstName+" "+lastName);
        await expect(this.deliveryAddressCompany).toHaveText(company);
        await expect(this.deliveryAddressStreet).toHaveText(street);
        await expect(this.deliveryAddressCity1).toHaveText(city);
        await expect(this.deliveryAddressCity1).toHaveText(city);
        await expect(this.delievryAddressState).toContainText(state);
        await expect(this.delievryAddressPostCode).toContainText(postCode);
        await expect(this.deliveryAddressCountry).toContainText(country);
        await expect(this.deliveryAddressPhoneNumber).toHaveText(phoneNumber);

    };

    async VerifyBillingAddress(gender, firstName, lastName, company, street, city, state, postCode, country, phoneNumber){
        await expect(this.billingAddressHeading).toBeVisible();
        await expect(this.billingAddressFirstNameAndLastName).toHaveText(gender+" "+firstName+" "+lastName);
        await expect(this.billingAddressCompany).toHaveText(company);
        await expect(this.billingAddressStreet).toHaveText(street);
        await expect(this.billingAddressCity1).toHaveText(city);
        await expect(this.billingAddressCity1).toHaveText(city);
        await expect(this.billingAddressState).toContainText(state);
        await expect(this.billingAddressPostCode).toContainText(postCode);
        await expect(this.billingAddressCountry).toContainText(country);
        await expect(this.billingAddressPhoneNumber).toHaveText(phoneNumber);

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

    async updateComment(message){
        await this.commectBox.fill(message);
    };

    async clickOnPlaceOrderLink(){
        await this.placeOrderLink.click();
    };


};

module.exports = {CheckOutPage};