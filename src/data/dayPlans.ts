/**
 * dayPlans.ts — Curated daily itineraries for visiting fans by country.
 *
 * This is the feature that makes golazo.nyc genuinely different:
 * not just "where to watch the game" but "how to spend your whole day/trip
 * in NYC as a fan from your country."
 *
 * TWO PLAN TYPES PER COUNTRY:
 * - match_day: What to do when your team plays (MetLife or watch party day)
 * - free_day: A full NYC day in your cultural comfort zone
 *
 * DATA MODEL:
 * Each stop has a time, emoji, venue name, address, description, and tip.
 * venueId optionally links to an entry in venues.ts for the Map view.
 *
 * TO ADD A NEW COUNTRY:
 * Copy the Argentina template and replace the content.
 * Countries without a plan fall back to a generic plan.
 */

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type PlanType = 'match_day' | 'free_day';

export interface DayPlanStop {
  time: string;           // "9:00 AM"
  timeOfDay: TimeOfDay;
  emoji: string;
  venueName: string;
  venueId?: string;       // links to venues.ts id
  address: string;
  description: string;
  tip?: string;
  type: 'food' | 'bar' | 'watch' | 'culture' | 'transit' | 'activity';
}

export interface DayPlan {
  id: string;
  countryName: string;
  planType: PlanType;
  title: string;
  subtitle: string;
  totalTime: string;      // "Full day"
  stops: DayPlanStop[];
}

// ─── ARGENTINA ────────────────────────────────────────────────────────────────

const argentinaMatchDay: DayPlan = {
  id: 'argentina-match-day',
  countryName: 'Argentina',
  planType: 'match_day',
  title: 'Match Day — Vamos Argentina',
  subtitle: 'From medialunas to the final whistle',
  totalTime: 'Full day',
  stops: [
    {
      time: '9:30 AM',
      timeOfDay: 'morning',
      emoji: '🥐',
      venueName: 'Nuchas — Times Square kiosk',
      venueId: 'argentina-nuchas-timessquare',
      address: '47th St & Broadway, Times Square, Manhattan',
      description: 'Start with medialunas and an empanada from the Argentine-founded kiosk. This is the closest thing to a Buenos Aires morning in NYC — grab one, walk around, feel at home.',
      tip: 'The Argentine beef empanada is the one. Cash or card, under $6.',
      type: 'food',
    },
    {
      time: '12:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🥩',
      venueName: 'Buenos Aires Restaurant',
      venueId: 'argentina-buenos-aires-ev',
      address: '513 E 6th St, East Village, Manhattan',
      description: 'Pre-match lunch at the most authentic Argentine restaurant in NYC. Owner Ismael Alba is from Argentina and designed the whole place around the feeling of a Buenos Aires parrilla. The skirt steak and chimichurri are mandatory.',
      tip: 'Make a reservation — it fills up fast on World Cup days. Sit in the back near the tango photos.',
      type: 'food',
    },
    {
      time: '2:30 PM',
      timeOfDay: 'afternoon',
      emoji: '🚇',
      venueName: 'East Village → Penn Station',
      address: 'Take L train to 8th Ave, then A/C/E to 34th St–Penn Station',
      description: 'Head to Penn Station for NJ Transit to MetLife. Buy your round-trip ticket at the machine BEFORE you board — lines are brutal after the match.',
      tip: 'Depart at least 90 minutes before kickoff. The platform gets packed.',
      type: 'transit',
    },
    {
      time: '5:00 PM',
      timeOfDay: 'evening',
      emoji: '⚽',
      venueName: 'MetLife Stadium',
      address: '1 MetLife Stadium Dr, East Rutherford, NJ',
      description: 'Kickoff. 82,500 fans. The Argentine supporters section will be one of the loudest in the stadium — find the blue and white flags and position yourself nearby even if you don\'t have a ticket to sit there.',
      tip: 'The Argentine community in NYC is extremely organized. Look for the supporters group flags outside Gate A before kickoff.',
      type: 'watch',
    },
    {
      time: 'Post-match',
      timeOfDay: 'night',
      emoji: '🥂',
      venueName: 'Balvanera',
      venueId: 'argentina-balvanera',
      address: '152 Stanton St, Lower East Side, Manhattan',
      description: 'Victory dinner or consolation drinks at this chef-driven Argentine restaurant on the Lower East Side. Named after a Buenos Aires barrio, it has the right soul for post-match reflection or celebration. The Malbec list is exceptional.',
      tip: 'No reservation? Show up anyway — they usually accommodate walk-ins at the bar. Monday is BYOB with no corkage.',
      type: 'food',
    },
  ],
};

const argentinaFreeDay: DayPlan = {
  id: 'argentina-free-day',
  countryName: 'Argentina',
  planType: 'free_day',
  title: 'A Day in Argentine NYC',
  subtitle: 'Coffee, asado, community — twice the steak',
  totalTime: 'Full day',
  stops: [
    {
      time: '9:00 AM',
      timeOfDay: 'morning',
      emoji: '☕',
      venueName: 'Nuchas — Greeley Square',
      venueId: 'argentina-nuchas-greeley',
      address: '97 W 32nd St, Greeley Square, Manhattan',
      description: 'Medialunas and coffee to start. Argentine founder Ariel Barbouth set this up specifically to give Argentines (and everyone else) a taste of home in NYC. Baked fresh, not fried.',
      tip: 'The medialunas are only available early morning. Get there before 10am.',
      type: 'food',
    },
    {
      time: '10:30 AM',
      timeOfDay: 'morning',
      emoji: '🚶',
      venueName: 'East Village walk',
      address: 'East 6th St between Ave A and Ave B, Manhattan',
      description: 'Walk the East Village — this is the informal Argentine hub of Manhattan. The Buenos Aires restaurant area on E 6th St has the highest concentration of Argentine expats, creatives, and Latin Americans in the city.',
      tip: 'Walk down St Marks Place and Avenue A — you\'ll hear Spanish constantly and see Messi jerseys on random Thursday mornings.',
      type: 'activity',
    },
    {
      time: '1:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🍖',
      venueName: 'Boca Juniors Restaurant',
      venueId: 'argentina-boca-juniors-elmhurst',
      address: '8108 Queens Blvd, Elmhurst, Queens',
      description: 'Take the 7 train to Elmhurst for the most immersive Argentine experience outside Manhattan. Named after the legendary club, decorated with jerseys and memorabilia, this is where Argentine families come for Sunday asado. The skirt steak and the parillada are the moves.',
      tip: 'Take the 7 train from Times Square to 82nd St–Jackson Hts, then walk. The 7 train on a weekend afternoon is its own Buenos Aires experience.',
      type: 'food',
    },
    {
      time: '3:30 PM',
      timeOfDay: 'afternoon',
      emoji: '🏘️',
      venueName: 'Jackson Heights explore',
      address: '37th Ave & 74th St, Jackson Heights, Queens',
      description: 'Walk Jackson Heights after lunch. This is the most diverse square mile on Earth — and has a growing Argentine and South American community. The 74th St food corridor has Argentine bakeries, empanada shops, and more.',
      tip: 'Chivito D\'Oro at 84-02 37th Ave is worth finding — it\'s Uruguayan but beloved by the South American community, serves great chivito sandwiches.',
      type: 'activity',
    },
    {
      time: '7:00 PM',
      timeOfDay: 'evening',
      emoji: '🍷',
      venueName: 'Balvanera',
      venueId: 'argentina-balvanera',
      address: '152 Stanton St, Lower East Side, Manhattan',
      description: 'Dinner at the most acclaimed Argentine restaurant in the city. Chef Fernando Navas trained at elBulli and Nobu but the food is unmistakably Argentine — provoleta, empanadas, perfect steak, and one of the best Malbec lists in NYC.',
      tip: 'Reserve in advance. Ask for a table near the French doors — they open to the street on warm nights and the vibe is exactly right.',
      type: 'food',
    },
    {
      time: '9:30 PM',
      timeOfDay: 'night',
      emoji: '💃',
      venueName: 'Tango night (check listings)',
      address: 'Various venues — check DNAtango.com for current events',
      description: 'Argentine tango is deeply embedded in NYC nightlife. There are milongas (tango social dances) almost every night of the week. No experience needed to watch, and many welcome beginners.',
      tip: 'La Nacional (239 W 14th St) sometimes hosts tango events in their back room. This is the oldest Spanish society in America — the vibe is extraordinary.',
      type: 'culture',
    },
  ],
};

// ─── BRAZIL ───────────────────────────────────────────────────────────────────

const brazilMatchDay: DayPlan = {
  id: 'brazil-match-day',
  countryName: 'Brazil',
  planType: 'match_day',
  title: 'Match Day — Vai Brasil',
  subtitle: 'Caipirinha before kickoff, churrasco after',
  totalTime: 'Full day',
  stops: [
    {
      time: '11:00 AM',
      timeOfDay: 'morning',
      emoji: '🍖',
      venueName: 'Green Field Churrascaria',
      venueId: 'brazil-green-field',
      address: '108-01 Northern Blvd, Corona, Queens',
      description: 'Pre-match churrasco at NYC\'s legendary all-you-can-eat Brazilian BBQ. The Queens Brazilian community makes this their match-day ritual. Show up early — the caipirinha pitcher deal ends at kickoff.',
      tip: 'Arrive 2 hours before kickoff. The community atmosphere here on Brazil match days is unlike anything else in NYC.',
      type: 'food',
    },
    {
      time: '3:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🚇',
      venueName: 'Corona → Penn Station',
      address: '7 train from 103rd St–Corona Plaza to Times Sq, then A/C/E to Penn Station',
      description: 'Head to MetLife via Penn Station. Buy round-trip NJ Transit before you board.',
      tip: 'The 7 train from Corona is basically a Brazil match pre-party on game days.',
      type: 'transit',
    },
    {
      time: '6:00 PM',
      timeOfDay: 'evening',
      emoji: '⚽',
      venueName: 'MetLife Stadium',
      address: '1 MetLife Stadium Dr, East Rutherford, NJ',
      description: 'Brazil vs Morocco. The Brazilian community in NYC is one of the largest outside Brazil — expect a sea of yellow and green and the loudest samba chants MetLife has ever heard.',
      tip: 'Brazil plays Morocco in the first MetLife match on June 13 — the opening night of the NY-NJ World Cup. It\'s going to be historic.',
      type: 'watch',
    },
    {
      time: 'Post-match',
      timeOfDay: 'night',
      emoji: '🍹',
      venueName: 'Smithfield Hall or Sláinte',
      address: '435 W 15th St, Chelsea (Smithfield) or 304 Bowery, Nolita (Sláinte)',
      description: 'Post-match celebration in Manhattan. Both bars will be full of Brazilian fans.',
      tip: 'The community often ends up back in Queens for the real celebration — the streets around Astoria and Corona turn into outdoor parties after a Brazil win.',
      type: 'bar',
    },
  ],
};

const brazilFreeDay: DayPlan = {
  id: 'brazil-free-day',
  countryName: 'Brazil',
  planType: 'free_day',
  title: 'A Day in Brazilian NYC',
  subtitle: 'From Queens to Chelsea — follow the yellow and green',
  totalTime: 'Full day',
  stops: [
    {
      time: '10:00 AM',
      timeOfDay: 'morning',
      emoji: '☕',
      venueName: 'Astoria neighborhood',
      address: '36th Ave, Astoria, Queens',
      description: 'Start in Astoria — the Brazilian community here is the most concentrated in NYC. Walk 36th Ave for Brazilian bakeries, cafés, and the kind of morning routine that feels like São Paulo.',
      tip: 'Sabor Tropical on 36th Ave is the local landmark. Ask for pão de queijo if they have it.',
      type: 'activity',
    },
    {
      time: '1:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🍖',
      venueName: 'Green Field Churrascaria',
      venueId: 'brazil-green-field',
      address: '108-01 Northern Blvd, Corona, Queens',
      description: 'Lunch at the legendary rodízio. All you can eat, all the cuts, servers circling with swords of meat. This is the Brazilian community gathering spot in Queens.',
      tip: 'Come hungry. The picanha and the chicken hearts are the ones to focus on.',
      type: 'food',
    },
    {
      time: '4:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🏙️',
      venueName: 'Walk from LIC to Williamsburg',
      address: 'Long Island City waterfront, Queens',
      description: 'Walk the Long Island City waterfront — incredible Manhattan skyline views, popular with the Brazilian professional community in LIC.',
      tip: 'Gantry Plaza State Park is free, beautiful, and has the best skyline view in the outer boroughs.',
      type: 'activity',
    },
    {
      time: '7:00 PM',
      timeOfDay: 'evening',
      emoji: '🍹',
      venueName: 'Boteco Brooklyn',
      address: 'Atlantic Ave, Boerum Hill, Brooklyn',
      description: 'Dinner at the casual Brazilian bar in Brooklyn. Caipirinhas are the move, and the pastel de queijo is extraordinary.',
      tip: 'The community here is more bohemian/creative than the Queens crowd — different but equally real.',
      type: 'food',
    },
  ],
};

// ─── MEXICO ───────────────────────────────────────────────────────────────────

const mexicoMatchDay: DayPlan = {
  id: 'mexico-match-day',
  countryName: 'Mexico',
  planType: 'match_day',
  title: 'Match Day — Arriba México',
  subtitle: 'Tacos, mezcal, and a city that becomes Mexico City',
  totalTime: 'Full day',
  stops: [
    {
      time: '10:00 AM',
      timeOfDay: 'morning',
      emoji: '🌮',
      venueName: 'Tacos El Bronco',
      venueId: 'mexico-tacos-el-bronco',
      address: '5th Ave & 43rd St, Sunset Park, Brooklyn',
      description: 'Pre-match tacos at the legendary Sunset Park stand. Al pastor off the trompo, standing on the sidewalk, surrounded by the Mexican community. This is how El Tri match days start in Brooklyn.',
      tip: 'Cash only. Get the al pastor and ask for everything (cilantro, onion, salsa verde). Line moves fast.',
      type: 'food',
    },
    {
      time: '1:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🎉',
      venueName: 'Corona Plaza',
      venueId: 'mexico-corona-plaza',
      address: 'Roosevelt Ave & 103rd St, Corona, Queens',
      description: 'The outdoor plaza that becomes an outdoor watch party for Mexico matches — thousands of fans, car horns, street food vendors, and pure electricity. Pre-match energy here is unreal.',
      tip: 'Get there 90 minutes early. The elote vendors set up around noon. The atmosphere builds slowly then explodes at kickoff.',
      type: 'watch',
    },
    {
      time: '5:00 PM',
      timeOfDay: 'evening',
      emoji: '🍹',
      venueName: 'La Nacional',
      venueId: 'mexico-la-nacional',
      address: '239 W 14th St, Chelsea, Manhattan',
      description: 'If not watching at Corona Plaza, La Nacional in Chelsea is the old-school watch spot — historic institution, standing room only, flags everywhere.',
      tip: 'The michelada here is made properly. Arrive 45 minutes early for a spot.',
      type: 'watch',
    },
    {
      time: 'Post-match',
      timeOfDay: 'night',
      emoji: '🎊',
      venueName: 'Roosevelt Ave, Jackson Heights',
      address: 'Roosevelt Ave, Jackson Heights, Queens',
      description: 'After a Mexico win, Roosevelt Avenue shuts down naturally. Street vendors, music, celebrations. This is one of the great NYC sports experiences — the 7 train becomes a party car, the street becomes a plaza.',
      tip: 'Don\'t rush home. The post-victory celebration on Roosevelt Ave after a Mexico win is something you\'ll tell people about for years.',
      type: 'activity',
    },
  ],
};

const mexicoFreeDay: DayPlan = {
  id: 'mexico-free-day',
  countryName: 'Mexico',
  planType: 'free_day',
  title: 'A Day in Mexican NYC',
  subtitle: 'The 7 train is a Mexico City subway car',
  totalTime: 'Full day',
  stops: [
    {
      time: '9:00 AM',
      timeOfDay: 'morning',
      emoji: '🌮',
      venueName: 'La Flor de Mexico',
      address: '82nd St, Jackson Heights, Queens',
      description: 'Breakfast in Jackson Heights — the cultural epicenter of Mexican NYC. La Flor de Mexico does proper pozole, tamales, and tortas. Family-run, neighborhood feel, Spanish-only menu.',
      tip: 'Take the 7 train to 82nd St–Jackson Hts. The 74th St food corridor starts here — this is the best food street in NYC.',
      type: 'food',
    },
    {
      time: '11:00 AM',
      timeOfDay: 'morning',
      emoji: '🛒',
      venueName: 'Roosevelt Ave food corridor walk',
      address: 'Roosevelt Ave between 74th and 103rd St, Queens',
      description: 'Walk Roosevelt Ave — taquerías, panaderías, carnicerias, juice stands, and street food that\'s more authentic than anything in Manhattan. This is where the Mexican community lives.',
      tip: 'The street vendors on Roosevelt Ave under the elevated 7 train tracks are a NYC institution. Try the elote and the tamales from the carts.',
      type: 'activity',
    },
    {
      time: '2:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🌮',
      venueName: '5th Ave Mexican corridor, Sunset Park',
      address: '5th Ave between 36th and 60th St, Sunset Park, Brooklyn',
      description: 'The best Mexican food corridor in NYC. Better and cheaper than anything in Manhattan — taquerías, panaderías, carnicerías for 20 blocks. Completely untouristy.',
      tip: 'Tacos El Bronco at 5th & 43rd is the anchor but every block has something worth trying. Budget $15 and eat at 4 different spots.',
      type: 'food',
    },
    {
      time: '7:00 PM',
      timeOfDay: 'evening',
      emoji: '🍹',
      venueName: 'El Cantinero',
      address: '86 University Pl, Greenwich Village, Manhattan',
      description: 'Evening mezcal at this Greenwich Village cantina. Dark wood, proper drinks, El Tri memorabilia. The Mexican professional crowd ends up here.',
      tip: 'The mezcal list is the reason to be here. Don\'t order beer.',
      type: 'bar',
    },
  ],
};

// ─── ENGLAND ──────────────────────────────────────────────────────────────────

const englandMatchDay: DayPlan = {
  id: 'england-match-day',
  countryName: 'England',
  planType: 'match_day',
  title: 'Match Day — Three Lions',
  subtitle: 'Proper pints, then MetLife',
  totalTime: 'Full day',
  stops: [
    {
      time: '11:00 AM',
      timeOfDay: 'morning',
      emoji: '🍺',
      venueName: 'Football Factory at Legends',
      venueId: 'england-football-factory',
      address: '6 W 33rd St, Midtown, Manhattan',
      description: 'Start at the Football Factory — England\'s NYC supporter section has a reserved area here. Pre-match atmosphere builds from 11am, pints are flowing, flags are out.',
      tip: 'Find the NYC Three Lions group on social before match day — they coordinate the pre-match gathering and often have reserved sections.',
      type: 'watch',
    },
    {
      time: '2:00 PM',
      timeOfDay: 'afternoon',
      emoji: '🚂',
      venueName: 'Penn Station → MetLife',
      address: 'Penn Station, 34th St & 8th Ave, Manhattan',
      description: 'NJ Transit from Penn Station. Walk from Football Factory to Penn Station in 8 minutes. The England crowd often does a coordinated walk — flags out, chanting.',
      tip: 'England plays Panama at 5pm on June 27 at MetLife. Leave by 2:30pm. Buy round-trip before you go.',
      type: 'transit',
    },
    {
      time: '5:00 PM',
      timeOfDay: 'evening',
      emoji: '⚽',
      venueName: 'MetLife Stadium',
      address: '1 MetLife Stadium Dr, East Rutherford, NJ',
      description: 'England vs Panama, Group Stage. The English fans in NYC are one of the most organized groups — expect sections of white shirts and the full repertoire of songs.',
      tip: 'The English supporter section will be in one corner. Walk around before kickoff and find the loudest singing — that\'s where you want to be.',
      type: 'watch',
    },
    {
      time: 'Post-match',
      timeOfDay: 'night',
      emoji: '🍺',
      venueName: 'Smithfield Hall',
      venueId: 'england-smithfield',
      address: '435 W 15th St, Chelsea, Manhattan',
      description: 'Post-match at Smithfield Hall — the home of Manchester United and West Ham NYC supporters, and where England fans end up after matches.',
      tip: 'It\'s going home (the fans, after the celebration). The bar fills quickly post-match — get there fast.',
      type: 'bar',
    },
  ],
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const DAY_PLANS: DayPlan[] = [
  argentinaMatchDay,
  argentinaFreeDay,
  brazilMatchDay,
  brazilFreeDay,
  mexicoMatchDay,
  mexicoFreeDay,
  englandMatchDay,
  // Add more countries here following the same pattern
];

export function getDayPlans(countryName: string): DayPlan[] {
  return DAY_PLANS.filter(p => p.countryName === countryName);
}

export function getGenericDayPlan(countryName: string): DayPlan {
  return {
    id: `${countryName.toLowerCase()}-generic-free`,
    countryName,
    planType: 'free_day',
    title: `A Day in NYC as a ${countryName} Fan`,
    subtitle: 'The world\'s most international city — every culture has a home',
    totalTime: 'Full day',
    stops: [
      {
        time: '10:00 AM',
        timeOfDay: 'morning',
        emoji: '🚇',
        venueName: 'Jackson Heights, Queens',
        address: '74th St & Roosevelt Ave, Jackson Heights, Queens',
        description: 'Start in Jackson Heights — the most diverse square mile on Earth. 160+ languages, food from every country, and the NYC community that feels most like the whole world in one place.',
        tip: 'Take the 7 train to 74th St–Broadway. Walk the 74th St food corridor.',
        type: 'activity',
      },
      {
        time: '1:00 PM',
        timeOfDay: 'afternoon',
        emoji: '⚽',
        venueName: 'Football Factory at Legends',
        address: '6 W 33rd St, Midtown, Manhattan',
        description: 'Lunch at NYC\'s premier soccer bar. 30+ supporter clubs, 20+ screens, and the most international soccer crowd in the city. Find your flag.',
        tip: 'The supporter clubs directory on their website lists every club they host — your country may already have a NYC chapter.',
        type: 'watch',
      },
      {
        time: '4:00 PM',
        timeOfDay: 'afternoon',
        emoji: '🏙️',
        venueName: 'Central Park',
        address: 'Central Park, Manhattan',
        description: 'Walk Central Park in the afternoon — it\'s the great equalizer. During the World Cup, impromptu pick-up games happen near Sheep Meadow daily.',
        tip: 'Sheep Meadow in Central Park has informal World Cup watch parties on big match days. Free, bring a blanket.',
        type: 'activity',
      },
      {
        time: '7:00 PM',
        timeOfDay: 'evening',
        emoji: '🍴',
        venueName: 'Explore your neighborhood',
        address: 'Your hotel neighborhood',
        description: 'Wherever you\'re staying, every NYC neighborhood has great food within a 5-minute walk. Ask your hotel for the local spot — not the tourist one, the neighborhood one.',
        tip: 'The Infatuation (theinfatuation.com) and Eater NY (ny.eater.com) are the two best resources for where to actually eat in NYC.',
        type: 'food',
      },
    ],
  };
}
