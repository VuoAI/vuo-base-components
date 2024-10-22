import type { Meta, StoryObj } from "@storybook/react";
import type { TypeWithDeepControls } from "storybook-addon-deep-controls";

import getMockRecipeObject from "@vuo/mock/Mock";
import QuestCard from "./QuestCard";

const meta: Meta<typeof QuestCard> = {
  title: "Organisms/QuestCard",
  component: QuestCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof QuestCard>;


export const DefaultQuestCard: TypeWithDeepControls<Story> = {
  args: {
    quest: getMockRecipeObject()
  },
  parameters: {
    deepControls: { enabled: true }
  }
}