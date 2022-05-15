import { useQuestions } from '../../../../../lib/gameHooks';
import { QuestionWithAnswers } from '../../../../../lib/types';
import GameError from '../../../../GameError/GameError';
import Button from './Button';
import styles from './PreviousNext.module.css';

function getShiftedIndexOrUndefined(
  currentItem: QuestionWithAnswers,
  items: QuestionWithAnswers[],
  shiftBy: number
): QuestionWithAnswers | undefined {
  const currentIndex = items.indexOf(currentItem);
  const shiftedIndex = currentIndex + shiftBy;

  if (shiftedIndex < 0 || shiftedIndex > items.length) {
    return undefined;
  }

  return items[shiftedIndex];
}

export default function PreviousNext({
  currentQuestion,
}: {
  currentQuestion: QuestionWithAnswers;
}) {
  const {
    questions,
    isError,
    isLoading,
  }: { [x: string]: QuestionWithAnswers[]; isError: any; isLoading: any } =
    useQuestions();

  if (isError) {
    return (
      <GameError
        title="What's next? What's previous? 🤔"
        errorDetails={isError}
      />
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const currentIndex = questions.find(
    (question: QuestionWithAnswers) => currentQuestion.id === question.id
  );

  const previousQuestion: QuestionWithAnswers = getShiftedIndexOrUndefined(
    currentIndex,
    questions,
    -1
  );
  const nextQuestion: QuestionWithAnswers = getShiftedIndexOrUndefined(
    currentIndex,
    questions,
    1
  );

  return (
    <div className={styles.wrapper}>
      <Button switchTo={previousQuestion} key={0}>◀ Previous question</Button>
      <Button switchTo={nextQuestion} key={1}>Next question ▶</Button>
    </div>
  );
}
