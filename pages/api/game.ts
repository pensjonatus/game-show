import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { Game, Question, QuestionType, Round } from '@prisma/client';
import commons from '../../lib/commons';
import { BackendError } from '../../lib/types';

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
    const firstQuestion: Question = await prisma.question.findFirst({
      where: {
        type: {
          not: QuestionType.FINALE
        }
      }
    });
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

//  reset game and stop it
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
    await prisma.team.updateMany({
      data: {
        score: 0,
        chancesLost: 0,
      },
    });

    await prisma.answer.updateMany({
      data: {
        isRevealed: false,
        pointsAlreadyGiven: false,
      },
    });

    await prisma.question.updateMany({
      data: {
        playerAnswerRoundOne: null,
        playerAnswerRoundTwo: null,
        scoreAwardedRoundOne: null,
        scoreAwardedRoundTwo: null,
      },
    });

    const stoppedGame = await prisma.game.update({
      where: {
        id: gameState.id,
      },
      data: {
        inProgress: false,
        inFinale: false,
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

async function setQuestion(
  gameId: string,
  questionId: string,
  res: NextApiResponse
) {
  try {
    const allResults = [];
    const result = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        questionId: questionId,
      },
    });
    if (result.questionId === questionId) {
      allResults.push(result);
    } else {
      res
        .status(500)
        .json({ error: `Could not switch to question ID: ${questionId}` });
    }

    const resetChances = await prisma.team.updateMany({
      data: {
        chancesLost: 0,
      },
    });
    allResults.push(resetChances);
    res.json(allResults);
  } catch (err) {
    res.status(500).json({
      error: `Fatal error while trying to switch question: ${err.message}`,
    });
  }
}

async function toggleFinale(gameState: Game, res: NextApiResponse) {
  try {
    const stateBefore = gameState.inFinale === true;
    const result = await prisma.game.update({
      where: {
        id: gameState.id,
      },
      data: {
        inFinale: !gameState.inFinale,
      },
    });

    if (result.inFinale !== stateBefore) {
      res.json(result);
    } else {
      res.status(500).json({
        error: `Finale state not changed. Before: ${stateBefore}; After: ${result}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `Something went wrong when toggling finale: ${err.message}`,
    });
  }
}

async function setFinaleTeam(
  gameState: Game,
  teamId: string,
  res: NextApiResponse
) {
  try {
    const result = await prisma.game.update({
      where: {
        id: gameState.id,
      },
      data: {
        finaleTeamId: teamId,
      },
    });

    if (result.finaleTeamId === teamId) {
      res.json(result);
    } else {
      res.status(500).json({
        error: `Did not set finale team to ${teamId}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `Something went wrong when setting team: ${err.message}`,
    });
  }
}

async function resetFinale(gameId: string, res: NextApiResponse) {
  try {
    const allResults = [];

    const resetQuestionsResult = await prisma.question.updateMany({
      data: {
        playerAnswerRoundOne: null,
        playerAnswerRoundTwo: null,
        scoreAwardedRoundOne: null,
        scoreAwardedRoundTwo: null,
      },
    });
    allResults.push(resetQuestionsResult);

    const resetResult = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        finaleTeamId: null,
      },
    });

    allResults.push(resetResult);

    res.json(allResults);
  } catch (err) {
    res.status(500).json({ message: `Cannot reset game: ${err.message}` });
  }
}

async function setFinaleRound(
  gameId: string,
  value: Round,
  res: NextApiResponse
) {
  try {
    const result = await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        finaleRound: value,
      },
    });

    if (result.finaleRound === value) {
      res.json(result);
    } else {
      res.status(500).json({
        message: `Finale round not updated for some reason. Expected: ${value}. Actual: ${result.finaleRound}`,
      });
    }
  } catch (err) {
    res.status(500).json({ message: `Cannot set round: ${err.message}` });
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
      case gameCommands.setQuestion:
        const questionId = req.body.questionId;
        await setQuestion(gameState.id, questionId, res);
        break;
      case gameCommands.toggleFinale:
        await toggleFinale(gameState, res);
        break;
      case gameCommands.setFinaleTeam:
        const teamId = req.body.value;
        await setFinaleTeam(gameState, teamId, res);
        break;
      case gameCommands.resetFinale:
        await resetFinale(gameState.id, res);
        break;
      case gameCommands.setFinaleRound:
        const { value } = req.body;
        await setFinaleRound(gameState.id, value, res);
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
