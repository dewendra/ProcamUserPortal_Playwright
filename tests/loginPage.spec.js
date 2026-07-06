//@ts-check
import { test } from "@playwright/test";

//const LoginPage = require("/pages/LoginPage");
const LoginPage = require('../pages/LoginPage');
const DiscountApplyPage = require("../pages/DiscountApplyPage");
//const PersonalDetailsPage = require("../pages/PersonalDetailsPage");
//const EventCriteriaPage = require("../pages/EventCriteriaPage");
//const CharityDetailsPage = require("../pages/CharityDetailsPage");
//const MerchandiseDetailsPage = require("../pages/MerchandiseDetailsPage");
//const OrderSummaryPage = require("../pages/OrderSummaryPage");
//const PaymentsOptionPage = require("../pages/PaymentsOptionPage");
//const TransactionSuccessPage = require("../pages/TransactionSuccessPage");

test("Procam Registration Login Page Test", async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.verifyLogo();
  await loginPage.verifyLogin();

  // const discountApplyPage = new DiscountApplyPage(page);
  // await discountApplyPage.registrationCode();

  // const personalDetailsPage = new PersonalDetailsPage(page);
  // await personalDetailsPage.enterPersonalDetails();

  // const eventCriteriaPage = new EventCriteriaPage(page);
  // await eventCriteriaPage.selectingEvent();
  // //await page.pause();

  // const charityDetailsPage = new CharityDetailsPage(page);
  // await charityDetailsPage.EnterCharityDetails();

  // await page.pause();

  // const merchandiseDetailsPage = new MerchandiseDetailsPage(page);
  // await merchandiseDetailsPage.EnterMerchandiseDetails();

  // const orderSummaryPage = new OrderSummaryPage(page);
  // await orderSummaryPage.OrderDetails();

  // const paymentsOptionPage = new PaymentsOptionPage(page);
  // await paymentsOptionPage.paymentdetails();

  // const transactionSuccessPage = new TransactionSuccessPage(page);
  // await transactionSuccessPage.transactionDetails();

  await page.pause();
});
