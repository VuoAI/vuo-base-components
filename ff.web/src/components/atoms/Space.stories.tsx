import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import Space from "./Space";

const meta: Meta<typeof Space> = {
  title: "Atoms/Space",
  component: Space,
  tags: ["autodocs"]
};
export default meta;

type Story = StoryObj<typeof Space>;

export const DefaultSpace: Story = {
  render: function Render(args) {
    return (
      // This is disable due to how children are added in Storybook
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Space {...args}>
        <Button color="primary">Click me!</Button>
        <Button>Click me!</Button>
        <Button>Click me!</Button>
      </Space >
    )
  }
};