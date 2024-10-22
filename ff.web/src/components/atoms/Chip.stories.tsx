import type { Meta, StoryObj } from "@storybook/react";
import IconNames from "@vuo/models/IconTypes";
import Chip from "./Chip";
import Icon from "./Icon";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Skill: Story = {
  args: {
    children: "Skill Name",
  },
};

export const XPChipWithIcon: Story = {
  args: {
    children: <div><Icon name={IconNames.ChefKnife} />Knife</div>,
  },
};

export const RedChip: Story = {
  args: {
    backgroundColor: "red",
    children: "Red Skill",
  },
};