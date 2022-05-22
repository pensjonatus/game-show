import { useQuestion } from '../../../../lib/gameHooks';
import GameError from '../../../GameError/GameError';
import Mask from '../Mask/Mask';
import styles from '../DisplayFinale/DisplayFinale.module.css';

export default function DisplayFinaleQuestion({ questionId }) {
  const { question, isError, isLoading } = useQuestion(questionId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <GameError title="Problem 😑" errorDetails={isError} />;
  }

  return (
    <div className={styles.row}>
      <div className={styles.answer}>
        {question.playerAnswer ? (
          <span>{question.playerAnswer}</span>
        ) : (
          <Mask width="100%" />
        )}
      </div>
      <div className={styles.score}>
        {question.scoreAwarded > 0 ? (
          <span>{question.scoreAwarded}</span>
        ) : (
          <Mask width="100%" />
        )}
      </div>
    </div>
  );
}
