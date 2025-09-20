import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../src/button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("defaults type to button and can be overridden", () => {
    const { rerender } = render(<Button>Do</Button>);
    const btn = screen.getByRole("button", { name: /do/i });
    expect(btn).toHaveAttribute("type", "button");

    rerender(<Button type="submit">Do</Button>);
    expect(screen.getByRole("button", { name: /do/i })).toHaveAttribute("type", "submit");
  });

  it("calls onClick when enabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    await user.click(screen.getByRole("button", { name: /tap/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is set and prevents clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows spinner and disables when loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Loading
      </Button>
    );
    const btn = screen.getByRole("button", { name: /loading/i });
    expect(btn).toBeDisabled();
    // Spinner icon exists
    expect(btn.querySelector(".fa-circle-notch")).toBeTruthy();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders leading and trailing icons", () => {
    render(
      <Button icon={<span data-testid="left" />} iconAfter={<span data-testid="right" />}>Iconned</Button>
    );
    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("hides children when iconOnly is true", () => {
    render(
      <Button iconOnly icon={<span data-testid="only" />}>Should not show</Button>
    );
    expect(screen.queryByText(/should not show/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("only")).toBeInTheDocument();
  });

  it("normalizes border shorthand in styles.root", () => {
    render(
      <Button styles={{ root: { border: "2px dashed red" } }}>Styled</Button>
    );
    const btn = screen.getByRole("button", { name: /styled/i }) as HTMLButtonElement;
    const style = btn.style as CSSStyleDeclaration;
    expect(style.borderWidth).toBe("2px");
    expect(style.borderStyle).toBe("dashed");
    expect(style.borderColor).toBe("red");
  });

  // Dropdown-specific tests
  it("opens dropdown on click and renders menu items", async () => {
    const user = userEvent.setup();
    render(
      <Button menuTrigger="click" menuItems={[<a href="#a" key="a">A</a>, <a href="#b" key="b">B</a>]}>More</Button>
    );
    expect(screen.queryByRole("menu")).toBeNull();
    await user.click(screen.getByRole("button", { name: /more/i }));
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("applies dropdown and arrow style variables", async () => {
    const user = userEvent.setup();
    render(
      <Button
        menuTrigger="click"
        styles={{
          dropdown: { minWidth: 240 },
          dropdownArrow: { size: 10, top: 4, right: 12, background: 'red', borderColor: 'blue' },
        }}
        menuItems={[<a href="#x" key="x">X</a>]}
      >
        Styled
      </Button>
    );
    await user.click(screen.getByRole("button", { name: /styled/i }));
    const menu = screen.getByRole("menu") as HTMLElement & { style: CSSStyleDeclaration };
    expect(menu.style.getPropertyValue('--pc-dd-arrow-size')).toBe('10px');
    expect(menu.style.getPropertyValue('--pc-dd-arrow-top')).toBe('4px');
    expect(menu.style.getPropertyValue('--pc-dd-arrow-right')).toBe('12px');
    expect(menu.style.getPropertyValue('--pc-dd-arrow-bg')).toBe('red');
    expect(menu.style.getPropertyValue('--pc-dd-arrow-border-color')).toBe('blue');
    expect(menu.style.minWidth).toBe('240px');
  });

  it("closes dropdown on outside click when trigger is click", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Button menuTrigger="click" menuItems={[<a href="#1" key="1">One</a>]}>Toggle</Button>
        <div data-testid="outside">outside</div>
      </div>
    );
    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
