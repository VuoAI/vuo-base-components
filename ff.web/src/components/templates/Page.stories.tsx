import type { Meta, StoryObj } from "@storybook/react";

import Page from "./Page";

const meta = {
  component: Page,
  tags: ["autodocs"],
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
