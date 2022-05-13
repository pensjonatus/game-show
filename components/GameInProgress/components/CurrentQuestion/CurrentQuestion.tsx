import { Answer } from '@prisma/client';
import { useQuestion } from '../../../../lib/gameHooks';
import { QuestionWithAnswers } from '../../../../lib/types';
import Error from '../../../Error/Error';
import Logo from '../Logo/Logo';
import Mask from '../Mask/Mask';
import styles from './CurrentQuestion.module.css';

export default function CurrentQuestion({ questionId }) {
  const {
    question,
    isLoading,
    isError,
  }: { [x: string]: QuestionWithAnswers; isError: any; isLoading: any } =
    useQuestion(questionId);

  if (isError) {
    return <Error title="Couldn't get current question" gameError={isError} />;
  }

  if (isLoading) {
    return <div>💕💕💕</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.question}>{question.content}</h1>
      <ul className={styles.answers}>
        {question.answers.map((answer: Answer) => (
          <li key={answer.id} className={styles.answerRow}>
            <span>
              {!answer.isUncovered ? answer.content : <Mask width="30ch" />}
            </span>
            <span>
              {!answer.pointesAreRevealed ? (
                answer.points
              ) : (
                <Mask width="4ch" />
              )}
            </span>
          </li>
        ))}
      </ul>
      <Logo />
    </div>
  );
}
