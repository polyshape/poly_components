import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaCheck } from "react-icons/fa";
import { Button } from "../src";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    pressEffect: true,
  },
  parameters: {
    controls: {
      sort: "alpha",
    },
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
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    pressEffect: { control: "boolean" },
    children: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: "Playground Button",
    appearance: "secondary",
    size: "large",
    shape: "rounded",
    loading: false,
    disabled: false,
    iconOnly: false,
    pressEffect: true,
  },
  render: (args) => <Button {...args} />,
};

// --- Example Variations ---
export const WithIcons: Story = {
  args: {
    children: "Save",
    appearance: "primary",
    icon: <FaCheck />,
  },
};

export const Loading: Story = {
  args: {
    children: "Processing…",
    appearance: "primary",
    loading: true,
    disabled: true,
  },
};

// --- Showcase: All Appearances ---
export const AppearanceShowcase: Story = {
  args: { pressEffect: true },
  render: (args) => (
    <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
      <Button {...args} appearance="primary">Primary</Button>
      <Button {...args} appearance="secondary">Secondary</Button>
      <Button {...args} appearance="outline">Outline</Button>
      <Button {...args} appearance="subtle">Subtle</Button>
      <Button {...args} appearance="transparent">Transparent</Button>
      <Button {...args} appearance="danger">Danger</Button>
    </div>
  ),
};

// --- Showcase: All Sizes ---
export const SizeShowcase: Story = {
  args: { pressEffect: true },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button {...args} size="small" appearance="primary">Small</Button>
      <Button {...args} size="medium" appearance="primary">Medium</Button>
      <Button {...args} size="large" appearance="primary">Large</Button>
    </div>
  ),
};

// --- Showcase: All Shapes ---
export const ShapeShowcase: Story = {
  args: { pressEffect: true },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button {...args} shape="rounded" appearance="secondary">Rounded</Button>
      <Button {...args} shape="square" appearance="secondary">Square</Button>
      <Button {...args} shape="circular" appearance="secondary" icon={<FaCheck />} iconOnly />
    </div>
  ),
};

// --- Dropdown menu examples ---
export const WithMenuDropdown: Story = {
  args: {
    children: "Actions",
    appearance: "primary",
    menuItems: [
      <a href="#docs" onClick={(e) => e.preventDefault()}>Anchor Item</a>,
      <span>Span Item</span>,
      <Button appearance="subtle" size="small">Button Item</Button>,
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
      <a href="#alpha" onClick={(e) => e.preventDefault()}>Anchor Item</a>,
      <span>Span Item</span>,
      <Button appearance="subtle" size="small">Button Item</Button>,
    ],
  } as Parameters<typeof Button>[0],
  parameters: { layout: "fullscreen" },
  render: (args) => (
    <div style={{ display: "grid", placeItems: "center", width: "100%", height: "80vh" }}>
      <Button {...args} />
    </div>
  ),
};
