import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../src";

const meta: Meta<typeof Icon> = {
  title: "Components/Icons",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { 
      control: { type: "select" },
      options: ["home"],
      description: "Icon name from the registry"
    },
    style: {
      control: { type: "object" },
      description: "CSS styles - try {fontSize: '32px', color: 'red'}"
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Home: Story = {
  args: {
    name: "home",
    style: { fontSize: "24px", color: "currentColor" },
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <span>Home icon: </span>
      <span style={{ fontSize: "12px" }}>
        <Icon {...args} />
      </span>
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    name: "home",
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", fontSize: "32px" }}>
      <Icon {...args} style={{ color: "red" }} />
      <Icon {...args} style={{ color: "blue" }} />
      <Icon {...args} style={{ color: "green" }} />
      <Icon {...args} style={{ color: "#ff6b35" }} />
      <div style={{ color: "purple" }}>
        <Icon {...args} />
        <span> Uses parent color</span>
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  args: {
    name: "home",
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", color: "#0066cc" }}>
      <span style={{ fontSize: "16px" }}><Icon {...args} /></span>
      <span style={{ fontSize: "24px" }}><Icon {...args} /></span>
      <span style={{ fontSize: "32px" }}><Icon {...args} /></span>
      <span style={{ fontSize: "48px" }}><Icon {...args} /></span>
      <span style={{ fontSize: "64px" }}><Icon {...args} /></span>
    </div>
  ),
};