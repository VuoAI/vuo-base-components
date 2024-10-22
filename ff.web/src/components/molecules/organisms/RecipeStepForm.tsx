import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TextareaAutosize from 'react-textarea-autosize';

import { Step } from '@vuo/models/Step';
import styles from "./RecipeStepForm.module.scss"
// import RecipeMediaInput from './RecipeMediaInput';
// import ResourceInput from './ResourceInput';
// import RecipeToolInput from './RecipeToolInput';
// import RecipeSkillsDropdown from './RecipeSkillsDropdown';

interface RecipeStepFormProps {
  step: Step & { id: string; substeps?: { [key: string]: Step & { id: string } } };
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  onAdd: (id: string) => void
  onAtomize(id: string): void;
  index: number
}

const RecipeStepForm = observer((props: RecipeStepFormProps) => {
  const { step, onRemove, onAdd, onAtomize, onUpdate } = props;

  // const [downtime] = useState<number>(step.downtime || 0);
  // const [highlight] = useState<HighlightType>(step.highlight || HighlightType.Normal);
  // const [stepMedia] = useState<Media>(step.media || {});
  // const [stepResources] = useState<Resource[]>(step.resources || []);
  // const [skills, setSkills] = useState<string[]>(step?.skills.map(skill => skill.toString()));
  // const [tools] = useState<RecipeTool[]>(step.tools || []);
  const [showDetails] = useState<boolean>(true)

  return (
    <div
      className={styles.container}
      style={{ padding: '8px', border: "1px solid lightgray" }}
    >
      <h3 className={styles.title}>Step #{step.id}</h3>
      <TextareaAutosize
        className={styles.textarea}
        style={{ width: '100%', }}
        value={step.text}
        onChange={e => onUpdate(step.id, 'text', e.target.value)}
        placeholder="Step text"
        rows={5}
      />
      {showDetails &&
        <>
          {/* CURRENTLY NOT NEEDED, ENABLE LATER */}
          {/* <div>Downtime</div> */}
          {/* <input type="number" value={downtime} onChange={e => setDowntime(Number(e.target.value))} placeholder="Downtime" onBlur={handleUpdate} /> */}
          {/* <div>Type</div>
        <select value={highlight} onChange={e => { setHighlight(e.target.value as HighlightType); handleUpdate(); }}>
          <option value={HighlightType.Normal}>Normal</option>
          <option value={HighlightType.Challenge}>Challenge</option>
        </select>
        <RecipeMediaInput media={stepMedia} setMedia={setStepMedia} />
        <ResourceInput resources={stepResources} setResources={setStepResources} />
        <RecipeSkillsDropdown selectedSkills={skills} setSelectedSkills={setSkills} />
        <RecipeToolInput tools={tools} setTools={setTools} /> */}
        </>
      }
      {/* <button className={styles.button} type="button" onClick={handleUpdate}>Update Step</button> */}
      <div style={{ gap: '6px', display: 'flex', marginBottom: '4px' }}>
        <button className={styles.button} type="button" onClick={() => onRemove(step.id)}>Remove Step</button>
        <button className={styles.button} type="button" onClick={() => onAdd(step.id)}>Add substep</button>
        <button className={styles.button} type="button" onClick={() => onAtomize(step.id)}>Atomize!</button>
      </div>
      {step.subSteps?.map((subStep, subIndex) => (
        <RecipeStepForm
          key={subStep.id}
          step={subStep}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onAtomize={onAtomize}
          onAdd={onAdd}
          index={subIndex}
        />
      ))}
    </div>
  );
});

export default RecipeStepForm;
