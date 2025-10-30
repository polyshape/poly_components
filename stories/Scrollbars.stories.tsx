import type { Meta, StoryObj } from "@storybook/react-vite";
import { Scrollbars, ThemeProvider, ThemeToggle } from "../src";

const meta: Meta<typeof Scrollbars> = {
  title: "Components/Scrollbars",
  component: Scrollbars,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    scrollbarWidth: "thin",
    thumbColor: undefined,
  },
  argTypes: {
    className: { control: false },
    style: {
      control: "object",
      description: "Inline styles; supports scrollbarThumb (color)",
    },
    scrollbarWidth: {
      control: "select",
      options: ["thin", "auto", "none"],
      table: {
        type: { summary: '"thin" | "auto" | "none"' },
      },
    },
    thumbColor: {
      control: "color",
    },
  },
} satisfies Meta<typeof Scrollbars>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = () => (
  <div style={{ display: "grid", gap: 8 }}>
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        style={{
          padding: 8,
          border: "1px solid var(--pc-border)",
          borderRadius: 6,
        }}
      >
        Row {i + 1}
      </div>
    ))}
  </div>
);

export const Basic: Story = {
  args: {
    style: {
      height: 240,
      width: 360,
      border: "1px solid",
      borderRadius: 4,
      padding: 8,
    },
  },
  render: (args) => (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <ThemeToggle appearance="subtle" />
        <span>Toggle theme to change scrollbar color</span>
      </div>
      <Scrollbars scrollbarWidth={args.scrollbarWidth} thumbColor={args.thumbColor} style={args.style}>
        {/* Force horizontal overflow by widening inner content */}
        <div style={{ minWidth: 720 }}>
          <Content />
        </div>
      </Scrollbars>
    </ThemeProvider>
  ),
};

export const CustomColors: Story = {
  args: {
    thumbColor: "#7051BA",
    scrollbarWidth: "thin",
    style: {
      height: 240,
      width: 360,
      border: "1px solid #ccc",
      borderRadius: 4,
      padding: 8,
    },
  },
  render: (args) => (
    <Scrollbars scrollbarWidth={args.scrollbarWidth} thumbColor={args.thumbColor} style={args.style}>
      <div style={{ minWidth: 720 }}>
        <Content />
      </div>
    </Scrollbars>
  ),
};
