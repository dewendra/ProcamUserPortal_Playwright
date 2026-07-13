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

        // Wait 3 seconds for dropdown to appear
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
        //Selecting id proof type 
        const idProofdropDown = this.page.locator("//label[contains(normalize-space(),\"Applicant's ID Proof Type\")] /ancestor::app-id-type-select-comp //ng-select")
        await idProofdropDown.click();
        const idProofOptions = this.page.locator('ng-dropdown-panel .ng-option-label');
        const totalidProofOption = idProofOptions.count();
        // Collect all option texts
        const options = await idProofOptions.allTextContents();
        console.log("Available ID Proof Options:");
        console.log(options);
        const optionToSelect = "Pan";
        for (let i = 0; i < options.length; i++) {
            const text = options[i].trim();
            console.log(text)
            if (text === optionToSelect) {
                await idProofOptions.nth(i).click();
                console.log(`${optionToSelect} selected.`);
                break;
            }
        }

        //Entering IdProof Number
        await this.enterIdProofNumber("Pan", "ABCDE1234F");

        //await this.enterIdProofNumber("Passport", "M1234567");
        //await this.enterIdProofNumber("Driving License", "DL0420110012345");

        //Uploading IdProof Documnets
        const uploadIdProof = this.page.locator('//input[@name="file"]');
        await uploadIdProof.setInputFiles("C://Users//dewen//Downloads//Procam_Testing//Avatar_Images//PAN.jpg");

        //Uploading profile Image
        const uploadprofileImage = this.page.locator('//input[@id="profileUploadLink"]');
        await uploadprofileImage.setInputFiles("C://Users//dewen//Downloads//Procam_Testing//Avatar_Images//John Five.jpg");



        //Entering Emergency Details
        await this.emergencyName1.fill("Mohan Lal");
        await this.emergencyNumber1.fill("9876543215");
        await this.emergencyrelationShip1.fill("Friend");
        await this.emergencyName2.fill("Sohan Lal");
        await this.emergencyNumber2.fill("9876543216");
        await this.emergencyrelationShip2.fill("Brother");

        const tshirtSection = this.page.locator(
            'div:has(label:text("T-Shirt Size"))'
        );

        //Entering Tshirt Details
        await tshirtSection.getByRole('combobox').click();
        await this.page.getByRole('option', { name: 'M' }).click();

        await this.page
            .locator('div:has(label:text("Where did you hear about our event?"))')
            .getByRole('combobox')
            .click();

        await this.page.getByRole('option', { name: 'Online' }).click();







        await this.page.pause();

    }
    async enterIdProofNumber(idType, idNumber) {
        const inputNames = {
            "Pan": "pan",
            "Passport": "passport",
            "Driving licence": "drivingLicense",
            "Driving License": "drivingLicense",
            "Aadhar": "aadhar"
        };

        const input = this.page.locator(`input[name="${inputNames[idType]}"]`);

        await input.waitFor({ state: "visible" });
        await input.fill(idNumber);
        console.log(`${idNumber} selected`)
    }
}
module.exports = EventCriteriaPage;