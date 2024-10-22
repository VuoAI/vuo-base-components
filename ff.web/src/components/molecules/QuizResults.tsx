import { QuizData, UserAnswer } from '@vuo/models/QuizTypes';
import styles from '../organisms/Quiz.module.scss';

interface QuizResultProps {
  quizData: QuizData;
  userAnswers: UserAnswer[];
}

export default function QuizResult({ quizData, userAnswers }: QuizResultProps) {
  const calculateScore = () => {
    let score = 0;
    quizData.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index]?.answer;
      const {correctAnswer} = question;

      if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
        if (userAnswer.length === correctAnswer.length &&
            userAnswer.every((item) => (correctAnswer as (string | number)[]).includes(item))) {
          score += 1;
        }
      } else if (userAnswer === correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = quizData.questions.length;
  return (
    <div className={styles.quizResult}>
      <h2>Quiz Results</h2>
      <p>You scored {score} out of {totalQuestions}</p>
      <p>Percentage: {((score / totalQuestions) * 100).toFixed(2)}%</p>
    </div>
  );
}
