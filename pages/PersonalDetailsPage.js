const { expect } = require('@playwright/test');
class PersonalDetailsPage {
    constructor(page) {
        this.page = page;
        this.first_name = page.locator('input[name="firstName"]');
        this.middle_name = page.locator('input[name="middleName"]');
        this.last_name = page.locator('input[name="lastName"]');
        this.mobile_no = page.locator('input[name="mobile"]');
        this.gender_male = page.locator('#genderMale');
        this.gender_female = page.locator('#genderFemale');
        this.calander = page.locator('app-date-picker').getByRole('img');
        this.dob = page.locator('//input[contains(@class,"calendar-input")]');
        this.month = page.locator('//select[contains(@class,"monthpicker")]');
        this.year = page.locator('//select[contains(@class,"yearpicker")]');
        this.pincode = page.locator('//input[@id="search-text" and contains(@placeholder,"Enter pinocde")]');
        this.address = page.locator('//input[@name="address"]');
        this.nationality = page.locator('//app-select[@name="nationality"]//input');
        this.running_club_Yes = page.locator('#wantToGiveRCYes');
        this.running_club_No = page.locator('#wantToGiveRCNo');
        this.runningGroup_name = page.locator('//app-select[@name="runningGroup"]//input');
        this.occupation = page.locator('//ng-select[@formcontrolname="occupation"]//div[@role="combobox"]');
        this.bottom_back_btn = page.locator('//button[normalize-space()="Back"]');
        this.proceed_btn = page.locator('//button[normalize-space()="Proceed"]');
    }
    async enterPersonalDetails() {
        await this.first_name.fill("Sanjay");
        await this.middle_name.fill("Kumar");
        await this.last_name.fill("Saxena");
        await this.mobile_no.fill("9876543210");
        await this.gender_male.check();

        // Open the calendar
        await this.page.locator('input.calendar-input').click();

        // Select Year
        await this.page.locator('select').nth(1).selectOption('2005');

        // Select Month (May)
        await this.page.locator('select').nth(0).selectOption({ label: 'May' });

        // Click Day 15
        await this.page.locator(
            '//div[contains(@class,"normalDates") and not(contains(@class,"disabled")) and normalize-space()="15"]'
        ).click();



        //await this.calander.click();

        await this.pincode.click();
        // await this.pincode.fill('110024');
        // const defenceColony = this.page.locator('a.dropdown-item').filter({
        //     hasText: 'Defence Colony'
        // });

        // await defenceColony.waitFor({ state: 'visible' });
        // await defenceColony.click();


        await this.pincode.clear();
        await this.pincode.pressSequentially('110024', { delay: 15 });
        // Wait for dropdown to appear
        // Wait 3 seconds
        await this.page.waitForTimeout(3000);
        //await this.page.locator('ul.dropdown-menu').waitFor();

        // Click Defence Colony option
        await this.page.locator('a.dropdown-item', { hasText: 'Defence Colony' }).click();
        //await this.pincode.fill("110024");

        await this.address.fill("A-262, Defence Colony");

        await this.nationality.clear();
        await this.nationality.pressSequentially('ind', { delay: 15 });
        await this.page.waitForTimeout(3000);
        await this.page.locator('a.dropdown-item', { hasText: 'Indian' }).click();

        await this.running_club_Yes.check();
        await this.runningGroup_name.clear();
        await this.runningGroup_name.pressSequentially('dwar', { delay: 15 });
        await this.page.waitForTimeout(3000);
        await this.page.locator('a.dropdown-item', { hasText: 'Dwarka Xpress ' }).click();

        //Selecting occupation
        await this.occupation.click();
        // Wait for the dropdown panel
        await this.page.locator('ng-dropdown-panel').waitFor();
        // Click Student
        await this.page.locator(
            '//div[@role="option"]//span[normalize-space()="Student"]'
        ).click();
        await this.page.pause();
        await this.proceed_btn.click();


    }
}
module.exports = PersonalDetailsPage;
