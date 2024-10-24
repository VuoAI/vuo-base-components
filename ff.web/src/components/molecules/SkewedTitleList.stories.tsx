import type { Meta, StoryObj } from "@storybook/react";
import SkewedTitleList from "./SkewedTitleList";

const meta: Meta<typeof SkewedTitleList> = {
  title: "Molecules/SkewedTitleList",
  component: SkewedTitleList,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SkewedTitleList>;

export const Default: Story = {
  args: {
    items: [
      { "title": "Spaghetti & Meatballs" },
      { "title": "Completed" }
    ],
    sequential: false
  },
};

export const CustomBGColors: Story = {
  args: {
    items: [
      {
        "backgroundColor": "var(--red)",
        "foregroundColor": "var(--white)",
        "title": "Spaghetti & Meatballs"
      },
      {
        "foregroundColor": "var(--black)",
        "title": "Completed"
      }
    ]
  },
};