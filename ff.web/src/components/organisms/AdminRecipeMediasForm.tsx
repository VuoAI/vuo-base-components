import { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Carousel, Image, Tree } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import type { TreeDataNode } from 'antd';

import DOMPurify from 'dompurify';

import Button from "@vuo/atoms/Button"
import RecipeMediaViewModel from '@vuo/viewModels/RecipeMediaViewModel';
import { Step } from '@vuo/models/Step';
import styles from "./AdminRecipeMediasForm.module.scss"
import useArrowKeyHandler from '../../hooks/ArrowKeyHandler';

const AdminRecipeMediasForm = observer(() => {
  const { id } = useParams()
  const [viewModel] = useState<RecipeMediaViewModel>(() => new RecipeMediaViewModel(id!))

  const [highlightedText, setHighlightedText] = useState("");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const highlightedContentRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<CarouselRef>(null);

  const { recipe } = viewModel;

  const handleArrowPress = (dir: 'left' | 'right') => {
    carouselRef.current?.goTo(dir === 'left' ? currentSlide - 1 : currentSlide + 1, false)
  };

  useArrowKeyHandler(handleArrowPress);

  useEffect(() => {
    if (!highlightedText) { return }
    const highlightedElement = document.getElementById('highlighted-text');
    if (highlightedElement && highlightedContentRef.current) {
      highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedText]);

  useEffect(() => {
    if (viewModel.nextStepToReview) {
      setSelectedKey(viewModel.nextStepToReview.id)
    }
  }, [viewModel.nextStepToReview])

  useEffect(() => {
    if (selectedKey) {
      const foundStep = recipe.steps?.find(s => s.subSteps?.find(ss => ss.id === selectedKey))
      if (foundStep) {
        setHighlightedText(foundStep.text)
        // Ensure the parent step is always expanded
        setExpandedKeys(prevKeys => {
          if (!prevKeys.includes(foundStep.id)) {
            return [...prevKeys, foundStep.id];
          }
          return prevKeys;
        });
      }
    }
  }, [selectedKey, recipe.steps])

  function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function highlightTextRegExp(text: string): string {
    if (!text) { return '' }
    const regex = new RegExp(escapeRegExp(highlightedText), 'gmi');
    return text.replace(regex, (match) => `<span id="highlighted-text" class="${styles.highLight}">${match}</span>`);
  };

  const iconForTreeNode = (step: Step) => {
    if (step.reviewStatus.mediaApproved) {
      return <span>✅</span>
    }
    if (selectedKey === step.id) {
      return <span>👀</span>
    }
    return ''
  }

  const treeData = (): TreeDataNode[] => {
    if (recipe.steps && recipe.steps.length > 0) {
      return recipe.steps.map((step: Step) => ({
        title: step.text,
        key: step.id,
        children: step.subSteps && step.subSteps.length > 0 ? step.subSteps.map((subStep) => ({
          title: subStep.text,
          key: subStep.id,
          icon: iconForTreeNode(subStep),
        })) : []
      }))
    }
    return [];
  }

  const onChange = (current: number) => {
    setCurrentSlide(current)
  };

  const approveMedia = () => {
    const step = viewModel.getStepById(selectedKey)
    if (!step) return
    viewModel.approveMedia(selectedKey, step.suggestedMedias[currentSlide].id)
    if (carouselRef.current) {
      carouselRef.current.goTo(0, true)
      setCurrentSlide(0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.title}>Simplified</div>
        <div className={styles.textareaContainer}>
          <div
            className={styles.highlightedContent}
            ref={highlightedContentRef}
            // DOMPurify sanitaze the string and prevent XSS attacks
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((highlightTextRegExp(recipe.simplifiedData || ''))) }}
          />
        </div>
      </div>
      <div className={styles.column}>
        <div className={styles.title}>Recipe</div>
        <div style={{ color: 'black', fontSize: '1.5em' }}>Last updated: {recipe.updatedAt}</div>
        <div className='flex flex-col gap-small'>
          <div className={styles.inputTitle}>Name</div>
          <div>{recipe.name}</div>
          <div className={styles.inputTitle}>Description</div>
          <div>{recipe.description}</div>
          <div className={styles.inputTitle}>Steps</div>
          <Tree
            blockNode
            defaultExpandAll
            defaultExpandParent
            draggable
            showLine
            showIcon
            expandedKeys={expandedKeys}
            onExpand={(keys) => {
              setExpandedKeys(keys)
            }}
            selectedKeys={selectedKey ? [selectedKey] : []}
            onSelect={(selectedKeys) => {
              setSelectedKey(selectedKeys[0].toString())
            }}
            treeData={treeData()}
          />
        </div>
      </div>
      <div className={styles.column}>
        <h2 className='text-align-center'>
          {viewModel.getStepById(selectedKey)?.text}
        </h2>
        <Carousel
          arrows
          afterChange={onChange}
          dots={{ className: styles.carouselDots }}
          infinite={false}
          ref={carouselRef}>
          {viewModel.getStepById(selectedKey)?.suggestedMedias.map((media) => (
            <Image
              preview={false}
              src={media.image} />
          ))}
        </Carousel>
        <div className='flex gap-small mt8'>
          <Button className='flex-one btn btn-blue' onClick={approveMedia}>Use this</Button>
          <Button className='flex-one btn'>Delete</Button>
        </div>
      </div>
    </div>
  );
});

export default AdminRecipeMediasForm;
