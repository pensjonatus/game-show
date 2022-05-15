import { Team } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import commons from '../../../../../lib/commons';
import { useTeam } from '../../../../../lib/gameHooks';
import GameError from '../../../../GameError/GameError';
import {
  postToEndpoint,
  setPointsAlreadyGiven,
} from '../../../../../lib/apiHelpers';

export default function GivePointsToTeam({
  teamId,
  answerId,
  pointsAlreadyGiven,
  points,
}) {
  const [processing, setProcessing] = useState(false);

  const {
    team,
    isError,
    isLoading,
  }: { [x: string]: Team; isError: any; isLoading: any } = useTeam(teamId);

  if (isError) {
    return <GameError title="Problem with the answer" errorDetails={isError} />;
  }

  if (isLoading) {
    return <span>loading</span>;
  }

  async function givePoints() {
    if (!pointsAlreadyGiven && !processing) {
      setProcessing(true);
      const addPointsResult = await postToEndpoint(`/api/teams/${teamId}`, {
        command: commons.teamCommands.addPoints,
        amount: points,
      });
      if (!addPointsResult.ok) {
        throw new Error('Cannot add points');
      }

      const pointsUpdateResult = await setPointsAlreadyGiven(answerId);
      if (!pointsUpdateResult.ok) {
        throw new Error('Cannot change answer status');
      }

      setProcessing(false);
    }
  }

  return (
    <button
      className={clsx(
        'smallButton',
        (pointsAlreadyGiven || processing) && 'disabledButton'
      )}
      onClick={givePoints}
    >
      {pointsAlreadyGiven
        ? 'Points already given'
        : `Give points to ${team.name}`}
    </button>
  );
}
