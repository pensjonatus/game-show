import { Team } from '@prisma/client';
import { useTeams } from '../../../../lib/gameHooks';
import GameError from '../../../GameError/GameError';
import DisplayTeamStatus from './DisplayTeamStatus';
import styles from './DisplayTeamStatuses.module.css';

export default function DisplayTeamStatuses() {
  const { teams, isError, isLoading } = useTeams();

  if (isError) {
    return <GameError title="Cannot display teams ⛹️‍♀️" errorDetails={isError} />;
  }

  if (isLoading) {
    return <div className={styles.wrapper}>⛹️‍♀️⛹️‍♀️⛹️‍♀️</div>;
  }

  return (
    <div className={styles.wrapper}>
      {teams.map((team: Team) => (
        <DisplayTeamStatus team={team} key={team.id} />
      ))}
    </div>
  );
}
