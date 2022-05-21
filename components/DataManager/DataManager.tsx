import clsx from 'clsx';
import { useState } from 'react';
import { postToEndpoint } from '../../lib/helpers';
import samples from '../../lib/samples';
import GameError from '../GameError/GameError';
import styles from './DataManager.module.css';

export default function DataManager() {
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState(undefined);
  const [finalResult, setFinalResult] = useState(undefined);

  async function initializeData() {
    if (!initializing) {
      setInitializing(true);
      setError(undefined);
      const result = await postToEndpoint('/api/initialize', samples);

      if (!result.ok) {
        const problem = await result.json();
        setError(problem);
      } else {
        const json = await result.json();
        setFinalResult(json);
      }
      setInitializing(false);
    }
  }

  return (
    <>
      <h2>Manage data</h2>
      <button
        onClick={initializeData}
        className={clsx(initializing && 'disabledButton')}
      >
        Load data
      </button>
      {error && (
        <GameError title="Cannot initialize data 😖" errorDetails={error} />
      )}
      {finalResult && (
        <code className={styles.codeBlock}>
          <pre>{JSON.stringify(finalResult, null, 2)}</pre>
        </code>
      )}
    </>
  );
}
