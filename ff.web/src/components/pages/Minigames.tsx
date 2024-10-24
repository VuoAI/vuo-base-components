import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Button } from "antd-mobile";
import VirtualSear from '@vuo/components/organisms/VirtualSear';
import mockRecipe from '../../../public/static/mockRecipe';
import styles from './Minigames.module.scss'
import CutGuessr from "../organisms/CutGuessr";
import ConversationStarter from "../organisms/ConversationStarter";
import IngredientMatch from "../organisms/IngredientMatch";
import QuizOrganism from "../organisms/QuizOrganism";

const Minigames = observer(() => {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const mockUserData = {
        unlockedMinigames: [
            "virtual-sear",
            "cut-guessr",
            "conversation-starter",
            "ingredient-match",
            "quiz"
        ]
    }

    const games = [
        { id: "virtual-sear", name: "Virtual Sear", component: <VirtualSear allowPlayAgain /> },
        { id: "cut-guessr", name: "Cut Guessr", component: <CutGuessr allowPlayAgain /> },
        { id: "conversation-starter", name: "Conversation Starter", component: <ConversationStarter allowReplay /> },
        { id: "ingredient-match", name: "Ingredient Match", component: <IngredientMatch allowReplay recipe={mockRecipe} /> },
        { id: "quiz", name: "Quiz", component: <QuizOrganism /> }
    ];

    const renderGameButtons = (unlockedGames: string[]) => (
        <Grid columns={2} gap={16}>
            {games.filter(game => unlockedGames.includes(game.id)).map((game) => (
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
            {selectedGame ? renderSelectedGame() : renderGameButtons(mockUserData.unlockedMinigames)}
        </div>
    );
});

export default Minigames;
