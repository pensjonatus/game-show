import { useQuestion } from '../../../../lib/gameHooks';
import GameError from '../../../GameError/GameError';
import styles from './ManageFinaleAnswer.module.css';

export default function ManageFinaleAnswer({ questionId }) {
  const { question, isError, isLoading } = useQuestion(questionId);

  if (isError) {
    return (
      <GameError title="What's with this answer? 🤔" errorDetails={isError} />
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.questionBlock}>
      <h3>{question.content}</h3>
      <div className={styles.buttons}>
        {question.answers.map((answer) => (
          <button className="smallButton blackButton" key={answer.id}>
            {answer.content} ({answer.points})
          </button>
        ))}
        <button className="smallButton">0 points</button>
      </div>
    </div>
  );
}
