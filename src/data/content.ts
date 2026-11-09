// Textes éditoriaux : déroulement, cadeaux, avis, FAQ.

export const steps = [
  {
    title: 'Choisissez votre stage',
    text: 'Voiture, circuit, nombre de tours : composez votre expérience, ou laissez-nous vous conseiller.',
  },
  {
    title: 'Envoyez votre demande',
    text: 'Remplissez le formulaire en 2 minutes. Notre service client vous recontacte rapidement avec la confirmation et le paiement.',
  },
  {
    title: 'Recevez votre briefing',
    text: 'Une semaine avant, l’heure de rendez-vous et une vidéo de briefing vous sont envoyées par SMS et par e-mail.',
  },
  {
    title: 'Prenez la piste',
    text: 'Tours de reconnaissance en Porsche Cayenne, puis place au volant avec votre moniteur. Diplôme remis à la fin !',
  },
];

export const dayProgram = [
  {
    title: 'Avant le stage',
    text: 'Vous recevez une semaine avant, par SMS et par e-mail, votre heure de rendez-vous ainsi qu’une vidéo de briefing : présentation du circuit, des voitures et des techniques essentielles (freinage dégressif, regard…). Inutile d’arriver en avance.',
  },
  {
    title: 'Reconnaissance du circuit',
    text: 'À votre arrivée, vous effectuez 2 tours de reconnaissance en passager (1 tour sur les grands circuits) en Porsche Cayenne pour les stages GT, ou en minibus pour la monoplace et la glisse : trajectoires, zones de freinage, points de corde.',
  },
  {
    title: 'Au volant',
    text: 'En GT et en glisse, votre moniteur diplômé BPJEPS est assis à vos côtés et adapte ses conseils à votre niveau. En monoplace, vous êtes seul à bord et il vous accompagne avant et après chaque session. Nous conseillons un minimum de 4 tours pour vraiment se faire plaisir.',
  },
  {
    title: 'Après le stage',
    text: 'Débriefing dans la voiture, photos avec vos proches, puis remise de votre diplôme nominatif. La vidéo embarquée de votre stage (en option) est disponible en streaming dans les 3 jours.',
  },
];

export const options = [
  { name: 'Vidéo embarquée de votre stage', detail: 'Disponible en streaming dans les 3 jours' },
  { name: 'Baptême de vitesse en Ford Focus RS', detail: 'Emmené par un pilote professionnel' },
  { name: 'Rachat de franchise', detail: '15 € sur place, annule la franchise de 2 500 €' },
  { name: 'Coffret cadeau par courrier', detail: '12,90 € – expédié le jour même avant 12h' },
];

export const giftBoxes = [
  {
    name: 'Découverte Pilotage',
    price: 144,
    text: 'Une première expérience : jusqu’à 5 tours en Porsche Cayman 718 S, Alpine A110 S ou Corvette C8, ou 2 à 3 tours en Audi R8, Aston Martin, Porsche GT4 RS…',
  },
  {
    name: 'Sensation Pilotage',
    price: 209,
    text: 'Jusqu’à 6 tours en Audi R8, Aston Martin ou Porsche GT4 RS, ou 2 tours en Ferrari, Lamborghini, McLaren 600LT ou Porsche 991 GT3 RS.',
  },
  {
    name: 'Passion Pilotage',
    price: 249,
    text: 'Jusqu’à 8 tours en Audi R8 ou Aston Martin, ou 3 à 4 tours en Ferrari, Lamborghini Huracán, Mustang Shelby GT500, McLaren 600LT…',
  },
  {
    name: 'Excellence Pilotage',
    price: 289,
    text: 'Jusqu’à 10 tours en Audi R8 ou Aston Martin, ou 4 à 5 tours en Ferrari F8 Tributo, 296 GTB, Lamborghini Temerario, Porsche 991 GT3 RS…',
  },
];

export const giftIncludes = [
  'Tour de cou et badge personnalisé',
  'Briefing vidéo sur les conseils de pilotage et de sécurité',
  '2 tours de découverte du circuit en passager en Porsche Cayenne',
  'Les tours au volant de la voiture choisie',
  'Diplôme personnalisé',
];

export const reviewsSummary = { score: '8,6/10', votes: '12 243 avis', period: 'sur les 6 derniers mois' };

export const reviews = [
  {
    name: 'Yannis M.',
    place: 'Circuit de Saint-Laurent-de-Mure (69)',
    car: 'Porsche 911 GT3 RS',
    text: 'Je tenais à remercier Eric qui a été de très bon conseil durant ma session. Il a su me mettre en confiance et à l’aise durant ce stage, je recommande !',
  },
  {
    name: 'Brandon B.',
    place: 'Circuit de Folembray (02)',
    car: 'Audi R8 V10',
    text: 'Très bonne expérience ! Très heureux d’avoir vécu ce moment avec Denis dans l’Audi R8. Personnel accueillant, souriant, encore merci à toute l’équipe.',
  },
  {
    name: 'Christine B.',
    place: 'Circuit de Haute-Saintonge (17)',
    car: '',
    text: 'Merci beaucoup à mon instructrice Marine qui a été au top dans les explications et qui m’a donné confiance. Merci également pour sa gentillesse.',
  },
  {
    name: 'Arthur L.',
    place: 'Circuit de Saint-Laurent-de-Mure (69)',
    car: '',
    text: 'Super expérience de A à Z. Les instructeurs savent nous rassurer et nous guider tout au long de l’expérience. J’y retournerai sans faute.',
  },
  {
    name: 'Noam G.',
    place: 'Circuit de Mettet (Belgique)',
    car: 'McLaren 600LT',
    text: 'Nous avions offert ce stage pour les 18 ans de notre fils et c’est une réussite. Une superbe équipe, de l’accueil aux explications, jusqu’aux pilotes.',
  },
  {
    name: 'Maxence L.',
    place: 'Circuit de Magny-Cours Club (58)',
    car: '',
    text: 'C’est mon 4e stage, c’était toujours parfait.',
  },
];

export type Faq = { q: string; a: string };

export const faq: { group: string; items: Faq[] }[] = [
  {
    group: 'Avant de réserver',
    items: [
      {
        q: 'Qui peut participer à un stage de pilotage ?',
        a: 'Nos stages sont ouverts à tous, débutants ou confirmés, dès 16 ans, avec le permis de conduire ou en conduite accompagnée. Les accompagnants sont les bienvenus et peuvent faire un baptême de vitesse en passager dès 8 ans, accompagnés d’un parent.',
      },
      {
        q: 'Quel âge faut-il avoir et quel permis faut-il ?',
        a: 'Stages GT et glisse : 16 ans minimum avec un permis valide (18 ans pour un permis étranger) ou en conduite accompagnée, muni de l’attestation de fin de formation initiale et d’une pièce d’identité originale. Monoplace : 17 ans minimum et permis obligatoire. Les mineurs doivent être accompagnés d’un parent qui signe l’autorisation parentale.',
      },
      {
        q: 'Quelles voitures sont accessibles aux jeunes en conduite accompagnée ?',
        a: 'Porsche Cayman 718 S, Alpine A110 S, Chevrolet Corvette C8 Stingray, Audi R8 V10, Aston Martin Vantage, Porsche 992 GT3, Ferrari 488 GTB et Lamborghini Huracán.',
      },
      {
        q: 'Combien de tours choisir ?',
        a: 'Pour un cadeau « d’une fois dans sa vie », privilégiez la rareté avec une Lamborghini Temerario, une Ferrari F8 Tributo ou 296 GTB, une Porsche 991 GT3 RS ou une McLaren 600LT, quel que soit le nombre de tours. Pour une première expérience d’un passionné, nous conseillons un minimum de 4 tours : la progression se ressent vraiment au fil des tours.',
      },
      {
        q: 'Comment choisir un circuit ?',
        a: 'Choisissez selon la proximité, le tracé, les voitures proposées et les dates disponibles. Certaines pistes sont idéales pour l’initiation, d’autres permettent de découvrir un tracé plus long ou plus technique. Tous nos circuits sont homologués FFSA.',
      },
    ],
  },
  {
    group: 'Offrir un stage',
    items: [
      {
        q: 'Comment offrir un stage de pilotage ?',
        a: 'Choisissez un stage précis (voiture et circuit), un coffret cadeau valable sur tous les circuits, ou un chèque cadeau du montant de votre choix. Le bénéficiaire réserve ensuite sa date lui-même.',
      },
      {
        q: 'Que reçoit-on après l’achat, et quand ?',
        a: 'Par e-mail (par défaut) : le bon cadeau personnalisé, les livrets « circuits » et « voitures » et le planning de l’année, en PDF imprimable, en quelques minutes. Par courrier (option à 12,90 €) : le coffret physique (14 × 21 cm) expédié le jour même pour toute commande avant 12h, à l’acheteur ou directement au bénéficiaire (environ 5 jours ouvrés).',
      },
      {
        q: 'Peut-on offrir un stage sans choisir la date ?',
        a: 'Oui. Le bénéficiaire choisit ensuite un créneau depuis son espace personnel, par e-mail ou par téléphone, dans la limite de validité du bon (un an pour les coffrets).',
      },
      {
        q: 'J’ai acheté mon stage chez un revendeur (Smartbox, Wonderbox, Funbooker…). Est-ce le même stage ?',
        a: 'Oui. Les stages vendus par Smartbox, Wonderbox, Sport Découverte, Funbooker, Groupon, Veepee et d’autres sont réalisés par Sprint Racing. Utilisez l’accès fourni par le revendeur pour choisir votre prestation et votre date : nous recevons directement la commande.',
      },
    ],
  },
  {
    group: 'Le jour du stage',
    items: [
      {
        q: 'Comment se déroule le stage ?',
        a: 'Une semaine avant, vous recevez une vidéo de briefing et les informations pratiques. Sur place : tours de reconnaissance en passager, puis vos tours au volant avec un moniteur assis à vos côtés (GT et glisse). En monoplace, vous êtes seul à bord. Vous repartez avec votre diplôme.',
      },
      {
        q: 'Faut-il verser une caution ? Que se passe-t-il en cas de dégât ?',
        a: 'En GT et en glisse, aucune caution n’est demandée. En cas de dégât dû à une erreur de pilotage, la responsabilité est limitée à une franchise de 2 500 €, que l’option « rachat de franchise » (15 € sur place) annule totalement. En monoplace, une caution de 1 000 € (200 € avec l’option Sérénité) est demandée et restituée le jour même en l’absence de dégâts.',
      },
      {
        q: 'Peut-on venir accompagné ?',
        a: 'Oui, vos proches sont les bienvenus et peuvent prendre des photos. La présence d’enfants de moins de 8 ans, de femmes enceintes et de personnes fragiles est toutefois déconseillée sur les circuits.',
      },
      {
        q: 'Les voitures appartiennent-elles à Sprint Racing ?',
        a: 'Oui. Toutes nos voitures nous appartiennent et sont entretenues dans nos propres ateliers (Lesquin, Douai, Trappes et La Ferté-Gaucher) par des mécaniciens formés chez les constructeurs.',
      },
    ],
  },
];

export const about = {
  title: 'Sprint Racing, l’école de pilotage leader en France et en Belgique',
  paragraphs: [
    'Créée en 2002, Sprint Racing est devenue en 20 ans l’école leader du stage de pilotage en GT et en monoplace en France et en Belgique. Plus d’un million de stagiaires ont déjà été accueillis par nos équipes de passionnés.',
    'Nous sommes propriétaires de nos voitures : près de 150 GT et 30 monoplaces, entretenues dans nos propres ateliers (8 000 m²) par des mécaniciens formés chez les constructeurs. Nous possédons aussi les circuits de La Ferté-Gaucher (77) et de Pont-l’Évêque (14).',
    'Chaque week-end, de février à début décembre, nos équipes sillonnent la France avec 12 camions porte-voitures. Plus de 250 moniteurs diplômés BPJEPS vous font progresser en toute sécurité. Nous avons toujours estimé que c’était à nous de venir au plus près de nos clients, et non l’inverse.',
  ],
};
