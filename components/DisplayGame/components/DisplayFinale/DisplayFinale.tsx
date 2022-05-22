import { useGame, useQuestions } from '../../../../lib/gameHooks';
import { sortQuestions } from '../../../../lib/helpers';
import GameError from '../../../GameError/GameError';
import DisplayFinaleQuestion from './DisplayFinaleQuestion';
import styles from './DisplayFinale.module.css';
import { Round } from '@prisma/client';
import DisplayFinaleScore from '../DisplayFinaleScore/DisplayFinaleScore';

export default function DisplayFinale() {
  const { questions, isError, isLoading } = useQuestions();
  const { game, isError: gameError, isLoading: gameLoading } = useGame();

  if (isError) {
    return (
      <GameError
        title="Problem getting finale to manage"
        errorDetails={isError}
      />
    );
  }

  if (gameError) {
    return <GameError title="Cannot load game" errorDetails={gameError} />;
  }

  if (isLoading || gameLoading) {
    return <div>Loading...</div>;
  }

  questions.finale = sortQuestions(questions.finale);

  return (
    <div>
      <h1 className={styles.header}>Finale!</h1>
      <div className={styles.players}>
        <div className={styles.playerPanel}>
          {questions.finale.map((question) => (
            <DisplayFinaleQuestion
              questionId={question.id}
              key={question.id}
              round={Round.ROUND_ONE}
              isActiveRound={game.finaleRound === Round.ROUND_ONE}
            />
          ))}
        </div>
        <div className={styles.playerPanel}>
          {questions.finale.map((question) => (
            <DisplayFinaleQuestion
              questionId={question.id}
              key={question.id}
              round={Round.ROUND_TWO}
              isActiveRound={game.finaleRound === Round.ROUND_TWO}
            />
          ))}
        </div>
      </div>
      <DisplayFinaleScore teamId={game.finaleTeamId} />
    </div>
  );
}
