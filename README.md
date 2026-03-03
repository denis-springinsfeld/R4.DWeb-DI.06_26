# Construire sa Librairies UI

> [!IMPORTANT]
> Dans ce TD nous n'allons pas utiliser Shadcn/UI comme une boîte noire, mais nous allons **reconstruire un écosystème inspiré de sa philosophie**.

## Etape 1 : Initialisation du projet avec Vite et Tailwind CSS.

➡️ Suivre l'installation de Vite et Tailwind CSS : [doc](https://tailwindcss.com/docs/installation/using-vite)

➡️ Ne pas oublier d'ajouter **prettier** pour le formatage du code : [doc](https://tailwindcss.com/docs/editor-setup#class-sorting-with-prettier)

---

## Etape 2 : Limites de la concaténation de classes Tailwind

Comprendre pourquoi la simple concaténation de classes Tailwind pose des problèmes et pourquoi nous avons besoin d'outils supplémentaires.

### Problème 1 : Spécificité des classes

Quand on crée un composant React avec Tailwind, on est tenté de faire ceci :

```tsx
// Data props (logique métier)
interface ButtonNaifDataProps {
  children: ReactNode;
  disabled?: boolean;
}

// View props (présentation)
interface ButtonNaifViewProps {
  className?: string;
}

function Button({ className, children }: : ButtonNaifDataProps & ButtonNaifViewProps) {
  return (
    <button className={`bg-blue-500 text-white px-4 py-2 ${className}`}>
      {children}
    </button>
  );
}
```

➡️ Testez ce composant en ajoutant des classes `bg-amber-500`, `bg-red-500` via le props `className`.

Qu'observez-vous ? Quelle est la logique derrière ce comportement ?

### Problème 2 : Code illisible avec les variants

Sans outils, gérer les variants devient un cauchemar :

```tsx
// Data props (logique métier)
interface ButtonNaifVariantDataProps {
  children: ReactNode;
  disabled?: boolean;
}

// View props (présentation)
interface ButtonNaifVariantViewProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ButtonNaifVariant({
  children,
  variant = "primary",
  size = "md",
  disabled,
  className = "",
}: ButtonNaifVariantDataProps & ButtonNaifVariantViewProps) {
  // ⚠️ Code illisible et difficile à maintenir !
  return (
    <button
      className={`
        font-medium rounded-md transition-colors
        ${variant === "primary" ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
        ${variant === "secondary" ? "bg-gray-200 hover:bg-gray-300 text-gray-800" : ""}
        ${variant === "danger" ? "bg-red-500 hover:bg-red-600 text-white" : ""}
        ${size === "sm" ? "text-sm px-2 py-1" : ""}
        ${size === "md" ? "px-4 py-2" : ""}
        ${size === "lg" ? "text-lg px-6 py-3" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

**Problèmes :**

- Code difficile à lire et maintenir
- Conflits de classes non résolus (ex: `px-4` + `px-2`)
- Espaces vides dans le résultat
- Pas de typage TypeScript

### Problème 3 : Espaces parasites

```tsx
const isActive = false;
const className = `bg-blue-500 ${isActive ? "ring-2" : ""} text-white`;
// Résultat : "bg-blue-500  text-white" (double espace !)
```

---

### 💡 Ce qu'il faut retenir

| Point clé         | Explication                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| **Ordre CSS**     | L'ordre dans la feuille de style détermine la priorité, pas l'ordre dans `class` |
| **Alphabétique**  | Tailwind génère les classes en ordre alphabétique                                |
| **Imprévisible**  | Le résultat dépend des noms de couleurs, pas de notre intention                  |
| **Illisible**     | Les conditions ternaires multiples rendent le code difficile à maintenir         |
| **Pas type-safe** | Aucune aide de TypeScript pour les variants                                      |
