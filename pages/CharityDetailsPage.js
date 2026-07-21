const { expect } = require("@playwright/test")
class CharityDetailsPage {
    constructor(page) {
        this.page = page;
        this.fundRaise_Yes = page.locator('//input[@id="fundRaiseYes"]');
        this.fundRaise_No = page.locator('//input[@id="fundRaiseNo"]');
        this.fundRaise_closeBtn = page.locator('//button[normalize-space()="Close"]');
        this.fundRaise_causeName = page.locator('//ng-select[@id="fundRaiseCauseName" ]');
        this.proceed_btn = page.locator('//span[normalize-space()="Continue"]');
    }
    async enterCharityDetails() {
        await this.fundRaise_No.check();
        await this.fundRaise_Yes.check();
        await this.fundRaise_closeBtn.click();

        const selectCauseName = this.page.locator('//ng-select[@id="fundRaiseCauseName"]');
        const causeOptions = await this.waitForDropdownToLoad(selectCauseName);
        console.log(causeOptions);
        const totalCause = await causeOptions.count();
        console.log("Total CauseName:", totalCause);
        const totalCauseOptionName = await causeOptions.allTextContents();
        console.log(totalCauseOptionName);
        const causeToSelect = "Cause Test 5";
        for (let i = 0; i < totalCauseOptionName.length; i++) {
            const text = await totalCauseOptionName[i].trim();
            if (text === causeToSelect) {
                await causeOptions.nth(i).click();
                console.log(`${causeToSelect} selected.`);
                break;
            }

        }

        const selectNgoName = this.page.locator('//ng-select[@id="fundRaiseNgoName"]');
        await selectNgoName.click();
        console.log("Ngo Name Section clicked");
        const ngoOptions = await this.waitForDropdownToLoad(selectNgoName);
        console.log(ngoOptions);
        const totalNgoOptions = await ngoOptions.count();
        console.log("Total Ngo Option:", totalNgoOptions);
        const totalNgoNames = await ngoOptions.allTextContents();
        console.log(totalNgoNames);
        const ngoToSelect = "Test 5";
        for (let i = 0; i < totalNgoNames.length; i++) {
            const text = totalNgoNames[i].trim();
            if (text === ngoToSelect) {
                await ngoOptions.nth(i).click();
                console.log(`${ngoToSelect} selected.`);
                break;

            }
        }


        await this.page.pause();
        await this.proceed_btn.click();
    }

    async waitForDropdownToLoad(dropdownLocator) {
        await dropdownLocator.click();

        const options = this.page.locator('ng-dropdown-panel .ng-option');

        await expect.poll(async () => {
            const texts = await options.allTextContents();

            return texts.filter(t => t.trim() !== 'No items found').length;
        }, {
            timeout: 15000,
            message: 'Dropdown options did not load'
        }).toBeGreaterThan(0);

        return await options;
    }
}
module.exports = CharityDetailsPage;
