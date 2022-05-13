import prisma from '../../lib/prisma';
import {
  AnswerPrototype,
  QuestionPrototype,
  QuestionWithAnswers,
} from '../../lib/types';
import { Answer, Prisma, QuestionType, Question } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const questions: Question[] = await prisma.question.findMany();
      const answers: Answer[] = await prisma.answer.findMany();
      const questionsAndAnswers: QuestionWithAnswers[] = questions.map(
        (question: Question) => {
          const matchingAnswers: Answer[] = answers.filter(
            (answer: Answer) => answer.questionId === question.id
          );
          return { answers: matchingAnswers, ...question };
        }
      );
      res.json(questionsAndAnswers);
    } catch (err) {
      res
        .status(500)
        .json({ message: `Error getting questions: ${err.message}` });
    }
  }
}
