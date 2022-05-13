import { Answer, Question } from '@prisma/client';

export type AnswerPrototype = {
  answer: string;
  points: number;
};

export type QuestionPrototype = {
  question: string;
  answers: AnswerPrototype[];
};

export type Team = {
  name: string;
  avatarUrl: string;
};

export type QuestionWithAnswers = Question & {
  answers: Answer[];
};

export type BackendError = {
  message: string;
};
