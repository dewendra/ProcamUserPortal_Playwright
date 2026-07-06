
const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

        this.eventLogo = page.locator('//img[contains(@src,"vdhm-2025")]');
        this.emailId = page.locator('//input[@id="emailId"]');
        this.send_OTP_btn = page.locator('//button[contains(normalize-space(),"Send OTP")]');
    }

    async goto() {
        await this.page.goto(
            'https://uat.procam.in/registrations/#/login?eventName=vdhm26&eventYear=2026',
            { waitUntil: 'domcontentloaded' }
        );
    }

    async verifyLogo() {
        await expect(this.eventLogo).toBeVisible();
        console.log('VDHM Logo is visible:', await this.eventLogo.isVisible());
    }

    async verifyLogin() {
        await this.emailId.fill("vdhm26-105@yopmail.com")
        await this.page.send_OTP_btn.click()

    }
}
module.exports = LoginPage;
