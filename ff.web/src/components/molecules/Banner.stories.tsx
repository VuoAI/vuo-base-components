import type { Meta, StoryObj } from "@storybook/react";
import { useState } from 'react';
import Button from "@vuo/atoms/Button"
import Banner from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Molecules/Banner",
  component: Banner,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Tools: Story = {

  render: function Render() {
    const [visible, setVisible] = useState(false)

    return (
      <div style={{ height: '500px' }}>
        {visible && (
          <Banner
            duration={2000}
            onClose={() => setVisible(false)}
            title="Player is joining the game!"
            subtitle="Player A" />
        )}
        <Button onClick={() => setVisible(true)}>Join</Button>
      </div >
    )
  }
};
