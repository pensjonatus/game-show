import styles from './ManageGame.module.css';
import StartStop from './components/StartStop/StartStop';
import ManageQuestion from './components/ManageQuestion/ManageQuestion';
import PreviousNext from './PreviousNext/PreviousNext';
import { useGame } from '../../lib/gameHooks';
import { Game } from '@prisma/client';
import GameError from '../GameError/GameError';

export default function ManageGame() {
  const gameProps = useGame();
  const { isError: gameIsError, isLoading: gameIsLoading } = gameProps;
  const game: Game = gameProps.game;

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
      <ManageQuestion questionId={game.questionId} />
      <PreviousNext />
    </section>
  );
}
