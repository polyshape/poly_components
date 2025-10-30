import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaCheck } from "react-icons/fa";
import { Button, CheckIcon } from "../src";

const DEFAULT_STYLES = {
  root: {},
  content: {},
  icon: {},
  spinner: {},
  dropdown: {},
  dropdownArrow: {},
} as const;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    appearance: "secondary",
    size: "large",
    shape: "rounded",
    children: undefined,
    pressEffect: undefined,
    loading: undefined,
    iconOnly: undefined,
    selected: undefined,
    hideChevron: undefined,
    menuTrigger: undefined,
    type: undefined,
    styles: DEFAULT_STYLES,
    menuItems: undefined,
  },
  argTypes: {
    appearance: {
      control: "select",
      options: ["primary", "secondary", "default", "outline", "subtle", "transparent", "danger"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    shape: {
      control: "select",
      options: ["rounded", "square", "circular"],
    },
    icon: { control: false },
    iconAfter: { control: false },
    iconOnly: { control: "boolean" },
    iconClassName: { control: false },
    spinnerClassName: { control: false },
    className: { control: false },
    contentClassName: { control: false },
    loading: { control: "boolean" },
    pressEffect: { control: "boolean" },
    children: { control: "text" },
    styles: { control: "object", description: "Per-part style overrides" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: "Press me!",
  },
  render: (args) => <Button {...args} onClick={() => alert("Button Pressed!")} />,
};

export const WithIcons: Story = {
  args: {
    children: "Save",
    appearance: "primary",
    icon: <CheckIcon weight={"bold"} />,
  },
};

export const Loading: Story = {
  args: {
    children: "Processing…",
    appearance: "primary",
    loading: true,
  },
};

export const AppearanceShowcase: Story = {
  parameters: {
    controls: { exclude: ["appearance", "children"] },
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
      <Button {...args} appearance="primary">
        Primary
      </Button>
      <Button {...args} appearance="secondary">
        Secondary
      </Button>
      <Button {...args} appearance="outline">
        Outline
      </Button>
      <Button {...args} appearance="subtle">
        Subtle
      </Button>
      <Button {...args} appearance="transparent">
        Transparent
      </Button>
      <Button {...args} appearance="danger">
        Danger
      </Button>
    </div>
  ),
};

export const SizeShowcase: Story = {
  parameters: {
    controls: { exclude: ["children"] },
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </div>
  ),
};

export const ShapeShowcase: Story = {
  parameters: {
    controls: { exclude: ["children", "shape"] },
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button {...args} shape="rounded">
        Rounded
      </Button>
      <Button {...args} shape="square">
        Square
      </Button>
      <Button {...args} shape="circular" icon={<FaCheck />} iconOnly />
    </div>
  ),
};

// --- Dropdown menu examples ---
export const WithMenuDropdown: Story = {
  args: {
    children: "Actions",
    appearance: "primary",
    menuItems: [
      <a href="#docs" onClick={(e) => e.preventDefault()}>
        Anchor Item
      </a>,
      <span>Span Item</span>,
      <Button appearance="subtle" size="small">
        Button Item
      </Button>,
    ],
    // default trigger is hover
  } as Parameters<typeof Button>[0],
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <div style={{ display: "grid", placeItems: "center", width: "100%", height: "80vh" }}>
      <Button {...args} />
    </div>
  ),
};

export const WithMenuDropdownClick: Story = {
  args: {
    children: "More",
    appearance: "secondary",
    menuTrigger: "click",
    menuItems: [
      <a href="#alpha" onClick={(e) => e.preventDefault()}>
        Anchor Item
      </a>,
      <span>Span Item</span>,
      <Button appearance="subtle" size="small">
        Button Item
      </Button>,
    ],
  } as Parameters<typeof Button>[0],
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <div style={{ display: "grid", placeItems: "center", width: "100%", height: "80vh" }}>
      <Button {...args} />
    </div>
  ),
};
