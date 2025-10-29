import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "../src";

const DEFAULT_STYLES = {
  root: {},
  button: {},
  buttonActive: {},
  buttonDisabled: {},
  ellipsis: {},
} as const;

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    totalPages: undefined,
    delta: 1,
    ariaLabel: undefined,
    styles: DEFAULT_STYLES,
  },
  argTypes: {
    totalPages: { control: { type: "number", min: 1, max: 50 } },
    setPage: { control: false },
    delta: { control: { type: "number", min: 0, max: 5 } },
    currentPage: { control: false },
    className: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

function PaginationWrapper({ totalPages, delta }: { totalPages: number; delta?: number }) {
  const [page, setPage] = useState(1);
  return (
    <div style={{ height: "90vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignSelf: "center", flex: "1 1 auto", width: "80%", border: "1px solid" }}>
        <div style={{ alignSelf: "center", width: "100%", textAlign: "center" }}>
          CONTENT FOR PAGE {page}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        setPage={setPage}
        ariaLabel="Pagination navigation"
        delta={delta}
      />
    </div>
  );
}

export const Basic: Story = {
  args: { totalPages: 10, delta: 1 },
  render: (args) => <PaginationWrapper {...args} />,
};

export const FewPages: Story = {
  args: { totalPages: 3 },
  render: (args) => <PaginationWrapper {...args} />,
};

export const ManyPages: Story = {
  args: { totalPages: 20, delta: 2 },
  render: (args) => <PaginationWrapper {...args} />,
};

export const SinglePage: Story = {
  args: { totalPages: 1 },
  render: (args) => <PaginationWrapper {...args} />,
};
