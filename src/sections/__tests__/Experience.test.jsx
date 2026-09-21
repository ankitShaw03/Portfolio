import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Experience } from "../Experience";

describe("Experience section", () => {
  it("renders section label and heading", () => {
    render(<Experience />);
    expect(screen.getByText(/career journey/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /experience that speaks volumes/i,
      })
    ).toBeInTheDocument();
  });

  it("renders career timeline entries with roles and company", () => {
    render(<Experience />);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Software Development Engineer",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Frontend Developer Intern",
      })
    ).toBeInTheDocument();

    const companies = screen.getAllByText(/Cubic Logics Pvt Ltd/i);
    expect(companies.length).toBe(2);
  });

  it("renders active pulse indicator for current role", () => {
    const { container } = render(<Experience />);
    const pingElement = container.querySelector(".animate-ping");
    expect(pingElement).toBeInTheDocument();
  });

  it("renders technology chips for timeline items", () => {
    render(<Experience />);
    expect(screen.getAllByText("Chart.js").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("React Stepper").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Redux").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThanOrEqual(1);
  });
});
