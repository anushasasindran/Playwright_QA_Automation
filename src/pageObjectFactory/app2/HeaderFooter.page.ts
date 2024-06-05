import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "../../HelperBase/HelperBase";
import { ENV } from "../../utils/env/env";
import { url } from "inspector";

export class HeaderFooter extends HelperBase {
  private logoLocator = 'img[alt = "UNCW Logo"]';
  private phoneFooterLocator = '[data-id="3c9f0b4"]';
  private requestInfoFooterLocator = '[data-id="d4c1c12"]';
  private requestInfoDialogLocator = ".dialog-widget-content";
  private applyNowFooterLocator = '[data-id="170c7d0"]';
  private fbFooter = ".elementor-social-icon-facebook-f";
  private twitterFooter = ".elementor-social-icon-Twitter";
  private youTubeFooter = ".elementor-social-icon-youtube";
  private linkedInFooter = ".elementor-social-icon-linkedin-in";
  private instagramFooter = ".elementor-social-icon-instagram";


  constructor(page: Page) {
    super(page);
  }

  async verifyLogoAndClick() {
    const logo = this.page.locator(this.logoLocator);
    await expect(logo).toBeVisible();
    const currentUrl = this.page.url();
    await logo.click();
    expect(currentUrl).toBe(ENV.BASE_URL);
  }

  async verifySearch() {
    await this.page.getByRole("button", { name: "Search" }).click();
    const searchQuery = ENV.PROJECT_NAME!;
    await this.page
      .getByRole("searchbox", { name: "search" })
      .fill(searchQuery);
    await expect(this.page.getByRole("search").getByText("Go")).toBeVisible();
    await expect(this.page.getByRole("search")).toContainText("Go");
    await this.page.getByRole("search").getByText("Go").click();
    const currentUrl = this.page.url();
    console.log(url);
    const expectedURL = `${ENV.BASE_URL}search/?q=${ENV.PROJECT_NAME}`;
    expect(currentUrl).toBe(expectedURL);
    await expect(
      this.page.getByRole("heading", { name: "Search Results" })
    ).toBeVisible();
    const results = await this.page.$$(".results");
    await Promise.all(
      results.map(async (result) => {
        const text = await result.textContent();
        expect(text).toContain(ENV.PROGRAM_NAME);
      })
    );
  }

  async verifyPhoneFooter() {
    const phoneNumber = this.page.locator(this.phoneFooterLocator).first()
    await phoneNumber.scrollIntoViewIfNeeded();
    await expect(phoneNumber).toBeVisible();
    const phoneNumberLink = await phoneNumber.locator("a");
    await phoneNumberLink.click();
  }

  async verifyRequestInfoFooter() {
    const requestInfo = this.page
      .locator(this.requestInfoFooterLocator)
      .first();
    await requestInfo.scrollIntoViewIfNeeded();
    await expect(requestInfo).toContainText("Request Info");
    await requestInfo.click();
    const dialogRequestInfo = this.page.locator(this.requestInfoDialogLocator);
    await expect(dialogRequestInfo).toBeVisible();
    const dialogTitle = await dialogRequestInfo.locator(".form-title");
    expect(dialogTitle).toBeVisible();
    await expect(dialogTitle).toContainText("Request Information");
  }

  async verifyApplynowFooter() {
    const applyNow = this.page.locator(this.applyNowFooterLocator).first();
    await applyNow.scrollIntoViewIfNeeded();
    await this.scrollElementIntoViewHorizontally(applyNow);
    await expect(applyNow).toContainText("Apply Now");
    await applyNow.click();
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(`${ENV.BASE_URL}apply/`);
  }
  async verifyFooterCSSProperties(
    itemName: string,
    fontSize: string,
    fontWeight: string,
    fontFamily: string,
    color: string
  ) {
    switch (itemName) {
      case "footer-RequestInfo-mobile":
        const requestInfo = this.page
          .locator(this.requestInfoFooterLocator)
          .first();
        await this.verifyCSSProperties(
          requestInfo,
          fontSize,
          fontWeight,
          fontFamily,
          color
        );
        break;
      case "footer-ApplyNow-mobile":
        const applyNow = this.page.locator(this.applyNowFooterLocator).first();
        await this.verifyCSSProperties(
          applyNow,
          fontSize,
          fontWeight,
          fontFamily,
          color
        );
        break;
      case "footer-PhoneNumber-mobile":
        const phoneNumber = this.page.locator(this.phoneFooterLocator).first();
        await this.verifyCSSProperties(
          phoneNumber,
          fontSize,
          fontWeight,
          fontFamily,
          color
        );
        break;
    }
  }
}
