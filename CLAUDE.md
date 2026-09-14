# <NOM_DU_PROJET>

<!--
  Modèle de démarrage POC/MVP.
  Les <chevrons> sont remplis à l'issue du cadrage (/cadrage).
  Ces commentaires HTML sont retirés avant injection dans le contexte : ils ne
  coûtent aucun token. Notes pour l'équipe :
   - viser < 200 lignes : au-delà, l'adhérence aux consignes baisse
   - supprimer toute section vide plutôt que la laisser en <chevrons>
   - une règle qui ne sert qu'à un sous-dossier va dans .claude/rules/ avec
     un frontmatter `paths:`, pas ici
   - `/clear` entre deux tâches sans rapport (moins cher et plus fiable que /compact)
-->

## Contexte

- **But** : <une phrase — qui s'en sert, pour résoudre quel problème>
- **Statut** : POC/MVP. On cherche à valider un usage, pas à livrer en production.
- **Hors périmètre** : <ce qu'on ne fait explicitement PAS dans ce MVP>

## Stack

- Langage / runtime : <>
- Framework : <>
- Persistance : <>
- Tests : <>
- Exécution : <local uniquement pour le MVP>

Aucune dépendance nouvelle sans validation : proposer, attendre le feu vert, puis installer.

## Commandes

| Action        | Commande |
| ------------- | -------- |
| Installer     | `<>`     |
| Lancer en dev | `<>`     |
| Tester        | `<>`     |
| Lint / format | `<>`     |

## Conventions

- <indentation, ex. « 2 espaces, pas de tabulation »>
- <nommage, ex. « fichiers en kebab-case, composants en PascalCase »>
- <emplacement imposé, ex. « les appels API vivent dans `src/api/` »>
- Commentaires : uniquement pour un *pourquoi* non évident. Jamais de paraphrase du code.
- Commits : <format>

## Méthode de travail

Le projet avance par cycles. Chaque cycle :

1. **Cadrage** — `/cadrage` : entretien, puis écriture des documents dans `docs/`.
2. **Documentation** — rien n'est codé tant que `docs/plan-mvp.md` n'est pas validé à l'écrit.
3. **Implémentation** — une étape cochée à la fois.
4. **Retour** — `/retour` : je teste, on corrige la doc *et* le code, on repart au cycle suivant.

Pendant l'implémentation :

- Avant une étape non triviale : annoncer en 3 à 5 lignes ce qui va être fait et quels fichiers sont touchés.
- Une étape = un lot cohérent. Ne pas enchaîner deux étapes sans retour de ma part.
- Cocher l'étape dans `docs/plan-mvp.md` une fois qu'elle tourne réellement.
- Ne rien refactorer, renommer ni « améliorer » hors du périmètre de l'étape en cours.

## Garde-fous

- **Pas d'invention.** Si une API, une option de config ou une version n'est pas certaine : le dire et vérifier (doc officielle, code du dépôt) au lieu de produire du plausible. « Je ne sais pas » est une réponse acceptable et préférable.
- **Compréhension avant vitesse.** À la fin de chaque étape, résumer en 2 ou 3 phrases ce que fait le code et le compromis retenu. Nous devons pouvoir maintenir ce code sans toi.
- **Le plus simple qui marche.** Pas d'abstraction, de couche générique, de cache ni de gestion d'erreur exhaustive tant que le besoin n'est pas constaté.
- **Pas de code spéculatif** : pas de fonction « au cas où », pas de TODO pour plus tard.
- **Secrets** : jamais en dur. `.env` + `.env.example` tenu à jour.
- **Ambiguïté coûteuse** (modèle de données, dépendance, parcours utilisateur) : poser la question plutôt que trancher seul.
- **Interface** : suivre `docs/direction-visuelle.md`. Ne pas produire la mise en page générique par défaut (héros centré, cartes à trois colonnes, dégradé violet).

## Documents

`docs/contexte.md`, `docs/plan-mvp.md`, `docs/direction-visuelle.md` : à lire avant de coder sur un sujet qui les concerne.

<!--
  Si un document doit être chargé à CHAQUE session, l'importer explicitement :
  @docs/contexte.md
  Attention : un fichier importé est chargé au lancement et consomme du contexte
  en permanence. N'en importer qu'un, court, et laisser les autres en lecture à
  la demande (écrits entre backticks comme ci-dessus, ils ne sont pas importés).
-->
