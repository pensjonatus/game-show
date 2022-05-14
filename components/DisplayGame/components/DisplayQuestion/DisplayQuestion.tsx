import { Answer } from '@prisma/client';
import { useQuestion } from '../../../../lib/gameHooks';
import { QuestionWithAnswers } from '../../../../lib/types';
import Error from '../../../Error/Error';
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
    return <Error title="Couldn't get current question" gameError={isError} />;
  }

  if (isLoading) {
    return <div>💕💕💕</div>;
  }

  question.answers.sort((a, b) => (a.points > b.points ? -1 : 1));

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.question}>{question.content}</h1>
      <ul className={styles.answers}>
        {question.answers.map((answer: Answer) => (
          <DisplayAnswer answerId={answer.id} key={answer.id} />
        ))}
      </ul>
      <Logo />
    </div>
  );
}
