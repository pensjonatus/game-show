import { useGame, useQuestions, useTeams } from '../../../../lib/gameHooks';
import { Question, Game, Team, Answer } from '@prisma/client';
import { QuestionWithAnswers } from '../../../../lib/types';
import styles from './ManageQuestions.module.css';
import Error from '../../../Error/Error';

export default function ManageQuestions() {
  const { questions, isError, isLoading } = useQuestions();
  const {
    teams,
    isError: teamsIsError,
    isLoading: teamsIsLoading,
  } = useTeams();
  const gameProps = useGame();
  const { isError: gameIsError, isLoading: gameIsLoading } = gameProps;
  const game: Game = gameProps.game;

  if (isError) {
    return <Error title="Whoops! Cannot get questions" gameError={isError} />;
  }

  if (teamsIsError) {
    return (
      <Error title="Yikes! Error getting teams" gameError={teamsIsError} />
    );
  }

  if (gameIsError) {
    return <Error title="Oh boy! Can't get game" gameError={gameIsError} />;
  }

  if (isLoading || teamsIsLoading || gameIsLoading) {
    return <div>Loading questions</div>;
  }

  const currentQuestion: QuestionWithAnswers = questions.find(
    (q: Question) => q.id === game.questionId
  );

  return (
    <div>
      <h3>{currentQuestion.content}</h3>
      <ul className={styles.answerList}>
        {currentQuestion.answers.map((answer: Answer) => (
          <li key={answer.id} className={styles.answerRow}>
            {answer.content} ({answer.points})
          </li>
        ))}
      </ul>
    </div>
  );
}
