import { Question, Answer } from '@prisma/client';
import { GetServerSideProps } from 'next/types';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const questions: Question[] = await prisma.question.findMany();
  const answers: Answer[] = await prisma.answer.findMany();

  const question: Question = questions[0];
  const validAnswers = answers.filter(
    (answer: Answer) => answer.questionId === question.id
  );
  return { props: { question, validAnswers } };
};

export default function Game(props) {
  const { question, validAnswers } = props;
  return (
    <>
      <h1>{question?.content}</h1>
      {validAnswers?.map((answer: Answer) => (
        <div key={answer.id}>{answer.content}</div>
      ))}
    </>
  );
}
