/* eslint-disable no-template-curly-in-string */
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Button } from "antd-mobile";
import VirtualSear from '@vuo/components/organisms/VirtualSear';
import { Recipe } from "@vuo/models/Recipe";
import { HighlightType } from "@vuo/models/Step";
import styles from './Minigames.module.scss'
import CutGuessr from "../organisms/CutGuessr";
import ConversationStarter from "../organisms/ConversationStarter";
import IngredientMatch from "../organisms/IngredientMatch";
import QuizOrganism from "../organisms/QuizOrganism";

const Minigames = observer(() => {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    // eslint-disable-next-line no-template-curly-in-string
    const mockupRecipe: Recipe = {
        "id": "66c6d79741c1bb7bd0de5272",
        "name": "American pancakes",
        "media": {
            "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_Beginning.webp"
        },
        "resources": [
            {
                "name": "Melted butter",
                "quantity": "2",
                "unit": "tbsp"
            },
            {
                "name": "Sugar",
                "quantity": "2",
                "unit": "tbsp"
            },
            {
                "name": "Eggs",
                "quantity": "2",
                "unit": " "
            },
            {
                "name": "Vanilla extract",
                "quantity": "2",
                "unit": "tsp"
            },
            {
                "name": "Milk",
                "quantity": "4",
                "unit": "dl"
            },
            {
                "name": "Salt",
                "quantity": "a pinch of",
                "unit": " "
            },
            {
                "name": "Baking powder",
                "quantity": "4",
                "unit": "tsp"
            },
            {
                "name": "All-purpose flour",
                "quantity": "4",
                "unit": "dl"
            },
            {
                "name": "Toppings",
                "quantity": "as",
                "unit": "desired"
            }
        ],
        "steps": [
            {

                "attachable": false,
                "skills": [],
                "text": "Welcome to the wonderful world of pancakes! While you begin your journey to the best pancakes you have ever had, Princess Velma is going to travel through the Pancake Land, searching through ingredients to keep you company.\n\nLet's begin!",
                "tools": [],
                "resources": [],
                "media": {
                    "id": "66c6d79741c1bb7bd0de5272",
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_Beginning.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Microwave",
                        "id": "667aaf916b0072103fd7fc80"
                    },
                    {
                        "name": "Melt",
                        "id": "665ed1ca3dd4a69874c5e607"
                    }
                ],
                "text": "Microwave <span> ${QUANTITY0} tbsp of butter</span> in a microwave safe mug on high for 30 seconds.",
                "tools": [
                    {
                        "icon": "microwave",
                        "name": "Microwave"
                    },
                    {
                        "icon": "measuring_spoon",
                        "name": "Measuring Spoon"
                    },
                    {
                        "icon": "microwavesafe_mug",
                        "name": "Microwave Safe Mug "
                    }
                ],
                "resources": [
                    {
                        "name": "Melted butter",
                        "quantity": "2",
                        "unit": "tbsp"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_ButterRiver2.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Mix",
                        "id": "665ed1ca3dd4a69874c5e5fa"
                    }
                ],
                "text": "In a bowl, mix the <span>${QUANTITY0} tbsp melted butter</span> with <span>${QUANTITY1} tbsp sugar</span>.",
                "tools": [
                    {
                        "icon": "measuring_spoon",
                        "name": "Measuring Spoon"
                    },
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    },
                    {
                        "icon": "whisk",
                        "name": "Whisk"
                    }
                ],
                "resources": [
                    {
                        "name": "Melted butter",
                        "quantity": "2",
                        "unit": "tbsp"
                    },
                    {
                        "name": "Sugar",
                        "quantity": "2",
                        "unit": "tbsp"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_SugaryBeach.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Crack",
                        "id": "665ed1ca3dd4a69874c5e624"
                    }
                ],
                "text": "Crack <span>${QUANTITY0} eggs</span> in the bowl and mix well.",
                "tools": [
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    },
                    {
                        "icon": "whisk",
                        "name": "Whisk"
                    }
                ],
                "resources": [
                    {
                        "name": "Eggs",
                        "quantity": "2",
                        "unit": " "
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_EggMarket.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Measure",
                        "id": "665ed1ca3dd4a69874c5e619"
                    }
                ],
                "text": "Add <span>${QUANTITY0} tsp vanilla</span> to the mixture.",
                "tools": [
                    {
                        "icon": "measuring_spoon",
                        "name": "Measuring Spoon"
                    },
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    }
                ],
                "resources": [
                    {
                        "name": "Vanilla extract",
                        "quantity": "2",
                        "unit": "tsp"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_VanillaStream.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Measure",
                        "id": "665ed1ca3dd4a69874c5e619"
                    }
                ],
                "text": "Add <span>${QUANTITY0} dl milk</span> to the mixture.",
                "tools": [
                    {
                        "icon": "measuring_cup",
                        "name": "Measuring Cup"
                    },
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    }
                ],
                "resources": [
                    {
                        "name": "Milk",
                        "quantity": "4",
                        "unit": "dl"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_MilkFalls.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Pinch",
                        "id": "665ed1ca3dd4a69874c5e625"
                    }
                ],
                "text": "Add <span>${QUANTITY0} salt</span> to the mixture.",
                "tools": [
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    }
                ],
                "resources": [
                    {
                        "name": "Salt",
                        "quantity": "a pinch of",
                        "unit": " "
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_SaltCave.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Mix",
                        "id": "665ed1ca3dd4a69874c5e5fa"
                    }
                ],
                "text": "Add <span>${QUANTITY0} tsp baking powder</span> to the mixture and mix well.",
                "tools": [
                    {
                        "icon": "measuring_spoon",
                        "name": "Measuring Spoon"
                    },
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    },
                    {
                        "icon": "whisk",
                        "name": "Whisk"
                    }
                ],
                "resources": [
                    {
                        "name": "Baking powder",
                        "quantity": "4",
                        "unit": "tsp"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_BakingPowderTrees.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Mix",
                        "id": "665ed1ca3dd4a69874c5e5fa"
                    }
                ],
                "text": "Gradually add <span>${QUANTITY0} dl all-purpose flour</span> to the mixture while mixing.",
                "tools": [
                    {
                        "icon": "measuring_cup",
                        "name": "Measuring Cup"
                    },
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    },
                    {
                        "icon": "whisk",
                        "name": "Whisk"
                    }
                ],
                "resources": [
                    {
                        "name": "All-purpose flour",
                        "quantity": "4",
                        "unit": "dl"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_FlourMountains.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Rest",
                        "id": "665ed1ca3dd4a69874c5e632"
                    }
                ],
                "text": "Let the <span>batter</span> rest for around 15 minutes in the refrigerator. Princess Velma is going to rest as well while waiting for the batter. While Princess Velma and the batter are resting, continue to the next steps.",
                "tools": [
                    {
                        "icon": "bowl",
                        "name": "Bowl"
                    },
                    {
                        "icon": "refrigerator",
                        "name": "Refrigerator"
                    }
                ],
                "resources": [
                    {
                        "name": "Pancake batter",
                        "quantity": " ",
                        "unit": " "
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_Resting.webp"
                }
            },
            {
                "attachable": false,
                "skills": [],
                "subSteps": [
                    {
                        "attachable": false,
                        "skills": [
                            {
                                "name": "Learn",
                                "id": "66865afa5f2536609edca993"
                            }],
                        "text": "You'll need to flip the pancake in the air later on. Grab your pan and something that resembles a pancake (or something that might be fun to flip), makes sure it won't scratch the pan.",
                        "tools": [],
                        "resources": [],
                        "media": {
                            "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeChallenge1.png"
                        },
                        "highlight": HighlightType.Challenge
                    },
                    {
                        "attachable": false,
                        "skills": [
                            {
                                "name": "Learn",
                                "id": "66865afa5f2536609edca993"
                            }
                        ],
                        "text": "Tilt the pan slightly away from you. This position helps with the flip.",
                        "tools": [],
                        "resources": [],
                        "media": {
                            "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeChallenge2.png"
                        },
                        "highlight": HighlightType.Challenge
                    },
                    {
                        "attachable": false,
                        "skills": [
                            {
                                "name": "Learn",
                                "id": "66865afa5f2536609edca993"
                            }
                        ],
                        "text": "In one smooth motion, quickly push the pan forward and then pull it back towards you with a little upward flick of the wrist. Try to catch the object as flatly as possible",
                        "tools": [],
                        "resources": [],
                        "media": {
                            "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeChallenge3.png"
                        },
                        "highlight": HighlightType.Challenge
                    },
                    {
                        "attachable": false,
                        "skills": [
                            {
                                "name": "Learn",
                                "id": "66865afa5f2536609edca993"
                            }
                        ],
                        "text": "Repeat until you feel you got the hang of it.",
                        "tools": [],
                        "resources": [],
                        "media": {
                            "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeChallenge4.png"
                        },
                        "highlight": HighlightType.Challenge
                    }
                ],
                "text": "Do you want to learn how to flip pancakes?",
                "tools": [],
                "resources": [],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeChallengeQuestion.png"
                },
                "highlight": HighlightType.Challenge
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Set temperature",
                        "id": "665ed1ca3dd4a69874c5e603"
                    }
                ],
                "text": "It's time to start cooking the pancakes! Princess Velma was able to collect all the ingredients from the Pancake Land and has already started cooking the pancakes!\n\nHeat a pan on <span>medium heat</span>.",
                "tools": [
                    {
                        "icon": "pan",
                        "name": "Pan"
                    },
                    {
                        "icon": "stove",
                        "name": "Stove"
                    }
                ],
                "resources": [],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_PouringBatter.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Melt",
                        "id": "665ed1ca3dd4a69874c5e607"
                    }
                ],
                "text": "Butter the pan.",
                "tools": [
                    {
                        "icon": "pan",
                        "name": "Pan"
                    },
                    {
                        "icon": "spoon",
                        "name": "Spoon"
                    }
                ],
                "resources": [
                    {
                        "name": "Butter",
                        "quantity": "a drop",
                        "unit": "of"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_PouringBatter.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Pour",
                        "id": "665ed1ca3dd4a69874c5e631"
                    }
                ],
                "text": "Pour roughly <span>0.5 dl of the batter</span> to the pan. Don't move the batter around once it is in the pan.",
                "tools": [
                    {
                        "icon": "pan",
                        "name": "Pan"
                    },
                    {
                        "icon": "measuring_cup",
                        "name": "Measuring Cup"
                    }
                ],
                "resources": [
                    {
                        "name": "Pancake Batter",
                        "quantity": "0.5",
                        "unit": "dl"
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_PouringBatter.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Fry",
                        "id": "665ed1ca3dd4a69874c5e60e"
                    }
                ],
                "text": "Cook the pancake in the pan until bubbles form on the surface and the edges are set.",
                "tools": [
                    {
                        "icon": "pan",
                        "name": "Pan"
                    }
                ],
                "resources": [
                    {
                        "name": "Pancake",
                        "quantity": " ",
                        "unit": " "
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_PouringBatter.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Flip",
                        "id": "665ed1ca3dd4a69874c5e63a"
                    }
                ],
                "text": "Shake the pan a bit to make sure the pancake is not stuck, then using what you learned, flip the pancakes and cook until golden brown on both sides.",
                "tools": [
                    {
                        "icon": "pan",
                        "name": "Pan"
                    }
                ],
                "resources": [
                    {
                        "name": "Pancake",
                        "quantity": " ",
                        "unit": " "
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_Tossing.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Flip",
                        "id": "665ed1ca3dd4a69874c5e63a"
                    },
                    {
                        "name": "Fry",
                        "id": "665ed1ca3dd4a69874c5e60e"
                    }
                ],
                "text": "Pour, cook and flip as many times as necessary until you run out of batter.",
                "tools": [
                    {
                        "icon": "pan",
                        "name": "Pan"
                    },
                    {
                        "icon": "measuring spoon",
                        "name": "Measuring Spoon"
                    },
                    {
                        "icon": "spatula",
                        "name": "Spatula"
                    },
                    {
                        "icon": "plate",
                        "name": "Plate"
                    }
                ],
                "resources": [
                    {
                        "name": "Butter",
                        "quantity": " ",
                        "unit": " "
                    },
                    {
                        "name": "Pancake Batter",
                        "quantity": " ",
                        "unit": " "
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_PouringBatter.webp"
                }
            },
            {
                "attachable": false,
                "skills": [
                    {
                        "name": "Decorate",
                        "id": "665ed1ca3dd4a69874c5e64e"
                    }
                ],
                "text": "Now is time for the fun part! Decorate your pancakes anyway you want!",
                "tools": [],
                "resources": [
                    {
                        "name": "Pancakes",
                        "quantity": " ",
                        "unit": " "
                    },
                    {
                        "name": "Desired Toppings",
                        "quantity": " ",
                        "unit": " "
                    }
                ],
                "media": {
                    "image": "https://recipemedia.fra1.cdn.digitaloceanspaces.com/PancakeWorld/PancakeWorld_Sprinkles.webp"
                }
            }
        ],
        "description": "A classic and easy-to-make pancake recipe that serves 4-6, perfect for breakfast or brunch."
    }

    const games = [
        { name: "Virtual Sear", component: <VirtualSear allowPlayAgain /> },
        { name: "Cut Guessr", component: <CutGuessr allowPlayAgain /> },
        { name: "Cut Guessr (Cow)", component: <CutGuessr allowPlayAgain presetAnimal="Cow" /> },
        { name: "Cut Guessr (Pig)", component: <CutGuessr allowPlayAgain presetAnimal="Pig" /> },
        { name: "Cut Guessr (Chicken)", component: <CutGuessr allowPlayAgain presetAnimal="Chicken" /> },
        { name: "Conversation Starter", component: <ConversationStarter allowReplay /> },
        { name: "Ingredient Match", component: <IngredientMatch allowReplay recipe={mockupRecipe} /> },
        { name: "Quiz", component: <QuizOrganism /> },
    ];

    const renderGameButtons = () => (
        <Grid columns={2} gap={16}>
            {games.map((game) => (
                <Grid.Item key={game.name}>
                    <Button
                        block
                        onClick={() => setSelectedGame(game.name)}
                        className={styles.game_button}
                    >
                        {game.name}
                    </Button>
                </Grid.Item>
            ))}
        </Grid>
    );

    const onClose = () => {
        setSelectedGame(null);
    }

    const renderSelectedGame = () => {
        const game = games.find(g => g.name === selectedGame);
        return game ? (
            <div>
                <Button onClick={onClose} className={styles.back_button}>
                    Back to Games
                </Button>
                {game.component}
            </div>
        ) : null;
    };

    return (
        <div className={styles.minigames_container}>
            {selectedGame ? renderSelectedGame() : renderGameButtons()}
        </div>
    );
});

export default Minigames;
