# Plan MVP — Kevin Clicker

Cinq étapes. Chacune laisse le jeu dans un état **jouable et vérifiable**.
Budget visé : une heure au total. Si le temps manque, l'étape 5 saute sans dommage.

---

## - [x] 1. Le clic rapporte

**Produit** : une page ouvrable qui affiche la tête de Kevin, un total à `0 €`, et
qui monte de 1 € à chaque clic. La direction visuelle est appliquée d'emblée
(couleurs, typo, mise en page deux colonnes) pour ne pas avoir à repasser derrière.

**Fichiers** : `index.html`, `style.css`, `game.js`, `assets/kevin.png`.

**Vérification** : ouvrir `index.html` dans le navigateur, cliquer dix fois,
le compteur affiche `10 €`. La colonne de droite est présente mais vide.

**Note** : développé contre un placeholder, remplacé en cours de route par la
vraie photo (détourée, fond transparent) déposée sous le même nom. Aucun code à
changer, seulement le retrait de la bordure qui encadrait le placeholder.

---

## - [x] 2. La boutique et l'achat

**Produit** : les quatre améliorations s'affichent, avec leur prix et le nombre
déjà possédé. Cliquer sur une ligne abordable débite l'argent, incrémente le
compteur de l'amélioration et augmente son prix de 15 %. Une ligne trop chère est
visuellement inerte et refuse le clic.

Seul **NK Informatique** a un effet à ce stade : `+1 € par clic` et par exemplaire.

| Amélioration | Prix de départ | Effet |
| --- | --- | --- |
| NK Informatique | 15 € | +1 €/clic |
| Microlead | 100 € | +1 €/s |
| Prospect-it | 1 100 € | +8 €/s |
| Skraap.it | 12 000 € | +47 €/s |

**Fichiers** : `game.js` (tableau `UPGRADES`, rendu de la liste, achat), `style.css`.

**Vérification** : cliquer 15 fois, acheter NK Informatique, constater que le
prix passe à 17 € et que chaque clic rapporte désormais 2 €.

---

## - [x] 3. Le revenu automatique

**Produit** : une boucle à 10 Hz qui ajoute le revenu passif. Les trois dernières
améliorations deviennent réellement utiles. Le `€/s` s'affiche sous le total.

**Ajout demandé en cours de route** : le `€/s` compte aussi la cadence de clic.
Les clics des 3 dernières secondes sont horodatés, on en déduit un nombre de clics
par seconde, multiplié par la valeur du clic. Au repos le chiffre redescend au
revenu passif seul. Cette cadence est une mesure, pas une progression : elle n'est
pas sauvegardée.

**Fichiers** : `game.js`.

**Vérification** : acheter Microlead, poser la souris, regarder le compteur monter
de 1 € par seconde. Le `€/s` affiché correspond à la somme des productions.

*Mesuré* : 5,50 € gagnés en 5,51 s à 1 €/s. Avec 3 × NK (clic à 4 €) et
2 × Microlead, six clics en trois secondes affichent bien 10 €/s (2 passif +
2 clics/s × 4 €), puis 2 €/s une fois la souris relâchée.

---

## - [x] 4. La sauvegarde

**Produit** : l'état est écrit dans `localStorage` toutes les 5 secondes et à la
fermeture de l'onglet. Il est relu au chargement. Un bouton discret en bas de la
colonne efface la partie, avec confirmation.

**Fichiers** : `game.js`, `index.html` (le bouton), `style.css`.

**Vérification** : jouer, F5, retrouver son argent et ses achats. Cliquer sur
« effacer », confirmer, tout repart à zéro.

**Incertitude levée** : la vérification a été faite via `python -m http.server`
(configuration dans `.claude/launch.json`), pas en `file://`. Sur ce serveur,
4 242 € et les achats survivent au rechargement. Le comportement en `file://`
n'a **pas** été testé : en cas de doute, servir le dossier.

À noter : la sauvegarde sur `beforeunload` réécrit l'état juste avant un
rechargement. Vider `localStorage` à la console puis recharger ne remet donc rien
à zéro — il faut passer par le bouton « effacer ».

---

## - [x] 5. Les finitions

**Produit** : ce qui rend le clic agréable, et rien d'autre.

- `+X €` qui s'envole depuis le curseur à chaque clic.
- Rebond sec de l'image au clic.
- Grands nombres formatés avec séparateurs de milliers (`12 480 €`).
- `<title>` et favicon.

**Fichiers** : `game.js`, `style.css`, `index.html`.

**Vérification** : cliquer vite vingt fois d'affilée, l'animation suit sans
saccade et les nombres restent lisibles.

---

---

# Cycle 2 — après le premier test

## - [x] 6. Rééquilibrage

**Produit** : la grille de valeurs corrigée (voir `docs/contexte.md`, section
« Équilibrage »). Les trois améliorations passives cessent d'être décoratives.

**Fichiers** : `game.js` (tableau `UPGRADES`).

**Vérification** : acheter une fois chaque amélioration dès qu'elle est abordable.
Après Microlead, le `€/s` doit faire un bond visible, pas `+1`. Skraap.it doit
être atteignable en quelques minutes sans s'acharner.

---

## - [ ] 7. Habillage

**Produit** : les huit demandes cosmétiques du premier retour, d'un bloc parce
qu'elles touchent toutes la même mise en page.

- Portrait dans un cadre circulaire, avec effet de survol.
- Compteur d'argent et `€/s` déplacés au-dessus du portrait.
- Titre du jeu mis en valeur (22 px, « CLICKER » en accent).
- Panneau d'améliorations repliable.
- Pictogrammes SVG sur chaque amélioration.
- Billets qui volent au clic, pluie de pièces en fond.

**Fichiers** : `index.html`, `style.css`, `game.js`.

**Vérification** : cliquer une trentaine de fois d'affilée — les billets partent,
les pièces tombent derrière le portrait, rien ne saccade. Replier le panneau :
le portrait prend toute la largeur. Survoler le portrait : l'anneau s'éclaire.

**Incertitude** : le plafond de 60 particules est un chiffre choisi à vue. À
vérifier en matraquant le clic ; à baisser si ça rame.

---

## Après le MVP (non planifié)

Volontairement laissé de côté : prestige, succès, sons, classement, responsive
mobile. Rien de tout cela n'entre dans l'heure.
