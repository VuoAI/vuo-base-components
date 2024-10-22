import type { Meta, StoryObj } from "@storybook/react";
import type { TypeWithDeepControls } from "storybook-addon-deep-controls";
import QuestPrepTask from "./QuestPrepTask";

const meta: Meta<typeof QuestPrepTask> = {
  title: "Organisms/QuestPrepTask",
  component: QuestPrepTask,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof QuestPrepTask>;

export const WithImage: TypeWithDeepControls<Story> = {
  args: {
    resources: [
      {
        name: "Bananas",
        unit: "pcs",
        quantity: "6"
      }
    ]
  },
  parameters: {
    deepControls: { enabled: true }
  }
};