import { useQuestions } from '../../../../lib/gameHooks';
import GameError from '../../../GameError/GameError';
import ManageFinaleAnswer from '../ManageFinaleAnswer/ManageFinaleAnswer';
import ManageFinaleTeam from '../ManageFinaleTeam/ManageFinaleTeam';
import ResetFinaleButton from './ResetFinaleButton';
import styles from './ManageFinale.module.css';
import { sortQuestions } from '../../../../lib/helpers';

export default function ManageFinale() {
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
      <div className={styles.header}>
        <h2>Finale!</h2>
        <ResetFinaleButton />
      </div>
      <ManageFinaleTeam />
      {questions.finale.map((question) => (
        <ManageFinaleAnswer questionId={question.id} key={question.id} />
      ))}
    </div>
  );
}
