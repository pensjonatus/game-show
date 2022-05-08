import { useGame, useQuestions, useTeams } from '../../../../lib/gameHooks';
import { Question, Game, Team, Answer } from '@prisma/client';
import { QuestionWithAnswers } from '../../../../lib/types';
import styles from './ManageQuestions.module.css';

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

  if (isError || teamsIsError || gameIsError) {
    return <div>Whoops! Cannot get questions</div>;
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
