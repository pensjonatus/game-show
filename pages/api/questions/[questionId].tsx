import { Answer, Question } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { QuestionWithAnswers } from '../../../lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const questionId: string = req.query.questionId as string;
    const question: Question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });
    const answers: Answer[] = await prisma.answer.findMany({
      where: {
        questionId: questionId,
      },
    });
    const questionWithAnswers: QuestionWithAnswers = {
      ...question,
      answers: answers,
    };

    res.json(questionWithAnswers);
  } catch (err) {
    res.status(500).json({
      message: `Cannot get question
        ID: ${req.query.questionId}
        URL: ${req.url}
        ERROR: ${err.message}`,
    });
  }
}
