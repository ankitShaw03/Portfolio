import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Testimonials } from "../Testimonials";

describe("Testimonials section", () => {
  it("renders initial active testimonial", () => {
    render(<Testimonials />);
    expect(screen.getByText(/Sarah Chen/i)).toBeInTheDocument();
    expect(screen.getByText(/CTO, Tech Innovators Inc\./i)).toBeInTheDocument();
  });

  it("navigates forward when next button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Testimonials />);

    const buttons = container.querySelectorAll("button");
    const nextBtn = buttons[buttons.length - 1]; // Right button

    await user.click(nextBtn);
    expect(screen.getByText(/Michael Rodriguez/i)).toBeInTheDocument();
  });

  it("navigates backward and wraps around when previous button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Testimonials />);

    const buttons = container.querySelectorAll("button");
    const prevBtn = buttons[0]; // Left button

    await user.click(prevBtn);
    // Should wrap around to last testimonial: David Kim
    expect(screen.getByText(/David Kim/i)).toBeInTheDocument();
  });

  it("navigates directly when dot indicator is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Testimonials />);

    // The dot indicator buttons are between prev and next buttons
    const buttons = container.querySelectorAll("button");
    // buttons[0] = prev, buttons[1..4] = indicators, buttons[5] = next
    const thirdIndicator = buttons[3]; // Emily Watson (index 2)

    await user.click(thirdIndicator);
    expect(screen.getByText(/Emily Watson/i)).toBeInTheDocument();
  });
});
