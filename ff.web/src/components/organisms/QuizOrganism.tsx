import { useState } from 'react';
import QuizResult from '@vuo/components/molecules/QuizResults';
import QuizQuestion from '@vuo/components/molecules/QuizQuestion';
import Button from "@vuo/components/atoms/Button";
import { UserAnswer } from '@vuo/models/QuizTypes';
import styles from './Quiz.module.scss';
import mockQuizData from '../../../public/static/mockQuizData';

export default function QuizOrganism() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (answer: UserAnswer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuizData.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (quizCompleted) {
    return <QuizResult quizData={mockQuizData} userAnswers={userAnswers} />;
  }

  const currentQuestion = mockQuizData.questions[currentQuestionIndex];

  return (
    <div className={styles.quizOrganism}>
      <h2 className={styles.quizTitle}>{mockQuizData.title}</h2>
      <div className={styles.quizQuestionContainer}>
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
      </div>
      <div className={styles.quizNavigation}>
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
        >
          {currentQuestionIndex === mockQuizData.questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
