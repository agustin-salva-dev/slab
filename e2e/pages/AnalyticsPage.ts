import type { Page } from "@playwright/test";

export class AnalyticsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/dashboard/analytics");
  }

  get pageHeading() {
    return this.page.getByRole("heading", { level: 1 });
  }

  get chartsSection() {
    return this.page.locator("[class*='recharts'], svg");
  }
}
