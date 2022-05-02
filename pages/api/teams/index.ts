import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const result = await prisma.team.createMany({
    data: req.body.map((team) => ({ ...team })),
  });
  res.json(result);
}
