import styles from './ManageGame.module.css';
import StartStop from './components/StartStop/StartStop';
import ManageQuestion from './components/ManageQuestion/ManageQuestion';
import PreviousNext from './PreviousNext/PreviousNext';
import { useGame } from '../../lib/gameHooks';
import GameError from '../GameError/GameError';
import ToggleFinale from './components/ToggleFinale/ToggleFinale';
import ManageFinale from './components/ManageFinale/ManageFinale';

export default function ManageGame() {
  const { game, isError: gameIsError, isLoading: gameIsLoading } = useGame();

  if (gameIsError) {
    return (
      <GameError
        title="Oh boy! Can't get the game to manage questions off of 😵"
        errorDetails={gameIsError}
      />
    );
  }

  if (gameIsLoading) {
    return <div>Loading game...</div>;
  }

  return (
    <section className={styles.gameControlPanel}>
      <StartStop />
      {game.inProgress && (
        <>
          {!game.inFinale && (
            <>
              <ManageQuestion questionId={game.questionId} />
              <PreviousNext />
            </>
          )}
        </>
      )}
      {game.inProgress && <ToggleFinale />}
      {game.inFinale && <ManageFinale />}
    </section>
  );
}
