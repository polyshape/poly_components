import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { Panel } from "../src/panel/index.js";

describe("Panel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders only when open", () => {
    const { rerender } = render(<Panel isOpen={false} onClose={() => {}} title="T" />);
    expect(screen.queryByRole("dialog")).toBeNull();
    rerender(<Panel isOpen={true} onClose={() => {}} title="T" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("close button triggers onClose when allowed", () => {
    const onClose = vi.fn();
    render(<Panel isOpen onClose={onClose} title="Title" />);
    const btn = screen.getByLabelText("Close");
    fireEvent.click(btn);
    // default has animation; close fires after 200ms
    vi.advanceTimersByTime(210);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("onRequestClose can block close (closeButton)", () => {
    const onClose = vi.fn();
    const onRequestClose = vi.fn(() => false);
    render(<Panel isOpen onClose={onClose} onRequestClose={onRequestClose} title="Title" />);
    fireEvent.click(screen.getByLabelText("Close"));
    vi.advanceTimersByTime(250);
    expect(onRequestClose).toHaveBeenCalledWith("closeButton");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("Escape closes the panel when enabled", () => {
    const onClose = vi.fn();
    render(<Panel isOpen onClose={onClose} title="Esc" />);
    fireEvent.keyDown(window, { key: "Escape" });
    vi.advanceTimersByTime(210);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("onAfterOpen and onAfterClose fire", () => {
    const onAfterOpen = vi.fn();
    const onAfterClose = vi.fn();
    const onClose = vi.fn();
    render(
      <Panel isOpen onClose={onClose} title="Lifecycle" onAfterOpen={onAfterOpen} onAfterClose={onAfterClose} disableAnimation />
    );
    // disableAnimation -> onAfterOpen fires immediately
    expect(onAfterOpen).toHaveBeenCalled();
    // Click close -> onAfterClose fires immediately then onClose
    fireEvent.click(screen.getByLabelText("Close"));
    expect(onAfterClose).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("renders lib scrollbars wrapper when enabled", () => {
    render(
      <Panel isOpen onClose={() => {}} title="Scroll">
        <div style={{ height: 1000 }}>Long content</div>
      </Panel>
    );
    expect(document.querySelector(".pc-scrollbars")).toBeNull();

    // Re-render with lib scrollbars
    const { rerender } = render(
      <Panel isOpen onClose={() => {}} title="Scroll" useNativeScrollbars>
        <div style={{ height: 1000 }}>Long content</div>
      </Panel>
    );
    rerender(
      <Panel isOpen onClose={() => {}} title="Scroll" useNativeScrollbars>
        <div style={{ height: 1000 }}>Long content</div>
      </Panel>
    );
    expect(document.querySelector(".pc-scrollbars")).toBeTruthy();
  });

  it("keeps state when unmountOnClose is false and resets when true", () => {
    const { rerender } = render(
      <Panel isOpen onClose={() => {}} title="State" unmountOnClose={false}>
        <input defaultValue="keep" aria-label="field" />
      </Panel>
    );
    const field = screen.getByLabelText("field") as HTMLInputElement;
    fireEvent.change(field, { target: { value: "changed" } });
    expect(field.value).toBe("changed");

    // Hide but keep mounted
    rerender(
      <Panel isOpen={false} onClose={() => {}} title="State" unmountOnClose={false}>
        <input defaultValue="keep" aria-label="field" />
      </Panel>
    );
    // Show again and verify value persists
    rerender(
      <Panel isOpen onClose={() => {}} title="State" unmountOnClose={false}>
        <input defaultValue="keep" aria-label="field" />
      </Panel>
    );
    const field2 = screen.getByLabelText("field") as HTMLInputElement;
    expect(field2.value).toBe("changed");

    // Now with unmountOnClose=true the value should reset
    rerender(
      <Panel isOpen onClose={() => {}} title="State" unmountOnClose={true}>
        <input defaultValue="keep" aria-label="field" />
      </Panel>
    );
    const field3 = screen.getByLabelText("field") as HTMLInputElement;
    fireEvent.change(field3, { target: { value: "temp" } });
    expect(field3.value).toBe("temp");
    rerender(
      <Panel isOpen={false} onClose={() => {}} title="State" unmountOnClose={true}>
        <input defaultValue="keep" aria-label="field" />
      </Panel>
    );
    rerender(
      <Panel isOpen onClose={() => {}} title="State" unmountOnClose={true}>
        <input defaultValue="keep" aria-label="field" />
      </Panel>
    );
    const field4 = screen.getByLabelText("field") as HTMLInputElement;
    expect(field4.value).toBe("keep");
  });

  it("modeless allows interaction with background", () => {
    function Harness() {
      const [open, setOpen] = useState(true);
      const [count, setCount] = useState(0);
      return (
        <div>
          <button onClick={() => setCount((c) => c + 1)}>bg</button>
          <span data-testid="count">{count}</span>
          <Panel isOpen={open} onClose={() => setOpen(false)} title="Modeless" modeless>
            <div>content</div>
          </Panel>
        </div>
      );
    }
    render(<Harness />);
    // Click the background button even while panel is open
    fireEvent.click(screen.getByText("bg"));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("applies content padding inside Scrollbars so tracks stay at edges", () => {
    render(
      <Panel
        isOpen
        onClose={() => {}}
        title="Padding"
        useNativeScrollbars
        styles={{ content: { padding: 30 } }}
      >
        <div style={{ height: 1000 }}>X</div>
      </Panel>
    );
    const scroller = document.querySelector(".pc-scrollbars") as HTMLElement;
    expect(scroller).toBeTruthy();
    // The immediate child (inner wrapper) should carry the padding inline
    const inner = scroller.firstElementChild as HTMLElement;
    expect(inner?.getAttribute("style") || "").toMatch(/padding:\s*30px/);
  });
});
