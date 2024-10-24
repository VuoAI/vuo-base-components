import type { Meta, StoryObj } from "@storybook/react";
import type { TypeWithDeepControls } from "storybook-addon-deep-controls";
import { v4 as uuid } from "uuid";

import { StepState } from "@vuo/models/PlayerQuest";
import IconNames from "@vuo/models/IconTypes";
import QuestTask from "./QuestTask";

const meta: Meta<typeof QuestTask> = {
  title: "Organisms/QuestTask",
  component: QuestTask,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof QuestTask>;

export const WithImage: TypeWithDeepControls<Story> = {
  args: {
    step: {
      id: uuid(),
      attachable: false,
      reviewStatus: {
        processed: false,
        textVerified: false,
        ingredientsVerified: false,
        mediaGenerated: false,
        mediaApproved: false,
        skillsAssigned: false
      },
      resources: [{ name: "Chili Pepper", quantity: "1", unit: "pcs" }],
      media: {
        id: "E0BD4EBB-A69A-4314-1123-70236A55359B",
        image: "quest/recipe/recipe_image.webp",
        video: undefined
      },
      skills: [
        {
          id: "15A5468A-F243-4AAB-A352-448E9FEB66F5",
          challenge_rating: 25,
          difficulty_level: "Beginner",
          name: "Preparing",
          skill_category: "Measuring"
        }
      ],
      suggestedMedias: [],
      state: StepState.current,
      text: "Pour the pasta, the sauce, and the meatballs from the pot onto the plate.",
      tools: [{ icon: IconNames.ChefKnife, name: "Knife" }],
    },
  },
  argTypes: {
    "step.state": {
      control: {
        type: "select",
      },
      description: 'Select state',
      options: Object.values(StepState)
    }
  },
  parameters: {
    deepControls: { enabled: true }
  }
};

export const WithVideo: Story = {
  args: {
    step: {
      id: uuid(),
      attachable: false,
      resources: [{ name: "Meat", quantity: "100", unit: "g" }],
      reviewStatus: {
        processed: false,
        textVerified: false,
        ingredientsVerified: false,
        mediaGenerated: false,
        mediaApproved: false,
        skillsAssigned: false
      },
      media: {
        id: "E0BD4EBB-A69A-4314-1123-70236A55359B",
        image: undefined,
        video: "quest/recipe/recipe_movie.mov"
      },
      skills: [
        {
          id: "15A5468A-F243-4AAB-A352-448E9FEB66F5",
          challenge_rating: 35,
          difficulty_level: "Beginner",
          name: "Preparing",
          skill_category: "Measuring"
        }
      ],
      suggestedMedias: [],
      state: StepState.current,
      text: "Grate enough white bread to make 1/3 cup of breadcrumbs.",
      tools: [{ icon: IconNames.ChefKnife, name: "Knife" }],
    },
  },
};
