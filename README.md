# Animations avec React : Motion

[docs motion pour React](https://motion.dev/docs/react)

## Installation

```bash
npm install motion
```

## Utilisation

Transformer les composants HTML en composants motion

```tsx
import { motion } from "motion/react";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      Hello world
    </motion.div>
  );
}
```
