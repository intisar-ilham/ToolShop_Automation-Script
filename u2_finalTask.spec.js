import {test, expect} from '@playwright/test';

const BRAND_NAME = 'MightyCraft Hardware';
const SORT_OPTION = 'Price (Low - High)';
const ADD_TO_CART_MESSAGE = 'Product added to shopping cart.';
const EXPECTED_CART_BADGE = '1';
const EXPECTED_QUANTITY = '3';


test.beforeEach(async ( { page } ) => {
    await page.goto('/');
});


test('ToolShop Demo: Filter, Sort, and Cart Math Check', async ( { page }) => {
    await page.getByRole('checkbox', { name : BRAND_NAME}).check();
    await expect(page.getByRole('checkbox', { name : BRAND_NAME})).toBeChecked();


    await page.getByLabel('Sort').selectOption({ label : SORT_OPTION});


    const productPrices = page.getByTestId('product-price');
    await expect(productPrices.first()).toBeVisible();
    await expect.poll(async () => {
        const texts = await productPrices.allInnerTexts();
        const prices = texts.map((text) => Number(text.replace('$', '')));
        return prices.every((price, index) => index === 0 || prices[index - 1] <= price);
    }).toBe(true);


    await page.locator('a.card').first().click();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();


    await page.getByRole('button', { name : 'Add to cart'}).click();
    await expect(page.getByRole('alert')).toContainText(ADD_TO_CART_MESSAGE); 
    await expect(page.getByTestId('cart-quantity')).toHaveText(EXPECTED_CART_BADGE);


    await page.getByTestId('nav-cart').click();
    await expect(page.getByTestId('product-title')).toBeVisible();


    const unitPrice = Number((await page.getByTestId('product-price').innerText()).replace('$', ''));
    await page.getByTestId('product-quantity').fill(EXPECTED_QUANTITY);
    await expect(page.getByTestId('line-price')).toHaveText(`$${(unitPrice * parseInt(EXPECTED_QUANTITY)).toFixed(2)}`);      
});