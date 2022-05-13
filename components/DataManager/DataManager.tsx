import clsx from 'clsx';
import { useState } from 'react';
import samples from '../../lib/samples';
import Error from '../Error/Error';

export default function DataManager() {
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState(undefined);

  async function initializeData() {
    if (!initializing) {
      setInitializing(true);
      setError(undefined);
      const endpointUrl = '/api/initialize';
      const result = await fetch(endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(samples),
      });

      if (result.ok) {
        const json = await result.json();
        console.log(json);
      } else {
        const problem = await result.json();
        console.error(problem);
        setError(problem);
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
      {error && <Error title="Cannot initialize data 😖" gameError={error} />}
    </>
  );
}
