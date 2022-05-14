import { Team } from '@prisma/client';
import clsx from 'clsx';
import { isResSent } from 'next/dist/shared/lib/utils';
import { useState } from 'react';
import { postToEndpoint } from '../../../../../lib/apiHelpers';
import commons from '../../../../../lib/commons';
import { useTeams } from '../../../../../lib/gameHooks';
import GameError from '../../../../GameError/GameError';
import LostChances from '../../../../LostChances/LostChances';
import styles from './ManageChancesLost.module.css';

export default function ManageChancesLost() {
  const [processing, setProcessing] = useState(false);
  const { teams, isError, isLoading } = useTeams();

  if (isError) {
    return (
      <GameError
        title="Something wrong with teams 🐱‍👤"
        errorDetails={isError}
      />
    );
  }

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <span>Loading</span>
        <span>Loading</span>
      </div>
    );
  }

  async function changeNumberOfChances(team: Team, amount: number) {
    if (!processing) {
      const result = await postToEndpoint(`/api/teams/${team.id}`, {
        command: commons.teamCommands.setChancesLost,
        value: team.chancesLost + amount,
      });

      if (!result.ok) {
        const json = await result.json();
        throw new Error(
          `Problem changing the number of chances (${amount}) ${JSON.stringify(
            json
          )}`
        );
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        {teams.map((team: Team) => (
          <button
            key={team.id}
            className={clsx(
              'redButton',
              'flippedButton',
              processing && 'disabledButton'
            )}
            onClick={() => changeNumberOfChances(team, 1)}
          >
            {team.name} answered wrong!
          </button>
        ))}
      </div>
      <div className={styles.row}>
        {teams.map((team: Team) => (
          <span className={styles.lostChances}>
            <LostChances howMany={team.chancesLost} playSound={false} />
            {team.chancesLost > 0 && (
              <span
                role="button"
                className={clsx(
                  styles.restoreOne,
                  processing && styles.disabled
                )}
                onClick={() => changeNumberOfChances(team, -1)}
              >
                ✖
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
