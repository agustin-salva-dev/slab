import type { Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/dashboard");
  }

  get createLinkButton() {
    return this.page
      .getByRole("button", { name: /create a link/i })
      .filter({ hasNot: this.page.locator(".hidden") })
      .first();
  }

  get searchBar() {
    return this.page.getByRole("textbox", { name: /search/i });
  }

  get createModal() {
    return this.page.getByRole("dialog");
  }

  get modalTitle() {
    return this.page.getByRole("heading", { name: /create new link/i });
  }

  get originalUrlInput() {
    return this.page.getByLabel("Destination URL");
  }

  get shortSlugInput() {
    return this.page.getByLabel("Short link name");
  }

  get descriptionInput() {
    return this.page.getByLabel(/description/i);
  }

  get submitCreateButton() {
    return this.page.getByRole("button", { name: /^create$/i });
  }

  get cancelCreateButton() {
    return this.page.getByRole("button", { name: /cancel/i });
  }

  async openCreateModal() {
    await this.createLinkButton.click();
    await this.createModal.waitFor({ state: "visible" });
  }

  async fillAndSubmitCreateForm(data: {
    url: string;
    slug: string;
    description?: string;
  }) {
    await this.originalUrlInput.fill(data.url);
    await this.shortSlugInput.fill(data.slug);
    if (data.description) {
      await this.descriptionInput.fill(data.description);
    }
    await this.submitCreateButton.click();
  }

  get linkCards() {
    return this.page.locator('[data-testid="link-card"]');
  }

  getCopyButtonForSlug(slug: string) {
    return this.page
      .locator("article, [class*='card']")
      .filter({ hasText: slug })
      .getByRole("button", { name: /copy my link/i });
  }

  getEditButtonForSlug(slug: string) {
    return this.page
      .locator("article, [class*='card']")
      .filter({ hasText: slug })
      .getByRole("button", { name: /edit link/i });
  }

  getDeleteButtonForSlug(slug: string) {
    return this.page
      .locator("article, [class*='card']")
      .filter({ hasText: slug })
      .getByRole("button", { name: /delete link/i });
  }

  get successToast() {
    return this.page.getByText(/link created/i);
  }

  get copySuccessToast() {
    return this.page.getByText(/link copied/i);
  }

  get deleteModal() {
    return this.page.getByRole("alertdialog").or(this.page.getByRole("dialog"));
  }

  get confirmDeleteButton() {
    return this.page.getByRole("button", { name: /delete/i });
  }
}
