import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";
import { Contact } from "../Contact";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

describe("Contact section", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders section header, form fields, and submit button", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /let's build something great/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/your name\.\.\./i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your@email\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your message\.\.\./i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("handles user typing and controlled input state", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/your name\.\.\./i);
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    const messageInput = screen.getByPlaceholderText(/your message\.\.\./i);

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.type(messageInput, "Hello Ankit, let's connect!");

    expect(nameInput).toHaveValue("Jane Doe");
    expect(emailInput).toHaveValue("jane@example.com");
    expect(messageInput).toHaveValue("Hello Ankit, let's connect!");
  });

  it("shows an error banner if EmailJS environment variables are not set", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/your name\.\.\./i);
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    const messageInput = screen.getByPlaceholderText(/your message\.\.\./i);
    const submitBtn = screen.getByRole("button", { name: /send message/i });

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.type(messageInput, "Hello!");

    await user.click(submitBtn);

    await waitFor(() => {
      // Note: Contact.jsx catch block checks error.text, but Error objects use error.message,
      // so it falls back to the default error message: "Failed to send message. Please try again later."
      expect(
        screen.getByText(/Failed to send message\. Please try again later\./i)
      ).toBeInTheDocument();
    });
  });

  it("submits the form successfully when environment variables and EmailJS are configured", async () => {
    const user = userEvent.setup();

    // Mock environment variables
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service_123");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "template_456");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "pub_789");

    let resolveEmail;
    emailjs.send.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveEmail = resolve;
      })
    );

    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/your name\.\.\./i);
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    const messageInput = screen.getByPlaceholderText(/your message\.\.\./i);
    const submitBtn = screen.getByRole("button", { name: /send message/i });

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.type(messageInput, "Great portfolio!");

    await user.click(submitBtn);

    // Verify loading state while promise is pending
    expect(screen.getByRole("button", { name: /sending\.\.\./i })).toBeDisabled();

    // Resolve the email send
    resolveEmail({ status: 200, text: "OK" });

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledWith(
        "service_123",
        "template_456",
        {
          name: "Jane Doe",
          email: "jane@example.com",
          message: "Great portfolio!",
        },
        "pub_789"
      );
    });

    // Verify success banner and form reset
    await waitFor(() => {
      expect(
        screen.getByText(/Message sent successfully!/i)
      ).toBeInTheDocument();
    });

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(messageInput).toHaveValue("");

    vi.unstubAllEnvs();
  });

  it("displays an error message when emailjs.send fails", async () => {
    const user = userEvent.setup();

    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service_123");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "template_456");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "pub_789");

    emailjs.send.mockRejectedValueOnce({
      text: "Service temporarily unavailable",
    });

    render(<Contact />);

    const nameInput = screen.getByPlaceholderText(/your name\.\.\./i);
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    const messageInput = screen.getByPlaceholderText(/your message\.\.\./i);
    const submitBtn = screen.getByRole("button", { name: /send message/i });

    await user.type(nameInput, "Jane Doe");
    await user.type(emailInput, "jane@example.com");
    await user.type(messageInput, "Let's work together");

    await user.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/Service temporarily unavailable/i)
      ).toBeInTheDocument();
    });

    vi.unstubAllEnvs();
  });

  it("renders contact information links for email and phone", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", {
      name: /ankitshaw760@gmail\.com/i,
    });
    const phoneLink = screen.getByRole("link", { name: /\+91 8637229043/i });

    expect(emailLink).toHaveAttribute("href", "mailto:ankitshaw760@gmail.com");
    expect(phoneLink).toHaveAttribute("href", "tel:+918637229043");

    expect(screen.getByText(/Bangalore, Karnataka, 560068, India/i)).toBeInTheDocument();
    expect(screen.getByText(/Currently Available/i)).toBeInTheDocument();
  });
});
