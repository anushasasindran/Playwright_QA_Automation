import { Page } from "@playwright/test";
import { Homepage } from "./Homepage.page";
import { HeaderFooter } from "./HeaderFooter.page";

export default class PageManagerApp2 {
  private readonly page: Page;
  private readonly homepage: Homepage;
  private readonly headerfooterpage: HeaderFooter;
  constructor(page: Page) {
    this.page = page;
    this.homepage = new Homepage(this.page);
    this.headerfooterpage = new HeaderFooter(this.page);
  }

  homePage() {
    return this.homepage;
  }
  headerFooter() {
    return this.headerfooterpage;
  }
}
