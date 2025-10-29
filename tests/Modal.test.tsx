import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../src/modal/index.js";

describe("Modal", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => { vi.runOnlyPendingTimers(); vi.useRealTimers(); });

  it("renders only when open", () => {
    const { rerender } = render(<Modal isOpen={false} onClose={() => {}} title="T" />);
    expect(screen.queryByRole("dialog")).toBeNull();
    rerender(<Modal isOpen onClose={() => {}} title="T" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("close button triggers onClose respecting requestClose", () => {
    const onClose = vi.fn(); const onRequestClose = vi.fn(() => true);
    render(<Modal isOpen onClose={onClose} onRequestClose={onRequestClose} title="T" />);
    fireEvent.click(screen.getByLabelText("Close"));
    vi.advanceTimersByTime(210);
    expect(onRequestClose).toHaveBeenCalledWith("closeButton");
    expect(onClose).toHaveBeenCalled();
  });

  it("escape closes when enabled", () => {
    const onClose = vi.fn(); render(<Modal isOpen onClose={onClose} title="T" />);
    fireEvent.keyDown(window, { key: "Escape" }); vi.advanceTimersByTime(210);
    expect(onClose).toHaveBeenCalled();
  });
  
  it("onAfterOpen does not fire on mount; fires once on open", () => {
    const onAfterOpen = vi.fn();
    const { rerender } = render(<Modal isOpen={false} onClose={() => {}} onAfterOpen={onAfterOpen} title="Lifecycle" />);
    // Not called on mount while closed
    vi.advanceTimersByTime(300);
    expect(onAfterOpen).not.toHaveBeenCalled();

    // Open -> should fire once after animation
    rerender(<Modal isOpen onClose={() => {}} onAfterOpen={onAfterOpen} title="Lifecycle" />);
    vi.advanceTimersByTime(230);
    expect(onAfterOpen).toHaveBeenCalledTimes(1);

    // Rerender while still open should not fire again
    rerender(<Modal isOpen onClose={() => {}} onAfterOpen={onAfterOpen} title="Lifecycle" />);
    vi.advanceTimersByTime(230);
    expect(onAfterOpen).toHaveBeenCalledTimes(1);

    // Close then open again -> should fire again
    rerender(<Modal isOpen={false} onClose={() => {}} onAfterOpen={onAfterOpen} title="Lifecycle" />);
    rerender(<Modal isOpen onClose={() => {}} onAfterOpen={onAfterOpen} title="Lifecycle" />);
    vi.advanceTimersByTime(230);
    expect(onAfterOpen).toHaveBeenCalledTimes(2);
  });

  it("onAfterClose fires after exit (animated) and immediately when disableAnimation", () => {
    const onAfterClose = vi.fn();
    const onClose = vi.fn();
    const { rerender } = render(<Modal isOpen onClose={onClose} onAfterClose={onAfterClose} title="Close" />);
    fireEvent.click(screen.getByLabelText("Close"));
    // animated close
    expect(onAfterClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(210);
    expect(onAfterClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    // reopen with disableAnimation
    rerender(<Modal isOpen onClose={onClose} onAfterClose={onAfterClose} disableAnimation title="Close" />);
    fireEvent.click(screen.getByLabelText("Close"));
    // immediate when disabled
    expect(onAfterClose).toHaveBeenCalledTimes(2);
  });

  it("backdrop click respects onRequestClose and can be blocked", () => {
    const onClose = vi.fn();
    const onRequestClose = vi.fn((reason: string) => reason !== "backdrop" ? true : false);
    render(<Modal isOpen onClose={onClose} onRequestClose={onRequestClose} title="Backdrop" />);
    const panel = screen.getByRole("dialog");
    const root = panel.parentElement?.parentElement as HTMLElement; // container -> root
    const backdrop = root.firstElementChild as HTMLElement;
    fireEvent.click(backdrop);
    // blocked by onRequestClose returning false for backdrop
    vi.advanceTimersByTime(250);
    expect(onRequestClose).toHaveBeenCalledWith("backdrop");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("modeless uses fixed width instead of maxWidth", () => {
    const { rerender } = render(<Modal isOpen modeless width={720} onClose={() => {}} title="W" />);
    let panel = screen.getByRole("dialog");
    expect((panel as HTMLElement).style.width).toBe("720px");

    rerender(<Modal isOpen modeless width={480} onClose={() => {}} title="W" />);
    panel = screen.getByRole("dialog");
    expect((panel as HTMLElement).style.width).toBe("480px");

    // Non-modeless keeps maxWidth; re-query because the dialog element is re-mounted when switching mode
    rerender(<Modal isOpen width={600} onClose={() => {}} title="W" />);
    panel = screen.getByRole("dialog");
    expect((panel as HTMLElement).style.maxWidth).toBe("600px");
  });

  it("renders lib scrollbars wrapper when enabled", () => {
    const { rerender } = render(
      <Modal isOpen onClose={() => {}} title="Scroll">
        <div style={{ height: 1000 }}>Long content</div>
      </Modal>
    );
    expect(document.querySelector(".pc-scrollbars")).toBeNull();
    rerender(
      <Modal isOpen onClose={() => {}} title="Scroll" useNativeScrollbars>
        <div style={{ height: 1000 }}>Long content</div>
      </Modal>
    );
    expect(document.querySelector(".pc-scrollbars")).toBeTruthy();
  });
});
