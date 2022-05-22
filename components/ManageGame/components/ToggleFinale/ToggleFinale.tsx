import { Game } from '@prisma/client';
import { useState } from 'react';
import commons from '../../../../lib/commons';
import { useGame } from '../../../../lib/gameHooks';
import { postToEndpoint } from '../../../../lib/helpers';
import GameError from '../../../GameError/GameError';

export default function ToggleFinale() {
  const [buttonError, setButtonError] = useState(undefined);
  const { game, isError, isLoading } = useGame();

  if (isError) {
    return <GameError title="Is it a finale or not?" errorDetails={isError} />;
  }

  if (isLoading) {
    return <span className="button disabledButon">Loading...</span>;
  }

  async function handleToggleFinale() {
    const result = await postToEndpoint('/api/game', {
      command: commons.gameCommands.toggleFinale,
    });

    if (!result.ok) {
      const json = await result.json();
      setButtonError(json);
    }
  }

  return (
    <>
      <button className="button bigButton" onClick={handleToggleFinale}>
        {game.inFinale ? 'Back to questions' : 'Play finale'}
      </button>
      {buttonError && (
        <GameError
          title="Problem switching to finale"
          errorDetails={buttonError}
        />
      )}
    </>
  );
}
