import { useQuestions } from '../../lib/gameHooks';
import { Answer } from '@prisma/client';
import { QuestionWithAnswers } from '../../lib/types';

export default function AllQuestions() {
  const { questions, isError, isLoading } = useQuestions();

  if (isError) {
    return <div>Error loading questions!</div>;
  }

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      {questions?.map((question: QuestionWithAnswers) => (
        <div key={question.id}>
          <h3>{question.content}</h3>
          <ul>
            {question.answers
              .filter((answer: Answer) => answer.questionId === question.id)
              .map((answer: Answer) => (
                <li key={answer.id}>
                  {answer.content} ({answer.points})
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
