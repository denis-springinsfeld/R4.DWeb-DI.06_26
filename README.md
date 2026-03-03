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

```tsx
// Composant parent avec contexte visuel
export function Card({ children, shadow }: CardProps) {
  return (
    <div className={cn("rounded-lg border bg-white", shadowClasses[shadow])}>
      {children}
    </div>
  );
}

// Sous-composants pour la structure
export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="p-4 border-t flex gap-2">{children}</div>;
}
```
