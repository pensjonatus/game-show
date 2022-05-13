import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { BackendError } from '../../../lib/types';
import { Answer } from '@prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<BackendError | Answer[]>
) {
  if (req.method === 'GET') {
    try {
      const answers = await prisma.answer.findMany();
      res.json(answers);
    } catch (err) {
      res.status(500).json({ message: `Cannot get answers: ${err.message}` });
    }
  }
}
