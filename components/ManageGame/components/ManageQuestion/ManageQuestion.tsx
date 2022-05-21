import { useQuestion } from '../../../../lib/gameHooks';
import { Answer } from '@prisma/client';
import { QuestionWithAnswers } from '../../../../lib/types';
import styles from './ManageQuestion.module.css';
import GameError from '../../../GameError/GameError';
import ManageAnswer from './ManageAnswer/ManageAnswer';
import ManageChancesLost from './ManageChancesLost/ManageChancesLost';
import { sortAnswers } from '../../../../lib/helpers';

export default function ManageQuestion({ questionId }) {
  // Game hooks
  const {
    question,
    isLoading,
    isError,
  }: { [x: string]: QuestionWithAnswers; isError: any; isLoading: any } =
    useQuestion(questionId);

  // Optional renders
  if (isError) {
    return (
      <GameError title="Whoops! Cannot get questions" errorDetails={isError} />
    );
  }

  

  if (isLoading) {
    return <div>Loading questions</div>;
  }

  if (!question) {
    return (
      <GameError
        title="No question selected? 🤔"
        errorDetails={{
          message: `No question set in current game`,
        }}
      />
    );
  }

  question.answers = sortAnswers(question.answers, question.type);

  return (
    <div className={styles.wrapper}>
      <h3>
        {question.content} ({question.type})
      </h3>
      <ManageChancesLost />
      <div className={styles.answerList}>
        {question.answers.map((answer: Answer) => (
          <div key={answer.id} className={styles.answerRow}>
            <ManageAnswer answerId={answer.id} questionType={question.type} />
          </div>
        ))}
      </div>
    </div>
  );
}
