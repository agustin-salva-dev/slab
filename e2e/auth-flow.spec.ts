import { test, expect } from "./fixtures/base.fixture";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";

test.describe("Auth Flow & Route Protection", () => {
  test("Unauthenticated user is redirected from /dashboard to /login", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/login/);
  });

  test("Unauthenticated user is redirected from /dashboard/analytics to /login", async ({
    page,
  }) => {
    await page.goto("/dashboard/analytics");

    await expect(page).toHaveURL(/\/login/);
  });

  test.describe("Login page", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();
    });

    test("Renders the card title", async () => {
      await expect(loginPage.pageTitle).toBeVisible();
    });

    test("Renders Continue with Google button", async () => {
      await expect(loginPage.googleButton).toBeVisible();
    });

    test("Renders Continue with Github button", async () => {
      await expect(loginPage.githubButton).toBeVisible();
    });

    test("Google button shows loading state after click", async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();

      await loginPage.googleButton.click();

      await expect(loginPage.redirectingText).toBeVisible({ timeout: 3000 });
    });

    test("Github button shows loading state after click", async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goto();

      await loginPage.githubButton.click();

      await expect(loginPage.redirectingText).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe("Dashboard access requires session", () => {
    test("Dashboard page redirects and does not render link list without auth", async ({
      page,
    }) => {
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.goto();

      await expect(page).not.toHaveURL("/dashboard");
      await expect(page).toHaveURL(/\/login/);
    });

    test("Analytics page redirects without auth", async ({ page }) => {
      const analyticsPage = new AnalyticsPage(page);
      await analyticsPage.goto();

      await expect(page).toHaveURL(/\/login/);
    });
  });
});
