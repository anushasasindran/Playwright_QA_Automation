import { Page } from "@playwright/test";
import { Homepage } from "./Homepage.page";
import { HeaderFooter } from "./HeaderFooter.page";
import { ProgramPage } from "./programPage.page";

export default class PageManagerApp1 {
  private readonly page: Page;
  private readonly homepage: Homepage;
  private readonly headerfooterpage: HeaderFooter;
  private readonly programPage: ProgramPage;
  constructor(page: Page) {
    this.page = page;
    this.homepage = new Homepage(this.page);
    this.headerfooterpage = new HeaderFooter(this.page);
    this.programPage = new ProgramPage(this.page);
  }

  homePage() {
    return this.homepage;
  }
  headerFooter() {
    return this.headerfooterpage;
  }
  programPages() {
    return this.programPage;
  }
}


