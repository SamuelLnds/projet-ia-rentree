# Direction visuelle

> Révisé après le premier retour de test. La version initiale était trop austère :
> elle refusait tout mouvement et ne mettait rien en valeur. Le jeu a besoin de
> récompenser le clic à l'écran, pas seulement dans le compteur.

## Parti pris

**Un back-office de prospection B2B qui déborde d'argent.**

Kevin vend des CRM et des outils de génération de leads. L'interface parodie donc
ses propres produits : une console dense, des chiffres alignés, du monospace, des
lignes de tableau. La blague tient à ce que cliquer sur une photo de prof soit
présenté avec le sérieux d'un tableau de bord de MRR.

La tension du design est là : **un châssis sobre et rectiligne, traversé par une
pluie de billets**. L'austérité du cadre rend l'excès lisible. Si on arrondit le
châssis, l'effet retombe.

## Mise en page

```
┌────────────────────────────────────────────────────────┐
│ KEVIN CLICKER                                    [ › ] │
├──────────────────────────────────┬─────────────────────┤
│            12 480 €              │ ⌁ NK INFORMATIQUE ×3│
│             +47 €/s              │   +0,5 €/clic   26 €│
│                                  ├─────────────────────┤
│         ╭──────────╮             │ ⌁ MICROLEAD       ×1│
│         │  Kevin   │  ← rond     │   +8 €/s       115 €│
│         ╰──────────╯             ├─────────────────────┤
│        (billets qui volent)      │ ⌁ PROSPECT-IT     ×0│
└──────────────────────────────────┴─────────────────────┘
```

- **Le compteur est au-dessus du portrait**, pas dans un coin. C'est l'information
  que le joueur fixe en cliquant : elle doit être dans son axe de regard.
- Barre haute réduite au titre et au bouton de repli du panneau.
- **Panneau d'améliorations repliable.** Replié, le portrait occupe toute la largeur.
- Lignes de boutique denses, collées, séparées par un filet 1 px.

## Le portrait

Cadre **circulaire**, seule courbe assumée de l'interface : une médaille, un
portrait d'entreprise. Le reste de l'écran reste à angle droit.

- Disque de fond `--surface`, anneau 1 px `--line`.
- L'image détourée est alignée en bas du disque : la tête est centrée, les épaules
  touchent le bord.
- **Survol** : l'anneau passe à l'accent, le disque s'agrandit de 2 %.
- **Clic** : `scale(0.96)` pendant 80 ms. Sec, pas d'élastique.

## Couleurs

| Rôle | Valeur |
| --- | --- |
| Fond | `#0E0F0D` — noir légèrement olive, ni noir pur ni bleu nuit |
| Surface (boutique, disque) | `#171915` |
| Ligne survolée | `#1F2219` |
| Filets / bordures | `#2A2E26` |
| Texte principal | `#E6E8E1` |
| Texte secondaire | `#868C78` |
| Accent — argent, gains, prix abordables | `#6FCF5F` |
| Indisponible — prix trop élevé | `#9C5F52` |
| Désactivé | `#4A4F42` |

Une seule couleur d'accent. Aucun dégradé, nulle part.

## Typographie

- **Chiffres** : `ui-monospace, "Cascadia Mono", Consolas, monospace`, avec
  `font-variant-numeric: tabular-nums`. Un chiffre qui tressaute latéralement
  pendant qu'il s'incrémente, c'est du bruit.
- **Texte** : pile système (`-apple-system, "Segoe UI", system-ui, sans-serif`).
- **Titre** : 22 px, graisse 800, `letter-spacing: 0.16em`, majuscules.
  « KEVIN » en texte principal, « CLICKER » en accent — le titre se lit en deux
  temps sans qu'on ait à dessiner un logo.
- **Total d'argent** : 44 px, gras, monospace, centré au-dessus du portrait.
- Aucune police téléchargée : le jeu marche hors ligne.

## Icônes des améliorations

**SVG écrits à la main, intégrés dans le code.** Pas de banque d'images : ça
imposerait une requête réseau (le jeu ne marcherait plus hors ligne) et poserait
une question de licence pour un rendu scolaire. Quatre pictogrammes de 20 px,
tracés à 1,6 px, sans remplissage, qui héritent de la couleur du texte :

| Amélioration | Pictogramme | Pourquoi |
| --- | --- | --- |
| NK Informatique | chevrons `< >` | la prestation, le code écrit à la main |
| Microlead | toque de diplômé | la formation, le e-learning |
| Prospect-it | entonnoir | le tunnel de conversion d'un CRM |
| Skraap.it | aimant | la captation de leads |

## Mouvement

Règle : **l'écran est immobile tant qu'on ne joue pas.** Tout mouvement est
déclenché par un clic, aucun ne tourne en boucle au repos.

- **Billets volants** — 3 par clic, projetés depuis le curseur vers le haut en
  éventail, avec rotation, effacés en 900 ms. Petits rectangles bordés d'accent
  portant un `€` : c'est la récompense immédiate du clic.
- **Pluie de fond** — 1 pièce par clic, lâchée en haut de la scène, qui descend
  lentement (3 à 5 s) en dérivant. Opacité basse : c'est un décor, pas une
  information. Derrière le portrait.
- **Gain chiffré** — `+X €` monte de 40 px depuis le curseur et s'efface en 600 ms.
  Conservé malgré les billets : c'est le seul retour qui donne le *montant*.
- Plafond de 60 particules simultanées, au-delà on ne crée plus rien. Un joueur
  qui matraque le clic ne doit pas faire ramer la page.

## Ce qu'on refuse explicitement

- Le héros centré avec sous-titre et bouton d'appel à l'action.
- Les cartes à trois colonnes.
- Le dégradé violet, et tout dégradé en général.
- Le glassmorphism, le `backdrop-filter`, les surfaces translucides.
- Les ombres portées et les coins arrondis — **sauf le disque du portrait**, qui
  est l'exception unique et assumée.
- Les emoji utilisés comme icônes d'interface.
- Le vert néon qui brille (`box-shadow` coloré, `text-shadow`).
- Toute animation qui tourne au repos : pulsation, halo, respiration.
- Les grandes marges vides : ici, c'est dense.
