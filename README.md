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
| Accueil | `/` | Accroche, recherche rapide, expériences, flotte, chiffres clés, étapes, cadeau, avis, circuits, entreprises, FAQ |
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
- `hd/` : la Lamborghini Temerario de l’accueil, en haute définition. Photo de Calreyn88 (Wikimedia Commons), licence **CC BY-SA 4.0** : le crédit figure dans les mentions légales et doit y rester.

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

Style « studio » monochrome, inspiré des sites automobiles haut de gamme : fond gris très clair (`--bg`), cartes blanches, texte noir, boutons noirs arrondis, typographie Inter en minuscules. Les voitures sont détourées et posées sur un dégradé gris (`--studio`). Le magenta de la marque ne sert plus qu’au logo et aux petites pastilles des libellés. Tout se règle dans les variables en haut de `src/styles/global.css`.

## Réservation en ligne (démonstration)

`/commande/` montre un parcours d’achat complet : choix de la voiture, du circuit et de la formule (prix réels hors promotion, dans `src/data/pricing.json`), coffret ou chèque cadeau, option cadeau et envoi par courrier, coordonnées, choix du moyen de paiement, puis confirmation.

**Aucun paiement n’est encaissé et aucun numéro de carte n’est demandé.** La commande de démonstration est seulement gardée dans le navigateur du visiteur pour afficher la confirmation. Pour un vrai paiement, il faudra relier l’étape 3 au système de réservation du client ou à un prestataire de paiement (Stripe, PayPal…), avec un compte marchand et des CGV à son nom.

## Animations

Les animations utilisent [GSAP](https://gsap.com) et son module ScrollTrigger (`src/scripts/motion.ts`). On peut tout régler depuis ce seul fichier :

- **Accueil** : la photo se recadre doucement, puis titre, texte et boutons arrivent en cascade, et la photo prend un léger effet de profondeur au défilement.
- **Défilement** : titres de section, cartes, étapes, avis et questions apparaissent avec un fondu et une petite montée.
- **Chiffres clés** : ils comptent jusqu'à leur valeur (20 ans, 450 dates, 8,6/10…).
- **Survols** : les boutons et les cartes réagissent au survol et au clic.

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
