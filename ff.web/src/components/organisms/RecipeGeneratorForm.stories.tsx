import type { Meta, StoryObj } from "@storybook/react";

import RecipeGeneratorForm from "./RecipeGeneratorForm";

const meta: Meta<typeof RecipeGeneratorForm> = {
  title: "Organisms/RecipeGeneratorForm",
  component: RecipeGeneratorForm,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof RecipeGeneratorForm>;


export const Default: Story = { }