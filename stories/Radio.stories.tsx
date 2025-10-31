import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio } from "../src";

const DEFAULT_STYLES = {
  root: {},
  input: {},
  control: {},
  dot: {},
  label: {},
} as const;

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  args: {
    label: "Option",
    checked: undefined,
    defaultChecked: undefined,
    disabled: undefined,
    size: undefined,
    styles: DEFAULT_STYLES,
  },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    className: { control: false },
    defaultChecked: { control: false },
    onChange: { control: false },
    name: { control: false },
    value: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
  args: { name: "demo", value: "a", label: "Enable feature" },
};

function ControlledDemo(args: Parameters<typeof Radio>[0]) {
  const [val, setVal] = useState<string>("a");
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Radio {...args} name="group" value="a" label="Option A" checked={val === "a"} onChange={() => setVal("a")} />
        <Radio {...args} name="group" value="b" label="Option B" checked={val === "b"} onChange={() => setVal("b")} />
        <Radio {...args} name="group" value="c" label="Option C" checked={val === "c"} onChange={() => setVal("c")} />
      </div>
      <div>Selected: {val}</div>
    </div>
  );
}

export const GroupControlled: Story = {
  args: { size: "medium" },
  argTypes: {
    label: { control: false },
    checked: { control: false },
  },
  render: (args) => <ControlledDemo {...args} />,
};

export const Disabled: Story = {
  args: { label: "Can't change", disabled: true, defaultChecked: true },
};

function NameValueFormDemo(args: Parameters<typeof Radio>[0]) {
  const [submitted, setSubmitted] = useState<{ name: string; value: string } | null>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        // Grab first pair (we only have one group named "plan" here)
        const value = String(fd.get("plan") ?? "");
        setSubmitted({ name: "plan", value });
      }}
      style={{ display: "grid", gap: 12 }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Radio {...args} name="plan" value="basic" label="Basic" defaultChecked />
        <Radio {...args} name="plan" value="pro" label="Pro" />
        <Radio {...args} name="plan" value="enterprise" label="Enterprise" />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">Submit</button>
        {submitted && (
          <span>
            Submitted → <strong>{submitted.name}</strong>=<strong>{submitted.value}</strong>
          </span>
        )}
      </div>
    </form>
  );
}

export const NameAndValue: Story = {
  name: "Name & Value (Form)",
  render: (args) => <NameValueFormDemo {...args} />,
};
