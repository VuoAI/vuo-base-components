/* eslint-disable react/jsx-props-no-spreading */
import type { Meta, StoryObj } from "@storybook/react";
import CheckListItem from "./CheckListItem"

const meta: Meta<typeof CheckListItem> = {
  title: "Molecules/CheckListItem",
  component: CheckListItem,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CheckListItem>

export const Default: Story = {
  args: {
    checked: false,
    icon: "chef-knife",
    title: "1 pcs",
    subtitle: "Onion"
  },
  render: function Render(args) {
    return (
      <div style={{
        backgroundColor: 'gray',
        height: '140px',
        padding: '8px',
        width: '400px' }}>
        <CheckListItem {...args} />
      </div>
    )
  }
}