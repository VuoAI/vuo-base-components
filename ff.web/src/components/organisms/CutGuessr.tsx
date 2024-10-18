/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import Card from '@vuo/atoms/Card';
import { observer } from 'mobx-react-lite';
import Tooltip from '@vuo/atoms/ToolTip';
import Switch from '@vuo/atoms/Switch';
import Button from '@vuo/atoms/Button';
import AnimalImage from '@vuo/components/molecules/AnimalImage';
import CutInfo from '@vuo/components/molecules/CutInfo';
import styles from './CutGuessr.module.scss';

export interface Animal {
    name: string;
    image: string;
}

const animals: Animal[] = [
    {
        name: 'Cow',
        image: 'https://gallery.yopriceville.com/downloadfullsize/send/19327',
    },
    {
        name: 'Chicken',
        image: 'https://clipart-library.com/images_k/chicken-silhouette-images/chicken-silhouette-images-13.png',
    },
    {
        name: 'Pig',
        image: 'https://openclipart.org/image/800px/314293',
    },
];

export interface Cut {
    name: string;
    image: string;
    description: string;
    cookingTip: string;
    cost: string;
    coordinates: { x: number; y: number };
}

const cuts: Record<string, Cut[]> = {
    Cow: [
        {
            name: 'Ribeye',
            image: 'https://static.vecteezy.com/system/resources/previews/041/326/147/non_2x/ai-generated-raw-ribeye-steak-isolated-on-transparent-background-free-png.png',
            description: 'A flavorful and tender cut from the rib section.',
            cookingTip: 'Best grilled or pan-seared to medium-rare.',
            cost: '$$$$',
            coordinates: { x: 45, y: 30 },
        },
        {
            name: 'Skirt Steak',
            image: 'https://sutcliffemeat.com.au/wp-content/uploads/2016/09/flank-_-skirt-take-2.png',
            description: 'A long, flat cut known for its robust flavor.',
            cookingTip: 'Marinate and grill quickly over high heat. Slice against the grain.',
            cost: '$$$',
            coordinates: { x: 45, y: 45 },
        },
        {
            name: 'Brisket',
            image: 'https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6IjM3NjRjZWZkMmFjNWNiNDE0ZjEwMjVlMmY4ZTBhOWRkLmpwZyIsInN0b3JhZ2UiOiJwdWJsaWNfc3RvcmUifQ?signature=65a746f43af13c56081619fa6306e58c9631c72a63efb13a55c7e3cd5d3904d7',
            description: 'A tough but flavorful cut from the breast section.',
            cookingTip: 'Best slow-cooked or smoked for tender, juicy meat.',
            cost: '$$',
            coordinates: { x: 34, y: 54 },
        },
        {
            name: 'Chuck',
            image: 'https://wardsgainesville.com/wp-content/uploads/2017/04/chuck_roast_1.png',
            description: 'A well-marbled cut from the shoulder area.',
            cookingTip: 'Ideal for slow-cooking methods like braising or pot roasting.',
            cost: '$$',
            coordinates: { x: 35, y: 28 },
        },
        {
            name: 'Shank',
            image: 'https://www.kroger.com/product/images/large/front/0020164200000',
            description: 'A tough, sinewy cut from the leg.',
            cookingTip: 'Best for slow-cooking methods like braising to break down connective tissues.',
            cost: '$',
            coordinates: { x: 38, y: 65 },
        },
        {
            name: 'Tenderloin',
            image: 'https://png.pngtree.com/png-vector/20231115/ourmid/pngtree-lean-raw-uncooked-fillet-beef-steak-cut-png-image_10530444.png',
            description: 'The most tender cut of beef, lean and mild in flavor.',
            cookingTip: 'Best cooked quickly over high heat, like grilling or pan-searing.',
            cost: '$$$$$',
            coordinates: { x: 72, y: 18 },
        },
        {
            name: 'Sirloin',
            image: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-freshly-cut-slices-thigh-beef-sirloin-steak-png-image_10213892.png',
            description: 'A lean, flavorful cut from the rear back portion.',
            cookingTip: 'Great for grilling or pan-frying. Avoid overcooking to maintain tenderness.',
            cost: '$$$',
            coordinates: { x: 72, y: 9 },
        },
    ],
    Chicken: [
        {
            name: 'Breast',
            image: 'https://static.vecteezy.com/system/resources/thumbnails/041/454/582/small_2x/ai-generated-a-piece-of-raw-chicken-breast-isolated-on-transparent-background-free-png.png',
            description: 'A lean and versatile cut from the chest.',
            cookingTip: 'Grill, bake, or pan-fry. Be careful not to overcook.',
            cost: '$$',
            coordinates: { x: 23, y: 54 },
        },
        {
            name: 'Drumstick',
            image: 'https://static.vecteezy.com/system/resources/previews/021/703/604/original/fresh-raw-fresh-raw-chicken-meat-isolated-on-transparent-background-chicken-drumstick-or-leg-top-view-filehicken-meat-isolated-on-white-background-chicken-drumstick-or-leg-top-view-png.png',
            description: 'A flavorful and juicy cut from the lower leg.',
            cookingTip: 'Great for grilling, baking, or frying. Cook until internal temperature reaches 165°F (74°C).',
            cost: '$',
            coordinates: { x: 50, y: 70 },
        },
        {
            name: 'Thigh',
            image: 'https://static.vecteezy.com/system/resources/previews/032/479/631/original/raw-fresh-chicken-thighs-on-transparent-background-png.png',
            description: 'A tender and flavorful cut from the upper leg.',
            cookingTip: 'Excellent for roasting, grilling, or braising. Ideal for dishes that require longer cooking times.',
            cost: '$$',
            coordinates: { x: 60, y: 68 },
        },
        {
            name: 'Wing',
            image: 'https://png.pngtree.com/png-vector/20231014/ourmid/pngtree-chicken-wings-cut-png-image_10256633.png',
            description: 'A popular cut with a good meat-to-bone ratio.',
            cookingTip: 'Perfect for frying, baking, or grilling. Marinate for extra flavor.',
            cost: '$',
            coordinates: { x: 45, y: 50 },
        },
    ],
    Pig: [
        {
            name: 'Pork Belly',
            image: 'https://frankandsal.com/cdn/shop/products/fresh-local-meat-delivery-pork-belly-bone-in-3-pound-slice-cut-fresh-daily-fresh-bacon-great-for-smoking-1_2000x.png?v=1551200857',
            description: 'A rich and fatty cut from the underside of the pig.',
            cookingTip: 'Slow-roast or braise for tender, flavorful meat.',
            cost: '$$$',
            coordinates: { x: 42, y: 63 },
        },
        {
            name: 'Porkchop',
            image: 'https://pngimg.com/d/pork_PNG11.png',
            description: 'A classic cut from the loin of the pig.',
            cookingTip: 'Best grilled or pan-fried. Avoid overcooking to maintain juiciness.',
            cost: '$$',
            coordinates: { x: 55, y: 30 },
        },
        {
            name: 'Ribs',
            image: 'https://png.pngtree.com/png-clipart/20210912/original/pngtree-pork-ribs-png-image_6731766.jpg',
            description: 'A flavorful cut perfect for barbecuing.',
            cookingTip: 'Slow-cook for tender, fall-off-the-bone texture. Great for smoking or oven-roasting.',
            cost: '$$',
            coordinates: { x: 52, y: 42 },
        },
        {
            name: 'Ham',
            image: 'https://pngimg.com/d/ham_PNG51.png',
            description: 'A versatile cut from the hind leg of the pig.',
            cookingTip: 'Can be enjoyed cured or fresh. Great for roasting, smoking, or slicing for sandwiches.',
            cost: '$$',
            coordinates: { x: 19, y: 47 },
        },
    ],
};

const getRandomCut = (animal: Animal) => {
    const animalCuts = cuts[animal.name];
    return animalCuts[Math.floor(Math.random() * animalCuts.length)];
};

const CutGuessr: React.FC<{
    presetAnimal?: 'Cow' | 'Chicken' | 'Pig';
    onClose?: () => void;
    allowPlayAgain: boolean;
}> = observer(({ presetAnimal, onClose, allowPlayAgain }) => {
    const [animal, setAnimal] = useState<Animal>(presetAnimal ? animals.find(a => a.name === presetAnimal)! : animals[Math.floor(Math.random() * animals.length)]);
    const [cut, setCut] = useState<Cut>(getRandomCut(animal));
    const [userGuess, setUserGuess] = useState<{ x: number; y: number } | null>(null);
    const [resetLine, setResetLine] = useState(false);
    const [score, setScore] = useState<number | undefined>(undefined);
    const [developerMode, setDeveloperMode] = useState(false);

    const handleGuess = (x: number, y: number) => {
        setUserGuess({ x, y });
        const distance = Math.sqrt(
            (x - cut.coordinates.x) ** 2 + (y - cut.coordinates.y) ** 2
        );
        const maxDistance = Math.sqrt(100 ** 2 + 100 ** 2); // Max possible distance
        const newScore = Math.round((1 - distance / maxDistance) * 100);
        setScore(newScore);
    };

    const startNewGame = () => {
        const newAnimal = presetAnimal ? animals.find(a => a.name === presetAnimal) : animals[Math.floor(Math.random() * animals.length)];
        const newCut = getRandomCut(newAnimal!);
        setAnimal(newAnimal!);
        setCut(newCut);
        setUserGuess(null);
        setResetLine(true);
        setScore(0);

        setTimeout(() => setResetLine(false), 500);
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
                <h1 className={styles.title}>CutGuessr</h1>
                <div className={styles.switch_container}>
                    <span className={styles.text}>Developer Mode:</span>
                    <Switch
                        checked={developerMode}
                        onChange={() => setDeveloperMode(!developerMode)}
                    />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.image_container}>
                    <AnimalImage
                        animal={animal}
                        onGuess={handleGuess}
                        developerMode={developerMode}
                        userGuess={userGuess}
                        actualLocation={cut.coordinates}
                        resetLine={resetLine}
                    />
                </div>
                <div className={styles.cut_info_container}>
                    <CutInfo cut={cut} />
                </div>
            </div>
            <div className={styles.controls_container}>

                {score !== null ? (
                    <>
                        <p className={styles.score_text}>Your score: {score}</p>
                        {allowPlayAgain && (
                            <Button
                                variant="large"
                                color="primary"
                                onClick={() => startNewGame()}
                            >
                                Play Again
                            </Button>
                        )}
                        <div style={{ height: '20px' }} />
                        {onClose && (
                            <Button
                                variant="large"
                                color="primary"
                                onClick={() => onClose()}
                            >
                                Close
                            </Button>
                        )}
                    </>
                ) : (
                    <p className={styles.instruction_text}>Click on the animal image where you think the cut comes from.</p>
                )}
            </div>
        </Card>
    );
});

export default CutGuessr;
