import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    
  }

  if (req.method === 'GET') {
    const teams = await prisma.team.findMany();
    if (!teams) {
      res.status(500).json({ message: `No teams in the database` });
    } else {
      res.json(teams);
    }
  }
}
