---
description: Entretien de cadrage, puis génération des documents du projet
---

Tu mènes la phase de cadrage. **N'écris aucune ligne de code applicatif pendant cette commande.**

## 1. Entretien

Pose tes questions par lots de 3 à 5 maximum, et attends mes réponses avant le lot suivant. Commence par le fonctionnel, finis par le technique. Reformule ce que tu as compris avant de passer au lot suivant.

À couvrir, en ignorant ce qui est déjà renseigné dans `CLAUDE.md` :

**Fonctionnel**

- Qui utilise l'outil, dans quelle situation, et que fait-il aujourd'hui à la place ?
- Quel est le seul parcours qui doit marcher pour que le MVP soit considéré comme réussi ?
- Qu'est-ce qui est explicitement hors périmètre ?
- Comment saura-t-on que c'est validé (critère observable) ?

**Technique**

- Contraintes imposées : langage, framework, hébergement, existant à réutiliser ?
- Données : quelles entités, d'où viennent-elles, faut-il les persister ?
- Intégrations externes, authentification, contraintes de confidentialité ?
- Qui reprend ce code après, et avec quel niveau de familiarité ?

**Interface** (si le projet en a une)

- Références visuelles, ton, contraintes de charte ?
- Ce qu'il faut éviter de produire ?

Si une réponse est « je ne sais pas », propose 2 options avec leur compromis et note la décision comme provisoire. Ne comble jamais un trou par une hypothèse silencieuse.

## 2. Documents

Une fois l'entretien clos, écris :

- **`docs/contexte.md`** — problème, utilisateur, parcours cible, périmètre et hors périmètre, critère de réussite, décisions techniques avec leur justification, questions restées ouvertes.
- **`docs/plan-mvp.md`** — une liste d'étapes `- [ ]` ordonnées, chacune livrant quelque chose d'observable et tenant en une session. Pour chaque étape : ce qui est produit, les fichiers touchés, comment vérifier que ça marche. Signale les étapes dont le résultat est incertain.
- **`docs/direction-visuelle.md`** — seulement s'il y a une interface : parti pris, typographie, couleurs, et ce qu'on refuse.
- **`CLAUDE.md`** — remplace les `<chevrons>` par les valeurs décidées, supprime les sections sans objet. Ne le fais pas grossir : tout ce qui est détaillé va dans `docs/`.

## 3. Validation

Termine par un résumé court : ce que tu as compris, les 3 décisions les plus structurantes, et les points où tu penses t'être trompé. Puis arrête-toi et attends ma validation avant toute implémentation.
