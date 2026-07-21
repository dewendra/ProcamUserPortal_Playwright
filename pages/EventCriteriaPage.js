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
        this.proceed_btn = page.locator('//span[normalize-space()="Continue"]');


    }
    async selectingEvent() {
        await this.onGroundEvent_Yes.check();
        console.log("GroundEvent Selected");
        await this.select_Race_Category.click();
        console.log("Race Category Clicked");
        const allEvents = this.page.locator('div.ng-option')
        const totalEvent = await allEvents.count();
        console.log("Total Events:", totalEvent);
        const allEventsName = await allEvents.allTextContents();
        console.log("All Events:", allEventsName);
        for (let i = 0; i < totalEvent; i++) {
            const eventName = (await allEvents.nth(i).textContent()).trim();
            if (eventName === 'Half Marathon (21.097 Km)') {
                await allEvents.nth(i).click();
                console.log("Half Marathon (21.097 Km) Selected");
                break;
            }
        }

        //Entering Timing Details 
        console.log("In Timing Details section");
        await this.timingcerfLink.fill("https://example.com");
        console.log("Timing Cerf Link entered");

        await this.search_Event.clear();
        await this.search_Event.pressSequentially('ved', { delay: 15 });
        console.log("Searching Event Name");

        // Wait 3 seconds for dropdown to appear
        await this.page.waitForTimeout(3000);
        //await this.page.locator('ul.dropdown-menu').waitFor();

        // Clicking VEDANTA DELHI HALF MARATHON option
        await this.page.locator('a.dropdown-item', { hasText: 'VEDANTA DELHI HALF MARATHON' }).click();
        console.log("Event Name selected from dropdown");

        await this.timmed_Race_Category.click();
        console.log("Timmed Race Category Clicked");
        const allRaceCategories = this.page.locator('div.ng-option')
        const totalRaceCategories = await allRaceCategories.count();
        console.log("Total RaceCategories:", totalRaceCategories);
        const allRaceCategoriesName = await allRaceCategories.allTextContents();
        console.log("All RaceCategory Name:", allRaceCategoriesName);
        for (let i = 0; i < totalRaceCategories; i++) {
            const RaceCategoryName = (await allRaceCategories.nth(i).textContent()).trim();
            if (RaceCategoryName === 'Marathon') {
                await allRaceCategories.nth(i).click();
                console.log("Race Category Name selected: Marathon");
                break;
            }
        }
        //Entering Bib number
        await this.bibNumber.fill("2003401")
        console.log("Bib number entered");

        // Open the calendar
        await this.page.locator('input.calendar-input').click();
        console.log("Calendar option clicked");

        // Select Year
        await this.page.locator('select').nth(1).selectOption('2024');
        console.log("Year selected");

        // Select Month (May)
        await this.page.locator('select').nth(0).selectOption({ label: 'Oct' });
        console.log("Month selected");

        // Click Day 15
        await this.page.locator(
            '//div[contains(@class,"normalDates") and not(contains(@class,"disabled")) and normalize-space()="20"]'
        ).click();
        console.log("Date selected");

        // Entering timing details
        await this.hours_input.fill("5");
        console.log("Hours entered");
        await this.minutes_input.fill("38");
        console.log("Minutes entered");
        await this.seconds_input.fill("13");
        console.log("Seconds entered");

        //Entering Additional Details
        //Selecting id proof type 
        console.log("In Additional Details section");
        const idProofdropDown = this.page.locator("//label[contains(normalize-space(),\"Applicant's ID Proof Type\")] /ancestor::app-id-type-select-comp //ng-select")
        await idProofdropDown.click();
        console.log("id Proof DropDown clicked");
        const idProofOptions = this.page.locator('ng-dropdown-panel .ng-option-label');
        const totalidProofOption = idProofOptions.count();
        // Collect all option texts
        const options = await idProofOptions.allTextContents();
        console.log("Available ID Proof Options:");
        console.log(options);
        const optionToSelect = "Pan";
        for (let i = 0; i < options.length; i++) {
            const text = options[i].trim();
            //console.log(text)
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
        await this.page.waitForResponse(
            response =>
                response.url().includes('upload') &&
                response.status() === 200
        );
        console.log("id Proof uploaded");
        //Uploading profile Image
        const uploadprofileImage = this.page.locator('//input[@id="profileUploadLink"]');
        await uploadprofileImage.setInputFiles("C://Users//dewen//Downloads//Procam_Testing//Avatar_Images//John Five.jpg");
        await this.page.waitForResponse(
            response =>
                response.url().includes('upload') &&
                response.status() === 200
        );
        console.log("User profile picture uploaded");


        //Entering Emergency Details
        await this.emergencyName1.fill("Mohan Lal");
        console.log("Emergency Name 1 entered");
        await this.emergencyNumber1.fill("9876543215");
        console.log("Emergency Number 1 entered");
        await this.emergencyrelationShip1.fill("Friend");
        console.log("Emergency relationShip 1 entered");
        await this.emergencyName2.fill("Sohan Lal");
        console.log("Emergency Name 2 entered");
        await this.emergencyNumber2.fill("9876543216");
        console.log("Emergency Number 2 entered");
        await this.emergencyrelationShip2.fill("Brother");
        console.log("Emergency relationShip 2 entered");

        // await this.page.locator(
        //     '//span[contains(text(),"Is 18th October 2026 (Race Day) a special occasion for you?")]/ancestor::div[1]/following::label[normalize-space()="Yes"][1]/preceding-sibling::input'
        // ).check();

        await this.page.locator(
            '//span[contains(text(),"Is 18th October 2026 (Race Day) a special occasion for you?")]/ancestor::div[1]/following::label[normalize-space()="No"][1]/preceding-sibling::input'
        ).check();





        //Entering Transport Details
        const transportSection = this.page.locator('//label[normalize-space()="Which mode of transport do you use to reach the race day venue?"]/following::ng-select[1]');
        await transportSection.click();
        console.log("Transport Section clicked");
        const transportOptions = this.page.locator('ng-dropdown-panel  .ng-option');
        const totalTransportoption = await transportOptions.count();
        console.log("Available Transport Options:", totalTransportoption);

        // Collect all option texts
        const totalTransportOptionsName = await transportOptions.allTextContents();
        console.log(totalTransportOptionsName);
        const transportoptionToSelect = "Auto";
        //await this.page.pause();
        for (let i = 0; i < totalTransportOptionsName.length; i++) {
            const text = totalTransportOptionsName[i].trim();
            //console.log(text)
            if (text === transportoptionToSelect) {
                await transportOptions.nth(i).click();
                console.log(`${transportoptionToSelect} selected.`);
                break;
            }
        }




        //Entering Tshirt Details
        const tshirtSection = this.page.locator('//label[normalize-space()="T-Shirt Size"]/following::ng-select[1]');
        await tshirtSection.click();
        const tshirtSizes = this.page.locator('ng-dropdown-panel  .ng-option');
        const totaltshirtSizes = await tshirtSizes.count();
        // Collect all option texts
        const tshirtSizeOptions = await tshirtSizes.allTextContents();
        console.log("Available T-shirt Sizes:", totaltshirtSizes);
        console.log(tshirtSizeOptions);
        const tshirtoptionToSelect = "M";
        for (let i = 0; i < tshirtSizeOptions.length; i++) {
            const text = tshirtSizeOptions[i].trim();
            //console.log(text)
            if (text === tshirtoptionToSelect) {
                await tshirtSizes.nth(i).click();
                console.log(`${tshirtoptionToSelect} selected.`);
                break;
            }
        }
        // await this.page.getByRole('option', { name: 'M' }).click();

        await this.page.locator(
            '//span[contains(text(),"Are you finishing your Procam Slam Cycle at VDHM 2026?")]/ancestor::div[1]/following::label[normalize-space()="Yes"][1]/preceding-sibling::input'
        ).check();

        await this.page.locator(
            '//span[contains(text(),"Are you participating in the VDHM- Half Marathon race category for the first time?")]/ancestor::div[1]/following::label[normalize-space()="Yes"][1]/preceding-sibling::input'
        ).check();

        // const question = this.page.locator(
        //     'text="Is 18th October 2026 (Race Day) a special occasion for you?"'
        // );

        // await question.locator('xpath=following::label[normalize-space()="Yes"][1]').click();

        await this.page
            .locator('//label[normalize-space()="Where did you hear about our event?"]/following::ng-select[1]')
            .click();

        await this.page.getByRole('option', { name: 'Online' }).click();




        // await this.page.pause();
        await this.proceed_btn.click();

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
        console.log(`${idNumber} entered`)
    }
}
module.exports = EventCriteriaPage;