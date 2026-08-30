const { test } = require ('@playwright/test');

const { HomePage } = require ('../pom/HomePage');
const { ProductDetailsPage } = require ('../pom/ProductDetailsPage');
const { CartPage } = require ('../pom/CartPage');

const productDetails = require ('../.lib/data/productDetails.json');

test ( 'Verify Product quantity in Cart', async ( { page} )  => {

    const homePage = new HomePage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    
    const index = 0;
    const quantity = '4';

    await homePage.openHomePage();
    await homePage.verifyHomePageIsDisplayed();
    await homePage.clickOnViewProduct(index);

    await productDetailsPage.verifyUserIsLandedOnProductDetailsPage(index+1);
    await productDetailsPage.updateQuantity(quantity);
    await productDetailsPage.clickOnAddToCart();
    await productDetailsPage.clickOnViewCart();

    await cartPage.verifyProductDetailsDisplayed(
        index,
        productDetails.data[index].productName,
        productDetails.data[index].category,
        quantity,
        productDetails.data[index].price
    )

});