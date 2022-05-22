import { Answer, Round } from '@prisma/client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import commons from '../../../../lib/commons';
import { useGame, useQuestion } from '../../../../lib/gameHooks';
import { postToEndpoint } from '../../../../lib/helpers';
import GameError from '../../../GameError/GameError';
import styles from './ManageFinaleAnswer.module.css';

export default function ManageFinaleAnswer({ questionId }) {
  const [playerAnswer, setPlayerAnswer] = useState(undefined);
  const [scoreAwarded, setScoreAwarded] = useState(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [points, setPoints] = useState(0);
  const [updateErrorTitle, setUpdateErrorTitle] = useState(undefined);
  const [updateError, setUpdateError] = useState(undefined);
  const [processing, setProcessing] = useState(false);

  const { question, isError, isLoading } = useQuestion(questionId);
  const { game, isError: gameError, isLoading: gameLoading } = useGame();

  useEffect(
    function () {
      if (game && question) {
        game?.finaleRound === Round.ROUND_ONE
          ? setPlayerAnswer(question.playerAnswerRoundOne)
          : setPlayerAnswer(question.playerAnswerRoundTwo);

        game?.finaleRound === Round.ROUND_ONE
          ? setScoreAwarded(question.scoreAwardedRoundOne)
          : setScoreAwarded(question.scoreAwardedRoundTwo);
        if (playerAnswer) {
          setSelectedAnswer(playerAnswer);
        }
      }
    },
    [question, game]
  );

  useEffect(
    function () {
      if (question?.answers) {
        if (selectedAnswer.length === 0 && points !== 0) {
          setPoints(0);
          return;
        }

        const matchingAnswer: Answer = question.answers.find(
          (a) => a.content === selectedAnswer
        );
        if (matchingAnswer) {
          setPoints(matchingAnswer.points);
        } else {
          if (points !== 0) {
            setPoints(0);
          }
        }
      }
    },
    [selectedAnswer, question]
  );

  if (isError) {
    return (
      <GameError title="What's with this answer? 🤔" errorDetails={isError} />
    );
  }

  if (gameError) {
    return (
      <GameError title="Cannot read this game 🎲" errorDetails={gameError} />
    );
  }

  if (isLoading || gameLoading) {
    return <div>Loading...</div>;
  }

  async function addPoints() {
    try {
      if (!processing && points > 0 && !scoreAwarded) {
        setProcessing(true);

        const scoreUpdate = await postToEndpoint(
          `/api/questions/${question.id}`,
          {
            command: commons.questionCommands.setScoreAwarded,
            round: game.finaleRound,
            value: points,
          }
        );

        if (!scoreUpdate.ok) {
          const err = await scoreUpdate.text();
          setUpdateErrorTitle('Cannot update score');
          setUpdateError(err);
        } else {
          const response = await postToEndpoint(
            `/api/teams/${game.finaleTeamId}`,
            {
              command: commons.teamCommands.addPoints,
              amount: points,
            }
          );

          if (!response.ok) {
            const addErr = await response.json();
            setUpdateErrorTitle('Cannot add points');
            setUpdateError(addErr);
          }
        }

        setProcessing(false);
      }
    } catch (bigError) {
      setUpdateErrorTitle('Cannot perform the "add points" transaction');
      setUpdateError(bigError);
      setProcessing(false);
    }
  }

  async function updatePlayerAnswer() {
    if (!processing && selectedAnswer.length > 0) {
      setProcessing(true);

      const response = await postToEndpoint(`/api/questions/${question.id}`, {
        command: commons.questionCommands.setPlayerAnswer,
        round: game.finaleRound,
        value: selectedAnswer,
      });

      if (!response.ok) {
        const err = await response.json();
        setUpdateErrorTitle('Cannot set player answer');
        setUpdateError(err);
      }
      setProcessing(false);
    }
  }

  return (
    <div className={styles.questionBlock}>
      <div className={styles.header}>
        <h3>{question.content}</h3>
        <span className={styles.textBoxWrapper}>
          <input
            type="text"
            className={styles.textBox}
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
          <button
            className="smallButton blackButton"
            onClick={() => setSelectedAnswer('')}
          >
            clear
          </button>
        </span>
        <button
          className={clsx(
            (selectedAnswer.length === 0 ||
              processing ||
              playerAnswer?.length > 0) &&
              'disabledButton'
          )}
          onClick={updatePlayerAnswer}
        >
          Show answer
        </button>
        <button
          onClick={addPoints}
          className={clsx(
            (processing || points === 0 || scoreAwarded) && 'disabledButton'
          )}
        >
          Give points ({points})
        </button>
        {updateError && (
          <GameError
            title={updateErrorTitle || 'Unknown error'}
            errorDetails={updateError}
          />
        )}
      </div>
      <div className={styles.buttons}>
        {question.answers.map((answer) => (
          <button
            className="smallButton blackButton"
            key={answer.id}
            value={answer.content}
            onClick={(e) =>
              setSelectedAnswer((e.target as HTMLInputElement).value)
            }
          >
            {answer.content} ({answer.points})
          </button>
        ))}
      </div>
    </div>
  );
}
