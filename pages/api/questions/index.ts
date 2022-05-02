import prisma from '../../../lib/prisma';
import { QuestionSetPrototype, Answer } from '../../../lib/types';
import { QuestionSet, QuestionType, Question } from '@prisma/client';

export default async function handle(req, res) {
  try {
    const questionSet: QuestionSetPrototype = req.body;
    const createQuestionSet: QuestionSet = await prisma.questionSet.create({
      data: {
        name: questionSet.setName,
      },
    });
    const questionSetId = createQuestionSet.id;
    for await (const question of questionSet.questions) {
      const createdQuestion: Question = await prisma.question.create({
        data: {
          content: question.question,
          questionSetId: questionSetId,
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
        throw new Error('Did not create the question');
      }
    }
    res.json({ result: 'OK' });
  } catch (err) {
    res.json({ error: err });
  }
}
