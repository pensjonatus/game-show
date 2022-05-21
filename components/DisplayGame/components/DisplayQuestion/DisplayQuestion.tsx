import { Answer, QuestionType } from '@prisma/client';
import clsx from 'clsx';
import { useQuestion } from '../../../../lib/gameHooks';
import { calculatePoints, sortAnswers } from '../../../../lib/helpers';
import Badges from '../../../Badges/Badges';
import GameError from '../../../GameError/GameError';
import DisplayAnswer from '../DisplayAnswer/DisplayAnswer';
import Logo from '../Logo/Logo';
import styles from './DisplayQuestion.module.css';

export default function DisplayQuestion({ questionId }) {
  const {
    question,
    isLoading,
    isError,
  } =
    useQuestion(questionId);

  if (isError) {
    return (
      <GameError title="Couldn't get current question" errorDetails={isError} />
    );
  }

  if (isLoading) {
    return <div>💕💕💕</div>;
  }

  question.answers = sortAnswers(question.answers, question.type);

  return (
    <div className={styles.wrapper}>
      {question.type === QuestionType.TRUE_FALSE ? (
        <Badges
          badge="😏"
          howMany={3}
          playSound={false}
          className={styles.stars}
        />
      ) : (
        <Badges
          badge="⭐"
          howMany={calculatePoints(question.type, 1)}
          playSound={false}
          className={styles.stars}
        />
      )}
      <h1 className={styles.question}>{question.content}</h1>
      <div className={clsx(question.answers.length > 5 && styles.answersSmall)}>
        {question.answers.map((answer: Answer, index: number) => (
          <div className={styles.line} key={index}>
            <span className={styles.number}>{index + 1}.</span>
            <DisplayAnswer answerId={answer.id} key={answer.id} />
          </div>
        ))}
      </div>
      <Logo />
    </div>
  );
}
