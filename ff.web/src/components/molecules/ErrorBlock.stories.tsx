import type { Meta, StoryObj } from "@storybook/react";
import ErrorBlock from "./ErrorBlock";

const meta: Meta<typeof ErrorBlock> = {
  title: "Molecules/ErrorBlock",
  component: ErrorBlock,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ErrorBlock>;

export const Quest: Story = {
  args: {
    description: "Cna't fetch data",
    title: "Oh noes"
  }
};
