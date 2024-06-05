import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "../../HelperBase/HelperBase";
import { ENV } from "../../utils/env/env";

export class Homepage extends HelperBase {
  private formEmailInputLocator = 'input[placeholder="Email*"]';
  private formLearnMoreButtonLocator = 'input[type="submit"]';
  private formFirstNameInputLocator = 'input[placeholder="First Name*"]';
  private formLastNameInputLocator = 'input[placeholder="Last Name*"]';
  private formPhoneNumberInputLocator = 'input[placeholder="Phone*"]';
  private formZipCodeInputLocator = 'input[placeholder="ZIP Code*"]';
  private formProgramDropdownLocator =
    'select[aria-label="Program of Interest"]';
  private formHowYouHearAboutUsDropdownLocator =
    'select[aria-label="how did you hear about us"]';
  private hamburgerNavButtonLocator =
    "button.mega-toggle-animated.mega-toggle-animated-slider";
  private menuNavigationOnlineProgramLocator =
    'a.mega-menu-link :text("Online Programs")';
  private menuNavigationBusinessProgramsLocator =
    'a.mega-menu-link :text("Business Programs")';

  private header1ForAnyPageLocator = "div > h1";
  private headerSectionLocator = "section.elementor-top-section.header-main";
  private headerOnlinePrograButtonLocator = "#mega-menu-item-313 > a";
  private headerGettingStartedButtonLocator = "#mega-menu-item-314 > a";
  private headerResourceButtonLocator = "#mega-menu-item-315 > a";

  constructor(page: Page) {
    super(page);
  }

  async enterValuesAndSubmitForm(
    email: string,
    firstName: string,
    lastName: string,
    phoneNo: string,
    zipCode: string
  ) {
    const programDropdown = this.page.locator(this.formProgramDropdownLocator);
    await programDropdown.selectOption({ value: ENV.PROGRAM_NAME });
    const howYoHearAboutUsDropdown = this.page.locator(
      this.formHowYouHearAboutUsDropdownLocator
    );
    await howYoHearAboutUsDropdown.selectOption({
      value: "Information Session",
    });
    // await this.page.pause();
    await this.page.locator(this.formEmailInputLocator).fill(email);
    await this.page.locator(this.formFirstNameInputLocator).fill(firstName);
    await this.page.locator(this.formLastNameInputLocator).fill(lastName);
    await this.page.locator(this.formPhoneNumberInputLocator).click();
    await this.page.locator(this.formPhoneNumberInputLocator).fill(phoneNo);
    await this.page.locator(this.formZipCodeInputLocator).click();
    await this.page.locator(this.formZipCodeInputLocator).fill(zipCode);
    await this.page.locator(this.formLearnMoreButtonLocator).click();
    await this.page.waitForTimeout(3000);
    await this.waitForLocator(this.header1ForAnyPageLocator);
  }

  async enterMail(email: string) {
    await this.page.locator(this.formEmailInputLocator).fill(email);
  }

  async enterFirstNameAndLastName(firstName: string, lastName: string) {
    await this.page.locator(this.formFirstNameInputLocator).fill(firstName);
    await this.page.locator(this.formLastNameInputLocator).fill(lastName);
  }

  async waitForHomepageHeaderToLoad() {
    await this.waitForLocator(this.header1ForAnyPageLocator);
  }

  async scrollToLearnMore() {
    const learnMoreButton = this.page.locator(this.formEmailInputLocator);
    await learnMoreButton.scrollIntoViewIfNeeded();
  }

  async clickOnTheHamburgerViewNaviation() {
    await this.page.locator(this.hamburgerNavButtonLocator).click();
  }

  async clickOnOnlineProgramsButton() {
    await this.page
      .locator("a.mega-menu-link", {
        hasText: "Online Programs",
      })
      .click({ force: true });
  }

  async clickOnBusinessProgramButton() {
    await this.page
      .getByRole("link", { name: "Business Programs", exact: true })
      .click();
    await this.waitForLocator(this.header1ForAnyPageLocator);
  }

  async waitForLocator(locotorString: string) {
    await this.page.waitForSelector(locotorString);
  }

  async verifyHeader1IsPresent() {
    await this.page
      .locator(this.header1ForAnyPageLocator)
      .scrollIntoViewIfNeeded();
    await this.page.locator(this.header1ForAnyPageLocator).isVisible();
  }

  async verifyCssOfH1HeaderText(
    fontSize: string,
    fontWeight: string,
    fontFamily: string,
    color: string
  ) {
    await this.verifyCSSProperties(
      this.header1ForAnyPageLocator,
      fontSize,
      fontWeight,
      fontFamily,
      color
    );
  }
  async verifyHeaderCSSProperties(
    itemName: string,
    fontSize: string,
    fontWeight: string,
    fontFamily: string,
    color: string
  ) {
    switch (itemName) {
      case "online-program":
        await this.verifyCSSProperties(
          this.headerOnlinePrograButtonLocator,
          fontSize,
          fontWeight,
          fontFamily,
          color
        );
        break;
      case "getting-started":
        await this.verifyCSSProperties(
          this.headerGettingStartedButtonLocator,
          fontSize,
          fontWeight,
          fontFamily,
          color
        );
        break;
      case "resources":
        await this.verifyCSSProperties(
          this.headerResourceButtonLocator,
          fontSize,
          fontWeight,
          fontFamily,
          color
        );
        break;
    }
  }

  async test1() {
    console.log("APP2");
  }
}
