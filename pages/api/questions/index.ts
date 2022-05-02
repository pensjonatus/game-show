import prisma from '../../../lib/prisma';
import { Answer, QuestionPrototype } from '../../../lib/types';
import { Prisma, QuestionType, Question } from '@prisma/client';

export default async function handle(req, res) {
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
              data: question.answers.map((answer: Answer) => ({
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
