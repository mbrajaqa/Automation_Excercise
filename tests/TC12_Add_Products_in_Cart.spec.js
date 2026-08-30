// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'Products' button
// 5. Hover over first product and click 'Add to cart'
// 6. Click 'Continue Shopping' button
// 7. Hover over second product and click 'Add to cart'
// 8. Click 'View Cart' button
// 9. Verify both products are added to Cart
// 10. Verify their prices, quantity and total price

const { test } = require ('@playwright/test');

const { HomePage } = require('../pom/HomePage');
const { ProductsPage } = require ('../pom/ProductsPage');
const { CartPage } = require ('../pom/CartPage');

const productDetails = require ('../.lib/data/productDetails.json');

test ('Add Products in Cart', async ({page}) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const firstProductIndex = 0;
    const secondProductIndex = 1;
    const qty = '1';

    await homePage.openHomePage();
    await homePage.verifyHomePageIsDisplayed();
    await homePage.clickOnProductsLink();

    await productsPage.addProductToCartByIndex(firstProductIndex);
    await productsPage.clickOnContinueShopping();
    await productsPage.addProductToCartByIndex(secondProductIndex);
    await productsPage.clickOnViewCart();
    
    await cartPage.verifyProductDetailsDisplayed(
        firstProductIndex, 
        productDetails.data[firstProductIndex].productName,
        productDetails.data[firstProductIndex].category,
        qty,
        productDetails.data[firstProductIndex].price
    );

    await cartPage.verifyProductDetailsDisplayed(
        secondProductIndex, 
        productDetails.data[secondProductIndex].productName,
        productDetails.data[secondProductIndex].category,
        qty,
        productDetails.data[secondProductIndex].price
    );

    

});