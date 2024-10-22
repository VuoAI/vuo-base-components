import { useState } from "react";
import DOMPurify from 'dompurify';
import { PlayerQuestStep, StepState } from "@vuo/models/PlayerQuest";
import { HighlightType } from "@vuo/models/Step";
import Chip from "../atoms/Chip";
import Button from "../atoms/Button";
import InfoCard from "../molecyles/InfoCard";
import Space from "../atoms/Space";
import styles from "./QuestTask.module.scss";

export type QuestTaskProps = {
  step: PlayerQuestStep;
  currentStep: boolean;
  hideClaimButton?: boolean;
  onStepDone?: (step: PlayerQuestStep) => void;
  onStepClaimed?: (step: PlayerQuestStep) => void;
  onChallengeAccepted?: (step: PlayerQuestStep) => void;
};

function QuestTask(props: QuestTaskProps) {
  const { currentStep, hideClaimButton, step, onChallengeAccepted, onStepDone, onStepClaimed } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const expand = isOpen || currentStep;
  const showButton = step.state !== StepState.completed;
  const hasXp = step.skills.length && step.skills[0].challenge_rating

  function handleExpand() {
    if (step.state === StepState.completed) {
      setIsOpen(!isOpen);
    }
  }

  function injectResourceToStepText(pqStep: PlayerQuestStep): string | undefined {
    if (!pqStep.resources || !pqStep.text) {
      return undefined;
    }

    return pqStep.resources.reduce((text, resource, index) => {
      const placeholder = `\${QUANTITY${index}}`;
      return text.replace(placeholder, resource.quantity.toString());
    }, pqStep.text);
  }

  const stepClassName = currentStep ? styles.current : styles.notCurrent;
  const isHighlighted = step?.highlight === HighlightType.Challenge

  return (
    <div
      className={`${styles.step} ${stepClassName} ${isHighlighted && styles.highlight}`}
      onClick={handleExpand}
      onKeyDown={handleExpand}
      role="button"
      tabIndex={0}
    >
      <Chip
        backgroundColor="blue"
        className={styles.skill_chip}>
        {step.state === StepState.completed ? "Done" : (step.skills[0]?.name || "")}
      </Chip>

      {step.claimedBy?.username && (
        <Chip backgroundColor="blue" className={styles.player_chip}>
          {step.claimedBy?.username}
        </Chip>
      )}
      <div style={{ paddingTop: hasXp ? "18px" : "0" }}>
        {expand && (
          <div>
            {step.media?.video && (
              <video
                className={styles.step_video}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                controlsList="nofullscreen"
              >
                <source
                  src={step.media.video}
                  type="video/mp4"
                />
                <track
                  kind="captions"
                  label="No captions"
                  srcLang="en"
                  default
                />
              </video>
            )}
            {step.media?.image && !step.media.video && (
              <div>
                <img
                  alt="step_image"
                  className={styles.step_image}
                  src={step.media.image}
                />
              </div>
            )}
          </div>
        )}
        
        <div
          className={styles.step_text}
          // DOMPurify sanitizes the string and prevents XSS attacks
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              step.resources && step.resources.length > 0
                ? injectResourceToStepText(step) || ""
                : step.text
            )
          }}
        />

        {expand && (
          <Space
            direction="vertical"
            style={{ width: "100%", "--gap-vertical": "18px" }}
          >
            <div className="flex gap-16">
              {step.tools && step.tools.length > 0 && (
                <InfoCard
                  title="Tools"
                  items={step.tools.map((tool) => ({
                    icon: tool.icon,
                    title: tool.name,
                  }))}
                />
              )}
              {step.resources && step.resources.length > 0 && (
                <InfoCard
                  title="Ingredients"
                  items={step.resources.map((resource) => ({
                    icon: "ingredient",
                    title: `${resource.quantity} ${resource.unit} ${resource.name} `,
                  }))}
                />
              )}
            </div>
            {showButton && (
              step.highlight === HighlightType.Challenge ? (
                <div className="flex gap-small">
                  <Button
                    className="btn btn-large btn-raised flex-one"
                    size="large"
                    onClick={() => onStepDone?.(step)}
                  >
                    Skip...
                  </Button>
                  <Button
                    className="btn btn-blue btn-large btn-raised flex-one"
                    color="primary"
                    fill="solid"
                    size="large"
                    onClick={() => onChallengeAccepted?.(step)}
                  >
                    Yes!
                  </Button>
                </div>
              ) : (
                <Button
                  block
                  className="btn btn-blue btn-large btn-raised"
                  color="primary"
                  fill="solid"
                  size="large"
                  onClick={() => onStepDone?.(step)}
                >
                  Done!
                </Button>
              )
            )}
          </Space>
        )}
        {!step.claimedBy && !hideClaimButton && (
          <Button
            block
            className="btn btn-large btn-raised"
            size="large"
            onClick={() => onStepClaimed?.(step)}
          >
            Claim!
          </Button>
        )}
      </div>
    </div >
  );
}

export default QuestTask;
