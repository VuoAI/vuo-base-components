export interface QuizQuestionData {
  id: string;
  type: string;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  correctAnswer: Answer;
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestionData[];
}

export type Answer = string | number | string[] | number[];

export interface UserAnswer {
  questionId: string;
  answer: Answer;
}
