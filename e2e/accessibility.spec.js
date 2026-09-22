import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Audit", () => {
  test("should not have any unexpected critical accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    // Filter for critical accessibility issues
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical"
    );

    expect(criticalViolations).toEqual([]);
  });
});
