// @ts-nocheck

import { Key, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import TextareaAutosize from 'react-textarea-autosize';

import { ReviewStatus, Step } from '@vuo/models/Step';
import styles from "./RecipeSteps.module.scss";


interface RecipeStepsProps {
  steps: Step[] | undefined;
  busyFields: { [key: string]: boolean };
  nextStepToReview: Step | null;
  addSubStepToParentStep(id: string): void;
  onAtomizeStep(id: string): void;
  onRemoveStep(id: string): void;
  onUpdateStep(id: string, field: string, value: string | Partial<ReviewStatus>): void;
  onMoveStep(id: string, newPosition: number[]): void;
  onSelectStep(id: string): void;
}

const RecipeSteps = observer((props: RecipeStepsProps) => {
  const {
    steps,
    busyFields,
    nextStepToReview,
    addSubStepToParentStep,
    onMoveStep,
    onUpdateStep,
    onRemoveStep,
  } = props;

  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState<Key[]>([]);
  const [userExpandedKeys, setUserExpandedKeys] = useState<Key[]>([]);

  const findKeysToExpand = (stepId: string, stepsArr: Step[]): Key[] => {
    let keys: string[] = [];

    const findKey = (stepsArray: Step[], parentKeys: string[] = []): boolean => stepsArray.some(step => {
        if (step.id === stepId) {
          keys = [...parentKeys, step.id];
          return true;
        }
        if (step.subSteps && step.subSteps.length > 0) {
          const foundInSubSteps = findKey(step.subSteps, [...parentKeys, step.id]);
          if (foundInSubSteps) return true;
        }
        return false;
      });

    findKey(stepsArr);
    return keys;
  };

  const handleExpand = (expandedKeys: Key[]) => {
    setUserExpandedKeys(expandedKeys);
  };


  useEffect(() => {
    if (nextStepToReview && steps) {
      const keysToExpand = findKeysToExpand(nextStepToReview.id, steps)
      setDefaultExpandedKeys(keysToExpand)
    }
  }, [nextStepToReview, steps])

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    onMoveStep(dragKey.toString(), dropPos.map(dp => Number(dp)))
  }

  const titleForTreeNode = (step: Step, highlight: boolean = false) => {
    if (nextStepToReview?.id === step.id) {
      return (
        <div className={styles.nodeContainer} key={step.id}>
          <TextareaAutosize
            className={styles.textarea}
            value={step.text}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              onUpdateStep(step.id, 'text', event.target.value)
            }} />
          <div className={styles.buttonContainer}>
            <button
              type='button'
              className={`${styles.actionbutton} ${busyFields[`atomize_${step.id}`] ? styles.actionbuttonBusy : ''}`}
              onClick={() => onUpdateStep(step.id, 'reviewStatus', { textVerified: true })}
              disabled={busyFields[`atomize_${step.id}`]}
            >
              {busyFields[`atomize_${step.id}`] ? '' : '✅'}
              <span className={styles.tooltiptext}>Approve</span>
            </button>
            <button
              type='button'
              className={styles.actionbutton}
              onClick={() => onRemoveStep(step.id)}
            >
              ❌
              <span className={styles.tooltiptext}>Remove</span>
            </button>
            {/* <button
              type='button'
              className={`${styles.actionbutton} ${busyFields[`atomize_${step.id}`] ? styles.actionbuttonBusy : ''}`}
              onClick={() => onAtomizeStep(step.id)}
              disabled={busyFields[`atomize_${step.id}`]}
            >
              {busyFields[`atomize_${step.id}`] ? '' : '🪄'}
              <span className={styles.tooltiptext}>Atomize</span>
            </button> */}
            <button
              type='button'
              className={styles.actionbutton}
              onClick={() => addSubStepToParentStep(step.id)}
            >
              ➕
              <span className={styles.tooltiptext}>Add new step</span>
            </button>
          </div>
        </div>)
    }
    if (step.reviewStatus.textVerified) {
      return <div className={`${styles.nodeContainer} ${styles.approvedContainer}`}>
        <div className={styles.approvedTitleContainer}>
          <TextareaAutosize
            className={styles.textarea}
            value={step.text} />
        </div>
        <div className={styles.buttonContainer}>
          <button
            type='button'
            className={styles.actionbutton}
            onClick={() => onUpdateStep(step.id, 'reviewStatus', { textVerified: false })}
          >
            🛠️
            <span className={styles.tooltiptext}>Edit</span>
          </button>
        </div>
      </div>
    }
    return <TextareaAutosize
      disabled
      className={styles.textarea}
      style={{ opacity: highlight ? "1" : "0.2" }}
      value={step.text} />
  }

  const transformToTreeData = (stepArray: Step[], root: boolean = false): TreeDataNode[] => {
    const isAnySiblingFocused = root ? false : stepArray.find(s => s.id === nextStepToReview?.id)
    return stepArray.map(step => ({
      title: titleForTreeNode(step, !!isAnySiblingFocused),
      key: step.id,
      children: step.subSteps?.length ? transformToTreeData(step.subSteps) : undefined,
    }))
  };

  const treeData = () => {
    if (steps && steps?.length > 0) {
      const tree = transformToTreeData(steps, true)
      return tree;
    }
    return []
  }

  const combinedExpandedKeys = Array.from(new Set([...defaultExpandedKeys, ...userExpandedKeys]));

  return (
    <div>
      <Tree
        // allowDrop={(options) => {

        //   return false
        // }}
        blockNode
        draggable
        showLine
        onDrop={onDrop}
        expandedKeys={combinedExpandedKeys}
        onExpand={handleExpand}
        treeData={treeData()}
      />
    </div>
  );
});

export default RecipeSteps;

