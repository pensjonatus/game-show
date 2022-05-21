import prisma from '../../lib/prisma';
import { QuestionWithAnswers } from '../../lib/types';
import { Answer, Question, QuestionType } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const questions: Question[] = await prisma.question.findMany();
      const answers: Answer[] = await prisma.answer.findMany();
      const finale = [];
      const questionsAndAnswers: QuestionWithAnswers[] = questions.map(
        (question: Question) => {
          const matchingAnswers: Answer[] = answers.filter(
            (answer: Answer) => answer.questionId === question.id
          );

          if (question.type === QuestionType.FINALE) {
            finale.push({ answers: matchingAnswers, ...question });
          } else {
            return { answers: matchingAnswers, ...question };
          }
        }
      ).filter(Boolean);
      res.json({ questionsAndAnswers, finale });
    } catch (err) {
      res
        .status(500)
        .json({ message: `Error getting questions: ${err.message}` });
    }
  }
}
