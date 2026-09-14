# Direction visuelle

> Deuxième révision. La v1 était austère, la v2 l'a réchauffée, celle-ci assume :
> le jeu doit **vivre**. Une consigne explicite du deuxième retour : plus de
> couleurs, plus d'animation, plus de dopamine.

## Parti pris

**Un back-office de prospection B2B qui surchauffe.**

Le châssis ne bouge pas : console dense, filets 1 px, angles droits, chiffres
monospace alignés. Ce qui change, c'est ce qui le traverse — billets, combos,
témoignages, minuteur de speedrun.

La tension du design est là et elle est la règle de décision : **le cadre reste
comptable, le contenu part en fête foraine**. Si on arrondit le châssis ou qu'on
ajoute des ombres douces, l'excès n'a plus rien contre quoi se détacher et tout
retombe en interface générique. On garde donc :

- filets 1 px, `border-radius: 2px` maximum sur le châssis,
- aucune ombre portée sur la structure,
- les couleurs vives réservées à ce qui bouge, jamais aux fonds.

## Couleurs

Le fond et la structure restent monochromes. La couleur est un **signal**, pas une
décoration : chaque teinte veut dire quelque chose.

| Rôle | Valeur |
| --- | --- |
| Fond | `#0E0F0D` |
| Surface | `#171915` |
| Ligne survolée | `#1F2219` |
| Filets | `#2A2E26` |
| Texte / secondaire | `#E6E8E1` / `#868C78` |
| **Vert** — argent, production, prix abordable | `#6FCF5F` |
| **Or** — bonus temporaires, témoignages, victoire | `#E8B53A` |
| **Rouge** — indisponible, urgence, fin de bonus | `#E05A4E` |
| **Bleu** — revenu passif, Prospect-it | `#4A9FE0` |
| **Violet** — Skraap.it, dernier palier | `#A96FD4` |

Chaque amélioration porte sa couleur, sur son pictogramme et sur son prix. La
boutique se lit d'un coup d'œil sans lire les noms.

**Le combo escalade en couleur** : vert → or → rouge. C'est le seul endroit où la
couleur sert d'intensité plutôt que de catégorie, et c'est assumé.

## Typographie

- **Chiffres** : monospace, `tabular-nums`. Un chiffre qui tressaute latéralement
  en s'incrémentant, c'est du bruit.
- **Texte** : pile système.
- **Titre** : 22 px, graisse 800, `letter-spacing: 0.16em`. « KEVIN » en blanc,
  « CLICKER » en vert.
- **Total d'argent** : 44 px monospace, centré au-dessus du portrait, avec une
  pulsation de 1,06 à chaque clic.
- **Minuteur** : monospace, `m:ss.cc`, dans la barre haute. Vert quand la run
  tourne, or une fois terminée.
- Aucune police téléchargée : le jeu marche hors ligne.

## Les billets

**Dessinés en SVG, pas photographiés.** Cinq coupures — 5, 10, 20, 50, 100 —
chacune avec sa couleur, son cartouche, sa fenêtre ovale, ses guillochés et son
chiffre. La coupure tirée dépend de la valeur du clic : plus tu tapes fort, plus
les billets qui volent sont gros.

Pourquoi pas de photo : reproduire un vrai billet en euro est encadré par la BCE,
et une image distante casserait le hors-ligne. Un billet dessiné avec assez de
détail produit le même décalage comique sans ces deux problèmes.

## Mouvement

La règle « l'écran est immobile au repos » **saute**. Elle est remplacée par :
*aucun mouvement ne doit gêner la lecture du compteur ni du minuteur.*

| Effet | Déclencheur | Durée |
| --- | --- | --- |
| Billets projetés en éventail | chaque clic | 900 ms |
| Pluie de billets en fond | chaque clic | 3 à 5 s |
| Gain chiffré `+X €` | chaque clic | 600 ms |
| Pulsation du compteur | chaque clic | 180 ms |
| Combo qui grossit et change de couleur | 5 clics enchaînés | tant que ça dure |
| Flash de la ligne achetée | achat | 400 ms |
| Écran de victoire + pluie de billets | dernier palier acheté | jusqu'au clic |

Plafond de 90 particules simultanées. Au-delà, on ne crée plus rien : un joueur
qui matraque ne doit pas faire ramer la page.

## Ce qu'on refuse toujours

- Le héros centré avec sous-titre et bouton d'appel à l'action.
- Les cartes à trois colonnes.
- Le dégradé violet, et tout dégradé sur le châssis.
- Le glassmorphism, le `backdrop-filter`.
- Les ombres portées et les coins arrondis sur la structure — le disque du
  portrait reste l'exception unique.
- Les emoji comme icônes d'interface.
- Les couleurs vives en aplat de fond : elles sont réservées au mouvement.
