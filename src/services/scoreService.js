import { matchRules } from "../constants/matchRules";
let timer;
let batting = "Team-A";
let overs = 0;
let deliveries = [];
let bowledOvers = [];
let runs = 0;
let target = 0;
let wickets = 0;
let extras = 0;
let innings = [];
const bowl = () => {
  const random = Math.floor(Math.random() * (10 - 0) + 0);
  const scored = matchRules.score[random];
  validateDelivery(scored);
};

const validateDelivery = (delivery) => {
  runs += delivery.value;
  deliveries.push(delivery);
  switch (delivery.scored) {
    case "out": {
      wickets++;
      break;
    }
    case "nb": {
      extras += delivery.value;
      break;
    }
    case "wd": {
      extras++;
      break;
    }
  }
  if (isMatchFinished()) validateInnings();
  // console.log(
  //   `batting:${batting}-runs:${runs}-wickets:${wickets}-delivery:${JSON.stringify(
  //     delivery
  //   )}-extras:${extras}-ballsBowled-${deliveries.length}`
  // );
  console.log(`${JSON.stringify(delivery)}`);
};

const validateInnings = () => {
  saveInnings();
};
const saveInnings = () => {
  innings.push({
    batting: batting,
    runs: runs,
    deliveries: deliveries,
    extras: extras,
    wickets: wickets,
  });
  if (batting === "Team-A") {
    target = runs + 1;
    batting = "Team-B";
    resetInnings();
  } else {
    saveMatch();
  }
};
const resetInnings = () => {
  runs = 0;
  deliveries = [];
  wickets = 0;
  extras = 0;
};
const saveMatch = () => {
  innings[batting] = { runs: runs, deliveries: deliveries };
  // resetInnings();
  pauseScore();
};
const isMatchFinished = () => {
  const legalDeliveries = getLegalDeliveries();
  return (
    legalDeliveries.length === matchRules.overs * 6 ||
    wickets === matchRules.wickets ||
    (target > 0 && runs > target)
  );
};

const getLegalDeliveries = () => {
  return deliveries.filter(
    (over) => !(over.scored === "nb" || over.scored === "wd")
  );
};
export function generateScore(frequency) {
  timer = setInterval(bowl, frequency);
}

export function pauseScore() {
  clearInterval(timer);
}

export function displayScore() {
  return {
    innings: innings,
    runs: runs,
    wickets: wickets,
    extras: extras,
    rr: runs / 6,
    deliveries: deliveries.map((delivery) => {
      return { value: delivery.value };
    }),
    overs:
      (getLegalDeliveries().length / 6 > 1
        ? Math.round(getLegalDeliveries().length / 6)
        : 0) +
      "." +
      (getLegalDeliveries().length % 6),
    target: target,
    batting: batting,
    winner:
      batting === "Team-A"
        ? "Match In Progress"
        : !isMatchFinished()
        ? `Team-B Needs ${target - runs} to win from ${
            matchRules.overs * 6 - getLegalDeliveries().length
          } balls`
        : runs > target
        ? `Team-B Won by ${matchRules.wickets - wickets} Wickets`
        : `Team-A Won by ${target - runs - 1} Runs`,
  };
}
