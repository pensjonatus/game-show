import { useGame, useQuestions } from '../../../../lib/gameHooks';
import { Question, Game, Answer } from '@prisma/client';
import { QuestionWithAnswers } from '../../../../lib/types';
import styles from './ManageQuestion.module.css';
import GameError from '../../../GameError/GameError';
import ManageAnswer from './ManageAnswer/ManageAnswer';
import ManageChancesLost from './ManageChancesLost/ManageChancesLost';
import { useEffect, useState } from 'react';

export default function ManageQuestions() {
  // component hooks
  const [currentQuestion, setCurrentQuestion] = useState<
    QuestionWithAnswers | undefined
  >(undefined);

  // Game hooks
  const {
    questions,
    isError,
    isLoading,
  }: { [x: string]: QuestionWithAnswers[]; isError: any; isLoading: any } =
    useQuestions();
  const gameProps = useGame();
  const { isError: gameIsError, isLoading: gameIsLoading } = gameProps;
  const game: Game = gameProps.game;

  // component effects
  useEffect(
    function () {
      if (questions && questions.length > 0 && game) {
        const selectedQuestion: QuestionWithAnswers = questions.find(
          (q: Question) => q.id === game.questionId
        );
        setCurrentQuestion(selectedQuestion);
      }
    },
    [questions, game]
  );

  // Optional renders
  if (!game || !game.inProgress) {
    return null;
  }

  if (isError) {
    return (
      <GameError title="Whoops! Cannot get questions" errorDetails={isError} />
    );
  }

  if (gameIsError) {
    return (
      <GameError
        title="Oh boy! Can't get the game to manage questions off of 😵"
        errorDetails={gameIsError}
      />
    );
  }

  if (isLoading || gameIsLoading) {
    return <div>Loading questions</div>;
  }

  if (!currentQuestion) {
    return (
      <GameError
        title="No question selected? 🤔"
        errorDetails={{
          message: `No question set in current game: ${JSON.stringify(game)}`,
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3>
        {currentQuestion.content} ({currentQuestion.type})
      </h3>
      <ManageChancesLost />
      <div className={styles.answerList}>
        {currentQuestion.answers.map((answer: Answer) => (
          <div key={answer.id} className={styles.answerRow}>
            <ManageAnswer
              answerId={answer.id}
              questionType={currentQuestion.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
