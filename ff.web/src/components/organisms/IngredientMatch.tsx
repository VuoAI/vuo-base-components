import React, { useState, useEffect, useCallback } from 'react';
import Button from "@vuo/components/atoms/Button"
import { observer } from 'mobx-react-lite';
import Tooltip from '@vuo/atoms/ToolTip';
import { Recipe } from '@vuo/models/Recipe';
import { Step } from '@vuo/models/Step';
import { Resource } from '@vuo/models/Resource';
import styles from './IngredientMatch.module.scss';

interface MatchItem {
    stepText: string;
    ingredientsStrings: string[];
    isMatched: boolean;
    id: string;
}

interface IngredientMatchProps {
    allowReplay: boolean;
    onClose?: () => void;
    recipe: Recipe;
    maxItems?: number; // New prop for maximum number of items
}

const IngredientMatch: React.FC<IngredientMatchProps> = observer(({ allowReplay, onClose, recipe, maxItems = 5 }) => {
    const [matchSteps, setMatchSteps] = useState<MatchItem[]>([]);
    const [matchIngredients, setMatchIngredients] = useState<MatchItem[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [selectedStep, setSelectedStep] = useState<string | null>(null);

    function shuffleArray<T>(array: T[]): T[] {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    const startGame = useCallback(() => {
        // Filter steps with non-empty resources and create MatchItems
        const allMatchSteps = recipe.steps
            .filter((step: Step) => step.resources && step.resources.length > 0)
            .map((step: Step, index: number) => {
                // Remove html tags and backticks
                let cleanStepText = step.text.replace(/<[^>]*>|`/g, '')

                // Replace quantity placeholders with actual quantity
                step.resources!.forEach((resource: Resource, resIndex: number) => {
                    const placeholder = `\${QUANTITY${resIndex}}`;
                    cleanStepText = cleanStepText.replace(placeholder, resource.quantity.toString());
                });

                return {
                    stepText: cleanStepText,
                    ingredientsStrings: step.resources!.map((resource: Resource) => resource.name),
                    isMatched: false,
                    id: `step-${index}`
                };
            });

        // Randomly select a subset of match items
        const randomMatchSteps = shuffleArray(allMatchSteps).slice(0, maxItems);

        const randomMatchIngredients = shuffleArray(randomMatchSteps);

        setMatchSteps(randomMatchSteps);
        setMatchIngredients(randomMatchIngredients);
    }, [maxItems, recipe.steps]);

    useEffect(() => {
        startGame();

    }, [startGame]);

    const checkMatch = (ingredientId: string | null, stepId: string | null) => {
        if (ingredientId && stepId && ingredientId === stepId) {

            setMatchSteps(matchSteps.map(i => i.id === ingredientId || i.id === stepId ? { ...i, isMatched: true } : i));
            setMatchIngredients(matchIngredients.map(i => i.id === ingredientId || i.id === stepId ? { ...i, isMatched: true } : i));

            setSelectedIngredient(null);
            setSelectedStep(null);

            return true;
        }

        setSelectedIngredient(null);
        setSelectedStep(null);

        return false;
    };

    const handleIngredientClick = (id: string) => {
        setSelectedIngredient(id);
        if (selectedStep) {
            checkMatch(id, selectedStep);
        }
    };

    const handleStepClick = (id: string) => {
        setSelectedStep(id);
        if (selectedIngredient) {
            checkMatch(selectedIngredient, id);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Ingredient Match <Tooltip
                    content={
                        <div>
                            <p>Match the ingredient to its correct step.</p>
                            <p>Click an ingredient, then click the corresponding step.</p>
                        </div>
                    }
                >
                    <span style={{ cursor: 'pointer' }}>&#8505;</span>
                </Tooltip></h1>
            </div>
            <div className={styles.game_container}>
                <div className={styles.ingredients_column}>
                    <h2 className={styles.subtitle}>Ingredients</h2>
                    <div className={styles.options_container}>
                        {matchIngredients.map((item) => (
                            <button
                                type="button"
                                key={`ingredient-${item.id}`}
                                onClick={() => handleIngredientClick(item.id)}
                                className={`${styles.option} ${item.isMatched ? styles.matched : ''} ${selectedIngredient === item.id ? styles.selected : ''}`}
                            >
                                {item.ingredientsStrings[0]}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.steps_column}>
                    <h2 className={styles.subtitle}>Steps</h2>
                    <div className={styles.options_container}>
                        {matchSteps.map((item) => (
                            <button
                                type="button"
                                key={`step-${item.id}`}
                                onClick={() => handleStepClick(item.id)}
                                className={`${styles.option} ${item.isMatched ? styles.matched : ''} ${selectedStep === item.id ? styles.selected : ''}`}
                            >
                                {item.stepText}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.controls_container}>
                <Button onClick={onClose}>Close</Button>
                {allowReplay && <Button onClick={() => {
                    startGame()
                }}>Replay</Button>}
            </div>
        </div>
    );
});

export default IngredientMatch;



