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
- Total d'argent et revenu par seconde affichés en permanence. Le `€/s` inclut la
  cadence de clic mesurée sur les 3 dernières secondes, pas seulement le passif.
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
| Grille de valeurs recalée après test (voir ci-dessous) | La reprise brute de Cookie Clicker était fausse : son premier bâtiment produit du passif, le mien produit du clic. |

## Équilibrage

**L'erreur d'origine.** J'avais repris la grille de Cookie Clicker
(15 / 100 / 1 100 / 12 000) en changeant la nature du premier bâtiment : son
curseur donne `+0,1` de production *passive*, mon NK Informatique donnait `+1 €`
par *clic*. À 4 clics/seconde, cela vaut `+4 €/s` pour 15 € — dix fois trop fort
pour cette grille de prix. Conséquence mesurée par simulation : 14 achats de NK
avant le premier Microlead, Skraap.it jamais atteint en 5 minutes, et le clic
représentant 68 % du revenu final. Les améliorations passives étaient décoratives.

**La correction.** Puissance du clic divisée par deux, revenus passifs multipliés
par 6 à 17, coût du dernier palier réduit de moitié.

| Amélioration | Avant | Après |
| --- | --- | --- |
| NK Informatique | 15 € — +1 €/clic | **20 € — +0,5 €/clic** |
| Microlead | 100 € — +1 €/s | **100 € — +8 €/s** |
| Prospect-it | 1 100 € — +8 €/s | **900 € — +90 €/s** |
| Skraap.it | 12 000 € — +47 €/s | **5 000 € — +800 €/s** |

**Vérification.** Simulation d'un joueur achetant toujours le meilleur rendement
par euro parmi ce qu'il peut se payer, sur 5 minutes :

| | Avant | Après |
| --- | --- | --- |
| Part du passif dans le revenu (4 clics/s) | 32 % | **99 %** |
| Skraap.it atteint ? | non | **oui, vers 4 min** |
| Arrivée des paliers | NK 4 s, Microlead 25 s, Prospect-it 2 min 39 | **NK 5 s, Microlead 44 s, Prospect-it 2 min 26, Skraap.it 4 min 13** |

Le modèle de joueur compte : un joueur « épargnant parfait » qui vise le meilleur
temps de retour se bloque à viser Skraap.it et n'achète plus rien. C'est le
modèle glouton qui décrit un joueur réel, et c'est celui qui a servi au réglage.

## Thème

Les quatre améliorations sont les projets réels de Kévin Niel, ordonnés comme sa
trajectoire : d'abord la prestation à la main, ensuite les produits qui tournent seuls.

| # | Nom | Réalité | Rôle dans le jeu |
| --- | --- | --- | --- |
| 1 | **NK Informatique** | Sa SARL : formation, dev, graphisme, audit | Prestation manuelle → **améliore le clic** |
| 2 | **Microlead** | Plateforme e-learning, ses cours IT | Revenu récurrent, petit |
| 3 | **Prospect-it** | CRM de relance automatisée | Revenu récurrent, moyen |
| 4 | **Skraap.it** | Leads B2B qualifiés en un clic | Revenu récurrent, gros |

## Cycle 3 — le jeu devient un speedrun

Le deuxième retour change la nature de l'objet : on ne cherche plus seulement à
faire tourner un clicker, mais à donner envie de **recommencer**. D'où un but,
un chronomètre et une fin.

**Le but.** La run démarre au premier clic et s'arrête au premier achat de
Skraap.it, le dernier palier. Écran de victoire avec le temps final et le
meilleur temps. Pas de compte, pas de classement en ligne : le record est dans
`localStorage`, comme le reste.

**Le chronomètre ne compte que le temps joué.** Il est incrémenté dans la boucle
de jeu, pas calculé depuis un horodatage de départ. Sinon fermer l'onglet une
nuit ruinerait la run — or rien n'oblige à jouer d'une traite.

**Les bonus temporaires** sont un second type d'achat : on paie une somme fixe
pour un multiplicateur pendant quelques secondes. Ils ne se cumulent pas avec
eux-mêmes ; relancer un bonus actif remet son minuteur à zéro. Ils ne sont pas
sauvegardés — ce sont des effets, pas une progression.

**Le combo** récompense la cadence : des clics enchaînés à moins de 1,2 s
d'intervalle font monter un multiplicateur plafonné à ×2,5. C'est ce qui rend le
clic manuel pertinent dans une optique de speedrun, alors que l'équilibrage du
cycle 2 le rendait négligeable en fin de partie.

### Décisions

| Décision | Justification |
| --- | --- |
| Billets dessinés en SVG, pas photographiés | Reproduire un billet en euro est encadré par la BCE, et une image distante casserait le hors-ligne. Le décalage comique recherché tient au détail du dessin, pas à la photo. |
| Bonus à coût fixe, pas de coût croissant | Ce sont des consommables, pas une progression. Un coût croissant les rendrait inutilisables en fin de run, là où ils servent justement. |
| Multiplicateurs multiplicatifs entre eux | Deux bonus actifs se multiplient. C'est ce qui crée le pic de dopamine recherché. |
| Témoignages de `kevinniel.fr` abandonnés | Demandés puis retirés du périmètre par le commanditaire. Note technique conservée : le jeu n'aurait pas pu les appeler à l'exécution (CORS, hors-ligne), il aurait fallu les recopier dans le code. |

## Questions ouvertes

- ~~L'image de Kevin n'est pas encore fournie.~~ **Réglé** : `assets/kevin.png`,
  310 × 330, PNG RVBA détouré sur fond transparent. Le style en tient compte —
  pas de cadre autour, la tête flotte sur le fond sombre.
  → reste à juger à l'œil : le détourage laisse un liseré clair sur les cheveux,
  visible sur fond sombre. À voir si ça gêne.
- **Le ton** : on reste bon enfant. Si une formulation dérape, elle se change en un
  endroit unique (le tableau `UPGRADES` dans `game.js`).
