# Étape 6 : Pattern de Composition

Maîtriser le pattern de **composition** en React : construire des composants flexibles et réutilisables grâce à `children` et aux sous-composants.

La composition est un pattern fondamental en React qui consiste à construire des composants complexes en **assemblant** des composants plus simples.

## Composition

### Icônes comme children (pas comme props)

```tsx
// ✅ Approche par composition
<Button>
  <TrashIcon className="h-4 w-4" />
  Supprimer
</Button>
```

### Composition avec un composant Card

```tsx
// Assemblage libre de sous-composants
<Card>
  <CardHeader>
    <CardTitle>Mon titre</CardTitle>
    <CardDescription>Ma description</CardDescription>
  </CardHeader>
  <CardContent>Contenu libre ici !</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Composition de composants complexes

```tsx
// UserCard compose : Avatar + Card + Badge
export function UserCard({ name, email, role, avatarSrc, status }) {
  return (
    <Card padding="md" shadow="sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar src={avatarSrc} alt={name} fallback={name.slice(0, 2)} />
          {status && <StatusIndicator status={status} />}
        </div>
        <div className="flex-1">
          <p className="font-medium">{name}</p>
          {email && <p className="text-sm text-gray-500">{email}</p>}
        </div>
        {role && <Badge variant="primary">{role}</Badge>}
      </div>
    </Card>
  );
}
```

## Exercice d'application :

Recherchez un **design system** sur Figma ou autre (Twitter, shad'cn, etc.)
Créer des composants UI de base (Button, Avatar, etc.) et des composants complexes (Card, Modal, etc.) en utilisant la composition.

> [!WARNING]
> Attention vous ne devez pas installer de librairie de composants, vous devez créer vos propres composants à partir de zéro.

```bash
# Structure du dossier
src/
└── components/
    └── ui/
        ├── Avatar.tsx
        ├── Button.tsx
        ├── Card.tsx      # contient Card, CardHeader, CardContent, etc.
        └── Modal.tsx

```

## Rappel sur l'usage des variables css :

### Le problème qu'on résout

Jusqu'ici, nos composants utilisent des couleurs "hardcodées" :

```tsx
// ❌ Couleurs fixes - ne s'adapte pas aux thèmes
const buttonVariants = cva("...", {
  variants: {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
  },
});
```

On veut des composants qui s'adaptent au thème actif :

```tsx
// ✅ Variables CSS - s'adapte automatiquement
const buttonVariants = cva("...", {
  variants: {
    primary: "bg-primary text-white hover:bg-primary-hover",
  },
});
```

### 1. CSS Custom Properties (Variables CSS)

Les variables CSS permettent de définir des valeurs réutilisables :

```css
/* Thème par défaut */
:root {
  --color-primary: #1d9bf0; /* Bleu Twitter */
  --color-background: #ffffff;
  --color-text: #0f172a;
}

/* Thème alternatif */
[data-theme="instagram"] {
  --color-primary: #0095f6; /* Bleu Instagram */
  --color-background: #fafafa;
}

/* Mode sombre */
[data-theme="twitter-dark"] {
  --color-primary: #1d9bf0;
  --color-background: #000000;
  --color-text: #e7e9ea;
}
```

### 2. Configuration Tailwind CSS v4

Tailwind v4 utilise `@theme` pour exposer les variables :

```css
/* index.css */
@import "tailwindcss";

@theme {
  --color-primary: var(--color-primary);
  --color-primary-hover: var(--color-primary-hover);
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-text: var(--color-text);
  --color-border: var(--color-border);
}
```

Résultat : `bg-primary`, `text-text`, `bg-background`, etc. sont disponibles comme classes Tailwind !
