import { Team } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import Badges from '../../../Badges/Badges';
import styles from './DisplayTeamStatuses.module.css';

export default function DisplayTeamStatus({ team }: { team: Team }) {
  return (
    <div className={styles.team}>
      <div className={styles.score}>{team.score}</div>
      <div className={styles.name}>{team.name}</div>
      <Badges
        badge="😒"
        howMany={team.chancesLost}
        playSound={true}
        className={styles.lostChances}
      />
    </div>
  );
}
