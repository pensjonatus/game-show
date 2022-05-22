import { useGame } from '../../../../lib/gameHooks';
import { Game } from '@prisma/client';
import { useState } from 'react';
import commons from '../../../../lib/commons';
import styles from './StartStop.module.css';
import clsx from 'clsx';
import GameError from '../../../GameError/GameError';
import { postToEndpoint } from '../../../../lib/helpers';

export default function StartStop() {
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [errorTogglingGame, setErrorTogglingGame] = useState(undefined);
  const { game, isError, isLoading } = useGame();

  if (isError) {
    return (
      <GameError
        title="Error setting up the start/stop buttons! 😒"
        errorDetails={isError}
      />
    );
  }

  if (isLoading) {
    return <div>Loading current game</div>;
  }

  async function postToGameState(command) {
    const result = await postToEndpoint('/api/game', {
      command: command,
    });

    if (result.ok) {
      const json = await result.json();

      return json;
    } else {
      return { error: 'Cannot update game state' };
    }
  }

  async function toggleGame() {
    if (!startButtonDisabled) {
      setStartButtonDisabled(true);
      const result = game.inProgress
        ? await postToGameState(commons.gameCommands.stop)
        : await postToGameState(commons.gameCommands.start);

      if (!result.error) {
        setStartButtonDisabled(false);
      } else {
        setErrorTogglingGame(result.error);
      }
    }
  }

  return (
    <>
      <h2 className={styles.header}>
        {game.inProgress ? 'Game on!' : 'No game running'}
        <button
          onClick={toggleGame}
          className={clsx(startButtonDisabled && 'disabledButton')}
        >
          {game.inProgress ? 'Stop game' : 'Start game'}
        </button>
      </h2>
      {errorTogglingGame && <div>{errorTogglingGame}</div>}
    </>
  );
}
