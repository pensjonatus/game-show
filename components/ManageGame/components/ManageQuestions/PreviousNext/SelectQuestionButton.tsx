import clsx from 'clsx';
import { useState } from 'react';
import { postToEndpoint } from '../../../../../lib/apiHelpers';
import commons from '../../../../../lib/commons';
import GameError from '../../../../GameError/GameError';

export default function SelectQuestionButton({ question, children }) {
  const [error, setError] = useState(undefined);

  async function switchGameToQuestion() {
    if (question) {
      const result = await postToEndpoint('/api/game', {
        command: commons.gameCommands.setQuestion,
        questionId: question.id,
      });

      if (!result.ok) {
        const err = await result.json();
        setError(err);
      }
    }
  }

  return (
    <>
      <button
        className={clsx((!question) && 'disabledButton')}
        onClick={switchGameToQuestion}
      >
        {children}
      </button>
      {error && (
        <GameError title="Cannot change question" errorDetails={error} />
      )}
    </>
  );
}
