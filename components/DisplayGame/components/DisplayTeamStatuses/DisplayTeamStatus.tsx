import { Team } from '@prisma/client';
import LostChances from '../../../LostChances/LostChances';
import styles from './DisplayTeamStatuses.module.css';

export default function DisplayTeamStatus({ team }: { team: Team }) {
  return (
    <div className={styles.team}>
      <div className={styles.score}>{team.score}</div>
      <div className={styles.name}>{team.name}</div>
      <div className={styles.lostChances}>
        <LostChances howMany={team.chancesLost} playSound={true} />
      </div>
    </div>
  );
}
