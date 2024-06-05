import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "../../HelperBase/HelperBase";
import { ENV } from "../../utils/env/env";
import { url } from "inspector";

export class HeaderFooter extends HelperBase {
  private logoLocator = "img.attachment-full.size-full";
  private phoneFooterLocator =
    '[data-widget_type="cf-about-brands.default"] .cf-item';
  private requestInfoFooterLocator = '[data-id="417d491"]';
  private requestInfoDialogLocator = ".dialog-widget-content";
  private applyNowFooterLocator = ".elementor-button-wrapper .button";
  private fbFooter = ".elementor-social-icon-facebook";
  private twitterFooter = ".elementor-social-icon-Twitter";
  private youTubeFooter = ".elementor-social-icon-youtube";
  private linkedInFooter = ".elementor-social-icon-linkedin";
  private instagramFooter = ".elementor-social-icon-instagram";
  private footerNavLocator = ".footer-nav .elementor-widget-container ul";
  private searchLocator = "div.elementor-search-form__toggle";
  private searchBoxLocator = ".elementor-search-form__input";
  private searchSubmitLocator = "#inptSearchBtn";
  private searchResultLocator = ".elementor-widget-container h2";
  private toggleMenuLocator = '.mega-toggle-animated-box'
  private onlineProgramsLocator = '#mega-menu-menu-1'
  private businessProgramsLocator = '#mega-menu-item-318'
  private gettingStartedLocator = '#mega-menu-item-314 '
  private resourcesLocator = '#mega-menu-item-315'
  private applynowLocator = '#mega-menu-item-5539'


  constructor(page: Page) {
    super(page);
  }

  async verifyLogoAndClick() {
    const logo = this.page.locator(this.logoLocator).first();
    await expect(logo).toBeVisible();
    const currentUrl = this.page.url();
    await logo.click();
    expect(currentUrl).toBe(ENV.BASE_URL);
  }

  async verifyToggleMenuAndOptions() {
    const toggleMenu = this.page.locator(this.toggleMenuLocator)
    await expect(toggleMenu).toBeVisible();
    await toggleMenu.click()
    let actualMenuLists: string[] = []
    const onlinePrograms = this.page.locator(this.onlineProgramsLocator)
    const onlineProgramsText = await onlinePrograms.locator('a').first().textContent()
    console.log(onlineProgramsText)
    if (onlineProgramsText !== null) {
      actualMenuLists.push(onlineProgramsText.trim())
    }
    //expect(onlineProgramsText).toBe("Online Programs")
    const gettingStarted = this.page.locator(this.gettingStartedLocator)
    const gettingStartedsText = await gettingStarted.locator('a').first().textContent()
    console.log(gettingStartedsText)
    if (gettingStartedsText !== null) {
      actualMenuLists.push(gettingStartedsText.trim())
    }
    const resources = this.page.locator(this.resourcesLocator)
    const resourcesText = await resources.locator('a').first().textContent()
    console.log(resourcesText)
    if (resourcesText !== null) {
      actualMenuLists.push(resourcesText.trim())
    }
    const applyNow = this.page.locator(this.applynowLocator)
    const applyNowText = await applyNow.locator('a').first().textContent()
    console.log(applyNowText)
    if (applyNowText !== null) {
      actualMenuLists.push(applyNowText.trim())
    }

    const expectedMenu = [
      "Online Programs",
      "Getting Started",
      "Resources",
      "Apply Now"
    ]
    expect(actualMenuLists).toEqual(expectedMenu)

  }
  async verifyApplyNowFromMenu() {
    const toggleMenu = this.page.locator(this.toggleMenuLocator)
    await expect(toggleMenu).toBeVisible();
    await toggleMenu.click()
    const applyNow = this.page.locator(this.applynowLocator)
    await applyNow.click()
    const applyNowLink = await applyNow.locator('a').getAttribute("href")
    console.log(applyNowLink)
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(applyNowLink);
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
    const phoneNumber = this.page.locator(this.phoneFooterLocator).last();
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
    const applyNow = this.page.locator(this.applyNowFooterLocator).last();
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
        const applyNow = this.page.locator(this.applyNowFooterLocator).last();
        await this.verifyCSSProperties(
          applyNow,
          fontSize,
          fontWeight,
          fontFamily,
          color
        );
        break;
      case "footer-PhoneNumber-mobile":
        const phoneNumber = this.page.locator(this.phoneFooterLocator).last();
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
  