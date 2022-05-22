import { Answer, Question } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import commons from '../../../lib/commons';
import prisma from '../../../lib/prisma';
import { QuestionWithAnswers } from '../../../lib/types';

async function setPlayerAnswer(
  questionId: string,
  value: string,
  res: NextApiResponse
) {
  const update = await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      playerAnswer: value,
    },
  });

  if (update.playerAnswer === value) {
    res.json(update);
  } else {
    res.status(500).json({
      message: `Did not update player answer. Expected: "${value}". Set to: ${update.playerAnswer}`,
    });
  }
}

async function setScoreAwarded(
  questionId: string,
  value: number,
  res: NextApiResponse
) {
  try {
    const result = await prisma.question.update({
      where: {
        id: questionId,
      },
      data: {
        scoreAwarded: value,
      },
    });

    if (result.scoreAwarded !== value) {
      res.status(500).json({
        message: `Could not set scoreAwarded. Expected: ${value}. Actual: ${result.scoreAwarded}`,
      });
    } else {
      res.json(result);
    }
  } catch (err) {
    res.status(500).json({
      message: `Could not update value for scoreAwarded ${err.message}`,
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const questionId: string = req.query.questionId as string;

  if (req.method === 'POST') {
    try {
      const { command, value } = req.body;

      switch (command) {
        case commons.questionCommands.setPlayerAnswer:
          await setPlayerAnswer(questionId, value, res);
          break;
        case commons.questionCommands.setScoreAwarded:
          await setScoreAwarded(questionId, value, res);
          break;

        default:
          break;
      }
    } catch (err) {
      res.status(500).json({
        message: `Error when updating question: ${err.message}`,
      });
    }
  }

  if (req.method === 'GET') {
    try {
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
}
