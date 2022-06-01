import { QuestionType, Round } from '@prisma/client';
import { Sample } from './types';

const samples: Sample = {
  game: {
    id: '0',
    inProgress: false,
    questionId: undefined,
    inFinale: false,
    finaleTeamId: undefined,
    finaleRound: Round.ROUND_ONE,
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
          answer: 'Oxygen XML',
          points: 17,
        },
        {
          answer: 'CMS/CCMS',
          points: 28,
        },
        {
          answer: 'MadCap Flare',
          points: 14,
        },
        {
          answer: 'Confluence',
          points: 10,
        },
        {
          answer: 'Markdown editor',
          points: 14,
        },
        {
          answer: 'Visual Studio Code',
          points: 10,
        },
        {
          answer: 'MS Word',
          points: 7,
        },
      ],
    },
    {
      question: 'A reason for becoming a tech writer',
      type: QuestionType.TRUE_FALSE,
      answers: [
        {
          answer: 'Love writing',
          points: 38,
        },
        {
          answer: 'Parents forced me',
          points: 0,
        },
        {
          answer: 'Money',
          points: 28,
        },
        {
          answer: 'Job that combines language and technology',
          points: 14,
        },
        {
          answer: 'Want to travel',
          points: 0,
        },
        {
          answer: 'Technology is king!',
          points: 17,
        },
        {
          answer: 'Free coffee!!!',
          points: 17,
        },
        {
          answer: 'Helping people',
          points: 3,
        },
      ],
    },
    {
      question: 'A programming language',
      type: QuestionType.SINGLE,
      answers: [
        {
          answer: 'JavaScript',
          points: 13,
        },
        {
          answer: 'C++',
          points: 11,
        },
        {
          answer: 'Python',
          points: 41,
        },
        {
          answer: 'Java',
          points: 25,
        },
        {
          answer: 'XML',
          points: 10,
        },
      ],
    },
    {
      question: 'A job title for a person who creates documentation',
      type: QuestionType.SINGLE,
      answers: [
        {
          answer: 'Technical Writer',
          points: 55,
        },
        {
          answer: 'Content Designer',
          points: 12,
        },
        {
          answer: 'Author',
          points: 12,
        },
        {
          answer: 'Information Developer',
          points: 12,
        },
        {
          answer: 'Documentation Specialist',
          points: 9,
        },
      ],
    },
    {
      question: 'A music genre for writing docs',
      type: QuestionType.DOUBLE,
      answers: [
        {
          answer: 'Metal',
          points: 17,
        },
        {
          answer: 'Classical',
          points: 14,
        },
        {
          answer: 'Rock',
          points: 28,
        },
        {
          answer: 'Rap',
          points: 7,
        },
        {
          answer: 'Electronic',
          points: 34,
        },
      ],
    },
    {
      question: 'A popular word in technical documentation',
      type: QuestionType.TRUE_FALSE,
      answers: [
        {
          answer: 'Content',
          points: 40,
        },
        {
          answer: 'Review',
          points: 20,
        },
        {
          answer: 'Delta',
          points: 0,
        },
        {
          answer: 'Misconfigured',
          points: 0,
        },
        {
          answer: 'Select',
          points: 60,
        },
        {
          answer: 'Click',
          points: 80,
        },
        {
          answer: 'Robust',
          points: 0,
        },
        {
          answer: 'Giant',
          points: 0,
        },
        {
          answer: 'Guide',
          points: 40,
        },
      ],
    },
    {
      question: 'A documentation output format',
      type: QuestionType.TRIPLE,
      answers: [
        {
          answer: 'HTML',
          points: 17,
        },
        {
          answer: 'PDF',
          points: 14,
        },
        {
          answer: 'Markdown',
          points: 28,
        },
        {
          answer: 'XML',
          points: 7,
        },
        {
          answer: 'HTML',
          points: 34,
        },
        {
          answer: 'DOCX',
          points: 1,
        },
      ],
    },
    {
      question: 'A common language error in documentation',
      type: QuestionType.TRUE_FALSE,
      answers: [
        {
          answer: 'Incorrect/missing article',
          points: 25,
        },
        {
          answer: 'Incorrect spelling',
          points: 18,
        },
        {
          answer: "Captain Kirk's infinitive",
          points: 0,
        },
        {
          answer: 'No serial comma',
          points: 18,
        },
        {
          answer: 'Oxford comma',
          points: 0,
        },
        {
          answer: 'Typo',
          points: 27,
        },
        {
          answer: 'Puns',
          points: 0,
        },
        {
          answer: 'Run-on sentence',
          points: 0,
        },
        {
          answer: 'Passive voice',
          points: 12,
        },
      ],
    },
    {
      question: 'An obstacle for delivering documentation on time',
      type: QuestionType.FINALE,
      answers: [
        {
          answer: 'Too much work',
          points: 23,
        },
        {
          answer: 'No product',
          points: 14,
        },
        {
          answer: 'Scope change',
          points: 15,
        },
        {
          answer: 'SMEs',
          points: 31,
        },
        {
          answer: 'CMS crash',
          points: 12,
        },
        {
          answer: 'Project manager ',
          points: 5,
        },
      ],
    },
    {
      question: 'A style rule for writing documentation',
      type: QuestionType.FINALE,
      answers: [
        {
          answer: 'Use serial comma',
          points: 21,
        },
        {
          answer: 'Minimalism',
          points: 12,
        },
        {
          answer: 'Simplicity',
          points: 18,
        },
        {
          answer: 'Be consistent',
          points: 16,
        },
        {
          answer: 'Be concise',
          points: 33,
        },
      ],
    },
    {
      question: 'A DITA tag',
      type: QuestionType.FINALE,
      answers: [
        {
          answer: 'topic',
          points: 28,
        },
        {
          answer: 'conref',
          points: 22,
        },
        {
          answer: 'section',
          points: 21,
        },
        {
          answer: 'p',
          points: 18,
        },
        {
          answer: 'dita',
          points: 11,
        },
      ],
    },
    {
      question: 'A tool for generating static sites',
      type: QuestionType.FINALE,
      answers: [
        {
          answer: 'Jekyll',
          points: 30,
        },
        {
          answer: 'WordPress',
          points: 18,
        },
        {
          answer: 'Docusaurus',
          points: 31,
        },
        {
          answer: 'Hugo',
          points: 16,
        },
        {
          answer: 'Your CCSM',
          points: 5,
        },
      ],
    },
    {
      question: 'A punctuation mark in English',
      type: QuestionType.FINALE,
      answers: [
        {
          answer: 'Dash',
          points: 24,
        },
        {
          answer: 'Comma',
          points: 28,
        },
        {
          answer: 'Full stop',
          points: 22,
        },
        {
          answer: 'Semicolon',
          points: 10,
        },
        {
          answer: 'Question mark',
          points: 16,
        },
      ],
    },
  ],
};

export default samples;
