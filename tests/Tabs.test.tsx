import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { Tabs, type Tab } from "../src/tabs/index.js";

describe("Tabs", () => {
  const sampleTabs: Tab[] = [
    { key: "one", label: "One", content: <div data-testid="panel-one">Content One</div> },
    { key: "two", label: "Two", content: <div data-testid="panel-two">Content Two</div> },
  ];

  it("renders tabs and the active panel", () => {
    render(<Tabs tabs={sampleTabs} defaultActive="one" ariaLabel="Sections" />);

    const tablist = screen.getByRole("tablist", { name: /sections/i });
    expect(tablist).toBeInTheDocument();

    const tabOne = screen.getByRole("tab", { name: /one/i });
    const tabTwo = screen.getByRole("tab", { name: /two/i });
    expect(tabOne).toHaveAttribute("aria-selected", "true");
    expect(tabTwo).toHaveAttribute("aria-selected", "false");

    // Only first panel visible
    expect(screen.getByTestId("panel-one").closest('[role="tabpanel"]')).not.toHaveAttribute("hidden");
    expect(screen.getByTestId("panel-two").closest('[role="tabpanel"]')).toHaveAttribute("hidden");
  });

  it("invokes onChange with clicked key", async () => {
    const user = userEvent.setup();
    const events: string[] = [];
    render(
      <Tabs
        tabs={sampleTabs}
        defaultActive="one"
        onChange={(k) => events.push(k)}
      />
    );
    await user.click(screen.getByRole("tab", { name: /two/i }));
    expect(events).toEqual(["two"]);
    expect(screen.getByTestId("panel-two").closest('[role="tabpanel"]')).not.toHaveAttribute("hidden");
  });

  it("can be controlled by a wrapper updating active", async () => {
    const user = userEvent.setup();

    function Wrapper() {
      const [active, setActive] = useState("one");
      return <Tabs tabs={sampleTabs} active={active} onChange={setActive} />;
    }

    render(<Wrapper />);
    // Initially first panel visible
    expect(screen.getByTestId("panel-one").closest('[role="tabpanel"]')).not.toHaveAttribute("hidden");
    // Click second tab
    await user.click(screen.getByRole("tab", { name: /two/i }));
    // Now second panel visible
    expect(screen.getByTestId("panel-two").closest('[role="tabpanel"]')).not.toHaveAttribute("hidden");
  });
});
