import { Answer } from '@prisma/client';
import { useAnswer, useAudio } from '../../../../lib/gameHooks';
import Error from '../../../Error/Error';
import Mask from '../Mask/Mask';
import AnswerOrMask from './AnswerOrMask';
import styles from './DisplayAnswer.module.css';
import PointsOrMask from './PointsOrMask';

export default function DisplayAnswer({ answerId }) {
  const [playingWrong, toggleWrong] = useAudio('/resources/reveal.wav');
  const {
    answer,
    isLoading,
    isError,
  }: { [x: string]: Answer; isError: any; isLoading: any } =
    useAnswer(answerId);

  if (isError) {
    return <Error title="Couldn't get current error" gameError={isError} />;
  }

  if (isLoading) {
    return <Mask width="100%" />;
  }

  return (
    <span className={styles.row}>
      <AnswerOrMask content={answer.content} isRevealed={answer.isRevealed} />
      <PointsOrMask
        pointsAlreadyGiven={answer.pointsAlreadyGiven}
        points={answer.points}
      />
    </span>
  );
}
