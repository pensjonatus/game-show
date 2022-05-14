import { Answer } from '@prisma/client';
import { useEffect } from 'react';
import { useAnswer, useAudio } from '../../../../lib/gameHooks';
import Error from '../../../Error/Error';
import Mask from '../Mask/Mask';
import styles from './DisplayAnswer.module.css';

export default function DisplayAnswer({ answerId }) {
  const [playingReveal, toggleReveal] = useAudio('/resources/reveal.wav');
  const [playingAward, toggleAward] = useAudio('/resources/award.wav');
  const [playingWrong, toggleWrong] = useAudio('/resources/reveal.wav');
  const {
    answer,
    isLoading,
    isError,
  }: { [x: string]: Answer; isError: any; isLoading: any } =
    useAnswer(answerId);

  useEffect(
    function () {
      if (answer?.isRevealed && !playingReveal) {
        toggleReveal();
      }
    },
    [answer]
  );

  if (isError) {
    return <Error title="Couldn't get current error" gameError={isError} />;
  }

  if (isLoading) {
    return <Mask width="100%" />;
  }

  const answerWidth = '30ch';

  return (
    <span className={styles.row}>
      <span style={{ width: answerWidth }}>
        {answer.isRevealed ? answer.content : <Mask width={answerWidth} />}
      </span>
      <span>
        {answer.pointesAreRevealed ? answer.points : <Mask width="4ch" />}
      </span>
    </span>
  );
}
