import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs, type Tab, type TabsProps } from "../src";

const ON_CHANGE_OPTIONS = {
  none: undefined,
  console: (key: string) => console.log("Tabs onChange", key), // eslint-disable-line no-console
  alert: (key: string) => alert("Tab changed: " + key),
} as const;

type OnChangeOptionKey = keyof typeof ON_CHANGE_OPTIONS;

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    tabs: undefined,
    defaultActive: undefined,
    active: undefined,
    ariaLabel: undefined,
  },
  argTypes: {
    tabs: { control: "object" },
    defaultActive: { control: "text" },
    active: { control: "text" },
    onChange: { control: false },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const mainTabs: Tab[] = [
  { key: "details", label: "Details", content: <div>Here are the details.</div> },
  { key: "reviews", label: "Reviews", content: <div>Some reviews content.</div> },
  { key: "qa", label: "Q&A", content: <div>Questions and answers.</div> },
];

function RenderTabs(args: TabsProps) {
  const [choice, setChoice] = useState<OnChangeOptionKey>("none");
  const handler = ON_CHANGE_OPTIONS[choice];
  const name = "tabs-onchange-choice";
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <fieldset style={{ border: "1px solid var(--pc-border)", borderRadius: 8, padding: 12 }}>
        <legend>onChange handler</legend>
        {Object.keys(ON_CHANGE_OPTIONS).map((key) => {
          const k = key as OnChangeOptionKey;
          const id = `${name}-${k}`;
          return (
            <label key={k} htmlFor={id} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 12 }}>
              <input
                id={id}
                type="radio"
                name={name}
                value={k}
                checked={choice === k}
                onChange={() => setChoice(k)}
              />
              {k}
            </label>
          );
        })}
      </fieldset>
      <Tabs {...args} onChange={handler} />
    </div>
  );
}

export const Basic: Story = {
  args: {
    tabs: mainTabs,
    defaultActive: "details",
    ariaLabel: "Main sections",
  },
  render: (args) => <RenderTabs {...args} />,
};
