import { Locator, Page, expect } from "@playwright/test";

export class HelperBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForNumberOfSeconds(timeInSeconds: number) {
    this.page.waitForTimeout(timeInSeconds * 1000);
  }

  async verifyCSSProperties(
    cssLocator,
    fontSize: string,
    fontWeight: string,
    fontFamily: string,
    color: string
  ) {
    await expect(cssLocator).toHaveCSS(
      "font-size",
      fontSize
    );
    await expect(cssLocator).toHaveCSS("color", color);
    await expect(cssLocator).toHaveCSS(
      "font-family",
      fontFamily
    );
    await expect(cssLocator).toHaveCSS(
      "font-weight",
      fontWeight
    );
  }


  async scrollElementIntoViewHorizontally(element: Locator) {
    const boundingBox = await element.boundingBox();
    if (boundingBox) {
      // Calculate the scrollLeft value to make the element visible
      const scrollLeft = boundingBox.x;
      // Scroll the page horizontally to make the element visible 
      await this.page.evaluate((scrollLeft) => {
        window.scrollTo(
          { left: scrollLeft, behavior: 'smooth' });
      },
        scrollLeft);
    }
  }
}
