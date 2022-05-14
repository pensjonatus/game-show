import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const teams = await prisma.team.findMany();
      teams.sort((a, b) => (a.name > b.name ? 1 : -1));
      if (!teams) {
        res.status(500).json({ message: `No teams in the database` });
      } else {
        res.json(teams);
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: `Getting teams is not working: ${err.message}` });
    }
  }
}
