import { QuestionType } from '@prisma/client';
import commons from './commons';
import { QuestionWithAnswers } from './types';

export async function postToEndpoint(endpoint: string, data: any) {
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function setPointsAlreadyGiven(answerId: string) {
  return postToEndpoint(`/api/answers/${answerId}`, {
    command: commons.answerCommands.setPointsAlreadyGiven,
    value: true,
  });
}

export function calculatePoints(questionType: string, points: number) {
  switch (questionType) {
    case QuestionType.SINGLE:
      return points;
    case QuestionType.DOUBLE:
      return points * 2;
    case QuestionType.TRIPLE:
      return points * 3;
    case QuestionType.TRUE_FALSE:
      return points * 3;
    case QuestionType.FINALE:
      return points;

    default:
      return points;
  }
}

export function getShifted(
  currentItem: QuestionWithAnswers,
  items: QuestionWithAnswers[],
  shiftBy: number
): QuestionWithAnswers | undefined {
  const currentIndex = items.indexOf(currentItem);
  const shiftedIndex = currentIndex + shiftBy;

  if (shiftedIndex < 0 || shiftedIndex > items.length - 1) {
    return undefined;
  }

  return items[shiftedIndex];
}
