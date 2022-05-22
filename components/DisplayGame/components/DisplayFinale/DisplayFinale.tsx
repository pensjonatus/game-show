import { useGame, useQuestions } from '../../../../lib/gameHooks';
import { sortQuestions } from '../../../../lib/helpers';
import GameError from '../../../GameError/GameError';
import DisplayFinaleQuestion from './DisplayFinaleQuestion';
import styles from './DisplayFinale.module.css';
import { Round } from '@prisma/client';

export default function DisplayFinale() {
  const { questions, isError, isLoading } = useQuestions();

  if (isError) {
    return (
      <GameError
        title="Problem getting finale to manage"
        errorDetails={isError}
      />
    );
  }

  if (isLoading) {
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
            />
          ))}
        </div>
        <div className={styles.playerPanel}>
          {questions.finale.map((question) => (
            <DisplayFinaleQuestion
              questionId={question.id}
              key={question.id}
              round={Round.ROUND_TWO}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
