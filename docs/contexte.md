# Contexte — Kevin Clicker

## Problème

Aucun. C'est un exercice de rentrée M2 : produire un jeu web jouable en une heure,
sur le modèle de Cookie Clicker, à la gloire (relative) de notre professeur Kévin Niel.

La contrainte réelle n'est pas fonctionnelle, elle est temporelle : **une heure, montre en main**.
Tout le cadrage découle de là.

## Utilisateur

N'importe qui ouvrant la page. Pas de profil, pas de segmentation, pas de compte.
Le joueur type est un camarade de promo qui clique deux minutes pour voir la blague.

## Parcours cible

1. J'ouvre `index.html`.
2. Je vois la tête de Kevin au centre et un compteur à `0 €`.
3. Je clique sur Kevin → `+1 €`. Le compteur monte.
4. À `15 €` je peux acheter **NK Informatique** : mes clics rapportent plus.
5. À `100 €` j'achète **Microlead** : l'argent commence à tomber tout seul.
6. Je continue avec **Prospect-it** puis **Skraap.it**, de plus en plus cher, de plus en plus rentable.
7. Je ferme l'onglet, je reviens : ma partie est là.

## Périmètre

**Dans le MVP**

- Un clic = de l'argent.
- Quatre améliorations achetables, à prix croissant, achetables plusieurs fois.
- Une améliore le clic, trois produisent automatiquement.
- Total d'argent et revenu par seconde affichés en permanence.
- Sauvegarde locale automatique.
- Un bouton pour effacer la partie.

**Hors périmètre, décidé**

- Pas de compte, pas de serveur, pas de classement en ligne.
- Pas de prestige / renaissance.
- Pas de succès, pas de statistiques, pas de son.
- Pas de responsive mobile poussé : la cible est un écran de portable.
- Pas de build, pas de framework, pas de dépendance npm.

## Critère de réussite

Observable, en une seule session de jeu :

- Cliquer 15 fois permet d'acheter la première amélioration.
- Après achat de Microlead, le compteur **monte sans que je touche à la souris**.
- Les quatre améliorations sont atteignables en quelques minutes de jeu.
- Un rafraîchissement de page (F5) ne perd pas la partie.

## Décisions techniques

| Décision | Justification |
| --- | --- |
| HTML / CSS / JS vanilla, aucune dépendance | Une heure. Un `npm install` coûte plus cher que tout le jeu. Ouvrir le fichier suffit à tester. |
| Trois fichiers : `index.html`, `style.css`, `game.js` | Séparation minimale et lisible. Pas de modules ES, pas de bundler. |
| État dans un unique objet `state` en mémoire | Le jeu tient dans une vingtaine de variables. Pas de store, pas d'événements custom. |
| `localStorage`, une seule clé JSON | Dix lignes, aucune infrastructure. Suffisant pour un jeu solo local. |
| Boucle de jeu à 10 Hz (`setInterval` 100 ms) | Compteur fluide sans coût. `requestAnimationFrame` serait plus correct mais inutile ici. |
| Coûts × 1,15 à chaque achat | Courbe de Cookie Clicker, éprouvée. Pas de game design à inventer. |
| Valeurs de départ reprises de Cookie Clicker (15 / 100 / 1 100 / 12 000) | Progression connue pour être plaisante sur les premières minutes. |

## Thème

Les quatre améliorations sont les projets réels de Kévin Niel, ordonnés comme sa
trajectoire : d'abord la prestation à la main, ensuite les produits qui tournent seuls.

| # | Nom | Réalité | Rôle dans le jeu |
| --- | --- | --- | --- |
| 1 | **NK Informatique** | Sa SARL : formation, dev, graphisme, audit | Prestation manuelle → **améliore le clic** |
| 2 | **Microlead** | Plateforme e-learning, ses cours IT | Revenu récurrent, petit |
| 3 | **Prospect-it** | CRM de relance automatisée | Revenu récurrent, moyen |
| 4 | **Skraap.it** | Leads B2B qualifiés en un clic | Revenu récurrent, gros |

## Questions ouvertes

- **L'image de Kevin n'est pas encore fournie.** On code contre un placeholder
  `assets/kevin.png`. Le remplacement du fichier suffira, aucun code à toucher.
  → à confirmer : le cadrage de l'image (carrée ? détourée ?).
- **Le ton** : on reste bon enfant. Si une formulation dérape, elle se change en un
  endroit unique (le tableau `UPGRADES` dans `game.js`).
