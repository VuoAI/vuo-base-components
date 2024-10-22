import type { Meta, StoryObj } from "@storybook/react";
import IconNames from "@vuo/models/IconTypes";
import InfoCard from "./InfoCard";

const meta: Meta<typeof InfoCard> = {
  title: "Molecules/InfoCard",
  component: InfoCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const Tools: Story = {
  args: {
    title: "Tools",
    items: [
      { title: "Fork", icon: IconNames.ChefKnife },
      { title: "Cutlery", icon: IconNames.Cutlery },
      { title: "Confetti", icon: IconNames.Confetti },
    ],
  },
};
