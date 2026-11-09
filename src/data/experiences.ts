// Les grandes familles de stages proposées (page d’accueil, page « Nos stages », formulaire).

export type Experience = {
  key: string;
  title: string;
  short: string;
  description: string;
  priceFrom: number;
  priceUnit?: string;
  image: string;
  href: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    key: 'gt',
    title: 'Stage GT',
    short: 'Ferrari, Lamborghini, Porsche, McLaren…',
    description:
      'Prenez le volant d’une supercar de 292 à 920 ch, avec un moniteur diplômé d’État assis à côté de vous.',
    priceFrom: 99.9,
    image: '/images/categories/stage-de-pilotage-ferrari.webp',
    href: '/stages/#gt',
    points: ['15 modèles au choix', 'Moniteur BPJEPS en passager', 'De 2 à 10 tours au volant'],
  },
  {
    key: 'multi',
    title: 'Multi GT : duo, trio…',
    short: 'Pilotez 2, 3, 4 ou 5 voitures',
    description:
      'Le cadeau idéal pour multiplier les sensations : enchaînez plusieurs GT d’exception lors d’une même journée.',
    priceFrom: 194.9,
    image: '/images/categories/stage-de-pilotage-multivolant.webp',
    href: '/stages/multi-gt/',
    points: ['De 2 à 5 voitures', 'Combinaisons libres', 'Sur tous nos circuits'],
  },
  {
    key: 'monoplace',
    title: 'Monoplace',
    short: 'Formule Renault et Formule 4',
    description:
      'Seul à bord, position allongée, le vent contre le casque : vivez les vraies sensations d’un pilote de course.',
    priceFrom: 249,
    image: '/images/categories/stage-de-pilotage-monoplace.webp',
    href: '/stages/#monoplace',
    points: ['Dès 17 ans avec le permis B', 'Seul au volant', 'Briefing et débriefing avec un moniteur'],
  },
  {
    key: 'drift',
    title: 'Drift et glisse',
    short: 'Sur piste arrosée',
    description:
      'Apprenez à déclencher et à tenir une dérive en BMW M2, Toyota GR86, Subaru WRX STI ou Audi A1 Easydrift.',
    priceFrom: 169,
    image: '/images/categories/stage-de-pilotage-glisse.webp',
    href: '/stages/drift/',
    points: ['Circuit de La Ferté-Gaucher (77)', 'Piste arrosée', 'Accessible aux débutants'],
  },
  {
    key: 'jeunes',
    title: 'Stage jeunes',
    short: 'Dès 16 ans en conduite accompagnée',
    description:
      'Une sélection de GT faciles à prendre en main pour perfectionner la conduite des jeunes en apprentissage anticipé.',
    priceFrom: 99.9,
    image: '/images/categories/stage-jeune.webp',
    href: '/stages/jeunes/',
    points: ['Dès 16 ans (AAC)', 'Moniteurs formés à l’accompagnement des jeunes', '8 modèles accessibles'],
  },
  {
    key: 'coaching',
    title: 'Coaching et perfectionnement',
    short: 'En petit groupe ou avec votre voiture',
    description:
      'Journées de perfectionnement à 5 ou 6 participants au maximum, en Audi A1 Cup ou en Porsche 993, à Trappes (78).',
    priceFrom: 209,
    image: '/images/categories/stage-coaching.webp',
    href: '/stages/coaching/',
    points: ['5 à 6 participants au maximum', 'Audi A1 Cup ou Porsche 993', 'Roulage avec votre voiture'],
  },
];

// Pages détaillées des stages « spéciaux » (multi GT, drift, jeunes, coaching).
export const specialStages = {
  'multi-gt': {
    title: 'Stage Multi GT : duo, trio, quattro…',
    lead: 'Prenez le volant de 2, 3, 4 ou 5 voitures de rêve lors de votre venue sur circuit.',
    image: '/images/voitures/multigt2.webp',
    body: [
      'Sprint Racing vous propose de piloter plusieurs véhicules d’exception, de 2 jusqu’à 5, le même jour. Choisissez votre circuit, puis composez votre formule parmi nos Ferrari, Lamborghini, Porsche, McLaren, Audi R8, Aston Martin, Corvette, Mustang ou Alpine.',
      'C’est le cadeau parfait pour les passionnés qui veulent comparer les caractères : la sonorité d’un V10, la poussée d’un V8 biturbo, l’agilité d’une Porsche à moteur central…',
    ],
    formulas: [
      { name: 'Duo', detail: '2 voitures au choix', price: 194.9 },
      { name: 'Trio', detail: '3 voitures au choix', price: 309.9 },
      { name: 'Multi GT', detail: '4 voitures ou plus', price: 474.9 },
    ],
    type: 'multi',
  },
  drift: {
    title: 'Stages de drift et de glisse',
    lead: 'Maîtriser la glisse, l’aboutissement de tout pilote.',
    image: '/images/voitures/drift.webp',
    body: [
      'Sur le circuit de La Ferté-Gaucher (77), apprenez à maîtriser le pilotage en glisse sur piste arrosée. Nos moniteurs vous enseignent les fondamentaux : déclencher la dérive grâce à une trajectoire et un freinage adaptés, la maintenir, puis enchaîner le virage suivant.',
      'L’Audi A1 Cup équipée d’anneaux Easydrift est idéale pour débuter : impossible de ne pas glisser ! Vous pourrez ensuite vous mesurer à la Toyota GR86 (propulsion), à la Subaru WRX STI (4 roues motrices) puis à la redoutable BMW M2.',
    ],
    formulas: [
      { name: 'Audi A1 Cup Easydrift', detail: '180 ch – idéale pour débuter', price: 169 },
      { name: 'Toyota GR86', detail: '234 ch – propulsion', price: 199 },
      { name: 'Subaru WRX STI', detail: '300 ch – 4 roues motrices', price: 224 },
      { name: 'BMW M2', detail: '410 ch – pour les plus expérimentés', price: 259 },
      { name: 'Duo GR86 + A1 Cup', detail: 'Deux voitures, deux styles', price: 329 },
    ],
    type: 'drift',
  },
  jeunes: {
    title: 'Stages jeunes dès 16 ans',
    lead: 'Offrez à votre ado ses premiers tours de circuit au volant d’une GT d’exception.',
    image: '/images/voitures/A110S.webp',
    body: [
      'Sprint Racing permet à tous les jeunes de 16 ans et plus en conduite accompagnée de perfectionner leur apprentissage par quelques tours sur circuit. Le moniteur BPJEPS (et non le tuteur) est assis en passager pendant les tours au volant.',
      'Les jeunes doivent se munir de leur attestation de fin de formation initiale, de leur livret d’apprentissage et d’une pièce d’identité. Un badge spécifique permet de les identifier pour un accompagnement personnalisé. Un parent signe l’autorisation parentale le jour du stage.',
    ],
    formulas: [
      { name: 'Porsche Cayman 718 S', detail: '350 ch', price: 99.9 },
      { name: 'Alpine A110 S', detail: '292 ch', price: 99.9 },
      { name: 'Corvette C8 Stingray', detail: '482 ch', price: 99.9 },
      { name: 'Audi R8 V10', detail: '620 ch', price: 119.9 },
      { name: 'Aston Martin V8 Vantage', detail: '510 ch', price: 119.9 },
      { name: 'Porsche 992 GT3', detail: '510 ch', price: 149.9 },
      { name: 'Ferrari 488 GTB', detail: '670 ch', price: 169.9 },
      { name: 'Lamborghini Huracán', detail: '610 ch', price: 169.9 },
    ],
    type: 'jeunes',
  },
  coaching: {
    title: 'Coaching et perfectionnement au pilotage',
    lead: 'Pour aller plus loin dans l’apprentissage des techniques de pilotage.',
    image: '/images/categories/stage-coaching.webp',
    body: [
      'Le perfectionnement est réservé à celles et ceux qui ont déjà découvert le pilotage sur circuit et souhaitent progresser. Les journées sont limitées à 5 ou 6 participants avec un moniteur dédié, au volant d’une Audi A1 Cup ou d’une Porsche 993, sur le circuit de Trappes (78).',
      'Vous préférez votre propre voiture ? Nos sessions de roulage encadrées, organisées avec l’équipe Opentrack, vous permettent d’exploiter ses performances en toute sécurité et dans une ambiance conviviale.',
    ],
    formulas: [
      { name: 'Coaching Audi A1 Cup', detail: '180 ch – pour commencer', price: 209 },
      { name: 'Coaching Porsche 993', detail: 'Pour les plus aguerris', price: 289 },
      { name: 'Roulage voiture personnelle', detail: 'Accès piste encadré', price: 245 },
    ],
    type: 'coaching',
  },
} as const;
