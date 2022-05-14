import clsx from 'clsx';
import { useState } from 'react';
import { setPointsAlreadyGiven } from '../lib/apiHelpers';

export default function ShowPoints({ answerId, pointsAlreadyGiven }) {
  const [processing, setProcessing] = useState(false);

  async function handleClick() {
    if (!processing && !pointsAlreadyGiven) {
      setProcessing(true);
      const result = await setPointsAlreadyGiven(answerId);
      if (!result.ok) {
        throw new Error(`Problem showing points: ${JSON.stringify(result)}`);
      }
      setProcessing(false);
    }
  }

  return (
    <button
      className={clsx(
        'smallButton',
        'blackButton',
        (processing || pointsAlreadyGiven) && 'disabledButton'
      )}
      onClick={handleClick}
    >
      {pointsAlreadyGiven ? 'points shown' : 'show points'}
    </button>
  );
}
