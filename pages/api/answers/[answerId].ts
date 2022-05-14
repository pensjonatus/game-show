import { Answer } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import commons from '../../../lib/commons';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const answerId: string = req.query.answerId as string;
    const answer: Answer = await prisma.answer.findUnique({
      where: {
        id: answerId,
      },
    });

    if (req.method === 'GET') {
      res.json(answer);
    } else if (req.method === 'POST') {
      const command = req.body.command;

      switch (command) {
        case commons.answerCommands.toggleIsRevealed:
          const toggleRevealed = await prisma.answer.update({
            where: {
              id: answerId,
            },
            data: {
              isRevealed: !answer.isRevealed,
            },
          });
          res.json(toggleRevealed);
          break;

        case commons.answerCommands.setPointsAlreadyGiven:
          const value = req.body.value;
          const valueSet = await prisma.answer.update({
            where: {
              id: answerId,
            },
            data: {
              pointsAlreadyGiven: value,
            },
          });
          res.json(valueSet);
          break;

        default:
          break;
      }
    }
  } catch (err) {
    res.status(500).json({
      message: `Cannot get/update answer
        ID: ${req.query.answerId}
        URL: ${req.url}
        COMMAND: ${req.body?.command}
        ERROR: ${err.message}`,
    });
  }
}
