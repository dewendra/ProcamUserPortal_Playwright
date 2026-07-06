const { expect } = require('@playwright/test');
class PersonalDetailsPage {
    constructor(page) {
        this.page = page;
        this.first_name = page.locator('firstName');
        this.middle_name = page.locator('middleName');
        this.last_name = page.locator('lastName');
        this.mobile_no = page.locator('mobile');
        this.gender_male = page.locator('#genderMale');
        this.gender_female = page.locator('#genderFemale');
        this.dob = page.locator('//input[contains(@class,"calendar-input")]');
        this.month = page.locator('//select[contains(@class,"monthpicker")]');
        this.year = page.locator('//select[contains(@class,"yearpicker")]');
    }
    async enterPersonalDetails() {
        await this.first_name.fill("Sanjay");
        await this.middle_name.fill("Kumar");
        await this.last_name.fill("Saxena");
        await this.mobile.fill("9876543210");
        await this.gender_male.click();
    }
}
module.exports = PersonalDetailsPage;
