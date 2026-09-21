import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnimatedBorderButton } from "../AnimatedBorderButton";

describe("AnimatedBorderButton component", () => {
  it("renders children correctly as a button by default", () => {
    render(<AnimatedBorderButton>Download CV</AnimatedBorderButton>);
    expect(
      screen.getByRole("button", { name: /download cv/i })
    ).toBeInTheDocument();
  });

  it("renders SVG border path with expected attributes", () => {
    const { container } = render(
      <AnimatedBorderButton>Download CV</AnimatedBorderButton>
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("download-cv-border");

    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path).toHaveClass("animated-border-path");
    expect(path).toHaveAttribute("stroke", "var(--color-primary)");
  });

  it("applies animated-border and styling classes", () => {
    render(<AnimatedBorderButton>Action</AnimatedBorderButton>);
    const button = screen.getByRole("button", { name: /action/i });
    expect(button.className).toContain("animated-border");
    expect(button.className).toContain("rounded-full");
  });

  it("forwards props and handles user clicks when rendered as button", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <AnimatedBorderButton onClick={handleClick} data-testid="custom-btn">
        Click Me
      </AnimatedBorderButton>
    );

    const button = screen.getByTestId("custom-btn");
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders polymorphically as an anchor link with href and download attributes", () => {
    render(
      <AnimatedBorderButton
        as="a"
        href="/resume.pdf"
        download="Ankit_Shaw_Resume.pdf"
      >
        Download CV
      </AnimatedBorderButton>
    );

    const link = screen.getByRole("link", { name: /download cv/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(link).toHaveAttribute("download", "Ankit_Shaw_Resume.pdf");
  });
});
