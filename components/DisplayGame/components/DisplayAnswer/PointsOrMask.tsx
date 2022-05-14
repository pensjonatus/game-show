import { useEffect } from 'react';
import { useAudio } from '../../../../lib/gameHooks';
import Mask from '../Mask/Mask';

export default function PointsOrMask({ pointsAlreadyGiven, points }) {
  const [playingGivePoints, toggleGivePoints] = useAudio(
    '/resources/givePoints.wav'
  );

  useEffect(
    function () {
      if (pointsAlreadyGiven && !playingGivePoints) {
        toggleGivePoints();
      }
    },
    [pointsAlreadyGiven]
  );
  return <span>{pointsAlreadyGiven ? points : <Mask width="4ch" />}</span>;
}
