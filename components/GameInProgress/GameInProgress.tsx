import commons from '../../lib/commons';
import { useGame } from '../../lib/gameHooks';
import styles from './GameInProgress.module.css';
import Error from '../Error/Error';
import CurrentQuestion from './components/CurrentQuestion/CurrentQuestion';
import { Game } from '@prisma/client';

export default function GameInProgress() {
  const {
    game,
    isError,
    isLoading,
  }: { [x: string]: Game; isError: any; isLoading: any } = useGame();

  if (isError) {
    return <Error title="Error getting game status 💔" gameError={isError} />;
  }

  if (isLoading) {
    return <div className={styles.wrapper}>Checking game status...</div>;
  }

  if (!game.inProgress) {
    return (
      <div className={styles.wrapper}>
        <h1>Waiting for {commons.gameTitle} to start 🕺</h1>
        <p>
          It's coming sooner than you think. That's right, it's{' '}
          {commons.gameTitle}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <CurrentQuestion questionId={game.questionId} />
      </div>
    </div>
  );
}
