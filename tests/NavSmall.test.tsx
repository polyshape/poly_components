import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import NavSmall from "../src/nav/NavSmall.js";
import type { NavItem } from "../src/nav/Nav.js";

const stop: React.MouseEventHandler = (e) => e.preventDefault();

describe("NavSmall (mobile overlay)", () => {
  const items: NavItem[] = [
    { id: "home", label: "Home", href: "/home", onClick: stop },
    {
      id: "about", label: "About", href: "/about", onClick: stop,
      items: [
        { id: "team", label: "Team", href: "/about/team", onClick: stop },
        { id: "company", label: "Company", href: "/about/company", onClick: stop },
      ]
    },
  ];

  it("opens the overlay via burger and toggles inert attribute", async () => {
    const user = userEvent.setup();
    const { container } = render(<NavSmall items={items} />);
    const overlay = container.querySelector("div[aria-hidden]") as HTMLDivElement;
    expect(overlay).toHaveAttribute("inert");

    await user.click(screen.getByRole("button", { name: /open navigation/i }));
    expect(overlay).not.toHaveAttribute("inert");
    expect(overlay).toHaveAttribute("aria-hidden", "false");

    // Close via close button
    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(overlay).toHaveAttribute("inert");
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  it("expands and collapses a submenu", async () => {
    const user = userEvent.setup();
    render(<NavSmall items={items} />);
    await user.click(screen.getByRole("button", { name: /open navigation/i }));

    // open submenu by clicking About (preventDefault inside component)
    const aboutLink = await screen.findByRole("link", { name: "About" });
    fireEvent.click(aboutLink);
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();

    // collapse submenu by clicking About again
    fireEvent.click(aboutLink);
    expect(screen.queryByText("Team")).toBeNull();
    expect(screen.queryByText("Company")).toBeNull();
  });

  it("selects a leaf route and closes the overlay", async () => {
    const user = userEvent.setup();
    const { container } = render(<NavSmall items={items} />);
    const overlay = container.querySelector("div[aria-hidden]") as HTMLDivElement;
    await user.click(screen.getByRole("button", { name: /open navigation/i }));
    expect(overlay).toHaveAttribute("aria-hidden", "false");

    fireEvent.click(screen.getByText("Home"));
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });
});
