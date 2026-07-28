import { test, expect } from "./fixtures/base.fixture";

test.describe("Link Redirection", () => {
  test("Visiting an invalid slug shows a not-found response", async ({
    page,
  }) => {
    const response = await page.goto("/s/e2e-nonexistent-slug-xyz-404");

    expect(response?.status()).toBe(404);
  });

  test("Not-found page body is visible and does not crash the app", async ({
    page,
  }) => {
    await page.goto("/s/e2e-nonexistent-slug-xyz-404");

    await expect(page.locator("body")).toBeVisible();
    await expect(
      page.getByText(/application error|unhandled/i),
    ).not.toBeVisible();
  });

  test("Active slug redirects to its destination URL", async ({ page }) => {
    const slug = process.env.E2E_TEST_SLUG || "e2e-test-slug";
    const destination =
      process.env.E2E_TEST_DESTINATION || "https://google.com";

    await page.goto(`/s/${slug}`);

    const urlPattern = destination.replace(/^https?:\/\//, "");
    await expect(page).toHaveURL(
      new RegExp(urlPattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  });
});
