import Head from 'next/head';
import commons from '../../lib/commons';
import GameInProgress from '../../components/GameInProgress/GameInProgress';

export default function Game() {
  return (
    <>
      <Head>
        <title>Game in progress | {commons.gameTitle}</title>
      </Head>
      <main style={{ height: '100vh', width: '100vw' }}>
        <GameInProgress />
      </main>
    </>
  );
}
