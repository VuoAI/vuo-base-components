import QuestData from "@vuo/mock/quest.json"
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { Quest } from '../models/Quest';

function getRandomImageUrl(): string {
  const randomImages = [
    "static/recipeimages/spaghetti_and_meatballs.webp",
    "static/recipeimages/pizza.webp",
    "static/recipeimages/ramen.webp",
    "static/recipeimages/hamburger.webp",
    "static/recipeimages/carbonara.webp",
    "static/recipeimages/avocado_and_toast.webp",
    "static/recipeimages/bacon_and_eggs.webp"
  ];
  return randomImages[Math.floor(Math.random() * randomImages.length)];
}

export default function getMockRecipeObject() {
  const mockData: Quest = QuestData as unknown as Quest
  mockData.id = uuid()
  mockData.recipe.steps = mockData.recipe.steps!.map(step => ({
    ...step,
    state: "NOT_STARTED"
  }));
  const questData: Quest = {
    ...mockData,
    recipe: {
      ...mockData.recipe,
      description: faker.lorem.lines(3),
      name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
      steps: mockData.recipe.steps.map(step => ({
        ...step,
        media: {
          id: uuid(),
          image: step.media?.image || "",
          video: step.media?.video || ""
        }
      })),
      media: {
        image: getRandomImageUrl(),
        video: mockData.recipe.media?.video || ""
      }
    }
  };
  return questData
}