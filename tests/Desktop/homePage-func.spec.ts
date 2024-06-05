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
  await expect(page).toHaveTitle(ENV.HOMEPAGE_TITLE as string);
  await pageManager.homePage().waitForHomepageHeaderToLoad();
});

test.describe("Homepage Scenarios - Desktop", () => {
  test("Test Scenario 1", async ({ pageManager }) => {
    await pageManager.homePage().scrollToLearnMore();
    await pageManager
      .homePage()
      .enterValuesAndSubmitForm(
        data.email,
        data.firstName,
        data.lastName,
        data.phoneNo,
        data.zipCode
      );
  });
});
