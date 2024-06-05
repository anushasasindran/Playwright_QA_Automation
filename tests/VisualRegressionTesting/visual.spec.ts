import { expect } from "@playwright/test";
import test from "../../src/Fixture/fixture";
import { ENV } from "../../src/utils/env/env";

test.beforeEach(async ({ pageManager, page }) => {
  console.log(ENV.BASE_URL);
  await page.goto(ENV.BASE_URL as string);
  await expect(page).toHaveTitle(ENV.HOMEPAGE_TITLE as string);
  await pageManager.homePage().waitForHomepageHeaderToLoad();
});

test.describe("Homepage Scenarios - Visual Testing", () => {
  test("Homepage - Full Page", async ({ pageManager, page }) => {
    await expect(page).toHaveScreenshot(
      `homepage-fullpage-${ENV.PROJECT_NAME as string}.png`,
      {
        fullPage: true,
      }
    );
  });

  test("Homepage - hero", async ({ pageManager, page }) => {
    await expect(
      page
        .locator("section")
        .filter({ hasText: "GO BEYOND> with TAMIU Online" })
        .first()
    ).toHaveScreenshot("homepage-hero.png");
  });
});
