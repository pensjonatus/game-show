import { Team } from '@prisma/client';
import clsx from 'clsx';
import { isResSent } from 'next/dist/shared/lib/utils';
import { postToEndpoint } from '../../../../../lib/apiHelpers';
import commons from '../../../../../lib/commons';
import { useTeams } from '../../../../../lib/gameHooks';
import GameError from '../../../../GameError/GameError';
import LostChances from '../../../../LostChances/LostChances';
import styles from './ManageChancesLost.module.css';

export default function ManageChancesLost() {
  const { teams, isError, isLoading } = useTeams();

  if (isError) {
    return (
      <GameError title="Something wrong with teams 🐱‍👤" gameError={isError} />
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

  async function addLostChance(team: Team) {
    const result = await postToEndpoint(`/api/teams/${team.id}`, {
      command: commons.teamCommands.setChancesLost,
      value: team.chancesLost + 1,
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(`Problem adding a lost chance ${JSON.stringify(json)}`);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        {teams.map((team: Team) => (
          <button
            key={team.id}
            className={clsx('redButton', 'flippedButton')}
            onClick={() => addLostChance(team)}
          >
            {team.name} answered wrong!
          </button>
        ))}
      </div>
      <div className={styles.row}>
        {teams.map((team: Team) => (
          <span>
            <LostChances howMany={team.chancesLost} />
          </span>
        ))}
      </div>
    </div>
  );
}
