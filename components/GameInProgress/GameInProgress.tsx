import commons from '../../lib/commons';
import { useGame } from '../../lib/gameHooks';
import styles from './GameInProgress.module.css';

export default function GameInProgress() {
  const { game, isError, isLoading } = useGame();

  if (isError) {
    return <div className={styles.wrapper}>Error getting current game</div>;
  }

  if (isLoading) {
    return <div className={styles.wrapper}>Checking game status...</div>;
  }

  if (!game.inProgress) {
    return (
      <div className={styles.wrapper}>
        <h1>No game in progress</h1>
        <p>Waiting for an admin to start a game</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1>{commons.gameTitle} in progress 🙌</h1>
      <p>The fun is on!</p>
    </div>
  );
}
