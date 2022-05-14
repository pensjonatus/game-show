import { Team } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import commons from '../../../lib/commons';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const teamId: string = req.query.teamId as string;
  const team: Team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });

  if (req.method === 'POST') {
    try {
      const { command, amount } = req.body;

      switch (command) {
        case commons.teamCommands.addPoints:
          const update = await prisma.team.update({
            where: {
              id: teamId,
            },
            data: {
              score: team.score + amount,
            },
          });
          res.json(update);
          break;

        default:
          res.status(500).json({
            message: `Update team invalid request: ${JSON.stringify(req.body)}`,
          });
          break;
      }
    } catch (err) {
      res.status(500).json({ error: `Cannot update team: ${err.message}` });
    }
  } else if (req.method === 'GET') {
    try {
      res.json(team);
    } catch (err) {
      res.status(500).json({
        message: `Cannot get team
        ID: ${req.query.questionId}
        URL: ${req.url}
        ERROR: ${err.message}`,
      });
    }
  }
}
