import { test, expect } from "@playwright/test";

test.describe("Portfolio Navigation and Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads page and displays hero section", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(/experienced in developing/i);
    await expect(page.getByText(/Software Development Engineer \[SDE\]/i)).toBeVisible();
  });

  test("desktop navbar contains correct anchor links and scrolls to sections", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Desktop test only");

    const nav = page.locator("header nav");
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "#projects");
    await expect(nav.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "#experience");

    // Click 'About' link and verify URL contains hash
    await nav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/#about/);

    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();
  });

  test("mobile drawer toggles and closes on link click", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Mobile test only");

    // Hamburger button
    const menuButton = page.locator("nav button.md\\:hidden");
    await expect(menuButton).toBeVisible();

    // Drawer is closed initially
    const mobileDrawer = page.locator(".animate-fade-in.md\\:hidden");
    await expect(mobileDrawer).not.toBeVisible();

    // Open drawer
    await menuButton.click();
    await expect(mobileDrawer).toBeVisible();

    // Click mobile link
    const mobileAboutLink = mobileDrawer.getByRole("link", { name: "About" });
    await mobileAboutLink.click();

    // Drawer should close
    await expect(mobileDrawer).not.toBeVisible();
    await expect(page).toHaveURL(/#about/);
  });

  test("external links have target=_blank", async ({ page }) => {
    const githubLinks = page.locator('a[href*="github.com"]');
    const count = await githubLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(githubLinks.nth(i)).toHaveAttribute("target", "_blank");
    }
  });
});
