/* eslint-disable no-template-curly-in-string */
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Button } from "antd-mobile";
import VirtualSear from '@vuo/components/organisms/VirtualSear';
import mockRecipe from "@static/mockRecipe"
import styles from './Minigames.module.scss'
import CutGuessr from "../organisms/CutGuessr";
import ConversationStarter from "../organisms/ConversationStarter";
import IngredientMatch from "../organisms/IngredientMatch";
import QuizOrganism from "../organisms/QuizOrganism";

const Minigames = observer(() => {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const games = [
        { name: "Virtual Sear", component: <VirtualSear allowPlayAgain /> },
        { name: "Cut Guessr", component: <CutGuessr allowPlayAgain /> },
        { name: "Conversation Starter", component: <ConversationStarter allowReplay /> },
        { name: "Ingredient Match", component: <IngredientMatch allowReplay recipe={mockRecipe} /> },
        { name: "Quiz", component: <QuizOrganism /> }
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
