import prisma from '../../lib/prisma';
import { QuestionWithAnswers } from '../../lib/types';
import { Answer, Question } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const questions: Question[] = await prisma.question.findMany();
      const answers: Answer[] = await prisma.answer.findMany();
      answers.sort((a: Answer, b: Answer) => (a.points > b.points ? -1 : 1));
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
