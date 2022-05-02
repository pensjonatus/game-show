import React from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';
import { Team, Question, Answer } from '@prisma/client';
import Layout from '../components/Layout';
import TeamDisplay from '../components/TeamDisplay';
import styles from './Home.module.css';
import samples from '../lib/samples';

type HomeProps = {
  teams: Team[];
  questions: Question[];
  answers: Answer[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const teams: Team[] = await prisma.team.findMany();
  const questions: Question[] = await prisma.question.findMany();
  const answers: Answer[] = await prisma.answer.findMany();
  const homeProps: HomeProps = { teams, questions, answers };
  return { props: homeProps };
};

export default function Home(props) {
  async function postToEndpoint(endpointUrl, data) {
    const result = await fetch(endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log(result);
  }

  return (
    <Layout>
      <h1>Meet the teams</h1>
      <div className={styles.teams}>
        {props.teams &&
          props.teams.map((team: Team) => (
            <TeamDisplay
              name={team.name}
              avatar={team.avatarUrl}
              key={team.name}
            />
          ))}
      </div>
      <h2>Questions</h2>
      <div>
        {props.questions.map((question: Question) => (
          <div key={question.id}>
            <h3>{question.content}</h3>
            <ul>
              {props.answers
                .filter((answer: Answer) => answer.questionId === question.id)
                .map((answer: Answer) => (
                  <li>
                    {answer.content} ({answer.points})
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <h2>Admin</h2>
      <button onClick={() => postToEndpoint('/api/teams', samples.teams)}>
        Add sample teams
      </button>
      <button
        onClick={() => postToEndpoint('/api/questions', samples.questionSet)}
      >
        Add sample questions
      </button>
    </Layout>
  );
}
