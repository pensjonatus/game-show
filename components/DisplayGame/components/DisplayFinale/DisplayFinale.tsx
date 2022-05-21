import { useQuestions } from '../../../../lib/gameHooks';
import { AllQuestions } from '../../../../lib/types';
import GameError from '../../../GameError/GameError';
import DisplayFinaleQuestion from '../DisplayFinaleQuestion/DisplayFinaleQuestion';
import styles from './DisplayFinale.module.css';

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

  return (
    <div>
      <h1>Finale!</h1>
      <div className={styles.players}>
        {[...new Array(2)].map((nothing, key) => (
          <div className={styles.playerPanel} key={key}>
            {questions.finale.map((question) => (
              <DisplayFinaleQuestion
                questionId={question.id}
                key={question.id}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
