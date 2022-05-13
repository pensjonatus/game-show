import React from 'react';
import Layout from '../components/Layout';
import TwoTeams from '../components/TwoTeams/TwoTeams';
import styles from './Home.module.css';
import AllQuestions from '../components/AllQuestions/AllQuestions';
import commons from '../lib/commons.js';
import Head from 'next/head';
import GameControls from '../components/GameControls/GameControls';
import DataManager from '../components/DataManager/DataManager';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Admin Panel | {commons.gameTitle}</title>
      </Head>
      <h1>{commons.gameTitle}</h1>
      <section>
        <GameControls />
      </section>
      <section>
        <h1>Team scores</h1>
        <TwoTeams />
      </section>
      <section>
        <h2>Questions</h2>
        <AllQuestions />
      </section>
      <section className={styles.adminZone}>
        <DataManager />
      </section>
    </Layout>
  );
}
