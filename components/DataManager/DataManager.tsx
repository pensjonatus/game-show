import clsx from 'clsx';
import { useState } from 'react';
import samples from '../../lib/samples';

export default function DataManager() {
  const [initializing, setInitializing] = useState(false);

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

  async function initializeData() {
    if (!initializing) {
      setInitializing(true);
      await postToEndpoint('/api/teams', samples.teams);
      await postToEndpoint('/api/questions', samples.questions);
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
    </>
  );
}
