import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../src";
import { iconPaths } from "../src/icons/IconRegistry";

const meta: Meta<typeof Icon> = {
  title: "Components/Icons",
  component: Icon,
  tags: ["autodocs"],
  args: {
    name: "home"
  },
  argTypes: {
    name: { 
      control: { type: "select" },
      options: Object.keys(iconPaths),
      description: "Icon name from the registry"
    },
    spin: {
      control: { type: "boolean" },
      description: "Makes the icon spin continuously - great for loading states"
    },
    weight: {
      control: { type: "select" },
      options: ["thin", "light", "normal", "medium", "bold", "heavy"],
      description: "Icon stroke thickness - try different weights to see the effect"
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
    style: { fontSize: "36px", color: "currentColor" },
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <span>Icon: </span>
      <span>
        <Icon {...args} name={args.name}/>
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
      <div style={{ color: "purple", display: "flex", alignItems: "center", gap: "8px" }}>
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