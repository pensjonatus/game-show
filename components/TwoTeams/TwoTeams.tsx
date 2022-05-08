import { useTeams } from '../../lib/gameHooks';
import { Team } from '@prisma/client';
import TeamDisplay from '../TeamDisplay';
import styles from './TwoTeams.module.css';

export default function TwoTeams() {
  const { teams, isError, isLoading } = useTeams();

  if (isError) {
    return <div>Error getting teams</div>;
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
