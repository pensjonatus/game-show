import { useGame, useTeam } from '../../../../lib/gameHooks';
import GameError from '../../../GameError/GameError';
import styles from './DisplayFinaleScore.module.css';

export default function DisplayFinaleScore({ teamId }) {
  const { team, isError: teamError, isLoading: teamLoading } = useTeam(teamId);

  if (teamError) {
    return <GameError title="Can't load team 🤷‍♀️" errorDetails={teamError} />;
  }

  if (teamLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div>{team.name}</div>
      <div>Total: {team.score}</div>
    </div>
  );
}
