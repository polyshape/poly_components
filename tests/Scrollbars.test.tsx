import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Scrollbars } from "../src/scrollbars/index.js";

describe("Scrollbars", () => {
  it("wraps children and applies class", () => {
    render(
      <Scrollbars>
        <div>Inner</div>
      </Scrollbars>
    );
    const el = document.querySelector(".pc-scrollbars") as HTMLElement;
    expect(el).toBeTruthy();
    expect(screen.getByText("Inner")).toBeInTheDocument();
  });

  it("sets CSS vars via props and style", () => {
    render(
      <Scrollbars thumbColor="#123456" scrollbarWidth="auto" >
        <div>Inner</div>
      </Scrollbars>
    );
    const el = document.querySelector(".pc-scrollbars") as HTMLElement;
    const style = el.getAttribute("style") || "";
    // Either prop or style can set, but prop takes precedence
    expect(style).toMatch(/--pc-scrollbar-thumb/);
    expect(style).toMatch(/--pc-scrollbar-width/);
  });
});
