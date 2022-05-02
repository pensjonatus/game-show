import { QuestionSetPrototype } from './types';
import { Team } from '@prisma/client';

type Sample = {
  teams: Team[];
  questionSet: QuestionSetPrototype;
};

const samples: Sample = {
  teams: [
    {
      id: '0',
      name: 'Nawigatorzy',
      avatarUrl:
        'https://upload.wikimedia.org/wikipedia/en/a/a3/Max_Pr%C3%BCss_-_Max_Pruss_Zeppelin_Navigator_Hindenburg.jpg',
    },
    {
      id: '1',
      name: 'Marcepan',
      avatarUrl:
        'https://images-gmi-pmc.edge-generalmills.com/26983a17-0396-4b63-8caa-2286669e788b.jpg',
    },
  ],
  questionSet: {
    setName: 'Sample questions',
    questions: [
      {
        question: 'What animal am I thinking of?',
        answers: [
          {
            answer: 'Dog',
            points: 50,
          },
          {
            answer: 'Cat',
            points: 36,
          },
          {
            answer: 'Pony',
            points: 11,
          },
          {
            answer: 'Chinchilla',
            points: 10,
          },
          {
            answer: 'Cow',
            points: 1,
          },
        ],
      },
      {
        question: 'Who is your real dad?',
        answers: [
          {
            answer: 'Slenderman',
            points: 50,
          },
          {
            answer: 'Guy from Back Rooms',
            points: 36,
          },
          {
            answer: 'Eddie Scissorhands',
            points: 11,
          },
          {
            answer: 'Beetle Juice',
            points: 10,
          },
          {
            answer: 'Jason',
            points: 1,
          },
        ],
      },
      {
        question: 'Why do people love technical writing?',
        answers: [
          {
            answer: 'Free coffee',
            points: 50,
          },
          {
            answer: 'No time to think about real life',
            points: 36,
          },
          {
            answer: 'Love writing',
            points: 11,
          },
          {
            answer: 'Forced into it',
            points: 10,
          },
          {
            answer: 'Inherited the job',
            points: 1,
          },
        ],
      },
    ],
  },
};

export default samples;
