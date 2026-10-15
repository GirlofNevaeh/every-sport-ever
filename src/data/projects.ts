export type TaskCard = {
  title: string;
  time: string;
  need: string;
  steps: string[];
  done: string;
};

export type Project = {
  id: string;
  solo: TaskCard;
  team: TaskCard;
};

export type Stage = {
  id: string;
  name: string;
  years: string;
  projects: Project[];
};

export const stages: Stage[] = [
  {
    id: "p1",
    name: "Age 5-6",
    years: "About age 5 to 6",
    projects: [
      {
        id: "p1-a",
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
        id: "p1-b",
        solo: {
          title: "Draw a gold medal",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Draw a round medal.", "Colour it gold.", "Write one sport name."],
          done: "You have a medal with a sport name.",
        },
        team: {
          title: "Show the medals",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Show your medal.", "Say the sport name.", "Clap for each friend."],
          done: "Every child has shown a medal.",
        },
      },
      {
        id: "p1-c",
        solo: {
          title: "One quiet move",
          time: "15 minutes",
          need: "A safe space to move",
          steps: ["Pick a sport you know.", "Show one quiet move from that sport.", "Freeze when you hear stop."],
          done: "You showed one quiet move.",
        },
        team: {
          title: "Copy the move",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["One child shows a move.", "The team copies it.", "Take turns."],
          done: "The team copied each move.",
        },
      },
      {
        id: "p1-d",
        solo: {
          title: "Count the players",
          time: "15 minutes",
          need: "The Sports pages",
          steps: ["Pick one sport.", "Find how many people are on a team.", "Write the number."],
          done: "You can say the number.",
        },
        team: {
          title: "Our number list",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Each child picks a sport.", "Say the number of players.", "The team writes the numbers."],
          done: "The team has a list of numbers.",
        },
      },
      {
        id: "p1-e",
        solo: {
          title: "Draw a start",
          time: "15 minutes",
          need: "Paper and a pencil",
          steps: ["Draw a start line.", "Draw yourself at the line.", "Write the word go."],
          done: "Your drawing shows a start.",
        },
        team: {
          title: "Start together",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Stand behind a line.", "One child says go.", "Walk. Do not bump anyone."],
          done: "The team started together and stayed kind.",
        },
      },
      {
        id: "p1-f",
        solo: {
          title: "A team shirt",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Pick gold, green, or red.", "Draw a shirt in that colour.", "Write a team name."],
          done: "You have a shirt and a name.",
        },
        team: {
          title: "Say the team names",
          time: "15 minutes",
          need: "Your team and a safe space",
          steps: ["Show your shirt.", "Say your team name.", "The team says the name back."],
          done: "The team can say every name.",
        },
      },
    ],
  },
  {
    id: "p2",
    name: "Age 6-7",
    years: "About age 6 to 7",
    projects: [
      {
        id: "p2-a",
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
        id: "p2-b",
        solo: {
          title: "A rule in your words",
          time: "20 minutes",
          need: "The Sports pages",
          steps: ["Pick one sport.", "Read one rule.", "Write the rule in your own words."],
          done: "You have one rule in your own words.",
        },
        team: {
          title: "Guess the sport",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Read your rule to the team.", "The team says the sport.", "Fix the sentence if it is not clear."],
          done: "The team can name the sport from the sentence.",
        },
      },
      {
        id: "p2-c",
        solo: {
          title: "Name the place",
          time: "20 minutes",
          need: "Paper and the Sports pages",
          steps: ["Pick one sport.", "Read where people take part.", "Write the place."],
          done: "You can name the place.",
        },
        team: {
          title: "Guess from the place",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Say your place.", "The team guesses the sport.", "Tell them if they are right."],
          done: "The team guessed from the place.",
        },
      },
      {
        id: "p2-d",
        solo: {
          title: "A fair start line",
          time: "15 minutes",
          need: "Paper and a pencil",
          steps: ["Draw three children at a start line.", "Make the line the same for each child.", "Write one fair rule."],
          done: "Your picture shows a fair start.",
        },
        team: {
          title: "Try the fair start",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Use the fair rule.", "Start together.", "Talk about whether it felt fair."],
          done: "The team can say if the start was fair.",
        },
      },
      {
        id: "p2-e",
        solo: {
          title: "Two ball sports",
          time: "20 minutes",
          need: "The Sports pages",
          steps: ["Pick two sports that use a ball.", "Write one way they are the same.", "Draw the ball."],
          done: "You have one similarity and a drawing.",
        },
        team: {
          title: "One difference",
          time: "25 minutes",
          need: "Paper and a pencil",
          steps: ["Share your two sports.", "The team names one difference.", "Write that difference."],
          done: "The team has one similarity and one difference.",
        },
      },
      {
        id: "p2-f",
        solo: {
          title: "A player, not a real face",
          time: "25 minutes",
          need: "The Stars pages and paper",
          steps: ["Pick one star.", "Read one fact.", "Draw a player in that sport. Do not copy a real face."],
          done: "You can say the fact and show the drawing.",
        },
        team: {
          title: "Name the sport",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Show the drawing.", "Tell the fact.", "The team names the sport."],
          done: "The team can name the sport.",
        },
      },
    ],
  },
  {
    id: "p3",
    name: "Age 7-8",
    years: "About age 7 to 8",
    projects: [
      {
        id: "p3-a",
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
        id: "p3-b",
        solo: {
          title: "A sentence for a younger child",
          time: "20 minutes",
          need: "The Sports pages",
          steps: ["Pick a sport.", "Read how you score.", "Write one sentence a younger child can read."],
          done: "A younger child could read your sentence.",
        },
        team: {
          title: "Can we name it?",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Read your sentence.", "The team says the sport.", "Change a word if the team is stuck."],
          done: "The team can say how you score.",
        },
      },
      {
        id: "p3-c",
        solo: {
          title: "A kind rule",
          time: "15 minutes",
          need: "Paper and a pencil",
          steps: ["Pick a sport.", "Write one way to take part kindly.", "Write one thing you will not do."],
          done: "You have a kind rule and a stop rule.",
        },
        team: {
          title: "Score the kind way",
          time: "20 minutes",
          need: "Space to stand and a soft ball if the sport uses one",
          steps: ["Practise the kind way to score.", "Stop if anyone is bumped.", "Say the kind rule again."],
          done: "The team scored in a calm way.",
        },
      },
      {
        id: "p3-d",
        solo: {
          title: "Three places",
          time: "25 minutes",
          need: "Paper and the Sports pages",
          steps: ["Pick three sports.", "Write where each one happens.", "Circle the one you would like to try."],
          done: "You have three places and one circle.",
        },
        team: {
          title: "Inside or outside",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Read your three places.", "The team sorts them into inside or outside.", "A sport can be both."],
          done: "Each place has a group.",
        },
      },
      {
        id: "p3-e",
        solo: {
          title: "A tiny poster",
          time: "25 minutes",
          need: "Paper and a pencil",
          steps: ["Choose one sport.", "Write the name in big letters.", "Add how you win, in one sentence."],
          done: "The poster has a name and a win.",
        },
        team: {
          title: "Which poster is clear?",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Hold the posters up.", "Each child reads the win line.", "The team picks a clear poster and says why."],
          done: "The team can explain one clear poster.",
        },
      },
      {
        id: "p3-f",
        solo: {
          title: "One question",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Pick a sport.", "Write one question about the rules.", "Write the answer on the back."],
          done: "You have one question and one answer.",
        },
        team: {
          title: "Ask the team",
          time: "25 minutes",
          need: "Your team and a safe space",
          steps: ["Ask your question.", "The team tries to answer.", "Show the answer."],
          done: "The team heard the right answer.",
        },
      },
    ],
  },
  {
    id: "p4",
    name: "Age 8-9",
    years: "About age 8 to 9",
    projects: [
      {
        id: "p4-a",
        solo: {
      title: "Compare two sports",
      time: "25 minutes",
      need: "Paper and the Sports pages",
      steps: [
        "Pick two sports.",
        "Write one way they are the same.",
        "Write one way they are different.",
      ],
      done: "You have one similarity and one difference.",
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
        id: "p4-b",
        solo: {
          title: "Summer and winter",
          time: "25 minutes",
          need: "Paper and the Sports pages",
          steps: ["Pick one summer sport and one winter sport.", "Write where each one happens.", "Write one way the places differ."],
          done: "You can tell summer from winter.",
        },
        team: {
          title: "Add to the lists",
          time: "25 minutes",
          need: "The Sports pages",
          steps: ["Share your pair.", "The team adds one more sport to each list.", "Check the Sports pages if you are unsure."],
          done: "The team has a summer list and a winter list.",
        },
      },
      {
        id: "p4-c",
        solo: {
          title: "Two ways to score a goal",
          time: "25 minutes",
          need: "The Sports pages",
          steps: ["Find two sports that score with a goal.", "Write both names.", "Write what a goal means in each."],
          done: "You can compare two goals.",
        },
        team: {
          title: "One comparison",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Read your pair.", "The team says if the goals are the same idea.", "Write one sentence together."],
          done: "The team has one comparison sentence.",
        },
      },
      {
        id: "p4-d",
        solo: {
          title: "A star's country",
          time: "20 minutes",
          need: "The Stars pages and paper",
          steps: ["Pick one star.", "Write the country.", "Write one fact in your own words."],
          done: "You can say the country and the fact.",
        },
        team: {
          title: "Guess the star",
          time: "25 minutes",
          need: "Your team and a safe space",
          steps: ["Read the fact, but not the name.", "The team guesses the star.", "Then say the name and the country."],
          done: "The team tried a guess.",
        },
      },
      {
        id: "p4-e",
        solo: {
          title: "Put the rules in order",
          time: "25 minutes",
          need: "Paper and the Sports pages",
          steps: ["Pick a sport.", "Copy three rules.", "Number them in an order that makes sense."],
          done: "Your rules are in order.",
        },
        team: {
          title: "Put them back",
          time: "25 minutes",
          need: "Your team and a safe space",
          steps: ["Read the rules out of order.", "The team puts them back in your order.", "Talk about why that order helps."],
          done: "The team can explain the order.",
        },
      },
      {
        id: "p4-f",
        solo: {
          title: "Teach one word",
          time: "15 minutes",
          need: "The Sports pages",
          steps: ["Pick a sport word, such as lane, set, or try.", "Read what it means on the Sports pages.", "Write the meaning in one sentence."],
          done: "You can teach the word.",
        },
        team: {
          title: "Use the word",
          time: "20 minutes",
          need: "Your team and a safe space",
          steps: ["Teach the word.", "The team uses it in a sentence.", "Fix the sentence if the meaning slips."],
          done: "The team used the word correctly.",
        },
      },
    ],
  },
  {
    id: "p5",
    name: "Age 9-10",
    years: "About age 9 to 10",
    projects: [
      {
        id: "p5-a",
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
        id: "p5-b",
        solo: {
          title: "Two stars, one sport",
          time: "25 minutes",
          need: "The Stars pages and paper",
          steps: ["Pick two stars from the same sport.", "Write one fact about each.", "Write one way they are different."],
          done: "You can tell the two stars apart.",
        },
        team: {
          title: "Name both stars",
          time: "25 minutes",
          need: "Your team and a safe space",
          steps: ["Read the two facts.", "The team guesses the sport.", "Then name both stars."],
          done: "The team named the sport and the stars.",
        },
      },
      {
        id: "p5-c",
        solo: {
          title: "Two truths and one trick",
          time: "25 minutes",
          need: "Paper and the Sports pages",
          steps: ["Write two true sentences about one sport.", "Write one made-up sentence.", "Mark the made-up one on the back."],
          done: "You have two truths and one trick.",
        },
        team: {
          title: "Find the trick",
          time: "25 minutes",
          need: "Your team and a safe space",
          steps: ["Read the three sentences.", "The team votes for the made-up one.", "Show the mark and talk about the clue."],
          done: "The team can say which sentence was made up.",
        },
      },
      {
        id: "p5-d",
        solo: {
          title: "A one-minute talk",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Pick a sport or a star.", "Write three short lines to say.", "Practise once, quietly."],
          done: "You can speak for about a minute.",
        },
        team: {
          title: "Listen to every talk",
          time: "30 minutes",
          need: "Your team and a safe space",
          steps: ["Each child gives the talk.", "The team names one clear line.", "No one interrupts."],
          done: "Every child has spoken.",
        },
      },
      {
        id: "p5-e",
        solo: {
          title: "Two meanings of a medal",
          time: "25 minutes",
          need: "The Games pages and paper",
          steps: ["Read about the Olympic Games and the Special Olympics.", "Write what a gold medal means at each.", "Keep the two meanings apart."],
          done: "You can say the two meanings.",
        },
        team: {
          title: "Check the meanings",
          time: "25 minutes",
          need: "The Games pages and paper",
          steps: ["Share your sentences.", "The team checks that Special Olympics is not a country table.", "Fix any mix-up."],
          done: "The team kept the two Games apart.",
        },
      },
      {
        id: "p5-f",
        solo: {
          title: "A three-question card",
          time: "30 minutes",
          need: "Paper for five questions",
          steps: ["Write three questions from the Sports or Stars pages.", "Write the answers on another sheet.", "Number them."],
          done: "You have a three-question card.",
        },
        team: {
          title: "Swap the cards",
          time: "30 minutes",
          need: "Your team and a safe space",
          steps: ["Swap cards with another pair.", "Answer the questions.", "Mark them together."],
          done: "Another pair has tried your card.",
        },
      },
    ],
  },
  {
    id: "p6",
    name: "Age 10-11",
    years: "About age 10 to 11",
    projects: [
      {
        id: "p6-a",
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
        id: "p6-b",
        solo: {
          title: "Two differences",
          time: "25 minutes",
          need: "The Games pages and paper",
          steps: ["Read the Paralympics page.", "Read the Special Olympics page.", "Write two differences."],
          done: "You can explain two differences.",
        },
        team: {
          title: "One clean list",
          time: "25 minutes",
          need: "Paper and a pencil",
          steps: ["Put your differences in one list.", "Cut any repeat.", "Read the list aloud if you are asked."],
          done: "The team has a clean list of differences.",
        },
      },
      {
        id: "p6-c",
        solo: {
          title: "A fair group",
          time: "20 minutes",
          need: "Paper and a pencil",
          steps: ["Think of a class race.", "Write how you would group children of similar skill.", "Say why the groups are fair."],
          done: "You have a fair grouping idea.",
        },
        team: {
          title: "Choose one plan",
          time: "30 minutes",
          need: "Paper and your team",
          steps: ["Compare your ideas.", "Choose one plan.", "Write how you score, with no rough play."],
          done: "The team has one fair plan.",
        },
      },
      {
        id: "p6-d",
        solo: {
          title: "A sport near school",
          time: "25 minutes",
          need: "Paper and a pencil",
          steps: ["Pick a sport people can try near your school.", "Write where it happens.", "Write what a beginner needs."],
          done: "You have a local idea.",
        },
        team: {
          title: "A first step",
          time: "25 minutes",
          need: "Paper and your team",
          steps: ["Share your sport.", "The team picks one you could try safely.", "Write the first step."],
          done: "The team has a first step.",
        },
      },
      {
        id: "p6-e",
        solo: {
          title: "Two countries, one sport",
          time: "25 minutes",
          need: "The Stars pages and paper",
          steps: ["Pick two stars from different countries in one sport.", "Write each country.", "Write one fact each."],
          done: "You can name both countries.",
        },
        team: {
          title: "Match the facts",
          time: "25 minutes",
          need: "Your team and a safe space",
          steps: ["Read the facts.", "The team names the sport.", "Then match each fact to a country."],
          done: "The team matched facts and countries.",
        },
      },
      {
        id: "p6-f",
        solo: {
          title: "A calm match report",
          time: "30 minutes",
          need: "Paper and a pencil",
          steps: ["Invent a short match in one sport.", "Write the score and who won.", "Do not describe a hit, a crash, or an injury."],
          done: "Your report has a score and a winner.",
        },
        team: {
          title: "Check the scoring",
          time: "25 minutes",
          need: "The Sports pages",
          steps: ["Read the reports.", "The team checks that the scoring matches the sport.", "Fix any mistake."],
          done: "The reports use the right way to score.",
        },
      },
    ],
  },
  {
    id: "p7",
    name: "Age 11-12",
    years: "About age 11 to 12",
    projects: [
      {
        id: "p7-a",
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
      {
        id: "p7-b",
        solo: {
          title: "A three-Games chart",
          time: "30 minutes",
          need: "The three Games pages and paper",
          steps: ["Make three headings: Olympic Games, Paralympics, Special Olympics.", "Under each, write who takes part and what a medal means.", "Do not rank Special Olympics countries."],
          done: "A reader can see three different events.",
        },
        team: {
          title: "Three agreed sentences",
          time: "30 minutes",
          need: "The three Games pages and paper",
          steps: ["Compare charts.", "Agree on one sentence for each Games.", "Check the Games pages."],
          done: "The team has three agreed sentences.",
        },
      },
      {
        id: "p7-c",
        solo: {
          title: "Three charter rules",
          time: "30 minutes",
          need: "Paper and a pencil",
          steps: ["Write three rules for a kind class sports day.", "Include a fair way to group skill.", "Include how you will score."],
          done: "You have three charter rules.",
        },
        team: {
          title: "One short charter",
          time: "30 minutes",
          need: "Paper and your team",
          steps: ["Merge your rules.", "Keep the list short.", "Sign it if the team agrees."],
          done: "The team has one short charter.",
        },
      },
      {
        id: "p7-d",
        solo: {
          title: "Five questions to host",
          time: "25 minutes",
          need: "Paper for five questions",
          steps: ["Write five quiz questions from this site.", "Mark the right answers on a separate sheet.", "Keep the questions short."],
          done: "You are ready to ask five questions.",
        },
        team: {
          title: "Host a short round",
          time: "40 minutes",
          need: "Your team and a safe space",
          steps: ["Take turns as the host.", "The others answer.", "The host shows the right answer after each question."],
          done: "The team has played a short round.",
        },
      },
      {
        id: "p7-e",
        solo: {
          title: "Explain a level score",
          time: "25 minutes",
          need: "Paper and the Sports pages",
          steps: ["Pick a sport that can end level.", "Write what a draw means.", "Write one way some matches break a tie."],
          done: "You can explain a level score.",
        },
        team: {
          title: "Is a draw allowed?",
          time: "25 minutes",
          need: "The Sports pages",
          steps: ["Share your sport.", "The team says if a draw is allowed.", "Write one clear sentence together."],
          done: "The team can explain the draw.",
        },
      },
      {
        id: "p7-f",
        solo: {
          title: "A plan that includes everyone",
          time: "30 minutes",
          need: "Paper and a pencil",
          steps: ["Plan teams for a class games hour.", "Group players of similar skill.", "Pick two sports and write how you win each."],
          done: "Your plan names groups and winners.",
        },
        team: {
          title: "One plan for the class",
          time: "40 minutes",
          need: "Paper and your team",
          steps: ["Build one plan from the best ideas.", "Make sure every child has a role.", "Write the start, the score, and the win."],
          done: "The plan includes everyone.",
        },
      },
    ],
  },
];
