import { Answer, Team } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { calculatePoints, postToEndpoint } from '../../../../../lib/helpers';
import commons from '../../../../../lib/commons';
import { useAnswer, useTeams } from '../../../../../lib/gameHooks';
import GameError from '../../../../GameError/GameError';
import GivePointsToTeam from '../GivePointsToTeam/GivePointsToTeam';
import ShowPoints from '../ShowPoints/ShowPoints';
import styles from './ManageAnswer.module.css';

export default function ManageAnswer({ answerId, questionType }) {
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
  } = useTeams();

  // Returns in case of problems
  if (isError) {
    return (
      <GameError title="Couldn't get current error" errorDetails={isError} />
    );
  }

  if (teamsError) {
    return <GameError title="Cannot load teams ⛹️‍♀️" errorDetails={teamsError} />;
  }

  if (isLoading || teamsLoading) {
    return <div>loading answer</div>;
  }

  async function toggleRevealAnswer() {
    if (!processing) {
      setProcessing(true);

      const result = await postToEndpoint(`/api/answers/${answerId}`, {
        command: commons.answerCommands.toggleIsRevealed,
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
        {teams.length > 0 && (
          <GivePointsToTeam
            teamId={teams[0].id}
            points={calculatePoints(questionType, answer.points)}
            pointsAlreadyGiven={answer.pointsAlreadyGiven}
            answerId={answer.id}
          />
        )}
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
          <GameError title="Can't update answer" errorDetails={updateError} />
        )}
      </span>
      <span>
        {teams.length > 0 && (
          <GivePointsToTeam
            teamId={teams[1].id}
            points={calculatePoints(questionType, answer.points)}
            pointsAlreadyGiven={answer.pointsAlreadyGiven}
            answerId={answerId}
          />
        )}
      </span>
      <ShowPoints
        answerId={answer.id}
        pointsAlreadyGiven={answer.pointsAlreadyGiven}
      />
    </span>
  );
}
