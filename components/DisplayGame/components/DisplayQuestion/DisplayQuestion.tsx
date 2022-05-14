import { Answer } from '@prisma/client';
import { useQuestion } from '../../../../lib/gameHooks';
import { QuestionWithAnswers } from '../../../../lib/types';
import GameError from '../../../GameError/GameError';
import DisplayAnswer from '../DisplayAnswer/DisplayAnswer';
import Logo from '../Logo/Logo';
import styles from './DisplayQuestion.module.css';

export default function DisplayQuestion({ questionId }) {
  const {
    question,
    isLoading,
    isError,
  }: { [x: string]: QuestionWithAnswers; isError: any; isLoading: any } =
    useQuestion(questionId);

  if (isError) {
    return (
      <GameError title="Couldn't get current question" errorDetails={isError} />
    );
  }

  if (isLoading) {
    return <div>💕💕💕</div>;
  }

  question.answers.sort((a, b) => (a.points > b.points ? -1 : 1));

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.question}>{question.content}</h1>
      <div className={styles.answers}>
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
