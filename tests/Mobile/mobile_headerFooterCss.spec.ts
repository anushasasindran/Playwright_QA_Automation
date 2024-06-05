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

test("Logo CSS Assertions", async ({ pageManager }) => {
  //Header Section
  //Logo
  await pageManager
    .headerFooter()
    .verifyLogoCSSProperties(
      "header-Logo-mobile",
      cssDataset["header-Logo-mobile"]["height"],
      cssDataset["header-Logo-mobile"]["width"],
      cssDataset["header-Logo-mobile"]["font-family"]
    );
});
test("Footer - RequestInfo - CSS Assertions", async ({ pageManager }) => {
  //Header Section
  //Logo
  await pageManager
    .headerFooter()
    .verifyFooterCSSProperties(
      "footer-RequestInfo-mobile",
      cssDataset["footer-RequestInfo-mobile"]["font-size"],
      cssDataset["footer-RequestInfo-mobile"]["font-weight"],
      cssDataset["footer-RequestInfo-mobile"]["font-family"],
      cssDataset["footer-RequestInfo-mobile"]["color"]
    );
});
test("Footer - Applynow - CSS Assertions", async ({ pageManager }) => {
  //Header Section
  //Logo
  await pageManager
    .headerFooter()
    .verifyFooterCSSProperties(
      "footer-ApplyNow-mobile",
      cssDataset["footer-ApplyNow-mobile"]["font-size"],
      cssDataset["footer-ApplyNow-mobile"]["font-weight"],
      cssDataset["footer-ApplyNow-mobile"]["font-family"],
      cssDataset["footer-ApplyNow-mobile"]["color"]
    );
});
test("Footer - Phone number - CSS Assertions", async ({ pageManager }) => {
  //Header Section
  //Logo
  await pageManager
    .headerFooter()
    .verifyFooterCSSProperties(
      "footer-PhoneNumber-mobile",
      cssDataset["footer-PhoneNumber-mobile"]["font-size"],
      cssDataset["footer-PhoneNumber-mobile"]["font-weight"],
      cssDataset["footer-PhoneNumber-mobile"]["font-family"],
      cssDataset["footer-PhoneNumber-mobile"]["color"]
    );
});
