# Kevin Clicker

## Contexte

- **But** : un jeu web de type Cookie Clicker où l'on clique sur la tête de notre professeur Kévin Niel pour gagner de l'argent et acheter des améliorations. Exercice de rentrée M2, à produire en une heure.
- **Statut** : POC. On cherche à livrer quelque chose de jouable et drôle, pas un produit.
- **Hors périmètre** : comptes utilisateurs, serveur, prestige, succès, sons, classement en ligne, responsive mobile.

## Stack

- Langage / runtime : HTML, CSS, JavaScript vanilla (ES2020, navigateur)
- Framework : aucun, volontairement
- Persistance : `localStorage`, une clé JSON
- Tests : aucun test automatisé — vérification manuelle décrite dans `docs/plan-mvp.md`
- Exécution : ouvrir `index.html` dans le navigateur, local uniquement

Aucune dépendance nouvelle sans validation : proposer, attendre le feu vert, puis installer.
Ici, l'objectif est de n'en avoir **aucune**.

## Commandes

| Action        | Commande                                                    |
| ------------- | ----------------------------------------------------------- |
| Installer     | rien à installer                                            |
| Lancer en dev | ouvrir `index.html` (ou `python -m http.server` si besoin)   |
| Tester        | à la main, voir la section « Vérification » de chaque étape  |
| Lint / format | aucun outil                                                 |

## Conventions

- Indentation : 2 espaces, pas de tabulation.
- Fichiers en kebab-case. Constantes de configuration en `SCREAMING_SNAKE_CASE`.
- Trois fichiers seulement : `index.html`, `style.css`, `game.js`. Les images dans `assets/`.
- Tout l'état du jeu dans un unique objet `state`. Toute la configuration des améliorations dans le tableau `UPGRADES`.
- Commentaires : uniquement pour un *pourquoi* non évident. Jamais de paraphrase du code.
- Commits : `type: description courte à l'impératif` (ex. `feat: boutique et achat des améliorations`).

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
- **Ambiguïté coûteuse** (modèle de données, dépendance, parcours utilisateur) : poser la question plutôt que trancher seul.
- **Interface** : suivre `docs/direction-visuelle.md`. Ne pas produire la mise en page générique par défaut (héros centré, cartes à trois colonnes, dégradé violet).
- **Le temps est la contrainte principale.** Une heure. Devant un arbitrage, choisir ce qui est jouable maintenant.

## Documents

`docs/contexte.md`, `docs/plan-mvp.md`, `docs/direction-visuelle.md` : à lire avant de coder sur un sujet qui les concerne.
