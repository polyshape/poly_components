import type { Meta, StoryObj } from "@storybook/react";
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
  argTypes: {
    tabs: { control: "object" },
    defaultActive: { control: "text" },
    active: { control: "text" },
    onChange: { table: { disable: true } },
    onChangeBehavior: {
      control: { type: "inline-radio" },
      options: Object.keys(ON_CHANGE_OPTIONS) as OnChangeOptionKey[],
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

export const Playground: Story = {
  args: {
    tabs: mainTabs,
    defaultActive: "details",
    ariaLabel: "Main sections",
    onChangeBehavior: "none",
  },
  render: renderTabs,
};

export const TwoTabs: Story = {
  args: {
    tabs: [
      { key: "a", label: "First", content: <div>First panel</div> },
      { key: "b", label: "Second", content: <div>Second panel</div> },
    ],
    defaultActive: "a",
    ariaLabel: "Example",
    onChangeBehavior: "console",
  },
  render: renderTabs,
};