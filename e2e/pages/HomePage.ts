import type { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  get heading() {
    return this.page.getByRole("heading", { level: 1 });
  }

  get footer() {
    return this.page.locator("footer");
  }

  get navMenuTrigger() {
    return this.page.getByRole("button", { name: /get started/i });
  }

  async openNavMenu() {
    await this.navMenuTrigger.click();
  }

  get navMenuContent() {
    return this.page.getByRole("menu");
  }

  get navMenuLoginLink() {
    return this.page.getByRole("menuitem", { name: /log in/i });
  }

  get navMenuDocsLink() {
    return this.page.getByRole("menuitem", { name: /architecture/i });
  }

  get navMenuReportBugLink() {
    return this.page.getByRole("menuitem", { name: /report a bug/i });
  }
}
