import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, type Tab, type TabsProps } from "../src";

const ON_CHANGE_OPTIONS = {
  none: undefined,
  console: (key: string) => console.log("Tabs onChange", key), // eslint-disable-line no-console
  alert: (key: string) => alert("Tab changed: " + key),
} as const;

type OnChangeOptionKey = keyof typeof ON_CHANGE_OPTIONS;
type TabsStoryProps = TabsProps & { onChangeBehavior: OnChangeOptionKey };

const meta: Meta<TabsStoryProps> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    tabs: undefined,
    defaultActive: undefined,
    active: undefined,
    ariaLabel: undefined,
    onChangeBehavior: "none",
  },
  argTypes: {
    tabs: { control: "object" },
    defaultActive: { control: "text" },
    active: { control: "text" },
    onChange: { control: false },
    className: { control: false },
    onChangeBehavior: {
      control: { type: "inline-radio" },
      options: Object.keys(ON_CHANGE_OPTIONS) as OnChangeOptionKey[],
      description: "Choose an action to perform when the active tab changes (for demo purposes).",
    },
  },
};

export default meta;

type Story = StoryObj<TabsStoryProps>;

const mainTabs: Tab[] = [
  { key: "details", label: "Details", content: <div>Here are the details.</div> },
  { key: "reviews", label: "Reviews", content: <div>Some reviews content.</div> },
  { key: "qa", label: "Q&A", content: <div>Questions and answers.</div> },
];

const renderTabs = ({ onChangeBehavior, ...rest }: TabsStoryProps) => {
  const handler = ON_CHANGE_OPTIONS[onChangeBehavior];
  return <Tabs {...rest} onChange={handler} />;
};

export const Basic: Story = {
  args: {
    tabs: mainTabs,
    defaultActive: "details",
    ariaLabel: "Main sections",
  },
  render: renderTabs,
};
