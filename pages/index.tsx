import React from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';
import { Team } from '@prisma/client';
import Layout from '../components/Layout';
import TeamDisplay from '../components/TeamDisplay';
import styles from './Home.module.css';

export const getServerSideProps: GetServerSideProps = async () => {
  const teams = await prisma.team.findMany();
  return { props: { teams } };
};

export default function Home(props) {
  async function addSampleTeams() {
    const result = await fetch('/api/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          name: 'Nawigatorzy',
          avatarUrl:
            'https://upload.wikimedia.org/wikipedia/en/a/a3/Max_Pr%C3%BCss_-_Max_Pruss_Zeppelin_Navigator_Hindenburg.jpg',
        },
        {
          name: 'Marcepan',
          avatarUrl:
            'https://images-gmi-pmc.edge-generalmills.com/26983a17-0396-4b63-8caa-2286669e788b.jpg',
        },
      ]),
    });
  }

  return (
    <Layout>
      <h1>Poznaj nasze drużyny</h1>
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
      <h2>Admin</h2>
      <button onClick={addSampleTeams}>Add sample teams</button>
    </Layout>
  );
}
