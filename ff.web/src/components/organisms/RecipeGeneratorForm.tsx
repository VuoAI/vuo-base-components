import { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import TextareaAutosize from 'react-textarea-autosize';

import RecipeGeneratorViewModel from '@vuo/viewModels/RecipeGeneratorViewModel';
// import RecipeGeneratorPreview from '@vuo/organisms/RecipeGeneratorPreview';
import styles from "./RecipeGeneratorForm.module.scss"
import RecipeSteps from './RecipeSteps';

const RecipeGeneratorForm = observer(() => {
  const { id } = useParams()
  const navigate = useNavigate();
  const [viewModel] = useState<RecipeGeneratorViewModel>(() => new RecipeGeneratorViewModel(id))
  const [highlightedText, setHighlightedText] = useState("");
  const highlightedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!highlightedText) { return }
    const highlightedElement = document.getElementById('highlighted-text');
    if (highlightedElement && highlightedContentRef.current) {
      highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedText]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (field === 'name' || field === 'description' || field === 'rawData') {
      viewModel.setField(field, event.target.value)
    }
  };

  const { recipe, busyFields, nextStepToReview, currentRootItem } = viewModel;

  useEffect(() => {
    if (currentRootItem) {
      setHighlightedText(currentRootItem.text || '')
    }
  }, [currentRootItem])


  async function generateRecipeData() {
    viewModel.simplifyRecipe()
  }

  async function saveRecipeData() {
    const savedRecipe = await viewModel.saveRecipe()
    if (savedRecipe) {
      if (!id) {
        navigate(`/admin/recipe/${savedRecipe.id}`);
      }
    }
  }

  function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function highlightTextRegExp(text: string): string {
    if (!text) { return '' }
    const regex = new RegExp(escapeRegExp(highlightedText), 'gmi');
    return text.replace(regex, (match) => `<span id="highlighted-text" class="${styles.highLight}">${match}</span>`);
  };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    if (highlightedContentRef.current) {
      highlightedContentRef.current.scrollTop = event.currentTarget.scrollTop;
      highlightedContentRef.current.scrollLeft = event.currentTarget.scrollLeft;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.title}>Original</div>
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.textarea}
            placeholder="Type raw recipe here"
            value={recipe.rawData}
            onChange={(event) => viewModel.setField('rawData', event.target.value)}
          />
        </div>
        <button className={styles.button} type="button" onClick={generateRecipeData}>
          {busyFields.simplifying ? 'Busy...' : 'Simplify and process'}
        </button>
      </div>
      <div className={styles.column}>
        <div className={styles.title}>Simplified</div>
        <div className={styles.textareaContainer}>
          <textarea
            className={`${styles.textarea} ${styles.simplifiedTextArea}`}
            placeholder="Simplified version"
            value={recipe.simplifiedData}
            onChange={(event) => viewModel.setField('simplifiedData', event.target.value)}
            onScroll={handleScroll}
          />
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
        <button
          type="button"
          className={styles.button}
          onClick={() => saveRecipeData()}
        >
          {busyFields.save ? "Busy..." : 'Save draft'}</button>
        <div style={{ color: 'black', fontSize: '1.5em' }}>Last updated: {recipe.updatedAt}</div>
        <div className='flex flex-col gap-small'>
          <div className={styles.inputTitle}>Name</div>
          <TextareaAutosize
            className={styles.descriptionInput}
            placeholder="Type recipe name here"
            value={recipe.name}
            onChange={handleChange('name')}
          />
          <div>
            <button
              className={styles.button}
              type="button"
              onClick={() => viewModel.extractName()}
              disabled={busyFields.name}
            >
              {busyFields.name ? 'Busy...' : 'Extract'}
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={() => viewModel.generateRecipeName()}
              disabled={busyFields.name}
            >
              {busyFields.name ? 'Busy...' : 'Generate'}
            </button>
          </div>
          <div className={styles.inputTitle}>Description</div>
          <TextareaAutosize
            className={styles.descriptionInput}
            placeholder="Type description here"
            value={recipe.description}
            onChange={handleChange('description')}
          />
          <div>
            <button
              className={styles.button}
              type="button"
              onClick={() => viewModel.extractDescription()}
              disabled={busyFields.description}
            >
              {busyFields.description ? 'Busy...' : 'Extract'}
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={() => viewModel.generateDescription()}
              disabled={busyFields.description}
            >
              {busyFields.description ? 'Busy...' : 'Generate'}
            </button>
          </div>
          <div className={styles.inputTitle}>Steps</div>
          <button
            className={styles.button}
            type="button"
            onClick={() => viewModel.extractSteps(viewModel.recipe.simplifiedData || '')}
            disabled={busyFields.steps}
          >
            {busyFields.steps ? 'Busy...' : 'Extract'}
          </button>
          <RecipeSteps
            onUpdateStep={(stepId, field, value) => {
              viewModel.setFieldForStep(stepId, field, value)
            }}
            onAtomizeStep={(stepId) => {
              viewModel.atomizeStep(stepId)
            }}
            addSubStepToParentStep={(stepId) => {
              viewModel.addSubStepToParentStep(stepId)
            }}
            onRemoveStep={(stepId) => {
              viewModel.removeStep(stepId)
            }}
            onMoveStep={(stepId, newPosition) => {
              viewModel.moveStep(stepId, newPosition)
            }}
            onSelectStep={(stepId) => {
              const step = viewModel.findStepById(stepId)
              if (step) {
                setHighlightedText(step.text)
              }
            }}
            busyFields={busyFields}
            nextStepToReview={nextStepToReview}
            steps={viewModel.recipe.steps}
          />
        </div>
      </div>
      {/* <div className={styles.column}>
        <RecipeGeneratorPreview recipe={recipe} />
      </div> */}
    </div>
  );
});

export default RecipeGeneratorForm;
