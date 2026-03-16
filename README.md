# Motion (Ex Framer Motion)

## 1. Installation, Composants et Propriétés Fondamentales

[Docs motion pour React](https://motion.dev/docs/react)

```bash
npm install motion
```

```tsx
import { motion, type Variants } from "motion/react";
```

### Le composant `motion` : Transformer les composants HTML en composants motion

Pour animer un élément HTML, on remplace la balise standard par une version préfixée par `motion.`.
_Exemple : `<h1>` devient `<motion.h1>`, `<div>` devient `<motion.div>`, etc._

### Les propriétés `initial`, `animate` et `transition`

#### `initial` (L'état de départ)

- Définit les styles de l'élément au moment précis où il apparaît dans le DOM.
- **Valeurs** : Un objet de styles CSS (ex: `{{ opacity: 0 }}`) ou un nom de variant (ex: `"hidden"`).
- **Astuce** : Mettre `initial={false}` pour désactiver l'animation d'entrée au premier rendu.

#### `animate` (L'état cible)

- Définit les styles vers lesquels l'élément doit s'animer automatiquement.
- Framer Motion détecte les changements de valeurs et gère l'interpolation.
- **Valeurs** : Un objet de styles ou un nom de variant (ex: `"visible"`).

#### `transition` (Le comportement)

- C'est le "cerveau" de l'animation. Elle définit **comment** on passe de l'état initial à l'état animé.
- **Options communes** :
  - `duration` : Durée en secondes.
  - `delay` : Attente avant le début.
  - `ease` : Courbe de vitesse (`"easeInOut"`, `"linear"`, etc.).
  - `type` : Type d'animation (`"spring"` pour de la physique, `"tween"` pour du temps pur).

### ➡️ Exercice 0

```tsx
<motion.h1
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 7 }}
  className="text-5xl font-bold"
>
  Hello World !
</motion.h1>
```

---

## 2. Les Variants

Les **variants** permettent de définir des objets de styles nommés. C'est la méthode recommandée pour séparer la logique d'animation du rendu JSX.

### ➡️ Exercice 0

```tsx
const myVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

<motion.h1
  variants={myVariants}
  initial="hidden"
  animate="visible"
  className="text-5xl font-bold"
>
  Hello World !
</motion.h1>;
```

### Pourquoi utiliser des variants ?

- **Lisibilité** : Le JSX reste propre.
- **Réutilisabilité** : On peut appliquer le même objet à plusieurs composants.
- **Propagation** : Les états du parent sont automatiquement transmis aux enfants.
- **Orchestration** : Permet de synchroniser les animations entre plusieurs éléments.

## 3. États standard et Mots-clés

Framer Motion utilise des propriétés spécifiques pour déclencher les variants :

| Propriété     | Description                                                     |
| :------------ | :-------------------------------------------------------------- |
| `initial`     | État au montage du composant (ex: `hidden`).                    |
| `animate`     | État cible immédiat (ex: `visible`).                            |
| `exit`        | État avant le démontage du DOM (nécessite `<AnimatePresence>`). |
| `whileHover`  | État actif au survol de la souris.                              |
| `whileTap`    | État actif au clic / toucher.                                   |
| `whileInView` | État actif quand l'élément entre dans le viewport.              |

## 4. Propagation et Orchestration

### Propagation

Si un parent possède `animate="visible"`, tous ses enfants `<motion.xxx />` détecteront automatiquement cet état et chercheront un variant nommé `visible` dans leur propre configuration.

### Orchestration (`staggerChildren`)

Dans la transition du variant parent, on peut utiliser `staggerChildren` pour décaler le départ de l'animation des enfants.

```tsx
visible: {
  opacity: 1,
  transition: {
    staggerChildren: 0.3 // Attend 0.3s entre chaque enfant
  }
}
```

## 5. Type de Transition : "Spring" (Ressort)

Par défaut, Framer Motion utilise souvent un effet de ressort pour les animations physiques (position, échelle).

- **`type: "spring"`** : Définit une animation physique.
- **`stiffness`** (Rigidité) : Plus la valeur est haute, plus le ressort est "nerveux".
- **`damping`** (Amortissement) : Plus la valeur est basse, plus il y aura de rebonds.

## 6. Keyframes (Séquences d'états)

Au lieu de passer une seule valeur à une propriété, on peut passer un **tableau de valeurs**. Framer Motion animera l'élément à travers chaque étape.

```tsx
animate={{
  scale: [1, 2, 2, 1],
  rotate: [0, 90, 180, 0],
  borderRadius: ["20%", "20%", "50%", "20%"]
}}
```

- Par défaut, chaque étape prend une part égale de la durée totale.
- Idéal pour des animations complexes ou des cycles.

## 7. Animations en boucle (Repeat)

Pour faire durer une animation indéfiniment ou sur plusieurs cycles, on utilise les propriétés de répétition dans `transition`.

- **`repeat: Infinity`** : L'animation tourne sans fin.
- **`repeatDelay`** : Temps d'attente (en secondes) entre chaque cycle.
- **`repeatType`** :
  - `"loop"` (par défaut) : Recommence du début.
  - `"reverse"` : Joue l'animation à l'envers à chaque itération paire.
  - `"mirror"` : Alterne entre l'aller et le retour.

## 8. Bonnes pratiques de nommage

Bien que les noms soient libres, la communauté utilise souvent des termes sémantiques :

- `hidden` / `visible` (Apparition)
- `open` / `closed` (Menu / Modale)
- `offscreen` / `onscreen` (Scroll)
- `active` / `inactive` (Interactions)

---

## 9. Interactions et Transitions Avancées (Exercice 3)

Cet exercice combine les interactions utilisateur avec une configuration précise de la physique de l'animation.

### Propriétés d'Interaction

- **`whileHover`** : Déclenche une animation au survol.
- **`whileTap`** : Déclenche une animation au clic (ou pression sur mobile).

### Configuration du "Spring" (Ressort)

Dans une transition de type `spring`, on peut ajuster la sensation de l'animation :

- **`stiffness`** (600) : Définit la tension du ressort. Plus elle est élevée, plus le retour est véloce.
- **`damping`** (10) : Définit la résistance (le freinage). Une valeur basse crée plus de rebond (oscillation).

### Exemple de Refactorisation (Sémantique)

On définit des noms clairs pour les états et on les lie aux propriétés correspondantes :

```tsx
const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    backgroundColor: "#d1d5db",
    color: "#000000",
    transition: { type: "spring", damping: 10, stiffness: 600 },
  },
  tap: { scale: 0.9 },
};

<motion.button
  variants={buttonVariants}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
>
  Subscribe
</motion.button>;
```

---

## 10. Le Drag (Glisser-Déposer) (Exercice 4)

Framer Motion permet de rendre n'importe quel élément "draggable" très simplement.

### Propriétés de Drag

- **`drag`** : Active le glisser-déposer.
  - `drag` (tout court) : Permet de bouger dans toutes les directions.
  - `drag="x"` ou `drag="y"` : Restreint le mouvement à un seul axe.
- **`dragConstraints`** : Définit les limites (en pixels) de la zone de déplacement relative à la position d'origine.
  - `{{ top: -100, bottom: 100, ... }}`
- **`dragTransition`** : Contrôle le comportement du rebond ou de l'élan après le relâchement.
  - `bounceStiffness` : Rigidité du rebond.
  - `bounceDamping` : Amortissement du rebond.
- **`whileDrag`** : Définit l'état visuel de l'élément **pendant** qu'il est déplacé.

### Exemple de Drag

```tsx
const boxVariants: Variants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
  drag: { scale: 1.2, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" },
};

<motion.div
  variants={boxVariants}
  drag
  dragConstraints={{ top: -125, right: 125, bottom: 125, left: -125 }}
  whileHover="hover"
  whileTap="tap"
  whileDrag="drag"
/>;
```

---

## 11. Animations liées au Scroll (Exercice 5)

Framer Motion propose des hooks pour lier des animations à la progression du défilement de la page ou d'un conteneur.

### Le hook `useScroll`

Il permet de récupérer des valeurs de progression (0 à 1) sous forme de `MotionValues`.

- **`scrollYProgress`** : Progression verticale (0 = haut, 1 = bas).
- **`target`** : Une `ref` React pointant vers l'élément que l'on veut suivre.

### Comprendre les `offsets`

Le format pour chaque chaîne est : **`"position_de_la_cible position_du_conteneur"`**.

| Type          | Valeurs possibles        | Description                                |
| :------------ | :----------------------- | :----------------------------------------- |
| **Mots-clés** | `start`, `center`, `end` | Points de repère relatifs (0%, 50%, 100%). |
| **Nombres**   | `0`, `0.5`, `1`          | Progression en pourcentage (0 à 1).        |
| **Pixels**    | `100px`, `-50px`         | Position fixe par rapport au bord.         |

#### Combinaisons classiques :

- **`["start end", "end start"]`** : Tant que l'élément est visible (de son entrée en bas à sa sortie en haut).
- **`["start end", "start start"]`** : Du bas de l'écran jusqu'à ce que le haut de l'élément atteigne le haut de l'écran.
- **`["0 0.5", "1 0.5"]`** : Quand l'élément traverse la ligne du milieu de l'écran.

### Lissage avec `useSpring`

Le scroll natif peut être saccadé. Pour rendre l'animation fluide, on passe le `scrollYProgress` dans un hook `useSpring`.

```tsx
const { scrollYProgress } = useScroll({ target: ref });
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
});

<motion.div style={{ scaleY: smoothProgress }} />;
```

### Performance et `style`

Pour les valeurs issues de `useScroll`, on n'utilise pas `animate` mais la propriété **`style`** d'un composant `motion`.
Cela permet à Framer Motion de mettre à jour le style directement sans déclencher de re-render React, ce qui est crucial pour la fluidité du scroll.

### Exemple complet de progression

```tsx
const { scrollYProgress } = useScroll({
  target: myRef,
  offset: ["start end", "start start"],
});

const scaleY = useSpring(scrollYProgress);

<motion.div style={{ scaleY }} />;
```

### Déboguer le Scroll (L'alternative aux markers GSAP)

Framer Motion n'a pas de `markers: true`. Pour déboguer, on utilise deux méthodes :

1. **Repères Visuels (CSS)** : Créer des div en `fixed` avec des bordures dashées pour matérialiser les lignes de déclenchement (ex: haut et bas de l'écran).
2. **`useMotionValueEvent`** : Hook pour écouter les changements de valeur et les afficher dans la console.

```tsx
import { useMotionValueEvent } from "motion/react";

useMotionValueEvent(scrollYProgress, "change", (latest) => {
  console.log("Progression:", latest);
});
```

---

## 12. Animations SVG (Exercice 6)

Framer Motion facilite l'animation des éléments SVG (cercle, rectangle, chemin, etc.).

### L'effet de dessin (`pathLength`)

La propriété la plus utilisée pour les icônes est **`pathLength`**. Elle représente la progression du tracé du chemin de 0 à 1.

- `pathLength: 0` : Le chemin est invisible (non dessiné).
- `pathLength: 1` : Le chemin est entièrement dessiné.

### Transitions spécifiques par propriété

Dans l'objet `transition`, on peut utiliser la clé **`default`** pour toutes les propriétés, mais aussi cibler une propriété spécifique (comme `fill`).

```tsx
transition: {
  default: { duration: 2, ease: "easeInOut" }, // Pour pathLength, opacity, etc.
  fill: { duration: 2, ease: "easeIn", delay: 1 } // Uniquement pour le remplissage
}
```

### Exemple de tracé d'icône

```tsx
const svgIconVariants: Variants = {
  hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  visible: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    transition: {
      default: { duration: 2, repeat: Infinity, repeatType: "reverse" },
    },
  },
};

<motion.svg viewBox="0 0 24 24">
  <motion.path
    d="..."
    variants={svgIconVariants}
    initial="hidden"
    animate="visible"
  />
</motion.svg>;
```

---

## 13. Le Scroll Reveal (Exercice 7)

Le "Scroll Reveal" consiste à déclencher une animation lorsqu'un élément entre dans la zone visible de l'écran (le viewport).

### La propriété `whileInView`

Contrairement à `animate` qui se lance au montage, `whileInView` attend que l'élément soit visible.

### Configuration du `viewport`

On peut affiner le comportement avec l'objet `viewport` :

- **`once`** :
  - `true` : L'animation ne se joue qu'une seule fois.
  - `false` (par défaut) : L'animation se rejoue chaque fois que l'élément revient dans l'écran.
- **`amount`** : Définit quelle proportion de l'élément doit être visible pour déclencher l'animation (ex: `0.3` pour 30%).
- **`margin`** : Ajoute une marge virtuelle autour du viewport (ex: `"0px 0px -100px 0px"` pour déclencher 100px avant la fin de l'écran).

### Exemple de Scroll Reveal

```tsx
const variants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.8 }
  },
};

<motion.div
  variants={variants}
  initial="offscreen"
  whileInView="onscreen"
  viewport={{ once: false, amount: 0.5 }}
/>
</motion.div>
```

---

## 14. AnimatePresence : Animations de Sortie (Exercice 8)

Par défaut, React retire un élément instantanément. `<AnimatePresence>` permet de maintenir l'élément dans le DOM le temps que son animation `exit` se termine.

- **`initial`** : État à l'entrée.
- **`animate`** : État stable.
- **`exit`** : État au moment de la suppression.
- **`mode="popLayout"`** : Empêche les autres éléments de sauter brutalement quand l'un sort.

---

## 15. Layout Animations (Exercice 9)

La prop **`layout`** demande à Motion d'animer automatiquement les changements de boîte (taille, position, border-radius) provoqués par un changement de style ou de classes CSS.

- Idéal pour les accordéons ou les cartes qui s'agrandissent.
- Motion utilise des transforms pour une fluidité à 60fps.

---

## 16. Shared Layout : `layoutId` (Exercice 10)

Si deux composants différents possèdent le même **`layoutId`**, Motion les traitera comme s'ils étaient le même élément physique.

- Utilisé pour "déplacer" un indicateur de sélection entre plusieurs boutons.
- Crée une transition magique entre deux états distincts du DOM.

---

## 17. Transformation de Valeurs : `useTransform` (Exercice 11)

Ce hook permet de lier une valeur (souvent le scroll) à une autre propriété.
`useTransform(valeurSource, [entréeMin, entréeMax], [sortieMin, sortieMax])`

- Exemple : Mapper le scroll (0-1) vers une rotation (0-360deg).
- S'utilise avec la prop **`style`**.

---

## 18. Listes Réordonnables : `Reorder` (Exercice 12)

Les composants dédiés `<Reorder.Group>` et `<Reorder.Item>` simplifient la création de listes "drag-and-drop".

- Ils gèrent automatiquement l'état (le tableau) et les animations de déplacement des autres éléments pendant le drag.
- Très facile à coupler avec `whileDrag` pour le feedback visuel.

---

## 19. Animation de Texte (Exercice 13)

L'animation de texte lettre par lettre ou mot par mot est un classique du web design premium.

### La méthode du découpage

Pour animer chaque lettre, on transforme la chaîne de caractères en tableau avec `Array.from()` ou `split('')`.

### Orchestration avec `staggerChildren`

C'est ici que `staggerChildren` devient indispensable. Le conteneur (le titre) déclenche les enfants (les lettres) les uns après les autres.

### Points clés :

- Chaque lettre doit être un **`inline-block`** pour que les transformations (scale, rotate, y) fonctionnent correctement.
- L'utilisation de **`perspective`** sur le conteneur permet des effets de rotation 3D sur les lettres.

```tsx
const letters = Array.from("Hello");

<motion.h1 variants={container} initial="hidden" animate="visible">
  {letters.map((l) => (
    <motion.span variants={letter}>{l}</motion.span>
  ))}
</motion.h1>;
```
