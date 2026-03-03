## Étape 3 : Tailwind Merge

Découvrir `tailwind-merge`, une librairie qui résout automatiquement les conflits entre classes Tailwind en gardant intelligemment la dernière valeur.

Dans l'étape 1, nous avons vu que Tailwind ne résout pas les conflits de classes. `tailwind-merge` analyse les classes et **supprime automatiquement celles en conflit**, en gardant la dernière.

### Installation

```bash
npm install tailwind-merge
```

### Fonctionnement de base

```tsx
import { twMerge } from "tailwind-merge";

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
    <button
      className={twMerge(
        "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",
        className,
      )}
    >
      {children}
    </button>
  );
}
```

➡️ Adapter le code de l'étape 1 pour utiliser `twMerge` et observez les résultats.

```tsx
import { twMerge } from "tailwind-merge";

// Testez ces cas et notez les résultats :
twMerge("bg-amber-500 bg-amber-500");
// Attendu : ?

twMerge("bg-red-500 bg-blue-500");
// Attendu : ?

twMerge("px-4 px-8");
// Attendu : ?

twMerge("bg-blue-500 text-white font-bold");
// Attendu : ?

twMerge("text-sm text-lg text-xl");
// Attendu : ?

twMerge("font-light font-bold font-medium");
// Attendu : ?

twMerge("rounded rounded-lg rounded-full");
// Attendu : ?

twMerge("shadow shadow-lg shadow-none");
// Attendu : ?

twMerge("border border-2 border-0");
// Attendu : ?
```

Analysez ces cas de padding :

```tsx
console.log(twMerge("p-4 pt-2"));
// Que se passe-t-il ? Pourquoi ?

console.log(twMerge("px-4 py-2 p-8"));
// Que se passe-t-il ? Pourquoi ?

console.log(twMerge("p-4 px-0"));
// Que se passe-t-il ? Pourquoi ?
```

**Question** : Comment `twMerge` comprend-il la hiérarchie `p` → `px/py` → `pt/pr/pb/pl` ?

### Limitations de twMerge seul

`twMerge` ne gère que la **fusion** de classes. Pour les **classes conditionnelles**, le code reste verbeux :

```tsx
// ❌ Toujours pas idéal...
twMerge(
  "px-4 py-2",
  isLarge ? "px-6 py-3" : "",
  isDisabled ? "opacity-50" : "",
  isActive ? "ring-2 ring-blue-500" : "",
);
// Problèmes : chaînes vides, conditions dispersées
```

### 💡 Ce qu'il faut retenir

| Point clé                   | Explication                                               |
| --------------------------- | --------------------------------------------------------- |
| **Résolution automatique**  | `twMerge` supprime les conflits, la dernière classe gagne |
| **Intelligence sémantique** | Comprend les relations entre classes (p-4 vs px-4)        |
| **Overrides fiables**       | Peu importe l'ordre alphabétique CSS                      |
| **Limitation**              | Ne gère pas les conditions, code toujours verbeux         |

---

## Étape 4 : La fonction utilitaire `cn()`

Créer la fonction `cn()` utilisée par shadcn/ui en combinant `clsx` et `tailwind-merge` pour obtenir le meilleur des deux mondes.

À l'étape précédente, `twMerge` résout les conflits mais les **conditions** restent verbeuses :

```tsx
// ❌ Verbeux avec twMerge seul
twMerge(
  "px-4 py-2",
  isLarge ? "px-6 py-3" : "", // Chaîne vide = pas propre
  isDisabled ? "opacity-50" : "", // Répétitif
  isActive ? "ring-2" : "", // Ternaires partout
);
```

### Installation

```bash
npm install clsx tailwind-merge
```

### Qu'est-ce que clsx ?

`clsx` est une micro-librairie (~228 bytes) pour construire des chaînes de classes conditionnellement :

```tsx
import { clsx } from "clsx";

// 1. Conditions avec && (falsy values ignorées)
clsx("foo", true && "bar", false && "baz");
// => "foo bar"

// 2. Syntaxe objet { classe: condition }
clsx({
  foo: true,
  bar: false,
  baz: isActive,
});
// => "foo" (+ "baz" si isActive)

// 3. Arrays
clsx(["foo", "bar"], { baz: true });
// => "foo bar baz"

// 4. Valeurs falsy automatiquement ignorées
clsx("foo", null, undefined, 0, "", false, "bar");
// => "foo bar" ✅
```

### La fonction cn()

On combine `clsx` et `twMerge` :

```tsx
// src/lib/utils.ts
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Workflow de cn()

```
cn("bg-gray-200", isActive && "bg-blue-500")
        │
        ▼
    clsx(...)
        │
        ▼
  "bg-gray-200 bg-blue-500" (si isActive)
        │
        ▼
    twMerge(...)
        │
        ▼
  "bg-blue-500" ✅ Conflit résolu !
```

### Exemples d'utilisation

```tsx
import { cn } from "@/lib/utils";

// ✅ Conditions avec &&
cn("px-4 py-2", isLarge && "px-6 py-3");

// ✅ Syntaxe objet pour variants
cn("base-classes", {
  "bg-blue-500 text-white": variant === "primary",
  "bg-red-500 text-white": variant === "danger",
  "opacity-50 cursor-not-allowed": disabled,
});

// ✅ Combinaison complète
cn(
  // Classes de base
  "px-4 py-2 rounded-md font-medium transition-colors",
  // Variants avec objet
  {
    "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
    "bg-gray-200 text-gray-800 hover:bg-gray-300": variant === "secondary",
  },
  // États
  disabled && "opacity-50 cursor-not-allowed",
  // Override externe
  className,
);
```

---

### Exemple

Regardez le fichier `ButtonCn.tsx` :

```tsx
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

interface ButtonCnDataProps {
  children: ReactNode;
}

interface ButtonCnViewProps {
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export function ButtonCn({
  children,
  variant = "primary",
  className,
}: ButtonCnDataProps & ButtonCnViewProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        {
          "bg-blue-500 text-white hover:bg-blue-600": variant === "primary",
          "bg-gray-200 text-gray-800 hover:bg-gray-300":
            variant === "secondary",
          "bg-red-500 text-white hover:bg-red-600": variant === "danger",
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
```

### Refactorer avec cn()

Transformez ce code verbeux en utilisant `cn()` :

```tsx
// Avant - à refactorer
function Badge({ type, size, children }) {
  let classes = "inline-flex items-center rounded-full font-medium";

  if (type === "success") {
    classes += " bg-green-100 text-green-800";
  } else if (type === "warning") {
    classes += " bg-yellow-100 text-yellow-800";
  } else if (type === "error") {
    classes += " bg-red-100 text-red-800";
  } else {
    classes += " bg-gray-100 text-gray-800";
  }

  if (size === "sm") {
    classes += " px-2 py-0.5 text-xs";
  } else if (size === "lg") {
    classes += " px-3 py-1 text-sm";
  } else {
    classes += " px-2.5 py-0.5 text-xs";
  }

  return <span className={classes}>{children}</span>;
}
```

**Solution attendue avec cn()** :

```tsx
function Badge({ type = "default", size = "md", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        {
          "bg-green-100 text-green-800": type === "success",
          "bg-yellow-100 text-yellow-800": type === "warning",
          "bg-red-100 text-red-800": type === "error",
          "bg-gray-100 text-gray-800": type === "default",
        },
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-2.5 py-0.5 text-xs": size === "md",
          "px-3 py-1 text-sm": size === "lg",
        },
      )}
    >
      {children}
    </span>
  );
}
```

### 💡 Ce qu'il faut retenir

| Point clé                 | Explication                                         |
| ------------------------- | --------------------------------------------------- |
| **cn() = clsx + twMerge** | Combine conditions propres + résolution de conflits |
| **clsx**                  | Gère les conditions (&&, objets, arrays)            |
| **twMerge**               | Résout les conflits Tailwind                        |

---
