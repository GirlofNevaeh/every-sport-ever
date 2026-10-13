import type { Star } from "./types";

const star = (
  slug: string,
  name: string,
  sports: string[],
  country: string,
  gender: "woman" | "man",
  facts: [string, string],
  flags?: { para?: boolean; specialOlympics?: boolean; disabled?: boolean },
): Star => ({
  slug,
  name,
  sports,
  country,
  gender,
  para: flags?.para ?? false,
  specialOlympics: flags?.specialOlympics ?? false,
  disabled: flags?.disabled ?? flags?.para ?? flags?.specialOlympics ?? false,
  facts,
});

export const stars: Star[] = [
  star("pele", "Pelé", ["football"], "Brazil", "man", [
    "He won the World Cup three times with Brazil.",
    "His full name is Edson Arantes do Nascimento.",
  ]),
  star("lionel-messi", "Lionel Messi", ["football"], "Argentina", "man", [
    "He was captain when Argentina won the World Cup in 2022.",
    "He is from Rosario in Argentina.",
  ]),
  star("marta", "Marta", ["football"], "Brazil", "woman", [
    "She has been named the world's best woman footballer six times.",
    "She has scored more goals at the Women's World Cup than any other player.",
  ]),
  star("simone-biles", "Simone Biles", ["gymnastics"], "United States", "woman", [
    "She won four gold medals at the Rio Olympic Games.",
    "She competes in artistic gymnastics for the United States.",
  ]),
  star("usain-bolt", "Usain Bolt", ["athletics"], "Jamaica", "man", [
    "He won the 100 metres and the 200 metres at three Olympic Games in a row.",
    "He is from Jamaica.",
  ]),
  star("serena-williams", "Serena Williams", ["tennis"], "United States", "woman", [
    "She has won 23 Grand Slam singles titles.",
    "She has also won Olympic gold medals in tennis.",
  ]),
  star("muhammad-ali", "Muhammad Ali", ["boxing"], "United States", "man", [
    "He won an Olympic gold medal in boxing in 1960.",
    "He was a world heavyweight champion three times.",
  ]),
  star("michael-jordan", "Michael Jordan", ["basketball"], "United States", "man", [
    "He won six NBA titles with the Chicago Bulls.",
    "He played basketball for the United States at the Olympic Games.",
  ]),
  star("sachin-tendulkar", "Sachin Tendulkar", ["cricket"], "India", "man", [
    "He scored 100 centuries in international cricket.",
    "He played for India for 24 years.",
  ]),
  star("roger-federer", "Roger Federer", ["tennis"], "Switzerland", "man", [
    "He has won 20 Grand Slam singles titles.",
    "He is from Switzerland.",
  ]),
  star("katie-ledecky", "Katie Ledecky", ["swimming"], "United States", "woman", [
    "She is famous for long freestyle races.",
    "She has won many Olympic gold medals for the United States.",
  ]),
  star("cathy-freeman", "Cathy Freeman", ["athletics"], "Australia", "woman", [
    "She won the 400 metres at the Sydney Olympic Games in 2000.",
    "She lit the flame at those Games.",
  ]),
  star("jesse-owens", "Jesse Owens", ["athletics"], "United States", "man", [
    "He won four gold medals at the 1936 Olympic Games.",
    "He raced sprints and won the long jump too.",
  ]),
  star("lewis-hamilton", "Lewis Hamilton", ["formula-1"], "Great Britain", "man", [
    "He has won seven Formula 1 world titles.",
    "He races for Great Britain.",
  ]),
  star(
    "ellie-simmonds",
    "Ellie Simmonds",
    ["swimming"],
    "Great Britain",
    "woman",
    [
      "She won Paralympic gold medals in swimming for Great Britain.",
      "She first won Paralympic gold when she was 13.",
    ],
    { para: true },
  ),
  star(
    "tanni-grey-thompson",
    "Tanni Grey-Thompson",
    ["athletics"],
    "Great Britain",
    "woman",
    [
      "She won many Paralympic gold medals in wheelchair racing.",
      "She raced on the track for Great Britain.",
    ],
    { para: true },
  ),
  star(
    "sarah-storey",
    "Sarah Storey",
    ["cycling", "swimming"],
    "Great Britain",
    "woman",
    [
      "She has won Paralympic gold medals in swimming and in cycling.",
      "She races and swims for Great Britain.",
    ],
    { para: true },
  ),
  star(
    "hannah-cockroft",
    "Hannah Cockroft",
    ["athletics"],
    "Great Britain",
    "woman",
    [
      "She has won many Paralympic gold medals in wheelchair racing.",
      "She races for Great Britain.",
    ],
    { para: true },
  ),
  star(
    "jessica-long",
    "Jessica Long",
    ["swimming"],
    "United States",
    "woman",
    [
      "She has won many Paralympic gold medals in swimming.",
      "She was born in Siberia and grew up in the United States.",
    ],
    { para: true },
  ),
  star(
    "loretta-claiborne",
    "Loretta Claiborne",
    ["athletics"],
    "United States",
    "woman",
    [
      "She has won many medals at Special Olympics in running.",
      "She speaks up so people with intellectual disabilities can play sport.",
    ],
    { specialOlympics: true },
  ),
  star("nadia-comaneci", "Nadia Comăneci", ["gymnastics"], "Romania", "woman", [
    "She scored a perfect 10 at the Olympic Games in 1976.",
    "She is from Romania.",
  ]),
  star("ellyse-perry", "Ellyse Perry", ["cricket", "football"], "Australia", "woman", [
    "She has played cricket and football for Australia.",
    "She was a teenager when she first played for the national cricket team.",
  ]),
  star("zhu-ting", "Zhu Ting", ["volleyball"], "China", "woman", [
    "She was a star attacker when China won Olympic volleyball gold.",
    "She plays volleyball for China.",
  ]),
  star("deng-yaping", "Deng Yaping", ["table-tennis"], "China", "woman", [
    "She won four Olympic gold medals in table tennis.",
    "She is from China.",
  ]),
  star("carolina-marin", "Carolina Marín", ["badminton"], "Spain", "woman", [
    "She won Olympic gold in badminton in 2016.",
    "She is from Spain.",
  ]),
  star("annika-sorenstam", "Annika Sörenstam", ["golf"], "Sweden", "woman", [
    "She won many major golf titles.",
    "She is from Sweden.",
  ]),
  star("saori-yoshida", "Saori Yoshida", ["wrestling"], "Japan", "woman", [
    "She won three Olympic gold medals in wrestling.",
    "She is from Japan.",
  ]),
  star("ryoko-tani", "Ryoko Tani", ["judo"], "Japan", "woman", [
    "She won Olympic gold medals in judo.",
    "She competed for Japan for many years.",
  ]),
  star("jade-jones", "Jade Jones", ["taekwondo"], "Great Britain", "woman", [
    "She won Olympic gold in taekwondo in 2012 and again in 2016.",
    "She is from Great Britain.",
  ]),
  star("hwang-kyung-seon", "Hwang Kyung-seon", ["taekwondo"], "South Korea", "woman", [
    "She won two Olympic gold medals in taekwondo.",
    "She is from South Korea.",
  ]),
  star("valentina-vezzali", "Valentina Vezzali", ["fencing"], "Italy", "woman", [
    "She won many Olympic gold medals in foil fencing.",
    "She is from Italy.",
  ]),
  star(
    "beatrice-vio",
    "Beatrice Vio",
    ["fencing"],
    "Italy",
    "woman",
    [
      "She has won Paralympic gold medals in wheelchair fencing.",
      "She fences for Italy.",
    ],
    { para: true },
  ),
  star("deepika-kumari", "Deepika Kumari", ["archery"], "India", "woman", [
    "She has been ranked number one in the world in archery.",
    "She shoots for India.",
  ]),
  star(
    "matt-stutzman",
    "Matt Stutzman",
    ["archery"],
    "United States",
    "man",
    [
      "He draws his bow with his feet.",
      "He has won a Paralympic medal in archery for the United States.",
    ],
    { para: true },
  ),
  star("lisa-carrington", "Lisa Carrington", ["canoeing"], "New Zealand", "woman", [
    "She has won many Olympic gold medals in canoe sprint.",
    "She is from New Zealand.",
  ]),
  star("birgit-fischer", "Birgit Fischer", ["canoeing"], "Germany", "woman", [
    "She won eight Olympic gold medals in canoeing.",
    "She is from Germany.",
  ]),
  star("luciana-aymar", "Luciana Aymar", ["field-hockey"], "Argentina", "woman", [
    "She was named the world's best field hockey player eight times.",
    "She played for Argentina.",
  ]),
  star("yuna-kim", "Yuna Kim", ["figure-skating"], "South Korea", "woman", [
    "She won Olympic gold in figure skating in 2010.",
    "She is from South Korea.",
  ]),
  star("yuzuru-hanyu", "Yuzuru Hanyu", ["figure-skating"], "Japan", "man", [
    "He won Olympic gold in men's figure skating two times.",
    "He is from Japan.",
  ]),
  star("mikaela-shiffrin", "Mikaela Shiffrin", ["skiing"], "United States", "woman", [
    "She has won more World Cup ski races than any other skier.",
    "She races in alpine skiing for the United States.",
  ]),
  star("chloe-kim", "Chloe Kim", ["snowboarding"], "United States", "woman", [
    "She has won Olympic gold in the snowboard halfpipe.",
    "She is from the United States.",
  ]),
  star(
    "bethany-hamilton",
    "Bethany Hamilton",
    ["surfing"],
    "United States",
    "woman",
    ["She is a surfer from Hawaii.", "She surfs with one arm."],
    { disabled: true },
  ),
  star("janja-garnbret", "Janja Garnbret", ["climbing"], "Slovenia", "woman", [
    "She won Olympic gold in sport climbing.",
    "She is from Slovenia.",
  ]),
  star("hidilyn-diaz", "Hidilyn Diaz", ["weightlifting"], "Philippines", "woman", [
    "She won Olympic gold in weightlifting in Tokyo.",
    "That gold was the first Olympic gold for the Philippines.",
  ]),
  star("maggie-steffens", "Maggie Steffens", ["water-polo"], "United States", "woman", [
    "She has won Olympic gold medals in water polo.",
    "She plays for the United States.",
  ]),
  star("flora-duffy", "Flora Duffy", ["triathlon"], "Bermuda", "woman", [
    "She won Olympic gold in the triathlon.",
    "She was Bermuda's first Olympic champion.",
  ]),
  star("liz-ellis", "Liz Ellis", ["netball"], "Australia", "woman", [
    "She captained Australia at the Netball World Cup.",
    "She is one of Australia's great goal shooters.",
  ]),
  star("irene-van-dyk", "Irene van Dyk", ["netball"], "New Zealand", "woman", [
    "She played more than 200 international netball matches.",
    "She played for South Africa and then for New Zealand.",
  ]),
  star("jennie-finch", "Jennie Finch", ["softball"], "United States", "woman", [
    "She was a star pitcher for the United States.",
    "She won Olympic gold in softball.",
  ]),
  star("cat-osterman", "Cat Osterman", ["softball"], "United States", "woman", [
    "She was a leading softball pitcher for the United States.",
    "She won Olympic gold in softball.",
  ]),
  star("kerri-walsh-jennings", "Kerri Walsh Jennings", ["beach-volleyball"], "United States", "woman", [
    "She won three Olympic gold medals in beach volleyball.",
    "She played with Misty May-Treanor for many of those wins.",
  ]),
  star("eve-muirhead", "Eve Muirhead", ["curling"], "Great Britain", "woman", [
    "She skipped Great Britain to Olympic gold in curling in 2022.",
    "She is from Scotland.",
  ]),
  star("nicol-david", "Nicol David", ["squash"], "Malaysia", "woman", [
    "She was world number one in squash for many years.",
    "She is from Malaysia.",
  ]),
  star("jahangir-khan", "Jahangir Khan", ["squash"], "Pakistan", "man", [
    "He once won 555 squash matches in a row.",
    "He is from Pakistan.",
  ]),
  star("sandra-sanchez", "Sandra Sánchez", ["karate"], "Spain", "woman", [
    "She won Olympic gold in karate kata.",
    "She is from Spain.",
  ]),
  star("ryo-kiyuna", "Ryo Kiyuna", ["karate"], "Japan", "man", [
    "He won Olympic gold in karate kata.",
    "He is from Japan.",
  ]),
  star("nicola-adams", "Nicola Adams", ["boxing"], "Great Britain", "woman", [
    "She won Olympic gold in boxing in 2012 and in 2016.",
    "She is from Great Britain.",
  ]),
  star(
    "oksana-masters",
    "Oksana Masters",
    ["rowing", "skiing", "cycling"],
    "United States",
    "woman",
    [
      "She has won Paralympic gold medals in cycling and in skiing.",
      "She has also raced in rowing for the United States.",
    ],
    { para: true },
  ),
  star("hayley-wickenheiser", "Hayley Wickenheiser", ["ice-hockey"], "Canada", "woman", [
    "She won several Olympic gold medals in ice hockey.",
    "She played for Canada.",
  ]),
  star("hannah-mills", "Hannah Mills", ["sailing"], "Great Britain", "woman", [
    "She won two Olympic gold medals in sailing.",
    "She sails for Great Britain.",
  ]),
  star("cora-staunton", "Cora Staunton", ["gaelic-football", "australian-rules"], "Ireland", "woman", [
    "She won four All-Ireland titles in ladies' Gaelic football.",
    "She also played Australian rules football.",
  ]),
  star("cristiano-ronaldo", "Cristiano Ronaldo", ["football"], "Portugal", "man", [
    "He has scored hundreds of goals for Portugal and his clubs.",
    "He is from Madeira in Portugal.",
  ]),
  star("lebron-james", "LeBron James", ["basketball"], "United States", "man", [
    "He has won NBA titles with three different teams.",
    "He has also won Olympic gold in basketball.",
  ]),
  star("michael-phelps", "Michael Phelps", ["swimming"], "United States", "man", [
    "He has won 23 Olympic gold medals in swimming.",
    "That is more Olympic gold medals than any other athlete.",
  ]),
  star("rafael-nadal", "Rafael Nadal", ["tennis"], "Spain", "man", [
    "He has won 22 Grand Slam singles titles.",
    "He is from Spain, and he is famous on clay courts.",
  ]),
  star("virat-kohli", "Virat Kohli", ["cricket"], "India", "man", [
    "He has scored many runs for India in every form of cricket.",
    "He has captained India.",
  ]),
  star("tiger-woods", "Tiger Woods", ["golf"], "United States", "man", [
    "He has won 15 major golf titles.",
    "He is from the United States.",
  ]),
  star("wayne-gretzky", "Wayne Gretzky", ["ice-hockey"], "Canada", "man", [
    "He scored more goals than any other player in the NHL.",
    "He is from Canada.",
  ]),
  star("tom-brady", "Tom Brady", ["american-football"], "United States", "man", [
    "He won seven Super Bowls.",
    "He played quarterback in American football.",
  ]),
  star("shohei-ohtani", "Shohei Ohtani", ["baseball"], "Japan", "man", [
    "He can pitch and he can hit. That is rare.",
    "He is from Japan and plays baseball in the United States.",
  ]),
  star("babe-ruth", "Babe Ruth", ["baseball"], "United States", "man", [
    "He hit 714 home runs.",
    "He is one of the most famous baseball players ever.",
  ]),
  star("richie-mccaw", "Richie McCaw", ["rugby-union"], "New Zealand", "man", [
    "He captained New Zealand to two Rugby World Cups.",
    "He played as a flanker.",
  ]),
  star("siya-kolisi", "Siya Kolisi", ["rugby-union"], "South Africa", "man", [
    "He captained South Africa to Rugby World Cup wins in 2019 and 2023.",
    "He was the first Black captain of the Springboks.",
  ]),
  star("ayrton-senna", "Ayrton Senna", ["formula-1"], "Brazil", "man", [
    "He won three Formula 1 world titles.",
    "He was from Brazil.",
  ]),
  star("teddy-riner", "Teddy Riner", ["judo"], "France", "man", [
    "He has won many Olympic gold medals in judo.",
    "He is from France.",
  ]),
  star("ma-long", "Ma Long", ["table-tennis"], "China", "man", [
    "He has won Olympic gold medals in table tennis.",
    "He is from China.",
  ]),
  star("lin-dan", "Lin Dan", ["badminton"], "China", "man", [
    "He won Olympic gold in badminton two times.",
    "He is from China.",
  ]),
  star("kelly-slater", "Kelly Slater", ["surfing"], "United States", "man", [
    "He has won 11 world surfing titles.",
    "He is from Florida in the United States.",
  ]),
  star("yuto-horigome", "Yuto Horigome", ["skateboarding"], "Japan", "man", [
    "He won Olympic gold in street skateboarding.",
    "He is from Japan.",
  ]),
  star(
    "shaun-white",
    "Shaun White",
    ["snowboarding", "skateboarding"],
    "United States",
    "man",
    [
      "He won Olympic gold in the snowboard halfpipe three times.",
      "He also rode a skateboard at a high level.",
    ],
  ),
  star(
    "karch-kiraly",
    "Karch Kiraly",
    ["volleyball", "beach-volleyball"],
    "United States",
    "man",
    [
      "He won Olympic gold in indoor volleyball and in beach volleyball.",
      "He is from the United States.",
    ],
  ),
  star("steve-redgrave", "Steve Redgrave", ["rowing"], "Great Britain", "man", [
    "He won Olympic gold in rowing at five Games in a row.",
    "He rowed for Great Britain.",
  ]),
  star("ben-ainslie", "Ben Ainslie", ["sailing"], "Great Britain", "man", [
    "He won four Olympic gold medals in sailing.",
    "He sails for Great Britain.",
  ]),
  star("nikola-karabatic", "Nikola Karabatić", ["handball"], "France", "man", [
    "He won Olympic gold medals in handball with France.",
    "He is one of the game's great playmakers.",
  ]),
  star("mikkel-hansen", "Mikkel Hansen", ["handball"], "Denmark", "man", [
    "He has been named the world's best handball player.",
    "He plays for Denmark.",
  ]),
  star("greg-louganis", "Greg Louganis", ["diving"], "United States", "man", [
    "He won Olympic gold on both the springboard and the platform.",
    "He dived for the United States.",
  ]),
  star("tom-daley", "Tom Daley", ["diving"], "Great Britain", "man", [
    "He won Olympic gold in diving.",
    "He dives for Great Britain.",
  ]),
  star("michael-jung", "Michael Jung", ["equestrian"], "Germany", "man", [
    "He has won Olympic gold in eventing.",
    "He rides for Germany.",
  ]),
  star(
    "lee-pearson",
    "Lee Pearson",
    ["equestrian"],
    "Great Britain",
    "man",
    [
      "He has won many Paralympic gold medals in dressage.",
      "He rides for Great Britain.",
    ],
    { para: true },
  ),
  star("pardeep-narwal", "Pardeep Narwal", ["kabaddi"], "India", "man", [
    "He was a famous raider in Pro Kabaddi.",
    "He plays kabaddi for India.",
  ]),
  star("anup-kumar", "Anup Kumar", ["kabaddi"], "India", "man", [
    "He captained India and a top Pro Kabaddi team.",
    "He is a well-known kabaddi leader.",
  ]),
  star("hakuho-sho", "Hakuho Sho", ["sumo"], "Mongolia", "man", [
    "He won more top-division sumo titles than anyone else.",
    "He was born in Mongolia and wrestled in Japan.",
  ]),
  star("asashoryu", "Asashoryu", ["sumo"], "Mongolia", "man", [
    "He was a yokozuna, the highest rank in sumo.",
    "He was born in Mongolia.",
  ]),
  star("eddie-betts", "Eddie Betts", ["australian-rules"], "Australia", "man", [
    "He kicked many famous goals in the AFL.",
    "He played for Carlton and for Adelaide.",
  ]),
  star("colm-cooper", "Colm Cooper", ["gaelic-football"], "Ireland", "man", [
    "He won several All-Ireland titles with Kerry.",
    "He is one of Kerry's great forwards.",
  ]),
  star("mal-meninga", "Mal Meninga", ["rugby-league"], "Australia", "man", [
    "He captained Australia in rugby league.",
    "He was a powerful runner and a goal kicker.",
  ]),
  star(
    "sam-burgess",
    "Sam Burgess",
    ["rugby-league", "rugby-union"],
    "England",
    "man",
    [
      "He played rugby league for England and won an NRL title.",
      "He also played rugby union for England.",
    ],
  ),
  star(
    "deion-sanders",
    "Deion Sanders",
    ["american-football", "baseball"],
    "United States",
    "man",
    [
      "He starred in American football and also played baseball.",
      "He won Super Bowls in the NFL.",
    ],
  ),
  star(
    "chris-nikic",
    "Chris Nikic",
    ["triathlon"],
    "United States",
    "man",
    [
      "He is a Special Olympics athlete.",
      "He was the first person with Down syndrome to finish an Ironman race.",
    ],
    { specialOlympics: true },
  ),
  star(
    "aleksandr-karelin",
    "Aleksandr Karelin",
    ["wrestling"],
    "Russia",
    "man",
    [
      "He won three Olympic gold medals in Greco-Roman wrestling.",
      "He is from Russia.",
    ],
  ),
];

export const starBySlug = new Map(stars.map((person) => [person.slug, person]));

export function getStar(slug: string) {
  return starBySlug.get(slug);
}

export function starsForSport(slug: string) {
  return stars.filter((person) => person.sports.includes(slug));
}
