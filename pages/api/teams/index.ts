import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

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
    res.json(teams);
  }
}
