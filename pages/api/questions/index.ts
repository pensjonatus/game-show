import prisma from '../../../lib/prisma';
import {
  AnswerPrototype,
  QuestionPrototype,
  QuestionWithAnswers,
} from '../../../lib/types';
import { Answer, Prisma, QuestionType, Question } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const questions: QuestionPrototype[] = req.body;
    const allResults = [];
    try {
      for await (const question of questions) {
        const createdQuestion: Question = await prisma.question.create({
          data: {
            content: question.question,
            type: QuestionType.SINGLE,
            answers: {
              createMany: {
                data: question.answers.map((answer: AnswerPrototype) => ({
                  content: answer.answer,
                  points: answer.points,
                })),
              },
            },
          },
        });

        if (!createdQuestion.id) {
          throw new Error(
            `Did not create the question, ${JSON.stringify(
              createdQuestion,
              null,
              2
            )}`
          );
        }

        allResults.push(createdQuestion);
      }
      res.json({ result: 'OK', created: allResults });
    } catch (err) {
      let code = 'unknown';
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        code = err.code;
      }
      res.json({
        message: 'Creating questions: operation threw an unexpected error',
        prismaCode: code,
        prismaMessage: err.message,
        error: err,
      });
    }
  }

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
