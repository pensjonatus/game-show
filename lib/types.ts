export type Answer = {
  answer: string;
  points: number;
};

export type QuestionPrototype = {
  question: string;
  answers: Answer[];
};

export type QuestionSetPrototype = {
  setName: string;
  questions: QuestionPrototype[];
};

export type Team = {
  name: string;
  avatarUrl: string;
};
