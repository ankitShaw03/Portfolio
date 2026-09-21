import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";

describe("Hero section", () => {
  it("renders main headline and role badge", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Software Development Engineer \[SDE\]/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /experienced in developing/i })
    ).toBeInTheDocument();
  });

  it("renders introduction bio text", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Hi, I'm Ankit Shaw — Frontend Developer/i)
    ).toBeInTheDocument();
  });

  it("renders CTAs for Contact and Download CV with download attribute", () => {
    render(<Hero />);
    const contactBtn = screen.getByRole("link", { name: /contact me/i });
    expect(contactBtn).toHaveAttribute("href", "#contact");

    const cvLink = screen.getByRole("link", { name: /download cv/i });
    expect(cvLink).toHaveAttribute("href", "/resume.pdf");
    expect(cvLink).toHaveAttribute("download", "Ankit_Shaw_Resume.pdf");
  });

  it("renders external social links with target=_blank", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    const githubLink = links.find((l) =>
      l.getAttribute("href")?.includes("github.com/shaw-ankit")
    );
    const linkedinLink = links.find((l) =>
      l.getAttribute("href")?.includes("linkedin.com/in/ankit-shaw")
    );

    expect(githubLink).toBeDefined();
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toBeDefined();
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("renders profile image with accessible alt text and floating badges", () => {
    render(<Hero />);
    const profileImg = screen.getByAltText("Ankit Shaw");
    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveAttribute("src", "/profile-photo.jpg");

    expect(screen.getByText(/Available for work/i)).toBeInTheDocument();
    expect(screen.getByText("2+")).toBeInTheDocument();
    expect(screen.getByText(/Years Exp\./i)).toBeInTheDocument();
  });

  it("renders skills marquee items", () => {
    render(<Hero />);
    expect(screen.getByText(/Technologies I work with/i)).toBeInTheDocument();
    // marquee renders skills twice for infinite loop
    const reactSkills = screen.getAllByText("React.js");
    expect(reactSkills.length).toBeGreaterThanOrEqual(2);

    const tsSkills = screen.getAllByText("TypeScript");
    expect(tsSkills.length).toBeGreaterThanOrEqual(2);
  });

  it("renders scroll down indicator linking to #about", () => {
    render(<Hero />);
    const scrollLink = screen.getByRole("link", { name: /scroll/i });
    expect(scrollLink).toHaveAttribute("href", "#about");
  });
});
