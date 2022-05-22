import { useEffect } from 'react';
import { useAudio } from '../../../../lib/gameHooks';
import Mask from '../Mask/Mask';

export default function AnswerOrMask({ isRevealed, content }) {
  const [playingReveal, toggleReveal] = useAudio('/resources/reveal.wav');
  
  useEffect(
    function () {
      if (isRevealed && !playingReveal) {
        toggleReveal();
      }
    },
    [isRevealed]
  );

  const answerWidth = '100%';
  return (
    <span style={{ width: answerWidth }}>
      {isRevealed ? content : <Mask width={answerWidth} />}
    </span>
  );
}
