import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Projects } from "../Projects";

describe("Projects section", () => {
  it("renders section header and description", () => {
    render(<Projects />);
    expect(screen.getByText(/featured work/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /projects that.*make an impact/i,
      })
    ).toBeInTheDocument();
  });

  it("renders all four project cards with titles, descriptions, and tags", () => {
    render(<Projects />);
    const expectedProjects = [
      "E-Commerce Platform",
      "Image Generator",
      "Weather Forecast App",
      "To Do App",
    ];

    expectedProjects.forEach((title) => {
      expect(
        screen.getByRole("heading", { level: 3, name: title })
      ).toBeInTheDocument();
    });

    // Check tags
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    expect(screen.getAllByText("JavaScript").length).toBeGreaterThan(0);
  });

  it("renders project images with accurate alt text", () => {
    render(<Projects />);
    expect(screen.getByAltText("E-Commerce Platform")).toHaveAttribute(
      "src",
      "/projects/project1.png"
    );
    expect(screen.getByAltText("Image Generator")).toHaveAttribute(
      "src",
      "/projects/project2.png"
    );
    expect(screen.getByAltText("Weather Forecast App")).toHaveAttribute(
      "src",
      "/projects/project3.png"
    );
    expect(screen.getByAltText("To Do App")).toHaveAttribute(
      "src",
      "/projects/project4.png"
    );
  });

  it("renders external demo and repository links with target=_blank", () => {
    render(<Projects />);
    const links = screen.getAllByRole("link");

    const ecommerceDemo = links.find((l) =>
      l.getAttribute("href")?.includes("e-commerce-pi-self.vercel.app")
    );
    const ecommerceRepo = links.find((l) =>
      l.getAttribute("href")?.includes("github.com/shaw-ankit/E-COMMERCE-")
    );

    expect(ecommerceDemo).toBeDefined();
    expect(ecommerceDemo).toHaveAttribute("target", "_blank");
    expect(ecommerceRepo).toBeDefined();
    expect(ecommerceRepo).toHaveAttribute("target", "_blank");
  });

  it("renders View All Projects button", () => {
    render(<Projects />);
    expect(
      screen.getByRole("button", { name: /view all projects/i })
    ).toBeInTheDocument();
  });
});
