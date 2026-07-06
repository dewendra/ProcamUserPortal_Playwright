const { expect } = require('@playwright/test');
class DiscountApplyPage {
    constructor(page) {
        this.page = page;
        this.discount_Yes = page.locator('#flexRadioDefault1');
        this.discount_No = page.locator('#flexRadioDefault2');
        this.proceed_btn = page.locator('//button[normalize-space()="Proceed"]');
        this.discount_Code = page.locator('#discountCode');
        this.apply_btn = page.locator('//button[normalize-space()="Apply"]');
        this.read_More_btn = page.locator('//a[normalize-space()="Read More"]');

    }

    async applyDiscountCode() {
        await this.discount_No.click();
        await this.proceed_btn.click();
    }
}
module.exports = DiscountApplyPage;
