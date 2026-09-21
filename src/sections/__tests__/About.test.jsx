import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { About } from "../About";

describe("About section", () => {
  it("renders section label and heading", () => {
    render(<About />);
    expect(screen.getByText(/about me/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /building the future/i,
      })
    ).toBeInTheDocument();
  });

  it("renders biographical content and mission statement quote", () => {
    render(<About />);
    expect(
      screen.getByText(/passionate Software Engineer with over 2 years of experience/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/My mission is to create digital experiences that are not just functional/i)
    ).toBeInTheDocument();
  });

  it("renders all four highlight cards with titles and descriptions", () => {
    render(<About />);
    const expectedHighlights = [
      {
        title: "Clean Code",
        desc: /Writing maintainable, scalable code/i,
      },
      {
        title: "Performance",
        desc: /Optimizing for speed/i,
      },
      {
        title: "Collaboration",
        desc: /Working closely with teams/i,
      },
      {
        title: "Innovation",
        desc: /Staying ahead with the latest technologies/i,
      },
    ];

    expectedHighlights.forEach(({ title, desc }) => {
      expect(
        screen.getByRole("heading", { level: 3, name: title })
      ).toBeInTheDocument();
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  it("has no critical accessibility violations", async () => {
    const { container } = render(<About />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
