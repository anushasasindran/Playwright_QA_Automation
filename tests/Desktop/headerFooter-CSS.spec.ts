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
      "header-Logo",
      cssDataset["header-Logo"]["height"],
      cssDataset["header-Logo"]["width"],
      cssDataset["header-Logo"]["font-family"],
     
    );

    })

