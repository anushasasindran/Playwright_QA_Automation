import { expect } from "@playwright/test";
import test from "../../src/Fixture/fixture";
import { ENV } from "../../src/utils/env/env";

const data = JSON.parse(
  JSON.stringify(require("../../TestData/testData.json"))
);

let cssDataset;

if (ENV.PROJECT_NAME === "app1") {
  cssDataset = JSON.parse(
    JSON.stringify(require("../../TestData/app1-data.json"))
  );
} else if (ENV.PROJECT_NAME === "app2") {
  cssDataset = JSON.parse(
    JSON.stringify(require("../../TestData/app2-data.json"))
  );
}

test.beforeEach(async ({ pageManager, page }) => {
  console.log(ENV.BASE_URL);
  await page.goto(ENV.BASE_URL as string);
});

test.describe("Header Footer - Mobile", () => {
  test("Logo Presence and Click", async ({ pageManager }) => {
    await pageManager.headerFooter().verifyLogoAndClick();
  });

  test("Search on header - Mobile", async ({ pageManager }) => {
    await pageManager.headerFooter().verifySearch();
  });

  test("Phonenumber on Footer - Mobile", async ({ pageManager }) => {
    await pageManager.headerFooter().verifyPhoneFooter();
  });

  test("RequestInfo on Footer - Mobile", async ({ pageManager }) => {
    await pageManager.headerFooter().verifyRequestInfoFooter();
  });
  test("ApplyNow on Footer - Mobile", async ({ pageManager }) => {
    await pageManager.headerFooter().verifyApplynowFooter();
  });
  test("Social icons on Footer - Mobile", async ({ pageManager }) => {
    await pageManager.headerFooter().verifySocialLinksFooter();
  });
  if (ENV.PROJECT_NAME === "TAMIU") {
    test("Footer links on Footer - Mobile", async ({ pageManager }) => {
      await pageManager.headerFooter().verifyFooterLinks();
    });
  }
  test("Toggle menu in header - Mobile ", async ({ pageManager }) => {
    await pageManager.headerFooter().verifyToggleMenuAndOptions();
  });
  test.only("Applynow from Toggle menu in header", async ({ pageManager }) => {
    await pageManager.headerFooter().verifyApplyNowFromMenu()
  })
});
