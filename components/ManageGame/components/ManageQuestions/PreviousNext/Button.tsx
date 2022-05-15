import clsx from 'clsx';
import { useState } from 'react';
import { postToEndpoint } from '../../../../../lib/apiHelpers';
import commons from '../../../../../lib/commons';
import GameError from '../../../../GameError/GameError';

export default function Button({ switchTo, children }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(undefined);

  async function switchGameToQuestion() {
    if (!processing && switchTo) {
      setProcessing(true);
      const result = await postToEndpoint('/api/game', {
        command: commons.gameCommands.setQuestion,
        questionId: switchTo.id,
      });

      if (!result.ok) {
        const err = await result.json();
        setError(err);
      }
      setProcessing(false);
    }
  }

  return (
    <>
      <button
        className={clsx((!switchTo || processing) && 'disabledButton')}
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
