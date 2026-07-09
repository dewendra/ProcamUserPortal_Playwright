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
        this.timingcerfLink = page.locator('input[name="timingcerfLink"]');
        this.search_Event = page.locator('//input[@id="search-text" and contains(@placeholder,"Enter at least 3 letters to search")]');
        this.timingcerfLink = page.locator('input[name="timingcerfLink"]');
        this.timmed_Race_Category = page.locator('//ng-select[.//div[text()="Select Category"]]');
        this.bibNumber = page.locator('input[name="bib"]');
        this.hours_input = page.locator('input[formcontrolname="hours"]');
        this.minutes_input = page.locator('input[formcontrolname="min"]');
        this.seconds_input = page.locator('input[formcontrolname="sec"]');
        this.emergencyName1 = page.locator('input[name="emergencyName"]');
        this.emergencyNumber1 = page.locator('input[name="mobile"]');
        this.emergencyrelationShip1 = page.locator('input[name="relationShipFirstEmer"]');
        this.emergencyName2 = page.locator('input[name="emergencyNameSec"]');
        this.emergencyNumber2 = page.locator('input[name="mobileSecond"]');
        this.emergencyrelationShip2 = page.locator('input[name="relationShipSecoEmer"]');


    }
    async selectingEvent() {
        await this.onGroundEvent_Yes.check();
        await this.select_Race_Category.click();
        const allEvents = this.page.locator('div.ng-option')
        const totalEvent = await allEvents.count();
        console.log("Total Events:", totalEvent);
        const allEventsName = await allEvents.allTextContents();
        console.log("All Events:", allEventsName);
        for (let i = 0; i < totalEvent; i++) {
            const eventName = (await allEvents.nth(i).textContent()).trim();
            if (eventName === 'Half Marathon (21.097 Km)') {
                await allEvents.nth(i).click();
                break;
            }
        }

        //Entering Timing Details 
        await this.timingcerfLink.fill("https://example.com")

        await this.search_Event.clear();
        await this.search_Event.pressSequentially('ved', { delay: 15 });
        // Wait for dropdown to appear
        // Wait 3 seconds
        await this.page.waitForTimeout(3000);
        //await this.page.locator('ul.dropdown-menu').waitFor();

        // Clicking VEDANTA DELHI HALF MARATHON option
        await this.page.locator('a.dropdown-item', { hasText: 'VEDANTA DELHI HALF MARATHON' }).click();

        await this.timmed_Race_Category.click();
        const allRaceCategories = this.page.locator('div.ng-option')
        const totalRaceCategories = await allRaceCategories.count();
        console.log("Total RaceCategories:", totalRaceCategories);
        const allRaceCategoriesName = await allRaceCategories.allTextContents();
        console.log("All RaceCategory Name:", allRaceCategoriesName);
        for (let i = 0; i < totalRaceCategories; i++) {
            const RaceCategoryName = (await allRaceCategories.nth(i).textContent()).trim();
            if (RaceCategoryName === 'Marathon') {
                await allRaceCategories.nth(i).click();
                break;
            }
        }
        //Entering Bib number
        await this.bibNumber.fill("2003401")

        // Open the calendar
        await this.page.locator('input.calendar-input').click();

        // Select Year
        await this.page.locator('select').nth(1).selectOption('2024');

        // Select Month (May)
        await this.page.locator('select').nth(0).selectOption({ label: 'Oct' });

        // Click Day 15
        await this.page.locator(
            '//div[contains(@class,"normalDates") and not(contains(@class,"disabled")) and normalize-space()="20"]'
        ).click();

        // Entering timing details
        await this.hours_input.fill("5");
        await this.minutes_input.fill("38");
        await this.seconds_input.fill("13");

        //Entering Additional Details




        await this.emergencyName1.fill("Mohan Lal");
        await this.emergencyNumber1.fill("9876543215");
        await this.emergencyrelationShip1.fill("Friend");
        await this.emergencyName2.fill("Sohan Lal");
        await this.emergencyNumber2.fill("9876543216");
        await this.emergencyrelationShip2.fill("Brother");

        const tshirtSection = page.locator(
            'div:has(label:text("T-Shirt Size"))'
        );

        await tshirtSection.getByRole('combobox').click();
        await page.getByRole('option', { name: 'M' }).click();

        await this.page
            .locator('div:has(label:text("Where did you hear about our event?"))')
            .getByRole('combobox')
            .click();

        await this.page.getByRole('option', { name: 'Online' }).click();







        await this.page.pause();

    }
}
module.exports = EventCriteriaPage;