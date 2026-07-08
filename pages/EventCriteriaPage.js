const { expect } = require("@playwright/test")

class EventCriteriaPage {
    constructor(page) {
        this.page = page;
        this.onGroundEvent_Yes = page.locator('#flexRadioDefault1');
        this.onGroundEvent_No = page.locator('#flexRadioDefault2');
        this.virtualEvent_Yes = page.locator('#appEnabledY');
        this.virtualEvent_No = page.locator('#appEnabledN');
        this.select_Race_Category = page.locator('div.ng-input');
        this.all_Race_Category = page.locator('div.ng-option');


    }
    async selectingEvent() {
        await this.onGroundEvent_Yes.check();
        await this.select_Race_Category.click();

    }
}
module.exports = EventCriteriaPage;