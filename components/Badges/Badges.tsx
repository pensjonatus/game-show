import { useEffect } from 'react';
import { useAudio } from '../../lib/gameHooks';

export default function Badges({
  badge,
  howMany,
  playSound,
  className = undefined,
}) {
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
    <span className={className}>
      {[...new Array(howMany)].map((nothing, key) => (
        <span key={key}>{badge}</span>
      ))}
    </span>
  );
}
