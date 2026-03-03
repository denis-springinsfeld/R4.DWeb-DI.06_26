# Étape 5 : Class Variance Authority (CVA)

Utiliser CVA pour créer des variants de composants de manière **déclarative** et **type-safe**, en suivant le pattern exact de shadcn/ui.

Avec `cn()`, on gère les variants de manière impérative :

```tsx
// ❌ Impératif - les variants sont mélangés dans la logique
cn(
  "px-4 py-2 rounded-md",
  {
    "bg-blue-500 text-white": variant === "primary",
    "bg-gray-200 text-gray-800": variant === "secondary",
  },
  {
    "text-sm px-2 py-1": size === "sm",
    "text-lg px-6 py-3": size === "lg",
  },
);
```

## Installation

```bash
npm install class-variance-authority
```

## CVA :

CVA sépare la **définition** des variants de leur **utilisation** :

```tsx
import { cva } from "class-variance-authority";

// ✅ Déclaratif - variants définis séparément
const buttonVariants = cva(
  // Classes de base (toujours appliquées)
  "font-medium rounded-md transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
      },
    },
    // Valeurs par défaut
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
```

## Utilisation des variants

```tsx
// Utilise les défauts
buttonVariants();
// => "font-medium rounded-md ... bg-blue-500 text-white ... text-base px-4 py-2"

// Override un variant
buttonVariants({ variant: "danger" });
// => "... bg-red-500 text-white hover:bg-red-600 ..."

// Override plusieurs variants
buttonVariants({ variant: "ghost", size: "lg" });
// => "... bg-transparent text-gray-700 ... text-lg px-6 py-3"
```

## Types automatiques avec VariantProps

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("...", {
  variants: {
    variant: { primary: "...", secondary: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
});

// ✨ Types générés automatiquement !
interface ButtonViewProps extends VariantProps<typeof buttonVariants> {}
// Équivalent à :
// interface ButtonViewProps {
//   variant?: "primary" | "secondary" | null;
//   size?: "sm" | "md" | "lg" | null;
// }
```

## Pattern Data/View complet

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Définir les variants
const buttonVariants = cva("...", { variants: {...} });

// 2. Props "données" (interface)
interface ButtonDataProps {
  children: ReactNode;
}

// 3. Props "visuelles" (VariantProps)
interface ButtonViewProps extends VariantProps<typeof buttonVariants> {}

// 4. Combiner
interface ButtonProps extends ButtonDataProps, ButtonViewProps {}

// 5. Composant
export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Compound Variants

Styles spécifiques pour des **combinaisons** de variants :

```tsx
const buttonVariants = cva("font-medium rounded-md", {
  variants: {
    variant: {
      solid: "bg-blue-500 text-white",
      outline: "border bg-transparent",
    },
    size: {
      sm: "text-sm px-2 py-1",
      lg: "text-lg px-6 py-3",
    },
  },
  compoundVariants: [
    // Border plus fin pour outline + sm
    {
      variant: "outline",
      size: "sm",
      class: "border",
    },
    // Border plus épais pour outline + lg
    {
      variant: "outline",
      size: "lg",
      class: "border-2",
    },
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});
```

---

## Exemple de notre composant Button avec CVA

Regardez ce fichier `Button.tsx` :

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonDataProps {
  children: ReactNode;
}

interface ButtonViewProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

interface ButtonProps extends ButtonDataProps, ButtonViewProps {}

export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## Exercice 1 : Créer un composant Badge

Créez un composant `Badge` avec CVA :

```tsx
// Variants à implémenter :
// - variant: default, secondary, success, warning, destructive, outline
// - size: sm, md, lg

const badgeVariants = cva(
  // Classes de base
  "inline-flex items-center rounded-full font-medium",
  {
    variants: {
      variant: {
        // À compléter
      },
      size: {
        // À compléter
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
```

## Exercice 2 : Compound Variants

Ajoutez des `compoundVariants` au Badge :

```tsx
compoundVariants: [
  // Le badge "outline" en taille "sm" a une border plus fine
  {
    variant: "outline",
    size: "sm",
    class: "border",
  },
  // Le badge "outline" en taille "lg" a une border plus épaisse
  {
    variant: "outline",
    size: "lg",
    class: "border-2",
  },
],
```
