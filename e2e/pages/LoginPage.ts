import type { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/login");
  }

  get pageTitle() {
    return this.page.getByText("Log in to Slab");
  }

  get googleButton() {
    return this.page.getByRole("button", { name: /continue with google/i });
  }

  get githubButton() {
    return this.page.getByRole("button", { name: /continue with github/i });
  }

  get redirectingText() {
    return this.page.getByText("Redirecting...");
  }
}
