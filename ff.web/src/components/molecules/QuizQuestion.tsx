// @ts-nocheck
import { useState } from 'react';
import { Answer, QuizQuestionData, UserAnswer } from '@vuo/models/QuizTypes';

import Input from '../atoms/Input';
import styles from '../organisms/Quiz.module.scss';

export interface QuizQuestionProps {
  question: QuizQuestionData;
  onAnswer: (answer: UserAnswer) => void;
}

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [answer, setAnswer] = useState<Answer>('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleAnswer = (value: Answer) => {
    setAnswer(value);
    onAnswer({ questionId: question.id, answer: value });
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'slider':
        return (
          <div className={styles.sliderContainer}>
            <input
              type="range"
              className={styles.sliderInput}
              min={question.min || 0}
              max={question.max || 30}
              value={answer as number}
              onChange={(e) => handleAnswer(Number(e.target.value))}
              aria-label={`Slider for ${question.question}`}
            />
            <div className={styles.sliderLabels}>
              <span>{question.min || 0}</span>
              <span>{question.max || 30}</span>
            </div>
            <div className={styles.sliderValue} aria-live="polite">{answer}</div>
          </div>
        );
      case 'single-choice':
        return (
        <div className={styles.optionsContainer} role="radiogroup" aria-labelledby={`question-${question.id}`}>
            {question.options?.map((option) => (
              <button
                type="button"
                key={option.toString()}
                className={`${styles.optionButton} ${answer === option ? styles.selected : ''}`}
                onClick={() => handleAnswer(option)}
                aria-checked={answer === option}
                role="radio"
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'multiple-choice':
        return (
          <div className={styles.optionsContainer} role="group" aria-labelledby={`question-${question.id}`}>
            {question.options?.map((option) => {
              const isSelected = Array.isArray(answer) && (answer as string[]).includes(option);
              return (
                <button
                  type="button"
                  key={option.toString()}
                  className={`${styles.optionButton} ${isSelected ? styles.selected : ''}`}
                  onClick={() => {
                    const newAnswer = Array.isArray(answer) ? answer : [];
                    const updatedAnswer = isSelected
                      ? newAnswer.filter((item) => item !== option)
                      : [...newAnswer, option];
                    handleAnswer(updatedAnswer as Answer);
                  }}
                  aria-checked={isSelected}
                  role="checkbox"
                >
                  {option}
                </button>
              );
            })}
          </div>
        );
      default:
        return (
          <Input 
            className={styles.textInput}
            onChange={(e) => {
              handleAnswer(e.target.value.toLowerCase().trim());
              setInputValue(e.target.value);
            }}
            value={inputValue} 
            placeholder="Enter your answer"
            aria-labelledby={`question-${question.id}`}
          />
        );
    }
  };

  return (
    <div className={styles.quizQuestion}>
      <h3> id={`question-${question.id}`} {'>'} {question.question}</h3>
      {renderQuestionInput()}
    </div>
  );
}
