import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies default size classes when no size is provided", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button", { name: /default/i });
    expect(button.className).toContain("px-6 py-3 text-base");
  });

  it("applies small (sm) size classes correctly", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button", { name: /small/i });
    expect(button.className).toContain("px-4 py-2 text-sm");
  });

  it("applies large (lg) size classes correctly", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button", { name: /large/i });
    expect(button.className).toContain("px-8 py-4 text-lg");
  });

  it("merges additional custom classNames", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button.className).toContain("custom-class");
  });

  it("forwards standard button attributes like type and disabled", () => {
    render(
      <Button type="submit" disabled aria-label="Submit form">
        Submit
      </Button>
    );
    const button = screen.getByRole("button", { name: /submit form/i });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });

  it("handles user click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Action</Button>);
    const button = screen.getByRole("button", { name: /action/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Action
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled action/i });

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
