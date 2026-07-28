import { test, expect } from "./fixtures/base.fixture";
import { DashboardPage } from "./pages/DashboardPage";

test.describe("Dashboard Link Management @authenticated", () => {
  test.use({ storageState: "e2e/.auth/user.json" });

  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
  });

  test("Dashboard renders the Create a link button", async () => {
    await expect(dashboardPage.createLinkButton).toBeVisible();
  });

  test("Create modal opens when clicking Create a link", async () => {
    await dashboardPage.openCreateModal();

    await expect(dashboardPage.createModal).toBeVisible();
    await expect(dashboardPage.modalTitle).toBeVisible();
  });

  test("Create modal can be dismissed with Cancel", async () => {
    await dashboardPage.openCreateModal();

    await expect(dashboardPage.createModal).toBeVisible();
    await dashboardPage.cancelCreateButton.click();
    await expect(dashboardPage.createModal).not.toBeVisible();
  });

  test("Create modal form validates empty submission", async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.openCreateModal();

    await dashboardPage.submitCreateButton.click();

    const validationError = page.locator(".text-my-accents-red").first();
    await expect(validationError).toBeVisible();
  });

  test("Creating a valid link closes the modal and shows a success toast", async ({
    page,
  }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.openCreateModal();

    const testSlug = `e2e-${Date.now().toString().slice(-8)}`;
    await dashboardPage.fillAndSubmitCreateForm({
      url: "https://playwright.dev",
      slug: testSlug,
      description: "E2E test link",
    });

    await expect(dashboardPage.createModal).not.toBeVisible({ timeout: 10000 });

    await expect(dashboardPage.successToast).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(testSlug)).toBeVisible({ timeout: 10000 });
  });

  test("Copy button shows feedback and triggers success toast", async ({
    page,
    context,
  }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const firstCard = page.locator("h3").first();
    await firstCard.waitFor({ state: "visible", timeout: 10000 });

    const slugText = await firstCard.textContent();
    const slug = slugText?.replace("/", "").trim() ?? "";

    if (!slug) {
      test.skip(true, "No links found in dashboard to test copy action.");
      return;
    }

    const copyButton = dashboardPage.getCopyButtonForSlug(slug);
    await copyButton.click();

    await expect(dashboardPage.copySuccessToast).toBeVisible({ timeout: 3000 });

    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(clipboardContent).toContain(`/s/${slug}`);
  });

  test("Delete button opens confirmation dialog", async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    const firstHeading = page.locator("h3").first();
    await firstHeading.waitFor({ state: "visible", timeout: 10000 });

    const slugText = await firstHeading.textContent();
    const slug = slugText?.replace("/", "").trim() ?? "";

    if (!slug) {
      test.skip(true, "No links found to test delete action.");
      return;
    }

    const deleteButton = dashboardPage.getDeleteButtonForSlug(slug);
    await deleteButton.click();

    await expect(dashboardPage.deleteModal).toBeVisible({ timeout: 3000 });
  });
});
