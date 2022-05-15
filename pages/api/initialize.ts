import prisma from '../../lib/prisma';
import { AnswerPrototype, Sample } from '../../lib/types';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { Question, QuestionType } from '@prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const results = [];
    try {
      const resetResults = [];

      const deleteTeams = await prisma.team.deleteMany({});
      resetResults.push(deleteTeams);

      const deleteAnswers = await prisma.answer.deleteMany({});
      resetResults.push(deleteAnswers);

      const deleteQuestions = await prisma.question.deleteMany({});
      resetResults.push(deleteQuestions);

      const deleteGame = await prisma.game.deleteMany({});
      resetResults.push(deleteGame);

      results.push(resetResults);
    } catch (err) {
      res.status(500).send({ message: `Cannot reset data: ${err.message}` });
      return;
    }

    const sample: Sample = req.body;
    const { teams, questions, game }: Sample = sample;

    // CREATE TEAMS
    try {
      const teamsResult = await prisma.team.createMany({
        data: teams.map((team) => ({ ...team })),
      });
      results.push(teamsResult);
    } catch (err) {
      res.status(500).json({ message: `Cannot create teams: ${err.message}` });
      return;
    }

    // CREATE QUESTIONS
    try {
      for await (const question of questions) {
        const createdQuestion: Question = await prisma.question.create({
          data: {
            content: question.question,
            type: question.type,
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

        results.push(createdQuestion);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: `Cannot create question: ${err.message}` });
      return;
    }

    // CREATE GAME
    try {
      const firstQuestion = await prisma.question.findFirst();
      game.questionId = firstQuestion.id;
      const createGameResult = await prisma.game.create({ data: game });
      results.push(createGameResult);
    } catch (err) {
      res.status(500).json({ message: `Cannot create game: ${err.message}` });
      return;
    }

    res.json(results);
  }
}
