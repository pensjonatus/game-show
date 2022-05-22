import { useQuestion } from '../../../../lib/gameHooks';
import GameError from '../../../GameError/GameError';
import Mask from '../Mask/Mask';
import styles from '../DisplayFinale/DisplayFinale.module.css';
import { useEffect, useState } from 'react';
import { Round } from '@prisma/client';
import AnswerOrMask from '../DisplayAnswer/AnswerOrMask';
import PointsOrMask from '../DisplayAnswer/PointsOrMask';

export default function DisplayFinaleQuestion({
  questionId,
  round,
  isActiveRound,
}) {
  const [playerAnswer, setPlayerAnswer] = useState(undefined);
  const [scoreAwarded, setScoreAwarded] = useState(undefined);
  const { question, isError, isLoading } = useQuestion(questionId);

  useEffect(
    function () {
      if (question) {
        if (round === Round.ROUND_ONE) {
          setPlayerAnswer(question.playerAnswerRoundOne);
          setScoreAwarded(question.scoreAwardedRoundOne);
        }

        if (round === Round.ROUND_TWO) {
          setPlayerAnswer(question.playerAnswerRoundTwo);
          setScoreAwarded(question.scoreAwardedRoundTwo);
        }
      }
    },
    [question]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <GameError title="Problem 😑" errorDetails={isError} />;
  }

  return (
    <div className={styles.row}>
      <div className={styles.answer}>
        <AnswerOrMask
          content={playerAnswer}
          isRevealed={playerAnswer && isActiveRound}
        />
      </div>
      <div className={styles.score}>
        <PointsOrMask
          isRevealed={scoreAwarded > 0 && isActiveRound}
          points={scoreAwarded}
        />
      </div>
    </div>
  );
}
