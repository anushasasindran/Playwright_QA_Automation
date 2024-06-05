import { test as baseTest } from "@playwright/test";
import { ENV } from "../../src/utils/env/env";
import PageManagerApp1 from "../pageObjectFactory/app1/PageManagerApp1";
import PageManagerApp2 from "../pageObjectFactory/app2/PageManagerApp2";

const test = baseTest.extend<{
  pageManager: any;
}>({
  pageManager: async ({ page }, use) => {
    switch (ENV.PROJECT_NAME) {
      case "TAMIU":
        await use(new PageManagerApp1(page));
        break;
      case "UNCW":
        await use(new PageManagerApp2(page));
        break;
    }
  },
});

export default test;
export const expect = test.expect;
