import { Round } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import commons from '../../../../lib/commons';
import { useGame } from '../../../../lib/gameHooks';
import { postToEndpoint } from '../../../../lib/helpers';
import GameError from '../../../GameError/GameError';
import styles from './ManageFinaleRound.module.css';

export default function ManageFinaleRound() {
  const [processing, setProcessing] = useState(false);
  const [roundError, setRoundError] = useState(undefined);
  const { game, isError, isLoading } = useGame();

  if (isError) {
    return (
      <GameError
        title="Cannot get game to track rounds"
        errorDetails={isError}
      />
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  async function setRound(round: Round) {
    if (!processing) {
      setProcessing(true);
      const response = await postToEndpoint('/api/game', {
        command: commons.gameCommands.setFinaleRound,
        value: round,
      });

      if (!response.ok) {
        const err = await response.json();
        setRoundError(err);
      }

      setProcessing(false);
    }
  }

  return (
    <fieldset className={clsx(processing && styles.disabled)}>
      <label>
        <input
          type="radio"
          onChange={() => setRound(Round.ROUND_ONE)}
          checked={game.finaleRound === Round.ROUND_ONE}
        />
        <span>Round 1</span>
      </label>
      <label>
        <input
          type="radio"
          onChange={() => setRound(Round.ROUND_TWO)}
          checked={game.finaleRound === Round.ROUND_TWO}
        />
        <span>Round 1</span>
      </label>
      {roundError && (
        <GameError title="Cannot change round" errorDetails={roundError} />
      )}
    </fieldset>
  );
}
