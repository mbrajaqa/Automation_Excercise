const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page){
        this.page = page;

        //Locators:
        this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
        this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });

        this.products = page.locator('div.single-products');
        this.addToCartButton = this.products.getByText('Add to cart');
        this.viewProductLink = this.products.getByRole('link', {name:'View Product'});
        this.nameSection = this.products.locator('p');

        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });

        

        this.searchBox = page.getByPlaceholder('Search Product');
        this.searchIcon = page.locator('#submit_search');


        
    };

    async verifyAllProductsPageIsDisplayed(){
        await expect(this.allProductsHeading).toBeVisible();
    };

    async verifyProductListDisplayed(){
        await expect(this.products.last()).toBeVisible();
    };

    async clickOnViewProduct (productNumber){
        await this.viewProductLink.nth(productNumber).click();
    };

    async searchProduct (productName){
        await this.searchBox.fill(productName);
        await this.searchIcon.click();
    };

    async verifySearchedProductsHeadingIsDisplayed(){
        await expect(this.searchedProductsHeading).toBeVisible();
    };

    async verifySearchedProductIsDisplayed(productName){

        await this.verifySearchedProductsHeadingIsDisplayed();

        const names = await this.nameSection.allTextContents();
        expect(names.length).toBeGreaterThan(0);

        for (const name of names){
            expect(name.toLowerCase()).toContain(productName);
        };


    };

    async addProductToCartByIndex(index){

        const product = this.products.nth(index);
        await product.hover();
        await product.locator('.product-overlay a.add-to-cart').click();
    };

    async clickOnContinueShopping(){
        
        await this.continueShoppingButton.click();
    };

    async clickOnViewCart(){

        await this.viewCartLink.click();
    };


}

module.exports = {ProductsPage};