import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Game, Question, Team } from '@prisma/client';
import commons from '../../lib/commons';
import { BackendError } from '../../lib/types';

async function createInitialGameState() {}

async function startGame(
  gameState: Game,
  res: NextApiResponse<BackendError | Game>
) {
  if (!gameState) {
    res
      .status(500)
      .json({ message: 'Cannot start a new game because no game exists' });
    return;
  }

  try {
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
      res.status(500).json({ message: 'Could not start game', ...startedGame });
    }
  } catch (err) {
    res.status(500).json({ message: `Cannot start game: ${err.message}` });
  }
}

async function stopGame(
  gameState: Game,
  res: NextApiResponse<BackendError | Game>
) {
  if (!gameState) {
    res
      .status(500)
      .json({ message: 'Cannot stop the game because no game exists' });
    return;
  }

  if (!gameState.inProgress) {
    res.status(500).json({
      message: 'Cannot stop the game because the game is not in progress',
    });
    return;
  }

  try {
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
      res.status(500).json({ message: 'Could not stop game', ...stoppedGame });
    }
  } catch (err) {
    res.status(500).json({ message: `Problem stopping game: ${err.message}` });
  }
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<BackendError | Game>
) {
  const { gameCommands } = commons;
  const gameState: Game = await prisma.game.findFirst();
  if (req.method === 'POST') {
    const { command } = req.body;

    switch (command) {
      case gameCommands.start:
        await startGame(gameState, res);
        break;
      case gameCommands.stop:
        await stopGame(gameState, res);
        break;

      default:
        res.status(500).json({ message: `Invalid command: ${command}` });
        break;
    }
  } else if (req.method === 'GET') {
    if (!gameState) {
      res
        .status(500)
        .json({ message: 'Cannot get game state. No game exists!' });
    } else {
      res.json(gameState);
    }
  }
}
