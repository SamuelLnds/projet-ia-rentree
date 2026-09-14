# Direction visuelle

## Parti pris

**Un back-office de prospection B2B, pas un jeu.**

Kevin vend des CRM et des outils de génération de leads. L'interface parodie donc
ses propres produits : une console dense, des chiffres alignés, du monospace, des
lignes de tableau. La blague tient à ce que cliquer sur une photo de prof soit
présenté avec le sérieux d'un dashboard de MRR.

Conséquence directe : **de la densité et des angles droits**, pas des cartes
flottantes arrondies. Si l'écran ressemble à une landing page, c'est raté.

## Mise en page

```
┌──────────────────────────────────────────────────────────────┐
│ KEVIN CLICKER                    12 480 €        ← barre fine │
│                                  +47 €/s                      │
├────────────────────────────────────┬─────────────────────────┤
│                                    │ NK INFORMATIQUE      ×3  │
│                                    │ +1 €/clic          23 €  │
│          [ image de Kevin ]        ├─────────────────────────┤
│            cliquable               │ MICROLEAD            ×1  │
│                                    │ +1 €/s            115 €  │
│                                    ├─────────────────────────┤
│                                    │ PROSPECT-IT          ×0  │
│                                    │ +8 €/s           1 100 € │
│                                    ├─────────────────────────┤
│                                    │ SKRAAP.IT            ×0  │
│                                    │ +47 €/s         12 000 € │
└────────────────────────────────────┴─────────────────────────┘
```

- Barre haute fine (56 px), séparée par un filet 1 px.
- Zone de clic à gauche, occupe tout le reste.
- Colonne boutique à droite, largeur fixe 340 px, lignes denses collées les unes
  aux autres (pas d'espace entre les entrées, juste un filet 1 px).
- Toute la ligne d'amélioration est cliquable, pas un bouton à l'intérieur.

## Couleurs

| Rôle | Valeur |
| --- | --- |
| Fond | `#0E0F0D` — noir légèrement olive, ni noir pur ni bleu nuit |
| Surface (colonne boutique) | `#171915` |
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
  `font-variant-numeric: tabular-nums`. Alignés à droite. Un chiffre qui bouge
  latéralement pendant qu'il s'incrémente, c'est du bruit.
- **Texte** : pile système (`-apple-system, "Segoe UI", system-ui, sans-serif`).
- **Noms d'améliorations** : majuscules, `letter-spacing: 0.08em`, 12 px, gras.
- **Total d'argent** : 32 px, gras, monospace.
- Pas de police téléchargée : aucune requête réseau, le jeu marche hors ligne.

## Formes et mouvement

- `border-radius: 2px` maximum. Le reste est à angle droit.
- Aucune ombre portée.
- Bordures 1 px, jamais 2.
- **Clic sur Kevin** : `transform: scale(0.96)` pendant 80 ms, retour immédiat.
  Sec, pas d'élastique.
- **Gain** : `+1 €` en monospace apparaît à la position du curseur, monte de 40 px
  et disparaît en 600 ms.
- Aucune animation permanente : pas de pulsation, pas de halo, pas de respiration.
  L'écran est immobile tant qu'on ne joue pas.

## Ce qu'on refuse explicitement

- Le héros centré avec sous-titre et bouton d'appel à l'action.
- Les cartes à trois colonnes.
- Le dégradé violet, et tout dégradé en général.
- Le glassmorphism, le `backdrop-filter`, les surfaces translucides.
- Les gros coins arrondis et les ombres douces.
- Les emoji utilisés comme icônes d'interface.
- Le vert néon qui brille (`box-shadow` coloré, `text-shadow`).
- Les grandes marges vides : ici, c'est dense.
