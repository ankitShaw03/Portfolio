import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Integration", () => {
  it("renders full portfolio structure without crashing", () => {
    const { container } = render(<App />);

    // Header / Navbar
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Main landmark and sections
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#projects")).toBeInTheDocument();
    expect(container.querySelector("#experience")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();

    // Footer
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
