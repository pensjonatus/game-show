import { Answer, Team } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import commons from '../../../../../lib/commons';
import { useAnswer, useTeams } from '../../../../../lib/gameHooks';
import GameError from '../../../../GameError/GameError';
import GivePointsToTeam from '../GivePointsToTeam/GivePointsToTeam';
import ShowPoints from '../ShowPoints/ShowPoints';
import styles from './ManageAnswer.module.css';

export default function ManageAnswer({ answerId }) {
  // Component hooks
  const [processing, setProcessing] = useState(false);
  const [updateError, setUpdateError] = useState(undefined);

  // Database hooks
  const {
    answer,
    isLoading,
    isError,
  }: { [x: string]: Answer; isError: any; isLoading: any } =
    useAnswer(answerId);
  const {
    teams,
    isLoading: teamsLoading,
    isError: teamsError,
  }: { [x: string]: Team[]; isLoading: any; isError: any } = useTeams();

  // Returns in case of problems
  if (isError) {
    return <GameError title="Couldn't get current error" gameError={isError} />;
  }

  if (teamsError) {
    return <GameError title="Cannot load teams ⛹️‍♀️" gameError={teamsError} />;
  }

  if (isLoading || teamsLoading) {
    return <div>loading answer</div>;
  }

  async function toggleRevealAnswer() {
    if (!processing) {
      setProcessing(true);

      const result = await fetch(`/api/answers/${answerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: commons.answerCommands.toggleIsRevealed,
        }),
      });

      if (!result.ok) {
        const requestError = await result.json();
        setUpdateError(requestError);
      }

      setProcessing(false);
    }
  }

  return (
    <span className={styles.row}>
      <span>
        <GivePointsToTeam
          teamId={teams[0].id}
          points={answer.points}
          pointsAlreadyGiven={answer.pointsAlreadyGiven}
          answerId={answer.id}
        />
      </span>
      <span className={styles.answer}>
        <button
          className={clsx(
            'smallButton',
            'blackButton',
            processing && 'disabledButton',
            answer.isRevealed && 'flippedButton'
          )}
          onClick={toggleRevealAnswer}
        >
          {answer.isRevealed ? 'hide' : 'reveal'}
        </button>
        <span>
          {answer.content} ({answer.points})
        </span>
        {updateError && (
          <GameError title="Can't update answer" gameError={updateError} />
        )}
      </span>
      <span>
        <GivePointsToTeam
          teamId={teams[1].id}
          points={answer.points}
          pointsAlreadyGiven={answer.pointsAlreadyGiven}
          answerId={answerId}
        />
      </span>
      <ShowPoints
        answerId={answer.id}
        pointsAlreadyGiven={answer.pointsAlreadyGiven}
      />
    </span>
  );
}
