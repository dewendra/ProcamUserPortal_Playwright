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

        //await this.dob.click();
        await this.pincode.click();
        await this.pincode.pressSequentially('110024', { delay: 100 });
        //await this.pincode.fill("110024");
        await this.address.fill("A-262, Defence Colony");
        await this.nationality.fill("Indian");
        await this.page.pause();
    }
}
module.exports = PersonalDetailsPage;
