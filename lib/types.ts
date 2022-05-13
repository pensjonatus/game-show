import { Answer, Game, Question, Team } from '@prisma/client';

export type AnswerPrototype = {
  answer: string;
  points: number;
};

export type QuestionPrototype = {
  question: string;
  answers: AnswerPrototype[];
};

export type QuestionWithAnswers = Question & {
  answers: Answer[];
};

export type BackendError = {
  message: string | null;
  response?: {
    data?: {
      message?: string;
    };
  };
};

export type Sample = {
  teams: Team[];
  questions: QuestionPrototype[];
  game: Game;
};
