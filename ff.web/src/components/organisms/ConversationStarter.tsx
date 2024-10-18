import React, { useState } from 'react';
import Button from "@vuo/components/atoms/Button"
import Card from "@vuo/components/atoms/Card"
import { observer } from 'mobx-react-lite';
import Tooltip from '@vuo/atoms/ToolTip';
import styles from './ConversationStarter.module.scss';

interface CardData {
    category: string;
    text: string;
}

const ConversationStarter: React.FC<{ category?: string, allowReplay: boolean, onClose?: () => void }> = observer(({ category, allowReplay, onClose }) => {
    const [gameState, setGameState] = useState<'initial' | 'cardSelection' | 'finalSelection' | 'discussion'>('initial');
    const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
    const [currentCard, setCurrentCard] = useState<CardData | null>(null);

    const cards: CardData[] = [
        { category: "Childhood", text: "What's your favorite childhood memory?" },
        { category: "History", text: "If you could have dinner with any historical figure, who would it be and why?" },
        { category: "Travel", text: "What's the most interesting place you've ever visited?" },
        { category: "Skills", text: "If you could master any skill instantly, what would it be?" },
        { category: "Advice", text: "What's the best piece of advice you've ever received?" },
        { category: "Fiction", text: "If you could live in any fictional world, which one would you choose?" },
    ];

    const getRandomCardFromCategory = (): CardData | undefined => {
        const categoryCards = cards.filter(card => card.category === category);
        return categoryCards[Math.floor(Math.random() * categoryCards.length)];
    };

    const getRandomCard = (): CardData => {
        if (category) {
            return getRandomCardFromCategory() || cards[Math.floor(Math.random() * cards.length)];
        }
        return cards[Math.floor(Math.random() * cards.length)];
    };

    const handleCardSelection = (accept: boolean) => {
        if (accept && selectedCards.length < 3 && currentCard) {
            setSelectedCards(prevCards => {
                const newCards = [...prevCards, currentCard];
                if (newCards.length === 3) {
                    setGameState('finalSelection');
                } else {
                    setCurrentCard(getRandomCard());
                }
                return newCards;
            });
        } else if (selectedCards.length < 3) {
            setCurrentCard(getRandomCard());
        }
    };

    const handleFinalSelection = (card: CardData) => {
        setCurrentCard(card);
        setGameState('discussion');
    };

    const resetGame = () => {
        setGameState('initial');
        setSelectedCards([]);
        setCurrentCard(null);
    };

    const renderGameState = () => {
        switch (gameState) {
            case 'initial':
                return (
                    <div className={styles.controls_container}>
                        <Button onClick={() => {
                            setGameState('cardSelection');
                            setCurrentCard(getRandomCard());
                        }}>
                            Start Game
                        </Button>
                    </div>
                );
            case 'cardSelection':
                return (
                    <div className={styles.card_selection_container}>
                        <h2 className={styles.title}>Choose 3 cards ({selectedCards.length}/3)</h2>

                        <div className={styles.card_content}>
                            <p className={styles.subtitle}>{currentCard?.text}</p>

                        </div>
                        <div className={styles.controls_container} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button onClick={() => handleCardSelection(false)}>Skip</Button>
                            <Button onClick={() => handleCardSelection(true)}>Accept</Button>
                        </div>
                    </div>
                );
            case 'finalSelection':
                return (
                    <div className={styles.card_selection_container}>
                        <h2 className={styles.title}>Choose the one you want to talk about</h2>
                        <div className={styles.card_grid}>
                            {selectedCards.map((card) => (
                                <button
                                    key={card.text.replace(/\s+/g, '-')}
                                    className={styles.card_content}
                                    onClick={() => handleFinalSelection(card)}
                                    type="button"
                                >
                                    <p className={styles.subtitle}>{card.text}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'discussion':
                return (
                    <div className={styles.card_selection_container}>
                        <h2 className={styles.title}>Discuss this topic with your group or reflect on it yourself!</h2>
                        <div className={styles.card_content}>
                            <p className={styles.subtitle}>{currentCard?.text}</p>

                        </div>
                        <div className={styles.controls_container}>
                            {allowReplay && 
                            <Button onClick={resetGame}>
                                Play Again
                            </Button>}
                            {onClose && <Button onClick={onClose}>
                                Close
                            </Button>}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <Card className={styles.container}>
            <div className={styles.tooltip_container}>
                <Tooltip
                    content={
                        <div>
                            <p>You will be given a cut of meat and you will have to guess where it is.</p>
                            <p>You will have to guess the cut of meat by clicking on the image.</p>
                            <p>You will be scored based on how close you are to the correct cut of meat.</p>
                        </div>
                    }
                    
                >
                    <span style={{ cursor: 'pointer' }}>&#8505;</span>
                </Tooltip>
            </div>
            <div className={styles.header}>
                <h1 className={styles.title}>Conversation Starter</h1>
            </div>
            {renderGameState()}
        </Card>
    );
});

export default ConversationStarter;
