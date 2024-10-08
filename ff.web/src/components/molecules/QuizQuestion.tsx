import React, { useState } from 'react';
import Input from '../atoms/Input';
import Slider from '../atoms/Slider';
import styles from '../organisms/Quiz.module.scss';

interface QuizQuestionProps {
  question: {
    id: string;
    type: string;
    question: string;
    options?: string[];
  };
  onAnswer: (answer: any) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState<string | number>('');

  const handleAnswer = (value: string | number) => {
    setAnswer(value);
    onAnswer({ questionId: question.id, answer: value });
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'slider':
        return (
          <Slider
            className={styles.sliderInput}
            min={0}
            max={30}
            onChange={(value) => handleAnswer(value)}
            value={answer as number}
          />
        );
      case 'single-choice':
      case 'multiple-choice':
        return (
          <div className={styles.optionsContainer}>
            {question.options?.map((option, index) => (
              <button
                key={index}
                className={`${styles.optionButton} ${answer === option ? styles.selected : ''}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        );
      default:
        return (
          <Input 
            className={styles.textInput}
            onChange={(e) => handleAnswer(e.target.value)} 
            value={answer as string} 
            placeholder="Enter your answer"
          />
        );
    }
  };

  return (
    <div className={styles.quizQuestion}>
      <h3 className={styles.questionText}>{question.question}</h3>
      {renderQuestionInput()}
    </div>
  );
};