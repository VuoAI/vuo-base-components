import DOMPurify from 'dompurify';
import { PlayerQuestStep, StepState } from "@vuo/models/PlayerQuest";
import Button from "../atoms/Button";
import InfoCard from "../molecyles/InfoCard";
import Space from "../atoms/Space";
import styles from "./QuestChallenge.module.scss";

export type Props = {
  steps: PlayerQuestStep[];
  onStepDone?: (stepId: string) => void;
};

function QuestChallenge(props: Props) {
  const { steps, onStepDone } = props;

  function injectResourceToStepText(pqStep: PlayerQuestStep): string | undefined {
    if (!pqStep.resources || !pqStep.text) {
      return undefined;
    }

    return pqStep.resources.reduce((text, resource, index) => {
      const placeholder = `\${QUANTITY${index}}`;
      return text.replace(placeholder, resource.quantity.toString());
    }, pqStep.text);
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <h2>Challenge!</h2>
      <div className={styles.challengeContainer}>
        {steps.map((step, index) => (
          <div
            className={`animate__animated ${styles.step_container} ${styles.current} ${step.state === StepState.completed ? `animate__bounceOutLeft` : ""
              }`}
            role="button"
            style={{ zIndex: steps.length - index, transform: `translate(0, ${4 * index}px)` }}
            tabIndex={0}
          >
            <div className={styles.step}>
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
              {step.resources && step.resources.length > 0 ? (
                <div
                  className={styles.step_text}
                  // DOMPurify sanitaze the string and prevent XSS attacks
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(injectResourceToStepText(step) || "")
                  }}
                />
              ) : (
                <div
                  className={styles.step_text}
                  // DOMPurify sanitaze the string and prevent XSS attacks
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(step.text) }}
                />
              )}
              <Space
                direction="vertical"
                style={{ marginTop: 'auto', width: "100%", "--gap-vertical": "18px" }}
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
                <Button
                  block
                  className="btn btn-blue btn-large btn-raised"
                  color="primary"
                  fill="solid"
                  size="large"
                  onClick={() => onStepDone?.(step.id)}
                >
                  Done!
                </Button>
              </Space>
            </div>
          </div >
        ))}
      </div>
    </div >
  );
}

export default QuestChallenge;
