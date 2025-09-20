import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme, ThemeToggle } from "../src";

function ThemeProbe() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>toggle</button>
    </div>
  );
}

describe("Theming", () => {
  it("applies theme-light variables and class, and toggles to dark", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider initialTheme="light">
        <ThemeProbe />
      </ThemeProvider>
    );

    const root = document.documentElement;
    // initial state
    expect(root.classList.contains("theme-light")).toBe(true);
    expect(screen.getByTestId("theme").textContent).toBe("light");
    expect(root.style.getPropertyValue("--pc-bg").trim()).toBe("#ffffff");
    expect(root.style.getPropertyValue("--pc-accent").trim()).toBe("#D69D0D");

    // toggle to dark via hook
    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(root.classList.contains("theme-dark")).toBe(true);
    expect(screen.getByTestId("theme").textContent).toBe("dark");
    expect(root.style.getPropertyValue("--pc-bg").trim()).toBe("#393b41");
  });

  it("ThemeToggle switches theme from light to dark", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider initialTheme="light">
        <ThemeToggle />
      </ThemeProvider>
    );

    const root = document.documentElement;
    expect(root.classList.contains("theme-light")).toBe(true);
    // click the icon-only button (has role button without name)
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(root.classList.contains("theme-dark")).toBe(true);
  });

  it("sets pagination tokens for light theme", () => {
    render(
      <ThemeProvider initialTheme="light">
        <div />
      </ThemeProvider>
    );
    const root = document.documentElement;
    expect(root.style.getPropertyValue("--pc-page-bg").trim()).toBe(
      "var(--arrow-bg, rgba(255,255,255,0.5))"
    );
    expect(root.style.getPropertyValue("--pc-page-border").trim()).toBe(
      "var(--border, rgba(0,0,0,0.12))"
    );
    expect(root.style.getPropertyValue("--pc-page-hover-bg").trim()).toBe(
      "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 12%, var(--arrow-bg, rgba(255,255,255,0.5)))"
    );
    expect(root.style.getPropertyValue("--pc-page-active-bg").trim()).toBe(
      "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 18%, var(--arrow-bg, rgba(255,255,255,0.5)))"
    );
    expect(root.style.getPropertyValue("--pc-page-active-border").trim()).toBe(
      "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 40%, var(--border, rgba(0,0,0,0.12)))"
    );
  });

  it("sets pagination tokens for dark theme", () => {
    render(
      <ThemeProvider initialTheme="dark">
        <div />
      </ThemeProvider>
    );
    const root = document.documentElement;
    expect(root.style.getPropertyValue("--pc-page-bg").trim()).toBe(
      "var(--arrow-bg, rgba(255,255,255,0.04))"
    );
    expect(root.style.getPropertyValue("--pc-page-border").trim()).toBe(
      "var(--border, rgba(255,255,255,0.08))"
    );
    expect(root.style.getPropertyValue("--pc-page-hover-bg").trim()).toBe(
      "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 12%, var(--arrow-bg, rgba(255,255,255,0.04)))"
    );
    expect(root.style.getPropertyValue("--pc-page-active-bg").trim()).toBe(
      "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 18%, var(--arrow-bg, rgba(255,255,255,0.04)))"
    );
    expect(root.style.getPropertyValue("--pc-page-active-border").trim()).toBe(
      "color-mix(in srgb, var(--primary-link, var(--pc-accent)) 40%, var(--border, rgba(255,255,255,0.08)))"
    );
  });
});
