# Sprint Racing – nouveau site (Groupe PPK)

Site vitrine pour les stages de pilotage Sprint Racing : clair, rapide, adapté au mobile et pensé pour transformer les visiteurs en demandes de stage.

Il est construit avec [Astro](https://astro.build) : toutes les pages sont générées en HTML statique (très rapides, bien référencées, hébergeables n’importe où).

## Démarrer

```bash
npm install
npm run dev       # site en local sur http://localhost:4321
npm run build     # génère le site final dans dist/
npm run preview   # prévisualise la version finale
```

## Arborescence du site

| Page | Adresse | Contenu |
| --- | --- | --- |
| Accueil | `/` | Grand visuel, prestations, liste des stages, cartes « Offrir » et « Entreprises », avis clients |
| Nos stages | `/stages/` | Les 17 voitures (filtre par marque / « dès 16 ans ») et les autres expériences |
| Fiche voiture | `/stages/<voiture>/` | Description, caractéristiques, ce qui est inclus, conditions, circuits, prix « à partir de » |
| Stages spéciaux | `/stages/multi-gt/`, `/stages/drift/`, `/stages/jeunes/`, `/stages/coaching/` | Présentation et formules |
| Circuits | `/circuits/` et `/circuits/<circuit>/` | 27 tracés regroupés par région, voitures disponibles par circuit |
| Offrir | `/offrir/` | Stage précis, coffrets (Découverte → Excellence), chèque cadeau, livraison |
| Entreprises | `/entreprises/` | Occasions, programme type, formulaire de devis |
| Le déroulement | `/le-stage/` | Étapes, journée type, conditions, options, présentation de l’école |
| FAQ | `/faq/` | Questions fréquentes par rubrique |
| Réservation en ligne | `/commande/` | Tunnel d’achat **de démonstration** en 3 étapes (stage, coffret ou chèque cadeau → informations → paiement), prix réels par circuit et nombre de tours, page de confirmation |
| Demande sans engagement | `/reservation/` | Formulaire en 4 étapes avec récapitulatif et prix indicatif (drift, coaching, multi GT, questions) |
| Contact, Merci, Mentions légales, 404 | | |

## Modifier le contenu

Tout le contenu est rassemblé dans `src/data/` :

- `site.ts` : téléphones, e-mails, horaires, adresse, mentions légales, chiffres clés, **adresse de réception des formulaires**
- `cars.json` : les voitures (nom, puissance, moteur, boîte, prix « à partir de », description, circuits)
- `circuits.json` : les circuits (nom, ville, département, région, longueur, voitures disponibles)
- `experiences.ts` : les familles de stages et les formules des pages spéciales
- `content.ts` : étapes, déroulement, options, coffrets cadeaux, avis clients, FAQ, présentation

Les photos et le logo sont dans `public/images/` :

- `voitures/`, `categories/`, `circuits/` : photos du site actuel, converties en WebP ;
- `detoure/` : une voiture détourée par modèle (fond transparent), utilisée dans les cartes et les en-têtes ;
- `maquette/` : les visuels de la page d’accueil. Le grand visuel, les cartes et la vignette vidéo sont des **images générées par IA** (Lamborghini Temerario noire, ambiance rose), fournies pour le projet ; les plaques « TEMERARIO » ont été remplacées par une plaque Sprint Racing et le grand visuel a été agrandi ×2 (ESRGAN) pour les écrans haute définition. Les fichiers gardent les mêmes noms, il suffit de les écraser.

## Mode maquette

Tant que `demo: true` dans `src/data/site.ts` (réglage actuel) :

- un bandeau jaune « Maquette – projet non officiel » s’affiche en haut de chaque page, avec un lien vers le site officiel ;
- les pages ne sont pas indexées par Google (balise `noindex` et `robots.txt` qui bloque tout) ;
- les formulaires se remplissent normalement, mais **aucune demande n’est envoyée** : un message l’explique au visiteur.

Ne passer à `demo: false` que pour une version officielle validée par Sprint Racing.

## Formulaires (demande de stage, devis, contact)

Le site est statique : il faut indiquer où envoyer les demandes. Dans `src/data/site.ts`, `formEndpoint` :

- **vide (réglage actuel)** : à l’envoi, la messagerie du visiteur s’ouvre avec la demande pré-remplie, adressée à `contact@sprint-racing.com` (ou `cguiod@groupe-ppk.com` pour les devis entreprises).
- **une URL** (par exemple un formulaire [Formspree](https://formspree.io), Getform, Basin ou une API maison) : la demande est envoyée directement en arrière-plan, puis le visiteur arrive sur la page `/merci`.

Les formulaires comprennent une validation des champs, un champ anti-spam invisible et une case de consentement RGPD.

## Style

Le site reproduit la maquette fournie : fond blanc, grandes photos sombres, cartes gris très clair aux coins arrondis, pastilles, rose de Sprint Racing pour les boutons et les icônes (à la place du rouge de la maquette), typographie Inter fine, grands mots décoratifs (« sprint racing », « pilotage »). L’en-tête est une « pilule » blanche qui flotte au-dessus des grands visuels.

- Les couleurs se règlent en haut de `src/styles/global.css` (`--accent`, `--accent-bright`…). Pour passer au rouge de la maquette, les valeurs à mettre sont indiquées en commentaire.
- Les sections de l’accueil sont des composants indépendants dans `src/components/home/` (`HomeHero`, `Prestations`, `ServicesList`, `FeatureCards`, `Testimonials`).
- Les icônes viennent de [Lucide](https://lucide.dev) (`src/components/Lucide.astro`), insérées en SVG à la génération : aucun script envoyé au navigateur.
- Les pages intérieures reprennent l’ambiance de l’accueil : en-tête sombre avec halo rose (`.page-hero`).

## Réservation en ligne (démonstration)

`/commande/` montre un parcours d’achat complet : choix de la voiture, du circuit et de la formule (prix réels hors promotion, dans `src/data/pricing.json`), coffret ou chèque cadeau, option cadeau et envoi par courrier, coordonnées, choix du moyen de paiement, puis confirmation.

**Aucun paiement n’est encaissé et aucun numéro de carte n’est demandé.** La commande de démonstration est seulement gardée dans le navigateur du visiteur pour afficher la confirmation. Pour un vrai paiement, il faudra relier l’étape 3 au système de réservation du client ou à un prestataire de paiement (Stripe, PayPal…), avec un compte marchand et des CGV à son nom.

## Animations

Les animations utilisent [GSAP](https://gsap.com) et son module ScrollTrigger (`src/scripts/motion.ts`). On peut tout régler depuis ce seul fichier :

- **Défilement doux** : [Lenis](https://lenis.darkroom.engineering), sur ordinateur uniquement ; les liens internes (« Découvrir nos stages ») glissent jusqu’à la section.
- **Accueil** : la photo se recadre doucement, le titre se dévoile ligne par ligne, le grand texte « sprint racing » remonte, la carte vidéo et le bouton rond flottent de quelques pixels ; au défilement, la photo et le grand texte bougent à des vitesses différentes (parallaxe légère).
- **Panneau des stages** : le mot géant « pilotage » glisse au défilement, les pastilles apparaissent puis flottent.
- **En-tête** : il prend une ombre dès qu’on quitte le haut de page, se masque quand on descend et revient dès qu’on remonte.
- **Avis clients** : carrousel automatique (pause au survol), flèches précédent / suivant.
- **Défilement** : titres de section, cartes, étapes, avis et questions apparaissent avec un fondu et une petite montée.
- **Chiffres clés** : ils comptent jusqu'à leur valeur (20 ans, 450 dates, 8,6/10…).
- **Survols** : cartes qui se soulèvent, photos qui zooment légèrement, flèches qui pivotent, boutons qui changent de couleur.

Toutes les animations sont désactivées pour les visiteurs qui ont demandé à réduire les animations sur leur appareil : le contenu s'affiche alors directement.

## Tarifs

Les prix affichés sont les prix **« à partir de », hors promotion**, relevés sur le site actuel en novembre 2026. Ils varient selon le circuit et le nombre de tours. Ce sont des indications, et le tarif exact est confirmé par le service client.

## À compléter avant la mise en ligne

- [ ] L’adresse de réception des formulaires (`formEndpoint`)
- [ ] L’hébergeur dans les mentions légales, et un lien vers les CGV
- [ ] Le planning en ligne et l’espace « Mon compte », si on veut les relier au nouveau site
- [ ] Une vérification des tarifs et des formules avec l’équipe Sprint Racing

## Mise en ligne

Le dossier `dist/` produit par `npm run build` peut être déposé sur n’importe quel hébergeur statique (Netlify, Vercel, Cloudflare Pages, OVH…).

Sur **Netlify**, le fichier `netlify.toml` contient déjà les réglages (commande `npm run build`, dossier `dist`, Node 22). Il suffit d’importer le dépôt depuis GitHub et de choisir la branche à publier. L’adresse finale du site se règle dans `astro.config.mjs` (`site`).
