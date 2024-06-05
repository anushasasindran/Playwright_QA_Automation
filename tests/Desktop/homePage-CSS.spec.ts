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
  test("Homepage CSS Assertions", async ({ pageManager }) => {
    //Header Section
    //1. online-program
    await pageManager
      .homePage()
      .verifyHeaderCSSProperties(
        "online-program",
        cssDataset["Online-program"]["font-size"],
        cssDataset["Online-program"]["font-weight"],
        cssDataset["Online-program"]["font-family"],
        cssDataset["Online-program"]["color"]
      );
    //2. Getting-started
    await pageManager
      .homePage()
      .verifyHeaderCSSProperties(
        "getting-started",
        cssDataset["Getting-started"]["font-size"],
        cssDataset["Getting-started"]["font-weight"],
        cssDataset["Getting-started"]["font-family"],
        cssDataset["Getting-started"]["color"]
      );

    //3. Resources
    await pageManager
      .homePage()
      .verifyHeaderCSSProperties(
        "resources",
        cssDataset["Resources"]["font-size"],
        cssDataset["Resources"]["font-weight"],
        cssDataset["Resources"]["font-family"],
        cssDataset["Resources"]["color"]
      );
    //h1-text
    await pageManager
      .homePage()
      .verifyCssOfH1HeaderText(
        cssDataset["h1-Text"]["font-size"],
        cssDataset["h1-Text"]["font-weight"],
        cssDataset["h1-Text"]["font-family"],
        cssDataset["h1-Text"]["color"]
      );
  });
});
