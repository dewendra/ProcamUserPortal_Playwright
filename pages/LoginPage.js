
const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

        this.eventLogo = page.locator('//img[contains(@src,"vdhm-2025")]');
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

    }
}
module.exports = LoginPage;
