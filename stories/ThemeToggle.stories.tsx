import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Button,
  Pagination,
  Tabs,
  ThemeProvider,
  ThemeToggle,
  type Tab,
} from "../src";

// Widen meta typing to allow extra playground-only controls like `tokens`
const meta: Meta<Record<string, unknown>> = {
  title: "Components/Theme",
  component: ThemeToggle,
  tags: ["autodocs"],
  args: {
    appearance: "outline",
    shape: "rounded",
    size: "medium",
    pressEffect: undefined,
    weight: undefined
  },
  argTypes: {
    appearance: {
      control: "select",
      options: [
        "subtle",
        "transparent",
        "outline",
        "secondary",
        "primary",
        "danger",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    shape: {
      control: "select",
      options: ["rounded", "square", "circular"],
    },
    weight: {
      control: "select",
      options: ["thin", "light", "normal", "medium", "bold", "heavy"],
    },
    className: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Basic: Story = {
  args: {
    appearance: "outline",
    shape: "rounded",
    size: "medium",
  },
  render: (args) => (
    <ThemeProvider>
      <DemoContent args={args} />
    </ThemeProvider>
  ),
};

function DemoContent({ args }: { args: Record<string, unknown> }) {
  const [page, setPage] = useState(1);
  const tabs: Tab[] = [
    { key: "tab_1", label: "Tab 1", content: <div>Tab 1</div> },
    { key: "tab_2", label: "Tab 2", content: <div>Tab 2</div> },
  ];
  const [_activeTab, _setActiveTab] = useState<Tab["key"]>("tab_1");
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div>
        <ThemeToggle {...args} />
      </div>
      {/* Baseline HTML preview */}
      <section>
        <h3 style={{ margin: 0 }}>Baseline HTML</h3>
        <p>
          This is some text with a themed{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            link
          </a>{" "}
          and an <strong>emphasis</strong>.
        </p>
        <p>
          Inline <code>code()</code>, keyboard <kbd>Ctrl</kbd>+<kbd>K</kbd>, and{" "}
          <mark>highlight</mark>.
        </p>
        <pre>
          <code>{`function hello() {
  console.log('world');
}`}</code>
        </pre>
        <blockquote>
          This is a themed blockquote using muted text and a border.
        </blockquote>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Apples</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Oranges</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
        <p>
          <small>Small, muted text example.</small>
        </p>
        <ul>
          <li>First</li>
          <li>Second</li>
        </ul>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "grid", gap: 8, maxWidth: 420 }}
        >
          <input placeholder="Your name" />
          <select defaultValue="">
            <option value="" disabled>
              Pick one…
            </option>
            <option>Option A</option>
            <option>Option B</option>
          </select>
          <textarea rows={3} placeholder="Message" />
        </form>
        <hr />
      </section>
      <div>
        <Tabs tabs={tabs} defaultActive="tab_1" ariaLabel="Demo tabs" />
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button appearance="primary">Primary</Button>
        <Button appearance="secondary">Secondary</Button>
        <Button appearance="outline">Outline</Button>
        <Button appearance="subtle">Subtle</Button>
        <Button appearance="transparent">Transparent</Button>
        <Button appearance="danger">Danger</Button>
      </div>
      <div>
        <Pagination
          totalPages={26}
          currentPage={page}
          setPage={setPage}
          ariaLabel="Demo pagination"
        />
      </div>
    </div>
  );
}
