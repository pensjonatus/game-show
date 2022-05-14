import commons from './commons';

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
