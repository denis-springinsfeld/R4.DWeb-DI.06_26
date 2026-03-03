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
