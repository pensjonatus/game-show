import { useEffect } from 'react';
import { useAudio } from '../../lib/gameHooks';

export default function LostChances({ howMany, playSound }) {
  const [playingWrong, toggleWrong] = useAudio('/resources/wrong.wav');

  useEffect(
    function () {
      if (playSound && howMany > 0 && !playingWrong) {
        toggleWrong();
      }
    },
    [howMany]
  );
  return (
    <>
      {[...new Array(howMany)].map((lostChance, key) => (
        <span key={key}>😒</span>
      ))}
    </>
  );
}
