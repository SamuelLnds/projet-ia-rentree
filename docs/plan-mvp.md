# Plan MVP — Kevin Clicker

Cinq étapes. Chacune laisse le jeu dans un état **jouable et vérifiable**.
Budget visé : une heure au total. Si le temps manque, l'étape 5 saute sans dommage.

---

## - [ ] 1. Le clic rapporte

**Produit** : une page ouvrable qui affiche la tête de Kevin, un total à `0 €`, et
qui monte de 1 € à chaque clic. La direction visuelle est appliquée d'emblée
(couleurs, typo, mise en page deux colonnes) pour ne pas avoir à repasser derrière.

**Fichiers** : `index.html`, `style.css`, `game.js`, `assets/kevin.png` (placeholder).

**Vérification** : ouvrir `index.html` dans le navigateur, cliquer dix fois,
le compteur affiche `10 €`. La colonne de droite est présente mais vide.

**Note** : le placeholder est une image temporaire. Le vrai fichier prendra sa
place sous le même nom, sans toucher au code.

---

## - [ ] 2. La boutique et l'achat

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

## - [ ] 3. Le revenu automatique

**Produit** : une boucle à 10 Hz qui ajoute le revenu passif. Les trois dernières
améliorations deviennent réellement utiles. Le `€/s` s'affiche sous le total.

**Fichiers** : `game.js`.

**Vérification** : acheter Microlead, poser la souris, regarder le compteur monter
de 1 € par seconde. Le `€/s` affiché correspond à la somme des productions.

---

## - [ ] 4. La sauvegarde

**Produit** : l'état est écrit dans `localStorage` toutes les 5 secondes et à la
fermeture de l'onglet. Il est relu au chargement. Un bouton discret en bas de la
colonne efface la partie, avec confirmation.

**Fichiers** : `game.js`, `index.html` (le bouton), `style.css`.

**Vérification** : jouer, F5, retrouver son argent et ses achats. Cliquer sur
« effacer », confirmer, tout repart à zéro.

**Incertitude** : un fichier ouvert en `file://` a bien accès à `localStorage` sur
Chrome et Firefox, mais le stockage est cloisonné par fichier. À vérifier au
moment de l'étape ; si ça coince, on sert le dossier avec un serveur statique
(`python -m http.server`) et on le note dans les commandes.

---

## - [ ] 5. Les finitions

**Produit** : ce qui rend le clic agréable, et rien d'autre.

- `+X €` qui s'envole depuis le curseur à chaque clic.
- Rebond sec de l'image au clic.
- Grands nombres formatés avec séparateurs de milliers (`12 480 €`).
- `<title>` et favicon.

**Fichiers** : `game.js`, `style.css`, `index.html`.

**Vérification** : cliquer vite vingt fois d'affilée, l'animation suit sans
saccade et les nombres restent lisibles.

---

## Après le MVP (non planifié)

Volontairement laissé de côté : prestige, succès, sons, classement, responsive
mobile. Rien de tout cela n'entre dans l'heure.
