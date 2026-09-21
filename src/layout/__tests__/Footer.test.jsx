import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Footer } from "../Footer";

describe("Footer component", () => {
  it("renders the current year and copyright notice dynamically", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} Ankit Shaw`, "i"))
    ).toBeInTheDocument();
  });

  it("renders back-to-top link", () => {
    render(<Footer />);
    const topLink = screen.getByRole("link", { name: /↑/i });
    expect(topLink).toBeInTheDocument();
    expect(topLink).toHaveAttribute("href", "#");
  });

  it("renders all footer navigation links with correct hrefs", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /^about$/i })).toHaveAttribute(
      "href",
      "#about"
    );
    expect(screen.getByRole("link", { name: /^projects$/i })).toHaveAttribute(
      "href",
      "#projects"
    );
    expect(screen.getByRole("link", { name: /^experience$/i })).toHaveAttribute(
      "href",
      "#experience"
    );
    expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("renders social links with appropriate aria-labels and target=_blank", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/shaw-ankit"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");

    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ankit-shaw-836844268/"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("has no critical accessibility violations", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
