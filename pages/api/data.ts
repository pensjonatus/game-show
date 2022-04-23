// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import questionBase from '../../lib/questions.json';
import gameStateInit from '../../lib/gameState.json';

type Question = {
  id: string;
  question: string;
  answers: Array<string>;
};

type Contestant = {
  id: string;
  name: string;
  score: Number;
};

type GameState = {
  gameId: string;
  currentQuestionId: string;
  contestants: Array<Contestant>;
};

type GameData = {
  questions: Array<Question>;
  gameState: GameState;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameData>
) {
  res.status(200).json({ questions: questionBase.questions, gameState: gameStateInit });
}
