import { useQuestions, useTeams } from '../../../../lib/gameHooks';
import { AllQuestions } from '../../../../lib/types';
import GameError from '../../../GameError/GameError';
import ManageFinaleAnswer from '../ManageFinaleAnswer/ManageFinaleAnswer';
import ManageFinaleTeam from '../ManageFinaleTeam/ManageFinaleTeam';

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

  return (
    <div>
      <h2>Finale!</h2>
      <ManageFinaleTeam/>
      {questions.finale.map((question) => (
        <ManageFinaleAnswer questionId={question.id} key={question.id} />
      ))}
    </div>
  );
}
