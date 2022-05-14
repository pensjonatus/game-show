import { useTeams } from '../../lib/gameHooks';
import { Team } from '@prisma/client';
import TeamDisplay from '../TeamDisplay';
import styles from './TwoTeams.module.css';
import GameError from '../GameError/GameError';

export default function TwoTeams() {
  const { teams, isError, isLoading } = useTeams();

  if (isError) {
    return <GameError title="Error getting teams" errorDetails={isError} />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.teams}>
      {teams.map((team: Team) => (
        <TeamDisplay
          name={team.name}
          avatar={team.avatarUrl}
          score={team.score}
          key={team.name}
        />
      ))}
    </div>
  );
}
