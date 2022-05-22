import { QuestionType } from '@prisma/client';
import { Sample } from './types';

const samples: Sample = {
  game: {
    id: '0',
    inProgress: false,
    questionId: undefined,
    inFinale: false,
    finaleTeamId: undefined,
    finaleScore: 0,
  },
  teams: [
    {
      id: '0',
      name: 'Nawigatorzy',
      avatarUrl:
        'https://upload.wikimedia.org/wikipedia/en/a/a3/Max_Pr%C3%BCss_-_Max_Pruss_Zeppelin_Navigator_Hindenburg.jpg',
      score: 0,
      chancesLost: 0,
    },
    {
      id: '1',
      name: 'Marcepan',
      avatarUrl:
        'https://images-gmi-pmc.edge-generalmills.com/26983a17-0396-4b63-8caa-2286669e788b.jpg',
      score: 0,
      chancesLost: 0,
    },
  ],
  questions: [
    {
      question: 'A tool for writing documentation',
      type: QuestionType.SINGLE,
      answers: [
        {
          answer: 'Oxygen',
          points: 36,
        },
        {
          answer: 'DITA',
          points: 31,
        },
        {
          answer: 'Markdown',
          points: 21,
        },
        {
          answer: 'MS Word',
          points: 14,
        },
        {
          answer: 'RoboHelp',
          points: 1,
        },
      ],
    },
    {
      question: 'A reason for becoming a tech writer',
      type: QuestionType.TRUE_FALSE,
      answers: [
        {
          answer: 'Free coffee',
          points: 0,
        },
        {
          answer: 'Love writing',
          points: 11,
        },
        {
          answer: 'Like desks',
          points: 12,
        },
        {
          answer: 'Thomas Pynchon fan',
          points: 0,
        },
        {
          answer: 'Want to be a programmer',
          points: 1,
        },
      ],
    },
    {
      question: 'A music genre for writing docs',
      type: QuestionType.DOUBLE,
      answers: [
        {
          answer: 'Dub step',
          points: 30,
        },
        {
          answer: 'Jazz',
          points: 1,
        },
        { answer: 'Lo-fi beats', points: 26 },
      ],
    },
    {
      question: 'A popular word in technical documentation',
      type: QuestionType.TRIPLE,
      answers: [
        {
          answer: 'Upgrade',
          points: 30,
        },
        {
          answer: 'Install',
          points: 13,
        },
        {
          answer: 'Verify',
          points: 0,
        },
      ],
    },
    {
      question: 'A documentation output format',
      type: QuestionType.TRUE_FALSE,
      answers: [
        {
          answer: 'PDF',
          points: 98,
        },
        {
          answer: 'CHM',
          points: 32,
        },
        {
          answer: 'Markdown',
          points: 0,
        },
        {
          answer: 'HTML',
          points: 15,
        },
        {
          answer: 'DITA',
          points: 0,
        },
        {
          answer: 'troff',
          points: 0,
        },
        {
          answer: 'XML',
          points: 0,
        },
        {
          answer: 'webhelp',
          points: 3,
        },
      ],
    },
    {
      question: 'A common language error in documentation',
      type: QuestionType.TRUE_FALSE,
      answers: [
        { answer: 'Oxford comma', points: 0 },
        { answer: 'Hanging infinitive', points: 0 },
        { answer: 'Split infinitive', points: 14 },
        { answer: 'Passive voice', points: 23 },
        { answer: 'Contractions', points: 7 },
        { answer: 'Lowercase product name', points: 0 },
        { answer: 'No verb', points: 0 },
        { answer: 'Future tense', points: 27 },
        { answer: 'Run-on sentence', points: 0 },
      ],
    },
    {
      question: 'An obstacle for delivering documentation on time',
      type: QuestionType.FINALE,
      answers: [
        { answer: "SMEs don't respond", points: 30 },
        { answer: 'Last-minute changes', points: 24 },
        { answer: 'Too many changes', points: 19 },
        { answer: 'Started too late', points: 7 },
      ],
    },
    {
      question: 'A style rule for writing documentation',
      type: QuestionType.FINALE,
      answers: [
        { answer: 'No future', points: 26 },
        { answer: 'No passive voice', points: 25 },
        { answer: 'Short sentences', points: 22 },
        { answer: 'Use "you"', points: 10 },
      ],
    },
    {
      question: 'A DITA tag',
      type: QuestionType.FINALE,
      answers: [
        { answer: 'p', points: 30 },
        { answer: 'parmname', points: 31 },
        { answer: 'section', points: 14 },
        { answer: 'example', points: 5 },
      ],
    },
    {
      question: 'A tool for generating static sites',
      type: QuestionType.FINALE,
      answers: [
        { answer: 'Docusaurus', points: 99 },
        { answer: 'Saurudocus', points: 1 },
        { answer: 'Figmenstein', points: 2 },
        { answer: 'Blobobo', points: 3 },
      ],
    },
    {
      question: 'A punctuation mark in English',
      type: QuestionType.FINALE,
      answers: [
        { answer: 'full stop', points: 31 },
        { answer: 'comma', points: 28 },
        { answer: 'ampersand', points: 21 },
        { answer: 'semi-colon', points: 18 },
      ],
    },
    {
      question: 'A programming language',
      type: QuestionType.FINALE,
      answers: [
        { answer: 'Python', points: 55 },
        { answer: 'JavaScript', points: 10 },
        { answer: 'C++', points: 5 },
        { answer: 'Java', points: 7 },
      ],
    },
    {
      question: 'A job title for a person who creates documentation',
      type: QuestionType.FINALE,
      answers: [
        { answer: 'Technical writer', points: 30 },
        { answer: 'Technical author', points: 24 },
        { answer: 'Content creator', points: 23 },
        { answer: 'Documentation engineer', points: 21 },
      ],
    },
  ],
};

export default samples;
