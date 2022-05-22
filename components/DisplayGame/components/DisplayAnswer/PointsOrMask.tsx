import { useEffect } from 'react';
import { useAudio } from '../../../../lib/gameHooks';
import Mask from '../Mask/Mask';

export default function PointsOrMask({ isRevealed, points }) {
  const [playingGivePoints, toggleGivePoints] = useAudio(
    '/resources/givePoints.wav'
  );

  useEffect(
    function () {
      if (isRevealed && !playingGivePoints) {
        toggleGivePoints();
      }
    },
    [isRevealed]
  );
  return <span>{isRevealed ? points : <Mask width="100%" />}</span>;
}
