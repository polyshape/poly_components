import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner, LoadingOverlay, LoadingProvider, useLoading, Button } from "../src";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: undefined,
    speed: undefined,
    color: undefined,
    style: undefined,
  },
  argTypes: {
    size: { control: { type: "number", min: 4, max: 40, step: 1 } },
    speed: { control: { type: "number", min: 0.3, max: 3, step: 0.1 } },
    color: { control: "color" },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {
  args: {
    size: 14,
    speed: 1,
    color: "var(--pc-accent)",
  },
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Spinner {...args} />
    </div>
  ),
};

function OverlayDemoInner(overlayProps: Parameters<typeof LoadingOverlay>[0]) {
  const { state, setLoadingState } = useLoading();
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Button appearance='primary' onClick={() => setLoadingState("loading")} type="button">Show overlay</Button>
      </div>
      <div>State: <strong>{state != null ? String(state) : "-"}</strong></div>
      <LoadingOverlay dismissOnClick {...overlayProps} />
    </div>
  );
}

export const OverlayDemo: Story = {
  args: {
    size: 14,
    color: "var(--pc-accent)",
    speed: 1,
  },
  argTypes: {
    size: { control: { type: "number", min: 4, max: 40, step: 1 } },
    speed: { control: { type: "number", min: 0.3, max: 3, step: 0.1 } },
    color: { control: "color" },
  },
  render: (args) => (
    <LoadingProvider>
      <OverlayDemoInner {...args} />
    </LoadingProvider>
  ),
};