import commons from '../../lib/commons';
import { useGame } from '../../lib/gameHooks';
import styles from './DisplayGame.module.css';
import GameError from '../GameError/GameError';
import DisplayQuestion from './components/DisplayQuestion/DisplayQuestion';
import { Game } from '@prisma/client';
import DisplayTeamStatuses from './components/DisplayTeamStatuses/DisplayTeamStatuses';
import DisplayFinale from './components/DisplayFinale/DisplayFinale';

function Frame({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default function DisplayGame() {
  const { game, isError, isLoading } = useGame();

  if (isError) {
    return (
      <Frame>
        <GameError
          title="Error getting game status 💔"
          errorDetails={isError}
        />
      </Frame>
    );
  }

  if (isLoading) {
    return <Frame>Checking game status...</Frame>;
  }

  if (!game.inProgress) {
    return (
      <Frame>
        <p>waiting for</p>
        <h1
          style={{
            textAlign: 'center',
            color: 'var(--game-yellow)',
            fontSize: '2.5em',
          }}
        >
          {commons.gameTitle} 🕺
        </h1>
        <p>It's coming sooner than you think.</p>
        <p style={{ textAlign: 'center', fontSize: '2em' }}>
          That's right, it's {commons.gameTitle}
        </p>
      </Frame>
    );
  }

  return (
    <Frame>
      {game.inFinale && <DisplayFinale />}
      {!game.inFinale && (
        <>
          <DisplayQuestion questionId={game.questionId} />
          <DisplayTeamStatuses />
        </>
      )}
    </Frame>
  );
}
