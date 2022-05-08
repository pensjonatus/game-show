import { useGame } from '../../../../lib/gameHooks';
import { Game } from '@prisma/client';
import { useState } from 'react';
import commons from '../../../../lib/commons';
import styles from './StartStop.module.css';
import clsx from 'clsx';

export default function StartStop() {
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [errorTogglingGame, setErrorTogglingGame] = useState(undefined);
  const gameProps = useGame();
  const game: Game = gameProps.game;
  const { isError, isLoading } = gameProps;

  if (isError) {
    return <div>Error getting current game! 😒</div>;
  }

  if (isLoading) {
    return <div>Loading current game</div>;
  }

  async function postToGameState(command) {
    console.log('Attempting to send command', command);
    const result = await fetch('/api/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command: command,
      }),
    });

    if (result.ok) {
      const json = await result.json();
      console.log(json);

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
