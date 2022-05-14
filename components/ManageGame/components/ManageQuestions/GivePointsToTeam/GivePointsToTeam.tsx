import { Team } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import commons from '../../../../../lib/commons';
import { useTeam } from '../../../../../lib/gameHooks';
import GameError from '../../../../GameError/GameError';
import { setPointsAlreadyGiven } from '../lib/apiHelpers';

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
    return <GameError title="Problem with the answer" gameError={isError} />;
  }

  if (isLoading) {
    return <span>loading</span>;
  }

  async function addPointsToTeamScore() {
    const result = await fetch(`/api/teams/${teamId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        command: commons.teamCommands.addPoints,
        amount: points,
      }),
    });

    return result;
  }

  async function givePoints() {
    if (!pointsAlreadyGiven && !processing) {
      setProcessing(true);
      const result = await addPointsToTeamScore();
      if (!result.ok) {
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
