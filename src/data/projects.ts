export type TaskCard = {
  title: string;
  time: string;
  need: string;
  steps: string[];
  done: string;
};

export type Stage = {
  id: string;
  name: string;
  years: string;
  solo: TaskCard;
  team: TaskCard;
};

export const stages: Stage[] = [
  {
    id: "p1",
    name: "Primary 1",
    years: "About age 5 to 6",
    solo: {
      title: "Invent a playground game with one rule",
      time: "20 minutes",
      need: "Paper and a pencil",
      steps: [
        "Think of a game you can play outside.",
        "Write one rule in a short sentence.",
        "Draw the players.",
      ],
      done: "You have one rule and a drawing.",
    },
    team: {
      title: "Play the one-rule game",
      time: "20 minutes",
      need: "Your team and a safe space",
      steps: [
        "Read the one rule out loud.",
        "Play for ten minutes.",
        "Say if the rule was fair.",
      ],
      done: "The team played and talked about the rule.",
    },
  },
  {
    id: "p2",
    name: "Primary 2",
    years: "About age 6 to 7",
    solo: {
      title: "Say how a sport scores",
      time: "15 minutes",
      need: "The Sports pages",
      steps: [
        "Pick one sport.",
        "Read how you score.",
        "Write it in your own short sentence.",
      ],
      done: "You can say the score out loud.",
    },
    team: {
      title: "Teach a playground game",
      time: "25 minutes",
      need: "Your team and one ball or cone if you want it",
      steps: [
        "Invent a game with one rule.",
        "Teach the rule to the team.",
        "Play, then stop and say the rule again.",
      ],
      done: "Everyone can say the one rule.",
    },
  },
  {
    id: "p3",
    name: "Primary 3",
    years: "About age 7 to 8",
    solo: {
      title: "Make a rules card",
      time: "25 minutes",
      need: "A rules card page and a pencil",
      steps: [
        "Pick a sport.",
        "Copy up to four rules.",
        "Add how you score and how you win.",
      ],
      done: "The card has rules, the score, and the win.",
    },
    team: {
      title: "Show a score without rough play",
      time: "20 minutes",
      need: "Space to stand and a soft ball if the sport uses one",
      steps: [
        "Pick a sport.",
        "Act out how a point is scored.",
        "Keep hands kind. No rough play.",
      ],
      done: "The team can show the score in a calm way.",
    },
  },
  {
    id: "p4",
    name: "Primary 4",
    years: "About age 8 to 9",
    solo: {
      title: "Compare two sports",
      time: "25 minutes",
      need: "Paper and the Sports pages",
      steps: [
        "Pick two sports.",
        "Write one way they are the same.",
        "Write one way they are different.",
      ],
      done: "You have one same and one different.",
    },
    team: {
      title: "Sort the sports",
      time: "25 minutes",
      need: "Cards or a list of ten sports",
      steps: [
        "Pick ten sports.",
        "Sort them into ball, water, ice and snow, racquet, combat, and wheels.",
        "A sport can fit more than one group.",
      ],
      done: "Each sport sits in a group the team can explain.",
    },
  },
  {
    id: "p5",
    name: "Primary 5",
    years: "About age 9 to 10",
    solo: {
      title: "Two facts about a star",
      time: "20 minutes",
      need: "The Stars pages and paper",
      steps: [
        "Pick one star.",
        "Read the two facts.",
        "Write them in your own words.",
      ],
      done: "You can tell both facts without the page.",
    },
    team: {
      title: "Write a five-question quiz",
      time: "30 minutes",
      need: "Paper for five questions",
      steps: [
        "Use sports and stars you have read.",
        "Write five questions.",
        "Mark the right answer on a separate sheet.",
      ],
      done: "Another team can try the quiz.",
    },
  },
  {
    id: "p6",
    name: "Primary 6",
    years: "About age 10 to 11",
    solo: {
      title: "Olympic Games and Paralympics",
      time: "25 minutes",
      need: "The Games pages and paper",
      steps: [
        "Read the Olympic Games page.",
        "Read the Paralympics page.",
        "Write two ways they are different.",
      ],
      done: "You can explain the difference in a few sentences.",
    },
    team: {
      title: "A class medal table",
      time: "30 minutes",
      need: "A blank medal table",
      steps: [
        "Pick four teams in your class.",
        "Invent gold, silver, and bronze for a games day.",
        "Do not rank Special Olympics countries.",
      ],
      done: "The table has places, countries or teams, and medal numbers you made up for class.",
    },
  },
  {
    id: "p7",
    name: "Primary 7",
    years: "About age 11 to 12",
    solo: {
      title: "Three Games, three meanings",
      time: "30 minutes",
      need: "The three Games pages and paper",
      steps: [
        "Read about the Olympic Games, the Paralympics, and the Special Olympics.",
        "Write what each one is.",
        "Say what a medal means at the Special Olympics.",
      ],
      done: "A reader can see that the three events are not the same.",
    },
    team: {
      title: "Plan a fair class games day",
      time: "40 minutes",
      need: "Paper and your team",
      steps: [
        "Pick three sports.",
        "Group players of similar skill, like at the Special Olympics.",
        "Write how you score and how you win in each sport.",
      ],
      done: "The plan has groups, scores, and a way to win.",
    },
  },
];
