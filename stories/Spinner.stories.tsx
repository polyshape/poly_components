import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, LoadingOverlay, LoadingProvider, useLoading, Button } from '../src';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'number', min: 4, max: 40, step: 1 } },
    speed: { control: { type: 'number', min: 0.3, max: 3, step: 0.1 } },
    color: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  args: {
    size: 14,
    speed: 1,
    color: 'var(--pc-accent)',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner {...args} />
    </div>
  ),
};

function OverlayDemoInner() {
  const { state, setLoadingState } = useLoading();
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button appearance='primary' onClick={() => setLoadingState('loading')} type="button">Show overlay</Button>
      </div>
      <div>State: <strong>{String(state)}</strong></div>
      <LoadingOverlay dismissOnClick />
    </div>
  );
}

export const OverlayDemo: Story = {
  render: () => (
    <LoadingProvider>
      <OverlayDemoInner />
    </LoadingProvider>
  ),
};