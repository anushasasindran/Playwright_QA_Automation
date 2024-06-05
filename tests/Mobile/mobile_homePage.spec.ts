import { expect } from "@playwright/test";
import test from "../../src/Fixture/fixture";
import { ENV } from "../../src/utils/env/env";

test.beforeEach(async ({ pageManager, page }) => {
  console.log(ENV.BASE_URL);
  await page.goto(ENV.BASE_URL as string);
  await expect(page).toHaveTitle(ENV.HOMEPAGE_TITLE as string);
  await pageManager.homePage().waitForHomepageHeaderToLoad();
});

test.describe("Homepage Scenarios - Mobile", () => {
  test("Navigate to Business Door Page", async ({ pageManager }) => {
    await pageManager.homePage().clickOnTheHamburgerViewNaviation();
    await pageManager.homePage().clickOnOnlineProgramsButton();
    await pageManager.homePage().clickOnBusinessProgramButton();
    await pageManager.homePage().verifyHeader1IsPresent();
  });
});
