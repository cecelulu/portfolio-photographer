// Informations générales du site — à modifier ici, elles sont reprises partout.

export const site = {
  name: 'Sprint Racing',
  group: 'Groupe PPK',
  tagline: 'L’école leader du stage de pilotage sur circuit',
  url: 'https://www.sprint-racing.com',

  phoneFr: '01 30 66 63 60',
  phoneFrHref: 'tel:+33130666360',
  phoneBe: '02 747 03 24',
  phoneBeHref: 'tel:+3227470324',
  email: 'contact@sprint-racing.com',
  emailEvents: 'cguiod@groupe-ppk.com',
  emailJobs: 'recrutement@groupe-ppk.com',
  hours: 'Du lundi au vendredi de 9h30 à 18h, le samedi de 10h à 17h',

  address: {
    street: '54, route de Sartrouville – Immeuble Ottawa',
    zip: '78230',
    city: 'Le Pecq',
    country: 'France',
  },

  legal: {
    company: 'PPK – SAS au capital de 122 000 €',
    rcs: 'RCS Versailles 442 790 366',
    vat: 'TVA intracommunautaire : FR51442790366',
  },

  social: {
    facebook: 'https://www.facebook.com/Sprint-Racing-Ecole-de-pilotage-1702094026698909',
    instagram: 'https://www.instagram.com/sprintracingofficiel/',
    youtube: 'https://www.youtube.com/watch?v=rOoamVG76j8',
  },

  /**
   * Adresse de réception des formulaires.
   * - Laisser vide : le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie.
   * - Renseigner une URL (Formspree, Getform, Basin, API maison…) : la demande est envoyée
   *   directement en POST (FormData) puis le visiteur est redirigé vers /merci.
   */
  formEndpoint: '',

  /**
   * Mode maquette : bandeau « projet non officiel » en haut de chaque page, pages non indexées
   * par Google et formulaires désactivés (aucune demande n’est envoyée).
   * Passer à `false` uniquement pour la version officielle validée par Sprint Racing.
   */
  demo: true,
  officialUrl: 'https://www.sprint-racing.com',
};

export const stats = [
  { value: '20 ans', label: 'd’expérience' },
  { value: '+1 million', label: 'de stagiaires accueillis' },
  { value: '180', label: 'GT et monoplaces' },
  { value: '25', label: 'circuits en France et Belgique' },
  { value: '450', label: 'dates de stage par an' },
  { value: '8,6/10', label: 'note moyenne de nos clients' },
];

export const reassurance = [
  { icon: 'card', title: 'Paiement en 3× sans frais', text: 'Carte bancaire ou PayPal' },
  { icon: 'mail', title: 'Bon cadeau en 5 minutes', text: 'Envoyé par e-mail, prêt à offrir' },
  { icon: 'id', title: 'Dès 16 ans', text: 'En conduite accompagnée' },
  { icon: 'shield', title: 'Aucune caution', text: 'Sur tous les stages GT' },
];

/** Motif de validation des numéros de téléphone (chiffres, espaces, +, ., parenthèses, tirets). */
export const TEL_PATTERN = '[0-9 +.\\(\\)\\-]{8,}';

export function formatPrice(value: number | null | undefined): string {
  if (value == null) return '';
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }) + ' €';
}
