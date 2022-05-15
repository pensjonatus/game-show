import { useEffect, useState } from 'react';
import { useGame, useQuestions } from '../../../lib/gameHooks';
import { QuestionWithAnswers } from '../../../lib/types';
import { Game } from '@prisma/client';
import GameError from '../../GameError/GameError';
import Button from './SelectQuestionButton';
import styles from './PreviousNext.module.css';
import { getShifted } from '../../../lib/helpers';

export default function PreviousNext() {
  // component state
  const [previousQuestion, setPreviousQuestion] = useState(undefined);
  const [nextQuestion, setNextQuestion] = useState(undefined);

  // game hooks
  const {
    questions,
    isError,
    isLoading,
  }: { [x: string]: QuestionWithAnswers[]; isError: any; isLoading: any } =
    useQuestions();
  const {
    game,
    isError: gameError,
    isLoading: gameLoading,
  }: { [x: string]: Game; isError: any; isLoading: any } = useGame();

  useEffect(
    function () {
      if (game && questions && questions.length > 0) {
        const currentQuestion = questions.find(
          (question) => question.id === game.questionId
        );

        if (currentQuestion) {
          const current = questions.find(
            (question: QuestionWithAnswers) =>
              currentQuestion.id === question.id
          );
          const previous = getShifted(current, questions, -1);
          const next = getShifted(current, questions, 1);
          setPreviousQuestion(previous);
          setNextQuestion(next);
        }
      }
    },
    [game, questions]
  );

  if (isError) {
    return (
      <GameError
        title="What's next? What's previous? 🤔"
        errorDetails={isError}
      />
    );
  }

  if (gameError) {
    return <GameError title="Is the game on? 🤔" errorDetails={gameError} />;
  }

  if (isLoading || gameLoading) {
    return <div>Loading...</div>;
  }

  if (!game.inProgress) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Button question={previousQuestion}>◀ Previous question</Button>
      <Button question={nextQuestion}>Next question ▶</Button>
    </div>
  );
}
