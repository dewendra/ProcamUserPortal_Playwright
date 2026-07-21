const { expect } = require("@playwright/test")

class MerchandiseDetailsPage {
    constructor(page) {
        this.page = page;

    }
    async enterMerchandiseDetails() {
        const photo = await this.handleAddon("Photo addon");

        if (photo) {
            await photo.locator('button:has-text("Buy Now")').click();

        }
        const bagTag = await this.handleAddon("Bag Tag Booking");
        if (bagTag) {
            await bagTag.locator('#bagTagBookingYesV2').check();
            await bagTag.locator('button:has-text("Submit")').click();
        }


    }

    async handleAddon(sectionName) {

        const section = this.page.locator(
            `//h5[normalize-space()="${sectionName}"]/ancestor::mat-expansion-panel`
        );

        if (await section.count() === 0) {
            return null;
        }

        return section;
    }
}
module.exports = MerchandiseDetailsPage;