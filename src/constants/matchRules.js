export const matchRules = {
  score: [
    { scored: "0", value: 0 },
    { scored: "1", value: 1 },
    { scored: "2", value: 2 },
    { scored: "3", value: 3 },
    { scored: "4", value: 4 },
    { scored: "5", value: 5 },
    { scored: "6", value: 6 },
    { scored: "nb", value: Math.floor(Math.random() * (6 - 0) + 0) },
    { scored: "wd", value: 1 },
    { scored: "out", value: 0 },
  ],
  overs: 1,
  innings: 2,
  wickets: 10,
  deliveries: 6,
};
