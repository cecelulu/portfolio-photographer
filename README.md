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
| Demande de stage | `/reservation/` | Formulaire en 4 étapes avec récapitulatif et prix indicatif |
| Contact, Merci, Mentions légales, 404 | | |

## Modifier le contenu

Tout le contenu est rassemblé dans `src/data/` :

- `site.ts` : téléphones, e-mails, horaires, adresse, mentions légales, chiffres clés, **adresse de réception des formulaires**
- `cars.json` : les voitures (nom, puissance, moteur, boîte, prix « à partir de », description, circuits)
- `circuits.json` : les circuits (nom, ville, département, région, longueur, voitures disponibles)
- `experiences.ts` : les familles de stages et les formules des pages spéciales
- `content.ts` : étapes, déroulement, options, coffrets cadeaux, avis clients, FAQ, présentation

Les photos et le logo sont dans `public/images/` (repris du site actuel, convertis en WebP).

## Formulaires (demande de stage, devis, contact)

Le site est statique : il faut indiquer où envoyer les demandes. Dans `src/data/site.ts`, `formEndpoint` :

- **vide (réglage actuel)** : à l’envoi, la messagerie du visiteur s’ouvre avec la demande pré-remplie, adressée à `contact@sprint-racing.com` (ou `cguiod@groupe-ppk.com` pour les devis entreprises).
- **une URL** (par exemple un formulaire [Formspree](https://formspree.io), Getform, Basin ou une API maison) : la demande est envoyée directement en arrière-plan, puis le visiteur arrive sur la page `/merci`.

Les formulaires comprennent une validation des champs, un champ anti-spam invisible et une case de consentement RGPD.

## Tarifs

Les prix affichés sont les prix **« à partir de », hors promotion**, relevés sur le site actuel en novembre 2026. Ils varient selon le circuit et le nombre de tours. Ce sont des indications, et le tarif exact est confirmé par le service client.

## À compléter avant la mise en ligne

- [ ] L’adresse de réception des formulaires (`formEndpoint`)
- [ ] L’hébergeur dans les mentions légales, et un lien vers les CGV
- [ ] Le planning en ligne et l’espace « Mon compte », si on veut les relier au nouveau site
- [ ] Une vérification des tarifs et des formules avec l’équipe Sprint Racing

## Mise en ligne

Le dossier `dist/` produit par `npm run build` peut être déposé sur n’importe quel hébergeur statique (Netlify, Vercel, Cloudflare Pages, OVH…). L’adresse finale du site se règle dans `astro.config.mjs` (`site`).
