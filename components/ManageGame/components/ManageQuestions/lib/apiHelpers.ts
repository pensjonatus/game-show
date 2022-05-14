import commons from '../../../../../lib/commons';

export async function setPointsAlreadyGiven(answerId: string) {
  const result = await fetch(`/api/answers/${answerId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      command: commons.answerCommands.setPointsAlreadyGiven,
      value: true,
    }),
  });

  return result;
}
