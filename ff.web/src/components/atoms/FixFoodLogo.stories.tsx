import type { Meta, StoryObj } from "@storybook/react";

import FixFoodLogo from "./FixFoodLogo";
import { LogoVariants } from "@vuo/utils/LogoUtils";

const meta = {
  component: FixFoodLogo,
} satisfies Meta<typeof FixFoodLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "",
    variant: LogoVariants.default,
  },
};
export const Orange: Story = {
  args: {
    className: "",
    variant: LogoVariants.orange,
  },
};
export const White: Story = {
  args: {
    className: "",
    variant: LogoVariants.white,
  },
};
