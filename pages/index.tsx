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
  return (
    <Layout>
      <h1>Poznaj nasze drużyny</h1>
      <div className={styles.teams}>
        {props.teams &&
          props.teams.map((team: Team) => (
            <TeamDisplay name={team.name} avatar={team.avatarUrl} />
          ))}
      </div>
    </Layout>
  );
}
