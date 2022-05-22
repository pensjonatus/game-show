import clsx from 'clsx';
import { useState } from 'react';
import commons from '../../../../lib/commons';
import { postToEndpoint } from '../../../../lib/helpers';
import GameError from '../../../GameError/GameError';

export default function ResetFinaleButton() {
  const [processing, setProcessing] = useState(false);
  const [resetError, setResetError] = useState(undefined);
  const [resetResult, setResetResult] = useState(undefined);

  async function resetFinale() {
    if (!processing) {
      setProcessing(true);
      const result = await postToEndpoint('/api/game', {
        command: commons.gameCommands.resetFinale,
      });

      if (!result.ok) {
        const err = await result.json();
        setResetError(err);
      } else {
        const success = await result.json();
        setResetResult(success);
      }

      setProcessing(false);
    }
  }

  return (
    <>
      <button
        onClick={resetFinale}
        className={clsx(processing && 'disabledButton')}
      >
        Reset finale
      </button>
      {resetError && (
        <GameError title="Cannot reset finale" errorDetails={resetError} />
      )}
      {resetResult && (
        <code>
          <pre>{JSON.stringify(resetResult)}</pre>
        </code>
      )}
    </>
  );
}
