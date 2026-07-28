import { test, expect } from "./fixtures/base.fixture";
import { HomePage } from "./pages/HomePage";

test.describe("Public Navigation & Smoke Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("Landing page renders the main H1 heading", async () => {
    await expect(homePage.heading).toBeVisible();
    await expect(homePage.heading).toContainText(/digital reach/i);
  });

  test("Landing page renders the footer", async () => {
    await expect(homePage.footer).toBeVisible();
  });

  test("Landing page has correct title tag", async ({ page }) => {
    await expect(page).toHaveTitle(/slab/i);
  });

  test("Navbar menu opens on trigger click", async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();

    await homePage.openNavMenu();

    await expect(homePage.navMenuContent).toBeVisible();
  });

  test("Navbar menu contains Login, Docs, and Report Bug entries", async ({
    page,
  }) => {
    homePage = new HomePage(page);
    await homePage.goto();

    await homePage.openNavMenu();

    await expect(homePage.navMenuLoginLink).toBeVisible();
    await expect(homePage.navMenuDocsLink).toBeVisible();
    await expect(homePage.navMenuReportBugLink).toBeVisible();
  });

  test("Navigating to /docs loads without error", async ({ page }) => {
    await page.goto("/docs");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("Navigating to /report-bug loads without error", async ({ page }) => {
    await page.goto("/report-bug");
    await expect(page).not.toHaveURL(/error|404/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("Mobile viewport renders navbar menu button", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await homePage.goto();

    const menuTrigger = page
      .getByRole("button", { name: /get started|user menu|open menu/i })
      .first();

    await expect(menuTrigger).toBeVisible();
  });
});
