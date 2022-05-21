import { useQuestion, UseQuestionShape } from '../../../../lib/gameHooks';
import GameError from '../../../GameError/GameError';
import Mask from '../Mask/Mask';
import styles from './DisplayFinaleQuestion.module.css';

export default function DisplayFinaleQuestion({ questionId }) {
  const { question, isError, isLoading }: UseQuestionShape =
    useQuestion(questionId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <GameError title="Problem 😑" errorDetails={isError} />;
  }

  return (
    <div className={styles.row}>
      {question.playerAnswer ? (
        <span>{question.playerAnswer}</span>
      ) : (
        <Mask width="6em" />
      )}
      {question.scoreAwarded > 0 ? (
        <span>{question.scoreAwarded}</span>
      ) : (
        <Mask width="2em" />
      )}
    </div>
  );
}
