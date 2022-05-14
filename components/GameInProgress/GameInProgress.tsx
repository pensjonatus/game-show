import commons from '../../lib/commons';
import { useGame } from '../../lib/gameHooks';
import styles from './GameInProgress.module.css';
import Error from '../Error/Error';
import CurrentQuestion from './components/CurrentQuestion/CurrentQuestion';
import { Game } from '@prisma/client';

function Frame({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default function GameInProgress() {
  const {
    game,
    isError,
    isLoading,
  }: { [x: string]: Game; isError: any; isLoading: any } = useGame();

  if (isError) {
    return (
      <Frame>
        <Error title="Error getting game status 💔" gameError={isError} />
      </Frame>
    );
  }

  if (isLoading) {
    return <Frame>Checking game status...</Frame>;
  }

  if (!game.inProgress) {
    return (
      <Frame>
        <h1>Waiting for {commons.gameTitle} to start 🕺</h1>
        <p>
          It's coming sooner than you think. That's right, it's{' '}
          {commons.gameTitle}
        </p>
      </Frame>
    );
  }

  return (
    <Frame>
      <CurrentQuestion questionId={game.questionId} />
    </Frame>
  );
}
