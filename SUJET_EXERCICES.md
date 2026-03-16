# Sujets d'Exercices : Motion (Framer Motion)

Ce document présente les objectifs et les consignes pour chaque exercice de la série (0 à 13).

---

## Exercice 0 : Les Fondamentaux
**Objectif** : Comprendre le composant `motion` et les propriétés de base.
- Créer un titre qui apparaît avec un fondu et un changement d'échelle.
- Utiliser `initial`, `animate` et `transition`.
- Définir des **Variants** pour séparer la logique du design.

## Exercice 1 : Orchestration (Stagger)
**Objectif** : Animer plusieurs éléments de manière séquentielle.
- Créer un conteneur parent et deux enfants.
- Utiliser `staggerChildren` dans le variant parent pour décaler l'apparition des enfants.
- Faire venir un enfant du haut et l'autre du bas.

## Exercice 2 : Keyframes et Boucles
**Objectif** : Créer des animations cycliques complexes.
- Utiliser des tableaux de valeurs (keyframes) pour les propriétés `scale`, `rotate` et `borderRadius`.
- Mettre en place une boucle infinie avec `repeat: Infinity` et `repeatType: "reverse"`.

## Exercice 3 : Interactions (Hover & Tap)
**Objectif** : Rendre l'interface réactive au curseur et au clic.
- Créer un bouton interactif utilisant `whileHover` et `whileTap`.
- Configurer une transition de type `spring` (ressort) avec `stiffness` et `damping`.
- Utiliser des noms de variants sémantiques (`rest`, `hover`, `tap`).

## Exercice 4 : Le Drag (Glisser-Déposer)
**Objectif** : Manipuler des éléments à la souris.
- Rendre un carré déplaçable avec la propriété `drag`.
- Limiter la zone de mouvement avec `dragConstraints`.
- Ajouter un feedback visuel pendant le déplacement avec `whileDrag`.

## Exercice 5 : Progression au Scroll
**Objectif** : Lier une animation au défilement de la page.
- Utiliser le hook `useScroll` pour récupérer la progression (`scrollYProgress`).
- Mapper cette progression sur une barre de remplissage.
- Utiliser `useSpring` pour lisser le mouvement et `offset` pour définir la zone d'activation.

## Exercice 6 : Animation SVG
**Objectif** : Animer des tracés vectoriels.
- Utiliser `pathLength` pour faire "se dessiner" une icône SVG.
- Définir des transitions spécifiques pour le tracé (`default`) et le remplissage (`fill`).
- Utiliser `repeatType: "reverse"` pour un effet de va-et-vient.

## Exercice 7 : Scroll Reveal
**Objectif** : Déclencher des animations à l'entrée dans l'écran.
- Utiliser `whileInView` au lieu de `animate`.
- Configurer `viewport` avec `once: false` et `amount` pour contrôler le déclenchement.
- Utiliser des noms sémantiques `offscreen` et `onscreen`.

## Exercice 8 : AnimatePresence (Sortie)
**Objectif** : Animer la disparition d'un élément.
- Utiliser le composant `<AnimatePresence>`.
- Définir une propriété `exit` sur l'élément motion.
- Créer un bouton pour masquer/afficher un élément avec une transition fluide à la fermeture.

## Exercice 9 : Layout Animations
**Objectif** : Animer les changements de structure CSS.
- Utiliser la prop `layout`.
- Créer un carré qui s'agrandit pour remplir son conteneur au clic.
- Observer comment Motion gère automatiquement la transition de taille et de `borderRadius`.

## Exercice 10 : Shared Layout (`layoutId`)
**Objectif** : Créer des transitions fluides entre composants distincts.
- Créer un système d'onglets (Tabs).
- Utiliser `layoutId` pour faire voyager l'indicateur de sélection (la "pilule") d'un bouton à l'autre.

## Exercice 11 : Transformations de valeurs (`useTransform`)
**Objectif** : Créer des effets de parallaxe ou de liaison complexe.
- Utiliser `useTransform` pour lier la progression du scroll à la rotation et à l'opacité d'une carte.
- Créer un effet d'entrée dynamique où l'élément se redresse en scrollant.

## Exercice 12 : Listes réordonnables (`Reorder`)
**Objectif** : Créer une liste drag-and-drop fonctionnelle.
- Utiliser `<Reorder.Group>` et `<Reorder.Item>`.
- Lier l'état d'un tableau React à la liste pour permettre la réorganisation réelle des éléments.

## Exercice 13 : Text Animation (Par caractère)
**Objectif** : Animer un texte lettre par lettre.
- Découper un texte en tableau de caractères.
- Utiliser `staggerChildren` pour un effet de "vague" ou de révélation séquentielle.
- Ajouter des transformations 3D (`rotateX`, `perspective`) pour un rendu premium.
