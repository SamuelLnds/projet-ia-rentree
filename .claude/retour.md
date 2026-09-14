---
description: Traiter un retour d'essai et relancer un cycle
---

Je viens de tester. Mon retour suit cette commande.

Procède ainsi, dans l'ordre :

1. **Reformule** le retour en une phrase, et dis s'il s'agit d'un bug, d'un malentendu de cadrage, ou d'un changement de besoin. Ces trois cas ne se traitent pas pareil.
2. **Diagnostique avant de corriger.** Nomme la cause probable et le fichier concerné. Si tu n'es pas sûr, propose comment le vérifier — ne corrige pas à l'aveugle, et ne réécris pas un bloc entier pour contourner un problème que tu n'as pas identifié.
3. **Mets à jour la documentation d'abord** si le retour révèle un écart de cadrage : `docs/contexte.md` pour une hypothèse fausse, `docs/plan-mvp.md` pour des étapes à ajouter, réordonner ou supprimer. Un retour qui ne laisse aucune trace écrite reviendra au cycle suivant.
4. **Corrige**, en restant dans le périmètre du retour. Rien d'autre ne bouge.
5. **Conclus** par : ce qui a changé, comment je le vérifie de mon côté, et la prochaine étape cochable.

Si le même retour revient pour la deuxième fois, ne te contente pas de corriger : ajoute la règle correspondante dans `CLAUDE.md` (une ligne, concrète et vérifiable) pour qu'elle ne se reperde pas.
