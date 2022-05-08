import React from 'react';
import Layout from '../components/Layout';
import samples from '../lib/samples';
import TwoTeams from '../components/TwoTeams/TwoTeams';
import styles from './Home.module.css';
import AllQuestions from '../components/AllQuestions/AllQuestions';
import commons from '../lib/commons.js';
import Head from 'next/head';
import GameControls from '../components/GameControls/GameControls';

export default function Home(props) {
  async function postToEndpoint(endpointUrl, data) {
    const result = await fetch(endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (result.ok) {
      const json = await result.json();
      console.log(json);
    } else {
      console.error('POST did not succeed', endpointUrl, result);
    }
  }

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
        <h2>Manage data</h2>
        <button onClick={() => postToEndpoint('/api/teams', samples.teams)}>
          Add sample teams
        </button>
        <button
          onClick={() => postToEndpoint('/api/questions', samples.questions)}
        >
          Add sample questions
        </button>
      </section>
    </Layout>
  );
}
