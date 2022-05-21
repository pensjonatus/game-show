import useSWR, { SWRConfiguration } from 'swr';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AllQuestions, BackendError, QuestionWithAnswers } from './types';

type FetcherHandlers = {
  isLoading: any;
  isError: BackendError | undefined;
};

const options: SWRConfiguration = { refreshInterval: 1000 };
const fetcher = async (url) => await axios.get(url).then((res) => res.data);

function getData(endpoint: string, dataFieldName: string) {
  try {
    const { data, error } = useSWR(endpoint, fetcher, options);

    return {
      [dataFieldName]: data,
      isLoading: !error && !data,
      isError: error,
    };
  } catch (err) {
    const myErrorMessage = `Problem getting data
      Endpoint: ${endpoint}
      Data field name: ${dataFieldName}
      ERROR: ${err.message}`;
    return {
      [dataFieldName]: undefined,
      isLoading: false,
      isError: { message: myErrorMessage },
    };
  }
}

export function useGame() {
  return getData('/api/game/', 'game');
}

export function useTeams() {
  return getData('/api/teams', 'teams');
}

export function useTeam(teamId: string) {
  return getData(`/api/teams/${teamId}`, 'team');
}

type UseQuestionsShape = FetcherHandlers & {
  [x: string]: AllQuestions;
};

export function useQuestions(): UseQuestionsShape {
  return getData('/api/questions', 'questions');
}

export type UseQuestionShape = FetcherHandlers & {
  [x: string]: QuestionWithAnswers;
};

export function useQuestion(questionId: string): UseQuestionShape {
  return getData(`/api/questions/${questionId}`, 'question');
}

export function useAnswer(answerId: string) {
  return getData(`/api/answers/${answerId}`, 'answer');
}

export function useAudio(url) {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  function toggle() {
    setPlaying(!playing);
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle] as const;
}
