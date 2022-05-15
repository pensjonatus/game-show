import { Sample } from './types';

const samples: Sample = {
  game: {
    id: '0',
    inProgress: false,
    questionId: undefined,
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
      question: 'An animal that is often on my mind',
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
      question: 'A famous scary guy',
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
      question: 'The reason people go into technical writing',
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
    {
      question: 'An alternative to DITA',
      answers: [
        {
          answer: 'Markdown',
          points: 33,
        },
        {
          answer: 'FrameMaker',
          points: 34,
        },
        {
          answer: 'Literally anything',
          points: 11,
        },
      ],
    },
  ],
};

export default samples;
