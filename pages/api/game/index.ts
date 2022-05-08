import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Game, Question, Team } from '@prisma/client';
import commons from '../../../lib/commons';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameCommands } = commons;
  const gameState: Game = await prisma.game.findFirst();
  if (req.method === 'POST') {
    const { command } = req.body;

    if (command === gameCommands.start) {
      const firstQuestion: Question = await prisma.question.findFirst();
      const startedGame = await prisma.game.update({
        where: {
          id: gameState.id,
        },
        data: {
          inProgress: true,
          questionId: firstQuestion.id,
        },
      });

      if (startedGame.inProgress === true) {
        res.status(200).json(startedGame);
      } else {
        res.status(500).json({ error: 'Could not start game', ...startedGame });
      }
    } else if (command === gameCommands.stop) {
      const teams: Team[] = await prisma.team.findMany();
      teams.forEach(async (team) => {
        await prisma.team.update({
          where: {
            id: team.id,
          },
          data: {
            score: 0,
          },
        });
      });
      const stoppedGame = await prisma.game.update({
        where: {
          id: gameState.id,
        },
        data: {
          inProgress: false,
          currentQuestion: undefined,
        },
      });

      if (stoppedGame.inProgress === false) {
        res.status(200).json(stoppedGame);
      } else {
        res.status(500).json({ error: 'Could not stop game', ...stoppedGame });
      }
    } else {
      res.status(500).json({ error: `Invalid command: ${command}` });
    }
  } else if (req.method === 'GET') {
    res.json(gameState);
  }
}
