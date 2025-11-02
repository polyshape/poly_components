import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Nav, { NavItem } from "../src/nav/Nav.js";
import { vi } from "vitest";

describe("Nav component", () => {
  const items: NavItem[] = [
    {
      id: "home",
      label: "Home",
      href: "/home",
    },
    {
      id: "about",
      label: "About",
      href: "/about",
      items: [
        { id: "team", label: "Team", href: "/about/team" },
        { id: "company", label: "Company", href: "/about/company" },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
      onClick: vi.fn(),
    },
  ];

  it("renders all nav items", () => {
    render(<Nav items={items} disableOverflow />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("calls onClick for leaf nav item", () => {
    render(<Nav items={items} disableOverflow />);
    fireEvent.click(screen.getByText("Contact"));
    expect(items[2].onClick).toHaveBeenCalled();
  });

  it("does not set active for parent with submenu", () => {
    render(<Nav items={items} disableOverflow />);
    fireEvent.click(screen.getByText("About"));
    const aboutLink = screen.getByText("About").closest("a");
    expect(aboutLink).not.toHaveAttribute("aria-current", "page");
  });

  it("sets active for leaf nav item", () => {
    render(<Nav items={items} disableOverflow />);
    fireEvent.click(screen.getByText("Home"));
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("shows submenu on hover for top variant", () => {
    render(<Nav items={items} disableOverflow variant="top" />);
    fireEvent.mouseEnter(screen.getByText("About"));
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("sets active for sub nav item", () => {
    render(<Nav items={items} disableOverflow variant="top" />);
    fireEvent.mouseEnter(screen.getByText("About"));
    fireEvent.click(screen.getByText("Team"));
    const teamLink = screen.getByText("Team").closest("a");
    expect(teamLink).toHaveAttribute("aria-current", "page");
  });

  it("renders side variant", () => {
    render(<Nav items={items} disableOverflow variant="side" showOnHover={false} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("opens default submenus in side variant via defaultOpenIds", () => {
    render(<Nav items={items} disableOverflow variant="side" defaultOpenIds={["about"]} showOnHover={false} />);
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("renders customLeft and customRight slots in top variant", () => {
    render(
      <Nav
        items={items}
        disableOverflow
        variant="top"
        customLeft={<span data-testid="left-slot">Left</span>}
        customRight={<span data-testid="right-slot">Right</span>}
      />
    );
    expect(screen.getByTestId("left-slot")).toBeInTheDocument();
    expect(screen.getByTestId("right-slot")).toBeInTheDocument();
  });

  it("switches to small navigation under responsiveBreakpoint", () => {
    const original = window.innerWidth;
    // Force a small viewport
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 400 });
    window.dispatchEvent(new Event("resize"));
    render(<Nav items={items} responsiveBreakpoint={500} />);
    // Burger button from NavSmall
    expect(screen.getByRole("button", { name: /open navigation/i })).toBeInTheDocument();
    // Restore
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: original });
  });

  it("opens submenu in side variant on click", () => {
    render(<Nav items={items} disableOverflow variant="side" showOnHover={false} />);
    fireEvent.click(screen.getByText("About"));
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("sets active for sub nav item in side variant", () => {
    render(<Nav items={items} disableOverflow variant="side" showOnHover={false} />);
    fireEvent.click(screen.getByText("About"));
    fireEvent.click(screen.getByText("Company"));
    const companyLink = screen.getByText("Company").closest("a");
    expect(companyLink).toHaveAttribute("aria-current", "page");
  });

  it("applies border when showBorder is true", () => {
    const { container } = render(<Nav items={items} disableOverflow showBorder={true} />);
    const header = container.firstChild as HTMLElement;
    const style = getComputedStyle(header);
    expect(style.borderBottomWidth !== "0px" || style.borderRightWidth !== "0px").toBe(true);
  });

  it("does not apply border when showBorder is false", () => {
    const { container } = render(<Nav items={items} disableOverflow showBorder={false} />);
    const header = container.firstChild as HTMLElement;
    expect(header.className).not.toMatch(/rootTopBorder|rootSideBorder/);
  });

  it("uses href when both href and to are defined", () => {
    const items: NavItem[] = [
      { id: "item1", label: "Item 1", href: "/href", to: "/to" },
    ];
    render(<Nav items={items} disableOverflow />);
    const link = screen.getByText("Item 1").closest("a");
    expect(link).toHaveAttribute("href", "/href");
    expect(link).not.toHaveAttribute("to");
  });

  it("uses to when href is not defined and as is custom link", () => {
    const DummyLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }>((props, ref) => (
      <a ref={ref} data-testid="dummy-link" {...props} />
    ));
    DummyLink.displayName = "DummyLink";
    const items: NavItem[] = [
      { id: "item2", label: "Item 2", to: "/to" },
    ];
    render(<Nav items={items} disableOverflow as={DummyLink} linkProp="to" />);
    const link = screen.getByTestId("dummy-link");
    expect(link).toHaveAttribute("to", "/to");
    expect(link).not.toHaveAttribute("href");
  });

  it("uses href for anchor when only href is defined", () => {
    const items: NavItem[] = [
      { id: "item3", label: "Item 3", href: "/href" },
    ];
    render(<Nav items={items} disableOverflow />);
    const link = screen.getByText("Item 3").closest("a");
    expect(link).toHaveAttribute("href", "/href");
  });

  it("does not render link if neither href nor to is defined", () => {
    const items: NavItem[] = [
      { id: "item4", label: "Item 4" },
    ];
    render(<Nav items={items} disableOverflow />);
    expect(screen.getByText("Item 4").closest("a")).toBeNull();
  });
});
