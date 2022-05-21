import { useQuestions } from '../../lib/gameHooks';
import { Answer } from '@prisma/client';
import { AllQuestions, QuestionWithAnswers } from '../../lib/types';
import GameError from '../GameError/GameError';
import styles from './PreviewAllQuestions.module.css';

export default function PreviewAllQuestions() {
  const {
    questions,
    isError,
    isLoading,
  }: { [x: string]: AllQuestions; isError: any; isLoading: any } =
    useQuestions();

  if (isError) {
    return <GameError errorDetails={isError} title="Cannot load questions" />;
  }

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <>
      {questions?.questionsAndAnswers?.map((question: QuestionWithAnswers) => (
        <div key={question.id}>
          <h3>{question.content}</h3>
          <ul>
            {question.answers.map((answer: Answer) => (
              <li key={answer.id}>
                {answer.content} ({answer.points})
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2>Finale</h2>
      {questions?.finale?.map((question) => (
        <div key={question.id}>
          <h3>{question.content}</h3>
          <p className={styles.answerShortlist}>
            {question.answers.map((answer) => (
              <span key={answer.id}>
                {answer.content} ({answer.points})
              </span>
            ))}
          </p>
        </div>
      ))}
    </>
  );
}
