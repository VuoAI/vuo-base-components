// @ts-nocheck

import { useState, useRef } from "react";
import { observer } from "mobx-react-lite";

import QuestTask from '@vuo/organisms/QuestTask';
import { AdminRecipe } from "@vuo/viewModels/RecipeGeneratorViewModel";
import { StepState, PlayerQuestState, PlayerQuestStep } from "@vuo/models/PlayerQuest";
import { RecipeState } from "@vuo/models/Recipe";
import QuestCard from '@vuo/organisms/QuestCard';
import Page from '@vuo/atoms/Page';
import { Quest } from "@vuo/models/Quest";
import styles from "./RecipeGeneratorForm.module.scss"

type RecipeGeneratorPreviewProps = {
  recipe: AdminRecipe
}

const RecipeGeneratorPreview = observer((props: RecipeGeneratorPreviewProps) => {
  const { recipe } = props
  enum ViewState {
    Intro = "Intro",
    Play = "Play",
  }

  const [viewState, setViewState] = useState<ViewState>(ViewState.Intro);
  const taskRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [key, setKey] = useState(0);

  const onStepDone = (stepId: string) => {
    setCompletedTasks(completedTasks.concat(stepId))
  };

  function quest(): Quest {
    return {
      id: '',
      tags: [],
      miniGames: [],
      recipe,
      name: 'Test Quest'
    }
  }

  function playerQuest() {
    const playerQuestSteps: PlayerQuestStep[] = recipe.steps?.map((step) => ({
      ...step,
      state: StepState.notStarted,
      subSteps: step.subSteps?.map((s) => ({ ...s } as PlayerQuestStep)) || []
    })) || [];

    const playerQuestRecipe = {
      ...recipe,
      id: '',
      resources: [],
      state: RecipeState.current,
      servingSize: '',
      steps: playerQuestSteps
    }
    return {
      id: '',
      originalQuestId: '',
      recipe: playerQuestRecipe,
      state: PlayerQuestState.inProgress,
      tags: [],
      miniGames: [],
      name: 'Test PlayerQuest'
    }
  }

  function getAllSteps(steps: PlayerQuestStep[]) {
    const allSteps: PlayerQuestStep[] = [];

    function gatherSteps(inlineSteps: PlayerQuestStep[]) {
      inlineSteps.forEach(step => {
        if (step.subSteps && step.subSteps.length > 0) {
          gatherSteps(step.subSteps);
        } else {
          allSteps.push(step);
        }
      });
    }

    gatherSteps(steps);
    const updatedSteps = allSteps.map(step => ({
      ...step,
      state: completedTasks.includes(step.id) ? StepState.completed : StepState.notStarted
    }));

    const nextStepIndex = updatedSteps.findIndex(step => step.state === StepState.notStarted);
    if (nextStepIndex !== -1) {
      // Set the next step as "current"
      updatedSteps[nextStepIndex].state = StepState.current;
    }
    return updatedSteps;
  }

  // Use this to force rerender QuestCard, since it's not implement to be observer
  // In actual game, the Quest (or Recipe) data is not updating in realtime
  const reload = () => {
    setKey(prevKey => prevKey + 1)
  }

  return (
    <>
      <button
        className={styles.button}
        type="button"
        onClick={reload}
      >
        Reload
      </button>
      {viewState === ViewState.Intro && (
        <div>
          <QuestCard
            key={key}
            groupMembers={[]}
            isCurrentUserHost={false}
            multiplayerUsers={[]}
            onStartQuest={() => setViewState(ViewState.Play)}
            quest={quest()} />
        </div>
      )}
      {viewState === ViewState.Play && (
        <div ref={scrollableContainerRef} style={{ flex: 1, overflowY: 'auto' }}>
          <Page>
            <div className="mt48">
              {getAllSteps(playerQuest().recipe.steps).map((step) =>
              // const isCurrentStep = currentStep?.id === step.id;
              (
                <div
                  key={step.id}
                  ref={(el) => {
                    taskRefs.current[step.id] = el!;
                  }}
                >
                  <QuestTask currentStep={false} step={step} onStepDone={(doneStep: PlayerQuestStep) => onStepDone(doneStep.id)}
                  />
                </div>
              )
              )}
            </div>
          </Page>
        </div>
      )}
    </>
  )
})

export default RecipeGeneratorPreview