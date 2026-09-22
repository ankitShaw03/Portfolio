import { test, expect } from "@playwright/test";

test.describe("Contact Form and Information Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("validates required fields before submission", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: /send message/i });
    await submitBtn.click();

    // Name field is required, so it will remain invalid and form does not submit
    const nameInput = page.locator("#name");
    const isInvalid = await nameInput.evaluate(
      (el) => !el.checkValidity()
    );
    expect(isInvalid).toBe(true);
  });

  test("displays error banner when submitting without EmailJS credentials", async ({
    page,
  }) => {
    const nameInput = page.locator("#name");
    const emailInput = page.getByPlaceholder(/your@email\.com/i);
    const messageInput = page.getByPlaceholder(/your message\.\.\./i);
    const submitBtn = page.getByRole("button", { name: /send message/i });

    await nameInput.fill("Test User");
    await emailInput.fill("test@example.com");
    await messageInput.fill("This is an automated E2E test message.");

    await submitBtn.click();

    // Without environment variables set, error banner appears
    await expect(
      page.getByText(/EmailJS configuration is missing/i)
    ).toBeVisible();
  });

  test("contains active contact communication links", async ({ page }) => {
    const emailLink = page.getByRole("link", {
      name: /ankitshaw760@gmail\.com/i,
    });
    const phoneLink = page.getByRole("link", { name: /\+91 8637229043/i });

    await expect(emailLink).toHaveAttribute("href", "mailto:ankitshaw760@gmail.com");
    await expect(phoneLink).toHaveAttribute("href", "tel:+918637229043");
  });
});
