// @ts-nocheck

import { useRef, useState } from 'react';
import { faker } from '@faker-js/faker';
import { AchievementSize } from '@vuo/models/Achievement';
import { PlayerAchievement } from '@vuo/models/PlayerAchievement';
import Card from '../atoms/Card'
import Avatar from '../atoms/Avatar'
import styles from './ProfileItem.module.scss'; // Import the styles object
import QuestLine from './QuestLine';

// TODO remove Hack and slash code butchery

interface ProgressionAchievement extends Partial<PlayerAchievement> {
  name: string;
  description: string;
  prerequisites: string[];
}

interface ProgressionChallenge {
  name: string;
  description: string;
}

interface ProgressionTree {
  challenges: ProgressionChallenge[]
  first_level_mega_achievements: {
    achievements: ProgressionAchievement[]
  }
  second_level_mega_achievements: {
    achievements: ProgressionAchievement[]
  }
  third_level_mega_achievements: {
    achievements: ProgressionAchievement[]
  }
}

interface ProfileItemProps {
  name: string;
  aspiration: string;
  progression_tree: ProgressionTree;
}

const playerAchievement = {
  id: faker.string.uuid(),
  achievement: {
    _id: 'random',
    name: "Starting out",
    description: "Become the italian kitchen warrior with extremely long description text which would have ellipsis if it works!",
    parent: [],
    size: AchievementSize.mega,
    subAchievements: [
    ]
  },
  completed: false
}

function generateAcheivement(name: string) {
  return {
    id: faker.string.uuid(),
    achievement: {
      _id: 'random',
      name,
      description: faker.lorem.sentence(),
      parent: [],
      size: AchievementSize.normal,
      subAchievements: [
      ]
    },
    completed: false
  }
}

const randomTrueOrFalse = () => Math.random() < 0.5

export default function ProfileItem({ name, aspiration, progression_tree }: ProfileItemProps) {
  const [progressTree, setProgressTree] = useState(progression_tree);
  const [playerAspiration] = useState(aspiration);
  const [loading, setLoading] = useState(false);
  const editableRef = useRef<HTMLHeadingElement>(null);
  const newSubAchievements = progressTree.challenges.map((challenge: ProgressionChallenge) => (
    {
      id: faker.string.uuid(),
      achievement: {
        _id: 'random',
        name: challenge.name,
        description: challenge?.description,
        parent: [],
        size: AchievementSize.normal,
        subAchievements: [
        ]
      },
      completed: randomTrueOrFalse()
    }
  ))

  const firstMegas: PlayerAchievement[] = progressTree.first_level_mega_achievements.achievements.map((achievement: ProgressionAchievement) => (
    {
      id: faker.string.uuid(),
      achievement: {
        _id: 'random',
        name: achievement.name,
        description: achievement?.description,
        parent: [],
        size: AchievementSize.mega,
        subAchievements: achievement.prerequisites.map((prerequisite: string) => (
          {
            _id: 'random',
            name: prerequisite,
            description: progressTree.challenges.find((c) => c.name === prerequisite)?.description || '',
            parent: [],
            size: AchievementSize.normal,
            subAchievements: [] // Modify this line to an empty array of Achievement
          }
        ))
      },
      completed: randomTrueOrFalse()
    }
  ))

  const secondMegas: PlayerAchievement[] = progressTree.second_level_mega_achievements.achievements.map((achievement: ProgressionAchievement) => (
    {
      id: faker.string.uuid(),
      achievement: {
        _id: 'random',
        name: achievement.name,
        description: achievement?.description,
        parent: [],
        size: AchievementSize.mega,
        subAchievements: achievement.prerequisites.map((prerequisite) => (
          {
            _id: 'random',
            name: prerequisite,
            description: progressTree.challenges.find((c) => c.name === prerequisite)?.description || '',
            parent: [],
            size: AchievementSize.normal,
            subAchievements: []
          }
        ))

      },
      completed: randomTrueOrFalse()
    }
  ))

  const thirdMegas = progressTree.third_level_mega_achievements.achievements.map((achievement: ProgressionAchievement) => (
    {
      id: faker.string.uuid(),
      achievement: {
        _id: 'random',
        name: achievement.name,
        description: achievement?.description,
        parent: [],
        size: AchievementSize.mega,
        subAchievements: achievement.prerequisites.map((prerequisite) => (
          {
            _id: 'random',
            name: prerequisite,
            description: progressTree.challenges.find((c) => c.name === prerequisite)?.description || '',
            parent: [],
            size: AchievementSize.normal,
            subAchievements: []
          }
        ))

      },
      completed: randomTrueOrFalse()
    }
  ))

  async function fetchFromApi(asp: string) {
    fetch('http://localhost:6166/api/achievement/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: asp,
        challenges: ["Perfectly Boil an Egg", "Knife Skills 101"],
        tone: "casual",
        age: "18-35"
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data?.progression_tree) setProgressTree(data.progression_tree)
      })
      // .catch(error => console.error('Error:', error))
      .finally(() => setLoading(false));
  }

  const handleBlur = () => {
    setLoading(true)
    fetchFromApi(editableRef.current?.innerText || "")
    setLoading(false)
  };

  return (
    <Card
      className={styles.profileItem} // Use the styles object to access the 'profileItem' class
    >
      <Avatar
        src="https://randomuser.me"
      />
      {loading ? <p>Loading...</p> :
        <>
          <h1>{name}</h1>
          <h2
            contentEditable
            ref={editableRef}
            onBlur={handleBlur}
            suppressContentEditableWarning

          >
            {playerAspiration}
          </h2>
          <QuestLine
            hideButton
            playerAchievement={playerAchievement}
            subPlayerAchievements={newSubAchievements}
          />
          {/* first mega */}
          <QuestLine
            hideButton
            playerAchievement={generateAcheivement("1st Mega Achievement")}
            subPlayerAchievements={firstMegas}
          />
          {/* second mega */}
          <QuestLine
            hideButton
            playerAchievement={generateAcheivement("2nd Mega Achievement")}
            subPlayerAchievements={secondMegas}
          />
          {/* third mega */}
          <QuestLine
            hideButton
            playerAchievement={generateAcheivement("3rd Mega Achievement")}
            subPlayerAchievements={thirdMegas}
          />
        </>
      }
    </Card>
  )
}

