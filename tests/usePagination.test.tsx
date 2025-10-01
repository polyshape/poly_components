import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ReactNode } from "react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { usePagination } from "../src/pagination/usePagination.js";
import { setup } from "../src/pagination/enableRouterIntegration.js";

// Setup React Router integration for tests
beforeEach(() => {
  setup({ useSearchParams });
});

function HookProbe({ items, pageSize }: { items: number[]; pageSize: number }) {
  const { visible, currentPage, totalPages, setPage } = usePagination(items, pageSize);
  return (
    <div>
      <div data-testid="current">{currentPage}</div>
      <div data-testid="total">{totalPages}</div>
      <div data-testid="visible">{visible.join(",")}</div>
      <button onClick={() => setPage(5)}>go-5</button>
      <button onClick={() => setPage(NaN)}>go-NaN</button>
      <button onClick={() => setPage(Infinity)}>go-Inf</button>
      <button onClick={() => setPage(-Infinity)}>go--Inf</button>
      <button onClick={() => setPage(2.7)}>go-2.7</button>
    </div>
  );
}

describe("usePagination hook", () => {
  it("reads page from URL and slices items", () => {
    const items = Array.from({ length: 50 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=3"]}>
        <HookProbe items={items} pageSize={10} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("3");
    expect(screen.getByTestId("total")).toHaveTextContent("5");
    expect(screen.getByTestId("visible")).toHaveTextContent("21,22,23,24,25,26,27,28,29,30");
  });

  it("setPage updates current and clamps within range", async () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=1"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    // go to page 5 (will clamp to 3)
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /go-5/i }));
    expect(screen.getByTestId("current")).toHaveTextContent("3");
    expect(screen.getByTestId("visible")).toHaveTextContent("11,12");
  });

  it("clamps URL page=0 to 1 (first page)", () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=0"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });

  it("clamps URL negative page to 1", () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=-1"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });

  it("clamps URL page beyond last to totalPages (last page)", () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=99"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("3");
    expect(screen.getByTestId("visible")).toHaveTextContent("11,12");
  });

  it("defaults to page 1 for non-numeric page value", () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=abc"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });

  it("handles empty items: page=any clamps to 1 and shows empty visible", () => {
    const items: number[] = [];
    render(
      <MemoryRouter initialEntries={["/?page=3"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("total")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("");
  });

  it("defaults to page 1 when no page param present", () => {
    const items = Array.from({ length: 10 }, (_, i) => i + 1);
    render(
      <MemoryRouter>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });

  it("treats page=Infinity as last page", () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=Infinity"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("3");
    expect(screen.getByTestId("visible")).toHaveTextContent("11,12");
  });

  it("treats page=-Infinity as 1", () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=-Infinity"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });

  it("uses 1 total page when pageSize exceeds items length", () => {
    const items = Array.from({ length: 7 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=1"]}>
        <HookProbe items={items} pageSize={99} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("total")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5,6,7");
  });

  it("normalizes non-positive pageSize (0) to 1", () => {
    const items = Array.from({ length: 5 }, (_, i) => i + 1);
    render(
      <MemoryRouter>
        <HookProbe items={items} pageSize={0 as unknown as number} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("total")).toHaveTextContent("5");
    expect(screen.getByTestId("visible")).toHaveTextContent("1");
  });

  it("normalizes negative pageSize to 1", () => {
    const items = Array.from({ length: 3 }, (_, i) => i + 1);
    render(
      <MemoryRouter>
        <HookProbe items={items} pageSize={-10} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("total")).toHaveTextContent("3");
    expect(screen.getByTestId("visible")).toHaveTextContent("1");
  });

  it("floors decimal page values (e.g., 2.7 -> 2)", () => {
    const items = Array.from({ length: 20 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=2.7"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("2");
    expect(screen.getByTestId("visible")).toHaveTextContent("6,7,8,9,10");
  });

  it("setPage handles NaN and clamps to 1", async () => {
    const items = Array.from({ length: 10 }, (_, i) => i + 1);
    render(
      <MemoryRouter>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /go-NaN/i }));
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });

  it("setPage handles +Infinity and clamps to last", async () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /go-Inf/i }));
    expect(screen.getByTestId("current")).toHaveTextContent("3");
    expect(screen.getByTestId("visible")).toHaveTextContent("11,12");
  });

  it("setPage handles -Infinity and clamps to 1", async () => {
    const items = Array.from({ length: 12 }, (_, i) => i + 1);
    render(
      <MemoryRouter>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /go--Inf/i }));
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });

  it("setPage floors decimal values (2.7 -> 2)", async () => {
    const items = Array.from({ length: 20 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page=1"]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /go-2.7/i }));
    expect(screen.getByTestId("current")).toHaveTextContent("2");
    expect(screen.getByTestId("visible")).toHaveTextContent("6,7,8,9,10");
  });

  it("clamps when items shrink and current page becomes invalid", () => {
    const items50 = Array.from({ length: 50 }, (_, i) => i + 1);
    const items15 = Array.from({ length: 15 }, (_, i) => i + 1);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={["/?page=3"]}>{children}</MemoryRouter>
    );

    const { rerender } = render(<HookProbe items={items50} pageSize={10} />, { wrapper });
    // Initially page 3 of 5
    expect(screen.getByTestId("current")).toHaveTextContent("3");
    expect(screen.getByTestId("visible")).toHaveTextContent(
      "21,22,23,24,25,26,27,28,29,30"
    );

    // Shrink items so totalPages becomes 2 -> page should clamp to 2
    rerender(<HookProbe items={items15} pageSize={10} />);
    expect(screen.getByTestId("current")).toHaveTextContent("2");
    expect(screen.getByTestId("visible")).toHaveTextContent("11,12,13,14,15");
  });

  it("clamps when pageSize increases making current page exceed new total", () => {
    const items = Array.from({ length: 22 }, (_, i) => i + 1);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={["/?page=3"]}>{children}</MemoryRouter>
    );

    const { rerender } = render(<HookProbe items={items} pageSize={10} />, { wrapper });
    // Initially page 3 of 3
    expect(screen.getByTestId("current")).toHaveTextContent("3");
    expect(screen.getByTestId("visible")).toHaveTextContent("21,22");

    // Increase pageSize so totalPages becomes 2 -> current should clamp to 2
    rerender(<HookProbe items={items} pageSize={15} />);
    expect(screen.getByTestId("total")).toHaveTextContent("2");
    expect(screen.getByTestId("current")).toHaveTextContent("2");
    expect(screen.getByTestId("visible")).toHaveTextContent("16,17,18,19,20,21,22");
  });

  it("treats empty page query (?page=) as 1", () => {
    const items = Array.from({ length: 10 }, (_, i) => i + 1);
    render(
      <MemoryRouter initialEntries={["/?page="]}>
        <HookProbe items={items} pageSize={5} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("current")).toHaveTextContent("1");
    expect(screen.getByTestId("visible")).toHaveTextContent("1,2,3,4,5");
  });
});
