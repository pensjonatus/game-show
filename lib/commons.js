const commons = {
  gameTitle: 'S.U.P.E.R. G.A.M.E.',
  gameCommands: {
    start: 0,
    stop: 1,
    setQuestion: 2,
    toggleFinale: 3,
    setFinaleTeam: 4,
  },
  questionCommands: {
    setPlayerAnswer: 0,
    setScoreAwarded: 1,
  },
  answerCommands: {
    toggleIsRevealed: 0,
    setPointsAlreadyGiven: 1,
  },
  teamCommands: {
    addPoints: 0,
    setChancesLost: 1,
  },
};

export default commons;
