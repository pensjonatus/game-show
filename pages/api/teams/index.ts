import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { BackendError } from '../../../lib/types';
import { Team } from '@prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const result = await prisma.team.createMany({
      data: req.body.map((team) => ({ ...team })),
    });
    res.json(result);
  }

  if (req.method === 'GET') {
    const teams = await prisma.team.findMany();
    if (!teams) {
      res.status(500).json({ message: `No teams in the database` });
    }
    res.json(teams);
  }
}
