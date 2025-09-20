import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../src/pagination/index";

describe("Pagination component", () => {
  it("renders nothing for totalPages <= 1", () => {
    const { container } = render(
      <Pagination totalPages={1} currentPage={1} setPage={vi.fn()} />
    );
    expect(container.querySelector("nav")).toBeNull();
  });

  it("renders controls and numbers with correct disabled state on first page", () => {
    const setPage = vi.fn();
    render(
      <Pagination totalPages={10} currentPage={1} setPage={setPage} ariaLabel="pager" />
    );

    const nav = screen.getByRole("navigation", { name: /pager/i });
    expect(nav).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    // first and prev disabled
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
    // next and last enabled
    expect(buttons[buttons.length - 2]).not.toBeDisabled();
    expect(buttons[buttons.length - 1]).not.toBeDisabled();

    // current page has aria-current="page"
    const current = screen.getByRole("button", { name: "1" });
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("invokes setPage on number click", async () => {
    const setPage = vi.fn();
    render(<Pagination totalPages={5} currentPage={2} setPage={setPage} />);
    const three = screen.getByRole("button", { name: "3" });
    three.click();
    expect(setPage).toHaveBeenCalledWith(3);
  });

  it("renders ellipses for long ranges and shows neighbors", () => {
    render(<Pagination totalPages={10} currentPage={5} setPage={vi.fn()} delta={1} />);
    const dots = screen.getAllByText("…");
    expect(dots.length).toBe(2);
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "6" })).toBeInTheDocument();
    // first and last are present
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
  });

  it("fires navigation button handlers for first/prev/next/last", async () => {
    const user = userEvent.setup();
    const setPage = vi.fn();
    render(<Pagination totalPages={10} currentPage={5} setPage={setPage} ariaLabel="pager" />);
    await user.click(screen.getByRole("button", { name: /first page/i }));
    await user.click(screen.getByRole("button", { name: /previous page/i }));
    await user.click(screen.getByRole("button", { name: /next page/i }));
    await user.click(screen.getByRole("button", { name: /last page/i }));
    expect(setPage.mock.calls.map((c) => c[0])).toEqual([1, 4, 6, 10]);
  });

  it("applies disabled and active style overrides via styles prop", () => {
    const styles = {
      buttonDisabled: { background: "rgb(255, 192, 203)" },
      buttonActive: { border: "3px dashed #123456" },
    } as const;
    render(<Pagination totalPages={5} currentPage={1} setPage={vi.fn()} styles={styles} />);
    // Disabled 'First page' button picks up custom background
    const first = screen.getByRole("button", { name: /first page/i }) as HTMLButtonElement;
    expect(first).toBeDisabled();
    expect(first.style.background).toBe("rgb(255, 192, 203)");
    // Active page '1' receives normalized border styles
    const one = screen.getByRole("button", { name: "1" }) as HTMLButtonElement;
    expect(one).toHaveAttribute("aria-current", "page");
    expect(one.style.borderStyle).toBe("dashed");
    expect(one.style.borderWidth).toBe("3px");
  });
});
