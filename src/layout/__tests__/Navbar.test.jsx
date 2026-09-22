import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Navbar } from "../Navbar";

describe("Navbar component", () => {
  it("renders brand logo linking to top", () => {
    render(<Navbar />);
    const logo = screen.getByRole("link", { name: /portfolio\./i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "#");
  });

  it("renders desktop navigation links with correct anchor hrefs", () => {
    render(<Navbar />);
    const aboutLink = screen.getByRole("link", { name: /^about$/i });
    const projectsLink = screen.getByRole("link", { name: /^projects$/i });
    const experienceLink = screen.getByRole("link", { name: /^experience$/i });

    expect(aboutLink).toHaveAttribute("href", "#about");
    expect(projectsLink).toHaveAttribute("href", "#projects");
    expect(experienceLink).toHaveAttribute("href", "#experience");
  });

  it("renders Contact Me CTA linking to #contact", () => {
    render(<Navbar />);
    const contactLinks = screen.getAllByRole("link", { name: /contact me/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0]).toHaveAttribute("href", "#contact");
  });

  it("updates header styles on window scroll", () => {
    const { container } = render(<Navbar />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("bg-transparent py-5");

    // Simulate scroll past threshold (> 50)
    window.scrollY = 60;
    fireEvent.scroll(window);
    expect(header).toHaveClass("glass-strong py-3");

    // Simulate scroll back to top
    window.scrollY = 20;
    fireEvent.scroll(window);
    expect(header).toHaveClass("bg-transparent py-5");
  });

  it("cleans up the scroll listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Navbar />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });

  it("toggles mobile menu when hamburger button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Navbar />);

    // Hamburger button is the button inside nav without text
    const menuToggleBtn = container.querySelector("button.md\\:hidden");
    expect(menuToggleBtn).toBeInTheDocument();

    // Drawer is closed initially
    expect(container.querySelector(".animate-fade-in")).not.toBeInTheDocument();

    // Click to open
    await user.click(menuToggleBtn);
    const mobileDrawer = container.querySelector(".animate-fade-in");
    expect(mobileDrawer).toBeInTheDocument();

    // Mobile nav links are rendered
    const mobileAboutLink = screen.getAllByRole("link", { name: /^about$/i });
    expect(mobileAboutLink.length).toBe(2); // desktop + mobile

    // Click again to close
    await user.click(menuToggleBtn);
    expect(container.querySelector(".animate-fade-in")).not.toBeInTheDocument();
  });

  it("closes mobile menu when a mobile nav link is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Navbar />);
    const menuToggleBtn = container.querySelector("button.md\\:hidden");

    await user.click(menuToggleBtn);
    expect(container.querySelector(".animate-fade-in")).toBeInTheDocument();

    const mobileLinks = screen.getAllByRole("link", { name: /^about$/i });
    const mobileAbout = mobileLinks[mobileLinks.length - 1];
    await user.click(mobileAbout);

    expect(container.querySelector(".animate-fade-in")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
