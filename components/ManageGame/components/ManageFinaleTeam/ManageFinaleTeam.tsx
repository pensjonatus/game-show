import clsx from 'clsx';
import { useState } from 'react';
import commons from '../../../../lib/commons';
import { useGame, useTeams } from '../../../../lib/gameHooks';
import { postToEndpoint } from '../../../../lib/helpers';
import GameError from '../../../GameError/GameError';
import styles from './ManageFinaleTeam.module.css';

export default function ManageFinaleTeam() {
  const [processing, setProcessing] = useState(false);
  const [managerError, setManagerError] = useState(undefined);
  const { teams, isError, isLoading } = useTeams();
  const { game, isError: gameError, isLoading: gameLoading } = useGame();

  if (isError) {
    return <GameError title="Cannot read teams" errorDetails={isError} />;
  }

  if (gameError) {
    return <GameError title="Cannot read game" errorDetails={gameError} />;
  }

  if (isLoading || gameLoading) {
    return <div>Loading...</div>;
  }

  async function updateFinaleTeam(teamId: string) {
    if (!processing) {
      setProcessing(true);
      const response = await postToEndpoint('/api/game', {
        command: commons.gameCommands.setFinaleTeam,
        value: teamId,
      });

      if (!response.ok) {
        const err = await response.json();
        setManagerError(err);
      }
      setProcessing(false);
    }
  }

  return (
    <>
      <fieldset
        className={clsx(
          styles.wrapper,
          !game.finaleTeamId && styles.waitingForTeam,
          processing && styles.processing
        )}
      >
        {teams.map((team) => (
          <label className={styles.radioButton} key={team.id}>
            <input
              type="radio"
              checked={game.finaleTeamId === team.id}
              onChange={() => updateFinaleTeam(team.id)}
            />
            {team.name}
          </label>
        ))}
      </fieldset>
      {managerError && (
        <GameError title="Error setting team" errorDetails={managerError} />
      )}
    </>
  );
}
