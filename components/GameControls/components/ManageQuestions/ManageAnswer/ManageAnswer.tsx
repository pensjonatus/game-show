import { Answer } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import commons from '../../../../../lib/commons';
import { useAnswer } from '../../../../../lib/gameHooks';
import Error from '../../../../Error/Error';
import styles from './ManageAnswer.module.css';

export default function ManageAnswer({ answerId }) {
  const [processing, setProcessing] = useState(false);
  const [updateError, setUpdateError] = useState(undefined);
  const {
    answer,
    isLoading,
    isError,
  }: { [x: string]: Answer; isError: any; isLoading: any } =
    useAnswer(answerId);

  if (isError) {
    return <Error title="Couldn't get current error" gameError={isError} />;
  }

  if (isLoading) {
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
    <li className={styles.row}>
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
          <Error title="Can't update answer" gameError={updateError} />
        )}
      </span>
    </li>
  );
}
