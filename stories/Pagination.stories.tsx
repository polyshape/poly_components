import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "../src";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    totalPages: { control: { type: "number", min: 1, max: 50 } },
    currentPage: { control: false }, // handled internally in the story
    delta: { control: { type: "number", min: 0, max: 5 } },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

// Reusable wrapper to manage state for stories
function PaginationWrapper({ totalPages, delta }: { totalPages: number; delta?: number }) {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={page}
      setPage={setPage}
      ariaLabel="Pagination navigation"
      delta={delta}
    />
  );
}

export const Playground: Story = {
  args: { totalPages: 10, delta: 1 },
  render: (args) => <PaginationWrapper totalPages={args.totalPages} delta={args.delta} />,
};

export const FewPages: Story = {
  render: () => <PaginationWrapper totalPages={3} />,
};

export const ManyPages: Story = {
  render: () => <PaginationWrapper totalPages={20} delta={2} />,
};

export const SinglePage: Story = {
  render: () => <PaginationWrapper totalPages={1} />,
};
